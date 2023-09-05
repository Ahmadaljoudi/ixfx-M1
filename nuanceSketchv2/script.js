import { Easings } from "../ixfx/modulation.js";

const easing = Easings.time("quintIn", 10000);

// #region Settings & state
// @ts-ignore
const settings = Object.freeze({});

let state = Object.freeze({
  easingValue: 0,
  isRunning: false,
  clickSpeed: 0,
  lastClickTime: Date.now(),
  directionx: 1,
});
// #endregion

const use = () => {
  const { easingValue, isRunning, clickSpeed, directionx } = state;

  const updatedEasing = (easing.compute() + 0.00000001) % 1;

  // Update state
  saveState({
    ...state,
    easingValue: updatedEasing,
  });

  // Only run the animation if isRunning is true
  if (!isRunning) {
    return;
  }

  // 1. Display values
  const easingValueElement = document.querySelector(`#easingValue`);
  if (easingValueElement) {
    easingValueElement.textContent = easingValue.toFixed(2);
  }

  const speedo = document.querySelector(`#speedo`);
  if (speedo) {
    speedo.textContent = clickSpeed.toFixed(2);
  }

  // 2. Use it to Change the element's position
  const thing = document.querySelector(`#thing`);

  if (thing) {
    const windowWidth = window.innerWidth;
    const ballWidth = thing.getBoundingClientRect().width;
    const maxTranslateX = windowWidth - ballWidth;
    let translateX = 5000 * easingValue * directionx;

    if (translateX > maxTranslateX || translateX < 0) {
      directionx *= -1; // Reverse the direction
    }

    // Adjust translateX based on direction
    translateX += directionx;

    thing.style.transform = `translate(${translateX}px, 0px)`;
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
