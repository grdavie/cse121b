/* W05: Programming Tasks */

/* Declare and initialize global variables */

const templesElement = document.querySelector("#temples");
let templeList = [];

/* async displayTemples Function */
//build temple display card for each item in the temple list

const displayTemples = (temples) => {
    temples.forEach(temple => {

        //Create <article> element
        const articleElement = document.createElement("article");

        //create <h3> element and add templeName
        const h3Element = document.createElement("h3");
        h3Element.textContent = temple.templeName;

        //create an <img> element and add imageUrl
        const imgElement = document.createElement("img");
        imgElement.src = temple.imageUrl;
        imgElement.alt = temple.location;

        //step 4 - append h3 and img to article as children
        articleElement.appendChild(h3Element);
        articleElement.appendChild(imgElement);

        //step 5 - append article to templesElement
        templesElement.appendChild(articleElement);

        
    });

}



/* async getTemples Function using fetch()*/
const getTemples = async () => {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    
    if(response.ok) {
        templeList = await response.json();    
    }

    displayTemples(templeList);
   
}

/* reset Function */

const reset = function() {
    templesElement.innerHTML = "";
}

/* sortBy Function */

const sortBy = function(temples) {
    reset();

    let filter = document.getElementById("sortBy").value;

    switch (filter) {
        case "utah":
            displayTemples(temples.filter(temple => temple.location.includes("Utah")));
            break;
        
        case "notutah":
            displayTemples(temples.filter(temple => !temple.location.includes("Utah")));
            break;
        
        case "older":
            displayTemples(temples.filter(temple => new Date(temple.dedicated) < new Date (1950, 0, 1)));
            break;

        case "all":
            displayTemples(temples);   
        }
}


getTemples();

/* Event Listener */

document.querySelector("#sortBy").addEventListener("change", () => { sortBy(templeList) });
