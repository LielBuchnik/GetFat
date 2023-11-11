let mainCont = document.getElementById("container");
let foodList = document.getElementById("foodList");
let welcomeU = document.getElementById("welcome-user");
let restTitle = document.getElementById("foodTitle");
let cart = document.getElementById("order-container");
let total = document.getElementById("total-price");
let orderBtn = document.getElementById("order-button");
let cartItems = [];


    // Log In Popup
    let loginPopup = document.getElementById("login-popup");
    let loginMenu = document.getElementById("login-mainMenu");
    let loginButton = document.getElementById("login-button");
    let closeButtonlogin = document.getElementById("close-button-login");
    let popContainer = document.getElementById("pop-container");
    let containerElement = document.getElementById("rest-page-container");

    function loginPop(){
        loginPopup.style.display = "block";
        popContainer.style.display = "block"
        loginPopup.style.transition = "0.3s"
        containerElement.style.filter = "blur(5px)";
        containerElement.style.transition = "0.3s"
    };

loginButton.addEventListener("click", function () {
    logIn_handler();
});


const logIn_handler = () => {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    if(username.value == "" || password.value == "")
    {
        alert("Missing Data,  please fill all fields");
    }else{

        let xhr = new XMLHttpRequest();
        xhr.open("Get" , "../data/json/users.json" , true);
        xhr.onload = function()
        {
            let response = JSON.parse(this.responseText);
            response = response.users;
            console.log(response);
            for(let x in response)
            {
                let user = response[x];
                if(username.value == user.username && password.value == user.password)
                {
                    localStorage.setItem("userDetails" , JSON.stringify(user));
                    history.go()
                }
            }
        };
        xhr.send();
    }
}

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
    if (userD) {
        welcomeU.innerHTML = `Hey ${userD.username}, Ready to Order?`
    } else {
        welcomeU.innerHTML = `<span>Welcome Guest, Please <a href="../html/login.html">Sign In</a></span>`
    }
}

function getFood() {
    let userD = localStorage.getItem("userDetails")
    if(!userD){
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
        loginPop()

    }else{
       
    
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
}


addToCart = (poster, name, price) => {
    cartItems.push({ poster, name, price });
    console.log(cartItems)
    orderUpdate();
}

orderUpdate = () => {
    cart.innerHTML = "";
    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
        let food = cartItems[i];
        cart.innerHTML += `<div class="food-list-cart">
            <i class='bx bx-x' onclick="removeItem(${i})"></i>
            <span class='cart-food-title'> ${food.name} </span>
            <span class='cart-food-price'> ${food.price}$ </span>
            </div>`;
        totalPrice += Number(food.price);
    }
    total.innerHTML = "<div>Total Price: $" + totalPrice + "</div>";
}

removeItem = (index) => {
    cartItems.splice(index, 1)
    orderUpdate()
}

orderBtn.addEventListener('click', switchText);

async function switchText() {
        await delay(1200)
        orderBtn.innerHTML = `Thank You For Ordering`;
        orderBtn.style.transition = 'all 5s ease-in 3.5s';
}

logOut = () => {
    localStorage.clear();
    window.location.href = "../html/login.html";
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}