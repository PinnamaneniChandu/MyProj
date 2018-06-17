import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
const inputtextField = ({ input, type, meta: { touched, error, warning } }) => (
    <div>
      <input {...input} type={type} style={{width: "100%"}}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
);
export default inputtextField;