import React, { Component } from 'react';
import { Fade } from 'reactstrap';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './app.css';

class App extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired
    };
  }
  
  render() {
    return (
      <div className="App text-center">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> { this.props.title }</h1>
        </header>
        <Fade timeout={ 3000 } >
          <p className="App-intro">
            To get started, edit <code>src/components/app/index.js</code> and save to reload.
          </p>
        </Fade>
      </div>
    );
  }
}

export default App;
