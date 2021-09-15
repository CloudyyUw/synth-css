const Snapdragon = require("snapdragon");
const snapdragon = new Snapdragon();

const Tokens = require("./tokens")
const compiler = require("./compiler")

function parse(content) {
    let ast = snapdragon.parser;
    Tokens.forEach(item => {
        ast.set(item.name, function () {
            let pos = this.position();
            let m = this.match(item.regex);
            if (!m) return;
            return pos(this.node(m[0]));
        })
    })
    return ast.parse(content)
}

const result = (string) => compiler(Tokens, parse(string)).output;

function __cleaner(String = "", args = []) {
    args.forEach(item => {
        let regex = new RegExp(".*" + item + ".*$", "gm")
        String = String.replace(regex, "")
    })
    return String;
}

function _generate(code) {
    let Regex = {
        parseModules: /(?<=\__module __path).+?(?=\;)/g,
        varValue: /(?<=\__declare_var ).+?(?=\ __as_name)/g,
        varName: /(?<=\__as_name ).+?(?=(\r\n|\n|\r))/g,
        componentName: /(?<=\__declare_var ).+?(?=\=)/g,
        componentValue: /(?<=\__declare_var .* = .).+?(?=\])/gs,
        exportVarName: /(?<=\__ismodule __export__var ).+?(?=\ {)/g,
        exportVarValue: /(?<=\__ismodule __export__var .* .).+?(?=\})/gs
    }
    let ResultString = code;

    let parsed = {
        modules: ResultString.match(Regex.parseModules),
        varValues: ResultString.match(Regex.varValue),
        varNames: ResultString.match(Regex.varName),
        componentName: ResultString.match(Regex.componentName),
        componentValue: ResultString.match(Regex.componentValue),
        exportName: ResultString.match(Regex.exportVarName),
        exportValue: ResultString.match(Regex.exportVarValue)
    }

    if (parsed.varValues) {
        parsed.vars = []
        for (let i = 0; parsed.varValues.length > i; i++) {
            let temp_obj = {
                name: String(parsed.varNames[i]).split(";").join(""),
                value: String(parsed.varValues[i]), //.split('"').join(""),
                index: i
            }
            parsed.vars.push(temp_obj)
        }
    }
    if (parsed.exportValue) {
        parsed.exports = []
        for (let i = 0; parsed.exportValue.length > i; i++) {
            let temp_obj = {
                name: String(parsed.exportName[i]),
                value: String(parsed.exportValue[i]),
                index: i
            }
            parsed.exports.push(temp_obj)
        }
    }
    if (parsed.componentValue) {
        parsed.components = [];
        for (let i = 0; parsed.componentValue.length > i; i++) {
            let temp_obj = {
                name: String(parsed.componentName[i]),
                value: String(parsed.componentValue[i])
            }
            parsed.components.push(temp_obj)
        }
    }

    parsed.vars.forEach(item => {
        let regex = new RegExp(item.name, "g");
        ResultString = ResultString.replace(regex, item.value)
    })
    ResultString = __cleaner(ResultString, [
        "__ismodule",
        "__declare_var",
        "__module"
    ])
    return ResultString;
}

function __call(string) {
    let parsed = _generate(result(string))
    return parsed;
}

module.exports = __call;