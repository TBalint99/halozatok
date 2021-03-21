var faktoriálisR = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * faktoriálisR(n - 1)
    }
}

window.onload = () => {
    console.log("betöltődött")

    for (var sor = 0; sor < 10; sor++) {
        var ujSor = document.createElement("div")
        ujSor.classList.add("sor")
        document.getElementById("pascal").appendChild(ujSor);

        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            var ujElem = document.createElement("div");
            ujElem.classList.add("elem");
            ujElem.classList.add("doboz");
            ujElem.innerText = faktoriálisR(sor) / (faktoriálisR(oszlop) * faktoriálisR(sor - oszlop));
            ujElem.style.color = `rgb(0, 0, ${255 - (255 / 10 * ujElem.innerText) })`
            ujSor.appendChild(ujElem);
        }
    }
}