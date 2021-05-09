
var kerdesSorszam = 1;
var helyesValasz;

function kerdesBetoltes(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kerdesMegjelenites(data));
} 

function kerdesMegjelenites(kerdes) {

    if (!kerdes) return;
    console.log(kerdes);
    document.getElementById("kerdes_szoveg").innerText = kerdes.questionText
    document.getElementById("valasz1").innerText = kerdes.answer1
    document.getElementById("valasz2").innerText = kerdes.answer2
    document.getElementById("valasz3").innerText = kerdes.answer3
    document.getElementById("kep1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;

    //itt kezeljük le, hogy eltűntesse a blokkot, ha nincs kép, és visszategye, ha van
    var kepDiv = document.getElementById("kep");
    if (kerdes.image != "") {
        if (kepDiv.style.display == "none") {
            kepDiv.style.display = "block";
        }
        kep.src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
    }
    else {
        kepDiv.style.display = "none";
    }

    //válaszok helyességének jelölése
    helyesValasz = kerdes.correctAnswer;

    var elsoValasz = document.getElementById("valasz1");
    elsoValasz.classList.remove("jo", "rossz");
    elsoValasz.addEventListener("click", function () {
        if (helyesValasz === 1) {
            elsoValasz.classList.add("jo");
        }
        else {
            elsoValasz.classList.add("rossz");
        }
    })

    var masodikValasz = document.getElementById("valasz2");
    masodikValasz.classList.remove("jo", "rossz");
    masodikValasz.addEventListener("click", function () {
        if (helyesValasz === 2) {
            masodikValasz.classList.add("jo");
        }
        else {
            masodikValasz.classList.add("rossz");
        }
    })

    var harmadikValasz = document.getElementById("valasz3");
    harmadikValasz.classList.remove("jo", "rossz");
    harmadikValasz.addEventListener("click", function () {
        if (helyesValasz === 3) {
            harmadikValasz.classList.add("jo");
        }
        else {
            harmadikValasz.classList.add("rossz");
        }
    })
}


window.onload = () => {
    console.log("Sikeres betöltés");
    kerdesBetoltes(kerdesSorszam);
}

var eloreLepes = document.getElementById("elore");
eloreLepes.addEventListener("click", function () {

    kerdesSorszam++;
    kerdesBetoltes(kerdesSorszam);
});

var visszaLepes = document.getElementById("vissza");
visszaLepes.addEventListener("click", function () {

    kerdesSorszam--;
    kerdesBetoltes(kerdesSorszam);
});

