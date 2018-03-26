import React from 'react';
import { Link } from 'react-router-dom';

import '../../sass/Navigation.scss';

const Navigation = function(props) {
  return (
    <nav className="nav">
    <Link to="/apply" className={'nav__item' + ((props.active === 'apply') ? ' active' : '')}>Заявки</Link>
    <Link to="/players" className={'nav__item' + ((props.active === 'players') ? ' active' : '')}>Участники</Link>
    <a className="nav__item disabled">Результаты</a>
    <a className="nav__item disabled">Регламент</a>
    <a className="nav__item disabled">Фотографии</a>
    <Link to="/contacts" className={'nav__item' + ((props.active === 'contacts') ? ' active' : '')}>Контакты</Link>
    </nav>
  );
}

export default Navigation;