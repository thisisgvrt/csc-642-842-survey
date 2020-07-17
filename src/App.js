import React, { useState } from 'react';
import axios from 'axios';

import './css/tailwind.css';

import Autosuggest from 'react-autosuggest';

function App() {
  const [addressInput, setAddressInput] = useState("");
  const [addressOptions, setAddressOptions] = useState([]);

  const getSuggestions = value => {
    return addressOptions;
  };
  const getSuggestionValue = suggestion => suggestion.description;
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.description}
    </div>
  );

  const inputProps = {
    placeholder: '1600 Amphitheatre Parkway, Mountain View, CA, USA',
    value: addressInput,
    onChange: (event, { newValue }) => setAddressInput(newValue)
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    axios.get(`/.netlify/functions/places?query=${value}`)
      .then((res) => {
        console.log(res.data.predictions)
        setAddressOptions(res.data.predictions);
      })
      .catch(e => "error loading the list listing" + e)
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setAddressOptions([])
  };

  return (
    <div className="pt-2 lg:pt-5">
      <h1 className="text-lg xl:text-2xl font-bold text-center formal-text text-gray-800">CSC 642 Summer 2020 Individual Assignment - Raviteja Guttula</h1>
      <h2 className="pt-1 lg:pt-3 text-lg xl:text-xl font-bold text-center formal-text text-gray-800">Data survey form</h2>
      <div className="flex justify-center pt-4 lg:pt-5">
        <form className="w-full xl:max-w-3xl max-w-xs">
          <h4 className="formal-text text-sm font-semibold"> Personal Details </h4>
          <div className="flex flex-wrap -mx-3 mb-6 pt-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
              <span className="text-red-600">&nbsp;*</span>
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
              <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              <span className="text-red-600">&nbsp;*</span>
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Education-level
                <span className="text-gray-600 text-xs">&nbsp;(Optional)</span>
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>High School</option>
                  <option>College</option>
                  <option>Geaduate studies</option>
                  <option>Ph.D</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-1/2 md:w-1/6 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birthYear">
                Height
                <span className="text-gray-600 text-xs">&nbsp;(Optional)</span>
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="birthYear" type="number" placeholder="6" />
              <p className="text-gray-600 text-xs text-left italic">Feet</p>
            </div>
            <div className="w-1/2 md:w-1/6 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birthYear">
                &nbsp;
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="birthYear" type="number" placeholder="00" />
              <p className="text-gray-600 text-xs text-left italic">Inches</p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Date-of-birth
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="01" />
              <p className="text-gray-600 text-xs font-italic text-left italic">Date</p>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 invisible" for="grid-state">
                Month
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>January</option>
                  <option>Febraury</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
              <p className="text-gray-600 text-xs font-italic italic text-left">Month</p>
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 invisible" htmlFor="birthYear">
                Year
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="birthYear" type="number" placeholder="1992" />
              <p className="text-gray-600 text-xs font-italic italic text-left">Year</p>
            </div>
          </div>



          <h4 className="formal-text text-sm font-semibold pt-3"> Contact Details </h4>

          <div className="flex flex-wrap -mx-3 mb-6 pt-4">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address">
                Address
                <span className="text-red-600">&nbsp;*</span>
              </label>
              <Autosuggest
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                suggestions={addressOptions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
              <p className="text-gray-600 text-xs italic">Just enter the street address.</p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Email
              <span className="text-red-600">&nbsp;*</span>
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
              <p className="text-gray-600 text-xs italic">We won't send any spam or share your email with others.</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Confirm Email
              <span className="text-red-600">&nbsp;*</span>
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Phone number
              <span className="text-red-600">&nbsp;*</span>
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="phone" placeholder="415-0000" />
              <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="w-full block text-gray-700 font-bold">
                <input class="mr-2 leading-tight" type="checkbox" />
                <span class="text-md">
                  I agree to the <span className="text-blue-500 underline cursor-pointer">terms of service</span>
                </span>
              </label>
            </div>
          </div>


        </form>
      </div>
    </div>
  );
}

export default App;
