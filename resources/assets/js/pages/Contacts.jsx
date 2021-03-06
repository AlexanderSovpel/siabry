import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../../sass/Contacts.scss';

class Contacts extends Component {
  componentDidMount() {
    ymaps.ready(() => {
      const myMap = new ymaps.Map("map", {
        center: [53.964146, 27.623896],
        zoom: 16
      });

      const myPlacemark = new ymaps.Placemark(
        [53.964146, 27.623896],
        {
          hintContent: '\"KINZA\"',
          balloonContent: 'пересечение ул. Мирошниченко и МКАД (ТЦ ЭКСПОБЕЛ)'
        }
      );
      myMap.geoObjects.add(myPlacemark);
    });
  }

  render() {
    return (
      <div className="container">
        <Header active="contacts"/>
        <section className="contacts content">
          <header className="">
            <h1><Translate id="contacts.header" /></h1>
          </header>
          <article className="contacts__person">
            <h1><Translate id="contacts.name1" /></h1>
            <p className="text"><a className="link" href="tel:+375296535033">+375 29 653-50-33</a></p>
            <p className="text"><a className="link" href="mailto:elena_lazuta@mail.ru">elena_lazuta@mail.ru</a></p>

            <h1><Translate id="contacts.name2" /></h1>
            <p className="text"><a className="link" href="tel:+375296553476">+375 29 655-34-76</a></p>
            <p className="text"><a className="link" href="mailto:sinitsa-oks@yandex.ru">sinitsa-oks@yandex.ru</a></p>
          </article>

          <article className="contacts__bowling">
            <h1><Translate id="contacts.bowling" /></h1>
            <p className="text">
              <Translate id="contacts.bowlingName" />,&nbsp;
              <Translate id="contacts.bowlingAddress" />
            </p>
            <p className="text"><a className="link" href="tel:+375296505085">+375 29 650-50-85</a></p>
            <div className="contacts__bowling__map" id="map"></div>
          </article>
        </section>
        <Footer/>
      </div>
    );
  }
}
export default Contacts;
