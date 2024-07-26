import React from "react";
import { Checkbox } from "@mui/material";

export default function Task(props) {
	const checkboxStyles = {
		padding: "0px",
		color: "var(--dark-top)",
		border: "1ps solid white",
		"& .MuiSvgIcon-root": {
			fontSize: "30px",
		},
		"&.Mui-checked": {
			color: "var(--accent-top)",
		},
	};

	function handleChange(event) {
		props.handleChange(props.id, event);
	}

	return (
		<div className="task" onClick={props.handleClick}>
			<Checkbox sx={checkboxStyles} />
			<input
				id={`task-${props.id}`}
				ref={props.addRef}
				className="task--input"
				type="text"
				value={props.text}
				onChange={handleChange}
				onKeyDown={props.handleKey}
			/>
			<i
				className="fa-regular fa-square-minus"
				onClick={props.deleteTask}
			/>
		</div>
	);
}
