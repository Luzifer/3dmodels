/*
 * title      : Tassimo TAS6515 swimmer replacement
 * author     : Knut Ahlers
 * revision   : 0.1.10
 */

function main () {
  return difference(
    cube({size: [42, 30, 8], center: true}),
    cylinder({r: 5.5, h: 5, center: true}).translate([-42/2+24, 0, 1.5]),
    cube({ size: [42, 30, 8], center: true }).rotateY(-10).translate([15,0,-5])
  )
}

// vim: set ft=javascript:
