const getPopularAnime = function(sortedList, animeList) {
    if (sortedList.length === 0) { //do nothing if list is empty
        return sortedList;
    } else {
        return sortedList.slice(0, Math.min(5, animeList.length)); //return 5 elements, or all elements if less than 5
    }

};

export { getPopularAnime };