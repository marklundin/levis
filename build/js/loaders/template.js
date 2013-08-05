define(['text'], function (text) {

        var buildMap = []


        function getTemplate( req, path, t ){

            var matches = t.match( /\{\{(.+?)\}\}/g );
            if( matches === null ) return null;

            var modules  = matches.slice(0),
                l        = modules.length,
                i        = 0;

            while( i < l )
            {
                modules[i] = "template!" + path + modules[i].replace(/\s/g, '').replace(/\{\{/g, '').replace(/\}\}/g, '' );

                i++;
            }

            return {
                modules: modules,
                matches: matches
            }
        }

        var template = {


            write: function (pluginName, moduleName, write, config) {
                if (buildMap.hasOwnProperty(moduleName)) {
                    var content = template.jsEscape(buildMap[moduleName]);
                    write.asModule(pluginName + "!" + moduleName,
                                   "define(function () { return '" +
                                       content +
                                   "';});\n");
                }
            },


            load: function( name, req, onload, config ) {

                text.get( req.toUrl( name ), function( content ) {

                    var path = name.split('/');
                    path = path.slice( 0, path.length - 1 ).join('/') + "/";

                    var templates = getTemplate( req, path, content );
                    if( !templates ){
                        if (config.isBuild) buildMap[path] = content;
                        onload( content );
                        return;
                    }

                    req( templates.modules, function(){

                        var i = templates.matches.length;
                        while( i-- > 0 ){
                            content = content.split( templates.matches[i] ).join( arguments[i] );
                        }

                        if (config.isBuild) {
                            buildMap[path] = content;
                        }
                        onload( content );
                    })


                });
            }
        }

        return template;

    }
);