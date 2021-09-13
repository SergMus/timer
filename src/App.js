import { useEffect, useState, createRef, useRef } from "react";
import "./App.css";
import Controls from "./components/Controls/Controls";
import Display from "./components/Display/Display";
import Result from "./components/Result/Result";

function App() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [interv, setInterv] = useState(false);

  useEffect(() => {
    if (interv) {
      const interval = setInterval(() => run(), 1000);
      return () => clearInterval(interval);
    }
  });

  var updateH = time.h;
  var updateM = time.m;
  var updateS = time.s;

  const run = () => {
    if (updateH === 24) {
      updateH = 0;
    }
    if (updateM === 59) {
      updateH++;
      updateM = 0;
    }
    if (updateS === 59) {
      updateM++;
      updateS = -1;
    }
    updateS++;
    return setTime({ h: updateH, m: updateM, s: updateS });
  };

  const start = () => {
    run();
    setInterv(true);
  };
  const stop = () => {
    setInterv(false);
    setTime({ h: 0, m: 0, s: 0 });
  };
  const reset = () => {
    setInterv(false);
    setTime({ h: 0, m: 0, s: 0 });
    setInterv(true);
  };
  const wait = () => {
    setInterv(false);
  };

  const clickHandler = () => {
    childRef.current.split();
  };

  const childRef = createRef();
  const cells = useRef(null);

  return (
    <div className="App">
      <h1 className="header">
        <span className="header_text">Online stopwatch</span>
      </h1>
      <Display time={time} cells={cells} />
      <Controls
        start={start}
        reset={reset}
        stop={stop}
        wait={wait}
        status={interv}
      />
      <button className="split" onClick={() => clickHandler()}>
        SPLIT
      </button>
      <Result ref={childRef} cells={cells} />
    </div>
  );
}

export default App;
