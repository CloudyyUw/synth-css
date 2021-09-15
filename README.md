# Synth-Css

***Extended css***:

Synth is an extension of css, adding some functionality on top of it, such as variables, functions, and modules.

---

> **Notes**: This project is still in an early stage of development and with few things implemented yet.

# Installation

```bash
npm i synth-css --save
```
Or
```bash
yarn add synth-css
```

# Syntax

The syntax is very simple, you can use pure css with it as well.

Just create a `.sy` file like this:
```css
/*
    Using semantic-ui as an example.
*/
define .ui.inverted.segment as $segment
define .white-theme as $white

body.$white $segment (
    /* FORCE is the same as using !important */
    color: black FORCE;
    background: white FORCE;
)
```
# Usage
To compile the files
```bash
synth --dir:__dirname/path/to/your/.sy/files --out:__dirname/out/dir
```