/*
 * title      : Sonoff DEV box for lamp post
 * author     : Knut Ahlers
 * revision   : 0.2.4
 */

// All measurements in mm
const boardSize = 51 // 51x51mm
const boardSupportHeight = 6 // pins to put the board on
const boardSupportRadius = 1.25
const boardSupportEdgeDist = 2.5 // 2.5mm from the edges
const innerSpace = 7 // free room on the inside from the board not to bend the cables that hard
const innerSpaceHeight = 20
const lampPostRadius = 7 // 14mm diameter
const lampPostSupport = lampPostRadius + 4.5 // adjust for proper grip
const powerInletHeight = 8 // Size of power adapter
const powerInletWidth = 14 // Size of power adapter
const powerInletPosY = boardSize / -2 + 13 + powerInletWidth / 2
const ventSize = 1
const ventWidth = (boardSize + innerSpace - 5 * ventSize) / 2
const wall = 1.5 // wall thickness

function addVents(obj) {
  const ventRow = difference(
    union(
      cube({ size: [
        boardSize + innerSpace + wall + 10,
        ventWidth * 2 + ventSize,
        ventSize,
      ], center: true }),
      cube({ size: [
        ventWidth * 2 + ventSize,
        boardSize + innerSpace + wall + 10,
        ventSize,
      ], center: true })
    ),
    union(
      cube({ size: [
        boardSize + innerSpace + wall + 10,
        ventSize * 3,
        ventSize,
      ], center: true }),
      cube({ size: [
        ventSize * 3,
        boardSize + innerSpace + wall + 10,
        ventSize,
      ], center: true })
    )
  )

  const endZ = (innerSpaceHeight + wall) / 2 * -1 + 1.5 * ventSize
  const startZ = (innerSpaceHeight + wall) / 2 - 2 * ventSize - wall
  for (let z = startZ; z >= endZ; z -= 3 * ventSize) {
    obj = difference(
      obj,
      ventRow.translate([0, 0, z])
    )
  }

  return obj
}

/* exported main */
function main() {
  const boardSupport = cylinder({
    h: boardSupportHeight + wall,
    r: boardSupportRadius,
    center: true,
  })

  return [
    // Housing without lid
    union(
      // Housing with holder
      difference(
        union(
          addVents(difference(
            union(
              // Main housing block
              cube({ size: [
                boardSize + innerSpace + wall * 2,
                boardSize + innerSpace + wall * 2,
                innerSpaceHeight + wall,
              ], center: true }),

              // Lamp post holder
              difference(
                cylinder({
                  h: boardSize + innerSpace + wall,
                  r: lampPostSupport,
                  center: true,
                  resolution: 100,
                }),
                cylinder({
                  h: boardSize + innerSpace + wall,
                  r: lampPostRadius,
                  center: true,
                  resolution: 100,
                }).translate([lampPostRadius * -1, 0, 0])
              )
              .rotateY(90)
              .translate([0, 0, (innerSpaceHeight + wall) / 2])
            ),

            // Inner housing
            cube({ size: [
              boardSize + innerSpace,
              boardSize + innerSpace,
              innerSpaceHeight,
            ], center: true }).translate([0, 0, wall * -0.5])
          )),
          // Outer border of power inlet
          cube({ size: [wall, powerInletWidth + wall * 2, powerInletHeight + wall * 2], center: true })
          .translate([
            (boardSize + innerSpace + wall) / 2,
            powerInletPosY,
            (innerSpaceHeight + wall) / 2 - (wall + powerInletHeight / 2),
          ])
        ),
        // Inner space of power inlet
        cube({ size: [wall, powerInletWidth, powerInletHeight], center: true })
        .translate([
          (boardSize + innerSpace + wall) / 2,
          powerInletPosY,
          (innerSpaceHeight + wall) / 2 - (wall + powerInletHeight / 2),
        ])
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
      ], boardSupport)
    ).translate([(boardSize + innerSpace + wall + 5) * -0.5, 0, (innerSpaceHeight + wall) / 2]),

    // Lid
    difference(cube({ size: [
      boardSize + innerSpace + wall * 2,
      boardSize + innerSpace + wall * 2,
      wall,
    ], center: true })).translate([(boardSize + innerSpace + wall + 5) * 0.5, 0, wall / 2]),
  ]
}

// vim: set ft=javascript:
