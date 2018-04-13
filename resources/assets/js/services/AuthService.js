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

  static checkEmail(email) {
    return axios.post('http://siabry.test/api/checkEmail', {
      email: email,
    }).then(response => {
      console.log(response);
      return response.data
    });
  }

  static isLoggedIn() {
    const player = JSON.parse(localStorage.getItem('player'));
    // console.log(player);
    return player || false;
  }
}

export default AuthService;