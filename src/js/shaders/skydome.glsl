
//# Vertex
//! VERTEX

varying vec3 vWorldPosition;

void main() {

	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
	vWorldPosition = worldPosition.xyz;

	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}


//# TTFragment
//! FRAGMENT

uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vWorldPosition;

{{ libs/noise3d.glsl }}

void main() {

	float h = normalize( vWorldPosition + offset ).y;
	float n = snoise( vWorldPosition * 0.1 ) * 0.1;
	gl_FragColor = vec4( mix( bottomColor , topColor + n , max( pow( h, exponent ), 0.0 ) ) , 1.0 );

}