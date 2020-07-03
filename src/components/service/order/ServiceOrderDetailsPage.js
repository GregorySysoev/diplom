import React from 'react';
import CommonServiceOrderDetailsPage from "./CommonServiceOrderDetailsPage";
import * as serviceTypes from '../types';

const ServiceOrderDetailsPage = () => {
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
        serviceType={data.serviceType}
        room={data.room}
        orderDate={data.orderDate}
        serveDate={data.serveDate}
        orderId={data.orderId}
        serviceName={data.serviceName}
        customerComment={data.customerComment}
        price={data.price}
    />;
};

export default ServiceOrderDetailsPage;
