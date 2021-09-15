module.exports = [
    {
        name: "comment_start",
        regex: /^\/\*/,
        replacer: false
    },
    {
        name: "comment_end",
        regex: /^\*\//,
        replacer: false
    },
    {
        name: "export_var",
        regex: /^export/,
        replacer: (node) => `__ismodule`
    },
    {
        name: "set_of",
        regex: /^set/,
        replacer: (node) => `__export__var`
    },
    // - - [ Future Feature ] - -
    {
        name: "fun_return",
        regex: /^return/,
        replacer: (node) => `__parse_result`
    },
    {
        name: "function",
        regex: /^generate/,
        replacer: (node) => `__call_generate_fun`
    },
    {
        name: "function_params_end",
        regex: /^\|:/,
        replacer: (node) => `){`
    },
    {
        name: "function_params_start",
        regex: /^\|/,
        replacer: (node) => `(`
    },
    // - - [ Future Feature ] - -
    {
        name: "list_start",
        regex: /^new_List/,
        replacer: (node) => `[`
    },
    {
        name: "list_end",
        regex: /^end_List/,
        replacer: (node) => `]`
    },
    {
        name: "end",
        regex: /^end/,
        replacer: (node) => `};`
    },
    {
        name: "equal",
        regex: /^=/,
        replacer: false
    },
    {
        name: "comma",
        regex: /^,/,
        replacer: false
    },
    {
        name: "define_var",
        regex: /^define/,
        replacer: (node) => `__declare_var`
    },
    {
        name: "as_var",
        regex: /^as/,
        replacer: (node) => `__as_name`
    },
    {
        name: "op_import_start",
        regex: /^<"/,
        replacer: (node) => `__path {"`
    },
    {
        name: "op_import_end",
        regex: /^">/,
        replacer: (node) => `"};`
    },
    {
        name: "file_path",
        regex: /^.\//,
        replacer: false
    },
    {
        name: "colon",
        regex: /^:/,
        replacer: false
    },
    {
        name: "dot",
        regex: /^\./,
        replacer: false
    },
    {
        name: "body",
        regex: /^@/,
        replacer: (node) => `body.`
    },
    {
        name: "space",
        regex: /^\s+/,
        replacer: false
    },
    // {
    //     name: "characters",
    //     regex: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+/,
    //     replacer: false
    // },
    {
        name: "linebreak",
        regex: /^(\r\n|\n|\r)/,
        replacer: false
    },
    {
        name: "quotes",
        regex: /^"/,
        replacer: false
    },
    {
        name: "semicolon",
        regex: /^;/,
        replacer: false
    },
    {
        name: "semicolonwithquotes",
        regex: /^";/,
        replacer: false
    },
    {
        name: "semicolonwithquoteswithspace",
        regex: /^\s+";/,
        replacer: false
    },
    {
        name: "square_brackets_open",
        regex: /^\[/,
        replacer: false
    },
    {
        name: "square_brackets_end",
        regex: /^\]/,
        replacer: false
    },
    {
        name: "bracketsopen",
        regex: /^\(/,
        replacer: (node) => `{`
    },
    {
        name: "bracketsend",
        regex: /^\)/,
        replacer: (node) => `}`
    },
    {
        name: "using_var",
        regex: /^using/,
        replacer: (node) => `__module`
    },
    {
        name: "options",
        regex: /^\?:/,
        replacer: (node) => `:`
    },
    {
        name: "important",
        regex: /^\!important;/,
        replacer: false
    },
    {
        name: "force",
        regex: /^FORCE/,
        replacer: (node) => `!important`
    },
    {
        name: "sep",
        regex: /^-/,
        replacer: false
    },
    {
        name: "text",
        regex: /^\w+/,
        replacer: false
    },
    {
        name: 'identifier',
        regex: /\w+/,
        replacer: false
    }
]