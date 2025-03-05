const artistDetailsContainerContent = document.getElementById("artist-details-content");


function fillContentWithDetails(detailsData){
    fetch("/templates/artist-details.html")
        .then(response => response.text())
        .then(html => {
            if (detailsData.error){
                console.log(detailsData.error);
            } else {
                artistDetailsContainerContent.innerHTML = "";
                const name = detailsData.name || "";
                const id = detailsData.id || "";
                const biography = detailsData.biography || "";
                const birthday = detailsData.birthday || "";
                const deathday = detailsData.deathday || "";
                const nationality = detailsData.nationality || "";

                console.log(`Received ${name}'s artist details. (id=${id})`);

                let artistDetailsHtml = html;
                artistDetailsHtml = artistDetailsHtml.replace(/{artist-name}/g, name)
                    .replace(/{birthday}/g, birthday)
                    .replace(/{deathday}/g, deathday)
                    .replace(/{nationality}/g, nationality)
                    .replace(/{biography}/g, biography);

                artistDetailsContainerContent.innerHTML = artistDetailsHtml;
                console.log(`Successfully append ${name}'s artist details to the content.`)
            }
        }).catch(error => console.error('Failed to load artist-details.html', error));
}