# Hover con desplazamiento de pixeles

Librería para crear efectos de tipografía cinética con desplazamiento de pixeles en tu web, creada con p5.js. Permite customización completa de fuente, texto, color y valores de la animacion de desplazamiento.

![KineticTypography Demo](https://img.shields.io/badge/p5.js-Compatible-pink?style=for-the-badge&logo=p5.js)
![Version](https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## Características

-  **Efectos cinéticos avanzados** con tiles configurables
- **10+ fuentes predefinidas** del sistema
- **Carga de fuentes externas** (TTF, OTF)
- **Gestión de listas de palabras** con navegación
- **Alineación configurable** (izquierda, centro, derecha)
- **Colores personalizables** (fondo y texto)
- 🎛️ **5 presets de efectos** predefinidos
- **Exportación de imágenes** en alta calidad
- **API modular** y fácil de usar

## Instalación

### Opción 1: Descarga Directa
1. Descarga `KineticTypography.js`
2. Incluye p5.js en tu proyecto
3. Importa la librería en tu HTML

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
    <script src="KineticTypography.js"></script>
</head>
<body>
    <script src="sketch.js"></script>
</body>
</html>
```

### Opción 2: CDN (Próximamente)
```html
<script src="https://cdn.jsdelivr.net/gh/usuario/KineticTypography/KineticTypography.js"></script>
```

## Uso Básico

### Configuración Mínima
```javascript
let kineticText;

function setup() {
    createCanvas(800, 600);
    
    // Configuración básica
    kineticText = new KineticTypography({
        canvasWidth: width,
        canvasHeight: height,
        text: "HELLO"
    });
}

function draw() {
    background(0);
    kineticText.render();
}
```

### Configuración Avanzada
```javascript
let kineticText;

function setup() {
    createCanvas(800, 600);
    
    // Configuración completa
    const config = {
        canvasWidth: width,
        canvasHeight: height,
        text: "KINETIC",
        textSize: 300,
        fontFamily: "Impact, Arial Black, sans-serif",
        textAlign: "center",
        textBaseline: "center",
        backgroundColor: 0,
        textColor: 255
    };
    
    kineticText = new KineticTypography(config);
    
    // Configurar efectos
    kineticText.setParams({
        tilesX: 20,
        tilesY: 15,
        speed: 0.008,
        dispersionX: 0.1,
        dispersionY: 0.05,
        factor: 120
    });
}

function draw() {
    background(0);
    kineticText.render();
}
```

## API Reference

### Constructor
```javascript
new KineticTypography(options)
```

#### Opciones de Configuración
| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `canvasWidth` | Number | 400 | Ancho del canvas |
| `canvasHeight` | Number | 400 | Alto del canvas |
| `text` | String | "kinetic" | Texto a mostrar |
| `textSize` | Number | 400 | Tamaño del texto |
| `fontFamily` | String | "Arial" | Familia de fuente CSS |
| `fontPath` | String | null | Ruta a fuente externa |
| `textAlign` | String | "center" | Alineación: "left", "center", "right" |
| `textBaseline` | String | "center" | Línea base: "top", "center", "bottom" |
| `backgroundColor` | Number | 0 | Color de fondo (0-255) |
| `textColor` | Number | 255 | Color del texto (0-255) |

### Métodos Principales

#### Gestión de Texto
```javascript
// Cambiar texto individual
kineticText.setText("NUEVO TEXTO");

// Configurar lista de palabras
kineticText.setWordList(["CYBER", "NEON", "FUTURE"]);

// Navegar por palabras
kineticText.nextWord();
kineticText.previousWord();

// Obtener estado actual
let currentWord = kineticText.getCurrentWord();
let wordList = kineticText.getWordList();
```

#### Gestión de Fuentes
```javascript
// Fuentes predefinidas
kineticText.setPredefinedFont('impact');

// Fuentes del sistema
kineticText.setFontFamily('Georgia, serif');

// Cargar fuente externa
kineticText.loadExternalFont('fonts/custom.ttf', (font) => {
    console.log('Fuente cargada:', font);
});

// Obtener fuentes disponibles
let fonts = kineticText.getAvailableFonts();
```

#### Configuración Múltiple
```javascript
// Configurar múltiples propiedades
kineticText.setTextConfig({
    text: "NUEVO",
    textSize: 350,
    fontFamily: "Impact",
    textAlign: "left",
    backgroundColor: 20,
    textColor: 200
});

// Obtener configuración completa
let config = kineticText.getConfig();

// Aplicar configuración completa
kineticText.applyConfig(savedConfig);

// Reset a valores por defecto
kineticText.reset();
```

#### Efectos y Animación
```javascript
// Configurar parámetros de efectos
kineticText.setParams({
    tilesX: 16,        // Tiles horizontales
    tilesY: 16,        // Tiles verticales
    speed: 0.005,      // Velocidad de animación
    dispersionX: 0.05, // Dispersión horizontal
    dispersionY: 0,    // Dispersión vertical
    factor: 100        // Factor de intensidad
});

// Renderizar (llamar en draw())
kineticText.render();
```

#### Utilidades
```javascript
// Guardar imagen
kineticText.saveImage("mi_tipografia.png");

// Redimensionar
kineticText.resize(newWidth, newHeight);
```

### Fuentes Predefinidas

La librería incluye 10 fuentes del sistema listas para usar:

```javascript
const fonts = {
    'arial': 'Arial, sans-serif',
    'helvetica': 'Helvetica, Arial, sans-serif',
    'times': 'Times New Roman, serif',
    'georgia': 'Georgia, serif',
    'courier': 'Courier New, monospace',
    'impact': 'Impact, sans-serif',
    'comic': 'Comic Sans MS, cursive',
    'trebuchet': 'Trebuchet MS, sans-serif',
    'verdana': 'Verdana, sans-serif',
    'tahoma': 'Tahoma, sans-serif'
};

// Usar fuente predefinida
kineticText.setPredefinedFont('impact');
```

## Presets de Efectos

La librería incluye 5 presets predefinidos:

### 1. Suave y Elegante
```javascript
kineticText.setParams({
    tilesX: 10, tilesY: 8,
    speed: 0.003, dispersionX: 0.03,
    dispersionY: 0.01, factor: 60
});
```

### 2. Ondulatorio Fluido
```javascript
kineticText.setParams({
    tilesX: 16, tilesY: 12,
    speed: 0.008, dispersionX: 0.12,
    dispersionY: 0.08, factor: 100
});
```

### 3. Granular Dinámico
```javascript
kineticText.setParams({
    tilesX: 24, tilesY: 18,
    speed: 0.012, dispersionX: 0.18,
    dispersionY: 0.12, factor: 150
});
```

### 4. Dramático Intenso
```javascript
kineticText.setParams({
    tilesX: 20, tilesY: 15,
    speed: 0.018, dispersionX: 0.25,
    dispersionY: 0.18, factor: 220
});
```

### 5. Extremo Caótico
```javascript
kineticText.setParams({
    tilesX: 32, tilesY: 24,
    speed: 0.025, dispersionX: 0.35,
    dispersionY: 0.28, factor: 350
});
```

## 🎮 Ejemplo Interactivo

```javascript
let kineticText;
let words = ["CYBER", "NEON", "FUTURE", "DIGITAL"];
let fonts = ['impact', 'helvetica', 'georgia'];
let currentFont = 0;

function setup() {
    createCanvas(800, 600);
    
    kineticText = new KineticTypography({
        canvasWidth: width,
        canvasHeight: height,
        text: "CYBER",
        textSize: 300,
        fontFamily: "Impact"
    });
    
    kineticText.setWordList(words);
}

function draw() {
    background(0);
    kineticText.render();
}

function keyPressed() {
    if (key === 't') {
        kineticText.nextWord();
    }
    
    if (key === 'f') {
        currentFont = (currentFont + 1) % fonts.length;
        kineticText.setPredefinedFont(fonts[currentFont]);
    }
    
    if (key === 'r') {
        kineticText.saveImage();
    }
    
    // Presets 1-5
    if (key >= '1' && key <= '5') {
        applyPreset(parseInt(key));
    }
}

function applyPreset(preset) {
    const presets = [
        { tilesX: 10, tilesY: 8, speed: 0.003, dispersionX: 0.03, factor: 60 },
        { tilesX: 16, tilesY: 12, speed: 0.008, dispersionX: 0.12, factor: 100 },
        { tilesX: 24, tilesY: 18, speed: 0.012, dispersionX: 0.18, factor: 150 },
        { tilesX: 20, tilesY: 15, speed: 0.018, dispersionX: 0.25, factor: 220 },
        { tilesX: 32, tilesY: 24, speed: 0.025, dispersionX: 0.35, factor: 350 }
    ];
    
    kineticText.setParams(presets[preset - 1]);
}
```

## Casos de Uso

### Landing Pages
```javascript
// Título principal animado
const heroText = new KineticTypography({
    text: "BIENVENIDO",
    textSize: 400,
    fontFamily: "Impact",
    textAlign: "center"
});
```

### Logos Interactivos
```javascript
// Logo que reacciona al hover
const logo = new KineticTypography({
    text: "MARCA",
    textSize: 200,
    fontFamily: "Helvetica",
    textColor: 255
});

// Activar efecto en hover
function mousePressed() {
    logo.setParams({ factor: 200, speed: 0.02 });
}
```

### Presentaciones
```javascript
// Slides con transiciones
const slides = ["INTRO", "DESARROLLO", "CONCLUSIÓN"];
let currentSlide = 0;

const presentation = new KineticTypography({
    text: slides[0],
    textSize: 300
});

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    presentation.setText(slides[currentSlide]);
}
```

## Personalización Avanzada

### Cargar Fuentes Externas
```javascript
function preload() {
    // Cargar fuente antes de setup()
    customFont = loadFont('fonts/custom.ttf');
}

function setup() {
    createCanvas(800, 600);
    
    const kineticText = new KineticTypography({
        text: "CUSTOM",
        fontPath: 'fonts/custom.ttf'
    });
    
    // O establecer después de crear
    kineticText.setFont(customFont);
}
```

### Configuración Responsive
```javascript
function setup() {
    createCanvas(windowWidth, windowHeight);
    
    kineticText = new KineticTypography({
        canvasWidth: width,
        canvasHeight: height,
        textSize: width * 0.3 // 30% del ancho
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    kineticText.resize(width, height);
    kineticText.setTextSize(width * 0.3);
}
```

### Múltiples Instancias
```javascript
let title, subtitle;

function setup() {
    createCanvas(800, 600);
    
    title = new KineticTypography({
        canvasWidth: width,
        canvasHeight: height / 2,
        text: "TÍTULO",
        textSize: 200,
        textAlign: "center"
    });
    
    subtitle = new KineticTypography({
        canvasWidth: width,
        canvasHeight: height / 2,
        text: "subtítulo",
        textSize: 100,
        textAlign: "center",
        fontFamily: "Georgia"
    });
}

function draw() {
    background(0);
    
    // Renderizar título en la parte superior
    push();
    title.render();
    pop();
    
    // Renderizar subtítulo en la parte inferior
    push();
    translate(0, height / 2);
    subtitle.render();
    pop();
}
```

## 🐛 Solución de Problemas

### Fuente no se carga
```javascript
// Verificar que la fuente se cargó correctamente
kineticText.loadExternalFont('fonts/custom.ttf', (font) => {
    if (font) {
        console.log('Fuente cargada exitosamente');
    } else {
        console.error('Error cargando fuente');
    }
});
```

### Efectos no se ven
```javascript
// Verificar que los parámetros están en rango válido
kineticText.setParams({
    tilesX: 16,        // Mínimo 4, máximo 64
    tilesY: 16,        // Mínimo 4, máximo 64
    speed: 0.005,      // 0.001 - 0.05
    dispersionX: 0.05, // 0 - 0.5
    dispersionY: 0,    // 0 - 0.5
    factor: 100        // 10 - 500
});
```

### Rendimiento lento
```javascript
// Reducir tiles para mejor rendimiento
kineticText.setParams({
    tilesX: 8,  // Menos tiles = mejor rendimiento
    tilesY: 8,
    factor: 50  // Factor menor = menos cálculos
});
```

## 📱 Compatibilidad

- ✅ **p5.js**: v1.4.0+
- ✅ **Navegadores**: Chrome, Firefox, Safari, Edge
- ✅ **Dispositivos**: Desktop, Tablet, Mobile
- ✅ **Frameworks**: Vanilla JS, React (con p5-wrapper), Vue, Angular

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

MIT License - puedes usar esta librería libremente en proyectos personales y comerciales.

## 🙏 Créditos

- Basado en el tutorial de **Tim Rodenbroeker**
- Desarrollado con **p5.js**
- Inspirado en efectos de tipografía cinética moderna

## 📞 Soporte

- 📧 Email: [albaantondesign@gmail.com]
- 🐛 Issues: [GitHub Issues](https://github.com/usuario/KineticTypography/issues)
- 📖 Documentación: [GitHub Wiki](https://github.com/usuario/KineticTypography/wiki)

---

**¡Crea tipografía cinética impresionante con KineticTypography v2.0!** ✨
