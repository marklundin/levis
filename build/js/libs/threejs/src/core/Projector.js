THREE.Projector=function(){function e(){if(c===_){var e=new THREE.RenderableObject;T.push(e);_++;c++;return e}return T[c++]}function t(){if(u===x){var e=new THREE.RenderableVertex;b.push(e);x++;u++;return e}return b[u++]}function i(){if(d===w){var e=new THREE.RenderableFace3;R.push(e);w++;d++;return e}return R[d++]}function r(){if(p===S){var e=new THREE.RenderableFace4;H.push(e);S++;p++;return e}return H[p++]}function n(){if(v===C){var e=new THREE.RenderableLine;M.push(e);C++;v++;return e}return M[v++]}function o(){if(E===D){var e=new THREE.RenderableParticle;A.push(e);D++;E++;return e}return A[E++]}function a(e,t){if(e.z!==t.z)return t.z-e.z;else if(e.id!==t.id)return e.id-t.id;else return 0}function s(e,t){var i=0,r=1,n=e.z+e.w,o=t.z+t.w,a=-e.z+e.w,s=-t.z+t.w;if(n>=0&&o>=0&&a>=0&&s>=0)return!0;else if(0>n&&0>o||0>a&&0>s)return!1;else{if(0>n)i=Math.max(i,n/(n-o));else if(0>o)r=Math.min(r,n/(n-o));if(0>a)i=Math.max(i,a/(a-s));else if(0>s)r=Math.min(r,a/(a-s));if(i>r)return!1;else{e.lerp(t,i);t.lerp(e,1-r);return!0}}}var l,c,h,u,f,d,p,m,v,g,E,y,T=[],_=0,b=[],x=0,R=[],w=0,H=[],S=0,M=[],C=0,A=[],D=0,P={objects:[],sprites:[],lights:[],elements:[]},L=new THREE.Vector3,N=new THREE.Vector4,k=new THREE.Box3(new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,1,1)),F=new THREE.Box3,I=new Array(3),O=new Array(4),U=new THREE.Matrix4,z=new THREE.Matrix4,B=new THREE.Matrix4,V=new THREE.Matrix3,j=new THREE.Matrix3,W=new THREE.Vector3,G=new THREE.Frustum,X=new THREE.Vector4,Y=new THREE.Vector4;this.projectVector=function(e,t){t.matrixWorldInverse.getInverse(t.matrixWorld);z.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse);return e.applyProjection(z)};this.unprojectVector=function(e,t){t.projectionMatrixInverse.getInverse(t.projectionMatrix);z.multiplyMatrices(t.matrixWorld,t.projectionMatrixInverse);return e.applyProjection(z)};this.pickingRay=function(e,t){e.z=-1;var i=new THREE.Vector3(e.x,e.y,1);this.unprojectVector(e,t);this.unprojectVector(i,t);i.sub(e).normalize();return new THREE.Raycaster(e,i)};var q=function(t){l=e();l.id=t.id;l.object=t;if(null!==t.renderDepth)l.z=t.renderDepth;else{L.getPositionFromMatrix(t.matrixWorld);L.applyProjection(z);l.z=L.z}return l};var K=function(e){if(e.visible!==!1){if(e instanceof THREE.Light)P.lights.push(e);else if(e instanceof THREE.Mesh||e instanceof THREE.Line){if(e.frustumCulled===!1||G.intersectsObject(e)===!0)P.objects.push(q(e))}else if(e instanceof THREE.Sprite||e instanceof THREE.Particle)P.sprites.push(q(e));for(var t=0,i=e.children.length;i>t;t++)K(e.children[t])}};var Z=function(e,t){c=0;P.objects.length=0;P.sprites.length=0;P.lights.length=0;K(e);if(t===!0)P.objects.sort(a)};this.projectScene=function(e,l,c,T){var _,x,R,w,H,S,M,C,A,D,L,q,K,Q,$,J,et,tt,it,rt,nt,ot,at,st,lt,ct,ht=!1;d=0;p=0;v=0;E=0;P.elements.length=0;if(e.autoUpdate===!0)e.updateMatrixWorld();if(void 0===l.parent)l.updateMatrixWorld();U.copy(l.matrixWorldInverse.getInverse(l.matrixWorld));z.multiplyMatrices(l.projectionMatrix,U);j.getNormalMatrix(U);G.setFromMatrix(z);Z(e,c);for(_=0,x=P.objects.length;x>_;_++){K=P.objects[_].object;y=K.matrixWorld;u=0;if(K instanceof THREE.Mesh){Q=K.geometry;$=Q.vertices;J=Q.faces;it=Q.faceVertexUvs;V.getNormalMatrix(y);lt=K.material instanceof THREE.MeshFaceMaterial;ct=lt===!0?K.material:null;for(R=0,w=$.length;w>R;R++){h=t();h.positionWorld.copy($[R]).applyMatrix4(y);h.positionScreen.copy(h.positionWorld).applyMatrix4(z);var ut=1/h.positionScreen.w;h.positionScreen.x*=ut;h.positionScreen.y*=ut;h.positionScreen.z*=ut;h.visible=!(h.positionScreen.x<-1||h.positionScreen.x>1||h.positionScreen.y<-1||h.positionScreen.y>1||h.positionScreen.z<-1||h.positionScreen.z>1)}for(H=0,S=J.length;S>H;H++){et=J[H];var ft=lt===!0?ct.materials[et.materialIndex]:K.material;if(void 0!==ft){var dt=ft.side;if(et instanceof THREE.Face3){nt=b[et.a];ot=b[et.b];at=b[et.c];I[0]=nt.positionScreen;I[1]=ot.positionScreen;I[2]=at.positionScreen;if(nt.visible===!0||ot.visible===!0||at.visible===!0||k.isIntersectionBox(F.setFromPoints(I))){ht=(at.positionScreen.x-nt.positionScreen.x)*(ot.positionScreen.y-nt.positionScreen.y)-(at.positionScreen.y-nt.positionScreen.y)*(ot.positionScreen.x-nt.positionScreen.x)<0;if(dt===THREE.DoubleSide||ht===(dt===THREE.FrontSide)){f=i();f.id=K.id;f.v1.copy(nt);f.v2.copy(ot);f.v3.copy(at)}else continue}else continue}else if(et instanceof THREE.Face4){nt=b[et.a];ot=b[et.b];at=b[et.c];st=b[et.d];O[0]=nt.positionScreen;O[1]=ot.positionScreen;O[2]=at.positionScreen;O[3]=st.positionScreen;if(nt.visible===!0||ot.visible===!0||at.visible===!0||st.visible===!0||k.isIntersectionBox(F.setFromPoints(O))){ht=(st.positionScreen.x-nt.positionScreen.x)*(ot.positionScreen.y-nt.positionScreen.y)-(st.positionScreen.y-nt.positionScreen.y)*(ot.positionScreen.x-nt.positionScreen.x)<0||(ot.positionScreen.x-at.positionScreen.x)*(st.positionScreen.y-at.positionScreen.y)-(ot.positionScreen.y-at.positionScreen.y)*(st.positionScreen.x-at.positionScreen.x)<0;if(dt===THREE.DoubleSide||ht===(dt===THREE.FrontSide)){f=r();f.id=K.id;f.v1.copy(nt);f.v2.copy(ot);f.v3.copy(at);f.v4.copy(st)}else continue}else continue}f.normalModel.copy(et.normal);if(ht===!1&&(dt===THREE.BackSide||dt===THREE.DoubleSide))f.normalModel.negate();f.normalModel.applyMatrix3(V).normalize();f.normalModelView.copy(f.normalModel).applyMatrix3(j);f.centroidModel.copy(et.centroid).applyMatrix4(y);tt=et.vertexNormals;for(M=0,C=tt.length;C>M;M++){var pt=f.vertexNormalsModel[M];pt.copy(tt[M]);if(ht===!1&&(dt===THREE.BackSide||dt===THREE.DoubleSide))pt.negate();pt.applyMatrix3(V).normalize();var mt=f.vertexNormalsModelView[M];mt.copy(pt).applyMatrix3(j)}f.vertexNormalsLength=tt.length;for(A=0,D=it.length;D>A;A++){rt=it[A][H];if(void 0!==rt)for(L=0,q=rt.length;q>L;L++)f.uvs[A][L]=rt[L];else;}f.color=et.color;f.material=ft;W.copy(f.centroidModel).applyProjection(z);f.z=W.z;P.elements.push(f)}else;}}else if(K instanceof THREE.Line){B.multiplyMatrices(z,y);$=K.geometry.vertices;nt=t();nt.positionScreen.copy($[0]).applyMatrix4(B);var vt=K.type===THREE.LinePieces?2:1;for(R=1,w=$.length;w>R;R++){nt=t();nt.positionScreen.copy($[R]).applyMatrix4(B);if(!((R+1)%vt>0)){ot=b[u-2];X.copy(nt.positionScreen);Y.copy(ot.positionScreen);if(s(X,Y)===!0){X.multiplyScalar(1/X.w);Y.multiplyScalar(1/Y.w);m=n();m.id=K.id;m.v1.positionScreen.copy(X);m.v2.positionScreen.copy(Y);m.z=Math.max(X.z,Y.z);m.material=K.material;if(K.material.vertexColors===THREE.VertexColors){m.vertexColors[0].copy(K.geometry.colors[R]);m.vertexColors[1].copy(K.geometry.colors[R-1])}P.elements.push(m)}}else;}}}for(_=0,x=P.sprites.length;x>_;_++){K=P.sprites[_].object;y=K.matrixWorld;if(K instanceof THREE.Particle){N.set(y.elements[12],y.elements[13],y.elements[14],1);N.applyMatrix4(z);var ut=1/N.w;N.z*=ut;if(N.z>0&&N.z<1){g=o();g.id=K.id;g.x=N.x*ut;g.y=N.y*ut;g.z=N.z;g.object=K;g.rotation=K.rotation.z;g.scale.x=K.scale.x*Math.abs(g.x-(N.x+l.projectionMatrix.elements[0])/(N.w+l.projectionMatrix.elements[12]));g.scale.y=K.scale.y*Math.abs(g.y-(N.y+l.projectionMatrix.elements[5])/(N.w+l.projectionMatrix.elements[13]));g.material=K.material;P.elements.push(g)}}}if(T===!0)P.elements.sort(a);return P}};