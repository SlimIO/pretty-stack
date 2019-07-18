// Require Node.js Dependencies
const { basename, dirname, join } = require("path");
const { readFileSync } = require("fs");

// Require Third-party Dependencies
const cleanStack = require("clean-stack");
const { gray, white, magenta, bgMagenta, yellow } = require("kleur");

function prettyStack(error, printFile = true) {
    if (!(error instanceof Error)) {
        throw new TypeError("error must be instanceof Error");
    }

    const clean = cleanStack(error.stack);
    const arrStack = clean.split("\n");
    console.log();
    // eslint-disable-next-line
    console.log(" " + bgMagenta(white().bold(` ${arrStack.shift()} `)));
    console.log();
    for (const line of arrStack) {
        const result = /at\s(.*)\s\((.*)\)/.exec(line);
        if (result === null) {
            continue;
        }

        const [, at, path] = result;
        const [fileName, fileLine] = basename(path).split(":");
        console.log(
            gray().bold(`  o at ${white().bold(at)} (${magenta().bold(fileName)} ${yellow().bold(`at line ${fileLine}`)})`)
        );
        console.log(gray().bold(`    ${path}`));
        console.log();
    }

    if (printFile) {
        console.log("");
        const [,, path] = /at\s(.*)\s\((.*)\)/.exec(arrStack[0]);
        const [fileName, line] = basename(path).split(":");

        const completePath = join(dirname(path), fileName);
        const lines = readFileSync(completePath, "utf-8")
            .split("\n")
            .filter((value, index) => index >= line - 2 && index <= line);

        for (let id = 0; id < lines.length; id++) {
            const color = id === 1 ? white().bold : gray().bold;
            console.log(color(`  ${lines[id]}`));
        }
        console.log("");
    }
}

module.exports = prettyStack;
