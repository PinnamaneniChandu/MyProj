import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import React from 'react';
import moment from 'moment-es6';

const datepicker = ({input, selected, meta: {touched, error, warning} }) => (
    <div>
    <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value, 'YYYY-MM-DD') : null} popperModifiers={{
        offset: {
            enabled: true,
            offset: '5px, 10px'
        },
        preventOverflow: {
            enabled: true,
            escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
            boundariesElement: 'viewport'
        }
    }} withPortal/>
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
    
);

export default datepicker;