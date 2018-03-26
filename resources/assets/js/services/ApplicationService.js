import axios from 'axios';

class ApplacationService {
  static getPlayers() {
    return axios.get('http://siabry.test/api/players')
      .then(response => {
        return response.data;
        // let players = [];
        // for (let player of response.data) {
        //   let applications = [];
        //   for (let application of player.applications) {
        //     applications.push(`${application.date} ${application.time}, группа ${application.squad_id}`);
        //   }
        //   player.applications = applications;
        //   players.push(player);
        // }

        // return players;
      })
      .catch(error => console.log(error));
  }

  static apply(playerId, applications) {
    return axios.post('http://siabry.test/api/applications', {
      player_id: playerId,
      applications: applications
    }).then(response => response.data);
  }
}

export default ApplacationService;