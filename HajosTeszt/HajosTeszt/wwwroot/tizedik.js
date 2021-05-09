var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1; 

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

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kerdesBetoltes(nextQuestion, i);
        nextQuestion++;
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
    helyesValasz = kerdes.correctAnswer;

    var elsoValasz = document.getElementById("valasz1");
    elsoValasz.classList.remove("jo", "rossz");
    elsoValasz.addEventListener("click", function () {
        if (helyesValasz === 1) {
            elsoValasz.classList.add("jo");
            kerdes.goodAnswers++;
        }
        else {
            elsoValasz.classList.add("rossz");
            kerdes.goodAnswers = 0;
        }
    })

    var masodikValasz = document.getElementById("valasz2");
    masodikValasz.classList.remove("jo", "rossz");
    masodikValasz.addEventListener("click", function () {
        if (helyesValasz === 2) {
            masodikValasz.classList.add("jo");
            kerdes.goodAnswers++;
        }
        else {
            masodikValasz.classList.add("rossz");
            kerdes.goodAnswers = 0;
        }
    })

    var harmadikValasz = document.getElementById("valasz3");
    harmadikValasz.classList.remove("jo", "rossz");
    harmadikValasz.addEventListener("click", function () {
        if (helyesValasz === 3) {
            harmadikValasz.classList.add("jo");
            kerdes.goodAnswers++;
        }
        else {
            harmadikValasz.classList.add("rossz");
            kerdes.goodAnswers = 0;
        }
    })

    alert(kerdes.goodAnswers);

    if (kerdes.goodAnswers == 3) {
        nextQuestion = displayedQuestion;
        nextQuestion++;
    }
}

var eloreLepes = document.getElementById("elore");
eloreLepes.addEventListener("click", function () {
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

window.onload = () => {
    console.log("Sikeres betöltés");
    init();
    kerdesMegjelenites();
}