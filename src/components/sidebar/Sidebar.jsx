import React from "react";
import List from "../list/List";
import Board from "./Board";

export default function Sidebar(props) {
	const [listItems, setListItems] = React.useState([
		{ id: "0", text: "Inbox" },
	]);

	function getListItemElements() {
		return listItems.map((item) => {
			return <Board key={item.id} id={item.id} text={item.text} />;
		});
	}

	function customClickHandler(id, event) {
		props.setWorkspace(listItems[id].text);
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
				// customKeyHandler={customHandler}
			/>
		</div>
	);
}
