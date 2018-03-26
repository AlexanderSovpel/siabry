import axios from 'axios';

// import Squad from '../models/Squad';
// import Day from '../models/Day';
// import Player from '../models/Player';

class SquadService {
  static getSquads() {
    return axios.get('http://siabry.test/api/squads')
      .then(response => {
        let days = [];

        for (let date in response.data) {
          let squads = [];

          for (let squad of response.data[date]) {
            let isHigh = (date === '2018-06-16' || date === '2018-06-15');
            squads.push({...squad, isHigh});
          }

          days.push({date: new Date(date), squads});
        }

        return days;
      })
      .catch(error => {
        console.log(error);
      }
    );
  }
}

export default SquadService;