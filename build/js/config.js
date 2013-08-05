requirejs.config( {

	name: 'main',
	baseUrl: 'js',

	paths: {
        "glsl": "loaders/glsl",
        "text": "loaders/text",
        "json": "loaders/json",
        "template": "loaders/template",
        // "libs": './libs'
	},

	shim:{

		"./libs/threejs/build/three.js":{
			exports: "THREE"
		},

		"./libs/threejs/examples/js/postprocessing/EffectComposer": [
			"./libs/threejs/examples/js/shaders/CopyShader", 
			"./libs/threejs/examples/js/postprocessing/ShaderPass",
			"./libs/threejs/examples/js/postprocessing/RenderPass",
			"./libs/threejs/examples/js/shaders/SSAOShader",
			"./libs/threejs/examples/js/postprocessing/MaskPass"
		],

		"./libs/threejs/examples/js/controls/OrbitControls.js": ['./libs/threejs/build/three.js'] ,
		"./libs/threejs/examples/js/shaders/SSAOShader.js": ['./libs/threejs/build/three.js'] ,
		"./libs/threejs/examples/js/shaders/CopyShader.js": ['./libs/threejs/build/three.js'] ,
		"./libs/threejs/examples/js/postprocessing/RenderPass.js": ['./libs/threejs/build/three.js'] ,
		"./libs/threejs/examples/js/postprocessing/ShaderPass.js": ['./libs/threejs/build/three.js'],
		"./libs/threejs/examples/js/postprocessing/MaskPass.js":['./libs/threejs/build/three.js'],
		"./libs/threejs/examples/js/controls/TransformControls.js":['./libs/threejs/build/three.js'],
		
		"./libs/threejs/examples/js/ImprovedNoise": {
			exports:"ImprovedNoise"
		}
	
	}
});