var DEBUG = false;


define([

	"utils/domReady!",
	"jquery",
	"libs/jquery-ui",
	"glsl!shaders/structure.glsl",
	"utils/math",
	"structure",
	"glsl!shaders/skydome.glsl",
	"utils/timer",
	// "utils/noise",
	"lighting",
	"utils/gui",
	"data",
	"textplane",
	"pathcontrols",
	'transition',
	'utils/easing',
	"purl",
	"./libs/threejs/examples/js/controls/OrbitControls",
	"libs/threejs/examples/js/postprocessing/EffectComposer"
	

	], function( DOM, jquery, jUi, structureShader, math, structure, skydome, timer, lighting, gui, dataloader, textplane, pathcontrols, transition, easing ) {


		var pageLoad = Date.now();


		if( gui ){
			var guiContainerDom = document.getElementById('gui');
			guiContainerDom.appendChild( gui.domElement );
		}




		// APP VARIABLES
		var WIDTH 	= window.innerWidth,
			HEIGHT 	= window.innerHeight,
			FPmS = 1000 / 60;
			MAX_SEARCH_RESULTS = 10,
			SEARCH_RES_RADIUS = 0.3,
			DIV_SLIDE_OFFSET = 80;
			STRUCT_SIZE = new THREE.Vector3( 1500, 1500, 1500 );



		// Scene
		var renderer 	   = new THREE.WebGLRenderer({ antialias:true}),
			container 	   = $( '#main' )[0],
			infoOverlay    = $( '#info-overlay' ),
			searchOverlay  = $( '#search-overlay' ),
			inputField     = $( '#search-field' )[0],
			scene 		   = new THREE.Scene(),
			camera 		   = new THREE.PerspectiveCamera( 65,  WIDTH / HEIGHT , 1, 100000 ),
			controls 	   = new THREE.OrbitControls( camera, container ),
			projector  	   = new THREE.Projector(),
			raycaster 	   = new THREE.Raycaster(),
			mouse 		   = new THREE.Vector2(),
			camTarget 	   = new THREE.Vector3(),
			contentObj3d   = new THREE.Object3D(),
			searchResObj3d = new THREE.Object3D(),
			moving 		   = false,
			arrived        = false,
			timestep 	   = 0.0008,
			controlsActive = false,
			isActive       = true,
			lastClicked,
			showingSearchResults = false,

			INTERSECTED;


		infoOverlay.fadeOut(0);
			
		scene.fog = new THREE.Fog( 0x000000, 1, 5000 );
		

		controls.velocity = new THREE.Vector3();
		controls.maxPolarAngle = Math.PI / 1.62;
		controls.userRotateSpeed = 0.4;
		controls.userPan = false;
		controls.userZoom = false;
		controls.autoRotateSpeed = 300 * timestep;
		var distanceTarget = controls.distance = 2000;
		controls.distanceVel = 0;

		camera.position.z = 2000;
		scene.add( camera );

		scene.add( contentObj3d );
		contentObj3d.add( searchResObj3d );

		container.appendChild( renderer.domElement );


		window.addEventListener( 'resize', function(){

			WIDTH  = window.innerWidth;
			HEIGHT = window.innerHeight;

			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();

			renderer.setSize( WIDTH, HEIGHT );			
		})


		document.addEventListener( 'mousemove', function ( event ) {

			event.preventDefault();

			mouse.x =   ( event.clientX / window.innerWidth  ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		});

		var hidden, visibilityChange; 
		if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
		  hidden = "hidden";
		  visibilityChange = "visibilitychange";
		} else if (typeof document.mozHidden !== "undefined") {
		  hidden = "mozHidden";
		  visibilityChange = "mozvisibilitychange";
		} else if (typeof document.msHidden !== "undefined") {
		  hidden = "msHidden";
		  visibilityChange = "msvisibilitychange";
		} else if (typeof document.webkitHidden !== "undefined") {
		  hidden = "webkitHidden";
		  visibilityChange = "webkitvisibilitychange";
		}



		document.addEventListener(visibilityChange, function() {

			if (!document[hidden]) {

		    	time = 0;
	 			delta = 0;
	 			t = 0;
	 			startTime = timer.now() - ( performance && performance.timing ? performance.timing.navigationStart : pageLoad );

		  	}

		});


		function divFadeIn( jdiv, speed, callback ){
			jdiv.fadeIn({ duration: speed || 400, complete: callback });
		}

		function divFadeOut( jdiv, speed, callback ){
			jdiv.fadeOut({ duration: speed || 400, complete: callback });
		}

		function hideVisibleDataObjects(){

			var n = searchResObj3d.children.length;
			while( n-- > 0 ){
				searchResObj3d.remove( searchResObj3d.children[n] );
			}

		}

		$( '#search-field' ).click( function(){
			$( this ).select();
			$( this ).keypress( function(){
				resetCamera();
			});
		});	



		searchOverlay.children( ".close-button-icon" ).click(function( e ){

			e.preventDefault();
			showingSearchResults = false;

			inputField.value = '';
			hideVisibleDataObjects();
			divFadeOut( searchOverlay, 400 );
			divFadeOut( infoOverlay, 400 );
			infoOverlay.children( "#body" ).hide('slide', {direction: 'right'}, 400 );
			setDatObjectsOpacity( 0.8 );

			resetCamera();

		});


		
		$( "#show-more" ).click(function( e ){

			e.preventDefault();
			infoOverlay.children( "#body" ).toggle({direction: 'right', step:function( n ){
				// console.log( n );
				// jdiv.xOffsetPos = easing.inOutQuad( 1 -  n ) * DIV_SLIDE_OFFSET;
			}, duration:400}  );

		});

		
		infoOverlay.children('.buttons').children( ".close-button-icon" ).click(function( e ){

			e.preventDefault();

			if( !showingSearchResults ) resetCamera();
			// infoOverlay.fadeOut( 400 );
			divFadeOut( infoOverlay, 400 );
			infoOverlay.children( "#body" ).hide('slide', {direction: 'right'}, 400 );

		});


		var clicked;
		var camMoveTransition = transition( controls, ['distance'], null, {spring:1.5} );
		var camLookTransition = transition.vec3( controls.center, new THREE.Vector3(), null, {spring:2} );
		camLookTransition.paused = true;


		camLookTransition.callback = function(){

			moving = false;
			arrived = true;
			if( clicked ){
				lastClicked = clicked;
				var content = infoOverlay.children('#body')
				content.children('#content').html( clicked.infoDataObject.title ); 
				content.children('#user-info').children('#user-name').html( clicked.infoDataObject.user_name ); 
				content.children('#user-info').children('#user-id').html( clicked.infoDataObject.user_id ); 
				content.children('#date').html( new Date( clicked.infoDataObject.add_date).toDateString().slice( 4 ) ); 
				// infoOverlay.fadeIn( 400 );
				divFadeIn( infoOverlay, 400 )
			}

		}


		var durationMs = 1,
			movePerSec = 1000;

		function moveCameraTo( p, dst, speedCoeff ){

			speedCoeff = speedCoeff || 1.0;
			distanceTarget = dst || 250;

			camMoveTransition.target = distanceTarget;
			camLookTransition.target.copy( p );


			moving = true;
			camLookTransition.arrived = false;
			camMoveTransition.arrived = false;
			camLookTransition.paused  = false;

			camLookTransition.speed = camMoveTransition.speed = speedCoeff;//movePerSec / Math.abs( camera.position.clone().sub( p ).length() - distanceTarget ) * speedCoeff;

		}


		function resetCamera(){
 
			clicked = null;
			divFadeOut( infoOverlay, 400 );

			moveCameraTo( camTarget.set( 0, 0, 0 ), 2000, 0.4 );

		}


		document.addEventListener( 'mousedown', function( e ){

			if( gui ) controls.autoRotate = false;

			if( INTERSECTED && INTERSECTED !== clicked ){

				e.preventDefault();

				if( showingSearchResults && searchResObj3d.children.indexOf( INTERSECTED ) === -1 ) return;

				clicked = INTERSECTED;

				controls.autoRotate = true;
				var imageElem = infoOverlay.children('#body').children( '#image' );
				divFadeOut( infoOverlay, 400, function( url ){
					imageElem.attr( 'src', url );
				}.bind( this, clicked.infoDataObject.attribution_avatar ) );
				infoOverlay.children( "#body" ).hide('slide', {direction: 'right'}, 400 );
				

				moveCameraTo( clicked.position );

			} 

		});


		renderer.setSize( WIDTH, HEIGHT );



		// DEPTH PASS
			
			// var depthShader = THREE.ShaderLib[ "depthRGBA" ];
			// var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );

			// var depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );
			// depthMaterial.blending = THREE.NoBlending;


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

			// uniforms.bottomColor.value.copy( planeUniforms.color.value );

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


			var contentObj3d,
				seed = 2394,
				structMesh;
		

			// MATERIALS

				
				var faceMaterial = new THREE.MeshPhongMaterial({metal:true});
				

				var videoContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0xff2200 ),
					ambient:new THREE.Color( 0xff2200 ),
					transparent: true,
					side: THREE.DoubleSide,
					// lights: false,
					// blending: THREE.AdditiveBlending,
					opacity: 0.8,
				});
				videoContentMaterial.originColor = new THREE.Color( 0xff2200 )

				var imageContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0x0033ff ),
					ambient:new THREE.Color( 0x00fff00 ),
					transparent: true,
					side: THREE.DoubleSide,
					// blending: THREE.AdditiveBlending,
					opacity: 0.8,
				});
				imageContentMaterial.originColor = new THREE.Color( 0x0033ff )

				var searchContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0xff33ff ),
					ambient:new THREE.Color( 0x00fff00 ),
					transparent: true,
					side: THREE.DoubleSide,
					// blending: THREE.AdditiveBlending,
					opacity: 0.8,
				});

				function updateMaterial(){
					var n = contentObj3d.children.length;
					while( n-- > 0 ){
						if( contentObj3d.children[n].material ) contentObj3d.children[n].material.needsUpdate = true;
					}

					n = searchResObj3d.children.length;
					while( n-- > 0 ){
						if( searchResObj3d.children[n].material ) searchResObj3d.children[n].material.needsUpdate = true;
					}

					faceMaterial.needsUpdate = true;
				}
				
				faceMaterial.seed = seed.toString();


				// var materials = [];
				// materials.push( faceMaterial );
				// materials.push( imageContentMaterial );
				// materials.push( searchContentMaterial );
				// materials.push( videoContentMaterial );

			// END MATERIALS



			//LIGHTS

				var lights = new lighting( scene, camera, container, gui );
				lights.onLightAdded( updateMaterial );
				lights.onLightRemoved( updateMaterial );
				lights.addPointLight( 0xffffff );
				lights.addPointLight( 0xffffff );
				lights.addPointLight( 0xffffff );
			


			// END LIGHTS


			
			// GUI+API

				var api = {

					frequency 	: 0.95,
					speed 		: 1.4,
					threshold 	: 0.68,
					noiseAmount : 0.7,
					complexity 	: 0.82,
					horizontal_thickness 	: 7,
					vertical_thickness 	: 2,
					generate 	: generate,
					seed 		: String( seed ),
					camera 		: false,

					background_color: '#'+renderer.getClearColor().getHexString(),
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
					updateBackgoundColor: function(){
						renderer.setClearColor( api.background_color );
					},
					updateFogColor: function(){
						scene.fog.color.set( api.fog.color );
					}
				}

				if( gui ){
					
					var formgui = gui.addFolder('structure');
					formgui.add( api, "frequency", 		0.00, 2.0 	).onFinishChange( api.generate );
					formgui.add( api, "threshold", 		0.01, 0.99 	).onFinishChange( api.generate );
					formgui.add( api, "complexity", 	0.0,  1.0 	).onFinishChange( api.generate );
					formgui.add( api, "horizontal_thickness", 0, 50	).onFinishChange( api.generate );
					formgui.add( api, "vertical_thickness", 0, 50	).onFinishChange( api.generate );

					formgui.open();

					var matgui = gui.addFolder('material');
					matgui.addColor( api.material, "color"	).onChange( api.updateMaterial );
					matgui.addColor( api.material, "ambient" ).onChange( api.updateMaterial );
					matgui.addColor( api.material, "specular" ).onChange( api.updateMaterial );
					matgui.add( api.material, "shininess" ).onChange( api.updateMaterial );


					var fogGui = gui.addFolder( 'fog' );
					fogGui.addColor( api.fog, "color" ).onChange( api.updateFogColor );
					fogGui.add( scene.fog, "near" );
					fogGui.add( scene.fog, "far" );
					
					gui.add( api, 	"seed" );
					gui.add( api, 	"random" );
					gui.add( api, 	"generate" );
					gui.add( skyMat, "visible" );
					gui.add( api, 	"speed" );

					gui.add( camera, "fov", 0, 100 ).onChange( api.updateCamera );
					gui.addColor( api, "background_color" ).onChange( api.updateBackgoundColor );
				}


			// END GUI+API


			// DATA 

				var selectionLight 	= new THREE.PointLight( 0xFF0000, 0.0, 250 ),
					strut;

				scene.add( selectionLight );

				dataloader( function( twitter, instagram ){

					generate();

					var n = twitter.results.length + instagram.results.length,
						result, isInstagram;
						
					while( n-- > 0 ){

						isInstagram = n >= twitter.results.length;
						result = isInstagram ? instagram.results[n-twitter.results.length] : twitter.results[n];
						contentObj3d.add( getDataObject( result, isInstagram ) );
					}

					var sound = new Howl({
					  urls: ['audio/ambient.mp3'],
					  // autoplay: true,
					  loop: true,
					  volume: gui ? 0 : 1.9,
					});
					run();

				}, function( twitter, instagram ){

					if( !instagram.loaded ) console.log( 'Instagram failed to load.' )
					if( !twitter.loaded ) 	console.log( 'Twitter failed to load.' )

				});



				function setDatObjectsOpacity( opacity ){

					var n = contentObj3d.children.length,
					 	f

					
					while( n-- > 0 ){
						if( contentObj3d.children[n].material !== undefined ){
							contentObj3d.children[n].material.opacity = opacity;
							if( !contentObj3d.children[n].normalHexColor ){
								contentObj3d.children[n].normalHexColor = contentObj3d.children[n].material.color.getHex();
								contentObj3d.children[n].normalHexAmbientColor = contentObj3d.children[n].material.color.getHex();
							}

							// f = contentObj3d.children[n].geometry.faces.length;
							// while( f-- > 0 ){
							// 	console.log( contentObj3d.children[n].geometry.faces[f] );
							// 	contentObj3d.children[n].geometry.faces[f].color.setHex( opacity <= 0 ? 0x444444 : contentObj3d.children[n].normalHex );

							// }
							// geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );

							contentObj3d.children[n].material.color.setHex( opacity < 0.5 ? 0x444444 : contentObj3d.children[n].normalHexColor );
							contentObj3d.children[n].material.ambient.setHex( opacity < 0.5 ? 0x444444 : contentObj3d.children[n].normalHexAmbientColor );
							
							// console.log( contentObj3d.children[n] );
							contentObj3d.children[n].material.needsUpdate = true;
						} 
					}

				}



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


					inputField.addEventListener( 'change', function(){

						// infoOverlay.fadeOut( 400 );
						divFadeOut( infoOverlay, 400 );
						clicked = null;

						var value = inputField.value,
							nPos = new THREE.Vector3(),
							mesh;

						$( '#search-field' ).blur();

						if( value !== '' ){

							dataloader.search( value, function( results ){

								searchOverlay.children('#body').children('#results').html(
									'YOUR SEARCH FOR "'+value+'" RETURNED ' + ( results.length === 0 ? "NO" : Math.min( results.length, MAX_SEARCH_RESULTS ) ) + ' RESULTS' 
								);

								searchOverlay.fadeIn( 400, function () {
								    if( results.length === 0 ) $( this ).delay( 5000 ).fadeOut( 400 );
							  	});

								showingSearchResults = true;
								hideVisibleDataObjects();
								
								if( results.length > 0 ){

									setDatObjectsOpacity( 0.3 );
									
									var pos,
										positions = strut.centeredVolume.slice();
										n = Math.min( results.length, MAX_SEARCH_RESULTS );

									while( n-- > 0 && positions.length > 0 ){

										pos = positions[ ( Math.random() * positions.length)|0 ];
										nPos.set( pos[0], pos[1], pos[2] );

										mesh = getDataObject( results[n], true, nPos );
										mesh.material = searchContentMaterial.clone();
										searchResObj3d.add( mesh );
									}
								}

							});
						}
					});


				// END SEARCH


			// END DATA
			
			var strut;

			function generate(){
				
				if( structMesh ){
					scene.remove( structMesh );
					structMesh.geometry.dispose();
				}

				// console.time( 'GENERATE' );
				strut = structure( api.frequency, api.complexity, seed, api.threshold, api.horizontal_thickness, api.vertical_thickness );
				strut.centeredVolume = strut.volume.slice();

				var ca = new THREE.Vector3(),
					cb = new THREE.Vector3();
				strut.centeredVolume.sort(function(a, b){
					return ca.set( a[0]- 15, a[1]- 15, a[2]- 15).length() - cb.set( b[0]- 15, b[1]- 15, b[2]- 15).length();
				})
				strut.centeredVolume = strut.centeredVolume.splice( 0, (strut.centeredVolume.length * SEARCH_RES_RADIUS )|0 );
				// console.timeEnd( 'GENERATE' );

				structMesh = new THREE.Mesh( strut.geometry, faceMaterial );
				scene.add( structMesh );
				
			}


		// END SUPPORT STRUCTURE



		var running = false;
		var startTime, time, delta, t, firstStep = true;

		function run(){

			if( !running ){

				running = true;
		
				function animate( timeSinceLoad ){


					cloat = true;

					t = timeSinceLoad - startTime;
					delta = t - time;
					delta = delta > FPmS ? FPmS : delta
					time = t;
					
					controlsActive = lights.update( camera );
					controls.setPauseState( controlsActive );
					if( !controlsActive ) controls.update( camera );
					if( gui && lastClicked ) controls.autoRotate = !controlsActive;

					picking();
					
					transition.update( delta / 1000 * api.speed );

					if( arrived && lastClicked ){
						var pt = toScreenXY( lastClicked.position, camera, $('#main')  );
						infoOverlay.css("transform", 'translate( '+ Number( pt.left + 170 ) + 'px, '+ Number( pt.top - 100 ) +'px )');
					}

					render();
					requestAnimationFrame( animate );	


				}

				time = 0;
	 			delta = 0;
	 			t = 0;

	 			startTime = timer.now() - ( performance && performance.timing ? performance.timing.navigationStart : pageLoad );

				requestAnimationFrame( animate );
		
			}
		}


		var pos 			= new THREE.Vector3(),
			projScreenMat 	= new THREE.Matrix4();

		function toScreenXY ( position, camera, jqdiv ) {

		    pos.copy( position );
		    
		    projScreenMat.copy( camera.projectionMatrix ).multiply( camera.matrixWorldInverse );
		    pos.applyProjection( projScreenMat );
		    
		    return { 
		    	left: (   pos.x + 1 ) * jqdiv.width()  / 2 ,
		        top:  ( - pos.y + 1 ) * jqdiv.height() / 2 
		    };

		}


		var mouseVector 	= new THREE.Vector3();

		function picking(){

			// console.log( videoContentMaterial.opacity );

			// imageContentMaterial.opacity = 0.1;
			// videoContentMaterial.opacity = 0.1;

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

					if( showingSearchResults && searchResObj3d.children.indexOf( intersects[ 0 ].object ) === -1 ) return;

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