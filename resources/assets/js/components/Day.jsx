import React from 'react';

import Squad from './Squad';

import '../../sass/Day.scss';

const Day = function(props) {
  return (
    <section className="day">
      <header className="day__header">
        {props.date.toLocaleDateString()}
      </header>

      {
        props.squads.map((squad, index) => {
          return (
            <Squad
              key={index}
              id={squad.id}
              playerId={props.playerId}
              fee={squad.fee}
              spots={squad.spots}
              time={squad.start_time}
              players={squad.players}
              toggleSquad={props.toggleSquad}
            />
          );
        })
      }
    </section>
  );
}

export default Day;