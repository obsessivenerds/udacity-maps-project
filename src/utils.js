export function load_google_maps() {
 return new Promise(function(resolve, reject) {
   // define the global callback that will run when google maps is loaded
   window.resolveGoogleMapsPromise = function() {
     // resolve the google object
     resolve(window.google);
     // delete the global callback to tidy up since it is no longer needed
     delete window.resolveGoogleMapsPromise;
   }
   // Now, Load the Google Maps API
   const script = document.createElement("script");
   const API_KEY = 'AIzaSyCzysjL8mGbRtCojx0R1QHKUPLoQ61-XQ4';
   script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
   script.async = true;
   document.body.appendChild(script);
 });
}

export function load_locations() {
  let location = 'Indianapolis, IN';
  let query = 'Brewery';
  var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=0MWI02AE4SRTIWFRSK5USP23C0OYF11ZNEQLXPOPUDQX2CQ3&client_secret=T0R0WIU5UYSY30RZS1BQDHNYZ3A4SWXTPX0524EEMQZMYYOM&v=20130815%20&limit=50&near=' + location + '&query=' + query + '';
  return fetch(apiURL).then(resp => resp.json())
}
