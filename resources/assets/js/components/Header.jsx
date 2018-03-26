import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from './Navigation';
import SideMenu from './SideMenu';

import '../../sass/Header.scss';

const Header = function(props) {
  const toggleMenu = function () {
    const sideMenu = document.querySelector('.side-menu');
    sideMenu.classList.toggle('hidden');
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <span className="header__logo-left">Сябры</span>
        <span className="header__logo-right">2018</span>
      </Link>

      <Navigation active={props.active}/>

      {/* <p className="header__contacts light">
      <a href="tel:+375296535033" className="link light phone">+375 (29) 653-50-33</a>
      <br/>
      Елена Лазута
      </p> */}

      <a href="/" className="header__logout button button-flat" onClick={props.logout}>Выход</a>

      <button className="header__side-menu-btn button-flat" onClick={toggleMenu}></button>

      <SideMenu active={props.active} close={toggleMenu}/>
    </header>
  );
}

export default Header;