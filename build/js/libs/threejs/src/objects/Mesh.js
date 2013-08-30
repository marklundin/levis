THREE.Mesh=function(e,t){THREE.Object3D.call(this),this.geometry=void 0!==e?e:new THREE.Geometry,this.material=void 0!==t?t:new THREE.MeshBasicMaterial({color:16777215*Math.random()}),this.updateMorphTargets()},THREE.Mesh.prototype=Object.create(THREE.Object3D.prototype),THREE.Mesh.prototype.updateMorphTargets=function(){if(this.geometry.morphTargets.length>0){this.morphTargetBase=-1,this.morphTargetForcedOrder=[],this.morphTargetInfluences=[],this.morphTargetDictionary={};for(var e=0,t=this.geometry.morphTargets.length;t>e;e++)this.morphTargetInfluences.push(0),this.morphTargetDictionary[this.geometry.morphTargets[e].name]=e}},THREE.Mesh.prototype.getMorphTargetIndexByName=function(e){return void 0!==this.morphTargetDictionary[e]?this.morphTargetDictionary[e]:(console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+e+" does not exist. Returning 0."),0)},THREE.Mesh.prototype.clone=function(e){return void 0===e&&(e=new THREE.Mesh(this.geometry,this.material)),THREE.Object3D.prototype.clone.call(this,e),e};