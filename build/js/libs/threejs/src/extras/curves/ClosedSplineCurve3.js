THREE.ClosedSplineCurve3=THREE.Curve.create(function(e){this.points=void 0==e?[]:e},function(e){var t=new THREE.Vector3;var i=[];var r,n,a,o=this.points;r=(o.length-0)*e;n=Math.floor(r);a=r-n;n+=n>0?0:(Math.floor(Math.abs(n)/o.length)+1)*o.length;i[0]=(n-1)%o.length;i[1]=n%o.length;i[2]=(n+1)%o.length;i[3]=(n+2)%o.length;t.x=THREE.Curve.Utils.interpolate(o[i[0]].x,o[i[1]].x,o[i[2]].x,o[i[3]].x,a);t.y=THREE.Curve.Utils.interpolate(o[i[0]].y,o[i[1]].y,o[i[2]].y,o[i[3]].y,a);t.z=THREE.Curve.Utils.interpolate(o[i[0]].z,o[i[1]].z,o[i[2]].z,o[i[3]].z,a);return t});