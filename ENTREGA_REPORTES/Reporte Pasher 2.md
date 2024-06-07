# Reporte del Proyecto Pasher 2 (REBOTE) / INTELIGENCIA ARTIFICIAL

Juego desarrollado utilizando el framework Phaser. El juego incluye un personaje que se mueve en un escenario bidimensional, una bola que se desplaza aleatoriamente, y la posibilidad de pausar y reiniciar el juego. Además, se incluye un sistema de entrenamiento automático para el movimiento del personaje.

## Variables Globales
Las variables globales utilizadas en el juego son:

- `WIDTH` y `HEIGHT`: Dimensiones del canvas del juego.
- `FPS`: Cuadros por segundo deseados para el juego.
- `PLAYER_SPEED` y `BALL_SPEED`: Velocidades del jugador y la bola, respectivamente.
- `PAUSE_TEXT` y `PAUSE_STYLE`: Texto y estilo para la etiqueta de pausa.
- `player`, `background`, `ball`, `pauseLabel`, `menu`, `backgroundMusic`: Objetos de juego.
- `cursors`: Teclas de flecha para el control del jugador.
- `trainingData`: Almacena datos de entrenamiento para el modo automático.
- `isAutoMode`, `isTrainingComplete`: Indicadores de estado del juego.
- `JX`, `JY`: Posiciones del jugador.
- `stepIndex`: Índice para la reproducción de movimientos en modo automático.

## Estructura del Código
El código está organizado en varias funciones que configuran y manejan los diferentes aspectos del juego.

### Inicialización del Juego
```javascript
const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, '', {
    preload,
    create,
    update,
    render
});
```
## Aquí se crea una instancia del juego Phaser con las dimensiones y configuración deseadas, y se definen las funciones preload, create, update, y render que se ejecutarán en diferentes etapas del ciclo de vida del juego.

## PRELOAD
```python
function preload() {
    game.load.image('background', 'assets/game/paisaje.png');
    game.load.spritesheet('player', 'assets/sprites/altair.png', 32, 48);
    game.load.image('menu', 'assets/game/menu.png');
    game.load.image('ball', 'assets/sprites/purple_ball.png');
    game.load.audio('backgroundMusic', 'assets/sprites/jump.mp3');
}
```
## CREATE
```python
function create() {
    setupPhysics();
    setupBackground();
    setupPlayer();
    setupBall();
    setupPauseLabel();
    setupInput();
    setupMusic();
}
```

## La función create inicializa los elementos del juego llamando a funciones de configuración específicas:

- setupPhysics(): Configura el sistema de física del juego.
- setupBackground(): Configura el fondo del juego.
- setupPlayer(): Configura el jugador.
- setupBall(): Configura la bola.
- setupPauseLabel(): Configura la etiqueta de pausa.
- setupInput(): Configura las teclas de flecha.
- setupMusic(): Configura y reproduce la música de fondo.
- Setup Functions

### Cada función de configuración inicializa y configura un aspecto específico del juego.

### Ejemplo: setupPlayer
```python
function setupPlayer() {
    player = game.add.sprite(WIDTH / 2, HEIGHT / 2, 'player');
    game.physics.enable(player);
    player.body.collideWorldBounds = true;
    const run = player.animations.add('run', [8, 9, 10, 11]);
    player.animations.play('run', 10, true);
}
```

### Esta función crea el sprite del jugador, habilita la física, asegura que el jugador colisione con los límites del mundo, y define la animación de correr.

## Update
```python
function update() {
    background.tilePosition.x -= 1;

    if (!isAutoMode) {
        handlePlayerInput();
    } else {
        replayPlayerInput();
    }

    game.physics.arcade.collide(ball, player, handleCollision);

    const dx = ball.x - player.x;
    const dy = ball.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (!isAutoMode) {
        storeTrainingData(dx, dy, distance);
    }
}
```
### La función update se ejecuta en cada cuadro del juego y maneja la lógica principal, incluyendo el desplazamiento del fondo, el control del jugador, la reproducción automática de movimientos, la detección de colisiones, y el almacenamiento de datos de entrenamiento.

## Funciones de Manejo del Jugador
### handlePlayerInput
```python
function handlePlayerInput() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -PLAYER_SPEED;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = PLAYER_SPEED;
    }

    if (cursors.up.isDown) {
        player.body.velocity.y = -PLAYER_SPEED;
    } else if (cursors.down.isDown) {
        player.body.velocity.y = PLAYER_SPEED;
    }
}
```
### Esta función maneja la entrada del teclado para mover al jugador.

## replayPlayerInput
```python
function replayPlayerInput() {
    if (stepIndex < trainingData.length) {
        const currentStep = trainingData[stepIndex];
        const output = currentStep.output;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (output[0] === 1) {
            player.body.velocity.x = -PLAYER_SPEED;
        } else if (output[1] === 1) {
            player.body.velocity.x = PLAYER_SPEED;
        }

        if (output[2] === 1) {
            player.body.velocity.y = -PLAYER_SPEED;
        } else if (output[3] === 1) {
            player.body.velocity.y = PLAYER_SPEED;
        }

        stepIndex++;
    } else {
        isAutoMode = false;
    }
}
```
### Esta función reproduce los movimientos almacenados del jugador en modo automático.

## Función de Colisión
```python
function handleCollision() {
    isAutoMode = true;
    pauseGame();
}
```
### Esta función maneja la colisión entre la bola y el jugador, activando el modo automático y pausando el juego.

## Render
```python
function render() {
    // Renderiza el estado del juego o información adicional si es necesario
}
```

### Esta función puede ser utilizada para renderizar información adicional en el juego, aunque actualmente está vacía.

