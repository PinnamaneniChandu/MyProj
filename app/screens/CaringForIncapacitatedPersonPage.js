
// CSS Stylings for All Devices
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import astrisk from '../assets/astrisk.png'
import React from 'react'
import ReactDOM from 'react-dom';
import SecondaryHeader from './components/SecondaryHeader'
import  * as locales from './CaringForIncapacitatedPersonProperties'
import PhoneNumberComponent from '././components/PhoneNumberComponent'
import EvidenceAddressComponent from './components/EvidenceAddressComponent.js'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { connect } from 'react-redux'
import { incapacitatedPersonInformation } from '../actions/incapacitatedPersonAction.js'
import ErrorMessage from './components/ErrorMessage'
import moment from 'moment-es6';
import {validateStreet1,validateCity,validateState,validateZipCode,validatePhoneNumber,validateAreaCode,validateZipCodeMandatory,validatePhoneNumberMandatory,validateAreaCodeMandatory} from '../actions/CommonValidationActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class IncapacitatedPerson extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Caring For Incapacitated Person Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
        this.state = {
            redirectTo:'MonthlySummaryPage',
            errorMessages:[],
            incapacitatedPersonName: props.location.data?props.location.data.data.incapacitatedPersonName:'',
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Caring For Incapacitated Person Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    AddressData(addressDetails){this.setState({AddressData: addressDetails})}
    PhoneData(phoneNumberDetails){ this.setState({PhoneData: phoneNumberDetails})}
    handleIncapacitated(){this.setState({incapacitatedPersonName: this.refs.incapacitatedPersonName.value})}
    handleSubmit(event){
        if(this.state.incapacitatedPersonName !== ''){
            event.preventDefault();
            return this.props.incapacitatedPersonInformation(this.state)
        }
    }
    onMouseEnterHandler(event){  
            let lang=locales.strings;
            let validationMsg = new Set();
            for (var key in this.state) {
                if(key==='incapacitatedPersonName' && this.state[key].trim()===''){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.NameOfPerson),secondMessage:lang.formatString(lang.IsMandatory)})   
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
                if(key==='AddressData' && this.props.validateZipCodeMandatory(this.state['AddressData'].zip)) {
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.ZipCode),secondMessage:lang.formatString(lang.IsMandatory)})} 
                    else if ( (key==='AddressData' && this.props.validateZipCode(this.state['AddressData'].zip))) {
                            validationMsg.add({key:key,firstMessage:lang.formatString(lang.InValidZipCode),secondMessage:lang.formatString(lang.FormatZipCode)})
                    }
                  
                
                if(key==='PhoneData' && ((this.props.validateAreaCode(this.state['PhoneData'].areaCode)) || (this.props.validatePhoneNumber(this.state['PhoneData'].phoneNumber)))){
                    if(!this.props.validateAreaCodeMandatory(this.state['PhoneData'].areaCode) || !this.props.validatePhoneNumberMandatory(this.state['PhoneData'].phoneNumber)){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.InValidPhoneNumber),secondMessage:lang.formatString(lang.FormatPhoneNumber)})
                 } 
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
                    redirectTo = 'IncapacitatedPerson'
                }
               
                this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
        }
            
    createData(evdData,lang){
        let data={
            evidenceName: lang.evidenceName,
            evidenceType:"EEFDET0017",
            street1: evdData.AddressData.street1,
            street2:evdData.AddressData.street2,
            city:evdData.AddressData.city,
            state:evdData.AddressData.state,
            zip:evdData.AddressData.zip,
            zipCodeExt:evdData.AddressData.zipCodeExt,
            areaCode: evdData.PhoneData.areaCode,
            phoneNumber:evdData.PhoneData.phoneNumber,
            incapacitatedPersonName: this.state.incapacitatedPersonName,
            index:this.state.index,
            displayLine1: lang.personCareFor +''+ this.state.incapacitatedPersonName,
            displayLine2: '',
            displayLine2SecondRow: '' ,
            displayLine4: ''
        }
        return data;
    }
    render() {
        let lang=locales.strings;
        let data=this.createData(this.state, lang)
        return (
            <div className="container">
                <SecondaryHeader HeadingName={lang.caring}/>
                <div className="blockUnderline"></div>
                <ErrorMessage errors={this.state.errorMessages}/>
                <p className="required">* Indicates a required field</p>
                <div style={{paddingBottom: '2%', marginTop: '4%'}}>
                    <p>{lang.aboutPerson}</p>                    
                </div>
                
                    <form ref='incapacitatedPerson_form'  onSubmit={this.handleSubmit.bind(this)} >                    
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label className = "Labels">{lang.nameOfPerson}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <input name="incapacitatedPersonName" ref="incapacitatedPersonName" value={this.state.incapacitatedPersonName} type="text" title={lang.nameOfPerson} maxLength="131" className="form-control" id="incapacitatedPersonName" onChange={this.handleIncapacitated.bind(this)} required/>
                            </div>
                        </div>
                        <EvidenceAddressComponent EvidenceAddressComponentValues={this.AddressData.bind(this)} addressData={this.state.AddressData}/>
                        <PhoneNumberComponent PhoneNumberComponentValues={this.PhoneData.bind(this)} isMandatory={"No"} PhoneData={this.state.PhoneData}/>
                        <div style={{marginBottom: 20}}></div>
                            <div className="row addIncomeFormDivStyle">
                                <div className="col-md-11 col-sm-7 col-xs-7">
                                    <ButtonFunctionality ButtonName={lang.cancel} redirectTo="AddExemptionWorkActivity" dstClassName="btn buttonBack1"/>            
                                </div>  
                                <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)} >     
                                    <ButtonFunctionality ButtonName={lang.save} disabled={this.state.disabled} redirectTo={this.state.redirectTo} dstClassName="btn buttonBack1 marginLeftForButtons" data={data}></ButtonFunctionality>
                                </div>      
                            </div>
                    </form>
                </div>
        );
    }
}
function mapStateToProps(store) {
    return {
        incapacitatedResponse: store.incapacitated,
        pageDetails: store.pageDetailsReducer

    };
}

function mapDispatchToProps(dispatch) {
    return {
        incapacitatedPersonInformation:incapacitatedPersonInformation
    };
}

export default connect(mapStateToProps,{incapacitatedPersonInformation,validateStreet1,validateCity,validateState,validateZipCode,validateZipCodeMandatory,validatePhoneNumber,validateAreaCode,validatePhoneNumberMandatory,validateAreaCodeMandatory,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(IncapacitatedPerson);