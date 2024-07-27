import React from "react";
import List from "../list/List";

export default function Sidebar(props) {
	return (
		<div className="sidebar">
			<List title={props.title} />
		</div>
	);
}
