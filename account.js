// Toggle Form//
var LoginForm = document.getElementById("loginForm");
var RegForm = document.getElementById("regForm");
var Indicator = document.getElementById("indicator")

function register(){
    RegForm.style.transform = "translateX(0px)";
    LoginForm.style.transform = "translateX(0px)";
    Indicator.style.transform = "translateX(100px)";
}
function login(){
    RegForm.style.transform = "translateX(300px)";
    LoginForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0px)";
}

document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c4c4d62844e137b8fb3cc0";

// Login Button
var loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();

        let Name = document.getElementById("Name").value;
        let Password = document.getElementById("Password").value;

        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        };

        fetch("https://fedassgn2-f53d.restdb.io/rest/member", settings)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const matchingUser = data.find(user => user.Name === Name && user.Password === Password);
                if (matchingUser) {
                    window.location.href = "home.html";
                } else {
                    alert('Invalid username or password');
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                alert('Login error: ' + error.message);
            });
    });
} else {
    console.log('Login button not found');
}

// Signup Button
var regBtn = document.getElementById('regBtn');
if (regBtn) {
    regBtn.addEventListener('click', function (e) {
        e.preventDefault()

        // Retrieve form data
        let Name = document.getElementById("regName").value;
        let Email = document.getElementById("regEmail").value;
        let Password = document.getElementById("regPassword").value;

        // Prepare JSON data for the API call
        var jsondata = {
            "Name": Name,
            "Email": Email,
            "Password": Password
        };

        // Define settings for fetch call
        var settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata),
        };
        
        // Make the API call to signup
        fetch("https://fedassgn2-f53d.restdb.io/rest/member", settings) // Ensure this is the correct endpoint
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(response => {
                console.log('Registration successful', response);
                alert('Thank you for registering!');
            })
            .catch(error => {
                console.error('Signup error:', error);
                alert('Signup error: ' + error.message);
            });
    });
} else {
    console.log('Signup button not found');
}
});

