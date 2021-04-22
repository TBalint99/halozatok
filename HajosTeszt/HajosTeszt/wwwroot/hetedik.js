var kerdesek;
var kerdesSorszam = 0;

function letoltes() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letoltesBefejezodott(data));
}

function letoltesBefejezodott(d) {
    console.log("Sikeres letöltés");
    console.log(d);
    kerdesek = d;
    kerdesMegjelenites(kerdesSorszam);
}

var kerdesMegjelenites = function (kerdesSzama) {

    let kerdes_szoveg = document.getElementById("kerdes_szoveg");
    let kep = document.getElementById("kep1");
    let valasz1 = document.getElementById("valasz1");
    let valasz2 = document.getElementById("valasz2");
    let valasz3 = document.getElementById("valasz3");

    kerdes_szoveg.innerHTML = kerdesek[kerdesSzama].questionText;

    var kepDiv = document.getElementById("kep");
    if (kerdesek[kerdesSzama].image != "") {
        if (kepDiv.style.display == "none") {
            kepDiv.style.display = "block";
        }
        kep.src = "https://szoft1.comeback.hu/hajo/" + kerdesek[kerdesSzama].image;
    }
    else {
        kepDiv.style.display = "none";
    }

    valasz1.innerText = kerdesek[kerdesSzama].answer1;
    valasz2.innerText = kerdesek[kerdesSzama].answer2;
    valasz3.innerText = kerdesek[kerdesSzama].answer3;
}


window.onload = () => {
    console.log("Sikeres betöltés");
    letoltes();
}

var eloreLepes = document.getElementById("elore");
eloreLepes.addEventListener("click", function () {

    kerdesSorszam++;

    if (kerdesSorszam > 2) {
        kerdesSorszam = 0;
    }

    letoltes();
});

var visszaLepes = document.getElementById("vissza");
visszaLepes.addEventListener("click", function () {

    kerdesSorszam--;

    if (kerdesSorszam < 0) {
        kerdesSorszam = 2;
    }

    letoltes();
});
