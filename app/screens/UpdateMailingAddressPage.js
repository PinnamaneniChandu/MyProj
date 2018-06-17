import React from 'react'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import SecondaryHeader from './components/SecondaryHeader'
import UpdateAddressComponent from '././components/UpdateAddressComponent'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { connect } from 'react-redux'
import { fetchContact } from '../actions/informationAction'
import  * as locales from './UpdateMailingAddressProperties'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class UpdateMailingAddress extends React.Component{
  constructor(props){
    super(props);
    var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setRequestTime(reqeustTime)
    var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
    this.props.setStartSessionTime(startSessionTime)
    this.state = {
      AddressData:'',
    }
    //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Mailing Address Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
  }
  componentWillUnmount(){
    let pageEndTime =moment();
    var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
    var PageTimeEnd = duration.asSeconds();  
    this.props.setSessionTime(PageTimeEnd)
    this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Mailing Address Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
  }
  componentDidMount(){
    var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setResponseTime(responseTime)
 }
  AddressMyData(addressDetails){
    addressDetails.addressType=this.props.location.data.data.addressData.addressType;
    addressDetails.evidenceType=this.props.location.data.data.addressData.evidenceType;
    this.setState({AddressData:addressDetails});
  }
  handleSubmit(event){
    if (this.state.AddressData !== ''){
      event.preventDefault();
      
    }
  }
  render(){
    let lang=locales.strings, mailingAddress
    let personListAndAddress = {
      addressData: this.state.AddressData,
      personList: this.props.location.data.data.members,
      contactType: 'ADDRESS'
    }
    return(
      <div className="container">
	    <SecondaryHeader HeadingName={lang.headingLabel} homeLink = "No"/>
        <div className="blockUnderline"></div>
        <UpdateAddressComponent AddressComponentValues={this.AddressMyData.bind(this)} addressData={this.props.location.data.data.addressData} membersList = {this.props.location.data.data.members}/>
	    <div style={{marginBottom: "20px"}}></div>
      </div>
    )
  }
}
function mapStateToProps (store) {
  return{
    contact : store.contact,
    pageDetails: store.pageDetailsReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContact:fetchContact
  };
}
export default connect(mapStateToProps, {fetchContact,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(UpdateMailingAddress);
