import { Easings } from "../ixfx/modulation.js";

const easing = Easings.time("quintIn", 5000);

// #region Settings & state
// @ts-ignore
const settings = Object.freeze({});

let state = Object.freeze({
  easingValue: 0,
  isRunning: false,
  clickSpeed: 0, // Add a new state variable to track the click speed
});
// #endregion

const use = () => {
  const { easingValue, isRunning, clickSpeed } = state;

  // Only run the animation if isRunning is true
  if (!isRunning) {
    return;
  }

  // Use easingValue somehow... here's two examples:

  // 1. Display values
  const easingValueElement = document.querySelector(`#easingValue`);
  if (easingValueElement)
    easingValueElement.textContent = easingValue.toFixed(2);

  const speedo = document.querySelector(`#speedo`);
  if (speedo) speedo.textContent = clickSpeed.toFixed(2);

  // 2. Use it to Change the elemnent place
  const thing = document.querySelector(`#thing`);
  if (thing) {
    // Make the thing move depending on the x axes and click speed
    const translateX = easingValue * 500 * clickSpeed;
    const translateY = Math.sin(easingValue * Math.PI * 2) * 50; // Adjust the amplitude of the wiggle effect by changing the multiplier
    // @ts-ignore
    thing.style.transform = `translate(${translateX}px, 0px)`;
  }

  // Update state
  // @ts-ignore
  saveState({ easingValue: easing.compute() });
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
  const currentTime = Date.now();
  const lastClickTime = state.lastClickTime || currentTime;
  const clickSpeed = 1000 / (currentTime - lastClickTime); // Speed in clicks per second
  saveState({ lastClickTime: currentTime });
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
