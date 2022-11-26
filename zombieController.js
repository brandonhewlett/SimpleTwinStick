import Zombie from "./zombie.js";

//Zombie Controller: Controls spawning, despawning, and movement of all zombies on screen
export default class zombieController{
    //Constructor: Creates empty array to store Zombie objects
    constructor(){
        this.zombies = [];
    }

    //Draw: Loops through zombie array (if it's not empty) to draw all zombies on canvas
    draw(context){
        if (this.zombies.length != 0){
            this.zombies.forEach((zombie) => {
                zombie.draw(context);
            })
        }
    }

    //Move: Takes in player position, loops through Zombie array (if it's not empty)
    //Sends move command to all zombies
    move(px, py){
        if (this.zombies.length != 0){
            this.zombies.forEach((zombie) => {
                zombie.move(px, py);
            })
        }
    }

    //Spawn: Takes in number of zombies and their speed, chooses a random side of the canvas
    //Creates new zombies with specified speed on chosen canvas side
    //Adds 50 pixels to relevant x/y value to spawn offscreen
    spawn(count, speed){
        for (count; count > 0; count--){
            switch (this.randomInt(1, 4)){
                case 1:
                    //left side
                    this.zombies.push(new Zombie(-50, this.randomInt(0, 320), speed))
                    break;
                case 2:
                    //right side
                    this.zombies.push(new Zombie(530, this.randomInt(0, 320), speed))
                    break;
                case 3:
                    //top
                    this.zombies.push(new Zombie(this.randomInt(0, 480), -50, speed))
                    break;
                case 4:
                    //bottom
                    this.zombies.push(new Zombie(this.randomInt(0, 480), 370, speed))
                    break;
            }
        }
    }

    //Collision check for bullet and zombies. Takes in bullet x and y coordinates
    //Loops through zombie array and checks position relative to position of bullet
    //If a zombie is hit, remove zombie from array, exit loop, and return true
    bulletCollisionCheck(bx, by){
        for (let zbi = this.zombies.length - 1; zbi >= 0; zbi--){
            if (this.zombies.length !=0){
                var hit = this.zombies[zbi].bulletCollisionCheck(bx, by);
                if (hit){
                    this.killZombie(zbi)
                    zbi = -1
                    return true;
                }
            }
        }
    }

    //Collision check for player and zombies. Takes in player x and y coordinates
    //Loops through zombie array and checks position relative to position of player
    //If player is hit, exit loop and return true. Stops game
    playerCollisionCheck(px, py){
        for (let zpi = this.zombies.length - 1; zpi >= 0; zpi--){
            if (this.zombies.length !=0){
                var hit = this.zombies[zpi].playerCollisionCheck(px, py);
                if (hit){
                    zpi = -1
                    return true;
                }
            }
        }
    }

    //remove shot zombie from zombie array
    killZombie(i){
        this.zombies.splice(i, 1);
    }

    //reset zombieController object to default state with empty array while preserving canvas
    resetToDefault(){
        this.zombies = [];
    }

    //Sends random integer between min and max inclusive
    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}