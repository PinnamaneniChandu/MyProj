const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    incapacitated:{}
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_INCAPACITATED_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_INCAPACITATED_FULFILLED": {
        return {...state, fetching: false, fetched: true, incapacitated: action.payload, error:{}}
        break;
    }
    case "FETCH_INCAPACITATED_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    default: {
    return {...state}
    }
  }
}