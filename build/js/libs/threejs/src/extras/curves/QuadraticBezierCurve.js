THREE.QuadraticBezierCurve=function(e,t,i){this.v0=e;this.v1=t;this.v2=i};THREE.QuadraticBezierCurve.prototype=Object.create(THREE.Curve.prototype);THREE.QuadraticBezierCurve.prototype.getPoint=function(e){var t,i;t=THREE.Shape.Utils.b2(e,this.v0.x,this.v1.x,this.v2.x);i=THREE.Shape.Utils.b2(e,this.v0.y,this.v1.y,this.v2.y);return new THREE.Vector2(t,i)};THREE.QuadraticBezierCurve.prototype.getTangent=function(e){var t,i;t=THREE.Curve.Utils.tangentQuadraticBezier(e,this.v0.x,this.v1.x,this.v2.x);i=THREE.Curve.Utils.tangentQuadraticBezier(e,this.v0.y,this.v1.y,this.v2.y);var r=new THREE.Vector2(t,i);r.normalize();return r};