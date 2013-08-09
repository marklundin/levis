define([
    "libs/datgui"
    ], function(){
        return DEBUG ? new dat.GUI() : {

        	// Stubs
        	addFolder: function(){},
        	removeFolder: function(){},
        	add: function(){},
        	remove: function(){},
        	remove: function(){}, 

        };
    }
)