// utils.js

export function generateKeyCombo({ Key, META, SHIFT, ALT, CTRL }) {
	let prefix = "";
	if (META) prefix += "META_";
	if (SHIFT) prefix += "SHIFT_";
	if (ALT) prefix += "ALT_";
	if (CTRL) prefix += "CTRL_";
	return `${prefix}${Key.toLowerCase()}`;
}

export function getKeyBindingsConfig() {
	const keyBindings = [
		{ Key: "d", META: true, Action: "deleteTask" },
		// Add more bindings as needed
	];

	return keyBindings.reduce((acc, binding) => {
		const combo = generateKeyCombo(binding);
		acc[combo] = binding;
		return acc;
	}, {});
}
