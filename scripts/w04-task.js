/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Gayle Reyna-Davie",
    image: "images/photo.PNG",
    favoriteFoods: [
        "Sinigang",
        "Oysters",
        "Crispy Pork Belly",
        "Garlic Butter Shrimp",
        "Samgyupsal",
        "Red Velvet Cake",
        "Mandarin Chicken"
    ], 
    hobbies: [
        "Cooking",
        "Watching MCU movies and shows",
        "Trekking",
        "Punch Needling"
    ],
    placesLived: [],

};



/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
    {
        place: "Quezon City, Philippines",
        length: "1 year"
    },
    {
        place: "Muntinlupa City, Philippines",
        length: "6 years"
    },
    {
        place: "Dasmarinas City, Philippines",
        length: "13 years"
    },
    {
        place: "Manila, Philippines",
        length: "2 years"
    },
    {
        place: "Butuan, Philippines",
        length: "1.5 years"
    },
    {
        place: "Gympie, Australia",
        length: "1 year"
    },
    {
        place: "Brisbane, Australia ",
        length: "2 years"
    }
);




/* DOM Manipulation - Output */


/* Name */

document.querySelector("#name").textContent = myProfile.name;

/* Photo with attributes */

document.querySelector("#photo").setAttribute("src", myProfile.image);
document.querySelector("#photo").setAttribute("alt", myProfile.name);

/* Favorite Foods List*/

myProfile.favoriteFoods.forEach(food => {
    let listFoods = document.createElement("li");
    listFoods.textContent = food;
    document.querySelector("#favorite-foods").appendChild(listFoods);
});

/* Hobbies List */
myProfile.hobbies.forEach(hobby => {
    let listHobbies = document.createElement("li");
    listHobbies.textContent = hobby;
    document.querySelector("#hobbies").appendChild(listHobbies);
});

/* Places Lived DataList */
myProfile.placesLived.forEach(places => {
    let dtPlaces = document.createElement("dt");
    dtPlaces.textContent = places.place;

    let ddLength = document.createElement("dd");
    ddLength.textContent = places.length;

    document.querySelector("#places-lived").append(dtPlaces, ddLength);
    //document.querySelector("#places-lived").appendChild(dtPlaces);
    //document.querySelector("#places-lived").appendChild(ddLength);


})

