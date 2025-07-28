/**
 * Ejemplo de uso de la librería KineticTypography
 * 
 * Controles:
 * - R: Grabar imagen
 * - T: Cambiar texto (cicla entre palabras predefinidas)
 * - 1-5: Cambiar parámetros de efectos
 */

// Instancia de la librería
let kinetic;

function setup() {
    createCanvas(400, 400);
    
    // Crear instancia simple de KineticTypography
    kinetic = new KineticTypography({
        canvasWidth: 400,
        canvasHeight: 400,
        text: "a",
        textSize: 400,
        fontFamily: "Arial",
        textAlign: "center",
        textBaseline: "center",
        backgroundColor: 0,
        textColor: 255
    });
}

function draw() {
    background(0);
    
    // Renderizar el efecto
    kinetic.render();
}