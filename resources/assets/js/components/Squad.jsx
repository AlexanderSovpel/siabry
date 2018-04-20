import React from 'react';
import { Translate } from 'react-localize-redux';

import Checkbox from '../elements/Checkbox';
import { RadioButton } from '../elements/RadioButton';
import Tristate from '../elements/Tristate';

import '../../sass/Squad.scss';

function renderList(players, waiting) {
  const playersList = players.filter(player => player.pivot.waiting_list === waiting);
  return playersList.length ? (
    <ol className="squad__players">
      {
        players.map((player, index) => (
          <li className="squad__player" key={index}>
            {player.last_name} {player.first_name}
          </li>
        ))
      }
    </ol>
  ) : <p className="text"><Translate id="players.noBooking" /></p>;
}

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
          <p className="text">{props.time.slice(0, 5)} — <Translate id="squad.squad" /> {props.id} {(freeSlots > 0) || <Translate id="squad.full" />}</p>
          <p className="text">
            <span className="fee"> {props.fee}$</span>
            <span className="slots"><Translate id="squad.spots" /> {freeSlots}</span>
          </p>
        </label>
      </header>

        <div className="squad__details">
          <p className="text">
            <span className="fee"><Translate id="squad.entryFee" /> {props.fee}$</span>
            <span className="slots"><Translate id="squad.freeSpots" /> {freeSlots}/{props.spots}</span>
          </p>
          <h5 className="text"><Translate id="squad.players" /></h5>
          {renderList(props.players, 0)}
          <h5 className="text"><Translate id="squad.waiting" /></h5>
          {renderList(props.players, 1)}
        </div>
    </article>
  );
}

export default Squad
