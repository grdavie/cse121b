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
    const response = await fetch("https://run.mocky.io/v3/6cfd6b8a-64f7-4766-8505-8734a7bf15d2");

    if (response.ok) {
        animeList = await response.json();
    }
}

const sortBy = function(animeList) {

    let genreFilter = document.getElementById("genre").value;
    let typeFilter = document.getElementById("type").value;
    let statusFilter = document.getElementById("status").value;

    let filteredAnime = animeList.filter((anime) => {
        let genreMatch = genreFilter === "" || anime["genres"].some(genre => genre["name"].includes(genreFilter));
        let typeMatch = typeFilter === "" || anime["anime_media_type_string"].includes(typeFilter);
        let statusMatch = statusFilter === "" || (statusFilter === "finished" ? anime["anime_end_date_string"] !== null : statusFilter === "current" && anime["anime_end_date_string"] === null);

        return genreMatch && typeMatch && statusMatch;
    });

    //sort the filtered anime by popularity in ascending order (lower popularity score means higher ranking)
    let sortedAnime = filteredAnime.sort((a, b) => {
        return a["anime_popularity"] - b["anime_popularity"];
    });

    //get the 5 anime with lowest popularity score and store their anime_ID values to the animeID array
    animeID = sortedAnime.slice(0,5).map(anime => anime["anime_id"]);


}

// Fetching anime details from MAL endpoint
const apiEndpoint = "https://api.myanimelist.net/v2/anime";
const clientID = "e7e04fc84a4d833963b51c190f76d3ed";

//Async function to fetch and store anime details for each anime ID in the animeID array

const getAnimeDetails = async () => {
    for (const id of animeID) {
        try {
            const response = await fetch(`${apiEndpoint}${id}?fields=id,title,main_picture,alternative_titles,synopsis`, {
                headers: {
                    'X-MAL-CLIENT-ID': clientID,
                },
            });

            if (response.ok) {
                const animeDetails = await response.json();
                recommendationList.push(animeDetails);
            } else {
                console.error(`Failed to fetch anime details for ID ${id}`);
            }
        } catch (error) {
            console.error(`Error fetching anime details for ID ${id}: ${error.message}`);
        }
    }
}


//reset function 

const reset = function() {
    animeElement.innerHTML = "";
};


//generate list function
const generateList = async () => {
    reset();

    sortBy(animeList);

    await getAnimeDetails();

    displayAnime(recommendationList);
};

//run the functions

getAnimeList();

//event listener

document.querySelector("#generate-button").addEventListener("click", generateList);

