requirejs.config( {

	name: 'main',
	baseUrl: './js',

	config:{
		data:{
			instagramUrl: "https://levismakeourmark.thismoment.com/v4/api/gallery/get.json?environment=1&gallery_id=4&category_id=28",
			twitterUrl: "https://levismakeourmark.thismoment.com/v4/api/gallery/get.json?environment=1&gallery_id=4&category_id=29"
		}
	},


	paths: {
        "glsl": "loaders/glsl",
        "text": "loaders/text",
        "json": "loaders/json",
        "template": "loaders/template",
        // "libs": './libs'
	},

	shim:{

		"libs/threejs/build/three.js":{
			exports: "THREE"
		},

		"libs/underscore.js":{
			exports: "_"
		},

		// "libs/threejs/examples/js/postprocessing/EffectComposer": [
		// 	"libs/threejs/examples/js/shaders/CopyShader", 
		// 	"..//libs/threejs/examples/js/postprocessing/ShaderPass",
		// 	"libs/threejs/examples/js/postprocessing/RenderPass",
		// 	"libs/threejs/examples/js/shaders/SSAOShader",
		// 	"libs/threejs/examples/js/postprocessing/MaskPass"
		// ],

		"libs/threejs/examples/js/controls/OrbitControls": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/shaders/SSAOShader.js": ['libs/threejs/build/three.js'] ,
		"libs/threejs/examples/js/shaders/CopyShader.js": ['libs/threejs/build/three.js'] ,
		"libs/threejs/examples/js/postprocessing/RenderPass.js": ['libs/threejs/build/three.js'] ,
		"libs/threejs/examples/js/postprocessing/ShaderPass.js": ['libs/threejs/build/three.js'],
		"libs/threejs/examples/js/postprocessing/MaskPass.js":['libs/threejs/build/three.js'],
		"libs/threejs/examples/js/controls/TransformControls":['libs/threejs/build/three'],
		
		"libs/threejs/examples/js/ImprovedNoise": {
			exports:"ImprovedNoise"
		}
	
	}
});