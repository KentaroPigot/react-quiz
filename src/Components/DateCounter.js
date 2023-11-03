import { useReducer, useState } from "react";

function reducer(state, action) {
  // if (action.type === "INC") return state + 1;
  // if (action.type === "DEC") return state - 1;
  // if (action.type === "SETCOUNT") return action.payload;

  switch (action.type) {
    case "DEC":
      return { ...state, count: state.count + state.step }; //On va overwrite le count property !
    case "INC":
      return { ...state, count: state.count - state.step }; //On va overwrite le count property !
    case "SETCOUNT":
      return { ...state, count: action.payload };
    case "SETSTEP":
      return { ...state, step: action.payload };
    case "RESET":
      return { count: 0, step: 1 };
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);

  const initialState = { count: 0, step: 1 };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "DEC" });
  };

  const inc = function () {
    dispatch({ type: "INC" });
  };

  const defineCount = function (e) {
    dispatch({ type: "SETCOUNT", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "SETSTEP", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "RESET" });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
