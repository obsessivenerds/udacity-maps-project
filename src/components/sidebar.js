import React, { Component } from 'react';
import VenueList from "./venuelist";

export default class SideBar extends Component {

componentDidMount() {

}

  render() {
      return (
        <div>
          {this.props.showMenu &&
            <div className="sideBar">
            <input
              id={"search"}
              type={"search"}
              placeholder={"Filter Venues"} value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }}/>
            <br/>
            <VenueList
              {...this.props} listItemClick={this.props.listItemClick}
            filteredVenues={this.props.filteredVenues}  />
          </div>}
        </div>
      )
  }
  hide() {
     this.setState({
       open: false
     })
   }
}
