/* API functions written with guidance from student Forrest Walker's
walk-through playlist at https://www.youtube.com/playlist?list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP */
},

class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2"
  }

  static auth() {
    const keys = {
      client_id: "0MWI02AE4SRTIWFRSK5USP23C0OYF11ZNEQLXPOPUDQX2CQ3",
      client_secret: "T0R0WIU5UYSY30RZS1BQDHNYZ3A4SWXTPX0524EEMQZMYYOM",
      v:"20181006"
    };
    return Object.keys(keys)
    .map(key => `${key}=${keys[key]}`)
    .join("&");
  }
  static urlBuilder(urlParams) {
    if (!urlParams) {
      return "";
    }
    return Object.keys(urlParams)
    .map(key => `${key}=${urlParams[key]}`)
    .join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endPoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    };
    return fetch(
      `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`, requestData)
      .then(res => res.json());
  }
}

export default class SquareAPI {
  static search(urlParams) {
    return Helper.simpleFetch("/venues/search", "GET", urlParams)
  }
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET")
  }
  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}
