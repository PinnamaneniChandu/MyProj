const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    specialHealthNeeds:{}
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_SPECIALHEALTHNEEDS_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_SPECIALHEALTHNEEDS_FULFILLED": {
        return {...state, fetching: false, fetched: true, specialHealthNeeds: action.payload, error:{}}
        break;
    }
    case "FETCH_SPECIALHEALTHNEEDS_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    default: {
    return {...state}
    }
  }
}