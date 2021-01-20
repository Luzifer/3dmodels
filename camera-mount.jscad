/*
 * title      : Camera adapter for pipe-mounted monitor mount
 * author     : Knut Ahlers
 * revision   : 0.1.0
 */

/* exported main */
function main () {
  return union(
    // Add base plate
    difference(
      cube({ size: [65, 55, 3], center: true }),
      // Cut a small stripe into it as one screw is a little extruded
      cube({ size: [65, 17, 1], center: true }).translate([0, 0, 1])
    ),

    // Add rails to hold on metal plate
    cube({ size: [55, 3, 9], center: true }).translate([0, 45/2+3/2, 9/2-3/2]),
    cube({ size: [55, 3, 9], center: true }).translate([0, -45/2-3/2, 9/2-3/2]),
    cube({ size: [55, 3, 2], center: true }).translate([0, 45/2-3/2, 6.5]),
    cube({ size: [55, 3, 2], center: true }).translate([0, -45/2+3/2, 6.5]),

    // Add camera holder
    difference(
      cube({ size: [8, 20, 35], center: true }).translate([65/2-8/2, 0, 35/2-3/2]),
      // Remove hole for an M6 screw
      cylinder({ r: 3, h: 200 }).rotateY(90).translate([0, 0, 24+2/3]),
      // Remove small step to prevent camera rotation
      cube({ size: [1, 20, 19], center: true }).translate([65/2-1/2, 0, 19/2+3/2+(35-19-3)])
    )
  )
}

// vim: set ft=javascript:

