import React, { Component } from 'react';
import { Translate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';

import Checkbox from '../elements/Checkbox';
import { RadioButton } from '../elements/RadioButton';
import Tristate from '../elements/Tristate';

import '../../sass/Squad.scss';

class Squad extends Component {
  constructor(props) {
    super(props);

    this.selected = props.players.find(player =>
      player.id === props.playerId
    );

    this.isWaitingList = this.selected ? Boolean(this.selected.pivot.waiting_list) : null;

    this.freeSlots = props.spots - props.players.filter(player =>
      player.pivot.waiting_list === 0
    ).length;
    this.freeSlots = (this.freeSlots > 0) ? this.freeSlots : 0;

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let isWaitingList = null;
    if (event.target.classList.contains('waiting-list')) {
      isWaitingList = true;
    }
    if (event.target.classList.contains('group')) {
      isWaitingList = false;
    }

    const newSquad = {
      squad_id: this.props.id,
      waiting_list: isWaitingList
    };

    this.props.toggleSquad(event, newSquad);
  }

  renderList(players, waiting) {
    const playersList = players.filter(player =>
      player.pivot.waiting_list === waiting
    );

    return playersList.length ? (
      <ol className="squad__players">
        {
          playersList.map((player, index) => (
            <li className="squad__player" key={index}>
              {player.last_name} {player.first_name}
            </li>
          ))
        }
      </ol>
    ) : <p className="text"><Translate id="players.noBooking" /></p>;
  }

  render() {
    const time = new Date('1970-01-01T' + this.props.time);
    const timeFormatter = new Intl.DateTimeFormat(this.props.currentLanguage.code, {
      hour: 'numeric',
      minute: 'numeric',
    });
    const currencyFormatter = new Intl.NumberFormat(this.props.currentLanguage.code, {
      style: 'currency',
      currency: 'USD',
    });

    return (
      <article className={(this.freeSlots > 0) ? 'squad' : 'squad squad-filled'}>
        <input
          type="checkbox"
          id={`squad__details_${this.props.id}`}
          className="squad__details-toggle"
        />

        <header className="squad__header">
          <Tristate
            className="squad__checker"
            name={`squad_${this.props.id}`}
            id={`squad_${this.props.id}`}
            leftClass="group"
            rightClass="waiting-list"
            disabled={(this.freeSlots > 0) ? null : 'off'}
            selected={this.selected ? (this.isWaitingList ? 'on' : 'off') : null}
            onChange={this.onChange}
          />
          <label htmlFor={`squad__details_${this.props.id}`} className="squad__label">
            <p className="text">
              {timeFormatter.format(time)} — <Translate id="squad.squad" />&nbsp;
              {this.props.id} {(this.freeSlots > 0) || <Translate id="squad.full" />}
            </p>
            <p className="text">
              <span className="fee">{currencyFormatter.format(this.props.fee)}</span>
              <span className="slots"><Translate id="squad.spots" /> {this.freeSlots}</span>
            </p>
          </label>
        </header>

          <div className="squad__details">
            <p className="text">
              <span className="fee">
                <Translate id="squad.entryFee" /> {currencyFormatter.format(this.props.fee)}
              </span>
              <span className="slots">
                <Translate id="squad.freeSpots" /> {this.freeSlots}/{this.props.spots}
              </span>
            </p>
            <h5 className="text"><Translate id="squad.players" /></h5>
            {this.renderList(this.props.players, 0)}
            <h5 className="text"><Translate id="squad.waiting" /></h5>
            {this.renderList(this.props.players, 1)}
          </div>
      </article>
    );
  }
}

const mapStateToProps = state => ({ currentLanguage: getActiveLanguage(state.locale) });

export default connect(mapStateToProps)(Squad);
