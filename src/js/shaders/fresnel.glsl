
//# Vertex
//! VERTEX

varying vec3 vViewPosition;
varying vec3 vNormal;

{map_pars_vertex}
{lightmap_pars_vertex}
{envmap_pars_vertex}
{lights_phong_pars_vertex}
{color_pars_vertex}
{morphtarget_pars_vertex}
{skinning_pars_vertex}
{shadowmap_pars_vertex}


void main() {

	{map_vertex}
	{lightmap_vertex}
	{color_vertex}

	{morphnormal_vertex}
	{skinbase_vertex}
	{skinnormal_vertex}
	{defaultnormal_vertex}

	vNormal = normalize( transformedNormal );

	{morphtarget_vertex}
	{skinning_vertex}
	{default_vertex}
	
	vViewPosition = -mvPosition.xyz;

	{worldpos_vertex}
	{envmap_vertex}
	{lights_phong_vertex}
	{shadowmap_vertex}

}


//# TTFragment
//! FRAGMENT

#define FRESNEL 0.6


uniform vec3 diffuse;
uniform float opacity;
uniform vec3 ambient;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;

// uniform sampler2D map;
// uniform sampler2D tDepth;

// uniform vec3 fogColor;
// uniform float fogNear;
// uniform float fogFar;

// uniform float opacity;
// // uniform float useClouds;
// uniform float offset;
// uniform float exponent;

// // varying vec3 vNormal;
// varying vec2 vUv;
// varying vec4 vPosition;
// uniform mat4 modelMatrix;


{color_pars_fragment}
{map_pars_fragment}
{lightmap_pars_fragment}
{envmap_pars_fragment}
{fog_pars_fragment}
{lights_phong_pars_fragment}
{shadowmap_pars_fragment}
{bumpmap_pars_fragment}
{normalmap_pars_fragment}
{specularmap_pars_fragment}



void main() {

	// float specularStrength = 1.0;

	// float depth 		= gl_FragCoord.z / gl_FragCoord.w;
	// float fogFactor 	= smoothstep( fogNear, fogFar, depth );
	// vec4 position = modelMatrix * vPosition;
	// vec3 cameraToVertex = normalize( position.xyz - cameraPosition );

	// vec3 normal = normalize( vNormal );

	// // Fresnel term
 //    float theta       = clamp( dot( -cameraToVertex, normal ), 0.0, 1.0 );
 //    float reflectance = FRESNEL * pow( theta , 8.0 );



	// // float depth = unpackDepth( texture2D( tDepth, vUv ) );
	// // gl_FragColor = vec4( vec3( depth ), 1.0 );
	// // gl_FragColor = texture2D( map, vUv );
	// // gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
	// // gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

	// // gl_FragColor = vec4( 1.0, 0.0, 0.0,  pow( fogFactor, 1.0 ));
	// // gl_FragColor.a *= pow( gl_FragCoord.z, 20.0 );

	// // float depth = gl_FragCoord.z / gl_FragCoord.w;
	// // float fogFactor = smoothstep( fogNear, fogFar, depth );

	// gl_FragColor = vec4( vec3( 1.0 ), reflectance );

	gl_FragColor = vec4( vec3 ( 1.0 ), opacity );

	{map_fragment}
	{alphatest_fragment}
	{specularmap_fragment}

	{lights_phong_fragment}

	{lightmap_fragment}
	{color_fragment}
	{envmap_fragment}
	{shadowmap_fragment}
	{linear_to_gamma_fragment}
	{fog_fragment}

}

