

define([
	'libs/threejs/build/three'
	],function(){

	function isBitSet( value, bitindex ){
	    return (value & (1 << bitindex)) != 0;
	}

	


	var CustomCubeGeometry = function ( width, height, depth, xScale, yScale, zScale, widthSegments, heightSegments, depthSegments ) {

		THREE.Geometry.call( this );

		var scope = this;

		this.width = width;
		this.height = height;
		this.depth = depth;

		this.widthSegments = widthSegments || 1;
		this.heightSegments = heightSegments || 1;
		this.depthSegments = depthSegments || 1;

		xScale = xScale || 1;
		yScale = yScale || 1;
		zScale = zScale || 1; 

		var width_half = this.width / 2;
		var height_half = this.height / 2;
		var depth_half = this.depth / 2;

		buildPlane( 'z', 'y', - 1, - 1, this.depth, this.height, width_half, 0, zScale, yScale ); // px
		buildPlane( 'z', 'y',   1, - 1, this.depth, this.height, - width_half, 1, zScale, yScale ); // nx
		buildPlane( 'x', 'z',   1,   1, this.width, this.depth, height_half, 2, xScale, zScale ); // py
		buildPlane( 'x', 'z',   1, - 1, this.width, this.depth, - height_half, 3, xScale, zScale  ); // ny
		buildPlane( 'x', 'y',   1, - 1, this.width, this.height, depth_half, 4, xScale, yScale ); // pz
		buildPlane( 'x', 'y', - 1, - 1, this.width, this.height, - depth_half, 5, xScale, yScale ); // nz

		function buildPlane( u, v, udir, vdir, width, height, depth, materialIndex, uScale, vScale  ) {

			var w, ix, iy,
			gridX = scope.widthSegments,
			gridY = scope.heightSegments,
			width_half = width / 2,
			height_half = height / 2,
			offset = scope.vertices.length;

			if ( ( u === 'x' && v === 'y' ) || ( u === 'y' && v === 'x' ) ) {

				w = 'z';

			} else if ( ( u === 'x' && v === 'z' ) || ( u === 'z' && v === 'x' ) ) {

				w = 'y';
				gridY = scope.depthSegments;

			} else if ( ( u === 'z' && v === 'y' ) || ( u === 'y' && v === 'z' ) ) {

				w = 'x';
				gridX = scope.depthSegments;

			}

			var gridX1 = gridX + 1,
			gridY1 = gridY + 1,
			segment_width = width / gridX,
			segment_height = height / gridY,
			normal = new THREE.Vector3();

			normal[ w ] = depth > 0 ? 1 : - 1;

			for ( iy = 0; iy < gridY1; iy ++ ) {

				for ( ix = 0; ix < gridX1; ix ++ ) {

					var vector = new THREE.Vector3();
					vector[ u ] = ( ix * segment_width - width_half ) * udir;
					vector[ v ] = ( iy * segment_height - height_half ) * vdir;
					vector[ w ] = depth;

					scope.vertices.push( vector );

				}

			}

			for ( iy = 0; iy < gridY; iy++ ) {

				for ( ix = 0; ix < gridX; ix++ ) {

					var a = ix + gridX1 * iy;
					var b = ix + gridX1 * ( iy + 1 );
					var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
					var d = ( ix + 1 ) + gridX1 * iy;

					var face = new THREE.Face4( a + offset, b + offset, c + offset, d + offset );
					face.normal.copy( normal );
					face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone(), normal.clone() );
					face.materialIndex = materialIndex;

					scope.faces.push( face );
					scope.faceVertexUvs[ 0 ].push( [
								new THREE.Vector2( ix / gridX * uScale, 1 - iy / gridY * vScale ),
								new THREE.Vector2( ix / gridX * uScale, 1 - ( iy + 1 ) / gridY  * vScale),
								new THREE.Vector2( ( ix + 1 ) / gridX * uScale, 1- ( iy + 1 ) / gridY * vScale),
								new THREE.Vector2( ( ix + 1 ) / gridX * uScale, 1 - iy / gridY * vScale)
							] );

				}

			}

		}

		this.computeCentroids();
		this.mergeVertices();

	};

	CustomCubeGeometry.prototype = Object.create( THREE.Geometry.prototype );


	return function ( w,h,d, thickness, vThickness, bitflag, px, py, pz ){

		var ratio = vThickness / thickness;
		var strut 	    = {
				w: new THREE.Mesh( new CustomCubeGeometry( w - thickness, 	thickness, 		thickness, 1, 1, 1			 )),
				h: new THREE.Mesh( new CustomCubeGeometry( vThickness, 		h - thickness,	vThickness, ratio, 1, ratio )),
				d: new THREE.Mesh( new CustomCubeGeometry( thickness, 		thickness, 		d - thickness, 1, 1, 1 	 )),	
			}, 
			cornerMesh 	= new THREE.Mesh( new THREE.CubeGeometry( thickness, thickness, thickness ));
			hw 			= w * 0.5,
			hh 			= h * 0.5,
			hd 			= d * 0.5,
			cube 		= new THREE.Mesh( THREE.Geometry() );

			// console.log( cornerMesh );

		strut.d.geometry.faces = strut.d.geometry.faces.slice( 0, 4 );
		strut.w.geometry.faces = strut.w.geometry.faces.slice( 2 );
		strut.h.geometry.faces.splice( 2, 2 );


		// cornerMesh.geometry.faces = cornerMesh.geometry.faces.splice( 2, 2 );

		var wFlag = bitflag;

		//width
		strut.w.position.set( 0, -hh, -hd );
		if( isBitSet( bitflag, 0 )) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		strut.w.position.set( 0, -hh,  hd );
		if( !isBitSet( pz, 0 ) && isBitSet( bitflag, 1 )) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		strut.w.position.set( 0,  hh,  hd );
		if( !isBitSet( py, 1 ) && !isBitSet( pz, 3 ) && isBitSet( bitflag, 2 )) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		strut.w.position.set( 0,  hh, -hd );
		if( !isBitSet( py, 0 ) && isBitSet( bitflag, 3 )) THREE.GeometryUtils.merge( cube.geometry, strut.w );

		// height
		strut.h.position.set( -hw, 0, -hd  );
		if( isBitSet( bitflag, 4 )) THREE.GeometryUtils.merge( cube.geometry, strut.h );

		strut.h.position.set(  hw, 0, -hd  );
		if( !isBitSet( px, 4 ) && isBitSet( bitflag, 5 )) THREE.GeometryUtils.merge( cube.geometry, strut.h );						

		strut.h.position.set(  hw, 0,  hd  );
		if( !isBitSet( pz, 5 ) && !isBitSet( px, 7 ) && isBitSet( bitflag, 6 )) THREE.GeometryUtils.merge( cube.geometry, strut.h );						

		strut.h.position.set( -hw, 0,  hd  );
		if( !isBitSet( pz, 4 ) && isBitSet( bitflag, 7 )) THREE.GeometryUtils.merge( cube.geometry, strut.h );

		//depth
		strut.d.position.set( -hw, -hh, 0  );
		if( isBitSet( bitflag, 8 )) THREE.GeometryUtils.merge( cube.geometry, strut.d );

		strut.d.position.set(  hw, -hh, 0  );
		if( !isBitSet( px, 8 ) && isBitSet( bitflag, 9 )) THREE.GeometryUtils.merge( cube.geometry, strut.d );						

		strut.d.position.set(  hw,  hh, 0  );
		if( !isBitSet( py, 9 ) && !isBitSet( px, 11 ) && isBitSet( bitflag, 10 )) THREE.GeometryUtils.merge( cube.geometry, strut.d );								

		strut.d.position.set( -hw,  hh, 0  );
		if( !isBitSet( py, 8 ) && isBitSet( bitflag, 11 )) THREE.GeometryUtils.merge( cube.geometry, strut.d );

		var ninetyDegs = Math.PI * 0.5;

		// Corner Boxes
		cornerMesh.position.set( -hw, -hh, -hd  );
		if( isBitSet( bitflag, 0 ) || isBitSet( bitflag, 8 ) || isBitSet( bitflag, 4 ) ) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set(  hw, -hh, -hd  );
		cornerMesh.rotation.y -= ninetyDegs;
		if( isBitSet( bitflag, 0 ) || isBitSet( bitflag, 9 ) || isBitSet( bitflag, 5 ) &&
			!( isBitSet( px, 0 ) || isBitSet( px, 8 ) || isBitSet( px, 4 ))) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( hw, -hh,  hd  );
		cornerMesh.rotation.y -= ninetyDegs;
		if( isBitSet( bitflag, 1 ) || isBitSet( bitflag, 9 ) || isBitSet( bitflag, 6 ) &&
			!( isBitSet( px, 8 ) || isBitSet( px, 7 ) || isBitSet( px, 9 )) &&
			!( isBitSet( pz, 0 ) || isBitSet( pz, 5 ) || isBitSet( pz, 9 ))) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );


		cornerMesh.position.set( -hw, -hh,  hd  );
		cornerMesh.rotation.y -= ninetyDegs;
		if( isBitSet( bitflag, 1 ) || isBitSet( bitflag, 8 ) || isBitSet( bitflag, 7 ) &&
			!( isBitSet( pz, 0 ) || isBitSet( pz, 4 ) || isBitSet( pz, 8 ))) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );


		// cornerMesh.rotation.x -= 2.0 * ninetyDegs;
		cornerMesh.position.set( -hw, hh, -hd  );
		if( isBitSet( bitflag, 3 ) || isBitSet( bitflag, 11 ) || isBitSet( bitflag, 4 ) &&
			!( isBitSet( py, 0 ) || isBitSet( py, 4 ) || isBitSet( py, 8 ))) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set(  hw, hh, -hd  );
		cornerMesh.rotation.y += ninetyDegs;
		if( isBitSet( bitflag, 3 ) || isBitSet( bitflag, 10 ) || isBitSet( bitflag, 5 ) &&
			!( isBitSet( px, 4 ) || isBitSet( px, 3 ) || isBitSet( px, 11 )) && 
			!( isBitSet( py, 0 ) || isBitSet( py, 5 ) || isBitSet( py, 3 ))) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( hw, hh,  hd  );
		cornerMesh.rotation.y += ninetyDegs;
		if( isBitSet( bitflag, 2 ) || isBitSet( bitflag, 10 ) || isBitSet( bitflag, 6 ) &&
			!( isBitSet( px, 2 ) || isBitSet( px, 7 ) || isBitSet( px, 11 )) && 
			!( isBitSet( py, 1 ) || isBitSet( py, 6 ) || isBitSet( py, 9 )) &&
			!( isBitSet( pz, 10 ) || isBitSet( pz, 3 ) || isBitSet( pz, 5 ))) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );

		cornerMesh.position.set( -hw, hh,  hd  );
		cornerMesh.rotation.y += ninetyDegs;
		if( isBitSet( bitflag, 2 ) || isBitSet( bitflag, 11 ) || isBitSet( bitflag, 7 ) &&
			!( isBitSet( py, 8 ) || isBitSet( py, 1 ) || isBitSet( py, 7 )) && 
			!( isBitSet( pz, 4 ) || isBitSet( pz, 3 ) || isBitSet( pz, 11 ))) THREE.GeometryUtils.merge( cube.geometry, cornerMesh );


		return cube.geometry;

	}

})