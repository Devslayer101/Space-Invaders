import EnemyController from "./EnemyController.js";
import Player from "./player.js";
import BulletController from "./BulletController.js";

// canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

// background
const background = new Image();
background.src = 'https://raw.githubusercontent.com/Devslayer101/Space-Invaders-v1/main/images/space.png';

// Imports Vaiables
const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false)
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

// Game Over (True/False) & Did you Win? (True/False)
let isGameOver = false;
let didWin = false;

// Main Code
function game(){
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

//checks if game is over
function checkGameOver(){
    if(isGameOver){
        return;
    }

    // Checks if Enemy Bullet Hits Player
    if(enemyBulletController.collideWith(player)){
        isGameOver = true;
    }

    // Checks if Enemy crashes into Player
    if(enemyController.collideWith(player)){
        isGameOver = true;
    }

    if(enemyController.enemyRows.length === 0){
        didWin = true;
        isGameOver = true;
    }
}

// Displays Message on Game Over
function displayGameOver(){
    if(isGameOver){
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

setInterval(game, 1000/60);