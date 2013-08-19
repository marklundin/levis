requirejs.config( {

	name: 'main',
	baseUrl: './js',

	config:{
		data:{
			instagram:{
				feed: "https://levismakeourmark.thismoment.com/v4/api/gallery/get.jsonp?environment=1&sort=1&gallery_id=4&category_id=28",
				search: "https://levismakeourmark.thismoment.com/v4/api/search/content.jsonp?environment=1&gallery_id=4&category_id=28&query="
			},
			twitter:{
				feed: "https://levismakeourmark.thismoment.com/v4/api/gallery/get.jsonp?environment=1&sort=1&gallery_id=4&category_id=29",
				search: "https://levismakeourmark.thismoment.com/v4/api/search/content.jsonp?environment=1&gallery_id=4&category_id=29&query="
			}
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

		"libs/threejs/build/three":{
			exports: "THREE"
		},

		"purl":{
			deps:['jquery']
		},

		// "libs/underscore.js":{
		// 	exports: "_"
		// },

		"libs/threejs/examples/js/postprocessing/EffectComposer": [
			'libs/threejs/build/three',
			"libs/threejs/examples/js/shaders/CopyShader", 
			"libs/threejs/examples/js/postprocessing/ShaderPass",
			"libs/threejs/examples/js/shaders/FXAAShader",
			// "libs/threejs/examples/js/postprocessing/RenderPass",
			// "libs/threejs/examples/js/shaders/SSAOShader",
			"libs/threejs/examples/js/postprocessing/MaskPass"
		],

		"libs/threejs/examples/js/controls/OrbitControls": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/controls/PathControls": [
			'libs/threejs/build/three',
			"libs/threejs/src/extras/animation/Animation"
		] ,
		"libs/threejs/src/extras/animation/Animation": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/shaders/SSAOShader": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/shaders/FXAAShader": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/shaders/CopyShader": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/postprocessing/RenderPass": ['libs/threejs/build/three'] ,
		"libs/threejs/examples/js/postprocessing/ShaderPass": ['libs/threejs/build/three'],
		"libs/threejs/examples/js/postprocessing/MaskPass":['libs/threejs/build/three'],
		"libs/threejs/examples/js/controls/TransformControls":['libs/threejs/build/three'],
		
		"libs/threejs/examples/js/ImprovedNoise": {
			exports:"ImprovedNoise"
		}
	
	}
});