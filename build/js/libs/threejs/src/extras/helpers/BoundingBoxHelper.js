THREE.BoundingBoxHelper=function(e,t){var i=t||8947848;this.object=e;this.box=new THREE.Box3;THREE.Mesh.call(this,new THREE.CubeGeometry(1,1,1),new THREE.MeshBasicMaterial({color:i,wireframe:!0}))};THREE.BoundingBoxHelper.prototype=Object.create(THREE.Mesh.prototype);THREE.BoundingBoxHelper.prototype.update=function(){this.box.setFromObject(this.object);this.box.size(this.scale);this.box.center(this.position)};