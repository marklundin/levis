THREE.Sprite=function(e){THREE.Object3D.call(this),this.material=void 0!==e?e:new THREE.SpriteMaterial,this.rotation3d=this.rotation,this.rotation=0},THREE.Sprite.prototype=Object.create(THREE.Object3D.prototype),THREE.Sprite.prototype.updateMatrix=function(){this.rotation3d.set(0,0,this.rotation,this.rotation3d.order),this.quaternion.setFromEuler(this.rotation3d),this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},THREE.Sprite.prototype.clone=function(e){return void 0===e&&(e=new THREE.Sprite(this.material)),THREE.Object3D.prototype.clone.call(this,e),e};