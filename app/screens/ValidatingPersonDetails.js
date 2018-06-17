import React from 'react'
import '../CSS/App-DesktopsScreen.css'
import { connect } from 'react-redux'
import { formatPerson,applyPersonMatch,formatPersonMatchData,clearPersonMatchData } from '../actions/addAChildAction'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import moment from 'moment-es6';
import SecondaryHeader from './components/SecondaryHeader'
import warningImage from '../assets/warning.png'
import  * as locales from './RemoveContactInfoErrorPageProperties'
import HHInformation from './HouseHoldInformationPage'

class ValidatingPersonDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }
        this.props.clearPersonMatchData();
        let addPerson = this.props.formatPerson(this.props.location.data.data)

        this.props.applyPersonMatch(addPerson);  
    }
    componentWillMount() {
        setTimeout(() => this.setState({ loading: false }), 10000);
 
    }
    render(){
        let lang=locales.strings;
        const { loading } = this.state
        let ButtonDisplay
        if(this.props.personMatch.personMatch === undefined) {
            ButtonDisplay = <div><h4>Processing your request....</h4></div>
          } else {
            let  result = this.props.formatPersonMatchData(this.props.personMatch.personMatch)  
            if(result === 'Yes'){
                ButtonDisplay =  <div className="container">
                <SecondaryHeader HeadingName={lang.Heading} homeLink = 'No'/>
				<div className="blockUnderline" style={{marginBottom: '2pc'}}></div>
                <div className='annualSummaryDiv'>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-1 col-sm-4 col-xs-4">              
                                <img src={warningImage} className="systemfailureImageStyle img-responsive" alt='systemProcessingFailure'/>
                            </div>
                            <div className="col-md-11 col-sm-8 col-xs-8 systemfailureTextStyle" >
                                <p>Child already exists in the household. Report any changes to your local DHS office.</p>
                            </div>
                        </div>                          
                        <div className="centerAlignStyle" style={{paddingTop: '2px'}}>
                            <ButtonFunctionality ButtonName= "OK" redirectTo="HouseHoldInformation" dstClassName="btn btn-lg-md btn-lg-sm btn-lg-xs buttonBack1" />
                        </div>          
                    </div>        
            </div>
               }  
               else{
                ButtonDisplay = <HHInformation newPerson={this.props.location.data.data}/>
               }         
          }

        return(
            <div>
            {ButtonDisplay}
            </div>
        )
    }
}
function mapStateToProps(store) {
    return {
        personMatch: store.personMatch
    };
}
export default connect(mapStateToProps, { formatPerson, applyPersonMatch,formatPersonMatchData,clearPersonMatchData })(ValidatingPersonDetails);