/*
 * title      : PIR holder
 * author     : Knut Ahlers
 * revision   : 0.1.1
 */

/* exported main */
function main () {
  return union(
    difference(
      cube({ size: [45, 5, 29], center: true }).translate([0, 0, -2.5]),
      cube({ size: [2, 5, 22], center: true }).translate([19.5, 0, 1]),
      cube({ size: [18, 5, 1.5], center: true }).translate([0, 0, -14.5])
    ),
    cylinder({ h: 4, r: 2, center: true })
      .rotateX(90)
      .translate([-12.5, -4, -10]),
    cylinder({ h: 4, r: 2, center: true })
      .rotateX(90)
      .translate([-12.5, -4, 10])
  )
}

// vim: set ft=javascript:
