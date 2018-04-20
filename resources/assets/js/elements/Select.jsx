import React from 'react';

function Select(props) {
  return (
    <div className={`input ${props.className || ''}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        className="select"
        id={props.id}
        name={props.name}
        defaultValue={props.placeholder || props.default.value}
        onChange={props.onChange}
        required={props.required}
      >
        {props.placeholder ? <option value={props.placeholder} disabled>{props.placeholder}</option> : ''}
        {props.data.map((item, index) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
