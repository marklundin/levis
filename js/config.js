requirejs.config( {

	name: 'main',
	baseUrl: 'js',

	paths: {
        "glsl": "loaders/glsl",
        "text": "loaders/text",
        "json": "loaders/json",
        "template": "loaders/template",
	},

	shim:{
		"libs/build/three.js":{
			exports: "THREE"
		}
	}


});