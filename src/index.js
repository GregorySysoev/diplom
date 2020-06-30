import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './site.sass'
import 'uikit/dist/js/uikit'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'
import SetData from './data/setters/SetData';
import UnsetData from './data/setters/UnsetData';
import ServiceList from './components/service/ServiceList';


const store = createStore(
	(state = {}, action) => state,
	JSON.parse(localStorage.getItem('data')),
)

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Route exact path="/data/set" component={SetData}/>
				<Route exact path="/data/unset" component={UnsetData}/>
				<Route exact path="/list" component={ServiceList}/>
				<Route exact path="/" component={App}/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
