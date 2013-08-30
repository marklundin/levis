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
	

	], function( module, jquery, jUi, structureShader, math, structure, skydome, timer, lighting, gui, dataloader, textplane, transition, easing, cloudsShader, postShader ) {


		//PROJECT INFO
        console.log( '==============================' );
        console.log( 'NAME:         ' + NAME );
        console.log( 'VERSION:      ' + VERSION );
        console.log( 'DEBUG MODE:   ' + DEBUG   );
        console.log( '==============================' );


		var pageLoad = Date.now();
		if( $.url().param('mute') !== undefined ) Howler.mute();


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
			SEARCH_RES_RADIUS = 0.1,
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


		$('#search-field').focus(function(e){
			e.preventDefault();
			$(this).parent().toggleClass( 'search-focus', true );
			$(".featured-submissions").slideDown( 50 );
		}).blur( function(e){
			e.preventDefault();
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

		renderer.setClearColor( 0x1b2022 );
		

		controls.velocity = new THREE.Vector3();
		controls.maxPolarAngle = Math.PI / 1.42;
		controls.userRotateSpeed = 0.4;
		controls.userPan = false;
		controls.userZoom = false;
		controls.autoRotate = true;
		controls.autoRotateSpeed = 300 * timestep;
		var distanceTarget = controls.distance = 2000;
		controls.distanceVel = 0;

		controls.addEventListener( 'drag', function(){
			sounds.mouseDrag.play();
		})

		camera.position.z = 2000;
		scene.add( camera );

		// scene.add( contentObj3d );
		scene.add( searchResObj3d );

		container.appendChild( renderer.domElement );

		function resize(){
			WIDTH  = window.innerWidth;
			HEIGHT = window.innerHeight;

			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();


			renderer.setSize( WIDTH, HEIGHT );	
		}
		window.addEventListener( 'resize', resize )


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

			Howler.volume( document[hidden] ? 0.0 : 1.0 );

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
				interactiveObjs.splice( interactiveObjs.indexOf( searchResObj3d.children[n] ), 1 );
				searchResObj3d.remove( searchResObj3d.children[n] );
			}


		}

		$( '#search-field' ).click( function(e){
			console.log('SEARCH');
			e.stopImmediatePropagation();
			$( this ).select();
			$( this ).keypress( function(){
				if( clicked ){
					clicked.material.envMap = envMap;
					clicked.material.needsUpdate = true;
					resetCamera();
				}
				
			});
		});	



		searchOverlay.children( ".close-button-icon" ).click(function( e ){
			console.log('CLOSE');

			e.preventDefault();
			e.stopImmediatePropagation();

			sounds.ambient.fadeIn( 1.0, 1000 );
			sounds.search.fadeOut( 0.0, 1000 );

			showingSearchResults = false;

			inputField.value = '';
			hideVisibleDataObjects();

			divFadeOut( searchOverlay, 400 );
			divFadeOut( infoOverlay, 400 );
			if( infoOverlay.expanded ){
				infoOverlay.expanded = false;
				infoOverlay.children( "#body" ).toggle( {direction: 'right', progress:updateInfoOffset, duration:400 }, 400 );
			}
			setDatObjectsOpacity( 0.75 );

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

			
		// var bumpmap = THREE.ImageUtils.loadTexture( "img/sand-bump-map.jpg" ); // load textures
		// var normalmap = THREE.ImageUtils.loadTexture( "img/noise_normal.png" ); // load textures
		// var map = THREE.ImageUtils.loadTexture( "img/noise-bump.jpg" ); // load textures
		
		// bumpmap.wrapS = bumpmap.wrapT = THREE.RepeatWrapping;
		// map.wrapS = map.wrapT = THREE.RepeatWrapping;
		// normalmap.wrapS = normalmap.wrapT = THREE.RepeatWrapping;
		
		// map.repeat.set( 0.2, 0.2 );
		// normalmap.repeat.set( 0.2, 0.2 );
		// bumpmap.repeat.set( 0.05, 0.05 );

		// normalmap.repeat.set( 10, 1 );


		var envMap = THREE.ImageUtils.loadTextureCube(urls, new THREE.CubeRefractionMapping() ); // load textures
		// var cubeCamera = new THREE.CubeCamera( camera.near, camera.far, 1024 );
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
			e.stopImmediatePropagation();

			infoOverlay.expanded = !infoOverlay.expanded;
			infoOverlay.children( "#body" ).toggle({direction: 'right', easing: "easeInOutQuad", duration:400, progress:updateInfoOffset, onComplete:function(){
				if( !infoOverlay.expanded ) infoOverlay.video.get(0).currentTime = 0;
			}});

			if( infoOverlay.video ){
				if( infoOverlay.expanded ) infoOverlay.video.get(0).currentTime = 0;
				console.log( clicked.isInstagram );
				if( clicked.isInstagram ) infoOverlay.expanded ? infoOverlay.video.get(0).play() : infoOverlay.video.get(0).pause();
			} 

		});

		
		infoOverlay.children('.buttons').children( ".close-button-icon" ).click(function( e ){

			e.preventDefault();
			e.stopImmediatePropagation();

			// if( !showingSearchResults ) resetCamera();
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

		var firstRun = true
		camLookTransition.callback = function(){

			moving = false;
			arrived = true;
			if( clicked ){
				lastClicked = clicked;
				var content = infoOverlay.children('#body');

				sounds.closer[Math.floor( Math.random() * sounds.closer.length )].play();

				content.children('#content').html( clicked.infoDataObject.title ); 
				$('#show-more').toggleClass( "camera-button-icon", clicked.isInstagram );
				content.children('#user-info').children('#user-name').html( "<a href='"+( clicked.isInstagram ? "http://instagram.com/"+clicked.infoDataObject.user_info.screen_name : clicked.infoDataObject.user_info.user_url  ) +"' target='_blank'>"+clicked.infoDataObject.user_name+"</a>" ); 
				content.children('#user-info').children('#user-id').html(( clicked.isInstagram ? "" : "@" ) + clicked.infoDataObject.user_info.screen_name ); 
				content.children('#date').html( "Posted via " + ( clicked.isInstagram ? "Instagram" : "Twitter") + " on " + new Date( clicked.infoDataObject.add_date).toDateString().slice( 4 ) ); 
				// infoOverlay.fadeIn( 400 );
				divFadeIn( infoOverlay, 400, function(){
					if( firstRun ){
						firstRun = false;
						//KLUDGE : FF SEEMS TO NEED TO REFRESH CSS IN ORDER TO GET CLICK EVENTS
						resize();
						console.log( 'BOOM' );
					}
				} );


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
			
			if( lastClicked && lastClicked.light ){
				lastClicked.isSelected = false;
				lastClicked.light.transition.target = 0;
				// lastClicked.light.transition.reset();
				lastClicked.light.transitionDist.target = 1;
				lastClicked.light.transition.paused = false;
				selectionLights.push( lastClicked.light );
			}

			clicked = null;
			sounds.out.play();
			divFadeOut( infoOverlay, 400 );

			moveCameraTo( camTarget.set( 0, 0, 0 ), 2000, 0.4 );

		}


		document.addEventListener( 'click', function( e ){
	

			// if( gui ) controls.autoRotate = false;

			if( INTERSECTED && INTERSECTED !== clicked ){

				e.preventDefault();
				e.stopImmediatePropagation();

				if( showingSearchResults && searchResObj3d.children.indexOf( INTERSECTED ) === -1 ) return;

				if( clicked ){
					clicked.isSelected = false;
					clicked.light.transition.target = 0;
					clicked.light.transition.reset();
					clicked.light.transition.paused = false;
					clicked.light.transitionDist.target = 1;
					selectionLights.push( clicked.light );
					clicked.material.envMap = envMap;
					clicked.material.needsUpdate = true;
				}


				clicked = INTERSECTED;
				clicked.isSelected = true;
				clicked.light.transitionDist.target = 3;
				selectionLights.splice( selectionLights.indexOf( clicked.light ), 1 );

				sounds.click[Math.floor(Math.random()*sounds.click.length)].play();

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
					infoOverlay.video.toggle( clicked.isInstagram, 0 );	
				} 
				

				moveCameraTo( clicked.position );

			} 

		});


		renderer.setSize( WIDTH, HEIGHT );


		// PSEUDO POST EFFECTS

		

			var postMaterial = new THREE.ShaderMaterial({
				uniforms:{
					uTime 	 			: { type: "f", value: 0.0 },
					opacity 			: { type: "f", value: 0.26 },
					fNintensity 		: { type: "f", value: 0.8 }, // scanline intensity
					fSintensity 		: { type: "f", value: 0.7 },  // noise intensity
					fScount 			: { type: "f", value: 2500.0 },  // numscanlines
					vignetteAmount 		: { type: "f", value: 1.0 },
					vignetteStart 		: { type: "f", value: 0.2 },
					vignetteEnd 		: { type: "f", value: 0.87 },
					noiseColor 			: { type: "c", value: new THREE.Color( 0x282828 ) },
					vignColor			: { type: "c", value: new THREE.Color( 0x0c0808 ) },
				},
				vertexShader: postShader.vertexShader, //document.getElementById( 'vs' ).textContent,
				fragmentShader: postShader.fragmentShader, //document.getElementById( 'fs' ).textContent,
				depthWrite: false,
				depthTest: false,
				transparent: true,
				blend: THREE.MultiplyBlending,
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
					opacity: { type: "f", value: 0.18 },
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
				plane.rotDirection = math.random( -1, 1 ) * 0.0004;

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

					// envMap: envMap,
					reflectivity: 0.3,
					// bumpMap: bumpmap,
					// bumpScale: 0.2,
					perPixel:false,
					color: 0x222222,
					ambient: 0x426d84,
					specular: 0xFFFFFF,
					shininess: 30,
					metal:false
					// normalMap: normalmap,
					// normalScale: new THREE.Vector2( 0.2, 0.2 )
					// map: map

				});
				

				var videoContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0x660d00 ),
					specular: 0xffffff,
					ambient:new THREE.Color( 0xff2200 ),
					transparent: true,
					envMap: envMap,
					side: THREE.DoubleSide,
					// lights: false,
					// blending: THREE.AdditiveBlending,
					opacity: 0.75,
				});
				videoContentMaterial.originColor = 0x660d00;
				videoContentMaterial.originAmbientColor = 0xff2200;

				var imageContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0x280500 ),
					ambient:new THREE.Color( 0x00fff00 ),
					transparent: true,
					envMap: envMap,
					// map: envMap,
					side: THREE.DoubleSide,
					// blending: THREE.AdditiveBlending,
					opacity: 0.75,
				});
				imageContentMaterial.originColor = 0x280500;
				imageContentMaterial.originAmbientColor = 0x00fff00;

				var searchContentMaterial = new THREE.MeshPhongMaterial({
					color:new THREE.Color( 0xff33ff ),
					ambient:new THREE.Color( 0x00fff00 ),
					transparent: true,
					// envMap: cubemap,
					side: THREE.DoubleSide,
					// blending: THREE.AdditiveBlending,
					opacity: 0.75,
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
							speed: 1,
							opacity: postMaterial.uniforms.opacity.value,
							amount: postMaterial.uniforms.fNintensity.value,
							scanlines: postMaterial.uniforms.fSintensity.value,
							numScanlines: postMaterial.uniforms.fScount.value,
							color: "#"+postMaterial.uniforms.noiseColor.value.getHexString()
						},
						vignette:{
							opacity: postMaterial.uniforms.vignetteAmount.value,
							start: postMaterial.uniforms.vignetteStart.value,
							end: postMaterial.uniforms.vignetteEnd.value,
							color: "#"+postMaterial.uniforms.vignColor.value.getHexString()
						},
						update: function(){

							postMaterial.uniforms.fNintensity.value = api.post.grain.amount;
							postMaterial.uniforms.fSintensity.value = api.post.grain.scanlines;
							postMaterial.uniforms.fScount.value = api.post.grain.numScanlines;

							postMaterial.uniforms.opacity.value = api.post.grain.opacity;

							postMaterial.uniforms.vignetteAmount.value = api.post.vignette.opacity;
							postMaterial.uniforms.vignetteStart.value = api.post.vignette.start;
							postMaterial.uniforms.vignetteEnd.value = api.post.vignette.end;
							
							postMaterial.uniforms.noiseColor.value.set( api.post.grain.color );
							postMaterial.uniforms.vignColor.value.set( api.post.vignette.color );

						}
						
					},
					


					background_color: '#'+renderer.getClearColor().getHexString(),


					fog:{
						color: "#"+scene.fog.color.getHexString()
					},

					random 	: function (){
						seed = (Math.random() * 9999 )|0;
						api.seed = String( seed );

						for (var i in gui.__controllers) {
   							gui.__controllers[i].updateDisplay();
   						}
  
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
						opacity: 0.75,
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
							combine 	: videoContentMaterial.combine
						},
						
						updateMaterial:function(){

						
							videoContentMaterial.refractionRatio = imageContentMaterial.refractionRatio = api.dataObjects.refractionRatio;
							videoContentMaterial.reflectivity = imageContentMaterial.reflectivity = api.dataObjects.reflectivity;
							videoContentMaterial.opacity = imageContentMaterial.opacity = api.dataObjects.opacity;
							videoContentMaterial.metal = imageContentMaterial.metal = api.dataObjects.metal;

							videoContentMaterial.color.set( api.dataObjects.instagram.color  );
							imageContentMaterial.color.set( api.dataObjects.twitter.color  );

							videoContentMaterial.specular.set( api.dataObjects.instagram.specular);
							imageContentMaterial.specular.set( api.dataObjects.twitter.specular );

							videoContentMaterial.ambient.set( api.dataObjects.instagram.ambient);
							imageContentMaterial.ambient.set( api.dataObjects.twitter.ambient );

							videoContentMaterial.shininess = api.dataObjects.instagram.shininess;
							imageContentMaterial.shininess = api.dataObjects.twitter.shininess;

							videoContentMaterial.combine = api.dataObjects.instagram.combine;
							imageContentMaterial.combine = api.dataObjects.twitter.combine;

					
							// contentObj3d.children[n].material.needsUpdate = true;

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
					grainGUI.add( api.post.grain, "amount" ).onChange( api.post.update );
					grainGUI.add( api.post.grain, "scanlines" ).onChange( api.post.update );
					grainGUI.add( api.post.grain, "numScanlines" ).onChange( api.post.update );
					grainGUI.add( api.post.grain, "opacity" ).onChange( api.post.update );
					grainGUI.addColor( api.post.grain, "color" ).onChange( api.post.update );	

					var vignetteGUI = postGUI.addFolder( 'Vignette' );
					vignetteGUI.add( api.post.vignette, "opacity" ).onChange( api.post.update );
					vignetteGUI.add( api.post.vignette, "start" ).onChange( api.post.update );
					vignetteGUI.add( api.post.vignette, "end" ).onChange( api.post.update );
					vignetteGUI.addColor( api.post.vignette, "color" ).onChange( api.post.update );
					
					gui.add( api, 		"seed" ).onChange( function(){ seed = parseInt( api.seed )});
					gui.add( api, 		"random" );
					gui.add( api, 		"generate" );
					gui.add( skyMat, 	"visible" );
					gui.add( api, 		"speed" );


					gui.add( camera, "fov", 0, 100 ).onChange( api.updateCamera );
					gui.addColor( api, "background_color" ).onChange( api.updateBackgoundColor );

				}


			// END GUI+API


			// DATA 

				var selectionLights = [],
					strut,
					instagramMesh = new THREE.Mesh( new THREE.Geometry(), videoContentMaterial  ),
					twitterMesh   = new THREE.Mesh( new THREE.Geometry(), imageContentMaterial  ),
					interactiveObjs = [];

				var nl = 3, light;
				while( nl-- > 0 ){
					light = new THREE.PointLight( 0xFF0000, 0, 250 );
					light.opacity = 0;
					light.distanceCoeff = 1;
					light.transition = transition( light, 'opacity', 0, {threshold:0.01, speed: 5.0 } );
					light.transitionDist = transition( light, 'distanceCoeff', 1, {threshold:0.01, speed: 0.1 } );
					light.transition.target = 0;
					// light.transition.paused = true;
					light.transition.callback = function( light ){

						light.transition.arrived = false;
						light.transition.paused = true;
						light.opacity = light.transition.target;

						if( light.transition.target < 0.5 && light.object && !light.object.isSelected ){
							light.object.light = null;
						}

					}.bind( this, light );

					selectionLights.push( light );
					scene.add( light );

				}

				allLights = selectionLights.slice();

				// scene.add( selectionLight );
				scene.add( instagramMesh );
				scene.add( twitterMesh );


				var enterLight = new THREE.PointLight( 0xFF0000, 1, 2000 );//
				enterLight.opacity = 1;
				enterLight.distanceCoeff = 1.0;
				// allLights.push( enterLight );
				enterLight.transition = transition( enterLight, 'opacity', 1 );
				enterLight.transition.target = 1;
				scene.add( enterLight );


				// var enteringItems = [];
				// var enteringPostition = {position:new THREE.Vector3()};
				// var enteringAnim = transition( enteringPostition, 'position' );

				// function nextEnterAnim(){

				// 	var item = enteringItems.pop();

				// 	enteringAnim.copy( enteringPostition.position );
				// 	item.position = enteringAnim.target;

				// }


				dataloader( function( twitter, instagram ){

					generate();

					var n = twitter.results.length + instagram.results.length,
						result, isInstagram, dataObject;
						
					while( n-- > 0 ){

						isInstagram = n >= twitter.results.length;
						result = isInstagram ? instagram.results[n-twitter.results.length] : twitter.results[n];
						dataObject = getDataObject( result, isInstagram )
						dataObject.isInstagram = isInstagram;

						if( n < INITIAL_NUM_ANIMATIONS ){

							var probability = Math.random();
							var prop = probability <  1/3 ? 'x' : probability < 2/3 ? 'y' : 'z';
							dataObject.targetProp 		= prop
							dataObject.targetPosition   = dataObject.position[prop];
							dataObject.position[prop]  += 5000 * ( Math.round( Math.random() ) * 2 - 1 );
							dataObject.unclickable 		= true;
							dataObject.transition = transition( dataObject.position, prop, dataObject.targetPosition, {
								spring: 10,//math.random( 1, 10 ),								
								speed: 0.1,//math.random( 0.2, 0.6 ),
								delay: 4 * n
							});
							
							dataObject.transition.startCallback = function( obj ){
								console.log( 'started' );
								scene.add( obj );
								enterLight.position = obj.position;
								// enterLight.color.copy( obj.material.color ).multiplyScalar( 30 );
								enterLight.transition.opacity = enterLight.transition.target = 1;
								enterLight.transition.reset();
								enterLight.transition.arrived = false;
								sounds.entering[Math.floor( Math.random()*sounds.entering.length )].play();
							}.bind( this, dataObject )

							dataObject.transition.callback = function( obj ){
								console.log( 'here', INITIAL_NUM_ANIMATIONS );
								enterLight.transition.target = 0;
								obj.position[obj.targetProp] = obj.targetPosition;
								enterLight.transition.target = 0;
								obj.unclickable = false;
								interactiveObjs.push( obj );
								obj.transition.dispose();

							}.bind( this, dataObject );

						}else{
							interactiveObjs.push( dataObject );
							THREE.GeometryUtils.merge( dataObject.isInstagram ? instagramMesh.geometry : twitterMesh.geometry, dataObject );
							// contentObj3d.add( dataObject );
						}
					}

					
					run();

				}, function( twitter, instagram ){

					if( !instagram.loaded ) console.log( 'Instagram failed to load.' )
					if( !twitter.loaded ) 	console.log( 'Twitter failed to load.' )

				});



				function setDatObjectsOpacity( opacity ){


					imageContentMaterial.opacity = opacity;
					videoContentMaterial.opacity = opacity;

					imageContentMaterial.color.setHex( opacity < 0.5 ? 0x444444 : imageContentMaterial.originColor );
					imageContentMaterial.ambient.setHex( opacity < 0.5 ? 0x444444 : imageContentMaterial.originAmbientColor  );

					videoContentMaterial.color.setHex( opacity < 0.5 ? 0x444444 : imageContentMaterial.originColor );
					videoContentMaterial.ambient.setHex( opacity < 0.5 ? 0x444444 : imageContentMaterial.originAmbientColor  );


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

					var mesh = new THREE.Mesh( baseGeometry, isInstagram ? videoContentMaterial/*.clone()*/ : imageContentMaterial/*.clone()*/  );
					var index = ( Math.random() * strut.volume.length )|0;
					var item = strut.volume[index];

					position ? mesh.position.copy( position ) : mesh.position.set( item[0], item[1], item[2] );
					mesh.position.x -= 15;
					mesh.position.y -= 15;
					mesh.position.z -= 15;
					mesh.position.multiplyScalar( 100 );
					mesh.matrixWorld.setPosition( mesh.position );
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
									'YOUR SEARCH FOR <br/>"<b>'+value.toUpperCase()+'</b>"<br/> RETURNED <b>' + ( results.length === 0 ? "NO" : Math.min( results.length, MAX_SEARCH_RESULTS ) ) + '</b> RESULTS' 
								);

								searchOverlay.fadeIn( 400, function () {
								    if( results.length === 0 ) $( this ).delay( 5000 ).fadeOut( 400 );
							  	});

								showingSearchResults = true;
								hideVisibleDataObjects();
								
								if( results.length > 0 ){

									sounds.ambient.fadeOut( 0, 1000 );
									sounds.search.volume( 1.0 );
									sounds.search.play();

									setDatObjectsOpacity( 0.3 );
									
									var pos, isInstagram,
										positions = strut.centeredVolume.slice();
										n = Math.min( results.length, MAX_SEARCH_RESULTS );

									while( n-- > 0 && positions.length > 0 ){

										pos = positions[ ( Math.random() * positions.length)|0 ];
										nPos.set( pos[0], pos[1], pos[2] );

										isInstagram = n >= twitterResults.length;
										mesh = getDataObject( results[n], isInstagram, nPos );
										interactiveObjs.push( mesh );
										mesh.isInstagram = isInstagram;
										mesh.material = searchContentMaterial/*.clone();*/
										searchResObj3d.add( mesh );

									}
								}

							});
						}
					}


					$('#search-field').keypress(function (e) {
					  if (e.which === 13) {
					  	event.preventDefault();
					    performSearch( inputField.value );
					  }
					});

					// $( '#search-form' ).submit( function( e ){
					// 	var value = inputField.value;
			  //           console.log("SEARCH", e );
						
					// });


				// END SEARCH


			// END DATA


			//SOUNDS

				var sounds = {};

				sounds.mouseOver = [];
				sounds.mouseOver[0] = new Howl({
				  urls: ['audio/over1.mp3'],
				  loop: false,
				  volume: 1.0,
				});

				sounds.mouseOver[1] = new Howl({
				  urls: ['audio/over2.mp3'],
				  loop: false,
				  volume: 1.0,
				});

				sounds.ambient = new Howl({
				  urls: ['audio/raum.mp3'],
				  loop: true,
				  volume: 1.0
				});

				sounds.search = new Howl({
				  urls: ['audio/search.mp3'],
				  loop: false,
				  volume: 1.0,
				});


				sounds.click = [];
				sounds.click[0] = new Howl({
				  urls: ['audio/fly-in1.mp3'],
				  volume: 1.0,
				  loop: false
				});

				sounds.click[1] = new Howl({
				  urls: ['audio/fly-in2.mp3'],
				  volume: 1.0,
				  loop: false
				});
				sounds.click[2] = new Howl({
				  urls: ['audio/fly-in3.mp3'],
				  volume: 1.0,
				  loop: false
				})

				sounds.closer = [];
				sounds.closer[0] = new Howl({
				  urls: ['audio/closer1.mp3'],
				  volume: 1.0,
				  loop: false
				});

				sounds.closer[1] = new Howl({
				  urls: ['audio/closer2.mp3'],
				  volume: 1.0,
				  loop: false
				});

				sounds.closer[2] = new Howl({
				  urls: ['audio/closer3.mp3'],
				  volume: 1.0,
				  loop: false
				});

				sounds.out = new Howl({
				  urls: ['audio/flyout.mp3'],
				  volume: 1.0,
				  loop: false
				});

				sounds.entering = []
				sounds.entering[0] = new Howl({
				  urls: ['audio/entering1.mp3'],
				  volume: 1.0,
				  loop: false
				});

				sounds.entering[1] = new Howl({
				  urls: ['audio/entering2.mp3'],
				  volume: 1.0,
				  loop: false
				});

				sounds.mouseDrag = new Howl({
				  urls: ['audio/turn.mp3'],
				  volume: 1.0,
				  loop: false
				});

			//
			
			var strut;

			function generate(){
				
				if( structMesh ){
					scene.remove( structMesh );
					structMesh.geometry.dispose();
				}
				
				// console.time( 'GENERATE' );
				strut = structure( api.frequency, api.complexity, api.seed, api.threshold, api.horizontal_thickness, api.vertical_thickness );
				strut.centeredVolume = strut.volume.slice();

				var ca = new THREE.Vector3(),
					cb = new THREE.Vector3();
				strut.centeredVolume.sort(function(a, b){
					return ca.set( a[0]- 15, a[1]- 15, a[2]- 15).length() - cb.set( b[0]- 15, b[1]- 15, b[2]- 15).length();
				})
				strut.centeredVolume = strut.centeredVolume.splice( 0, Math.max( 40, (strut.centeredVolume.length * SEARCH_RES_RADIUS )|0 ) );
				// console.timeEnd( 'GENERATE' );

				structMesh = new THREE.Mesh( strut.geometry, faceMaterial );
				structMesh.matrixAutoUpdate = false;
				scene.add( structMesh );
				
			}


		// END SUPPORT STRUCTURE



		var running = false;
		var startTime, time, delta, t, firstStep = true;
		var screenPos		= {};
		// var offsetVec = new THREE.Vector3();

		function run(){

			if( !running ){

				running = true;
				sounds.ambient.play();
		
				function animate( timeSinceLoad ){


					cloat = true;

					t = timeSinceLoad - startTime;
					delta = t - time;
					delta = delta > FPmS ? FPmS : delta
					time = t;
					
					controlsActive = lights.update( camera );
					controls.setPauseState( controlsActive );
					if( !controlsActive ) controls.update( camera );
					// if( gui && lastClicked ) controls.autoRotate = !controlsActive;

					picking();
					
					transition.update( delta / 1000 * api.speed );

					if( arrived && lastClicked ){
						toScreenXY( lastClicked.position , camera, $('#main')  );
						infoOverlay.css("transform", 'translate( '+ Number( screenPos.left + 250 - infoOverlay.xOffset ) + 'px, '+ Number( screenPos.top - 200 ) +'px )');
					}

					requestAnimationFrame( animate );
					render( delta, time );
						


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
		    
		   	screenPos.left= (   pos.x + 1 ) * jqdiv.width()  / 2;
		    screenPos.top = ( - pos.y + 1 ) * jqdiv.height() / 2;

		    return screenPos;

		}


		var mouseVector 	= new THREE.Vector3();


		function picking(){

			// console.log( videoContentMaterial.opacity );

			// imageContentMaterial.opacity = 0.1;
			// videoContentMaterial.opacity = 0.1;

			mouseVector.set( mouse.x, mouse.y, 1 );
			projector.unprojectVector( mouseVector,  camera );

			raycaster.set( camera.position, mouseVector.sub( camera.position ).normalize() );

			var intersects = raycaster.intersectObjects( interactiveObjs, true );
			// console.log( intersects.length  );
			if ( intersects.length > 0 && !intersects[ 0 ].object.unclickable ) {

				if ( INTERSECTED != intersects[ 0 ].object ) {

					

					if ( INTERSECTED && INTERSECTED !== clicked && INTERSECTED.light ){
						INTERSECTED.light.transition.paused = false;
						INTERSECTED.light.transition.target = 0;
						// selectionLight.color.setHex( selectionLight.currentHex );
						// selectionLight.intensity = 0;
					}

					if( showingSearchResults && searchResObj3d.children.indexOf( intersects[ 0 ].object ) === -1 ) return;
					sounds.mouseOver[Math.floor( Math.random() * sounds.mouseOver.length)].play();

					INTERSECTED = intersects[ 0 ].object;
					// selectionLight.currentHex = selectionLight.color.getHex();

					var isNewLight = INTERSECTED.light === null;
					var light = INTERSECTED.light || selectionLights[selectionLights.length - selectionLights.unshift( selectionLights.pop() )];
					light.object = null;
					INTERSECTED.light = light;
					

					if( isNewLight ){
						light.opacity = 0;
						light.transition.reset();
					}

					light.transition.target = 1;
					light.object = INTERSECTED;


					light.color.set( INTERSECTED.material.color ).multiplyScalar( 30 );
					// light.intensity = 5.5;
					// cocks.position.copy( INTERSECTED.position );
					light.position.copy( INTERSECTED.position );
					light.transition.paused = false;


				}
				

			} else {

				if ( INTERSECTED && INTERSECTED !== clicked && INTERSECTED.light ){
					INTERSECTED.light.transition.paused = false;
					INTERSECTED.light.transition.target = 0;
					
				} 
				INTERSECTED = null;


			}			

		}

		var cubeRendered = false;
			forward 	 = new THREE.Vector3( 0, 0, -1 ),
			normal 	     = new THREE.Vector3( 0, 0, 1 ),
			camUp 		 = new THREE.Vector3( 0, 1, 0 );
			range 		 = 25;

		var cloudRotationQuat = new THREE.Quaternion();
		function render( delta, time ){

			// depth pass
			// scene.overrideMaterial = depthMaterial;
			// renderer.render( scene, camera, depthTarget );
			// scene.overrideMaterial = null;

			// // //to screen
			// composer.render();
			// console.time('render')
			// console.log( material.uniforms.uTime.value );
			// material.uniforms.uTime.value = delta * 0.00005;

			var l = allLights.length;
			while( l-- > 0 ){
				// console.log( allLights[l].transition.target )
				// allLights[l].opacity = allLights[l].transition.target;

				allLights[l].distance =  Math.sin( time * 0.0005 ) * range + range + 150;	
				allLights[l].intensity = (( allLights[l].distance / 175 )) * ( Math.cos( time * 10.0 ) * 0.6 + 8.0 );
				allLights[l].intensity *= allLights[l].opacity;
				allLights[l].distance  *= allLights[l].distanceCoeff;
			}


			var n = cloudsObj3d.children.length;

			while( n-- > 0){

				cloudsObj3d.children[n].up.set( 0, 1, 0 ).applyQuaternion( camera.quaternion );
				cloudsObj3d.children[n].lookAt( camera.position  );

				// cloudsObj3d.children[n].lookAt( camera.position );
				cloudsObj3d.children[n].currentRot += cloudsObj3d.children[n].rotDirection;
				cloudRotationQuat.setFromAxisAngle( normal, cloudsObj3d.children[n].currentRot )
				
				cloudsObj3d.children[n].quaternion.multiply( cloudRotationQuat );

			}


			postMaterial.uniforms.uTime.value += delta * 0.001

			postMesh.position.copy( camera.position );
			forward.set( 0, 0, -1 ).applyQuaternion( camera.quaternion );
			postMesh.position.add( forward );

			// if( !cubeRendered ){
			// 	cubeRendered = true;
			// 	cubeCamera.updateCubeMap( renderer, scene );
			// }

			renderer.render( scene, camera );
			

		}

	}
);