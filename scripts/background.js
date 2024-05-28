class Background {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("background");
    // Make sure I change these values to match my bg source image once I customize it
    this.width = 2401;
    // this.width = 4801;
    this.height = this.game.baseHeight;
    this.scaledWidth;
    this.scaledHeight;
    this.x;
  }
  update() {
    this.x -= this.game.speed;
    // this.x -= 1;
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
      this.x + this.scaledWidth - 2.8,
      0,
      this.scaledWidth,
      this.scaledHeight
    );
    if (this.game.canvas.width >= this.scaledWidth) {
      this.game.ctx.drawImage(
        this.image,
        this.x + this.scaledWidth * 2 - 3,
        0,
        this.scaledWidth,
        this.scaledHeight
      );
    }
  }
  resize() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    this.x = 0;
  }
}
