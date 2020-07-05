import React from "react"
import './hotelEntry.sass'
import PhotoUploader from "./PhotoUploader";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

const facilities = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
]



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
			photoIds: [],
			mainPhotoId: null,
			lastPhotoId: 0,
		}
	}

	handleChange1 = (newValue, actionMeta) => {
		console.group('Value Changed');
		console.log(newValue);
		console.log(`action: ${actionMeta.action}`);
		console.groupEnd();
	};

	handleChange = event => {
		console.log(event.target.value)
		this.setState({ [event.target.name]: event.target.value })
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
					<div>
						<p className="uk-text-bold">Укажите основную информацию о гостинице</p>
					</div>
					<form className="uk-form-horizontal" data-uk-grid>

						<div className="uk-width-2-5@m">
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-name">Название: </label>
								<div className="uk-form-controls">
									<input className="uk-input"
										id="service-name"
										type="text"
										name="name"
										autoComplete="off"
										onChange={this.handleChange}
										placeholder="" />
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-category">Кол-во звёзд: </label>
								<div className="uk-form-controls">
									<select className="uk-select"
										id="service-category"
										name="category"
										onChange={this.handleChange}>
										<option disabled selected hidden value="">Укажите кол-во звёзд</option>
										<option value="0">0</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
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
								<label className="uk-form-label" htmlFor="service-name">Удобства: </label>
								<div className="uk-form-controls">
									<Select
										isMulti
										placeholder="Введите удобства"
										options={facilities}
									/>
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-name">Важные места: </label>
								<div className="uk-form-controls">
									<CreatableSelect
										isMulti
										placeholder="Укажите важные места"
										noOptionsMessage={() => 'Укажите важные места'}
										formatCreateLabel={value => `Добавить важное место "${value}"`}
										onChange={this.handleChange1}
									/>
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-category">Регион: </label>
								<div className="uk-form-controls">
									<select className="uk-select"
										id="service-category"
										name="category"
										onChange={this.handleChange}>
										<option disabled selected hidden value="">Выберите регион</option>
										<option value="Деликатес">Дальневосточный</option>
										<option value="Вино">Центральный</option>
									</select>
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-category">Город: </label>
								<div className="uk-form-controls">
									<select className="uk-select"
										id="service-category"
										name="category"
										onChange={this.handleChange}>
										<option disabled selected hidden value="">Выберите город</option>
										<option value="Деликатес">Владивосток</option>
										<option value="Вино">Находка</option>
										<option value="Вино">Уссурийск</option>
									</select>
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-category">Район: </label>
								<div className="uk-form-controls">
									<select className="uk-select"
										id="service-category"
										name="category"
										onChange={this.handleChange}>
										<option disabled selected hidden value="">Выберите район</option>
										<option value="Деликатес">Чуркин</option>
										<option value="Вино">Эгершельд</option>
									</select>
								</div>
							</div>

							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-name">Телефон: </label>
								<div className="uk-form-controls">
									<input className="uk-input"
										id="service-name"
										type="text"
										name="name"
										autoComplete="off"
										onChange={this.handleChange}
										placeholder="" />
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-name">Email: </label>
								<div className="uk-form-controls">
									<input className="uk-input"
										id="service-name"
										type="text"
										name="name"
										autoComplete="off"
										onChange={this.handleChange}
										placeholder="" />
								</div>
							</div>
							<div>
								<a href="/bed" className="uk-button uk-button-primary" type="submit">Далее</a>
							</div>
						</div>

						<div className="uk-width-2-5@m">
							<PhotoUploader
								setMain={this.setMainPhoto}
								addPhoto={this.addPhoto}
								removePhoto={this.removePhoto}
								photoIds={this.state.photoIds}
								mainPhotoId={this.state.mainPhotoId}
								lastPhotoId={this.state.lastPhotoId}
							/>
						</div>
					</form>
				</div>
			</div>
		)
	}
}