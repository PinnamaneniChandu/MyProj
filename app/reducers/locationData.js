const initialState ={
    montlySummaryData: '',
    montlyAndYearData : '',
    selectedPersonList:''
}
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_MONTHLYSUMMARYINFORMATION_FULFILLED": {
        return {...state, montlySummaryData: action.payload}
        break;
    }
    case "FETCH_MONTHLANDYEAR_FULFILLED": {
        return {...state, montlyAndYearData: action.payload}
        break;
    }case "FETCH_SELECTED_PERSON_LIST_FULFILLED": {
        return {...state, selectedPersonList: action.payload}
        break;
    }
        default: {
        return {...state}
        }
    }
}