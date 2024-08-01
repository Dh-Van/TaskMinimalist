import React from "react";
import ListItem from "../list/ListItem";

export default function Task(props) {
	function getTaskObj() {
		return { id: props.id, text: props.text, selected: props.selected };
	}

	return (
		<div
			className="task"
			onClick={(event) => props.handleClick(props.id, event)}
		>
			<input type="checkbox" />
			<ListItem
				value={props.text}
				handleChange={(event) => props.handleChange(props.id, event)}
				handleKeyDown={(event) => props.handleKeyDown(props.id, event)}
				addRef={props.addRef}
			/>
			<i className="fa-regular fa-square-minus" />
		</div>
	);
}
