import React, { Component } from 'react';
import './App.css';
import { loadMap, loadVenues } from "./utils";
import SquareAPI from "./API/FourSquareAPI";
import SideBar from './components/sidebar';
import MenuIcon from "./components/menuicon"
import Map from "./components/map"
/*global google*/

class App extends Component {
  //constructor includes setting state for showing/hiding with function
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      venues: [],
      showMenu:false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
/*toggleMenu functionality developed with guidance from user
Gegenwind on Stack OverFlow: https://stackoverflow.com/questions/47032248/how-to-make-clicking-a-menu-button-toggle-show-hide-of-a-menu-sidebar-component */
  toggleMenu() {
    this.setState({showMenu: !this.state.showMenu})
  }

/*promises developed with guidance from walkthrough by coach Ryan Waite:
https://www.youtube.com/watch?v=5J6fs_BlVC0&t=2s */
componentDidMount() {
  let googleMapsPromise = loadMap();
  let locationPromise = loadVenues();

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

    //Define marker attributes
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

      //Set listeners for hovering over markers
      google.maps.event.addListener(marker, 'mouseover', () => {
        this.simpleWindow.open(this.map, marker);
        this.simpleWindow.setContent(venue.name);
      });

      google.maps.event.addListener(marker, 'mouseout', () => {
        this.simpleWindow.close();
      })

      //Assign function for clicking on markers
      google.maps.event.addListener(marker, 'click', () => {
        this.listItemClick(venue);
        this.simpleWindow.close();
      });

      this.markers.push(marker);
    });
    this.setState({ filteredVenues: this.venues });
  }).catch(error => {
    console.log(error);
    alert('FourSquare API Failed.')
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

//function for handling click on venue list items
listItemClick = (venue) => {
  let marker = this.markers.filter(mrk => mrk.id === venue.id)[0];

  this.map.setCenter(marker.position);
  this.map.panBy(0, -150);
  {marker.setAnimation(google.maps.Animation.BOUNCE)};
  setTimeout(() => { marker.setAnimation(null) }, 1400);
  //Get details from FourSquare venues
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
    //Define display data for InfoWindow
    const infoBoxContent = `<p>${venueData.name}</p><img src=${venueData.photoPrefix}200x200${venueData.photoSuffix} alt="${venueData.name}"><p>${venueData.url}</p><p>${venueData.rating}</p><p>${venueData.price}</p>`;
    this.infoWindow.setContent(infoBoxContent);
    this.infoWindow.open(this.map, marker);
    console.log(venueData);
  }).catch(error => {
    console.log(error);
    alert('FourSquare API Failed.')
  });
}

  render() {
    return (
      <div className="App">
        <MenuIcon toggleMenu={this.toggleMenu}/>
        <SideBar
          showMenu={this.state.showMenu}
          listItemClick = { this.listItemClick }
          filterVenues = { this.filterVenues }
          filteredVenues = { this.state.filteredVenues }
          />
        <Map name={this.state.name!= undefined ? this.state.name : "FourSquare API Failed. Please check your credentials."}/>
      </div>
    );
  }
}

export default App;
