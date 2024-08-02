import React from "react";
import Task from "./Task";
import List from "../list/List";
import { resetId } from "../../assets/utils";

export default function Workspace(props) {
	const sampleListData = [
		{ id: 0, text: "task 1", priority: 0, selected: true },
		{ id: 1, text: "task 2", priority: 0, selected: false },
		{ id: 2, text: "task 3", priority: 0, selected: false },
	];

	const [listItems, setListItems] = React.useState([]);

	// React.useEffect(() => {
	// 	setListItems([]);
	// }, [props.name]);

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

	function setValue(id, key, value) {
		setListItems((prevItems) => [
			...prevItems.slice(0, id),
			{ ...prevItems[id], [key]: value },
			...prevItems.slice(id + 1),
		]);
	}

	function customKeyHandler(functionString) {
		eval(functionString);
	}

	function setPriority(id, priority) {
		setValue(id, "priority", priority);
	}

	function sortItems(id) {
		console.log("sorted");
		setListItems(
			[...listItems].sort(
				(a, b) => !a.priority - !b.priority || a.priority - b.priority
			)
		);

		resetId(setListItems);
	}

	console.log(localStorage);

	return (
		<div className="workspace">
			<h1>{props.name}</h1>
			<List
				name={props.name}
				items={listItems}
				itemElements={getListItemElements()}
				setListItems={setListItems}
				emptyItem={{ id: 0, text: "", priority: 0, selected: false }}
				customKeyHandler={customKeyHandler}
			/>
		</div>
	);
}
