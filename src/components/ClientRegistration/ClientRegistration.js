import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './styles.sass';
import * as serviceTypes from '../types';
import * as orderStatuses from '../Orders/statuses';
import { v4 as uuidv4 } from 'uuid';

const ClientRegistratioin = props => {
    // props = [
    //     number = '#123',
    //     fio = 'Сысоев Григорий Михайлович',
    //     dates = '25.08.2020 - 27.09.2020',
    //     persons = '2 взр. 0 дет.',
    //     type = 'Стандарт',
    //     phone = '88005553535',
    //     mail = 'user@mail.ru',
    //     pay = '33000/33000',
    // ]

    const alreadyProcessed = props.status && props.status !== orderStatuses.PENDING;

    return (<div>
        <div className="uk-container uk-margin-top uk-margin-bottom">
            <div className="uk-margin-top uk-margin-bottom">
                <a className="uk-link-muted" href="#">Назад, к просмотру заказов</a>
            </div>
            <p className="uk-text-bold" style={{ marginBottom: '.5em' }}>Информация о заказе</p>
            <div className="order-details">
                <p><span className="uk-text-muted">№ заказа: </span>#123</p>
                <p><span className="uk-text-muted">ФИО: </span>Сысоев Григорий Михайлович</p>
                <p><span className="uk-text-muted">Даты проживания: </span>25.08.2020 - 27.09.2020</p>
                <p><span className="uk-text-muted">Кол-во персон: </span>2 взр. 0 дет.</p>
                <p><span className="uk-text-muted">Тип номера: </span>Стандарт</p>
                <p><span className="uk-text-muted">Телефон: </span>88005553535</p>
                <p><span className="uk-text-muted">Почта: </span>user@mail.ru</p>
                <p><span className="uk-text-muted">Оплачено: </span>33000/33000</p>
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
                        Номер комнаты:
                    </p>
                </label>
                <div className="uk-form-controls">
                    <input className="uk-input"
                        id="service-name"
                        type="text"
                        name="name"
                        autoComplete="off"
                        placeholder="" />
                </div>
                <div className="uk-form-controls">
                </div>
            </div>
            {!alreadyProcessed && (
                <div className="uk-margin">
                <Button type="button" label="Обновить" />
                    <Button type="button" label="Отменить заказ" />
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
