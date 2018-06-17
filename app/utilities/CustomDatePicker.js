import React from 'react';
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import '../CSS/App-extraSmallScreen.css'
import '../CSS/App-mediumScreen.css'
import '../CSS/App-smallScreen.css'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment-es6';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import inputtextField from './InputFiled'
import astrisk from '../assets/astrisk.png'

export default class CustomDatePicker extends React.Component{
    constructor(props){        
        super(props);
        let curamServerDate = moment(this.props.curamServerDate).add(1, 'days').format('YYYY-MM-DD')
        var today=new Date(curamServerDate);
        var date=today.getDate();
        var startDate ='';
        this.state={
            startDate:this.props.initialStartDate?moment(this.props.initialStartDate):null,
            maxStartDate:moment(this.props.curamServerDate),
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
        this.setState({startDate:e })
        this.props.startDate(YYYYMMDD)
    }

    render(){
        const { handleSubmit, pristine, submitting } = this.props;
        const {input, selected } = this.props
        const required = value => value ? undefined : 'Required'
        const fromDate=<DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            maxDate={this.state.maxStartDate}
            onChange={this.handleChangeStart.bind(this)}
            openToDate={moment(this.props.curamServerDate)}
            placeholderText="mm/dd/yyyy"
            ref='startDate'
            required
            withPortal
            title='Start Date'
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"

        />

        return(
            <div>
            {fromDate}
        </div>
        )
    }
}
