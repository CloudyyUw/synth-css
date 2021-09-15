const __parser = require("./src/parser"),
    __walk = require("./src/walk_path"),
    fs = require("fs");
class SynthParser {
    /**
     * Parse and generate a CSS file from a .sy file
     * @param {object} options - Options to compile
     * @param {string} options.file - File Dir
     * @param {string} options.out - Out Dir
     */
    constructor(options) {
        /**
         * @private
         */
        this.options = {
            path: options.file,
            out: options.out
        }
        this.__validate(options) == true
    }
    /**
     * @private
     */
    __validate(obj) {
        return true
    }
    compile() {
        __walk(this.options.path).then(files => {
            files.forEach(file => {
                let content = fs.readFileSync(file, "utf8");
                let parsed = __parser(content)
                console.time(require("chalk").blackBright("Write file"))
                let filename = file.split("/").pop().split(".")[0]
                if (!fs.existsSync(this.options.out)) {
                    fs.mkdirSync(this.options.out, { recursive: true });
                }
                fs.writeFile(`${this.options.out}/${filename}.css`, "/* Synth v0.0.1 */\n" + parsed, function (err, data) {
                    if (err) throw err;
                    else console.log(require("chalk").greenBright(`Done ${filename}.sy`))
                })
                console.timeEnd(require("chalk").blackBright("Write file"))
            });
        })
            .catch(e => { throw e })
    }
}
module.exports = {
    validate: true,
    parser: SynthParser
}