import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './styles.sass';
import * as serviceTypes from '../types';
import * as orderStatuses from './statuses';

const CommonServiceOrderDetailsPage = props => {
    const [currentStatus, setCurrentStatus] = React.useState(orderStatuses.COMPLETED);

    const handleOrderStatusChange = event => {
        setCurrentStatus(+event.target.value);
    };

    return (
        <div className="uk-container uk-margin-top uk-margin-bottom">
            <div className="uk-margin-top uk-margin-bottom">
                <a className="uk-link-muted" href="#">Назад, к доступным действиям</a>
            </div>
            <p className="uk-text-bold" style={{ marginBottom: '.5em' }}>Информация о заказанной услуге</p>
            <div className="order-details">
                <p><span className="uk-text-muted">Комната: </span>{props.room}</p>
                <p><span className="uk-text-muted">Дата заказа: </span>{props.orderDate}</p>
                <p><span className="uk-text-muted">Указанная дата: </span>{props.serveDate}</p>
                <p><span className="uk-text-muted">Номер заказа: </span>{`№${props.orderId}`}</p>
                <p><span className="uk-text-muted">Название услуги: </span>{props.serviceName}</p>
                {props.serviceType === serviceTypes.FOOD && (
                    <p><span className="uk-text-muted">Размер порции: </span>{`${props.portion.size} ${props.portion.unit}`}</p>
                )}
                <p><span className="uk-text-muted">Комментарий: </span>{props.customerComment ? props.customerComment : <i className="uk-text-muted">пусто</i>}</p>
                {props.serviceType === serviceTypes.SERVICE && (
                    <p><span className="uk-text-muted">Цена: </span>{props.price ? `${props.price}₽` : 'бесплатно'}</p>
                )}
            </div>
            {props.serviceType === serviceTypes.FOOD && props.options.length > 0 && (
                <>
                    <p className="uk-text-bold" style={{ marginBottom: '.5em' }}>Опции</p>
                    <div className="food-options">
                        {props.options.map(o => (
                            <p><span className="uk-text-muted">{o.name}: </span>{`${o.size} ${o.unit} (`}{o.price ? `${o.price}₽` : 'бесплатно'}{')'}</p>
                        ))}
                    </div>
                    <p><span className="uk-text-muted">Цена услуги: </span>{props.portion.price ? `${props.portion.price}₽` : 'бесплатно'}</p>
                    <p><span className="uk-text-muted">Итоговая цена: </span>
                        {`${props.options.reduce((acc, o) => acc + o.price || 0, 0) + props.portion.price || 0}₽`}
                    </p>
                </>
            )}
            <hr />
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
                        placeholder={currentStatus === orderStatuses.DENIED ? 'Укажите причину отказа' : 'Введите комментарий'}
                    />
                </div>
            </div>
            <div>
                <Button type="button" label="Изменить статус"/>
            </div>
        </div>
    )
};

const portionPropShape = {
    size: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

CommonServiceOrderDetailsPage.propTypes = {
    serviceType: PropTypes.oneOf(serviceTypes).isRequired,
    room: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    serveDate: PropTypes.string.isRequired,
    orderId: PropTypes.number.isRequired,
    serviceName: PropTypes.string.isRequired,
    customerComment: PropTypes.string,
    price: PropTypes.number.isRequired,
    portion: PropTypes.shape(portionPropShape),
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        ...portionPropShape,
    })).isRequired
};

CommonServiceOrderDetailsPage.defaultProps = {
    options: [],
};

export default CommonServiceOrderDetailsPage;
