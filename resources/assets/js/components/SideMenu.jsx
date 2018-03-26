import React from 'react';
import { Link } from 'react-router-dom';

import '../../sass/SideMenu.scss';

const SideMenu = function(props) {
  return (
    <section className="header__side-menu side-menu hidden">
      <button className="side-menu__close-btn button-flat" onClick={props.close}></button>
      <Link to="/apply" className={'side-menu__item' + ((props.active === 'apply') ? ' active' : '')}>Заявки</Link>
      <Link to="/players" className={'side-menu__item' + ((props.active === 'players') ? ' active' : '')}>Участники</Link>
      <a className="side-menu__item disabled">Результаты</a>
      <a className="side-menu__item disabled">Регламент</a>
      <a className="side-menu__item disabled">Фотографии</a>
      <Link to="/contacts" className={'side-menu__item' + ((props.active === 'contacts') ? ' active' : '')}>Контакты</Link>
      <Link to="/" className="side-menu__item">Выход</Link>
    </section>
  );
}

export default SideMenu;