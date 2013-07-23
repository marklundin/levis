
//# Vertex
//! VERTEX

uniform float amplitude;

attribute vec3 displacement;
attribute vec3 customColor;

varying float vOpacity;

void main() {

	// vec3 newPosition = position + amplitude * displacement;
	// vNoise = snoise( position / 600.0 );
	float v = 0.0;

	vec3 ballPos = vec3( 0.0 );
	vec3 ballPos2 = vec3( 0.0 );

	// v += max( 0.0, pow( length( ballPos  - ( position / 500.0 )), 100.0 ));
	// v += max( 0.0, pow( length( ballPos2 - position ), 1.0 ));
	
	vec3 dimension = vec3( 750.0 );
	vec3 p = dimension / position;
	// float r = 750.0 / dimension.x;
	vOpacity = 1.0/ pow( length( p ), 2.0 );// 1000.0;
	// vOpacity = step( 0.1, vOpacity );


	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}


//# TTFragment
//! FRAGMENT


uniform vec3 color;
uniform float opacity;

varying float vOpacity;

void main() {

	gl_FragColor = vec4( vec3( 0.3 ), 1.0 );

}



