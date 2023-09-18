import { Easings } from "../ixfx/modulation.js";

const easing = Easings.time("quintIn", 10000);

// #region Settings & state
// @ts-ignore
// @ts-ignore
const settings = Object.freeze({});

let state = Object.freeze({
  easingValue: 0,
  isRunning: false, // Add a new state variable to track if the animation is running
  startTime: 0, // Added a start time for the mouse click event.
  originalCircleSpeed: 700,
  holdingValue: 0,
});
// #endregion

const use = () => {
  const {
    // @ts-ignore
    easingValue,
    isRunning,
    startTime,
    originalCircleSpeed,
    holdingValue,
  } = state;

  // Calculate the duration based on the current time and start time
  const duration = Date.now() - startTime;

  // Only run the animation if isRunning is true
  if (!isRunning) {
    return;
  }

  // Adjust the speed of the circle animation based on the duration
  const speedFactor = 1 + duration / 500; // Adjust this factor as needed
  const circleSpeed = originalCircleSpeed * speedFactor; // Use the adjusted speed

  // Use easingValue compined with circleSpeed:
  const newPosition = easing.compute() * circleSpeed;

  // Update the position of the circle using the new speed
  const thing = document.querySelector("#thing");
  if (thing) {
    const translateX = newPosition;
    const translateY = Math.sin(newPosition * Math.PI * 2) * 50; // Adjust the amplitude of the wiggle effect by changing the multiplier
    // @ts-ignore
    thing.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }

  // Update state
  // @ts-ignore
  saveState({ easingValue: easing.compute() });

  // Update the holding value on the screen
  const holding = document.getElementById("holding");
  if (holding) {
    holding.textContent = "Held for " + holdingValue + "ms";
  }
};

function setup() {
  // @ts-ignore
  const { holdingValue } = state;
  const holding = document.getElementById("holding");

  // Add an event listener for the button click event
  const startButton = document.getElementById("startButton");
  // @ts-ignore
  startButton.addEventListener("mousedown", () => {
    // @ts-ignore
    saveState({ isRunning: true, startTime: Date.now() });
  });

  // @ts-ignore
  startButton.addEventListener("mouseup", () => {
    saveState({ isRunning: false });

    const duration = Date.now() - state.startTime;
    console.log("Button press duration:", duration, "ms");
    // @ts-ignore
    if (holding) saveState({ holdingValue: duration });
    // @ts-ignore
    holding.textContent = "Held for " + duration + "ms";
  });

  setInterval(use, 1);
}

/**
 * Save state
 * @param {Partial<state>} s
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s,
  });
}

setup();
