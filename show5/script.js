let state = Object.freeze({
  ballSpeed: 0,
  ballDirection: 1,
  ballX: 0,
  animationFrameId: null,
  lastClickTime: Date.now(),
  maxSpeed: 400,
  deceleration: 0.02,
  startTime: Date.now(),
  highFriction: false, // New state to toggle between high and low friction
});

const container = document.getElementById("container");
const ball = document.getElementById("ball");
const button = document.getElementById("button");

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function getColorBasedOnFriction(highFriction, elapsedTime) {
  const t = (elapsedTime % 5) / 5; // This will give a value between 0 and 1 over 5 seconds

  if (highFriction) {
    // Transition between yellow (60) and red (0)
    const hue = lerp(60, 0, t);
    return `hsl(${hue}, 100%, 50%)`;
  } else {
    // Transition between green (120) and yellow (60)
    const hue = lerp(120, 60, t);
    return `hsl(${hue}, 100%, 50%)`;
  }
}

const use = () => {
  let {
    ballSpeed,
    ballDirection,
    ballX,
    deceleration,
    startTime,
    highFriction,
  } = state;

  const containerWidth = container.offsetWidth;
  const ballWidth = ball.offsetWidth;

  const elapsedTime = (Date.now() - startTime) / 1000; // elapsed time in seconds

  // Toggle friction every 5 seconds
  if (Math.floor(elapsedTime) % 10 < 5) {
    highFriction = false;
  } else {
    highFriction = true;
  }

  // Increase friction with time
  const frictionMultiplier = highFriction ? 0.001 : 0.0002;
  const friction = 1 - Math.min(0.7, elapsedTime * frictionMultiplier);

  if (ballSpeed > 0) {
    ballSpeed *= friction;
    ballSpeed -= deceleration;
    ballSpeed = Math.max(0, ballSpeed);
  }

  // Change the background color based on friction
  document.body.style.backgroundColor = getColorBasedOnFriction(
    highFriction,
    elapsedTime
  );
  ball.style.backgroundColor = `black`;
  // You can adjust this if you want the ball color to change too

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
    highFriction,
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
