import React from 'react';
import FoodServiceList from "./FoodServiceList";
import ServiceServiceList from "./ServiceServiceList";

const SERVICE_FOOD = 1;
const SERVICE_SERVICE = 2;

export default function ServiceListPage() {
    const [serviceType, setServiceType] = React.useState(SERVICE_FOOD);

    const handleServiceTypeChange = event => {
        setServiceType(+event.target.value);
    };

    return <>
        <div className="uk-container uk-margin-top uk-margin-bottom">
            <h2>Услуги</h2>
            <div>
                <div className="uk-margin uk-child-width-auto uk-flex uk-flex-column">
                    <label>
                        <input
                            type="radio"
                            name="serviceType"
                            value={SERVICE_SERVICE}
                            checked={serviceType === SERVICE_SERVICE}
                            onChange={handleServiceTypeChange}
                        /> Сервис
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="serviceType"
                            value={SERVICE_FOOD}
                            checked={serviceType === SERVICE_FOOD}
                            onChange={handleServiceTypeChange}
                        /> Напитки и еда
                    </label>
                </div>
            </div>

            {serviceType === SERVICE_FOOD ? (
                <FoodServiceList />
            ) : serviceType === SERVICE_SERVICE ? (
                <ServiceServiceList />
            ) : (
                ''
            )}
            <button className="uk-button uk-button-primary" type="button">
                Добавить услугу
            </button>{' '}
            <button className="uk-button uk-button-primary" type="button">
                Добавить категорию
            </button>
        </div>
    </>;
}
