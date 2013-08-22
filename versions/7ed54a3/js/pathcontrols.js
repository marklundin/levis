define([
	"utils/easing"
	],function( easing ){
	
	return function( object, path, duration, domElement ){

		duration = duration || path.getLength() * 20;
		domElement = domElement || document;

		var time = 0,
			t = 0,
			completeCallback,
			target = new THREE.Vector3(),
			completed = false, mouseVec = new THREE.Vector3();

		function getContainerDimensions() {
			if ( domElement != document ) {
				return {
					size	: [ domElement.offsetWidth, domElement.offsetHeight ],
					offset	: [ domElement.offsetLeft,  domElement.offsetTop ]
				};
			} else {
				return {
					size	: [ window.innerWidth, window.innerHeight ],
					offset	: [ 0, 0 ]
				};
			}
		};

		document.addEventListener( 'mousemove', function(){

			var container = getContainerDimensions();
			var halfWidth  = container.size[ 0 ] / 2;
			var halfHeight = container.size[ 1 ] / 2;

			var x, y;

			mouseVec.x =  -	( ( event.pageX - container.offset[ 0 ] ) - halfWidth  ) / halfWidth;
			mouseVec.y =    ( ( event.pageY - container.offset[ 1 ] ) - halfHeight ) / halfHeight;
			mouseVec.z = -1;

			// mouseVec.x += ( x - mouseVec.x ) * 0.4;
			// mouseVec.y += ( y - mouseVec.y ) * 0.4;
			// mouseVec.z = 0.0;

			mouseVec.multiplyScalar( 1000, -1000, 1 );

			// console.log( mouseVec.x, mouseVec.y );

		})

		

		var tmpQuaternion = new THREE.Quaternion(), 
			tmpQuaternion2 = new THREE.Quaternion(), 
			tt = new THREE.Vector3(), 
			tmpVeco = new THREE.Vector3();
			
		var api = {

			update: function( delta, ease ){

				time += delta * 0.001;
				t = time / duration;
				time  = time > duration ? duration : time;
				
				if( t >= 1 && completeCallback && !completed ){
					completed = true;
					completeCallback();
				}
				
				if( t <= 1 ){
					// t = ( ease || easing.easeInOutQuad )( t );
					object.position.copy( path.getPointAt( t ));
					target.copy( path.getTangentAt( t ).add( object.position ));
					
				} 


					

				// target.y = object.position.y + (( target.y - object.position.y ) * 0.2 );
				object.lookAt( target );

				

			},

			

			onComplete: function ( callback ){
				completeCallback = callback;
			}

		}

		return api;


	}

})