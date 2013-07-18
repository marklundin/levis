
//# Vertex
//! VERTEX


void main( void ) {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}


//# TTFragment
//! FRAGMENT

// uniform sampler2D   uTexture;
// uniform vec2        uViewport;

void main( void ) {
    gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );//texture2D( uTexture, gl_FragCoord.xy / uViewport );
}

