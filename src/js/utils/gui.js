define([
    "libs/datgui"
    ], function(){
        return DEBUG ? new dat.GUI( {autoPlace:false}) : {

        	// Stubs
        	addFolder: function(){},
        	removeFolder: function(){},
        	add: function(){},
        	remove: function(){},
        	remove: function(){}, 

        };
    }
)