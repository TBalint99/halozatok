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
    if (kerdesek[kerdesSzama].image != "") {
        kep.src = "https://szoft1.comeback.hu/hajo/" + kerdesek[kerdesSzama].image;
    }
    else {
        var eltavolit = document.getElementById("kep");
        eltavolit.remove();
    }
    valasz1.innerText = kerdesek[kerdesSzama].answer1;
    valasz2.innerText = kerdesek[kerdesSzama].answer2;
    valasz3.innerText = kerdesek[kerdesSzama].answer3;
}

function elore() {
    kerdesSorszam++;
}

window.onload = () => {
    console.log("Sikeres betöltés");
    letoltes();
}

console.log(kerdesSorszam);

var eloreLepes = document.getElementById("elore");
eloreLepes.addEventListener("click", elore());
