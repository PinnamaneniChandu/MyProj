import React from 'react'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import SecondaryHeader from './components/SecondaryHeader'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import AddressComponent from './components/AddressComponent'
import { connect } from 'react-redux'
import { fetchContact } from '../actions/informationAction'
import  * as locales from './HomeAddressProperties'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class HomeAddress extends React.Component{
  constructor(props)
  {
    super(props);
    var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setRequestTime(reqeustTime)
    var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
    this.props.setStartSessionTime(startSessionTime)
    //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Home Address Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
    this.state={
      AddressData:'',
    }
  }
  componentWillUnmount(){
    let pageEndTime =moment();
    var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
    var PageTimeEnd = duration.asSeconds();  
    this.props.setSessionTime(PageTimeEnd)
    this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Home Address Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString()) 
 }
 componentDidMount(){
  var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
  this.props.setResponseTime(responseTime)
}
  componentWillMount(){
  }
  handleSubmit(event) {
    if (this.state.AddressData !== '') {
        event.preventDefault();
    }
}
AddressMyData(addressDetails){
  addressDetails.addressType=this.props.location.data.data.addressData.addressType
  addressDetails.evidenceType=this.props.location.data.data.addressData.evidenceType;
  this.setState({AddressData:addressDetails});
}
  render(){
    let lang=locales.strings;
    let personListAndAddress = {
      addressData: this.state.AddressData,
      personList: this.props.location.data.data.members,
      contactType: 'ADDRESS'
    }
    return(
      <div className="container">
        <SecondaryHeader HeadingName={lang.headingLabel} homeLink = "No"/>
        <div className="blockUnderline"></div>
        <AddressComponent AddressComponentValues={this.AddressMyData.bind(this)} addressData={this.props.location.data.data.addressData}/>
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
export default connect(mapStateToProps, {fetchContact,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(HomeAddress)
