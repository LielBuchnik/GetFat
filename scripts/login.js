
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
                    window.location.href = "../html/homepage.html";
                }
            }
        };
        xhr.send();
    }
}

document.getElementById("lgnBtn").addEventListener("click", logIn_handler)