let audioControl;
let now = Date.now();
let helpScreen = document.getElementById("help-screen");
let welcomeScreen = document.getElementById("start-screen");
let startButton = document.getElementById("start-button-img");
let helpButton = document.getElementById("help-button");
let muteButton = document.getElementById("sound-off-btn");

muteButton.addEventListener("click", handleMute);
document.getElementById("help-button").addEventListener("click", openHelp);
document.getElementById("exit-help").addEventListener("click", closeHelp);

//Mute Sound
function handleMute(e) {
  console.log(muteButton);
  audioControl.toggle();
}

// Function to open the help screen and hide the start screen
function openHelp() {
  document.getElementById("help-screen").style.display = "flex";
}

function closeHelp() {
  document.getElementById("help-screen").style.display = "none";
}

document.addEventListener(
  "mousemove",
  () => {
    audioControl = new AudioControl();
    audioControl.play(audioControl.startSong);
  },
  { once: true }
);
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

    let then = Date.now();
    const delta = then - now;
    let lastTime = 0 + delta;
    console.log(delta);
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
// if (window.matchMedia("(orientation: portrait)").matches) {
//   alert("Switch to Landscape mode!");
// }

if (screen.orientation.type.startsWith("portrait")) {
  screen.orientation
    .lock("landscape")
    .then(() => {
      console.log("locked to landscape");
    })
    .catch((error) => {
      console.log(error);
    });
}
