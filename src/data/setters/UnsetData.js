import React from 'react'

const UnsetData = () => {
    localStorage.removeItem('data');
    return <p>Данные сброшены!</p>
}

export default UnsetData