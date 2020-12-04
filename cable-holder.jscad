/*
 * title      : Cable holder for velcro tape
 * author     : Knut Ahlers
 * revision   : 0.1.0
 */

/* exported main */
function main () {
  return difference(
    union(
      cube({ size: [55, 21, 2] }),
      cube({ size: [2, 21, 3] }).translate([0, 0, 2]),
      cube({ size: [2, 21, 3] }).translate([53, 0, 2]),
      cube({ size: [2, 21, 3] }).translate([26.5, 0, 2])
    ),
    cube({ size: [55, 17, 1.2] }).translate([0, 2, 1.8])
  )
}

// vim: set ft=javascript:
