import React, { useState, useEffect } from "react";
import styles from "./../Controls/Controls.module.css";

const Controls = (props) => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    let singleClickTimer;
    if (clicks === 1) {
      singleClickTimer = setTimeout(function () {
        setClicks(0);
      }, 250);
    } else if (clicks === 2) {
      props.wait();
      setClicks(0);
    }
    return () => clearTimeout(singleClickTimer);
  }, [clicks, props]);

  return (
    <div className={styles.controls}>
      {!props.status ? (
        <button className={styles.btn} onClick={props.start}>
          Start
        </button>
      ) : (
        <button
          className={[styles.btn, styles.red].join(" ")}
          onClick={props.stop}
        >
          Stop
        </button>
      )}
      <button className={styles.btn} onClick={() => setClicks(clicks + 1)}>
        Wait
      </button>
      <button className={styles.btn} onClick={props.reset}>
        Reset
      </button>
    </div>
  );
};

export default Controls;
