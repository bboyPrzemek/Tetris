class Board {

   constructor(width, height, ctx) {
      this.width = width;
      this.height = height;
      this.ctx = ctx;
      this.array = new Array(this.height);
      this.currentShape = '';
      this.points = 0;
      this.initializeBoard();
      this.log();
   }

   initializeBoard() {
      console.log('1')
      for (let i = 0; i < this.array.length; i++) {
         this.array[i] = new Array(this.width);
      }
      for (let i = 0; i < this.array.length; i++) {
         for (let j = 0; j < this.array[i].length; j++) {
            this.array[i][j] = 0;
         }
      }
   }

   getFullRows() {
      let isRowFull = true;
      let fullRows = [];
      for (let i = 0; i < this.array.length; i++) {
         for (let j = 0; j < this.array[i].length; j++) {
            if (this.array[i][j] == '0') {
               isRowFull = false;
            }
         }
         if (isRowFull) {
            fullRows.push(i);
         }
         isRowFull = true;
      }
      console.log(fullRows)
      return fullRows;

   }

   clearFullRows() {
      this.log()
      let rowsToClear = this.getFullRows();
      rowsToClear.sort();
      if (rowsToClear != '') {

         rowsToClear.forEach(row => {
            this.array.forEach((cols, i) => {
               cols.forEach((rows, j) => {
                  if (rows.y == row) {
                     this.array[i][j] = 0;
                  }
               })
            })
            this.log();
            this.ctx.clearRect(0, row * 30, 300, 30);
         })

         rowsToClear.forEach(e => {
            this.updateBoard(e);
            this.points += 10;
         })
         this.log();
      }

   }

   updateBoard(x) {
      for (let j = x; j > 0; j--) {
         for (let i = 0; i < this.array[j].length; i++) {

            this.array[j][i] = this.array[j - 1][i];
            if (this.array[j - 1][i]) {
               this.clearTile(this.array[j - 1][i]);
               this.array[j - 1][i].moveDown()
               this.draw(this.array[j][i])
            }

         }
      }
   }


   log() {
      let arr = document.getElementById('arr');
      arr.innerHTML = "";
      console.log(arr)
      for (let i = 0; i < this.array.length; i++) {
         for (let j = 0; j < this.array[i].length; j++) {
            arr.innerHTML += this.array[i][j] + " ";
         }
         arr.innerHTML += "<br>";
      }
   }



   addShape() {
      this.currentShape.tiles.forEach(tile => {
         this.array[tile.y][tile.x] = tile;
      })
   }

   drawShape() {
      this.currentShape.tiles.forEach(tile => {
         this.draw(tile);
      })
   }


   canBottom() {
      let moveable = false;
      if (this.currentShape) {
         this.currentShape.tiles.forEach(element => {
            if (element.y == this.height - 1 || this.array[element.y + 1][element.x]) {
               moveable = true;
            }
         })

      } else {
         console.log(this.array)
         if (this.array[1][5]) {
            moveable = true;
         }
      }

      return moveable;
   }

   moveBottom() {
      if (!this.canBottom()) {
         this.clearShape();
         this.currentShape.moveDown();
         this.drawShape();
      }
   }

   moveLeft() {
      if (this.canLeft()) {
         this.clearShape();
         this.currentShape.moveLeft();
         this.drawShape();
      }
   }

   moveRight() {
      if (this.canRight()) {
         this.clearShape();
         this.currentShape.moveRight();
         this.drawShape();
      }
   }

   rotate(){
      if (this.canRotate()){
         this.clearShape();
         this.currentShape.rotate();
         this.drawShape();
      }
   }

   canLeft() {
      let moveable = true;
      this.currentShape.tiles.forEach(element => {
         if (element.x == 0 || this.array[element.y][element.x - 1]) {
            moveable = false;
         }
      })
      return moveable;
   }

   canRight() {
      let moveable = true;
      this.currentShape.tiles.forEach(element => {
         if (element.x == this.width - 1 || this.array[element.y][element.x + 1]) {
            moveable = false;
         }
      })
      return moveable;
   }

   canRotate() {
      this.currentShape.calcNextRotatedShape();
      let moveable = true;
      this.currentShape.nextRotated.forEach(element => {
         if (element.x == this.width || this.array[element.y][element.x + 1] ||
            this.array[element.y + 1][element.x] ||
            this.array[element.y][element.x] == '1' || element.x < 0
         ) {
            moveable = false;
         }
      })
      return moveable;

   }

   draw(tile) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(tile.x * 30, tile.y * 30, 30, 30);
      this.ctx.fillStyle = tile.color;
      this.ctx.fillRect(tile.x * 30 + 1, tile.y * 30 + 1, 30 - 2, 30 - 2);
   }

   clearTile(tile) {
      this.ctx.clearRect(tile.x * 30, tile.y * 30, 30, 30);
   }

   clearShape() {
      this.currentShape.tiles.forEach(t => {
         this.ctx.clearRect(t.x * 30, t.y * 30, 30, 30);
      });
   }
}