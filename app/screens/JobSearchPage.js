import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import React from 'react'
import { connect } from 'react-redux'
import SecondaryHeader from './components/SecondaryHeader'
import CustomDateRange from '../utilities/CustomDateRange'
import EvidenceAddressComponent from './components/EvidenceAddressComponent.js'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import PhoneNumberComponent from '././components/PhoneNumberComponent'
import { JobInformation } from '../actions/JobSearchAction.js'
import  * as locales from './JobSearchProperties' 
import ErrorMessage from './components/ErrorMessage'
import {dateToYYYYMMDD, isDatesInSeperateMonths } from '../actions/CommonActions'
import moment from 'moment-es6';
import astrisk from '../assets/astrisk.png'
import {validateZipCode,validatePhoneNumber,validateAreaCode,validateAreaCodeMandatory,validatePhoneNumberMandatory,validateZipCodeMandatory} from '../actions/CommonValidationActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class JobSearch extends React.Component{
    constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Job Search page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
            AddressData:props.location.data?props.location.data.data.AddressData:'',
            PhoneData:props.location.data?props.location.data.data.PhoneData:'',
            numberOfJobContact: props.location.data?props.location.data.data.numberOfJobContact:'',
            receiveHelpJobSearch: props.location.data?props.location.data.data.receiveHelpJobSearch:'',
            programName: props.location.data?props.location.data.data.programName:'',
            contactName: props.location.data?props.location.data.data.contactName:'',
            disabled:'',            
            AddressData:AddressData,
            PhoneData:PhoneData,
            index: this.props.location.data?this.props.location.data.data.index:undefined

            }
    }
    componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Job Search page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
      componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
     }
    startDate(startDate){this.setState({startDate: startDate})}
    endDate(endDate){this.setState({endDate: endDate})}
    AddressData(addressDetails){this.setState({AddressData: addressDetails})}
    PhoneData(phoneNumberDetails){ this.setState({PhoneData: phoneNumberDetails})}
    handleProgramNameValues(){this.setState({programName: this.refs.programName.value})}
    handleContactNameValues(){this.setState({contactName: this.refs.contactName.value})}
    handleJobSearchValues(){this.setState({numberOfJobContact: this.refs.numberOfJobContact.value, receiveHelpJobSearch: this.refs.receiveHelpJobSearch.value})}
    handleSubmit(event){
        event.preventDefault();
    }
    createData(evdData){
        let data={
            evidenceName:"Job Search",
            evidenceType:"EEFDET0021",
            street1: evdData.AddressData.street1,
            street2:evdData.AddressData.street2,
            city:evdData.AddressData.city,
            state:evdData.AddressData.state,
            zip:evdData.AddressData.zip,
            zipCodeExt:evdData.AddressData.zipCodeExt,
            areaCode: evdData.PhoneData.areaCode,
            phoneNumber:evdData.PhoneData.phoneNumber,
            programName: this.state.programName,
            contactName: this.state.contactName,
            numberOfJobContact: this.state.numberOfJobContact,
            receiveHelpJobSearch: this.state.receiveHelpJobSearch,
            startDate:this.props.dateToYYYYMMDD(this.state.startDate),
            endDate:this.props.dateToYYYYMMDD(this.state.endDate),
            index:this.state.index,
            displayLine1: '1 reported job contact = 3 work activity hours.',
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
        if(key==='numberOfJobContact' && (this.state[key]==='' || this.state[key]===undefined || (this.state[key]).trim()==='' )){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.numberOfJobContact),secondMessage:lang.formatString(lang.IsMandatory)})   
        }else if( key==='numberOfJobContact' && isNaN(this.state[key])=== true){
			validationErrorMsg.add({key:key,firstMessage:"The field 'Number of Job Contacts' must be whole number"})
        }else if (key==='numberOfJobContact' && (this.state[key]!=='')){
                let numberOfJobContact=this.state[key]
                if(numberOfJobContact%1 !== 0)
            validationErrorMsg.add({key:key,firstMessage:"The field 'Number of Job Contacts' must be whole number"})
				}
        if(key==='receiveHelpJobSearch' && (this.state[key]==='' || this.state[key]==='--Please Select--' )){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.receiveHelpJobSearch),secondMessage:lang.formatString(lang.IsMandatory)})   
        }
        if( ( this.state['receiveHelpJobSearch']==='YN1') && (key==='programName' && this.state[key]==='')){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.ProgramName),secondMessage:lang.formatString(lang.IsMandatory)})            
        }
        if( ( this.state['receiveHelpJobSearch']==='YN1') && (key==='contactName' && this.state[key]==='')){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.ContactName),secondMessage:lang.formatString(lang.IsMandatory)})            
        }
        if( ( this.state['receiveHelpJobSearch']==='YN1') && (key==='AddressData' && (this.state['AddressData'].street1==='' || this.state['AddressData'].street1===undefined))){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.Street1),secondMessage:lang.formatString(lang.IsMandatory)})            
        }
        if( ( this.state['receiveHelpJobSearch']==='YN1') && (key==='AddressData' && (this.state['AddressData'].city==='' || this.state['AddressData'].city===undefined))){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.City),secondMessage:lang.formatString(lang.IsMandatory)})            
        }
        if( ( this.state['receiveHelpJobSearch']==='YN1') && (key==='AddressData' && (this.state['AddressData'].state==='' || this.state['AddressData'].state==='--Please Select--'))){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.State),secondMessage:lang.formatString(lang.IsMandatory)})            
        }
        if( ( this.state['receiveHelpJobSearch']==='YN1') && (key==='AddressData' && (this.props.validateZipCodeMandatory(this.state['AddressData'].zip)))){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.ZipCode),secondMessage:lang.formatString(lang.IsMandatory)})}
              else if ( ( this.state['receiveHelpJobSearch']==='YN1') && (key==='AddressData' && (this.props.validateZipCode(this.state['AddressData'].zip)))) {
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.InValidZipCode),secondMessage:lang.formatString(lang.FormatZipCode)})
        }   
        if(( this.state['receiveHelpJobSearch']==='YN1') && (key==='PhoneData' && (this.props.validateAreaCodeMandatory(this.state['PhoneData'].areaCode)))){ 
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.AreaCode),secondMessage:lang.formatString(lang.IsMandatory)})
        }
        if(( this.state['receiveHelpJobSearch']==='YN1') &&(key==='PhoneData' && (this.props.validatePhoneNumberMandatory(this.state['PhoneData'].phoneNumber)))){
            validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.PhoneNumber),secondMessage:lang.formatString(lang.IsMandatory)})   
        }
        else if(( this.state['receiveHelpJobSearch']==='YN1') &&(key==='PhoneData' && ((this.props.validateAreaCode(this.state['PhoneData'].areaCode)) || (this.props.validatePhoneNumber(this.state['PhoneData'].phoneNumber)))&& (this.state['PhoneData'].areaCode!=='' && this.state['PhoneData'].phoneNumber!==''))){
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
          redirectTo = 'jobSearchPage'
      }
     this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
    }

    render() {
        let DynamicFields;
        let lang = locales.strings
        let data=this.createData(this.state)
        if(this.state.receiveHelpJobSearch === 'YN1'){
            DynamicFields = <div><div className="row addIncomeFormDivStyle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <label>{lang.programName}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                    <input name="programName" ref="programName" value={this.state.programName} type="text" title={lang.programName} maxLength="131" className="form-control" id="programName" onChange={this.handleProgramNameValues.bind(this)} required/>
                </div>
        </div>
        <div className="row addIncomeFormDivStyle">
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
                <SecondaryHeader HeadingName={lang.heading}/>
                <div className="blockUnderline"></div>
                    <div style={{paddingBottom: '10px'}}>
                        <p>{lang.headerNote}</p>
                        <span className="required">* Indicates a required field</span>
                    </div>
                    <form ref='JobSearch_form'  onSubmit={this.handleSubmit.bind(this)} >
                    <ErrorMessage errors={this.state.errorMessages}/>

                        <div className="row addIncomeFormDivStyle">
                               <div className="col-md-4 col-sm-12 col-xs-12">
                                 <label>{lang.datesLabel}</label>
                               </div>
                               <div className="col-md-8 col-sm-12 col-xs-12">
                               <CustomDateRange curamServerDate={this.props.serverDate} initialStartDate={this.state.startDate} initialEndDate={this.state.endDate} startDate={this.startDate.bind(this)} endDate={this.endDate.bind(this)}/>
                               </div> 
                        </div> 

                        <div className="row addIncomeFormDivStyle">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.numberOfJobContact}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                                    <input name="numberOfJobContact" ref="numberOfJobContact" value={this.state.numberOfJobContact} maxLength="3" type="text" title={lang.numberOfJobContact} className="form-control" id="numberOfJobContact" onChange={this.handleJobSearchValues.bind(this)} required/>
                                </div>
                        </div>
                        <div className="row addIncomeFormDivStyle">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.receiveHelpJobSearch}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>   
                                <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                                    <select name="receiveHelpJobSearch" ref="receiveHelpJobSearch" value={this.state.receiveHelpJobSearch} type="select" title={lang.receiveHelpJobSearch} className="form-control" id="receiveHelpJobSearch" onChange={this.handleJobSearchValues.bind(this)} required>
                                        <option defaultValue>--Please Select--</option>
                                        <option value="YN1">Yes</option>
                                        <option value="YN2">No</option>
                                    </select>
                                </div>
                        </div>
                        {DynamicFields}
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-11 col-sm-7 col-xs-7">
                                <ButtonFunctionality ButtonName="Cancel" redirectTo="AddExemptionWorkActivity" dstClassName="btn buttonBack1"/>            
                            </div> 
                            <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
                                    <ButtonFunctionality ButtonName="Save" redirectTo={this.state.redirectTo} disabled={this.state.disabled} dstClassName="btn buttonBack1 marginLeftForButtons" data={data}/>
                            </div>
                        </div>
                    </form>
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
    jobSearchResponse: store.JobSearch,
    dob:store.HHMembers.dob,
    pageDetails: store.pageDetailsReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        JobInformation:JobInformation
    };
}

export default connect(mapStateToProps,{JobInformation,validateZipCode,validatePhoneNumber,validateAreaCode,validateAreaCodeMandatory,validatePhoneNumberMandatory,validateZipCodeMandatory,dateToYYYYMMDD,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime, isDatesInSeperateMonths})(JobSearch);