const initialState ={
  fetching:false,
  fetched: true,
  error: null,
  evidenceResponse : ''
  }

export default function reducer (state = initialState, action) {
  switch (action.type){
    case "FETCH_submitedEvidence_PENDING": {
      return {...state, fetching: true, error:{}}
      break;
    }
    case "FETCH_submitedEvidence_FULFILLED": {
      return {...state, fetching: false, fetched: true, evidenceResponse: action.payload, error:{}}
      break;
    }
    case "FETCH_submitedEvidence_REJECTED" :{
      return {...state, fetching: false, fetched: false, error: action.payload, evidenceResponse: "error" }
      break;
    }
    case "FETCH_submitedEvidence_CLEAR": {
      return {...state, fetching: false, fetched: true, evidenceResponse: action.payload, error:{}}
      break;
    }
    default: {
    return {
      ...state
    }
  }
  }
}