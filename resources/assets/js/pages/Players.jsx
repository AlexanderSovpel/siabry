import React, { Component } from 'react';
import axios from 'axios';
import { Translate } from 'react-localize-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../elements/Preloader';

import ApplicationService from '../services/ApplicationService';

import '../../sass/Players.scss';

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      loading: true,
    };
  }

  componentWillMount() {
    ApplicationService.getPlayers()
    .then(response => {
      this.setState({
        players: response,
        loading: false,
      });
    });
  }

  renderHeader() {
    return (
      <header className="players__header">
        <h1><Translate id="players.header"/></h1>
        <p><Translate id="players.total" data={{number: this.state.players.length}}/></p>
      </header>
    );
  }

  renderSection() {
    return (
      <article className="players__table">
        {this.renderPlayers()}
      </article>
    );
  }

  renderPlayers() {
    if (this.state.players) {
      return this.state.players.map((player, index) => (
        <section className="player" key={index}>
          <h4 className="player__name">
            {player.last_name} {player.first_name} (<Translate id={`countries.${player.country.iso_code}`}/>)
          </h4>
          <article className="player__groups">
            <h5 className="player__groups-header"><Translate id="players.squads"/></h5>
            <ul className="player__groups-list">
            {this.renderApplications(player, 0)}
            </ul>
          </article>
          <article className="player__groups">
            <h5 className="player__groups-header"><Translate id="players.waiting" /></h5>
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
    const squads = player.squads.filter(squad => squad.pivot.waiting_list === waitingList);
    if (squads.length === 0) {
      return <Translate id="players.noBooking"/>
    }
    return squads.map((squad, index) => {
      const startDate = new Date(squad.start_date);
      return (
        <li key={index}>
          <Translate id="players.squadNumber" data={{number: squad.id}}/> —&nbsp;
          {startDate.toLocaleDateString()},&nbsp;
          <Translate id={`weekdays.${startDate.getDay()}`}/>,&nbsp;
          {squad.start_time.slice(0, 5)}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <Header active="players"/>
        <section className="players content">
        {this.renderHeader()}
        {this.state.loading ? <Preloader color="dark" /> : this.renderSection()}
        </section>
        <Footer/>
      </div>
    );
  }
}

export default Players;
