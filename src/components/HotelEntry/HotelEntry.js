import React from "react"
import './hotelEntry.sass'
import Header from "../Header"

export default class HotelEntry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			type: 'food',
			name: '',
			description: '',
			category: '',
			price: '',	
			hoursOfExecution: '',
			minutesOfExecution: '',
			hoursOfWaiting: '',
			minutesOfWaiting: '',
			photo: '',
		}
	}

	handleChange = event => {
		console.log(event.target.value)
		this.setState({ [event.target.name]: event.target.value })
	}

	render() {
		return (
			<div>
				<div className="uk-container uk-margin-top uk-margin-bottom">
					<div className="uk-margin-top uk-margin-bottom">
						<a className="uk-link-muted" href="#">Назад, к доступным действиям</a>
					</div>
					<form className="uk-form-horizontal" data-uk-grid>
						<div className="service-type uk-width-1-5@m">
							<span className="uk-padding-small">Выберите тип услуги</span>
							<div className="uk-margin uk-child-width-auto uk-flex uk-flex-column "
								onChange={this.handleChange}>
								<label className="uk-padding-small">
									<input className="uk-radio"
										type="radio"
										name="type"
										defaultChecked
										value="food" />
									<span> Блюдо или напиток </span>
								</label>
								<label className="uk-padding-small">
									<input className="uk-radio"
										type="radio"
										name="type"
										value="service" />
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
										placeholder="" />
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-description">Описание: </label>
								<div className="uk-form-controls">
									<textarea className="uk-textarea"
										id="service-description"
										name="description"
										onChange={this.handleChange}
										style={{ minHeight: '100px' }}
										placeholder="" />
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-category">Категория: </label>
								<div className="uk-form-controls">
									<select className="uk-select"
										id="service-category"
										name="category"
										onChange={this.handleChange}>
										<option disabled selected hidden value="">Выберите категорию</option>
										<option value="Деликатес">Деликатес</option>
										<option value="Вино">Вино</option>
									</select>
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-price">Стоимость: </label>
								<div className="uk-form-controls">
									<input className="uk-input"
										id="service-price"
										type="number"
										name="price"
										onChange={this.handleChange}
										placeholder="" />
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-hoursOfExecution">Время вып.: </label>
								<div className="uk-form-controls uk-flex">
									<input className="uk-input uk-margin-small-right"
										id="service-hoursOfExecution"
										type="number"
										name="hoursOfExecution"
										onChange={this.handleChange} />
									<span className="uk-form-label uk-margin-small-right">часов</span>
									<input className="uk-input uk-margin-small-right"
										type="number"
										name="minutesOfExecution"
										onChange={this.handleChange} />
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
										onChange={this.handleChange} />
									<span className="uk-form-label uk-margin-small-right">часов</span>
									<input className="uk-input uk-margin-small-right"
										type="number"
										name="minutesOfWaiting"
										onChange={this.handleChange} />
									<span className="uk-form-label">минут</span>
								</div>
							</div>
						</div>
						<div className="uk-width-2-5@m">
							<div className="service-photoChooser">
								<button className="uk-button uk-button-primary">Загрузить фото</button>
							</div>
						</div>
						<div>
							<button className="uk-button uk-button-primary" type="submit">Далее
						</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}