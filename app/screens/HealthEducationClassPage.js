import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import React from 'react'
import {connect} from 'react-redux'
import SecondaryHeader from './components/SecondaryHeader'
import CustomDateRange from '../utilities/CustomDateRange'
import PhoneNumberComponent from '././components/PhoneNumberComponent'
import EvidenceAddressComponent from './components/EvidenceAddressComponent.js'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { healthEducationInformation } from '../actions/healthEducationAction.js'
import  * as locales from './HealthEducationClassPageProperties'
import moment from 'moment-es6';
import {getCTDetails} from '../actions/CTAction'
import astrisk from '../assets/astrisk.png'
import ErrorMessage from './components/ErrorMessage'
import {dateToYYYYMMDD, isDatesInSeperateMonths} from '../actions/CommonActions'
import {validateStreet1,validateCity,validateState,validateZipCode,validatePhoneNumber,validateAreaCode,validateAreaCodeMandatory,validatePhoneNumberMandatory,validateZipCodeMandatory} from '../actions/CommonValidationActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class HealthEducationClass extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Health Education Class Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        let AddressData={
            street1:'',
            street2:'',
            city:'',
            state:'',
            zip:'',
            zipCodeExt:'',
        }
        let PhoneData={
            phoneAreaCode:'',
            phoneNumber:''
        }
        if(props.location.data){            
            AddressData.street1=props.location.data.data.street1
            AddressData.street2=props.location.data.data.street2
            AddressData.city=props.location.data.data.city
            AddressData.state=props.location.data.data.state
            AddressData.zip=props.location.data.data.zip
            AddressData.zipCodeExt=props.location.data.data.zipCodeExt
            PhoneData.areaCode=props.location.data.data.phoneAreaCode
            PhoneData.phoneNumber=props.location.data.data.phoneNumber
        }
        this.state = {
            redirectTo:'',
            className:props.location.data?props.location.data.data.className:'',
            disabled:'', 
            errorMessages:[],
            attendanceType: props.location.data?props.location.data.data.attendanceType:'',
            hours: props.location.data?props.location.data.data.hours:'',
            contactName: props.location.data?props.location.data.data.contactName:'',
            disabled:'',
            startDate:props.location.data?moment(props.location.data.data.startDate).format('YYYY-MM-DD'):'',
            endDate:props.location.data?moment(props.location.data.data.endDate).format('YYYY-MM-DD'):'',       
            AddressData:AddressData,
            PhoneData:PhoneData,
            index:this.props.location.data?this.props.location.data.data.index:undefined
        }
    }
    componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
     }
      componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Health Education Class Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    startDate(startDate){
        this.setState({startDate: startDate})
    }
    
    endDate(endDate){
        this.setState({endDate: endDate})
    }

    handleHealthEducationValues(){this.setState({className: this.refs.className.value,attendanceType: this.refs.attendanceType.value,hours: this.refs.hours.value})}
    handleContactNameValues(){this.setState({contactName: this.refs.contactName.value})}
    AddressData(addressDetails){this.setState({AddressData: addressDetails})}
    PhoneData(phoneNumberDetails){ this.setState({PhoneData: phoneNumberDetails})}
    handleSubmit(event){
        if(this.state.className !== ''){
            event.preventDefault();
            return this.props.healthEducationInformation(this.state)
        }
    }
onMouseEnterHandler(event){
            let lang = locales.strings
            let validationMsg = new Set();
            for (var key in this.state) {
                if(key==='startDate' && (this.state[key]==='' || this.state[key]=== null ) ){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.FromDate),secondMessage:lang.formatString(lang.IsMandatory)})   
                }
                if(key==='startDate' && (this.state[key]!=='' || this.state[key]!== null ) && (moment(this.state.startDate).isBefore(this.props.dob)) ){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.FromDate),secondMessage:lang.formatString(lang.DOBValidation)})   
                }
                if(key==='endDate' && (this.state[key]==='' || this.state[key]=== null ) ){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.ToDate),secondMessage:lang.formatString(lang.IsMandatory)})
                }
                if(key==='startDate' && (this.state[key]!=='' && this.state[key]!== null )  && (this.state.endDate!=='' && this.state.endDate!== null ) && this.props.isDatesInSeperateMonths(this.state.startDate, this.state.endDate)){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.FromDate),secondMessage:lang.formatString(lang.DifferentMonthValidation)}) 
                }
                else if(key==='startDate' && (this.state[key]!=='' && this.state[key]!== null )  && (this.state.endDate!=='' && this.state.endDate!== null ) && this.state.startDate > this.state.endDate){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.FromDate),secondMessage:lang.formatString(lang.StartDateValidation)}) 
                 }
                if(key==='className' && this.state[key].trim()===''){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.ClassName),secondMessage:lang.formatString(lang.IsMandatory)})   
                }
                if(key==='attendanceType' && (this.state[key].trim()==='' || this.state[key].trim()=== undefined || this.state[key]==='--Please Select--' )){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.AttendanceType),secondMessage:lang.formatString(lang.IsMandatory)})
                }
                if(( this.state['attendanceType']==='EEFHECAT02') && (key==='contactName' && this.state[key].trim()==='')){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.ContactName),secondMessage:lang.formatString(lang.IsMandatory)})   
                }
                if( ( this.state['attendanceType']==='EEFHECAT02') && (key==='AddressData' && this.props.validateStreet1(this.state['AddressData'].street1))){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.AddressLine1),secondMessage:lang.formatString(lang.IsMandatory)})            
                }
                if( ( this.state['attendanceType']==='EEFHECAT02') && (key==='AddressData' && this.props.validateCity(this.state['AddressData'].city))){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.City),secondMessage:lang.formatString(lang.IsMandatory)})            
                }
                if( ( this.state['attendanceType']==='EEFHECAT02') && (key==='AddressData' && this.props.validateState(this.state['AddressData'].state))){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.State),secondMessage:lang.formatString(lang.IsMandatory)})            
                }
                if( ( this.state['attendanceType']==='EEFHECAT02') && (key==='AddressData' && (this.props.validateZipCodeMandatory(this.state['AddressData'].zip)))){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.ZipCode),secondMessage:lang.formatString(lang.IsMandatory)})}
                       else if ( ( this.state['attendanceType']==='EEFHECAT02') && (key==='AddressData' && (this.props.validateZipCode(this.state['AddressData'].zip)))) {
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.InValidZipCode),secondMessage:lang.formatString(lang.FormatZipCode)})
                }
				if(key==='hours' && (this.state[key]==='null' || this.state[key].trim()==='')){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.Hours),secondMessage:lang.formatString(lang.IsMandatory)})   
                }else if(key==='hours' && ( isNaN(this.state[key])=== true )){
                    validationMsg.add({key:key,firstMessage:"The field 'Hours' must be a whole number."})
                }else if (key==='hours' && (this.state[key]!=='')){
                    let hours=this.state[key]
                    if(hours%1 !== 0)
                    validationMsg.add({key:key,firstMessage:"The field 'Hours' must be a whole number."})
                }						 
                
                if(( this.state['attendanceType']==='EEFHECAT02') && (key==='PhoneData' && (this.props.validateAreaCodeMandatory(this.state['PhoneData'].areaCode)))){ 
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.AreaCode),secondMessage:lang.formatString(lang.IsMandatory)})
                }
                if(( this.state['attendanceType']==='EEFHECAT02') &&(key==='PhoneData' && (this.props.validatePhoneNumberMandatory(this.state['PhoneData'].phoneNumber)))){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.PhoneNumber),secondMessage:lang.formatString(lang.IsMandatory)})   
                }
                else if(( this.state['attendanceType']==='EEFHECAT02') &&(key==='PhoneData' && ((this.props.validateAreaCode(this.state['PhoneData'].areaCode)) || (this.props.validatePhoneNumber(this.state['PhoneData'].phoneNumber)))&& (this.state['PhoneData'].areaCode!=='' && this.state['PhoneData'].phoneNumber!==''))){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.InvalidPhoneNumber),secondMessage:lang.formatString(lang.FormatPhoneNumber)})   
                } 
        }
            let array = Array.from(validationMsg)
            let redirectTo;
            let disabled;
            if (array.length<=0){
            disabled = false
            redirectTo = 'MonthlySummaryPage'
            } else{
            disabled= true 
            redirectTo = 'HealthEducationClass'
            }
            this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
            
    }
createData(evdData){
let data={
    evidenceName:"Health Education Class",
    evidenceType:"EEFDET0020",
    className: this.state.className,
    attendanceType: this.state.attendanceType,
    hours: this.state.hours,
    contactName: this.state.contactName,
    street1: evdData.AddressData.street1,
    street2:evdData.AddressData.street2,
    city:evdData.AddressData.city,
    state:evdData.AddressData.state,
    zip:evdData.AddressData.zip,
    phoneAreaCode: evdData.PhoneData.areaCode,
    phoneNumber:evdData.PhoneData.phoneNumber,
    startDate: this.props.dateToYYYYMMDD(this.state.startDate),
    endDate:this.props.dateToYYYYMMDD(this.state.endDate),
    index:this.state.index,
    displayLine1: '1 reported hour = 1 work activity hour.',
    displayLine2: 'You may count up to 20 hours each year from this activity.',
    displayLine2SecondRow: 'Class Name: ' +''+ this.state.className,
    displayLine4: 'Hours : Work activity hours will be calculated after submission.'
}

return data;
}
    render() {
        let DynamicFields;
        let lang = locales.strings
        let data=this.createData(this.state)
        let codes=this.props.getCTDetails(this.props.CTReducer.CTList,'EEFHECAttendanceType')
        if(this.state.attendanceType === 'EEFHECAT02'){
            DynamicFields = <div><div className="row addIncomeFormDivStyle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <label>{lang.contactName}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                    <input name="contactName" ref="contactName" value={this.state.contactName} type="text" title={lang.contactName} maxLength="131" className="form-control" id="contactName" onChange={this.handleContactNameValues.bind(this)} required/>
                </div>
            </div>
        <EvidenceAddressComponent EvidenceAddressComponentValues={this.AddressData.bind(this)} addressData={this.state.AddressData}/>
        <PhoneNumberComponent PhoneNumberComponentValues={this.PhoneData.bind(this)} PhoneData={this.state.PhoneData}/>
        </div>
        }
        return (
            <div className="container">
                <SecondaryHeader HeadingName="Health Education Class"/>
                <div className="blockUnderline"/>
                <ErrorMessage errors={this.state.errorMessages}/>
                <p className="required">* Indicates a required field</p>   
                <p className="sideHeaders">{lang.aboutPerson}</p>                 
                <p style={{fontWeight: 'bold', marginTop: "20px"}}>{lang.headerNote1}<br/>{lang.headerNote2}</p>  
				<form ref='healthEducation_form'  onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row addIncomeFormDivStyle">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label>{lang.datesLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12">
                            <CustomDateRange curamServerDate={this.props.serverDate} initialStartDate={this.state.startDate} initialEndDate={this.state.endDate} startDate={this.startDate.bind(this)} endDate={this.endDate.bind(this)}/>
                        </div> 
                    </div>
                        <div className="row addIncomeFormDivStyle">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.className}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                                    <input name="className" ref="className" value={this.state.className} type="text" title={lang.className} maxLength="131" className="form-control" id="className" onChange={this.handleHealthEducationValues.bind(this)} required/>
                                </div>
                        </div>
                        <div className="row addIncomeFormDivStyle">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.attendance}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12 selectDropDownArrowStyle centerAlignStyle">
                                    <select name="attendanceType" ref="attendanceType" value={this.state.attendanceType} type="select" title={lang.attendance} className="form-control" id="attendanceType" onChange={this.handleHealthEducationValues.bind(this)} required>
                                        <option defaultValue>--Please Select--</option>
                                        {codes}
                                    </select>
                                </div>
                            </div>
                            <div className="row addIncomeFormDivStyle">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.hours}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                                    <input name="hours" ref="hours" value={this.state.hours} type="text" title={lang.hours} className="form-control" maxLength="3" id="hours" onChange={this.handleHealthEducationValues.bind(this)} required/>
                                </div>
                            </div>    
                        {DynamicFields}
                        <div className="row addIncomeFormDivStyle">
                            <div  className="col-md-11 col-sm-7 col-xs-7">
                            <ButtonFunctionality ButtonName={lang.cancel} redirectTo="AddExemptionWorkActivity" dstClassName="btn buttonBack1"/>
                            </div>
                            <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)} >
                            <ButtonFunctionality ButtonName={lang.save} disabled={this.state.disabled} redirectTo={this.state.redirectTo} dstClassName="btn buttonBack1 marginLeftForButtons" data={data}/>            
                            </div>        
                        </div>
                    </form>
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
    healthEducationResponse: store.healthEducation,
    CTReducer: store.CTReducer,
    dob:store.HHMembers.dob,
    pageDetails: store.pageDetailsReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        healthEducationInformation:healthEducationInformation
    };
}

export default connect(mapStateToProps,{healthEducationInformation,getCTDetails,validateStreet1,validateCity,validateState,validateZipCode,validateZipCodeMandatory,validatePhoneNumber,validateAreaCode,validateAreaCodeMandatory,validatePhoneNumberMandatory,dateToYYYYMMDD,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime ,isDatesInSeperateMonths})(HealthEducationClass);
