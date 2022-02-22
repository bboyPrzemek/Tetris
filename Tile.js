class Tile {
    constructor(x, y, color) {
       this.x = x;
       this.y = y;
       this.color = color;
    }

    moveDown(){
       this.y += 1;
    }

    moveLeft(){
       this.x += -1;
    }

    moveRight(){
       this.x += 1;
    }
 }