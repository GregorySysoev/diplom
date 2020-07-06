import React, { Component } from 'react'
import Button from "../Button"

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
                        <a className="uk-link-muted" href="/discount">Назад, к указанию скидок на типы номеров</a>
                    </div>
                    <div>
                        <p className="uk-text-bold">Укажите правила, предусмотренные гостиницей</p>
                    </div>
                    <form className="uk-width-2xlarge uk-margin">
                        {this.state.timeRanges.map(range =>
                            <div key={range.id}>
                                <fieldset style={{ border: '1px dashed #ccc' }}>
                                    <div style={{ position: 'relative' }}>
                                        <h5>Правило</h5>
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
                                        <label className="uk-form-label" htmlFor="service-name">Название заголовка: </label>
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
                                        <label className="uk-form-label" htmlFor="service-description">Текст: </label>
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
                                        <label className="uk-form-label" htmlFor="service-category">№ по порядку: </label>
                                        <div className="uk-form-controls">
                                            <select className="uk-select"
                                                id="service-category"
                                                name="category"
                                                onChange={this.handleChange}
                                                defaultValue={range.id}>
                                                {this.state.timeRanges.map(r => (
                                                    <option key={r.id} value={r.id}>{r.id}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        )}
                        <div>
                            <Button type="button" label="Добавить ещё пункт правил" onClick={this.addRange} />
                        </div>
                    </form>
                    <div className="uk-margin-large-top">
                        <a className="uk-button uk-button-primary" href="/final">
                            Далее
					</a>
                    </div>
                </div>
            </div>
        )
    }
}
