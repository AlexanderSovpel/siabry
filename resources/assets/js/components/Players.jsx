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
          <td>{index + 1}</td>
          <td>{player.last_name} {player.first_name}</td>
          <td>{player.country.name_ru}</td>
          <td>{this.renderApplications(player)}</td>
        </tr>
      ));
    }
    return null;
  }

  renderApplications(player) {
    return player.applications.map((application, index) => (
      <p key={index}>{application.start_date} {application.start_time}&nbsp;—&nbsp;группа {application.id}</p>
    ));
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
                <th>№</th>
                <th>Игрок</th>
                <th>Страна</th>
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