import React from 'react'
import './newservice.sass'
import ServicePhotoUploader from './ServicePhotoUploader';
import categories from '../categories';
import * as serviceType from '../types';

export default class NewService extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			type: serviceType.FOOD,
			name: '',
			description: '',
			category: '',
			price: '',
			hoursOfExecution: '',
			minutesOfExecution: '',
			hoursOfWaiting: '',
			minutesOfWaiting: '',
			photoIds: [],
			mainPhotoId: null,
			lastPhotoId: 0,
		}
	}

	handleChange = event => {
		console.log(event.target.value)
		this.setState({[event.target.name]: event.target.value})
	}

	addPhoto = id => {
		this.setState(prevState => {
			const newState = {
				photoIds: [...prevState.photoIds, id],
				lastPhotoId: id,
			};
			if (prevState.photoIds.length === 0) {
				newState.mainPhotoId = id;
			}
			return newState;
		});
	}

	removePhoto = id => {
		this.setState(prevState => {
			const newState = { photoIds: prevState.photoIds.filter(photoId => photoId !== id) };
			if (prevState.mainPhotoId === id) {
				newState.mainPhotoId = prevState.photoIds[0] || null;
			}
			return newState;
		});
	}

	setMainPhoto = id => {
		this.setState({ mainPhotoId: id });
	}

	render() {
		return (
			<div className="uk-container uk-margin-top uk-margin-bottom">
				<div className="uk-margin-top uk-margin-bottom">
					<a className="uk-link-muted" href="/service/list">Назад</a>
				</div>
				<form className="uk-form-horizontal" data-uk-grid>
					<div className="service-type uk-width-1-5@m">
						<span className="uk-padding-small">Выберите тип услуги</span>
						<div className="uk-margin uk-child-width-auto uk-flex uk-flex-column "
							 onChange={event => this.setState({ [event.target.name]: +event.target.value })}>
							<label className="uk-padding-small">
								<input className="uk-radio"
									   type="radio"
									   name="type"
									   defaultChecked
									   value={serviceType.FOOD}/>
								<span> Блюдо или напиток </span>
							</label>
							<label className="uk-padding-small">
								<input className="uk-radio"
									   type="radio"
									   name="type"
									   value={serviceType.SERVICE}/>
								<span> Сервис </span>
							</label>
						</div>
					</div>
					<div className="uk-width-2-5@m">
						<div className="uk-margin">
							<label className="uk-form-label" htmlFor="service-name">Название: </label>
							<div className="uk-form-controls">
								<input className="uk-input"
									   id="service-name"
									   type="text"
									   name="name"
									   onChange={this.handleChange}
									   placeholder=""/>
							</div>
						</div>
						<div className="uk-margin">
							<label className="uk-form-label" htmlFor="service-description">Описание: </label>
							<div className="uk-form-controls">
									<textarea className="uk-textarea"
											  id="service-description"
											  name="description"
											  onChange={this.handleChange}
											  style={{minHeight: '100px'}}
											  placeholder=""/>
							</div>
						</div>
						<div className="uk-margin">
							<label className="uk-form-label" htmlFor="service-category">Категория: </label>
							<div className="uk-form-controls">
								<select className="uk-select"
										id="service-category"
										name="category"
										onChange={this.handleChange}
										defaultValue="">
									<option disabled hidden value="">Выберите категорию</option>
									{Object.values(categories).sort().map((name, index) => (
										<option key={index} value={name}>{name}</option>
									))}
								</select>
							</div>
						</div>
						{this.state.type !== 'food' && (
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-price">Цена (₽): </label>
								<div className="uk-form-controls">
									<input className="uk-input"
										   id="service-price"
										   type="number"
										   name="price"
										   onChange={this.handleChange}
										   placeholder=""
										   step={0.01}/>
								</div>
							</div>
						)}
						<div className="uk-margin">
							<label className="uk-form-label" htmlFor="service-hoursOfExecution">Время вып.: </label>
							<div className="uk-form-controls uk-flex">
								<input className="uk-input uk-margin-small-right"
									   id="service-hoursOfExecution"
									   type="number"
									   name="hoursOfExecution"
									   onChange={this.handleChange}/>
								<span className="uk-form-label uk-margin-small-right">часов</span>
								<input className="uk-input uk-margin-small-right"
									   type="number"
									   name="minutesOfExecution"
									   onChange={this.handleChange}/>
								<span className="uk-form-label">минут</span>
							</div>
						</div>
						<div className="uk-margin">
							<label className="uk-form-label" htmlFor="service-hoursOfWaiting">Время ожид.: </label>
							<div className="uk-form-controls uk-flex">
								<input className="uk-input uk-margin-small-right"
									   id="service-hoursOfWaiting"
									   type="number"
									   name="hoursOfWaiting"
									   onChange={this.handleChange}/>
								<span className="uk-form-label uk-margin-small-right">часов</span>
								<input className="uk-input uk-margin-small-right"
									   type="number"
									   name="minutesOfWaiting"
									   onChange={this.handleChange}/>
								<span className="uk-form-label">минут</span>
							</div>
						</div>
					</div>
					<div className="uk-width-2-5@m">
						<ServicePhotoUploader
							setMain={this.setMainPhoto}
							addPhoto={this.addPhoto}
							removePhoto={this.removePhoto}
							photoIds={this.state.photoIds}
							mainPhotoId={this.state.mainPhotoId}
							lastPhotoId={this.state.lastPhotoId}
							serviceType={this.state.type}
						/>
					</div>
					<div>
						<a className="uk-button uk-button-primary" href="/service/new/availability">
							Далее
						</a>
					</div>
				</form>
			</div>
		)
	}
}