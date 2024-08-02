import React from "react";
import ListItem from "../list/ListItem";

export default function Board(props) {
	function getTaskObj() {
		return { id: props.id, text: props.text, selected: props.selected };
	}

	return (
		<div className="board" onClick={props.parameters.handleClick}>
			<ListItem parameters={props.parameters} value={props.text} />
			<i className="fa-regular fa-square-minus" />
		</div>
	);
}
