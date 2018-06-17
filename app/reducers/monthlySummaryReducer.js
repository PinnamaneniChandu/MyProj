const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    eefARWorksEvidencesAndCommonInfo: ''
    }
  
  export default function reducer (state = initialState, action) {
    switch (action.type){
      case "FETCH_MONTLYSUMMARY_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
      }
      case "FETCH_MONTLYSUMMARY_FULFILLED": {
        return {...state, fetching: false, fetched: true, eefARWorksEvidencesAndCommonInfo: action.payload, error:{}}
        break;
      }
      case "FETCH_MONTLYSUMMARY_REJECTED" :{
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