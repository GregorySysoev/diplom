import React from 'react';
import FoodServiceList from "./FoodServiceList";
import ServiceServiceList from "./ServiceServiceList";
import * as serviceTypes from './types';

export default function ServiceListPage() {
    const [serviceType, setServiceType] = React.useState(serviceTypes.FOOD);

    const handleServiceTypeChange = event => {
        setServiceType(+event.target.value);
    };

    return <div className="uk-container uk-margin-top uk-margin-bottom">
        <h2>Услуги</h2>
        <div>
            <div className="uk-margin uk-child-width-auto uk-flex uk-flex-column">
                <label>
                    <input
                        type="radio"
                        name="serviceType"
                        value={serviceTypes.SERVICE}
                        checked={serviceType === serviceTypes.SERVICE}
                        onChange={handleServiceTypeChange}
                    /> Сервис
                </label>
                <label>
                    <input
                        type="radio"
                        name="serviceType"
                        value={serviceTypes.FOOD}
                        checked={serviceType === serviceTypes.FOOD}
                        onChange={handleServiceTypeChange}
                    /> Напитки и еда
                </label>
            </div>
        </div>

        {serviceType === serviceTypes.FOOD ? (
            <FoodServiceList />
        ) : serviceType === serviceTypes.SERVICE ? (
            <ServiceServiceList />
        ) : (
            ''
        )}
        <a className="uk-button uk-button-primary" href="/service/new">
            Добавить услугу
        </a>{' '}
        <button className="uk-button uk-button-primary" type="button">
            Добавить категорию
        </button>
    </div>;
}
