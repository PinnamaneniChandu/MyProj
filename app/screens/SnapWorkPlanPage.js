import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import React from 'react'
import SecondaryHeader from './components/SecondaryHeader'
import moment from 'moment-es6'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { connect } from 'react-redux'
import { SnapWorkPlanInformation } from '../actions/snapWorkPlanAction'
import EvidenceAddressComponent from './components/EvidenceAddressComponent.js'
import PhoneNumberComponent from '././components/PhoneNumberComponent'
import CustomDateRange from '../utilities/CustomDateRange'
import  * as locales from './SnapWorkPlanProperties'
import ErrorMessage from './components/ErrorMessage'
import astrisk from '../assets/astrisk.png'
import {validateStreet1,validateCity,validateState,validateZipCode,validateZipCodeMandatory,validatePhoneNumber,validateAreaCode,validatePhoneNumberMandatory,validateAreaCodeMandatory} from '../actions/CommonValidationActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class SnapWorkPlanPage extends React.Component{
    constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Snap Work Plan page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
            organizationName: props.location.data?props.location.data.data.organizationName:"",
            contactName: props.location.data?props.location.data.data.contactName:"",
            disabled:'',
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
       this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Snap Work Plan page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
     }
    AddressData(addressDetails){this.setState({AddressData: addressDetails})}
    PhoneData(phoneNumberDetails){ this.setState({PhoneData: phoneNumberDetails})}
    organizationName(){this.setState({organizationName: this.refs.organizationName.value})}
    contactName(){this.setState({contactName: this.refs.contactName.value})}
    handleSubmit(event) {
        if (this.state.organizationName !== '') {
            event.preventDefault();
        return this.props.SnapWorkPlanInformation(this.state)
        }
    }

    onMouseEnterHandler(event){ 
            let lang=locales.strings;
            let validationErrorMsg =new Set();
            for (var key in this.state) {     
                

                if(key==='organizationName' && (this.state[key]==='' || this.state[key]=== null || this.state[key].trim()==='')){
                    validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.OrgName),secondMessage:lang.formatString(lang.IsMandatory)})   
                }
                if(key==='contactName' && (this.state[key]==='' || this.state[key]=== null  || this.state[key].trim()==='')){
                    validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.contactName),secondMessage:lang.formatString(lang.IsMandatory)})   
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
                if( key==='AddressData' && (this.props.validateZipCodeMandatory(this.state['AddressData'].zip))){
                    validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.ZipCode),secondMessage:lang.formatString(lang.IsMandatory)})}
                      else if ( key==='AddressData' && (this.props.validateZipCode(this.state['AddressData'].zip))) {
                    validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.InValidZipCode),secondMessage:lang.formatString(lang.FormatZipCode)})
                }
               if(key==='PhoneData' && (this.props.validateAreaCodeMandatory(this.state['PhoneData'].areaCode))){ 
                    validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.AreaCode),secondMessage:lang.formatString(lang.IsMandatory)})
                }
                if(key==='PhoneData' && (this.props.validatePhoneNumberMandatory(this.state['PhoneData'].phoneNumber))){
                    validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.PhoneNumber),secondMessage:lang.formatString(lang.IsMandatory)})   
                }
                else if(key==='PhoneData' && ((this.props.validateAreaCode(this.state['PhoneData'].areaCode)) || (this.props.validatePhoneNumber(this.state['PhoneData'].phoneNumber))) && (this.state['PhoneData'].areaCode!=='' && this.state['PhoneData'].phoneNumber!=='')){
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
                  redirectTo = 'SnapWorkPlan'
              }
             this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
            }

    createData(evdData){
    let data={
        evidenceName:"Compliant with SNAP Plan",
        evidenceType:"EEFDET0025",
        organizationName: this.state.organizationName,
        contactName: this.state.contactName,
        street1: this.state.AddressData.street1,
        street2:this.state.AddressData.street2,
        city: this.state.AddressData.city,
        state: this.state.AddressData.state,
        zip: this.state.AddressData.zip,
        areaCode: this.state.PhoneData.areaCode, 
        phoneNumber:this.state.PhoneData.phoneNumber,
        index: this.state.index
    }
    return data;
}
    
    render(){
        let data=this.createData(this.state)
        let lang=locales.strings;
        return (
            <div className="container">
                <SecondaryHeader HeadingName={lang.snap}/>
                <div className="blockUnderline"></div>
                <ErrorMessage errors={this.state.errorMessages}/>
                <p className="required">* Indicates a required field</p>
                <div style={{paddingBottom: '2%'}}>
                    <p> {lang.heading}</p>
                </div>        
                <form ref='volunteer_form'  onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row addIncomeFormDivStyle">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.organizationName}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                                    <input name="organizationName" ref="organizationName" value={this.state.organizationName} type="text" title={lang.organizationName} maxLength="131" className="form-control" id="organizationName" onChange={this.organizationName.bind(this)} required/>
                                </div>
                        </div>
                        <div className="row addIncomeFormDivStyle">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.contactName}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
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
                                <div className="col-md-1 col-sm-5 col-xs-5  buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)} >    
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
    snapWorkPlanResponse: store.snap,
    pageDetails: store.pageDetailsReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        SnapWorkPlanInformation:SnapWorkPlanInformation
    };
}


export default connect(mapStateToProps,{SnapWorkPlanInformation,validateStreet1,validateCity,validateState,validateZipCode,validateZipCodeMandatory,validatePhoneNumber,validateAreaCode,validatePhoneNumberMandatory,validateAreaCodeMandatory,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(SnapWorkPlanPage);
