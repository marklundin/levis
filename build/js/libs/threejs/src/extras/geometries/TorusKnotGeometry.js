THREE.TorusKnotGeometry=function(e,t,i,r,o,n,a){function s(e,t,i,r,o){var n=Math.cos(e),a=Math.sin(e),s=t/i*e,l=Math.cos(s),c=.5*r*(2+l)*n,h=.5*r*(2+l)*a,u=.5*o*r*Math.sin(s);return new THREE.Vector3(c,h,u)}THREE.Geometry.call(this);var l=this;this.radius=e||100,this.tube=t||40,this.radialSegments=i||64,this.tubularSegments=r||8,this.p=o||2,this.q=n||3,this.heightScale=a||1,this.grid=new Array(this.radialSegments);for(var c=new THREE.Vector3,h=new THREE.Vector3,u=new THREE.Vector3,d=0;d<this.radialSegments;++d){this.grid[d]=new Array(this.tubularSegments);var p=2*(d/this.radialSegments)*this.p*Math.PI,f=s(p,this.q,this.p,this.radius,this.heightScale),m=s(p+.01,this.q,this.p,this.radius,this.heightScale);c.subVectors(m,f),h.addVectors(m,f),u.crossVectors(c,h),h.crossVectors(u,c),u.normalize(),h.normalize();for(var v=0;v<this.tubularSegments;++v){var g=2*(v/this.tubularSegments)*Math.PI,E=-this.tube*Math.cos(g),y=this.tube*Math.sin(g),T=new THREE.Vector3;T.x=f.x+E*h.x+y*u.x,T.y=f.y+E*h.y+y*u.y,T.z=f.z+E*h.z+y*u.z,this.grid[d][v]=l.vertices.push(T)-1}}for(var d=0;d<this.radialSegments;++d)for(var v=0;v<this.tubularSegments;++v){var x=(d+1)%this.radialSegments,b=(v+1)%this.tubularSegments,_=this.grid[d][v],R=this.grid[x][v],w=this.grid[x][b],H=this.grid[d][b],S=new THREE.Vector2(d/this.radialSegments,v/this.tubularSegments),M=new THREE.Vector2((d+1)/this.radialSegments,v/this.tubularSegments),C=new THREE.Vector2((d+1)/this.radialSegments,(v+1)/this.tubularSegments),A=new THREE.Vector2(d/this.radialSegments,(v+1)/this.tubularSegments);this.faces.push(new THREE.Face4(_,R,w,H)),this.faceVertexUvs[0].push([S,M,C,A])}this.computeCentroids(),this.computeFaceNormals(),this.computeVertexNormals()},THREE.TorusKnotGeometry.prototype=Object.create(THREE.Geometry.prototype);