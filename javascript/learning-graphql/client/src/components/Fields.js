import React from 'react';

const SelectField = ({labelText, options, onChange}) => {
    return (
        <div className="field">
            <label>{labelText}</label>
            <select onChange={onChange}>
                {options.map((option, index) => (<option key={index} value={option.value}>{option.text}</option>))}
            </select>
        </div>
    );
}

const InputField = ({labelText, onChange, inputType="text"}) => {
    return (
        <div className="field">
            <label>{labelText}</label>
            <input type={inputType} onChange={onChange} />
        </div>
    );
}

export { SelectField, InputField };
