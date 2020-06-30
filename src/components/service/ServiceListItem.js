import React from 'react'
import PropTypes from 'prop-types'

const ServiceListItem = ({
    id,
    name,
    categoryName,
    costs,
    executionTime,
    onClick,
}) => {
    let executionTimeString = ''
    if (executionTime) {
        const hoursString = executionTime.hours.toString().padStart(2, '0')
        const minutesString = executionTime.minutes.toString().padStart(2, '0')
        executionTimeString = `${hoursString}:${minutesString}`
    }

    return (
        <div onClick={onClick}>
            {id}, {name}, {categoryName}, [{costs.map(c => `${c.toString()} руб.`).join('; ')}], {executionTime && executionTimeString}
        </div>
    )
}

ServiceListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    costs: PropTypes.arrayOf(PropTypes.number).isRequired,
    executionTime: PropTypes.shape({
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
}

export default ServiceListItem