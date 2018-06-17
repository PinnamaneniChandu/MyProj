const initialState ={
  fetching:false,
  fetched: true,
  error: null,
  contact:'',
    addressOperationStatus:''
  }

export default function reducer (state = initialState, action) {
  switch (action.type){
    case "FETCH_CONTACT_PENDING": {
      return {...state, fetching: true, error:{}}
      break;
    }
    case "FETCH_CONTACT_FULFILLED": {
      return {...state, fetching: false, fetched: true, contact: action.payload, error:{}}
      break;
    }
    case "FETCH_CONTACT_REJECTED" :{
      return {...state, fetching: false, fetched: false, error: action.payload }
      break;
    }

    case "FETCH_UPDATEADDRESS_FULFILLED": {
      return {...state, fetching: false, fetched: true, addressOperationStatus: action.payload, error:{}}
      break;
    }
    case "FETCH_UPDATEADDRESS_REJECTED" :{
      return {...state, fetching: false, fetched: false, error: action.payload, addressOperationStatus: "error" }
      break;
    }
    case "FETCH_UPDATEADDRESS_CLEAR": {
      return {...state, fetching: false, fetched: true, addressOperationStatus: action.payload, error:{}}
      break;
    }
    case "FETCH_CONTACT_CLEAR": {
      return {...state, fetching: false, fetched: true, contact: action.payload, error:{}}
      break;
    }

    default: {
    return {
      ...state
    }
  }
  }
}