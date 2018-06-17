import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react'
import SecondaryHeader from './components/SecondaryHeader'
import DatePicker from 'react-datepicker';
import moment from 'moment-es6';
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { connect } from 'react-redux'
import { addJobSearchTrainingInformation } from '../actions/JobSearchTrainingAction'
import EvidenceAddressComponent from './components/EvidenceAddressComponent.js'
import PhoneNumberComponent from '././components/PhoneNumberComponent'
import CustomDateRange from '../utilities/CustomDateRange'
import  * as locales from './JobSearchTrainingProgramProperties'
import ErrorMessage from './components/ErrorMessage'
import { isDatesInSeperateMonths,dateToYYYYMMDD } from '../actions/CommonActions'
import astrisk from '../assets/astrisk.png'
import {validateStreet1,validateCity,validateState,validateZipCode,validatePhoneNumber,validateAreaCode,validatePhoneNumberMandatory,validateAreaCodeMandatory,validateZipCodeMandatory} from '../actions/CommonValidationActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class JobSearchTrainingProgramPage extends React.Component{
    constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Job Search Training Program Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        let AddressData={
            street1:'',
            street2:'',
            city:'',
            state:'',
            zip:'',
            zipCodeExt:'',
        }
        let PhoneData={
            areaCode:'',
            phoneNumber:''
        }
        if(props.location.data){            
            AddressData.street1=props.location.data.data.street1
            AddressData.street2=props.location.data.data.street2
            AddressData.city=props.location.data.data.city
            AddressData.state=props.location.data.data.state
            AddressData.zip=props.location.data.data.zip
            AddressData.zipCodeExt=props.location.data.data.zipCodeExt
            PhoneData.areaCode=props.location.data.data.areaCode
            PhoneData.phoneNumber=props.location.data.data.phoneNumber
        } 
        this.state={
            redirectTo:'',
            errorMessages:[],            
            startDate:props.location.data?moment(props.location.data.data.startDate).format('YYYY-MM-DD'):'',
            endDate:props.location.data?moment(props.location.data.data.endDate).format('YYYY-MM-DD'):'',
            hours: props.location.data?props.location.data.data.hours:'',
            programName: props.location.data?props.location.data.data.programName:'',
            contactName: props.location.data?props.location.data.data.contactName:'',
            AddressData:AddressData,
            PhoneData:PhoneData,
            disabled:'',
            index:this.props.location.data?this.props.location.data.data.index:undefined      
        }
    }
    componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Job Search Training Program Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
      componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
     }
      programName(){this.setState({programName: this.refs.programName.value})}
    hours(){this.setState({hours: this.refs.hours.value})}
    contactName(){this.setState({contactName: this.refs.contactName.value})}
    handleChangeStart(e){this.setState({startDate:e,minEndDate:e })}
    handleChangeEnd(e){this.setState({endDate:e})}
    handleSubmit(event) {
        if (this.state.startDate !== '') {
            event.preventDefault();
            var JobSearchTrainingInformation = {
                startDate: this.state.startDate,  
                endDate: this.state.endDate, 
                organizationName: this.state.organizationName,
                hours: this.state.hours,
                contactName: this.state.contactName,
                Apt: this.state.AddressData.Apt,
                street1: this.state.AddressData.street1,
                street2:this.state.AddressData.street2,
                city: this.state.AddressData.city,
                state: this.state.AddressData.state,
                zip: this.state.AddressData.zip,
                county: this.state.AddressData.county,
                areaCode: this.state.PhoneData.areaCode, 
                phoneNumber:this.state.PhoneData.phoneNumber,
                index:this.state.index
            }
        return this.props.addJobSearchTrainingInformation(JobSearchTrainingInformation)
        }
    }
    AddressData(addressDetails){this.setState({AddressData: addressDetails})}
    PhoneData(phoneNumberDetails){ this.setState({PhoneData: phoneNumberDetails}) }
    startDate(startDate){this.setState({startDate: startDate})}
    endDate(endDate){this.setState({endDate: endDate})}
    
    createData(evdData){
        let data={
            evidenceName:"Job Search Training",
            evidenceType:"EEFDET0018",
            street1: evdData.AddressData.street1,
            street2:evdData.AddressData.street2,
            city:evdData.AddressData.city,
            state:evdData.AddressData.state,
            zip:evdData.AddressData.zip,
            zipCodeExt:evdData.AddressData.zipCodeExt,
            areaCode: evdData.PhoneData.areaCode,
            phoneNumber:evdData.PhoneData.phoneNumber,
            startDate: this.props.dateToYYYYMMDD(this.state.startDate),
            endDate: this.props.dateToYYYYMMDD(this.state.endDate),
            programName: this.state.programName,
            hours: this.state.hours,
            contactName: this.state.contactName,
            index:this.state.index,
            displayLine1: '1 reported hour = 1 work activity hour.',
            displayLine2: 'You may count up to 39 total hours from Job Search and Job Search Training each month.',
            displayLine2SecondRow: 'Hours : Work activity hours will be calculated after submission.',
            displayLine4: ''

        }
        return data;
    }

    onMouseEnterHandler(event){ 
        let lang = locales.strings
    let validationErrorMsg =new Set();
    for (var key in this.state) { 
        if(key==='startDate' && (this.state[key]==='' || this.state[key]=== null ) ){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.FromDate),secondMessage:lang.formatString(lang.IsMandatory)})   
        }
        if(key==='startDate' && (this.state[key]!=='' || this.state[key]!== null ) && (moment(this.state.startDate).isBefore(this.props.dob)) ){
            validationMsg.add({key:key,firstMessage:lang.formatString(lang.FromDate),secondMessage:lang.formatString(lang.DOBValidation)})   
        }
        if(key==='endDate' && (this.state[key]==='' || this.state[key]=== null ) ){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.ToDate),secondMessage:lang.formatString(lang.IsMandatory)})
        }  
        if(key==='startDate' && (this.state[key]!=='' && this.state[key]!== null )  && (this.state.endDate!=='' && this.state.endDate!== null ) && this.props.isDatesInSeperateMonths(this.state.startDate, this.state.endDate)){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.FromDate),secondMessage:lang.formatString(lang.DifferentMonthValidation)}) 
        }
        else if(key==='startDate' && (this.state[key]!=='' && this.state[key]!== null )  && (this.state.endDate!=='' && this.state.endDate!== null ) && this.state.startDate > this.state.endDate){
             validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.FromDate),secondMessage:lang.formatString(lang.StartDateValidation)}) 
         }  
        if(key==='hours' && (this.state[key]=== null || this.state[key].trim()==='')){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.hours),secondMessage:lang.formatString(lang.IsMandatory)})
        }else if(key==='hours' && ( isNaN(this.state[key])=== true )){
                    validationErrorMsg.add({key:key,firstMessage:"The field 'Hours' must be a whole number."})
                }else if (key==='hours' && (this.state[key]!=='')){
                    let hours=this.state[key]
                    if(hours%1 !== 0)
                    validationErrorMsg.add({key:key,firstMessage:"The field 'Hours' must be a whole number."})
		}			
        if(key==='contactName' && (this.state[key]==='' || this.state[key]=== null  || this.state[key].trim()==='')){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.contactName),secondMessage:lang.formatString(lang.IsMandatory)})   
        }else if(key==='contactName' && ( isNaN(this.state[key])=== false)){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.contactName),secondMessage:lang.formatString(lang.IsInvalid)})
        } 
        if(key==='programName' && (this.state[key]==='' || this.state[key]=== null  || this.state[key].trim()==='')){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.programName),secondMessage:lang.formatString(lang.IsMandatory)})   
        }     
        if(key==='AddressData' && this.props.validateStreet1(this.state['AddressData'].street1)){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.AddressLine1),secondMessage:lang.formatString(lang.IsMandatory)})   
        }
        if(key==='AddressData' && this.props.validateCity(this.state['AddressData'].city)){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.City),secondMessage:lang.formatString(lang.IsMandatory)})   
        }
        if(key==='AddressData' && this.props.validateState(this.state['AddressData'].state)){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.State),secondMessage:lang.formatString(lang.IsMandatory)})   
        }
        if((key==='AddressData' && (this.props.validateZipCodeMandatory(this.state['AddressData'].zip)))){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.ZipCode),secondMessage:lang.formatString(lang.IsMandatory)})}
                else if ((key==='AddressData' && (this.props.validateZipCode(this.state['AddressData'].zip)))) {
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.InValidZipCode),secondMessage:lang.formatString(lang.FormatZipCode)})           
        }
        if(key==='PhoneData' && (this.props.validateAreaCodeMandatory(this.state['PhoneData'].areaCode))){ 
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.AreaCode),secondMessage:lang.formatString(lang.IsMandatory)})
        }
        if(key==='PhoneData' && (this.props.validatePhoneNumberMandatory(this.state['PhoneData'].phoneNumber))){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.PhoneNumber),secondMessage:lang.formatString(lang.IsMandatory)})   
        }
        else if(key==='PhoneData' && ((this.props.validateAreaCode(this.state['PhoneData'].areaCode)) || (this.props.validatePhoneNumber(this.state['PhoneData'].phoneNumber)))&& (this.state['PhoneData'].areaCode!=='' && this.state['PhoneData'].phoneNumber!=='')){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.InvalidPhoneNumber),secondMessage:lang.formatString(lang.FormatPhoneNumber)})   
        } 
    }             
            
    let array = Array.from(validationErrorMsg)
    let redirectTo;
    let disabled;
    if (array.length<=0){
        disabled = false
        redirectTo = 'MonthlySummaryPage'
        } else{
         disabled= true 
         redirectTo = 'JobSearchTrainingProgramPage'
        }
        this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
        }
    render(){
        let lang=locales.strings;
        let data=this.createData(this.state)
        return (
            <div className="container">
                <SecondaryHeader HeadingName={lang.heading}/>
                <div className="blockUnderline"></div>
				<ErrorMessage errors={this.state.errorMessages}/>
				<div style={{paddingBottom: '2%'}}>
                <p className="required">* Indicates a required field</p>				                         
                    <p>{lang.headerNote}</p>                        
                   </div>
                <form ref='volunteer_form'  onSubmit={this.handleSubmit.bind(this)}>
				    <div className="row addIncomeFormDivStyle">
					
					   <div className="col-md-4 col-sm-12 col-xs-12">
						 <label>{lang.datesLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
					   </div>
					   <div className="col-md-8 col-sm-12 col-xs-12">
						<CustomDateRange curamServerDate={this.props.serverDate} initialStartDate={this.state.startDate} initialEndDate={this.state.endDate} startDate={this.startDate.bind(this)} endDate={this.endDate.bind(this)}/>
					   </div> 
					 </div> 
					<div style={{marginBottom: 20}}></div>
					<div className="row addIncomeFormDivStyle">                              
						<div className="col-md-4 col-sm-12 col-xs-12">
							<label>{lang.hours}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
						</div>
						<div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
						<input name="hours" ref="hours" value={this.state.hours} type="text" title={lang.hours} className="form-control" maxLength="3" id="hours" onChange={this.hours.bind(this)} required/>
						</div>
					</div>
                  <div className="row addIncomeFormDivStyle">                  
                      <div className="col-md-4 col-sm-12 col-xs-12">
                            <label>{lang.programName}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                            <input name="programName" ref="programName" value={this.state.programName} type="text" title={lang.programName} maxLength="131" className="form-control" id="programName" onChange={this.programName.bind(this)} required/>
                            </div>
                        </div>                   
                   <div className="row addIncomeFormDivStyle">                   
                       <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.contactName}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                            <input name="contactName" ref="contactName" value={this.state.contactName} type="text" title={lang.contactName} maxLength="131" className="form-control" id="contactName" onChange={this.contactName.bind(this)} required/>
                            </div>
                        </div>                    
                    <EvidenceAddressComponent EvidenceAddressComponentValues={this.AddressData.bind(this)} addressData={this.state.AddressData}/>
                        <PhoneNumberComponent PhoneNumberComponentValues={this.PhoneData.bind(this)} PhoneData={this.state.PhoneData}/>
                        <div style={{marginBottom: 20}}></div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-11 col-sm-7 col-xs-7">
                            <ButtonFunctionality ButtonName={lang.cancel} redirectTo="AddExemptionWorkActivity" dstClassName="btn buttonBack1"/>             
                            </div>
                            <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
                            <ButtonFunctionality ButtonName={lang.save} redirectTo="MonthlySummaryPage" disabled={this.state.disabled} dstClassName="btn buttonBack1 marginLeftForButtons" data={data}/>
                            </div>        
                        </div>
                </form> 
                </div>
        );
    }
}
function mapStateToProps(store) {
    return {
        JobSearchTrainingResponse: store.JobSearchTraining,
        dob:store.HHMembers.dob,
        pageDetails: store.pageDetailsReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addJobSearchTrainingInformation:addJobSearchTrainingInformation
        

    };
}


export default connect(mapStateToProps,{addJobSearchTrainingInformation,validateStreet1,validateCity,validateState,validateZipCodeMandatory,validateZipCode,validatePhoneNumber,validateAreaCode,validatePhoneNumberMandatory,validateAreaCodeMandatory,dateToYYYYMMDD,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime, isDatesInSeperateMonths})(JobSearchTrainingProgramPage);
