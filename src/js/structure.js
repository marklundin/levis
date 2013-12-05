define([
	"utils/noise",
	"geometry/cubeframe",
	"utils/math"
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
				bufferGeom 	= new THREE.BufferGeometry(),
				volume 		= [], 
				empty 		= [],
				mesh 		= new THREE.Mesh(),
				variations 	= Math.pow( 2, 12 ) - 1, cellIsEdge,
				mesh, value, solidity, exponent = 1.3, invNoise;


			var tmpFakeGeom = {
				position: [],
				normal: [],
				uv:[],
				color:[] 
			}


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

			var manifest = {
				x: new Uint8Array( GRID.DIMENSION * ( GRID.DIMENSION + 1 ) * ( GRID.DIMENSION + 1 )),
				y: new Uint8Array( GRID.DIMENSION * ( GRID.DIMENSION + 1 ) * ( GRID.DIMENSION + 1 )),
				z: new Uint8Array( GRID.DIMENSION * ( GRID.DIMENSION + 1 ) * ( GRID.DIMENSION + 1 ))
			}
			
			var tmpGeom,
				tmpPos = new THREE.Vector3(),
				tmpMat = new THREE.Matrix4();		

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


							volume.push( [x, y, z] );
							

							// mesh.geometry = cube( GRID.SCALE, GRID.SCALE, GRID.SCALE, horizontalThickness , verticaThickness, mutation, pXMut, pYMut, pZMut );
							// mesh.position.set( -hDIM + x, -hDIM + y, -hDIM + z );
							// mesh.position.multiplyScalar( GRID.SCALE );
							// THREE.GeometryUtils.merge( baseGeom, mesh );

							tmpGeom = cube( GRID.SCALE, GRID.SCALE, GRID.SCALE, horizontalThickness, verticaThickness, mutation, pXMut, pYMut, pZMut );
							tmpPos.set( -hDIM + x, -hDIM + y, -hDIM + z );
							tmpPos.multiplyScalar( GRID.SCALE );
							tmpMat.makeTranslation( tmpPos.x, tmpPos.y, tmpPos.z );
							tmpGeom.applyMatrix( tmpMat );

							tmpFakeGeom.position.push.apply( tmpFakeGeom.position, tmpGeom.attributes.position.array );
							tmpFakeGeom.normal.push.apply( tmpFakeGeom.normal, tmpGeom.attributes.normal.array );
							tmpFakeGeom.color.push.apply( tmpFakeGeom.color, tmpGeom.attributes.color.array );
							tmpFakeGeom.uv.push.apply( tmpFakeGeom.uv, tmpGeom.attributes.uv.array );
							// mesh.position.set( -hDIM + x, -hDIM + y, -hDIM + z );
							// mesh.position.multiplyScalar( GRID.SCALE );
							// THREE.GeometryUtils.merge( baseGeom, mesh );


						}else{
							empty.push( [x, y, z] );
						}
					}
				}
			}

			bufferGeom.attributes = {

				position: {
					itemSize: 3,
				},
				normal: {
					itemSize: 3,
				},
				color: {
					itemSize: 3,
				},
				uv: {
					itemSize: 2,
				}
		    }

			bufferGeom.attributes.position.array = new Float32Array( tmpFakeGeom.position );
			bufferGeom.attributes.normal.array 	 = new Float32Array( tmpFakeGeom.normal );
			bufferGeom.attributes.color.array 	 = new Float32Array( tmpFakeGeom.color );
			bufferGeom.attributes.uv.array 	 	 = new Float32Array( tmpFakeGeom.uv );
			bufferGeom.computeBoundingSphere();
			// baseGeom.mergeVertices();

			return {
				geometry: bufferGeom,
				// geometry: mesh.geometry,
				volume: volume,
				empty: empty
			}
					
		}

		structure.grid = GRID;

		return structure;

	}
)