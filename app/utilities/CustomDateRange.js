import React from 'react';
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment-es6';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import inputtextField from './InputFiled'
import astrisk from '../assets/astrisk.png'

export default class CustomDateRange extends React.Component{
    constructor(props){        
        super(props);
        let curamServerDate = moment(this.props.curamServerDate).add(1, 'days').format('YYYY-MM-DD')
        var today=new Date(curamServerDate);
        var date=today.getDate();
        var startDate ='';
        var endDate = '';
        //date=5
        var firstDay=date>=1 && date <=5? new Date(today.getFullYear(), today.getMonth()-1, 1):new Date(today.getFullYear(), today.getMonth(), 1);
        //lastDay = new Date(year, month + 1, 0);
        this.state={
            startDate:this.props.initialStartDate?moment(this.props.initialStartDate):null,
            endDate:this.props.initialEndDate?moment(this.props.initialEndDate):null,
            minStartDate:moment(firstDay),
            minEndDate:moment(firstDay),
            maxStartDate:moment(this.props.curamServerDate),
            maxEndDate:moment(this.props.curamServerDate)
        }
    }
    handleChangeStart(e)
    {
        let dd = e.format('L');
        let x = dd.toString().replace(/\//g,"")
        let YYYY = x.substr(4,4)
        let DD = x.substr(2,2)
        let MM = x.substr(0,2)
        let YYYYMMDD = YYYY.concat(MM).concat(DD)
        //let YYYYMMDD = YYYY+''+ MM + '' + DD 
        this.setState({startDate:e,minEndDate:e })
        this.props.startDate(YYYYMMDD)
    }
    handleChangeEnd(e)
    {
        let dd = e.format('L');
        let x = dd.toString().replace(/\//g,"")
        let YYYY = x.substr(4,4)
        let DD = x.substr(2,2)
        let MM = x.substr(0,2)
        let YYYYMMDD = YYYY.concat(MM).concat(DD)
        //let YYYYMMDD = YYYY+''+ MM + '' + DD 
        this.setState({endDate:e})
        this.props.endDate(YYYYMMDD)
    }

    render(){
        const { handleSubmit, pristine, submitting } = this.props;
        const {input, selected } = this.props
        const required = value => value ? undefined : 'Required'
        const fromDate=<DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            minDate={this.state.minStartDate}
            maxDate={this.state.maxStartDate}
            onChange={this.handleChangeStart.bind(this)}
            placeholderText="mm/dd/yyyy"
            ref='startDate'
            required
            withPortal
            title='Start Date'
        />
        const toDate = <DatePicker
        selected={this.state.endDate}
        selectsEnd
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        minDate={this.state.minEndDate}
        maxDate={this.state.maxEndDate}
        onChange={this.handleChangeEnd.bind(this)}
        placeholderText="mm/dd/yyyy"
        ref='endDate'
        required
        withPortal // style={{display:"inline-block", marginLeft: "5%", marginRight: "5%"}}
        title='End Date'
    />
        return(
            <div>
            <label>Start Date<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
            <div className="customDatePickerStyle">
            {fromDate}
            </div>
            <label>End Date<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
            <div className="customDatePickerStyle">
            {toDate}
            </div>
        </div>
        )
    }
}
