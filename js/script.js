"use strict";

let dadoBoton = document.getElementById("dadoBoton");
let valoresInput = document.getElementById("valores");

let sumaDiv = document.getElementById("sumaDiv");
let sumaSpan = document.getElementById("sumaSpan");

let mejoraRazaDiv = document.getElementById("mejoraRazaDiv");
let mejoraClaseDiv = document.getElementById("mejoraClaseDiv");
let levelSelect = document.getElementById("levelSelect");

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
        emptyOption.innerText = "";

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

function cambioRaza(opt) {
    let div = document.createElement("div");
    mejoraRazaDiv.innerHTML = "";
    switch (opt.value) {
        case "Humano":
            div.innerHTML = '<b>Mejora de Raza: </b>  <div class="w-auto m-auto"><div class="input-group w-auto" style="width: 140px;"><span class="input-group-text" style="width:50px;">+1</span><select class="form-select" aria-label="DES"><option value=""></option><option value="FUE">FUE</option><option value="DES">DES</option><option value="CON">CON</option><option value="CAR">CAR</option><option value="INT">INT</option><option value="SAB">SAB</option></select></div></div>  <div class="w-auto m-auto"><div class="input-group w-auto" style="width: 140px;"><span class="input-group-text" style="width:50px;">+1</span><select class="form-select" aria-label="DES"><option value=""></option><option value="FUE">FUE</option><option value="DES">DES</option><option value="CON">CON</option><option value="CAR">CAR</option><option value="INT">INT</option><option value="SAB">SAB</option></select></div></div>';
            break;
        case "Elfo":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Des y +1 Int";
            break;
        case "Enano":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Fue y +1 Con";
            break;
        case "Mediano":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Des y +1 Car";
            break;
        case "Goblin":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Des y +1 Sab";
            break;
        case "Orco":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Fue y +1 Con";
            break;
        case "Reptiliano":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Fue y +1 Car";
            break;
        case "Otra":

            break;

        default:
            div.innerHTML = "<b>Mejora de Raza: </b>";
            break;
    }

    mejoraRazaDiv.appendChild(div);
}

function cambioClase(opt) {
    let div = document.createElement("div");
    mejoraClaseDiv.innerHTML = "";

    switch (opt.value) {
        case "Guerrero":
            div.innerHTML = "<b>Pasiva de Clase (Sediento): </b>Al eliminar a un objetivo, gana una acción adicional.";
            break;
        case "Bárbaro":
            div.innerHTML = "<b>Pasiva de Clase (Ansia): </b>Cuando tiene un arma en cada mano, puede atacar con las dos armas a la vez en el mismo ataque. De esta forma, lanzaría 2d4+FUE.";
            break;
        case "Pícaro":
            div.innerHTML = "<b>Pasiva de Clase (Sombra): </b>Puedes gastar una acción para entrar en sigilo. Al salir de sigilo, hace un ataque crítico.";
            break;
        case "Bardo":
            div.innerHTML = "<b>Pasiva de Clase (Canción Grupal): </b>Si realizas un hechizo sobre un aliado, puedes aplicar el mismo efecto a otro aliado que se encuentre adyacente al primero.";
            break;
        case "Cazador":
            div.innerHTML = "<b>Pasiva de Clase (Hábil tirador): </b>Si atacas sin haberte movido, ganas +1 al daño.";
            break;
        case "Mago":
            div.innerHTML = "<b>Pasiva de Clase (Maná): </b>Por cada hechizo lanzado, acumula un punto de maná. Los puntos de maná se pueden consumir para sumar +1 al daño de un ataque. Se pueden acumular un máximo de siete puntos de maná.";
            break;
        case "Clérigo":
            div.innerHTML = "<b>Pasiva de Clase (Mi religión me lo permite): </b>Cuando lanza un hechizo, otorga +1 de daño a un aliado cercano.";
            break;

        default:
            div.innerHTML = "<b>Pasiva de Clase : </b>";
            break;
    }

    mejoraClaseDiv.appendChild(div);
}

function cambioNivel(){

}