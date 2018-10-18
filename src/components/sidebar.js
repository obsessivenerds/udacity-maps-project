import React, { Component } from 'react';
//import ListItem from "./listitem";
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
          {
            this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue, index) => (
              <li className="listItem" key={index} onClick={() => { this.props.listItemClick(venue) }}>
                { venue.name }
              </li>
            ))
          }
        </div>
    );
  }
}
