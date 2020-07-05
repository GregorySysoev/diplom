import React, { Component } from 'react'
import Button from "../Button"
import './bed.sass'
import Header from '../Header'

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
                },
            ],
            lastId: 1,
        }
    }

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
                        <a className="uk-link-muted" href="/service/new">Назад, к указанию основной информации</a>
                    </div>
                    <div>
                        <p className="uk-text-bold">Укажите типы спальных мест</p>
                    </div>
                    <form className="uk-form-horizontal uk-child-width-1-1 uk-child-width-1-2@s">
                        {this.state.timeRanges.map(range =>
                            <div key={range.id}>
                                <fieldset style={{ border: '1px dashed #ccc' }}>
                                    <div style={{ position: 'relative' }}>
                                        <h5>Тип спального места</h5>
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
                                        <label className="uk-form-label" htmlFor="service-category">Тип: </label>
                                        <div className="uk-form-controls">
                                            <select className="uk-select"
                                                id="service-category"
                                                name="category"
                                                onChange={this.handleChange}>
                                                <option disabled selected hidden value="">укажите "тип взрослое/десткое"</option>
                                                <option value="0">Взрослое</option>
                                                <option value="1">Детское</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="uk-margin">

                                        <label className="uk-form-label" htmlFor="service-category">Вместимость: </label>
                                        <div className="uk-form-controls">
                                            <select className="uk-select"
                                                id="service-category"
                                                name="category"
                                                onChange={this.handleChange}>
                                                <option disabled selected hidden value="">сколько поместиться людей</option>
                                                <option value="0">1</option>
                                                <option value="1">2</option>
                                            </select>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        )}
                        <div>
                            <Button type="button" label="Добавить ещё тип спального места" onClick={this.addRange} />
                        </div>
                    </form>
                    <div className="uk-margin-large-top">
                        <a className="uk-button uk-button-primary" href="/number">
                            Далее
					</a>
                    </div>
                </div>
            </div>
        )
    }
}