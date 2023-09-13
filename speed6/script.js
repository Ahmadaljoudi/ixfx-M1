// #region Settings & state

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
  minSpeed: 2,
};

const container = document.getElementById("container");
const ball = document.getElementById("ball");
const button = document.getElementById("button");

// #endregion

const use = () => {
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

  const containerWidth = container.offsetWidth;
  const ballWidth = ball.offsetWidth;

  if (isClicked && ballSpeed < maxSpeed) {
    ballSpeed += acceleration;
  } else if (!isClicked && ballSpeed > minSpeed) {
    ballSpeed -= deceleration;
  } else {
    ballSpeed = 0;
  }

  ballX += ballSpeed * ballDirection;

  if (ballX < 0 || ballX + ballWidth > containerWidth) {
    ballDirection *= -1;
    ball.style.transform = "scale(0.9)"; // Bounce effect
    setTimeout(() => (ball.style.transform = "scale(1)"), 100); // Reset after bounce
  }

  ball.style.left = ballX + "px";

  const buttonSize = Math.max(10, ballSpeed * 10) + "px";
  const buttonColor = `linear-gradient(45deg, rgb(${Math.max(
    0,
    255 - ballSpeed * 100
  )}, 0, 0), rgb(${Math.max(0, 255 - ballSpeed * 50)}, 0, 0))`;
  button.style.width = buttonSize;
  button.style.height = buttonSize;
  button.style.backgroundColor = buttonColor;
  button.style.transition = "width 0.3s, height 0.3s, background-color 0.3s"; // Smooth transition

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
  animate();

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

function saveState(s) {
  state = {
    ...state,
    ...s,
  };
}

window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(state.animationFrameId);
});

setup();

// #endregion
