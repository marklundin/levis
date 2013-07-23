
//# Vertex
//! VERTEX

#define NUM_METABALLS 4

uniform float amplitude;

attribute vec3 displacement;
attribute vec3 customColor;

varying float vVolume;

uniform vec3 uMetaballs[ NUM_METABALLS ];

void main() {

	// vec3 newPosition = position + amplitude * displacement;
	// vNoise = snoise( position / 600.0 );

	vec3 dimension = vec3( 750.0 );
	vec3 p = position / dimension;

	for( int i = 0; i < NUM_METABALLS ; i++ ){
		vVolume += max( 0.0, 1.0 / pow( length( uMetaballs[i]  - p ), 200.0 ));// 1000.0;
	}


	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}


//# TTFragment
//! FRAGMENT


uniform vec3 color;
uniform float opacity;

varying float vVolume;

void main() {

	gl_FragColor = vec4( vec3( 1.0 ), step( 0.3, vVolume ));

}



