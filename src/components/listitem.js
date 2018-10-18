import React, { Component } from 'react';
/*global google*/

export default class ListItem extends Component {
  constructor() {
    super();
  }
  render() {

    return (

      <li className="listItem"
      {
        this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue, index) => (
          <div key={index} className="venue-item" onClick={() => { this.props.listItemClick(venue) }}>
            <img src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix} alt={this.props.categories[0].name}/>
            { venue.name }
          </div>
        ))
      }
    </li>
  );
  }
}
