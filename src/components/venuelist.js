import React, { Component } from 'react';
import ListItem from "./listitem"
/*global google*/

class VenueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers:[],
    };
  }

  componentDidMount() {

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
