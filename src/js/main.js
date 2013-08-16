var DEBUG = true;


define([

	"utils/domReady!",
	"jquery",
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
	"glsl!shaders/clouds.glsl",
	"data",
	"textplane",
	"pathcontrols",
	"./libs/threejs/examples/js/controls/OrbitControls",
	"libs/threejs/examples/js/postprocessing/EffectComposer"
	

	], function( DOM, jquery, structureShader, math, structure, skydome, reflection, timer, lighting, gui, noise2dShaderChunk , noise3dShaderChunk, utilsShaderChunk, cloudsShader, dataloader, textplane, pathcontrols ) {


		var guiContainerDom = document.getElementById('gui');
		guiContainerDom.appendChild( gui.domElement );


		// APP VARIABLES
		var WIDTH 	= window.innerWidth,
			HEIGHT 	= window.innerHeight
			STRUCT_SIZE = new THREE.Vector3( 1500, 1500, 1500 );


		// Scene
		var renderer 	  = new THREE.WebGLRenderer({ antialias:true}),
			container 	  = $( '#main' )[0],
			infoOverlay   = $( '#info-overlay' ),
			searchOverlay = $( '#search-overlay' ),
			inputField    = $( '#search-field' )[0],
			scene 		  = new THREE.Scene(),
			camera 		  = new THREE.PerspectiveCamera( 65,  WIDTH / HEIGHT , 1, 100000 ),
			controls 	  = new THREE.OrbitControls( camera, container ),
			projector  	  = new THREE.Projector(),
			raycaster 	  = new THREE.Raycaster(),
			mouse 		  = new THREE.Vector2(),
			moving 		  = false,
			arrived       = false,
			timestep 	  = 0.0003,
			showingSearchResults = false,
			INTERSECTED;


		infoOverlay.fadeOut(0);
			
		scene.fog = new THREE.Fog( 0x000000, 1, 5000 );
		scene.add( camera );


		controls.maxPolarAngle = Math.PI / 1.62;
		controls.userRotateSpeed = 0.4;
		controls.userPan = false;
		controls.userZoom = false;
		controls.autoRotateSpeed = 300 * timestep;
		var distanceTarget = controls.distance = 2500;
		controls.distanceVel = 0;

		camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );
		camera.position.z = 2500;

		container.appendChild( renderer.domElement );


		window.addEventListener( 'resize', function(){

			WIDTH = window.innerWidth;
			HEIGHT =window.innerHeight;

			camera.aspect = camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();
			camera.updateProjectionMatrix();
			// camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );

			renderer.setSize( WIDTH, HEIGHT );			
		})

		document.addEventListener( 'mousemove', function ( event ) {

			event.preventDefault();

			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		});

		searchOverlay.children( ".close-button-icon" ).click(function( e ){
			e.preventDefault();
			// clicked = null;
			showingSearchResults = false;

			imageContentMaterial.opacity = 1.0;
			videoContentMaterial.opacity = 0.8;

			var n = searchCubes.length;
			while( n-- > 0 ){
				searchCubes[n].parent.remove( searchCubes[n] );
			}
			searchCubes = [];

			inputField.value = '';

			searchOverlay.fadeOut( 400 );
			distanceTarget = 2000;
			camTarget.set( 0, 0, 0 );

			// var d = camera.position.clone().sub( clicked.position ).length();
			timeCoeff = 30000 / 2500; 
		});



		infoOverlay.children( ".close-button-icon" ).click(function( e ){

			if( showingSearchResults ){

				imageContentMaterial.opacity = 1.0;
				videoContentMaterial.opacity = 0.8;

				showingSearchResults = false;
				var n = searchCubes.length;
				inputField.value = '';

				searchOverlay.fadeOut( 400 );
				while( n-- > 0 ){
					searchCubes[n].parent.remove( searchCubes[n] );
				}
			}

			e.preventDefault();
			// clicked = null;

			infoOverlay.fadeOut( 400 );
			distanceTarget = 2000;
			camTarget.set( 0, 0, 0 );

			// var d = camera.position.clone().sub( clicked.position ).length();
			timeCoeff = 30000 / 2500; 

		})

		var clicked;
		var timeCoeff = 1;
		function moveCameraTo( p, dst ){
			// maxDistTarget = 300;
			distanceTarget = dst || 250;
			moving = true;
			arrived = false;


			var d = camera.position.clone().sub( p ).length();
			timeCoeff = 30000 / d;

			camTarget.copy( p );
		}


		document.addEventListener( 'mousedown', function(){

			if( INTERSECTED && INTERSECTED !== clicked ){

				if( showingSearchResults && searchCubes.indexOf( INTERSECTED ) === -1 ) return;

				clicked = INTERSECTED;

				controls.autoRotate = true;
				infoOverlay.fadeOut( 400, function(){

					infoOverlay.children( '#image' ).attr( 'src', clicked.infoDataObject.attribution_avatar );
					// console.log( clicked.infoDataObject );

				} );
				

				moveCameraTo( clicked.position );
				// // maxDistTarget = 300;
				// distanceTarget = 250;
				// moving = true;
				// arrived = false;


				// var d = camera.position.clone().sub( clicked.position ).length();
				// timeCoeff = 30000 / d;

				// camTarget.copy( INTERSECTED.position );

			} 

		})

		renderer.setSize( WIDTH, HEIGHT );


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


			// console.log(  depthUniforms)

			// // postprocessing
			// var composer = new THREE.EffectComposer( renderer );
			// // composer.addPass( new THREE.RenderPass( scene, camera ) );

			// var depthTarget = new THREE.WebGLRenderTarget( WIDTH, HEIGHT, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
			// // // console.log( camera.near );
			// var effect = new THREE.ShaderPass( {
			// 	uniforms: {

			// 		'tDepth': { type: 't', value: depthTarget },
			// 		"map": { type: "t", value: texture },
			// 		"fogColor" : { type: "c", value: scene.fog.color },
			// 		"fogNear" : { type: "f", value: scene.fog.near },
			// 		"fogFar" : { type: "f", value: scene.fog.far },

			// 	},
			// 	vertexShader: cloudsShader.vertexShader, //document.getElementById( 'vs' ).textContent,
			// 	fragmentShader: cloudsShader.fragmentShader,
			// } );
			// // effect.uniforms[ 'tDepth' ].value = depthTarget;
			// // effect.uniforms[ 'size' ].value.set( WIDTH, HEIGHT );
			// // effect.uniforms[ 'cameraNear' ].value = camera.near;
			// // effect.uniforms[ 'cameraFar' ].value = camera.far;

			// var fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
			// fxaaPass.uniforms[ 'resolution' ].value = new THREE.Vector2( 1 / WIDTH, 1 / HEIGHT );
			// effect.renderToScreen = true;
			// composer.addPass( effect );
			// composer.addPass( fxaaPass );
			



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

				// var phongShader = THREE.ShaderLib.phong,
				// 	uniforms = THREE.UniformsUtils.clone(phongShader.uniforms),
				// 	phongVertexShader = [

				// 		"#define PHONG",

				// 		"varying vec3 vViewPosition;",
				// 		"varying vec3 vNormal;",

				// 		noise3dShaderChunk,
				// 		utilsShaderChunk,

				// 		THREE.ShaderChunk[ "map_pars_vertex" ],
				// 		THREE.ShaderChunk[ "lightmap_pars_vertex" ],
				// 		THREE.ShaderChunk[ "envmap_pars_vertex" ],
				// 		THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
				// 		THREE.ShaderChunk[ "color_pars_vertex" ],
				// 		THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
				// 		THREE.ShaderChunk[ "skinning_pars_vertex" ],
				// 		THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

				// 		// "uniform float uFrequency;",
				// 		// "uniform float uAmplitude;",
				// 		// "uniform float uTwist;",


				// 		"void main() {",

				// 			THREE.ShaderChunk[ "map_vertex" ],
				// 			THREE.ShaderChunk[ "lightmap_vertex" ],
				// 			THREE.ShaderChunk[ "color_vertex" ],

				// 			THREE.ShaderChunk[ "morphnormal_vertex" ],
				// 			THREE.ShaderChunk[ "skinbase_vertex" ],
				// 			THREE.ShaderChunk[ "skinnormal_vertex" ],
				// 			THREE.ShaderChunk[ "defaultnormal_vertex" ],

				// 			"vNormal = normalize( transformedNormal );",

				// 			THREE.ShaderChunk[ "morphtarget_vertex" ],
				// 			THREE.ShaderChunk[ "skinning_vertex" ],
				// 			"vec4 mvPosition;",

				// 			"#ifdef USE_SKINNING",

				// 				"mvPosition = modelViewMatrix * skinned;",

				// 			"#endif",

				// 			"#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )",

				// 				"mvPosition = modelViewMatrix * vec4( morphed, 1.0 );",

				// 			"#endif",

				// 			"#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )",

				// 				// "vec3 noiseDirection = vec3( snoise( position.zy * uFrequency ) * 2.0 - 1.0 , snoise( position.xz * uFrequency )  * 2.0 - 1.0 ,  snoise( position.xy * uFrequency ) * 2.0 - 1.0  );",
				// 				// "mvPosition = modelViewMatrix * vec4( position, 1.0 );",
				// 				// "mvPosition = modelViewMatrix * (  rotationMatrix(vec3( 0.0, 1.0, 0.0), position.y * uTwist ) * vec4( position, 1.0 ) + vec4( noiseDirection * uAmplitude, 0.0 ));",
				// 				// "float rotAmount = fract( position.y * 0.01 ) * 100.0 * uTwist;",
				// 				"mvPosition = modelViewMatrix * vec4( position, 1.0 );//(  rotationMatrix(vec3( 0.0, 1.0, 0.0), rotAmount ) * vec4( position + uAmplitude * snoise( position * uFrequency ), 1.0 ));",

				// 			"#endif",

							
				// 			"gl_Position = projectionMatrix * mvPosition;",

				// 			"vViewPosition = -mvPosition.xyz;",

				// 			THREE.ShaderChunk[ "worldpos_vertex" ],
				// 			THREE.ShaderChunk[ "envmap_vertex" ],
				// 			THREE.ShaderChunk[ "lights_phong_vertex" ],
				// 			THREE.ShaderChunk[ "shadowmap_vertex" ],

				// 		"}"

				// 	].join("\n");

				// // console.log( phongVertexShader );

				// faceMaterial = new THREE.ShaderMaterial({
				//   	uniforms: THREE.UniformsUtils.merge([
				// 	  	{
				// 	  		"uFrequency" : { type: "f", value: 0.0 },
				// 	  		"uAmplitude" : { type: "f", value: 0.0 },
				// 	  		"uTwist" 	 : { type: "f", value: 0.001 },
				// 	  	},
				//   		uniforms
				//   	]),
				//   	fog:true,
				//   	lights: true,
				//   	vertexShader: phongVertexShader,
				//   	fragmentShader: phongShader.fragmentShader
				// });
				

				faceMaterial = new THREE.MeshPhongMaterial({metal:true});


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





			// CAMERA PATH

				var end      = new THREE.Vector3(),
					approach = new THREE.Vector3(),
					dif      = new THREE.Vector3(),
					dir      = new THREE.Vector3(),
					mid      = new THREE.Vector3(),
					UP       = new THREE.Vector3( 0, 1, 0),
					FORWARD  = new THREE.Vector3( 0, 0, -1 ), 
					cross    = new THREE.Vector3();

				var CAMERA_PATH_DEVIATION = 0.5;


				var camDir 	= FORWARD.clone(),
					origin  = new THREE.Vector3(),
					tmpAppr  = new THREE.Vector3(),
					cameraPath, testCam;


				

				function generatePathTo( object ){

					origin.copy( camera.position)
					var pts = [ origin ];

					// Get Camera direction
					camDir.copy( FORWARD ).applyQuaternion( camera.quaternion );
					
					// Add first control point along the cameras current direction, at a slower velocity
					pts.push( camDir.clone().multiplyScalar(( camera.velocity || 600 ) * 0.75 ).add( origin ));

					// Position end X pixels away from the destination object in the direction of it's normal
					// approach.copy( object.normal ).multiplyScalar( 600 ).add( object.position );
					end.copy     ( object.normal ).multiplyScalar( 300 ).add( object.position );
					approach.copy( object.normal ).multiplyScalar( 500 ).add( end );


					// Mid point
					dif.copy( approach ).sub( pts[1] );
					dir.copy( dif ).normalize();
					mid.copy( dif ).multiplyScalar( 0.5 ).add( pts[1] );
					cross.copy( UP ).cross( dir );
					cross.applyAxisAngle( dir, Math.random() * Math.PI * 2.0 );
					mid.add( cross.multiplyScalar( dif.length() * CAMERA_PATH_DEVIATION ));


					// Shift the approach way point toward the middle to avoid sharp turns
					approach.add( tmpAppr.copy( mid ).sub( approach ).multiplyScalar( 0.2 ));
					


					pts.push( mid );
					pts.push( approach );
					pts.push( end );



					

					if( cameraPath ){
						scene.remove( cameraPath );
						cameraPath.geometry.dispose();
					}


					var curve = new THREE.SplineCurve3( pts );

					var pathGeometry = new THREE.Geometry();
					pathGeometry.vertices = curve.getSpacedPoints( 50.0 );


					var smooth = new THREE.SplineCurve3( curve.getSpacedPoints( 4 ));
					smooth.geom = new THREE.Geometry();
					smooth.geom.vertices = smooth.getSpacedPoints( 50 );

					// var smoothPoints = resampleSpline( new THREE.SplineCurve3( curve.getSpacedPoints( 50.0 ) ), 50.0 );
					// console.log( smoothPoints, pts );
					// var smoothCurve =  new THREE.SplineCurve3( smoothPoints );

					// smoothCurve.geom = new THREE.Geometry();
					// smoothCurve.geom.vertices = smoothCurve.getSpacedPoints( 50.0 );
					
					cameraPath = new THREE.Line( pathGeometry, new THREE.LineBasicMaterial() );
					// cameraPathSmooth = new THREE.Line( smooth.geom, new THREE.LineBasicMaterial({color:0xff0000}) );


					var n = pathGeometry.vertices.length,
						sph = new THREE.SphereGeometry( 10 ),
						sphMat = new THREE.MeshNormalMaterial(),
						sphMat2 = new THREE.MeshBasicMaterial({color:0xff0000}),
						sphMesh, sphMesh2;

					// var n = pts.length;
					// while( n-- > 0 ){
					// 	sphMesh = new THREE.Mesh( sph, sphMat );
					// 	sphMesh.position.copy( pts[n] );
					// 	scene.add( sphMesh );
					// }

					// testCam = new THREE.Mesh( sph, sphMat );
					// scene.add( testCam );

					cameraPath.controls = pathcontrols( camera, curve, curve.getLength() * 20  );
					// cameraPath.controlsSmooth = pathcontrols( testCam, curve, 30000 );

					// cameraPath.controls.onComplete( function(){
						// cameraPath.controls.paused = true;
					// });

					

					// while( n-- > 0){
					// 	sphMesh = new THREE.Mesh( sph, sphMat );
						
					// 	sphMesh.position.copy( pathGeometry.vertices[n] );
						
					// 	scene.add( sphMesh );
						
					// }

					// n = smoothCurve.geom.vertices.length;
					// while( n-- > 0 ){
					// 	sphMesh2 = new THREE.Mesh( sph, sphMat2 );
					// 	sphMesh2.position.copy( smoothCurve.geom.vertices[n] );
					// 	scene.add( sphMesh2 );
					// }

					
					scene.add( cameraPath );
					// scene.add( cameraPathSmooth );


				}

				

				


			// END CAMERA PATH


			//LIGHTS

				var lights = new lighting( scene, camera, container, gui );
				lights.onLightAdded( updateMaterial );
				lights.onLightRemoved( updateMaterial );
				lights.addPointLight( 0xffffff );


			// END LIGHTS


			
			// GUI+API

				var api = {
					frequency 	: 0.95,
					speed 		: 0.95,
					threshold 	: 0.68,
					noiseAmount : 0.7,
					complexity 	: 0.82,
					horizontal_thickness 	: 7,
					vertical_thickness 	: 2,
					generate 	: generate,
					seed 		: String( seed ),
					camera 		: false,

					// twist 		: faceMaterial.uniforms.uTwist.value * 100.0,
					// distortion 	: faceMaterial.uniforms.uFrequency.value * 100.0,
					// amount 		: faceMaterial.uniforms.uAmplitude.value,

					

					background_color: '#'+renderer.getClearColor().getHexString(),

					// directional_light 	: "#"+dilight.color.getHexString(),
					// point_light 		: "#"+polight.color.getHexString(),
					// ambient_light 		: "#"+amlight.color.getHexString(),
					material:{
						shininess: faceMaterial.shininess,
						color 		: "#"+faceMaterial.color.getHexString(),
						specular 	: "#"+faceMaterial.specular.getHexString(),
						ambient 	: "#"+faceMaterial.ambient.getHexString(),
					},

					fog:{
						color: "#"+scene.fog.color.getHexString()
					},

					random 	: function (){
						seed = (Math.random() * 9999 )|0;
						api.seed = String( seed );
						generate();
					},
					updateCamera: function(){
						camera.updateProjectionMatrix();
					},
					updateMaterial: function(){

						faceMaterial.color.set( api.material.color );
						faceMaterial.specular.set( api.material.specular );
						faceMaterial.ambient.set( api.material.ambient );
						faceMaterial.shininess = api.material.shininess.value;

					},
					createRandomPath: function(){

						var position = new THREE.Vector3( 
							Math.round(( Math.random() - 0.5 ) * structure.grid.DIMENSION ) * structure.grid.SCALE,
							Math.round(( Math.random() - 0.5 ) * structure.grid.DIMENSION ) * structure.grid.SCALE,
							Math.round(( Math.random() - 0.5 ) * structure.grid.DIMENSION ) * structure.grid.SCALE
						);

						console.log( position );

						var points = generatePathTo({
							position: position,
							normal: [
								new THREE.Vector3( 0,0, 1 ),
								new THREE.Vector3( 0,0,-1 ),
								new THREE.Vector3( 0,1,0 ),
								new THREE.Vector3( 0,-1,0 ),
								new THREE.Vector3( 1,0,0 ),
								new THREE.Vector3( -1,0,0 ),
							][Math.round( Math.random()*5)]

						});




					},
					updateBackgoundColor: function(){
						renderer.setClearColor( api.background_color );
					},
					updateFogColor: function(){
						scene.fog.color.set( api.fog.color );
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
				matgui.addColor( api.material, "color"	).onChange( api.updateMaterial );
				matgui.addColor( api.material, "ambient" ).onChange( api.updateMaterial );
				matgui.addColor( api.material, "specular" ).onChange( api.updateMaterial );
				matgui.add( api.material, "shininess" ).onChange( api.updateMaterial );

				// var backgui = gui.addFolder('background');
				
				// backgui.addColor( api, "ambient" ).onChange( api.updateMaterial );
				// backgui.addColor( api, "specular" ).onChange( api.updateMaterial );
				// matgui.open();

				// var lightsgui = gui.addFolder('lights');
				// lightsgui.addColor( api, "ambient_light" ).onChange( api.updateLights );
				// lightsgui.addColor( api, "point_light" ).onChange( api.updateLights );
				// lightsgui.addColor( api, "directional_light" ).onChange( api.updateLights );
				// lightsgui.open()

				var fogGui = gui.addFolder( 'fog' );
				fogGui.addColor( api.fog, "color" ).onChange( api.updateFogColor );
				fogGui.add( scene.fog, "near" );
				fogGui.add( scene.fog, "far" );
				

				gui.add( api, 	"seed" );//.listen();
				gui.add( api, 	"random" );
				gui.add( api, 	"generate" );
				// gui.add( api, 	"camera" );
				gui.add( skyMat, "visible" );
				gui.add( api, 	"speed", 0.05, 3 );//.listen();

				// gui.add( api, "createRandomPath" );
				gui.add( camera, "fov", 0, 100 ).onChange( api.updateCamera );
				gui.addColor( api, "background_color" ).onChange( api.updateBackgoundColor );



			// END GUI+API


			// DATA 

				var strut, selectionLight = new THREE.PointLight( 0xFF0000, 0.0, 250 );

				scene.add( selectionLight );

				contentObj3d = new THREE.Object3D();
				scene.add( contentObj3d );

				var videoContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0xff2200 ),
					ambient:new THREE.Color( 0xff2200 ),
					transparent: true,
					// lights: false,
					blending: THREE.AdditiveBlending,
					opacity: 0.8,
				});
				videoContentMaterial.originColor = new THREE.Color( 0xff2200 )

				var imageContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0x0033ff ),
					ambient:new THREE.Color( 0x00fff00 ),
					transparent: true,
					// blending: THREE.AdditiveBlending,
					opacity: 1.0,
				});
				imageContentMaterial.originColor = new THREE.Color( 0x0033ff )

				var searchContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0xff33ff ),
					ambient:new THREE.Color( 0x00fff00 ),
					transparent: true,
					// blending: THREE.AdditiveBlending,
					opacity: 1.0,
				});



				dataloader( function( twitter, instagram ){

					generate();


				
					var n = twitter.results.length + instagram.results.length,
						index, item, mesh

					var plane,result, isInstagram;
						


					while( n-- > 0 ){

						isInstagram = n >= twitter.results.length;

						result = isInstagram ? instagram.results[n-twitter.results.length] : twitter.results[n];

						// mesh = 

						
						// plane = textplane( result.user_id + ' \n' + result.title + ' \n' + result.add_date );
						// plane.position.copy( mesh.position );
						// plane.position.z += 65;
						
						// // plane.rotation.y += Math.PI;
						// scene.add( plane );
						
						contentObj3d.add( getDataObject( result, isInstagram ) );
					}

				
					// generate();
					animate();

				}, function( twitter, instagram ){
					if( !instagram.loaded ) console.log( 'Instagram failed to load.' )
					if( !twitter.loaded ) 	console.log( 'Twitter failed to load.' )
				});



				var cubeGeometry = new THREE.CubeGeometry( 100, 100, 100 );
				function getDataObject( result, isInstagram, position ){

					var mesh = new THREE.Mesh( cubeGeometry, isInstagram ? videoContentMaterial.clone() : imageContentMaterial.clone()  );
					var index = ( Math.random() * strut.volume.length )|0;
					var item = strut.volume[index];

					position ? mesh.position.copy( position ) : mesh.position.set( item[0], item[1], item[2] );
					mesh.position.x -= 15;
					mesh.position.y -= 15;
					mesh.position.z -= 15;
					mesh.position.multiplyScalar( 100 );
					mesh.infoDataObject = result;

					return mesh;
				}


				// SEARCH 

					var searchCubes = [];
					var originOffset = new THREE.Vector3( 15, 15, 15 )

					inputField.addEventListener( 'change', function(){

						infoOverlay.fadeOut( 400 );
						clicked = null;

						var value = inputField.value,
							limit = 4, mesh;

						if( value !== '' ){
							dataloader.search( value, function( results ){

								searchOverlay.fadeIn( 400 );

								imageContentMaterial.opacity = 0.1;
								videoContentMaterial.opacity = 0.1;



								var n = searchCubes.length;
								while( n-- > 0 ){
									if( searchCubes[n].parent ) searchCubes[n].parent.remove( searchCubes[n] );
								}
								searchCubes = [];
								showingSearchResults = true;


								if( results.length > 0 ){
									


									var origin = new THREE.Vector3( 0, 0, -1 ).applyQuaternion( camera.quaternion ).multiplyScalar( 300 ).add( camera.position ).multiplyScalar( 1/100 );

									//Ensure on grid
									origin.x = Math.round( origin.x );
									origin.y = Math.round( origin.y );
									origin.z = Math.round( origin.z );

									// //bound within structure 
									origin.x = Math.max( -11, Math.min( origin.x, 11 ));
									origin.y = Math.max( -11, Math.min( origin.y, 11 ));
									origin.z = Math.max( -11, Math.min( origin.z, 11 ));

									//add offset
									origin.add( originOffset )


									// controls.center.copy( pos ).sub( new THREE.Vector3( -15, -15, -15 )).multiplyScalar( 100 );
									// distanceTarget = 300;
									
									
									var usedPos = [],
										posChoices = [], n = 27;
										while( n-- > 0 ){ posChoices[n] = n };
										posChoices.sort( function(){
											return Math.round(Math.random())-0.5;
										});

									var nextPos = new THREE.Vector3(), nPos = new THREE.Vector3();
									var n = Math.min( results.length, 5 ), gridLocation;

									while( n-- > 0 ){

										gridLocation = posChoices.shift();//Math.round( Math.random() * 27 );
										console.log( gridLocation );
										nPos.copy( origin );

										nextPos.z = (gridLocation/9)|0;
										nextPos.y = ((gridLocation - nextPos.z*9 ) / 3 )|0;
										nextPos.x = ((gridLocation - (nextPos.z*9) - (nextPos.y*3) ))|0;

										console.log( nextPos.x, nextPos.y, nextPos.z );
										
										nextPos.x -= 1;
										nextPos.y -= 1;
										nextPos.z -= 1;



										mesh = getDataObject( results[n], true, nPos.add( nextPos ) );
										mesh.material = searchContentMaterial
										searchCubes.push( mesh );
										contentObj3d.add( mesh );
									}

									moveCameraTo( searchCubes[0].position, 300 );
									// console.log( contentObj3d.children.length );
								}


							})
						}
					});


				// END SEARCH


			// END DATA


			// Creates new structure
			function generate(){

				
				if( structMesh ){
					scene.remove( structMesh );
					// scene.remove( contentObj3d );
					structMesh.geometry.dispose();
				}

				console.time( 'GENERATE' );
				strut = structure( api.frequency, api.complexity, seed, api.threshold, api.horizontal_thickness, api.vertical_thickness );
				console.timeEnd( 'GENERATE' );

				structMesh = new THREE.Mesh( strut.geometry, faceMaterial );
				scene.add( structMesh );
				
			}


		// END SUPPORT STRUCTURE



		var controlsActive = false,
			currentCamera, 
			testLastPos = new THREE.Vector3(), tmpVec3 = new THREE.Vector3(),
			camLastPos = new THREE.Vector3(), tmpVec32 = new THREE.Vector3();

		var SPRING_CONSTANT = 5.0;


		var theta = new THREE.Vector3();
		function spring( b, a, vel, delta, spring ){

			// var currentToTarget = b - a;
		    var springForce 	= ( b - a ) * ( spring || 5.0 );
		    var dampingForce 	= -vel * 2.0 * Math.sqrt( spring || 5.0 );
		    var force 			= springForce + dampingForce;
		    // vel 		   		+= force * delta;
		    // float displacement = a_Velocity * a_TimeStep;
		    // debugger;
		    return force * delta;

		}


		var camTarget = new THREE.Vector3();
		function animate( delta ){

			currentCamera = camera;

			requestAnimationFrame( animate );
			
			controlsActive = lights.update( currentCamera);
			controls.setPauseState( controlsActive );
			if( !controlsActive ){
				controls.update( camera );
			}

			if( cameraPath && !cameraPath.controls.paused ){
				cameraPath.controls.update( delta );
				// cameraPath.controlsSmooth.updateSmooth( delta );

				// console.log( tmpVec3.copy( camera.position ).sub( camLastPos ).length(), tmpVec32.copy( testCam.position ).sub( testLastPos ).length() );

				// camLastPos.copy( camera.position );
				// // testLastPos.copy( testCam.position );

			}

			picking();

			if( !controls.velocity ) controls.velocity = new THREE.Vector3();
			// controls.velocity.x += ( camTarget.x - controls.center.x ) * 0.4;
			// controls.velocity.y += ( camTarget.y - controls.center.y ) * 0.4;
			// controls.velocity.z += ( camTarget.z - controls.center.z ) * 0.4;

			// controls.center.x += ( controls.velocity.x - controls.center.x ) * 0.009;
			// controls.center.y += ( controls.velocity.y - controls.center.y ) * 0.009
			// controls.center.z += ( controls.velocity.z - controls.center.z ) * 0.009;
			
			controls.velocity.x += spring( camTarget.x, controls.center.x, controls.velocity.x, timestep * timeCoeff * api.speed, 1.5 ); 
			controls.velocity.y += spring( camTarget.y, controls.center.y, controls.velocity.y, timestep * timeCoeff * api.speed, 1.5 ); 
			controls.velocity.z += spring( camTarget.z, controls.center.z, controls.velocity.z, timestep * timeCoeff * api.speed, 1.5 ); 

			// console.log( distanceTarget, controls.distance, controls.distanceVel );
			controls.distanceVel += spring( distanceTarget, controls.distance, controls.distanceVel, timestep * timeCoeff * api.speed, 2 ); 
			controls.distance += controls.distanceVel * timestep * timeCoeff * api.speed;

			// if( clicked ) console.log( camera.position.clone().sub( clicked.position ).length() );
			if( clicked && camera.position.clone().sub( clicked.position ).length() <= distanceTarget + 100 && moving ){

				moving = false;
				arrived = true;
				console.log( 'ARRIVED' );

				infoOverlay.children('#content').html( "<h3>"+ clicked.infoDataObject.title +"<h3>"); 
				infoOverlay.fadeIn( 400 );

			}

			if( arrived && clicked ){
				var pt = toScreenXY( clicked.position, camera, $('#main')  );
				// pt.left += 300;
				infoOverlay.css("transform", 'translate( '+ Number( pt.left + 150 ) + 'px, '+ Number( pt.top - 100 ) +'px )');
			}
			

			controls.center.add( controls.velocity.clone().multiplyScalar( timestep * timeCoeff * api.speed ) );

			render( delta || 0 );

		}


		// function camera{
		// 	return api.camera ? camera : camera;
		// }


		var mouseVector = new THREE.Vector3();
		var pos = new THREE.Vector3(),
			projScreenMat = new THREE.Matrix4();
		function toScreenXY ( position, camera, jqdiv ) {

		    pos.copy( position );
		    
		    projScreenMat.copy( camera.projectionMatrix ).multiply( camera.matrixWorldInverse );
		    pos.applyProjection( projScreenMat );
		    
		    return { left: ( pos.x + 1 ) * jqdiv.width() / 2 ,
		             top:  ( - pos.y + 1) * jqdiv.height() / 2 };

		}
			

		function picking(){

			console.log( videoContentMaterial.opacity );

			imageContentMaterial.opacity = 0.1;
			videoContentMaterial.opacity = 0.1;

			mouseVector.set( mouse.x, mouse.y, 1 );
			projector.unprojectVector( mouseVector,  camera );

			raycaster.set( camera.position, mouseVector.sub( camera.position ).normalize() );

			var intersects = raycaster.intersectObjects( contentObj3d.children, true );
			
			if ( intersects.length > 0) {

				if ( INTERSECTED != intersects[ 0 ].object ) {

					if ( INTERSECTED ){
						INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
						selectionLight.intensity = 0;
					}

					if( showingSearchResults && searchCubes.indexOf( intersects[ 0 ].object ) === -1 ) return;

					INTERSECTED = intersects[ 0 ].object;
					INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
					INTERSECTED.material.color.multiplyScalar( 20.3 );
					selectionLight.color.set( INTERSECTED.material.color );
					selectionLight.intensity = 2.5;
					selectionLight.position.copy( INTERSECTED.position );

				}

			} else {

				if ( INTERSECTED ){
					INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
					selectionLight.intensity = 0;
				} 
				INTERSECTED = null;

			}

		}

		function render( delta ){


			// polight.position.x = Math.sin( delta * 0.001 ) * 1000.0;
			// polight.position.x += Math.sin( polight.position.x  * 0.001 ) * 2000.0;
			// polight.position.y = Math.sin( delta * 0.0014 ) * 5000.0;

			//depth pass
			// scene.overrideMaterial = depthMaterial;
			// renderer.render( scene, camera, depthTarget );
			// scene.overrideMaterial = null;

			// // //to screen
			// composer.render();
			// console.time('render')
			// console.log( material.uniforms.uTime.value );
			// material.uniforms.uTime.value = delta * 0.00005;
			renderer.render( scene, camera );
			// console.timeEnd('render')

		}

		


	}
);