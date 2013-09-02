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

		function isBitSet( value, bitindex ){
		    return (value & (1 << bitindex)) != 0;
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

			function numericalSort( a, b ){
				return a - b;
			}
			function isSame(a1, a2){
				if( a1.sorted === undefined ){
					a1.sorted = true;
					a1.sort(numericalSort);
				}else{
					// console.log( a1, 'already sorted');
				}
				if( a2.sorted === undefined ){
					a2.sorted = true
					a2.sort(numericalSort)
				}else{
					// console.log( a2, 'already sorted');
				}

			  	return !(a1 > a2 || a1 < a2 );
			}

			function removeDuplicateFaces(geometry){
				var tri, tri_2, inds = [], inds_2 = [], i, j;

			  for( i=0, l=geometry.faces.length; i<l; i++ ){
			    tri = geometry.faces[i];
			    inds[0] = tri.a; 
			    inds[1] = tri.b;
			    inds[2] = tri.c;
			    inds[3] = tri.d;
			    inds.sort();
			    for( j=0; j<i; j++ ){
			      tri_2 = geometry.faces[j];
			      if( tri_2 !== undefined ){ // May have already been deleted
			        inds_2[0] = tri_2.a; 
				    inds_2[1] = tri_2.b;
				    inds_2[2] = tri_2.c;
				    inds_2[3] = tri_2.d;
				    inds_2.sort();
			        if( isSame( inds, inds_2 ) ){
			          delete geometry.faces[i]; // Sets these faces to undefined
			          // If duplicate, it is also interior, so remove both
			          delete geometry.faces[j];
			        }
			      }
			    }
			  }
			  console.log('marked differences')
			  geometry.faces = geometry.faces.filter( function(a){ return a===undefined });
			  console.log('removed differences')
			  return geometry;
			}

			var mutation;

			// Generate noise pattern
			while( z-- > 0 ){
				y = GRID.DIMENSION;
				while( y-- > 0 ){
					x = GRID.DIMENSION;
					while( x-- > 0 ){
						value = noise3D( x, y, z );
						if( value > threshold ) {
							volume.push( [x, y, z]);
							cellIsEdge = isEdge( x, y, z, threshold );
							// mutation = math.random( 1, variations )|0;
							mutation = 0;
							if( cellIsEdge ){
								mutation = math.random( 1, variations )|0;
							}else{
								if( Math.random() < 0.45 ) mutation = setBit( 2, mutation );
								if( Math.random() < 0.45 ) mutation = setBit( 6, mutation );
								if( Math.random() < 0.45 ) mutation = setBit( 10, mutation );
							}

							mesh.geometry = cube( GRID.SCALE, GRID.SCALE, GRID.SCALE, horizontalThickness , verticaThickness, mutation );
							mesh.position.set( -hDIM + x, -hDIM + y, -hDIM + z );
							mesh.position.multiplyScalar( GRID.SCALE );
							THREE.GeometryUtils.merge( baseGeom, mesh );

						}else{
							empty.push( [x, y, z] );
						}
					}
				}
			}

			// console.log( baseGeom.vertices.length, baseGeom.faces.length );
			baseGeom.mergeVertices();
			// removeDuplicateFaces( baseGeom );
			console.log( 'seed:', seed, 'geom: ', baseGeom.vertices.length, baseGeom.faces.length );

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