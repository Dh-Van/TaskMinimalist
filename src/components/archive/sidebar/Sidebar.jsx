import React from "react";
import List from "../list/List";
import "../sidebar/styles.css";

export default function Sidebar(props) {
	return (
		<div className="sidebar">
			<List
				global={{
					className: props.className,
					title: props.title,
					checkbox: false,
				}}
				setClickedTask={(task) => props.setWorkspace(task)}
			/>
			<button onClick={() => localStorage.clear()}>
				Clear Local Storage
			</button>
		</div>
	);
}
