import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import axios from 'axios';
import moment from 'moment';

import ReCAPTCHA from "react-google-recaptcha";

import './css/tailwind.css';

import Autosuggest from 'react-autosuggest';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhone(phoneNum) {
    const re = /^\(?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(phoneNum);
}

function Form() {
    const history = useHistory();
    const [addressInput, setAddressInput] = useState("");
    const [addressOptions, setAddressOptions] = useState([]);

    const getSuggestionValue = suggestion => suggestion.description;
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

    const [firstName, setFirstName] = useState("");
    const isFirstNameValid = firstName.length <= 40;
    const [lastName, setLastName] = useState("");
    const isLastNameValid = lastName.length <= 40;
    const [educationLevel, setEducationLevel] = useState("");

    const [heightFeet, setHeightFeet] = useState("");
    const [heightInches, setHeightInches] = useState("");

    const [dateOfBirth, setDateOfBirth] = useState(null);
    let isDateOfBirthValid;
    if (dateOfBirth === null) {
        isDateOfBirthValid = true;
    }
    else if (isNaN(parseInt(dateOfBirth))) {
        isDateOfBirthValid = (dateOfBirth === "")
    } else {
        isDateOfBirthValid = (parseInt(dateOfBirth) > 0 && parseInt(dateOfBirth) <= 31)
    }

    const [monthOfBirth, setMonthOfBirth] = useState(null);
    const [yearOfBirth, setYearOfBirth] = useState(null);
    let isYearOfBirthValid = true;

    let isValidDate = true;

    if (yearOfBirth !== null && dateOfBirth !== null) {
        isValidDate = moment(`${dateOfBirth.padStart(2,'0')}-${monthOfBirth}-${yearOfBirth}`, 'DD-MMMM-YYYY', true).isValid();
        isDateOfBirthValid = isValidDate;
        isYearOfBirthValid = isValidDate;
    }

    const [email, setEmail] = useState(null);
    const [confirmationEmail, setConfirmationEmail] = useState(null);
    const [isEmailValid, setEmailValidity] = useState(true);
    const [isConfirmationEmailValid, setConfirmationEmailValidity] = useState(true);

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [isPhoneNumberValid, setPhoneNumberValidity] = useState(true);

    if (!isEmailValid && validateEmail(email)) {
        setEmailValidity(true);
    }

    if (!isConfirmationEmailValid && (email === confirmationEmail)) {
        setConfirmationEmailValidity(true);
    }

    const [isRecaptachaCompleted, setRecaptachaCompleted] = useState(true);

    const [isTOSChecked, setTOSFlag] = useState(false);

    const submitForm = (event) => {
        if (isDateOfBirthValid && isYearOfBirthValid && isEmailValid && isConfirmationEmailValid && isValidDate && isFirstNameValid && isLastNameValid && isTOSChecked) {
            console.log("Data is valid");
            localStorage.setItem('data', JSON.stringify({
                firstName,
                lastName,
                educationLevel,
                heightFeet,
                heightInches,
                dateOfBirth,
                monthOfBirth,
                yearOfBirth,
                addressInput,
                email,
                confirmationEmail,
                phoneNumber,
                isTOSChecked
            }));
            history.push(`/review?${Date.now()}`);
        } else {
            console.log("Data is not valid");
            return false;
        }
    }


    return (

        <form className="w-full xl:max-w-3xl max-w-xs">
            <h4 className="formal-text text-sm font-semibold"> Personal Details </h4>
            <div className="flex flex-wrap -mx-3 mb-3 pt-3">
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                        First Name
              <span className="text-red-600">&nbsp;*</span>
                    </label>
                    <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border " + (isFirstNameValid ? "border-gray-200" : "border-red-500") + " rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"} id="first-name" type="text" placeholder="Jane" value={firstName} onChange={event => setFirstName(event.target.value)} />
                    <p className={"text-xs italic " + (isFirstNameValid ? "text-gray-600" : "text-red-500")}>{isFirstNameValid ? "Upto 40 characters are allowed." : "Please reduce the character length to 40 characters"}</p>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                        Last Name
              <span className="text-red-600">&nbsp;*</span>
                    </label>
                    <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border " + (isFirstNameValid ? "border-gray-200" : "border-red-500") + " rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"} id="last-name" type="text" placeholder="Doe" value={lastName} onChange={event => setLastName(event.target.value)} />
                    <p className={"text-xs italic " + (isLastNameValid ? "text-gray-600" : "text-red-500")}>{isLastNameValid ? "Upto 40 characters are allowed." : "Please reduce the character length to 40 characters"}</p>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="education-level">
                        Education-level
                <span className="text-gray-600 text-xs">&nbsp;(Optional)</span>
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="education-level" onChange={event => setEducationLevel(event.target.value)} value={educationLevel}>
                            <option></option>
                            <option>High School</option>
                            <option>College</option>
                            <option>Graduate studies</option>
                            <option>Ph.D</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 md:w-1/6 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="height-feet">
                        Height
                <span className="text-gray-600 text-xs">&nbsp;(Optional)</span>
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="height-feet" type="number" placeholder="6" value={heightFeet} onChange={event => setHeightFeet(event.target.value)} />
                    <p className="text-gray-600 text-xs text-left italic">Feet</p>
                </div>
                <div className="w-1/2 md:w-1/6 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="height-inches">
                        &nbsp;
                </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="height-inches" type="number" placeholder="00" value={heightInches} onChange={event => setHeightInches(event.target.value)} />
                    <p className="text-gray-600 text-xs text-left italic">Inches</p>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/4 px-3 mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date-of-birth">
                        Date-of-birth
                <span className="text-red-600">&nbsp;*</span>
                    </label>
                    <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border " + (isDateOfBirthValid ? "border-gray-200" : "border-red-500") + " rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"} id="date-of-birth" type="number" placeholder="01" value={dateOfBirth} onChange={event => setDateOfBirth(event.target.value)} />
                    <p className={"text-xs italic " + (isDateOfBirthValid ? "text-gray-600" : "text-red-500")}>{isDateOfBirthValid ? "Date" : "Please enter a valid date"}</p>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 invisible" htmlFor="month-of-birth">
                        Month
              </label>
                    <div className="relative">
                        <select className={"appearance-none block w-full bg-gray-200 text-gray-700 border " + (isValidDate ? "border-gray-200" : "border-red-500") + " rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"} id="month-of-birth" value={monthOfBirth} onChange={event => setMonthOfBirth(event.target.value)}>
                            <option></option>
                            <option>January</option>
                            <option>February</option>
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
                    <p className={"text-xs italic " + (isValidDate ? "text-gray-600" : "text-red-500")}>{isDateOfBirthValid ? "Month" : "Please enter a valid month"}</p>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 invisible" htmlFor="year-of-birth">
                        Year
              </label>
                    <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border " + (isYearOfBirthValid ? "border-gray-200" : "border-red-500") + " rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"} type="number" placeholder="1992" value={yearOfBirth} onChange={event => setYearOfBirth(event.target.value)} />
                    <p className={"text-xs italic " + (isYearOfBirthValid ? "text-gray-600" : "text-red-500")}>{isYearOfBirthValid ? "Year" : "Please enter a valid year"}</p>
                </div>
            </div>



            <h4 className="formal-text text-sm font-semibold pt-8"> Contact Details </h4>

            <div className="flex flex-wrap -mx-3 mb-6 pt-4">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                        Address
                <span className="text-red-600">&nbsp;*</span>
                    </label>
                    <Autosuggest
                        id="address"
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
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                        Email
              <span className="text-red-600">&nbsp;*</span>
                    </label>
                    <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border " + (isEmailValid ? "border-gray-200" : "border-red-500") + " rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"} id="email" type="email" placeholder="Jane.doe@email.com" value={email} onChange={event => setEmail(event.target.value)} onBlur={event => setEmailValidity(validateEmail(email))} />
                    <p className={"text-xs italic " + (isEmailValid ? "text-gray-600" : "text-red-500")}>{isEmailValid ? "We won't send any spam or share your email with others." : "Please enter a valid email ex: jane.doe@email.com"}</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email-confirmation">
                        Confirm Email
              <span className="text-red-600">&nbsp;*</span>
                    </label>
                    <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border " + (isConfirmationEmailValid ? "border-gray-200" : "border-red-500") + " rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"} id="email-confirmation" type="email" placeholder="Jane.doe@email.com" value={confirmationEmail} onChange={
                        event => setConfirmationEmail(event.target.value)} onBlur={event => setConfirmationEmailValidity(email === confirmationEmail)} />
                    <p className={"text-xs italic " + (isConfirmationEmailValid ? "text-gray-600" : "text-red-500")}>{isConfirmationEmailValid ? "" : "Both emails don't match"}</p>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone-number">
                        Phone number
              <span className="text-red-600">&nbsp;*</span>
                    </label>
                    <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border " + (isPhoneNumberValid ? "border-gray-200" : "border-red-500") + " rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"} id="phone-number" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} onBlur={event => setPhoneNumberValidity(validatePhone(phoneNumber))} type="phone" placeholder="415-0000" />
                    <p className={"text-xs italic " + (isPhoneNumberValid ? "text-gray-600" : "text-red-500")}>{isPhoneNumberValid ? "We won't spam you with marketing calls" : "Please enter a valid phone number with 7 digits"}</p>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="w-full block text-gray-700 font-bold">
                        <input className="mr-2 leading-tight" type="checkbox" checked={isTOSChecked} onChange={
                        event => setTOSFlag(event.target.checked)}/>
                        <span className="text-md">
                            I agree to the <span className="text-blue-500 underline cursor-pointer">terms of service</span>
                        </span>
                    </label>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <ReCAPTCHA
                        sitekey="6LffubIZAAAAAE0i8SJCPGDamFlHh7NwrNr4vnwA"
                        onChange={event => setRecaptachaCompleted(true)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <button class={"bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none " + (isRecaptachaCompleted ? "focus:shadow-outline  hover:bg-blue-700" : "cursor-not-allowed")} type="button" onClick={submitForm}>
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Form;
