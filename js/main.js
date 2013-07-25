define([

	"utils/domReady!",
	"utils/qwery",
	"glsl!shaders/structure.glsl",
	"utils/math",
	"structure",
	"glsl!shaders/skydome.glsl",
	"glsl!shaders/reflection.glsl",
	"utils/timer",
	"libs/threejs/examples/js/controls/OrbitControls",
	"libs/threejs/examples/js/postprocessing/EffectComposer",

	], function( DOM, $, structureShader, math, structure, skydome, reflection, timer ) {

		// APP CONSTANTS
		var DEBUG = ( $.params( "DEBUG" ) !== 'false' && $.params( "DEBUG" ) !== '' );


		// APP VARIABLES
		var WIDTH 	= window.innerWidth,
			HEIGHT 	= window.innerHeight

		// Scene

		var STRUCT_SIZE = new THREE.Vector3( 1500, 1500, 1500 );


		var renderer 	= new THREE.WebGLRenderer({ antialias:true}),
			scene 		= new THREE.Scene(),
			camera 		= new THREE.PerspectiveCamera( 65,  WIDTH / HEIGHT, 1, 100000 ),
			controls 	= new THREE.OrbitControls( camera );
			

		scene.fog = new THREE.Fog( 0xFF0000, 100, 110 );
		controls.maxPolarAngle = Math.PI / 1.62;
		controls.userRotateSpeed = 0.4;

		camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );
		camera.position.z = 3500;
		// controls.addEventListener( 'change', render );

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
				uniforms: planeUniforms,
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



		// SUPPORT STUCTURE



			var material,
				obj 		= new THREE.Object3D(),
				structGeom 	= new THREE.Geometry(),
				DIMENSION 	= 40,
				SCALE 		= 100,
				x, y, z 	= DIMENSION;

			
		

			var tmpVec3 = new THREE.Vector3();
			function randomVec4InSphere( rad, mag ){

				tmpVec3.set(
					math.random( -rad, rad ), //x
					math.random( -rad, rad ), //y
					math.random( -rad, rad ) //z
				);

				tmpVec3.normalize().multiplyScalar( math.random( mag, rad - mag  ))

				
				var size = math.random( rad * 0.05, 300.0 );//math.cosineInterpolation( Math.random(), rad * 0.1, rad * 0.5 );//random( rad * 0.1, rad * 0.5 ) //size
				// var dist = math.random( size , rad - ( 2.0 * size ));//Math.sin( Math.PI * Math.random() * 0.5 ) * rad;

				var vec = new THREE.Vector4( 
					tmpVec3.x,
					tmpVec3.y, 
					tmpVec3.z,
					size
				);


				return vec;
			}


			var centerRadius  			= 800.0,
				lacunarity 	  			= 0.7,
				baseNode 	  			= new THREE.Vector4( 0.0, 0.0, 0.0, centerRadius ),
				baseNode2 	  			= baseNode.clone();

			baseNode.rot  			= new THREE.Matrix4().makeRotationX( Math.PI * math.random( 0.3, 0.7 ));
			baseNode2.rot 			= new THREE.Matrix4().makeRotationX( Math.PI * math.random( 0.3, 0.7 ));
			baseNode.direction 	 	= new THREE.Vector3( math.random( -1, 1 ), math.random( -1, 1 ), math.random( -1, 1 ));
			baseNode2.direction 	= new THREE.Vector3( math.random( -1, 1 ), math.random( -1, 1 ), math.random( -1, 1 ));

			var metaballs = [ 
				baseNode
            ] 



			var debugmesh = new THREE.Mesh( new THREE.SphereGeometry( baseNode.w ), new THREE.MeshNormalMaterial() )
				debugmesh.position.copy( baseNode );
				// scene.add( debugmesh );

			// createSubNode( baseNode, 0, 4 );
			// createSubNode( baseNode2, 0, 4 );
			// var subNode1 = createSubNode( subNode0 );
			// var subNode2 = createSubNode( subNode1 );




			// var tmpVec3 = new THREE.Vector3();
			

			function createSubNode ( node, n, limit ){

				if( n++ === limit ) return;

				var position = tmpVec3.copy( node );
				var size 	 = node.w * lacunarity  * math.random( 0.5, 1.0 ); // Add some variation



				position.add ( node.direction.clone().normalize().transformDirection( node.rot ).multiplyScalar(   ( node.w + size ) * math.random( 0.8, 1.6 )  ));
				
				var result 		 = new THREE.Vector4( tmpVec3.x, tmpVec3.y, tmpVec3.z, size);
				result.direction = node.direction;
				result.rot 		 = node.rot.clone();

				metaballs.push( result );

				var debugmesh = new THREE.Mesh( new THREE.SphereGeometry( size ), new THREE.MeshNormalMaterial() )
				debugmesh.position.copy( position );
				scene.add( debugmesh );

				createSubNode( result, n, limit );

			}

		
            


			// shader params
			console.log( scene.fog.near, scene.fog.far );

			material = new THREE.ShaderMaterial({
				uniforms: {
					// "uInverseProjectionMatrix": { type: "m4", value: camera.projectionMatrixInverse },
					// "tDepth": 					{ type: "t", value: depthTarget }
					uExponent :  { type: "f", value:40.0 },
					uTime :  { type: "f", value:Math.random() * 30000 },
					uMetaballs : { 
						type: "v4v", 
						value: metaballs
                    }, // Vector3 array
                    fogColor:    { type: "c", value: scene.fog.color },
				    fogNear:     { type: "f", value: scene.fog.near },
				    fogFar:      { type: "f", value: scene.fog.far }
				},
				fog: true,
				blending: 		THREE.AdditiveBlending,
				depthTest:		false,
				transparent:	true,
				vertexShader: 	structureShader.vertexShader,
				fragmentShader: structureShader.fragmentShader,
			});

			material.linewidth = 1;
			material.defines.NUM_METABALLS = metaballs.length;

			console.log( material.defines.NUM_METABALLS );

			

			while( z-- > 0 ){
				y = DIMENSION;
				while( y-- > 0 ){
					x = DIMENSION;
					while( x-- > 0 ){
						structGeom.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
						structGeom.vertices.push( new THREE.Vector3( x+1, y, z ).multiplyScalar( SCALE ));

						structGeom.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
						structGeom.vertices.push( new THREE.Vector3( x, y+1, z ).multiplyScalar( SCALE ));

						structGeom.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
						structGeom.vertices.push( new THREE.Vector3( x, y, z+1 ).multiplyScalar( SCALE ));
						// struct.geometry.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
						// struct.geometry.vertices.push( new THREE.Vector3( y, z, x ).multiplyScalar( SCALE ));
						// struct.geometry.vertices.push( new THREE.Vector3( z, x, y ).multiplyScalar( SCALE ));
					}
				}
			}



		THREE.GeometryUtils.center( structGeom );
		var structMesh = new THREE.Line( structGeom, material, THREE.LinePieces );
		
		
		obj.add( structMesh );
		scene.add( obj );


		function animate( delta ){

			requestAnimationFrame( animate );
			controls.update();
			render( delta || 0 );
		}

		console.log9 
		function render( delta ){

			//depth pass
			// scene.overrideMaterial = depthMaterial;
			// renderer.render( scene, camera );
			// scene.overrideMaterial = null;

			// //to screen
			// composer.render()
			// console.time('render')
			// console.log( material.uniforms.uTime.value );
			// material.uniforms.uTime.value = delta * 0.00005;
			renderer.render( scene, camera );
			// console.timeEnd('render')

		}

		animate();


	}
);