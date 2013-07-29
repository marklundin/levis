define(
	["./shader"],
	function( glsl ){

		

		var shader = glsl.create( 100.0, 100.0, 
			[


				"vec4 encodeFloat(float v)",
				"{",
					"vec4 c = vec4(0.0, 0.0, 0.0, 0.0);",
					"if (v < 0.0) {",
						"c[0] += 64.0;",
						"v = -v;",
					"}",

					"float f = 0.0;",
					"float e = ceil(log2(v));",
					"float m = v * exp2(-e);",
					"if (e < 0.0) {",
						"e = -e;",
						"c[0] += 128.0;",
					"}",

					"c[0] += e;",
					"m *= 255.0;",
					"f = floor(m);",
					"c[1] = f;",
					"m  -= f;",
					"m *= 255.0;",
					"f = floor(m);",
					"c[2] = f;",
					"m  -= f;",
					"m *= 255.0;",
					"c[3] = floor(m);",
					"return c * 3.921569E-03;",
				"}",

				//
				// Description : Array and textureless GLSL 2D/3D/4D simplex 
				//               noise functions.
				//      Author : Ian McEwan, Ashima Arts.
				//  Maintainer : ijm
				//     Lastmod : 20110822 (ijm)
				//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
				//               Distributed under the MIT License. See LICENSE file.
				//               https://github.com/ashima/webgl-noise
				// 

				"vec4 mod289(vec4 x) {return x - floor(x * (1.0 / 289.0)) * 289.0; }",
				"float mod289(float x) {return x - floor(x * (1.0 / 289.0)) * 289.0; }",
				"vec4 permute(vec4 x) {return mod289(((x*34.0)+1.0)*x); }",
				"float permute(float x) {return mod289(((x*34.0)+1.0)*x); }",
				"vec4 taylorInvSqrt(vec4 r) {return 1.79284291400159 - 0.85373472095314 * r; }", 
				"float taylorInvSqrt(float r) {return 1.79284291400159 - 0.85373472095314 * r; }",
				"vec4 grad4(float j, vec4 ip) {const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0); vec4 p,s; p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0; p.w = 1.5 - dot(abs(p.xyz), ones.xyz); s = vec4(lessThan(p, vec4(0.0))); p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; return p; }",
				"#define F4 0.309016994374947451",
				"float snoise(vec4 v) {const vec4  C = vec4( 0.138196601125011, 0.276393202250021, 0.414589803375032, -0.447213595499958); vec4 i  = floor(v + dot(v, vec4(F4)) ); vec4 x0 = v -   i + dot(i, C.xxxx); vec4 i0; vec3 isX = step( x0.yzw, x0.xxx ); vec3 isYZ = step( x0.zww, x0.yyz ); i0.x = isX.x + isX.y + isX.z; i0.yzw = 1.0 - isX; i0.y += isYZ.x + isYZ.y; i0.zw += 1.0 - isYZ.xy; i0.z += isYZ.z; i0.w += 1.0 - isYZ.z; vec4 i3 = clamp( i0, 0.0, 1.0 ); vec4 i2 = clamp( i0-1.0, 0.0, 1.0 ); vec4 i1 = clamp( i0-2.0, 0.0, 1.0 ); vec4 x1 = x0 - i1 + C.xxxx; vec4 x2 = x0 - i2 + C.yyyy; vec4 x3 = x0 - i3 + C.zzzz; vec4 x4 = x0 + C.wwww; i = mod289(i); float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x); vec4 j1 = permute( permute( permute( permute (i.w + vec4(i1.w, i2.w, i3.w, 1.0 )) + i.z + vec4(i1.z, i2.z, i3.z, 1.0 )) + i.y + vec4(i1.y, i2.y, i3.y, 1.0 )) + i.x + vec4(i1.x, i2.x, i3.x, 1.0 )); vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ; vec4 p0 = grad4(j0,   ip); vec4 p1 = grad4(j1.x, ip); vec4 p2 = grad4(j1.y, ip); vec4 p3 = grad4(j1.z, ip); vec4 p4 = grad4(j1.w, ip); vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3))); p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w; p4 *= taylorInvSqrt(dot(p4,p4)); vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0); vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0); m0 = m0 * m0; m1 = m1 * m1; return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 ))) + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ; }",
				
				"uniform vec2 uResolution;",
				"uniform float uFrequency;",
				"uniform float uOffset;",
				"uniform float uDivisor;",
				"uniform float uTime;",

				// "uniform float frequency;",
				// "uniform float noise;",
				"uniform float uComplexity;",

				"float fbm( vec3 p ){",
					"return snoise( vec4( p * uFrequency , uTime )) + ( snoise( vec4( p * uFrequency * 2.0, uTime )) * 0.5 );",
				"}",

				"float volume( vec3 p ){",
					"vec3 q = vec3( fbm( p * 2.0  + vec3(0.0, 0.0, 0.0 )),",
				                   "fbm( p * 2.0 + vec3(0.2, -2.0, 0.1 )),",
				                   "fbm( p * 2.0 + vec3(0.2, 0.3, 0.2 )));",

				      "return fbm( p + uComplexity * q );",
					
				"}",
		    
		      	"void main(void) {",

		      		"vec3 origin = vec3( 0.5 );",
		      		"vec2 uv = gl_FragCoord.xy / uResolution.xy * uDivisor;",
		      			
					"vec2 tile = floor( uv );",
					"float z = tile.y * uDivisor + tile.x;",
					"vec2 m = fract( uv );",
					"z /= pow( uDivisor, 2.0 );",
					"float noise = volume( vec3( m, z ));",

					"float d = 1.0 - length( origin - vec3( m, z ));",
					// "float vVolume = ( step( 0.5 * noise, d ));",
					// "float t = pow( d, 10.0 );",

					// "gl_FragColor = vec4( m, z, 1.0 );//encodeFloat( noise );",
					"gl_FragColor = vec4( vec3( d * 0.4 + noise * d * 1.9) , 1.0 );",

		        "}"

			].join("\n")

		, true );


		var uOffset 	= shader.getUniformLocation( "uOffset" ),
			uDivisor 	= shader.getUniformLocation( "uDivisor" ),
			uComplexity = shader.getUniformLocation( "uComplexity" ),
			uFrequency 	= shader.getUniformLocation( "uFrequency" ),
			channels	= 3;

		document.body.appendChild( shader.domElement );

		return {

			noise3D: function ( w, h, d, frequency, complexity, seed ){

				var div    = Math.ceil( Math.sqrt( d )),
					d 	   = Math.pow( div, 2.0 );
					size   = w * h * d * 4.0,
					volume = new Uint8Array( size );
					
				frequency = frequency || 1.0;
				seed 	  = seed | Math.random();

				
				shader.uniformFloat( uDivisor, 	 div );
				shader.uniformFloat( uFrequency, frequency );
				shader.uniformFloat( uComplexity, complexity );

				shader.size( w * div, h * div );
				shader.draw( seed );
				shader.gl.readPixels( 0, 0, w * div, h * div, shader.gl.RGBA, shader.gl.UNSIGNED_BYTE, volume );
			

				var fract, floor; 
				var fn = function( x, y, z ){

					// var wPix = div * w;
					var yPos 	= Math.floor(z/div) * div * w * h,
						xPos 	= ( z % div ) * w,
						zOffset = ( xPos + yPos ),
						index   =  y * div * w;

					return volume[((zOffset+index + x) * 4.0 )] / 256.0;

				};

				fn.volume = volume;
				return fn;

			},
			

			// unknown: function ( width, height, zOffset, frequency,  ){

			// 	width  		= width || 100.0;
			// 	height 		= height || 100.0;
			// 	frequency 	= frequency || 1.0;


			// 	var values = new Uint8Array( width * height * 4 );
			// 	shader.size( width, height );

			// 	shader.uniformFloat( uOffset, zOffset );
			// 	shader.uniformFloat( uFrequency, frequency );

			// 	shader.draw();
			// 	shader.gl.readPixels( 0, 0, width, height, shader.gl.RGBA, shader.gl.UNSIGNED_BYTE, values );

			// 	return function( x, y, z ){

			// 		x = x | 0.0;
			// 		y = y | 0.0;
			// 		z = z | 0.0;

			// 		return values[ y * width * 4 + ( x * 4 ) + z ];
			// 	}


			// }
		}

	}
);