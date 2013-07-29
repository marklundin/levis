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
	"libs/threejs/examples/js/controls/TransformControls"

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
			

		scene.fog = new THREE.Fog( 0xFFFFFF, 100, 5000 );
		controls.maxPolarAngle = Math.PI / 1.62;
		controls.userRotateSpeed = 0.4;

		camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );
		camera.position.z = 2500;
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
			// scene.add( basePlane );


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



			var faceMaterial, wfMaterial,
				obj 		= new THREE.Object3D(),
				structGeom 	= new THREE.Geometry(),
				DIMENSION 	= 25,
				SCALE 		= 100,
				x, y, z 	= DIMENSION;


			var seed = 2394;//( Math.random() * 30000 )|0;

			// shader params
		
			// material = new THREE.ShaderMaterial({

			// 	uniforms: {
			// 		// "uInverseProjectionMatrix": { type: "m4", value: camera.projectionMatrixInverse },
			// 		// "tDepth": 					{ type: "t", value: depthTarget }
			// 		uExponent :  { type: "f", 	value:40.0 },
			// 		uSeed :  	 { type: "f", 	value:seed },
			// 		radius :  	 { type: "f", 	value:0.5 },
			// 		frequency :  { type: "f", 	value:0.53 },
			// 		exponent :   { type: "f", 	value:10.0 },
			// 		threshold :  { type: "f", 	value:0.99 },
			// 		noise :   	 { type: "f", 	value:0.7 },
			// 		complexity : { type: "f", 	value:0.5 },
			// 		// uMetaballs : { type: "v4v", value: metaballs },
   //                  fogColor:    { type: "c", 	value: scene.fog.color },
			// 	    fogNear:     { type: "f", 	value: scene.fog.near },
			// 	    fogFar:      { type: "f", 	value: scene.fog.far }
			// 	},

			// 	wireframe: 		true,
			// 	fog: true,
			// 	blending: 		THREE.AdditiveBlending,
			// 	depthTest:		false,
			// 	transparent:	true,
			// 	vertexShader: 	structureShader.vertexShader,
			// 	fragmentShader: structureShader.fragmentShader,
			// });

			

			var amlight = new THREE.AmbientLight(0x111111 ),
				dilight = new THREE.DirectionalLight(0x444444),
				polight = new THREE.PointLight(0xffffff);

			var tControl = new THREE.TransformControls( camera, $( document, "#main" ) );
				// tControl.addEventListener( 'change', render );
				tControl.attach( polight );
				tControl.scale = 0.65;
				scene.add( tControl.gizmo );

			dilight.position.set( 1, 1, 0 ).normalize();
			polight.position.set( 1000, 500, 0 );//.normalize();
			

			faceMaterial = new THREE.MeshPhongMaterial({
				color: new THREE.Color( 0xffffff ),
				specular : new THREE.Color( 0xffffff ),
				opacity: 0.7,
				metal: true,
				transparent: true,
				blending: THREE.NormalBlending
			});

			wfMaterial = new THREE.MeshPhongMaterial({
				color: new THREE.Color( 0xffffff ),
				specular : new THREE.Color( 0xffffff ),
				shading: THREE.FlatShading,
				// opacity: 0.7,
				// transparent: true,
				wireframe:true,
				// blending: THREE.AdditiveBlending
			});

			scene.add( amlight );
			scene.add( dilight );
			scene.add( polight );

			faceMaterial.linewidth = 0.1;
			faceMaterial.seed = seed.toString();

			var api = {
				frequency 	: 0.8,
				seedRadius 	: 0.5,
				threshold 	: 0.68,
				noiseAmount : 0.7,
				complexity 	: 0.5,
				additive 	: false,
				wireframe: true,
				// opacity		: material.opacity
			}


			function updateMaterial()
			{
				var mode = api.additive ?  THREE.AdditiveBlending : THREE.NormalBlending;
				faceMaterial.needsUpdate = mode !== faceMaterial.blending;
				faceMaterial.blending = mode;

			
				wfMesh.material.visible = api.wireframe;
				faceMaterial.generate();
				
			}


			faceMaterial.generate_random = function (){
				faceMaterial.seed = String( (Math.random() * 30000)|0 );
				faceMaterial.generate();
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

			

			faceMaterial.generate = function(){


				var d;
				
				if( structMesh ){
					scene.remove( structMesh );
					scene.remove( wfMesh );
					baseGeom.dispose();
				}

				baseGeom = new THREE.Geometry();

				console.time( 'gpu noise')
				var noise3D = n.noise3D( DIMENSION, DIMENSION, DIMENSION, api.frequency, api.complexity, faceMaterial.seed );
				console.timeEnd( 'gpu noise')


				x = y = z = DIMENSION;
				var hDIM = DIMENSION * 0.5;


				while( z-- > 0 ){
					y = DIMENSION;
					while( y-- > 0 ){
						x = DIMENSION;
						while( x-- > 0 ){
							// console.log( noise3D( x, y, z )  );
							if( noise3D( x, y, z ) > api.threshold ){
								// console.log( "here" );
								cubeMesh.position.set( -hDIM + x, -hDIM + y, -hDIM + z );
								cubeMesh.position.multiplyScalar( SCALE );
								THREE.GeometryUtils.merge( baseGeom, cubeMesh );
							}
						}
					}
				}

				structMesh = new THREE.Mesh( baseGeom, faceMaterial );
				scene.add( structMesh );

				wfMesh = new THREE.Mesh( baseGeom, wfMaterial );
				scene.add( wfMesh );

				// console.timeEnd( 'generate' );

			}

			var formgui = gui.addFolder('form');
			formgui.add( api, "frequency", 		0.00, 2.0 	).onFinishChange( updateMaterial );
			formgui.add( api, "threshold", 		0.01, 0.99 	).onFinishChange( updateMaterial );
			formgui.add( api, "complexity", 	0.0, 1.0 	).onFinishChange( updateMaterial );
			
			formgui.open();

			var matgui = gui.addFolder('material');
			matgui.addColor( faceMaterial, "color"	);//.onChange( updateMaterial );
			matgui.addColor( faceMaterial, "specular"	);//.onChange( updateMaterial );
			matgui.addColor( faceMaterial, "ambient"	);//.onChange( updateMaterial );
			matgui.add( faceMaterial, "opacity", 		0.0, 1.0 	);//.onChange( updateMaterial );
			matgui.add( api, "additive" 	).onChange( updateMaterial );
			matgui.add( api, "wireframe" 	).onChange( updateMaterial );
			matgui.open();
			// gui.add( material, 	"wireframe" );
			gui.add( faceMaterial, 	"seed" ).listen();
			gui.add( faceMaterial, 	"generate_random" );
			gui.add( faceMaterial, 	"generate" );


		faceMaterial.generate();
		
		
		
		
		// scene.add( structMesh );
		// scene.add( obj );


		function animate( delta ){

			requestAnimationFrame( animate );
			tControl.update();
			controls.update();
			render( delta || 0 );

		}

		function render( delta ){


			// polight.position.x = Math.sin( delta * 0.001 ) * 1000.0;
			// polight.position.x += Math.sin( polight.position.x  * 0.001 ) * 2000.0;
			// polight.position.y = Math.sin( delta * 0.0014 ) * 5000.0;

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