import React from 'react'

export default function Header() {
	return (
		<div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
        <nav className="uk-navbar-container" uk-navbar="">
          <div className="uk-navbar-left">
			<a className="uk-navbar-toggle" uk-toggle="target: #offcanvas-usage"  data-uk-navbar-toggle-icon="" href="#"/>
          </div>
        </nav>
        <div id="offcanvas-usage" uk-offcanvas="">
          <div className="uk-offcanvas-bar">
            <button className="uk-offcanvas-close" type="button" uk-close="" />
            <ul className="right">
              <li>
                <a href="/hotel">Отредактировать информацию о гостинице</a>
              </li>
              <li>
                <a href="/orders">Зарегистрировать прибывших клиентов</a>
              </li>
              <li>
                <a href="/service/order/list">Проверить потребность в услугах</a>
              </li>
			  <li>
                <a href="/service/list">Просмотреть список услуг</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
	)
}