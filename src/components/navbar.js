import React, { Component } from "react";
import MenuIcon from "./menuicon";
import SideBar from "./sidebar"

export default class NavBar extends Component {

  myFunction=(x) => {
      x.className.toggle("change");
  }
  render() {
    return (
      <div id="navbar">
        <div className="menuIcon">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>
    );
  }
  hideList() {
  this.refs.SideBar.hide();
}
}
