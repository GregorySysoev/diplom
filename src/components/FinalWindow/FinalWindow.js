import React from 'react'
import './finalWindow.sass'

export default class finalWindow extends React.Component {

    render() {
        return (
            <div>
                <div class="final">
                    <h1 className="uk-text-bold" id="final-words">Данные обновлены</h1>
                        <a href="/actions" className="uk-button uk-button-primary" id="login-button" type="submit">К доступным действиям</a>
                </div>
            </div>
        )
    }
}
