THREE.MaterialLoader=function(e){this.manager=void 0!==e?e:THREE.DefaultLoadingManager};THREE.MaterialLoader.prototype={constructor:THREE.MaterialLoader,load:function(e,t){var i=this;var r=new THREE.XHRLoader;r.setCrossOrigin(this.crossOrigin);r.load(e,function(e){t(i.parse(JSON.parse(e)))})},setCrossOrigin:function(e){this.crossOrigin=e},parse:function(e){var t;switch(e.type){case"MeshBasicMaterial":t=new THREE.MeshBasicMaterial({color:e.color,opacity:e.opacity,transparent:e.transparent,wireframe:e.wireframe});break;case"MeshLambertMaterial":t=new THREE.MeshLambertMaterial({color:e.color,ambient:e.ambient,emissive:e.emissive,opacity:e.opacity,transparent:e.transparent,wireframe:e.wireframe});break;case"MeshPhongMaterial":t=new THREE.MeshPhongMaterial({color:e.color,ambient:e.ambient,emissive:e.emissive,specular:e.specular,shininess:e.shininess,opacity:e.opacity,transparent:e.transparent,wireframe:e.wireframe});break;case"MeshNormalMaterial":t=new THREE.MeshNormalMaterial({opacity:e.opacity,transparent:e.transparent,wireframe:e.wireframe});break;case"MeshDepthMaterial":t=new THREE.MeshDepthMaterial({opacity:e.opacity,transparent:e.transparent,wireframe:e.wireframe})}if(void 0!==e.vertexColors)t.vertexColors=e.vertexColors;return t}};