import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { localeReducer, initialize, addTranslation, setActiveLanguage } from 'react-localize-redux';

import history from '../helpers/history';

import AuthService from '../services/AuthService';

import Index from '../pages/Index';
import Login from '../components/Login';
import Registration from '../components/Registration';
import PasswordReset from '../components/PasswordReset';
import PasswordChange from '../components/PasswordChange';
import Applications from '../pages/Applications';
import Players from '../pages/Players';
import Contacts from '../pages/Contacts';
import Home from '../pages/Home';

import '../../sass/App.scss';

const store = createStore(combineReducers({
  locale: localeReducer,
}));

const languages = ['ru', 'en'];
store.dispatch(initialize(languages));

const translation = require('../helpers/translation.json');
store.dispatch(addTranslation(translation));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/login" render={(props) => <Index><Login /></Index>} />
            <Route path="/registration" render={(props) => <Index><Registration /></Index>} />
            <Route path="/passwordReset" render={(props) => <Index><PasswordReset /></Index>} />
            <Route path="/passwordChange" render={(props) => <Index><PasswordChange /></Index>}/>
            <Route path="/apply" render={(props) => (
              AuthService.isLoggedIn() ? <Applications {...props}/> : <Redirect to="/login" />
            )}/>
            <Route path="/players" component={Players} />
            <Route path="/contacts" component={Contacts} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
