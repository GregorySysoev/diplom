import React from 'react'
import data from '../index'

const SetData = () => {
    localStorage.setItem('data', JSON.stringify(data))
    return <p>Данные установлены!</p>
}

export default SetData