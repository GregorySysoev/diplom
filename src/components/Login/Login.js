import React from 'react'
import Header from "../Header"
import './login.sass'

export default class Login extends React.Component {

    render() {
        return (
            <div>
                <Header></Header>
                <div class="login">
                    <div id="login-words">Добро пожаловать</div>
                    <div><div>Логин: </div><input autoComplete="off" id="login" ></input></div>
                    <div><div>Пароль: </div><input type="password" id="password"></input></div>
                        <a href="/actions" className="uk-button uk-button-primary" id="login-button" type="submit">Войти</a>
                </div>
            </div>
        )
    }
}
