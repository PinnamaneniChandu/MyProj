const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    workActivityDetails:''
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_WORKACTIVITYDETAILS_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_WORKACTIVITYDETAILS_FULFILLED": {
        return {...state, fetching: false, fetched: true, workActivityDetails: action.payload, error:{}}
        break;
    }
    case "FETCH_WORKACTIVITYDETAILS_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    case "FETCH_WORKACTIVITYDETAILS_CLEAR" :{
        return {...state, fetching: false, fetched: false, workActivityDetails: action.payload }
        break;
    }
    default: {
    return {...state}
    }
}
}