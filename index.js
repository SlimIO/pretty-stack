// Require Third-party Dependencies
const cleanStack = require("clean-stack");

function prettyStack(error) {
    if (!(error instanceof Error)) {
        throw new TypeError("error must be instanceof Error");
    }

    const clean = cleanStack(error.stack);
    console.log(clean);
}

module.exports = prettyStack;
