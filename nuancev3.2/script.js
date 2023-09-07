// #region Settings & state

// Define the initial application state
let state = {
  ballSpeed: 1,
  ballDirection: 1,
  ballX: 0,
  animationFrameId: null,
  lastClickTime: Date.now(),
};

// Get the DOM elements needed for the application
const container = document.getElementById("container");
const ball = document.getElementById("ball");
const button = document.getElementById("button");

// #endregion

const use = () => {
  // Get the current state values
  let { ballSpeed, ballDirection, ballX, animationFrameId } = state;

  // The dimensions of the container and ball
  const containerWidth = container.offsetWidth;
  const ballWidth = ball.offsetWidth;

  // Update ball position
  ballX += ballSpeed * ballDirection;

  // Reverse ball direction if it hits container edges
  if (ballX < 0 || ballX + ballWidth > containerWidth) {
    ballDirection *= -1;
  }

  // Update the position of the ball in the DOM
  ball.style.left = ballX + "px";

  // Update the state with the new values
  saveState({
    ballSpeed,
    ballDirection,
    ballX,
    animationFrameId,
  });
};

function setup() {
  // Start the animation loop
  animate();

  // Increase ball speed on button click
  button.addEventListener("click", () => {
    const clickSpeed = calculateClickSpeed();
    const newSpeed = clickSpeed;
    saveState({ ballSpeed: newSpeed });
    console.log(newSpeed);
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
  cancelAnimationFrame(state.animationFrameId);
});

// Start the application
setup();

// #endregion
