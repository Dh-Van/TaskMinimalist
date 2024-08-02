import KeyBindings from "./keyBindings.json";
import config from "./config.json";

export function generateKeyCombo({ Key, META, SHIFT, ALT, CTRL }) {
	let prefix = "";
	if (META) prefix += "META_";
	if (SHIFT) prefix += "SHIFT_";
	if (ALT) prefix += "ALT_";
	if (CTRL) prefix += "CTRL_";
	return `${prefix}${Key.toLowerCase()}`;
}

export function getKeyBindingsConfig() {
	const keyBindings = KeyBindings.keyBindings;

	return keyBindings.reduce((acc, binding) => {
		const combo = generateKeyCombo(binding);
		acc[combo] = binding;
		return acc;
	}, {});
}

export function getPriorityConfig() {
	return config.priority.map((element) => [element.id, element.color]);
}

export function resetId(arrySetter) {
	arrySetter((prevItems) =>
		prevItems.map((item, idx) => ({ ...item, id: idx }))
	);
}
