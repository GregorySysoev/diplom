import React from "react"
import './hotelEntry.sass'
import PhotoUploader from "./PhotoUploader";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const facilities = [
	{ id: 1, name: 'Бесплатный Wi-Fi' },
	{ id: 2, name: 'Номера для некурящих' },
	{ id: 3, name: 'Терраса' },
	{ id: 4, name: 'Отопление' },
	{ id: 5, name: 'Лифт' },
	{ id: 6, name: 'Кондиционер' },
	{ id: 7, name: 'Парковка' },
	{ id: 8, name: 'Трансфер от/до аэропорта' },
	{ id: 9, name: 'Семейные номера' },
	{ id: 10, name: 'Кофеварка/чайник во всех номерах' },
	{ id: 11, name: 'Круглосуточная стойка регистрации' },
];

const regions = [
	{ id: 1, name: "Республика Адыгея" },
	{ id: 2, name: "Республика Башкортостан" },
	{ id: 3, name: "Республика Бурятия" },
	{ id: 4, name: "Республика Алтай" },
	{ id: 5, name: "Республика Дагестан" },
	{ id: 6, name: "Республика Ингушетия" },
	{ id: 7, name: "Кабардино-Балкарская Республика" },
	{ id: 8, name: "Республика Калмыкия" },
	{ id: 9, name: "Карачаево-Черкесская Республика" },
	{ id: 10, name: "Республика Карелия" },
	{ id: 11, name: "Республика Коми" },
	{ id: 12, name: "Республика Марий Эл" },
	{ id: 13, name: "Республика Мордовия" },
	{ id: 14, name: "Республика Саха (Якутия)" },
	{ id: 15, name: "Республика Северная Осетия" },
	{ id: 16, name: "Республика Татарстан" },
	{ id: 17, name: "Республика Тыва" },
	{ id: 18, name: "Удмуртская Республика" },
	{ id: 19, name: "Республика Хакасия" },
	{ id: 20, name: "Чеченская Республика" },
	{ id: 21, name: "Чувашская Республика" },
	{ id: 22, name: "Алтайский край" },
	{ id: 23, name: "Краснодарский край" },
	{ id: 24, name: "Красноярский край" },
	{ id: 25, name: "Приморский край" },
	{ id: 26, name: "Ставропольский край" },
	{ id: 27, name: "Хабаровский край" },
	{ id: 28, name: "Амурская область" },
	{ id: 29, name: "Архангельская область" },
	{ id: 30, name: "Астраханская область" },
	{ id: 31, name: "Белгородская область" },
	{ id: 32, name: "Брянская область" },
	{ id: 33, name: "Владимирская область" },
	{ id: 34, name: "Волгоградская область" },
	{ id: 35, name: "Вологодская область" },
	{ id: 36, name: "Воронежская область" },
	{ id: 37, name: "Ивановская область" },
	{ id: 38, name: "Иркутская область" },
	{ id: 39, name: "Калининградская область" },
	{ id: 40, name: "Калужская область" },
	{ id: 41, name: "Камчатский край" },
	{ id: 42, name: "Кемеровская область" },
	{ id: 43, name: "Кировская область" },
	{ id: 44, name: "Костромская область" },
	{ id: 45, name: "Курганская область" },
	{ id: 46, name: "Курская область" },
	{ id: 47, name: "Ленинградская область" },
	{ id: 48, name: "Липецкая область" },
	{ id: 49, name: "Магаданская область" },
	{ id: 50, name: "Московская область" },
	{ id: 51, name: "Мурманская область" },
	{ id: 52, name: "Нижегородская область" },
	{ id: 53, name: "Новгородская область" },
	{ id: 54, name: "Новосибирская область" },
	{ id: 55, name: "Омская область" },
	{ id: 56, name: "Оренбургская область" },
	{ id: 57, name: "Орловская область" },
	{ id: 58, name: "Пензенская область" },
	{ id: 59, name: "Пермский край" },
	{ id: 60, name: "Псковская область" },
	{ id: 61, name: "Ростовская область" },
	{ id: 62, name: "Рязанская область" },
	{ id: 63, name: "Самарская область" },
	{ id: 64, name: "Саратовская область" },
	{ id: 65, name: "Сахалинская область" },
	{ id: 66, name: "Свердловская область" },
	{ id: 67, name: "Смоленская область" },
	{ id: 68, name: "Тамбовская область" },
	{ id: 69, name: "Тверская область" },
	{ id: 70, name: "Томская область" },
	{ id: 71, name: "Тульская область" },
	{ id: 72, name: "Тюменская область" },
	{ id: 73, name: "Ульяновская область" },
	{ id: 74, name: "Челябинская область" },
	{ id: 75, name: "Забайкальский край" },
	{ id: 76, name: "Ярославская область" },
	{ id: 77, name: "г. Москва" },
	{ id: 78, name: "Санкт-Петербург" },
	{ id: 79, name: "Еврейская автономная область" },
	{ id: 83, name: "Ненецкий автономный округ" },
	{ id: 86, name: "Ханты-Мансийский автономный округ" },
	{ id: 87, name: "Чукотский автономный округ" },
	{ id: 89, name: "Ямало-Ненецкий автономный округ" },
	{ id: 91, name: "Республика Крым" },
	{ id: 92, name: "Севастополь" },
	{ id: 99, name: "Иные территории" },
];

const cities = [
	{ id: 1, name: "Абакан", regionId: 19 },
	{ id: 2, name: "Азов", regionId: 61 },
	{ id: 3, name: "Александров", regionId: 33 },
	{ id: 4, name: "Алексин", regionId: 71 },
	{ id: 5, name: "Альметьевск", regionId: 16 },
	{ id: 6, name: "Анапа", regionId: 23 },
	{ id: 7, name: "Ангарск", regionId: 38 },
	{ id: 8, name: "Анжеро-Судженск", regionId: 42 },
	{ id: 9, name: "Апатиты", regionId: 51 },
	{ id: 10, name: "Арзамас", regionId: 52 },
	{ id: 11, name: "Армавир", regionId: 23 },
	{ id: 12, name: "Арсеньев", regionId: 25 },
	{ id: 13, name: "Артем", regionId: 25 },
	{ id: 14, name: "Архангельск", regionId: 29 },
	{ id: 15, name: "Асбест", regionId: 66 },
	{ id: 16, name: "Астрахань", regionId: 30 },
	{ id: 17, name: "Ачинск", regionId: 55 },
	{ id: 18, name: "Балаково", regionId: 64 },
	{ id: 19, name: "Балахна", regionId: 52 },
	{ id: 20, name: "Великие Луки", regionId: 60 },
	{ id: 21, name: "Великий Новгород", regionId: 53 },
	{ id: 22, name: "Верхняя Пышма", regionId: 66 },
	{ id: 23, name: "Видное", regionId: 50 },
	{ id: 24, name: "Владивосток", regionId: 25 },
	{ id: 25, name: "Владикавказ", regionId: 15 },
	{ id: 26, name: "Владимир", regionId: 33 },
	{ id: 27, name: "Волгоград", regionId: 34 },
	{ id: 28, name: "Волгодонск", regionId: 61 },
	{ id: 29, name: "Волжск", regionId: 12 },
	{ id: 30, name: "Волжский", regionId: 34 },
	{ id: 31, name: "Вологда", regionId: 35 },
	{ id: 32, name: "Вольск", regionId: 64 },
	{ id: 33, name: "Воркута", regionId: 11 },
	{ id: 34, name: "Воронеж", regionId: 36 },
	{ id: 35, name: "Воскресенск", regionId: 50 },
	{ id: 36, name: "Воткинск", regionId: 18 },
	{ id: 37, name: "Всеволожск", regionId: 47 },
	{ id: 38, name: "Выборг", regionId: 47 },
	{ id: 39, name: "Выкса", regionId: 52 },
	{ id: 40, name: "Вязьма", regionId: 67 },
];

const districts = [
	{ id: 1, name: 'Ленинский', cityId: 24 },
	{ id: 2, name: 'Первомайский', cityId: 24 },
	{ id: 3, name: 'Первореченский', cityId: 24 },
	{ id: 4, name: 'Советский', cityId: 24 },
	{ id: 5, name: 'Фрунзенский', cityId: 24 },
];

const nameComparator = (a, b) => {
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	// a must be equal to b
	return 0;
};

export default class HotelEntry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			type: 'food',
			name: '',
			description: '',
			regionId: '',
			cityId: '',
			districtId: '',
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
										options={facilities.sort(nameComparator).map(f => ({
											value: f.id,
											label: f.name,
										}))}
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
										name="regionId"
										onChange={this.handleChange}
									>
										<option disabled selected hidden value="">Выберите регион</option>
										{
											regions
												.sort(nameComparator)
												.map(r => <option id={r.id} value={r.id}>{r.name}</option>)
										}
									</select>
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-category">Город: </label>
								<div className="uk-form-controls">
									<select className="uk-select"
										id="service-category"
										name="cityId"
										disabled={!this.state.regionId}
										onChange={this.handleChange}
									>
										<option disabled selected hidden value="">
											{this.state.regionId ? 'Выберите город' : null}
										</option>
										{this.state.regionId &&
											cities
												.filter(c => c.regionId == this.state.regionId)
												.sort(nameComparator)
												.map(c => <option id={c.id} value={c.id}>{c.name}</option>)
										}
									</select>
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-category">Район: </label>
								<div className="uk-form-controls">
									<select className="uk-select"
										id="service-category"
										name="districtId"
										disabled={!this.state.cityId}
										onChange={this.handleChange}
									>
										<option disabled selected hidden value="">
											{this.state.cityId ? 'Выберите район' : null}
										</option>
										{this.state.cityId &&
											districts
												.filter(d => d.cityId == this.state.cityId)
												.sort(nameComparator)
												.map(d => <option id={d.id} value={d.id}>{d.name}</option>)
										}
									</select>
								</div>
							</div>

							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-name">Телефон: </label>
								<div className="uk-form-controls">
									<PhoneInput
										onlyCountries={['ru']}
										country={'ru'}
										value=""
										onChange={() => {}}
										placeholder="+7 (800) 555-35-35"
										disableDropdown={true}
									/>
								</div>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="service-name">Email: </label>
								<div className="uk-form-controls">
									<input className="uk-input"
										id="service-name"
										type="email"
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