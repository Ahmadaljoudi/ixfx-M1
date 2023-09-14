let state = {
  ballSpeed: 0,
  ballDirection: 1,
  ballX: 0,
  animationFrameId: null,
  lastClickTime: Date.now(),
  maxSpeed: 300,
  deceleration: 0.04,
};

const container = document.getElementById("container");
const ball = document.getElementById("ball");
const button = document.getElementById("button");

const use = () => {
  let { ballSpeed, ballDirection, ballX, deceleration, startTime } = state;

  const containerWidth = container.offsetWidth;
  const ballWidth = ball.offsetWidth;

  const elapsedTime = (Date.now() - startTime) / 1000; // elapsed time in seconds
  
  // Make friction change faster and more noticeable.
  // Assuming you want maximum friction (0.7 here for stronger effect) to be reached in 10 seconds.
  const frictionFactor = Math.min(0.7, elapsedTime * 0.07);
  const friction = 1 - frictionFactor;
  
  if (ballSpeed > 0) {
    ballSpeed *= friction;
    ballSpeed -= deceleration;
    ballSpeed = Math.max(0, ballSpeed);
  }

  // Adjust hue change rate to complete in 10 seconds.
  const hue = Math.min(360, elapsedTime * 36);
  container.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;

  ballX += ballSpeed * ballDirection;

  if (ballX < 0 || ballX + ballWidth > containerWidth) {
    ballDirection *= -1;
  }

  ball.style.left = ballX + "px";

  console.log(ballSpeed);

  saveState({
    ballSpeed,
    ballDirection,
    ballX,
  });
};


function setup() {
  animate();

  button.addEventListener("click", () => {
    const currentTime = Date.now();
    const timeDiff = currentTime - state.lastClickTime; // Time difference in milliseconds

    // The faster you click, the more speed you gain. Adjust the division value for sensitivity.
    let speedBoost = 2000 / timeDiff;

    state.ballSpeed += speedBoost;
    state.ballSpeed = Math.min(state.ballSpeed, state.maxSpeed);

    state.lastClickTime = currentTime;

    console.log(`Speed boost: ${speedBoost}`);
  });
}

function animate() {
  use();
  state.animationFrameId = requestAnimationFrame(animate);
}

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
