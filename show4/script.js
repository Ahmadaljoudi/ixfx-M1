// #region Settings & state

let state = {
  ballSpeedX: 0,
  ballDirectionX: 1,
  ballSpeedY: 0,
  ballDirectionY: 1,
  ballX: 0,
  ballY: 0,
  animationFrameId: null,
  lastClickTime: Date.now(),
  maxSpeed: 400,
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
    ballSpeedX,
    ballDirectionX,
    ballSpeedY,
    ballDirectionY,
    ballX,
    ballY,
    acceleration,
    deceleration,
    maxSpeed,
    isClicked,
    minSpeed,
  } = state;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const ballWidth = ball.offsetWidth;
  const ballHeight = ball.offsetHeight;

  if (isClicked) {
    if (ballSpeedX < maxSpeed) {
      ballSpeedX += acceleration;
    }
    if (ballSpeedY < maxSpeed) {
      ballSpeedY += acceleration;
    }
  } else {
    if (ballSpeedX > minSpeed) {
      ballSpeedX -= deceleration;
    } else {
      ballSpeedX = 0;
    }
    if (ballSpeedY > minSpeed) {
      ballSpeedY -= deceleration;
    } else {
      ballSpeedY = 0;
    }
  }

  ballX += ballSpeedX * ballDirectionX;
  ballY += ballSpeedY * ballDirectionY;

  if (
    ballX < 0 ||
    ballX + ballWidth > containerWidth ||
    ballSpeedX > maxSpeed
  ) {
    ballDirectionX *= -1;
  }

  if (
    ballY < 0 ||
    ballY + ballHeight > containerHeight ||
    ballSpeedY > maxSpeed
  ) {
    ballDirectionY *= -1;
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  const buttonSize = Math.max(10, ballSpeedX + ballSpeedY) + "px";
  const buttonColor = `linear-gradient(45deg, rgb(${Math.max(
    0,
    255 - (ballSpeedX + ballSpeedY) * 50
  )}, 0, 0), rgb(${Math.max(0, 255 - (ballSpeedX + ballSpeedY) * 25)}, 0, 0))`;
  button.style.width = buttonSize;
  button.style.height = buttonSize;
  button.style.backgroundColor = buttonColor;
  button.style.transition = "width 0.3s, height 0.3s, background-color 0.3s"; // Smooth transition

  saveState({
    ballSpeedX,
    ballDirectionX,
    ballSpeedY,
    ballDirectionY,
    ballX,
    ballY,
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
