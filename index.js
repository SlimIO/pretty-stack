"use strict";

// Require Node.js Dependencies
const { basename, dirname, join } = require("path");
const { readFileSync } = require("fs");

// Require Third-party Dependencies
const cleanStack = require("clean-stack");
const { gray, white, magenta, bgMagenta, yellow } = require("kleur");

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
    let firstStack = null;

    console.log("\n " + bgMagenta(white().bold(` ${arrStack.shift()} `)) + "\n");
    for (const line of arrStack) {
        const result = /at\s(.*)|at\s(.*)\s\((.*)\)/.exec(line);
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
        console.log(
            gray().bold(`  o at ${white().bold(at)} (${magenta().bold(fileName)} ${yellow().bold(`at line ${fileLine}`)})`)
        );
        console.log(gray().bold(`    ${path}`));
        console.log();
    }

    if (printFile && firstStack !== null) {
        console.log("");
        const [, at, path = at] = /at\s(.*)|at\s(.*)\s\((.*)\)/.exec(firstStack);
        const [fileName, line, char] = basename(path).split(":");

        const completePath = join(dirname(path), fileName);
        readFileSync(completePath, "utf-8")
            .split("\n")
            .forEach((value, index) => {
                if (index >= line - 2 && index <= line) {
                    const isTheLine = index === line - 1;
                    const color = isTheLine ? white().bold : gray().bold;
                    const arrow = isTheLine ? magenta().bold(">") : " ";
                    const lineId = ("0" + (index + 1)).slice(-2);
                    console.log("  " + gray().bold(`${arrow} ${lineId} |`) + color(`  ${value}`));
                    if (isTheLine) {
                        const sLen = " ".repeat(lineId.length);
                        console.log("     " + sLen + gray().bold("|  ") + " ".repeat(char - 1) + magenta().bold("^"));
                    }
                }
            });
        console.log("");
    }
}

module.exports = prettyStack;
