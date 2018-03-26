import React, { Component } from 'react';

import Preloader from './elements/Preloader';
import Alert from './Alert';
import Header from './Header';
import Navigation from './Navigation';
import Day from './Day';
import Footer from './Footer';

import SquadService from '../services/SquadService';
import ApplicationService from '../services/ApplicationService';

import '../../sass/Applications.scss';

class Applications extends Component {
  constructor(props) {
    super(props);

    this.MAX_SQUADS = 3;
    this.MAX_HIGH_SQUADS = 2; // In last two days  

    this.player = JSON.parse(localStorage.getItem('player'));

    this.state = {
      days: [],
      status: { type: '' },
      loading: false,
      selectedSquads: this.player.applications.map(squad => squad.id),
    };

    this.onSquadToggle = this.onSquadToggle.bind(this);
    this.applyHandle = this.applyHandle.bind(this);
  }

  componentWillMount() {
    this.getDays();
  }

  getDays() {
    SquadService.getSquads().then(days => {
      this.setState(
        state => ({days: days}),
        () => this.checkRules()
      );
    });
  }

  disableUnchecked() {
    const squadCheckboxes = document.querySelectorAll('.squad:not(.filled) .checkbox:not(:checked)');
    squadCheckboxes.forEach(checkbox => checkbox.disabled = true);
  }

  enableUnchecked() {
    const squadCheckboxes = document.querySelectorAll('.squad:not(.filled) .checkbox:not(:checked)');
    squadCheckboxes.forEach(checkbox => checkbox.disabled = false);
  }

  getHighSquads() {
    const highSquads = [
      ...this.state.days[this.state.days.length - 1].squads,
      ...this.state.days[this.state.days.length - 2].squads
    ];
    const selectedHigh = this.state.selectedSquads.filter(squadId =>
      highSquads.find(highSquad => highSquad.id === squadId)
    );
    return selectedHigh.length;
  }

  checkRules() {
    if (this.state.selectedSquads.length >= this.MAX_SQUADS || this.getHighSquads() >= this.MAX_HIGH_SQUADS) {
      this.disableUnchecked();
      return false;
    } else {
      this.enableUnchecked();
      return true;
    }
  }

  onSquadToggle(e, newSquad) {
    this.setState(state => {
      if (state.selectedSquads && state.selectedSquads.indexOf(newSquad) >= 0) {
        return {
          selectedSquads: state.selectedSquads.filter(squad =>  squad !== newSquad)
        }
      }
      if (this.checkRules()) {
        return {
          selectedSquads: [...state.selectedSquads, newSquad]
        }
      }
    }, () => {
      this.checkRules();
    });
  }

  applyHandle(event) {
    event.preventDefault();
    this.setState({ loading: true });

    let applicationsData = [];

    for (let i = 0; i < this.state.selectedSquads.length; i += 1) {
      applicationsData.push({
        tournament_id: 1,
        player_id: this.player.id, 
        squad_id: this.state.selectedSquads[i],
        waiting_list: false
      });
    }

    ApplicationService.apply(this.player.id, applicationsData).then(
      response => {
        this.setState({
          loading: false,
          status: { type: 'success', message: 'Заявка успешно подана'}
        });
        this.player.applications = response;
        localStorage.setItem('player', JSON.stringify(this.player));
        this.getDays();
      },
      error => {
        console.error(error);
        this.setState({
          loading: false,
          status: { type: 'failure', message: 'Ошибка подачи заявки'}
        });
      }
    );
  }

  renderAlert() {
    if (this.state.status.type) {
      return <Alert message={this.state.status.message} close={() => this.setState({ status: { type: '' } })}/>
    }
  }

  renderDays() {
    if (this.state.days) {
      return this.state.days.map((day, index) => {
        return (
          <Day
            key={index}
            playerId={this.player.id}
            date={day.date}
            squads={day.squads}
            toggleSquad={this.onSquadToggle}
          />
        );
      });
    }
    return null;
  }

  render() {
    return (
      <div className="container">
        <Header active="apply" logout={this.props.logout}/>
        <section className="squads content">
          <header className="squads__header">
            <h1>Регистрация</h1>
            <p className="text note">
              Выберите не более трёх групп, из них&nbsp;—&nbsp;не более двух 
              групп 15–16 июня.
            </p>
          </header>
          {this.renderAlert()}
          <form id="applicationForm" className="squads__list" onSubmit={this.applyHandle} onReset={this.removeHandle}>
          {this.renderDays()}
            <button type="submit"
              className="button primary squads__send-button"
              disabled={this.state.selectedSquads.length ? '' : 'disabled'}>
              {this.state.loading ? <Preloader /> : 'Отправить заявку'}
            </button>
          </form>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default Applications;
