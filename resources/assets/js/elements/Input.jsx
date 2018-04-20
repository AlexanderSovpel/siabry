import React from 'react';

export function Input (props) {
  return (
    <div className="input">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        pattern={props.pattern}
        value={props.value}
        required={props.required}
        onClick={props.onClick}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </div>
  );
}
