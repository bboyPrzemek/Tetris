(function () {

   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   
   const bWidth = canvas.width/30;
   const bHeight = canvas.height/30;
   let speed = 300;
   let gameover = false;
   let board = new Board(bWidth, bHeight, ctx);
  
   let pause = false;


   
   function play() {
      if (gameover || pause) {
         return;
      }
      setTimeout(function () {
         if (!board.currentShape && !board.canBottom()) {
            board.currentShape = createShape();
         }
         if (board.currentShape) {
            if (!board.canBottom()) {
               board.moveBottom();
               
            } else {
               board.addShape();
               board.clearFullRows();
               board.currentShape = '';
            }
         }
         requestAnimationFrame(play);
      }, speed);
}
   
   function createShape() {
      const shapes = ["a", "b", "c", "d", "e", "f", "g"];
      const randomTile = utils.randomNumber(0, shapes.length - 1);
      const colorNum = utils.randomNumber(0, colors.length - 1);
      return new Shape(tiles[0][shapes[randomTile]], colors[colorNum]);
   }

   document.body.onkeyup = function (e) {
      if (!board.currentShape) {
         return;
      }
      if (e.keyCode == 40) {
         moveDown();
      } else if (e.keyCode == 37) {
         moveLeft();
      } else if (e.keyCode == 39) {
         moveRight();
      }else if (e.keyCode == 32) {
         rotate();
      }
   }

   function rotate(){
      board.rotate();
   }

   function moveLeft() {
      board.moveLeft();
   }

   function moveRight() {
      board.moveRight();
   }

   function moveDown() {
      board.moveBottom();
   }

   
   document.getElementById("pauseBtn").onclick = function(){ 
      pause = !pause
      if (!pause){
         play();
      }
   }
   
   document.getElementById("newGameBtn").onclick = function(){ 
      ctx.clearRect(0, 0, canvas.width,canvas.height)
      board = new Board(bWidth, bHeight, ctx);
      if (pause){
         pause = false;
         play(); 
      }  
   }
   
   play();

}())