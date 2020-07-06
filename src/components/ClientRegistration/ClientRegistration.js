import React from 'react';
import './clientRegistration.sass';
import CreatableSelect from 'react-select/creatable';

const data = {
    orderId: 2,
    customerName: 'Константин Голуб',
    personsString: '2 взрослых, 1 ребёнок',
    phoneNumber: '+7 953 293 25-88',
    email: 'golub.kg@students.dvfu.ru',
    dates: '05.07.2020 - 07.05.2020',
    nights: 2,
    paid: 6480,
    rooms: [
        {
            type: 'Стандартный двухместный номер',
            capacityString: '2 взрослых, 1 ребёнок',
            price: 1800,
            discountPrice: 1620,
        },
        {
            type: 'Стандартный двухместный номер',
            capacityString: '2 взрослых, 1 ребёнок',
            price: 1800,
            discountPrice: 1620,
        },
    ],
};

const totalCost = () => {
    let cost = 0;
    for (const room of data.rooms) {
        if (room.discountPrice) {
            cost += room.discountPrice;
        } else {
            cost += room.price;
        }
    }
    return cost * data.nights;
};

const handleCancel = () => {
    if (window.confirm('Вы действительно хотите отменить этот заказ?')) {
        window.location.replace('/null');
    }
};

const ClientRegistration = () => (
    <div className="uk-container uk-margin-top uk-margin-bottom">
        <div className="uk-margin-top uk-margin-bottom">
            <a className="uk-link-muted" href="/orders">Назад, к просмотру заказов</a>
        </div>
        <p className="uk-text-bold" style={{ marginBottom: '.5em' }}>Информация о заказе</p>
        <div className="order-details">
            <p><span className="uk-text-muted">Номер заказа: </span>№{data.orderId}</p>
            <p><span className="uk-text-muted">Имя клиента: </span>{data.customerName}</p>
            <p><span className="uk-text-muted">Количество персон: </span>{data.personsString}</p>
            <p><span className="uk-text-muted">Телефон: </span>{data.phoneNumber}</p>
            <p><span className="uk-text-muted">Почта: </span>{data.email}</p>
            <p><span className="uk-text-muted">Даты проживания: </span>{data.dates}</p>
            <p><span className="uk-text-muted">Оплачено: </span>{`${data.paid}₽ / ${totalCost()}₽`}</p>
        </div>

        <p className="uk-text-bold" style={{ marginBottom: '.5em' }}>Номера</p>
        <div className="order-details">
            {data.rooms.map(r => (
                <>
                    <p><span className="uk-text-muted">Тип номера: </span>{r.type}</p>
                    <p><span className="uk-text-muted">Вместимость: </span>{r.capacityString}</p>
                    <p><span className="uk-text-muted">Цена: </span>
                        {r.discountPrice &&
                            <>
                                <span className="uk-text-muted" style={{ textDecoration: 'line-through' }}>
                                    {r.price}₽
                                </span>{' '}
                            </>
                        }
                        {r.discountPrice || r.price}₽
                    </p>
                    <hr style={{ marginTop: '.9em', marginBottom: '.9em' }} />
                </>
            ))}
        </div>

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
        <div className="uk-margin">
            <a href="/null" className="uk-button uk-button-primary">Обновить</a>
            <button
                id="cancel-btn"
                className="uk-button uk-button-danger"
                onClick={handleCancel}
            >
                Отменить заказ
            </button>
        </div>
    </div>
);

export default ClientRegistration;
