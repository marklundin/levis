THREE.HemisphereLightHelper=function(e,t){THREE.Object3D.call(this);this.light=e;this.light.updateMatrixWorld();this.matrixWorld=e.matrixWorld;this.matrixAutoUpdate=!1;this.colors=[new THREE.Color,new THREE.Color];var i=new THREE.SphereGeometry(t,4,2);i.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI/2));for(var r=0,a=8;a>r;r++)i.faces[r].color=this.colors[4>r?0:1];var n=new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors,wireframe:!0});this.lightSphere=new THREE.Mesh(i,n);this.add(this.lightSphere);this.update()};THREE.HemisphereLightHelper.prototype=Object.create(THREE.Object3D.prototype);THREE.HemisphereLightHelper.prototype.update=function(){var e=new THREE.Vector3;return function(){this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity);this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity);this.lightSphere.lookAt(e.getPositionFromMatrix(this.light.matrixWorld).negate());this.lightSphere.geometry.colorsNeedUpdate=!0}}();