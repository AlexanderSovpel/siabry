import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';

import Preloader from '../elements/Preloader';
import Alert from '../components/Alert';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Day from '../components/Day';
import Footer from '../components/Footer';

import SquadService from '../services/SquadService';
import ApplicationService from '../services/ApplicationService';

import '../../sass/Applications.scss';

class Applications extends Component {
  constructor(props) {
    super(props);

    this.MAX_APPLICATIONS = 3;

    this.player = JSON.parse(localStorage.getItem('player'));
    if (this.player.applications === undefined) {
      this.player.applications = [];
    }

    this.state = {
      days: [],
      status: { type: '' },
      loading: false,
      currentAppications: this.player.applications.map(application => ({
        squad_id: application.squad_id,
        waiting_list: Boolean(application.waiting_list)
      })),
      changed: false,
    };

    this.onSquadToggle = this.onSquadToggle.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onUnload = this.onUnload.bind(this);
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
          }),
          changed: true,
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
          }),
          changed: true,
        };
      }

      return {
        currentAppications: [...state.currentAppications, newApplication],
        changed: true,
      }
    }, () => {
      this.checkRules();
    });
  }

  onApply(event) {
    event.preventDefault();
    this.setState({ loading: true });

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
          status: { type: 'success', message: <Translate id="applicationSuccess"></Translate>},
          changed: false,
        });
        this.player.applications = response;
        localStorage.setItem('player', JSON.stringify(this.player));
        this.getDays();
      },
      error => {
        console.error(error.response.data);
        this.setState({
          loading: false,
          status: { type: 'failure', message: <Translate id="applicationFailure"></Translate>}
        });
      }
    );
  }

  onUnload(event) {
    if (this.state.changed) {
      event.returnValue = "Вы не сохранили изменения заявки. Всё равно уйти?";
    }
  }

  componentDidMount() {
    this.unblock = this.props.history.block((location, action) => {
      if (this.state.changed) {
        return "Вы не сохранили изменения заявки. Всё равно уйти?";
      }
    });
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
    this.unblock();
    window.removeEventListener("beforeunload", this.onUnload);
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
            <h1><Translate id="applications.header"></Translate></h1>
            <p className="text note">
              <Translate id="applications.note"></Translate>
            </p>
          </header>
          {this.renderAlert()}
          <form id="applicationForm" className="squads__list" onSubmit={this.onApply} onReset={this.removeHandle}>
          {this.renderDays()}
            <button type="submit"
              className="button primary squads__send-button"
              disabled={this.state.currentAppications.length ? '' : 'disabled'}>
              {this.state.loading ? <Preloader /> : <Translate id="applications.applyButton"></Translate>}
            </button>
          </form>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default Applications;
