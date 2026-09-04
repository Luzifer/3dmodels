/*
 * title      : Sonoff DEV box for lamp post
 * author     : Knut Ahlers
 * revision   : 0.2.7
 */

const { subtract, union } = require('@jscad/modeling').booleans
const { cuboid, cylinder } = require('@jscad/modeling').primitives
const { rotateY, translate } = require('@jscad/modeling').transforms

// All measurements in mm
const boardSize = 51 // 51x51mm
const boardSupportHeight = 6 // pins to put the board on
const boardSupportRadius = 1.25
const boardSupportEdgeDist = 3 // mm from the edges to hole center
const innerSpace = 10 // free room on the inside from the board not to bend the cables that hard
const innerSpaceHeight = 20
const lampPostRadius = 7 // 14mm diameter
const lampPostSupport = lampPostRadius + 4.5 // adjust for proper grip
const powerInletHeight = 8 // Size of power adapter
const powerInletWidth = 14 // Size of power adapter
const powerInletPosY = boardSize / -2 + 11 + powerInletWidth / 2
const ventSize = 1
const ventWidth = (boardSize + innerSpace - 5 * ventSize) / 2
const wall = 1 // wall thickness

function addVents(obj) {
  const ventRow = subtract(
    union(
      cuboid({ size: [
        boardSize + innerSpace + wall + 10,
        ventWidth * 2 + ventSize,
        ventSize,
      ] }),
      cuboid({ size: [
        ventWidth * 2 + ventSize,
        boardSize + innerSpace + wall + 10,
        ventSize,
      ] }),
    ),
    union(
      cuboid({ size: [
        boardSize + innerSpace + wall + 10,
        ventSize * 3,
        ventSize,
      ] }),
      cuboid({ size: [
        ventSize * 3,
        boardSize + innerSpace + wall + 10,
        ventSize,
      ] }),
    ),
  )

  const endZ = (innerSpaceHeight + wall) / 2 * -1 + 1.5 * ventSize
  const startZ = (innerSpaceHeight + wall) / 2 - 2 * ventSize - wall
  for (let z = startZ; z >= endZ; z -= 3 * ventSize) {
    obj = subtract(
      obj,
      translate([0, 0, z], ventRow),
    )
  }

  return obj
}

const main = () => {
  const boardSupport = cylinder({
    height: boardSupportHeight + wall,
    radius: boardSupportRadius,
  })

  return [
    // Housing without lid
    translate(
      [(boardSize + innerSpace + wall + 5) * -0.5, 0, (innerSpaceHeight + wall) / 2],
      union(
      // Housing with holder
        subtract(
          union(
            addVents(subtract(
              union(
              // Main housing block
                cuboid({ size: [
                  boardSize + innerSpace + wall * 2,
                  boardSize + innerSpace + wall * 2,
                  innerSpaceHeight + wall,
                ] }),

                // Lamp post holder
                translate(
                  [0, 0, (innerSpaceHeight + wall) / 2],
                  rotateY(Math.PI / 2, subtract(
                    cylinder({
                      height: boardSize + innerSpace + wall,
                      radius: lampPostSupport,
                    }),
                    translate([lampPostRadius * -1, 0, 0], cylinder({
                      height: boardSize + innerSpace + wall,
                      radius: lampPostRadius,
                    })),
                  )),
                ),
              ),

              // Inner housing
              translate([0, 0, wall * -0.5], cuboid({ size: [
                boardSize + innerSpace,
                boardSize + innerSpace,
                innerSpaceHeight,
              ] })),
            )),
            // Outer border of power inlet
            translate([
              (boardSize + innerSpace + wall) / 2,
              powerInletPosY,
              (innerSpaceHeight + wall) / 2 - (wall + powerInletHeight / 2),
            ], cuboid({ size: [wall, powerInletWidth + wall * 2, powerInletHeight + wall * 2] })),
          ),
          // Inner space of power inlet
          translate([
            (boardSize + innerSpace + wall) / 2,
            powerInletPosY,
            (innerSpaceHeight + wall) / 2 - (wall + powerInletHeight / 2),
          ], cuboid({ size: [wall, powerInletWidth, powerInletHeight] })),
        ),

        // Board supports
        translate([
          boardSize / 2 - boardSupportEdgeDist,
          boardSize / 2 - boardSupportEdgeDist,
          (innerSpaceHeight + wall) / 2 - (boardSupportHeight + wall) / 2,
        ], boardSupport),
        translate([
          (boardSize / 2 - boardSupportEdgeDist) * -1,
          boardSize / 2 - boardSupportEdgeDist,
          (innerSpaceHeight + wall) / 2 - (boardSupportHeight + wall) / 2,
        ], boardSupport),
        translate([
          boardSize / 2 - boardSupportEdgeDist,
          (boardSize / 2 - boardSupportEdgeDist) * -1,
          (innerSpaceHeight + wall) / 2 - (boardSupportHeight + wall) / 2,
        ], boardSupport),
        translate([
          (boardSize / 2 - boardSupportEdgeDist) * -1,
          (boardSize / 2 - boardSupportEdgeDist) * -1,
          (innerSpaceHeight + wall) / 2 - (boardSupportHeight + wall) / 2,
        ], boardSupport),
      ),
    ),

    // Lid
    translate(
      [(boardSize + innerSpace + wall + 5) * 0.5, 0, wall / 2],
      union(
        subtract(cuboid({ size: [
          boardSize + innerSpace + wall * 2,
          boardSize + innerSpace + wall * 2,
          wall,
        ] })),
        translate([0, 0, wall], subtract(
          cuboid({ size: [
            boardSize + innerSpace,
            boardSize + innerSpace,
            wall,
          ] }),
          // cut out inside to save material
          cuboid({ size: [
            boardSize + innerSpace - 2 * wall,
            boardSize + innerSpace - 2 * wall,
            wall,
          ] }),
          // cut out corners as they don't really fit when printed
          translate(
            [(boardSize + innerSpace - wall) / 2, (boardSize + innerSpace - wall) / 2, 0],
            cuboid({ size: [5 * wall, 5 * wall, wall] }),
          ),
          translate(
            [(boardSize + innerSpace - wall) / -2, (boardSize + innerSpace - wall) / 2, 0],
            cuboid({ size: [5 * wall, 5 * wall, wall] }),
          ),
          translate(
            [(boardSize + innerSpace - wall) / -2, (boardSize + innerSpace - wall) / -2, 0],
            cuboid({ size: [5 * wall, 5 * wall, wall] }),
          ),
          translate(
            [(boardSize + innerSpace - wall) / 2, (boardSize + innerSpace - wall) / -2, 0],
            cuboid({ size: [5 * wall, 5 * wall, wall] }),
          ),
        )),
      ),
    ),
  ]
}

module.exports = { main }

// vim: set ft=javascript:
