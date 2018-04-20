import React, { Component } from 'react';
import axios from 'axios';
import { Translate } from 'react-localize-redux';

import Preloader from '../elements/Preloader';
import { Input } from '../elements/Input';
import Alert from './Alert';

import AuthService from '../services/AuthService';

class PasswordReset extends Component {
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

    const { email } = this.state;

    AuthService.resetPassword(email)
      .then(response => {
        this.setState({
          loading: false,
          status: { type: 'success', message: response },
        });
      }, error => {
        console.error('error', error);
        this.setState({
          loading: false,
          status: { type: 'success', message: error.response.data },
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
        <p className="text center"><Translate id="reset.resetMessage"/></p>
      );
    }

    return (
      <div className="index-page__content">
        <form name="passwordResetForm" className="form form-reset" onSubmit={this.onSubmit}>
          <fieldset className="form__group form__group-current">
            <Input
              type="email"
              name="email"
              label={<Translate id="reset.email"></Translate>}
              onChange={this.onInputChange}
            />
          </fieldset>
          <button type="submit" className="button primary">
            {this.state.loading ? <Preloader /> : <Translate id="resetButton"></Translate>}
          </button>
        </form>

        {this.renderAlert()}
      </div>
    );
  }
}

export default PasswordReset;
