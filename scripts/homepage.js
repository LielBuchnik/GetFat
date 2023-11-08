

let xhr = new XMLHttpRequest();
xhr.open("Get" , "https://jsonplaceholder.typicode.com/users" , true);

xhr.onload = function()
{
    localStorage.setItem("usersData" , this.responseText)
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