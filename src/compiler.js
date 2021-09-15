const Snapdragon = require("snapdragon"),
    snapdragon = new Snapdragon();
function compile(tokens, ast) {
    let result = snapdragon.compiler
    tokens.forEach(item => {
        result.set(item.name, function (node) {
            if (item.replacer == false) {
                return this.emit(node.val)
            } else {
                return this.emit(item.replacer(node))
            }
        })
    });
    return result.compile(ast)
}

module.exports = compile;