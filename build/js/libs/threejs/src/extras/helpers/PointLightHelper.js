THREE.PointLightHelper=function(e,t){this.light=e;this.light.updateMatrixWorld();var i=new THREE.SphereGeometry(t,4,2);var r=new THREE.MeshBasicMaterial({wireframe:!0,fog:!1});r.color.copy(this.light.color).multiplyScalar(this.light.intensity);THREE.Mesh.call(this,i,r);this.matrixWorld=this.light.matrixWorld;this.matrixAutoUpdate=!1};THREE.PointLightHelper.prototype=Object.create(THREE.Mesh.prototype);THREE.PointLightHelper.prototype.update=function(){this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)};