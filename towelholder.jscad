/*
 * title      : Kitchen-towel holder for fridge
 * author     : Knut Ahlers
 * revision   : 0.1.1
 */

function main () {
  return union(
    gen_holder(true),
    gen_holder(false),
    gen_ring().translate([-30, -30, 0]),
    gen_ring().translate([-30, 30, 0])
  )
}

function gen_holder(left) {
  return difference(
    cube({ size: [97, 15, 77] }),
    cube({ size: [74, 15, 24] }).translate([0, 0, 53]), // Empty space front top
    cube({ size: [17, 15, 74] }).translate([77, 0, 0]), // Door
    cube({ size: [3, 15, 54] }).translate([94, 0, 0]), // Shorten back holder
    cylinder({ r: 19.75, h: 5 }).rotateX(-90).translate([26.5, left ? 0 : 10, 26.5]),
    difference(
      cylinder({ r: 22.5, h: 5 }),
      difference(
        union(
          cube({ size: [51, 5, 5] }).translate([-25.5, -2.5, 0]),
          cube({ size: [5, 51, 5] }).translate([-2.5, -25.5, 0])
        ),
        cylinder({ r: 19.75, h: 5 })
      )
    ).rotateX(-90).translate([26.5, left ? 5 : 5, 26.5]),
    intersection(
      difference(
        union(
          cube({ size: [45, 5, 5] }).translate([-22.5, -2.5, 0]),
          cube({ size: [5, 45, 5] }).translate([-2.5, -22.5, 0])
        ),
        cylinder({ r: 19.75, h: 5 })
      ),
      cylinder({ r: 22.5, h: 5 })
    ).rotateZ(45).rotateX(-90).translate([26.5, left ? 0 : 10, 26.5])
  ).translate([0, 0, 10]).rotateX(left ? -90 : 90).translate([0, 0, left ? 15 : 0])
}

function gen_ring() {
  return difference(
    intersection(
      union(
        cylinder({ r: 19.5, h: 10 }),
        cube({ size: [51, 4.5, 4.5] }).translate([-25.5, -2.25, 0])
      ),
      cylinder({ r: 22.5, h: 10 })
    ),
    cylinder({ r: 17, h: 10 })
  )
}

// vim: set ft=javascript:
