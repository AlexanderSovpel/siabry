import axios from 'axios';
import history from '../helpers/history';

class AuthService {
  static login(username, password) {
    return axios.post('http://siabry.test/api/login', {
      username: username,
      password: password
    }).then(response => {
      const player = JSON.stringify(response.data);
      localStorage.setItem('player', player);
      history.push('/apply');
    });
  }

  static logout() {
    localStorage.removeItem('player');
    history.push('/');
  }

  static register(player, credentials) {
    return axios.post('http://siabry.test/api/registration', {
      player: player,
      credentials: credentials
    })
      .then(response => {
        const player = JSON.stringify(response.data)
        localStorage.setItem('player', player);
        history.push('/apply');
      });
  }
}

export default AuthService;