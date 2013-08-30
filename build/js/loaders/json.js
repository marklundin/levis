/** @license
 * RequireJS plugin for loading JSON files
 * - depends on Text plugin and it was HEAVILY "inspired" by it as well.
 * Author: Miller Medeiros
 * Version: 0.3.1 (2013/02/04)
 * Released under the MIT license
 */

define(["text"],function(text){function cacheBust(e){return e=e.replace(CACHE_BUST_FLAG,""),e+=e.indexOf("?")<0?"?":"&",e+CACHE_BUST_QUERY_PARAM+"="+Math.round(2147483647*Math.random())}var CACHE_BUST_QUERY_PARAM="bust",CACHE_BUST_FLAG="!bust",jsonParse="undefined"!=typeof JSON&&"function"==typeof JSON.parse?JSON.parse:function(val){return eval("("+val+")")},buildMap={};return{load:function(e,t,i,r){!r.isBuild||r.inlineJSON!==!1&&-1===e.indexOf(CACHE_BUST_QUERY_PARAM+"=")?text.get(t.toUrl(e),function(t){r.isBuild?(buildMap[e]=t,i(t)):i(jsonParse(t))},i.error,{accept:"application/json"}):i(null)},normalize:function(e){return-1===e.indexOf(CACHE_BUST_FLAG)?e:cacheBust(e)},write:function(e,t,i){if(t in buildMap){var r=buildMap[t];i('define("'+e+"!"+t+'", function(){ return '+r+";});\n")}}}});