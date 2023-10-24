
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

export { sortByPopularity };