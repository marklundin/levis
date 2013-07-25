
//# Vertex
//! VERTEX

{{ libs/noise4d.glsl }}

// #define NUM_METABALLS 8
#define NUM_NOISE_LAYERS 3


varying float vVolume;

uniform float uExponent;
uniform float uTime;

uniform vec4 uMetaballs[ NUM_METABALLS ];


// float fbm( vec3 p )
// {
//     float frequency = 1.0;
//     float amplitude = 1.0;
//     float fractalNoise = 0.0;
//     float lacunarity = 2.0;
//     float gain = 0.5;
//     float maxSum = 0.0;

//     for ( int k = 0; k < NUM_NOISE_LAYERS; k++ ){
//         maxSum += amplitude;
//         fractalNoise += snoise( p * frequency ) * amplitude;
//         amplitude *= gain;
//         frequency *= lacunarity;
//     }

//     // normalise the result
//     return fractalNoise / maxSum;
// }

const float blobRadius 		= 0.5;
const float blobExponent 	= 20.0;
const float frequency 		= 0.53;

float fbm( vec3 p ){
	return snoise( vec4( p * frequency , uTime ));
}

float volume( vec3 p ){
	vec3 q = vec3( fbm( p * 2.0  + vec3(0.0, 0.0, 0.0) ),
                   fbm( p * 2.0 + vec3(0.2, -2.0, 0.1) ), 
                   fbm( p * 2.0 + vec3(0.2, 0.3, 0.2) ) );

      return fbm( p + 1.5 * q );
	
}

void main() {

	vec3 p = position / 2000.00;
	
	float d = length( p );
	d += volume( p ) * 0.8;
	// float edge = max( abs( p.x ), max( abs( p.y ), max( abs( p.z ), 0.0 )));



	// float edge = 100.0;
	// vec3 p = position;
	// p.y += uTime;

	
	// float powCurve 		= max( 0.0, min( 1.0, pow( d / blobRadius , blobExponent )));
	float powCurve 		= pow( d, blobExponent );// * -1.0;
	float noise 		= volume( p );
	vVolume 			= ( 1.0 - step( blobRadius, d)  );// + pow( noise, powCurve );//noise;// + noise;//pow( noise, powCurve );


	// vec3 newPosition = position + amplitude * displacement;
	// float n = snoise( p / 1000.0 );

	vec4 metaball;

	// vec3 ball;
	// vec3 p = position;
	// p.x *= 0.5;
	

	// for( int i = 0; i < NUM_METABALLS ; i++ ){
		// metaball = uMetaballs[i];
		// vVolume += pow( metaball.w / length( metaball.xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[0].w / length( uMetaballs[0].xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[1].w / length( uMetaballs[1].xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[2].w / length( uMetaballs[2].xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[3].w / length( uMetaballs[3].xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[4].w / length( uMetaballs[4].xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[5].w / length( uMetaballs[4].xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[6].w / length( uMetaballs[4].xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[7].w / length( uMetaballs[4].xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[8].w / length( uMetaballs[8].xyz - position ), uExponent );
		// vVolume += pow( uMetaballs[9].w / length( uMetaballs[9].xyz - position ), uExponent );
	// }

	
	// vVolume = pow( vVolume, 10.0 );

	// p.z *= sin( uTime * 0.0005 + position.y  );
	// p.x *= cos( uTime * 0.0005 + position.y  );
	// vVolume = pow( fbm( p / 4500.0 ), -50.0 );// * ( 1.0 - pow( d, edge ));//min( 1.0, vVolume );
	// vVolume = fbm( p / 4500.0 );//min( 1.0, vVolume );


	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}


//# TTFragment
//! FRAGMENT


uniform vec3 color;
uniform float opacity;

uniform float fogNear;
uniform float fogFar;
uniform vec3 fogColor;

varying float vVolume;

void main() {


	float depth = gl_FragCoord.z / gl_FragCoord.w;
	float fogFactor = smoothstep( fogNear, fogFar, depth );

	// gl_FragColor = vec4( vec3( 1.0 ), max( vVolume, 0.02 ));
	gl_FragColor = vec4( vec3( 1.0 ), max( step( 0.2, vVolume ) , 0.00 ) * 0.6 );

	// gl_FragColor = vec4( vec3( 1.0 ), fogFactor ) ;//mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

	

}



