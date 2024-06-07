const WIDTH = 800;
const HEIGHT = 480;
const FPS = 30;
const PLAYER_SPEED = 300;
const BALL_SPEED = 400;
const PAUSE_TEXT = 'Pausa';
const PAUSE_STYLE = { font: '20px Arial', fill: '#fff' };

// Variables globales
let player, background, ball, pauseLabel, menu, backgroundMusic;
let cursors, trainingData = [];
let isAutoMode = false, isTrainingComplete = false;
let JX = 250, JY = 250;
let stepIndex = 0;

// Inicialización del juego Phaser
const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, '', {
    preload,
    create,
    update,
    render
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
    setupPhysics();
    setupBackground();
    setupPlayer();
    setupBall();
    setupPauseLabel();
    setupInput();
    setupMusic();
}

// Configuración del sistema de física
function setupPhysics() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 0;
    game.time.desiredFps = FPS;
}

// Configuración del fondo
function setupBackground() {
    background = game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background');
}

// Configuración del jugador
function setupPlayer() {
    player = game.add.sprite(WIDTH / 2, HEIGHT / 2, 'player');
    game.physics.enable(player);
    player.body.collideWorldBounds = true;
    const run = player.animations.add('run', [8, 9, 10, 11]);
    player.animations.play('run', 10, true);
}

// Configuración de la bola
function setupBall() {
    ball = game.add.sprite(0, 0, 'ball');
    game.physics.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    setRandomBallVelocity();
}

// Configuración de la etiqueta de pausa
function setupPauseLabel() {
    pauseLabel = game.add.text(WIDTH - 100, 20, PAUSE_TEXT, PAUSE_STYLE);
    pauseLabel.inputEnabled = true;
    pauseLabel.events.onInputUp.add(pauseGame);
    game.input.onDown.add(handlePauseClick);
}

// Configuración de la música de fondo
function setupMusic() {
    backgroundMusic = game.add.audio('backgroundMusic');
    backgroundMusic.loop = true;
    backgroundMusic.play();
}

// Captura de teclas de flecha
function setupInput() {
    cursors = game.input.keyboard.createCursorKeys();
}

// Establece una velocidad aleatoria para la bola
function setRandomBallVelocity() {
    const angle = game.rnd.angle();
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
    if (game.paused) {
        const menuBounds = {
            x1: WIDTH / 2 - 135,
            x2: WIDTH / 2 + 135,
            y1: HEIGHT / 2 - 90,
            y2: HEIGHT / 2 + 90
        };

        if (event.x > menuBounds.x1 && event.x < menuBounds.x2 && event.y > menuBounds.y1 && event.y < menuBounds.y2) {
            if (event.y <= menuBounds.y1 + 45) {
                resetTraining();
            } else {
                if (trainingData.length > 0) {
                    isTrainingComplete = true;
                }
                isAutoMode = true;
                stepIndex = 0;
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
    const left = cursors.left.isDown ? 1 : 0;
    const right = cursors.right.isDown ? 1 : 0;
    const up = cursors.up.isDown ? 1 : 0;
    const down = cursors.down.isDown ? 1 : 0;

    JX = player.x;
    JY = player.y;

    trainingData.push({
        input: [dx, dy, distance, JX, JY],
        output: [left, right, up, down, player.x, player.y]
    });

    console.log(`Diferencia de la posicion de la bola contra la del jugador en X: ${dx}\nDiferencia de la posicion de la bola contra la del jugador en Y: ${dy}\nDistancia euclidiana entre la bola y el jugador: ${distance}\nPosicion del jugador en X: ${JX}\nPosicion del jugador en Y: ${JY}`);
    console.log(`Izquierda: ${left}\nDerecha: ${right}\nArriba: ${up}\nAbajo: ${down}`);
}

// Reproduce el movimiento del jugador en modo automático
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

// Maneja la colisión entre la bola y el jugador
function handleCollision() {
    isAutoMode = true;
    pauseGame();
}

function render() {
    // Renderiza el estado del juego o información adicional si es necesario
}
