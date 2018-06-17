import '../CSS/App.css';
import '../CSS/App-DesktopsScreen.css'
import React from 'react'
import heroImage from '../assets/hero.jpg';
import SecondaryHeader from './components/SecondaryHeader';
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { connect } from 'react-redux'
import { alcoholDrugInformation } from '../actions/alcoholDrugAction'
import PhoneNumberComponent from '././components/PhoneNumberComponent'
import  * as locales from './AlcoholDrugTreatementProgramProperties'
import EvidenceAddressComponent from './components/EvidenceAddressComponent.js'
import ErrorMessage from './components/ErrorMessage'
import {validateStreet1,validateCity,validateState,validateZipCode,validatePhoneNumber,validateAreaCode,validatePhoneNumberMandatory,validateAreaCodeMandatory,validateZipCodeMandatory} from '../actions/CommonValidationActions'
import astrisk from '../assets/astrisk.png'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class AlcoholDrugTreatmentProgram extends React.Component{
    constructor(props){
        super(props);
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Alchol Drug Treatment Program Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
            programFacilityName: props.location.data?props.location.data.data.programFacilityName:'',
            contactName: props.location.data?props.location.data.data.contactName:'',
            errorMessages:[],
            AddressData:AddressData,
            PhoneData:PhoneData,          
            disabled:'',
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Alchol Drug Treatment Program Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
handleAlcoholDrugValues(){this.setState({programFacilityName: this.refs.programFacilityName.value, contactName: this.refs.contactName.value})}
AddressData(addressDetails){this.setState({AddressData: addressDetails})}
PhoneData(phoneNumberDetails){ this.setState({PhoneData: phoneNumberDetails})}
handleSubmit(event){
    if(this.state.programFacilityName !== ''){
        event.preventDefault();
        return this.props.alcoholDrugInformation(this.state)
    }
}
createData(evdData){
    let data={
        evidenceName:"Alcohol or Drug Treatment program",
        evidenceType:'EEFDET0016',
        street1: evdData.AddressData.street1,
        Street2:evdData.AddressData.street2,
        city:evdData.AddressData.city,
        state:evdData.AddressData.state,
        zip:evdData.AddressData.zip,
        zipCodeExt:evdData.AddressData.zipCodeExt,
        phoneAreaCode: evdData.PhoneData.areaCode,
        phoneNumber:evdData.PhoneData.phoneNumber,
        programFacilityName: this.state.programFacilityName,
        contactName: this.state.contactName,
        index:this.state.index,
        displayLine1: 'Program/Facility Name: '+''+ this.state.programFacilityName,
        displayLine2: '',
        displayLine2SecondRow: '' ,
        displayLine4: ''
    }
    return data;
}
onMouseEnterHandler(event){ 
        let lang=locales.strings;
        let validationErrorMsg =new Set();
        for (var key in this.state) {     
            
        /* if(key==='startDate' && (this.state[key]==='' || this.state[key]=== null ) ){
                validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.FromDate),secondMessage:lang.formatString(lang.IsMandatory)})   
            }
            if(key==='endDate' && (this.state[key]==='' || this.state[key]=== null ) ){
                validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.ToDate),secondMessage:lang.formatString(lang.IsMandatory)})   
            } */
            if(key==='programFacilityName' && this.state[key]===''){
                validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.ProgramName),secondMessage:lang.formatString(lang.IsMandatory)})   
            }
            if(key==='contactName' && (this.state[key]==='')){
                validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.ContactName),secondMessage:lang.formatString(lang.IsMandatory)})   
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
              redirectTo = 'AlcoholDrugTreatmentProgram'
          }
         this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
        }
render(){
    let lang=locales.strings;
    let data=this.createData(this.state)
        return(
            <div className='container'>
                <SecondaryHeader HeadingName={lang.title}/>
                <div className='blockUnderline'></div>
				<ErrorMessage errors={this.state.errorMessages}/>
                <p className="required">* Indicates a required field</p>
                <div style={{paddingBottom: '2%'}}>
                <p>{lang.info}</p> 
                </div>
                    <form ref='alocholDrugTreatment_form'  onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row addIncomeFormDivStyle">
                           
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.programFacilityName}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                                    <input name="programFacilityName" ref="programFacilityName" value={this.state.programFacilityName} type="text" title={lang.programFacilityName} maxLength="131" className="form-control" id="programFacilityName" onChange={this.handleAlcoholDrugValues.bind(this)} required/>
                                </div>
                            </div>
                        
                        <div className="row addIncomeFormDivStyle">
                           
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.contactName}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                                    <input name="contactName" ref="contactName" value={this.state.contactName} type="text" title={lang.contactName} maxLength="131" className="form-control" id="contactName" onChange={this.handleAlcoholDrugValues.bind(this)} required/>
                                </div>
                            </div>
                       
                        <EvidenceAddressComponent EvidenceAddressComponentValues={this.AddressData.bind(this)} addressData={this.state.AddressData}/>
                        <PhoneNumberComponent PhoneNumberComponentValues={this.PhoneData.bind(this)} PhoneData={this.state.PhoneData}/>
                        <div className="row addIncomeFormDivStyle">
                        <div style={{marginBottom: 20}}></div>
                        
                            <div className="col-md-11 col-sm-7 col-xs-7">
                                <ButtonFunctionality ButtonName= {lang.Cancel} redirectTo="AddExemptionWorkActivity" dstClassName="btn button-text buttonBack1"/>
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
        volunteerResponse: store.volunteer,
        pageDetails: store.pageDetailsReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        alcoholDrugInformation:alcoholDrugInformation
    };
}


export default connect(mapStateToProps,{alcoholDrugInformation,validateStreet1,validateCity,validateState,validateZipCodeMandatory,validateZipCode,validatePhoneNumber,validateAreaCode,validatePhoneNumberMandatory,validateAreaCodeMandatory,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(AlcoholDrugTreatmentProgram);