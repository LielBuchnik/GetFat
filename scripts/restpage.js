let mainCont = document.getElementById("container");
let foodList = document.getElementById("foodList");

let queryParams = window.location.search;
let query = new URLSearchParams(queryParams);
let id = query.get('id');

let allRests = localStorage.getItem('restData');
allRests = JSON.parse(allRests);
console.log(allRests);

getFood();

function getFood() {
    for (let i = 0; i < allRests.Restaurants.length; i++) {
        let rest = allRests.Restaurants[i];
        if (rest.id.toString() === id) {
            console.log(allRests.Restaurants[i]);
            for (let j = 0; j < rest.food.length; j++) {
                let food = rest.food[j];
                foodList.innerHTML += `<div>
                    <img class="rest-image" src="${food.poster}"</img>
                    <p>${food.title}</p>
                    <p>${food.description}</p>
                    <p>${food.price}</p>
                </div>`;
            }
        }
    }
}
