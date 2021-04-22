
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

    helyesValasz = kerdes.correctAnswer;
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

//var elsoDiv = document.getElementById("valasz1");
//elsoDiv.addEventListener("click", function () {

//    if (helyesValasz == 1) {
//        elsoDiv.style.backgroundColor = "green";
//    }
//    else {
//        elsoDiv.style.backgroundColor = "red";
//    }
//})
