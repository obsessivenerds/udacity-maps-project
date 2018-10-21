import React, { Component } from 'react';

export default class MenuIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeIcon:false
    };
    this.toggleIcon = this.toggleIcon.bind(this);
  }

  toggleIcon() {
    const currentState = this.state.changeIcon;
    this.setState({ changeIcon: !currentState });
    this.props.toggleMenu();
  };

  render() {
    return (
      <div className={this.state.changeIcon ? 'menuIcon change' : 'menuIcon'} onClick={this.toggleIcon}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    );
  }
}
