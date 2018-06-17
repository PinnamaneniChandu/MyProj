import React from 'react';
import '../../CSS/App.css';
import '../../CSS/App-DesktopsScreen.css'
import '../../CSS/App-extraSmallScreen.css'
import '../../CSS/App-mediumScreen.css'
import '../../CSS/App-smallScreen.css'
import heroImage from '../../assets/hero.jpg';
import AnchorFunctionality from '../../ClickFunc/AnchorFunctionality.js'
import * as locales from '../ARWorksHomePageProperties.js'
import $ from 'jquery'
import { connect } from 'react-redux'
import unsubmitted from '../UnsubmittedInformationPage.js'

export default class UpdateInfoSecondaryHeader extends React.Component {
    constructor( props ) {
        super( props );
        this.state= {
            sessionTime:''
        }
        history.pushState( null, null, location.href );
        window.onpopstate = function ( event ) {
            history.go( 1 );
        };

        function disableF5( e ) {
            console.log( "Disabled Reload" )
            if ( ( e.which || e.keyCode ) == 116 ) e.preventDefault();
        };
        $( document ).on( "keydown", disableF5 );

    }

    /* componentWillMount() {
        var cookies = document.cookie
        var x = cookies.split( ';' )
        var sessionTimeout
        for ( var key in x ) {
            if ( x[ key ].includes( 'sessionExpiry' ) ) {
                sessionTimeout = x[ key ].split( '=' )[ 1 ]
            }
        }
        var numbers = sessionTimeout.split( '-' )
        var n1 = numbers[ 0 ]
        var n2 = numbers[ 1 ]
        sessionTimeout = n1-n2
        //sessionTimeout = 80000
        this.setState({sessionTime:sessionTimeout})
        var idleTime = sessionTimeout - 60000

        var idleInterval = setInterval( timerIncrement, idleTime);

        function timerIncrement() {            
            var pmodal = document.getElementById('sessionLogoutModal');
            var logoutModal = document.getElementById('logoutModal');
            
            var btn = document.getElementById("myBtn");
            
            var span = document.getElementsByClassName("sessionClose")[0];
    
            var stay = document.getElementsByClassName("sessionStay")[0];
    
            var Leave = document.getElementById("sessionLeave");
    
            console.log("Modal Clicked")
            pmodal.style.display = "block";
            
            span.onclick = function() {
                console.log("span Clicked")
                pmodal.style.display = "none";
                logoutModal.style.display = "none";
                clearInterval(idleInterval)
                setInterval( timerIncrement, idleTime);
            }
    
            stay.onclick = function() {
                console.log("stay Clicked")
                pmodal.style.display = "none";
                logoutModal.style.display = "none";
                clearInterval(idleInterval)
                setInterval( timerIncrement, idleTime);
            }
    
            Leave.onclick = function(){
                var jspcall = `../EEFSSOLogoutWrapperPage.do`
                window.location = jspcall;
            }
            

        var timeoutID;
        
        function setup() {
            window.addEventListener("mousemove", resetTimer, false);
            window.addEventListener("mousedown", resetTimer, false);
            window.addEventListener("keypress", resetTimer, false);
            window.addEventListener("DOMMouseScroll", resetTimer, false);
            window.addEventListener("mousewheel", resetTimer, false);
            window.addEventListener("touchmove", resetTimer, false);
            window.addEventListener("MSPointerMove", resetTimer, false);
        
            startTimer();
        }
        setup();
        
        function startTimer() {
            timeoutID = window.setTimeout(goInactive, 60000);
        }
        
        function resetTimer(e) {
            console.log("Time rest")
            window.clearTimeout(timeoutID);
            goActive();
        }
        
        function goInactive() {
            console.log("Inactive")
            var jspcall = `../EEFSSOLogoutWrapperPage.do`
            window.location = jspcall;
        }
        
        function goActive() {
            console.log("Active")
            startTimer();
        }

    }

    
    } */

    ComponentDidMount() {

    }
    ClickLogoutHandler( event ) {
        this.doSomething()
    }
    doSomething(){
        var sessionTime=this.state.sessionTime;
        console.log(sessionTime)

        var pmodal = document.getElementById('logoutModal');
        
        var btn = document.getElementById("myBtn");
        
        var span = document.getElementsByClassName("close")[0];

        var stay = document.getElementsByClassName("myStay")[0];

        var Leave = document.getElementById("myLeave");

        console.log("Modal Clicked")
        pmodal.style.display = "block";

        span.onclick = function() {
            console.log("span Clicked")
            pmodal.style.display = "none";
        }

        stay.onclick = function() {
            console.log("stay Clicked")
            pmodal.style.display = "none";
        }

        Leave.onclick = function(){
            var jspcall = `../EEFSSOLogoutWrapperPage.do`
            window.location = jspcall;
        }

    var timeoutID;
    function setup() {
        window.addEventListener("mousemove", resetTimer, false);
        window.addEventListener("mousedown", resetTimer, false);
        window.addEventListener("keypress", resetTimer, false);
        window.addEventListener("DOMMouseScroll", resetTimer, false);
        window.addEventListener("mousewheel", resetTimer, false);
        window.addEventListener("touchmove", resetTimer, false);
        window.addEventListener("MSPointerMove", resetTimer, false);
    
        startTimer();
    }
    setup();
    
    function startTimer() {
        console.log(sessionTime)
        timeoutID = window.setTimeout(goInactive, sessionTime);
    }
    
    function resetTimer(e) {
        console.log("Time rest")
        window.clearTimeout(timeoutID);
        goActive();
    }
    
    function goInactive() {
        console.log("Inactive")
        var jspcall = `../EEFSSOLogoutWrapperPage.do`
        window.location = jspcall;
    }
    
    function goActive() {
        console.log("Active")
        startTimer();
    }
    }
    render() {
        let lang = locales.strings, home
        let styleType
        if ( this.props.homeLink === 'No' ) {
            home = ''
        } else {
            home = <AnchorFunctionality AnchorText={lang.home} redirectTo="Summary" />
        }
        if ( this.props.headerStyleType === 'MainHeading' ) {
            styleType = <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-4">
                    <img src={heroImage} className="heroImageStyle img-responsive" width='' height='' alt='' style={{ marginBottom: "3%" }} />
                </div>
                <div className="col-lg-7 col-md-6 col-sm-7 col-xs-8" style={{ textAlign: 'center', marginTop: '14px' }}>
                    <p>{this.props.HeadingName}</p>
                </div>
                <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12 welcomeNote'>
                 
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className="helptextStyle">
                            <AnchorFunctionality AnchorText={lang.info} redirectTo="UpdateContactInformationPage" />
                        </div>
                    </div>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className="helptextStyle">
                            <a id="myBtn" onClick={this.ClickLogoutHandler.bind( this )}>{lang.logout}</a>
                        </div>
                    </div>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className="helptextStyle">
                            <p>For help call 1-855-372-1084</p>
                        </div>
                    </div>
                </div>
            </div>
        } else {
            styleType = <div className="row" style={{ textAlign: "left" }}>
                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-4">
                    <img src={heroImage} className="heroImageStyle img-responsive" width='150' height='150' alt='' style={{ marginBottom: "3%" }} />
                </div>
                <div className="col-lg-7 col-md-6 col-sm-7 col-xs-8" >
                    <p className="subScreenHeaderforSmallDevices headerName">{this.props.HeadingName}</p>
                </div>
                <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12 welcomeNote'>
                   
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className="helptextStyle">
                            <AnchorFunctionality AnchorText={lang.info} redirectTo="UpdateContactInformationPage" />
                        </div>
                    </div>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className="helptextStyle">
                            <a id="myBtn" onClick={this.ClickLogoutHandler.bind( this )}>{lang.logout}</a>
                        </div>
                    </div>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className="helptextStyle">
                            <p>For help call 1-855-372-1084</p>
                        </div>
                    </div>
                </div>
            </div>
        }
        return (
            <div>
                <div id="logoutModal" className="pmodal">
                    <div className="pmodal-content">
                        <div className="pmodal-header">
                            <span className="close">&times;</span>
                            <h2  style={{textAlign: 'center'}}>Unsubmitted Information</h2>
                        </div>
                        <div className="pmodal-body" style={{textAlign: 'center'}}>
                            <h3>Do you want to leave this site?</h3>
                            <p>Changes you made will not be saved.</p>
                        </div>
                        <div className="pmodal-footer"  style={{textAlign: 'center'}}>
                            <button id="myLeave" className="btn button-text buttonBack1">Leave</button> <span style={{paddingRight: '10px', paddingLeft: '10px'}}> </span>
                            <button  className="btn button-text buttonBack1 myStay">Stay</button> 
                        </div>
                    </div>
                </div>

                <div id="sessionLogoutModal" className="pmodal">
                <div className="pmodal-content">
                    <div className="pmodal-header">
                        <span className="sessionClose">&times;</span>
                        <h2  style={{textAlign: 'center'}}>Session Expiration Warning</h2>
                    </div>
                    <div className="pmodal-body" style={{textAlign: 'center'}}>
                        <h3>Your session is about to expire</h3>
                        <p>Changes you made will not be saved.</p>
                    </div>
                    <div className="pmodal-footer"  style={{textAlign: 'center'}}>
                        <button id="sessionLeave" className="btn button-text buttonBack1">Leave</button> <span style={{paddingRight: '10px', paddingLeft: '10px'}}> </span>
                        <button  className="btn button-text buttonBack1 sessionStay">Stay</button> 
                    </div>
                </div>
            </div>
                {styleType}
            </div>
        );
    }
}
