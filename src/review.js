import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './css/tailwind.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';

function Review(props) {
  const data = JSON.parse(localStorage.getItem('data'));

  const [locationCordinates, setLocationCordinates] = useState({
    "lat": 37.4220579,
    "lng": -122.0840897
  });

  const getLocations = () => {
    axios.get(`/.netlify/functions/locations?query=${data.addressInput}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.candidates.length >= 0) {
          setLocationCordinates(res.data.candidates[0]['geometry']['location'])
        } else {
          alert("Something wrong has happened");
        }
      })
      .catch(e => "error loading the list listing" + e)
  }

  useEffect(async () => {
    getLocations();
  }, []);

  console.log(locationCordinates);

  return (
    <div>
      <h2 className="pt-1 lg:pt-2 text-lg xl:text-xl font-bold text-center formal-text text-gray-800">Your details have been submitted successfully ✅</h2>
      <div className="w-64 h-64">
        <Map
          google={props.google}
          zoom={12}
          containerStyle={{ position: 'relative', width: '100%', height: '100%' }}
          initialCenter={locationCordinates}
        >
        </Map>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVhVpvSSY8K_A3BE5guzc_8yuYizR77Gw'
})(Review);
