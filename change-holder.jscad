/*
 * title      : Spare-Change holder
 * author     : Knut Ahlers
 * revision   : 0.1.0
 */

const coinCount = 15
const coinDiameters = [
  24, // 1 EUR
  26, // 2 EUR
]
const coinHeight = 3 // Use max coin thickness + a little but less than 2 coins
const fingerDia = 18 // Measure your finger, should be less than the smallest coin diameter
const height = coinCount * coinHeight // Think of something to hold all the coins but not too big
const wall = 2 // Something you're comfortable with to print and hold your coin

const blockHeight = () => coinDiameters.sort().reverse()[0] + wall
const blockWidth = () => coinDiameters.reduce((sum, v) => sum + v) + (coinDiameters.length + 1) * wall

const calcMove = (posY, slotDia) => slotDia / 2 + posY

/* exported main */
function main() {
  // Create a block containing everything
  let obj = cube({ size: [
    height,
    blockWidth(),
    blockHeight(),
  ], center: true }).translate([0, blockWidth() / 2, 0])

  let posY = wall
  for (const slotDia of coinDiameters) {
    // Remove pipes holding the coins
    obj = difference(obj, cylinder({
      center: true,
      h: height,
      r: slotDia / 2,
    })
      .rotateY(90)
      .translate([
        wall,
        calcMove(posY, slotDia),
        blockHeight() / 2 - slotDia / 2,
      ]))

    // Remove finger access to coins
    obj = difference(obj, cube({ size: [
      height,
      fingerDia,
      slotDia / 2,
    ], center: true })
      .translate([
        0,
        posY + slotDia / 2,
        blockHeight() / 2 - slotDia / 4,
      ]))

    // Remove one-coin-slot to pull coins out
    obj = difference(obj, cube({ size: [
      coinHeight,
      slotDia,
      slotDia / 2,
    ], center: true })
      .translate([
        height / -2 + wall + coinHeight / 2,
        posY + slotDia / 2,
        blockHeight() / 2 - slotDia / 4,
      ]))

    posY += slotDia + wall
  }

  return obj
}

// vim: set ft=javascript:
