define(function(){
	
	return function ( dimension, thickness ){

		var strutGeom   = new THREE.CubeGeometry( thickness, thickness, dimension - thickness ),
			strutMesh 	= new THREE.Mesh( strutGeom );
			cornerMesh 	= new THREE.Mesh( new THREE.CubeGeometry( thickness, thickness, thickness ));
			hDIM 		= dimension * 0.5,
			cube 		= new THREE.Mesh( THREE.Geometry() );

		strutGeom.faces = strutGeom.faces.splice( 0, 4 );
		cornerMesh.geometry.faces = [cornerMesh.geometry.faces[1],cornerMesh.geometry.faces[3], cornerMesh.geometry.faces[5]]


		strutMesh.position.set( hDIM, hDIM, 0 );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );

		strutMesh.position.set( hDIM, -hDIM, 0 );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );

		strutMesh.position.set( -hDIM, -hDIM, 0 );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );

		strutMesh.position.set( -hDIM, hDIM, 0 );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );


		strutMesh.rotation.y = Math.PI * 0.5;
		strutMesh.position.set( 0, hDIM, hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );

		strutMesh.position.set( 0, -hDIM, hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );						

		strutMesh.position.set( 0, -hDIM, -hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );						

		strutMesh.position.set( 0, hDIM, -hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );


		strutMesh.rotation.y = 0;
		strutMesh.rotation.x = Math.PI * 0.5;
		strutMesh.position.set( hDIM, 0, hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );

		strutMesh.position.set( -hDIM, 0, hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );						

		strutMesh.position.set( -hDIM, 0, -hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );						

		strutMesh.position.set( hDIM, 0, -hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, strutMesh );


		var ninetyDegs = Math.PI * 0.5;

		// // Corner Boxes
		cornerMesh.position.set( -hDIM, -hDIM, -hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set(  hDIM, -hDIM, -hDIM  );
		cornerMesh.rotation.y -= ninetyDegs;
		THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( hDIM, -hDIM,  hDIM  );
		cornerMesh.rotation.y -= ninetyDegs;
		THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( -hDIM, -hDIM,  hDIM  );
		cornerMesh.rotation.y -= ninetyDegs;
		THREE.GeometryUtils.merge( cube.geometry, cornerMesh );


		cornerMesh.rotation.x -= 2.0 * ninetyDegs;
		cornerMesh.position.set( -hDIM, hDIM, -hDIM  );
		THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set(  hDIM, hDIM, -hDIM  );
		cornerMesh.rotation.y += ninetyDegs;
		THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( hDIM, hDIM,  hDIM  );
		cornerMesh.rotation.y += ninetyDegs;
		THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( -hDIM, hDIM,  hDIM  );
		cornerMesh.rotation.y += ninetyDegs;
		THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		return cube.geometry;

	}

})