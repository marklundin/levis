THREE.PolyhedronGeometry=function(e,t,i,r){function n(e){var t=e.normalize().clone();t.index=h.vertices.push(t)-1;var i=s(e)/2/Math.PI+.5,r=l(e)/Math.PI+.5;return t.uv=new THREE.Vector2(i,1-r),t}function o(e,t,i){var r=new THREE.Face3(e.index,t.index,i.index,[e.clone(),t.clone(),i.clone()]);r.centroid.add(e).add(t).add(i).divideScalar(3),h.faces.push(r);var n=s(r.centroid);h.faceVertexUvs[0].push([c(e.uv,e,n),c(t.uv,t,n),c(i.uv,i,n)])}function a(e,t){var i=Math.pow(2,t);Math.pow(4,t);for(var r=n(h.vertices[e.a]),a=n(h.vertices[e.b]),s=n(h.vertices[e.c]),l=[],c=0;i>=c;c++){l[c]=[];for(var u=n(r.clone().lerp(s,c/i)),d=n(a.clone().lerp(s,c/i)),p=i-c,f=0;p>=f;f++)l[c][f]=0==f&&c==i?u:n(u.clone().lerp(d,f/p))}for(var c=0;i>c;c++)for(var f=0;2*(i-c)-1>f;f++){var m=Math.floor(f/2);0==f%2?o(l[c][m+1],l[c+1][m],l[c][m]):o(l[c][m+1],l[c+1][m+1],l[c+1][m])}}function s(e){return Math.atan2(e.z,-e.x)}function l(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}function c(e,t,i){return 0>i&&1===e.x&&(e=new THREE.Vector2(e.x-1,e.y)),0===t.x&&0===t.z&&(e=new THREE.Vector2(i/2/Math.PI+.5,e.y)),e.clone()}THREE.Geometry.call(this),i=i||1,r=r||0;for(var h=this,u=0,d=e.length;d>u;u++)n(new THREE.Vector3(e[u][0],e[u][1],e[u][2]));for(var p=this.vertices,f=[],u=0,d=t.length;d>u;u++){var m=p[t[u][0]],v=p[t[u][1]],g=p[t[u][2]];f[u]=new THREE.Face3(m.index,v.index,g.index,[m.clone(),v.clone(),g.clone()])}for(var u=0,d=f.length;d>u;u++)a(f[u],r);for(var u=0,d=this.faceVertexUvs[0].length;d>u;u++){var E=this.faceVertexUvs[0][u],y=E[0].x,T=E[1].x,x=E[2].x,_=Math.max(y,Math.max(T,x)),b=Math.min(y,Math.min(T,x));_>.9&&.1>b&&(.2>y&&(E[0].x+=1),.2>T&&(E[1].x+=1),.2>x&&(E[2].x+=1))}for(var u=0,d=this.vertices.length;d>u;u++)this.vertices[u].multiplyScalar(i);this.mergeVertices(),this.computeCentroids(),this.computeFaceNormals(),this.boundingSphere=new THREE.Sphere(new THREE.Vector3,i)},THREE.PolyhedronGeometry.prototype=Object.create(THREE.Geometry.prototype);