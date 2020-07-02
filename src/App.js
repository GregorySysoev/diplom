import React from 'react'
import Header from "./components/Header"
import NewService from "./components/service/NewService/NewService"
import { BrowserRouter, Route } from 'react-router-dom';
import ServiceListPage from "./components/service/ServiceListPage";
import HotelEntry from "./components/HotelEntry/HotelEntry"
import Login from "./components/Login/Login"
import AvailableActions from './components/AvailableActions/AvailableActions';
import NewFood from "./components/service/NewFood/NewFood";
import TimeRange from "./components/service/TimeRange/TimeRange";

export default function App() {
	return (
		<div>
			<Header/>
			<BrowserRouter>
				<Route exact path='/login' component={Login}/>
				<Route exact path='/hotel' component={HotelEntry}/>
				<Route exact path='/actions' component={AvailableActions}/>
				<Route exact path="/service/list" component={ServiceListPage}/>
				<Route exact path="/service/new" component={NewService}/>
				<Route exact path="/service/new/availability" component={TimeRange}/>
				<Route exact path="/service/new/food-additionals" component={NewFood}/>
			</BrowserRouter>
		</div>
	)
}