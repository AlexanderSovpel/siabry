import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import { Input } from '../elements/Input';
import { RadioButton, RadioButtonGroup } from '../elements/RadioButton';
import Select from '../elements/Select';
import Alert from '../components/Alert';

import AuthService from '../services/AuthService';
import HelperService from '../services/HelperService';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      countries: [],
      userExists: false,
    };

    HelperService.getCountries()
      .then(countries => {
        console.log(countries);
        this.setState({
          countries: countries.data.map(item => ({
            value: item.id,
            label: item.name_ru
          }))
        });
      })
      .catch(error => console.log(error));

    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.onCredentialChange = this.onCredentialChange.bind(this);
  }

  toggleFormButton(button, groupNumber) {
    if (this.state.currentStep === groupNumber) {
      button.classList.add('button-hidden');
    } else {
      button.classList.remove('button-hidden');
    }
  }

  toggleSubmitButton() {
    const submitBtn = document.querySelector('.form-registration > .submit');
    const stepsCount = document.querySelectorAll('.form-registration > .form__group').length;

    if (this.state.currentStep === stepsCount - 1) {
      submitBtn.classList.remove('button-hidden');
    } else {
      submitBtn.classList.add('button-hidden');
    }
  }

  onStepChange() {
    const registrationGroups = document.querySelectorAll('.form-registration > .form__group');
    const stepsCount = registrationGroups.length;
    const nextBtn = document.querySelector('.form-registration > .next');
    const previousBtn = document.querySelector('.form-registration > .previous');

    for (let i = 0; i < registrationGroups.length; ++i) {
      registrationGroups[i].classList.remove('form__group-current');
    }
    registrationGroups[this.state.currentStep].classList.add('form__group-current');

    this.toggleFormButton(previousBtn, 0);
    this.toggleFormButton(nextBtn, stepsCount - 1);
    this.toggleSubmitButton();
  }

  checkRequired() {
    const requiredInputs = document.querySelectorAll(`.form-registration > .form__group:nth-child(${this.state.currentStep + 1}) input:required`);
    for (let i = 0; i < requiredInputs.length; i += 1) {
      if (requiredInputs[i].value.trim() === '') {
        return false;
      }
    }
    return true;
  }

  nextStep(event) {
    event.preventDefault();
    if (this.checkRequired() === false) {
      return;
    }
    this.setState({currentStep: this.state.currentStep + 1}, this.onStepChange);
  };

  previousStep(event) {
    event.preventDefault();
    this.setState({currentStep: this.state.currentStep - 1}, this.onStepChange);
  };

  submitHandler(event) {
    event.preventDefault();

    const newPlayer = {
      firstName: document.querySelector('input[name=firstName]').value,
      middleName: document.querySelector('input[name=middleName]').value,
      lastName: document.querySelector('input[name=lastName]').value,
      gender: document.querySelector('input[name=gender]:checked').value,
      birthday: document.querySelector('input[name=birthday]').value,
      handUsed: document.querySelector('input[name=handUsed]:checked').value,
      email: document.querySelector('input[name=email]').value,
      mobile: document.querySelector('input[name=mobile]').value,
      country: document.querySelector('[name=country]').value,
      city: document.querySelector('input[name=city]').value,
    };

    const newCredentials = {
      username: document.querySelector('input[name=username]').value,
      password: document.querySelector('input[name=password]').value,
    };

    AuthService.register(newPlayer, newCredentials)
      .then(
        response => console.log(response),
        error => console.log(error)
      );
  }

  onCredentialChange(event) {
    if (event.target.validity.valid) {
      this.checkCredential(event.target.value, AuthService[`${event.target.name}Exists`])
    }
  }

  checkCredential(data, serviceValidator) {
    serviceValidator(data).then(response => {
      if (response) {
        this.setState({ userExists: true });
      } else {
        this.setState({ userExists: false });
      }
    });
  }

  renderAlert() {
    if (this.state.userExists) {
      return <Alert message={<Translate id="registration.userExists"/>}/>
    }
  }

  render() {
    return (
      <div className="index-page__content">
        <form className="form form-registration" name="registrationForm" onSubmit={this.submitHandler}>
          <fieldset className="form__group form__group-current">
            <Input
              type="email"
              name="email"
              label={<Translate id="registration.email"/>}
              placeholder="example@bowling.by"
              onBlur={this.onCredentialChange}
              required
            />
            <Input
              type="text"
              name="username"
              label={<Translate id="registration.username"/>}
              placeholder="super-bowler-2018"
              onBlur={this.onCredentialChange}
              required
            />
            <Input type="password" name="password" label={<Translate id="registration.password"></Translate>} placeholder="******" required />
          </fieldset>

          <fieldset className="form__group">
            <Input type="text" name="firstName" label={<Translate id="registration.firstName"></Translate>} placeholder="Иван" required />
            <Input type="text" name="middleName" label={<Translate id="registration.middleName"></Translate>} placeholder="Иванович" />
            <Input type="text" name="lastName" label={<Translate id="registration.lastName"></Translate>} placeholder="Иванов" required />
          </fieldset>

          <fieldset className="form__group">
            <RadioButtonGroup label={<Translate id="registration.gender"></Translate>}>
              <RadioButton name="gender" value="f" id="gender-f" label={<Translate id="registration.genderFemale"></Translate>} />
              <RadioButton name="gender" value="m" id="gender-m" label={<Translate id="registration.genderMale"></Translate>} checked />
            </RadioButtonGroup>
            <Input type="date" name="birthday" label={<Translate id="registration.birthday"></Translate>} required />
            <RadioButtonGroup label={<Translate id="registration.handUsed"></Translate>}>
              <RadioButton name="handUsed" value="l" id="handUsed-l" label={<Translate id="registration.handUsedLeft"></Translate>} />
              <RadioButton name="handUsed" value="r" id="handUsed-r" label={<Translate id="registration.handUsedRight"></Translate>} checked />
            </RadioButtonGroup>
          </fieldset>

          <fieldset className="form__group">
            <Select
              name="country"
              label={<Translate id="registration.country"/>}
              placeholder="Выберите страну"
              data={this.state.countries}
              required
            />
            <Input type="text" name="city" label={<Translate id="registration.city"></Translate>} />
            <Input type="tel" name="mobile" label={<Translate id="registration.mobile"></Translate>} />
          </fieldset>

          {this.renderAlert()}

          <button className="button button-hidden primary submit">
            <Translate id="registrationButton"></Translate>
          </button>
          <button className="button next primary" onClick={this.nextStep} disabled={this.state.userExists}>
            <Translate id="registration.nextButton"></Translate>
          </button>
          <button className="button button-hidden previous" onClick={this.previousStep}>
            <Translate id="registration.previousButton"></Translate>
          </button>
        </form>

        <p className="text center">
          <Translate id="registration.note"></Translate>&nbsp;
          <Link to="/login" className="link light">
            <Translate id="loginButton"></Translate>
          </Link>
        </p>
      </div>
    );
  }
}

export default Registration;
