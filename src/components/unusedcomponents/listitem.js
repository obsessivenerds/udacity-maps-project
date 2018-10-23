import React, { Component } from 'react';

export default class ListItem extends Component {
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
      <div>
        <p> {this.props.venueData.name} </p>
        <img src={this.props.venueData.photoPrefix+"200x200"+this.props.venueData.photoSuffix}/>
        <p>{this.props.venueData.url}</p>
        <p>{this.props.venueData.rating}</p>
        <p>{this.props.venueData.price}</p>
      </div>
    );
  }
}
