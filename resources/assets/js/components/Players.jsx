import React, { Component } from 'react';
import axios from 'axios';

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
        <tr className="player" key={index}>
          <td>{player.last_name} {player.first_name} ({player.country.iso_code})</td>
          <td>
            <p className="text">Основные группы:</p>
            <ul className="player__groups">
            {this.renderApplications(player, 0)}
            </ul>
            <p className="text">Лист ожидания:</p>
            <ul className="player__groups">
            {this.renderApplications(player, 1)}
            </ul>
          </td>
        </tr>
      ));
    }
    return null;
  }

  renderApplications(player, waitingList = 0) {
    return player.squads.filter(squad => squad.pivot.waiting_list === waitingList)
      .map((squad, index) => {
      const squadDate = new Date(`${squad.start_date}T${squad.start_time}`);
      return (
        <li key={index}>
          №{squad.id}: {squadDate.toLocaleDateString()} {squadDate.toLocaleTimeString()}
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
            <h1>Участники</h1>
          </header>
          <table className="players__table">
            <thead>
              <tr>
                <th>Игрок</th>
                <th>Потоки</th>
              </tr>
            </thead>
            <tbody>
              {this.renderPlayers()}
            </tbody>
          </table>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default Players;