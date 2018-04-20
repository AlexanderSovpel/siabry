import React from 'react';

function Tristate(props) {
  return (
    <div className={`tristate ${props.className || ''}`}>
      <input
        type="radio"
        className={`tristate__state tristate__state-off ${props.leftClass || ''}`}
        name={props.name}
        value="-1"
        id={`${props.id}-state-off`}
        onChange={props.onChange}
        defaultChecked={props.selected === 'off'}
        disabled={props.disabled === 'off'}
      />
      <input
        type="radio"
        className="tristate__state tristate__state-null"
        name={props.name} value="0"
        id={`${props.id}-state-null`}
        onChange={props.onChange}
        defaultChecked={props.selected === null}
      />
      <input
        type="radio"
        className={`tristate__state tristate__state-on ${props.rightClass || ''}`}
        name={props.name}
        value="1"
        id={`${props.id}-state-on`}
        onChange={props.onChange}
        defaultChecked={props.selected === 'on'}
        disabled={props.disabled === 'on'}
      />

      <label className="tristate__label tristate__label-off" htmlFor={`${props.id}-state-null`}>
        <i className="material-icons">people</i>
      </label>
      <label className="tristate__label tristate__label-null" htmlFor={`${props.id}-state-off`}>
        <i className="material-icons">people_outline</i>
      </label>

      <span></span>

      <label className="tristate__label tristate__label-on" htmlFor={`${props.id}-state-null`}>
        <i className="material-icons">hourglass_full</i>
      </label>
      <label className="tristate__label tristate__label-null" htmlFor={`${props.id}-state-on`}>
        <i className="material-icons">hourglass_empty</i>
      </label>
    </div>
  );
}

export default Tristate;