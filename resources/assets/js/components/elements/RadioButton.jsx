import React from 'react';

export function RadioButtonGroup(props) {
  return (
    <div className="input radio-group">
      <label className="radio-group__label">{props.label}</label>
      <div className="radio-group__groupset">
      {props.children}
      </div>
    </div>
  );
}

export function RadioButton(props) {
  return (
    <div className="radio-button">
      <input
        type="radio"
        className="radio-button__radio"
        id={props.name + props.value}
        name={props.name}
        value={props.value}
        defaultChecked={props.checked}
        onClick={props.onClick}
        onChange={props.onChange}
      />
      <label htmlFor={props.name + props.value} className="radio-button__view"></label>
      <label htmlFor={props.name + props.value} className="radio-button__label">{props.label}</label>
    </div>
  );
}
