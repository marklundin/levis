THREE.Scene=function(){THREE.Object3D.call(this),this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,this.matrixAutoUpdate=!1,this.__objects=[],this.__lights=[],this.__objectsAdded=[],this.__objectsRemoved=[]},THREE.Scene.prototype=Object.create(THREE.Object3D.prototype),THREE.Scene.prototype.__addObject=function(e){if(e instanceof THREE.Light)-1===this.__lights.indexOf(e)&&this.__lights.push(e),e.target&&void 0===e.target.parent&&this.add(e.target);else if(!(e instanceof THREE.Camera||e instanceof THREE.Bone)&&-1===this.__objects.indexOf(e)){this.__objects.push(e),this.__objectsAdded.push(e);var t=this.__objectsRemoved.indexOf(e);-1!==t&&this.__objectsRemoved.splice(t,1)}for(var i=0;i<e.children.length;i++)this.__addObject(e.children[i])},THREE.Scene.prototype.__removeObject=function(e){if(e instanceof THREE.Light){var t=this.__lights.indexOf(e);-1!==t&&this.__lights.splice(t,1)}else if(!(e instanceof THREE.Camera)){var t=this.__objects.indexOf(e);if(-1!==t){this.__objects.splice(t,1),this.__objectsRemoved.push(e);var i=this.__objectsAdded.indexOf(e);-1!==i&&this.__objectsAdded.splice(i,1)}}for(var r=0;r<e.children.length;r++)this.__removeObject(e.children[r])},THREE.Scene.prototype.clone=function(e){return void 0===e&&(e=new THREE.Scene),THREE.Object3D.prototype.clone.call(this,e),null!==this.fog&&(e.fog=this.fog.clone()),null!==this.overrideMaterial&&(e.overrideMaterial=this.overrideMaterial.clone()),e.autoUpdate=this.autoUpdate,e.matrixAutoUpdate=this.matrixAutoUpdate,e};