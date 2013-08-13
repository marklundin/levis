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
					size	: [ this.domElement.offsetWidth, this.domElement.offsetHeight ],
					offset	: [ this.domElement.offsetLeft,  this.domElement.offsetTop ]
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
					t = ( ease || easing.easeInOutQuad )( t );
					object.position.copy( path.getPointAt( t ));
					target.copy( path.getTangentAt( t ).add( object.position ));
					
				} 


					

				target.y = object.position.y + (( target.y - object.position.y ) * 0.2 );
				object.lookAt( target );

				// tt.x += ( mouseVec.x - tt.x ) * 0.4;
				// tt.y += ( mouseVec.y - tt.y ) * 0.4;
				// tt.y  = -1;
				// tt.applyQuaternion( object.quaternion );

				// object.lookAt( tt );


				// tt.set( mouseVec.y * 0.2, -mouseVec.x * 0.2, 0 );//.normalize();
				// object.rotation.x -= mouseVec.y * 0.02;
				// object.rotation.y += mouseVec.x * 0.02;


				// tmpVeco.applyEuler( tt );

				// tmpQuaternion.setFromEuler( tt );
				// tmpQuaternion2.copy( tmpQuaternion  ).multiply( object.quaternion ).normalize();

				// var qm = new THREE.Quaternion();
				// THREE.Quaternion.slerp( object.quaternion, tmpQuaternion2, qm, 0.07 );
				// object.quaternion = qm;
				// object.quaternion.normalize();


				// tt.set( mouseVec.y * 0.02, 0, 0 );//.normalize();
				
				// // tmpQuaternion.multiply( object.quaternion );
				// var newQuaternion = new THREE.Quaternion().copy( object.quaternion ).multiply( tmpQuaternion ).normalize();
				// object.quaternion.slerp( newQuaternion, 0.003 );//.normalize();
				// console.log( tmpQuaternion._x );
				// object.quaternion.multiply( newQuaternion );//.normalize();//, 0.05 ).normalize();
				
				// object.quaternion.multiply( newQuaternion );
				// object.quaternion.normalize();

				

				// var rotMult = delta * 0.0000005;
				// tt.copy( mouseVec ).add( target );
				// tmpQuaternion.set( mouseVec.x * rotMult, mouseVec.y * rotMult, 0, 1 ).normalize();
				
				// tmpQuaternion.set( tt.x * rotMult, 0, 0 , 1 ).normalize();
				// object.quaternion.multiply( tmpQuaternion );

				// expose the rotation vector for convenience
				object.rotation.setFromQuaternion( object.quaternion, object.rotation.order );
				

			},

			

			onComplete: function ( callback ){
				completeCallback = callback;
			}

		}

		return api;


	}

})