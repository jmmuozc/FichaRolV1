"use strict";

let dadoBoton = document.getElementById("dadoBoton");
let valoresInput = document.getElementById("valores");

let sumaDiv = document.getElementById("sumaDiv");
let sumaSpan = document.getElementById("sumaSpan");

let fueSelect = document.getElementById("fueSelect");
let desSelect = document.getElementById("desSelect");
let conSelect = document.getElementById("conSelect");
let carSelect = document.getElementById("carSelect");
let intSelect = document.getElementById("intSelect");
let sabSelect = document.getElementById("sabSelect");

let valores = [];
function dado() {
    generarValores();
    generarSuma();

    rellenarValoresSelec();
    rellenarSelects();
}

function generarValores() {
    valores = [];
    for (let i = 0; i < 7; i++) {
        valores.push(Math.floor(Math.random() * (8 - 1 + 1) + 1));
    }
    valores.sort((a, b) => {
        return a - b;
    })
    valoresInput.value = valores.toString();
}

function generarSuma() {
    valores.splice(0, 1);
    let suma = valores.reduce((a, b) => a + b);
    sumaDiv.hidden = "";
    sumaSpan.innerText = suma;

    if (suma > 23) {
        dadoBoton.disabled = "disabled";
    }
}

let valoresSeleccionados = [
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
];

function rellenarValoresSelec() {
    for (let i = 0; i < valoresSeleccionados.length; i++) {
        valoresSeleccionados[i][0] = valores[i];
        valoresSeleccionados[i][1] = -1;
    }
}

function rellenarSelects() {
    let selects = document.getElementsByClassName("attrSelect");

    for (let i = 0; i < selects.length; i++) {
        let emptyOption = document.createElement("option");
        emptyOption.value = "";

        selects[i].innerHTML = "";
        selects[i].appendChild(emptyOption);

        for (let e = 0; e < valoresSeleccionados.length; e++) {
            let option = document.createElement("option");
            option.value = valoresSeleccionados[e][0];
            option.innerText = valoresSeleccionados[e][0];

            if (valoresSeleccionados[e][1] != -1) {
                //option.disabled = true;
                option.className = "bg-danger text-white";
            } else {
                option.className = "bg-success text-white";
            }
            if (valoresSeleccionados[e][1] === i) {
                option.selected = true;
            }

            selects[i].appendChild(option);
        }
    }
}

function cambiarSelect(opt) {
    rellenarValoresSelec();
    actualizarValoresSelec(opt);
    rellenarSelects();
}

function actualizarValoresSelec(opt) {
    let selects = document.getElementsByClassName("attrSelect");
    selects = [...selects];

    for (let i = 0; i < selects.length; i++) {
        if (selects[i].selectedIndex > 0) {
            if (selects[i] === opt) {
                valoresSeleccionados[selects[i].selectedIndex - 1][1] = i;
            } else if (selects[i] !== opt && selects[i].selectedIndex === opt.selectedIndex) {
                //valoresSeleccionados[selects[i].selectedIndex - 1][1] = -1;
            } else {
                valoresSeleccionados[selects[i].selectedIndex - 1][1] = i;
            }
        }
    }
}
