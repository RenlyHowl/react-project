import actionType from "./actionType"


export const increasement = () => {
  console.log("++++")
  return {
    type: actionType.COUNTER_INCREASE
  }
}

export const decreasement = () => {
  console.log("---")
  return {
    type: actionType.COUNTER_DECREASE
  }
}




