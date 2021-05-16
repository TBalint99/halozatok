var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1; 

document.addEventListener("DOMContentLoaded", () => {
    for (var i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kerdesBetoltes(nextQuestion, i);
        nextQuestion++;
    }

    //Kérdések száma
    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //Mentett állapot olvasása
    if (localStorage.getItem("hotList")) {
        hotList = localStorage.getItem("hotList");
    }
    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = localStorage.getItem("displayedQuestion");
    }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = localStorage.getItem("nextQuestion");
    }

    if (hotList.length === 0) {
        for (var i = 0; i < questionsInHotList; i++) {
            kerdesBetoltes(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        console.log("localStorage-ból olvasott adatokkal dolgozunk");
        kerdesMegjelenites();
    }
});

function kerdesBetoltes(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kerdesMegjelenites();
                }
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }
}

function kerdesMegjelenites() {
    let kerdes = hotList[displayedQuestion].question;

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
    for (var i = 1; i <= 3; i++) {
        document.getElementById("valasz" + i).classList.remove("jo", "rossz");
    }

    //engedélyezzük a pointerEvent-et
    document.getElementById("valaszok").style.pointerEvents = "auto";

    if (kerdes.goodAnswers == 3) {
        nextQuestion = displayedQuestion;
        nextQuestion++;
    }
}

var eloreLepes = document.getElementById("elore");
eloreLepes.addEventListener("click", function () {
    clearTimeout(timeHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites()
});

var visszaLepes = document.getElementById("vissza");
visszaLepes.addEventListener("click", function () {
    displayedQuestion--;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites()
});

function valasztas(n) {
    let kerdes = hotList[displayedQuestion].question;

    if (n == kerdes.correctAnswer) {
        document.getElementById("valasz" + n).classList.add("jo");
        hotList[displayedQuestion].goodAnswers++;

        if (hotList[displayedQuestion].goodAnswers == 3) {
            kerdesBetoltes(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("valasz" + n).classList.add("rossz");
        document.getElementById("valasz" + kerdes.correctAnswer).classList.add("jo");
    }

    document.getElementById("valaszok").style.pointerEvents = "none";

    var timeHandler = setTimeout(eloreLepes);

    //változók tárolása localStorage-ban
    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", JSON.stringify(displayedQuestion));
    localStorage.setItem("nextQuestion", JSON.stringify(nextQuestion));
}