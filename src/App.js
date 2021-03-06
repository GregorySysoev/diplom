import React from 'react'
import Header from "./components/Header"
import NewService from "./components/service/NewService/NewService"
import { BrowserRouter, Route } from 'react-router-dom';
import ServiceListPage from "./components/service/ServiceListPage";
import HotelEntry from "./components/HotelEntry/HotelEntry"
import Login from "./components/Login/Login"
import AvailableActions from './components/AvailableActions/AvailableActions';
import Bed from "./components/Bed/Bed"
import NewFood from "./components/service/NewFood/NewFood";
import TimeRange from "./components/service/TimeRange/TimeRange";
import Options from "./components/service/NewFood/Options";
import ServiceOrderListPage from "./components/service/order/ServiceOrderListPage";
import ServiceOrderDetailsPage from "./components/service/order/ServiceOrderDetailsPage";
import FoodOrderDetailsPage from "./components/service/order/FoodOrderDetailsPage";
import * as orderStatuses from './components/service/order/statuses';
import NullPage from "./components/NullPage";
import Rule from "./components/Rule/Rule"
import TypeOfNumber from "./components/TypeOfNumber/TypeOfNumber"
import Discount from "./components/Discount/Discount"
import FinalWindow from "./components/FinalWindow/FinalWindow"
import Orders from "./components/Orders/Orders"
import ClientRegistration from "./components/ClientRegistration/ClientRegistration"

const ProcessedServiceOrderDetailsPage = () =>
	<ServiceOrderDetailsPage
		status={orderStatuses.COMPLETED}
	/>;

const ProcessedFoodOrderDetailsPage = () =>
	<FoodOrderDetailsPage
		status={orderStatuses.COMPLETED}
	/>;

export default function App() {
	return (
		<div>
			<Header/>
			<BrowserRouter>
				<Route exact path='/' component={Login}/>
				<Route exact path='/login' component={Login}/>
				<Route exact path='/hotel' component={HotelEntry}/>
				<Route exact path='/actions' component={AvailableActions}/>
				<Route exact path='/bed' component={Bed}/>
				<Route exact path='/number' component={TypeOfNumber}/>
				<Route exact path='/discount' component={Discount}/>
				<Route exact path='/rule' component={Rule}/>
				<Route exact path='/final' component={FinalWindow}/>
				<Route exact path='/orders' component={Orders}/>
				<Route exact path='/client_registration' component={ClientRegistration}/>

				<Route exact path="/service/list" component={ServiceListPage}/>
				<Route exact path="/service/new" component={NewService}/>
				<Route exact path="/service/new/availability" component={TimeRange}/>
				<Route exact path="/service/new/food-additionals" component={NewFood}/>
				<Route exact path="/service/new/food-options" component={Options}/>
				<Route exact path="/service/order/list" component={ServiceOrderListPage}/>
				<Route exact path="/service/order/details-service" component={ServiceOrderDetailsPage}/>
				<Route exact path="/service/order/details-service/processed" component={ProcessedServiceOrderDetailsPage}/>
				<Route exact path="/service/order/details-food" component={FoodOrderDetailsPage}/>
				<Route exact path="/service/order/details-food/processed" component={ProcessedFoodOrderDetailsPage}/>
				<Route path="/null" component={NullPage}/>
			</BrowserRouter>
		</div>
	)
}