const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    incomeDetails:''
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_INCOMEDETAILS_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_INCOMEDETAILS_FULFILLED": {
        return {...state, fetching: false, fetched: true, incomeDetails: action.payload, error:{}}
        break;
    }
    case "FETCH_INCOMEDETAILS_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    default: {
    return {...state}
    }
  }
}