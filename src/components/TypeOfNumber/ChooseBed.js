import React, { Component } from 'react'
import Button from "../Button"
import '../Bed/bed.sass'
import * as bedType from '../Bed/types'
import Select from 'react-select'


const predefinedBeds = [
    {
        id: 1,
        name: 'Двухспальная кровать',
        type: bedType.ADULT,
        adultCapacity: 2,
        kidCapacity: 1,
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
        kidCapacity: 1,
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

export default class ChooseBed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            beds: [
                {
                    id: 1,
                    name: '',
                    type: null,
                    adultCapacity: 1,
                    kidCapacity: 1,
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

    _createBed = (id, name = '', type = null, adultCapacity = 0, kidCapacity = 1) =>
        ({ id, name, type, adultCapacity, kidCapacity })

    removeBed = id => {
        this.setState(prevState => ({
            beds: prevState.beds.filter(bed => bed.id !== id),
        }));
    }

    render() {
        return (
            <div className="uk-container uk-margin-top uk-margin-bottom">
                {this.state.beds.map(bed =>
                    <div key={bed.id}>
                        <fieldset style={{ border: '1px dashed #ccc' }}>
                            <div style={{ position: 'relative' }}>
                                <h5>Спальное место</h5>
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
                                <label className="uk-form-label" htmlFor="type">Тип: </label>
                                <div className="uk-form-controls">
                                <Select
                                                options={groupedBeds}
                                                formatGroupLabel={formatGroupLabel}
                                                placeholder="Введите тип спального места"
                                                noOptionsMessage={() => 'Такого типа спального места не найдено'}
                                            />
                                        
                                </div>
                            </div>
                                    <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="kidCapacity">Количество: </label>
                                <div className="uk-form-controls">
                                    <input
                                        id="kidCapacity"
                                        className="uk-input"
                                        name="kidCapacity"
                                        value={bed.kidCapacity}
                                        onChange={event => this.handleChange(bed.id, event.target.name, +event.target.value)}
                                        type="number"
                                        step={1}
                                        min={1}
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                )}
                <div>
                    <Button type="button" label="Добавить ещё спальное место" onClick={this.addBed} />
                </div>
            </div>
        )
    }
}
