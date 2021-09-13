import React from "react";
import styles from "./../Display/Display.module.css";

const Display = ({ time: { h, m, s }, cells }) => {
  const setHours = () => {
    if (h < 10) {
      return "0" + h;
    } else {
      return h;
    }
  };

  return (
    <div className={styles.display} ref={cells}>
      <div className={styles.cell}>{setHours()}</div>
      <div className={styles.dots}>:</div>
      <div className={styles.cell} id="cell_minutes">
        {m < 10 ? "0" + m : m}
      </div>
      <div className={styles.dots}>:</div>
      <div className={styles.cell} id="cell_seconds">
        {s < 10 ? "0" + s : s}
      </div>
    </div>
  );
};

export default Display;
