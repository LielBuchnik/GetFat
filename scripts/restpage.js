let mainCont = document.getElementById("container");
let foodList = document.getElementById("foodList");
let welcomeU = document.getElementById("welcome-user");
let cartItems = [];


let queryParams = window.location.search;
let query = new URLSearchParams(queryParams);
let id = query.get('id');

let allRests = localStorage.getItem('restData');
allRests = JSON.parse(allRests);
console.log(allRests);

getFood();


welcomeUser()

function welcomeUser(){
    let userD = localStorage.getItem("userDetails")
    userD = JSON.parse(userD);
    welcomeU.innerHTML = `Hey ${userD.username}, Ready to Order?`
}

function getFood() {
    for (let i = 0; i < allRests.Restaurants.length; i++) {
        let rest = allRests.Restaurants[i];
        if (rest.id.toString() === id) {
            console.log(allRests.Restaurants[i]);
            for (let j = 0; j < rest.food.length; j++) {
                let food = rest.food[j];
                foodList.innerHTML += `<div class="foodBox" onclick="addToCart(${food.title, food.price})">
                <img class="food-image" src="${food.poster}"</img>
                    <p class="rest-rating">${food.title}</p>
                    <div class="food-desc">${food.description}</div>
                    <p class="prod-price">${food.price}$</p>
                    </div>`;
            }
        }
    }
}


function addToCart(product){

    cartItems.push(product);
    console.log(cartItems)
}