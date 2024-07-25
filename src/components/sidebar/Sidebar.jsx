import React from "react";

export default function Sidebar(props) {
	return (
		<div className="sidebar">
			<h1>{props.name}</h1>
			<h2>Inbox</h2>
		</div>
	);
}
