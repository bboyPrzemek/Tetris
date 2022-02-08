class Board {

   constructor() {
      this.currentShape = '';
      this.width = 20;
      this.height = 25;
      this.array = new Array(this.height);
      this.initializeBoard();
      //this.log();
   }

   initializeBoard() {
      for (let i = 0; i < this.array.length; i++) {
         this.array[i] = new Array(this.width);
      }
      for (let i = 0; i < this.array.length; i++) {
         for (let j = 0; j < this.array[i].length; j++) {
            this.array[i][j] = 0;
         }
      }
   }

    checkCollisionBottom() {
      let moveable = false;
      if (this.currentShape) {
         this.currentShape.tiles.forEach(element => {
            if ((this.array[element.y + 1][element.x] == '1') || (element.y == 23)) {
               moveable = true;
            }
         })
      } else {
         if (this.array[1][10] == '1') {
            moveable = true;
         }
      }
      return moveable;

   }

    checkCollisionLeft(){
      let moveable = true;
      this.currentShape.tiles.forEach(element=>{
         if (element.x == 0 || this.array[element.y][element.x - 1] == '1'){
            moveable = false;
         }
      })
      return moveable;
   }

    checkCollisionRight(){
      let moveable = true;
      this.currentShape.tiles.forEach(element=>{
         if (element.x == 19 || this.array[element.y][element.x + 1] == '1'){
            moveable = false;
         }
      })
      return moveable;
   }

   checkRow(){
      let isRowFull = true;
      for (let i = 0; i < this.array.length; i++){
         for (let j = 0; j < this.array[i].length; j++){
             if (this.array[i][j] == '0' || this.array[i][j] == 'X'){
                isRowFull = false;
             }
         }
         if (isRowFull){
            for (let j = 0; j < this.array[i].length; j++){
               this.array[i][j] = '0';
           }
           this.updateBoard(i,500)
         }
         isRowFull = true;
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
         arr.innerHTML +="<br>";
      }
   }

   fillBoard() {
      this.currentShape.tiles.forEach(element => {
         this.array[element.y][element.x] = 1;
         console.log(element.x, "  ", element.y)
      })
      this.log();
   }
}