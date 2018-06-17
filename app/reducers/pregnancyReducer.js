const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    pregnancy:{}
}
export default function reducer (state = initialState, action) {
    switch (action.type){
        case "FETCH_PREGNANCY_PENDING": {
            return {...state, fetching: true, error:{}}
            break;
        }
        case "FETCH_PREGNANCYS_FULFILLED": {
            return {...state, fetching: false, fetched: true, pregnancy: action.payload, error:{}}
            break;
        }
        case "FETCH_PREGNANCY_REJECTED" :{
            return {...state, fetching: false, fetched: false, error: action.payload }
            break;
        }
        default: {
        return {...state}
        }
    } 
}