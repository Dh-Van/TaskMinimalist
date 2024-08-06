import React from "react";
import List from "../list/List";
import Board from "./Board";

export default function Sidebar(props) {
	const [listItems, setListItems] = React.useState([
		{ id: "0", text: "Inbox", seleceted: true },
	]);

	function getListItemElements() {
		return listItems.map((item) => {
			return <Board key={item.id} id={item.id} text={item.text} />;
		});
	}

	function setValue(id, key, value) {
		setListItems((prevItems) => [
			...prevItems.slice(0, id),
			{ ...prevItems[id], [key]: value },
			...prevItems.slice(id + 1),
		]);
	}

	function customClickHandler(id, event) {
		setValue(id, "selected", true);
	}

	return (
		<div className="sidebar">
			<h1>Dhvan</h1>
			<List
				name="sidebar"
				items={listItems}
				itemElements={getListItemElements()}
				setListItems={setListItems}
				emptyItem={{ id: 0, text: "", priority: 0, selected: false }}
				customClickHandler={customClickHandler}
			/>
			<button
				onClick={() => {
					localStorage.clear();
					location.reload();
				}}
			>
				Clear ALL local storage
			</button>
		</div>
	);
}
