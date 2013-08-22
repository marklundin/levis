define( function(){

    const cos = Math.cos;
    const PI2 = 2.0 * Math.PI;
    const HALF_PI = Math.PI * 0.5;
    const DEG2RAD = Math.PI / 180.0;
    const RAD2DEG = 180.0 / Math.PI;
    const EPS = 10e-6;

    var math = {

        //Constants
        PI2 : PI2,
        HALF_PI : HALF_PI,
        DEG2RAD : DEG2RAD,
        RAD2DEG : RAD2DEG,
        EPS : EPS,


        /*
         * Linear interpolation of 'x' in range 'a'->'b'
         */
        lerp : function( x, a, b ){
            return a * ( 1 - x ) + b * x;
        },


        /*
         *  Cosine interpolation of 'x' in range 'a'->'b'
         */
        cosineInterpolation : function ( x, a, b ){
           var x2 = ( 1 - cos( x * Math.PI )) * 0.5;
           return a * ( 1 - x2 ) + b * x2;
        },


        /*
         * Maps 'n' from the range 'oA'->'oB' to the linear range 'dA'->'dB'
         */
        map : function ( n, oA, oB, dA, dB ) {
            return dA + ( n - oA ) * ( dB - dA ) / ( oB - oA );
        },


        /*
         * Normalizes 'n' from the given the range 'a'->'b'
         */
        normalize : function ( n, a, b ) {
            return math.map( n, a, b, 0, 1 );
        },


        /*
         * Clamp 'n' to range 'a'->'b'
         */
        clamp: function ( n, a, b ) {

            return ( n < a ) ? a : ( ( n > b ) ? b : n );

        },

        random: function(min, max) {
            return (max === undefined) ? Math.random() * min : Math.random() * (max - min) + min
        }

    }

    return  math;

});