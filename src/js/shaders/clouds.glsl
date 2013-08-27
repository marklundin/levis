
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

uniform float opacity;
uniform float useClouds;
uniform float offset;
uniform float exponent;

varying vec2 vUv;


void main() {

	float depth = gl_FragCoord.z / gl_FragCoord.w;
	float fogFactor = smoothstep( fogNear, fogFar, depth );

	// float depth = unpackDepth( texture2D( tDepth, vUv ) );
	// gl_FragColor = vec4( vec3( depth ), 1.0 );
	// gl_FragColor = texture2D( map, vUv );
	// gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
	// gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

	// gl_FragColor = vec4( 1.0, 0.0, 0.0,  pow( fogFactor, 1.0 ));
	// gl_FragColor.a *= pow( gl_FragCoord.z, 20.0 );

	// float depth = gl_FragCoord.z / gl_FragCoord.w;
	// float fogFactor = smoothstep( fogNear, fogFar, depth );

	gl_FragColor = texture2D( map, vUv );
	gl_FragColor.a *= pow( fogFactor + offset, exponent );
	gl_FragColor.a *= opacity;
	gl_FragColor = mix( vec4( 1.0, 0.0, 0.0, 1.0 ), gl_FragColor, useClouds );

}

