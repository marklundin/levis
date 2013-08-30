THREE.EffectComposer=function(e,t){if(this.renderer=e,void 0===t){var i=window.innerWidth||1,r=window.innerHeight||1,n={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat,stencilBuffer:!1};t=new THREE.WebGLRenderTarget(i,r,n)}this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.passes=[],void 0===THREE.CopyShader&&console.error("THREE.EffectComposer relies on THREE.CopyShader"),this.copyPass=new THREE.ShaderPass(THREE.CopyShader)},THREE.EffectComposer.prototype={swapBuffers:function(){var e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e},addPass:function(e){this.passes.push(e)},insertPass:function(e,t){this.passes.splice(t,0,e)},render:function(e){this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2;var t,i,r=!1,n=this.passes.length;for(i=0;n>i;i++)if(t=this.passes[i],t.enabled){if(t.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),t.needsSwap){if(r){var o=this.renderer.context;o.stencilFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),o.stencilFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}t instanceof THREE.MaskPass?r=!0:t instanceof THREE.ClearMaskPass&&(r=!1)}},reset:function(e){void 0===e&&(e=this.renderTarget1.clone(),e.width=window.innerWidth,e.height=window.innerHeight),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2},setSize:function(e,t){var i=this.renderTarget1.clone();i.width=e,i.height=t,this.reset(i)}},THREE.EffectComposer.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),THREE.EffectComposer.quad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),null),THREE.EffectComposer.scene=new THREE.Scene,THREE.EffectComposer.scene.add(THREE.EffectComposer.quad);