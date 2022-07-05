import { ACTIONS } from './App'

export default function DigitBtn({dispatch, digit, style}) {
    return <button onClick={()=> dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}}) } className={style}>{digit}</button>
}