const initialState ={
  fetching:false,
  fetched: true,
  error: null,
  members: '',
  dob: ''
  }

export default function reducer (state = initialState, action) {
  switch (action.type){
    case "FETCH_HHMEMBERS_PENDING": {
      return {...state, fetching: true, error:{}}
      break;
    }
    case "FETCH_HHMEMBERS_FULFILLED": {
      return {...state, fetching: false, fetched: true, members: action.payload, error:{}}
      break;
    }
    case "FETCH_HHMEMBERS_REJECTED" :{
      return {...state, fetching: false, fetched: false, error: action.payload }
      break;
    }
    case "ADD_DOB_FULFILLED":{
      return {...state, fetching: false, fetched: true, dob: action.payload, error:{}}
      break;
    }
    default: {
    return {
      ...state
    }
  }
  }
}