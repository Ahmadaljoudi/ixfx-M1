// #region Settings & state

// Define the initial state
let state = {
  ballSpeed: 2,
  ballDirection: 1,
  ballX: 0,
  animationFrameId: null,
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
  // Start the ball movement
  use();

  // Increase ball speed on button click
  button.addEventListener("click", () => {
    const newSpeed = state.ballSpeed + 1;
    saveState({ ballSpeed: newSpeed });
  });

  // Call the use function every half a second
  state.animationFrameId = setInterval(use, 1);
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
  clearInterval(state.animationFrameId);
});

// Start the application
setup();

// #endregion
