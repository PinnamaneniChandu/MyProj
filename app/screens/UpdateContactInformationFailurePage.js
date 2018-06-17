import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import {connect} from 'react-redux'
import * as locales from './SystemFailureProperties.js'
import SecondaryHeader from './components/SecondaryHeader'
import warningImage from '../assets/warning.png'


export default class UpdateContactInfoFailurePage extends React.Component {
    render() {
        let lang = locales.strings;
        return (
            <div className="container">
                <SecondaryHeader HeadingName= {lang.Title}/>
				<div className="blockUnderline summaryPageInfo1"></div>
                <div className='annualSummaryDiv'>
                <div className="row addIncomeFormDivStyle">
                                <div className="col-md-1 col-sm-4 col-xs-4" >
                                <img src={warningImage} className="systemfailureImageStyle img-responsive" alt='systemProcessingFailure'/>
                                </div>
                                <div className="col-md-11 col-sm-8 col-xs-8 systemfailureTextStyle">
                                <p> {lang.systemProcessingFailure} </p>
                                </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 systemFailureBodyText">
                                <p>{lang.errorMessage}</p>
                                <p>{lang.tryAgain}</p>
                            </div>
                        </div>
                    <small style={{ float: "right", fontWeight: "BOLD" }}></small>
                    <div className="centerAlignStyle">
                        <ButtonFunctionality ButtonName={lang.continue} redirectTo="UpdateContactInformationPage" dstClassName="btn button-text buttonBack1  overflow-visible" />
                    </div>
                </div>
            </div>
        )
    }
}
