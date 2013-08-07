define(function(){

	function isBitSet( value, bitindex ){
	    return (value & (1 << bitindex)) != 0;
	}
	
	return function ( w,h,d, thickness, bitflag ){

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

			// console.log( cornerMesh );

		// strut.w.faces = strutGeom.faces.splice( 0, 4 );

		// cornerMesh.geometry.faces = [cornerMesh.geometry.faces[1],cornerMesh.geometry.faces[3], cornerMesh.geometry.faces[5]]

		//width
		strut.w.position.set( 0, -hh, -hd );
		if( isBitSet( bitflag, 0 )) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		strut.w.position.set( 0, -hh,  hd );
		if( isBitSet( bitflag, 1 )) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		strut.w.position.set( 0,  hh,  hd );
		if( isBitSet( bitflag, 2 )) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		strut.w.position.set( 0,  hh, -hd );
		if( isBitSet( bitflag, 3 )) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		// height
		strut.h.position.set( -hw, 0, -hd  );
		if( isBitSet( bitflag, 4 )) THREE.GeometryUtils.merge( cube.geometry, strut.h );

		strut.h.position.set(  hw, 0, -hd  );
		if( isBitSet( bitflag, 5 )) THREE.GeometryUtils.merge( cube.geometry, strut.h );						

		strut.h.position.set(  hw, 0,  hd  );
		if( isBitSet( bitflag, 6 )) THREE.GeometryUtils.merge( cube.geometry, strut.h );						

		strut.h.position.set( -hw, 0,  hd  );
		if( isBitSet( bitflag, 7 )) THREE.GeometryUtils.merge( cube.geometry, strut.h );

		//depth
		strut.d.position.set( -hw, -hh, 0  );
		if( isBitSet( bitflag, 8 )) THREE.GeometryUtils.merge( cube.geometry, strut.d );

		strut.d.position.set(  hw, -hh, 0  );
		if( isBitSet( bitflag, 9 )) THREE.GeometryUtils.merge( cube.geometry, strut.d );						

		strut.d.position.set(  hw,  hh, 0  );
		if( isBitSet( bitflag, 10 )) THREE.GeometryUtils.merge( cube.geometry, strut.d );						

		strut.d.position.set( -hw,  hh, 0  );
		if( isBitSet( bitflag, 11 )) THREE.GeometryUtils.merge( cube.geometry, strut.d );


		var ninetyDegs = Math.PI * 0.5;

		// // Corner Boxes
		cornerMesh.position.set( -hw, -hh, -hd  );
		if( isBitSet( bitflag, 0 ) || isBitSet( bitflag, 8 ) || isBitSet( bitflag, 4 ) ) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set(  hw, -hh, -hd  );
		cornerMesh.rotation.y -= ninetyDegs;
		if( isBitSet( bitflag, 0 ) || isBitSet( bitflag, 9 ) || isBitSet( bitflag, 5 ) ) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( hw, -hh,  hd  );
		cornerMesh.rotation.y -= ninetyDegs;
		if( isBitSet( bitflag, 1 ) || isBitSet( bitflag, 9 ) || isBitSet( bitflag, 6 ) ) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( -hw, -hh,  hd  );
		cornerMesh.rotation.y -= ninetyDegs;
		if( isBitSet( bitflag, 1 ) || isBitSet( bitflag, 8 ) || isBitSet( bitflag, 7 ) ) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );


		cornerMesh.rotation.x -= 2.0 * ninetyDegs;
		cornerMesh.position.set( -hw, hh, -hd  );
		if( isBitSet( bitflag, 3 ) || isBitSet( bitflag, 11 ) || isBitSet( bitflag, 4 ) ) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set(  hw, hh, -hd  );
		cornerMesh.rotation.y += ninetyDegs;
		if( isBitSet( bitflag, 3 ) || isBitSet( bitflag, 10 ) || isBitSet( bitflag, 5 ) ) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( hw, hh,  hd  );
		cornerMesh.rotation.y += ninetyDegs;
		if( isBitSet( bitflag, 2 ) || isBitSet( bitflag, 10 ) || isBitSet( bitflag, 6 ) ) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( -hw, hh,  hd  );
		cornerMesh.rotation.y += ninetyDegs;
		if( isBitSet( bitflag, 2 ) || isBitSet( bitflag, 11 ) || isBitSet( bitflag, 7 ) ) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		return cube.geometry;

	}

})