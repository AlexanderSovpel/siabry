import React from 'react';

import '../../sass/Squad.scss';

const Squad = function(props) {
  const squadId = 'squad' + props.id;
  const squadDetailsId = 'squad__details' + props.id;
  const selected = props.players.find(player => player.id === props.playerId);

  let freeSlots = props.spots - props.players.length;
  freeSlots = (freeSlots > 0) ? freeSlots : 0;

  return (
    <article className={(freeSlots > 0) ? 'squad' : 'squad filled'}>
      <input type="checkbox" id={squadDetailsId} className="squad__details-toggle"/>

      <header className="squad__header">
        <input type="checkbox"
          className="checkbox"
          name="squad"
          id={squadId}
          data-squad-id={props.id}
          value={squadId}
          onChange={(e) => props.toggleSquad(e, props.id)}
          // disabled={freeSlots ? '' : 'disabled'}
          defaultChecked={selected}
        />
        <label className="squad__checker checkbox__label" htmlFor={squadId}></label>
        <label htmlFor={squadDetailsId} className="squad__label">{props.time} — группа {props.id} {(freeSlots > 0) || '(заполнен)'}</label>
      </header>

        <div className="squad__details">
          <p className="text">Свободных мест: <span className="slots">{(freeSlots > 0) ? freeSlots : 0}</span>
          </p>
          <p className="text">Вступительный взнос: <span className="fee">{props.fee} $</span>
          </p>
          <p className="text">Участники:</p>
          <ol className="squad__players">
            {
              props.players.map((player, index) => {
                return <li className={(index <= freeSlots) ? 'squad__player' : 'squad__player-waiting'} key={index}>{player.last_name} {player.first_name}</li>
              })
            }
          </ol>
        </div>
    </article>
  );
}

export default Squad