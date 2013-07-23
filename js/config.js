requirejs.config( {

	name: 'main',
	baseUrl: 'js',

	paths: {
        "glsl": "loaders/glsl",
        "text": "loaders/text",
        "json": "loaders/json",
        "template": "loaders/template",
        // "threejs": "libs/threejs"
        // ,
	},

	shim:{

		"libs/threejs/build/three":{
			exports: "THREE"
		},

		"libs/threejs/examples/js/postprocessing/EffectComposer": [
			"libs/threejs/examples/js/shaders/CopyShader", 
			"libs/threejs/examples/js/postprocessing/ShaderPass",
			"libs/threejs/examples/js/postprocessing/RenderPass",
			"libs/threejs/examples/js/shaders/SSAOShader",
			"libs/threejs/examples/js/postprocessing/MaskPass"
		],
		"libs/threejs/examples/js/controls/OrbitControls": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/shaders/SSAOShader": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/shaders/CopyShader": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/postprocessing/RenderPass": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/postprocessing/ShaderPass": ['libs/threejs/build/three'],
		"libs/threejs/examples/js/postprocessing/MaskPass":['libs/threejs/build/three'],
		"libs/threejs/examples/js/ImprovedNoise": {
			exports:"ImprovedNoise"
		}
	
	}
});