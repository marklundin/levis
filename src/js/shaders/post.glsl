
//# Vertex
//! VERTEX

varying vec2 vUv;

void main() {

	vUv = uv;
	gl_Position = vec4( position, 1.0 );

}


//# TTFragment
//! FRAGMENT


uniform float uFrequency;
uniform float opacity;
uniform float uResolution;
uniform float uTime;

uniform float vignetteAmount;

varying vec2 vUv;

// noise effect intensity value (0 = no effect, 1 = full effect)
const float fNintensity = 0.35;
// scanlines effect intensity value (0 = no effect, 1 = full effect)
const float fSintensity = 0.2;
// scanlines effect count value (0 = no effect, 4096 = full effect)
const float fScount = 2048.0;

{{ libs/vignette.glsl }}


void main() {

	vec4 color = vec4(0.0);
	color.a = vignette( vUv ) * vignetteAmount;

	
	// // sample the source
 //        vec4 cTextureScreen = texture2D(uSamplerDiffuse, vTextureCoord);

 //        // make some noise
 //        float x = vTextureCoord.x * vTextureCoord.y * uTimer *  1000.0;
 //        x = mod(x, 13.0) * mod(x, 123.0);
 //        float dx = mod(x, 0.01);

 //        // add noise
 //        vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp(0.1 + dx * 100.0, 0.0,1.0);

 //        // get us a sine and cosine
 //        vec2 sc = vec2(sin(vTextureCoord.y * fScount), cos(vTextureCoord.y * fScount));

 //        // add scanlines
 //        cResult += cTextureScreen.rgb * vec3(sc.x, sc.y, sc.x) * fSintensity;
        
 //        // interpolate between source and result by intensity
 //        cResult = cTextureScreen.rgb + clamp(fNintensity, 0.0,1.0)*(cResult-cTextureScreen.rgb);

 //        // convert to grayscale if desired
 //        //cResult = vec3(cResult.r * 0.3f + cResult.g * 0.59f + cResult.b * 0.11f);

 //        gl_FragColor =  vec4(cResult, cTextureScreen.a);


	gl_FragColor = color;

}

