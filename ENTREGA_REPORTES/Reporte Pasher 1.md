# Reporte del Proyecto Pasher 1 / INTELIGENCIA ARTIFICIAL

## Descripción del Proyecto
El proyecto es un juego desarrollado utilizando el framework Phaser en JavaScript. El juego consiste en un jugador controlado por el usuario que debe esquivar balas disparadas por 3 naves enemigas. El jugador puede moverse horizontalmente y saltar para evitar las balas. Además, se ha implementado un modo automático en el que el jugador es controlado por una red neuronal entrenada para esquivar las balas de manera óptima.

## Estructura del Código

El código se divide en varias secciones:

1. **Variables Globales**: Aquí se definen variables como el ancho y alto del canvas, elementos del juego como el jugador y las naves enemigas, y variables relacionadas con el control del juego y la puntuación.

2. **Funciones de Precarga**: Se cargan los recursos del juego, como imágenes, sprites y sonidos.

3. **Funciones de Creación**: Se crean los elementos del juego, como el fondo, las naves enemigas, el jugador y los controles.

4. **Funciones de Entrenamiento de la Red Neuronal**: Aquí se definen funciones relacionadas con el entrenamiento de la red neuronal, utilizando la biblioteca Synaptic.js. Se entrenan tres redes neuronales para diferentes aspectos del juego.

5. **Funciones de Actualización**: Aquí se gestionan la lógica del juego y se actualizan las posiciones y estados de los elementos del juego en cada fotograma.

6. **Funciones de Renderizado**: Se incluye código opcional para renderizar elementos en el juego, si es necesario.

7. **Funciones de Pausa y Menú**: Se definen funciones para pausar el juego y mostrar un menú de pausa al usuario, donde puede reiniciar el juego o activar el modo automático.

## Funcionalidades Destacadas
- Control del jugador: El jugador puede moverse horizontalmente y saltar para esquivar las balas.
- Modo automático: Se ha implementado un modo automático en el que el jugador es controlado por una red neuronal entrenada para esquivar las balas de manera óptima.
- Entrenamiento de la red neuronal: Se han desarrollado funciones para entrenar tres redes neuronales utilizando datos recopilados durante el juego.
- Sonidos y música: Se han incluido efectos de sonido y música de fondo para mejorar la experiencia del juego.
- Menú de pausa: Se ha implementado un menú de pausa donde el usuario puede reiniciar el juego o activar el modo automático.


### Funciones de Creación

```javascript
function create() {
    // Creación de elementos del juego
    background = game.add.tileSprite(0, 0, canvasWidth, canvasHeight, 'background');
    ship = game.add.sprite(canvasWidth - 100, canvasHeight - 70, 'ship');
    bullet = game.add.sprite(canvasWidth - 100, canvasHeight, 'bullet');
    // ...

    // Inicialización de controles
    jump = game.input.keyboard.addKey(Phaser.Keyboard.W);
    left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    right = game.input.keyboard.addKey(Phaser.Keyboard.D);
}
