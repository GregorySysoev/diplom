import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './clientRegistration.sass';
import * as serviceTypes from '../types';
import * as orderStatuses from '../Orders/statuses';
import { v4 as uuidv4 } from 'uuid';
import CreatableSelect from 'react-select/creatable';

const ClientRegistratioin = props => {
   
    const alreadyProcessed = props.status && props.status !== orderStatuses.PENDING;

    const updateNumber = () => {
        alert('Данные обновлены');
    }

    const cancelOrder = () => {
        prompt('Отменить заказ? Введите слово "ОТМЕНА"');
    }

    return (<div>
        <div className="uk-container uk-margin-top uk-margin-bottom">
            <div className="uk-margin-top uk-margin-bottom">
                <a className="uk-link-muted" href="#">Назад, к просмотру заказов</a>
            </div>
            <p className="uk-text-bold" style={{ marginBottom: '.5em' }}>Информация о заказе</p>
            <div className="order-details">
                <p><span className="uk-text-muted">№ заказа: </span>#1</p>
                <p><span className="uk-text-muted">ФИО: </span>Константин Голуб</p>
                <p><span className="uk-text-muted">Даты проживания: </span>25.08.2020 - 27.09.2020</p>
                <p><span className="uk-text-muted">Кол-во персон: </span>2 взрослых 1 ребёнок</p>
                <p><span className="uk-text-muted">Тип номера: </span>Стандартный двухместный номер х2</p>
                <p><span className="uk-text-muted">Телефон: </span>+7 953 293 25-88</p>
                <p><span className="uk-text-muted">Почта: </span>golub@hotel.ru</p>
                <p><span className="uk-text-muted">Оплачено: </span>6480/6480</p>
                {props.serviceType === serviceTypes.FOOD && (
                    <p>
                        <span className="uk-text-muted">Размер порции: </span>
                        {`${props.portion.size} ${props.portion.unit}`}
                    </p>
                )}
                {props.serviceType === serviceTypes.SERVICE && (
                    <p><span className="uk-text-muted">Цена: </span>{props.price ? `${props.price}₽` : 'бесплатно'}</p>
                )}
            </div>
            {props.serviceType === serviceTypes.FOOD && props.options.length > 0 && (
                <>
                    <p className="uk-text-bold" style={{ marginBottom: '.5em' }}>Опции</p>
                    <div className="food-options">
                        {props.options.map(o => (
                            <p key={uuidv4()}>
                                <span className="uk-text-muted">{o.name}: </span>
                                {`${o.size} ${o.unit} (`}{o.price ? `${o.price}₽` : 'бесплатно'}{')'}
                            </p>
                        ))}
                    </div>
                    <p>
                        <span className="uk-text-muted">Цена услуги: </span>
                        {props.portion.price ? `${props.portion.price}₽` : 'бесплатно'}
                    </p>
                    <p>
                        <span className="uk-text-muted">Итоговая цена: </span>
                        {`${props.options.reduce((acc, o) => acc + o.price || 0, 0) + props.portion.price || 0}₽`}
                    </p>
                </>
            )}
            <hr />

            <div className="uk-margin">
                <label htmlFor="manager-comment">
                    <p style={{ marginBottom: '.25em' }}>
                        Номера комнат:
                    </p>
                </label>
                <div className="uk-form-controls">
                    <CreatableSelect
                        isMulti
                        placeholder="Введите номера комнат"
                        noOptionsMessage={() => 'Введите номера комнат'}
                        formatCreateLabel={value => `Добавить номер "${value}"`}
                    />
                </div>
                <div className="uk-form-controls">
                </div>
            </div>
            {!alreadyProcessed && (
                <div className="uk-margin">
                    <Button onClick={updateNumber} type="button" label="Обновить" />
                    <span id="cancel-btn"><Button onClick={cancelOrder} type="button" label="Отменить заказ" /> </span>
                </div>
            )}
        </div>
    </div>
    )
};

const portionPropShape = {
    size: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

ClientRegistratioin.propTypes = {
    serviceType: PropTypes.oneOf(Object.values(serviceTypes)).isRequired,
    room: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    serveDate: PropTypes.string.isRequired,
    orderId: PropTypes.number.isRequired,
    serviceName: PropTypes.string.isRequired,
    customerComment: PropTypes.string,
    price: PropTypes.number,
    portion: PropTypes.shape(portionPropShape),
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        ...portionPropShape,
    })).isRequired,
    status: PropTypes.oneOf(Object.values(orderStatuses)),
    managerComment: PropTypes.string,
};

ClientRegistratioin.defaultProps = {
    options: [],
};

export default ClientRegistratioin;
