/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = "Gayle Reyna-Davie";
let currentYear = "2023";
let profilePicture = "images/photo.PNG";


/* Step 3 - Element Variables */
const nameElement = document.getElementById("name");
const foodElement = document.getElementById("food");
let yearElement = document.querySelector("#year");
let imageElement = document.querySelector("img");


/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = `${currentYear}`;
imageElement.setAttribute("src", profilePicture);
imageElement.setAttribute("alt", `Profile image of ${fullName}`);





/* Step 5 - Array */
let favoriteFood = ["Sinigang", "Oysters", "Crispy Pork Belly", "Garlic Butter Shrimp", "Samgyupsal", "Red Velvet Cake", "Mandarin Chicken"]; //step 5.1
foodElement.innerHTML = `${favoriteFood}`; //step 5.2
let anotherFood = "Macadamias"; //step 5.3
favoriteFood.push(anotherFood); //step 5.4
foodElement.innerHTML += `<br>${favoriteFood}`; //step 5.5
favoriteFood.shift();
foodElement.innerHTML += `<br>${favoriteFood}`;
favoriteFood.pop();
foodElement.innerHTML += `<br>${favoriteFood}`;







