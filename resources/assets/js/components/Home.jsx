import React, { Component } from 'react';
import { Translate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';

import '../../sass/Home.scss';

function Home(props) {
  let regulationsLink;
  switch(props.currentLanguage.code) {
    case 'en':
      regulationsLink = 'https://docs.google.com/document/d/1vUPhROQ3g_o8njGq3gGoU32MmLpv-8vZ1H4C80RonVY/';
      break;
    case 'ru':
    default:
      regulationsLink = 'https://docs.google.com/document/d/16Qu1pBKxAVmNyjL_SJtf04Bpc_706Wf8XOgZHpyt9eo/';
      break;
  }

  return (
    <div className="container">
      <Header active="home"/>
      <section className="home content">
        {/* <header className="home__header">
          <h1><Translate id="home.header" /></h1>
        </header> */}
        <article className="home__welcome">
          <a className="home__logo" href="http://vodka-syabry.by/"></a>
          <h1><Translate id="home.welcomeHeader"/></h1>
          <h3><Translate id="home.welcomeSubheader"/></h3>
          <p><Translate id="home.welcomeText"/></p>
          <a href={regulationsLink} target="_blank">
            <Translate id="home.regulationsLink"/>
          </a>
        </article>
      </section>
      <Footer/>
    </div>
  );
}

const mapStateToProps = state => ({ currentLanguage: getActiveLanguage(state.locale) });

export default connect(mapStateToProps)(Home);