import React, { Component } from 'react'
import Button from "../Button"
import Header from '../Header'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TypesOfNumber = [
    { value: 'chocolate', label: 'Wi-fi' },
    { value: 'strawberry', label: 'Телефон' },
    { value: 'vanilla', label: 'Кондиционер' }
]

export default class Bed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeRanges: [
                {
                    id: 1,
                    beginHour: 0,
                    beginMinutes: 0,
                    endHour: 23,
                    endMinutes: 59,
                    lastId: 1,
                },
            ],
            startDate: new Date(),
            endDate: new Date()
        }

    }


    handleChangeStart = date => {
        this.setState({
            startDate: date
        });
    };

    handleChangeEnd = date => {
        this.setState({
            endDate: date
        });
    };

    handleChange = (id, fieldName, fieldValue) => {
        this.setState(prevState => {
            const rangeToChange = prevState.timeRanges.filter(range => range.id === id)[0] || null;
            if (rangeToChange === null) {
                return;
            }
            rangeToChange[fieldName] = fieldValue;
            return { timeRanges: prevState.timeRanges };
        });
    }

    addRange = () => {
        this.setState(prevState => ({
            timeRanges: [
                ...prevState.timeRanges,
                this._createRange(prevState.lastId + 1, 0, 0, 0, 0),
            ],
            lastId: prevState.lastId + 1,
        }));
    }

    _createRange = (id, beginHour, beginMinutes, endHour, endMinutes) => {
        return { id, beginHour, beginMinutes, endHour, endMinutes };
    }

    removeRange = id => {
        this.setState(prevState => ({
            timeRanges: prevState.timeRanges.filter(range => range.id !== id),
        }));
    }

    render() {
        return (
            <div>
                <div className="uk-container uk-margin-top uk-margin-bottom">
                    <div className="uk-margin-top uk-margin-bottom">
                        <a className="uk-link-muted" href="/service/new">Назад, к указанию типов номеров</a>
                    </div>
                    <div>
                        <p className="uk-text-bold">Укажите скидки на типы номеров</p>
                    </div>
                    <form className="uk-form-horizontal uk-child-width-1-1 uk-child-width-1-2@s">
                        {this.state.timeRanges.map(range =>
                            <div key={range.id}>
                                <fieldset style={{ border: '1px dashed #ccc' }}>
                                    <div style={{ position: 'relative' }}>
                                        <h5>Скидка на тип номера</h5>
                                        {this.state.timeRanges.length > 1 && (
                                            <div style={{ position: 'absolute', top: '1px', right: '1px' }}>
                                                <a uk-icon="trash"
                                                    className="uk-icon-button uk-button-danger"
                                                    title="Удалить"
                                                    onClick={() => this.removeRange(range.id)} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="service-category">Тип номера: </label>
                                        <div className="uk-form-controls">
                                            <select className="uk-select"
                                                id="service-category"
                                                name="category"
                                                onChange={this.handleChange}>
                                                <option disabled selected hidden value="">выберите тип номера</option>
                                                <option value="0">Эконом</option>
                                                <option value="1">Стандарт</option>
                                                <option value="2">Премиум</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="service-category">Процент скидки: </label>
                                        <div className="uk-form-controls">
                                            <input className="uk-input"
                                                name="endHour"
                                                value={range.endHour}
                                                onChange={event => this.handleChange(range.id, event.target.name, +event.target.value)}
                                                type="number"
                                                step={1}
                                                min={1}
                                                max={100} />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="service-category">Дата начала: </label>
                                        <div className="uk-form-controls">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleChangeStart}
                                                selectsStart
                                            />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="service-category">Дата конца: </label>
                                        <div className="uk-form-controls">
                                            <DatePicker
                                                selected={this.state.endDate}
                                                onChange={this.handleChangeEnd}
                                                selectsEnd
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        )}
                        <div>
                            <Button type="button" label="Добавить ещё скидку на тип номера" onClick={this.addRange} />
                        </div>
                    </form>
                    <div className="uk-margin-large-top">
                        <a className="uk-button uk-button-primary" href="/rule">
                            Далее
					</a>
                    </div>
                </div>
            </div>
        )
    }
}