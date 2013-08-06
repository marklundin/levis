
mat3 extractRotation( mat4 mat ){
 return mat3(
        mat[0][0], mat[0][1], mat[0][2],
        mat[1][0], mat[1][1], mat[1][2],
        mat[2][0], mat[2][1], mat[2][2]);
}


mat4 rotationMatrix(vec3 axis, float angle)
{
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}


uniform mat4 uInverseProjectionMatrix;

vec3 unproject( vec2 coord ){
    vec4 screen = vec4( coord, 1.0, 1.0 );//vec4( uv, depth , 1.0 );
    vec4 homogenous = uInverseProjectionMatrix * 2.0 * ( screen - vec4( 0.5 )  );
    return homogenous.xyz / homogenous.w; //transfer from homogeneous coordinates
}
