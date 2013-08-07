define(function(){

	var THRESHOLD = 0.5;

	
	
	return function ( w,h,d, thickness, solidity ){

	
		var strut 	    = {
				w: new THREE.Mesh( new THREE.CubeGeometry( w - thickness, 	thickness, 		thickness 		)),
				h: new THREE.Mesh( new THREE.CubeGeometry( thickness, 		h - thickness,	thickness 		)),
				d: new THREE.Mesh( new THREE.CubeGeometry( thickness, 		thickness, 		d - thickness 	)),	
			}, 
			cornerMesh 	= new THREE.Mesh( new THREE.CubeGeometry( thickness, thickness, thickness ));
			hw 			= w * 0.5,
			hh 			= h * 0.5,
			hd 			= d * 0.5,
			cube 		= new THREE.Mesh( THREE.Geometry() );


		// strut.w.faces = strutGeom.faces.splice( 0, 4 );

		// cornerMesh.geometry.faces = [cornerMesh.geometry.faces[1],cornerMesh.geometry.faces[3], cornerMesh.geometry.faces[5]]

		function display(){
			return Math.random() * solidity > THRESHOLD;
		}

		//width
		strut.w.position.set( 0, -hh, -hd );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		strut.w.position.set( 0, -hh,  hd );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		strut.w.position.set( 0,  hh,  hd );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		strut.w.position.set( 0,  hh, -hd );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		// height
		strut.h.position.set( -hw, 0, -hd  );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.h );

		strut.h.position.set(  hw, 0, -hd  );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.h );						

		strut.h.position.set(  hw, 0,  hd  );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.h );						

		strut.h.position.set( -hw, 0,  hd  );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.h );

		//depth
		strut.d.position.set( -hw, -hh, 0  );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.d );

		strut.d.position.set(  hw, -hh, 0  );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.d );						

		strut.d.position.set(  hw,  hh, 0  );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.d );						

		strut.d.position.set( -hw,  hh, 0  );
		if( display() ) THREE.GeometryUtils.merge( cube.geometry, strut.d );


		var ninetyDegs = Math.PI * 0.5;

		// // Corner Boxes
		// cornerMesh.position.set( -hw, -hh, -hd  );
		// THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		// cornerMesh.position.set(  hw, -hh, -hd  );
		// cornerMesh.rotation.y -= ninetyDegs;
		// THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		// cornerMesh.position.set( hw, -hh,  hd  );
		// cornerMesh.rotation.y -= ninetyDegs;
		// THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		// cornerMesh.position.set( -hw, -hh,  hd  );
		// cornerMesh.rotation.y -= ninetyDegs;
		// THREE.GeometryUtils.merge( cube.geometry, cornerMesh );


		// cornerMesh.rotation.x -= 2.0 * ninetyDegs;
		// cornerMesh.position.set( -hw, hh, -hd  );
		// THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		// cornerMesh.position.set(  hw, hh, -hd  );
		// cornerMesh.rotation.y += ninetyDegs;
		// THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		// cornerMesh.position.set( hw, hh,  hd  );
		// cornerMesh.rotation.y += ninetyDegs;
		// THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		// cornerMesh.position.set( -hw, hh,  hd  );
		// cornerMesh.rotation.y += ninetyDegs;
		// THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		return cube.geometry;

	}

})