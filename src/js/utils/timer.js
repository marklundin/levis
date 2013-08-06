define(function(){

    var timer = {

        //Private utility methods
        now : function(){
            return window.performance && window.performance.now ? ( performance.now() + performance.timing.navigationStart ) : Date.now();
        },

        isHighPrecision : function (){
            return timer.now() < 1e12
        }

    }

    return timer;

});