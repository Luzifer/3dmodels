/*
 * title      : PIR holder
 * author     : Knut Ahlers
 * revision   : 0.1.2
 */

const { subtract, union } = require('@jscad/modeling').booleans
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { rotateX, translate } = require('@jscad/modeling').transforms

const main = () => union(
  subtract(
    translate([0, 0, -2.5], cuboid({ size: [45, 5, 29] })),
    translate([19.5, 0, 1], cuboid({ size: [2, 5, 22] })),
    translate([0, 0, -14.5], cuboid({ size: [18, 5, 1.5] })),
  ),
  translate([-12.5, -4, -10], rotateX(Math.PI / 2, cylinder({ height: 4, radius: 2 }))),
  translate([-12.5, -4, 10], rotateX(Math.PI / 2, cylinder({ height: 4, radius: 2 }))),
)

module.exports = { main }

// vim: set ft=javascript:
