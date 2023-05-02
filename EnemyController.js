//imports
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

// exports
export default class EnemyController{
    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ];
    enemyRows = [];

    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;
    MaxXVelocity = 20;

    //Timer Settings
    //Moving Down
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;

    //Firing a Bullet
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;
    
    AlienLeftDiv = document.getElementById('AlienLeft');
    speedDiv = document.getElementById('speed');

    constructor(canvas, EnemyBulletController, playerBulletController){
        this.canvas = canvas;
        this.EnemyBulletController = EnemyBulletController;
        this.playerBulletController = playerBulletController;

        this.enemyDeathSound = new Audio("sounds/enemy-death.wav");
        this.enemyDeathSound.volume = 0.1;

        this.createEnemies();
    }
    draw(ctx){
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawEnemy(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }

    // Fires Bullet at random
    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer <= 0){
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.EnemyBulletController.shoot(enemy.x + enemy.width/2, enemy.y, -3);
            this.AlienLeftDiv.innerHTML = "Invaders Left: " + allEnemies.length;
            this.speedUp(allEnemies.length);
        }
    }

    //Timer Functions
    resetMoveDownTimer(){
        if(this.moveDownTimer <= 0){
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer(){
        if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight){
            this.moveDownTimer--;
        }
    }

    // Changes the Directions of Enemies
    updateVelocityAndDirection(){
        for(const enemyRow of this.enemyRows){
            if(this.currentDirection == MovingDirection.right){
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width){
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            } else if(this.currentDirection === MovingDirection.downLeft){
                if(this.moveDown(MovingDirection.left)){
                    break;
                }
            } else if(this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftMostEnemy = enemyRow[0];
                if(leftMostEnemy.x <= 0){
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            } else if(this.currentDirection === MovingDirection.downRight){
                if(this.moveDown(MovingDirection.right)){
                    break;
                }
            }
        }
    }

    moveDown(newDirection){
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if(this.moveDownTimer <= 0){
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    drawEnemy(ctx){
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        })
    }

    createEnemies(){
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if(enemyNumber > 0){
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber));
                }
            })
        })
    }

    // Detects if enemy got hit with a bullet
    collisionDetection(){
        this.enemyRows.forEach(enemyRow => {
            enemyRow.forEach((enemy, enemyIndex) => {
                if(this.playerBulletController.collideWith(enemy)){
                    enemy.enemyhurt += 1;

                    if(enemy.enemyhurt >= enemy.reportNumber()){
                        //play Death sound
                    this.enemyDeathSound.currentTime = 0;
                    this.enemyDeathSound.play()

                    //Deletes Enemy (Enemy Dies)
                    enemyRow.splice(enemyIndex, 1);

                    //Xp increases
                    XpOnDeath(enemy.reportNumber());
                    }
                }
            });
        });

        this.enemyRows = this.enemyRows.filter(enemyRow => enemyRow.length > 0);
    }

    collideWith(sprite){
        return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
    }

    //Speed up the enemies as the number gets lower
    speedUp(NumberOfEnemies){
        if(NumberOfEnemies > 60/this.MaxXVelocity){
            this.defaultXVelocity = 60/NumberOfEnemies;;
        } else if (this.xVelocity < this.MaxXVelocity){
            this.defaultXVelocity = this.MaxXVelocity;
        } else{
            this.xVelocity +=1;
        }
        this.speedDiv.innerHTML = "Current Speed: " + parseInt(this.defaultXVelocity);
    }

    /*
    returnEnemY(){
        console.log(returnY());
        return parseInt(this.enemy.returnY());
    }
    */
}