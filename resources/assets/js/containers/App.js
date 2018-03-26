import React, {
  Component
} from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../helpers/history';

import Index from '../components/Index';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Applications from '../components/Applications';
import Players from '../components/Players';
import Contacts from '../components/Contacts';

import '../../sass/App.scss';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/login" render={(props) => <Index><Login /></Index>} />
          <Route path="/registration" render={(props) => <Index><Registration /></Index>} />
          <Route path="/apply" component={Applications} />
          <Route path="/players" component={Players} />
          <Route path="/contacts" component={Contacts} />
        </Switch>
      </Router>
    );
  }
}

export default App;