const WIDTH = 800;
const HEIGHT = 480;
const FPS = 30;
const PLAYER_SPEED = 300;
const BALL_SPEED = 400;
const PAUSE_TEXT = 'Pausa';
const PAUSE_STYLE = { font: '20px Arial', fill: '#fff' };

// Variables globales
var player, background, ball, pauseLabel, menu,backgroundMusic;
var cursors, trainingData = [];
var isAutoMode = false, isTrainingComplete = false;
var JX = 250, JY = 250;
var stepIndex = 0; 

// Inicialización del juego Phaser
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

// Precarga de assets del juego
function preload() {
    game.load.image('background', 'assets/game/paisaje.png');
    game.load.spritesheet('player', 'assets/sprites/altair.png', 32, 48);
    game.load.image('menu', 'assets/game/menu.png');
    game.load.image('ball', 'assets/sprites/purple_ball.png');
   game.load.audio('backgroundMusic', 'assets/sprites/jump.mp3');
}
// Inicialización de elementos del juego
function create() {
    // Inicialización de sistema de física
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 0; // No hay gravedad para el movimiento libre
    game.time.desiredFps = FPS;

    // Creación del fondo y jugador
    background = game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background');
    player = game.add.sprite(WIDTH / 2, HEIGHT / 2, 'player');
    game.physics.enable(player);
    player.body.collideWorldBounds = true;
    var run = player.animations.add('run', [8, 9, 10, 11]);
    player.animations.play('run', 10, true);

    // Creación de la bola
    ball = game.add.sprite(0, 0, 'ball');
    game.physics.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    setRandomBallVelocity();

    // Creación de etiqueta para pausa
    pauseLabel = game.add.text(WIDTH - 100, 20, PAUSE_TEXT, PAUSE_STYLE);
    pauseLabel.inputEnabled = true;
    pauseLabel.events.onInputUp.add(pauseGame, this);
    game.input.onDown.add(handlePauseClick, this);

    // Captura de teclas de flecha
    cursors = game.input.keyboard.createCursorKeys();

     // Crear y reproducir música de fondo
     music = game.add.audio('backgroundMusic');
     music.loop = true; // Hacer que la música se repita
     music.play(); // Reproducir la música
}

// Establece una velocidad aleatoria para la bola
function setRandomBallVelocity() {
    var angle = game.rnd.angle();
    ball.body.velocity.set(Math.cos(angle) * BALL_SPEED, Math.sin(angle) * BALL_SPEED);
}

// Pausa el juego y muestra el menú de pausa
function pauseGame() {
    game.paused = true;
    menu = game.add.sprite(WIDTH / 2, HEIGHT / 2, 'menu');
    menu.anchor.setTo(0.5, 0.5);
}

// Maneja los clics en el menú de pausa
function handlePauseClick(event) {
    // Cálculo de límites del menú de pausa
    if (game.paused) {
        var menuBounds = {
            x1: WIDTH / 2 - 270 / 2,
            x2: WIDTH / 2 + 270 / 2,
            y1: HEIGHT / 2 - 180 / 2,
            y2: HEIGHT / 2 + 180 / 2
        };

        // Acciones basadas en la posición del clic
        if (event.x > menuBounds.x1 && event.x < menuBounds.x2 && event.y > menuBounds.y1 && event.y < menuBounds.y2) {
            if (event.y <= menuBounds.y1 + 90) {
                resetTraining();
            } else if (event.y > menuBounds.y1 + 90) {
                if (trainingData.length > 0) {
                    isTrainingComplete = true;
                }
                isAutoMode = true;
                stepIndex = 0; // Reiniciar el índice de reproducción
            }
            menu.destroy();
            resetGame();
            game.paused = false;
        }
    }
}

// Reinicia los datos de entrenamiento
function resetTraining() {
    isTrainingComplete = false;
    trainingData = [];
    isAutoMode = false;
}

// Reinicia el estado del juego
function resetGame() {
    player.x = WIDTH / 2;
    player.y = HEIGHT / 2;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    ball.x = 0;
    ball.y = 0;
    setRandomBallVelocity();
}

// Actualiza la lógica del juego en cada cuadro
function update() {
    background.tilePosition.x -= 1; // Mueve el fondo para crear efecto de desplazamiento

    if (!isAutoMode) {
        handlePlayerInput();
    } else if (isAutoMode) {
        replayPlayerInput();
    }

    game.physics.arcade.collide(ball, player, handleCollision, null, this);

    var dx = ball.x - player.x;
    var dy = ball.y - player.y;
    var distance = Math.sqrt(dx * dx + dy * dy); // Distancia euclidiana entre la bola y el jugador

    if (!isAutoMode) {
        storeTrainingData(dx, dy, distance);
    }
}

// Maneja la entrada del jugador desde el teclado
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

// Almacena los datos de entrenamiento para la red neuronal
function storeTrainingData(dx, dy, distance) {
    var left = cursors.left.isDown ? 1 : 0;
    var right = cursors.right.isDown ? 1 : 0;
    var up = cursors.up.isDown ? 1 : 0;
    var down = cursors.down.isDown ? 1 : 0;

    JX = player.x;
    JY = player.y;

    trainingData.push({
        'input': [dx, dy, distance, JX, JY],
        'output': [left, right, up, down, player.x, player.y]
    });

    console.log(
        "Diferencia de la posicion de la bola contra la del jugador en X: ", dx + "\n" +
        "Diferencia de la posicion de la bola contra la del jugador en Y: ", dy + "\n" +
        "Distancia euclidiana entre la bola y el jugador: ", distance + "\n" +
        "Posicion del jugador en X: ", JX + "\n" +
        "Posicion del jugador en Y: ", JY + "\n"
    );
    console.log(
        "Izquierda: ", left + "\n" +
        "Derecha: ", right + "\n" +
        "Arriba: ", up + "\n" +
        "Abajo: ", down + "\n"
    );
}

// Reproduce el movimiento del jugador en modo automático
function replayPlayerInput() {
    if (stepIndex < trainingData.length) {
        var currentStep = trainingData[stepIndex];
        var output = currentStep.output;

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

        // Avanza al siguiente paso
        stepIndex++;
    } else {
        isAutoMode = false; // Detener el modo automático al finalizar los movimientos grabados
    }
}

// Maneja la colisión entre la bola y el jugador
function handleCollision() {
    isAutoMode = true;
    pauseGame();
}

function render() {
    // Renderiza el estado del juego o información adicional si es necesario
}