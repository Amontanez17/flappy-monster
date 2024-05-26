class Player {
  constructor(game) {
    this.game = game;
    this.x = 50;
    this.y = 60;
    this.spriteWidth = 200; //Sprite png given for the tutorial is 200px by 200px
    this.spriteHeight = 200;
    this.width;
    this.height;
  }
  draw() {
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    // this.x++;
  }
  resize() {
    this.width = 200;
    this.height = 200;
  }
}
