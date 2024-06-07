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
} javascript```

### Funciones de Actualización

### En esta sección se gestiona la lógica del juego y se actualizan las posiciones y estados de los elementos del juego en cada fotograma.


```javascript
function update() {
    if (newGame) {
        newGame = false;
        // Reinicia las posiciones de los elementos del juego al iniciar una nueva partida
    }

    background.tilePosition.x -= 1;

    // Detecta colisiones entre el jugador y las balas enemigas
    game.physics.arcade.collide(bullet, player, collisionHandler, null, this);
    game.physics.arcade.collide(bullet2, player, collisionHandler, null, this);
    game.physics.arcade.collide(bullet3, player, collisionHandler, null, this);

    // Actualiza el estado del jugador (en el suelo o en el aire)
    groundStatus = 1;
    airStatus = 0;
    if (!player.body.onFloor()) {
        groundStatus = 0;
        airStatus = 1;
    }

    // Actualiza la posición de las balas en relación con el jugador
    bulletDistance = Math.floor(player.position.x - bullet.position.x);
    bulletDistance2 = Math.floor(player.position.y - bullet2.position.y);
    bulletDistance2x = Math.floor(player.position.x - bullet2.position.x);
    bulletDistance3 = Math.floor(player.position.y - bullet3.position.y);
    bulletDistance3x = Math.floor(player.position.x - bullet3.position.x);

    // Control del jugador por el usuario o la red neuronal en modo automático
    if (autoMode == false && right.isDown && player.body.onFloor()) {
        moveRight();
    }

    if (autoMode == false && jump.isDown && player.body.onFloor()) {
        jumpAction();
    }

    if (autoMode == true && bullet.position.x > 0 && player.body.onFloor()) {
        // Control del jugador por la red neuronal en modo automático
    }

    // Control del disparo de las balas enemigas
    if (bulletD == false) {
        fire();
    }

    if (bullet.position.x <= 0) {
        resetVariables();
    }

    if (bulletD2 == false) {
        fire2();
    }

    if (bullet3.position.y >= canvasHeight) {
        fire3();
    }

    // Recopilación de datos para entrenamiento de la red neuronal en modo manual
    if (autoMode == false && bullet.position.x > 0) {
        trainingData.push({
            'input': [bulletDistance, bulletSpeed],
            'output': [airStatus, groundStatus]
        });
    }
}
javascript```


