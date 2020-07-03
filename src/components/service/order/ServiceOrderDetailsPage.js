import React from 'react';
import PropTypes from 'prop-types';
import CommonServiceOrderDetailsPage from "./CommonServiceOrderDetailsPage";
import * as serviceTypes from '../types';
import * as orderStatuses from "./statuses";

const ServiceOrderDetailsPage = props => {
    const data = {
        serviceType: serviceTypes.SERVICE,
        room: '159',
        orderDate: '24.07.2020 11:53',
        serveDate: '24.07.2020 13:00',
        orderId: 1001,
        serviceName: 'Поменять постель',
        customerComment: 'Постарайтесь успеть до 13:00',
        price: 0,
    };
    return <CommonServiceOrderDetailsPage
        {...data}
        {...props}
    />;
};

ServiceOrderDetailsPage.propTypes = {
    status: PropTypes.oneOf(Object.values(orderStatuses)),
    managerComment: PropTypes.string,
};

export default ServiceOrderDetailsPage;
