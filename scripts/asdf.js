#!/usr/bin/env node
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const main = async () => {
    // rl.question("asdf.py", answer => {
    //     console.log(answer);
    // });
    const userResponse = await new Promise(resolve => rl.question("Have you merged your new code into master yet? (y/n) ", response => {
        rl.close();
        resolve(response);
    }));
    console.log(userResponse);
}
main();
