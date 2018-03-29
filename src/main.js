import React from 'react'; 
import ReactDOM from 'react-dom';
import App from "./components/App.js";
// Webpack picks up the styles from the webpack config
// and parses it through the loaders.
import Style from '../public/style.css' 

ReactDOM.render(<App />, document.getElementById('root')); 

