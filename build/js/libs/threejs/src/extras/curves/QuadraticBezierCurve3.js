THREE.QuadraticBezierCurve3=THREE.Curve.create(function(e,t,i){this.v0=e;this.v1=t;this.v2=i},function(e){var t,i,r;t=THREE.Shape.Utils.b2(e,this.v0.x,this.v1.x,this.v2.x);i=THREE.Shape.Utils.b2(e,this.v0.y,this.v1.y,this.v2.y);r=THREE.Shape.Utils.b2(e,this.v0.z,this.v1.z,this.v2.z);return new THREE.Vector3(t,i,r)});