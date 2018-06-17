import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import SecondaryHeader from './components/SecondaryHeader'
import  * as locales from './AddAnAdultPageProperties'
import {connect} from 'react-redux'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class AddAnAdultPage extends React.Component{
    constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
    
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Add An Adult page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Add An Adult page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    onMouseEnterHandler(event){ 
        var userLang = navigator.languages[1] || navigator.userLanguage;
        var jspcall=`../application.do`
        window.location=jspcall;        
    }
        
    render(){
        return(
            <div className="container">
            <SecondaryHeader HeadingName={locales.strings.heading} homeLink = 'No'/>
            <div className="blockUnderline"></div>
                <div className='annualSummaryDiv PaddingForAdultPage'>
                    <p>{locales.strings.AddAdultMessage1}</p><br />
                    
                    <p>{locales.strings.AddAdultMessage2}</p>
                    <ul>
                    <li><p>{locales.strings.AddAdultMessageYourself}</p></li>
                    <li><p>{locales.strings.AddAdultMessageEveryoneRecCoverage}</p></li>
                    <li><p>{locales.strings.AddAdultMessageTaxDependent}</p></li>
                    </ul>
                    <p>{locales.strings.AddAdultMessageRedirection}</p>
                    <div style={{marginBottom: 20}}></div>
                        <div className="row ">
                            <div className="col-md-2 col-sm-2 col-xs-4 addIncomeFormDivStyle">
                                    <ButtonFunctionality ButtonName={locales.strings.ButtonCancel} redirectTo="HouseHoldInformation" dstClassName="btn btn-lg-md btn-lg-sm btn-lg-xs buttonBack1 buttonBackAddAdult1"/>            
                            </div>   
                            <div className="col-md-10 col-sm-10 col-xs-8 buttonAlignRight">                                
                                    <button className="btn btn-lg-md btn-lg-sm btn-lg-xs buttonBack1 buttonBackAddAdult1" onClick={this.onMouseEnterHandler.bind(this)} >Continue to Application</button>
                            </div>     
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

export default connect(mapStateToProps, {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(AddAnAdultPage)