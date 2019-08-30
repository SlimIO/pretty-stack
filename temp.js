"use strict";

const prettyStack = require("./index");

/**
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * v
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 *
 *
 *
 *
 *
 *
 *
 *
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 *
 *
 *
 *
 *
 *
 *
 * @desc fooo
 * @desc fooo
 * @desc fooo
 *
 *
 *
 *
 *
 *
 *
 *
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 * @desc fooo
 *
 *
 *
 *
 *
 *
 *
 *
 * @desc fooo
 * @desc fooo
 *
 *
 *
 *
 *
 *
 *
 * @desc fooo
 *
 *
 *
 *
 * @desc fooo
 *
 *
 *
 * @desc fooo
 *
 * @desc fooo
 *
 *
 *
 * @desc fooo
 * @desc fooo
 * v
 */

async function foo() {
    throw new Error("boo");
}

async function main() {
    try {
        await foo();
    }
    catch (error) {
        prettyStack(error);
    }
}
main();
