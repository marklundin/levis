define(
	[], 
	function(){

		return function( scene, camera, gui ){


			var pointLights 		= [],
				directionalLights 	= [],
				hemispshereLights 	= [],
				spotLights 			= [],
				allLights 			= [];

			var l;

			// var privateApi = {
			// 	updateColors: function (){

			// 	},
			// 	remove: function (){

			// 	}
			// }

			var api = {

				update: function(){
					l = allLights.length;
					while( l-- > 0 ){
						allLights[l].helper.update();
						allLights[l].control.update();
					}
				}

			}


			// if( gui ){
			// 	gui = gui.addFolder( 'lights' );	
			// 	gui.add( api, 'addPointLight' );
			// 	gui.add( api, 'addDirectionalLight' );
			// 	gui.add( api, 'addHemispshereLight' );
			// 	gui.add( api, 'addSpotLight' );
			// } 


			return api;

		}
	}
)