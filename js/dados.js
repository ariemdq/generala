var turno = 1;
var lanzamiento = 0;
var sumatoria= 0;
var dados = [0,0,0,0,0]; // sacada de linea 68 a variable global 
var tabla = [0,0,0,0,0,0,0,0,0,0];
var tablaOpcional = [0,0,0,0,0,0,0,0,0,0]; // 
var controlBotones = [1,1,1,1,1,1,1,1,1,1];

function ordenarLista(miLista){
  return miLista.sort((a,b) => a-b); 
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getDice() {
  return Math.floor(Math.random() * (6)) + 1;
}
/* 
1- funcion q dado 1 num devueva la url del dado a usar
2- recorrer los elemntos de los li (for de 0 a 4)
3- si el dado no esta tildado rolear el dado y escoger la nueva foto 
4- convertir el atributo src de (children[1]) en el nuevo valor de la imagen propiedad src 

*/
function devuelveSrc(num) {
  switch (num){
    case 1:
      return "assets/1.png";
    case 2:
      return "assets/2.png";
    case 3:
      return "assets/3.png";
    case 4:
      return "assets/4.png";
    case 5:
      return "assets/5.png";
    default:
      return "assets/6.png";
  }
}
/**
 * 
 * 1. Dos botones más: un reset , jugar hasta 2 veces mas, 
 * 2. inicializar los dados en "aleatorio"
 * 
 */
function lanzar() {
  var x = document.getElementsByTagName("LI");

  for (let i = 0; i < x.length; i++) {

    if(!x[i].children[0].checked){
      var numero= getDice();
      dados[i]= numero; 
      x[i].children[1].src = devuelveSrc(numero);
    }
  }
}
function cleanCheck(){
  var x = document.getElementsByTagName("LI");
  for (let i = 0; i < x.length; i++) {
    x[i].children[0].checked = false;
  }
}
function reset(){
  //19 de septiembre
  //pone los turnos en 1, y los lanzamientos en 1 (antes decia en 0 y en 0) 
  turno = 1;
  lanzamiento = 1;
  cleanCheck() // agregue esto para destildar al resetear 
  document.getElementById("turno").innerHTML = "Turno: " +turno;
  document.getElementById("lanzamiento").innerHTML = "Jugada: "+lanzamiento;
    //console.log("turno:" +turno+", lanzamiento:"+lanzamiento);
  
}
function generala(){
  if(lanzamiento === 0){
    tablaOpcional = [0,0,0,0,0,0,0,0,0,0];
    cleanCheck();  
    ocultaBotones(false);
  }
  lanzamiento += 1; //variable acumuladora
  lanzar();
  //console.log("turno:" +turno+", lanzamiento:"+lanzamiento);
  document.getElementById("turno").innerHTML = "Turno: " +turno;
  document.getElementById("lanzamiento").innerHTML = "Jugada: "+lanzamiento;
  if(lanzamiento > 2){
    pausarTurno(true); 
    turno +=1;
    lanzamiento = 0;
    ocultaBotones(true);
    chequeoBotones(); 
    analizarDados();
  }
  if(turno > 10){
    alert("FIN!");
    reset();
  }
}
function pausarTurno(pausa){
  if (pausa ) {
    document.getElementById("jugada").setAttribute('disabled', "true");
  } else { 
    document.getElementById("jugada").removeAttribute('disabled'); 
  }
}
function chequeoBotones(){ 
  var botones = document.getElementsByTagName("tr");
  for (let i = 1; i < botones.length; i++) { // empieza en 1 porque el 1er TR no es un boton
    botones[i].children[0].children[0].setAttribute('disabled', "true");
      if (controlBotones[i-1] === 1 ) {
        botones[i].children[0].children[0].removeAttribute('disabled'); 
      }   
  }
}
function ocultaBotones(mostrar){ 
  var botones = document.getElementsByTagName("tr");
  for (let i = 1; i < botones.length; i++) { // empieza en 1 porque el 1er TR no es un boton
    if (mostrar ) {
      botones[i].children[0].children[0].classList.remove('myHidden'); 
    } else {
      botones[i].children[0].children[0].classList.add('myHidden');
    }       
  }
}
function marcarScore(indice){
  controlBotones[indice] = 0;
  tabla[indice] = tablaOpcional[indice];
  ocultaBotones(false); 

  var casillitas = document.getElementsByTagName("tr"); 
  casillitas[indice+1].children[3].innerHTML = tabla[indice]; 
  pausarTurno(false); 
}
function analizarDados(){
  esGenerala(); //todos iguales  
  esEscalera(); // 1 2 3 4 5 ó 2 3 4 5 6 
  esPoker();    // 4 y 1 o 1 y 4 
  esFull();     // 3 y 2 o 2 y 3 
  esNumero();
  console.log(tablaOpcional); 

  var botones = document.getElementsByTagName("tr");
  for (let i = 1; i < botones.length; i++) { // empieza en 1 porque el 1er TR no es un boton
    botones[i].children[0].children[0].innerHTML = ""; 
      if (controlBotones[i-1] === 1 ) {
        botones[i].children[0].children[0].innerHTML = tablaOpcional[i-1]; 
      }   
  }


}
function esGenerala(){ 
  if(dados[0]===dados[1]===dados[2]===dados[3]===dados[4]){
    tablaOpcional[0]=50; 
  }
} 
function esEscalera(){
  let ordenada= ordenarLista(dados);
  if( (ordenada[0]===1 && ordenada[1]===2 && ordenada[2]===3 && ordenada[3]===4 && ordenada[4]===5)   
  || (ordenada[0]===2 && ordenada[1]===3 && ordenada[2]===4 && ordenada[3]===5 && ordenada[4]===6) ){
    tablaOpcional[1]=45; 
    }
}
function esPoker(){
  let ordenada= ordenarLista(dados);
  if( (ordenada[0]===ordenada[3]) || (ordenada[1]===ordenada[4]) ){
    tablaOpcional[2]=35; 
  }
}
function esFull(){
  let ordenada= ordenarLista(dados);
  if( (ordenada[0]===ordenada[2]) && (ordenada[3]===ordenada[4]) 
  || (ordenada[0]===ordenada[1] && ordenada[2]===ordenada[4]) ){
    tablaOpcional[3]=25; 
  }
}
function esNumero(){
  let aux = null;
  for (let numero= 6; numero > 0; numero--) {
    aux = 0;
    for (let posicion= 0; posicion < 5; posicion++){
      if (dados[posicion]===numero) {
          aux = aux + numero 
      }    
    }
    tablaOpcional[10-numero]=aux;
  }
}



/*
TODO:
3. Analizar cómo calcular puntos en el tercer lanzamiento de cada turno
  3.2 Hacer función "analizarLista" que permita encontrar patrones 
  3.3 dar opciones de puntos al jugador e imprimir por consola
  3.4 Colocar matriz (arreglo de dos dimensiones M[1][2] o pair(key.value)) para llevar la cuenta
  3.5 terminar las otras funciones
    3.5.1 con ciclo for hacer las mismas funciones anteriores
  3.6 algoritmo para calcular como llevar los tantos  


  http://www.playonlinedicegames.com/generala

analizarDados() deberia estar desde el primer juego: 
-para que sume valores de dados 
-si sale una escalera servida de la opcion de anotarla  
primero debo recorrer el arreglo lista, y que liste ó sume los valores disponibles 
- y que puedas elegir cual opcion anotar 
0        escalera 
0        full
45       Poker  
0        generala 
24 al  6 - cuatro dados de 6 
0 al  5 - ningun dado de 5 
0 al  4 - ningun dado de 4 
0 al  3 - ningun dado de 3
0 al  2 - ningun dado de 2    
1 al  1 - un dado de 1  
 

que NO nos deje jugar hasta no haber escogido una opcion /

tildar en el dado en vez del checkbox

mostrar sumatoria de puntos en la vista 

juegue la computadora

mejorar el puntaje dentro de los botones

responsividad 

*/

