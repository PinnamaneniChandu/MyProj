const initialState ={
  fetching:false,
  fetched: true,
  error: null,
  list : [],
  sessionTime:'',
  requestTime:'',
  responseTime:'',
  startSessionTime:'',
  ipAddress:''
  }

export default function reducer (state = initialState, action) {
  switch (action.type){
    case "FETCH_PAGEDETAILS_PENDING": {
      return {...state, fetching: true, error:{}}
      break;
    }
    case "FETCH_PAGEDETAILS_FULFILLED": {
      return {...state, fetching: false, fetched: true, list: action.payload, error:{}}
      break;
    }
    case "FETCH_PAGEDETAILS_REJECTED" :{
      return {...state, fetching: false, fetched: false, error: action.payload }
      break;
    }
    case "FETCH_PAGEDETAILS_CLEAR": {
      return {...state, fetching: false, fetched: true, list: action.payload, error:{}}
      break;
    }
    case "FETCH_IPADDRESS_FULFILLED":{
      return {...state, fetching: false, fetched: true, ipAddress: action.payload, error:{}}
      break;
    }
    case "FETCH_REQUEST_TIME":{
      return {...state, fetching: false, fetched: true, requestTime: action.payload, error:{}}
      break;
    }
    case "FETCH_SESSION_TIME":{
      return {...state, fetching: false, fetched: true, sessionTime: action.payload, error:{}}
      break;
    }
    case "FETCH_START_SESSION_TIME":{
      return {...state, fetching: false, fetched: true, startSessionTime: action.payload, error:{}}
      break;
    }
    case "FETCH_RESPONSE_TIME":{
      return {...state, fetching: false, fetched: true, responseTime: action.payload, error:{}}
      break;
    }
    default: {
    return {
      ...state
    }
  }
  }
}