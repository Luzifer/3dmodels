/*
 * title      : Cable holder for velcro tape
 * author     : Knut Ahlers
 * revision   : 2.0.0
 */

const { cuboid } = require('@jscad/modeling').primitives
const { subtract } = require('@jscad/modeling').booleans
const { translateX } = require('@jscad/modeling').transforms

const main = () => {
  const body = cuboid({ size: [45, 8, 15] })

  const cut = cuboid({ size: [18, 2, 17] })

  return subtract(
    body,
    translateX(-10.5, cut),
    translateX(10.5, cut),
  )
}

module.exports = { main }
