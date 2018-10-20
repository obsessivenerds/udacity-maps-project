import React, { Component } from 'react';
import './App.css';
import { load_google_maps, load_locations } from "./utils";
import SquareAPI from "./API/FourSquareAPI";
import SideBar from './components/sidebar';
/*global google*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      venues: []
    }
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
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
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

      marker.addListener('click', () => {
        if (marker.getAnimation() !== null) { marker.setAnimation(null) }
        else { marker.setAnimation(google.maps.Animation.BOUNCE) }
        setTimeout(() => { marker.setAnimation(null) }, 1400);
        SquareAPI.getVenueDetails(marker.id)
        .then(res => {
          console.log(res);
          const newMarker = res.response.venue;
          const markerData = {
            rating: newMarker.rating,
            Price: newMarker.price.message
          };
          console.log(markerData);
        });
      })

      google.maps.event.addListener(marker, 'click', () => {
        this.infoWindow.setContent(marker.name);
        this.map.setCenter(marker.position);
        this.infoWindow.open(this.map, marker);
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

markerClick = (marker) => {

}

listItemClick = (venue) => {
  let marker = this.markers.filter(mrk => mrk.id === venue.id)[0];

  this.map.setCenter(marker.position);
  this.infoWindow.open(this.map, marker);
  {marker.setAnimation(google.maps.Animation.BOUNCE)};
  setTimeout(() => { marker.setAnimation(null) }, 1400);
  SquareAPI.getVenueDetails(marker.id)
  .then(res => {
    console.log(res);
    const newVenue = res.response.venue;
    const venueData = {
      photoPrefix: newVenue.bestPhoto.prefix,
      photoSuffix: newVenue.bestPhoto.suffix,
      url: "Website: " + newVenue.url,
      price: "Price: " + newVenue.price.message
    };
    this.infoWindow.setContent("<img src="+ venueData.photoPrefix + "200x200" + venueData.photoSuffix + ">" + "<p>"+venueData.url+ "</p>" + "<p>"+venueData.price+"</p>");
    console.log(venueData);
  });
}

  render() {
    return (
      <div className="App">
        <SideBar
          listItemClick = { this.listItemClick }
          filterVenues = { this.filterVenues }
          filteredVenues = { this.state.filteredVenues }/>
        <div id="map">

        </div>
      </div>
    );
  }
}

export default App;
