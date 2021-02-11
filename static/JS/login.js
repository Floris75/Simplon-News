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