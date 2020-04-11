/*
 * title      : Holder for T-Shape razor
 * author     : Knut Ahlers
 * revision   : 0.1.1
 */

function main () {
  return difference(
    cube({ size: [37, 45, 25] }),
    union(
      cube({ size: [25, 45, 22] }).translate([0, 0, 4]), // huge cut front
      cube({ size: [6, 45, 22] }).translate([28, 0, 0]), // glass
      cylinder({ r: 4.5, h: 25 }).translate([12.5, 22.5, 0]), // handle round
      cube({ size: [12.5, 9, 25] }).translate([0, 18, 0]), // handle pass
      cylinder({ r: 1, h: 45 }).rotateX(-90).translate([1.5, 0, 4]), // front border
      cube({ size: [24.2, 45, 1] }).translate([0.8, 0, 3]), // front border main reduce
      difference(
        cube({ size: [3, 45, 3] }).translate([25, 0, 22]),
        cylinder({ r: 3, h: 45 }).rotateX(-90).translate([28, 0, 22])
      ), // rounded top front
      difference(
        cube({ size: [3, 45, 3] }).translate([34, 0, 22]),
        cylinder({ r: 3, h: 45 }).rotateX(-90).translate([34, 0, 22])
      ) // rounded top back
    )
  )
}

// vim: set ft=javascript:
