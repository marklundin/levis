
//# Vertex
//! VERTEX

void main() {

	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}


//# TTFragment
//! FRAGMENT

uniform vec3 color;
uniform float offset;
uniform float exponent;


{{ libs/noise3d.glsl }}

void main() {

	gl_FragColor = vec4( color, 1.0 );

}