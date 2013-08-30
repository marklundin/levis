THREE.SpritePlugin=function(){function e(e,t){var r=i.createProgram(),o=i.createShader(i.FRAGMENT_SHADER),n=i.createShader(i.VERTEX_SHADER),a="precision "+t+" float;\n";return i.shaderSource(o,a+e.fragmentShader),i.shaderSource(n,a+e.vertexShader),i.compileShader(o),i.compileShader(n),i.attachShader(r,o),i.attachShader(r,n),i.linkProgram(r),r}function t(e,t){return e.z!==t.z?t.z-e.z:t.id-e.id}var i,r,o,n={};this.init=function(t){i=t.context,r=t,o=t.getPrecision(),n.vertices=new Float32Array(16),n.faces=new Uint16Array(6);var a=0;n.vertices[a++]=-1,n.vertices[a++]=-1,n.vertices[a++]=0,n.vertices[a++]=0,n.vertices[a++]=1,n.vertices[a++]=-1,n.vertices[a++]=1,n.vertices[a++]=0,n.vertices[a++]=1,n.vertices[a++]=1,n.vertices[a++]=1,n.vertices[a++]=1,n.vertices[a++]=-1,n.vertices[a++]=1,n.vertices[a++]=0,n.vertices[a++]=1,a=0,n.faces[a++]=0,n.faces[a++]=1,n.faces[a++]=2,n.faces[a++]=0,n.faces[a++]=2,n.faces[a++]=3,n.vertexBuffer=i.createBuffer(),n.elementBuffer=i.createBuffer(),i.bindBuffer(i.ARRAY_BUFFER,n.vertexBuffer),i.bufferData(i.ARRAY_BUFFER,n.vertices,i.STATIC_DRAW),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,n.elementBuffer),i.bufferData(i.ELEMENT_ARRAY_BUFFER,n.faces,i.STATIC_DRAW),n.program=e(THREE.ShaderSprite.sprite,o),n.attributes={},n.uniforms={},n.attributes.position=i.getAttribLocation(n.program,"position"),n.attributes.uv=i.getAttribLocation(n.program,"uv"),n.uniforms.uvOffset=i.getUniformLocation(n.program,"uvOffset"),n.uniforms.uvScale=i.getUniformLocation(n.program,"uvScale"),n.uniforms.rotation=i.getUniformLocation(n.program,"rotation"),n.uniforms.scale=i.getUniformLocation(n.program,"scale"),n.uniforms.alignment=i.getUniformLocation(n.program,"alignment"),n.uniforms.color=i.getUniformLocation(n.program,"color"),n.uniforms.map=i.getUniformLocation(n.program,"map"),n.uniforms.opacity=i.getUniformLocation(n.program,"opacity"),n.uniforms.useScreenCoordinates=i.getUniformLocation(n.program,"useScreenCoordinates"),n.uniforms.sizeAttenuation=i.getUniformLocation(n.program,"sizeAttenuation"),n.uniforms.screenPosition=i.getUniformLocation(n.program,"screenPosition"),n.uniforms.modelViewMatrix=i.getUniformLocation(n.program,"modelViewMatrix"),n.uniforms.projectionMatrix=i.getUniformLocation(n.program,"projectionMatrix"),n.uniforms.fogType=i.getUniformLocation(n.program,"fogType"),n.uniforms.fogDensity=i.getUniformLocation(n.program,"fogDensity"),n.uniforms.fogNear=i.getUniformLocation(n.program,"fogNear"),n.uniforms.fogFar=i.getUniformLocation(n.program,"fogFar"),n.uniforms.fogColor=i.getUniformLocation(n.program,"fogColor"),n.uniforms.alphaTest=i.getUniformLocation(n.program,"alphaTest")},this.render=function(e,o,a,s){var l=e.__webglSprites,c=l.length;if(c){var h=n.attributes,u=n.uniforms,d=s/a,p=.5*a,f=.5*s;i.useProgram(n.program),i.enableVertexAttribArray(h.position),i.enableVertexAttribArray(h.uv),i.disable(i.CULL_FACE),i.enable(i.BLEND),i.bindBuffer(i.ARRAY_BUFFER,n.vertexBuffer),i.vertexAttribPointer(h.position,2,i.FLOAT,!1,16,0),i.vertexAttribPointer(h.uv,2,i.FLOAT,!1,16,8),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,n.elementBuffer),i.uniformMatrix4fv(u.projectionMatrix,!1,o.projectionMatrix.elements),i.activeTexture(i.TEXTURE0),i.uniform1i(u.map,0);var m=0,v=0,g=e.fog;g?(i.uniform3f(u.fogColor,g.color.r,g.color.g,g.color.b),g instanceof THREE.Fog?(i.uniform1f(u.fogNear,g.near),i.uniform1f(u.fogFar,g.far),i.uniform1i(u.fogType,1),m=1,v=1):g instanceof THREE.FogExp2&&(i.uniform1f(u.fogDensity,g.density),i.uniform1i(u.fogType,2),m=2,v=2)):(i.uniform1i(u.fogType,0),m=0,v=0);var E,y,T,x,b,_=[];for(E=0;c>E;E++)y=l[E],T=y.material,y.visible&&0!==T.opacity&&(T.useScreenCoordinates?y.z=-y.position.z:(y._modelViewMatrix.multiplyMatrices(o.matrixWorldInverse,y.matrixWorld),y.z=-y._modelViewMatrix.elements[14]));for(l.sort(t),E=0;c>E;E++)y=l[E],T=y.material,y.visible&&0!==T.opacity&&T.map&&T.map.image&&T.map.image.width&&(i.uniform1f(u.alphaTest,T.alphaTest),T.useScreenCoordinates===!0?(i.uniform1i(u.useScreenCoordinates,1),i.uniform3f(u.screenPosition,(y.position.x*r.devicePixelRatio-p)/p,(f-y.position.y*r.devicePixelRatio)/f,Math.max(0,Math.min(1,y.position.z))),_[0]=r.devicePixelRatio,_[1]=r.devicePixelRatio):(i.uniform1i(u.useScreenCoordinates,0),i.uniform1i(u.sizeAttenuation,T.sizeAttenuation?1:0),i.uniformMatrix4fv(u.modelViewMatrix,!1,y._modelViewMatrix.elements),_[0]=1,_[1]=1),b=e.fog&&T.fog?v:0,m!==b&&(i.uniform1i(u.fogType,b),m=b),x=1/(T.scaleByViewport?s:1),_[0]*=x*d*y.scale.x,_[1]*=x*y.scale.y,i.uniform2f(u.uvScale,T.uvScale.x,T.uvScale.y),i.uniform2f(u.uvOffset,T.uvOffset.x,T.uvOffset.y),i.uniform2f(u.alignment,T.alignment.x,T.alignment.y),i.uniform1f(u.opacity,T.opacity),i.uniform3f(u.color,T.color.r,T.color.g,T.color.b),i.uniform1f(u.rotation,y.rotation),i.uniform2fv(u.scale,_),r.setBlending(T.blending,T.blendEquation,T.blendSrc,T.blendDst),r.setDepthTest(T.depthTest),r.setDepthWrite(T.depthWrite),r.setTexture(T.map,0),i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0));i.enable(i.CULL_FACE)}}};