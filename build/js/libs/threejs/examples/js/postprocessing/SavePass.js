THREE.SavePass=function(e){void 0===THREE.CopyShader&&console.error("THREE.SavePass relies on THREE.CopyShader");var t=THREE.CopyShader;this.textureID="tDiffuse",this.uniforms=THREE.UniformsUtils.clone(t.uniforms),this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.renderTarget=e,void 0===this.renderTarget&&(this.renderTargetParameters={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat,stencilBuffer:!1},this.renderTarget=new THREE.WebGLRenderTarget(window.innerWidth,window.innerHeight,this.renderTargetParameters)),this.enabled=!0,this.needsSwap=!1,this.clear=!1},THREE.SavePass.prototype={render:function(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i),THREE.EffectComposer.quad.material=this.material,e.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,this.renderTarget,this.clear)}};