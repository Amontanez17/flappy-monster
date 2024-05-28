class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.ctx.imageSmoothingEnabled = false;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    // this.baseHeight = 1441;
    this.baseHeight = 720;
    this.ratio = this.height / this.baseHeight;
    this.background = new Background(this);
    this.player = new Player(this);
    this.sound = new AudioControl();
    this.obstacles = [];
    this.numberOfObstacles = 3;
    this.animationId = null;

    this.bottomMargin;
    this.gravity;
    this.speed;
    this.minSpeed;
    this.maxSpeed;
    this.score;
    this.gameOver;
    this.timer;
    this.message1;
    this.message2;
    this.smallFont;
    this.largeFont;
    this.eventTimer = 0;
    this.eventInterval = 150;
    this.eventUpdate = false;
    this.touchStartX;
    this.swipeDistance = 50;

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", (e) => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });
    // Mouse controls
    this.canvas.addEventListener("mousedown", (e) => {
      this.player.flap();
    });
    this.canvas.addEventListener("mouseup", (e) => {
      this.player.wingsUp();
    });
    // keyboard controls
    window.addEventListener("keydown", (e) => {
      // console.log(e.key);
      if (e.key === " " || e.key === "Enter") {
        this.player.flap();
      }
      if (e.key === "Shift" || e.key.toLowerCase() === "c") {
        this.player.startCharge();
      }
      window.addEventListener("keyup", (e) => {
        this.player.wingsUp();
      });
    });
    // touch controls for mobile gameplay
    this.canvas.addEventListener("touchstart", (e) => {
      this.player.flap();
      this.touchStartX = e.changedTouches[0].pageX;
    });
    this.canvas.addEventListener("touchmove", (e) => {
      if (e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance) {
        this.player.startCharge();
      }
    });
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    // This is where I make sure the font style is rendered with each resize
    this.ctx.textAlign = "right";
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "white";
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ratio = this.height / this.baseHeight;

    this.bottomMargin = Math.floor(50 * this.ratio);
    this.smallFont = Math.ceil(20 * this.ratio);
    this.largeFont = Math.ceil(40 * this.ratio);
    this.ctx.font = this.smallFont + "px Bungee";
    this.gravity = 0.15 * this.ratio;
    this.speed = 2 * this.ratio;
    this.minSpeed = this.speed;
    this.maxSpeed = this.speed * 5;
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
    // if (this.gameOver) return;
    this.timer += deltaTime;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.handlePeriodicEvents(deltaTime);
    this.background.update();
    this.background.draw();
    this.drawStatusText();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach((obstacle) => {
      obstacle.update();
      obstacle.draw();
    });
    // console.log(this.obstacles);
  }
  // Function that runs to spawn obstacles on the game screen - starts as an empty array
  // createObstacles() {
  //   this.obstacles = [];
  //   const firstX = this.baseHeight * this.ratio;
  //   const obstacleSpacing = 500 * this.ratio;
  //   for (let i = 0; i < this.numberOfObstacles; i++) {
  //     this.obstacles.push(
  //       Math.random() > 0.2
  //         ? new Wraith(this, firstX + i * obstacleSpacing)
  //         : new BrownWraith(this, firstX + i * obstacleSpacing) :
  //       new PurpleWraith(this, firstX + i * obstacleSpacing)
  //     );
  //   }
  // }
  createObstacles() {
    this.obstacles = [];
    const firstX = this.baseHeight * this.ratio;
    const obstacleSpacing = 500 * this.ratio;
    for (let i = 0; i < this.numberOfObstacles; i++) {
      if (Math.random() > 0.3) {
        this.obstacles.push(new Wraith(this, firstX + i * obstacleSpacing));
      } else {
        if (Math.random() > 0.4) {
          this.obstacles.push(
            new BrownWraith(this, firstX + i * obstacleSpacing)
          );
        } else {
          if (Math.random() > 0.5) {
            this.obstacles.push(
              new PurpleWraith(this, firstX + i * obstacleSpacing)
            );
          }
        }
      }
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
  handlePeriodicEvents(deltaTime) {
    if (this.eventTimer < this.eventInterval) {
      this.eventTimer += deltaTime;
      this.eventUpdate = false;
    } else {
      this.eventTimer = this.eventTimer % this.eventInterval;
      this.eventUpdate = true;
      // console.log(this.eventTimer);
    }
  }
  formatTimer() {
    return (this.timer * 0.001).toFixed(1);
  }
  triggerGameOver() {
    if (!this.gameOver) {
      this.gameOver = true;
      if (this.obstacles.length <= 0) {
        this.sound.play(this.sound.win);
        this.message1 = "You crushed it!";
        this.message2 =
          "Can you do it faster than " + this.formatTimer() + " seconds?";
        this.speedX = 0;
      } else {
        this.sound.play(this.sound.lose);
        this.message1 = "Getting rusty?";
        this.speedX = 0;
        this.message2 = "Collision time " + this.formatTimer() + " seconds!";
      }
    }
  }
  drawStatusText() {
    this.ctx.save();
    // draws the current score and the #s represent the X Y coodrinates of the text
    this.ctx.fillText(
      "Score: " + this.score,
      this.width - this.smallFont,
      this.largeFont
    );
    this.ctx.textAlign = "left";
    this.ctx.fillText(
      "Timer: " + this.formatTimer(),
      this.smallFont,
      this.largeFont
    );
    if (this.gameOver) {
      this.ctx.textAlign = "center";
      this.ctx.font = this.largeFont + "px Bungee";
      this.ctx.strokeStyle = "black";
      this.ctx.fillText(
        this.message1,
        this.width * 0.5,
        this.height * 0.5 - this.largeFont,
        this.width
      );
      this.ctx.font = this.smallFont + "px Bungee";
      this.ctx.strokeStyle = "black";
      this.ctx.fillText(
        this.message2,
        this.width * 0.5,
        this.height * 0.5 - this.smallFont,
        this.width
      );
      // this.ctx.fillText(
      //   "Press 'R' to try again!",
      //   this.width * 0.5,
      //   this.height * 0.5 - this.smallFont,
      //   this.width
      // );
    }
    if (this.player.energy <= this.player.minEnergy) this.ctx.fillStyle = "red";
    else if (this.player.energy >= this.player.maxEnergy)
      this.ctx.fillStyle = "orangered";
    else this.ctx.fillStyle = "yellowgreen";
    for (let i = 0; i < this.player.energy; i++) {
      this.ctx.fillRect(
        10,
        this.height - 10 - this.player.barSize * i,
        this.player.barSize * 5,
        this.player.barSize
      );
    }
    this.ctx.restore();
  }
}

let welcomeScreen = document.getElementById("start-screen");
let startButton = document.getElementById("start-button-img");
startButton.addEventListener(
  "click",
  function () {
    welcomeScreen.classList.add("hidden");
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
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.render(deltaTime);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  },
  { once: true }
);

// inside of the animate function increment a count, set a max count 18, the player image source should be modified based on the counter. add a modulo % 18 so it restarts at zero
