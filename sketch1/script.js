import { Easings, adsr, defaultAdsrOpts } from "../ixfx/modulation.js";

// #region Settings & state
const settings = Object.freeze({
  // @ts-ignore
  attackBend: -1,
  decayBend: -0.3,
  releaseBend: -0.3,
  peakLevel: 1,
  initialLevel: 0,
  sustainLevel: 0.6,
  releaseLevel: 0,
  attackDuration: 600,
  decayDuration: 200,
  releaseDuration: 800,
  shouldLoop: false,
});

const opt = {
  ...defaultAdsrOpts,
  ...settings,
};

const env = adsr(opt);

let state = Object.freeze({
  isRunning: false,
});

// #endregion

const use = () => {};

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
