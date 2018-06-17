const initialState ={
  fetching:false,
  fetched: true,
  error: null,
  CTList:''
  }

export default function reducer (state = initialState, action) {
  switch (action.type){
    case "FETCH_GETCT_PENDING": {
      return {...state, fetching: true, error:{}}
      break;
    }
    case "FETCH_GETCT_FULFILLED": {
      return {...state, fetching: false, fetched: true, CTList: action.payload,  error:{}}
      break;
    }
    case "FETCH_GETCT_REJECTED" :{
      return {...state, fetching: false, fetched: false }
      break;
    }
    default: {
    return {
      ...state
    }
  }
  }
}