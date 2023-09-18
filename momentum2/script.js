let state = {
  ballSpeed: 0,
  ballDirection: 1,
  ballX: 0,
  animationFrameId: null,
  lastClickTime: Date.now(),
  maxSpeed: 400,
  deceleration: 0.02,
  startTime: Date.now(),
};

const container = document.getElementById("container");
const ball = document.getElementById("ball");
const button = document.getElementById("button");

const use = () => {
  let { ballSpeed, ballDirection, ballX, deceleration, startTime } = state;

  const containerWidth = container.offsetWidth;
  const ballWidth = ball.offsetWidth;

  const elapsedTime = (Date.now() - startTime) / 1000; // elapsed time in seconds

  // Increase friction with time
  const friction = 1 - Math.min(0.5, elapsedTime * 0.0005);

  if (ballSpeed > 0) {
    ballSpeed *= friction;
    ballSpeed -= deceleration;
    ballSpeed = Math.max(0, ballSpeed);
  }

  // Change the container background hue based on time
  const hue = Math.min(360, elapsedTime);
  container.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;
  // change the background color
  ball.style.backgroundColor = `hsl(${hue}, 50%, 100%)`;

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

button.addEventListener("click", () => {
  const currentTime = Date.now();
  const timeDiff = currentTime - state.lastClickTime; // Time difference in milliseconds

  let speedBoost = 500 / timeDiff; // Adjusting the value to give a reasonable speed boost
  state.ballSpeed += speedBoost;
  state.ballSpeed = Math.min(state.ballSpeed, state.maxSpeed);
  state.lastClickTime = currentTime;

  console.log(`Speed boost: ${speedBoost}`);
});

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

// Start the animation loop
animate();
