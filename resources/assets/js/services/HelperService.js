import axios from 'axios';

class HelperService {
  static getCountries() {
    return axios.get('http://siabry.test/api/countries')
      .then(countries => countries)
      .catch(error => error);
  }
}

export default HelperService;