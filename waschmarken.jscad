/*
 * title      : Spring-holder for coins for the car-wash-park
 * author     : Knut Ahlers
 * revision   : 0.1.0
 */

const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { subtract, union } = require('@jscad/modeling').booleans
const { translate } = require('@jscad/modeling').transforms

const coinDia = 27.0 // mm
const coinHeight = 1.8 // mm
const coinToWallSpacing = 0.25 // mm
const springCompressedHeight = 9 // mm
const springRelaxedHeight = 30 // mm
const springRadius = 9 // mm
const wallThickness = 1.5 // mm

function bottomCap() {
  return union(
    translate([0, 0, 0.5 * wallThickness], cylinder({
      height: wallThickness,
      radius: outerRadius(),
      segments: 64,
    })),
    translate([0, 0, 0.5 * (wallThickness + springCompressedHeight)], subtract(
      cylinder({
        height: wallThickness + springCompressedHeight,
        radius: outerRadius() - wallThickness - 0.5 * coinToWallSpacing,
        segments: 64,
      }),
      cylinder({
        height: wallThickness + springCompressedHeight,
        radius: springRadius,
        segments: 64,
      })
    ))
  )
}

function cylinderHeight() {
  return innerSpacingHeight() + wallThickness
}

function innerBlock() {
  return translate([0, 0, coinHeight], subtract(
    cylinder({
      height: 2 * coinHeight,
      radius: 0.5 * coinDia,
      segments: 64,
    }),
    translate([0, 0, 0.5 * coinHeight], subtract(
      cylinder({
        height: coinHeight,
        radius: springRadius + 0.75,
        segments: 64,
      }),
      cylinder({
        height: coinHeight,
        radius: springRadius - 0.75,
        segments: 64,
      })
    ))
  ))
}

function innerSpacingHeight() {
  return springRelaxedHeight - 0.5 * coinHeight
}

function outerRadius() {
  return 0.5 * coinDia + coinToWallSpacing + wallThickness
}

function topCap() {
  const topCapHeight = 1.5 * coinHeight + wallThickness
  const topCapInnerRadius = 0.5 * coinDia + coinToWallSpacing
  const topCapRadius = topCapInnerRadius + wallThickness

  return translate([0, 0, 0.5 * topCapHeight], subtract(
    cylinder({
      height: topCapHeight,
      radius: topCapRadius,
      segments: 64,
    }),
    subtract(
      translate([0, 0.5 * topCapRadius, 0], cuboid({
        size: [2 * topCapRadius, topCapRadius, topCapHeight],
      })),
      translate([0, 0, 0.5 * topCapHeight - 0.5 * wallThickness], cylinder({
        height: wallThickness,
        radius: 0.65 * topCapRadius,
        segments: 64,
      }))
    ),
    translate([0, 0, -0.5 * wallThickness], cylinder({
      height: 1.5 * coinHeight,
      radius: topCapInnerRadius,
      segments: 64,
    }))
  ))
}

function main() {
  return union(
    translate([0, 0, 0.5 * cylinderHeight()], union(
      subtract(
        cylinder({
          height: cylinderHeight(),
          radius: outerRadius(),
          segments: 64,
        }),
        cylinder({
          height: cylinderHeight(),
          radius: 0.5 * coinDia + coinToWallSpacing,
          segments: 64,
        })
      ),
      translate([0, 0, 0.5 * cylinderHeight()], topCap())
    )),
    translate([2.5 * outerRadius(), 0, 0], bottomCap()),
    translate([-2.5 * outerRadius(), 0, 0], innerBlock())
  )
}

module.exports = { main }

// vim: set ft=javascript :
