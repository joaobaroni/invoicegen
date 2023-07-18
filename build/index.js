"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferences = exports.packageJson = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const preferences_1 = require("./preferences");
const commander_1 = require("commander");
// Read package.json file
exports.packageJson = JSON.parse(node_fs_1.default.readFileSync("./package.json", "utf8"));
exports.preferences = new preferences_1.Preferences();
const program = new commander_1.Command();
program
    .name(exports.packageJson.name)
    .description(exports.packageJson.description)
    .version(exports.packageJson.version)
    .option("-t, --teste <teste>")
    .action((options) => console.log(options));
program
    .command("init")
    .option("-n, --name <name>", "flavour of pizza")
    .action((options) => {
    console.log("Init: ", options.name);
    // initialization(generationDay, name, invoiceNumber);
});
program
    .command("gen")
    .option("-d, --debug", "output extra debugging")
    .option("-s, --small", "small pizza size")
    .option("-p, --pizza-type <type>", "flavour of pizza")
    .action((str, options) => {
    console.log("Generate");
    const { name, invoiceNumber, generationDay } = options.opts();
    initialization(generationDay, name, invoiceNumber);
});
// Initialization
function initialization(generationDay, name, invoiceNumber = 0) {
    if (!exports.preferences.firstRun)
        exports.preferences.firstRun = false;
    exports.preferences.generationDay = generationDay;
    exports.preferences.invoiceNumber = invoiceNumber;
    exports.preferences.name = name;
    console.log("You have sucefully initialized InvoiceGen");
}
program.parse(process.argv);
