let mainCont = document.getElementById("container");
let foodList = document.getElementById("foodList");
let welcomeU = document.getElementById("welcome-user");
let restTitle = document.getElementById("foodTitle");
let cart = document.getElementById("order-container");
let total = document.getElementById("total-price");
let cartItems = [];


let queryParams = window.location.search;
let query = new URLSearchParams(queryParams);
let id = query.get('id');

let allRests = localStorage.getItem('restData');
allRests = JSON.parse(allRests);
console.log(allRests);

getFood();


welcomeUser()

function welcomeUser() {
    let userD = localStorage.getItem("userDetails")
    userD = JSON.parse(userD);
    if(userD){
        welcomeU.innerHTML = `Hey ${userD.username}, Ready to Order?`
    }else{
        welcomeU.innerHTML = `<span>Welcome Guest, Please <a href="../html/login.html">Sign In</a></span>`
    }
}

function getFood() {
    for (let i = 0; i < allRests.Restaurants.length; i++) {
        let rest = allRests.Restaurants[i];
        if (rest.id.toString() === id) {
            console.log(allRests.Restaurants[i]);
            for (let j = 0; j < rest.food.length; j++) {
                let food = rest.food[j];
                foodList.innerHTML += `<div class="foodBox" onclick="addToCart('${food.poster}', '${food.title}', '${food.price}')">
                <img class="food-image" src="${food.poster}"</img>
                    <p class="rest-rating">${food.title}</p>
                    <div class="food-desc">${food.description}</div>
                    <p class="prod-price">${food.price}$</p>
                    </div>`;
            }
            restTitle.innerHTML = `${rest.name}'s Menu`
        }
    }
}


function addToCart(poster ,name, price) {
    cartItems.push({ poster, name, price });
    console.log(cartItems)
    orderUpdate(cartItems);
}

function orderUpdate(foodItems) {
    cart.innerHTML = "";
    let totalPrice = 0;

    for (let i = 0; i < foodItems.length; i++) {
        let food = foodItems[i];
        cart.innerHTML += `<div class="food-list-cart">
            <span class='cart-food-title'> ${food.name} </span>
            <span class='cart-food-price'> ${food.price}$ </span>
            </div>`;
            totalPrice += parseFloat(food.price);
    }

    total.innerHTML = "<div>Total Price: $" + totalPrice.toFixed(2) + "</div>";

}