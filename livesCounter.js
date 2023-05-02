export default class LivesCounter {
    constructor(canvas, lives){
        this.canvas = canvas;
        this.lives = lives;

        // player image settings
        this.x = 10;
        this.y = 10;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "images/player.png";
        this.spaceBetween = this.width + 10;
    }
    update(live){
        this.lives = live - 1;
    }
    draw(ctx){
        for(let i = 0; i < this.lives; i++){
            ctx.drawImage(this.image, this.x + (this.spaceBetween * i), this.y, this.width, this.height);
        }
    }
}