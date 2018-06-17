import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import moment from 'moment-es6';
import { connect } from 'react-redux'
import { fetchARWorksHome } from '../actions/ARworksHomePageAction.js'
import heroImage from '../assets/hero.jpg'
import { getARWorksSummary, getSummaryList, searchValueForName, getPreviousSummary, getCurrentSummary, convertMonthNameToMonthNumber} from '../actions/CommonActions'
import {clearResponse} from '../actions/evidenceSubmitAction.js'
import  * as locales from './ARWorksHomePageProperties'
import AnchorFunctionality from '../ClickFunc/AnchorFunctionality'
import ReactTooltip from 'react-tooltip'
import SecondaryHeader from './components/SecondaryHeader'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class ARWorksHomePage extends React.Component {
  constructor(props){
    super(props);
    var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setRequestTime(reqeustTime)
    var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
    this.props.setStartSessionTime(startSessionTime)
    const ButtonName = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    this.state = {
      ButtonName
    }
    //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Summary Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
    props.clearResponse()
  }
  componentWillMount(){
    this.props.fetchARWorksHome()
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
    this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Summary Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
  }
  render () {
    let isDisable = [true, true, true, true, true, true, true, true, true, true, true, true]
    let ButtonColor = ['grey', 'grey','grey', 'grey','grey', 'grey','grey', 'grey','grey', 'grey','grey', 'grey']
    let lang=locales.strings,
        prevMonthFirstDay = moment(this.props.serverDate).subtract(1, 'months').startOf('month').format('L'),
        currentMonthfifthDay = moment(this.props.serverDate).startOf('month').add('days', 4).format('L'),
        currentMonthFirstDay = moment(this.props.serverDate).startOf('month').format('L'),
        nextMonthfifthDay = moment(this.props.serverDate).add(1, 'months').startOf('month').add('days', 4).format('L')
    var previousMonth = moment(this.props.serverDate).subtract(1, "month").format('MMMM'), 
        presentMonth = moment(this.props.serverDate).format('MMMM'),
        currentDate =  moment(this.props.serverDate).toObject().date,
        currentYear =  moment(this.props.serverDate).toObject().years   
    let buttonName = presentMonth + ' ' + currentYear
    //let prevMonthButtonName = previousMonth + ' ' + currentYear  

    let prevMonthButtonName
    if(presentMonth === 'January'){
    prevMonthButtonName = previousMonth + ' ' + (currentYear - 1) 
    }else {
    prevMonthButtonName = previousMonth + ' ' + currentYear 
    }


    let presentMonthNumberFormat = moment(this.props.serverDate).month(presentMonth).format("M") - 1;
    let previousMonthNumberFormat = moment(this.props.serverDate).month(previousMonth).format("M") - 1;
    let commonDataList = this.props.ARWorksSummary.ARWorksSummary.commondatadtls.commonDataList, interimPeriodValue, compliantValue, exemptValue, nonCompliantValue
    let ExemptData, NSW, IIP, IAP, IRP, IAAP, RTW, COMP, NCM, NCM1, NCM2, NCM3
    let ARWorksEvidenceDataList = this.props.getSummaryList(this.props.ARWorksSummary.ARWorksSummary)
    let previousSummary =  this.props.getPreviousSummary(ARWorksEvidenceDataList)
    let currentSummary =  this.props.getCurrentSummary(ARWorksEvidenceDataList)
    let ARWorksStatusDetails
    let display1Required, display2Required, display3Required, display1Value, display2Value, display3Value

    let monthSummaryCurrDate = {
      //currentMonthButtonName: buttonName,
      // prevMonthButtonName: prevMonthButtonName,
      month: presentMonthNumberFormat,
      // previousMonthNumberFormat: previousMonthNumberFormat
    }
    let montlySummaryPrevDate = {
      //prevMonthButtonName: prevMonthButtonName,
      month: previousMonthNumberFormat
    }
    let yearAndMonth = {
      currentYYYYcurrentMM: currentYear +''+ moment(this.props.serverDate).month(presentMonth).format("MM"),
      currentYYYYpreviousMM: currentYear +''+moment(this.props.serverDate).month(previousMonth).format("MM"),
      previousYYYYpreviousMM: currentYear - 1 +''+moment(this.props.serverDate).month(previousMonth).format("MM")
    }

    let previousMonthDisplay;
        if(currentDate <= 5){
          commonDataList.map((commDetails) => {
            if(commDetails.name === 'interimPeriodCount'){
              interimPeriodValue = commDetails.value
            }if(commDetails.name === 'complaintCount'){
              compliantValue = commDetails.value
            }if(commDetails.name === 'exemptCount'){
              exemptValue = commDetails.value
            }if(commDetails.name === 'nonComplaintCount'){
              nonCompliantValue = commDetails.value
            }
          })
        ARWorksStatusDetails  = {
            display1Required : this.props.searchValueForName(previousSummary, 'display1Required'),
            display2Required : this.props.searchValueForName(previousSummary, 'display2Required'),
            display3Required : this.props.searchValueForName(previousSummary, 'display3Required'),
            display1Value : this.props.searchValueForName(previousSummary, 'display1Value'),
            display2Value : this.props.searchValueForName(previousSummary, 'display2Value'),
            display3Value : this.props.searchValueForName(previousSummary, 'display3Value'),
          }
          if(ARWorksStatusDetails.display1Required === 'true'){
            if(ARWorksStatusDetails.display1Value === 'EXMT'){
              if(ARWorksStatusDetails.display2Value === 'EXAIAN'){
                ARWorksStatusDetails.display2Value = lang.EXAIAN
              }if(ARWorksStatusDetails.display2Value === 'TEACASHEX'){
                ARWorksStatusDetails.display2Value = lang.TEACASHEX
              }if(ARWorksStatusDetails.display2Value === 'EXEC'){
                ARWorksStatusDetails.display2Value = lang.EXEC
              }if(ARWorksStatusDetails.display2Value === 'EXSNAP'){
                ARWorksStatusDetails.display2Value = lang.EXSNAP
              }if(ARWorksStatusDetails.display2Value === 'EXFS'){
                ARWorksStatusDetails.display2Value = lang.EXFS
              }if(ARWorksStatusDetails.display2Value === 'EXMF'){
                ARWorksStatusDetails.display2Value = lang.EXMF
              }if(ARWorksStatusDetails.display2Value === 'EXDM'){
                ARWorksStatusDetails.display2Value = lang.EXDM
              }if(ARWorksStatusDetails.display2Value === 'EXEH'){
                ARWorksStatusDetails.display2Value = lang.EXEH
              }if(ARWorksStatusDetails.display2Value === 'EXPR'){
                ARWorksStatusDetails.display2Value = lang.EXPR
              }if(ARWorksStatusDetails.display2Value === 'EXUN'){
                ARWorksStatusDetails.display2Value = lang.EXUN
              }if(ARWorksStatusDetails.display2Value === 'EXED'){
                ARWorksStatusDetails.display2Value = lang.EXED
              }if(ARWorksStatusDetails.display2Value === 'EXIC'){
                ARWorksStatusDetails.display2Value = lang.EXIC
              }if(ARWorksStatusDetails.display2Value === 'EXIS'){
                ARWorksStatusDetails.display2Value = lang.EXIS
              }if(ARWorksStatusDetails.display2Value === 'EXAL'){
                ARWorksStatusDetails.display2Value = lang.EXAL
              }
              previousMonthDisplay = <div>
                    <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                        <p>{lang.status}: {lang.EXMT}</p>
                        <p>{lang.exemption} {ARWorksStatusDetails.display2Value}</p>
                        <p>{lang.ememptPeriod} {ARWorksStatusDetails.display3Value}</p>
                        <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                    </div>
            } else if(ARWorksStatusDetails.display1Value === 'NSW'){
              previousMonthDisplay = <div>
                        <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                        <p>{lang.status}: {lang.NSW}</p>
                        <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                    </div>
            } else if(ARWorksStatusDetails.display1Value === 'IIP'){
              previousMonthDisplay = <div>
                      <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.IIP}</p>
                      <p>{ARWorksStatusDetails.display2Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }else if(ARWorksStatusDetails.display1Value === 'IAP'){
              previousMonthDisplay = <div>
                      <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.IAP}</p>
                      <p>{ARWorksStatusDetails.display2Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }else if(ARWorksStatusDetails.display1Value === 'IRP'){
              previousMonthDisplay = <div>
              <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.IRP}</p>
                      <p>{ARWorksStatusDetails.display2Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }else if(ARWorksStatusDetails.display1Value === 'IAAP'){
              previousMonthDisplay = <div>
                      <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.IAAP}</p>
                      <p>{ARWorksStatusDetails.display2Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }else if(ARWorksStatusDetails.display1Value === 'RTW'){
              previousMonthDisplay = <div>
                      <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.RTW}</p>
                      <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                      <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }else if(ARWorksStatusDetails.display1Value === 'COMP'){
              previousMonthDisplay = <div>
                      <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.COMP}</p>
                      <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                      <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }else if(ARWorksStatusDetails.display1Value === 'NCM'){
              previousMonthDisplay = <div>
                      <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.NCM}</p>
                      <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                      <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }else if(ARWorksStatusDetails.display1Value === 'NCM1'){
              previousMonthDisplay = <div>
                      <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.NCM1}</p>
                      <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                      <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }else if(ARWorksStatusDetails.display1Value === 'NCM2'){
                previousMonthDisplay = <div>
                      <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.NCM2}</p>
                      <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                      <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }else if(ARWorksStatusDetails.display1Value === 'NCM3'){
              previousMonthDisplay = <div>
                      <ButtonFunctionality ButtonName= {prevMonthButtonName} redirectTo="MonthlySummaryPage" displayText= {prevMonthButtonName} dstClassName='btn btn-md buttonBack1' evidenceDate={montlySummaryPrevDate} yearAndMonthInfo = {yearAndMonth}/>
                      <p>{lang.status}: {lang.NCM3}</p>
                      <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                      <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                      <p>{previousMonth} {lang.reprtperd}: {prevMonthFirstDay} - {currentMonthfifthDay}</p>
                  </div>
            }
          }
    }
    if(currentYear !== 2017){
      var nonStringMonthName = this.state.ButtonName.toString();
      var currentMonthForComparsion = presentMonth.substr(0,3)
            for(var i = 0; i < this.state.ButtonName.length; i++ ){
                if(currentMonthForComparsion === this.state.ButtonName[i] ){
                  for( var j = i; j <= this.state.ButtonName.length; j++){
                    if(this.state.ButtonName[i] === this.state.ButtonName[j]){
                      if(currentDate <= 5){
                        for(var z = j-1; z < this.state.ButtonName.length; z++){
                          isDisable[z] = false
                        }
                      }else{
                        for(var z = j; z < this.state.ButtonName.length; z++){
                          isDisable[z] = false
                        }
                      }
                    }
                  }
                }
            }
        }else{
          for(var i = 0; i < this.state.ButtonName.length; i++){
            isDisable[i] = false
          }
        }
  commonDataList.map((commDetails) => {
    if(commDetails.name === 'interimPeriodCount'){
      interimPeriodValue = commDetails.value
    }if(commDetails.name === 'complaintCount'){
      compliantValue = commDetails.value
    }if(commDetails.name === 'exemptCount'){
      exemptValue = commDetails.value
    }if(commDetails.name === 'nonComplaintCount'){
      nonCompliantValue = commDetails.value
    }
  })


    let reportingMonthDisplay = ''
    ARWorksStatusDetails  = {
      display1Required : this.props.searchValueForName(currentSummary, 'display1Required'),
      display2Required : this.props.searchValueForName(currentSummary, 'display2Required'),
      display3Required : this.props.searchValueForName(currentSummary, 'display3Required'),
      display1Value : this.props.searchValueForName(currentSummary, 'display1Value'),
      display2Value : this.props.searchValueForName(currentSummary, 'display2Value'),
      display3Value : this.props.searchValueForName(currentSummary, 'display3Value'),
    }

    if(ARWorksStatusDetails.display1Required !== undefined){
    if(ARWorksStatusDetails.display1Required === 'true'){
      if(ARWorksStatusDetails.display1Value === 'EXMT'){
        if(ARWorksStatusDetails.display2Value === 'EXAIAN'){
          ARWorksStatusDetails.display2Value = lang.EXAIAN
        }if(ARWorksStatusDetails.display2Value === 'TEACASHEX'){
          ARWorksStatusDetails.display2Value = lang.TEACASHEX
        }if(ARWorksStatusDetails.display2Value === 'EXEC'){
          ARWorksStatusDetails.display2Value = lang.EXEC
        }if(ARWorksStatusDetails.display2Value === 'EXSNAP'){
          ARWorksStatusDetails.display2Value = lang.EXSNAP
        }if(ARWorksStatusDetails.display2Value === 'EXFS'){
          ARWorksStatusDetails.display2Value = lang.EXFS
        }if(ARWorksStatusDetails.display2Value === 'EXMF'){
          ARWorksStatusDetails.display2Value = lang.EXMF
        }if(ARWorksStatusDetails.display2Value === 'EXDM'){
          ARWorksStatusDetails.display2Value = lang.EXDM
        }if(ARWorksStatusDetails.display2Value === 'EXEH'){
          ARWorksStatusDetails.display2Value = lang.EXEH
        }if(ARWorksStatusDetails.display2Value === 'EXPR'){
          ARWorksStatusDetails.display2Value = lang.EXPR
        }if(ARWorksStatusDetails.display2Value === 'EXUN'){
          ARWorksStatusDetails.display2Value = lang.EXUN
        }if(ARWorksStatusDetails.display2Value === 'EXED'){
          ARWorksStatusDetails.display2Value = lang.EXED
        }if(ARWorksStatusDetails.display2Value === 'EXIC'){
          ARWorksStatusDetails.display2Value = lang.EXIC
        }if(ARWorksStatusDetails.display2Value === 'EXIS'){
          ARWorksStatusDetails.display2Value = lang.EXIS
        }if(ARWorksStatusDetails.display2Value === 'EXAL'){
          ARWorksStatusDetails.display2Value = lang.EXAL
        }
        ExemptData = <div className='requireWork1'>
          <div className='summarypage-Border-for-current-reports'>
              <div className='summaryPage-div-content'>
                  <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                  <h5>{lang.selectmthbelow}</h5>
                  {previousMonthDisplay}
                  <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth} /> 
                  <div style={{paddingTop: '10px'}} >
                    <p>{lang.status}: {lang.EXMT}</p>
                    <p>{lang.exemption} {ARWorksStatusDetails.display2Value}</p>
                    <p>{lang.ememptPeriod} {ARWorksStatusDetails.display3Value}</p>
                    <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay} - {nextMonthfifthDay}</p>
                  </div>
              </div>
          </div>
        </div>
      } else if(ARWorksStatusDetails.display1Value === 'NSW'){
          NSW = <div className='requireWork1'>
          <div className='summarypage-Border-for-current-reports'>
              <div className='summaryPage-div-content'>
                  <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                  <h5>{lang.selectmthbelow}</h5>
                  {previousMonthDisplay}
                  <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth} />
                  <div style={{paddingTop: '10px'}} >
                    <p>{lang.status}: {lang.NSW}</p>
                    <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                  </div>
              </div>
          </div>
        </div>
      } else if(ARWorksStatusDetails.display1Value === 'IIP'){
        IIP = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.IIP}</p>
                  <p>{ARWorksStatusDetails.display2Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
        </div>
      </div>
      }else if(ARWorksStatusDetails.display1Value === 'IAP'){
        IAP = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.IAP}</p>
                  <p>{ARWorksStatusDetails.display2Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
        </div>
      </div>
      }else if(ARWorksStatusDetails.display1Value === 'IRP'){
        IRP = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.IRP}</p>
                  <p>{ARWorksStatusDetails.display2Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
        </div>
      </div>
      }else if(ARWorksStatusDetails.display1Value === 'IAAP'){
        IAAP = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.IAAP}</p>
                  <p>{ARWorksStatusDetails.display2Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
        </div>
      </div>
      }else if(ARWorksStatusDetails.display1Value === 'RTW'){
        RTW = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.RTW}</p>
                  <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                  <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
          </div>
        </div>
      }else if(ARWorksStatusDetails.display1Value === 'COMP'){
        COMP = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.COMP}</p>
                  <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                  <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
          </div>
        </div>
      }else if(ARWorksStatusDetails.display1Value === 'NCM'){
        NCM = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.NCM}</p>
                  <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                  <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
          </div>
        </div>
      }else if(ARWorksStatusDetails.display1Value === 'NCM1'){
        NCM1 = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.NCM1}</p>
                  <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                  <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
          </div>
        </div>
      }else if(ARWorksStatusDetails.display1Value === 'NCM2'){
        NCM2 = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.NCM2}</p>
                  <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                  <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
          </div>
        </div>
      }else if(ARWorksStatusDetails.display1Value === 'NCM3'){
        NCM3 = <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <div className='summaryPage-div-content'>
                <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
                <h5>{lang.selectmthbelow}</h5>
                {previousMonthDisplay}
                <ButtonFunctionality ButtonName= {buttonName} redirectTo="MonthlySummaryPage"  displayText= {buttonName} dstClassName='btn btn-md buttonBack1' evidenceDate={monthSummaryCurrDate} yearAndMonthInfo = {yearAndMonth}/>
                <div style={{paddingTop: '10px'}} >
                  <p>{lang.status}: {lang.NCM3}</p>
                  <p>{lang.counhrs}: {ARWorksStatusDetails.display2Value}</p>
                  <p>{lang.rmnhrs}: {ARWorksStatusDetails.display3Value}</p>
                  <p>{presentMonth} {lang.reprtperd}: {currentMonthFirstDay}- {nextMonthfifthDay}</p>
                </div>
            </div>
          </div>
        </div>
      }
    }

    }else if(ARWorksStatusDetails.display1Required === undefined || ARWorksStatusDetails.display1Required === 'noArWorks'){
      reportingMonthDisplay = <div className='requireWork1'>
      <div className='summarypage-Border-for-current-reports'>
          <div className='summaryPage-div-content'>
              <h3 className='summaryPage-firstheader'> {lang.currentReportPeriod}</h3>
              <h5>{lang.reporting_period_section}</h5>
          </div>
      </div>
    </div>
    }
    
    
let displayYear
if(currentYear === 2017){
  displayYear = 2018
}else {
  displayYear = currentYear
}
let headingName = lang.welcome +','+ ' ' +this.props.userName


/**
 * Implemented Code for getting Month Button Colors
 */ 
/**if(currentYear === 2017){*/
  let monthColor, colorData= [], monthNumber
  commonDataList.map((commDetails) => {
    if(commDetails.name === 'interimMonthButton'){
      monthColor = commDetails.value
      monthNumber = this.props.convertMonthNameToMonthNumber(monthColor)
      if(ButtonColor[monthNumber]){
          ButtonColor[monthNumber] = '#4358bc'
        }
    }if(commDetails.name === 'exemptMonthButton'){
      monthColor = commDetails.value
      monthNumber = this.props.convertMonthNameToMonthNumber(monthColor)
      if(ButtonColor[monthNumber]){
        ButtonColor[monthNumber] = '#ffff00'
      }
    }if(commDetails.name === 'compliantMonthButton'){
      monthColor = commDetails.value
      monthNumber = this.props.convertMonthNameToMonthNumber(monthColor)
      if(ButtonColor[monthNumber]){
        ButtonColor[monthNumber] = '#2e9216'
      }
    }if(commDetails.name === 'nonComplaintMonthButton'){
      monthColor = commDetails.value
      monthNumber = this.props.convertMonthNameToMonthNumber(monthColor)
      if(ButtonColor[monthNumber]){
        ButtonColor[monthNumber] = '#f45342'
      }
    }
  })
/**}*/

/** End  */

let summaryDisplay

if(ARWorksEvidenceDataList.length > 0){
  summaryDisplay = 
  <div>
  <SecondaryHeader HeadingName={headingName} headerStyleType = 'MainHeading' />
  {reportingMonthDisplay}
  {ExemptData}
  {NSW}
  {IIP} 
  {IAP} 
  {IRP} 
  {IAAP}
  {RTW}
  {COMP}
  {NCM}
  {NCM1}
  {NCM2}
  {NCM3}
  <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <h4 style={{textAlign: 'center'}}>{displayYear} {lang.annsumm}</h4>
            <div className='row'>
                <div className='col-md-6 col-sm-12 col-xs-12'>
                    <button className='btn btn-block responsive-width1' data-for='intrmprd' data-effect="solid" data-tip={lang.intrmprdtooltip} style={{margin: '2px', backgroundColor: '#4358bc'}}>{lang.intrmprd}: {interimPeriodValue} &nbsp; &nbsp; &nbsp;
                    <span className="glyphicon glyphicon-question-sign" ></span>
                    <ReactTooltip id='intrmprd'/>
                    </button>
                  </div>
                <div className='col-md-6  col-sm-12 col-xs-12'>
                    <button className='btn btn-block responsive-width1' data-for='complaint' data-effect="solid" data-tip={lang.complainttooltip} style={{margin: '2px', backgroundColor: '#2e9216'}}>{lang.complaint}: {compliantValue} &nbsp; &nbsp; &nbsp;
                    <span className="glyphicon glyphicon-question-sign" ></span>
                    <ReactTooltip id='complaint'/>
                    </button>
                  </div>
              </div>
            <div className='row'>
                <div className='col-md-6 col-sm-12 col-xs-12'>
                    <button className='btn btn-block responsive-width1' data-for='exempt' data-effect="solid" data-tip={lang.exempttooltip} style={{margin: '2px', backgroundColor: '#FFFF00'}}>{lang.exempt}: {exemptValue} &nbsp; &nbsp; &nbsp;
                    <span className="glyphicon glyphicon-question-sign" ></span>
                    <ReactTooltip id='exempt'/>
                    </button>
                  </div>
                <div className='col-md-6  col-sm-12 col-xs-12'>
                    <button className='btn btn-block responsive-width1' data-effect="solid" data-tip={lang.noncomplainttooltip} style={{margin: '2px', backgroundColor: '#f45342'}}>{lang.noncomplaint}: {nonCompliantValue} &nbsp; &nbsp; &nbsp;
                    <span className="glyphicon glyphicon-question-sign" ></span>
                    <ReactTooltip multiline={true} />
                    </button>
                  </div>
              </div>
          </div>
      </div>
  <div className='requireWork1'>
        <div className='summarypage-Border-for-current-reports'>
            <h4 style={{textAlign: 'center'}}>{displayYear} {lang.monsummary}</h4>
            <div className='row'>
                <div className='col-md-6 col-sm-12 col-xs-12'>
                    <div className='col-md-4 col-sm-4 col-xs-4'>
                        <ButtonFunctionality ButtonName= {this.state.ButtonName[0]} displayText= {'January'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[0]}  disabled = {!isDisable[0]} yearAndMonthInfo = '' />
                      </div>
                    <div className='col-md-4 col-sm-4 col-xs-4'>
                        <ButtonFunctionality ButtonName= {this.state.ButtonName[1]} displayText= {'Febuary'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[1]} disabled = {!isDisable[1]} yearAndMonthInfo = ''/>
                      </div>
                    <div className='col-md-4 col-sm-4 col-xs-4'>                              
                        <ButtonFunctionality ButtonName= {this.state.ButtonName[2]} displayText= {'March'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[2]} disabled = {!isDisable[2]} yearAndMonthInfo = ''/>
                      </div>
                  </div>
                <div className='col-md-6  col-sm-12 col-xs-12'>
                    <div className='col-md-4 col-sm-4 col-xs-4'>
                      <ButtonFunctionality ButtonName= {this.state.ButtonName[3]} displayText= {'April'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[3]} disabled = {!isDisable[3]} yearAndMonthInfo = ''/>
                    </div>
                    <div className='col-md-4 col-sm-4 col-xs-4'>
                      <ButtonFunctionality ButtonName= {this.state.ButtonName[4]} displayText= {'May'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[4]} disabled = {!isDisable[4]} yearAndMonthInfo = ''/>
                    </div>
                    <div className='col-md-4 col-sm-4 col-xs-4'>
                      <ButtonFunctionality ButtonName= {this.state.ButtonName[5]} displayText= {'June'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[5]} disabled = {!isDisable[5]} yearAndMonthInfo = ''/>
                    </div>
                  </div>
              </div>
            <div className='row'>
                <div className='col-md-6 col-sm-12 col-xs-12'>
                    <div className='col-md-4 col-sm-4 col-xs-4'>
                      <ButtonFunctionality ButtonName= {this.state.ButtonName[6]} displayText= {'July'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[6]} disabled = {!isDisable[6]} yearAndMonthInfo = ''/>
                        </div>
                          <div className='col-md-4 col-sm-4 col-xs-4'>
                            <ButtonFunctionality ButtonName= {this.state.ButtonName[7]} displayText= {'August'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[7]} disabled = {!isDisable[7]} yearAndMonthInfo = ''/>
                          </div>
                        <div className='col-md-4 col-sm-4 col-xs-4'>
                      <ButtonFunctionality ButtonName= {this.state.ButtonName[8]} displayText= {'September'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[8]} disabled = {!isDisable[8]} yearAndMonthInfo = ''/>
                    </div>
                </div>
                <div className='col-md-6  col-sm-12 col-xs-12'>
                  <div className='col-md-4 col-sm-4 col-xs-4'>
                    <ButtonFunctionality ButtonName= {this.state.ButtonName[9]} displayText= {'October'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[9]} disabled = {!isDisable[9]} yearAndMonthInfo = ''/>
                  </div>
                  <div className='col-md-4 col-sm-4 col-xs-4'>
                    <ButtonFunctionality ButtonName= {this.state.ButtonName[10]} displayText= {'November'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[10]} disabled = {!isDisable[10]} yearAndMonthInfo = ''/>
                  </div>
                  <div className='col-md-4 col-sm-4 col-xs-4'>
                    <ButtonFunctionality  ButtonName= {this.state.ButtonName[11]} displayText= {'December'+ ' ' +currentYear} redirectTo="MonthlySummaryPage" dstClassName='btn btn-block btn-md btn-sm btn-xs responsive-width-small custom-class'  color={ButtonColor[11]} disabled = {!isDisable[11]} yearAndMonthInfo = ''/>
                  </div>
                </div>
              </div>
          </div>
      </div>
  <div className='requireWork1'>
        <h4 style={{textAlign: 'center'}}>{lang.arworksinfo}</h4>
        <div className='wrapper'>
        <a href="https://ardhs.sharepointsite.net/ARWorks/default.aspx" target="_blank" className='btn btn-secoundary button-text buttonBack1'>Learn More About Arkansas Works</a> 
        </div>
        <h4 style={{textAlign: 'center'}}>{lang.help}</h4>
        <div className='wrapper'>
        <a href="https://www.dws.arkansas.gov/" target="_blank" className='btn btn-secoundary button-text buttonBack1'>Dept. of Workforce Services Information</a> 
        </div>
  </div>
  </div>
}
else{
  summaryDisplay = <div><h4>Processing your request....</h4></div>
}

    return (
      <div className='container'>
      {summaryDisplay}
      </div>
    )
  }
}
function mapStateToProps (store) {
  return{
    ARWorksSummary : store.ARWorksSummary,
    pageDetails: store.pageDetailsReducer
    
  }
}
export default connect(mapStateToProps, {fetchARWorksHome, getARWorksSummary, getSummaryList, searchValueForName, getPreviousSummary, getCurrentSummary,clearResponse, convertMonthNameToMonthNumber,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime })(ARWorksHomePage)