THREE.GeometryLoader=function(e){this.manager=void 0!==e?e:THREE.DefaultLoadingManager};THREE.GeometryLoader.prototype={constructor:THREE.GeometryLoader,load:function(e,t){var i=this;var r=new THREE.XHRLoader;r.setCrossOrigin(this.crossOrigin);r.load(e,function(e){t(i.parse(JSON.parse(e)))})},setCrossOrigin:function(e){this.crossOrigin=e},parse:function(){}};