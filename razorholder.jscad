/*
 * title      : Holder for T-Shape razor
 * author     : Knut Ahlers
 * revision   : 0.1.2
 */

const { subtract, union } = require('@jscad/modeling').booleans
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { rotateX, translate } = require('@jscad/modeling').transforms

const main = () => subtract(
  cuboid({ center: [37 / 2, 45 / 2, 25 / 2], size: [37, 45, 25] }),
  union(
    translate([0, 0, 4], cuboid({ center: [25 / 2, 45 / 2, 22 / 2], size: [25, 45, 22] })), // huge cut front
    translate([28, 0, 0], cuboid({ center: [6 / 2, 45 / 2, 22 / 2], size: [6, 45, 22] })), // glass
    translate([12.5, 22.5, 0], cylinder({ center: [0, 0, 25 / 2], height: 25, radius: 4.5 })), // handle round
    translate([0, 18, 0], cuboid({ center: [12.5 / 2, 9 / 2, 25 / 2], size: [12.5, 9, 25] })), // handle pass
    translate([1.5, 0, 4], rotateX(-Math.PI / 2, cylinder({ center: [0, 0, 45 / 2], height: 45, radius: 1 }))), // front border
    translate([0.8, 0, 3], cuboid({ center: [24.2 / 2, 45 / 2, 1 / 2], size: [24.2, 45, 1] })), // front border main reduce
    subtract(
      translate([25, 0, 22], cuboid({ center: [3 / 2, 45 / 2, 3 / 2], size: [3, 45, 3] })),
      translate([28, 0, 22], rotateX(-Math.PI / 2, cylinder({ center: [0, 0, 45 / 2], height: 45, radius: 3 }))),
    ), // rounded top front
    subtract(
      translate([34, 0, 22], cuboid({ center: [3 / 2, 45 / 2, 3 / 2], size: [3, 45, 3] })),
      translate([34, 0, 22], rotateX(-Math.PI / 2, cylinder({ center: [0, 0, 45 / 2], height: 45, radius: 3 }))),
    ), // rounded top back
  ),
)

module.exports = { main }

// vim: set ft=javascript:
