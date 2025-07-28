/**
 * KineticTypography Library v2.0
 * Una librería avanzada para crear efectos de tipografía cinética con p5.js
 * Incluye soporte para fuentes customizadas, múltiples palabras y efectos avanzados
 */

class KineticTypography {
    constructor(options = {}) {
        // Configuración por defecto
        const defaults = {
            canvasWidth: 400,
            canvasHeight: 400,
            text: "kinetic",
            textSize: 400,
            fontFamily: "Arial", // Fuente por defecto del sistema
            fontPath: null, // Ruta para cargar fuente externa
            textAlign: "center", // center, left, right
            textBaseline: "center", // center, top, bottom
            backgroundColor: 0,
            textColor: 255
        };

        // Combinar opciones con valores por defecto
        this.config = { ...defaults, ...options };

        // Propiedades del canvas
        this.canvasWidth = this.config.canvasWidth;
        this.canvasHeight = this.config.canvasHeight;

        // Propiedades de la tipografía
        this.currentText = this.config.text;
        this.textSize = this.config.textSize;
        this.font = null;
        this.fontFamily = this.config.fontFamily;
        this.fontPath = this.config.fontPath;

        // Configuración de texto
        this.textAlign = this.config.textAlign;
        this.textBaseline = this.config.textBaseline;
        this.backgroundColor = this.config.backgroundColor;
        this.textColor = this.config.textColor;

        // Graphics buffer
        this.pg = null;

        // Variables de animación
        this.isHovering = false;
        this.animationActive = false;
        this.animationIntensity = 0;
        this.targetIntensity = 0;

        // Parámetros de efectos (valores por defecto)
        this.params = {
            tilesX: 16,
            tilesY: 16,
            speed: 0.005,
            dispersionX: 0.05,
            dispersionY: 0,
            factor: 100
        };

        // Lista de palabras para ciclar
        this.wordList = ["kinetic", "typography", "motion", "fluid", "dynamic"];
        this.currentWordIndex = 0;

        // Fuentes predefinidas populares
        this.predefinedFonts = {
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

        // Estado de carga de fuente
        this.fontLoaded = false;
        this.fontLoadCallback = null;

        // Inicializar
        this.init();
    }

    /**
     * Inicializa la librería
     */
    init() {
        // Crear el graphics buffer
        this.pg = createGraphics(this.canvasWidth, this.canvasHeight);
        
        // Cargar fuente si se especificó una ruta
        if (this.fontPath) {
            this.loadExternalFont(this.fontPath);
        } else {
            this.fontLoaded = true;
            this.updateTextGraphics();
        }
    }

    /**
     * Carga una fuente externa desde una ruta
     * @param {string} fontPath - Ruta al archivo de fuente
     * @param {function} callback - Función callback opcional cuando la fuente se carga
     */
    loadExternalFont(fontPath, callback = null) {
        this.fontLoadCallback = callback;

        // Usar loadFont de p5.js
        loadFont(fontPath, (loadedFont) => {
            this.font = loadedFont;
            this.fontLoaded = true;
            this.updateTextGraphics();

            if (this.fontLoadCallback) {
                this.fontLoadCallback(loadedFont);
            }

            console.log('Fuente cargada exitosamente:', fontPath);
        }, (error) => {
            console.error('Error cargando fuente:', error);
            this.fontLoaded = true; // Continuar con fuente por defecto
            this.updateTextGraphics();
        });
    }

    /**
     * Establece una fuente predefinida del sistema
     * @param {string} fontKey - Clave de la fuente predefinida
     */
    setPredefinedFont(fontKey) {
        if (this.predefinedFonts[fontKey]) {
            this.fontFamily = this.predefinedFonts[fontKey];
            this.font = null; // Resetear fuente externa
            this.updateTextGraphics();
            console.log('Fuente establecida:', this.predefinedFonts[fontKey]);
        } else {
            console.warn('Fuente predefinida no encontrada:', fontKey);
            console.log('Fuentes disponibles:', Object.keys(this.predefinedFonts));
        }
    }

    /**
     * Obtiene la lista de fuentes predefinidas disponibles
     * @returns {Array} Array con las claves de fuentes disponibles
     */
    getAvailableFonts() {
        return Object.keys(this.predefinedFonts);
    }

    /**
     * Establece una lista personalizada de palabras para ciclar
     * @param {Array} wordArray - Array de palabras
     */
    setWordList(wordArray) {
        if (Array.isArray(wordArray) && wordArray.length > 0) {
            this.wordList = [...wordArray];
            this.currentWordIndex = 0;
            this.setText(this.wordList[0]);
            console.log('Lista de palabras actualizada:', this.wordList);
        } else {
            console.warn('La lista de palabras debe ser un array no vacío');
        }
    }

    /**
     * Cicla a la siguiente palabra en la lista
     */
    nextWord() {
        this.currentWordIndex = (this.currentWordIndex + 1) % this.wordList.length;
        this.setText(this.wordList[this.currentWordIndex]);
        return this.wordList[this.currentWordIndex];
    }

    /**
     * Cicla a la palabra anterior en la lista
     */
    previousWord() {
        this.currentWordIndex = this.currentWordIndex - 1;
        if (this.currentWordIndex < 0) {
            this.currentWordIndex = this.wordList.length - 1;
        }
        this.setText(this.wordList[this.currentWordIndex]);
        return this.wordList[this.currentWordIndex];
    }

    /**
     * Obtiene la palabra actual
     * @returns {string} La palabra actualmente mostrada
     */
    getCurrentWord() {
        return this.currentText;
    }

    /**
     * Obtiene la lista completa de palabras
     * @returns {Array} Array con todas las palabras
     */
    getWordList() {
        return [...this.wordList];
    }

    /**
     * Cambia el texto mostrado
     * @param {string} newText - El nuevo texto a mostrar
     */
    setText(newText) {
        this.currentText = newText;
        this.updateTextGraphics();
    }

    /**
     * Cambia el tamaño del texto
     * @param {number} size - El nuevo tamaño del texto
     */
    setTextSize(size) {
        this.textSize = size;
        this.updateTextGraphics();
    }

    /**
     * Establece una fuente personalizada (objeto p5.Font)
     * @param {p5.Font} font - La fuente a usar
     */
    setFont(font) {
        this.font = font;
        this.updateTextGraphics();
    }

    /**
     * Establece una fuente por familia CSS
     * @param {string} fontFamily - Familia de fuente CSS
     */
    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        this.font = null; // Resetear fuente externa
        this.updateTextGraphics();
    }
    
    /**
     * Configura múltiples propiedades de texto de una vez
     * @param {Object} textConfig - Configuración de texto
     */
    setTextConfig(textConfig) {
        if (textConfig.text !== undefined) this.currentText = textConfig.text;
        if (textConfig.textSize !== undefined) this.textSize = textConfig.textSize;
        if (textConfig.fontFamily !== undefined) this.fontFamily = textConfig.fontFamily;
        if (textConfig.textAlign !== undefined) this.textAlign = textConfig.textAlign;
        if (textConfig.textBaseline !== undefined) this.textBaseline = textConfig.textBaseline;
        if (textConfig.backgroundColor !== undefined) this.backgroundColor = textConfig.backgroundColor;
        if (textConfig.textColor !== undefined) this.textColor = textConfig.textColor;
        
        this.updateTextGraphics();
    }
    
    /**
     * Configura los parámetros de efectos
     * @param {Object} newParams - Objeto con los nuevos parámetros
     */
    setParams(newParams) {
        this.params = { ...this.params, ...newParams };
    }

    /**
     * Actualiza el graphics buffer con el texto actual
     */
    updateTextGraphics() {
        if (!this.pg) return;

        this.pg.background(this.backgroundColor);
        this.pg.fill(this.textColor);

        // Configurar fuente
        if (this.font) {
            this.pg.textFont(this.font);
        } else {
            // Usar fuente del sistema CSS
            this.pg.textFont(this.fontFamily);
        }

        this.pg.textSize(this.textSize);

        // Configurar alineación
        let alignX, alignY;
        switch (this.textAlign) {
            case 'left': alignX = LEFT; break;
            case 'right': alignX = RIGHT; break;
            default: alignX = CENTER;
        }

        switch (this.textBaseline) {
            case 'top': alignY = TOP; break;
            case 'bottom': alignY = BOTTOM; break;
            default: alignY = CENTER;
        }

        this.pg.textAlign(alignX, alignY);

        // Calcular posición basada en alineación
        let x, y;
        switch (this.textAlign) {
            case 'left': x = 50; break;
            case 'right': x = this.canvasWidth - 50; break;
            default: x = this.canvasWidth / 2;
        }

        switch (this.textBaseline) {
            case 'top': y = 50; break;
            case 'bottom': y = this.canvasHeight - 50; break;
            default: y = this.canvasHeight / 2;
        }

        this.pg.text(this.currentText, x, y);
    }

    /**
     * Detecta si el mouse está sobre el texto
     */
    detectHover() {
        // Área aproximada del texto (ajustable según el tamaño)
        let textBounds = this.getTextBounds();

        this.isHovering = (mouseX > textBounds.x && mouseX < textBounds.x + textBounds.w &&
            mouseY > textBounds.y && mouseY < textBounds.y + textBounds.h);
    }

    /**
     * Calcula los límites aproximados del texto
     */
    getTextBounds() {
        let boundingSize = this.textSize * 0.8; // Aproximación
        return {
            x: this.canvasWidth / 2 - boundingSize / 2,
            y: this.canvasHeight / 2 - boundingSize / 2,
            w: boundingSize,
            h: boundingSize
        };
    }

    /**
     * Actualiza la animación
     */
    updateAnimation() {
        this.detectHover();

        // Transición suave de la intensidad de animación
        if (this.isHovering) {
            this.targetIntensity = 1.0;
        } else {
            this.targetIntensity = 0.0;
        }

        // Suavizar la transición con lerp
        this.animationIntensity = lerp(this.animationIntensity, this.targetIntensity, 0.1);

        // Considerar animación activa si la intensidad es mayor que un umbral mínimo
        this.animationActive = this.animationIntensity > 0.01;
    }

    /**
     * Renderiza el efecto de tipografía cinética
     */
    render() {
        this.updateAnimation();
        
        let tilesX = this.params.tilesX;
        let tilesY = this.params.tilesY;
        
        let tileW = int(this.canvasWidth / tilesX);
        let tileH = int(this.canvasHeight / tilesY);
        
        for (let y = 0; y < tilesY; y++) {
            for (let x = 0; x < tilesX; x++) {
                
                // WARP - Aplicar efectos con intensidad gradual
                let waveX = 0;
                let waveY = 0;
                
                if (this.animationActive) {
                    // Calcular efectos base
                    let baseWaveX = sin(frameCount * this.params.speed + (x * y) * this.params.dispersionX) * this.params.factor;
                    let baseWaveY = sin(frameCount * this.params.speed + (x * y) * this.params.dispersionY) * this.params.factor;
                    
                    // Aplicar intensidad gradual para transición suave
                    waveX = int(baseWaveX * this.animationIntensity);
                    waveY = int(baseWaveY * this.animationIntensity);
                    
                    if (this.params.dispersionX === 0) {
                        waveX = 0;
                    }
                    
                    if (this.params.dispersionY === 0) {
                        waveY = 0;
                    }
                }
                
                // SOURCE
                let sx = x * tileW + waveX;
                let sy = y * tileH + waveY;
                let sw = tileW;
                let sh = tileH;
                
                // DESTINATION
                let dx = x * tileW;
                let dy = y * tileH;
                let dw = tileW;
                let dh = tileH;
                
                copy(this.pg, sx, sy, sw, sh, dx, dy, dw, dh);
                
                // Efecto sutil de colores RGB en algunos tiles durante displacement
                if (this.animationActive && (waveX !== 0 || waveY !== 0)) {
                    // Solo algunos tiles específicos cambiarán de color (basado en posición)
                    if ((x + y * 3) % 7 === 0 || (x * 2 + y) % 11 === 0) {
                        // Generar colores RGB sutiles y cambiantes
                        let time = frameCount * 0.01;
                        let r = 255 + sin(time + x * 0.5) * 40;
                        let g = 255 + sin(time + y * 0.5 + PI/2) * 40;
                        let b = 255 + sin(time + (x+y) * 0.3 + PI) * 40;
                        
                        // Aplicar overlay de color muy sutil
                        push();
                        blendMode(MULTIPLY);
                        fill(r, g, b, 50 * this.animationIntensity);
                        noStroke();
                        rect(dx, dy, dw, dh);
                        pop();
                    }
                }
            }
        }
    }

    /**
     * Guarda el canvas actual como imagen
     * @param {string} filename - Nombre del archivo (opcional)
     */
    saveImage(filename) {
        if (!filename) {
            let timestamp = year() + '-' + nf(month(), 2) + '-' + nf(day(), 2) + '_' +
                nf(hour(), 2) + '-' + nf(minute(), 2) + '-' + nf(second(), 2);
            filename = 'kinetic_typography_' + timestamp;
        }

        saveCanvas(filename, 'png');
        console.log('Canvas guardado como: ' + filename + '.png');
    }

    /**
     * Redimensiona el canvas
     * @param {number} width - Nuevo ancho
     * @param {number} height - Nuevo alto
     */
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;

        // Recrear el graphics buffer
        this.pg = createGraphics(this.canvasWidth, this.canvasHeight);
        this.updateTextGraphics();
    }

    /**
     * Obtiene información completa del estado actual
     * @returns {Object} Objeto con toda la configuración actual
     */
    getConfig() {
        return {
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight,
            currentText: this.currentText,
            textSize: this.textSize,
            fontFamily: this.fontFamily,
            fontPath: this.fontPath,
            textAlign: this.textAlign,
            textBaseline: this.textBaseline,
            backgroundColor: this.backgroundColor,
            textColor: this.textColor,
            wordList: [...this.wordList],
            currentWordIndex: this.currentWordIndex,
            params: { ...this.params },
            fontLoaded: this.fontLoaded
        };
    }

    /**
     * Aplica una configuración completa
     * @param {Object} config - Objeto de configuración
     */
    applyConfig(config) {
        Object.keys(config).forEach(key => {
            if (this.hasOwnProperty(key) && key !== 'pg' && key !== 'font') {
                this[key] = config[key];
            }
        });

        // Recrear graphics buffer si cambió el tamaño
        if (config.canvasWidth || config.canvasHeight) {
            this.pg = createGraphics(this.canvasWidth, this.canvasHeight);
        }

        this.updateTextGraphics();
    }

    /**
     * Resetea la librería a valores por defecto
     */
    reset() {
        const defaults = {
            currentText: "kinetic",
            textSize: 400,
            fontFamily: "Arial",
            textAlign: "center",
            textBaseline: "center",
            backgroundColor: 0,
            textColor: 255,
            wordList: ["kinetic", "typography", "motion", "fluid", "dynamic"],
            currentWordIndex: 0,
            params: {
                tilesX: 16,
                tilesY: 16,
                speed: 0.005,
                dispersionX: 0.05,
                dispersionY: 0,
                factor: 100
            }
        };

        this.applyConfig(defaults);
        this.font = null;
        console.log('Librería reseteada a valores por defecto');
    }
}
