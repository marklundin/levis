define([
		"libs/threejs/examples/js/ImprovedNoise"
	],function(){


		var DIMENSION = 100;
		var psng = new ImprovedNoise();


		
		var structure = function(){

			this.noise = new Float64Array( DIMENSION * DIMENSION * DIMENSION );

			var x, y, z = DIMENSION, invDim = 1.0 / DIMENSION;

			
			while( z -- > 0 ){
				y = DIMENSION;
				// zDD = z * DIMENSION * DIMENSION;
				while( y -- > 0 ){
					x = DIMENSION;
					// yD = y * DIMENSION;
					while( x -- > 0 ){
						noise[zDD+yD+x] = psng.noise( x * invDim, y * invDim, z * invDim ) * 0.5 + 0.5;
					}
				}
			}

		}

		return structure;

	}
)