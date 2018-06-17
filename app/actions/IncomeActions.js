import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const displayIncome = (formattedMonthAndYear) => (dispatch) => {
    let data={
        commonDataList:[
            {
                name:'operationType',
                value:'incomeDetails'
            },
            {
                name:'reportingPeriod',
                value: formattedMonthAndYear
            }
        ]
    }
    dispatch({type:"FETCH_INCOMEDETAILS_PENDING"})
    return axios.post(`${myConstClass.mymsg.API_HOST}/getWorkActivityDetails`, data)
    .then(response => {
        dispatch({type:"FETCH_INCOMEDETAILS_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_INCOMEDETAILS_REJECTED",payload:err})
    })
}