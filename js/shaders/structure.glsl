
//# Vertex
//! VERTEX

#define NUM_METABALLS 8


varying float vVolume;

uniform float uExponent;
uniform vec4 uMetaballs[ NUM_METABALLS ];

void main() {

	// vec3 newPosition = position + amplitude * displacement;
	// vNoise = snoise( position / 600.0 );;

	// for( int i = 0; i < NUM_METABALLS ; i++ ){
	// 	metaball = uMetaballs[i];
		vVolume += pow( uMetaballs[0].w / length( uMetaballs[0].xyz - position ), uExponent );
		vVolume += pow( uMetaballs[1].w / length( uMetaballs[1].xyz - position ), uExponent );
		vVolume += pow( uMetaballs[2].w / length( uMetaballs[2].xyz - position ), uExponent );
		vVolume += pow( uMetaballs[3].w / length( uMetaballs[3].xyz - position ), uExponent );
		vVolume += pow( uMetaballs[4].w / length( uMetaballs[4].xyz - position ), uExponent );
		vVolume += pow( uMetaballs[5].w / length( uMetaballs[4].xyz - position ), uExponent );
		vVolume += pow( uMetaballs[6].w / length( uMetaballs[4].xyz - position ), uExponent );
		vVolume += pow( uMetaballs[7].w / length( uMetaballs[4].xyz - position ), uExponent );
	// }

	vVolume = min( 1.0, vVolume );

	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}


//# TTFragment
//! FRAGMENT


uniform vec3 color;
uniform float opacity;

varying float vVolume;

void main() {

	// gl_FragColor = vec4( vec3( 1.0 ), vVolume );
	gl_FragColor = vec4( vec3( 1.0 ), step( 0.5, vVolume ) + 0.05 );

}



