import { useReducer } from "react";
import DigitBtn from './DigitBtn'
import OperationBtn from './OperationBtn'
import Footer from "./Footer";
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
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        if(payload.digit === ".") {
          state.currentOperand= `0${payload.digit}`
        } else {
          state.currentOperand= payload.digit;
        }
        return {
          ...state,
          overwrite:false,
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if(payload.digit === "." && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: `0${payload.digit}`
        }
      }
      if(payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATOR:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      if(state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null
      }
    case ACTIONS.EVALUATE:
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        operation: null,
        previousOperand: null
      }
    case ACTIONS.REMOVE_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if(state.currentOperand == null) return state
      if(state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
  }
}

function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(current)) return ""
  let retVal = ""
  switch(operation) {
    case "÷":
      retVal = prev / current
      break
    case "x":
      retVal = prev * current
      break
    case "-":
      retVal = prev - current
      break
    case "+":
      retVal = prev + current
      break
    case "%":
      retVal = prev % current
  }
  return retVal.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )
  return (
   <div className="container">
     <div className="calc-grid">
        <div className="output">
          <div className="prev">{formatOperand(previousOperand)} {operation}</div>
          <div className="current">{formatOperand(currentOperand)}</div>
        </div>
        <button className="gray-btn" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button className="gray-btn" onClick={() => dispatch({ type: ACTIONS.REMOVE_DIGIT})}>DEL</button> 
        <OperationBtn operation="%" dispatch={dispatch} style="gray-btn" />
        <OperationBtn operation="÷" dispatch={dispatch} style="operator" />
        <DigitBtn digit="7" dispatch={dispatch} style="number" />
        <DigitBtn digit="8" dispatch={dispatch} style="number" />
        <DigitBtn digit="9" dispatch={dispatch} style="number" />
        <OperationBtn operation="x" dispatch={dispatch} style="operator" />
        <DigitBtn digit="4" dispatch={dispatch} style="number"/>
        <DigitBtn digit="5" dispatch={dispatch} style="number"/>
        <DigitBtn digit="6" dispatch={dispatch} style="number"/>
        <OperationBtn operation="-" dispatch={dispatch} style="operator" />
        <DigitBtn digit="1" dispatch={dispatch} style="number"/>
        <DigitBtn digit="2" dispatch={dispatch} style="number"/>
        <DigitBtn digit="3" dispatch={dispatch} style="number"/>
        <OperationBtn operation="+" dispatch={dispatch} style="operator" />
        <DigitBtn digit="0" dispatch={dispatch} style="span-two number" />
        <DigitBtn digit="." dispatch={dispatch} style="number" />
        <button className="operator" onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>&#61;</button>
      </div>
      <Footer />
   </div>
  );
}


export default App;
