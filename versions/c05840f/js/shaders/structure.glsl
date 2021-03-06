
//# Vertex
//! VERTEX

{{ libs/noise4d.glsl }}

// #define NUM_METABALLS 8
#define NUM_NOISE_LAYERS 3


varying float vVolume;

uniform float uExponent;
uniform float uSeed;

// uniform vec4 uMetaballs[ NUM_METABALLS ];


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

uniform float radius;
// uniform float exponent;
uniform float frequency;
uniform float noise;
uniform float complexity;

float fbm( vec3 p ){
	return snoise( vec4( p * frequency , uSeed )) + ( snoise( vec4( p * frequency * 2.0, uSeed )) * 0.5 );
}

float volume( vec3 p ){
	vec3 q = vec3( fbm( p * 2.0  + vec3(0.0, 0.0, 0.0 )),
                   fbm( p * 2.0 + vec3(0.2, -2.0, 0.1 )), 
                   fbm( p * 2.0 + vec3(0.2, 0.3, 0.2 )));

      return fbm( p + complexity * q );
	
}

void main() {

	vec3 p = position / 2000.00;
	float d = length( p );

	// NOISE
	// d += volume( p ) * noise;
	vVolume 			= ( 1.0 - step( radius * ( 1.0 - fbm( p )), d ));// + pow( noise, powCurve );//noise;// + noise;//pow( noise, powCurve );


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
uniform float threshold;

varying float vVolume;

void main() {

	gl_FragColor = vec4( 1.0 );

	// float depth = gl_FragCoord.z / gl_FragCoord.w;
	// float fogFactor = smoothstep( fogNear, fogFar, depth );

	// gl_FragColor = vec4( vec3( 1.0 ), max( vVolume, 0.02 ));
	// gl_FragColor = vec4( vec3( 1.0 ), max( step( threshold, vVolume ) , 0.00 )  );

	// gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

	

}



