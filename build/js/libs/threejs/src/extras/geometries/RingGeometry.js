THREE.RingGeometry=function(e,t,i,r,a,n){THREE.Geometry.call(this);e=e||0;t=t||50;a=void 0!==a?a:0;n=void 0!==n?n:2*Math.PI;i=void 0!==i?Math.max(3,i):8;r=void 0!==r?Math.max(3,r):8;var o,s,l=[],c=e,h=(t-e)/r;for(o=0;r>=o;o++){for(s=0;i>=s;s++){var u=new THREE.Vector3;var f=a+s/i*n;u.x=c*Math.cos(f);u.y=c*Math.sin(f);this.vertices.push(u);l.push(new THREE.Vector2((u.x/c+1)/2,-(u.y/c+1)/2+1))}c+=h}var d=new THREE.Vector3(0,0,1);for(o=0;r>o;o++){var p=o*i;for(s=0;i>=s;s++){var f=s+p;var m=f+o;var v=f+i+o;var g=f+i+1+o;this.faces.push(new THREE.Face3(m,v,g,[d,d,d]));this.faceVertexUvs[0].push([l[m],l[v],l[g]]);m=f+o;v=f+i+1+o;g=f+1+o;this.faces.push(new THREE.Face3(m,v,g,[d,d,d]));this.faceVertexUvs[0].push([l[m],l[v],l[g]])}}this.computeCentroids();this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3,c)};THREE.RingGeometry.prototype=Object.create(THREE.Geometry.prototype);