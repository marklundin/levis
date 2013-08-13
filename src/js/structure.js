define([
	"utils/noise",
	"geometry/cubeframe",
	"utils/math",
	],function( prng, cube, math ){


		var GRID = {
			DIMENSION : 30,
			SCALE:  	100
		};

		// var STRUT = {}
			// STRUT.WIDTH  = 10;
			// STRUT.LENGTH = GRID.SCALE - STRUT.WIDTH;

		
		var structure = function( frequency, complexity, seed, threshold, horizontalThickness, verticaThickness ){


			var noise3D 	= prng.noise3D( GRID.DIMENSION, GRID.DIMENSION, GRID.DIMENSION, frequency, complexity, seed ),
				hDIM 		= GRID.DIMENSION * 0.5,
				x, y, z 	= GRID.DIMENSION,
				baseGeom 	= new THREE.Geometry(),
				volume 		= [], 
				empty 		= [],
				variations 	= Math.pow( 2, 12 ) - 1, 
				mesh, value, solidity, exponent = 1.3, invNoise;


			// Generate noise pattern
			while( z-- > 0 ){
				y = GRID.DIMENSION;
				while( y-- > 0 ){
					x = GRID.DIMENSION;
					while( x-- > 0 ){
						value = noise3D( x, y, z );
						if( value > threshold ) {
							volume.push( [x, y, z])
							// solidity = Math.pow(( value - threshold ) / ( 1.0 - threshold ), exponent );
							mesh = new THREE.Mesh( cube( GRID.SCALE, GRID.SCALE, GRID.SCALE, horizontalThickness , verticaThickness, (math.random( 1, variations )|0)  ));
							mesh.position.set( -hDIM + x, -hDIM + y, -hDIM + z );
							mesh.position.multiplyScalar( GRID.SCALE );
							THREE.GeometryUtils.merge( baseGeom, mesh );

						}else{
							empty.push( [x, y, z] );
						}
					}
				}
			}

			return {
				geometry: baseGeom,
				// geometry: mesh.geometry,
				volume: volume,
				empty: empty
			}
					
		}

		structure.grid = GRID;

		return structure;

	}
)