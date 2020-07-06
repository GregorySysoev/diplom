import React from 'react';
import CommonServiceOrderDetailsPage from "./CommonServiceOrderDetailsPage";
import * as serviceTypes from '../types';
import PropTypes from "prop-types";
import * as orderStatuses from "./statuses";

const FoodOrderDetailsPage = props => {
    const data = {
        serviceType: serviceTypes.FOOD,
        room: '206',
        orderDate: '05.07.2020 17:39',
        serveDate: null,
        orderId: 2,
        serviceName: 'Вок с курицей и лапшой удон',
        portion: {
            size: 300,
            unit: 'гр',
            price: 350,
        },
        portionCount: 2,
        options: [
            {
                name: 'Лук',
                size: 10,
                unit: 'гр',
                price: 15,
            },
        ],
    };
    return <CommonServiceOrderDetailsPage
        {...data}
        {...props}
    />;
};

FoodOrderDetailsPage.propTypes = {
    status: PropTypes.oneOf(Object.values(orderStatuses)),
    managerComment: PropTypes.string,
};

export default FoodOrderDetailsPage;
