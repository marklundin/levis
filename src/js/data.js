define(['module'], function (module) {

	
	var api =  function( callback, errCallback ) {

	    require([ 
	    	// module.config().instagram.feed + "&callback=define",
	    	// module.config().twitter.feed + "&callback=define",
	    	'json!instagram-data.json',
	    	'json!twitter-data.json'
	    	], function( instagramData, twitterData ){

	    		twitterData.loaded 		= twitterData.status === 'OK';
	    		instagramData.loaded 	= instagramData.status === 'OK';
	    		var loaded = instagramData.loaded && twitterData.loaded;

	    		if( loaded ) callback( twitterData, instagramData )
	    		else errCallback( instagramData, twitterData );

	    });

	}

	api.search = function( term, callback ){


		require([ 
	    	// module.config().instagram.search + term + "&callback=define&bust="+Date.now(),
	    	// module.config().twitter.search + term + "&callback=define&bust="+Date.now(),
	    	'json!instagram-data.json',
	    	'json!twitter-data.json'
	    	], function( instagramData, twitterData ){

	    		twitterData.loaded 		= twitterData.status === 'OK';
	    		instagramData.loaded 	= instagramData.status === 'OK';
	    		var loaded = instagramData.loaded && twitterData.loaded;

	    		if( loaded ) callback( twitterData.results, instagramData.results );
	    		else errCallback( instagramData, twitterData );

	    });


	}

	return api;


})