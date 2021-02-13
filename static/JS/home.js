// MENU MOBILE ET TABLETTE

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const liens = document.querySelectorAll('.menu a');

burger.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
    burger.classList.toggle('burger-cross');
});

liens.forEach((lien) => {
    lien.addEventListener('click', () => {
        menu.classList.remove('menu-open');
        burger.classList.remove('burger-cross');
    });
});

// CHECK LA SESSION STORAGE
function checkLocalStorage () {
    if (!sessionStorage.getItem("token")) {
        redirectionLogin();
    }
}

function redirectionLogin () {
    window.location.href = "../../login.html"
}

window.addEventListener("load", checkLocalStorage());

// RECUPERER LES DONNEES DE L'API
window.addEventListener("load", requestData);

const token = sessionStorage.getItem("token");

function requestData () {
    let config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token
        }
    };
    fetch("https://simplonews.brianboudrioux.fr/articles", config)
    .then (function (response) {
        switch (response.status) {
            case 403:
                sessionStorage.removeItem("token");
                redirectionLogin();
                break;
            case 200:
                extractData(response);
                break;
            default:
                break;
        }
    })
    .catch (function (error) {
        console.log(error);
        alert("Une erreur serveur est survenue. Veuillez réesayer ultérieurement." );
    })
}

function extractData(data) {
    data.json()
    .then(function (object) {
        articlesTreatment(object.articles);
    })
    .catch(function(error) {
        console.log(error);
    })
}

function articlesTreatment (array) {
    const laUne = document.getElementById("Une");
    const direct = document.getElementById("Direct");
    const divers = document.getElementById("divers"); 

    laUne.innerHTML = `
    <img src="${array[array.length-1].img}" alt="Photo de l'article" class="${array[array.length-1].id}">
    <figcaption class="${array[array.length-1].id}"><h2>Info du jour</h2> ${array[array.length-1].title} </figcaption>`
    
    direct.innerHTML = `
    <h2>// Direct //</h2>
    <h3 class="${array[array.length-2].id}">${array[array.length-2].title} </h3>
    <hr>
    <h3 class="${array[array.length-3].id}">${array[array.length-3].title} </h3>
    <hr>
    <h3 class="${array[array.length-4].id}">${array[array.length-4].title} </h3>
    <hr>
    `
    
    divers.innerHTML = ``;
    let count = 0;
    for (let i = array.length-5; i >= 0; i--) {
        if (count === 6) {
            return count;
        }
        else {
            
            if (array[i].title==="Un super title" || array[i].title==="Découvrez la nouvelle formation Apple!"){
                continue;
            }
            else {

                count ++
                divers.innerHTML += `
                <div>
                <figure> <img src="${array[i].img}" alt="Photo de l'article" class="${array[i].id}">
                </figure>
                <figcaption class="${array[i].id}">
                ${array[i].title}
                </figcaption>
                </div>
                `
            }
        }
        articleClicked();
    }
}

// Eventlistener pour la redirection vers la page article

function articleClicked() {
    const image = document.querySelectorAll("figure img");
    const figcaption = document.querySelectorAll("figcaption");
    const titleDirect = document.querySelectorAll("#Direct h3");

    image.forEach( function (image) {
        image.addEventListener("click", function (){
            sessionStorage.removeItem("id");
            sessionStorage.setItem("id", image.classList.value);
            redirectionArticle();
        })
    })

    figcaption.forEach( function (figcaption) {
        figcaption.addEventListener("click", function (){
            sessionStorage.removeItem("id");
            sessionStorage.setItem("id", figcaption.classList.value);
            redirectionArticle();
        })
    })
    
    titleDirect.forEach( function (titleDirect) {
        titleDirect.addEventListener("click", function (){
            sessionStorage.removeItem("id");
            sessionStorage.setItem("id", titleDirect.classList.value);
            redirectionArticle();
        })
    })
}

function redirectionArticle () {
    window.location.href = "./article.html"
}