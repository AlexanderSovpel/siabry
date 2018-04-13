import React, { Component } from 'react';
import axios from 'axios';
import { Translate } from 'react-localize-redux';

import Header from './Header';
import Footer from './Footer';

import ApplicationService from '../services/ApplicationService';

import '../../sass/Players.scss';

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = { players: [] };
  }

  componentWillMount() {
    ApplicationService.getPlayers()
    .then(response => {
      this.setState({ players: response });
    });
  }

  renderPlayers() {
    if (this.state.players) {
      return this.state.players.map((player, index) => (
        <section className="player" key={index}>
          <h4 className="player__name">{player.last_name} {player.first_name} ({player.country.iso_code})</h4>
          <article className="player__groups">
            <p className="text"><Translate id="players.groups"/></p>
            <ul className="player__groups-list">
            {this.renderApplications(player, 0)}
            </ul>
          </article>
          <article className="player__groups">
            <p className="text"><Translate id="players.waiting" /></p>
            <ul className="player__groups-list">
            {this.renderApplications(player, 1)}
            </ul>
          </article>
        </section>
      ));
    }
    return null;
  }

  renderApplications(player, waitingList = 0) {
    return player.squads.filter(squad => squad.pivot.waiting_list === waitingList)
      .map((squad, index) => {
        const startDate = new Date(squad.start_date);
      return (
        <li key={index}>
          <Translate id="players.groupNumber"/>{squad.id}: {startDate.toLocaleDateString()} {squad.start_time.slice(0, 5)}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <Header active="players"/>
        <section className="players content">
          <header className="players__header">
            <h1><Translate id="players.header"/></h1>
          </header>
          <article className="players__table">
            {this.renderPlayers()}
          </article>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default Players;