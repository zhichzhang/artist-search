
document.addEventListener("DOMContentLoaded", () => {
    const searchBarRoundedBox = document.querySelector('.artist-search-search-bar-rounded-box');
    const textBoxInput = document.querySelector('#artist-search-search-bar-text-box input');
    const buttons = document.querySelectorAll('.artist-search-search-bar-button');
    const loadingBars = document.querySelectorAll(".loading-bar");
    const artistDetailsBox = document.getElementById("artist-search-artist-details-box");
    const cardsContainerContent = document.getElementById("artist-search-result-list-content");

    const searchButton = buttons[0];
    const clearButton = buttons[1];
    const searchLoadingBar = loadingBars[0];
    const detailsLoadingBar = loadingBars[1];

    let prev_search_response = null;
    let lastFetchedTime = 0;
    let throttleInterval = 400;

    let isResultsShown = false;
    let isArtistDetailShown = false;
    let selected_card_artist_id = "";
    let isAnyCardSelected = false;
    let card_selected;
    let noResultFoundMark = true;

    // Development Settings
    const DEV_VERSION_OPENED = true;  // Ture off by assigning `DEV_VERSION_OPENED` with false if you plan to deploy your app in the cloud.
    const DEV_IP = "127.0.0.1";
    const DEV_PORT = "5000";
    const DEV_SOCKET = DEV_IP + ":" + DEV_PORT;

    // Domain Settings
    const SCHEME = (DEV_VERSION_OPENED)? "http://": "https://";
    const DOMAIN = SCHEME + "my-domain";  // Replace `my-domain` with your domain if you plan to deploy.
    const LOCALHOST = SCHEME + DEV_SOCKET;

    // URLs
    const BASE_SEARCH_URL = ((DEV_VERSION_OPENED)? LOCALHOST : DOMAIN) + "/search";
    const BASE_GET_ARTIST_DETAILS_URL = ((DEV_VERSION_OPENED)? LOCALHOST : DOMAIN) + "/artists";
    const HEADERS_GET = {method: "GET", header: {'Content-type': 'application/json'}};
    const HEADERS_POST = {method: "POST", header: {'Content-type': 'application/json'}};

    function hideElement(element){
        element.classList.add("hidden");
    }

    function showElement(element){
        element.classList.remove("hidden");
    }

    function startLoading(loading_bar_index) {
        let loadingBar = loadingBars[loading_bar_index];
        loadingBar.classList.add('show');
        setTimeout(function() {
            loadingBar.classList.remove('show');
            // console.log('Failed to receive a response!');
        }, 5000);
    }

    function markCardAsSelected(artistId) {
        selected_card_artist_id = artistId;
        let queryString = `[data-artist-id=\"${selected_card_artist_id}\"]`;
        card_selected = document.querySelector(queryString);
        card_selected.classList.add('selected');
        isAnyCardSelected = true;
        console.log(`Successfully mark card with id ${selected_card_artist_id} as selected!`);
    }

    function removeMark(){
        card_selected.classList.remove('selected');
        isAnyCardSelected = false;
        console.log(`Successfully remove the selected mark of card with id ${selected_card_artist_id}!`);
        selected_card_artist_id = "";
    }

    function searchArtist(name){
        if (name !== ""){
            console.log(`Start searching for the artist ${name}...`);
            const type = "artist";
            const size = 10;
            const search_url = BASE_SEARCH_URL + `/${name}/${type}/${size}`;
            console.log(`Search URL: ${search_url}`);

            if (!isResultsShown || noResultFoundMark) startLoading(0);
            else {
                if (isArtistDetailShown) {
                    hideElement(artistDetailsBox);
                    isArtistDetailShown = false;
                }
                showElement(detailsLoadingBar);
                startLoading(1);
            }
            fetch(search_url, HEADERS_GET)
                .then(response => response.json())
                .then(data => {
                     console.log("Successfully received a response!");
                     if (!isResultsShown || noResultFoundMark)  searchLoadingBar.classList.remove('show');
                     else {
                         detailsLoadingBar.classList.remove('show');
                         hideElement(detailsLoadingBar);
                     }
                     noResultFoundMark = (data.total_count === 0);
                     fillContentWithCards(data);
                     console.log(`${data.total_count}, ${data.offset}, ${data.has_next}`);
                     prev_search_response = (data.has_next)? deepCopyJSONResponse(data) : null;

                     if (isAnyCardSelected){
                       removeMark();
                       hideElement(artistDetailsBox);
                     }
                     isResultsShown = true;
                })
                .catch(error => {console.error('Error', error);});
            console.log("Loading...");
        }else{
            alert("Please fill out this field.");
            console.log("Alert: Please fill out this field.");
        }
    }

    function deepCopyJSONResponse(response){
        return JSON.parse(JSON.stringify(response));
    }

    function loadMoreHandler(){
        console.log("LoadMoreHandler: On;");

        const current = Date.now();
        if ((current - lastFetchedTime >= throttleInterval) && prev_search_response != null){
            console.log(prev_search_response.toString());
            console.log("Loading more results...")
            const scrollLeft = cardsContainer.scrollLeft;
            const scrollWidth = cardsContainer.scrollWidth;
            const clientWidth = cardsContainer.clientWidth;
            console.log(`${scrollLeft}, ${scrollWidth}, ${clientWidth}`);
            const has_next = prev_search_response.has_next;
            const size = prev_search_response.size;
            const total_count = prev_search_response.total_count;
            const offset = (total_count - prev_search_response.offset > size)? (prev_search_response.offset + size): (total_count - prev_search_response.offset);
            const q = prev_search_response.q;

            if (total_count - offset <= size){
                prev_search_response = null;
                return;
            }

            if (scrollLeft + clientWidth >= scrollWidth - 300){
                loadMore(q, size, offset);
            }
            lastFetchedTime = current;
        }
    }

    function loadMore(q, size, offset){
        const type = "artist";
        const search_url = BASE_SEARCH_URL + `/${q}/${type}/${size}/${offset}`;
        fetch(search_url, HEADERS_GET)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                loadMoreCards(data);
                // cardsContainer.scrollLeft = 0;
                prev_search_response = deepCopyJSONResponse(data);
            });
    }

    cardsContainer.addEventListener('scroll', loadMoreHandler);

    cardsContainerContent.addEventListener('click', function(event) {
        const card = event.target.closest(".card");
        if (isAnyCardSelected) removeMark();
        if (card) {
            const artistId = card.dataset.artistId;
            const get_artists_details_url = BASE_GET_ARTIST_DETAILS_URL + `/${artistId}`;
            markCardAsSelected(artistId);
            hideElement(artistDetailsBox);
            artistDetailsContainerContent.innerHTML = "";
            showElement(detailsLoadingBar);
            startLoading(1);
            fetch(get_artists_details_url, HEADERS_GET)
                .then(response => response.json())
                .then(data => {
                    console.log("Successfully received a response!");
                    detailsLoadingBar.classList.remove('show');
                    hideElement(detailsLoadingBar);
                    fillContentWithDetails(data);
                    showElement(artistDetailsBox);
                    isArtistDetailShown = true;
                }).catch(error => console.error('Error', error));
        }
    });

    textBoxInput.addEventListener('focus', () => {
        console.log("Textbox gets focus.");
        searchBarRoundedBox.classList.add('active');
    });

    textBoxInput.addEventListener('input', () => {
        if (textBoxInput.value.length > 0){
            searchBarRoundedBox.classList.add('active');
        }
    });

    textBoxInput.addEventListener('keydown', function(event)  {
        if (event.key === 'Enter'){
            console.log("Press enter key.");
            event.preventDefault();
            searchBarRoundedBox.classList.add('active');
            const name = textBoxInput.value.trim();
            searchArtist(name);
        }
    });

    clearButton.addEventListener('click', () => {
        console.log("Clear all inputs.");
        textBoxInput.value = "";
        searchBarRoundedBox.classList.remove('active');
    });

    searchButton.addEventListener("click", () => {
        console.log("Trigger searching.");
        searchBarRoundedBox.classList.add('active');
        const name = textBoxInput.value.trim();
        searchArtist(name);
    });

    document.addEventListener('click', function(event) {
       if(!searchBarRoundedBox.contains(event.target) && searchBarRoundedBox.classList.contains('active')) searchBarRoundedBox.classList.remove('active');
    });
});