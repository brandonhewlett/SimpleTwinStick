import Bullet from "./bullet.js";
//Player: Handles everything to do with player on canvas
export default class Player{
    constructor(x, y, canvasX, canvasY){
        //Position and size
        //TODO: Have size set with passed variable rather than hard-coded
        this.x = x;
        this.y = y;
        this.side = 20;
        //Movement speed and movement control booleans
        //TODO: Have speed set with passed variable rather than hard-coded
        this.speed = 7;
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.maxX = canvasX - 20;
        this.maxY = canvasY - 20;
        //Creates bullet as part of Player class
        //TODO: rewrite/move to allow for multiple bullets. One is fine for now
        this.bullet = new Bullet(canvasX, canvasY);
    
        //Adding listeners for keyboard presses
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
    }

    //Draws player sprite on canvas
    draw(context){
        //Checks if sprite needs to be moved
        this.movement();
        //Draws sprite
        context.beginPath();
        context.rect(this.x, this.y, this.side, this.side);
        context.fillStyle = "#FF0000";
        context.fill();
        context.closePath();
        //Draws bullet sprite on canvas
        this.bullet.draw(context);
    }

    //Movement handler. Checks each movement boolean, adjusts position by speed as needed.
    //Also checks window bounds to ensure player does not move off of screen
    movement() {
        if (this.rightPressed) {
            this.x += Math.min(this.speed, this.maxX - this.x);
        }
        if (this.leftPressed) {
            this.x -= Math.min(this.speed, 0 + this.x);
        }
        if (this.downPressed) {
            this.y += Math.min(this.speed, this.maxY - this.y);
        }
        if (this.upPressed) {
            this.y -= Math.min(this.speed, 0 + this.y);
        }
    }

    //Sets movement booleans based off of key presses. Up/Down/Left/Right arrows for movement
    keyDownHandler = (e) => {
        switch (e.key) {
            case "ArrowRight":
                this.rightPressed = true;
                break;
            case "ArrowLeft":
                this.leftPressed = true;
                break;
            case "ArrowUp":
                this.upPressed = true;
                break;
            case "ArrowDown":
                this.downPressed = true;
                break;
            default:
                console.log("What the hell am I doing?");
                break;
        }
    }
    
    //Same as above, but handling key up
    keyUpHandler = (e) => {;
        switch (e.key) {
            case "ArrowRight":
                this.rightPressed = false;
                break;
            case "ArrowLeft":
                this.leftPressed = false;
                break;
            case "ArrowUp":
                this.upPressed = false;
                break;
            case "ArrowDown":
                this.downPressed = false;
                break;
            default:
                console.log("What the hell am I doing?");
                break;
        }
    }

    //Shoot bullet from center of player to center of cursor
    //Takes in cursor x/y, sends cursor and player x/y to bullet shooting
    //TODO: Remove hard-coded +10, have value based on size of player
    //TODO: Probably will get removed/rewritten once multiple bullet support is added
    shoot(cx, cy){
        this.bullet.shoot (cx, cy, this.x+10, this.y+10);
    }

    //Returns player X Coordinate
    getX(){
        return this.x;
    }

    //Returns player Y coordinate
    getY(){
        return this.y;
    }

    //Returns bullet X coordinate
    getBulletX(){
        return this.bullet.getX();
    }
    
    //Returns bullet Y coordinate
    getBulletY(){
        return this.bullet.getY();
    }

    //Reset bullet to default position
    resetBullet(){
        this.bullet.resetPosition();
    }

    //Reset player object to default before game restart
    resetToDefault(){
        this.x = 0;
        this.y = 0;
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.bullet.resetToDefault();
    }
}