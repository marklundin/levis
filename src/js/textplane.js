define([
		"libs/threejs/build/three"
	],function(){

		var DIMENSION = 1500;

		
         // document.body.appendChild( canvas );

        function wrapText(context, text, x, y, maxWidth, lineHeight) {


	        var words = text.split(' ');
	        var linebreaks = text;
	        var line = '';

	        for(var n = 0; n < words.length; n++) {
	          var testLine = line + words[n] + ' ';
	          var metrics = context.measureText(testLine);
	          var testWidth = metrics.width;
	          if ( testWidth > maxWidth && n > 0  || words[n].split('\n').length > 1 ) {
	            context.fillText(line, x, y);
	            line = words[n] + ' ';
	            y += lineHeight * (words[n].split('\n').length > 1 ? 2.0 : 1.0 );
	          }
	          else {
	            line = testLine;
	          }
	        }
	        context.fillText(line, x, y);
      	}

        return function (text, size, color, backGroundColor, backGroundAlpha, backgroundMargin ) {

        	var canvas 	= document.createElement( 'canvas' ),
				context = canvas.getContext( '2d' );

			canvas.width = DIMENSION;
			canvas.height = DIMENSION;

			backgroundMargin 	= backgroundMargin || 0
			size 				= size || 11;
			color 				= color || 0x000000;
			backGroundColor 	= backGroundColor || 0xFFFFFF;
			backGroundAlpha		= backGroundAlpha || 0.5;
			
			context.font = size + "pt Helvertica Neue, Arial, sans";
			context.scale(-1, -1);

			var textWidth = context.measureText(text).width;

			// canvas.width = DIMENSION * 3;//textWidth + backgroundMargin;
			// canvas.height = DIMENSION * 3;//size + backgroundMargin;
			context = canvas.getContext("2d");
			context.textAlign = 'center';
			context.font = size + "pt Helvertica Neue, Arial, sans";

			// if(backGroundColor) {
			// context.globalAlpha = 0.0
			context.fillStyle = ( '000000' + backGroundColor.toString( 16 ) ).slice( - 6 );
			// context.fillRect(canvas.width / 2 - textWidth / 2 - backgroundMargin / 2, canvas.height / 2 - size / 2 - +backgroundMargin / 2, textWidth + backgroundMargin, size + backgroundMargin);
			context.fillRect(0, 0, -canvas.width, -canvas.height );
			// context.globalAlpha = 1.0;
			// }

			context.textBaseline = "middle";
			context.fillStyle = ( '000000' + color.toString( 16 ) ).slice( - 6 );
			// context.fillText(text, canvas.height / 2, canvas.height / 2 );
			wrapText( context, text, canvas.width*-0.5, canvas.height*-0.5, canvas.width * 0.3, 31 );

			// context.strokeStyle = "black";
			// context.strokeRect(0, 0, canvas.width, canvas.height);

			var texture = new THREE.Texture( canvas );
			texture.needsUpdate = true;

			// var material = new THREE.MeshBasicMaterial({
			// 	map : texture,
			// 	transparent: backGroundAlpha < 1.0
			// });

			// var mesh = new THREE.Mesh( new THREE.PlaneGeometry( DIMENSION, DIMENSION ), material );
			// mesh.overdraw = true;
			// mesh.doubleSided = true;
			// mesh.position.x = x - canvas.width;
			// mesh.position.y = y - canvas.height;
			// mesh.position.z = z;

			return canvas;

		}

	
});