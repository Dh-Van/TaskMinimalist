import React from "react";
import ListItem from "../list/ListItem";

export default function Task(props) {
	function getTaskObj() {
		return { id: props.id, text: props.text, selected: props.selected };
	}

	return (
		<div className="task" onClick={props.parameters.handleClick}>
			<input type="checkbox" />
			<ListItem parameters={props.parameters} value={props.text} />
			<i className="fa-regular fa-square-minus" />
		</div>
	);
}
