import React, { Component } from 'react'
import Button from "../Button"
import './bed.sass'
import * as bedType from './types'

export default class Bed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            beds: [
                {
                    id: 1,
                    name: '',
                    type: null,
                    adultCapacity: 0,
                    kidCapacity: 0,
                },
            ],
            lastId: 1,
        }
    }

    handleChange = (id, fieldName, fieldValue) => {
        this.setState(prevState => {
            const bedToChange = prevState.beds.filter(bed => bed.id === id)[0] || null;
            if (bedToChange === null) {
                return;
            }
            bedToChange[fieldName] = fieldValue;
            return { beds: prevState.beds };
        });
    }

    addBed = () => {
        this.setState(prevState => ({
            beds: [
                ...prevState.beds,
                this._createBed(prevState.lastId + 1),
            ],
            lastId: prevState.lastId + 1,
        }));
    }

    _createBed = (id, name = '', type = null, adultCapacity = 0, kidCapacity = 0) =>
        ({ id, name, type, adultCapacity, kidCapacity })

    removeBed = id => {
        this.setState(prevState => ({
            beds: prevState.beds.filter(bed => bed.id !== id),
        }));
    }

    render() {
        return (
            <div>
                <div className="uk-container uk-margin-top uk-margin-bottom">
                    <div className="uk-margin-top uk-margin-bottom">
                        <a className="uk-link-muted" href="/hotel">Назад, к указанию основной информации</a>
                    </div>
                    <div>
                        <p className="uk-text-bold">Укажите типы спальных мест</p>
                    </div>
                    <form className="uk-form-horizontal uk-child-width-1-1 uk-child-width-1-2@s">
                        {this.state.beds.map(bed =>
                            <div key={bed.id}>
                                <fieldset style={{ border: '1px dashed #ccc' }}>
                                    <div style={{ position: 'relative' }}>
                                        <h5>Тип спального места</h5>
                                        {this.state.beds.length > 1 && (
                                            <div style={{ position: 'absolute', top: '1px', right: '1px' }}>
                                                <a uk-icon="trash"
                                                    className="uk-icon-button uk-button-danger"
                                                    title="Удалить"
                                                    onClick={() => this.removeBed(bed.id)} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="name">Название: </label>
                                        <div className="uk-form-controls">
                                            <input
                                                className="uk-input"
                                                id="name"
                                                type="text"
                                                name="name"
                                                autoComplete="off"
                                                value={bed.name}
                                                onChange={event => this.handleChange(bed.id, event.target.name, event.target.value)}
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="type">Тип: </label>
                                        <div className="uk-form-controls">
                                            <select
                                                className="uk-select"
                                                id="type"
                                                name="type"
                                                value={bed.type}
                                                onChange={event => this.handleChange(bed.id, event.target.name, +event.target.value)}
                                            >
                                                <option disabled selected hidden value={null}>Укажите тип</option>
                                                <option value={bedType.ADULT}>Взрослое</option>
                                                <option value={bedType.KID}>Детское</option>
                                            </select>
                                        </div>
                                    </div>

                                    {bed.type && (
                                        <>
                                            {bed.type === bedType.ADULT && (
                                                <div className="uk-margin">
                                                    <label className="uk-form-label" htmlFor="adultCapacity">Вместимость взрослых: </label>
                                                    <div className="uk-form-controls">
                                                        <input
                                                            id="adultCapacity"
                                                            className="uk-input"
                                                            name="adultCapacity"
                                                            type="number"
                                                            value={bed.adultCapacity}
                                                            onChange={event => this.handleChange(bed.id, event.target.name, +event.target.value)}
                                                            step={1}
                                                            min={0}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="uk-margin">
                                                <label className="uk-form-label" htmlFor="kidCapacity">Вместимость детей: </label>
                                                <div className="uk-form-controls">
                                                    <input
                                                        id="kidCapacity"
                                                        className="uk-input"
                                                        name="kidCapacity"
                                                        value={bed.kidCapacity}
                                                        onChange={event => this.handleChange(bed.id, event.target.name, +event.target.value)}
                                                        type="number"
                                                        step={1}
                                                        min={0}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </fieldset>
                            </div>
                        )}
                        <div>
                            <Button type="button" label="Добавить ещё тип спального места" onClick={this.addBed} />
                        </div>
                    </form>
                    <div className="uk-margin-large-top">
                        <a className="uk-button uk-button-primary" href="/number">Далее</a>
                    </div>
                </div>
            </div>
        )
    }
}
