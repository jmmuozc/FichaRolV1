"use strict";

let dadoBoton = document.getElementById("dadoBoton");
let valoresInput = document.getElementById("valores");

let sumaDiv = document.getElementById("sumaDiv");
let sumaSpan = document.getElementById("sumaSpan");

let mejoraRazaDiv = document.getElementById("mejoraRazaDiv");
let equipoClaseDiv = document.getElementById("equipoClaseDiv");
let levelSelect = document.getElementById("levelSelect");

let nivel = levelSelect.value;
let clase = "";

let habilidadesDiv = document.getElementById("habilidadesDiv");

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

    let mejoraRaza1 = document.createElement("button");
    let mejoraRaza2 = document.createElement("button");

    mejoraRaza1.innerHTML =
        '<div class="input-group" style="width: 140px;">' +
        '   <span class="input-group-text" style="width:50px;">+1</span>' +
        '       <select class="form-select" aria-label="mejoraRaza1">' +
        '           <option value=""></option>' +
        '           <option value="FUE">FUE</option>' +
        '           <option value="DES">DES</option>' +
        '           <option value="CON">CON</option>' +
        '           <option value="CAR">CAR</option>' +
        '           <option value="INT">INT</option>' +
        '           <option value="SAB">SAB</option>' +
        '       </select>' +
        '</div>'
        ;

    mejoraRaza2.innerHTML =
        '<div class="input-group" style="width: 140px;">' +
        '   <span class="input-group-text" style="width:50px;">+1</span>' +
        '   <select class="form-select" aria-label="mejoraRaza2">' +
        '       <option value=""></option>' +
        '       <option value="FUE">FUE</option>' +
        '       <option value="DES">DES</option>' +
        '       <option value="CON">CON</option>' +
        '       <option value="CAR">CAR</option>' +
        '       <option value="INT">INT</option>' +
        '       <option value="SAB">SAB</option>' +
        '   </select>' +
        '</div>'
        ;

    switch (opt.value) {
        case "Humano":
            div.innerHTML = '<b>Mejora de Raza: </b>' + mejoraRaza1.innerHTML + mejoraRaza2.innerHTML;
            break;
        case "Elfo":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Des, +1 Int";
            break;
        case "Enano":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Fue, +1 Con";
            break;
        case "Mediano":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Des, +1 Car";
            break;
        case "Goblin":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Des, +1 Sab";
            break;
        case "Orco":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Fue, +1 Con";
            break;
        case "Reptiliano":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Fue, +1 Car";
            break;
        case "Otra":
            div.innerHTML = '<b>Mejora de Raza: </b>' + mejoraRaza1.innerHTML + mejoraRaza2.innerHTML;
            break;

        default:
            div.innerHTML = "<b>Mejora de Raza: </b>";
            break;
    }

    mejoraRazaDiv.appendChild(div);
}

function cambioClase(opt) {
    let divPas = document.createElement("div");
    let divEqi = document.createElement("div");
    let divAst = document.createElement("div");
    divAst.innerHTML = "<b>*</b> Puede usar el objeto pero no dispone de el inicialmente";

    equipoClaseDiv.innerHTML = "";
    habilidadesDiv.innerHTML = "";

    switch (opt.value) {
        case "Guerrero":
            clase = "Guerrero";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Espada(1d6+FUE), *Escudo(Bloqueo)";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "Bárbaro":
            clase = "Bárbaro";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Hacha de dos manos(1d6+FUE), *Hacha de mano(1d4+FUE | 3 distancia)";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "Pícaro":
            clase = "Pícaro";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Daga(1d6+DES), *Cuchillo arrojadizo(1d4+DES | 3 dis), *Bomba de humo";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "Bardo":
            clase = "Bardo";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Espada(1d6+DES), Instrumento(1d4+CAR | 3 dis)";
            equipoClaseDiv.append(divEqi);
            break;
        case "Cazador":
            clase = "Cazador";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Arco(1d6+DES | 4 dis), Flechas(25), *Flechas marcadoras, *Flechas explosivas, *Flechas empuje";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "Mago":
            clase = "Mago";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Bastón(1d6+INT | 4 dis)";
            equipoClaseDiv.append(divPas);
            equipoClaseDiv.append(divEqi);
            break;
        case "Clérigo":
            clase = "Clérigo";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Catalizador(1d6+SAB | 4 dis)";
            equipoClaseDiv.append(divEqi);
            break;

        default:
            clase = "";
            divEqi.innerHTML = "<b>Equipo de Clase: </b>";
            equipoClaseDiv.append(divEqi);
            break;
    }
    dibujarHabilidades();
}

function dibujarHabilidades() {
    let divPas = document.createElement("div");
    let divHab = document.createElement("div");

    habilidadesDiv.innerHTML = "";

    switch (clase) {
        case "Guerrero":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Sediento): </b>Al eliminar a un objetivo, gana una acción adicional.' +
                '   </div>' +
                '</div>'
                ;
            habilidadesDiv.append(divPas);
            break;
        case "Bárbaro":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Ansia): </b>Cuando tiene un arma en cada mano, puede atacar con las dos armas a la vez en el mismo ataque. De esta forma, lanzaría 2d4+FUE.' +
                '   </div>' +
                '</div>'
                ;
            habilidadesDiv.append(divPas);
            break;
        case "Pícaro":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Sombra): </b>Puedes gastar una acción para entrar en sigilo. Al salir de sigilo, hace un ataque crítico.' +
                '   </div>' +
                '</div>'
                ;
            habilidadesDiv.append(divPas);
            break;
        case "Cazador":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Hábil tirador): </b>Si atacas sin haberte movido, ganas +1 al daño.' +
                '   </div>' +
                '</div>'
                ;
            habilidadesDiv.append(divPas);
            break;
        case "Bardo":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Canción Grupal): </b>Si realizas un hechizo sobre un aliado, puedes aplicar el mismo efecto a otro aliado que se encuentre adyacente al primero.' +
                '   </div>' +
                '</div>'
                ;
            habilidadesDiv.append(divPas);
            switch (nivel) {
                case "3":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Melodía debilitante: </b>1d4+CAR+Debilitado.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "2":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Canción motivadora: </b>El aliado tira con ventaja durante su turno.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "1":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Canción regenerante: </b>Curación de 1d4+CAR. (3 usos por combate)' +
                        '   </div>' +
                        '</div>'
                        ;
                    break;

                default:
                    break;
            }
            habilidadesDiv.append(divHab);
            break;
        case "Mago":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Maná): </b>Por cada hechizo lanzado, acumula un punto de maná. Los puntos de maná se pueden consumir para sumar +1 al daño de un ataque. Se pueden acumular un máximo de siete puntos de maná.' +
                '   </div>' +
                '</div>'
                ;
            habilidadesDiv.append(divPas);
            switch (nivel) {
                case "3":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Juntar: </b>1d4+INT en área y junta a los enemigos.' +
                        '   </div>' +
                        '</div>'
                        ;
                    break;
                case "2":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Aturdir: </b>1d4+INT + Aturdir.' +
                        '   </div>' +
                        '</div>'
                        ;
                    break;
                case "1":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Explosión: </b>1d4+INT en área.' +
                        '   </div>' +
                        '</div>'
                        ;
                    break;

                default:
                    break;
            }
            habilidadesDiv.append(divHab);
            break;
        case "Clérigo":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Mi religión me lo permite): </b>Cuando lanza un hechizo, otorga +1 de daño a un aliado cercano.' +
                '   </div>' +
                '</div>'
                ;
            habilidadesDiv.append(divPas);
            switch (nivel) {
                case "3":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Aturdir: </b>1d4+SAB + Aturdir.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "2":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Marca divina: </b>1d4+SAB + Marcado.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "1":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Curación: </b>Curación de 1d6+SAB. (3 usos por combate)' +
                        '   </div>' +
                        '</div>'
                        ;
                    break;

                default:
                    break;
            }
            habilidadesDiv.append(divHab);
            break;
        case "":
            console.log("hola");
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase: </b>' +
                '   </div>' +
                '</div>'
                ;
            habilidadesDiv.append(divPas);
            break;

        default:
            break;
    }
}

function cambioNivel() {
    nivel = levelSelect.value;

    dibujarHabilidades();
}