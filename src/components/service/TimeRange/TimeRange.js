import React, {Component} from 'react'
import Button from "../../Button"
import './timeRange.sass'

class TimeRange extends Component {
	constructor(props) {
		super(props)
		this.state = {
			beginHour: '',
			beginMinutes: '',
			endHour: '',
			endMinutes: '',
		}
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	render() {
		return (
			<div className="uk-container uk-margin-top uk-margin-bottom">
				<div className="uk-margin-top uk-margin-bottom">
					<a className="uk-link-muted" href="#">Назад, к доступным действиям</a>
				</div>
				<div>
					<p className="uk-text-bold">Укажите, в какое время услуга будет доступна</p>
				</div>
				<form className="uk-form-horizontal uk-child-width-1-1 uk-child-width-1-2@m">
					<div data-uk-grid="">
						<div className="uk-margin">
							<label className="uk-form-label" htmlFor="begin">С</label>
							<div id="begin" className="uk-flex">
								<div className="uk-form-controls uk-flex timeRange-row">
									<input className="uk-input"
										   name="beginHour"
										   onChange={this.handleChange}
										   type="number"/>
									<span className="timeRange-label">часов</span>
								</div>
								<div className="uk-form-controls uk-flex timeRange-row">
									<input className="uk-input"
										   name="beginMinutes"
										   onChange={this.handleChange}
										   type="number"/>
									<span className="timeRange-label">минут</span>
								</div>
							</div>
						</div>
					</div>
					<div data-uk-grid="">
						<div className="uk-margin">
							<label className="uk-form-label" htmlFor="end">До</label>
							<div id="end" className="uk-flex">
								<div className="uk-form-controls uk-flex timeRange-row">
									<input className="uk-input"
										   name="endHour"
										   onChange={this.handleChange}
										   type="number"/>
									<span className="timeRange-label">часов</span>
								</div>
								<div className="uk-form-controls uk-flex timeRange-row">
									<input className="uk-input"
										   name="endMinutes"
										   onChange={this.handleChange}
										   type="number"/>
									<span className="timeRange-label">минут</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<Button type="submit" label="Добавить диапазон"/>
					</div>
				</form>
				<div className="uk-margin-large-top">
					<Button label="Далее"/>
				</div>
			</div>
		)
	}
}

export default TimeRange