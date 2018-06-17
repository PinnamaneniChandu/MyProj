const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    healthEducation:{}
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_HEALTHEDUCATION_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_HEALTHEDUCATION_FULFILLED": {
        return {...state, fetching: false, fetched: true, healthEducation: action.payload, error:{}}
        break;
    }
    case "FETCH_HEALTHEDUCATION_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    default: {
    return {...state}
    }
  }
}