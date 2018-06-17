import '../../../CSS/App.css'
import '../../../CSS/App-DesktopsScreen.css'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import datepicker from '../../../utilities/DatePicker'
import ButtonFunctionality from '../../../ClickFunc/ButtonFunctionality'
import PhoneNumberComponent from '../PhoneNumberComponent'
import  * as locales from '../../../screens/PhoneNumberProperties'

const required = value => value ? undefined : 'Required'
const PhoneNumberForm = props => {
    const { handleSubmit, pristine, submitting } = props;
    let lang=locales.strings;
    return (
        <form onSubmit={handleSubmit} className="form-style" style={{padding:"30px"}}>
            <div>
            <PhoneNumberComponent phoneType={lang.homeLabel} />
            </div>
            <div>
            <PhoneNumberComponent phoneType={lang.workLabel} />
            </div>
            <div>
            <PhoneNumberComponent phoneType={lang.mobileLabel} />
            </div>
            <div className="row form-label-style">
            <div className="col-md-6 col-sm-6 col-xs-6" style={{textAlign: "center"}}>
                <button type="submit" className="btn button-text buttonBack1" disabled={pristine || submitting} style={{}}>{lang.ButtonSave}</button>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-6">
                <ButtonFunctionality ButtonName={lang.ButtonCancel} redirectTo="AddExemptionWorkActivity" dstClassName="btn button-text buttonBack1"/>
            </div>
        </div>
        </form>
    )
}
export default reduxForm({
    form: 'PhoneNumberForm',
})(PhoneNumberForm);