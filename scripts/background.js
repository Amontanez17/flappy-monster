class Background {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("background");
    // Make sure I change these values to match my bg source image once I customize it
    this.width = 2400;
    this.height = this.game.baseHeight;
    this.scaledWidth;
    this.scaledHeight;
    this.x;
  }
  update() {
    this.x -= this.game.speed;
    if (this.x <= -this.scaledWidth) this.x = 0;
  }
  draw() {
    this.game.ctx.drawImage(
      this.image,
      this.x,
      0,
      this.scaledWidth,
      this.scaledHeight
    );
    this.game.ctx.drawImage(
      this.image,
      this.x + this.scaledWidth - 2,
      0,
      this.scaledWidth,
      this.scaledHeight
    );
  }
  resize() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    this.x = 0;
  }
}
