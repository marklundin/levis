define(function(){
	
	return function( object, path, duration ){


		var time = 0,
			t = 0,
			completeCallback,
			lastTangent= new THREE.Vector3(),
			tangent= new THREE.Vector3(),
			completed = false;


		var api = {

			update: function( delta ){

				time += delta * 0.001;
				t = time / duration;
				time  = time > duration ? duration : time;
				
				if( t >= 1 && completeCallback && !completed ){
					completed = true;
					completeCallback();
				}
				
				// console.log( path.getTangentAt( 1 ) );
				// debugger;
				if( t <= 1 ){
					object.position.copy( path.getPointAt( t ));

					// if( t < 1 ) lastTangent.copy( path.getTangentAt( t ) );
					// tangent.copy( lastTangent );
					object.lookAt( path.getTangentAt( t ).add( object.position ));
				} 
				

			},

			onComplete: function ( callback ){
				completeCallback = callback;
			}

		}

		return api;


	}

})