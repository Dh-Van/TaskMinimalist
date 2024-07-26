import React from "react";
import { Checkbox } from "@mui/material";
import { getPriorityConfig } from "../../assets/config";

export default function Task(props) {
	const priorityConfig = getPriorityConfig();

	const checkboxStyles = {
		padding: "0px",
		color: priorityConfig[props.priority],
		border: "1ps solid white",
		"& .MuiSvgIcon-root": {
			fontSize: "30px",
		},
		"&.Mui-checked": {
			color: "var(--accent-top)",
		},
	};

	function handleChange(event) {
		props.handleChange(event);
	}

	return (
		<div className="task" onClick={props.handleClick}>
			<Checkbox sx={checkboxStyles} checked={props.checked} />
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
