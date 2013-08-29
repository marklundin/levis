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

		function isSame(a1, a2){
			a1.sort();
			a2.sort();
		  return !(a1 > a2|| a1 < a2);
		}

		


		function removeDuplicateFaces(geometry){
		 	var i = geometry.faces.length, j,
		 		tri, tri_2, 
		 		inds = [],
		 		inds_2 = [];	

		 	console.log( i );
		  while( i-- > 0 ){

		    tri = geometry.faces[i];
		    // console.log( tri );
		    // debugger;
		    inds[0] = tri.a;
		    inds[1] = tri.b;
		    inds[2] = tri.c;
		    inds[3] = tri.d;
		    inds.sort();
		    j = i;

		    // while( j-- > 0 ){

		    // 	tri_2 = geometry.faces[j];

		    // 	if( tri_2 !== undefined ){ // May have already been deleted
		    // 		inds_2[0] = tri_2.a;
				  //   inds_2[1] = tri_2.b;
				  //   inds_2[2] = tri_2.c;
				  //   inds_2[3] = tri_2.d;
		    //   		inds_2.sort();
		    //   		// inds.sort();
		    //   		// inds_2.sort();
		    //     	if( !(inds> inds_2 || inds < inds_2)){
		    //       		geometry.faces[i] = undefined; // Sets these faces to undefined
		    //       		// If duplicate, it is also interior, so remove both
		    //       		geometry.faces[j] = undefined;
		    //       		// geometry.faces.splice( j, 1 );
		    //     	}
		    //   	}
		    // }
		    console.log( 'here' );
		  }
		  console.log( 'got here' );
		  geometry.faces = geometry.faces.filter( function(a){ return a===undefined });
		  
		  return geometry;
		}

		
		var structure = function( frequency, complexity, seed, threshold, horizontalThickness, verticaThickness ){


			var noise3D 	= prng.noise3D( GRID.DIMENSION, GRID.DIMENSION, GRID.DIMENSION, frequency, complexity, seed ),
				hDIM 		= GRID.DIMENSION * 0.5,
				x, y, z 	= GRID.DIMENSION,
				baseGeom 	= new THREE.Geometry(),
				volume 		= [], 
				empty 		= [],
				mesh 		= new THREE.Mesh(),
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
							mesh.geometry = cube( GRID.SCALE, GRID.SCALE, GRID.SCALE, horizontalThickness , verticaThickness, (math.random( 1, variations )|0)  );
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