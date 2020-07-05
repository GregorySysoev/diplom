import React from 'react'
import './availableActions.sass'
import '../../css/styles.sass'

export default class AvailableActions extends React.Component {
    render() {
        return (
            <div>
                <div id="available-actions">
                    <div class="title">Доступные действия</div>
                    <div>
                        <ul id="available-actions-list">
                            <li><a href="/hotel">Отредактировать информацию о гостинице</a></li>
                            <li><a href="/orders">Зарегистрировать прибывших клиентов</a></li>
                            <li><a href="/service/order/list">Проверить потребность в услугах</a></li>
                            <li><a href="/service/list">Просмотреть список услуг</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}