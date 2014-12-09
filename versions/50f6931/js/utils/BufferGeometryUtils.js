define({
	
	merge: function( bufferGeometry, fromMesh ){

		var tmp = new THREE.Vector3(),
			normalMatrix = new THREE.Matrix3().getNormalMatrix( fromMesh.matrix );

		var faces = fromMesh.geometry.faces,
			vertices  = fromMesh.geometry.vertices;
	 		faceVertexUvs = fromMesh.geometry.faceVertexUvs,
        	hasFaceVertexUv = faceVertexUvs[ 0 ].length > 0;

        var positions = bufferGeometry.attributes.position.array,
    		normals   = bufferGeometry.attributes.normal.array,
    		colors    = bufferGeometry.attributes.color.array,
    		uvs 	  = bufferGeometry.attributes.uv.array;

		var i2 = uvs.length, i3 = positions.length;

		for ( var i = 0; i < faces.length; i ++ ) {

			var face = faces[ i ];

			// var a = vertices[ face.a ];
			// var b = vertices[ face.b ];
			// var c = vertices[ face.c ];

			tmp.copy( vertices[ face.a ] ).applyMatrix4( fromMesh.matrix );

			positions[ i3     ] = tmp.x;
			positions[ i3 + 1 ] = tmp.y;
			positions[ i3 + 2 ] = tmp.z;

			tmp.copy( vertices[ face.b ] ).applyMatrix4( fromMesh.matrix );
			
			positions[ i3 + 3 ] = tmp.x;
			positions[ i3 + 4 ] = tmp.y;
			positions[ i3 + 5 ] = tmp.z;

			tmp.copy( vertices[ face.c ] ).applyMatrix4( fromMesh.matrix );
			
			positions[ i3 + 6 ] = tmp.x;
			positions[ i3 + 7 ] = tmp.y;
			positions[ i3 + 8 ] = tmp.z;

			// var na = face.vertexNormals[ 0 ];
			// var nb = face.vertexNormals[ 1 ];
			// var nc = face.vertexNormals[ 2 ];

			tmp.copy( face.vertexNormals[ 0 ] ).applyMatrix3( normalMatrix );

			normals[ i3     ] = tmp.x;
			normals[ i3 + 1 ] = tmp.y;
			normals[ i3 + 2 ] = tmp.z;

			tmp.copy( face.vertexNormals[ 1 ] ).applyMatrix3( normalMatrix );

			normals[ i3 + 3 ] = tmp.x;
			normals[ i3 + 4 ] = tmp.y;
			normals[ i3 + 5 ] = tmp.z;

			tmp.copy( face.vertexNormals[ 2 ] ).applyMatrix3( normalMatrix );

			normals[ i3 + 6 ] = tmp.x;
			normals[ i3 + 7 ] = tmp.y;
			normals[ i3 + 8 ] = tmp.z;

			// if ( vertexColors === THREE.FaceColors ) {

				var fc = face.color;

				colors[ i3     ] = fc.r;
				colors[ i3 + 1 ] = fc.g;
				colors[ i3 + 2 ] = fc.b;

				colors[ i3 + 3 ] = fc.r;
				colors[ i3 + 4 ] = fc.g;
				colors[ i3 + 5 ] = fc.b;

				colors[ i3 + 6 ] = fc.r;
				colors[ i3 + 7 ] = fc.g;
				colors[ i3 + 8 ] = fc.b;

			// } else if ( vertexColors === THREE.VertexColors ) {

				// var vca = face.vertexColors[ 0 ];
				// var vcb = face.vertexColors[ 1 ];
				// var vcc = face.vertexColors[ 2 ];

				// colors[ i3     ] = vca.r;
				// colors[ i3 + 1 ] = vca.g;
				// colors[ i3 + 2 ] = vca.b;

				// colors[ i3 + 3 ] = vcb.r;
				// colors[ i3 + 4 ] = vcb.g;
				// colors[ i3 + 5 ] = vcb.b;

				// colors[ i3 + 6 ] = vcc.r;
				// colors[ i3 + 7 ] = vcc.g;
				// colors[ i3 + 8 ] = vcc.b;

			// }

			if ( hasFaceVertexUv === true ) {

				var uva = faceVertexUvs[ 0 ][ i ][ 0 ];
				var uvb = faceVertexUvs[ 0 ][ i ][ 1 ];
				var uvc = faceVertexUvs[ 0 ][ i ][ 2 ];
				// var uvd = faceVertexUvs[ 0 ][ i ][ 3 ];

				uvs[ i2     ] = uva.x;
				uvs[ i2 + 1 ] = uva.y;
			
				uvs[ i2 + 2 ] = uvb.x;
				uvs[ i2 + 3 ] = uvb.y;
			
				uvs[ i2 + 4 ] = uvc.x;
				uvs[ i2 + 5 ] = uvc.y;

				// uvs[ i2 + 6 ] = uvd.x;
				// uvs[ i2 + 7 ] = uvd.y;

			}

			i3 += 9;
			i2 += 6;

		}
	}

})