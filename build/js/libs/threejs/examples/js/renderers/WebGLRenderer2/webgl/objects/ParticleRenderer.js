THREE.WebGLRenderer.ParticleRenderer=function(e,t){THREE.WebGLRenderer.Object3DRenderer.call(this,e,t)};THREE.WebGLRenderer.ParticleRenderer.prototype=Object.create(THREE.WebGLRenderer.Object3DRenderer.prototype);THREE.extend(THREE.WebGLRenderer.ParticleRenderer.prototype,{createBuffers:function(e){var t=this.renderer;e.__webglVertexBuffer=t.createBuffer();e.__webglColorBuffer=t.createBuffer();this.info.memory.geometries++},initBuffers:function(e,t){var i=e.vertices.length;e.__vertexArray=new Float32Array(3*i);e.__colorArray=new Float32Array(3*i);e.__sortArray=[];e.__webglParticleCount=i;this.initCustomAttributes(e,t)},setBuffers:function(e,t,i){var r=this.renderer;var n,a,o,s,l,c,h,u,f,d,p,m,v=e.vertices,g=v.length,E=e.colors,y=E.length,T=e.__vertexArray,_=e.__colorArray,b=e.__sortArray,x=e.verticesNeedUpdate,R=(e.elementsNeedUpdate,e.colorsNeedUpdate),w=e.__webglCustomAttributesList;var H=THREE.WebGLRenderer.ParticleRenderer._m1,S=THREE.WebGLRenderer.ParticleRenderer._v1;if(t.sortParticles){H.multiplyMatrices(i,t.matrixWorld);for(n=0;g>n;n++){o=v[n];S.copy(o);S.applyProjection(H);b[n]=[S.z,n]}b.sort(this.numericalSort);for(n=0;g>n;n++){o=v[b[n][1]];s=3*n;T[s]=o.x;T[s+1]=o.y;T[s+2]=o.z}for(a=0;y>a;a++){s=3*a;c=E[b[a][1]];_[s]=c.r;_[s+1]=c.g;_[s+2]=c.b}if(w)for(h=0,u=w.length;u>h;h++){m=w[h];if(void 0===m.boundTo||"vertices"===m.boundTo){s=0;d=m.value.length;if(1===m.size)for(f=0;d>f;f++){l=b[f][1];m.array[f]=m.value[l]}else if(2===m.size)for(f=0;d>f;f++){l=b[f][1];p=m.value[l];m.array[s]=p.x;m.array[s+1]=p.y;s+=2}else if(3===m.size)if("c"===m.type)for(f=0;d>f;f++){l=b[f][1];p=m.value[l];m.array[s]=p.r;m.array[s+1]=p.g;m.array[s+2]=p.b;s+=3}else for(f=0;d>f;f++){l=b[f][1];p=m.value[l];m.array[s]=p.x;m.array[s+1]=p.y;m.array[s+2]=p.z;s+=3}else if(4===m.size)for(f=0;d>f;f++){l=b[f][1];p=m.value[l];m.array[s]=p.x;m.array[s+1]=p.y;m.array[s+2]=p.z;m.array[s+3]=p.w;s+=4}}else;}}else{if(x)for(n=0;g>n;n++){o=v[n];s=3*n;T[s]=o.x;T[s+1]=o.y;T[s+2]=o.z}if(R)for(a=0;y>a;a++){c=E[a];s=3*a;_[s]=c.r;_[s+1]=c.g;_[s+2]=c.b}if(w)for(h=0,u=w.length;u>h;h++){m=w[h];if(m.needsUpdate&&(void 0===m.boundTo||"vertices"===m.boundTo)){d=m.value.length;s=0;if(1===m.size)for(f=0;d>f;f++)m.array[f]=m.value[f];else if(2===m.size)for(f=0;d>f;f++){p=m.value[f];m.array[s]=p.x;m.array[s+1]=p.y;s+=2}else if(3===m.size)if("c"===m.type)for(f=0;d>f;f++){p=m.value[f];m.array[s]=p.r;m.array[s+1]=p.g;m.array[s+2]=p.b;s+=3}else for(f=0;d>f;f++){p=m.value[f];m.array[s]=p.x;m.array[s+1]=p.y;m.array[s+2]=p.z;s+=3}else if(4===m.size)for(f=0;d>f;f++){p=m.value[f];m.array[s]=p.x;m.array[s+1]=p.y;m.array[s+2]=p.z;m.array[s+3]=p.w;s+=4}}}}if(x||t.sortParticles)r.setDynamicArrayBuffer(e.__webglVertexBuffer,T);if(R||t.sortParticles)r.setDynamicArrayBuffer(e.__webglColorBuffer,_);if(w)for(h=0,u=w.length;u>h;h++){m=w[h];if(m.needsUpdate||t.sortParticles)r.setDynamicArrayBuffer(m.buffer,m.array)}}});THREE.WebGLRenderer.ParticleRenderer._m1=new THREE.Matrix4;THREE.WebGLRenderer.ParticleRenderer._v1=new THREE.Vector3;