THREE.DirectionalLightHelper=function(e,t){THREE.Object3D.call(this);this.light=e;this.light.updateMatrixWorld();this.matrixWorld=e.matrixWorld;this.matrixAutoUpdate=!1;var i=new THREE.PlaneGeometry(t,t);var r=new THREE.MeshBasicMaterial({wireframe:!0,fog:!1});r.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.lightPlane=new THREE.Mesh(i,r);this.add(this.lightPlane);i=new THREE.Geometry;i.vertices.push(new THREE.Vector3);i.vertices.push(new THREE.Vector3);i.computeLineDistances();r=new THREE.LineBasicMaterial({fog:!1});r.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.targetLine=new THREE.Line(i,r);this.add(this.targetLine);this.update()};THREE.DirectionalLightHelper.prototype=Object.create(THREE.Object3D.prototype);THREE.DirectionalLightHelper.prototype.update=function(){var e=new THREE.Vector3;return function(){e.getPositionFromMatrix(this.light.matrixWorld).negate();this.lightPlane.lookAt(e);this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.targetLine.geometry.vertices[1].copy(e);this.targetLine.geometry.verticesNeedUpdate=!0;this.targetLine.material.color.copy(this.lightPlane.material.color)}}();