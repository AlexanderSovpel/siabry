import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Preloader from './elements/Preloader';
import { Input } from './elements/Input';
import Alert from './Alert';

import AuthService from '../services/AuthService';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
      status: { type: '' },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });

    const { username, password } = this.state;

    AuthService.login(username, password)
      .then(response => {
        this.setState({
          loading: false,
          status: { type: 'success', message: '' },
        });
      }, error => {
        console.error('error', error.response.data.message);
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
    return (
      <div className="index-page__content">
        <form name="loginForm" className="form form-login" onSubmit={this.handleSubmit}>
        <fieldset className="form__group form__group-current">
        <Input
            type="text"
            name="username"
            label="Имя пользователя"
            onChange={this.handleInputChange}
            required
          />
          <Input
            type="password"
            name="password"
            label="Пароль"
            onChange={this.handleInputChange}
            required
          />
        </fieldset>
          <button type="submit" className="button primary">
            {this.state.loading ? <Preloader /> : 'Войти'}
          </button>
        </form>

        <p className="text center">
          Нет аккаунта? <Link to="/registration" className="link light">Зарегистрироваться</Link>
        </p>

        {this.renderAlert()}
      </div>
    );
  }
}

export default Login;