THREE.TessellateModifier=function(e){this.maxEdgeLength=e},THREE.TessellateModifier.prototype.modify=function(e){var t,i,r,n,o,a,s,l,h,c,u,d,p,f,m,g,v,E,y,_,T,b,x,w,R,H,S,M,C,A,D,L,P,k=[],N=[],I=this.maxEdgeLength;for(t=0,i=e.faceVertexUvs.length;i>t;t++)N[t]=[];for(t=0,i=e.faces.length;i>t;t++)if(r=e.faces[t],r instanceof THREE.Face3)if(n=r.a,o=r.b,a=r.c,l=e.vertices[n],h=e.vertices[o],c=e.vertices[a],d=l.distanceTo(h),p=h.distanceTo(c),f=l.distanceTo(c),d>I||p>I||f>I){v=e.vertices.length,C=r.clone(),A=r.clone(),d>=p&&d>=f?(_=l.clone(),_.lerp(h,.5),C.a=n,C.b=v,C.c=a,A.a=v,A.b=o,A.c=a,3===r.vertexNormals.length&&(x=r.vertexNormals[0].clone(),x.lerp(r.vertexNormals[1],.5),C.vertexNormals[1].copy(x),A.vertexNormals[0].copy(x)),3===r.vertexColors.length&&(H=r.vertexColors[0].clone(),H.lerp(r.vertexColors[1],.5),C.vertexColors[1].copy(H),A.vertexColors[0].copy(H)),P=0):p>=d&&p>=f?(_=h.clone(),_.lerp(c,.5),C.a=n,C.b=o,C.c=v,A.a=v,A.b=a,A.c=n,3===r.vertexNormals.length&&(x=r.vertexNormals[1].clone(),x.lerp(r.vertexNormals[2],.5),C.vertexNormals[2].copy(x),A.vertexNormals[0].copy(x),A.vertexNormals[1].copy(r.vertexNormals[2]),A.vertexNormals[2].copy(r.vertexNormals[0])),3===r.vertexColors.length&&(H=r.vertexColors[1].clone(),H.lerp(r.vertexColors[2],.5),C.vertexColors[2].copy(H),A.vertexColors[0].copy(H),A.vertexColors[1].copy(r.vertexColors[2]),A.vertexColors[2].copy(r.vertexColors[0])),P=1):(_=l.clone(),_.lerp(c,.5),C.a=n,C.b=o,C.c=v,A.a=v,A.b=o,A.c=a,3===r.vertexNormals.length&&(x=r.vertexNormals[0].clone(),x.lerp(r.vertexNormals[2],.5),C.vertexNormals[2].copy(x),A.vertexNormals[0].copy(x)),3===r.vertexColors.length&&(H=r.vertexColors[0].clone(),H.lerp(r.vertexColors[2],.5),C.vertexColors[2].copy(H),A.vertexColors[0].copy(H)),P=2),k.push(C,A),e.vertices.push(_);var O,F,z,V,B,U,j,W,G;for(O=0,F=e.faceVertexUvs.length;F>O;O++)e.faceVertexUvs[O].length&&(z=e.faceVertexUvs[O][t],V=z[0],B=z[1],U=z[2],0===P?(j=V.clone(),j.lerp(B,.5),W=[V.clone(),j.clone(),U.clone()],G=[j.clone(),B.clone(),U.clone()]):1===P?(j=B.clone(),j.lerp(U,.5),W=[V.clone(),B.clone(),j.clone()],G=[j.clone(),U.clone(),V.clone()]):(j=V.clone(),j.lerp(U,.5),W=[V.clone(),B.clone(),j.clone()],G=[j.clone(),B.clone(),U.clone()]),N[O].push(W,G))}else for(k.push(r),O=0,F=e.faceVertexUvs.length;F>O;O++)N[O].push(e.faceVertexUvs[O][t]);else if(n=r.a,o=r.b,a=r.c,s=r.d,l=e.vertices[n],h=e.vertices[o],c=e.vertices[a],u=e.vertices[s],d=l.distanceTo(h),p=h.distanceTo(c),m=c.distanceTo(u),g=l.distanceTo(u),d>I||p>I||m>I||g>I){E=e.vertices.length,y=e.vertices.length+1,D=r.clone(),L=r.clone(),d>=p&&d>=m&&d>=g||m>=p&&m>=d&&m>=g?(T=l.clone(),T.lerp(h,.5),b=c.clone(),b.lerp(u,.5),D.a=n,D.b=E,D.c=y,D.d=s,L.a=E,L.b=o,L.c=a,L.d=y,4===r.vertexNormals.length&&(w=r.vertexNormals[0].clone(),w.lerp(r.vertexNormals[1],.5),R=r.vertexNormals[2].clone(),R.lerp(r.vertexNormals[3],.5),D.vertexNormals[1].copy(w),D.vertexNormals[2].copy(R),L.vertexNormals[0].copy(w),L.vertexNormals[3].copy(R)),4===r.vertexColors.length&&(S=r.vertexColors[0].clone(),S.lerp(r.vertexColors[1],.5),M=r.vertexColors[2].clone(),M.lerp(r.vertexColors[3],.5),D.vertexColors[1].copy(S),D.vertexColors[2].copy(M),L.vertexColors[0].copy(S),L.vertexColors[3].copy(M)),P=0):(T=h.clone(),T.lerp(c,.5),b=u.clone(),b.lerp(l,.5),D.a=n,D.b=o,D.c=E,D.d=y,L.a=y,L.b=E,L.c=a,L.d=s,4===r.vertexNormals.length&&(w=r.vertexNormals[1].clone(),w.lerp(r.vertexNormals[2],.5),R=r.vertexNormals[3].clone(),R.lerp(r.vertexNormals[0],.5),D.vertexNormals[2].copy(w),D.vertexNormals[3].copy(R),L.vertexNormals[0].copy(R),L.vertexNormals[1].copy(w)),4===r.vertexColors.length&&(S=r.vertexColors[1].clone(),S.lerp(r.vertexColors[2],.5),M=r.vertexColors[3].clone(),M.lerp(r.vertexColors[0],.5),D.vertexColors[2].copy(S),D.vertexColors[3].copy(M),L.vertexColors[0].copy(M),L.vertexColors[1].copy(S)),P=1),k.push(D,L),e.vertices.push(T,b);var O,F,z,V,B,U,X,Y,q,K,Z;for(O=0,F=e.faceVertexUvs.length;F>O;O++)e.faceVertexUvs[O].length&&(z=e.faceVertexUvs[O][t],V=z[0],B=z[1],U=z[2],X=z[3],0===P?(Y=V.clone(),Y.lerp(B,.5),q=U.clone(),q.lerp(X,.5),K=[V.clone(),Y.clone(),q.clone(),X.clone()],Z=[Y.clone(),B.clone(),U.clone(),q.clone()]):(Y=B.clone(),Y.lerp(U,.5),q=X.clone(),q.lerp(V,.5),K=[V.clone(),B.clone(),Y.clone(),q.clone()],Z=[q.clone(),Y.clone(),U.clone(),X.clone()]),N[O].push(K,Z))}else for(k.push(r),O=0,F=e.faceVertexUvs.length;F>O;O++)N[O].push(e.faceVertexUvs[O][t]);e.faces=k,e.faceVertexUvs=N};