THREE.SplineCurve=function(e){this.points=void 0==e?[]:e};THREE.SplineCurve.prototype=Object.create(THREE.Curve.prototype);THREE.SplineCurve.prototype.getPoint=function(e){var t=new THREE.Vector2;var i=[];var r,n,a,o=this.points;r=(o.length-1)*e;n=Math.floor(r);a=r-n;i[0]=0==n?n:n-1;i[1]=n;i[2]=n>o.length-2?o.length-1:n+1;i[3]=n>o.length-3?o.length-1:n+2;t.x=THREE.Curve.Utils.interpolate(o[i[0]].x,o[i[1]].x,o[i[2]].x,o[i[3]].x,a);t.y=THREE.Curve.Utils.interpolate(o[i[0]].y,o[i[1]].y,o[i[2]].y,o[i[3]].y,a);return t};