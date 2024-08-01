import React from "react";

export default function ListItem(props) {
	return (
		<div className="list-item">
			<input
				type="text"
				onChange={props.handleChange}
				onKeyDown={props.handleKeyDown}
				value={props.value}
				ref={props.addRef}
			/>
		</div>
	);
}
