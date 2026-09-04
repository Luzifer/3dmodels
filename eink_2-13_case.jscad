/*
 * title      : Case for [2.13" Lilygo eink display](https://www.aliexpress.com/item/4000626947976.html)
 * author     : Knut Ahlers
 * revision   : 0.1.2
 */

const { subtract, union } = require('@jscad/modeling').booleans
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms

const boardD = 6
const boardH = 37 + 4
const boardW = 67

const displayH = 25
const displayW = 49.5

const wall = 2

const genCap = () => subtract(
  cuboid({ size: [boardW + 2 * wall, boardH + 2 * wall, wall] }),
  translate(
    [boardW / 2 + wall / 2, boardH / 2 + wall / 2, 0],
    cuboid({ size: [wall, wall, wall] }),
  ),
  translate(
    [boardW / -2 + wall / -2, boardH / 2 + wall / 2, 0],
    cuboid({ size: [wall, wall, wall] }),
  ),
  translate(
    [boardW / 2 + wall / 2, boardH / -2 + wall / -2, 0],
    cuboid({ size: [wall, wall, wall] }),
  ),
  translate(
    [boardW / -2 + wall / -2, boardH / -2 + wall / -2, 0],
    cuboid({ size: [wall, wall, wall] }),
  ),
)

const genInner = () => union(
  // Inner without holding cylinders
  subtract(
    cuboid({ size: [boardW, boardH, boardD] }),
    translate([31, 16.5, 0], cylinder({ height: boardD, radius: 1 })),
    translate([-31, 16.5, 0], cylinder({ height: boardD, radius: 1 })),
    translate([31, -16.5, 0], cylinder({ height: boardD, radius: 1 })),
    translate([-31, -16.5, 0], cylinder({ height: boardD, radius: 1 })),
  ),
  // Display cut-out
  translate(
    [boardW / -2 + displayW / 2 + 3, 0, boardD / -2 + wall / -2],
    cuboid({ size: [displayW, displayH, wall] }),
  ),
  // Port cut-out
  translate(
    [boardW / 2 - 4.5 - 19.5, boardH / -2 + wall / -2],
    cuboid({ size: [9, wall, boardD] }),
  ),
)

const main = () => union(
  subtract(
    // Block
    cuboid({ size: [boardW + 2 * wall, boardH + 2 * wall, boardD + 2 * wall] }),
    genInner(),
    translate([0, 0, boardD / 2 + wall / 2], genCap()),
  ),
  translate([0, 2 * boardH, 0], genCap()),
)

module.exports = { main }

// vim: set ft=javascript:
