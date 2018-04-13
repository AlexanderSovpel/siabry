import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {
        value: (props.default) ? props.default.value : '',
        label: (props.default) ? props.default.label : ''
      },
      dropdown: false,
    };

    this.onChange = this.onChange.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }

    const value = event.target.value || event.target.dataset.value;
    const label = event.target.textContent;
    this.setState(
      { selected: {
          value: value.trim(),
          label: label,
        },
      }
    );

    this.hideOptions(event);
  }

  hideOptions(event) {
    let options;
    console.log(event.target);
    if (event.target.parentNode.classList.contains('dropdown__options')) {
      options = event.target.parentNode;
    } else {
      options = event.target.parentNode.lastElementChild;
    }

    this.setState({ dropdown: false });
    setTimeout(() => options.classList.add('hidden'), 200);
  }

  showOptions(event) {
    const options = event.target.parentNode.lastElementChild;
    options.classList.remove('hidden');
    this.setState({ dropdown: true });
  }

  toggleOptions(event) {
    if (this.state.dropdown) {
      this.hideOptions(event);
    } else {
      this.showOptions(event);
    }
  }

  render() {
    return (
      <div className={`dropdown input ${this.props.className}`} >
        <input type="hidden" name={this.props.name} value={this.state.selected.value}/>
        <label
          htmlFor={this.props.name}
          className={`dropdown__label ${this.props.label ? '' : 'dropdown__label-empty'}`}
          onClick={this.toggleOptions}
        >
          {this.props.label}
        </label>
        <input
          type="text"
          className="dropdown__select"
          id={this.props.name}
          value={this.state.selected.label}
          placeholder={this.props.placeholder}
          required={this.props.required}
          onFocus={this.showOptions}
          onBlur={this.hideOptions}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
        <div className="dropdown__options hidden" onClick={this.onChange}>
        {
          this.props.data.map((item, index) => {
            return (
              <div key={index} className="dropdown__item" data-value={item.value}>
                {item.label}
              </div>
            );
          })
        }
        </div>
        
      </div>
    );
  }
  
}

export default Dropdown;