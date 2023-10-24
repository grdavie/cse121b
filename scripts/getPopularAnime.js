const getPopularAnime = function(sortedList, animeList) {
    if (sortedList.length === 0) {
        return sortedList;
    } else {
        return sortedList.slice(0, Math.min(5, animeList.length));
    }

};

export { getPopularAnime };