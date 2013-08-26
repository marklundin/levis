define( {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    inQuad: function (t) { return t*t },
    // decelerating to zero velocity
    outQuad: function (t) { return t*(2-t) },
    // acceleration until halfway, then deceleration
    inOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    // accelerating from zero velocity 
    inCubic: function (t) { return t*t*t },
    // decelerating to zero velocity 
    outCubic: function (t) { return (--t)*t*t+1 },
    // acceleration until halfway, then deceleration 
    inOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    // accelerating from zero velocity 
    inQuart: function (t) { return t*t*t*t },
    // decelerating to zero velocity 
    outQuart: function (t) { return 1-(--t)*t*t*t },
    // acceleration until halfway, then deceleration
    inOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    // accelerating from zero velocity
    inQuint: function (t) { return t*t*t*t*t },
    // decelerating to zero velocity
    outQuint: function (t) { return 1+(--t)*t*t*t*t },
    // acceleration until halfway, then deceleration 
    inOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
})