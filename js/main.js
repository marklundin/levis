define([

	"utils/domReady!",
	"utils/qwery",
	"glsl!shaders/default.glsl",
	"utils/math",
	"structure",
	"glsl!shaders/skydome.glsl",
	"glsl!shaders/reflection.glsl",
	"libs/threejs/examples/js/controls/OrbitControls",
	"libs/threejs/examples/js/postprocessing/EffectComposer",

	], function( DOM, $, shaderCode, math, structure, skydome, reflection ) {

		// APP CONSTANTS
		var DEBUG = ( $.params( "DEBUG" ) !== 'false' && $.params( "DEBUG" ) !== '' );


		// APP VARIABLES
		var WIDTH 	= window.innerWidth,
			HEIGHT 	= window.innerHeight

		// Scene

		var STRUCT_SIZE = new THREE.Vector3( 1500, 1500, 1500 );


		var renderer 	= new THREE.WebGLRenderer({ antialias:true}),
			scene 		= new THREE.Scene(),
			camera 		= new THREE.PerspectiveCamera( 65,  WIDTH / HEIGHT, 1, 100000 );
			controls 	= new THREE.OrbitControls( camera );
			

		controls.maxPolarAngle = Math.PI / 1.62;
		controls.userRotateSpeed = 0.4;

		camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );
		camera.position.z = 2000;
		controls.addEventListener( 'change', render );

		$( document, "#main" ).appendChild( renderer.domElement );


		window.addEventListener( 'resize', function(){

			WIDTH = document.width;
			HEIGHT = document.height;

			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();
			camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );

			renderer.setSize( WIDTH, HEIGHT );			
		})


		renderer.setSize( WIDTH, HEIGHT );

		// BASE PLANE

			var planeUniforms = {

				color: 	 { type: "c", value: new THREE.Color( 0x222222 ) },
				// bottomColor: { type: "c", value: new THREE.Color( 0x222222 ) },
				// offset:		 { type: "f", value: 10 },
				// exponent:	 { type: "f", value: 0.5 }
			}

			var planeMat = new THREE.ShaderMaterial( { 
				vertexShader: reflection.vertexShader, 
				fragmentShader: reflection.fragmentShader, 
				uniforms: planeUniforms
			});

			var basePlane = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000, 1, 1 ), planeMat );
			basePlane.rotation.x = Math.PI * -0.5;
			basePlane.position.y = STRUCT_SIZE.y * -0.5;
			scene.add( basePlane );


		// DEPTH PASS
			
			var depthShader = THREE.ShaderLib[ "depthRGBA" ];
			var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );

			var depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );
			depthMaterial.blending = THREE.NoBlending;

			// postprocessing
			var composer = new THREE.EffectComposer( renderer );
			composer.addPass( new THREE.RenderPass( scene, camera ) );

			var depthTarget = new THREE.WebGLRenderTarget( WIDTH, HEIGHT, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
			
			var effect = new THREE.ShaderPass( THREE.SSAOShader );
			effect.uniforms[ 'tDepth' ].value = depthTarget;
			effect.uniforms[ 'size' ].value.set( WIDTH, HEIGHT );
			effect.uniforms[ 'cameraNear' ].value = camera.near;
			effect.uniforms[ 'cameraFar' ].value = camera.far;
			effect.renderToScreen = true;
			composer.addPass( effect );

		// SKYDOME

				var uniforms = {
					topColor: 	 { type: "c", value: new THREE.Color( 0x777777 ) },
					bottomColor: { type: "c", value: new THREE.Color( 0x222222 ) },
					offset:		 { type: "f", value: 10 },
					exponent:	 { type: "f", value: 0.5 }
				}

				console.log( planeUniforms.color );
				uniforms.bottomColor.value.copy( planeUniforms.color.value );

				// scene.fog.color.copy( uniforms.bottomColor.value );

				var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
				var skyMat = new THREE.ShaderMaterial( { 
					vertexShader: skydome.vertexShader, 
					fragmentShader: skydome.fragmentShader, 
					uniforms: uniforms, side: THREE.BackSide 
				} );

				var sky = new THREE.Mesh( skyGeo, skyMat );
				scene.add( sky );

		// shader params
		var shaderParams = {
			// uniforms: {
			// 	"uInverseProjectionMatrix": { type: "m4", value: camera.projectionMatrixInverse },
			// 	"tDepth": 					{ type: "t", value: depthTarget }
			// },
			blending: 		THREE.AdditiveBlending,
			depthTest:		false,
			transparent:	true,
			vertexShader: shaderCode.vertexShader,
			fragmentShader: shaderCode.fragmentShader,
		}

		var geometry 	= new THREE.CubeGeometry( 500, 500, 500 ),
			material	= new THREE.ShaderMaterial( shaderParams ),
			mesh 		= new THREE.Mesh( geometry, material ),
			obj 		= new THREE.Object3D();

		material.linewidth = 1;
		material.linecap = 'square';
		material.linejoin = 'square';

		//Support structure
		// struct = new structure();

		var struct = {};
		struct.geometry = new THREE.Geometry();
		struct.material = new THREE.MeshBasicMaterial( {wireframe:true, color:0xff0000});
		

		var DIMENSION = 15,
			SCALE = 100,
			x, y, z = DIMENSION;

		while( z-- > 0 ){
			y = DIMENSION;
			while( y-- > 0 ){
				x = DIMENSION;
				while( x-- > 0 ){
					struct.geometry.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
					struct.geometry.vertices.push( new THREE.Vector3( x+1, y, z ).multiplyScalar( SCALE ));

					struct.geometry.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
					struct.geometry.vertices.push( new THREE.Vector3( x, y+1, z ).multiplyScalar( SCALE ));

					struct.geometry.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
					struct.geometry.vertices.push( new THREE.Vector3( x, y, z+1 ).multiplyScalar( SCALE ));
					// struct.geometry.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
					// struct.geometry.vertices.push( new THREE.Vector3( y, z, x ).multiplyScalar( SCALE ));
					// struct.geometry.vertices.push( new THREE.Vector3( z, x, y ).multiplyScalar( SCALE ));
				}
			}
		}

		// z = DIMENSION;
		// while( z-- > 0 ){
		// 	y = DIMENSION;
		// 	while( y-- > 0 ){
		// 		x = DIMENSION;
		// 		while( x-- > 0 ){
		// 			struct.geometry.vertices.push( new THREE.Vector3( y,z,x ).multiplyScalar( SCALE ));
		// 		}
		// 	}
		// }


		THREE.GeometryUtils.center( struct.geometry );

		struct.mesh = new THREE.Line( struct.geometry, material, THREE.LinePieces );
		
		obj.add( struct.mesh );


		

		

		scene.add( obj );

		var n = 100;
		while( n-- > 0 ){
			mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = math.random( -400, 400 );
			mesh.position.y = math.random( -400, 400 );
			mesh.position.z = math.random( -400, 400 );

			mesh.scale.x = math.random( 0.5, 3 );
			mesh.scale.y = math.random( 0.5, 3 );
			mesh.scale.z = math.random( 0.5, 3 );

			mesh.rotation.x = math.random( -Math.PI, Math.PI );
			mesh.rotation.y = math.random( -Math.PI, Math.PI );
			// mesh.rotation.z = math.random( -Math.PI, Math.PI );

			// obj.add( mesh );
		}


		function animate(){

			
			requestAnimationFrame( animate );
			controls.update();
		}

		function render(){

			//depth pass
			// scene.overrideMaterial = depthMaterial;
			// renderer.render( scene, camera );
			// scene.overrideMaterial = null;

			// //to screen
			// composer.render()
			renderer.render( scene, camera );

		}

		animate();


	}
);