import React from 'react';
import CommonServiceOrderDetailsPage from "./CommonServiceOrderDetailsPage";
import * as serviceTypes from '../types';
import PropTypes from "prop-types";
import * as orderStatuses from "./statuses";

const FoodOrderDetailsPage = props => {
    const data = {
        serviceType: serviceTypes.FOOD,
        room: '305',
        orderDate: '24.07.2020 14:50',
        serveDate: '24.07.2020 15:30',
        orderId: 1002,
        serviceName: 'Вареники со сметаной',
        portion: {
            size: 305,
            unit: 'грамм',
            price: 350,
        },
        options: [
            {
                name: 'Лук',
                size: 10,
                unit: 'грамм',
                price: 50,
            },
            {
                name: 'Сметана',
                size: 15,
                unit: 'грамм',
                price: 50,
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
