import React from 'react';

function Checkbox(props) {
  return (
    <div className={`checkbox ${props.className}`}>
      <input
        type="checkbox"
        className="checkbox__checker"
        name={props.name}
        value={props.value}
        id={props.name + props.value}
        onChange={props.onChange}
        onClick={props.onClick}
        defaultChecked={props.checked}
      />
      <label className={`checkbox__label ${props.icon}`} htmlFor={props.name + props.value}>{props.label}</label>
    </div>
  );
}

export default Checkbox;