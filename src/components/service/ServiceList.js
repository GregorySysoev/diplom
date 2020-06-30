import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ServiceListItem from "./ServiceListItem";

const ServiceList = ({ services }) => (
    <ul>
        {services.map(s =>
            <ServiceListItem
                id={s.id}
                onClick={() => console.log(`Service with id=${s.id} was clicked!`)}
                {...s}
            />
        )}
    </ul>
)

ServiceList.propTypes = {
    services: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
        costs: PropTypes.arrayOf(PropTypes.number).isRequired,
        executionTime: PropTypes.shape({
            hours: PropTypes.number.isRequired,
            minutes: PropTypes.number.isRequired,
        }),
    })).isRequired,
}

const mapStateToProps = state => {
    const services = state.service.services.map(s => ({
        ...s,
        categoryName: s.categoryId === null
            ? '<Без категории>'
            : state.service.categories.find(c => c.id === s.categoryId)?.name || '<Ошибка в категории>',
        costs: s.type === 1
            ? s.portions.map(p => p.price)
            : s.type === 2
                ? [s.price]
                : [],
    }))
    return { services }
}

export default connect(mapStateToProps)(ServiceList)
