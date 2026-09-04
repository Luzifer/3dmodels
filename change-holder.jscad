/*
 * title      : Spare-Change holder
 * author     : Knut Ahlers
 * revision   : 0.1.2
 */

const { subtract } = require('@jscad/modeling').booleans
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { rotateY, translate } = require('@jscad/modeling').transforms

const coinCount = 15
const coinDiameters = [
  24, // 1 EUR
  27, // 2 EUR
]
const coinHeight = 2.8 // Use max coin thickness + a little but less than 2 coins
const fingerDia = 18 // Measure your finger, should be less than the smallest coin diameter
const height = coinCount * coinHeight // Think of something to hold all the coins but not too big
const wall = 1.5 // Something you're comfortable with to print and hold your coin

const blockHeight = () => coinDiameters.sort().reverse()[0] + wall
const blockWidth = () => coinDiameters.reduce((sum, v) => sum + v) + (coinDiameters.length + 1) * wall

const calcMove = (posY, slotDia) => slotDia / 2 + posY

const main = () => {
  // Create a block containing everything
  let obj = translate(
    [0, blockWidth() / 2, 0],
    cuboid({ size: [
      height,
      blockWidth(),
      blockHeight(),
    ] }),
  )

  let posY = wall
  for (const slotDia of coinDiameters) {
    // Remove pipes holding the coins
    obj = subtract(
      obj,
      translate([
        wall,
        calcMove(posY, slotDia),
        blockHeight() / 2 - slotDia / 2,
      ], rotateY(Math.PI / 2, cylinder({
        height,
        radius: slotDia / 2,
      }))),
    )

    // Remove finger access to coins
    obj = subtract(
      obj,
      translate([
        0,
        posY + slotDia / 2,
        blockHeight() / 2 - slotDia / 4,
      ], cuboid({ size: [
        height,
        fingerDia,
        slotDia / 2,
      ] })),
    )

    // Remove one-coin-slot to pull coins out
    obj = subtract(
      obj,
      translate([
        height / -2 + wall + coinHeight / 2,
        posY + slotDia / 2,
        blockHeight() / 2 - slotDia / 4,
      ], cuboid({ size: [
        coinHeight,
        slotDia,
        slotDia / 2,
      ] })),
    )

    posY += slotDia + wall
  }

  return obj
}

module.exports = { main }

// vim: set ft=javascript:
