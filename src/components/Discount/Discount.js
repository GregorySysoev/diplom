import React, { Component } from 'react'
import Button from "../Button"

const roomTypes = [
    {
        id: 1,
        name: 'Стандартный двухместный номер',
    },
    {
        id: 2,
        name: 'Двухместный номер Делюкс',
    },
    {
        id: 3,
        name: 'Улучшенный двухместный номер',
    },
];

export default class Discount extends Component {
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
                        <a className="uk-link-muted" href="/number">Назад, к указанию типов номеров</a>
                    </div>
                    <div>
                        <p className="uk-text-bold">Укажите скидки на типы номеров</p>
                    </div>
                    <form className="uk-width-2xlarge uk-margin">
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
                                        <label className="uk-form-label" htmlFor="type">Тип номера: </label>
                                        <div className="uk-form-controls">
                                            <select className="uk-select"
                                                id="type">
                                                <option disabled selected hidden value="">Выберите тип номера</option>
                                                {roomTypes.map(type => (
                                                    <option key={type.id} value={type.id}>{type.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="percent">Процент скидки: </label>
                                        <div className="uk-form-controls">
                                            <input className="uk-input"
                                                id="percent"
                                                name="endHour"
                                                defaultValue={10}
                                                type="number"
                                                step={1}
                                                min={1}
                                                max={100} />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="startDate">Дата начала действия скидки: </label>
                                        <div className="uk-form-controls">
                                            <input
                                                type="date"
                                                id="startDate"
                                                className="uk-input"
                                                defaultValue="2020-07-05"
                                                min="2020-07-05"
                                            />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="endDate">Дата окончания действия скидки: </label>
                                        <div className="uk-form-controls">
                                            <input
                                                type="date"
                                                id="endDate"
                                                className="uk-input"
                                                defaultValue="2020-08-05"
                                                min="2020-07-05"
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