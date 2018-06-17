const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    preferredContact: ''
}

export default function reducer (state = initialState, action) {
    switch (action.type){
        case "FETCH_PREFERRED_CONTACT_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
        }
        case "FETCH_PREFERRED_CONTACT_FULFILLED": {
        return {...state, fetching: false, fetched: true, preferredContact: action.payload, error:{}} 
        break;
        }
        case "FETCH_PREFERRED_CONTACT_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload, preferredContact:"error" }
        break;
        }
        case "FETCH_PREFFERED_CONTACT_CLEAR" :{
            return {...state, fetching: false, fetched: false, error: action.payload }
            break;
        }
        default: {
        return {
        ...state
        }
    }
}
}