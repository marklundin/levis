define([
	"utils/noise",
	"geometry/cubeframe",
	'libs/threejs/build/three'
	],function( prng, cube ){


		var GRID = {
			DIMENSION : 30,
			SCALE:  	100
		};

		var STRUT = {}
			STRUT.WIDTH  = 7;
			STRUT.LENGTH = GRID.SCALE - STRUT.WIDTH;

		
		var structure = function( frequency, complexity, seed, threshold ){


			var noise3D 	= prng.noise3D( GRID.DIMENSION, GRID.DIMENSION, GRID.DIMENSION, frequency, complexity, seed ),
				hDIM 		= GRID.DIMENSION * 0.5,
				x, y, z 	= GRID.DIMENSION,
				baseGeom 	= new THREE.Geometry(),
				volume 		= [], 
				mesh 	 	= new THREE.Mesh( cube( GRID.SCALE, STRUT.WIDTH ));


			// Generate noise pattern
			while( z-- > 0 ){
				volume[z] = []
				y = GRID.DIMENSION;
				while( y-- > 0 ){
					volume[z][y] = []
					x = GRID.DIMENSION;
					while( x-- > 0 ){
						if( noise3D( x, y, z ) > threshold ){
							volume[z][y][x] = true;
							mesh.position.set( -hDIM + x, -hDIM + y, -hDIM + z );
							mesh.position.multiplyScalar( GRID.SCALE );
							THREE.GeometryUtils.merge( baseGeom, mesh );
						}
					}
				}
			}

			return {
				geometry: baseGeom,
				// geometry: mesh.geometry,
				volume: volume
			}
					
		}

		return structure;

	}
)