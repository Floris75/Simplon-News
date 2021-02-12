// Faire apparaitre disparaitre le HR de la section MAIN

const mainHR = document.querySelector("main hr");

function notOnMobile () {

    let width = window.innerWidth;
    if (width > 480){
        mainHR.classList.remove("notOnMobile");
    }
    else {
        mainHR.classList.add("notOnMobile");
    }
}

notOnMobile();

window.addEventListener("resize", notOnMobile)

// Version mobile passer de login à sign et l'inverse

const main = document.querySelector("main");
const login = document.getElementById("login");
const signUp = document.getElementById("SignUp");
let button = login.querySelector("a");

function toggleSection () {
    if (login.className.includes("inactive")) {
        login.classList.remove("inactive");
        signUp.classList.add("inactive");
        button = login.querySelector("a");
    }    
    else {
        login.classList.add("inactive");
        signUp.classList.remove("inactive");
        button = signUp.querySelector("a");
    }
    button.addEventListener("click", toggleSection);
}

button.addEventListener("click", toggleSection);

// requete API Login

function loginUser(){
    let email = document.querySelector("#login input[name=email]").value;
    let password = document.querySelector("#login input[name=password]").value;

    let config = {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "email": email,
                "password": password
            }
            // {
            //     "email": "test@test.fr",
            //     "password": "test1234"
            // }
        )
    }

    fetch("https://simplonews.brianboudrioux.fr/users/login", config)
    .then(function(response){
        if(response.status === 400) {
            //alertBox("Erreur sur le password ou l'email")
        }
        else{
            response.json()
            .then(function(data){
                sessionStorage.setItem('token', data.token
                );
                window.location.href = "./static/Views/home.html"
            })
            .catch(function(error) {
                console.log(error);
            })
        }    
    })
    .catch(function(error) {
        console.log(error);
    })
    }

const formLogin = document.querySelector("#login form");
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    loginUser();
});

//Request API Sign Up

function signUpUser() {

    let email = document.querySelector("#SignUp input[name=email]").value;
    let password = document.querySelector("#SignUp input[name=password]").value;
    let firstName = document.querySelector("#SignUp input[name=Prénom]").value;
    let lastName = document.querySelector("#SignUp input[name=nom]").value;

    let config = {
        méthod: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password
            }
        )
    }

    fetch("https://simplonews.brianboudrioux.fr/users", config)
    .then(function(response){
        if(response.status === 400) {
            //alertBox("L'email est déja utilisé.")
        }
        else{
            alert("Votre compte a bien été enregistré. Veuillez vous authentifier par le formulaire Login");
        }
    })
    .catch(function (error){
        console.log(error);
    })
}

const formSignUp = document.querySelector("#SignUp form");
formSignUp.addEventListener("submit", (e) => {
    e.preventDefault();
    signUpUser();
})