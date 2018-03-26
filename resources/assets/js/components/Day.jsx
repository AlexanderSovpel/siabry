import React from 'react';

import Squad from './Squad';

import '../../sass/Day.scss';

const Day = function(props) {
  // const player = JSON.parse(localStorage.getItem('player')); // change to global state
  // console.log(player);
  return (
    <section className="day">
      <header className="day__header">
        {props.date.toLocaleDateString()}
      </header>

      {
        props.squads.map((squad, index) => {
          // const isInSquad = player.applications.find(application => application.id === squad.id);
          // console.log(isInSquad);
          return (
            <Squad
              key={index}
              id={squad.id}
              // tournamentId={squad.tournament_id}
              playerId={props.playerId}
              fee={squad.fee}
              spots={squad.spots}
              time={squad.start_time}
              players={squad.players}
              // selected={isInSquad}
              toggleSquad={props.toggleSquad}
            />
          );
        })
      }
    </section>
  );
}

export default Day;