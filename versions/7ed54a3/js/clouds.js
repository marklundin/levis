define([
	'libs/threejs/build/three',
	"glsl!shaders/clouds.glsl"],
	
	function(){


		return function( scene ){


			// CLOUDS

			var clouds = {};
			var geometry = new THREE.Geometry();

			var texture = THREE.ImageUtils.loadTexture( 'js/cloud10.png' );
			texture.magFilter = THREE.LinearMipMapLinearFilter;
			texture.minFilter = THREE.LinearMipMapLinearFilter;


			clouds.material = new THREE.ShaderMaterial( {

				uniforms: {

					// 'tDepth': { type: 't', value: depthTarget },
					"map": { type: "t", value: texture },
					"fogColor" : { type: "c", value: scene.fog.color },
					"fogNear" : { type: "f", value: scene.fog.near },
					"fogFar" : { type: "f", value: scene.fog.far },

				},
				vertexShader: cloudsShader.vertexShader, //document.getElementById( 'vs' ).textContent,
				fragmentShader: cloudsShader.fragmentShader, //document.getElementById( 'fs' ).textContent,
				depthWrite: false,
				// depthTest: false,
				transparent: true,
				// side: THREE.DoubleSide

			} );

			var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );

			// for ( var i = 0; i < 8000; i++ ) {

			// 	plane.position.x = Math.random() * 1000 - 500;
			// 	plane.position.y = - Math.random() * Math.random() * 200 - 15;
			// 	plane.position.z = i;
			// 	plane.rotation.z = Math.random() * Math.PI;
			// 	plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;


			// 	THREE.GeometryUtils.merge( geometry, plane );

			// }

			// var m = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ),  clouds.material );
			// m.position.z = -40;
			// m.rotation.y = Math.PI * -0.5;
			// camera.add( m );


			// clouds.material.opacity = 0.01;
			// clouds.meshA = new THREE.Mesh( geometry, clouds.material );
			// // mesh.position.z = - 8000;
			// scene.add( clouds.meshA );

			// clouds.meshB = new THREE.Mesh( geometry, clouds.material );
			// clouds.meshB.position.z = - 8000;
			// scene.add( clouds.meshB );


			// END CLOUDS


		}

	}
);