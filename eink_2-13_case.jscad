/*
 * title      : Case for [2.13" Lilygo eink display](https://www.aliexpress.com/item/4000626947976.html)
 * author     : Knut Ahlers
 * revision   : 0.1.1
 */

const boardD = 6
const boardH = 37 + 4
const boardW = 67

const displayH = 25
const displayW = 49.5

const wall = 2

const genCap = () => difference(
  cube({ size: [boardW + 2 * wall, boardH + 2 * wall, wall], center: true }),
  cube({ size: [wall, wall, wall], center: true })
    .translate([boardW / 2 + wall / 2, boardH / 2 + wall / 2, 0]),
  cube({ size: [wall, wall, wall], center: true })
    .translate([boardW / -2 + wall / -2, boardH / 2 + wall / 2, 0]),
  cube({ size: [wall, wall, wall], center: true })
    .translate([boardW / 2 + wall / 2, boardH / -2 + wall / -2, 0]),
  cube({ size: [wall, wall, wall], center: true })
    .translate([boardW / -2 + wall / -2, boardH / -2 + wall / -2, 0])
)

const genInner = () => union(
  // Inner without holding cylinders
  difference(
    cube({ size: [boardW, boardH, boardD], center: true }),
    cylinder({ h: boardD, r: 1, center: true })
      .translate([31, 16.5, 0]),
    cylinder({ h: boardD, r: 1, center: true })
      .translate([-31, 16.5, 0]),
    cylinder({ h: boardD, r: 1, center: true })
      .translate([31, -16.5, 0]),
    cylinder({ h: boardD, r: 1, center: true })
      .translate([-31, -16.5, 0])
  ),
  // Display cut-out
  cube({ size: [displayW, displayH, wall], center: true })
    .translate([boardW / -2 + displayW / 2 + 3, 0, boardD / -2 + wall / -2]),
  // Port cut-out
  cube({ size: [9, wall, boardD], center: true })
    .translate([boardW / 2 - 4.5 - 19.5, boardH / -2 + wall / -2])
)

/* exported main */
function main () {
  return union(
    difference(
      // Block
      cube({ size: [boardW + 2 * wall, boardH + 2 * wall, boardD + 2 * wall], center: true }),
      genInner(),
      genCap().translate([0, 0, boardD / 2 + wall / 2])
    ),
    genCap().translate([0, 2 * boardH, 0])
  )
}

// vim: set ft=javascript:
