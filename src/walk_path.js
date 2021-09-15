const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function walkFolder(folder) {
    let dirs = await readdir(folder)
    const files = await Promise.all(dirs.map(async (subdir) => {
        const res = resolve(folder, subdir);
        if (res) {
            return (await stat(res)).isDirectory() ? walkFolder(res) : res;
        }
    }));
    return files.reduce((a, f) => a.concat(f), []).filter(x => x !== undefined && x.endsWith(".sy"))//.filter(x => x.endsWith(".sy"))
}

module.exports = walkFolder;