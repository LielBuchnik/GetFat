let mainCont = document.getElementById("container");
let restGrid = document.getElementById("rest-list");
let welcomeU = document.getElementById("welcome-user");
let restList = [];

let xhr = new XMLHttpRequest();
xhr.open("Get", "../data/json/restaurants.json", true);

xhr.onload = function () {
    localStorage.clear("restData");
    localStorage.setItem("restData", this.responseText)
    let response = JSON.parse(this.responseText);
    if (response.Restaurants) {
        restList = response.Restaurants;
        console.log(restList);
        getRests();
    }
    console.log(restList)
};
xhr.send();


welcomeUser()

function welcomeUser(){
    let userD = localStorage.getItem("userDetails")
    userD = JSON.parse(userD);
    welcomeU.innerHTML = `Hey ${userD.username}`
}

function getRests() {
    restGrid.innerHTML ='';
    for (let i = 0; i < restList.length; i++) {
        let rest = restList[i];
        console.log(restList[i])
        restGrid.innerHTML +=
            `<div class="rest-box" onclick="showMore_handler(${i})">
                <img class="rest-image" src="${rest.restImg}">
                <p>${rest.name}</p>
                <p class="rest-type">${rest.type}</p>
                <p class="rest-rating">${rest.rating} <i class='bx bx-star' ></i></p>
                <p class="rest-desc">${rest.description}</p>
                <p class="rest-id">${rest.id}</p>
                </div>`
    }
}


function showMore_handler(index) {
    window.location.href = `../html/restpage.html?id=${index}`
}

function sortByFood(event, foodType) {
    let filteredRestaurants = restList.filter(rest => rest.type === foodType);
    restGrid.innerHTML = "";

    for (let i = 0; i < filteredRestaurants.length; i++) {
        let rest = filteredRestaurants[i];
        restGrid.innerHTML +=
            `<div class="rest-box" onclick="showMore_handler(${i})">
                <img class="rest-image" src="${rest.restImg}">
                <p>${rest.name}</p>
                <p class="rest-type">${rest.type}</p>
                <p class="rest-rating">${rest.rating} <i class='bx bx-star'></i></p>
                <p class="rest-desc">${rest.description}</p>
                <p class="rest-id">${rest.id}</p>
            </div>`;
    }
}