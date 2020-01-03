// title      : Sonoff DEV box for lamp post
// author     : Knut Ahlers
// revision   : 0.2

// All measurements in mm
const innerSpace = 15 // free room on the inside from the board not to bend the cables that hard
const innerSpaceHeight = 30
const boardSize = 50 // 50x50mm
const boardSupportHeight = 10 // 10mm pins to put the board on
const boardSupportRadius = 1 // 2mm (holes do have 3mm)
const boardSupportEdgeDist = 2.5 // 2.5mm from the edges
const lampPostRadius = 7.5 // 15mm diameter
const lampPostSupport = lampPostRadius + 4.5 // adjust for proper grip
const screwBaseSize = 3 // block to screw the screw into
const screwHeadRadius = 1.25 // screw head diameter = 2*screwHeadRadius
const screwDiameter = 0.4 // diameter for the hole the screw is screwed into
const ventSize = 1
const ventWidth = (boardSize + innerSpace - 5 * ventSize) / 2
const wall = 2.5 // wall thickness

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
        ventSize
      ], center: true}),
      cube({ size: [
        ventSize * 3,
        boardSize + innerSpace + wall + 10,
        ventSize
      ], center: true})
    )
  )

  const endZ = ((innerSpaceHeight + wall) / 2) * -1 + 1.5 * ventSize
  const startZ = ((innerSpaceHeight + wall) / 2) - 2 * ventSize - wall
  for (let z = startZ; z >= endZ; z -= 3 * ventSize) {
    obj = difference(
      obj,
      ventRow.translate([0, 0, z])
    )
  }

  return obj
}

function main() {
  const boardSupport = cylinder({
    h: boardSupportHeight + wall,
    r: boardSupportRadius,
    center: true,
  })

  const screwHeadSink = sphere({
    r: screwHeadRadius,
    center: true,
  })

  const screwHole = cylinder({
    h: screwBaseSize,
    r: screwDiameter,
    center: true,
  })

  const screwBase = difference(
    cube({ size: [screwBaseSize, screwBaseSize, screwBaseSize], center: true }),
    screwHole
  )

  return [
    // Housing without lid
    union(
      // Housing with holder
      addVents(
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
        )
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

      // Screw bases
      translate([
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        ((innerSpaceHeight + wall) / 2 - screwBaseSize / 2) * -1,
      ], screwBase),
      translate([
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        ((innerSpaceHeight + wall) / 2 - screwBaseSize / 2) * -1,
      ], screwBase),
      translate([
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        ((innerSpaceHeight + wall) / 2 - screwBaseSize / 2) * -1,
      ], screwBase),
      translate([
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        ((innerSpaceHeight + wall) / 2 - screwBaseSize / 2) * -1,
      ], screwBase)
    ).translate([(boardSize + innerSpace + wall + 5) * -0.5, 0, (innerSpaceHeight + wall)/2]),

    // Lid
    difference(
      cube({ size: [
        boardSize + innerSpace + wall,
        boardSize + innerSpace + wall,
        wall,
      ], center: true }),

      // Screw holes
      translate([
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        0,
      ], screwHole),
      translate([
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        0,
      ], screwHole),
      translate([
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        0,
      ], screwHole),
      translate([
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        0,
      ], screwHole),

      // Screw head sinks
      translate([
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        screwHeadRadius - wall / 3,
      ], screwHeadSink),
      translate([
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        screwHeadRadius - wall / 3,
      ], screwHeadSink),
      translate([
        (boardSize + innerSpace) / 2 - screwBaseSize / 2,
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        screwHeadRadius - wall / 3,
      ], screwHeadSink),
      translate([
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        ((boardSize + innerSpace) / 2 - screwBaseSize / 2) * -1,
        screwHeadRadius - wall / 3,
      ], screwHeadSink)
    ).translate([(boardSize + innerSpace + wall + 5) * 0.5, 0, wall/2])
  ]
}

// vim: set ft=javascript:
