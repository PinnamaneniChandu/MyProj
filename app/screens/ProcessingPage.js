import React from 'react'
import '../CSS/App-DesktopsScreen.css'
import {connect} from 'react-redux'
import { validateAddress } from '../actions/informationAction'
import HomeAddressValidation from './HomeAddressValidationPage.js'
import MailingAddressValidation from  './MailingAddressValidationPage.js'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
//import '../CSS/loading.css'
import moment from 'moment-es6';
class Processing extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Processing page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        this.state = {
            loading : true
        }
    }
    
    componentWillMount(){
        setTimeout(() => this.setState({ loading: false }), 1500); 
        let contactType, addressData, addressType, evidenceType, formattedAddress
        contactType = this.props.location.data.data.contactType
        if(contactType === 'ADDRESS'){
            addressData = this.props.location.data.data.addressData        
            evidenceType = addressData.evidenceType  
            addressType = addressData.addressType
            if(evidenceType === 'PDC0000261' && addressType === 'AT1' ){
                formattedAddress = this.formatAddress(addressData)
            }else if(evidenceType === 'PDC0000261' && addressType === 'AT4' ){
                formattedAddress = this.formatAddress(addressData)
            }   
        }
    
    }
    componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Processing page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString()) 
     }
     componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
      }
    formatAddress(enterAddress){
        let fAddress={};
        fAddress.evidenceType='PDC0000261'
        let evidenceDataList=[];
        let enterData=enterAddress
        for (var key in enterData) {
            let nameValue={
                name:'',
                value:''
            }
            nameValue.name=key
            nameValue.value=enterData[key]
            evidenceDataList.push(nameValue)
        }
            fAddress.evidenceDataList = evidenceDataList
            this.props.validateAddress(fAddress)
    }

    render(){
        let HomeAddressDisplay, suggestedAddress
        const { loading } = this.state
        if(loading) {
            HomeAddressDisplay = <div><h4>Processing your request....</h4></div>
            return HomeAddressDisplay
        }else if(this.props.responsevalidateAddress.validateAddress !== '' && this.props.responsevalidateAddress.validateAddress !== null && this.props.responsevalidateAddress.validateAddress !== undefined){
            let personListAndAddress = {
                addressData: this.props.location.data.data.addressData,
                personList: this.props.seletedpersonList.selectedPersonList,
                contactType: 'ADDRESS'
            }
            suggestedAddress = this.props.responsevalidateAddress.validateAddress
            if(this.props.location.data.data.addressData.addressType === 'AT1') {
                HomeAddressDisplay = <HomeAddressValidation suggestedAddress={suggestedAddress} enteredAddress={personListAndAddress} userName = {this.props.userName}/>
            }else if(this.props.location.data.data.addressData.addressType === 'AT4') {
                HomeAddressDisplay = <MailingAddressValidation suggestedAddress={suggestedAddress} enteredAddress={personListAndAddress} userName = {this.props.userName}/>
            }
        }else{
            HomeAddressDisplay = <div><h4>Processing your request....</h4></div>
        }
        return(
            <div>
            {HomeAddressDisplay}
            </div>
        )
    }
}
function mapStateToProps(store) {
    return{
        responsevalidateAddress : store.validateAddress,
        seletedpersonList : store.montlySummaryData,
        pageDetails: store.pageDetailsReducer
    }
}
export default connect(mapStateToProps, {validateAddress,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(Processing)