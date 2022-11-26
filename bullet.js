//Bullet: Handles everything to do with the bullet
//Will probably require rewrite if I want to use multiple bullets
//If rewriting, use Zombie Controller for inspiration
export default class bullet{
    //Constructor: Takes in width and height of canvas, sets defaults of bullet object
    //Should probably just rewrite to use same as cursor
    constructor (w, h){
        this.x = 1000;
        this.y = 1000;
        this.speed = 10;
        this.vx = 0;
        this.vy = 0;
        this.visible = false;
        this.canvasX = w
        this.canvasY = h
    }

    //Draw: draws bullet on canvas if it is supposed to be visible.
    //Checks visibility after drawing
    draw(context){
        if (this.visible){
            this.updatePosition();
            context.beginPath();
            context.rect(this.x, this.y, 5, 5);
            context.fillStyle = "#000000";
            context.fill();
            context.closePath();
            this.checkVisibility();
        }
        
    }

    //Updates position of bullet based on x and y velocity values
    updatePosition(){
        if (this.visible){
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    //ResetPosition: Resets bullet to default offscreen position after it's flown offscreen
    resetPosition(){
        this.x = 1000
        this.y = 1000
    }

    //Shoot: If the bullet is already on screen, do nothing
    //Else, make it visible, set coordinates to player, get theta of cursor and player, and set velocity to sine and cosine multiplied by bullet speed
    shoot(cx, cy, px, py){
        if (!this.visible){
            this.visible = true;
            this.x = px;
            this.y = py;
            var d = Math.atan2(cy - py, cx - px);
            this.vx = Math.cos(d) * this.speed;
            this.vy = Math.sin(d) * this.speed;
        }
    }

    //CheckVisibility: Check if bullet is on the screen
    //If not, set to invisible and reset position
    checkVisibility(){
        if (this.x > this.canvasX || this.x < 0 || this.y > this.canvasY || this.y < 0){
            this.visible = false;
            this.resetPosition();
        }
    }

    //Return bullet X coordinate
    getX(){
        return this.x;
    }

    //Return bullet Y coordinate
    getY(){
        return this.y;
    }

    //Reset bullet object values to their defaults
    resetToDefault(){
        this.x = 1000;
        this.y = 1000;
        this.vx = 0;
        this.vy = 0;
        this.visible = false;
    }
}