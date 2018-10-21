import React, { Component } from 'react';

class VenueList extends Component {
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
            <li className="listItem" key={index} onClick={() => {
               this.props.listItemClick(venue) }}>
              { venue.name }
            </li>
          ))
        }
      </ol>
    );
  }
}

export default VenueList
