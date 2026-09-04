/*
 * title      : Door-handle catch for round door handles to be held to the wall
 * author     : Knut Ahlers
 * revision   : 0.1.0
 */

const { extrudeLinear } = require('@jscad/modeling').extrusions
const { polygon } = require('@jscad/modeling').primitives
const { rotateX } = require('@jscad/modeling').transforms

const armInnerLength = 25 // mm
const armWidth = 5 // mm
const backHeight = 40 // mm
const backRoundingRadius = 4 // mm
const curveSegments = 64 // segments per full circle
const extrusionDepth = 15 // mm
const hookDepth = 12 // mm
const hookDiagonalAngle = 45 // degrees from horizontal
const hookRoundingRadius = 4 // mm
const innerDiagonalRadius = 1.4 // mm
const outerDiagonalRadius = 3.8 // mm

const main = () => rotateX(
  Math.PI / 2,
  extrudeLinear({ height: extrusionDepth }, polygon({ points: calculateProfile() })),
)

function calculateDiagonal(hookBottomZ, hookInsideX) {
  const angle = degreesToRadians(hookDiagonalAngle)
  const innerCenter = [hookInsideX + innerDiagonalRadius, hookBottomZ]
  const innerTangent = [
    innerCenter[0] + innerDiagonalRadius * Math.sin(angle),
    innerCenter[1] - innerDiagonalRadius * Math.cos(angle),
  ]
  const outerCenterZ = backHeight - outerDiagonalRadius
  const outerTangentZ = outerCenterZ - outerDiagonalRadius * Math.cos(angle)
  const diagonalLength = (outerTangentZ - innerTangent[1]) / Math.sin(angle)
  const outerTangentX = innerTangent[0] + diagonalLength * Math.cos(angle)
  const outerCenter = [
    outerTangentX - outerDiagonalRadius * Math.sin(angle),
    outerCenterZ,
  ]

  return { angle, innerCenter, outerCenter }
}

function calculateProfile() {
  const armBottomZ = backHeight - armWidth
  const hookBottomZ = armBottomZ - hookDepth
  const hookInsideX = armWidth + armInnerLength
  const { angle, innerCenter, outerCenter } = calculateDiagonal(hookBottomZ, hookInsideX)

  return [
    // Straight back and upper outer edge
    [0, 0],
    [0, backHeight],
    [outerCenter[0], backHeight],

    // Rounded outer edge, diagonal catch and rounded inner edge
    ...createArcPoints(outerCenter, outerDiagonalRadius, Math.PI / 2, angle - Math.PI / 2),
    ...createArcPoints(innerCenter, innerDiagonalRadius, 3 * Math.PI / 2 + angle, Math.PI),
    [hookInsideX, armBottomZ - hookRoundingRadius],

    // Horizontal hook with rounded shoulders
    ...createArcPoints(
      [hookInsideX - hookRoundingRadius, armBottomZ - hookRoundingRadius],
      hookRoundingRadius,
      0,
      Math.PI / 2,
    ),
    [armWidth + backRoundingRadius, armBottomZ],
    ...createArcPoints(
      [armWidth + backRoundingRadius, armBottomZ - backRoundingRadius],
      backRoundingRadius,
      Math.PI / 2,
      Math.PI,
    ),

    // Inner back and rounded lower end
    [armWidth, backRoundingRadius],
    ...createArcPoints(
      [armWidth - backRoundingRadius, backRoundingRadius],
      backRoundingRadius,
      2 * Math.PI,
      3 * Math.PI / 2,
    ),
    [0, 0],
  ]
}

function createArcPoints(center, radius, startAngle, endAngle) {
  const segments = Math.ceil(Math.abs(endAngle - startAngle) / (2 * Math.PI) * curveSegments)

  return Array.from({ length: segments }, (_, index) => {
    const angle = startAngle + (endAngle - startAngle) * (index + 1) / segments
    return [
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle),
    ]
  })
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180
}

module.exports = { main }
