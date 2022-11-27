//Score controller: Handles tracking and drawing of current player's score
export default class scoreController{
    //Constructor: Sets score to 0
    constructor(){
        this.score = 0;
    }

    //Draws score label onto canvas
    draw(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("Score: " + this.score, 240, 20);
        context.closePath();
    }

    //Draws score label onto canvas at the end of a game
    gameOverDraw(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("GAME OVER", 240, 130);
        context.fillText("SCORE: " + this.score, 240, 170);
        context.closePath();
    }
    
    //Increase score by 1
    increaseScore(){
        this.score += 1;
    }

    //Returns score
    getScore(){
        return this.score;
    }

    //Resets score to 0
    resetToDefault(){
        this.score = 0;
    }
}