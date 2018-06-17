import React from 'react';
import DatePicker from 'react-datepicker'
import CustomDatePicker from '../utilities/CustomDatePicker'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import '../CSS/App-extraSmallScreen.css'
import '../CSS/App-mediumScreen.css'
import '../CSS/App-smallScreen.css'
import SecondaryHeader from './components/SecondaryHeader';
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import moment from 'moment-es6';
import * as locales from './NewIncomeSourcePageProperties'
import ErrorMessage from './components/ErrorMessage'
import {getCTDetails} from '../actions/CTAction'
import { connect } from 'react-redux'
import astrisk from '../assets/astrisk.png'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import * as monthlySummaryLocales from './MonthlySummaryPageProperties'
import {dateToYYYYMMDD} from '../actions/CommonActions'

class NewIncomeSourcePage extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        this.state={
            page:'AddNewIncomeSource',
            evidenceType:'DET0026030',
            errorMessages:[],
            redirectTo:'',
            incomeTypeName:props.location.data.data && props.location.data.data.index >= 0 ?  props.location.data.data.incomeTypeName : '',
            incomeType: props.location.data.data && props.location.data.data.index >= 0 ?  props.location.data.data.incomeType : '',
            employerName: props.location.data.data && props.location.data.data.index >= 0 ?   props.location.data.data.employerName : '',
            amount:props.location.data.data && props.location.data.data.index >= 0 ?  props.location.data.data.amount : '',
            frequencyCode:props.location.data.data && props.location.data.data.index >= 0 ?  props.location.data.data.frequencyCode : '',
            startDate:props.location.data.data && props.location.data.data.index >= 0 ? moment( props.location.data.data.startDate).format('YYYY-MM-DD') : '',
            evidenceName:"Income",
            disabled:'',
            status:'Unsubmitted',        
            index: props.location.data.data && props.location.data.data.index >= 0 ? props.location.data.data.index : '',
	        cntHours:'' 
        }
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'New Income Source Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
    }
    componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'New Income Source Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
      componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
     }
    startDate(startDate){this.setState({startDate: startDate})}
    
    incomeType(e){
        this.setState({ incomeType : e.target.value});
        let incomeTypeName;
        let employerName
        if( e.target.value === 'IT26001'){
            incomeTypeName='Wages and Salaries'
            
        }
        else if( e.target.value === 'IT26008'){
            incomeTypeName='Net Self Employment Income'
            employerName='N/A'
        }
        else if( e.target.value === 'IT26017'){
            incomeTypeName='Farming or Fishing Income'
            employerName='N/A'
        }
        else if( e.target.value === 'IT26015'){
            incomeTypeName='Unemployment Insurance'
            employerName='N/A'
        }

            this.setState({incomeTypeName : incomeTypeName, employerName:employerName})
        }
    employerName(e){
        this.setState({employerName : e.target.value}) ;
            }
    amount(e){
        this.setState({ amount : e.target.value});
        }
    frequencyCode(e){
        this.setState({ frequencyCode : e.target.value});
        }        

        onMouseEnterHandler(event){    

                        let set = new Set();
                        let lang = locales.strings;
                        for (var key in this.state) {           
                        if(key==='incomeType'){
                            if(this.state[key]==='--Please Select--' || this.state[key]==='')
                                {
                                    set.add({key:key,firstMessage:lang.formatString(lang.IncomeType),secondMessage:lang.formatString(lang.IsManditory)})   
                                }
                            else{
                                if(this.state[key]==='IT26001' && (this.state['employerName']==='' || this.state['employerName']===undefined || this.state['employerName']==='null')){
                                    set.add({key:key,firstMessage:lang.formatString(lang.EmployerName),secondMessage:lang.formatString(lang.IsManditory)})   
                                }
                            }
                        }
                        if(key==='amount' && (this.state[key]==='null' || this.state[key]==='' || this.state[key].trim()==='')){
                            set.add({key:key,firstMessage:lang.formatString(lang.Amount),secondMessage:lang.formatString(lang.IsManditory)})    
                        }else if(key==='amount' && ( isNaN(this.state[key])=== true )){
                            set.add({key:key,firstMessage:lang.formatString(lang.AmountNumber)})
                        }
                        if(key==='frequencyCode' && (this.state[key]==='' || this.state[key]=== null || this.state[key]==='--Please Select--')){
                            set.add({key:key,firstMessage:lang.formatString(lang.FrequencyCode),secondMessage:lang.formatString(lang.IsManditory)})   
                        }
                        if(key==='startDate' && this.state[key]==='' || this.state[key]=== null){
                            set.add({key:key,firstMessage:lang.formatString(lang.StartDate),secondMessage:lang.formatString(lang.IsManditory)});                                                
                        } 
                        else if(key==='startDate' && (this.state[key]!=='' || this.state[key]!== null ) && (moment(this.state.startDate).isBefore(this.props.dob)) ){
                            set.add({key:key,firstMessage:lang.formatString(lang.StartDate),secondMessage:lang.formatString(lang.DOB)})   
                        }  
                        else if(key==='startDate' && this.state[key]!=='' && (this.props.serverDate) < this.state.startDate) {
                            set.add({key:key,firstMessage:lang.formatString(lang.StartDate),secondMessage:lang.formatString(lang.FutureDate)})
                        } 
                    }
                        let array = Array.from(set)
                        let redirectTo;
                        let disabled;
                        if (array.length<=0){
                        disabled = false
                        redirectTo = 'IncomeDetailsPage'
                        } else{
                        disabled= true 
                        redirectTo = 'NewIncomeSourcePage'
                        }
                        this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})                              
                }
                createData(evdData, lang) {
                    let incomeType = this.state.incomeType
                    let displayLine1, displayLine2, displayLine2SecondRow, displayLine4, evidencename
                
                    if (incomeType === 'IT26001') {
                      evidencename = lang.TITLE_IT26001
                      displayLine1 = lang.DISPLAY1_IT26001
                      displayLine2 = lang.EMPLOYER + '' + this.state.employerName
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
                      displayLine2 = lang.AMOUNT + ''+`${parseFloat(this.state.amount.replace(/,/g, '')).toFixed(2)}`
                      displayLine2SecondRow = ''
                      displayLine4 = ''
                    }
                    
                    let data = {
                    page:'AddNewIncomeSource',
                    evidenceName: evidencename,
                    evidenceType:'DET0026030',
                    incomeTypeName:this.state.incomeTypeName,
                    incomeType: this.state.incomeType,
                    employerName:this.state.employerName,
                    amount:this.state.amount,
                    cntHours:lang.IncomeHours,
                    frequencyCode:this.state.frequencyCode,
                    startDate:this.state.startDate !=='Invalid date'? moment(this.state.startDate).format('YYYYMMDD'):'',  
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
       
        render(){

        let lang = locales.strings;
        let monthlyLang = monthlySummaryLocales.strings
        let empName,freqMsg
        let data = this.createData(this.state, monthlyLang);
        let codes=this.props.getCTDetails(this.props.CTReducer.CTList,'EEFIncomeType')
        if(this.state.incomeType === 'IT26001'){     
        empName =   <div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{locales.strings.EmployerName}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                                <input name="employerName" ref="employerName" type="text" title={locales.strings.EmployerName} value={this.state.employerName} maxLength="131" className="form-control" id="employerName" onChange={this.employerName.bind(this)} required/>
                            </div>
                        </div>   
                    </div>
        }
        if(this.state.frequencyCode === 'FC2'){     
            freqMsg =   <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <b>{locales.strings.FrequencyMessage}</b>         
                            </div>
                        </div>
        }

        return(
            <div className="container">
                <SecondaryHeader HeadingName={lang.NewIncome}/>
                <div className="blockUnderline"></div>
                <p className="volunteerForm-enterInformation-Paragraph">{locales.strings.AddIncomeDetailsMessage}</p>
                <form ref='addIncome_form'>
				<ErrorMessage errors={this.state.errorMessages}/>
                <div style={{paddingBottom: '2%'}}>
                    <span className="required">* Indicates a required field</span>
                </div>
                <div className="row addIncomeFormDivStyle">
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <label>{locales.strings.IncomeType}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                        <select  name="incomeType" ref="incomeType" type="select" title={locales.strings.IncomeType} value={this.state.incomeType} className="form-control" id="incomeType" onChange={this.incomeType.bind(this)} required >                      
                            <option defaultValue>--Please Select--</option>
                            {codes} 
                        </select> 
                    </div>
                </div>
                {empName}                    
                <div className="row addIncomeFormDivStyle">
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <label>{locales.strings.Amount}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12">
                        <input name="amount" ref="amount" type="text" title={locales.strings.Amount} value={this.state.amount} className="form-control" id="amount" onChange={this.amount.bind(this)} required/>
                    </div>
                </div>
                <div className="row addIncomeFormDivStyle">
                
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <label>{locales.strings.FrequencyCode}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                        <select  name="frequencyCode" ref="frequencyCode" type="select" title={locales.strings.FrequencyCode} value={this.state.frequencyCode} className="form-control" id="frequencyCode" onChange={this.frequencyCode.bind(this)} required>                
                            <option defaultValue>--Please Select--</option>
                            <option value="FC3">Monthly</option>
                            <option value="FC2">Weekly</option>
                        </select> 
                    </div>
                </div>
                {freqMsg}
                <div className=" row addIncomeFormDivStyle">
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <label>{locales.strings.StartDate}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12">
                    <CustomDatePicker curamServerDate={this.props.serverDate} initialStartDate={this.state.startDate} startDate={this.startDate.bind(this)}/>                    
                    </div>
                </div>
                <div style={{textAlign: 'center'}}>
                <p>{lang.AddIncomeNote}</p>
                </div>
                <div className="row addIncomeFormDivStyle">
                    <div className="col-md-11 col-sm-7 col-xs-7">
                        <ButtonFunctionality ButtonName={locales.strings.Cancel} displayText="IncomeDetailsPage" dstClassName="btn buttonBack1"/>
                    </div>                
                    <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)}>                         
                        <ButtonFunctionality ButtonName={locales.strings.Save} redirectTo={this.state.redirectTo} disabled={this.state.disabled} dstClassName="btn buttonBack1 marginLeftForButtons" data={data}/>
                    </div>   
                </div>
                </form>
            
            </div>
        );
    }    
}

function mapStateToProps(store) {
    return {
        CTReducer: store.CTReducer,
        dob:store.HHMembers.dob,
        pageDetails: store.pageDetailsReducer
    };
}

export default connect(mapStateToProps,{getCTDetails,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime,dateToYYYYMMDD})(NewIncomeSourcePage);


