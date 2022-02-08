(function () {

   const tiles = [

      [
         [0, 1, 0, 0],
         [0, 1, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 0, 0]
      ],
      [
         [0, 1, 0, 0],
         [1, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0]
      ],
      [
         [0, 0, 1, 0],
         [0, 1, 1, 0],
         [0, 1, 0, 0],
         [0, 0, 0, 0]
      ],
      [
         [0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0]
      ],
      [
         [0, 1, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 0, 0]
      ],

      [
         [0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0]
      ],

      [
         [0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 1, 0]
      ]

   ];

   const colors = ['#f5ef42', '#c70e1d', '#4287f5', '#00FFFE', '#f54298'];

   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   let speed = 20;
   let gameover = false;
   let board = new Board();

   
   function play() {
      if (gameover) {
         return;
      }
      setTimeout(function () {
         if (!board.currentShape && !board.checkCollisionBottom()) {
            board.currentShape = createShape();
         }
         if (board.currentShape) {
            if (!board.checkCollisionBottom()) {
               board.currentShape.moveDown();
               
            } else {
               board.fillBoard();
               board.checkRow();
               board.currentShape = '';
            }
         }
         requestAnimationFrame(play);
      }, speed);
   }
   
   function createShape() {
      const randomTile = utils.randomNumber(0, tiles.length - 1);
      const colorNum = utils.randomNumber(0, colors.length - 1);
      return new Shape(tiles[randomTile], colors[colorNum], ctx);

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
      }
   }

   function moveLeft() {
      if (!board.checkCollisionLeft()) {
         return;
      }
      board.currentShape.moveLeft();
   }

   function moveRight() {
      if (!board.checkCollisionRight()) {
         return;
      }
      board.currentShape.moveRight();
   }

   function moveDown() {
      if (board.checkCollisionBottom()) {
         return;
      }
      board.currentShape.moveDown();

   }

   requestAnimationFrame(play);


}())