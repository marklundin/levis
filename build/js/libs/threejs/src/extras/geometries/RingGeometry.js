THREE.RingGeometry=function(e,t,i,r,n,o){THREE.Geometry.call(this),e=e||0,t=t||50,n=void 0!==n?n:0,o=void 0!==o?o:2*Math.PI,i=void 0!==i?Math.max(3,i):8,r=void 0!==r?Math.max(3,r):8;var a,s,l=[],c=e,h=(t-e)/r;for(a=0;r>=a;a++){for(s=0;i>=s;s++){var u=new THREE.Vector3,d=n+s/i*o;u.x=c*Math.cos(d),u.y=c*Math.sin(d),this.vertices.push(u),l.push(new THREE.Vector2((u.x/c+1)/2,-(u.y/c+1)/2+1))}c+=h}var p=new THREE.Vector3(0,0,1);for(a=0;r>a;a++){var f=a*i;for(s=0;i>=s;s++){var d=s+f,m=d+a,v=d+i+a,g=d+i+1+a;this.faces.push(new THREE.Face3(m,v,g,[p,p,p])),this.faceVertexUvs[0].push([l[m],l[v],l[g]]),m=d+a,v=d+i+1+a,g=d+1+a,this.faces.push(new THREE.Face3(m,v,g,[p,p,p])),this.faceVertexUvs[0].push([l[m],l[v],l[g]])}}this.computeCentroids(),this.computeFaceNormals(),this.boundingSphere=new THREE.Sphere(new THREE.Vector3,c)},THREE.RingGeometry.prototype=Object.create(THREE.Geometry.prototype);