import React, {Component} from 'react'
import Button from "../../Button"

class NewFood extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ingredients: '',
			isAlcoholic: false,
			isSpicy: false,
			calorie: '',
			isNutritional: false,
			carbohydrates: '',
			protein: '',
			fat: '',
			size: '',
			units: '',
			price: '',
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
							<label className="uk-form-label">Ингридиенты</label>
							<div className="uk-form-controls">
								<select className="uk-select" name="ingredients" onChange={this.handleChange}
										value={this.state.ingredients}>
									<option>Option 01</option>
									<option>Option 02</option>
									<option>Option 03</option>
								</select>
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
									<label>Указание пищевой ценности <input className="uk-checkbox"
																			type="checkbox"
																			name="isNutritional"
																			checked={this.state.isNutritional}
																			onChange={this.handleChange}/>
									</label>
								</div>
								<div className="uk-child-width-1-1 uk-child-width-1-3@m uk-grid"
									 hidden={!this.state.isNutritional}>
									<div className="uk-margin-bottom">
										<label className="uk-form-label">Углеводы </label>
										<div className="uk-form-controls">
											<input type="number"
												   className="uk-input"
												   name="carbohydrates"
												   onChange={this.handleChange}
												   value={this.state.carbohydrates}/>
										</div>
									</div>
									<div className="uk-margin-bottom">
										<label className="uk-form-label">Жиры </label>
										<div className="uk-form-controls">
											<input type="number"
												   className="uk-input"
												   name="fat"
												   onChange={this.handleChange}
												   value={this.state.fat}/>
										</div>
									</div>
									<div className="uk-margin-bottom">
										<label className="uk-form-label">Белки </label>
										<div className="uk-form-controls">
											<input type="number"
												   className="uk-input"
												   name="protein"
												   onChange={this.handleChange}
												   value={this.state.protein}/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="uk-margin-bottom">
							<label className="uk-form-label">Порция </label>
							<div className="uk-form-controls">
								<input type="number"
									   className="uk-input"
									   name="size"
									   onChange={this.handleChange}
									   value={this.state.size}/>
							</div>
						</div>
						<div className="uk-margin-bottom">
							<label className="uk-form-label">Единицы </label>
							<div className="uk-form-controls">
								<select className="uk-select" name="units" onChange={this.handleChange}
										value={this.state.units}>
									<option value="gr">Грамм</option>
									<option value="kg">Килограмм</option>
								</select>
							</div>
						</div>
						<div className="uk-margin-bottom">
							<label className="uk-form-label uk-margin-remove-top">Цена в рублях </label>
							<div className="uk-form-controls">
								<input type="number"
									   className="uk-input"
									   name="price"
									   onChange={this.handleChange}
									   value={this.state.price}/>
							</div>
						</div>
						<div>
							<Button label="Добавить ещё порцию"/>
						</div>
					</div>
				</form>
				<div>
					<Button label="Далее"/>
				</div>
			</div>
		)
	}
}

export default NewFood