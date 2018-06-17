import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import React from 'react'
import SecondaryHeader from './components/SecondaryHeader'
import ReactDOM from 'react-dom';
import EvidenceAddressComponent from '././components/EvidenceAddressComponent'
import PhoneNumberComponent from '././components/PhoneNumberComponent'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { connect } from 'react-redux'
import { studentInformation } from '../actions/studentAction'
import {getCTDetails} from '../actions/CTAction'
import  * as locales from './StudentProperties'
import ErrorMessage from './components/ErrorMessage'
import CustomDateRange from '../utilities/CustomDateRange'
import {validateStreet1,validateCity,validateState,validateZipCode,validatePhoneNumber,validateAreaCode,validateAreaCodeMandatory,validatePhoneNumberMandatory,validateZipCodeMandatory} from '../actions/CommonValidationActions'
import moment from 'moment-es6';
import {dateToYYYYMMDD, isDatesInSeperateMonths} from '../actions/CommonActions'
import astrisk from '../assets/astrisk.png'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class StudentPage extends React.Component{
    constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
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
            redirectTo:'MonthlySummaryPage',
            errorMessages:[], 
            studentStartDate: props.location.data? moment(props.location.data.data.studentStartDate).format('YYYY-MM-DD'):'',
            studentEndDate:props.location.data?moment(props.location.data.data.studentEndDate).format('YYYY-MM-DD'):'',
            minEndDate: props.location.data?props.location.data.data.minEndDate:null,
            AddressData:AddressData,
            PhoneData:PhoneData,
            schoolType:props.location.data?props.location.data.data.schoolType:'',
            hours:props.location.data?props.location.data.data.hours:'',
            schoolOrganizationName:props.location.data?props.location.data.data.schoolOrganizationName:'',
            disabled:'',
            index:this.props.location.data?this.props.location.data.data.index:undefined
        }
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Student page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
       this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Student page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
     }
    handleStudentValues(){
        this.setState({
            schoolOrganizationName: this.refs.schoolOrganizationName.value,
            schoolType: this.refs.schoolType.value
        })
    }
    
    AddressData(addressDetails){this.setState({AddressData: addressDetails})}
    PhoneData(phoneNumberDetails){ this.setState({PhoneData: phoneNumberDetails}) }
    
    handleSubmit(event){
        if(this.state.schoolOrganizationName !== ''){
            event.preventDefault();
            return this.props.studentInformation(this.state)
        }   
    }
    handleHoursValues(){
        this.setState({hours: this.refs.hours.value})
    }
    studentStartDate(studentStartDate){this.setState({studentStartDate: studentStartDate})}
    studentEndDate(studentEndDate){this.setState({studentEndDate: studentEndDate})}

    onMouseEnterHandler(event){  
                let lang=locales.strings;
                let validationMsg = new Set();
                for (var key in this.state) {
                    if(key==='schoolType' && (this.state[key]==='' || this.state[key]==='--Please Select--')){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.SchoolType),secondMessage:lang.formatString(lang.IsMandatory)})   
                    }                    
                    if((this.state['schoolType'] !== '' && this.state['schoolType']!=='--Please Select--') && key==='hours' && this.state[key]===''){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.Hours),secondMessage:lang.formatString(lang.IsMandatory)})  
                    }else if (key==='hours' && (this.state[key]!=='')){
                    let hours=this.state[key]
                    if(hours%1 !== 0)
                    validationMsg.add({key:key,firstMessage:"The field 'Hours' must be a whole number."})
                    }else if(key==='hours' && ( isNaN(this.state[key])=== true )){
                        validationMsg.add({key:key,firstMessage:"The field 'Hours' must be a whole number."})
                    }
                    if(key==='studentStartDate' &&  (this.state[key].trim()==='' || this.state[key]==='' || this.state[key]=== null)){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.fromDate),secondMessage:lang.formatString(lang.IsMandatory)})   
                    }
                    else if(key==='studentStartDate' && (this.state[key]!=='' || this.state[key]!== null ) && (moment(this.state.studentStartDate).isBefore(this.props.dob)) ){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.fromDate),secondMessage:lang.formatString(lang.DOBValidation)})   
                    }
                    if(key==='studentStartDate' && (this.state[key]!=='' && this.state[key]!== null )  && (this.state.studentEndDate!=='' && this.state.studentEndDate!== null ) && this.props.isDatesInSeperateMonths(this.state.studentStartDate, this.state.studentEndDate)){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.fromDate),secondMessage:lang.formatString(lang.DifferentMonthValidation)}) 
                    }
                    else if(key==='studentStartDate' && (this.state[key].trim()!=='' && this.state[key]!=='' && this.state[key]!== null ) && (this.state.studentStartDate > this.state.studentEndDate) && this.state.studentEndDate!==null && this.state.studentEndDate!=='' && this.state.studentEndDate.trim()!==''){                         
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.startDateEndDateMessage),secondMessage:''})         
                    }
                    if(key==='studentEndDate' && (this.state[key].trim()==='' || this.state[key]==='' || this.state[key]=== null)){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.endDate),secondMessage:lang.formatString(lang.IsMandatory)})   
                    }
                    if(key==='schoolOrganizationName' && this.state[key].trim()===''){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.SchoolOrganization),secondMessage:lang.formatString(lang.IsMandatory)})   
                    }
                    if(key==='AddressData' && this.props.validateStreet1(this.state['AddressData'].street1)){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.AddressLine1),secondMessage:lang.formatString(lang.IsMandatory)})   
                    }
                    if(key==='AddressData' && this.props.validateCity(this.state['AddressData'].city)){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.City),secondMessage:lang.formatString(lang.IsMandatory)})   
                    }
                    if(key==='AddressData' && this.props.validateState(this.state['AddressData'].state)){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.State),secondMessage:lang.formatString(lang.IsMandatory)})   
                    } 
                    if((key==='AddressData' && (this.props.validateZipCodeMandatory(this.state['AddressData'].zip)))){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.ZipCode),secondMessage:lang.formatString(lang.IsMandatory)})}
                            else if ((key==='AddressData' && (this.props.validateZipCode(this.state['AddressData'].zip)))) {
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.InValidZipCode),secondMessage:lang.formatString(lang.ZipCodeFormat)})           
                    }
                    if(key==='PhoneData' && (this.props.validateAreaCodeMandatory(this.state['PhoneData'].areaCode))){ 
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.AreaCode),secondMessage:lang.formatString(lang.IsMandatory)})
                    }
                    if(key==='PhoneData' && (this.props.validatePhoneNumberMandatory(this.state['PhoneData'].phoneNumber))){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.PhoneNumber),secondMessage:lang.formatString(lang.IsMandatory)})   
                    }
                    else if(key==='PhoneData' && ((this.props.validateAreaCode(this.state['PhoneData'].areaCode)) || (this.props.validatePhoneNumber(this.state['PhoneData'].phoneNumber)))&& (this.state['PhoneData'].areaCode!=='' && this.state['PhoneData'].phoneNumber!=='')){
                        validationMsg.add({key:key,firstMessage:lang.formatString(lang.InvalidPhoneNumber),secondMessage:lang.formatString(lang.FormatPhoneNumber)})   
                    }                                  
                }
        let array = Array.from(validationMsg)
        let redirectTo;
        let disabled;
                if (array.length<=0){
                    disabled = false
                    redirectTo = 'MonthlySummaryPage'
                } else{
                    disabled= true 
                    redirectTo = 'StudentPage'
                }
        this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
    }
    createData(evdData){
        let displayLine2
        if(evdData.schoolType==='EEF001'){
            displayLine2 = '1 hour of instruction = 2.5* work activity hours.'
        }
        if(evdData.schoolType==='ST3'){
            displayLine2 = '1 reported hour = 2 work activity hours.'
        }
        if(evdData.schoolType==='EEF02'){
            displayLine2 = '1 reported hour = 1 work activity hour.'
        }
        if(evdData.schoolType==='EEF03'){
            displayLine2 = '1 hour of instruction = 2 work activity hours.'
        }
        if(evdData.schoolType==='ST12'){
            displayLine2 = '1 credit hour = 2.5* work activity hours.'
        }
        if(evdData.schoolType==='ST5'){
            displayLine2 = '1 credit hour = 2.5* work activity hours.'
        }
        if(evdData.schoolType==='ST7'){
            displayLine2 = '1 credit hour = 2.5* work activity hours.'
        }

                                
        let data={
            evidenceType:"DET0026007",
            evidenceName:"School or Vocational Training",
            street1: evdData.AddressData.street1,
            street2:evdData.AddressData.street2,
            city:evdData.AddressData.city,
            state:evdData.AddressData.state,
            zip:evdData.AddressData.zip,
            zipCodeExt:evdData.AddressData.zipCodeExt,
            areaCode: evdData.PhoneData.areaCode,
            phoneNumber:evdData.PhoneData.phoneNumber,
            schoolType:this.state.schoolType,
            hours:this.state.hours,
            schoolOrganizationName:this.state.schoolOrganizationName,
            studentStartDate:this.state.studentStartDate !== 'Invalid date'? this.props.dateToYYYYMMDD(this.state.studentStartDate):'',
            studentEndDate:this.state.studentEndDate !== 'Invalid date'? this.props.dateToYYYYMMDD(this.state.studentEndDate):'',
            index:this.state.index,
            displayLine1: 'School / Organization Name: ' +''+ this.state.schoolOrganizationName,
            displayLine2: displayLine2,
            displayLine2SecondRow: 'Hours: Work activity hours will be calculated after submission.',
            displayLine4: ''
        }
        return data;
       
    }

    render() {
        let lang=locales.strings;
        let schoolTypeHours;
        let codes=this.props.getCTDetails(this.props.CTReducer.CTList,'SchoolType')
        if(this.state.schoolType==="EEF01" || this.state.schoolType==="ST3"|| this.state.schoolType==="EEF03" || this.state.schoolType==="ST5"){
            schoolTypeHours =
			<div className="row addIncomeFormDivStyle">
            
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <label>{lang.hoursfield1}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12">
                    <input name="hours" ref="hours" value={this.state.hours} type="text" title={lang.hoursfield1} maxLength="3" className="form-control" id="hours" onChange={this.handleHoursValues.bind(this)} required/>
                </div>           
		</div>	
        }else if (this.state.schoolType==="ST12" || this.state.schoolType==="ST7"){
            schoolTypeHours =
			<div className="row addIncomeFormDivStyle">            
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <label>{lang.hoursfield2}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12">
                    <input name="hours" ref="hours" value={this.state.hours}  type="text" title={lang.hoursfield2} maxLength="3" className="form-control" id="hours" onChange={this.handleHoursValues.bind(this)} required/>
                </div>            
		</div>	
        } else if(this.state.schoolType==="EEF02") {
            schoolTypeHours =
			<div className="row addIncomeFormDivStyle">            
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <label>{lang.hoursfield3}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12">
                    <input name="hours" ref="hours" value={this.state.hours} type="text" title={lang.hoursfield3} maxLength="3" className="form-control" id="hours" onChange={this.handleHoursValues.bind(this)} required/>
                </div>         
		</div>	
        }
        let data=this.createData(this.state)
        return (
            <div className="container">
                <SecondaryHeader HeadingName={lang.student}/>
                <div className="blockUnderline"></div>
                 <ErrorMessage errors={this.state.errorMessages}/>
				  <p className="required">* Indicates a required field</p>
				 <div style={{marginTop: '3%'}}></div>				
                    <form ref='schoolVocationalJobTraining_form' onSubmit={this.handleSubmit.bind(this)}>                                             
                        <div className="row addIncomeFormDivStyle" >   
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.enterDates}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                               <CustomDateRange curamServerDate={this.props.serverDate} initialStartDate={this.state.studentStartDate} initialEndDate={this.state.studentEndDate} startDate={this.studentStartDate.bind(this)} endDate={this.studentEndDate.bind(this)}/>
                            </div> 
                        </div>
                        <div className="row addIncomeFormDivStyle">                            
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.schoolType}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                                    <select name="schoolType" ref="schoolType" value={this.state.schoolType}  type="select" title={lang.schoolType} className="form-control" id="schoolType" onChange={this.handleStudentValues.bind(this)} required>
                                        <option defaultValue>{lang.Select}</option>
                                        {codes}
                                    </select>
                                </div>                            
                        </div> 
						{schoolTypeHours}
                        <div className="row addIncomeFormDivStyle">                            
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.schoolOrganization}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <input name="schoolOrganizationName" value={this.state.schoolOrganizationName}  ref="schoolOrganizationName" type="text" title={lang.schoolOrganization} maxLength="131" className="form-control" id="schoolOrganizationName" onChange={this.handleStudentValues.bind(this)} required/>
                            </div>                        
						</div>	
                        <EvidenceAddressComponent EvidenceAddressComponentValues={this.AddressData.bind(this)} addressData={this.state.AddressData}/>
                        <PhoneNumberComponent PhoneNumberComponentValues={this.PhoneData.bind(this)} PhoneData={this.state.PhoneData}/>
                        <div className="row addIncomeFormDivStyle">
                        <div style={{marginBottom: 20}}></div>                       
                            <div className="col-md-11 col-sm-7 col-xs-7">
                                <ButtonFunctionality ButtonName={lang.cancel} redirectTo="AddExemptionWorkActivity" dstClassName="btn button-text buttonBack1"/>
                            </div>
                            <div  className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)} >         
                                <ButtonFunctionality ButtonName={lang.save} redirectTo={this.state.redirectTo} disabled={this.state.disabled} dstClassName="btn buttonBack1 marginLeftForButtons" data={data}/>
                            </div>                        
                        </div> 
                    </form>   
                </div>
        );
    }
}
function mapStateToProps(store) {
    return {
        studentState: store.student,
        CTReducer: store.CTReducer,
        dob:store.HHMembers.dob,
        pageDetails: store.pageDetailsReducer
    };
}

export default connect(mapStateToProps,{studentInformation,getCTDetails,validateStreet1,validateCity,validateState,validateZipCodeMandatory,validateZipCode,validatePhoneNumber,validateAreaCode,validateAreaCodeMandatory,validatePhoneNumberMandatory, dateToYYYYMMDD,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime, isDatesInSeperateMonths})(StudentPage);
