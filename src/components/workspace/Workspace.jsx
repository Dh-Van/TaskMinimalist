import React from "react";
import List from "../list/List";
import "../workspace/styles.css";

export default function Workspace(props) {
	return (
		<List
			global={{
				title: props.workspace,
				className: props.className,
				workspace: props.workspace,
				checkbox: true,
			}}
			setClickedTask={() => null}
		/>
	);
}
