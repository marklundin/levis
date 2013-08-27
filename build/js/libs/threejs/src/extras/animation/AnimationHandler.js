THREE.AnimationHandler=function(){var e=[];var t={};var i={};i.update=function(t){for(var i=0;i<e.length;i++)e[i].update(t)};i.addToUpdate=function(t){if(-1===e.indexOf(t))e.push(t)};i.removeFromUpdate=function(t){var i=e.indexOf(t);if(-1!==i)e.splice(i,1)};i.add=function(e){if(void 0!==t[e.name])console.log("THREE.AnimationHandler.add: Warning! "+e.name+" already exists in library. Overwriting.");t[e.name]=e;n(e)};i.get=function(e){if("string"==typeof e)if(t[e])return t[e];else{console.log("THREE.AnimationHandler.get: Couldn't find animation "+e);return null}else;};i.parse=function(e){var t=[];if(e instanceof THREE.SkinnedMesh)for(var i=0;i<e.bones.length;i++)t.push(e.bones[i]);else r(e,t);return t};var r=function(e,t){t.push(e);for(var i=0;i<e.children.length;i++)r(e.children[i],t)};var n=function(e){if(e.initialized!==!0){for(var t=0;t<e.hierarchy.length;t++){for(var i=0;i<e.hierarchy[t].keys.length;i++){if(e.hierarchy[t].keys[i].time<0)e.hierarchy[t].keys[i].time=0;if(void 0!==e.hierarchy[t].keys[i].rot&&!(e.hierarchy[t].keys[i].rot instanceof THREE.Quaternion)){var r=e.hierarchy[t].keys[i].rot;e.hierarchy[t].keys[i].rot=new THREE.Quaternion(r[0],r[1],r[2],r[3])}}if(e.hierarchy[t].keys.length&&void 0!==e.hierarchy[t].keys[0].morphTargets){var n={};for(var i=0;i<e.hierarchy[t].keys.length;i++)for(var a=0;a<e.hierarchy[t].keys[i].morphTargets.length;a++){var o=e.hierarchy[t].keys[i].morphTargets[a];n[o]=-1}e.hierarchy[t].usedMorphTargets=n;for(var i=0;i<e.hierarchy[t].keys.length;i++){var s={};for(var o in n){for(var a=0;a<e.hierarchy[t].keys[i].morphTargets.length;a++)if(e.hierarchy[t].keys[i].morphTargets[a]===o){s[o]=e.hierarchy[t].keys[i].morphTargetsInfluences[a];break}if(a===e.hierarchy[t].keys[i].morphTargets.length)s[o]=0}e.hierarchy[t].keys[i].morphTargetsInfluences=s}}for(var i=1;i<e.hierarchy[t].keys.length;i++)if(e.hierarchy[t].keys[i].time===e.hierarchy[t].keys[i-1].time){e.hierarchy[t].keys.splice(i,1);i--}for(var i=0;i<e.hierarchy[t].keys.length;i++)e.hierarchy[t].keys[i].index=i}var l=parseInt(e.length*e.fps,10);e.JIT={};e.JIT.hierarchy=[];for(var t=0;t<e.hierarchy.length;t++)e.JIT.hierarchy.push(new Array(l));e.initialized=!0}};i.LINEAR=0;i.CATMULLROM=1;i.CATMULLROM_FORWARD=2;return i}();