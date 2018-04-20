import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import Preloader from '../elements/Preloader';
import { Input } from '../elements/Input';
import Alert from './Alert';

import AuthService from '../services/AuthService';

import history from '../helpers/history';

class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      status: { type: '', message: '' },
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState({ loading: true });

    const { password, passwordConfirm } = this.state;

    if (password !== passwordConfirm) {
      this.setState({
        loading: false,
        status: { type: 'failure', message: 'passwords don\'t match' },
      });
      return;
    }

    const emailEncr = history.location.pathname.slice(16);

    AuthService.changePassword(emailEncr, password)
      .then(response => {
        this.setState({
          loading: false,
          status: { type: 'success', message: response },
        });
      }, error => {
        console.error('error', error);
        this.setState({
          loading: false,
          status: { type: 'failure', message: error.response.data.message },
        });
      });
  }

  renderAlert() {
    if (this.state.status.type === 'failure') {
      return <Alert message={this.state.status.message} close={() => this.setState({ status: { type: '' } })}/>
    }
  }

  render() {
    if (this.state.status.type === 'success') {
      return (
        <p className="text center">
          <Translate id="reset.changeMessage"/>&nbsp;
          <Link to="/login" className="link light">
            <Translate id="loginButton"></Translate>
          </Link>
        </p>
      );
    }

    return (
      <div className="index-page__content">
        <form name="passwordResetForm" className="form form-reset" onSubmit={this.onSubmit}>
          <fieldset className="form__group form__group-current">
            <Input
              type="password"
              name="password"
              label={<Translate id="reset.password"></Translate>}
              onChange={this.onInputChange}
            />
            <Input
              type="password"
              name="passwordConfirm"
              label={<Translate id="reset.passwordConfirm"></Translate>}
              onChange={this.onInputChange}
            />
          </fieldset>
          <button type="submit" className="button primary">
            {this.state.loading ? <Preloader /> : <Translate id="changePasswordButton"></Translate>}
          </button>
        </form>

        {this.renderAlert()}
      </div>
    );
  }
}

export default PasswordChange;
