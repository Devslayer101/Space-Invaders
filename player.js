export default class Player {

    //Controls
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

    constructor(canvas, velocity, bulletController){
        this.canvas = canvas;
        this.velocity = velocity;

        //Bullet Settings
        this.bulletController = bulletController;

        // player image settings
        this.x = this.canvas.width/2;
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "images/player.png"

        // Listens For Webpage to say if there was a button press
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx){
        if(this.shootPressed){
            this.bulletController.shoot(this.x + this.width/2, this.y, 4, 10);
        }
        this.move();
        this.collideWall();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Player Controls - Checks If We Press Arrow Keys
    keydown = (event) =>{
        if(event.code == 'ArrowRight'){
            this.rightPressed = true;
        }
        if(event.code == 'ArrowLeft'){
            this.leftPressed = true;
        }
        if(event.code == "Space"){
            this.shootPressed = true;
        }
    };
    
    keyup = (event) =>{
        if(event.code == 'ArrowRight'){
            this.rightPressed = false;
        }
        if(event.code == 'ArrowLeft'){
            this.leftPressed = false;
        }
        if(event.code == "Space"){
            this.shootPressed = false;
        }
    };

    // Moves Player Left and Right
    move(){
        if(this.rightPressed){
            this.x += this.velocity;
        } else if (this.leftPressed){
            this.x += -this.velocity;
        }
    }

    //Doesn't allow the Player to Pass Canvas Walls
    collideWall(){
        //Left Wall
        if(this.x < 0){
            this.x = 0;
        }

        //Right Wall
        if(this.x > this.canvas.width - this.width){
            this.x = this.canvas.width - this.width;
        }
    }
}