THREE.BloomPass=function(e,t,i,r){e=void 0!==e?e:1;t=void 0!==t?t:25;i=void 0!==i?i:4;r=void 0!==r?r:256;var n={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat};this.renderTargetX=new THREE.WebGLRenderTarget(r,r,n);this.renderTargetY=new THREE.WebGLRenderTarget(r,r,n);if(void 0===THREE.CopyShader)console.error("THREE.BloomPass relies on THREE.CopyShader");var o=THREE.CopyShader;this.copyUniforms=THREE.UniformsUtils.clone(o.uniforms);this.copyUniforms["opacity"].value=e;this.materialCopy=new THREE.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,blending:THREE.AdditiveBlending,transparent:!0});if(void 0===THREE.ConvolutionShader)console.error("THREE.BloomPass relies on THREE.ConvolutionShader");var a=THREE.ConvolutionShader;this.convolutionUniforms=THREE.UniformsUtils.clone(a.uniforms);this.convolutionUniforms["uImageIncrement"].value=THREE.BloomPass.blurx;this.convolutionUniforms["cKernel"].value=THREE.ConvolutionShader.buildKernel(i);this.materialConvolution=new THREE.ShaderMaterial({uniforms:this.convolutionUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,defines:{KERNEL_SIZE_FLOAT:t.toFixed(1),KERNEL_SIZE_INT:t.toFixed(0)}});this.enabled=!0;this.needsSwap=!1;this.clear=!1};THREE.BloomPass.prototype={render:function(e,t,i,r,n){if(n)e.context.disable(e.context.STENCIL_TEST);THREE.EffectComposer.quad.material=this.materialConvolution;this.convolutionUniforms["tDiffuse"].value=i;this.convolutionUniforms["uImageIncrement"].value=THREE.BloomPass.blurX;e.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,this.renderTargetX,!0);this.convolutionUniforms["tDiffuse"].value=this.renderTargetX;this.convolutionUniforms["uImageIncrement"].value=THREE.BloomPass.blurY;e.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,this.renderTargetY,!0);THREE.EffectComposer.quad.material=this.materialCopy;this.copyUniforms["tDiffuse"].value=this.renderTargetY;if(n)e.context.enable(e.context.STENCIL_TEST);e.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,i,this.clear)}};THREE.BloomPass.blurX=new THREE.Vector2(.001953125,0);THREE.BloomPass.blurY=new THREE.Vector2(0,.001953125);