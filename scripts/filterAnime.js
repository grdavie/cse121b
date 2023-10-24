//filter anime list
const filterAnime = function(animeList) {

    let genreFilter = document.getElementById("genre").value;
    let typeFilter = document.getElementById("type").value;
    let statusFilter = document.getElementById("status").value;

    return animeList.filter((anime) => {
        
        //return everything if no filter selected or return the anime if the genreFilter is found in one of the genre.name property
        let genreMatch = genreFilter === "" || anime["genres"].some(genre => genre["name"].includes(genreFilter));

        //return everything if no filter selected or return the anime if the typeFilter is found within the anime.anime_media_type_string property
        let typeMatch = typeFilter === "" || anime["anime_media_type_string"].includes(typeFilter);

        //return everything if no filter selected, or return the anime with a non-null end date property as finished; otherwise, anime will be considered current if null end date property
        let statusMatch = statusFilter === "" || (statusFilter === "finished" ? anime["anime_end_date_string"] !== null : statusFilter === "current" && anime["anime_end_date_string"] === null);

        //return anime only if it matches all three filters
        return genreMatch && typeMatch && statusMatch;
    });

};

export { filterAnime };