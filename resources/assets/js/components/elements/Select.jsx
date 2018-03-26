import React from 'react';

export function Select(props) {
  return (
    <div className="input">
      <label htmlFor={props.id}>{props.label}</label>
      <select name={props.name} defaultValue={props.placeholder} onChange={props.onChange}>
        {props.data.map((item, index) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
}

export function Option(props) {
  return(
    <option key={props.value} value={props.value}>{props.children}</option>
  );
}