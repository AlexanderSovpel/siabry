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

  renderClose() {
    if (this.props.close) {
      return <button className="alert__close button-flat" onClick={this.handleClose}></button>;
    }
  }

  render() {
    return (
      <div className={`alert ${this.props.type || ''}`}>
        <span>{this.props.message}</span>
        {this.renderClose()}
      </div>
    );
  }
}

export default Alert;