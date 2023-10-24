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

export { filterAnime };