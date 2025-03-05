const cardsContainerContent = document.getElementById('artist-search-result-list-content');
const cardsContainer = document.getElementById('artist-search-result-list-container');

let noResultFoundSlogan;
let is_no_result_found_slogan_generated = false;

function fillContentWithCards(cardsData) {
    fetch('/templates/card.html')
        .then(response => response.text())
        .then(html => {
            if (cardsData.error){
                console.log(cardsData.error);
            }else {
                cardsContainerContent.innerHTML = "";
                const embeddedData = cardsData._embedded;
                const totalCount = cardsData.total_count;
                // For future use.
                // const offset = cardsData.offset;
                // const has_next = cardsData.has_next;

                if (totalCount === 0){
                    console.log(`No result found.`)
                    if (!is_no_result_found_slogan_generated) {
                        cardsContainerContent.classList.add("hidden");
                        generatingNoResultFoundSlogan();
                    } else hideContainerContentAndShowNoResultFoundSlogan();
                    return;
                }

                embeddedData.forEach(data => {
                    let cardHtml = html;

                    const name = data.name || "Name";
                    const artistId = data.id || "";
                    const imageUrl = (data.thumbnail === "/assets/shared/missing_image.png" ||
                        data.thumbnail === "")? "../static/images/artsy_logo.svg": data.thumbnail;

                    cardHtml = cardHtml.replace(/data-artist-id="[^"]*"/, `data-artist-id="${artistId}"`)
                        .replace(/\{artist-name\}/, name)
                        .replace(/<img src="[^"]*"/, `<img src="${imageUrl}" alt="${name}'s Thumbnail"`);

                    const cardItem = document.createElement('div');
                    cardItem.innerHTML = cardHtml;
                    cardsContainerContent.appendChild(cardItem);
                    console.log(`Successfully append an artist card ${artistId} to the content.`)
                });
                console.log("Successfully fill content with cards.")
                showContainerContentAndHideNoResultFoundSlogan();
            }}).catch(error => console.error('Failed to load card.html.', error));
}

function loadMoreCards(cardsData){
    fetch('/templates/card.html')
        .then(response => response.text())
        .then(html => {
            console.log("Loading more cards...")
            if (cardsData.error){
                console.log(cardsData.error());
            }else{
                const total_count = cardsData.total_count;
                const offset = cardsData.offset;
                const size = cardsData.size;
                const embeddedData = cardsData._embedded;

                embeddedData.forEach(data => {
                    let cardHtml = html;

                    const name = data.name || "Name";
                    const artistId = data.id || "";
                    const imageUrl = (data.thumbnail === "/assets/shared/missing_image.png" ||
                        data.thumbnail === "")? "../static/images/artsy_logo.svg": data.thumbnail;

                    cardHtml = cardHtml.replace(/data-artist-id="[^"]*"/, `data-artist-id="${artistId}"`)
                        .replace(/\{artist-name\}/, name)
                        .replace(/<img src="[^"]*"/, `<img src="${imageUrl}" alt="${name}'s Thumbnail"`);

                    const cardItem = document.createElement('div');
                    cardItem.innerHTML = cardHtml;
                    cardsContainerContent.appendChild(cardItem);
                    console.log(`Successfully append an artist card ${artistId} to the content.`);
                });
                console.log(`Successfully load ${((total_count - offset) <= size)? (total_count - offset) : size} cards.`)
            }
        }).catch(error => console.error('Failed to load card.html.', error));
}

function generatingNoResultFoundSlogan(){
    fetch('/templates/no-result-found.html')
        .then(response => response.text())
        .then(html =>{
            hideElement(cardsContainerContent);
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            cardsContainer.appendChild(doc.body.firstChild);
            noResultFoundSlogan = document.getElementById("no-result-found");
            is_no_result_found_slogan_generated = true;
            console.log(`Successfully append a no result found slogan to the content.`)
        }).catch(error => console.error('Failed to load no-result-found.html', error));
}

function hideElement(element){
    if (!element.classList.contains("hidden")) element.classList.add("hidden");
}

function showElement(element){
    if (element.classList.contains("hidden")) element.classList.remove("hidden");
}

function showContainerContentAndHideNoResultFoundSlogan(){
        if (is_no_result_found_slogan_generated) hideElement(noResultFoundSlogan);
        showElement(cardsContainerContent);
}

function hideContainerContentAndShowNoResultFoundSlogan() {
        hideElement(cardsContainerContent);
        showElement(noResultFoundSlogan);
}

