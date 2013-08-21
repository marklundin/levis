define([
    "libs/datgui",
    "purl"
    ], function(){
        return $.url().param('gui') === undefined ? null : new dat.GUI( {autoPlace:false});
    }
)