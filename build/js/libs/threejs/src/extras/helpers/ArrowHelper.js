THREE.ArrowHelper=function(e,t,i,r){THREE.Object3D.call(this),void 0===r&&(r=16776960),void 0===i&&(i=1),this.position=t;var o=new THREE.Geometry;o.vertices.push(new THREE.Vector3(0,0,0)),o.vertices.push(new THREE.Vector3(0,1,0)),this.line=new THREE.Line(o,new THREE.LineBasicMaterial({color:r})),this.line.matrixAutoUpdate=!1,this.add(this.line);var n=new THREE.CylinderGeometry(0,.05,.25,5,1);n.applyMatrix((new THREE.Matrix4).makeTranslation(0,.875,0)),this.cone=new THREE.Mesh(n,new THREE.MeshBasicMaterial({color:r})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i)},THREE.ArrowHelper.prototype=Object.create(THREE.Object3D.prototype),THREE.ArrowHelper.prototype.setDirection=function(){var e,t=new THREE.Vector3;return function(i){i.y>.99999?this.quaternion.set(0,0,0,1):i.y<-.99999?this.quaternion.set(1,0,0,0):(t.set(i.z,0,-i.x).normalize(),e=Math.acos(i.y),this.quaternion.setFromAxisAngle(t,e))}}(),THREE.ArrowHelper.prototype.setLength=function(e){this.scale.set(e,e,e)},THREE.ArrowHelper.prototype.setColor=function(e){this.line.material.color.setHex(e),this.cone.material.color.setHex(e)};