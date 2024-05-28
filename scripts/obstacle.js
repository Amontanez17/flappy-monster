class Obstacle {
  constructor(game, x) {
    this.game = game;
    // Match the sprite file's size
    this.spriteWidth = 120;
    this.spriteHeight = 120;
    this.scaledWidth = this.spriteWidth * this.game.ratio;
    this.scaledHeight = this.spriteHeight * this.game.ratio;
    this.x = x;
    this.y = Math.random() * (this.game.height - this.scaledHeight);
    this.collisionX;
    this.collisionY;
    this.collisionRadius;
    this.speedY =
      Math.random() < 0.5 ? -1 * this.game.ratio : 1 * this.game.ratio;
    this.markedForDeletion = false;
    this.image = document.getElementById("obstacle_wraith");
    this.frameX = 0;
  }
  update() {
    this.x -= this.game.speed;
    this.y += this.speedY;
    this.collisionX = this.x + this.scaledWidth * 0.5;
    this.collisionY = this.y + this.scaledHeight * 0.5;
    if (!this.game.gameOver) {
      if (this.y <= 0 || this.y >= this.game.height - this.scaledHeight) {
        this.speedY *= -1;
      }
    } else {
      this.speedY += 0.1;
    }
    if (this.isOffScreen()) {
      this.markedForDeletion = true;
      this.game.obstacles = this.game.obstacles.filter(
        (obstacle) => !obstacle.markedForDeletion
      );
      //   console.log(this.game.obstacles.length);
      this.game.score++;
      if (this.game.obstacles.length <= 0) this.game.triggerGameOver();
    }
    if (this.game.checkCollision(this, this.game.player)) {
      // this.game.gameOver = true;
      this.game.player.collided = true;
      this.game.player.stopCharge();
      this.game.triggerGameOver();
    }
  }
  draw() {
    // this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
    this.game.ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.scaledWidth,
      this.scaledHeight
    );
    this.game.ctx.beginPath();
    this.game.ctx.arc(
      this.collisionX,
      this.collisionY,
      this.collisionRadius,
      0,
      Math.PI * 2
    );
    // this.game.ctx.stroke();
  }
  resize() {
    this.scaledWidth = this.spriteWidth * this.game.ratio;
    this.scaledHeight = this.spriteHeight * this.game.ratio;
    this.collisionRadius = this.scaledWidth * 0.4;
  }
  isOffScreen() {
    return this.x < -this.scaledWidth || this.y > this.game.height;
  }
}

class Wraith extends Obstacle {
  constructor(game, x) {
    super(game, x);
    this.frameX = 0;
    this.maxFrames = 4;
    this.image = document.getElementById("obstacle_wraith");
    setInterval(() => {
      this.frameX++;
      this.frameX %= 4;
    }, 250);
  }
}

class BrownWraith extends Wraith {
  constructor(game, x) {
    super(game, x);
    this.image = document.getElementById("brown_wraith");
  }
}

class PurpleWraith extends Wraith {
  constructor(game, x) {
    super(game, x);
    this.image = document.getElementById("purple_wraith");
  }
}
