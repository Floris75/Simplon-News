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

// REQUEST API LOGIN

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
        )
    }

    fetch("https://simplonews.brianboudrioux.fr/users/login", config)
    .then(function(response){
        if(response.status === 400) {
            alert("Le mot de passe et/ou l'email sont incorrect.");
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
    checkLoginForm();
});

// REQUEST API SIGN UP

function signUpUser() {

    let email = document.querySelector("#SignUp input[name=email]").value;
    let password = document.querySelector("#SignUp input[name=password]").value;
    let firstName = document.querySelector("#SignUp input[name=Prénom]").value;
    let lastName = document.querySelector("#SignUp input[name=nom]").value;

    let config_fetch = {
        method: "POST",
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

    fetch("https://simplonews.brianboudrioux.fr/users", config_fetch)
    .then(function(response){
        if(response.status === 400) {
            alert("L'email est déja utilisé.");
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
    checkSignUpForm();
})

// GESTION ERREUR FORMULAIRE

function checkLoginForm () {
    let email = document.querySelector("#login input[name=email]").value;
    let password = document.querySelector("#login input[name=password]").value;
    let emailValid = false;
    let passwordValid = false;

    // CHECK DE L'EMAIL
    const erreur1 = document.getElementById("loginError1");
    if (email === null || email === "") {
        erreur1.classList.remove("erreurInactive");
        emailValid=false;
    }
    else {
        emailValid=true;
    }

    // TEST DU FORMAT DE L'EMAIL

    const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if (!(regex.test(email))){
        erreur1.classList.remove("erreurInactive");
        emailValid=false;
    }
    else {
        emailValid=true
    }

    // CHECK DU PASSWORD

    const erreur2 = document.getElementById("loginError2");

    if (password === null || password === "") {
        erreur2.classList.remove("erreurInactive");
    }
    else {
        passwordValid=true;
    }

    // TEST LONGUEUR PASSWORD

    if (password.length < 8){
        erreur2.classList.remove("erreurInactive");
    }
    else {
        passwordValid=true;
    }

    if (emailValid && passwordValid){
        loginUser();
    }
    erreur1.addEventListener("click", function(){
        erreur1.classList.add("erreurInactive");
    })
    erreur2.addEventListener("click", function(){
        erreur2.classList.add("erreurInactive");
    })
}

function checkSignUpForm () {
    let email = document.querySelector("#SignUp input[name=email]").value;
    let password = document.querySelector("#SignUp input[name=password]").value;
    let firstName = document.querySelector("#SignUp input[name=Prénom]").value;
    let lastName = document.querySelector("#SignUp input[name=nom]").value;
    let emailValid = false;
    let passwordValid = false;
    let firstNameValid = false;
    let lastNameValid = false;

    // CHECK DU NOM
    const erreur1 = document.getElementById("signUpError1");
    if (lastName === null || lastName === "") {
        erreur1.classList.remove("erreurInactive");
        lastNameValid=false;
    }
    else {
        lastNameValid=true;
    }

    // TEST DU FORMAT DU NOM

    const regexNom = /([a-zA-Z]+)/;
    if (!(regexNom.test(lastName))){
        erreur1.classList.remove("erreurInactive");
        lastNameValid=false;
    }
    else {
        lastNameValid=true 
    }

    // CHECK DU PRENOM
    const erreur2 = document.getElementById("signUpError2");
    if (firstName === null || firstName === "") {
        erreur2.classList.remove("erreurInactive");
        firstNameValid=false;
    }
    else {
        firstNameValid=true;
    }

    // TEST DU FORMAT DU PRENOM

    const regexPrenom = /([a-zA-Z]+)/;
    if (!(regexPrenom.test(firstName))){
        erreur2.classList.remove("erreurInactive");
        firstNameValid=false;
    }
    else {
        firstNameValid=true
    }

    // CHECK DE L'EMAIL

    const erreur3 = document.getElementById("signUpError3");
    if (email === null || email === "") {
        erreur3.classList.remove("erreurInactive");
        emailValid=false;
    }
    else {
        emailValid=true;
    }

    // TEST DU FORMAT DE L'EMAIL

    const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if (!(regex.test(email))){
        erreur3.classList.remove("erreurInactive");
        emailValid=false;
    }
    else {
        emailValid=true 
    }

    // CHECK DU PASSWORD

    const erreur4 = document.getElementById("signUpError4");

    if (password === null || password === "") {
        erreur4.classList.remove("erreurInactive");
    }
    else {
        passwordValid=true;
    }

    // TEST LONGUEUR PASSWORD

    if (password.length < 8){
        erreur4.classList.remove("erreurInactive");
    }
    else {
        passwordValid=true;
    }

    if (lastNameValid && firstNameValid && emailValid && passwordValid){
        SignUpUser();
    }
    erreur1.addEventListener("click", function(){
        erreur1.classList.add("erreurInactive");
    })
    erreur2.addEventListener("click", function(){
        erreur2.classList.add("erreurInactive");
    })
    erreur3.addEventListener("click", function(){
        erreur3.classList.add("erreurInactive");
    })
    erreur4.addEventListener("click", function(){
        erreur4.classList.add("erreurInactive");
    })
}