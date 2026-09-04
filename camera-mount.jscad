/*
 * title      : Camera adapter for pipe-mounted monitor mount
 * author     : Knut Ahlers
 * revision   : 0.1.1
 */

const { subtract, union } = require('@jscad/modeling').booleans
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { rotateY, translate } = require('@jscad/modeling').transforms

const main = () => union(
  // Add base plate
  subtract(
    cuboid({ size: [65, 55, 3] }),
    // Cut a small stripe into it as one screw is a little extruded
    translate([0, 0, 1], cuboid({ size: [65, 17, 1] })),
  ),

  // Add rails to hold on metal plate
  translate([0, 45 / 2 + 3 / 2, 9 / 2 - 3 / 2], cuboid({ size: [55, 3, 9] })),
  translate([0, -45 / 2 - 3 / 2, 9 / 2 - 3 / 2], cuboid({ size: [55, 3, 9] })),
  translate([0, 45 / 2 - 3 / 2, 6.5], cuboid({ size: [55, 3, 2] })),
  translate([0, -45 / 2 + 3 / 2, 6.5], cuboid({ size: [55, 3, 2] })),

  // Add camera holder
  subtract(
    translate([65 / 2 - 8 / 2, 0, 35 / 2 - 3 / 2], cuboid({ size: [8, 20, 35] })),
    // Remove hole for an M6 screw
    translate([0, 0, 24 + 2 / 3], rotateY(Math.PI / 2, cylinder({ height: 200, radius: 3 }))),
    // Remove small step to prevent camera rotation
    translate(
      [65 / 2 - 1 / 2, 0, 19 / 2 + 3 / 2 + (35 - 19 - 3)],
      cuboid({ size: [1, 20, 19] }),
    ),
  ),
)

module.exports = { main }
