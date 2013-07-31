define(
	[], 
	function(){

		return function( scene, camera, dom, gui ){


			var pointLights 		= 0,
				directionalLights 	= 0,
				hemisphereLights 	= 0,
				spotLights 			= 0,
				allLights 			= [];

			var l;

			function addLight ( light ){

				light.controls = new THREE.TransformControls( camera, dom );
				light.controls.scale = 0.65;
				light.controls.attach( light );

				allLights.push( light );

				scene.add( light );
				scene.add( light.controls.gizmo );

				return light;

			}

			function removeGUIFolder( gui, name ) {
				gui.__folders[name].close();
				// gui.__folders[name].remove();
				console.log( gui.__ul, gui.__folders[name].domElement.parentNode );
				gui.__ul.removeChild( gui.__folders[name].domElement.parentNode );
				// dom.removeClass( gui.__folders[name].domElement, 'folder');
				gui.__folders[name] = undefined;
				gui.onResize();
			};

			var privateApi = {
				updateColors: function (){

				},
				remove: function (){

				}
			}

			var api = {

				update: function(){

					l = allLights.length;
					while( l-- > 0 )
					{
						allLights[l].helper.update();
						allLights[l].controls.update();
					}
				},


				addPointLight: function ( color ){

					var light = new THREE.PointLight( color );

					light.helper = new THREE.PointLightHelper( light, 100 );
					scene.add( light.helper );

					light.api = {
						color: "#"+light.color.getHexString()
					}
					
					pointLights++;
					addLight( light );
						

					if( gui ){


						var dirName = 'Point Light ' + pointLights.length 
						var lightui = gui.addFolder( dirName );
						lightui.addColor( light.api, "color" ).onChange( function(){

							light.color.set( light.api.color );

						});

						lightui.add( privateApi, "remove" ).onChange(function(){

							scene.remove( light );
							scene.remove( light.helper );
							scene.remove( light.controls.gizmo );
							allLights.splice( allLights.indexOf( light ));
							removeGUIFolder( gui, dirName );


						});
						
					}

				},

				addDirectionalLight: function ( color ){

					var light = new THREE.DirectionalLight( color );

					light.helper = new THREE.DirectionalLightHelper( light, 100 );
					scene.add( light.helper );


					light.api = {
						color: "#"+light.color.getHexString()
					}
					
					directionalLights++;
					addLight( light );
						

					if( gui ){


						var dirName = 'Directional Light ' + directionalLights.length 
						var lightui = gui.addFolder( dirName );
						lightui.addColor( light.api, "color" ).onChange( function(){

							light.color.set( light.api.color );

						});

						lightui.add( privateApi, "remove" ).onChange(function(){

							scene.remove( light );
							scene.remove( light.helper );
							scene.remove( light.controls.gizmo );
							allLights.splice( allLights.indexOf( light ));
							removeGUIFolder( gui, dirName );


						});
						
					}

				},

				addHemispshereLight: function ( color ){

					var light = new THREE.HemisphereLight( color );

					light.helper = new THREE.HemisphereLightHelper( light, 100 );
					scene.add( light.helper );


					light.api = {
						color: "#"+light.color.getHexString()
					}
					
					hemisphereLights++;
					addLight( light );
						

					if( gui ){


						var dirName = 'Hemisphere Light ' + hemisphereLights.length 
						var lightui = gui.addFolder( dirName );
						lightui.addColor( light.api, "color" ).onChange( function(){

							light.color.set( light.api.color );

						});

						lightui.add( privateApi, "remove" ).onChange(function(){

							scene.remove( light );
							scene.remove( light.helper );
							scene.remove( light.controls.gizmo );
							allLights.splice( allLights.indexOf( light ));
							removeGUIFolder( gui, dirName );


						});
						
					}

				},

				addSpotLight: function ( color ){

					var light = new THREE.SpotLight( color );
					light.helper = new THREE.SpotLightHelper( light, 100 );
					scene.add( light.helper );
					
					light.api = {
						color: "#"+light.color.getHexString()
					}
					
					spotLights++;
					addLight( light );
						

					if( gui ){


						var dirName = 'Spotlight ' + spotLights.length 
						var lightui = gui.addFolder( dirName );
						lightui.addColor( light.api, "color" ).onChange( function(){

							light.color.set( light.api.color );

						});

						lightui.add( privateApi, "remove" ).onChange(function(){

							scene.remove( light );
							scene.remove( light.helper );
							scene.remove( light.controls.gizmo );
							allLights.splice( allLights.indexOf( light ));
							removeGUIFolder( gui, dirName );


						});
						
					}

				},

			}


			if( gui ){
				console.log( 'lights' );
				gui = gui.addFolder( 'lights' );	
				gui.add( api, 'addPointLight' );
				gui.add( api, 'addDirectionalLight' );
				gui.add( api, 'addHemispshereLight' );
				gui.add( api, 'addSpotLight' );
			} 


			return api;

		}
	}
)