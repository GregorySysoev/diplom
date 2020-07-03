import React from 'react'

export default function Button(props) {
	return (
		<button className="uk-button uk-button-primary"
				onClick={props.onClick}
				type={props.type}>
			{props.label}
		</button>
	)
}