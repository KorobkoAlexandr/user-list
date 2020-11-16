import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { default as store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
    <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("app")
);
