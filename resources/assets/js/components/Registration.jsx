import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { Input } from './elements/Input';
import { RadioButton, RadioButtonGroup } from './elements/RadioButton';
import { Select } from './elements/Select';

import AuthService from '../services/AuthService';
import HelperService from '../services/HelperService';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0
    };


    this.countries = [];

    HelperService.getCountries()
      .then(countries => {
        console.log(countries);
        for(let i = 0; i < countries.data.length; i += 1) {
          this.countries.push({
            value: countries.data[i].id,
            label: countries.data[i].name_ru
          });
        }
      })
      .catch(error => console.log(error));

    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
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
      country: document.querySelector('select[name=country]').selectedOptions[0].value,
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

  render() {
    return (
      <div className="index-page__content">
        <form className="form form-registration" name="registrationForm" onSubmit={this.submitHandler}>
          <fieldset className="form__group form__group-current">
            <Input type="email" name="email" label="Эл. почта" placeholder="example@bowling.by" required />
            <Input type="text" name="username" label="Имя пользователя" placeholder="super-bowler-2018" required />
            <Input type="password" name="password" label="Пароль" placeholder="******" required />
          </fieldset>

          <fieldset className="form__group">
            <Input type="text" name="firstName" label="Имя" placeholder="Иван" required />
            <Input type="text" name="middleName" label="Отчество" placeholder="Иванович" />
            <Input type="text" name="lastName" label="Фамилия" placeholder="Иванов" required />
          </fieldset>

          <fieldset className="form__group">
            <RadioButtonGroup label="Пол">
              <RadioButton name="gender" value="f" id="gender-f" label="женский" />
              <RadioButton name="gender" value="m" id="gender-m" label="мужской" checked />
            </RadioButtonGroup>
            <Input type="date" name="birthday" label="Дата рождения" required />
            <RadioButtonGroup label="Ведущая рука">
              <RadioButton name="handUsed" value="l" id="handUsed-l" label="левая" />
              <RadioButton name="handUsed" value="r" id="handUsed-r" label="правая" checked />
            </RadioButtonGroup>
          </fieldset>

          <fieldset className="form__group">
            <Select name="country" label="Страна" placeholder="Выберите страну" data={this.countries} />
            <Input type="text" name="city" label="Город" />
            <Input type="tel" name="mobile" label="Телефон" />
          </fieldset>
  
          <button className="button button-hidden primary submit">Зарегистрироваться</button>
          <button className="button next primary" onClick={this.nextStep}>Далее</button>
          <button className="button button-hidden previous" onClick={this.previousStep}>Назад</button>
        </form>

        <p className="text center">
          Уже есть аккаунт? <Link to="/login" className="link light">Войти</Link>
        </p>
      </div>
    );
  }
}

export default Registration;