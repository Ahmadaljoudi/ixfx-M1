// #region Settings & state

// Define the initial application state
let state = {
  ballSpeed: 0,
  ballDirection: 1,
  ballX: 0,
  animationFrameId: null,
  lastClickTime: Date.now(),
  maxSpeed: 2,
  acceleration: 0.01,
};

// Get the DOM elements needed for the application
const container = document.getElementById("container");
const ball = document.getElementById("ball");
const button = document.getElementById("button");

// #endregion

const use = () => {
  // Get the current state values
  let { ballSpeed, ballDirection, ballX, acceleration, maxSpeed } = state;

  // The dimensions of the container and ball
  // @ts-ignore
  const containerWidth = container.offsetWidth;
  // @ts-ignore
  const ballWidth = ball.offsetWidth;

  // Accelerate the ball to a maximum speed
  if (ballSpeed < maxSpeed) {
    ballSpeed += acceleration;
  }

  // Update ball position
  ballX += ballSpeed * ballDirection;

  // Reverse ball direction if it hits container edges
  if (ballX < 0 || ballX + ballWidth > containerWidth) {
    ballDirection *= -1;
  }

  // Update the position of the ball in the DOM
  // @ts-ignore
  ball.style.left = ballX + "px";

  // Update the size and color of the button based on the ball's speed
  const buttonSize = Math.max(10, ballSpeed * 10) + "px";
  const buttonColor = `rgb(${Math.max(0, 255 - ballSpeed * 100)}, 0, 0)`;
  // @ts-ignore
  button.style.width = buttonSize;
  // @ts-ignore
  button.style.height = buttonSize;
  // @ts-ignore
  button.style.backgroundColor = buttonColor;

  // Update the state with the new values
  saveState({
    ballSpeed,
    ballDirection,
    ballX,
    acceleration,
    maxSpeed,
  });
};

function setup() {
  // Start the animation loop
  animate();

  // Increase ball speed on button click
  // @ts-ignore
  button.addEventListener("click", () => {
    const clickSpeed = calculateClickSpeed();
    const newSpeed = clickSpeed;
    saveState({ maxSpeed: newSpeed });
    const speed = document.getElementById("speed");
    // @ts-ignore
    speed.textContent = `Controlled speed : ${newSpeed.toFixed(2)}`;
  });
}

function animate() {
  use();
  // @ts-ignore
  state.animationFrameId = requestAnimationFrame(animate);
}

// #region Toolbox

// Function to update the application state
function saveState(s) {
  state = {
    ...state,
    ...s,
  };
}

function calculateClickSpeed() {
  const { lastClickTime, ...rest } = state;
  const currentTime = Date.now();
  const clickSpeed = 1 / ((currentTime - lastClickTime) / 1000); // Speed in clicks per second
  const newSpeed = clickSpeed; // Adjust the ball speed based on the click speed
  saveState({ ...rest, lastClickTime: currentTime });
  return newSpeed;
}

// Cleanup function to stop the animation when the window is closed or navigated away
window.addEventListener("beforeunload", () => {
  // @ts-ignore
  cancelAnimationFrame(state.animationFrameId);
});

// Start the application
setup();

// #endregion
