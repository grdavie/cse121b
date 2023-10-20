//declare and initialize global variables

const animeElement = document.querySelector("#recommendations");
let animeList = []; //store all the anime from MAL user's anime list
let animeID = []; //store the anime ID from the filtered/generated list
let recommendationList = []; //store the json information for the filtered/generated list

//build anime display card for each item in the recommendation list

const displayAnime = (animeResult) => {
    animeResult.forEach(anime => {

        const articleElement = document.createElement("article");

        //display anime name
        const h3Element = document.createElement("h3");
        h3Element.textContent = anime.title;

        //display alternative title (english name)
        const h4Element = document.createElement("h4");
        h4Element.textContent = anime.alternative_titles.en;

        //anime photo and url
        const imgElement = document.createElement("img");
        imgElement.src = anime.main_picture.large;
        imgElement.alt = anime.title;

        //add synopsis
        const pElement = document.createElement("p");
        pElement.textContent = anime.synopsis;

        //append
        articleElement.appendChild(h3Element);
        articleElement.appendChild(h4Element);
        articleElement.appendChild(imgElement);
        articleElement.appendChild(pElement);

        animeElement.appendChild(articleElement);

    })
}

//fetch anime list

const getAnimeList = async () => {
    const response = await fetch("https://myanimelist.net/animelist/grdavieee/load.json");

    if (response.ok) {
        animeList = await response.json();
    }
}

const sortBy = function(animeList) {

    let genreFilter = document.getElementById("genre").value;
    let typeFilter = document.getElementById("type").value;
    let statusFilter = document.getElementById("status").value;

    let filteredAnime = animeList.filter((anime) => {
        let genreMatch = genreFilter === anime["genres"].some(genre => genre["name"].includes(genreFilter));
        let typeMatch = typeFilter === anime["anime_media_type_string"].includes(typeFilter);
        let statusMatch = statusFilter === (statusFilter === "finished" ? anime["anime_end_date_string"] !== null : statusFilter === "current" && anime["anime_end_date_string"] === null);
    })


}


//reset function 

const reset = function() {
    animeElement.innerHTML = "";
}

