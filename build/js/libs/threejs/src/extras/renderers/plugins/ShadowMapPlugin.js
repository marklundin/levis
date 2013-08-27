THREE.ShadowMapPlugin=function(){function e(e,t){var i=new THREE.DirectionalLight;i.isVirtual=!0;i.onlyShadow=!0;i.castShadow=!0;i.shadowCameraNear=e.shadowCameraNear;i.shadowCameraFar=e.shadowCameraFar;i.shadowCameraLeft=e.shadowCameraLeft;i.shadowCameraRight=e.shadowCameraRight;i.shadowCameraBottom=e.shadowCameraBottom;i.shadowCameraTop=e.shadowCameraTop;i.shadowCameraVisible=e.shadowCameraVisible;i.shadowDarkness=e.shadowDarkness;i.shadowBias=e.shadowCascadeBias[t];i.shadowMapWidth=e.shadowCascadeWidth[t];i.shadowMapHeight=e.shadowCascadeHeight[t];i.pointsWorld=[];i.pointsFrustum=[];var r=i.pointsWorld,a=i.pointsFrustum;for(var o=0;8>o;o++){r[o]=new THREE.Vector3;a[o]=new THREE.Vector3}var n=e.shadowCascadeNearZ[t];var s=e.shadowCascadeFarZ[t];a[0].set(-1,-1,n);a[1].set(1,-1,n);a[2].set(-1,1,n);a[3].set(1,1,n);a[4].set(-1,-1,s);a[5].set(1,-1,s);a[6].set(-1,1,s);a[7].set(1,1,s);return i}function t(e,t){var i=e.shadowCascadeArray[t];i.position.copy(e.position);i.target.position.copy(e.target.position);i.lookAt(i.target);i.shadowCameraVisible=e.shadowCameraVisible;i.shadowDarkness=e.shadowDarkness;i.shadowBias=e.shadowCascadeBias[t];var r=e.shadowCascadeNearZ[t];var a=e.shadowCascadeFarZ[t];var o=i.pointsFrustum;o[0].z=r;o[1].z=r;o[2].z=r;o[3].z=r;o[4].z=a;o[5].z=a;o[6].z=a;o[7].z=a}function i(e,t){var i=t.shadowCamera,r=t.pointsFrustum,a=t.pointsWorld;f.set(1/0,1/0,1/0);d.set(-1/0,-1/0,-1/0);for(var o=0;8>o;o++){var n=a[o];n.copy(r[o]);THREE.ShadowMapPlugin.__projector.unprojectVector(n,e);n.applyMatrix4(i.matrixWorldInverse);if(n.x<f.x)f.x=n.x;if(n.x>d.x)d.x=n.x;if(n.y<f.y)f.y=n.y;if(n.y>d.y)d.y=n.y;if(n.z<f.z)f.z=n.z;if(n.z>d.z)d.z=n.z}i.left=f.x;i.right=d.x;i.top=d.y;i.bottom=f.y;i.updateProjectionMatrix()}function r(e){return e.material instanceof THREE.MeshFaceMaterial?e.material.materials[0]:e.material}var a,o,n,s,l,c,h=new THREE.Frustum,u=new THREE.Matrix4,f=new THREE.Vector3,d=new THREE.Vector3,p=new THREE.Vector3;this.init=function(e){a=e.context;o=e;var t=THREE.ShaderLib["depthRGBA"];var i=THREE.UniformsUtils.clone(t.uniforms);n=new THREE.ShaderMaterial({fragmentShader:t.fragmentShader,vertexShader:t.vertexShader,uniforms:i});s=new THREE.ShaderMaterial({fragmentShader:t.fragmentShader,vertexShader:t.vertexShader,uniforms:i,morphTargets:!0});l=new THREE.ShaderMaterial({fragmentShader:t.fragmentShader,vertexShader:t.vertexShader,uniforms:i,skinning:!0});c=new THREE.ShaderMaterial({fragmentShader:t.fragmentShader,vertexShader:t.vertexShader,uniforms:i,morphTargets:!0,skinning:!0});n._shadowPass=!0;s._shadowPass=!0;l._shadowPass=!0;c._shadowPass=!0};this.render=function(e,t){if(o.shadowMapEnabled&&o.shadowMapAutoUpdate)this.update(e,t)};this.update=function(f,d){var m,v,g,E,y,T,x,b,_,R,w,H,S,M,C=[],A=0,D=null;a.clearColor(1,1,1,1);a.disable(a.BLEND);a.enable(a.CULL_FACE);a.frontFace(a.CCW);if(o.shadowMapCullFace===THREE.CullFaceFront)a.cullFace(a.FRONT);else a.cullFace(a.BACK);o.setDepthTest(!0);for(m=0,v=f.__lights.length;v>m;m++){S=f.__lights[m];if(S.castShadow)if(S instanceof THREE.DirectionalLight&&S.shadowCascade)for(y=0;y<S.shadowCascadeCount;y++){var P;if(!S.shadowCascadeArray[y]){P=e(S,y);P.originalCamera=d;var L=new THREE.Gyroscope;L.position=S.shadowCascadeOffset;L.add(P);L.add(P.target);d.add(L);S.shadowCascadeArray[y]=P;console.log("Created virtualLight",P)}else P=S.shadowCascadeArray[y];t(S,y);C[A]=P;A++}else{C[A]=S;A++}else;}for(m=0,v=C.length;v>m;m++){S=C[m];if(!S.shadowMap){var N=THREE.LinearFilter;if(o.shadowMapType===THREE.PCFSoftShadowMap)N=THREE.NearestFilter;var F={minFilter:N,magFilter:N,format:THREE.RGBAFormat};S.shadowMap=new THREE.WebGLRenderTarget(S.shadowMapWidth,S.shadowMapHeight,F);S.shadowMapSize=new THREE.Vector2(S.shadowMapWidth,S.shadowMapHeight);S.shadowMatrix=new THREE.Matrix4}if(!S.shadowCamera){if(S instanceof THREE.SpotLight)S.shadowCamera=new THREE.PerspectiveCamera(S.shadowCameraFov,S.shadowMapWidth/S.shadowMapHeight,S.shadowCameraNear,S.shadowCameraFar);else if(S instanceof THREE.DirectionalLight)S.shadowCamera=new THREE.OrthographicCamera(S.shadowCameraLeft,S.shadowCameraRight,S.shadowCameraTop,S.shadowCameraBottom,S.shadowCameraNear,S.shadowCameraFar);else{console.error("Unsupported light type for shadow");continue}f.add(S.shadowCamera);if(f.autoUpdate===!0)f.updateMatrixWorld()}if(S.shadowCameraVisible&&!S.cameraHelper){S.cameraHelper=new THREE.CameraHelper(S.shadowCamera);S.shadowCamera.add(S.cameraHelper)}if(S.isVirtual&&P.originalCamera==d)i(d,S);T=S.shadowMap;x=S.shadowMatrix;b=S.shadowCamera;b.position.getPositionFromMatrix(S.matrixWorld);p.getPositionFromMatrix(S.target.matrixWorld);b.lookAt(p);b.updateMatrixWorld();b.matrixWorldInverse.getInverse(b.matrixWorld);if(S.cameraHelper)S.cameraHelper.visible=S.shadowCameraVisible;if(S.shadowCameraVisible)S.cameraHelper.update();x.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1);x.multiply(b.projectionMatrix);x.multiply(b.matrixWorldInverse);u.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse);h.setFromMatrix(u);o.setRenderTarget(T);o.clear();M=f.__webglObjects;for(g=0,E=M.length;E>g;g++){w=M[g];H=w.object;w.render=!1;if(H.visible&&H.castShadow)if(!(H instanceof THREE.Mesh||H instanceof THREE.ParticleSystem)||!H.frustumCulled||h.intersectsObject(H)){H._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,H.matrixWorld);w.render=!0}}var k,I,U;for(g=0,E=M.length;E>g;g++){w=M[g];if(w.render){H=w.object;_=w.buffer;k=r(H);I=H.geometry.morphTargets.length>0&&k.morphTargets;U=H instanceof THREE.SkinnedMesh&&k.skinning;if(H.customDepthMaterial)R=H.customDepthMaterial;else if(U)R=I?c:l;else if(I)R=s;else R=n;if(_ instanceof THREE.BufferGeometry)o.renderBufferDirect(b,f.__lights,D,R,_,H);else o.renderBuffer(b,f.__lights,D,R,_,H)}}M=f.__webglObjectsImmediate;for(g=0,E=M.length;E>g;g++){w=M[g];H=w.object;if(H.visible&&H.castShadow){H._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,H.matrixWorld);o.renderImmediateObject(b,f.__lights,D,n,H)}}}var O=o.getClearColor(),z=o.getClearAlpha();a.clearColor(O.r,O.g,O.b,z);a.enable(a.BLEND);if(o.shadowMapCullFace===THREE.CullFaceFront)a.cullFace(a.BACK)}};THREE.ShadowMapPlugin.__projector=new THREE.Projector;