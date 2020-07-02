import React from 'react';
import FoodServiceList from "./FoodServiceList";
import ServiceServiceList from "./ServiceServiceList";

const SERVICE_FOOD = 1;
const SERVICE_SERVICE = 2;

// TODO: оформить вёрстку
export default function ServiceListPage() {
    const [serviceType, setServiceType] = React.useState(SERVICE_FOOD);

    const handleServiceTypeChange = event => {
        setServiceType(+event.target.value);
    };

    return <>
        <label>
            <input
                type="radio"
                name="serviceType"
                value={SERVICE_SERVICE}
                checked={serviceType === SERVICE_SERVICE}
                onChange={handleServiceTypeChange}
            /> Сервис
        </label>
        <br /> {/* TODO: сделать через CSS */}
        <label>
            <input
                type="radio"
                name="serviceType"
                value={SERVICE_FOOD}
                checked={serviceType === SERVICE_FOOD}
                onChange={handleServiceTypeChange}
            /> Напитки и еда
        </label>
        <br /> {/* TODO: сделать через CSS */}

        {serviceType === SERVICE_FOOD ? (
            <FoodServiceList />
        ) : serviceType === SERVICE_SERVICE ? (
            <ServiceServiceList />
        ) : (
            ''
        )}
        <button className="uk-button uk-button-primary" type="button">
            Добавить услугу
        </button>
        <button className="uk-button uk-button-primary" type="button">
            Добавить категорию
        </button>
    </>;
}
