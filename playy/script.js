import { Easings } from '../ixfx/modulation.js';

const easing = Easings.time('sineInOut', 7000);

// #region Settings & state
const settings = Object.freeze({

});

let state = Object.freeze({
  easingValue : 0,
  isRunning: false, // Add a new state variable to track if the animation is running
});
// #endregion

const use = () => {
  const { easingValue, isRunning } = state;

  // Only run the animation if isRunning is true
  if (!isRunning) {
    return;
  }

  // Use easingValue somehow... here's two examples:

  // 1. Display value
  const easingValueElement = (document.querySelector(`#easingValue`));
  if (easingValueElement) easingValueElement.textContent = easingValue.toFixed(2);
  //2. Use it to offset an element
  const thing = (document.querySelector(`#thing`));
  if (thing) {
    const translateX = easingValue * 500;
    const translateY = Math.sin(easingValue * Math.PI * 2) * 30; // Adjust the amplitude of the wiggle effect by changing the multiplier
    thing.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }

  // Update state
  saveState({ easingValue: easing.compute() });
};

function setup() {
  // Add CSS styles for #thing element
  const styles = `
    #thing {
      width: 100px;
      height: 100px;
      background-color: red;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform 0.1s;
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);

  // Call every half a second
  setInterval(use, 1);
}

// Add an event listener to start the animation when the button is clicked
// @ts-ignore
document.getElementById('startButton').addEventListener('click', () => {
  saveState({ isRunning: true });
});

// #region Toolbox
/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

setup();
// #endregion
