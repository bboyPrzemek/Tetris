class Shape {
    constructor(tilePattern, color, ctx) {
       this.tiles = [];
       this.color = color;
       this.ctx = ctx;
       this.tilePattern = tilePattern;
       this.size = 25;
       this.createShape();
    }

    createShape() {
       let tile;
       for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
             if (this.tilePattern[i][j]) {
                 tile = new Tile(8 + j, i);
                 this.draw(tile, this.color);
                 this.tiles.push(tile);
             }
          }
       }
    }

    draw(tile) {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(tile.x * this.size , tile.y * this.size , this.size, this.size);
   }

    clear(tile) {
      this.ctx.clearRect(tile.x * this.size, tile.y * this.size, this.size, this.size);
   }

    moveDown() {
       this.tiles.forEach(element => {
          this.clear(element);
       });

       this.tiles.forEach(element => {
          element.y += 1;
          this.draw(element);
       });
    }

    moveLeft(){
      this.tiles.forEach(element => {
         this.clear(element);
      });
      this.tiles.forEach(element => {
         element.x -= 1;
         this.draw(element);
      });
    }

    moveRight(){
      this.tiles.forEach(element => {
         this.clear(element);
      });
      this.tiles.forEach(element => {
         element.x += 1;
         this.draw(element);
      });
    }
 }