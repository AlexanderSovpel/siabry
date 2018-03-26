import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../sass/Index.scss';

class Index extends Component {
  constructor(props) {
    super(props);

    this.buttons = (
      <div>
        <Link to="/registration" className="button primary button-registration">Зарегистрироваться</Link>
        <Link to="/login" className="button button-login">Войти</Link>
      </div>
    );
  }

  render() {
    return (
      <section className="index-page">
        <Link to="/" className="logo">
          <h1 className="logo__header">
            <span className="logo__header-left">Сябры</span>
            <span className="logo__header-right">2018</span>
          </h1>
          <h2 className="logo__subheader">международный<br/>
            турнир по боулингу</h2>
        </Link>
        {(this.props.children) ? this.props.children : this.buttons}
      </section>
    );
  }
}

export default Index;