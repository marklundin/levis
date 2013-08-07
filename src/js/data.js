define(['module'], function (module) {

	
	var api =  function( callback, errCallback ) {

	    require([ 
	    	"json!"+module.config().instagramUrl,
	    	"json!"+module.config().twitterUrl
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