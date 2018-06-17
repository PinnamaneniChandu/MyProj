const initialState ={
  fetching:false,
  fetched: true,
  error: null,
  validateAddress: ''
  }

export default function reducer (state = initialState, action) {
  switch (action.type){
    case "FETCH_VALIDATEADDRESS_PENDING": {
      return {...state, fetching: true, error:{}}
      break;
    }
    case "FETCH_VALIDATEADDRESS_FULFILLED": {
      return {...state, fetching: false, fetched: true, validateAddress: action.payload, error:{}} 
      break;
    }
    case "FETCH_VALIDATEADDRESS_REJECTED" :{
      return {...state, fetching: false, fetched: false, error: action.payload }
      break;
    }
    default: {
    return {
      ...state
    }
  }
  }
}

