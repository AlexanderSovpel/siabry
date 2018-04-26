import React from 'react';
import { getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';

import Squad from './Squad';

import '../../sass/Day.scss';

const Day = function(props) {
  const formatter = new Intl.DateTimeFormat(props.currentLanguage.code, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  return (
    <section className="day">
      <header className="day__header">
        {formatter.format(props.date)}
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

const mapStateToProps = state => ({ currentLanguage: getActiveLanguage(state.locale) });

export default connect(mapStateToProps)(Day);
