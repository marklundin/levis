THREE.ParticleBasicMaterial=function(e){THREE.Material.call(this),this.color=new THREE.Color(16777215),this.map=null,this.size=1,this.sizeAttenuation=!0,this.vertexColors=!1,this.fog=!0,this.setValues(e)},THREE.ParticleBasicMaterial.prototype=Object.create(THREE.Material.prototype),THREE.ParticleBasicMaterial.prototype.clone=function(){var e=new THREE.ParticleBasicMaterial;return THREE.Material.prototype.clone.call(this,e),e.color.copy(this.color),e.map=this.map,e.size=this.size,e.sizeAttenuation=this.sizeAttenuation,e.vertexColors=this.vertexColors,e.fog=this.fog,e};