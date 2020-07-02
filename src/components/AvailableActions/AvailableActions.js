import React from 'react'
import Header from "../Header"

export default class AvailableActions extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div id="available-actions">
                    <div>Доступные действия</div>
                    <div>
                        <ul>
                            <li><a href="/hotel">Отредактировать информацию о гостинице</a></li>
                            <li><a href="">Зарегистрировать прибывших клиентов</a></li>
                            <li><a href="">Проверить потребность в услугах</a></li>
                            <li><a href="">Просмотреть список услуг</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}