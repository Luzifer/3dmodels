/*
 * title      : Kitchen-towel holder for fridge
 * author     : Knut Ahlers
 * revision   : 0.1.2
 */

const { intersect, subtract, union } = require('@jscad/modeling').booleans
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { rotateX, rotateZ, translate } = require('@jscad/modeling').transforms

const main = () => union(
  genHolder(true),
  genHolder(false),
  translate([-30, -30, 0], genRing()),
  translate([-30, 30, 0], genRing()),
)

function genHolder(left) {
  return translate(
    [0, 0, left ? 15 : 0],
    rotateX(
      left ? -Math.PI / 2 : Math.PI / 2,
      translate([0, 0, 10], subtract(
        cuboid({ center: [97 / 2, 15 / 2, 77 / 2], size: [97, 15, 77] }),
        translate([0, 0, 53], cuboid({ center: [74 / 2, 15 / 2, 24 / 2], size: [74, 15, 24] })), // Empty space front top
        translate([77, 0, 0], cuboid({ center: [17 / 2, 15 / 2, 74 / 2], size: [17, 15, 74] })), // Door
        translate([94, 0, 0], cuboid({ center: [3 / 2, 15 / 2, 54 / 2], size: [3, 15, 54] })), // Shorten back holder
        translate(
          [26.5, left ? 0 : 10, 26.5],
          rotateX(-Math.PI / 2, cylinder({ center: [0, 0, 5 / 2], height: 5, radius: 19.75 })),
        ),
        translate(
          [26.5, 5, 26.5],
          rotateX(-Math.PI / 2, subtract(
            cylinder({ center: [0, 0, 5 / 2], height: 5, radius: 22.5 }),
            subtract(
              union(
                translate([-25.5, -2.5, 0], cuboid({ center: [51 / 2, 5 / 2, 5 / 2], size: [51, 5, 5] })),
                translate([-2.5, -25.5, 0], cuboid({ center: [5 / 2, 51 / 2, 5 / 2], size: [5, 51, 5] })),
              ),
              cylinder({ center: [0, 0, 5 / 2], height: 5, radius: 19.75 }),
            ),
          )),
        ),
        translate(
          [26.5, left ? 0 : 10, 26.5],
          rotateX(-Math.PI / 2, rotateZ(Math.PI / 4, intersect(
            subtract(
              union(
                translate([-22.5, -2.5, 0], cuboid({ center: [45 / 2, 5 / 2, 5 / 2], size: [45, 5, 5] })),
                translate([-2.5, -22.5, 0], cuboid({ center: [5 / 2, 45 / 2, 5 / 2], size: [5, 45, 5] })),
              ),
              cylinder({ center: [0, 0, 5 / 2], height: 5, radius: 19.75 }),
            ),
            cylinder({ center: [0, 0, 5 / 2], height: 5, radius: 22.5 }),
          ))),
        ),
      )),
    ),
  )
}

function genRing() {
  return subtract(
    intersect(
      union(
        cylinder({ center: [0, 0, 10 / 2], height: 10, radius: 19.5 }),
        translate([-25.5, -2.25, 0], cuboid({ center: [51 / 2, 4.5 / 2, 4.5 / 2], size: [51, 4.5, 4.5] })),
      ),
      cylinder({ center: [0, 0, 10 / 2], height: 10, radius: 22.5 }),
    ),
    cylinder({ center: [0, 0, 10 / 2], height: 10, radius: 17 }),
  )
}

module.exports = { main }

// vim: set ft=javascript:
