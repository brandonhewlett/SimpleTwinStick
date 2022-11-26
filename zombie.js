//Zombie object. Individual enemies that are handled by zombie controller
export default class Zombie{
    //Constructor: Takes in x any y coordinates as spawn as well as speed
    constructor(x, y, s){
        this.x = x;
        this.y = y;
        this.speed = s;
    }

    //Draw: Display individual zombies at given x/y coordinates
    draw(context){
        context.beginPath();
        context.rect(this.x, this.y, 20, 20);
        context.fillStyle = "#00FF00";
        context.fill();
        context.closePath();
    }

    //Move: Gets angle theta from difference between player and zombie locations
    //Uses sine and cosine of angle theta multiplied by speed to set new coordinates of zombie
    move(px, py){
        var d = Math.atan2(py - this.y, px - this.x);
        this.x += Math.cos(d) * this.speed;
        this.y += Math.sin(d) * this.speed;
    }

    //BulletCollisionCheck: Takes in bullet location
    //Checks if bullet is located inside zombie, returns true/false
    bulletCollisionCheck(bx, by){
        if(
            bx + 5 >= this.x &&
            bx <= this.x + 20 &&
            by + 5 >= this.y &&
            by <= this.y + 20
        ){
            return true;
        } else {
            return false;
        }
    }

    //PlayerCollisionCheck: Takes in player location
    //Checks if player is located inside zombie, returns true/false
    playerCollisionCheck(px, py){
        if(
            px + 20 >= this.x &&
            px <= this.x + 20 &&
            py + 20 >= this.y &&
            py <= this.y + 20
        ){
            return true;
        } else {
            return false;
        }
    }
}