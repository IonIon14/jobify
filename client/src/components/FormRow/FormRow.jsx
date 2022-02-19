import React from 'react'

const FormRow = ({ name, type, text, value, handleChange }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label" >{text || name}</label>
            <input type={type} value={value} className="form-input" name={name} onChange={handleChange} />
        </div>
    )
}

export default FormRow