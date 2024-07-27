import React from "react";
import List from "../list/List";
import "../workspace/styles.css";

export default function Workspace(props) {
	// console.log(props.title);
	return <List title={props.title} className="workspace" />;
}
