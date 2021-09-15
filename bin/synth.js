#!/usr/bin/env node

const paths = [
    `${process.cwd()}/node_modules/synth-css/index.js`,
    `${process.cwd()}/index.js`
]
let passed = ""
for (let i = 0; paths.length > i; i++) {
    try {
        require(paths[i]).validate == true
        passed = paths[i]
    } catch (err) {

    }
}
new (require(passed)).parser({
    file: (process.argv.slice(2).find(x => x.startsWith("--dir")).split(":")[1]).replace(/__dirname/g, `${process.cwd()}`),
    out: (process.argv.slice(2).find(x => x.startsWith("--out")).split(":")[1]).replace(/__dirname/g, `${process.cwd()}`),
}).compile()