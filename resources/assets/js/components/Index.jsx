import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Translate, setActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';

import '../../sass/Index.scss';

let createHandlers = function(dispatch) {
  let onLanguageChange = function(event) {
    const lang = event.target.dataset.lang;
    console.log(lang);
    dispatch(setActiveLanguage(lang))
  };

  return {
    onLanguageChange,
    // other handlers
  };
}

class Index extends Component {
  constructor(props) {
    super(props);

    this.buttons = (
      <div>
        <Link to="/registration" className="button primary button-registration">
          <Translate id="registrationButton"></Translate>
        </Link>
        <Link to="/login" className="button button-login">
          <Translate id="loginButton"></Translate>
        </Link>
      </div>
    );

    this.handlers = createHandlers(this.props.dispatch);
  }

  render() {
    return (
      <section className="index-page">
        <div className="languages" onClick={this.handlers.onLanguageChange}>
          <button className="languages__lang button-flat" data-lang="ru">RU</button>
          <button className="languages__lang button-flat" data-lang="en">EN</button>
        </div>
        <Link to="/" className="logo">
          <h1 className="logo__header">
            <span className="logo__header-left"><Translate id="tournamentName"></Translate></span>
            <span className="logo__header-right">2018</span>
          </h1>
          <h2 className="logo__subheader">
            <Translate id="tournamentDescription"></Translate>
          </h2>
        </Link>
        {(this.props.children) ? this.props.children : this.buttons}
      </section>
    );
  }
}

export default connect()(Index);
// export default Index;
// export default connect(mapStateToProps, mapDispatchToProps)(Index);