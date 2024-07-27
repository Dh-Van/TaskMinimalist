import React from "react";

export default function InsertButton(props) {
	return (
		<button className="insert-button" onClick={props.handleClick}>
			+ Add Task
		</button>
	);
}
