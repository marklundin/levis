THREE.ParametricGeometry=function(e,t,i,r){THREE.Geometry.call(this);var a=this.vertices;var n=this.faces;var o=this.faceVertexUvs[0];r=void 0===r?!1:r;var s,l,c;var h,u;var f=t+1;for(s=0;i>=s;s++){u=s/i;for(l=0;t>=l;l++){h=l/t;c=e(h,u);a.push(c)}}var d,p,m,v;var g,E,y,T;for(s=0;i>s;s++)for(l=0;t>l;l++){d=s*f+l;p=s*f+l+1;m=(s+1)*f+l;v=(s+1)*f+l+1;g=new THREE.Vector2(l/t,s/i);E=new THREE.Vector2((l+1)/t,s/i);y=new THREE.Vector2(l/t,(s+1)/i);T=new THREE.Vector2((l+1)/t,(s+1)/i);if(r){n.push(new THREE.Face3(d,p,m));n.push(new THREE.Face3(p,v,m));o.push([g,E,y]);o.push([E,T,y])}else{n.push(new THREE.Face4(d,p,v,m));o.push([g,E,T,y])}}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.ParametricGeometry.prototype=Object.create(THREE.Geometry.prototype);