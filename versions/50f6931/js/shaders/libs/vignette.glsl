uniform float vignetteEnd;//     = 1.1;      //vignetting outer border
uniform float vignetteStart;//      = 0.0;      //vignetting inner border

float vignette( vec2 uv )
{
    float dist = distance( uv, vec2( 0.5, 0.5 ) );
    dist = smoothstep( vignetteStart, vignetteEnd, dist);
    return clamp(dist,0.0,1.0);
}