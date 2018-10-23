import React, { Component } from 'react';

export default class VenueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers:[],
    };
  }

  render() {

    return (
      <ol className="venueList">
        {
          this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue, index) => (
            <li
              className="listItem"
              tabIndex="0"
              key={index}
              onClick={() => {
               this.props.listItemClick(venue) }}
              onKeyDown={() => {this.props.listItemClick(venue)}}>
              { venue.name }
            </li>
          ))
        }
      </ol>
    );
  }
}
