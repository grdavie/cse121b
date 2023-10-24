//declare and initialize global variables

const animeElement = document.querySelector("#recommendations");
let animeList = []; //store all the anime from MAL user's anime list
let recommendationList = []; //store the json information for the filtered, and sorted popular list

//build anime display card for each item in the recommendation list

const displayAnime = (animeResult) => {
    animeResult.forEach(anime => {

        const articleElement = document.createElement("article");

        //display anime name
        const h3Element = document.createElement("h3");
        h3Element.textContent = anime.anime_title;


        //display alternative title (english name) if it's not the same as the anime title
        const h4Element = document.createElement("h4");
        if(anime.anime_title !== anime.anime_title_eng && anime.anime_title_eng !== "") {
            h4Element.textContent = `English/Alternative Title: ${anime.anime_title_eng}`;
        }
    
        //anime photo and url
        const imgElement = document.createElement("img");
        imgElement.src = anime.anime_image_path;
        imgElement.alt = anime.anime_title;
        
        //add a link to open anime url when img is clicked - synopsis can then be read through the MAL page
        imgElement.addEventListener("click", function() {
            window.open(`https://myanimelist.net${anime.anime_url}`, `_blank`);
        });

        //no longer adding synopsis because authroisation kept failing
        //adding show raiting and release date instead
        const pElement = document.createElement("p");
        pElement.innerHTML = `MPAA Rating: ${anime.anime_mpaa_rating_string} | Release Date: ${anime.anime_start_date_string} <br><br> Popularity Rank: ${anime.anime_popularity}`

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
    const response = await fetch("https://grdavie.github.io/cse121b/json/animelist.json");

    if (response.ok) {
        animeList = await response.json();
    }
}

//filter anime list
const filterAnime = function(animeList) {

    let genreFilter = document.getElementById("genre").value;
    let typeFilter = document.getElementById("type").value;
    let statusFilter = document.getElementById("status").value;

    return animeList.filter((anime) => {
        let genreMatch = genreFilter === "" || anime["genres"].some(genre => genre["name"].includes(genreFilter));
        let typeMatch = typeFilter === "" || anime["anime_media_type_string"].includes(typeFilter);
        let statusMatch = statusFilter === "" || (statusFilter === "finished" ? anime["anime_end_date_string"] !== null : statusFilter === "current" && anime["anime_end_date_string"] === null);

        return genreMatch && typeMatch && statusMatch;
    });

};

//sort the filtered anime by popularity in ascending order (lower popularity score means higher ranking)
const sortByPopularity = function(filteredAnime) {

    if (filteredAnime.length > 0) {
        return filteredAnime.sort((a, b) => {
            return a["anime_popularity"] - b["anime_popularity"];
        });    
    } else {
        return filteredAnime;
    }    
    
};

const getPopularAnime = function(sortedList) {
    if (sortedList.length === 0) {
        return sortedList;
    } else {
        return sortedList.slice(0, Math.min(5, animeList.length));
    }

};


//reset function 

const reset = function() {
    animeElement.innerHTML = "";
};

//empty list function

const emptyList = function(list) {
    list.length = 0;
};


//generate list function
const generateList = function() {

    reset();
    emptyList(recommendationList);

    let filteredAnime = filterAnime(animeList);
    let sortedAnime = sortByPopularity(filteredAnime);

    if (sortedAnime.length === 0){
        reset();
        animeElement.textContent = `No match found`;
    } else {
        recommendationList = getPopularAnime(sortedAnime);
    };

};

//generate button function 
const generateButton = function () {
    
    reset();
    generateList();

    displayAnime(recommendationList);
}

//run the functions

getAnimeList();

//event listener

document.querySelector("#generate-button").addEventListener("click", generateButton);

