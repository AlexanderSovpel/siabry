import React from 'react';
import { Translate } from 'react-localize-redux';

import Checkbox from './elements/Checkbox';
import { RadioButton } from './elements/RadioButton';
import Tristate from './elements/Tristate';

import '../../sass/Squad.scss';

const Squad = function(props) {
  const selected = props.players.find(player => player.id === props.playerId);
  const isWaitingList = selected ? Boolean(selected.pivot.waiting_list) : null;

  let freeSlots = props.spots - props.players.filter(player => player.pivot.waiting_list === 0).length;
  freeSlots = (freeSlots > 0) ? freeSlots : 0;

  const displayDateTime = new Date('1970-01-01T' + props.time + 'Z');

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
          <p className="text">{props.time.slice(0, 5)} — <Translate id="squad.group" /> {props.id} {(freeSlots > 0) || <Translate id="squad.full" />}</p>
          <p className="text"><Translate id="squad.spots" /> {freeSlots}</p>
          <p className="text">{props.fee}$</p>
        </label>
      </header>

        <div className="squad__details">
          <p className="text"><Translate id="squad.freeSpots" /> <span className="slots">{freeSlots}</span>/{props.spots}
          </p>
          <p className="text"><Translate id="squad.entryFee" /> <span className="fee">{props.fee} $</span>
          </p>
          <p className="text"><Translate id="squad.players" /></p>
          <ol className="squad__players">
            {
              props.players.filter(player => player.pivot.waiting_list === 0)
                .map((player, index) => (
                  <li className="squad__player" key={index}>
                    {player.last_name} {player.first_name}
                  </li>
                )
              )
            }
          </ol>
          <p className="text"><Translate id="squad.waiting" /></p>
          <ol className="squad__players">
            {
              props.players.filter(player => player.pivot.waiting_list === 1)
                .map((player, index) => (
                  <li className="squad__player" key={index}>
                    {player.last_name} {player.first_name}
                  </li>
                )
              )
            }
          </ol>
        </div>
    </article>
  );
}

export default Squad