import { Easings } from "../ixfx/modulation.js";

const easing = Easings.time("quintIn", 5000);

// #region Settings & state
const settings = Object.freeze({});

let state = Object.freeze({
  easingValue: 0,
  isRunning: false,
});
// #endregion

const use = () => {
  const { easingValue, isRunning } = state;
  const value = easing.compute();

  if (!isRunning) {
    return;
  }

  saveState({ easingValue: value });

  // Update the holding value on the screen
  const vlu = document.getElementById("vlu");
  if (vlu) {
    vlu.textContent = easingValue.toFixed(2);
  }
};

function setup() {
  const { isRunning } = state;
  const btn = document.getElementById("btn");
  if (btn) {
    btn.addEventListener("click", () => {
      saveState({ isRunning: !isRunning });
    });
  }
  // Call every half a second
  setInterval(use, 0.1);
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
