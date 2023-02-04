"use strict";

let dadoBoton = document.getElementById("dadoBoton");
let valoresInput = document.getElementById("valores");

let valores = [];

function dado() {
    let result = "";

    for (let i = 0; i < 7; i++) {
        valores.push(Math.floor(Math.random() * (8 - 1 + 1) + 1));
        //result += Math.floor(Math.random() * (8 - 1 + 1) + 1) + (i === 6 ? "" : ", ");
    }

    valoresInput.value = valores.toString();
    dadoBoton.disabled = "disabled";
}

