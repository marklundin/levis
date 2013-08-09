define(['module'], function (module) {

	
	var api =  function( callback, errCallback ) {

	    require([ 
	    	module.config().instagramUrl + "&callback=define",
	    	module.config().twitterUrl + "&callback=define",
	    	], function( instagramData, twitterData ){

	    		twitterData.loaded 		= twitterData.status === 'OK';
	    		instagramData.loaded 	= instagramData.status === 'OK';
	    		var loaded = instagramData.loaded && twitterData.loaded;

	    		if( loaded ) callback( twitterData, instagramData )
	    		else errCallback( instagramData, twitterData );

	    });

	}

	return api;


})