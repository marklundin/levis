define(function(){
	
	var DEFAULT_SPRING_CONSTANT = 1.5,
		DEFAULT_THRESHOLD = 20.0,
		systems = [],
		n,
		emptyCallback = function(){};


	function step( delta ){

		n = systems.length;
		while( n-- > 0 ){
			systems[n]( delta );
		}

	}


	function getSystem( obj, prop, target, params ){

		
		params.spring   = params.spring || DEFAULT_SPRING_CONSTANT;
		params.delay 	= params.delay  || 0;

		var velocity 	= 0,
			totaltime 	= 0,
			springForce, dampingForce, force,
			root 		= Math.sqrt( params.spring ),
			time, theta;


		return update = function( a, b, delta ){

			totaltime += delta;
			if( totaltime >= params.delay ){

				theta 		 = b - a;
				time  	   	 = delta * api.globalSpeed;
				springForce  = theta * params.spring;
			    dampingForce = -velocity * 2.0 * root;
			    force 		 = springForce + dampingForce;
			    velocity    += force * time;

				obj[prop]   += velocity * time;
			}

		};

	}

	
	var api =  function( obj, prop, target, params ){

		var params   = params || {},
			system 	 = getSystem( obj, prop, target, params ),
			controls = {
				callback: emptyCallback,
				target 	: target || null,
				arrived	: false,
				paused	: false,
				speed 	: params.speed || 1.0,
				dispose: function(){
					systems.splice( systems.indexOf( update ), 1 );
				}
			}

		var update = function( t ){

			if( !controls.paused && controls.target !== null ){

				system( obj[prop], controls.target, t * controls.speed );

				if( !controls.arrived && Math.abs( controls.target - obj[ prop ] ) <= DEFAULT_THRESHOLD ){
					controls.arrived = true;
					// systems.splice( systems.indexOf( update ), 1 );
					controls.callback();
				}
			}
		};

		systems.push( update );

		return controls;

	}


	api.update = function( delta ){

		step( delta || 1 );

	}

	api.globalSpeed = 1.0;


	api.vec3 = function( v3, target, params ){

		// TODO :: Need to update duration based on length
		var params = params || {},
			vx = getSystem( v3, ['x'], target.x, params ),
			vy = getSystem( v3, ['y'], target.y, params ),
			vz = getSystem( v3, ['z'], target.z, params ),
			tx, ty, tz,
			controls = {
				callback: emptyCallback,
				target 	: target || null,
				arrived	: false, 
				paused 	: true,
				speed 	: params.speed || 1.0,
				dispose: function(){
					systems.splice( systems.indexOf( update ), 1 );
				}
			}

		var update = function( t ){

			if( !controls.paused && controls.target !== null ){

				vx( v3.x, controls.target.x, t * controls.speed );
				vy( v3.y, controls.target.y, t * controls.speed );
				vz( v3.z, controls.target.z, t * controls.speed );

				tx = controls.target.x - v3.x;
				ty = controls.target.y - v3.y;
				tz = controls.target.z - v3.z;

				var l = Math.sqrt( tx*tx + ty*ty + tz*tz );
				if( !controls.arrived && l <= DEFAULT_THRESHOLD ){
					controls.arrived = true;
					// systems.splice( systems.indexOf( update ), 1 );
					controls.callback();
				}
			}

		};

		systems.push( update );

		return controls;

	
	}

	// api.vec2 = function( v2, target, callback ){

	// 	// TODO :: Need to update duration based on length

	// 	var vx = getSystem( v2, ['x'], target.x, params ),
	// 		vy = getSystem( v2, ['y'], target.y, params );

	// 	var controls = {
	// 		callback : callback || emptyCallback,
	// 		target: target || null
	// 	}

	// 	 var update = function( t ){

	// 	 	if( controls.target !== null ){
	// 			vx.update( t );
	// 			vy.update( t );

	// 			//check for completion
	// 			if( callback && target.sub( v2 ).length() <= 0 ){
	// 				systems.splice( systems.indexOf( update ), 1 ); 
	// 				controls.callback();
	// 			}
	// 		}

	// 	};

	// 	system.push( update );

	// 	return controls;

	// }

	return api;

	
});