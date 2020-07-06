import React from 'react';
import PropTypes from 'prop-types';
import CommonServiceOrderDetailsPage from "./CommonServiceOrderDetailsPage";
import * as serviceTypes from '../types';
import * as orderStatuses from "./statuses";

const ServiceOrderDetailsPage = props => {
    const data = {
        serviceType: serviceTypes.SERVICE,
        room: '206',
        orderDate: '05.07.2020 17:39',
        serveDate: null,
        orderId: 2,
        serviceName: 'Уборка в номере',
        customerComment: null,
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
