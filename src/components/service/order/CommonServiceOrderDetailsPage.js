import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './styles.sass';
import * as serviceTypes from '../types';
import * as orderStatuses from './statuses';
import { v4 as uuidv4 } from 'uuid';

const CommonServiceOrderDetailsPage = props => {
    const [currentStatus, setCurrentStatus] = React.useState(orderStatuses.COMPLETED);

    const handleOrderStatusChange = event => {
        setCurrentStatus(+event.target.value);
    };

    const alreadyProcessed = props.status && props.status !== orderStatuses.PENDING;

    const getOnePortionPrice = () => {
        const optionsTotalPrice = props.options.reduce((acc, o) => acc + o.price || 0, 0);
        return props.portion.price + optionsTotalPrice;
    };
    const getFoodTotalPrice = () => {
        return getOnePortionPrice() * props.portionCount;
    };

    return (
        <div className="uk-container uk-margin-top uk-margin-bottom">
            <div className="uk-margin-top uk-margin-bottom">
                <a className="uk-link-muted" href="/service/order/list">Назад, к доступным действиям</a>
            </div>
            <p className="uk-text-bold" style={{ marginBottom: '.5em' }}>Информация о заказанной услуге</p>
            <div className="order-details">
                <p><span className="uk-text-muted">Комната: </span>{props.room}</p>
                <p><span className="uk-text-muted">Дата заказа: </span>{props.orderDate}</p>
                <p><span className="uk-text-muted">Указанная дата: </span>{props.serveDate || <i>ближайшее время</i>}</p>
                <p><span className="uk-text-muted">Номер заказа: </span>{`№${props.orderId}`}</p>
                <p><span className="uk-text-muted">Название услуги: </span>{props.serviceName}</p>
                {props.serviceType === serviceTypes.FOOD && (
                    <>
                        <p>
                            <span className="uk-text-muted">Размер порции: </span>
                            {`${props.portion.size} ${props.portion.unit}`}
                        </p>
                        <p><span className="uk-text-muted">Количество порций: </span>{props.portionCount}</p>
                    </>
                )}
                <p>
                    <span className="uk-text-muted">Комментарий: </span>
                    {props.customerComment ? props.customerComment : <i className="uk-text-muted">пусто</i>}
                </p>
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
                        <span className="uk-text-muted">Итоговая цена: </span>
                        {props.portion.price
                            ? (props.portionCount > 1 ? `${getOnePortionPrice()}₽ x ${props.portionCount} = ${getFoodTotalPrice()}₽` : `${getOnePortionPrice()}₽`)
                            : 'бесплатно'}
                    </p>
                </>
            )}
            <hr />

            {!alreadyProcessed ? (
                <>
                    <p style={{ marginBottom: '.25em' }}>Выберите статус:</p>
                    <div>
                        <div className="uk-margin uk-child-width-auto uk-flex uk-flex-column">
                            <label>
                                <input
                                    type="radio"
                                    value={orderStatuses.COMPLETED}
                                    checked={currentStatus === orderStatuses.COMPLETED}
                                    onChange={handleOrderStatusChange}
                                /> Обработано
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value={orderStatuses.DENIED}
                                    checked={currentStatus === orderStatuses.DENIED}
                                    onChange={handleOrderStatusChange}
                                /> Отклонено
                            </label>
                        </div>
                    </div>
                </>
            ) : (
                <p>
                    Статус:{' '}
                    {
                        props.status === orderStatuses.COMPLETED
                            ? <span style={{ color: 'green' }}>обработано</span>
                            : props.status === orderStatuses.DENIED
                                ? <span style={{ color: 'red' }}>отклонено</span>
                                : ''
                    }
                </p>
            )}

            <div className="uk-margin">
                <label htmlFor="manager-comment">
                    <p style={{ marginBottom: '.25em' }}>
                        Комментарий:
                    </p>
                </label>
                <div className="uk-form-controls">
                    <textarea
                        className="uk-textarea"
                        id="manager-comment"
                        style={{minHeight: '100px'}}
                        placeholder={
                            alreadyProcessed
                                ? 'пусто'
                                : currentStatus === orderStatuses.DENIED
                                    ? 'Укажите причину отказа'
                                    : 'Введите комментарий'
                        }
                        defaultValue={alreadyProcessed ? props.managerComment || '' : ''}
                        disabled={alreadyProcessed}
                    />
                </div>
            </div>
            {!alreadyProcessed && (
                <a href="/null" className="uk-button uk-button-primary">Изменить статус</a>
            )}
        </div>
    )
};

const portionPropShape = {
    size: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

CommonServiceOrderDetailsPage.propTypes = {
    serviceType: PropTypes.oneOf(Object.values(serviceTypes)).isRequired,
    room: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    serveDate: PropTypes.string,
    orderId: PropTypes.number.isRequired,
    serviceName: PropTypes.string.isRequired,
    customerComment: PropTypes.string,
    price: PropTypes.number,
    portion: PropTypes.shape(portionPropShape),
    portionCount: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        ...portionPropShape,
    })).isRequired,
    status: PropTypes.oneOf(Object.values(orderStatuses)),
    managerComment: PropTypes.string,
};

CommonServiceOrderDetailsPage.defaultProps = {
    options: [],
};

export default CommonServiceOrderDetailsPage;
