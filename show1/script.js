import { Easings } from "../ixfx/modulation.js";
const easingValueElement = document.querySelector(`#easingValue`);
const speedo = document.querySelector(`#speedo`);

const easing = Easings.time("quintIn", 10000);

// #region Settings & state
// @ts-ignore
const settings = Object.freeze({});

let state = Object.freeze({
  easingValue: 0,
  isRunning: false,
  clickSpeed: 0,
  lastClickTime: Date.now(),
});
// #endregion

const use = () => {
  const { easingValue, isRunning, clickSpeed } = state;
  const updatedEasing = easing.compute();

  // only run the animation if isRunning is true
  if (!isRunning) {
    return;
  }

  // Update state
  saveState({
    ...state,
    easingValue: updatedEasing,
  });

  if (easingValueElement) {
    easingValueElement.textContent = easingValue.toFixed(2);
  }

  if (speedo) {
    speedo.textContent = clickSpeed.toFixed(2);
  }

  // REGION FOR ANIMATION

  const thing = document.querySelector("#thing");
  let width = screen.width;

  let speedOfMoving = easingValue * 500 * clickSpeed;

  if (thing) {
    thing.style.transform = `translate(${speedOfMoving}px, 0px)`;
  }
};

function setup() {
  // Add an event listener for the scroll wheel event
  window.addEventListener("wheel", (event) => {
    // Check if scroll wheel direction is up
    if (event.deltaY < 0) {
      // @ts-ignore
      saveState({ isRunning: true, clickSpeed: calculateClickSpeed() });
    }
  });

  // Add an event listener for the button click event
  const startButton = document.getElementById("startButton");
  // @ts-ignore
  startButton.addEventListener("click", () => {
    // @ts-ignore
    saveState({ isRunning: true, clickSpeed: calculateClickSpeed() });
  });

  // Call every half a second
  setInterval(use, 1);
}

// Calculates the click speed based on the time between clicks
function calculateClickSpeed() {
  const { lastClickTime, ...rest } = state;
  const currentTime = Date.now();
  const clickSpeed = 1 / ((currentTime - lastClickTime) / 1000); // Speed in clicks per second
  saveState({ ...rest, lastClickTime: currentTime });
  return clickSpeed;
}

// #region Toolbox
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
// #endregion
