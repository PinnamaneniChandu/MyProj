import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import BottomComponent from './components/ExemptionsWorkActivities/BottomComponent'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import heroImage from '../assets/hero.jpg'
import TopComponent from './components/ExemptionsWorkActivities/TopComponent'
import AnchorFunctionality from '../ClickFunc/AnchorFunctionality'
import  * as locales from './ARWorksHomePageProperties'
import SecondaryHeader from './components/SecondaryHeader'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import {connect} from 'react-redux'
import moment from 'moment-es6'
import ErrorMessage from './components/ErrorMessage'


class ExemptionsWorkAactivitiesPage extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Exemptions Work Activities Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        this.state ={
            errorMessages:[]
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Exemptions Work Activities Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }  
      
    topErrorMessage(errMessage){
        this.setState({errorMessages:errMessage})
    }
    BottomErrorMessage(errMessage){
        this.setState({errorMessages:errMessage})
    }
    render(){
        let lang=locales.strings
        let headingName = lang.welcome +','+ ' ' +this.props.userName
        return(
            <div className="container">
                <SecondaryHeader HeadingName={headingName} headerStyleType = 'MainHeading' />
                <ErrorMessage errors={this.state.errorMessages}/>
                <div  className="requireWork">
                    <TopComponent isPendingApp={this.props.isPendingApp} ErrorMessageTop={this.topErrorMessage.bind(this)}/>
                    <div className="row addIncomeFormDivStyle"></div>
                    <BottomComponent isPendingApp={this.props.isPendingApp} ErrorMessageBottom={this.BottomErrorMessage.bind(this)}/>
                    <div className="wrapper ">
					{/* <button type="button" className="btn btn-lg buttonBack" id="1001">Back</button> {/* onClick={this.buttonCompo.bind(this)}*/}
				    <ButtonFunctionality ButtonName="Back" redirectTo="MonthlySummaryPage"  dstClassName="btn btn-lg buttonBack1"/>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
    pageDetails: store.pageDetailsReducer
    };
}

export default connect(mapStateToProps, {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(ExemptionsWorkAactivitiesPage)

/*btn-primary center-block custom */