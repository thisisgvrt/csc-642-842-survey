import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './css/tailwind.css';

import Form from './form';
import Review from './review';

function App() {
  return (
    <Router>
      <div className="pt-2 lg:pt-5">
        <h1 className="text-lg xl:text-2xl font-bold text-center formal-text text-gray-800">CSC 642 Summer 2020 Individual Assignment - Raviteja Guttula</h1>
        <h2 className="pt-1 lg:pt-3 text-lg xl:text-xl font-bold text-center formal-text text-gray-800">Data survey form</h2>
        <div className="flex justify-center pt-4 lg:pt-5">
          <Switch>
            <Route exact path="/" component={Form} />
            <Route path="/review" component={Review} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
