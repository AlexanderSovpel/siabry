import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import '../../sass/Navigation.scss';

const Navigation = function(props) {
  return (
    <nav className="nav">
      <Link to="/" className={'nav__item' + ((props.active === 'home') ? ' active' : '')}>
        <Translate id="nav.home" />
      </Link>
      <Link to="/apply" className={'nav__item' + ((props.active === 'apply') ? ' active' : '')}>
        <Translate id="nav.applications" />
      </Link>
      <Link to="/players" className={'nav__item' + ((props.active === 'players') ? ' active' : '')}>
        <Translate id="nav.players" />
      </Link>
      <a className="nav__item disabled"><Translate id="nav.results"/></a>
      {/* <a className="nav__item disabled"><Translate id="nav.regulations"/></a> */}
      <a className="nav__item disabled"><Translate id="nav.photos"/></a>
      <Link to="/contacts" className={'nav__item' + ((props.active === 'contacts') ? ' active' : '')}>
        <Translate id="nav.contacts"/>
      </Link>
    </nav>
  );
}

export default Navigation;