import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<>
<Provider store={store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>
    
</>
);

