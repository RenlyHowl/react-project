import actionType from "../actions/actionType"

const initstate = {
  count: 30
}

export default (state = initstate, action) => {
  switch(action.type) {
    case actionType.COUNTER_DECREASE:
      return {
        ...state,
        count: state.count - 1,
      }
      case actionType.COUNTER_INCREASE:
        return {
          ...state,
          count: state.count + 1,
        }
    default:
    return state;
  }
}