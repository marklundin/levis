
//# Vertex
//! VERTEX

varying vec2 vUv;

void main() {

	vUv = uv;
	gl_Position = vec4( position, 1.0 );

}


//# TTFragment
//! FRAGMENT


uniform float opacity;
uniform float uTime;

uniform float vignetteAmount;
uniform vec3 vignColor;

varying vec2 vUv;

// noise effect intensity value (0 = no effect, 1 = full effect)
uniform float fNintensity;
// scanlines effect intensity value (0 = no effect, 1 = full effect)
uniform float fSintensity;
// scanlines effect count value (0 = no effect, 4096 = full effect)
uniform float fScount;

uniform vec3 noiseColor;

{{ libs/vignette.glsl }}


void main() {

	// vec4 color = vec4(0.0);
	float vign = vignette( vUv ) * vignetteAmount;

	
	// sample the source    
    vec4 cTextureScreen = vec4( noiseColor, opacity );

     // make some noise
    float x = vUv.x * vUv.y * uTime *  1000.0;
    x = mod(x, 13.0) * mod(x, 123.0);
    float dx = mod(x, 0.01);

    // add noise
    vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp(0.1 + dx * 100.0, 0.0,1.0);

    // get us a sine and cosine
    vec2 sc = vec2(sin(vUv.y * fScount), cos(vUv.y * fScount));

    // add scanlines
    cResult += cTextureScreen.rgb * vec3(sc.x, sc.y, sc.x) * fSintensity;
    
    // interpolate between source and result by intensity
    cResult = cTextureScreen.rgb + clamp(fNintensity, 0.0,1.0)*(cResult-cTextureScreen.rgb);

    // convert to grayscale if desired
    //cResult = vec3(cResult.r * 0.3f + cResult.g * 0.59f + cResult.b * 0.11f);

    gl_FragColor = vec4( mix( cResult, vignColor, vign ), max( opacity, vign ));

	// gl_FragColor = color;

}

