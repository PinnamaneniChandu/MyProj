import React from 'react'
import '../CSS/App-DesktopsScreen.css'
import SecondaryHeader from './components/SecondaryHeader'
import AddressValidationComponent from './components/AddressValidationComponent'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import {connect} from 'react-redux'
import { validateAddress } from '../actions/informationAction'
import { searchValueForName } from '../actions/CommonActions'
import { getInfoInList,getAddressInList} from '../actions/CommonActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';

class HomeAddressValidation extends React.Component{

constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        
    //    this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Home Address Validation page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Home Address Validation page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
componentWillMount(){        
    
}
render(){
    let commonDetails = this.props.suggestedAddress.commondatadtls, hasValue, suggestedAddressRender
    commonDetails.commonDataList.map((checkStatus) => {
        if(checkStatus.name === 'hasSuggestedAddrInd'){
            hasValue = checkStatus.value
        }
    })

    if(hasValue === 'true'){
        let suggestedAddress=this.props.getAddressInList(this.props.suggestedAddress,'PDC0000261')
        if(this.props.searchValueForName(suggestedAddress,'ADD2') !== '' && this.props.searchValueForName(suggestedAddress,'CITY') !== '' && this.props.searchValueForName(suggestedAddress,'USCOUNTY') !== '' 
            && this.props.searchValueForName(suggestedAddress,'STATE')!== '' && this.props.searchValueForName(suggestedAddress,'ZIP') !== ''){
                suggestedAddressRender= {
                    data:{
                        ADD2: this.props.searchValueForName(suggestedAddress,'ADD2') , 
                        ADD3: this.props.searchValueForName(suggestedAddress,'ADD3') ,
                        CITY: this.props.searchValueForName(suggestedAddress,'CITY') , 
                        USCOUNTY: this.props.searchValueForName(suggestedAddress,'USCOUNTY') , 
                        STATE: this.props.searchValueForName(suggestedAddress,'STATE'), 
                        ZIP: this.props.searchValueForName(suggestedAddress,'ZIP'), 
                        addressType: this.props.enteredAddress.addressData.addressType,
                        evidenceType: this.props.enteredAddress.addressData.evidenceType
                        }    
                    } 
            }else{
                suggestedAddressRender= {
                    data:''    
                    }
                hasValue = false    
            }
    } else {
        suggestedAddressRender= {
        data:''    
        }
    }
    return(
        <div className="container">
            <SecondaryHeader HeadingName="Home address validation" homeLink = "No"/>
            <div className="blockUnderline"></div>
			<p style={{ fontWeight: "bold", paddingBottom: "1pc"}}>Our sources suggest that your address may not be correct. Please follow the directions below.</p>
			<AddressValidationComponent displayText="Entered Home Address:" data={this.props.enteredAddress.addressData} members={this.props.enteredAddress.personList} contactType= {this.props.enteredAddress.contactType}/>
			<AddressValidationComponent displayText="Suggested Home Address:" data={suggestedAddressRender.data} members={this.props.enteredAddress.personList} contactType= {this.props.enteredAddress.contactType} checkValue = {hasValue}/>
			<div style={{marginBottom: 20}}></div>               
			<div className="centerAlignStyle">
				<ButtonFunctionality ButtonName="Edit entered address" redirectTo="HomeAddress" dstClassName="btn btn-secoundary button-text buttonBack1" data={this.props.enteredAddress}/>
			</div>
        </div>  
        )
    }
}
function mapStateToProps (store) {
    return{
        validateAddressState : store.validateAddress,
        pageDetails: store.pageDetailsReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        validateAddress:validateAddress,
    }
}
export default connect(mapStateToProps, {validateAddress, searchValueForName, getInfoInList,getAddressInList,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(HomeAddressValidation)