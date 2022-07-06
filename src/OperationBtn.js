import { ACTIONS } from './App'

export default function DigitBtn({dispatch, operation, style}) {
    return <button onClick={()=> dispatch({type: ACTIONS.CHOOSE_OPERATOR, payload: {operation}}) } className={style}>{operation}</button>
}