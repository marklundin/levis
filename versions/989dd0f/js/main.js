var DEBUG = true;


define([

	"utils/domReady!",
	"utils/qwery",
	"glsl!shaders/structure.glsl",
	"utils/math",
	"structure",
	"glsl!shaders/skydome.glsl",
	"glsl!shaders/reflection.glsl",
	"utils/timer",
	// "utils/noise",
	"lighting",
	"utils/gui",
	"text!shaders/libs/noise2d.glsl",
	"text!shaders/libs/noise3d.glsl",
	"text!shaders/libs/utils.glsl",
	"./libs/threejs/examples/js/controls/OrbitControls"

	], function( DOM, $, structureShader, math, structure, skydome, reflection, timer, lighting, gui, noise2dShaderChunk , noise3dShaderChunk, utilsShaderChunk ) {


		// APP VARIABLES
		var WIDTH 	= window.innerWidth,
			HEIGHT 	= window.innerHeight
			STRUCT_SIZE = new THREE.Vector3( 1500, 1500, 1500 );


		// Scene
		var renderer 	= new THREE.WebGLRenderer({ antialias:true}),
			scene 		= new THREE.Scene(),
			camera 		= new THREE.PerspectiveCamera( 65,  WIDTH / HEIGHT , 1, 100000 ),
			controls 	= new THREE.OrbitControls( camera, $( document, "#main" ) );
			

		// scene.fog = new THREE.Fog( 0xFFFFFF, 100, 5000 );
		controls.maxPolarAngle = Math.PI / 1.62;
		controls.userRotateSpeed = 0.4;

		camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );
		camera.position.z = 2500;
		// controls.addEventListener( 'change', render );

		$( document, "#main" ).appendChild( renderer.domElement );


		window.addEventListener( 'resize', function(){

			WIDTH = window.innerWidth;
			HEIGHT =window.innerHeight;

			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();
			// camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );

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
			
			// var depthShader = THREE.ShaderLib[ "depthRGBA" ];
			// var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );

			// var depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );
			// depthMaterial.blending = THREE.NoBlending;


			// console.log(  depthUniforms)

			// // postprocessing
			// var composer = new THREE.EffectComposer( renderer );
			// composer.addPass( new THREE.RenderPass( scene, camera ) );

			// var depthTarget = new THREE.WebGLRenderTarget( WIDTH, HEIGHT, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
			// // console.log( camera.near );
			// var effect = new THREE.ShaderPass( THREE.SSAOShader );
			// effect.uniforms[ 'tDepth' ].value = depthTarget;
			// effect.uniforms[ 'size' ].value.set( WIDTH, HEIGHT );
			// effect.uniforms[ 'cameraNear' ].value = camera.near;
			// effect.uniforms[ 'cameraFar' ].value = camera.far;
			// effect.renderToScreen = true;
			// composer.addPass( effect );



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


			var faceMaterial,
				contentObj3d,
				seed = 2394,
				structMesh;
		
			



			// MATERIALS

				var phongShader = THREE.ShaderLib.phong,
					uniforms = THREE.UniformsUtils.clone(phongShader.uniforms),
					phongVertexShader = [

						"#define PHONG",

						"varying vec3 vViewPosition;",
						"varying vec3 vNormal;",

						noise3dShaderChunk,
						utilsShaderChunk,

						THREE.ShaderChunk[ "map_pars_vertex" ],
						THREE.ShaderChunk[ "lightmap_pars_vertex" ],
						THREE.ShaderChunk[ "envmap_pars_vertex" ],
						THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
						THREE.ShaderChunk[ "color_pars_vertex" ],
						THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
						THREE.ShaderChunk[ "skinning_pars_vertex" ],
						THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

						// "uniform float uFrequency;",
						// "uniform float uAmplitude;",
						// "uniform float uTwist;",


						"void main() {",

							THREE.ShaderChunk[ "map_vertex" ],
							THREE.ShaderChunk[ "lightmap_vertex" ],
							THREE.ShaderChunk[ "color_vertex" ],

							THREE.ShaderChunk[ "morphnormal_vertex" ],
							THREE.ShaderChunk[ "skinbase_vertex" ],
							THREE.ShaderChunk[ "skinnormal_vertex" ],
							THREE.ShaderChunk[ "defaultnormal_vertex" ],

							"vNormal = normalize( transformedNormal );",

							THREE.ShaderChunk[ "morphtarget_vertex" ],
							THREE.ShaderChunk[ "skinning_vertex" ],
							"vec4 mvPosition;",

							"#ifdef USE_SKINNING",

								"mvPosition = modelViewMatrix * skinned;",

							"#endif",

							"#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )",

								"mvPosition = modelViewMatrix * vec4( morphed, 1.0 );",

							"#endif",

							"#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )",

								// "vec3 noiseDirection = vec3( snoise( position.zy * uFrequency ) * 2.0 - 1.0 , snoise( position.xz * uFrequency )  * 2.0 - 1.0 ,  snoise( position.xy * uFrequency ) * 2.0 - 1.0  );",
								// "mvPosition = modelViewMatrix * vec4( position, 1.0 );",
								// "mvPosition = modelViewMatrix * (  rotationMatrix(vec3( 0.0, 1.0, 0.0), position.y * uTwist ) * vec4( position, 1.0 ) + vec4( noiseDirection * uAmplitude, 0.0 ));",
								// "float rotAmount = fract( position.y * 0.01 ) * 100.0 * uTwist;",
								"mvPosition = modelViewMatrix * vec4( position, 1.0 );//(  rotationMatrix(vec3( 0.0, 1.0, 0.0), rotAmount ) * vec4( position + uAmplitude * snoise( position * uFrequency ), 1.0 ));",

							"#endif",

							
							"gl_Position = projectionMatrix * mvPosition;",

							"vViewPosition = -mvPosition.xyz;",

							THREE.ShaderChunk[ "worldpos_vertex" ],
							THREE.ShaderChunk[ "envmap_vertex" ],
							THREE.ShaderChunk[ "lights_phong_vertex" ],
							THREE.ShaderChunk[ "shadowmap_vertex" ],

						"}"

					].join("\n");

				// console.log( phongVertexShader );

				faceMaterial = new THREE.ShaderMaterial({
				  	uniforms: THREE.UniformsUtils.merge([
					  	{
					  		"uFrequency" : { type: "f", value: 0.0 },
					  		"uAmplitude" : { type: "f", value: 0.0 },
					  		"uTwist" 	 : { type: "f", value: 0.001 },
					  	},
				  		uniforms
				  	]),
				  	lights: true,
				  	vertexShader: phongVertexShader,
				  	fragmentShader: phongShader.fragmentShader
				});

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



	

				// faceMaterial = new THREE.MeshPhongMaterial({
				// 	color: new THREE.Color( 0xffffff ),
				// 	specular : new THREE.Color( 0xffffff ),
				// });


				function updateMaterial(){
					faceMaterial.needsUpdate = true;	
				}

				
				faceMaterial.seed = seed.toString();

			// END MATERIALS



			//LIGHTS

				var lights = new lighting( scene, camera, $( document, "#main" ) , gui );
				lights.onLightAdded( updateMaterial );
				lights.onLightRemoved( updateMaterial );
				lights.addPointLight( 0xffffff );


			// END LIGHTS


			
			// GUI+API

				var api = {
					frequency 	: 0.95,
					threshold 	: 0.68,
					noiseAmount : 0.7,
					complexity 	: 0.82,
					horizontal_thickness 	: 7,
					vertical_thickness 	: 2,
					generate 	: generate,
					seed 		: String( seed ),

					// twist 		: faceMaterial.uniforms.uTwist.value * 100.0,
					// distortion 	: faceMaterial.uniforms.uFrequency.value * 100.0,
					// amount 		: faceMaterial.uniforms.uAmplitude.value,

					color 		: "#"+faceMaterial.uniforms.diffuse.value.getHexString(),
					specular 	: "#"+faceMaterial.uniforms.specular.value.getHexString(),
					ambient 	: "#"+faceMaterial.uniforms.ambient.value.getHexString(),

					// directional_light 	: "#"+dilight.color.getHexString(),
					// point_light 		: "#"+polight.color.getHexString(),
					// ambient_light 		: "#"+amlight.color.getHexString(),

					random 		: function (){
						seed = (Math.random() * 9999 )|0;
						api.seed = String( seed );
						generate();
					},
					updateCamera: function(){
						camera.updateProjectionMatrix();
					},
					updateMaterial: function(){

						faceMaterial.uniforms.diffuse.value.set( api.color )
						faceMaterial.uniforms.specular.value.set( api.specular )
						faceMaterial.uniforms.ambient.value.set( api.ambient )

						faceMaterial.uniforms.uFrequency.value = api.distortion / 100.0;
						faceMaterial.uniforms.uTwist.value = api.twist / 100.0;
						faceMaterial.uniforms.uAmplitude.value = api.amount;

					}
				}

				
				var formgui = gui.addFolder('structure');
				formgui.add( api, "frequency", 		0.00, 2.0 	).onFinishChange( api.generate );
				formgui.add( api, "threshold", 		0.01, 0.99 	).onFinishChange( api.generate );
				formgui.add( api, "complexity", 	0.0,  1.0 	).onFinishChange( api.generate );
				formgui.add( api, "horizontal_thickness", 0, 50	).onFinishChange( api.generate );
				formgui.add( api, "vertical_thickness", 0, 50	).onFinishChange( api.generate );
				// formgui.add( api, "distortion", 	0.0,  1.0 ).step( 0.001 ).onChange( api.updateMaterial );
				// formgui.add( api, "amount",	 		0.0,  50.0 ).onChange( api.updateMaterial );
				// formgui.add( api, "twist", 	0.0,  4.0 ).step( 0.001 ).onChange( api.updateMaterial );

				formgui.open();

				var matgui = gui.addFolder('material');
				matgui.addColor( api, "color"	).onChange( api.updateMaterial );
				matgui.addColor( api, "ambient" ).onChange( api.updateMaterial );
				matgui.addColor( api, "specular" ).onChange( api.updateMaterial );
				// matgui.open();

				// var lightsgui = gui.addFolder('lights');
				// lightsgui.addColor( api, "ambient_light" ).onChange( api.updateLights );
				// lightsgui.addColor( api, "point_light" ).onChange( api.updateLights );
				// lightsgui.addColor( api, "directional_light" ).onChange( api.updateLights );
				// lightsgui.open()
				

				gui.add( api, 	"seed" );//.listen();
				gui.add( api, 	"random" );
				gui.add( api, 	"generate" );
				gui.add( skyMat, "visible" );
				gui.add( camera, "fov", 0, 100 ).onChange( api.updateCamera );



			// END GUI+API


			// Creates new structure
			function generate(){

				console.log( 'GENERATE' );
				
				if( structMesh ){
					scene.remove( structMesh );
					scene.remove( contentObj3d );
					structMesh.geometry.dispose();
				}

				console.log( api.horizontal_thickness, api.vertical_thickness );
				var strut = structure( api.frequency, api.complexity, seed, api.threshold, api.horizontal_thickness, api.vertical_thickness );


				structMesh = new THREE.Mesh( strut.geometry, faceMaterial );
				scene.add( structMesh );


				contentObj3d = new THREE.Object3D();

				var contentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0xff2200 ),
					ambient:new THREE.Color( 0xff2200 ),
					transparent: true,
					opacity: 0.8,
				});

				var n = 60,
					index, item, mesh;

				while( n-- > 0 ){
					mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), contentMaterial );
					index = ~~( Math.random() * strut.volume.length )
					item = strut.volume[index];
					mesh.position.set( item[0], item[1], item[2] );
					mesh.position.x -= 15;
					mesh.position.y -= 15;
					mesh.position.z -= 15;
					mesh.position.multiplyScalar( 100 );
					

					contentObj3d.add( mesh );
				}

				scene.add( contentObj3d );
				
			}


		// END SUPPORT STRUCTURE

		var controlsActive = false;
		function animate( delta ){

			requestAnimationFrame( animate );
			// controlActive = (Boolean( dilight.control.active ) || Boolean( polight.control.active ));
			
			controlsActive = lights.update();
			controls.setPauseState( controlsActive );
			if( !controlsActive ){
				controls.update();
			}

			// dilight.control.update();
			// dilight.helper.update();

			// polight.control.update();
			
			render( delta || 0 );

		}

		function render( delta ){


			// polight.position.x = Math.sin( delta * 0.001 ) * 1000.0;
			// polight.position.x += Math.sin( polight.position.x  * 0.001 ) * 2000.0;
			// polight.position.y = Math.sin( delta * 0.0014 ) * 5000.0;

			//depth pass
			// scene.overrideMaterial = depthMaterial;
			// renderer.render( scene, camera, depthTarget );
			// scene.overrideMaterial = null;

			// //to screen
			// composer.render()
			// console.time('render')
			// console.log( material.uniforms.uTime.value );
			// material.uniforms.uTime.value = delta * 0.00005;
			renderer.render( scene, camera );
			// console.timeEnd('render')

		}

		generate();
		animate();


	}
);