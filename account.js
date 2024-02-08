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
    const APIKEY = "65c45ce9cca7363819653b97";

// Login Button
var loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();

        let username = document.getElementById("username").value;
        let loginPW = document.getElementById("loginPW").value;

        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        };

        fetch("https://fedasg2-90ed.restdb.io/rest/account", settings)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const matchingUser = data.find(user => user.username === username && user.password === loginPW);
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
var signUpBtn = document.getElementById('regBtn');
if (signUpBtn) {
    signUpBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Retrieve form data
        let regUser = document.getElementById("regUser").value;
        let regEmail = document.getElementById("regEmail").value;
        let regPW = document.getElementById("regPW").value;

        // Prepare JSON data for the API call
        let jsondata = {
            "name": regUser,
            "email": regEmail,
            "password": regPW
        };

        // Define settings for fetch call
        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata),
        };

        // Make the API call to signup
        fetch("https://fedasg2-90ed.restdb.io/rest/account", settings) // Ensure this is the correct endpoint
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