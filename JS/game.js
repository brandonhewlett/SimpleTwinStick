//TODO
//Remove hard-coding
//Multi-bullet mode?
import Player from "./player.js";
import Cursor from "./cursor.js";
import zombieController from "./zombieController.js";
import scoreController from "./scoreController.js";

window.onload = startup;

//Declaring constants and variables for game function
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const player = new Player(240, 160, 480, 320);
const cursor = new Cursor(canvas);
const zomCon = new zombieController();
const scoreCon = new scoreController();
const shootSound = new Audio('../Sounds/shoot.wav');
const zombieDieSound = new Audio('../Sounds/zombieDie.wav');
const dieSound = new Audio('../Sounds/die.wav');
var interval = null;
var playingGame = false;

//Adding event handlers for start/stop and clicking
startButton.addEventListener("click", playGame, false);
stopButton.addEventListener("click", stopGame, false);
canvas.addEventListener("click", clickHandler, false);

//Click == shoot. Get cursor x and y, send to player object to handle shooting bullet
function clickHandler(e) {
    if (playingGame){
        var cx = cursor.getX();
        var cy = cursor.getY();
        player.shoot(cx, cy);
        shootSound.play();
    }
}

//Startup function. Tying mouse movement to cursor
function startup() {
    canvas.onmousemove = mouseMove;
    gameLoop();
}

//Main loop, checks if we're playing
function gameLoop() {
    if (playingGame){
        play();
    }
    requestAnimationFrame(gameLoop);
}

//Clicking play button starts game
function playGame(){
    playingGame = true;
    startButton.style.display = "none";
    stopButton.style.display = "block";
    canvas.style.cursor = "none";
    //Sets initial interval for zombie spawning
    interval = setInterval(function() {
        zomCon.spawn(1, 1);
    }, 3000);
    //Automatically brings focus from html button to canvas, to ensure seamless transition
    canvas.focus();
}

//Clicking stop button stops game
function stopGame(){
    playingGame = false;
    //Clearing interval stops spawning function.
    //Necessary to stop zombie array from populating before game restart
    clearInterval(interval);
    //Clear screen, draw game over text
    context.clearRect(0, 0, 480, 320);
    scoreCon.gameOverDraw(context);
    //Reset all controllers and objects to default
    scoreCon.resetToDefault();
    player.resetToDefault();
    cursor.resetToDefault();
    zomCon.resetToDefault();
    
    //Bring back start button and normal canvas
    //Necessary to stop cursor from disappearing on canvas hover before game starts
    startButton.style.display = "block";
    stopButton.style.display = "none";
    canvas.style.cursor = "default";
}

//Send mouse movement event on canvas to cursor object so that game cursor can be drawn
function mouseMove(evt) {
    cursor.move(evt);
}

//Clears board, draws all requested items
function play() {
    context.clearRect(0, 0, 480, 320);
    if (playingGame){
        player.draw(context);
        cursor.draw(context);
        zomCon.move(player.getX(), player.getY());
        zomCon.draw(context);
        scoreCon.draw(context);
        //Check for bullet collision with zombie. If true, resets bullet and increases score by 1
        if (zomCon.bulletCollisionCheck(player.getBulletX(), player.getBulletY())){
            player.resetBullet();
            scoreCon.increaseScore();
            zombieDieSound.play();
            //Difficulty modifiers
            //Lvl 1: Default (See lines 61-63).
            switch (scoreCon.getScore()){
                //Default ensures nothing happens outside of specific score limits
                default:
                    break;
                //Lvl 2: +5 kills. Spawns two zombies at once
                case 5:
                    clearInterval(interval);
                    interval = setInterval(function() {
                        zomCon.spawn(2, 1);
                    }, 3000);
                    break;
                //Lvl 3: +10 kills. Increases zombie speed by 0.5
                case 15:
                    clearInterval(interval);
                    interval = setInterval(function() {
                        zomCon.spawn(2, 1.5);
                    }, 3000);
                    break;
                //Lvl 4: +6 kills. Decreases delay between spawns to 1.5 seconds
                case 21:
                    clearInterval(interval);
                    interval = setInterval(function() {
                        zomCon.spawn(2, 1.5);
                    }, 1500);
                    break;
                //Lvl 5: +10 kills. Spawns 3 zombies at once, increases speed by another 0.5
                case 31:
                    clearInterval(interval);
                    interval = setInterval(function() {
                        zomCon.spawn(3, 2);
                    }, 1500);
                    break;
                //Lvl 6: +9 kills. Decreases delay between spawns to 1 second
                case 40:
                    clearInterval(interval);
                    interval = setInterval(function() {
                        zomCon.spawn(3, 2);
                    }, 1000);
                    break;
                //Lvl die: Spawns 5 zombies at once, increases speed by another 1
                case 55:
                    clearInterval(interval);
                    interval = setInterval(function() {
                        zomCon.spawn(5, 3);
                    }, 1000);
                    break;
                
            }
        }
        //Check for collision between zombie and player. If true, stops game
        if (zomCon.playerCollisionCheck(player.getX(), player.getY())){
            stopGame();
            dieSound.play();
        }
    }
}
