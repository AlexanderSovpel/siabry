import React from 'react';

import Checkbox from './elements/Checkbox';
import { RadioButton } from './elements/RadioButton';
import Tristate from './elements/Tristate';

import '../../sass/Squad.scss';

const Squad = function(props) {
  const selected = props.players.find(player => player.id === props.playerId);
  const isWaitingList = selected ? Boolean(selected.pivot.waiting_list) : null;
  console.log(isWaitingList);

  let freeSlots = props.spots - props.players.length;
  freeSlots = (freeSlots > 0) ? freeSlots : 0;

  return (
    <article className={(freeSlots > 0) ? 'squad' : 'squad squad-filled'}>
      <input type="checkbox" id={`squad__details_${props.id}`} className="squad__details-toggle"/>

      <header className="squad__header">
        <Tristate
          className="squad__checker"
          name={`squad_${props.id}`}
          id={`squad_${props.id}`}
          leftClass="group"
          rightClass="waiting-list"
          disabled={(freeSlots > 0) ? null : 'off'}
          selected={selected ? (isWaitingList ? 'on' : 'off') : null}
          onChange={(e) => {
            let isWaitingList = null;
            if (e.target.classList.contains('waiting-list')) {
              isWaitingList = true;
            }
            if (e.target.classList.contains('group')) {
              isWaitingList = false;
            }
            const newSquad = {
              squad_id: props.id,
              waiting_list: isWaitingList
            };
            props.toggleSquad(e, newSquad);
          }}
        />
        <label htmlFor={`squad__details_${props.id}`} className="squad__label">
          <p className="text">{props.time} — группа {props.id} {(freeSlots > 0) || '(заполнен)'}</p>
          <p className="text">Мест: {freeSlots}/{props.spots}</p>
          <p className="text">{props.fee}$</p>
        </label>
      </header>

        <div className="squad__details">
          <p className="text">Свободных мест: <span className="slots">{freeSlots}</span>
          </p>
          <p className="text">Вступительный взнос: <span className="fee">{props.fee} $</span>
          </p>
          <p className="text">Участники:</p>
          <ol className="squad__players">
            {
              props.players.map((player, index) => {
                let className = 'squad__player';
                // FIX
                if (player.id === props.playerId && isWaitingList) {
                  className += '-waiting';
                }
                return <li className={className} key={index}>
                  {player.last_name} {player.first_name}
                </li>
              })
            }
          </ol>
        </div>
    </article>
  );
}

export default Squad