import React, { Component } from 'react';
import { load_google_maps, load_locations } from "../utils";
import SquareAPI from "../API/FourSquareAPI";
/*global google*/

export default ({name}) => <div id="map">{name}</div>
