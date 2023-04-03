/*
Spinner

Este programa dibuja una serie de trapezoides en una circunferencia. Cada trapezoide
se colorea de un color diferente y se dibuja con vértices determinados por puntos
en la circunferencia. Los puntos son calculados mediante funciones matemáticas y 
guardados en un arreglo. Luego, se generan los vértices de los trapezoides y se dibujan
en la pantalla. 
*/

let puntos = []; // Array para almacenar los puntos que forman el círculo exterior y el interior.
let arrPuntosTrapecios = []; // Array para almacenar los vértices de los trapecios.
let arrColores = []; // Array para almacenar los colores de los trapecios.


function setup() {
  createCanvas(800, 800); // Crea un canvas de 800x800.

  // Crea el checkbox y lo posiciona en la esquina superior izquierda del canvas
  checkbox = createCheckbox('Mostrar estrella', false);
  checkbox.position(10, 10);

  angleMode(DEGREES); // Cambia el modo de ángulos a grados.
  strokeWeight(1); // Establece el grosor de los trazos en 1 píxel.
  stroke(5, 5, 5); // Establece el color de los trazos en RGB(5, 5, 5).
  fill(255, 255, 255); // Establece el color de relleno en RGB(255, 255, 255) (blanco).
}


function draw() {
  background(255); // Establece el fondo en blanco.
  const cx = width / 2; // Obtiene la coordenada x del centro del canvas.
  const cy = height / 2; // Obtiene la coordenada y del centro del canvas.
  const r = 400; // Establece el radio del círculo exterior.
  const angleStep = 45; // Establece el ángulo de separación entre cada punto.
  const start = angleStep / 2; // Establece el ángulo inicial.

  drawPointsOnCircle(cx, cy, r, angleStep, start, 8); // Dibuja los puntos del círculo exterior e interior.
  verticesTrapecios(); // Calcula los vértices de los trapecios.

  for (let i = 0; i < 8; i++) {
    dibujaTrapecio(arrPuntosTrapecios[i], i); // Dibuja cada trapecio con su respectivo color.
  }

  noLoop(); // Detiene el loop de dibujo.
}


/*
La función drawPointsOnCircle() dibuja un conjunto de puntos equidistantes sobre 
una circunferencia dada por su centro (cx,cy) y su radio (r). Los puntos se dibujan 
usando el ángulo inicial (start) y el ángulo de incremento (angleStep) dados, y 
se almacenan en un arreglo para su posterior uso en la generación de los vértices 
de los trapezoides. 
*/
function drawPointsOnCircle(cx, cy, r, angleStep, start, numPoints) {
  //strokeWeight(10); // Establece el grosor de los puntos en 10 píxeles.

  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep - start; // Calcula el ángulo para el punto actual.
    const x = cx + r * cos(angle); // Calcula la coordenada x del punto.
    const y = cy + r * sin(angle); // Calcula la coordenada y del punto.

    puntos[i] = [x, y]; // Agrega el punto al array de puntos.

    if (i < 3) {
      puntos[8 + i] = [x, y]; // Agrega el punto al array de puntos del círculo interior.
    }
  }
}


/*
La función "verticesTrapecios" se encarga de generar los vértices de los trapecios a 
partir de los puntos que se han dibujado en la circunferencia. La variable "k" se 
inicializa en 3, y se utiliza para controlar en qué posición del array "arrPuntosTrapecios" 
se van a agregar los vértices de cada trapecio. El bucle "for" recorre los primeros 8 puntos 
que se han generado en la circunferencia, y para cada uno de ellos se agregan los 4 puntos 
siguientes para formar un trapecio. Estos puntos se agregan en un array que se ubica en la 
posición correspondiente en "arrPuntosTrapecios". Después de agregar los puntos, la 
variable "k" se incrementa en 1, y si llega a 8, se reinicia a 0.
*/

function verticesTrapecios() {
  let k = 3;
  for (let i = 0; i < 8; i++) {
    arrPuntosTrapecios[k] = [      puntos[i],
      puntos[i + 1],
      puntos[i + 2],
      puntos[i + 3]
    ]; // Agrega los vértices del trapecio al array correspondiente.
    k++;
    if (k == 8) {
      k = 0;
    }
  }
}


/*
La función "dibujaTrapecio" se encarga de dibujar un trapecio en el lienzo. 
Recibe como argumentos los puntos que forman el trapecio (en un array de 4 elementos) y 
un número "k" que indica qué color se le asignará al trapecio (a través de un switch). 
Primero se deshabilita el trazo con "noStroke()", y después se define el color de relleno 
con el valor correspondiente al número "k". Luego, se inicia el dibujo de un polígono con 
"beginShape()", y se agregan los cuatro puntos del trapecio con "vertex()". Finalmente, 
se cierra el polígono con "endShape(CLOSE)" para que quede completamente llenado.
*/

function dibujaTrapecio(puntos, k) {
  noStroke();

  switch (k) {
    case 0:
      fill(48, 45, 126, 70);
      break;
    case 1:
      fill(126, 45, 126, 70);
      break;
    case 2:
      fill(0, 126, 126, 70);
      break;
    case 3:
      fill(126, 10, 126, 70);
      break;
    case 4:
      fill(50, 10, 50, 70);
      break;
    case 5:
      fill(150, 10, 250, 70);
      break;
    case 6:
      fill(150, 210, 50, 70);
      break;
    case 7:
      fill(250, 150, 150, 70);
      break;
  }

  beginShape();
  vertex(puntos[0][0], puntos[0][1]);
  vertex(puntos[1][0], puntos[1][1]);
  vertex(puntos[2][0], puntos[2][1]);
  vertex(puntos[3][0], puntos[3][1]);
  endShape(CLOSE);

}

