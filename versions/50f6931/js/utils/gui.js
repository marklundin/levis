define([
    "libs/datgui",
    "purl"
    ], function(){
        return !DEBUG || $.url().param('gui') === undefined ? null : new dat.GUI( {autoPlace:false});
    }
)