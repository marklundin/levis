THREE.BufferGeometry=function(){this.id=THREE.GeometryIdCount++,this.uuid=THREE.Math.generateUUID(),this.attributes={},this.dynamic=!1,this.offsets=[],this.boundingBox=null,this.boundingSphere=null,this.hasTangents=!1,this.morphTargets=[]},THREE.BufferGeometry.prototype={constructor:THREE.BufferGeometry,applyMatrix:function(e){var t,i;if(this.attributes.position&&(t=this.attributes.position.array),this.attributes.normal&&(i=this.attributes.normal.array),void 0!==t&&(e.multiplyVector3Array(t),this.verticesNeedUpdate=!0),void 0!==i){var r=(new THREE.Matrix3).getNormalMatrix(e);r.multiplyVector3Array(i),this.normalizeNormals(),this.normalsNeedUpdate=!0}},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new THREE.Box3);var e=this.attributes.position.array;if(e){var t,i,r,o=this.boundingBox;e.length>=3&&(o.min.x=o.max.x=e[0],o.min.y=o.max.y=e[1],o.min.z=o.max.z=e[2]);for(var n=3,a=e.length;a>n;n+=3)t=e[n],i=e[n+1],r=e[n+2],t<o.min.x?o.min.x=t:t>o.max.x&&(o.max.x=t),i<o.min.y?o.min.y=i:i>o.max.y&&(o.max.y=i),r<o.min.z?o.min.z=r:r>o.max.z&&(o.max.z=r)}(void 0===e||0===e.length)&&(this.boundingBox.min.set(0,0,0),this.boundingBox.max.set(0,0,0))},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new THREE.Sphere);var e=this.attributes.position.array;if(e){for(var t,i,r,o,n=0,a=0,s=e.length;s>a;a+=3)i=e[a],r=e[a+1],o=e[a+2],t=i*i+r*r+o*o,t>n&&(n=t);this.boundingSphere.radius=Math.sqrt(n)}},computeVertexNormals:function(){if(this.attributes.position){var e,t,i,r,o=this.attributes.position.array.length;if(void 0===this.attributes.normal)this.attributes.normal={itemSize:3,array:new Float32Array(o)};else for(e=0,t=this.attributes.normal.array.length;t>e;e++)this.attributes.normal.array[e]=0;var n,a,s,l,c,h,u=this.attributes.position.array,d=this.attributes.normal.array,p=new THREE.Vector3,f=new THREE.Vector3,m=new THREE.Vector3,g=new THREE.Vector3,v=new THREE.Vector3;if(this.attributes.index){var E=this.attributes.index.array,y=this.offsets;for(i=0,r=y.length;r>i;++i){var T=y[i].start,_=y[i].count,b=y[i].index;for(e=T,t=T+_;t>e;e+=3)n=b+E[e],a=b+E[e+1],s=b+E[e+2],l=u[3*n],c=u[3*n+1],h=u[3*n+2],p.set(l,c,h),l=u[3*a],c=u[3*a+1],h=u[3*a+2],f.set(l,c,h),l=u[3*s],c=u[3*s+1],h=u[3*s+2],m.set(l,c,h),g.subVectors(m,f),v.subVectors(p,f),g.cross(v),d[3*n]+=g.x,d[3*n+1]+=g.y,d[3*n+2]+=g.z,d[3*a]+=g.x,d[3*a+1]+=g.y,d[3*a+2]+=g.z,d[3*s]+=g.x,d[3*s+1]+=g.y,d[3*s+2]+=g.z}}else for(e=0,t=u.length;t>e;e+=9)l=u[e],c=u[e+1],h=u[e+2],p.set(l,c,h),l=u[e+3],c=u[e+4],h=u[e+5],f.set(l,c,h),l=u[e+6],c=u[e+7],h=u[e+8],m.set(l,c,h),g.subVectors(m,f),v.subVectors(p,f),g.cross(v),d[e]=g.x,d[e+1]=g.y,d[e+2]=g.z,d[e+3]=g.x,d[e+4]=g.y,d[e+5]=g.z,d[e+6]=g.x,d[e+7]=g.y,d[e+8]=g.z;this.normalizeNormals(),this.normalsNeedUpdate=!0}},normalizeNormals:function(){for(var e,t,i,r,o=this.attributes.normal.array,n=0,a=o.length;a>n;n+=3)e=o[n],t=o[n+1],i=o[n+2],r=1/Math.sqrt(e*e+t*t+i*i),o[n]*=r,o[n+1]*=r,o[n+2]*=r},computeTangents:function(){function e(e,t,i){d=r[3*e],p=r[3*e+1],f=r[3*e+2],m=r[3*t],g=r[3*t+1],v=r[3*t+2],E=r[3*i],y=r[3*i+1],T=r[3*i+2],_=n[2*e],b=n[2*e+1],x=n[2*t],R=n[2*t+1],w=n[2*i],H=n[2*i+1],S=m-d,M=E-d,C=g-p,A=y-p,D=v-f,P=T-f,L=x-_,N=w-_,k=R-b,F=H-b,I=1/(L*F-N*k),W.set((F*S-k*M)*I,(F*C-k*A)*I,(F*D-k*P)*I),X.set((L*M-N*S)*I,(L*A-N*C)*I,(L*P-N*D)*I),c[e].add(W),c[t].add(W),c[i].add(W),h[e].add(X),h[t].add(X),h[i].add(X)}function t(e){it.x=o[3*e],it.y=o[3*e+1],it.z=o[3*e+2],rt.copy(it),$=c[e],et.copy($),et.sub(it.multiplyScalar(it.dot($))).normalize(),tt.crossVectors(rt,$),J=tt.dot(h[e]),Q=0>J?-1:1,l[4*e]=et.x,l[4*e+1]=et.y,l[4*e+2]=et.z,l[4*e+3]=Q}if(void 0===this.attributes.index||void 0===this.attributes.position||void 0===this.attributes.normal||void 0===this.attributes.uv)return console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"),void 0;var i=this.attributes.index.array,r=this.attributes.position.array,o=this.attributes.normal.array,n=this.attributes.uv.array,a=r.length/3;if(void 0===this.attributes.tangent){var s=4*a;this.attributes.tangent={itemSize:4,array:new Float32Array(s)}}for(var l=this.attributes.tangent.array,c=[],h=[],u=0;a>u;u++)c[u]=new THREE.Vector3,h[u]=new THREE.Vector3;var d,p,f,m,g,v,E,y,T,_,b,x,R,w,H,S,M,C,A,D,P,L,N,k,F,I,O,U,z,B,V,j,G,W=new THREE.Vector3,X=new THREE.Vector3,Y=this.offsets;for(z=0,B=Y.length;B>z;++z){var q=Y[z].start,K=Y[z].count,Z=Y[z].index;for(O=q,U=q+K;U>O;O+=3)V=Z+i[O],j=Z+i[O+1],G=Z+i[O+2],e(V,j,G)}var Q,$,J,et=new THREE.Vector3,tt=new THREE.Vector3,it=new THREE.Vector3,rt=new THREE.Vector3;for(z=0,B=Y.length;B>z;++z){var q=Y[z].start,K=Y[z].count,Z=Y[z].index;for(O=q,U=q+K;U>O;O+=3)V=Z+i[O],j=Z+i[O+1],G=Z+i[O+2],t(V),t(j),t(G)}this.hasTangents=!0,this.tangentsNeedUpdate=!0},dispose:function(){this.dispatchEvent({type:"dispose"})}},THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype);