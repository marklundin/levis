THREE.TubeGeometry=function(e,t,i,r,a){function n(e,t,i){return H.vertices.push(new THREE.Vector3(e,t,i))-1}THREE.Geometry.call(this);this.path=e;this.segments=t||64;this.radius=i||1;this.radialSegments=r||8;this.closed=a||!1;this.grid=[];var o,s,l,c,h,u,f,d,p,m,v,g,E,y,T,x,b,_,R,w,H=this,S=this.segments+1,M=new THREE.Vector3;var C=new THREE.TubeGeometry.FrenetFrames(this.path,this.segments,this.closed),A=C.tangents,D=C.normals,P=C.binormals;this.tangents=A;this.normals=D;this.binormals=P;for(p=0;S>p;p++){this.grid[p]=[];c=p/(S-1);d=e.getPointAt(c);o=A[p];s=D[p];l=P[p];for(m=0;m<this.radialSegments;m++){h=2*(m/this.radialSegments)*Math.PI;u=-this.radius*Math.cos(h);f=this.radius*Math.sin(h);M.copy(d);M.x+=u*s.x+f*l.x;M.y+=u*s.y+f*l.y;M.z+=u*s.z+f*l.z;this.grid[p][m]=n(M.x,M.y,M.z)}}for(p=0;p<this.segments;p++)for(m=0;m<this.radialSegments;m++){v=this.closed?(p+1)%this.segments:p+1;g=(m+1)%this.radialSegments;E=this.grid[p][m];y=this.grid[v][m];T=this.grid[v][g];x=this.grid[p][g];b=new THREE.Vector2(p/this.segments,m/this.radialSegments);_=new THREE.Vector2((p+1)/this.segments,m/this.radialSegments);R=new THREE.Vector2((p+1)/this.segments,(m+1)/this.radialSegments);w=new THREE.Vector2(p/this.segments,(m+1)/this.radialSegments);this.faces.push(new THREE.Face4(E,y,T,x));this.faceVertexUvs[0].push([b,_,R,w])}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.TubeGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TubeGeometry.FrenetFrames=function(e,t,i){function r(){d[0]=new THREE.Vector3;p[0]=new THREE.Vector3;n=Number.MAX_VALUE;o=Math.abs(f[0].x);s=Math.abs(f[0].y);l=Math.abs(f[0].z);if(n>=o){n=o;u.set(1,0,0)}if(n>=s){n=s;u.set(0,1,0)}if(n>=l)u.set(0,0,1);m.crossVectors(f[0],u).normalize();d[0].crossVectors(f[0],m);p[0].crossVectors(f[0],d[0])}var a,n,o,s,l,c,h,u=(new THREE.Vector3,new THREE.Vector3),f=(new THREE.Vector3,[]),d=[],p=[],m=new THREE.Vector3,v=new THREE.Matrix4,g=t+1,E=1e-4;this.tangents=f;this.normals=d;this.binormals=p;for(c=0;g>c;c++){h=c/(g-1);f[c]=e.getTangentAt(h);f[c].normalize()}r();for(c=1;g>c;c++){d[c]=d[c-1].clone();p[c]=p[c-1].clone();m.crossVectors(f[c-1],f[c]);if(m.length()>E){m.normalize();a=Math.acos(THREE.Math.clamp(f[c-1].dot(f[c]),-1,1));d[c].applyMatrix4(v.makeRotationAxis(m,a))}p[c].crossVectors(f[c],d[c])}if(i){a=Math.acos(THREE.Math.clamp(d[0].dot(d[g-1]),-1,1));a/=g-1;if(f[0].dot(m.crossVectors(d[0],d[g-1]))>0)a=-a;for(c=1;g>c;c++){d[c].applyMatrix4(v.makeRotationAxis(f[c],a*c));p[c].crossVectors(f[c],d[c])}}};