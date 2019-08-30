"use strict";

// Require Node.js Dependencies
const { basename, dirname, join } = require("path");
const { readFileSync } = require("fs");

// Require Third-party Dependencies
const cleanStack = require("clean-stack");
const { gray, white, cyan, yellow, bgRed, red } = require("kleur");

/**
 * @function linesLength
 * @param {!number} length
 * @returns {number}
 */
function linesLength(length) {
    if (length >= 0 && length <= 9) {
        return 1;
    }
    else if (length >= 10 && length <= 99) {
        return 2;
    }
    else if (length >= 100 && length <= 999) {
        return 3;
    }

    return 4;
}

/**
 * @function prettyStack
 * @param {!Error} error
 * @param {boolean} [printFile=true]
 * @returns {void}
 */
function prettyStack(error, printFile = true) {
    if (!(error instanceof Error)) {
        throw new TypeError("error must be instanceof Error");
    }

    const arrStack = cleanStack(error.stack).split("\n");
    const mem = new Set();
    let firstStack = null;

    console.log("\n " + bgRed(white().bold(` ${arrStack.shift()} `)) + "\n");
    for (const line of arrStack) {
        const result = /at\s(.*)\s\((.*)\)/.exec(line);
        if (result === null) {
            continue;
        }
        if (firstStack === null) {
            firstStack = line;
        }

        let [, at, path] = result;
        if (typeof path === "undefined") {
            path = at;
            at = "";
        }

        const [fileName, fileLine] = basename(path).split(":");
        const fullName = join(dirname(path), fileName);

        console.log(
            gray().bold(`  o at ${white().bold(at)} (${cyan().bold(fileName)} ${yellow().bold(`at line ${fileLine}`)})`)
        );
        if (!mem.has(fullName)) {
            console.log(gray().bold(`    ${path}\n`));
            mem.add(fullName);
        }
    }

    if (printFile && firstStack !== null) {
        console.log("");
        const [, at, path = at] = /at\s(.*)\s\((.*)\)/.exec(firstStack);
        const [fileName, line, char] = basename(path).split(":");

        const completePath = join(dirname(path), fileName);
        try {
            const lines = readFileSync(completePath, "utf-8").split("\n");
            const len = linesLength(lines.length);
            lines.forEach((value, index) => {
                if (index >= line - 2 && index <= line) {
                    const isTheLine = index === line - 1;
                    const color = isTheLine ? white().bold : gray().bold;
                    const arrow = isTheLine ? cyan().bold(">") : " ";
                    const toAdd = len - `${index + 1}`.length;
                    console.log("  " + gray().bold(`${arrow} ${index + 1}${" ".repeat(toAdd)} |`) + color(`  ${value}`));
                    if (isTheLine) {
                        const sLen = " ".repeat(len);
                        console.log("     " + sLen + gray().bold("|  ") + " ".repeat(char - 1) + cyan().bold("^"));
                    }
                }
            });
        }
        catch (error) {
            // Ignore
        }
        console.log("");
    }
}

module.exports = prettyStack;
