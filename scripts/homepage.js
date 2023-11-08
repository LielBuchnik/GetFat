let xhr = new XMLHttpRequest();
xhr.open("Get" , "../data/json/restaurants.json" , true);

xhr.onload = function()
{
    localStorage.setItem("restData" , this.responseText)
    let response = JSON.parse(this.responseText);
    for(let x in response)
    {
        let obj = response[x];
        let html = `
        <ul class="userCard">
            <li>${obj.id}</li>
            <li>${obj.name}</li>
            <li>${obj.username}</li>
            <li>${obj.email}</li>
            <button onclick="showMore_handler(${x})">Show More Content</button>
        </ul>
        `
        $("#container").append(html);
    }

   
};
xhr.send();

function showMore_handler(index)
{
    window.location.href = `../pages/userPage.html?id=${index+1}`
}