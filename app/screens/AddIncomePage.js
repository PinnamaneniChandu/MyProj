import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import DatePicker from 'react-datepicker'
import CustomDatePicker from '../utilities/CustomDatePicker'
import astrisk from '../assets/astrisk.png'
import React from 'react'
import { connect } from 'react-redux'
import SecondaryHeader from './components/SecondaryHeader'
import * as locales from './AddIncomePageProperties'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { addIncomeDetails } from '../actions/addIncomeAction'
import ErrorMessage from './components/ErrorMessage'
import moment from 'moment-es6'
import * as monthlySummaryLocales from './MonthlySummaryPageProperties'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class AddIncome extends React.Component {
  constructor(props) {
    super(props);
    var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setRequestTime(reqeustTime)
    var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
    this.props.setStartSessionTime(startSessionTime)
    this.state = {
      page: 'AddIncome',
      amount: props.location.data.data.updateFlag ? props.location.data.data.amount : '',
      dateIncomeReceived: props.location.data.data.updateFlag ? moment(props.location.data.data.dateIncomeReceived).format('YYYY-MM-DD') : '',
      incomeType: '',
      incomeTypeName: '',
      employerName: '',
      redirectTo: '',
      errorMessages: [],
      cntHours: '',
      disabled: '',
      status: 'UnSubmitted',
      index: props.location.data.data.index >= 0 ? props.location.data.data.index : ''
    }
    //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Add Income Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
    
  }
  
  startDate(startDate){this.setState({dateIncomeReceived: startDate})}

  componentDidMount(){
    var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setResponseTime(responseTime)
 }
  componentWillUnmount(){
    let pageEndTime =moment();
    var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
    var PageTimeEnd = duration.asSeconds();  
    this.props.setSessionTime(PageTimeEnd)
    this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Add Income Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
  }
  handleDateValues() {
    this.setState({
      dateIncomeReceived: this.refs.dateIncomeReceived.value.length===10 && this.refs.dateIncomeReceived.value!==undefined && this.refs.dateIncomeReceived.value !== '' ? moment(this.refs.dateIncomeReceived.value).format('YYYY-MM-DD') : this.refs.dateIncomeReceived.value,   
     })
  }

  amountChange() {
    this.setState({ amount: this.refs.amount.value })
  }

  handleSubmit(event) {
    if (this.state.dateIncomeReceived !== '') {
      event.preventDefault();
      var AddIncomePageDetails = {
        amount: this.refs.amount.value,
        dateIncomeReceived: this.refs.dateIncomeReceived.value
      }
      this.props.addIncomeDetails(AddIncomePageDetails)
    }
  }
  onMouseEnterHandler(event) {
    let lang=locales.strings;
    let validationErrorMsg = new Set();
    for (var key in this.state) {
      if (key === 'amount' && (this.state[key] === 'null' || this.state[key] === '' || this.state[key].trim() === '' || this.state[key] === '')) {
        validationErrorMsg.add({ key: key, firstMessage:lang.formatString(lang.AddIncomeFieldAmount), secondMessage:lang.formatString(lang.IsManditory)})
      } else if (key === 'amount' && (isNaN(this.state[key]) === true)) {
        validationErrorMsg.add({ key: key, firstMessage: 'Amount must be a number' })
      }
      if(key==='dateIncomeReceived' && (this.state[key]!=='' || this.state[key]!== null ) && (moment(this.state.dateIncomeReceived).isBefore(this.props.dob)) ){
        validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.AddIncomeFieldDateReceived),secondMessage:lang.formatString(lang.DOBValidation)})   
      }
      else if (key === 'dateIncomeReceived' && (this.state[key] === '' || this.state[key] === null)) {
        validationErrorMsg.add({ key: key, firstMessage: lang.formatString(lang.AddIncomeFieldDateReceived), secondMessage:lang.formatString(lang.IsManditory)})
      }
      else if ((key === 'dateIncomeReceived' && this.state["dateIncomeReceived"] !== '') && (moment(new Date(moment(this.props.serverDate))).format('YYYY-MM-DD') < (moment(this.state['dateIncomeReceived']).format('YYYY-MM-DD')))) {
        validationErrorMsg.add({ key: key, firstMessage:lang.formatString(lang.AddIncomeFieldDateReceived), secondMessage:lang.formatString(lang.CURRENTDATE)})
      }
    }
    let array = Array.from(validationErrorMsg)
    let redirectTo;
    let disabled;
    if (array.length <= 0) {
      disabled = false
      redirectTo = 'IncomeDetailsPage'
    } else {
      disabled = true
      redirectTo = 'AddIncome'
    }
    this.setState({ errorMessages: array, redirectTo: redirectTo, disabled: disabled })
  }
  createData(evdData, lang) {
    let incomeType = this.props.location.data.data.incomeType
    let displayLine1, displayLine2, displayLine2SecondRow, displayLine4, evidencename

    if (incomeType === 'IT26001') {
      evidencename = lang.TITLE_IT26001
      displayLine1 = lang.DISPLAY1_IT26001
      displayLine2 = lang.EMPLOYER + '' + this.props.location.data.data.employerName
      displayLine2SecondRow = lang.AMOUNT + ''+`${parseFloat(this.state.amount.replace(/,/g, '')).toFixed(2)}`
      displayLine4 = lang.HOURS +''+lang.IncomeHours 
    } else if (incomeType === 'IT26008' || incomeType === 'IT26017') {
      evidencename = lang.TITLE_IT26001
      displayLine1 = lang.DISPLAY1_IT26001
      displayLine2 = lang.AMOUNT + ''+`${parseFloat(this.state.amount.replace(/,/g, '')).toFixed(2)}`
      displayLine2SecondRow = lang.HOURS +''+lang.IncomeHours
      displayLine4 = ''
    } else if (incomeType === 'IT26015') {
      evidencename = lang.TITLE_IT26015
      displayLine1 = lang.AMOUNT + ''+`${parseFloat(this.state.amount.replace(/,/g, '')).toFixed(2)}`
      displayLine2 = ''
      displayLine2SecondRow = ''
      displayLine4 = ''
    }
    let data = {
      page: 'AddIncome',
      evidenceName: evidencename,
      evidenceType: "EEFDET0022",
      incomeType: this.props.location.data.data.incomeType,
      incomeTypeName: this.props.location.data.data.incomeTypeName,
      employerName: this.props.location.data.data.employerName,
      parentEvidenceDescriptorID: this.props.location.data.data.parentEvidenceDescriptorID,
      amount: this.state.amount,
      dateIncomeReceived: this.state.dateIncomeReceived !== 'Invalid date'? moment(this.state.dateIncomeReceived).format('YYYYMMDD'):'', 
      cntHours: lang.IncomeHours,
      source: 'IS26301',
      status: 'Unsubmitted',
      displayLine1: displayLine1,
      displayLine2: displayLine2,
      displayLine2SecondRow: displayLine2SecondRow,
      displayLine4: displayLine4,
      index: this.state.index,
      updateFlag: this.props.location.data.data ? this.props.location.data.data.updateFlag : false
    }
    return data;
    this.setState({
      incomeTypeName: incomeTypeName
    });
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    let lang = monthlySummaryLocales.strings
    let data = this.createData(this.state, lang);
    return (
      <div className='container'>
        <SecondaryHeader HeadingName={locales.strings.AddIncomeHeader} />
        <div className='blockUnderline'></div>
        
        <ErrorMessage errors={this.state.errorMessages} />
        
        <div className='row addIncomeType'>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <b>{locales.strings.AddIncomeIncomeType} {this.props.location.data.data.incomeTypeName}</b>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <b>{locales.strings.AddIncomeEmployerName} {this.props.location.data.data.employerName}</b>
          </div>
        </div>
        <span className= "required col-md-12 col-sm-12 col-xs-12" style={{ paddingBottom: '2%' }}>* Indicates a required field</span>
        <p>{locales.strings.AddIncomeDetailsMessage}</p>
        <form ref='addIncome_form' onSubmit={this.handleSubmit.bind(this)} >
        
          <div className="row addIncomeFormDivStyle">
              <div className="col-md-4 col-sm-4 col-xs-12">
                <label className="Labels">{locales.strings.AddIncomeFieldAmount}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
              </div>
              <div className="col-md-8 col-sm-8 col-xs-12">
                <input name="amount" ref="amount" type="text" title={locales.strings.AddIncomeFieldAmount} value={this.state.amount} className="form-control" id="amount" onChange={this.amountChange.bind(this)} required />
              </div> 
          </div>

          <div className="row addIncomeFormDivStyle">
              <div className="col-md-4 col-sm-4 col-xs-12">
                <label className="Labels">{locales.strings.AddIncomeFieldDateReceived}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
              </div>
              <div className="col-md-8 col-sm-8 col-xs-12">
              <CustomDatePicker curamServerDate={this.props.serverDate} initialStartDate={this.state.dateIncomeReceived} startDate={this.startDate.bind(this)}/>                                  
              </div>
          </div>

          <div className="row addIncomeFormDivStyle">
              <div className="col-md-11 col-sm-7 col-xs-7">  
                  <ButtonFunctionality ButtonName={locales.strings.ButtonCancel} displayText="IncomeDetailsPage" dstClassName="btn buttonBack1" />
              </div>
              <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
                  <ButtonFunctionality ButtonName={locales.strings.ButtonSave} disabled={this.state.disabled} redirectTo={this.state.redirectTo} dstClassName="btn buttonBack1 marginLeftForButtons" data={data} />
              </div> 
          </div>
        </form>
      </div>
    )
  }
}
function mapStateToProps(store) {
  return {
    addIncomeResponse: store.addIncome,
    dob:store.HHMembers.dob,
    pageDetails: store.pageDetailsReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addIncomeDetails: addIncomeDetails
  };
}
export default connect(mapStateToProps, { addIncomeDetails,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime })(AddIncome);

