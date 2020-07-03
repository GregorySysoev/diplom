import React, {Component} from 'react'
import Button from "../../Button"
import IngredientSelector from "./IngredientSelector";

class Options extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAlcoholic: false,
            isSpicy: false,
            calorie: '',
            isNutritional: false,
            carbohydrates: '',
            protein: '',
            fat: '',
            portions: [
                {
                    id: 1,
                    name: '',
                    size: '',
                    unit: '',
                    price: '',
                },
            ],
            lastPortionId: 1,
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

    handlePortionChange = (id, fieldName, fieldValue) => {
        this.setState(prevState => {
            const portionToChange = prevState.portions.filter(portion => portion.id === id)[0] || null;
            if (portionToChange === null) {
                return;
            }
            portionToChange[fieldName] = fieldValue;
            return { portions: prevState.portions };
        });
    }

    addPortion = () => {
        this.setState(prevState => ({
            portions: [
                ...prevState.portions,
                {
                    id: prevState.lastPortionId + 1,
                    name: '',
                    size: '',
                    unit: '',
                    price: '',
                },
            ],
            lastPortionId: prevState.lastPortionId + 1,
        }));
    }

    removePortion = id => {
        this.setState(prevState => ({
            portions: prevState.portions.filter(portion => portion.id !== id),
        }));
    }

    render() {
        return (
            <div className="uk-container uk-margin-top uk-margin-bottom">
                <div className="uk-margin-top uk-margin-bottom">
                    <a className="uk-link-muted" href="#">Назад, к доступным действиям</a>
                </div>
                <div>
                    <p className="uk-text-bold">Укажите опции</p>
                </div>
                <form className="uk-form-horizontal uk-child-width-1-2@m uk-margin-bottom" data-uk-grid="">
                    <div>
                        {this.state.portions.map(portion =>
                            <fieldset key={portion.id} style={{ border: '1px dashed #ccc' }}>
                                <div style={{ position: 'relative' }}>
                                    <h5>Опция</h5>
                                    {this.state.portions.length > 1 && (
                                        <div style={{ position: 'absolute', top: '1px', right: '1px' }}>
                                            <a uk-icon="trash"
                                               className="uk-icon-button uk-button-danger"
                                               title="Удалить"
                                               onClick={() => this.removePortion(portion.id)}/>
                                        </div>
                                    )}
                                </div>
                                <div className="uk-margin-bottom">
                                    <label className="uk-form-label">Название </label>
                                    <div className="uk-form-controls">
                                        <input type="text"
                                               className="uk-input"
                                               name="name"
                                               onChange={event => this.handlePortionChange(portion.id, event.target.name, event.target.value)}
                                               value={portion.name}
                                               min={0}/>
                                    </div>
                                </div>
                                <div className="uk-margin-bottom">
                                    <label className="uk-form-label">Размер </label>
                                    <div className="uk-form-controls">
                                        <input type="number"
                                               className="uk-input"
                                               name="size"
                                               onChange={event => this.handlePortionChange(portion.id, event.target.name, +event.target.value)}
                                               value={portion.size}
                                               step={1}
                                               min={0}/>
                                    </div>
                                </div>
                                <div className="uk-margin-bottom">
                                    <label className="uk-form-label">Единица измерения </label>
                                    <div className="uk-form-controls">
                                        <select
                                            className="uk-select"
                                            name="unit"
                                            onChange={event => this.handlePortionChange(portion.id, event.target.name, event.target.value)}
                                            value={portion.unit}
                                        >
                                            <option value="gr">Грамм</option>
                                            <option value="kg">Килограмм</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uk-margin-bottom">
                                    <label className="uk-form-label uk-margin-remove-top">Цена </label>
                                    <div className="uk-form-controls">
                                        <input type="number"
                                               className="uk-input"
                                               name="price"
                                               onChange={event => this.handlePortionChange(portion.id, event.target.name, +event.target.value)}
                                               value={portion.price}
                                               step={1}
                                               min={0}/>
                                    </div>
                                </div>
                            </fieldset>
                        )}
                        <div>
                            <Button
                                type="button"
                                label={this.state.portions.length === 0 ? 'Добавить опцию' : 'Добавить ещё опцию'}
                                onClick={this.addPortion}
                            />
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

export default Options