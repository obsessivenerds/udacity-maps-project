import React, { Component } from 'react';
import VenueList from "./venuelist";
/*global google*/

export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }

componentDidMount() {

}

  render() {
    return (
        <div id="sidebar">
          <input id="search" type="search" placeholder="Filter Venues" value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }}/>
          <br/>
          <VenueList
            {...this.props} listItemClick={this.props.listItemClick}
          filteredVenues={this.props.filteredVenues}  />
        </div>
    );
  }
}
