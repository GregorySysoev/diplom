import React from 'react'
import HotelEntry from "./components/HotelEntry/HotelEntry"
import Login from "./components/Login/Login"
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import AvailableActions from './components/AvailableActions/AvailableActions';

export default function App() {
	return (
		<BrowserRouter>
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/hotel' component={HotelEntry}/>
            <Route path='/actions' component={AvailableActions}/>
        </Switch>
    </BrowserRouter>
	)
}