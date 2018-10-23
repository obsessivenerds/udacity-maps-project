import React, { Component } from 'react';
import { load_google_maps, load_locations } from "../utils";
import SquareAPI from "../API/FourSquareAPI";
/*global google*/

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      venues: [],
    };
  }

componentDidMount() {
  let googleMapsPromise = load_google_maps();
  let locationPromise = load_locations();

  Promise.all([
    googleMapsPromise,
    locationPromise
  ])
  .then(values => {
    console.log(values);
    let google = values[0];
    this.venues = values[1].response.venues;

    this.google = google;
    this.markers = [];
    this.infoWindow = new google.maps.InfoWindow();
    this.simpleWindow = new google.maps.InfoWindow();
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      scrollwheel: true,
      center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
    });

    this.venues.forEach(venue => {
      let marker = new google.maps.Marker({
        position: { lat: venue.location.lat, lng: venue.location.lng },
        map: this.map,
        venue: venue,
        id: venue.id,
        name: venue.name,
        location: venue.location.formattedAddress,
        animation: google.maps.Animation.DROP
      });

      google.maps.event.addListener(marker, 'mouseover', () => {
        this.simpleWindow.open(this.map, marker);
        this.simpleWindow.setContent(venue.name);
      });

      google.maps.event.addListener(marker, 'mouseout', () => {
        this.simpleWindow.close();
      })

      google.maps.event.addListener(marker, 'click', () => {
        this.listItemClick(venue);
        this.simpleWindow.close();
      });

      this.markers.push(marker);
    });
    this.setState({ filteredVenues: this.venues });
  });

}

//loop through markers and compare name property to query
filterVenues = (query) => {
  let f = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));

  this.markers.forEach(marker => {
    marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
    marker.setVisible(true) :
    marker.setVisible(false);
  });
  this.setState({ filteredVenues: f, query });
}

listItemClick = (venue) => {
  let marker = this.markers.filter(mrk => mrk.id === venue.id)[0];

  this.map.setCenter(marker.position);
  this.map.panBy(0, -150);
  {marker.setAnimation(google.maps.Animation.BOUNCE)};
  setTimeout(() => { marker.setAnimation(null) }, 1400);
  SquareAPI.getVenueDetails(marker.id)
  .then(res => {
    console.log(res);
    const newVenue = res.response.venue;
    const venueData = {
      name: newVenue.name,
      photoPrefix: newVenue.bestPhoto.prefix,
      photoSuffix: newVenue.bestPhoto.suffix,
      url: "Website: " + newVenue.url,
      rating: "Rating: " + newVenue.rating,
      price: "Price: " + newVenue.price.message
    };
    const infoBoxContent = "<p>" + venueData.name + "</p>" + "<img src=" + venueData.photoPrefix + "200x200" + venueData.photoSuffix + ">" + "<p>" + venueData.url + "</p>" + "<p>" + venueData.rating + "</p>" + "<p>" + venueData.price + "</p>";
    this.infoWindow.setContent(infoBoxContent);
    this.infoWindow.open(this.map, marker);
    console.log(venueData);
  }).catch(error => {
    alert('FourSquare API Failed.')
  });
}

  render() {
    return (
        <div id="map">
        </div>
    );
  }
}