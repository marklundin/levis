THREE.ClosedSplineCurve3=THREE.Curve.create(function(e){this.points=void 0==e?[]:e},function(e){var t,i,r,n=new THREE.Vector3,o=[],a=this.points;return t=(a.length-0)*e,i=Math.floor(t),r=t-i,i+=i>0?0:(Math.floor(Math.abs(i)/a.length)+1)*a.length,o[0]=(i-1)%a.length,o[1]=i%a.length,o[2]=(i+1)%a.length,o[3]=(i+2)%a.length,n.x=THREE.Curve.Utils.interpolate(a[o[0]].x,a[o[1]].x,a[o[2]].x,a[o[3]].x,r),n.y=THREE.Curve.Utils.interpolate(a[o[0]].y,a[o[1]].y,a[o[2]].y,a[o[3]].y,r),n.z=THREE.Curve.Utils.interpolate(a[o[0]].z,a[o[1]].z,a[o[2]].z,a[o[3]].z,r),n});