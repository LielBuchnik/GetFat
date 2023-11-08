let mainCont = document.getElementById("container");
let restGrid = document.getElementById("rest-list");
let restList = [];

let xhr = new XMLHttpRequest();
xhr.open("Get", "../data/json/restaurants.json", true);

xhr.onload = function () {
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


function getRests() {
    for (let i = 0; i < restList.length; i++) {
        let rest = restList[i];
        console.log(restList[i])
        restGrid.innerHTML +=
            `<div class="rest-box">
                <img class="rest-image" src="${rest.restImg}">
                <p>${rest.name}</p>
                <p class="rest-title">${rest.title}</p>
                <p class="rest-type">${rest.type}</p>
                <p class="rest-rating">${rest.rating}</p>
                </div>`
    }
}



function showMore_handler(index) {
    window.location.href = `../pages/userPage.html?id=${index + 1}`
}