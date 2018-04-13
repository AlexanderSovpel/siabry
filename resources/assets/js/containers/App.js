import React, {
  Component
} from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { localeReducer, initialize, addTranslation, setActiveLanguage } from 'react-localize-redux';

import history from '../helpers/history';

import AuthService from '../services/AuthService';

import Index from '../components/Index';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Applications from '../components/Applications';
import Players from '../components/Players';
import Contacts from '../components/Contacts';
import Home from '../components/Home';

import '../../sass/App.scss';

const store = createStore(combineReducers({
  locale: localeReducer,
}));

const languages = ['ru', 'en'];
store.dispatch(initialize(languages));

const translation = require('../helpers/translation.json');
store.dispatch(addTranslation(translation));

// store.dispatch(setActiveLanguage('en'));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            {/* <Route exact path="/" component={Index} /> */}
            <Route path="/login" render={(props) => <Index><Login /></Index>} />
            <Route path="/registration" render={(props) => <Index><Registration /></Index>} />
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