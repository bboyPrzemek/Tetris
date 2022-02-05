(function () {

   let canvas = document.getElementById('canvas');
   let ctx = canvas.getContext("2d");
   const WALL_COLOR = "#000000";
   const TILE_SIZE = 20;
   const ROWS = canvas.height / TILE_SIZE;
   const COLUMNS = canvas.width / TILE_SIZE;

   class Tile {
      constructor(x, y, color) {
         this.x = x;
         this.y = y;
         ctx.fillStyle = color;
         ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
         ctx.fillStyle = '#4287f5';
         ctx.fillRect(x * TILE_SIZE + 1, y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE -2);
      }

   }
   
   
   class Game{
      constructor(){
         this.createWalls();
      }

       createWalls(){
         for (let i = 0; i < ROWS; i++) {
            new Tile(0, i, WALL_COLOR);
            new Tile(COLUMNS - 1, i, WALL_COLOR);
         }
         for (let i = 0; i < COLUMNS; i++) {
            new Tile(i, 0, WALL_COLOR);
            new Tile(i, ROWS - 1, WALL_COLOR);
         }
      }

   }

   new Game();

}())