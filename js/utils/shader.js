define( function(){

	var FRAGMENT_PREFIX = "#ifdef GL_ES\nprecision highp float;\n#endif\n";
	var STATIC_VERTEX_SHADER = 
	[
		"attribute highp vec2 aVertex;",
    
      	"void main(void) {",

        	"gl_Position = vec4( aVertex, 1.0, 1.0);",        	

        "}"

	].join("\n");

	var vertices = new Float32Array([
			-1.0, -1.0,
			 1.0, -1.0,
			 1.0,  1.0,
			-1.0,  1.0,
		]),
		indices = new Uint16Array([
			0, 1, 3,
			3, 1, 2
		]);

	function create( width, height, fragmentSource, preserveDrawingBuffer ){

		var canvas 	 = document.createElement( 'canvas' ),
			pixRatio = window.devicePixelRatio || 1;

		// pixRatio = 1.0;
		// canvas.style.width 	= width + 'px';
		// canvas.style.height = height + 'px';
		// canvas.width  = width * pixRatio;
		// canvas.height = height * pixRatio;

		var gl 		 = canvas.getContext( 'experimental-webgl', { alpha:                 true, 
                                                                  depth:                 false, 
                                                                  antialias:             false,
                                                                  stencil:               false,
                                                                  preserveDrawingBuffer: preserveDrawingBuffer || false} ),
			vShader  = gl.createShader( gl.VERTEX_SHADER ),
			fShader  = gl.createShader( gl.FRAGMENT_SHADER ),
			program  = gl.createProgram();

		gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );

		function size( w, h ){
			console.log( w, h )
			canvas.style.width 	= w + 'px';
			canvas.style.height = h + 'px';
			canvas.width  = w * pixRatio;
			canvas.height = h * pixRatio;
			gl.uniform2fv( program.uResolution, [ w * pixRatio, h * pixRatio] );
			gl.viewport(0, 0, w * pixRatio, h * pixRatio );
		}

		size( width, height );
		
		// Setup context params
		
		gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
    	gl.disable( gl.DEPTH_TEST );

    	// Shaders

    		// Vertex shader
	    	gl.shaderSource( vShader, STATIC_VERTEX_SHADER );
	      	gl.compileShader( vShader );

	      	// fragment shader
	      	gl.shaderSource( fShader, FRAGMENT_PREFIX + fragmentSource );
	      	gl.compileShader( fShader );

	      	// check compilation
	      	if (!gl.getShaderParameter( fShader, gl.COMPILE_STATUS)) {
				console.error( "You fucked up... " + gl.getShaderInfoLog( fShader ));
				return null;
			}

	      	// link
	        gl.attachShader( program, vShader );
	        gl.attachShader( program, fShader );
	        gl.linkProgram(  program );
			gl.useProgram(   program );

	        program.aVertex = gl.getAttribLocation( program, "aVertex" );
	        gl.enableVertexAttribArray( program.aVertex );

	        program.uResolution   	= gl.getUniformLocation( program, "uResolution" );
	        program.uTime 			= gl.getUniformLocation( program, "uTime" );

        	

        // Buffers

        	//verts
			gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
			gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );
			gl.vertexAttribPointer( program.aVertex, 2, gl.FLOAT, false, 0, 0 );

			//indices
			gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer() );
			gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW );

		
		//

		return {
			draw : function ( t ){

				gl.uniform1fv( program.uTime, [t||0.0] );
				gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );

				
			},
			size: size,
			gl: gl,
			getUniformLocation:function( uniform ){
				return gl.getUniformLocation( program, uniform );
			},
			uniformFloat:function( uniform, value ){
				gl.uniform1fv( uniform, [value] );
			},
			domElement: canvas
		}
	}


	return{
		create: create
	}

})