import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import { connect } from 'react-redux'
import * as locales from './EmailRequiredPageProperties'
import warning from '../assets/warning.png';
import SecondaryHeader from './components/SecondaryHeader'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class EmailRequiredPage extends React.Component {
    constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Email RequiredPage page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Email RequiredPage page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    render() {
        let lang = locales.strings;
        return (
            <div className="container">
            <SecondaryHeader HeadingName={lang.infoRequired}/> 
                <div className='annualSummaryDiv'>
                   <div className='centerAlignStyle'>
                   <div className="row addIncomeFormDivStyle">
                   <div className="col-md-12 col-sm-12 col-xs-12">
                          </div>
                      </div>
                   </div> 
                   <div className="row addIncomeFormDivStyle">     
                                <div className="col-md-4 col-sm-4 col-xs-4">
                                <img src={warning} className="systemfailureImageStyle img-responsive" width='90' height='67' alt='systemProcessingFailure'/>
                                </div>
                                <div className="col-md-8 col-sm-8 col-xs-8 systemfailureTextStyle">
                                <p> {lang.emailRequired} </p>
                                </div>
                            </div>
                            <p className="systemFailureBodyText">{lang.emailMessage}</p>
                    <small style={{fontWeight: "BOLD" }}>{lang.emailNote}</small>
                    <div className="centerAlignStyle">
                        <ButtonFunctionality ButtonName={lang.continue} redirectTo="InformationPage" dstClassName="btn button-text buttonBack1  overflow-visible" />
                    </div>
                </div>
            </div>
        )
    }

}
function mapStateToProps (store) {
    return{
        
        pageDetails: store.pageDetailsReducer
    }
}
export default connect(mapStateToProps,{addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(EmailRequiredPage);
