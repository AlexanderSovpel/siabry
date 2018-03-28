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

    this.MAX_APPLICATIONS = 3;
    // this.MAX_HIGH_SQUADS = 2; // In last two days  

    this.player = JSON.parse(localStorage.getItem('player'));

    this.state = {
      days: [],
      status: { type: '' },
      loading: false,
      currentAppications: this.player.applications.map(application => ({
        squad_id: application.squad_id,
        waiting_list: Boolean(application.waiting_list)
      })),
    };

    // console.log(this.state.currentAppications);

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
        () => {
          this.checkRules();
          const filledSquads = document.querySelectorAll('.squad-filled .squad__checker > .checkbox__checker:not(:checked)');
          filledSquads.forEach(checkbox => checkbox.disabled = true);
        }
      );
    });
  }

  disableUnchecked() {
    const groups = document.querySelectorAll('.squad:not(.squad-filled) .group:not(:checked)');
    groups.forEach(groupChecker => groupChecker.disabled = true);
  }

  enableUnchecked() {
    const groups = document.querySelectorAll('.squad:not(.squad-filled) .group:not(:checked)');
    groups.forEach(groupChecker => groupChecker.disabled = false);
  }

  getHighSquads() {
    const highSquads = [
      ...this.state.days[this.state.days.length - 1].squads,
      ...this.state.days[this.state.days.length - 2].squads
    ];
    const selectedHigh = this.state.currentAppications.filter(application =>
      highSquads.find(highSquad => highSquad.id === application.squad_id)
    );
    return selectedHigh.length;
  }

  checkRules() {
    const groupApplications = this.state.currentAppications.filter(application => {
      return application.waiting_list === false;
    });

    if (groupApplications.length >= this.MAX_APPLICATIONS) {
      this.disableUnchecked();
      return false;
    } else {
      this.enableUnchecked();
      return true;
    }
  }

  onSquadToggle(e, newApplication) {
    this.setState(state => {
      if (newApplication.waiting_list === null) {
        return {
          currentAppications: state.currentAppications.filter(application => {
            return newApplication.squad_id !== application.squad_id
          })
        };
      }

      const existingApplication = state.currentAppications.find(application => {
        return newApplication.squad_id === application.squad_id;
      });

      if (existingApplication !== undefined) {
        return {
          currentAppications: state.currentAppications.map(application => {
            if (application.squad_id === newApplication.squad_id) {
              return {
                ...application,
                waiting_list: !application.waiting_list
              };
            }

            return application;
          })
        };
      }

      return {
        currentAppications: [...state.currentAppications, newApplication]
      }
    }, () => {
      this.checkRules();
      // console.log(this.state.currentAppications);
    });
  }

  applyHandle(event) {
    event.preventDefault();
    this.setState({ loading: true });

    // console.log(this.state.currentAppications);

    let applicationsData = [];

    for (let application of this.state.currentAppications) {
      applicationsData.push({
        tournament_id: 1,
        player_id: this.player.id, 
        squad_id: application.squad_id,
        waiting_list: application.waiting_list
      });
    }

    // console.log(applicationsData);

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
              disabled={this.state.currentAppications.length ? '' : 'disabled'}>
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
