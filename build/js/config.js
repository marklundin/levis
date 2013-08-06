requirejs.config( {

	name: 'main',
	baseUrl: 'js',

	config:{
		url: "http://sandbox28.thismoment.com/v2/api/gallery/get.jsonp",
		params:
		{
        	environment: 1, // dont't change this one
            gallery_id: 1, // your projects gallery ID will be provided to you.
            category_id: 6, // category IDs will be provided. categories will be text (Twitter), photo (Instagram), video (Instagram), or all.
            start: 1, // starting index for paging
            total: 10, // page size, 40 maximum.
            active: 1, // only pull approved content.
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

		"../libs/threejs/build/three.js":{
			exports: "THREE"
		},

		"../libs/underscore.js":{
			exports: "_"
		},

		// "../libs/threejs/examples/js/postprocessing/EffectComposer": [
		// 	"../libs/threejs/examples/js/shaders/CopyShader", 
		// 	"..//libs/threejs/examples/js/postprocessing/ShaderPass",
		// 	"../libs/threejs/examples/js/postprocessing/RenderPass",
		// 	"../libs/threejs/examples/js/shaders/SSAOShader",
		// 	"../libs/threejs/examples/js/postprocessing/MaskPass"
		// ],

		"../libs/threejs/examples/js/controls/OrbitControls.js": ['../../../build/three.js'] ,
		"../libs/threejs/examples/js/shaders/SSAOShader.js": ['../libs/threejs/build/three.js'] ,
		"../libs/threejs/examples/js/shaders/CopyShader.js": ['../libs/threejs/build/three.js'] ,
		"../libs/threejs/examples/js/postprocessing/RenderPass.js": ['../libs/threejs/build/three.js'] ,
		"../libs/threejs/examples/js/postprocessing/ShaderPass.js": ['../libs/threejs/build/three.js'],
		"../libs/threejs/examples/js/postprocessing/MaskPass.js":['../libs/threejs/build/three.js'],
		"../libs/threejs/examples/js/controls/TransformControls.js":['../../../build/three.js'],
		
		"../libs/threejs/examples/js/ImprovedNoise": {
			exports:"ImprovedNoise"
		}
	
	}
});