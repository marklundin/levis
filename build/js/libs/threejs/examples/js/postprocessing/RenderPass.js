THREE.RenderPass=function(e,t,i,r,n){this.scene=e;this.camera=t;this.overrideMaterial=i;this.clearColor=r;this.clearAlpha=void 0!==n?n:1;this.oldClearColor=new THREE.Color;this.oldClearAlpha=1;this.enabled=!0;this.clear=!0;this.needsSwap=!1};THREE.RenderPass.prototype={render:function(e,t,i){this.scene.overrideMaterial=this.overrideMaterial;if(this.clearColor){this.oldClearColor.copy(e.getClearColor());this.oldClearAlpha=e.getClearAlpha();e.setClearColor(this.clearColor,this.clearAlpha)}e.render(this.scene,this.camera,i,this.clear);if(this.clearColor)e.setClearColor(this.oldClearColor,this.oldClearAlpha);this.scene.overrideMaterial=null}};