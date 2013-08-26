require([ "utils/domReady!",'require'], function( DOM, require ){
	
	var DEBUG = true,
		USE_CONCATENATED = true;

	require( [USE_CONCATENATED ? 'optimized' : 'main' ]);

})