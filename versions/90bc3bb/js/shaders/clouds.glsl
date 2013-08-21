
//# Vertex
//! VERTEX

varying vec2 vUv;

void main() {

	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}


//# TTFragment
//! FRAGMENT

uniform sampler2D map;
uniform sampler2D tDepth;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

varying vec2 vUv;


float unpackDepth( const in vec4 rgba_depth ) {

	const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );
	float depth = dot( rgba_depth, bit_shift );
	return depth;

}

void main() {

	// float depth = gl_FragCoord.z / gl_FragCoord.w;
	// float fogFactor = smoothstep( fogNear, fogFar, depth );
	// float depth = unpackDepth( texture2D( tDepth, vUv ) );
	// gl_FragColor = vec4( vec3( depth ), 1.0 );
	// gl_FragColor = texture2D( map, vUv );
	// gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
	// gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );


	float depth = gl_FragCoord.z / gl_FragCoord.w;
	float fogFactor = smoothstep( fogNear, fogFar, depth );

	gl_FragColor = texture2D( map, vUv );
	gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
	gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

}

