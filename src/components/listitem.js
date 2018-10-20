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
      <li className="listItem" key={this.props.index} onClick={() => { this.props.listItemClick(this.props.venue) }}>
        { this.props.venue.name }
      </li>
    );
  }
}

export default ListItem
