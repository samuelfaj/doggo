/**
 * This file is the client for backend actions
 * Must be run with bun run bin.ts <ARGS>
 */

import application from "@configs/application";

console.log("---------------------------");
console.log("------------BIN------------");
console.log("---------------------------");

const args = process.argv.slice(2);
const functionName = args.splice(0, 1)[0];

const init = async () => {
	if (functionName === "command-example") {
		console.log("example of command");
		return true;
	}
	console.error(`🚨 No function found with name ${functionName}`);
	return false;
};

application.init().then(async () => {
  await init();
  process.exit(0);
});
