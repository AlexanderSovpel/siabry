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

  static emailExists(email) {
    return axios.get(`http://siabry.test/api/emailExists/${email}`)
      .then(response => {
        return response.data;
      }).catch(error => console.error(error));
  }

  static usernameExists(username) {
    return axios.get(`http://siabry.test/api/usernameExists/${username}`)
      .then(response => {
        return response.data;
      }).catch(error => console.error(error));
  }

  static resetPassword(email) {
    return axios.post('http://siabry.test/api/resetPassword', {
      email: email,
    }).then(response => response.data);
  }

  static changePassword(emailEncr, password) {
    return axios.post('http://siabry.test/api/changePassword', {
      emailEncr: emailEncr,
      password: password
    }).then(response => response.data);
  }

  static isLoggedIn() {
    const player = JSON.parse(localStorage.getItem('player'));
    return player || false;
  }
}

export default AuthService;
