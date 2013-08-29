THREE.DepthPassPlugin=function(){function e(e){return e.material instanceof THREE.MeshFaceMaterial?e.material.materials[0]:e.material}this.enabled=!1;this.renderTarget=null;var t,i,r,a,o,n,s=new THREE.Frustum,l=new THREE.Matrix4;this.init=function(e){t=e.context;i=e;var s=THREE.ShaderLib["depthRGBA"];var l=THREE.UniformsUtils.clone(s.uniforms);r=new THREE.ShaderMaterial({fragmentShader:s.fragmentShader,vertexShader:s.vertexShader,uniforms:l});a=new THREE.ShaderMaterial({fragmentShader:s.fragmentShader,vertexShader:s.vertexShader,uniforms:l,morphTargets:!0});o=new THREE.ShaderMaterial({fragmentShader:s.fragmentShader,vertexShader:s.vertexShader,uniforms:l,skinning:!0});n=new THREE.ShaderMaterial({fragmentShader:s.fragmentShader,vertexShader:s.vertexShader,uniforms:l,morphTargets:!0,skinning:!0});r._shadowPass=!0;a._shadowPass=!0;o._shadowPass=!0;n._shadowPass=!0};this.render=function(e,t){if(this.enabled)this.update(e,t)};this.update=function(c,h){var u,f,d,p,m,v,g,E=null;t.clearColor(1,1,1,1);t.disable(t.BLEND);i.setDepthTest(!0);if(c.autoUpdate===!0)c.updateMatrixWorld();h.matrixWorldInverse.getInverse(h.matrixWorld);l.multiplyMatrices(h.projectionMatrix,h.matrixWorldInverse);s.setFromMatrix(l);i.setRenderTarget(this.renderTarget);i.clear();g=c.__webglObjects;for(u=0,f=g.length;f>u;u++){m=g[u];v=m.object;m.render=!1;if(v.visible)if(!(v instanceof THREE.Mesh||v instanceof THREE.ParticleSystem)||!v.frustumCulled||s.intersectsObject(v)){v._modelViewMatrix.multiplyMatrices(h.matrixWorldInverse,v.matrixWorld);m.render=!0}}var y,T,x;for(u=0,f=g.length;f>u;u++){m=g[u];if(m.render){v=m.object;d=m.buffer;if(v instanceof THREE.ParticleSystem&&!v.customDepthMaterial)continue;y=e(v);if(y)i.setMaterialFaces(v.material);T=v.geometry.morphTargets.length>0&&y.morphTargets;x=v instanceof THREE.SkinnedMesh&&y.skinning;if(v.customDepthMaterial)p=v.customDepthMaterial;else if(x)p=T?n:o;else if(T)p=a;else p=r;if(d instanceof THREE.BufferGeometry)i.renderBufferDirect(h,c.__lights,E,p,d,v);else i.renderBuffer(h,c.__lights,E,p,d,v)}}g=c.__webglObjectsImmediate;for(u=0,f=g.length;f>u;u++){m=g[u];v=m.object;if(v.visible){v._modelViewMatrix.multiplyMatrices(h.matrixWorldInverse,v.matrixWorld);i.renderImmediateObject(h,c.__lights,E,r,v)}}var b=i.getClearColor(),_=i.getClearAlpha();t.clearColor(b.r,b.g,b.b,_);t.enable(t.BLEND)}};