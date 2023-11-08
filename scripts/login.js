
const logIn_handler = () => {
    let userName = document.getElementById("username");
    let password = document.getElementById("password");
    if(userName.value == "" || password.value == "")
    {
        alert("Missing Data,  please fill all fields");
    }else{

        let xhr = new XMLHttpRequest();
        xhr.open("Get" , "../../data/users.json" , true);
        xhr.onload = function()
        {
            let response = JSON.parse(this.responseText);
            response = response.users;
            console.log(response);
            for(let x in response)
            {
                let user = response[x];
                if(userName.value == user.userName && password.value == user.password)
                {
                    localStorage.setItem("userDetails" , JSON.stringify(user));
                    window.location.href = "./homePage.html";
                }
            }
        };
        xhr.send();
    }
}

document.getElementById("lgnBtn").addEventListener("click", logIn_handler)