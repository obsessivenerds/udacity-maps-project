import React, { Component } from 'react';
/*global google*/

class ListItem extends Component {
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

      <ol className="venueList"></ol>

      <li className="listItem" key={index} onClick={() => { this.props.listItemClick(venue) }}>
        { venue.name }
      </li>
    );
  }
}

export default ListItem
