THREE.FilmPass=function(e,t,i,r){if(void 0===THREE.FilmShader)console.error("THREE.FilmPass relies on THREE.FilmShader");var n=THREE.FilmShader;this.uniforms=THREE.UniformsUtils.clone(n.uniforms);this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader});if(void 0!==r)this.uniforms.grayscale.value=r;if(void 0!==e)this.uniforms.nIntensity.value=e;if(void 0!==t)this.uniforms.sIntensity.value=t;if(void 0!==i)this.uniforms.sCount.value=i;this.enabled=!0;this.renderToScreen=!1;this.needsSwap=!0};THREE.FilmPass.prototype={render:function(e,t,i,r){this.uniforms["tDiffuse"].value=i;this.uniforms["time"].value+=r;THREE.EffectComposer.quad.material=this.material;if(this.renderToScreen)e.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera);else e.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,t,!1)}};