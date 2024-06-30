const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  //state will be set to initialState only when state is undefined.

  const counterReducer = (state = initialState, action) => {

    console.log(action)

    switch (action.type) {
      case 'GOOD':
        return {...state,good:state.good+1} //...state will create a shallow copy,therefore
        //a new object with a new reference, meaning functional programming way is intact.
        //the state object does not get mutated.
      case 'OK':
        return {...state,ok:state.ok+1}
      case 'BAD':
        return {...state,bad:state.bad+1}
      case 'ZERO':
        
        return {good:0,ok:0,bad:0}

      default: return state
    }
    
  }
  
  export default counterReducer