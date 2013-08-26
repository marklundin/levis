define(
	["utils/math",
	 "libs/threejs/examples/js/controls/TransformControls",], 
	function( math ){

		return function( scene, camera, dom, gui ){


			var pointLights 		= 0,
				directionalLights 	= 0,
				hemisphereLights 	= 0,
				spotLights 			= 0,
				allLights 			= [],
				controlsActive 		= false,
				isHovering 			= false,
				l;


			var ambientLight = new THREE.AmbientLight(0x222222);

			scene.add(ambientLight);

			function onLightInteraction(e){
				isHovering = e.target.hovered;
			}

			function addLight ( light ){

				light.controls = new THREE.TransformControls( camera, dom );
				light.controls.scale = 0.65;
				light.controls.attach( light );

				allLights.push( light );
				scene.add( light );

				if( gui ){
					light.controls.addEventListener( 'change', onLightInteraction );
					scene.add( light.controls.gizmo );
				} 

				if( onLightAddedCallback ) onLightAddedCallback();

				return light;

			}

			// DAT.GUI shim to remove folders
			function removeGUIFolder( gui, name ) {
				gui.__folders[name].close();
				gui.__ul.removeChild( gui.__folders[name].domElement.parentNode );
				// dom.removeClass( gui.__folders[name].domElement, 'folder');
				gui.__folders[name] = undefined;
				gui.onResize();
			};

			var privateApi = {
				updateColors: function (){},
				remove: function (){}
			}

			var api = {

				onLightAdded: function( callback ){
					onLightAddedCallback = callback;
				},

				onLightRemoved: function( callback ){
					onLightRemovedCallback = callback;
				},

				update: function(){

					controlsActive = false;

					l = allLights.length;
					while( l-- > 0 )
					{
						allLights[l].helper.update();
						allLights[l].controls.update();
						controlsActive = controlsActive || Boolean( allLights[l].controls.active );
					}

					return controlsActive || isHovering;
				},


				addPointLight: function ( color, intensity, distance, position  ){

					var light = new THREE.PointLight( color, intensity , distance || 2000 );

					if( position ){
						light.position.copy( position );
					}else{

						light.position.set(
							Math.random() * 12 - 6,
							Math.random() * 12 - 6,
							Math.random() * 12 - 6
						).multiplyScalar( 100 );
					}

					light.helper = new THREE.PointLightHelper( light, 100 );
					if( gui ) scene.add( light.helper );

					light.api = {
						color: "#"+light.color.getHexString()
					}
					
					pointLights++;
					addLight( light );
						

					if( gui ){


						var dirName = 'Point Light ' + pointLights; 
						var lightui = gui.addFolder( dirName );
						lightui.addColor( light.api, "color" ).onChange( function(){

							light.color.set( light.api.color );

						});

						lightui.add( light, "intensity" );
						lightui.add( light, "distance" );

						lightui.add( privateApi, "remove" ).onChange(function(){

							scene.remove( light );
							scene.remove( light.helper );
							scene.remove( light.controls.gizmo );
							allLights.splice( allLights.indexOf( light ));
							removeGUIFolder( gui, dirName );
							if( onLightRemovedCallback ) onLightRemovedCallback();


						});


						
					}

				},

				addDirectionalLight: function ( color ){

					var light = new THREE.DirectionalLight( color );

					light.helper = new THREE.DirectionalLightHelper( light, 100 );
					if ( gui ) scene.add( light.helper );


					light.api = {
						color: "#"+light.color.getHexString()
					}
					
					directionalLights++;
					addLight( light );
						

					if( gui ){


						var dirName = 'Directional Light ' + directionalLights; 
						var lightui = gui.addFolder( dirName );
						lightui.addColor( light.api, "color" ).onChange( function(){

							light.color.set( light.api.color );

						});

						lightui.add( light, "intensity" );

						lightui.add( privateApi, "remove" ).onChange(function(){

							scene.remove( light );
							scene.remove( light.helper );
							scene.remove( light.controls.gizmo );
							allLights.splice( allLights.indexOf( light ));
							removeGUIFolder( gui, dirName );
							if( onLightRemovedCallback ) onLightRemovedCallback();

						});

						
					}

				},

				addHemispshereLight: function ( color ){

					var light = new THREE.HemisphereLight( color );

					light.helper = new THREE.HemisphereLightHelper( light, 100 );
					if( gui ) scene.add( light.helper );


					light.api = {
						color: "#"+light.color.getHexString(),
						groundColor: "#"+light.groundColor.getHexString(),
					}
					
					hemisphereLights++;
					addLight( light );
						

					if( gui ){

						var dirName = 'Hemisphere Light ' + hemisphereLights; 
						var lightui = gui.addFolder( dirName );
						lightui.addColor( light.api, "color" ).onChange( function(){
							light.color.set( light.api.color );
						});

						lightui.addColor( light.api, "groundColor" ).onChange( function(){
							light.groundColor.set( light.api.groundColor );
						});

						lightui.add( light, "intensity" );

						lightui.add( privateApi, "remove" ).onChange(function(){

							scene.remove( light );
							scene.remove( light.helper );
							scene.remove( light.controls.gizmo );
							allLights.splice( allLights.indexOf( light ));
							removeGUIFolder( gui, dirName );
							if( onLightRemovedCallback ) onLightRemovedCallback();

						});

						
						
					}

				},

				addSpotLight: function ( color ){

					var light = new THREE.SpotLight( color );
					light.helper = new THREE.SpotLightHelper( light, 100 );
					if( gui ) scene.add( light.helper );
					
					light.api = {
						color: "#"+light.color.getHexString()
					}
					
					spotLights++;
					addLight( light );
						

					if( gui ){


						var dirName = 'Spotlight ' + spotLights;
						var lightui = gui.addFolder( dirName );
						lightui.addColor( light.api, "color" ).onChange( function(){

							light.color.set( light.api.color );

						});

						lightui.add( light, "intensity" );
						lightui.add( light, "angle", 0, Math.PI * 0.5 ).step( 0.01 );
						lightui.add( light, "exponent", 0, 10 ).step( 0.1 );

						lightui.add( privateApi, "remove" ).onChange(function(){

							scene.remove( light );
							scene.remove( light.helper );
							scene.remove( light.controls.gizmo );
							allLights.splice( allLights.indexOf( light ));
							removeGUIFolder( gui, dirName );
							if( onLightRemovedCallback ) onLightRemovedCallback();


						});

						

						
					}

				},

			}


			if( gui ){
				gui = gui.addFolder( 'lights' );	
				gui.add( api, 'addPointLight' );
				gui.add( api, 'addDirectionalLight' );
				gui.add( api, 'addHemispshereLight' );
				gui.add( api, 'addSpotLight' );

				var ambLightUI = gui.addFolder( "Ambient Lighting" );
				var amLightApi ={
					color: "#"+ambientLight.color.getHexString()
				}
				ambLightUI.addColor( amLightApi, "color" ).onChange( function(){

					ambientLight.color.set( amLightApi.color );

				});
				
			} 


			return api;

		}
	}
)