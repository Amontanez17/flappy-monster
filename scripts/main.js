class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.baseHeight = 720;
    this.ratio = this.height / this.baseHeight;
    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacles = [];
    this.numberOfObstacles = 1;

    this.gravity;
    this.speed;
    this.score;
    this.gameOver;
    this.timer;
    this.message1;
    this.message2;

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", (e) => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });
    // Mouse controls
    this.canvas.addEventListener("mousedown", (e) => {
      this.player.flap();
    });
    // keyboard controls
    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      if (e.key === " " || e.key === "Enter") this.player.flap();
    });
    // touch controls for mobile gameplay
    this.canvas.addEventListener("touchstart", (e) => {
      this.player.flap();
    });
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.fillStyle = "blue";
    // This is where I make sure the font style is rendered with each resize
    this.ctx.font = "15px Bungee";
    this.ctx.textAlign = "right";
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "white";
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ratio = this.height / this.baseHeight;

    this.gravity = 0.15 * this.ratio;
    this.speed = 3 * this.ratio;
    this.background.resize();
    this.player.resize();
    this.createObstacles();
    this.obstacles.forEach((obstacle) => {
      obstacle.resize();
    });
    this.score = 0;
    this.gameOver = false;
    this.timer = 0;
  }

  render(deltaTime) {
    if (!this.gameOver) this.timer += deltaTime;
    this.background.update();
    this.background.draw();
    this.drawStatusText();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach((obstacle) => {
      obstacle.update();
      obstacle.draw();
    });
    console.log(this.obstacles);
  }
  // Function that runs to spawn obstacles on the game screen - starts as an empty array
  createObstacles() {
    this.obstacles = [];
    const firstX = this.baseHeight * this.ratio;
    const obstacleSpacing = 600 * this.ratio;
    for (let i = 0; i < this.numberOfObstacles; i++) {
      this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
    }
  }
  checkCollision(a, b) {
    const dx = a.collisionX - b.collisionX;
    const dy = a.collisionY - b.collisionY;
    // Check collision between two points in space here it's hypot bcause the distance creates a triangle between the two points
    const distance = Math.hypot(dx, dy);
    const sumOfRadii = a.collisionRadius + b.collisionRadius;
    return distance <= sumOfRadii;
  }
  formatTimer() {
    return (this.timer * 0.001).toFixed(1);
  }
  drawStatusText() {
    this.ctx.save();
    // draws the current score and the #s represent the X Y coodrinates of the text
    this.ctx.fillText("Score: " + this.score, this.width - 10, 30);
    this.ctx.textAlign = "left";
    this.ctx.fillText("Timer: " + this.formatTimer(), 10, 30);
    if (this.gameOver) {
      if (this.player.collided) {
        console.log(this.player.collided);
        this.message1 = "Getting rusty?";
        this.message2 = "Collision time " + this.formatTimer() + " seconds!";
      } else if (this.obstacles.length <= 0) {
        this.message1 = "Killing it!";
        this.message2 =
          "Can you do it faster than " + this.formatTimer() + " seconds?";
      }
      this.ctx.textAlign = "center";
      this.ctx.font = "30px Bungee";
      this.ctx.fillText(
        this.message1,
        this.width * 0.5,
        this.height * 0.5 - 40
      );
      this.ctx.font = "15px Bungee";
      this.ctx.fillText(
        this.message2,
        this.width * 0.5,
        this.height * 0.5 - 20
      );
      this.ctx.fillText(
        "Press 'R' to try again!",
        this.width * 0.5,
        this.height * 0.5
      );
    }
    for (let i = 0; i < this.player.energy; i++) {
      this.ctx.fillRect(10 + i * 6, 40, 5, 15);
    }
    this.ctx.restore();
  }
}

startButton = document.getElementById("start-button");
startButton.addEventListener("click", function () {
  const canvas = document.getElementById("canvas1");
  canvas.classList.remove("hidden");
  const ctx = canvas.getContext("2d");
  canvas.width = 720;
  canvas.height = 720;

  const game = new Game(canvas, ctx);

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(deltaTime);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
