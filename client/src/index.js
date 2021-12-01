import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './components/Container.js';
import App from './components/App.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Container />
    </React.StrictMode>, 
    document.getElementById('root')
);
registerServiceWorker();
