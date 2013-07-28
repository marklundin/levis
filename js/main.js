define([

	"utils/domReady!",
	"utils/qwery",
	"glsl!shaders/structure.glsl",
	"utils/math",
	"structure",
	"glsl!shaders/skydome.glsl",
	"glsl!shaders/reflection.glsl",
	"utils/timer",
	"utils/noise",
	"libs/threejs/examples/js/controls/OrbitControls",
	"libs/threejs/examples/js/postprocessing/EffectComposer",
	"libs/threejs/examples/js/ImprovedNoise",

	], function( DOM, $, structureShader, math, structure, skydome, reflection, timer, n ) {


		// APP CONSTANTS
		var DEBUG = ( $.params( "DEBUG" ) !== 'false' && $.params( "DEBUG" ) !== '' );

		var gui = new dat.GUI();


		// APP VARIABLES
		var WIDTH 	= window.innerWidth,
			HEIGHT 	= window.innerHeight
			STRUCT_SIZE = new THREE.Vector3( 1500, 1500, 1500 );


		// Scene
		var renderer 	= new THREE.WebGLRenderer({ antialias:true}),
			scene 		= new THREE.Scene(),
			camera 		= new THREE.PerspectiveCamera( 65,  WIDTH / HEIGHT, 1, 100000 ),
			controls 	= new THREE.OrbitControls( camera, $( document, "#main" ) );
			

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
				DIMENSION 	= 30,
				SCALE 		= 200,
				x, y, z 	= DIMENSION;

			
		

			var tmpVec3 = new THREE.Vector3();
			function randomVec4InSphere( rad, mag ){

				tmpVec3.set(
					math.random( -rad, rad ), //x
					math.random( -rad, rad ), //y
					math.random( -rad, rad )  //z
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

		
            
			var seed = ( Math.random() * 30000 )|0;

			// shader params
			

			material = new THREE.ShaderMaterial({

				uniforms: {
					// "uInverseProjectionMatrix": { type: "m4", value: camera.projectionMatrixInverse },
					// "tDepth": 					{ type: "t", value: depthTarget }
					uExponent :  { type: "f", 	value:40.0 },
					uSeed :  	 { type: "f", 	value:seed },
					radius :  	 { type: "f", 	value:0.5 },
					frequency :  { type: "f", 	value:0.53 },
					exponent :   { type: "f", 	value:10.0 },
					threshold :  { type: "f", 	value:0.99 },
					noise :   	 { type: "f", 	value:0.7 },
					complexity : { type: "f", 	value:0.5 },
					// uMetaballs : { type: "v4v", value: metaballs },
                    fogColor:    { type: "c", 	value: scene.fog.color },
				    fogNear:     { type: "f", 	value: scene.fog.near },
				    fogFar:      { type: "f", 	value: scene.fog.far }
				},
				wireframe: 		true,
				fog: true,
				blending: 		THREE.AdditiveBlending,
				depthTest:		false,
				transparent:	true,
				vertexShader: 	structureShader.vertexShader,
				fragmentShader: structureShader.fragmentShader,
			});

			material.linewidth = 0.1;
			material.seed = seed.toString();

			var api = {
				frequency 	: material.uniforms.frequency.value,
				seedRadius 	: 0.5,
				threshold 	: material.uniforms.threshold.value,
				noiseAmount : material.uniforms.noise.value,
				complexity 	: material.uniforms.complexity.value,
			}


			function updateMaterial()
			{
				material.uniforms.frequency.value 	= api.frequency;
				material.uniforms.threshold.value 	= api.threshold;
				material.uniforms.noise.value 		= api.noiseAmount;
				material.uniforms.complexity.value 	= api.complexity;
				
			}


			material.generate_random = function (){
				material.seed = String( (Math.random() * 30000)|0 );
				material.generate();
				// console.log( material.uniforms.uSeed.value );
				// console.log( material.uniforms.complexity.value );
			}

			var baseGeom;
			var cubeGeom = new THREE.CubeGeometry( SCALE, SCALE, SCALE, 1, 1, 1 );
			var cubeMesh = new THREE.Mesh( cubeGeom );
			var prng = new ImprovedNoise();
			var noise;
			var fbmV3 = new THREE.Vector3();
			var fbmElevV3 = new THREE.Vector3();
			var structMesh;
			// var emptyGeom = new THREE.Geometry();

			

			function fbm( p ){

				fbmV3.copy( p );

				fbmV3.multiplyScalar( 1.0 / ( DIMENSION * 0.5 ) );
				fbmV3.multiplyScalar( api.frequency );
				
				fbmV3.x += 1.0;
				fbmV3.y += 1.0;
				fbmV3.z += 1.0;



				
				//scale fbmV3 by frequency

				var x, y, z;
				// fbmElevV3.copy( fbm );
				// fbmElevV3.x = prng.noise( fbmV3.x * 2.0 , 		fbmV3.y * 2.0, 			fbmV3.z * 2.0 );// * 0.5 + 0.5;
				// fbmElevV3.y = prng.noise( fbmV3.x * 2.0 + 0.3 , fbmV3.y * 2.0 - 0.1 , 	fbmV3.z * 2.0 + 0.2 );// * 0.5 + 0.5;
				// fbmElevV3.z = prng.noise( fbmV3.x * 2.0 + 0.2, 	fbmV3.y * 2.0 + 0.3, 	fbmV3.z * 2.0 + 0.2);// * 0.5 + 0.5;

				// fbmElevV3.multiplyScalar( api.complexity );

				// return prng.noise( fbmV3.x + fbmElevV3.x, fbmV3.y + fbmElevV3.y, fbmV3.z + fbmElevV3.z );// * 0.5 + 0.5;
				return prng.noise( fbmV3.x , fbmV3.y, fbmV3.z );


			}

			function step( edge, x ){
				return x < edge ? 0.0 : 1.0;
			}

			material.generate = function(){

				

				var d;
				
				if( structMesh ){
					scene.remove( structMesh );
					baseGeom.dispose();
				}

				baseGeom = new THREE.Geometry();
				// baseGeom.dynamic = true;

				var noise3D;
				// function noiseVolume( ){

					console.time( 'gpu noise')
					noise3D = n.noise3D( DIMENSION, DIMENSION, DIMENSION );
					console.timeEnd( 'gpu noise')

				// }

				// noiseVolume()
// console.time( 'generate' );

				x = y = z = DIMENSION;
				var hDIM = DIMENSION * 0.5;

				while( z-- > 0 ){
					y = DIMENSION;
					while( y-- > 0 ){
						x = DIMENSION;
						while( x-- > 0 ){

							cubeMesh.position.set( -hDIM + x, -hDIM + y, -hDIM + z );
							
							// console.log( x, y, z, noise3D( x, y, z ));
							noise = noise3D( x, y, z );//fbm( cubeMesh.position );// * api.noiseAmount;//prng.noise( x / DIMENSION, y / DIMENSION, z / DIMENSION );// * 0.5 + 0.5;
							// d = ( 1.0 - step( api.seedRadius * ( 1.0 - noise ), cubeMesh.position.length() / hDIM  ));

							// console.log( material.uniforms.radius.value * noise );

							if( noise > 0.5 ){
								// console.log( 'here' );
								cubeMesh.position.multiplyScalar( SCALE );
								THREE.GeometryUtils.merge( baseGeom, cubeMesh );
							}

							// structGeom.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
							// structGeom.vertices.push( new THREE.Vector3( x+1, y, z ).multiplyScalar( SCALE ));

							// structGeom.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
							// structGeom.vertices.push( new THREE.Vector3( x, y+1, z ).multiplyScalar( SCALE ));

							// structGeom.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
							// structGeom.vertices.push( new THREE.Vector3( x, y, z+1 ).multiplyScalar( SCALE ));
							// struct.geometry.vertices.push( new THREE.Vector3( x, y, z ).multiplyScalar( SCALE ));
							// struct.geometry.vertices.push( new THREE.Vector3( y, z, x ).multiplyScalar( SCALE ));
							// struct.geometry.vertices.push( new THREE.Vector3( z, x, y ).multiplyScalar( SCALE ));


						}
					}
				}

				// THREE.GeometryUtils.center( baseGeom );

				structMesh = new THREE.Mesh( baseGeom, material );
				scene.add( structMesh );

				// console.timeEnd( 'generate' );

			}

			

			// gui.add( material.uniforms.radius, 		"value", 0, 1 );
			gui.add( api, "frequency", 		0.00, 2.0 	).onChange( updateMaterial );
			gui.add( api, "seedRadius", 		0.01, 1.0 	).onChange( updateMaterial );
			// gui.add( api, "threshold", 		0.01, 0.99 	).onChange( updateMaterial );
			gui.add( api, "noiseAmount", 	0.0, 1.0 	).onChange( updateMaterial );
			gui.add( api, "complexity", 	0.0, 1.0 	).onChange( updateMaterial );

			gui.add( material, 	"wireframe" );
			gui.add( material, 	"seed" ).listen();
			gui.add( material, 	"generate_random" );
			gui.add( material, 	"generate" );


			

			



		material.generate();
		
		
		
		
		scene.add( structMesh );
		// scene.add( obj );


		function animate( delta ){

			requestAnimationFrame( animate );
			controls.update();
			render( delta || 0 );
		}

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