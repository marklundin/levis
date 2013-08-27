define('main',[
	"module",
	"jquery",
	"libs/jquery-ui",
	"glsl!shaders/structure.glsl",
	"utils/math",
	"structure",
	"glsl!shaders/skydome.glsl",
	"utils/timer",
	"lighting",
	"utils/gui",
	"data",
	"textplane",
	'transition',
	'utils/easing',
	'glsl!shaders/clouds.glsl',
	'glsl!shaders/post.glsl',
	"purl",
	"./libs/threejs/examples/js/controls/OrbitControls",
	"libs/threejs/examples/js/postprocessing/EffectComposer"
	

	], function( module, jquery, jUi, structureShader, math, structure, skydome, timer, lighting, gui, dataloader, textplane, transition, easing, cloudsShader, postShader ) {


		//PROJECT INFO
        console.log( '==============================' );
        console.log( 'NAME:         ' + NAME );
        console.log( 'VERSION:      ' + VERSION );
        console.log( 'DEBUG MODE:   ' + DEBUG   );
        console.log( '==============================' );


		var pageLoad = Date.now();


		if( gui ){
			var guiContainerDom = document.getElementById('gui');
			guiContainerDom.appendChild( gui.domElement );
		}



		// APP VARIABLES
		var WIDTH 	= window.innerWidth,
			HEIGHT 	= window.innerHeight,
			FPmS = 1000 / 60,
			INITIAL_NUM_ANIMATIONS = 7,
			MAX_SEARCH_RESULTS = 10,
			SEARCH_RES_RADIUS = 0.3,
			DIV_SLIDE_OFFSET = 80,
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
			mouseFlag 	   = true,
			clicked,
			lastClicked,
			showingSearchResults = false,

			INTERSECTED;


		$('#search-field').focus(function(){
			$(this).parent().toggleClass( 'search-focus', true );
			$(".featured-submissions").slideDown( 50 );
		}).blur( function(){
			if( mouseFlag ){
				$(this).parent().toggleClass( 'search-focus', false );
				$(".featured-submissions").slideUp( 0 );
			}
		});

		
		$('.vip').mousedown(function( e ){
			mouseFlag = false;
		});

		$('.vip').mouseup(function( e ){
			mouseFlag = true;
			var value =  $(this).data().username;
			$('#search-field').val( value );
			performSearch( value );
			$('#search-field').blur();
		});





		infoOverlay.expanded = false
		infoOverlay.xOffset = 0;
		infoOverlay.fadeOut(0);
			
		scene.fog = new THREE.Fog( 0x000000, 1, 5000 );

		renderer.setClearColor( 0x2f2f2f );
		

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

			postMaterial.uniforms.uResolution.x = WIDTH;
			postMaterial.uniforms.uResolution.y = HEIGHT;

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
			jdiv.stop().fadeOut({ duration: speed || 400, complete: callback });
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
				if( clicked ){
					clicked.material.envMap = envMap;
					clicked.material.needsUpdate = true;
				}
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
			if( infoOverlay.expanded ){
				console.log( 'hEREE ')
				infoOverlay.expanded = false;
				infoOverlay.children( "#body" ).toggle( {direction: 'right', progress:updateInfoOffset, duration:400 }, 400 );
			}
			setDatObjectsOpacity( 0.8 );

			resetCamera();

		});


		var urls = [
		  'img/skybox/px.jpg',
		  'img/skybox/nx.jpg',
		  'img/skybox/py.jpg',
		  'img/skybox/ny.jpg',
		  'img/skybox/pz.jpg',
		  'img/skybox/nz.jpg',
		];

			
		var bumpmap = THREE.ImageUtils.loadTexture( "img/sand-bump-map.jpg" ); // load textures
		var normalmap = THREE.ImageUtils.loadTexture( "img/noise_normal.png" ); // load textures
		var map = THREE.ImageUtils.loadTexture( "img/noise-bump.jpg" ); // load textures
		
		bumpmap.wrapS = bumpmap.wrapT = THREE.RepeatWrapping;
		map.wrapS = map.wrapT = THREE.RepeatWrapping;
		normalmap.wrapS = normalmap.wrapT = THREE.RepeatWrapping;
		
		map.repeat.set( 0.2, 0.2 );
		normalmap.repeat.set( 0.2, 0.2 );
		bumpmap.repeat.set( 0.05, 0.05 );

		// normalmap.repeat.set( 10, 1 );


		var envMap = THREE.ImageUtils.loadTextureCube(urls, new THREE.CubeRefractionMapping() ); // load textures
		var cubeCamera = new THREE.CubeCamera( camera.near, camera.far, 1024 );
		// envMap = cubeCamera.renderTarget;

		var dataTexture = new THREE.Texture( null, new THREE.CubeRefractionMapping() );
		var textTexture = new THREE.Texture( null, 
			new THREE.UVMapping(), 
			THREE.ClampToEdgeWrapping, 
			THREE.ClampToEdgeWrapping, 
			THREE.LinearMipMapLinearFilter, THREE.LinearMipMapLinearFilter
		);

		this.offset = new THREE.Vector2( 0, 0 );
		this.repeat = new THREE.Vector2( 0.05, 0.05 );
		textTexture.magFilter = THREE.LinearMipMapLinearFilter;
		textTexture.minFilter = THREE.LinearMipMapLinearFilter;

		// this.mapping = mapping !== undefined ? mapping : new THREE.UVMapping();


		function loadTexture ( array, onLoad, onError )  {

			var images = [];
			images.loadCount = 0;
			dataTexture.image = images;

			var PROXY_URL = "https://levismakeourmark.thismoment.com/v4/api/media/image_proxy.json?url=";
			// if ( mapping !== undefined ) dataTexture.mapping = mapping;
			// no flipping needed for cube textures

			dataTexture.flipY = false;

			for ( var i = 0, il = array.length; i < il; ++ i ) {

				var cubeImage = new Image();
				images[ i ] = cubeImage;

				cubeImage.onload = function () {

					images.loadCount += 1;

					if ( images.loadCount === 6 ) {
						dataTexture.needsUpdate = true;
						if ( onLoad ) onLoad( dataTexture );
					}
				};

				cubeImage.onerror = onError;

				cubeImage.crossOrigin = '';
				cubeImage.src = ( module.config().proxy || PROXY_URL ) + array[ i ];

			}

			return dataTexture;
		}

		function updateEnvMapWithImage( material, url ){
			material.envMap = loadTexture( [url, url, url, url, url, url ]);
		}

		function updateEnvMapWithCanvas( material, canvas ){
			textTexture.image 	= [canvas, canvas, canvas, canvas, canvas, canvas ];
			textTexture.needsUpdate = true;
			material.envMap 	= textTexture;
		}

		function updateInfoOffset( n, a ){
			infoOverlay.xOffset = easing.inOutQuad( infoOverlay.expanded ? a : 1.0 - a ) * 500;
		}
		
		$( "#show-more" ).click(function( e ){

			e.preventDefault();
			infoOverlay.expanded = !infoOverlay.expanded;
			infoOverlay.children( "#body" ).toggle({direction: 'right', easing: "easeInOutQuad", duration:400, progress:updateInfoOffset, onComplete:function(){
				if( !infoOverlay.expanded ) infoOverlay.video.get(0).currentTime = 0;
			}});

			if( infoOverlay.video ){
				infoOverlay.video.get(0).paused || infoOverlay.video.get(0).currentTime === 0 ? infoOverlay.video.get(0).play() : infoOverlay.video.get(0).pause();
			} 

		});

		
		infoOverlay.children('.buttons').children( ".close-button-icon" ).click(function( e ){

			e.preventDefault();

			if( !showingSearchResults ) resetCamera();
			// infoOverlay.fadeOut( 400 );
			divFadeOut( infoOverlay, 400 );
			// if( infoOverlay.video ) infoOverlay.video.get(0).pause();

			if( infoOverlay.expanded ){
				infoOverlay.expanded = false;
				infoOverlay.children( "#body" ).toggle( {direction: 'right', progress:updateInfoOffset, duration:400 } );
				if( lastClicked.isInstagram ) infoOverlay.video.get(0).pause();
			}

			// if( infoOverlay.video ) infoOverlay.remove( infoOverlay.video );

			lastClicked.material.envMap = envMap;
			lastClicked.material.needsUpdate = true;

			resetCamera();

		});


		
		var camMoveTransition = transition( controls, ['distance'], null, {spring:1.5} );
		var camLookTransition = transition.vec3( controls.center, new THREE.Vector3(), null, {spring:2} );
		camLookTransition.paused = true;


		camLookTransition.callback = function(){

			moving = false;
			arrived = true;
			if( clicked ){
				lastClicked = clicked;
				var content = infoOverlay.children('#body');

				content.children('#content').html( clicked.infoDataObject.title ); 
				$('#show-more').toggleClass( "camera-button-icon", clicked.isInstagram );
				content.children('#user-info').children('#user-name').html( "<a href='"+( clicked.isInstagram ? "http://instagram.com/"+clicked.infoDataObject.user_info.screen_name : clicked.infoDataObject.user_info.user_url  ) +"' target='_blank'>"+clicked.infoDataObject.user_name+"</a>" ); 
				content.children('#user-info').children('#user-id').html(( clicked.isInstagram ? "" : "@" ) + clicked.infoDataObject.user_info.screen_name ); 
				content.children('#date').html( "Posted via " + ( clicked.isInstagram ? "Instagram" : "Twitter") + " on " + new Date( clicked.infoDataObject.add_date).toDateString().slice( 4 ) ); 
				// infoOverlay.fadeIn( 400 );
				divFadeIn( infoOverlay, 400 );

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

				if( clicked ){
					clicked.material.envMap = envMap;
					clicked.material.needsUpdate = true;
				}

				clicked = INTERSECTED;

				controls.autoRotate = true;
				var imageElem = infoOverlay.children('#body').children( '#image' );
				divFadeOut( infoOverlay, 400, function( avatarUrl, thumbUrl, videoUrl ){


					imageElem.attr( 'src', avatarUrl )

					
					if( clicked.isInstagram ){
						updateEnvMapWithImage( clicked.material, thumbUrl );
					} else {
						var tp = textplane( clicked.infoDataObject.title.toUpperCase(), 20 );
						updateEnvMapWithCanvas( clicked.material, tp );
					}



					if( clicked.isInstagram && videoUrl ){
						if( infoOverlay.video === undefined ){
							$( '#date' ).before( infoOverlay.video = $('<video width="100%" height="auto" ></video>'));	
							infoOverlay.video.sourceElem = infoOverlay.video.append('<source type="video/mp4" />');//.appendTo(infoOverlay.children('#body'));
						} 
						infoOverlay.video.sourceElem.attr( 'src', videoUrl );
						
					}

					

				}.bind( this, clicked.infoDataObject.attribution_avatar, clicked.infoDataObject.media.length > 0 ? clicked.infoDataObject.media[0].large : undefined, clicked.infoDataObject.media.length > 0 ? clicked.infoDataObject.media[0].video_url : undefined ));

				if( infoOverlay.expanded ){
					infoOverlay.expanded = false;
					infoOverlay.children( "#body" ).toggle( {direction: 'right', progress:updateInfoOffset, duration:400 } );
				}

				if( infoOverlay.video ){
					infoOverlay.video.get(0).pause();
					// infoOverlay.video.toggle( clicked.isInstagram, 0 );	
				} 
				

				moveCameraTo( clicked.position );

			} 

		});


		renderer.setSize( WIDTH, HEIGHT );


		// PSEUDO POST EFFECTS

		

			var postMaterial = new THREE.ShaderMaterial({
				uniforms:{
					uResolution : { type: "v2", value: new THREE.Vector2( WIDTH, HEIGHT ) },
					opacity : 	  { type: "f", value: 0.5 },
					uFrequency : { type: "f", value: 1000.0 },
					uTime 		: { type: "f", value: 0 },
					vignetteAmount 		: { type: "f", value: 1.0 },
					vignetteStart 		: { type: "f", value: 0.3 },
					vignetteEnd 		: { type: "f", value: 0.9 }
				},
				vertexShader: postShader.vertexShader, //document.getElementById( 'vs' ).textContent,
				fragmentShader: postShader.fragmentShader, //document.getElementById( 'fs' ).textContent,
				depthWrite: false,
				depthTest: false,
				transparent: true,
				// blend: THREE.AdditiveBlending,
			});

			var postMesh = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2, 1, 1 ), postMaterial );
			scene.add( postMesh );

		//

		// CLOUDS

			var clouds = {};
			var cloudsObj3d = new THREE.Object3D();
			var geometry = new THREE.Geometry();

			var texture = THREE.ImageUtils.loadTexture( 'img/darkCloud.png' );
			// texture.magFilter = THREE.LinearMipMapLinearFilter;
			// texture.minFilter = THREE.LinearMipMapLinearFilter;


			clouds.material = new THREE.ShaderMaterial( {

				uniforms: {

					// 'tDepth': { type: 't', value: depthTarget },
					"map": { type: "t", value: texture },
					"fogColor" : { type: "c", value: scene.fog.color },
					"fogNear" : { type: "f", value: scene.fog.near },
					"fogFar" : { type: "f", value: scene.fog.far },
					opacity: { type: "f", value: 0.1 },
					offset: { type: "f", value: 0.4 },
					useClouds: { type: "f", value: 1.0 },
					exponent: { type: "f", value: 1.0 },

				},
				vertexShader: cloudsShader.vertexShader, //document.getElementById( 'vs' ).textContent,
				fragmentShader: cloudsShader.fragmentShader, //document.getElementById( 'fs' ).textContent,
				depthWrite: false,
				// depthTest: false,
				transparent: true,
				blend: THREE.AdditiveBlending,
				

			} );


			var planeGeom = new THREE.PlaneGeometry( 64, 64 );
			var plane;

			for ( var i = 0; i < 15; i++ ) {

				plane = new THREE.Mesh( planeGeom, clouds.material );

				plane.position.x = math.random( -1500, 1500 );
				plane.position.y = math.random( -1500, 1500 )
				plane.position.z = math.random( -1500, 1500 );
				plane.oldScale = plane.scale.x = plane.scale.y = Math.random() * Math.random() * 15 + 25.0;
				plane.currentRot = Math.random() * Math.PI;
				plane.rotDirection = math.random( -1, 1 ) * 0.001;

				cloudsObj3d.add( plane );
				// THREE.GeometryUtils.merge( geometry, plane );

			}

			// // var m = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ),  clouds.material );
			// // m.position.z = -40;
			// // m.rotation.y = Math.PI * -0.5;
			// // camera.add( m );

			
			// clouds.material.opacity = 0.01;
			// clouds.meshA = new THREE.Mesh( geometry, clouds.material );
			// // mesh.position.z = - 8000;
			// cloudsObj3d.add( clouds.meshA );

			// clouds.meshB = new THREE.Mesh( geometry, clouds.material );
			// clouds.meshB.position.z = - 8000;
			// cloudsObj3d.add( clouds.meshB );

			
			scene.add( cloudsObj3d );


		// END CLOUDS



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


			skyMat.visible = false;

			var sky = new THREE.Mesh( skyGeo, skyMat );
			scene.add( sky );



		// SUPPORT STUCTURE


			var contentObj3d,
				seed = 2394,
				structMesh;
		

			// MATERIALS

				
				var faceMaterial = new THREE.MeshPhongMaterial({

					envMap: envMap,
					reflectivity: 0.3,
					// bumpMap: bumpmap,
					bumpScale: 0.2,
					ambient: 0xFFFFFF,
					specular: 0xFFFFFF,
					// normalMap: normalmap,
					// normalScale: new THREE.Vector2( 0.2, 0.2 )
					// map: map

				});
				

				var videoContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0xff2200 ),
					ambient:new THREE.Color( 0xff2200 ),
					transparent: true,
					envMap: envMap,
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
					envMap: envMap,
					// map: envMap,
					side: THREE.DoubleSide,
					// blending: THREE.AdditiveBlending,
					opacity: 0.8,
				});
				imageContentMaterial.originColor = new THREE.Color( 0x0033ff )

				var searchContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0xff33ff ),
					ambient:new THREE.Color( 0x00fff00 ),
					transparent: true,
					// envMap: cubemap,
					side: THREE.DoubleSide,
					// blending: THREE.AdditiveBlending,
					opacity: 0.8,
				});

				function updateAllMaterial(){
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
				lights.onLightAdded( updateAllMaterial );
				lights.onLightRemoved( updateAllMaterial );
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
					horizontal_thickness 	: 11,
					vertical_thickness 	: 3,
					generate 	: generate,
					seed 		: String( seed ),
					camera 		: false,

					clouds:{
						debug : false,
						opacity : clouds.material.uniforms.opacity.value,
						offset : clouds.material.uniforms.offset.value,
						exponent : clouds.material.uniforms.exponent.value,
						update:function(){
							clouds.material.uniforms.exponent.value = api.clouds.exponent;
							clouds.material.uniforms.opacity.value = api.clouds.opacity;
							clouds.material.uniforms.offset.value = api.clouds.offset;
							clouds.material.uniforms.useClouds.value = api.clouds.debug ? 0.0 : 1.0;
							var n = cloudsObj3d.children.length;
							var scale;
							while( n-- > 0){
								scale = !api.clouds.debug ? cloudsObj3d.children[n].oldScale : 5;
								cloudsObj3d.children[n].scale.set( scale, scale, 1 );
							}
						},
					},

					post:{
						grain:{
							speed : 1,
							frequency: postMaterial.uniforms.uFrequency.value,
							opacity: postMaterial.uniforms.opacity.value	
						},
						vignette:{
							opacity: postMaterial.uniforms.vignetteAmount.value,
							start: postMaterial.uniforms.vignetteStart.value,
							end: postMaterial.uniforms.vignetteEnd.value
						},
						update: function(){
							postMaterial.uniforms.uFrequency.value = api.post.grain.frequency;
							postMaterial.uniforms.opacity.value = api.post.grain.opacity;

							postMaterial.uniforms.vignetteAmount.value = api.post.vignette.opacity;
							postMaterial.uniforms.vignetteStart.value = api.post.vignette.start;
							postMaterial.uniforms.vignetteEnd.value = api.post.vignette.end;
							console.log( postMaterial.uniforms.vignetteStart.value );
						}
						
					},
					


					background_color: '#'+renderer.getClearColor().getHexString(),


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
					structure:{
						shininess	: faceMaterial.shininess,
						color 		: "#"+faceMaterial.color.getHexString(),
						specular 	: "#"+faceMaterial.specular.getHexString(),
						ambient 	: "#"+faceMaterial.ambient.getHexString(),
						updateMaterial: function(){
							faceMaterial.color.set( api.structure.color );
							faceMaterial.specular.set( api.structure.specular );
							faceMaterial.ambient.set( api.structure.ambient );
							faceMaterial.shininess = api.structure.shininess;
						},
					},

					

					dataObjects:{

						refractionRatio: 0.98,
						reflectivity: 1,
						opacity: 0.8,
						metal: false,
						twitter:{
							color 		: "#"+imageContentMaterial.color.getHexString(),	
							specular 	: "#"+imageContentMaterial.specular.getHexString(),
							ambient 	: "#"+imageContentMaterial.ambient.getHexString(),
							shininess	: imageContentMaterial.shininess,
							combine 	: imageContentMaterial.combine
						},
						instagram :{
							color 		: "#"+videoContentMaterial.color.getHexString(),	
							specular 	: "#"+videoContentMaterial.specular.getHexString(),
							ambient 	: "#"+videoContentMaterial.ambient.getHexString(),
							shininess	: videoContentMaterial.shininess,
							combine 	: imageContentMaterial.combine
						},
						
						updateMaterial:function(){

							var n = contentObj3d.children.length;
							while( n-- > 0 ){
								if( contentObj3d.children[n].material ){

									contentObj3d.children[n].material.refractionRatio 	= api.dataObjects.refractionRatio;
									contentObj3d.children[n].material.reflectivity 		= api.dataObjects.reflectivity;
									contentObj3d.children[n].material.opacity 			= api.dataObjects.opacity;
									contentObj3d.children[n].material.metal 			= api.dataObjects.metal;
									contentObj3d.children[n].material.color.set( contentObj3d.children[n].isInstagram ? api.dataObjects.instagram.color : api.dataObjects.twitter.color );
									contentObj3d.children[n].material.specular.set( contentObj3d.children[n].isInstagram ? api.dataObjects.instagram.specular : api.dataObjects.twitter.specular );
									contentObj3d.children[n].material.ambient.set( contentObj3d.children[n].isInstagram ? api.dataObjects.instagram.ambient : api.dataObjects.twitter.ambient );
									contentObj3d.children[n].material.shininess 		= contentObj3d.children[n].isInstagram ? api.dataObjects.instagram.shininess : api.dataObjects.twitter.shininess;
									contentObj3d.children[n].material.combine 			= contentObj3d.children[n].isInstagram ? api.dataObjects.instagram.combine : api.dataObjects.twitter.combine;
									contentObj3d.children[n].material.needsUpdate = true;

								} 
							}

							n = searchResObj3d.children.length;
							while( n-- > 0 ){
								if( searchResObj3d.children[n].material ) {

									searchResObj3d.children[n].material.refractionRatio = api.dataObjects.refractionRatio;
									searchResObj3d.children[n].material.reflectivity 	= api.dataObjects.reflectivity;
									searchResObj3d.children[n].material.opacity 		= api.dataObjects.opacity;
									contentObj3d.children[n].material.metal 			= api.dataObjects.metal;
									contentObj3d.children[n].material.needsUpdate = true;

								}
							}


						}
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


					var matgui = gui.addFolder('Structure Material');
					matgui.addColor( api.structure, "color"	).onChange( api.structure.updateMaterial );
					matgui.addColor( api.structure, "ambient" ).onChange( api.structure.updateMaterial );
					matgui.addColor( api.structure, "specular" ).onChange( api.structure.updateMaterial );
					matgui.add( api.structure, "shininess" ).onChange( api.structure.updateMaterial );
					matgui.add( faceMaterial, "metal" );

					var dataObgGui = gui.addFolder( 'Data Object Material');
					dataObgGui.add( api.dataObjects, 'refractionRatio' ).onChange( api.dataObjects.updateMaterial );
					dataObgGui.add( api.dataObjects, 'reflectivity' ).onChange( api.dataObjects.updateMaterial );
					dataObgGui.add( api.dataObjects, 'opacity' ).onChange( api.dataObjects.updateMaterial );
					dataObgGui.add( api.dataObjects, 'metal' ).onChange( api.dataObjects.updateMaterial );

					var instgramUI = dataObgGui.addFolder( 'instagram material')
					instgramUI.addColor( api.dataObjects.instagram, 'color' ).onChange( api.dataObjects.updateMaterial );
					instgramUI.addColor( api.dataObjects.instagram, 'specular' ).onChange( api.dataObjects.updateMaterial );
					instgramUI.addColor( api.dataObjects.instagram, 'ambient' ).onChange( api.dataObjects.updateMaterial );
					instgramUI.add( api.dataObjects.instagram, 'shininess' )
					instgramUI.add( api.dataObjects.instagram, 'combine', { Multiply: THREE.MultiplyOperation, Mix: THREE.MixOperation, Add: THREE.AddOperation } ).onChange( api.dataObjects.updateMaterial );

					var twitterUI = dataObgGui.addFolder( 'twitter material')
					twitterUI.addColor( api.dataObjects.twitter, 'color' ).onChange( api.dataObjects.updateMaterial );
					twitterUI.addColor( api.dataObjects.twitter, 'specular' ).onChange( api.dataObjects.updateMaterial );
					twitterUI.addColor( api.dataObjects.twitter, 'ambient' ).onChange( api.dataObjects.updateMaterial );
					twitterUI.add( api.dataObjects.twitter, 'shininess' )
					twitterUI.add( api.dataObjects.twitter, 'combine', { Multiply: THREE.MultiplyOperation, Mix: THREE.MixOperation, Add: THREE.AddOperation } ).onChange( api.dataObjects.updateMaterial );
					
					var cloudsGUI = gui.addFolder( 'clouds' );
					cloudsGUI.add( api.clouds, "debug" ).onChange( api.clouds.update );
					cloudsGUI.add( api.clouds, "opacity", 0, 1 ).onChange( api.clouds.update );
					cloudsGUI.add( api.clouds, "offset", 0, 1 ).onChange( api.clouds.update );
					cloudsGUI.add( api.clouds, "exponent", 0 ).onChange( api.clouds.update );

					var fogGui = gui.addFolder( 'Fog' );
					fogGui.addColor( api.fog, "color" ).onChange( api.updateFogColor );
					fogGui.add( scene.fog, "near" );
					fogGui.add( scene.fog, "far" );

					var postGUI = gui.addFolder( 'Post' );
					var grainGUI = postGUI.addFolder( 'grain' );
					grainGUI.add( api.post.grain, "frequency" ).onChange( api.post.update );
					grainGUI.add( api.post.grain, "opacity" ).onChange( api.post.update );	
					grainGUI.add( api.post.grain, "speed" );

					var vignetteGUI = postGUI.addFolder( 'Vignette' );
					vignetteGUI.add( api.post.vignette, "opacity" ).onChange( api.post.update );
					vignetteGUI.add( api.post.vignette, "start" ).onChange( api.post.update );
					vignetteGUI.add( api.post.vignette, "end" ).onChange( api.post.update );
					
					gui.add( api, 		"seed" );
					gui.add( api, 		"random" );
					gui.add( api, 		"generate" );
					gui.add( skyMat, 	"visible" );
					gui.add( api, 		"speed" );


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
						result, isInstagram, dataObject;
						
					while( n-- > 0 ){

						isInstagram = n >= twitter.results.length;
						result = isInstagram ? instagram.results[n-twitter.results.length] : twitter.results[n];
						dataObject = getDataObject( result, isInstagram )
						dataObject.isInstagram = isInstagram;
						contentObj3d.add( dataObject );

						if( n <= INITIAL_NUM_ANIMATIONS ){

							var probability = Math.random();
							var prop = probability <  1/3 ? 'x' : probability < 2/3 ? 'y' : 'z';
							dataObject.targetPosition   = dataObject.position[prop];
							dataObject.position[prop]  += 4000 * ( Math.round( Math.random() ) * 2 - 1 );
							dataObject.unclickable 		= true;
							dataObject.transition = transition( dataObject.position, prop, dataObject.targetPosition, {
								spring: 10,//math.random( 1, 10 ),
								speed: math.random( 0.1, 1 ),
								delay: n === INITIAL_NUM_ANIMATIONS ? 0 : math.random( 1.0, 8.0 )
							});

							dataObject.transition.callback = function( e, b ){

								dataObject.unclickable = false;
								dataObject.transition.dispose();
								console.log( 'Animation Completed', INITIAL_NUM_ANIMATIONS );

							}.bind( this, dataObject.transition );

						}
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


				var thickness = 5;
				var cubeGeometryW = new THREE.Mesh( new THREE.CubeGeometry( 85, 85, thickness, 10, 10, 1 )),
					cubeGeometryD = new THREE.Mesh( new THREE.CubeGeometry( thickness, 85, 85, 1, 10, 10 )),
					cubeGeometryT = new THREE.Mesh( new THREE.CubeGeometry( 85, thickness, 85, 10, 1, 10 ));

				var baseGeometry = new THREE.Geometry();
				cubeGeometryW.position.z = -50;
				THREE.GeometryUtils.merge( baseGeometry, cubeGeometryW );
				cubeGeometryW.position.z = 50;
				THREE.GeometryUtils.merge( baseGeometry, cubeGeometryW );

				cubeGeometryD.position.x = -50;
				THREE.GeometryUtils.merge( baseGeometry, cubeGeometryD );
				cubeGeometryD.position.x = 50;
				THREE.GeometryUtils.merge( baseGeometry, cubeGeometryD );

				cubeGeometryT.position.y = -50;
				THREE.GeometryUtils.merge( baseGeometry, cubeGeometryT );
				cubeGeometryT.position.y = 50;
				THREE.GeometryUtils.merge( baseGeometry, cubeGeometryT );



				function getDataObject( result, isInstagram, position ){

					var mesh = new THREE.Mesh( baseGeometry, isInstagram ? videoContentMaterial.clone() : imageContentMaterial.clone()  );
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


					function performSearch( value ){

						divFadeOut( infoOverlay, 400 );
						clicked = null;

						
						var nPos = new THREE.Vector3(),
							mesh;

						$( '#search-field' ).blur();

						if( value !== '' ){

							dataloader.search( value, function( twitterResults, instagramResults ){

								var results = twitterResults.concat( instagramResults );

								searchOverlay.children('#body').children('#results').html(
									'YOUR SEARCH FOR <br/>"<b>'+value+'</b>"<br/> RETURNED <b>' + ( results.length === 0 ? "NO" : Math.min( results.length, MAX_SEARCH_RESULTS ) ) + '</b> RESULTS' 
								);

								searchOverlay.fadeIn( 400, function () {
								    if( results.length === 0 ) $( this ).delay( 5000 ).fadeOut( 400 );
							  	});

								showingSearchResults = true;
								hideVisibleDataObjects();
								
								if( results.length > 0 ){

									setDatObjectsOpacity( 0.3 );
									
									var pos, isInstagram,
										positions = strut.centeredVolume.slice();
										n = Math.min( results.length, MAX_SEARCH_RESULTS );

									while( n-- > 0 && positions.length > 0 ){

										pos = positions[ ( Math.random() * positions.length)|0 ];
										nPos.set( pos[0], pos[1], pos[2] );

										isInstagram = n >= twitterResults.length;
										mesh = getDataObject( results[n], isInstagram, nPos );
										mesh.isInstagram = isInstagram;
										mesh.material = searchContentMaterial.clone();
										searchResObj3d.add( mesh );

									}
								}

							});
						}
					}


					$( '#search-field' ).change( function(){
						var value = inputField.value;
						performSearch( inputField.value );
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
		// var offsetVec = new THREE.Vector3();

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
						var pt = toScreenXY( lastClicked.position , camera, $('#main')  );
						infoOverlay.css("transform", 'translate( '+ Number( pt.left + 250 - infoOverlay.xOffset ) + 'px, '+ Number( pt.top - 200 ) +'px )');
					}

					render( delta );
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
			
			if ( intersects.length > 0 && !intersects[ 0 ].object.unclickable) {

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

		var cubeRendered = false;
			forward = new THREE.Vector3( 0, 0, -1 );

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

			var n = cloudsObj3d.children.length;
			while( n-- > 0){
				cloudsObj3d.children[n].lookAt( camera.position );
				cloudsObj3d.children[n].currentRot += cloudsObj3d.children[n].rotDirection;
				cloudsObj3d.children[n].rotation.z = cloudsObj3d.children[n].currentRot; 
			}


			postMaterial.uniforms.uTime.value += delta * 0.01 * api.post.grain.speed;

			postMesh.position.copy( camera.position );
			forward.set( 0, 0, -1 ).applyQuaternion( camera.quaternion );
			postMesh.position.add( forward );

			// if( !cubeRendered ){
			// 	cubeRendered = true;
			// 	cubeCamera.updateCubeMap( renderer, scene );
			// }

			renderer.render( scene, camera );
			// console.timeEnd('render')

		}

		


	}
);