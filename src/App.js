import React from 'react'
import HotelEntry from "./components/HotelEntry/HotelEntry"
import Entry from "./components/Entry/Entry"
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

export default function App() {
	return (
		<BrowserRouter>
        <Switch>
            <Route path='/login' component={Entry}/>
            <Route path='/hotel' component={HotelEntry}/>
        </Switch>
    </BrowserRouter>
	)
}