// @ts-nocheck
/**
 * Node.js script to sequentially reassign string IDs in resources.json.
 * Run with: node fixResourceIds.cjs or node src/lib/data/fixResourceIds.cjs
 * If using TypeScript and seeing linter errors, install @types/node for type support.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'resources.json');

function fixResourceIds() {
	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	if (!Array.isArray(data)) {
		console.error('resources.json is not an array!');
		process.exit(1);
	}

	/**
	 * @param {object} item
	 * @param {number} idx
	 */
	data.forEach((item, idx) => {
		item.id = (idx + 1).toString();
	});

	// Write back to file (pretty-printed)
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
	console.log('IDs updated and file saved!');
}

fixResourceIds();
