import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Translate, setActiveLanguage, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';

import Dropdown from '../elements/Dropdown';
import Select from '../elements/Select';
import Navigation from './Navigation';
import SideMenu from './SideMenu';

import AuthService from '../services/AuthService';

import '../../sass/Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logoutButton = (
      <a href="/" className="header__logout button button-flat" onClick={AuthService.logout}>
        <Translate id="logoutButton"/>
      </a>
    );

    this.loginButton = (
      <Link to="/login" className="header__login button button-flat">
        <Translate id="loginButton"/>
      </Link>
    );

    this.languages = [
      { value: 'ru', label: 'RU' },
      { value: 'en', label: 'EN' }
    ];

    this.state = {
      currentLanguage: localStorage.getItem('language') || this.props.currentLanguage.code,
    }

    this.setActiveLanguage(this.state.currentLanguage);
    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  toggleMenu() {
    const sideMenu = document.querySelector('.side-menu');
    sideMenu.classList.toggle('hidden');
  }

  onLanguageChange(event) {
    const lang = event.target.dataset.value || event.target.value;
    this.setActiveLanguage(lang);
    this.setState({ currentLanguage: lang });
  }

  setActiveLanguage(lang) {
    this.props.dispatch(setActiveLanguage(lang));
    localStorage.setItem('language', lang);
  }

  render() {
    return (
      <header className="header">
        <Link to="/" className="header__logo">
          <span className="header__logo-left"><Translate id="tournamentName"/></span>
          <span className="header__logo-right">2018</span>
        </Link>

        <Navigation active={this.props.active}/>

        <Select
          className="header__languages"
          name="language"
          data={this.languages}
          default={this.languages.find(lang => lang.value === this.state.currentLanguage)}
          onChange={this.onLanguageChange}
        />

        {AuthService.isLoggedIn() ? this.logoutButton : this.loginButton}

        <button className="header__side-menu-btn button-flat" onClick={this.toggleMenu}></button>

        <SideMenu active={this.props.active} close={this.toggleMenu}/>
      </header>
    );
  };
}

const mapStateToProps = state => ({ currentLanguage: getActiveLanguage(state.locale) });

export default connect(mapStateToProps)(Header);
