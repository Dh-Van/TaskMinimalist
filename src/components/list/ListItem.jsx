import React from "react";

export default function ListItem(props) {
	return (
		<div className="list-item">
			<input
				className={`list-item--input ${props.className}`}
				type="text"
				onClick={props.parameters.onClick}
				onChange={props.parameters.handleChange}
				onKeyDown={props.parameters.handleKeyDown}
				value={props.value}
				ref={props.parameters.addRef}
			/>
		</div>
	);
}
