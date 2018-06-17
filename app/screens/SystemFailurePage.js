import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import {connect} from 'react-redux'
import * as locales from './SystemFailureProperties.js'
import SecondaryHeader from './components/SecondaryHeader'
import warningImage from '../assets/warning.png'
import {clearEvidence} from '../actions/evidenceAction'
import {submitEvidence} from '../actions/evidenceSubmitAction'
import {clearPageDetailsResponse} from '../actions/LoggingCommonActions'

class SystemFailurePage extends React.Component {
    componentDidMount(){
        this.props.clearEvidence() 
        this.props.clearPageDetailsResponse()   
}
    render() {
        let lang = locales.strings;
        return (
            <div className="container">
                <SecondaryHeader HeadingName= {lang.Title}/>
				<div className="blockUnderline summaryPageInfo1"></div>
                <div className='annualSummaryDiv'>
                 {/*    <div className='centerAlignStyle'>
                    <div className="row addIncomeFormDivStyle">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        </div>
                    </div>
        </div> */}
                <div className="row addIncomeFormDivStyle">
                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-3" >
                                <img src={warningImage} className="img-responsive-status" alt='systemProcessingFailure'/>
                                </div>
                                <div className="col-lg-11 col-md-11 col-sm-11 col-xs-9 systemfailureTextStyle">
                                <p> {lang.systemProcessingFailure} </p>
                                </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 systemFailureBodyText">
                                <p>{lang.errorMessage}</p>
                                <p>{lang.tryAgain}</p>
                            </div>
                        </div>
                    <small style={{ float: "right", fontWeight: "BOLD" }}></small>
                    <div className="centerAlignStyle">
                        <ButtonFunctionality ButtonName={lang.continue} redirectTo="ARWorksHomePage" dstClassName="btn button-text buttonBack1  overflow-visible" />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
    evidences:store.evidences,
    };
}

export default connect(mapStateToProps,{submitEvidence, clearEvidence, clearPageDetailsResponse})(SystemFailurePage);