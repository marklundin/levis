define([
	"utils/domReady!",
	"utils/qwery",
	"glsl!shaders/default.glsl",
	"libs/build/THREE"
	], function( DOM, $ ) {

		// APP CONSTANTS
		var DEBUG = ( $.params( "DEBUG" ) !== 'false' && $.params( "DEBUG" ) !== '' );


		// APP VARIABLES
		var WIDTH 	= window.innerWidth,
			HEIGHT 	= window.innerHeight;

		// Scene
		var renderer 	= new THREE.WebGLRenderer(),
			scene 		= new THREE.Scene(),
			camera 		= new THREE.PerspectiveCamera( 65,  WIDTH / HEIGHT );


		camera.position.z = 1000;
		// camera.lookAt( scene.position );


		$( document, "#main" ).appendChild( renderer.domElement );
		window.addEventListener( 'resize', function(){

			WIDTH = document.width;
			HEIGHT = document.height;

			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();

			renderer.setSize( WIDTH, HEIGHT );			
		})


		renderer.setSize( WIDTH, HEIGHT );

		// shader params
		var shaderParams = {

		}

		var geometry 	= new THREE.CubeGeometry( 100, 100, 100 ),
			material	= new THREE.MeshNormalMaterial(),//THREE.ShaderMaterial( shaderParams ),
			mesh 		= new THREE.Mesh( geometry, material );

		scene.add( mesh );


		function animate(){
			render();
			requestAnimationFrame( animate );
		}

		function render(){
			renderer.render( scene, camera );
		}

		animate();


	}
);