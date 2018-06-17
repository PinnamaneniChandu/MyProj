
export const MonthlySummaryInformation = (data) => (dispatch) =>  {
    dispatch({type:"FETCH_MONTHLYSUMMARYINFORMATION_FULFILLED",payload:data})
}
export const MonthAndYearInformation = (data) => (dispatch) =>  {
    dispatch({type:"FETCH_MONTHLANDYEAR_FULFILLED",payload:data})
}

export const SelectedPersonList = (data) => (dispatch) =>  {
    dispatch({type:"FETCH_SELECTED_PERSON_LIST_FULFILLED",payload:data})
}