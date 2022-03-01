class Shape {
   constructor(tilePattern, color) {
      this.tiles = [];
      this.nextRotated = [];
      this.color = color;
      this.index = utils.randomNumber(0, 3);
      this.tilePattern = tilePattern;
      this.init();
   }

   init() {
      this.createShape();
      this.calcNextRotatedShape();
   }

   createShape() {
      for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 4; j++) {
            if (this.tilePattern[this.index][i][j]) {
               this.tiles.push(new Tile(4 + j, i, this.color));
            }
         }
      }
   }

   calcNextRotatedShape(){
      let k = this.index;
      let x = this.tiles[0].x - 1;
      let y = this.tiles[0].y;
      this.nextRotated = []; 

      k = this.index == 3 ? 0 : k + 1;

      for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 4; j++) {
            if (this.tilePattern[k][i][j]) {
              this.nextRotated.push(new Tile(x + j, y + i, this.color));
            }
         }
      }
   }

   rotate() {
      if (this.index == 3) {
         this.index = 0;
      } else {
         this.index +=1;
      }
      this.tiles = this.nextRotated;
   }

   moveDown() {
      this.tiles.forEach(tile => {
         tile.moveDown();
      });
   }

   moveLeft() {
      this.tiles.forEach(tile => {
        tile.moveLeft();
      });
   }

   moveRight() {
      this.tiles.forEach(tile => {
       tile.moveRight();
      });
   }
}