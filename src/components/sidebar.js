import React, { Component } from 'react';
import VenueList from "./venuelist";

export default class SideBar extends Component {

  render() {
    return (
      <section>
        {this.props.showMenu &&
          <div className="sideBar">
          <input
            id={"search"}
            type={"search"}
            placeholder={"Filter FourSquare Venues"} value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }}/>
          <br/>
          <VenueList
            {...this.props} listItemClick={this.props.listItemClick}
            filterVenues={this.props.filterVenues}
            filteredVenues={this.props.filteredVenues}  />
          </div>
        }
      </section>
    )
  }
}
