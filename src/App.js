import { useReducer } from "react";
import DigitBtn from './DigitBtn'
import "./style.css"

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  REMOVE_DIGIT: 'remove-digit',
  CHOOSE_OPERATOR: 'choose-operator',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev">{previousOperand} {operation}</div>
        <div className="current">{currentOperand}</div>
      </div>
      <button className="gray-btn">AC</button>
      <button className="gray-btn">&#43;/&#8722;</button>
      <button className="gray-btn">&#37;</button>
      <button className="operator">&#247;</button>
      <DigitBtn digit="7" dispatch={dispatch} style="number" />
      <DigitBtn digit="8" dispatch={dispatch} style="number" />
      <DigitBtn digit="9" dispatch={dispatch} style="number" />
      <button className="operator">&#215;</button>
      <DigitBtn digit="4" dispatch={dispatch} style="number"/>
      <DigitBtn digit="5" dispatch={dispatch} style="number"/>
      <DigitBtn digit="6" dispatch={dispatch} style="number"/>
      <button className="operator">&#8722;</button>
      <DigitBtn digit="1" dispatch={dispatch} style="number"/>
      <DigitBtn digit="2" dispatch={dispatch} style="number"/>
      <DigitBtn digit="3" dispatch={dispatch} style="number"/>
      <button className="operator">&#43;</button>
      <DigitBtn digit="0" dispatch={dispatch} style="span-two number" />
      <button className="number">.</button>
      <button className="operator">&#61;</button>
    </div>
  );
}

export default App;
