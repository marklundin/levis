THREE.VTKLoader=function(){},THREE.VTKLoader.prototype={constructor:THREE.VTKLoader,load:function(e,t){var i=this,r=new XMLHttpRequest;r.addEventListener("load",function(e){var r=i.parse(e.target.responseText);i.dispatchEvent({type:"load",content:r}),t&&t(r)},!1),r.addEventListener("progress",function(e){i.dispatchEvent({type:"progress",loaded:e.loaded,total:e.total})},!1),r.addEventListener("error",function(){i.dispatchEvent({type:"error",message:"Couldn't load URL ["+e+"]"})},!1),r.open("GET",e,!0),r.send(null)},parse:function(e){function t(e,t,i){a.vertices.push(new THREE.Vector3(e,t,i))}function i(e,t,i){a.faces.push(new THREE.Face3(e,t,i))}function r(e,t,i,r){a.faces.push(new THREE.Face4(e,t,i,r))}var n,o,a=new THREE.Geometry;for(n=/([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)/g;null!=(o=n.exec(e));)t(parseFloat(o[1]),parseFloat(o[2]),parseFloat(o[3]));for(n=/3[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;null!=(o=n.exec(e));)i(parseInt(o[1]),parseInt(o[2]),parseInt(o[3]));for(n=/4[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;null!=(o=n.exec(e));)r(parseInt(o[1]),parseInt(o[2]),parseInt(o[3]),parseInt(o[4]));return a.computeCentroids(),a.computeFaceNormals(),a.computeVertexNormals(),a.computeBoundingSphere(),a}},THREE.EventDispatcher.prototype.apply(THREE.VTKLoader.prototype);