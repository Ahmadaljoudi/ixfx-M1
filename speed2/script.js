// #region Settings & state

// Define the initial application state
let state = {
  ballSpeed: 0,
  ballDirection: 1,
  ballX: 0,
  animationFrameId: null,
  lastClickTime: Date.now(),
  maxSpeed: 20,
  acceleration: 0.05,
  deceleration: 0.02,
  isClicked: false,
  minSpeed: 2, // the minimum speed below which the bicycle (ball) stops entirely.
};

// Get the DOM elements needed for the application
const container = document.getElementById("container");
const ball = document.getElementById("ball");
const button = document.getElementById("button");

// #endregion

const use = () => {
  // Get the current state values
  let {
    ballSpeed,
    ballDirection,
    ballX,
    acceleration,
    deceleration,
    maxSpeed,
    isClicked,
    minSpeed,
  } = state;

  // The dimensions of the container and ball
  const containerWidth = container.offsetWidth;
  const ballWidth = ball.offsetWidth;

  // Accelerate the ball to a maximum speed if button is clicked, decelerate otherwise
  if (isClicked && ballSpeed < maxSpeed) {
    ballSpeed += acceleration;
  } else if (!isClicked && ballSpeed > minSpeed) {
    ballSpeed -= deceleration;
  } else {
    ballSpeed = 0;
  }

  // Update ball position
  ballX += ballSpeed * ballDirection;

  // Reverse ball direction if it hits container edges
  if (ballX < 0 || ballX + ballWidth > containerWidth) {
    ballDirection *= -1;
  }

  // Update the position of the ball in the DOM
  ball.style.left = ballX + "px";

  // Update the size and color of the button based on the ball's speed
  const buttonSize = Math.max(10, ballSpeed * 10) + "px";
  const buttonColor = `rgb(${Math.max(0, 255 - ballSpeed * 100)}, 0, 0)`;
  button.style.width = buttonSize;
  button.style.height = buttonSize;
  button.style.backgroundColor = buttonColor;

  // Update the state with the new values
  saveState({
    ballSpeed,
    ballDirection,
    ballX,
    acceleration,
    deceleration,
    maxSpeed,
    isClicked,
    minSpeed,
  });
};

function setup() {
  // Start the animation loop
  animate();

  // Increase ball speed on button click
  button.addEventListener("mousedown", () => {
    saveState({ isClicked: true });
  });

  button.addEventListener("mouseup", () => {
    saveState({ isClicked: false });
  });
}

function animate() {
  use();
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

// Cleanup function to stop the animation when the window is closed or navigated away
window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(state.animationFrameId);
});

// Start the application
setup();

// #endregion
