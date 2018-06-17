const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    volunteer:{}
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_VOLUNTEER_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_VOLUNTEER_FULFILLED": {
        return {...state, fetching: false, fetched: true, volunteer: action.payload, error:{}}
        break;
    }
    case "FETCH_VOLUNTEER_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    default: {
    return {...state}
    }
  }
}