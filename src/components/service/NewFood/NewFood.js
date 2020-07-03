import React, {Component} from 'react'
import Button from "../../Button"
import IngredientSelector from "./IngredientSelector";
import PortionUnitSelector from "./PortionUnitSelector";

class NewFood extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isAlcoholic: false,
			isSpicy: false,
			calorie: '',
			isNutritional: false,
			carbohydrates: '',
			protein: '',
			fat: '',
			portions: [],
			lastPortionId: 0,
		}
	}

	handleChange = event => {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		this.setState({
			[name]: value,
		})
	}

	handlePortionChange = (id, fieldName, fieldValue) => {
		this.setState(prevState => {
			const portionToChange = prevState.portions.filter(portion => portion.id === id)[0] || null;
			if (portionToChange === null) {
				return;
			}
			portionToChange[fieldName] = fieldValue;
			return { portions: prevState.portions };
		});
	}

	addPortion = () => {
		this.setState(prevState => ({
			portions: [
				...prevState.portions,
				{
					id: prevState.lastPortionId + 1,
					size: '',
					price: '',
				},
			],
			lastPortionId: prevState.lastPortionId + 1,
		}));
	}

	removePortion = id => {
		this.setState(prevState => ({
			portions: prevState.portions.filter(portion => portion.id !== id),
		}));
	}

	render() {
		return (
			<div className="uk-container uk-margin-top uk-margin-bottom">
				<div className="uk-margin-top uk-margin-bottom">
					<a className="uk-link-muted" href="#">Назад, к доступным действиям</a>
				</div>
				<div>
					<p className="uk-text-bold">Введите дополнительные данные</p>
				</div>
				<form className="uk-form-horizontal uk-child-width-1-2@m uk-margin-bottom" data-uk-grid="">
					<div>
						<div className="uk-margin-bottom">
							<label className="uk-form-label">Ингредиенты</label>
							<div className="uk-form-controls">
								<IngredientSelector/>
							</div>
						</div>
						<div className="uk-margin-bottom">
							<div className="uk-margin uk-grid-large uk-child-width-auto uk-grid">
								<div className="uk-margin-bottom">
									<label>Наличие алкоголя <input className="uk-checkbox"
																   type="checkbox"
																   name="isAlcoholic"
																   checked={this.state.isAlcoholic}
																   onChange={this.handleChange}/>
									</label>
								</div>
								<div>
									<label>Наличие острого <input className="uk-checkbox"
																  type="checkbox"
																  name="isSpicy"
																  checked={this.state.isSpicy}
																  onChange={this.handleChange}/>
									</label>
								</div>
							</div>
						</div>
						<div className="uk-margin-bottom">
							<label className="uk-form-label">Калорийность </label>
							<div className="uk-form-controls">
								<input type="number"
									   className="uk-input"
									   name="calorie"
									   onChange={this.handleChange}
									   value={this.state.calorie}/>
							</div>
						</div>
						<div className="uk-margin-bottom">
							<div className="uk-margin uk-grid-large uk-child-width-auto uk-grid">
								<div className="uk-margin-bottom">
									<label>Указание пищевой ценности (на 100 гр продукта)
										{' '}<input className="uk-checkbox"
											type="checkbox"
											name="isNutritional"
											checked={this.state.isNutritional}
											onChange={this.handleChange}/>
									</label>
								</div>
								<div className="uk-child-width-1-1 uk-child-width-1-3@m uk-grid"
									 hidden={!this.state.isNutritional}>
									<div className="uk-margin-bottom">
										<label className="uk-form-label">Белки (гр)</label>
										<div className="uk-form-controls">
											<input type="number"
												   className="uk-input"
												   name="protein"
												   onChange={this.handleChange}
												   value={this.state.protein}
												   step={0.1}
												   min={0}/>
										</div>
									</div>
									<div className="uk-margin-bottom">
										<label className="uk-form-label">Жиры (гр)</label>
										<div className="uk-form-controls">
											<input type="number"
												   className="uk-input"
												   name="fat"
												   onChange={this.handleChange}
												   value={this.state.fat}
												   step={0.1}
												   min={0}/>
										</div>
									</div>
									<div className="uk-margin-bottom">
										<label className="uk-form-label">Углеводы (гр)</label>
										<div className="uk-form-controls">
											<input type="number"
												   className="uk-input"
												   name="carbohydrates"
												   onChange={this.handleChange}
												   value={this.state.carbohydrates}
												   step={0.1}
												   min={0}/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						{this.state.portions.map(portion =>
							<fieldset key={portion.id} style={{ border: '1px dashed #ccc' }}>
								<div style={{ position: 'relative' }}>
									<h5>Порция</h5>
									<div style={{ position: 'absolute', top: '1px', right: '1px' }}>
										<a uk-icon="trash"
										   className="uk-icon-button uk-button-danger"
										   title="Удалить"
										   onClick={() => this.removePortion(portion.id)}/>
									</div>
								</div>
								<div className="uk-margin-bottom">
									<label className="uk-form-label">Размер </label>
									<div className="uk-form-controls">
										<input type="number"
											   className="uk-input"
											   name="size"
											   onChange={event => this.handlePortionChange(portion.id, event.target.name, +event.target.value)}
											   value={portion.size}
											   step={1}
											   min={0}/>
									</div>
								</div>
								<div className="uk-margin-bottom">
									<label className="uk-form-label">Единица измерения </label>
									<div className="uk-form-controls">
										<PortionUnitSelector/>
									</div>
								</div>
								<div className="uk-margin-bottom">
									<label className="uk-form-label uk-margin-remove-top">Цена </label>
									<div className="uk-form-controls">
										<input type="number"
											   className="uk-input"
											   name="price"
											   onChange={event => this.handlePortionChange(portion.id, event.target.name, +event.target.value)}
											   value={portion.price}
											   step={1}
											   min={0}/>
									</div>
								</div>
							</fieldset>
						)}
						<div>
							<Button
								type="button"
								label={this.state.portions.length === 0 ? 'Добавить порцию' : 'Добавить ещё порцию'}
								onClick={this.addPortion}
							/>
						</div>
					</div>
				</form>
				<div>
					<a className="uk-button uk-button-primary" href="/service/new/food-options">
						Далее
					</a>
				</div>
			</div>
		)
	}
}

export default NewFood