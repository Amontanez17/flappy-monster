# Flappy Monster: A revisited classic

## by Angela Montanez                ## [Link to my presentation](https://docs.google.com/presentation/d/1_J5tcfN7KfCJM4gbol2riHvGo8C7kn6yYtLfTs1Xjfo/edit?usp=sharing)

### Why I chose this game:

I wanted to challenge myself to program a game that would be enjoyable to play but also visually captivating. I always enjoyed the gameplay in the original Flappy Bird and found that its game mechanics were simple to learn while still being a challenging game -- making it appeal to both casual and more seasoned gamers.

The use of gravity and collision dynamics were of particular interest to me in my learning journey.

This was my first project at the Ironhack Full-Stack Web Development program.

### Key Implementations:

- Programmed with Vanilla JavaScript, CSS, HTML.
- Object-oriented programming with the HTML Canvas and some Dom manipulation.

### Key Features:

- The gameplay itself if fully-responsive (however the start screen and button's responsiveness are a work-in-progress :)).
- Win condition is the time run -- the longer you stay. without colliding with an enemy, the higher your score!
- Lose condition is colliding with enemies.
- Special ability: The auto-replenishing speed boost to dash past your enemies.
- Gravity emulation in the way the character moves
- Seamless scrolling background.
- Dynamic collision through the use of round collision zones

### [TEST THE GAME HERE](https://amontanez17.github.io/flappy-monster/)

### What's Next:

- I'd like to create more levels with incremental difficulty and new environments and enemies.
- Potentially include a difficulty setting for seasoned-gamers to play in "chaos mode".
- The ability to locally store your highest score.
- A character select screen.
- Make all the screens and buttons fully-responsive -- for now only the gameplay screen is.
- Make an APK for mobile gameplay.

### Issues:

- Although the Canvas in HTML was fun to learn and implement, I encountered difficulties customizing certain elements in the Canvas, notably the text.
- Programming in the Canvas requires taking into account every single state of every class and a method for all those states. The code can get lengthy very quickly.
- Having the game fully developed within the canvas greatly reduced my flexibility in programming it. I would like to implement a similar game next time but without using the HTML Canvas and purely developing it through Dom manipulation.
