THREE.TessellateModifier=function(e){this.maxEdgeLength=e};THREE.TessellateModifier.prototype.modify=function(e){var t,i,r,n,o,a,s,l,h,c,u,f,d,p,m,v,g,E,y,_,T,b,x,w,R,H,S,M,C,A,D,P,L;var k=[];var N=[];var O=this.maxEdgeLength;for(t=0,i=e.faceVertexUvs.length;i>t;t++)N[t]=[];for(t=0,i=e.faces.length;i>t;t++){r=e.faces[t];if(r instanceof THREE.Face3){n=r.a;o=r.b;a=r.c;l=e.vertices[n];h=e.vertices[o];c=e.vertices[a];f=l.distanceTo(h);d=h.distanceTo(c);p=l.distanceTo(c);if(f>O||d>O||p>O){g=e.vertices.length;C=r.clone();A=r.clone();if(f>=d&&f>=p){_=l.clone();_.lerp(h,.5);C.a=n;C.b=g;C.c=a;A.a=g;A.b=o;A.c=a;if(3===r.vertexNormals.length){x=r.vertexNormals[0].clone();x.lerp(r.vertexNormals[1],.5);C.vertexNormals[1].copy(x);A.vertexNormals[0].copy(x)}if(3===r.vertexColors.length){H=r.vertexColors[0].clone();H.lerp(r.vertexColors[1],.5);C.vertexColors[1].copy(H);A.vertexColors[0].copy(H)}L=0}else if(d>=f&&d>=p){_=h.clone();_.lerp(c,.5);C.a=n;C.b=o;C.c=g;A.a=g;A.b=a;A.c=n;if(3===r.vertexNormals.length){x=r.vertexNormals[1].clone();x.lerp(r.vertexNormals[2],.5);C.vertexNormals[2].copy(x);A.vertexNormals[0].copy(x);A.vertexNormals[1].copy(r.vertexNormals[2]);A.vertexNormals[2].copy(r.vertexNormals[0])}if(3===r.vertexColors.length){H=r.vertexColors[1].clone();H.lerp(r.vertexColors[2],.5);C.vertexColors[2].copy(H);A.vertexColors[0].copy(H);A.vertexColors[1].copy(r.vertexColors[2]);A.vertexColors[2].copy(r.vertexColors[0])}L=1}else{_=l.clone();_.lerp(c,.5);C.a=n;C.b=o;C.c=g;A.a=g;A.b=o;A.c=a;if(3===r.vertexNormals.length){x=r.vertexNormals[0].clone();x.lerp(r.vertexNormals[2],.5);C.vertexNormals[2].copy(x);A.vertexNormals[0].copy(x)}if(3===r.vertexColors.length){H=r.vertexColors[0].clone();H.lerp(r.vertexColors[2],.5);C.vertexColors[2].copy(H);A.vertexColors[0].copy(H)}L=2}k.push(C,A);e.vertices.push(_);var I,F,z,V,B,U,j,W,G;for(I=0,F=e.faceVertexUvs.length;F>I;I++)if(e.faceVertexUvs[I].length){z=e.faceVertexUvs[I][t];V=z[0];B=z[1];U=z[2];if(0===L){j=V.clone();j.lerp(B,.5);W=[V.clone(),j.clone(),U.clone()];G=[j.clone(),B.clone(),U.clone()]}else if(1===L){j=B.clone();j.lerp(U,.5);W=[V.clone(),B.clone(),j.clone()];G=[j.clone(),U.clone(),V.clone()]}else{j=V.clone();j.lerp(U,.5);W=[V.clone(),B.clone(),j.clone()];G=[j.clone(),B.clone(),U.clone()]}N[I].push(W,G)}}else{k.push(r);for(I=0,F=e.faceVertexUvs.length;F>I;I++)N[I].push(e.faceVertexUvs[I][t])}}else{n=r.a;o=r.b;a=r.c;s=r.d;l=e.vertices[n];h=e.vertices[o];c=e.vertices[a];u=e.vertices[s];f=l.distanceTo(h);d=h.distanceTo(c);m=c.distanceTo(u);v=l.distanceTo(u);if(f>O||d>O||m>O||v>O){E=e.vertices.length;y=e.vertices.length+1;D=r.clone();P=r.clone();if(f>=d&&f>=m&&f>=v||m>=d&&m>=f&&m>=v){T=l.clone();T.lerp(h,.5);b=c.clone();b.lerp(u,.5);D.a=n;D.b=E;D.c=y;D.d=s;P.a=E;P.b=o;P.c=a;P.d=y;if(4===r.vertexNormals.length){w=r.vertexNormals[0].clone();w.lerp(r.vertexNormals[1],.5);R=r.vertexNormals[2].clone();R.lerp(r.vertexNormals[3],.5);D.vertexNormals[1].copy(w);D.vertexNormals[2].copy(R);P.vertexNormals[0].copy(w);P.vertexNormals[3].copy(R)}if(4===r.vertexColors.length){S=r.vertexColors[0].clone();S.lerp(r.vertexColors[1],.5);M=r.vertexColors[2].clone();M.lerp(r.vertexColors[3],.5);D.vertexColors[1].copy(S);D.vertexColors[2].copy(M);P.vertexColors[0].copy(S);P.vertexColors[3].copy(M)}L=0}else{T=h.clone();T.lerp(c,.5);b=u.clone();b.lerp(l,.5);D.a=n;D.b=o;D.c=E;D.d=y;P.a=y;P.b=E;P.c=a;P.d=s;if(4===r.vertexNormals.length){w=r.vertexNormals[1].clone();w.lerp(r.vertexNormals[2],.5);R=r.vertexNormals[3].clone();R.lerp(r.vertexNormals[0],.5);D.vertexNormals[2].copy(w);D.vertexNormals[3].copy(R);P.vertexNormals[0].copy(R);P.vertexNormals[1].copy(w)}if(4===r.vertexColors.length){S=r.vertexColors[1].clone();S.lerp(r.vertexColors[2],.5);M=r.vertexColors[3].clone();M.lerp(r.vertexColors[0],.5);D.vertexColors[2].copy(S);D.vertexColors[3].copy(M);P.vertexColors[0].copy(M);P.vertexColors[1].copy(S)}L=1}k.push(D,P);e.vertices.push(T,b);var I,F,z,V,B,U,X,Y,q,K,Z;for(I=0,F=e.faceVertexUvs.length;F>I;I++)if(e.faceVertexUvs[I].length){z=e.faceVertexUvs[I][t];V=z[0];B=z[1];U=z[2];X=z[3];if(0===L){Y=V.clone();Y.lerp(B,.5);q=U.clone();q.lerp(X,.5);K=[V.clone(),Y.clone(),q.clone(),X.clone()];Z=[Y.clone(),B.clone(),U.clone(),q.clone()]}else{Y=B.clone();Y.lerp(U,.5);q=X.clone();q.lerp(V,.5);K=[V.clone(),B.clone(),Y.clone(),q.clone()];Z=[q.clone(),Y.clone(),U.clone(),X.clone()]}N[I].push(K,Z)}}else{k.push(r);for(I=0,F=e.faceVertexUvs.length;F>I;I++)N[I].push(e.faceVertexUvs[I][t])}}}e.faces=k;e.faceVertexUvs=N};