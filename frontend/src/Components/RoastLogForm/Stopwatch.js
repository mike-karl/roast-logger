import React from "react";
import Popup from "../Popup";
import { IconContext } from "react-icons";
import { FaPlay, FaStop, FaRedo } from "react-icons/fa";

const Stopwatch = ({
  formatTime,
  isRunning,
  elapsedTime,
  toggleIsRunning,
  isOpen,
  isResetPopup,
  togglePopup,
  handleReset,
  handleFinish,
}) => {
  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <div className="stopwatch logTable-item">
        <div className="timerDisplay">
          <span>{formatTime(elapsedTime)}</span>
        </div>
        <button className="toggleTimerBtn" onClick={toggleIsRunning}>
          {!isRunning ? <FaPlay /> : <FaStop />}
        </button>
        <button className="resetBtn" type="button" onClick={handleReset}>
          <FaRedo />
        </button>
        {isOpen && (
          <Popup
            content={
              <>
                {isResetPopup ? (
                  <>
                    <b>Warning! You are about to reset your Temperature Log!</b>
                    <p>
                      Once you hit finish you cannot restart the Temperature
                      Log. Resetting the temperature log will result in a loss
                      of all temperature data. If you wish to continue with the
                      RESET click RESET, otherwise click CLOSE
                    </p>
                    <button onClick={togglePopup}>Close</button>
                    <button onClick={handleReset}>Reset</button>
                  </>
                ) : (
                  <>
                    <b>Warning! You are about to end your Temperature Log!</b>
                    <p>
                      Once you hit finish you cannot restart the Temperature
                      Log. If your roast is complete hit Finish to end your
                      Temperature Log, otherwise click cancel to continue the
                      Temperature Log until your roast has completed.
                    </p>
                    <button onClick={togglePopup}>Close</button>
                    <button onClick={handleFinish}>Finsh</button>
                  </>
                )}
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </IconContext.Provider>
  );
};

export default Stopwatch;
