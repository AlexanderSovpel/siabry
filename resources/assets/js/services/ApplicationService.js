import axios from 'axios';

class ApplacationService {
  static getPlayers() {
    return axios.get('http://siabry.test/api/players')
      .then(response => response.data);
  }

  static apply(playerId, applications) {
    return axios.post('http://siabry.test/api/applications', {
      player_id: playerId,
      applications: applications
    }).then(response => response.data);
  }
}

export default ApplacationService;