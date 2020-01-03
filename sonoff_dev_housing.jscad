// title      : Sonoff DEV box for lamp post
// author     : Knut Ahlers
// license    : MIT License
// revision   : 0.003
// file       : sonoff_dev_lamp.jscad

// All measurements in mm
const innerSpace = 15 // free room on the inside from the board not to bend the cables that hard
const innerSpaceHeight = 30
const boardSize = 50 // 50x50mm
const boardSupportHeight = 10 // 10mm pins to put the board on
const boardSupportRadius = 1 // 2mm (holes do have 3mm)
const boardSupportEdgeDist = 2.5 // 2.5mm from the edges
const lampPostRadius = 7.5 // 15mm diameter
const lampPostSupport = lampPostRadius + 4.5 // adjust for proper grip
const wall = 2.5 // wall thickness

function main() {
  return [
    union(
      // Housing with holder
      difference(
        union(
          // Main housing block
          cube({ size: [
            boardSize + innerSpace + wall,
            boardSize + innerSpace + wall,
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
            }).translate([-7.5, 0, 0])
          )
          .rotateY(90)
          .translate([0, 0, (innerSpaceHeight + wall)/2])
        ),
        // Inner housing
        cube({ size: [
          boardSize + innerSpace,
          boardSize + innerSpace,
          innerSpaceHeight,
        ], center: true }).translate([0, 0, wall * -1])
      ),
      // Board supports
      cylinder({
        h: boardSupportHeight + wall,
        r: boardSupportRadius,
        center: true,
      }).translate([
        boardSize / 2 - boardSupportEdgeDist,
        boardSize / 2 - boardSupportEdgeDist,
        (innerSpaceHeight + wall) / 2 - (boardSupportHeight + wall) / 2,
      ]),
      cylinder({
        h: boardSupportHeight + wall,
        r: boardSupportRadius,
        center: true,
      }).translate([
        (boardSize / 2 - boardSupportEdgeDist) * -1,
        boardSize / 2 - boardSupportEdgeDist,
        (innerSpaceHeight + wall) / 2 - (boardSupportHeight + wall) / 2,
      ]),
      cylinder({
        h: boardSupportHeight + wall,
        r: boardSupportRadius,
        center: true,
      }).translate([
        boardSize / 2 - boardSupportEdgeDist,
        (boardSize / 2 - boardSupportEdgeDist) * -1,
        (innerSpaceHeight + wall) / 2 - (boardSupportHeight + wall) / 2,
      ]),
      cylinder({
        h: boardSupportHeight + wall,
        r: boardSupportRadius,
        center: true,
      }).translate([
        (boardSize / 2 - boardSupportEdgeDist) * -1,
        (boardSize / 2 - boardSupportEdgeDist) * -1,
        (innerSpaceHeight + wall) / 2 - (boardSupportHeight + wall) / 2,
      ])
    ).translate([0, 0, (innerSpaceHeight + wall)/2])
  ]
}

// vim: set ft=javascript:
