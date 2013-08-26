/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Film grain & scanlines shader
 *
 * - ported from HLSL to WebGL / GLSL
 * http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
 *
 * Screen Space Static Postprocessor
 *
 * Produces an analogue noise overlay similar to a film grain / TV static
 *
 * Original implementation and noise algorithm
 * Pat 'Hawthorne' Shearon
 *
 * Optimized scanlines + noise version with intensity scaling
 * Georg 'Leviathan' Steinrohder
 *
 * This version is provided under a Creative Commons Attribution 3.0 License
 * http://creativecommons.org/licenses/by/3.0/
 */

THREE.FilmShader={uniforms:{tDiffuse:{type:"t",value:null},time:{type:"f",value:0},nIntensity:{type:"f",value:.5},sIntensity:{type:"f",value:.05},sCount:{type:"f",value:4096},grayscale:{type:"i",value:1}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform float time;","uniform bool grayscale;","uniform float nIntensity;","uniform float sIntensity;","uniform float sCount;","uniform sampler2D tDiffuse;","varying vec2 vUv;","void main() {","vec4 cTextureScreen = texture2D( tDiffuse, vUv );","float x = vUv.x * vUv.y * time *  1000.0;","x = mod( x, 13.0 ) * mod( x, 123.0 );","float dx = mod( x, 0.01 );","vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );","vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );","cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;","cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );","if( grayscale ) {","cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );","}","gl_FragColor =  vec4( cResult, cTextureScreen.a );","}"].join("\n")};