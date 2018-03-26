import React, { Component } from 'react';

import '../../sass/Alert.scss';

class Alert extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event) {
    this.props.close();
  }

  render() {
    return (
      <div className={`alert ${this.props.type || ''}`}>
        <span>{this.props.message}</span>
        <button className="alert__close button-flat" onClick={this.handleClose}></button>
      </div>
    );
  }
}

export default Alert;