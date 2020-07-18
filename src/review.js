import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './css/tailwind.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

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

  const { firstName, lastName, educationLevel, heightInches, heightFeet, dateOfBirth,
    monthOfBirth,
    yearOfBirth, addressInput, email, phoneNumber } = data;

  return (
    <div className="w-full xl:max-w-3xl max-w-xs">
      <h2 className="pt-1 lg:pt-2 text-lg xl:text-xl font-bold text-center formal-text text-gray-800">Your details have been submitted successfully ✅</h2>
      <div className="flex flex-wrap -mx-3 mb-2 mt-5">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl text-right">Name</p>
        </div>
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl font-bold text-left">{firstName} {lastName}</p>
        </div>
      </div>

      {(educationLevel !== null && educationLevel !== "") &&
        <div className="flex flex-wrap -mx-3 mb-2 mt-5">
          <div className="w-1/2 px-3 mb-6 md:mb-0">
            <p className="text-gray-800 text-xl text-right">Education Level</p>
          </div>
          <div className="w-1/2 px-3 mb-6 md:mb-0">
            <p className="text-gray-800 text-xl font-bold text-left">{educationLevel}</p>
          </div>
        </div>
      }

      {heightFeet !== null &&
        <div className="flex flex-wrap -mx-3 mb-2 mt-5">
          <div className="w-1/2 px-3 mb-6 md:mb-0">
            <p className="text-gray-800 text-xl text-right">Height</p>
          </div>
          <div className="w-1/2 px-3 mb-6 md:mb-0">
            <p className="text-gray-800 text-xl font-bold text-left"> {heightFeet} Feet  {heightInches !== null && `and ${heightInches} inches`}  </p>
          </div>
        </div>
      }

      <div className="flex flex-wrap -mx-3 mb-2 mt-5">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl text-right">Date of birth</p>
        </div>
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl font-bold text-left">{dateOfBirth.padStart(2,'0')}-{monthOfBirth}-{yearOfBirth}</p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2 mt-5">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl text-right">Address</p>
        </div>
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl font-bold text-left">{addressInput}</p>
        </div>
      </div>


      <div className="flex flex-wrap -mx-3 mb-2 mt-5">
        <div className="w-full md:w-1/2 px-3 mb-0 md:mb-0">
          <p className="text-gray-800 text-xl md:text-right text-center">Address on map view</p>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 flex justify-center">
          <div className="w-64 h-64">
            <Map
              google={props.google}
              zoom={12}
              containerStyle={{ position: 'relative', width: '100%', height: '100%' }}
              initialCenter={locationCordinates}
              center={locationCordinates}
            >
              <Marker position={locationCordinates} />
            </Map>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2 mt-5">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl text-right">Email</p>
        </div>
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl font-bold text-left">{email}</p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2 mt-5">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl text-right">Phone Number</p>
        </div>
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl font-bold text-left">{phoneNumber}</p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2 mt-5">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl text-right">Terms of service</p>
        </div>
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <p className="text-gray-800 text-xl font-bold text-left">Accepted</p>
        </div>
      </div>

    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVhVpvSSY8K_A3BE5guzc_8yuYizR77Gw'
})(Review);
