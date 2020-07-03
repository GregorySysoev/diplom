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
            <div><Header />
                <div className="uk-container uk-margin-top uk-margin-bottom">
                    <div className="uk-margin-top uk-margin-bottom">
                        <a className="uk-link-muted" href="/service/new">Назад, к указанию основнйо информации</a>
                    </div>
                    <div>
                        <p className="uk-text-bold">Укажите типы спальных мест</p>
                    </div>
                    <form className="uk-form-horizontal uk-child-width-1-1 uk-child-width-1-2@s">
                        {this.state.timeRanges.map(range =>
                            <div key={range.id}>
                                <fieldset style={{ border: '1px dashed #ccc' }}>
                                    <div style={{ position: 'relative' }}>
                                        <h5>Диапазон</h5>
                                        {this.state.timeRanges.length > 1 && (
                                            <div style={{ position: 'absolute', top: '1px', right: '1px' }}>
                                                <a uk-icon="trash"
                                                    className="uk-icon-button uk-button-danger"
                                                    title="Удалить"
                                                    onClick={() => this.removeRange(range.id)} />
                                            </div>
                                        )}
                                    </div>
                                    <div data-uk-grid="">
                                        <div className="uk-margin">
                                            <label className="uk-form-label" htmlFor="begin">С</label>
                                            <div id="begin" className="uk-flex">
                                                <div className="uk-form-controls uk-flex timeRange-row">
                                                    <input className="uk-input"
                                                        name="beginHour"
                                                        value={range.beginHour}
                                                        onChange={event => this.handleChange(range.id, event.target.name, +event.target.value)}
                                                        type="number"
                                                        step={1}
                                                        min={0}
                                                        max={23} />
                                                    <span className="timeRange-label">часов</span>
                                                </div>
                                                <div className="uk-form-controls uk-flex timeRange-row">
                                                    <input className="uk-input"
                                                        name="beginMinutes"
                                                        value={range.beginMinutes}
                                                        onChange={event => this.handleChange(range.id, event.target.name, +event.target.value)}
                                                        type="number"
                                                        step={1}
                                                        min={0}
                                                        max={59} />
                                                    <span className="timeRange-label">минут</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-uk-grid="" style={{ marginTop: 0 }}>
                                        <div className="uk-margin" style={{ marginBottom: 0 }}>
                                            <label className="uk-form-label" htmlFor="end">До</label>
                                            <div id="end" className="uk-flex">
                                                <div className="uk-form-controls uk-flex timeRange-row">
                                                    <input className="uk-input"
                                                        name="endHour"
                                                        value={range.endHour}
                                                        onChange={event => this.handleChange(range.id, event.target.name, +event.target.value)}
                                                        type="number"
                                                        step={1}
                                                        min={0}
                                                        max={23} />
                                                    <span className="timeRange-label">часов</span>
                                                </div>
                                                <div className="uk-form-controls uk-flex timeRange-row">
                                                    <input className="uk-input"
                                                        name="endMinutes"
                                                        value={range.endMinutes}
                                                        onChange={event => this.handleChange(range.id, event.target.name, +event.target.value)}
                                                        type="number"
                                                        step={1}
                                                        min={0}
                                                        max={59} />
                                                    <span className="timeRange-label">минут</span>
                                                </div>
                                            </div>
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
                        <a className="uk-button uk-button-primary" href="/null">
                            Далее
					</a>
                    </div>
                </div>
            </div>
        )
    }
}