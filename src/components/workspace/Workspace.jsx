import React from "react";
import Task from "./Task";
import List from "../list/List";

export default function Workspace(props) {
	const sampleListData = [
		{ id: 0, text: "task 1", selected: true },
		{ id: 1, text: "task 2", selected: false },
		{ id: 2, text: "task 3", selected: false },
	];

	const [listItems, setListItems] = React.useState(sampleListData);

	function setValue(id, key, value) {
		setListItems((prevItems) => [
			...prevItems.slice(0, id),
			{ ...prevItems[id], [key]: value },
			...prevItems.slice(id + 1),
		]);
	}

	function getListItemElements() {
		return listItems.map((item) => {
			return (
				<Task
					key={item.id}
					id={item.id}
					text={item.text}
					selected={item.selected}
				/>
			);
		});
	}
	return (
		<div className="workspace">
			<h1>Inbox</h1>
			<List items={getListItemElements()} setValue={setValue} />
		</div>
	);
}
