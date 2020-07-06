import React, { Component } from 'react'
import Button from "../Button"
import Select from 'react-select'
import * as bedType from '../Bed/types'
import ChooseBed from './ChooseBed'

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

const predefinedBeds = [
    {
        id: 1,
        name: 'Двухспальная кровать',
        type: bedType.ADULT,
        adultCapacity: 2,
        kidCapacity: 2,
    },
    {
        id: 2,
        name: 'Односпальная кровать',
        type: bedType.ADULT,
        adultCapacity: 1,
        kidCapacity: 1,
    },
    {
        id: 3,
        name: 'Детская кровать',
        type: bedType.KID,
        adultCapacity: 0,
        kidCapacity: 1,
    },
];

const enteredBeds = [
    {
        id: 4,
        name: 'Очень большая двуспальная кровать',
        type: bedType.ADULT,
        adultCapacity: 2,
        kidCapacity: 3,
    },
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

const mapBedToString = bed => {
    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }

    let typeString = '';
    if (bed.type === bedType.ADULT) {
        typeString = 'взрослое';
    } else if (bed.type === bedType.KID) {
        typeString = 'детское'
    }
    const adultCapacitySuffix = getNoun(bed.adultCapacity, 'взрослый', 'взрослых', 'взрослых');
    const kidCapacitySuffix = getNoun(bed.kidCapacity, 'ребёнок', 'детей', 'детей');

    const adultString = bed.type === bedType.ADULT
        ? `${bed.adultCapacity} ${adultCapacitySuffix},`
        : '';

    return `${bed.name} (${typeString}, вместимость: ${adultString} ${bed.kidCapacity} ${kidCapacitySuffix})`;
};

const groupedBeds = [
    {
        label: 'Спальные места, введённые вами',
        options: enteredBeds
            .sort(nameComparator)
            .map(b => ({
                value: b.id,
                label: mapBedToString(b),
            })),
    },
    {
        label: 'Предопределённые спальные места',
        options: predefinedBeds
            .sort(nameComparator)
            .map(b => ({
                value: b.id,
                label: mapBedToString(b),
            })),
    },
];

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};
const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

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
                        <a className="uk-link-muted" href="/bed">Назад, к указанию типов спальных мест</a>
                    </div>
                    <div>
                        <p className="uk-text-bold">Укажите типы номеров</p>
                    </div>
                    <form className="uk-width-2xlarge uk-margin">
                        {this.state.timeRanges.map(range =>
                            <div key={range.id}>
                                <fieldset style={{ border: '2px dashed #aaa' }}>
                                    <div style={{ position: 'relative' }}>
                                        <h4>Тип номера</h4>
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
                                        <label className="uk-form-label" htmlFor="name">Название: </label>
                                        <div className="uk-form-controls">
                                            <input className="uk-input"
                                                id="name"
                                                type="text"
                                                name="name"
                                                autoComplete="off"
                                                onChange={this.handleChange}
                                                placeholder="" />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="price">Цена за сутки: </label>
                                        <div className="uk-form-controls">
                                            <input className="uk-input"
                                                id="price"
                                                type="number"
                                                min={0}
                                                step={1}
                                                defaultValue={0}
                                                name="price"
                                                autoComplete="off"
                                                onChange={this.handleChange}
                                                placeholder="" />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label">Удобства: </label>
                                        <div className="uk-form-controls">
                                            <Select
                                                isMulti
                                                placeholder="Введите удобства"
                                                noOptionsMessage={() => 'Такого удобства не найдено'}
                                                options={facilities.sort(nameComparator).map(f => ({
                                                    value: f.id,
                                                    label: f.name,
                                                }))}
                                            />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        {/*<label className="uk-form-label">Типы спальных мест: </label>*/}
                                        <ChooseBed />
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="roomsCount">Количество номеров: </label>
                                        <div className="uk-form-controls">
                                            <input className="uk-input"
                                                id="roomsCount"
                                                type="number"
                                                min={1}
                                                step={1}
                                                defaultValue={1}
                                                name="roomsCount"
                                                autoComplete="off"
                                                onChange={this.handleChange}
                                                placeholder="" />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="availableRoomsCount">Количество свободных номеров: </label>
                                        <div className="uk-form-controls">
                                            <input className="uk-input"
                                                id="availableRoomsCount"
                                                name="availableRoomsCount"
                                                type="number"
                                                min={0}
                                                step={1}
                                                defaultValue={0} />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <label htmlFor="withFreeCancellation">
                                            Есть возможность бесплатной отмены брони:
                                        </label>
                                        {' '}<input id="withFreeCancellation" className="uk-checkbox" type="checkbox" />
                                    </div>
                                </fieldset>
                            </div>
                        )}
                        <div>
                            <Button type="button" label="Добавить ещё тип номера" onClick={this.addRange} />
                        </div>
                    </form>
                    <div className="uk-margin-large-top">
                        <a className="uk-button uk-button-primary" href="/discount">
                            Далее
					</a>
                    </div>
                </div>
            </div>
        )
    }
}