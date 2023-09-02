import { Easings } from '../ixfx/modulation.js';

const easing = Easings.time('quintIn', 5000);

// #region Settings & state
// @ts-ignore
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
  const easingValueElement = document.querySelector(`#easingValue`);
  if (easingValueElement) easingValueElement.textContent = easingValue.toFixed(2);
  //2. Use it to offset an element
  const thing = document.querySelector(`#thing`);
  if (thing) {
    const translateX = easingValue * 500;
    const translateY = Math.sin(easingValue * Math.PI * 2) * 50; // Adjust the amplitude of the wiggle effect by changing the multiplier
    // @ts-ignore
    thing.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }

  // Update state
  // @ts-ignore
  saveState({ easingValue: easing.compute() });
};

function setup() {
  // Add CSS styles for #thing element
  const styles = `
    #thing {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: blue;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform 0.1s, background-color 1s;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);

  // Add an event listener for the scroll wheel event
  window.addEventListener('wheel', (event) => {
    // Check if scroll wheel direction is up
    if (event.deltaY < 0) {
      // @ts-ignore
      saveState({ isRunning: true });
    }
  });

  // Add an event listener for the button click event
  const startButton = document.getElementById('startButton');
  // @ts-ignore
  startButton.addEventListener('click', () => {
    // @ts-ignore
    saveState({ isRunning: true });
  });

  // Call every half a second
  setInterval(use, 1);
}

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