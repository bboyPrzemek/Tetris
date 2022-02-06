(function () {

   const tiles = [

      [
         [0, 1, 0, 0],
         [0, 1, 1, 0],
         [0, 0, 1, 0],
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
         [0, 0, 1, 0],
         [0, 0, 1, 0]
      ]

   ];
   let tileArr = [];
   const colors = [
      {x : "#f5ef42", y : "#000000"}, 
      {x : "#c70e1d", y : "#000000"}, 
      {x : "#4287f5", y : "#000000"},
      {x : "#00FFFE", y : "#000000"}, 
      {x : "#f54298", y : "#000000"}
   ];

   let board = [];
   
   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   let speed = 100;
   const BRICK_SIZE = 25;
   let randomTile = utils.randomNumber(0, tiles.length - 1);
   console.log(randomTile)



   class Tile {
      constructor(x, y, bgColor, bdColor) {
         this.x = x;
         this.y = y;
         this.bgColor = bgColor;
         this.bdColor = bdColor;
      }

      draw() {
         ctx.fillStyle = this.bdColor;
         ctx.fillRect(this.x * BRICK_SIZE, this.y * BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
         ctx.fillStyle = this.bgColor;
         ctx.fillRect(this.x * BRICK_SIZE + 1, this.y * BRICK_SIZE + 1, BRICK_SIZE - 1, BRICK_SIZE - 1);
      }

      clear() {
         ctx.clearRect(this.x * BRICK_SIZE, this.y * BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
      }
   }


   class Shape {
      constructor() {
         this.createRandomShape();
      }

      createRandomShape() {
         tileArr = [];
         randomTile = utils.randomNumber(0, tiles.length - 1);
         // let randomTile = utils.randomNumber(0, tiles.length - 1);
         let randomColor = Math.floor(Math.random() * colors.length + 0);
         let tile = tiles[randomTile];


         for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
               if (tile[i][j]) {
                  let tilex = new Tile(8 + j, i, colors[randomColor].x, colors[randomColor].y);
                  tileArr.push(tilex);
                  tilex.draw();
               }
            }
         }
      }
   }


   class Game {
      constructor() {
         this.play();
      }

      play() {
         requestAnimationFrame(move);
      }
   }

   function move() {
      setTimeout(function () {
         if (boardEndY()) {
            tileArr.forEach(elem=>{
               board.push(elem);
            })
            console.log(board)
            new Shape();
         }

         tileArr.forEach(element => {
            element.clear();
         });

         tileArr.forEach(element => {
            element.y += 1;
            element.draw();
         });
         requestAnimationFrame(move);
      }, speed);



   }

   document.body.onkeyup = function (e) {
      if (e.keyCode == 40) {
         if (boardEndY()) {
            return;
         }
         tileArr.forEach(element => {
            element.clear();
         });
         tileArr.forEach(element => {
            element.y += 1;
            element.draw();
         });

      } else if (e.keyCode == 37) {
         if (shouldStopMovingX(0)) {
            return;
         }
         tileArr.forEach(element => {
            element.clear();
         });
         tileArr.forEach(element => {
            element.x -= 1;
            element.draw();
         });

      } else if (e.keyCode == 39) {
         if (shouldStopMovingX(19)) {
            return;
         }
         tileArr.forEach(element => {
            element.clear();
         });
         tileArr.forEach(element => {
            element.x += 1;
            element.draw();
         });
      }
   }

   function shouldStopMovingX(posX) {
      let exit = false;
      tileArr.forEach(element => {
         if (element.x == posX) {
            exit = true;
         }
      })
      return exit;
   }

   function boardEndY() {
      let exit = false;
      if (!tileArr.length) {
         return true;
      } else {
         tileArr.forEach(element => {
            if (element.y == 23) {
               exit = true;
            }
         })
         return exit;
      }
   }

   new Game();

}())