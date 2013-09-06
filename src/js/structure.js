define([
	"utils/noise",
	"geometry/cubeframe",
	"utils/math",
	],function( prng, cube, math ){


		var GRID = {
			DIMENSION : 30,
			SCALE:  	100
		};


		function isBitSet( value, bitindex ){
		    return (value & (1 << bitindex)) != 0;
		}

		function setBit( x, value ){
			value |= 1 << x;
			return value;
		}

	

		
		var structure = function( frequency, complexity, seed, threshold, horizontalThickness, verticaThickness ){


			var noise3D 	= prng.noise3D( GRID.DIMENSION, GRID.DIMENSION, GRID.DIMENSION, frequency, complexity, seed ),
				hDIM 		= GRID.DIMENSION * 0.5,
				x, y, z 	= GRID.DIMENSION,
				baseGeom 	= new THREE.Geometry(),
				volume 		= [], 
				empty 		= [],
				mesh 		= new THREE.Mesh(),
				variations 	= Math.pow( 2, 12 ) - 1, cellIsEdge,
				mesh, value, solidity, exponent = 1.3, invNoise;

			function noise( x, y, z ){
				return noise3D( x, y, z )
			}

			function isEdge( x, y, z, threshold ){

				// Check surrounding cells and check if they'll be displayed.
				// if not, then this cell is an edge

				return 	noise( x + 1, y, z ) <= threshold ||
						noise( x - 1, y, z ) <= threshold ||
						noise( x, y + 1, z ) <= threshold ||
						noise( x, y - 1, z ) <= threshold ||
						noise( x, y, z + 1 ) <= threshold ||
						noise( x, y, z - 1 ) <= threshold;

			}

			var mutation, pXMut, pYMut, pZMut;
			var mutations = [];

			// Generate noise pattern
			while( z-- > 0 ){
				mutations[z] = [];
				y = GRID.DIMENSION;
				while( y-- > 0 ){
					mutations[z][y] = [];
					x = GRID.DIMENSION;
					while( x-- > 0 ){
						
						mutations[z][y][x] = 0;
						value = noise3D( x, y, z );

						if( value > threshold ) {

							mutation = math.random( 1, variations )|0;
							mutations[z][y][x] = mutation;

							pXMut = mutations[z][y][x+1] || 0;
							pYMut = ( mutations[z][y+1] ) ? mutations[z][y+1][x] || 0 : 0;
							pZMut = ( mutations[z+1] && mutations[z+1][y] ) ? mutations[z+1][y][x] || 0 : 0;

							// console.log( pXMut, pYMut, pZMut );
							volume.push( [x, y, z] );
							

							mesh.geometry = cube( GRID.SCALE, GRID.SCALE, GRID.SCALE, horizontalThickness , verticaThickness, mutation, pXMut, pYMut, pZMut );
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