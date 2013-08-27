THREE.Ray=function(e,t){this.origin=void 0!==e?e:new THREE.Vector3;this.direction=void 0!==t?t:new THREE.Vector3};THREE.Ray.prototype={constructor:THREE.Ray,set:function(e,t){this.origin.copy(e);this.direction.copy(t);return this},copy:function(e){this.origin.copy(e.origin);this.direction.copy(e.direction);return this},at:function(e,t){var i=t||new THREE.Vector3;return i.copy(this.direction).multiplyScalar(e).add(this.origin)},recast:function(){var e=new THREE.Vector3;return function(t){this.origin.copy(this.at(t,e));return this}}(),closestPointToPoint:function(e,t){var i=t||new THREE.Vector3;i.subVectors(e,this.origin);var r=i.dot(this.direction);if(0>r)return i.copy(this.origin);else return i.copy(this.direction).multiplyScalar(r).add(this.origin)},distanceToPoint:function(){var e=new THREE.Vector3;return function(t){var i=e.subVectors(t,this.origin).dot(this.direction);if(0>i)return this.origin.distanceTo(t);e.copy(this.direction).multiplyScalar(i).add(this.origin);return e.distanceTo(t)}}(),distanceSqToSegment:function(e,t,i,r){var a=e.clone().add(t).multiplyScalar(.5);var n=t.clone().sub(e).normalize();var o=.5*e.distanceTo(t);var s=this.origin.clone().sub(a);var l=-this.direction.dot(n);var c=s.dot(this.direction);var h=-s.dot(n);var u=s.lengthSq();var f=Math.abs(1-l*l);var d,p,m,v;if(f>=0){d=l*h-c;p=l*c-h;v=o*f;if(d>=0)if(p>=-v)if(v>=p){var g=1/f;d*=g;p*=g;m=d*(d+l*p+2*c)+p*(l*d+p+2*h)+u}else{p=o;d=Math.max(0,-(l*p+c));m=-d*d+p*(p+2*h)+u}else{p=-o;d=Math.max(0,-(l*p+c));m=-d*d+p*(p+2*h)+u}else if(-v>=p){d=Math.max(0,-(-l*o+c));p=d>0?-o:Math.min(Math.max(-o,-h),o);m=-d*d+p*(p+2*h)+u}else if(v>=p){d=0;p=Math.min(Math.max(-o,-h),o);m=p*(p+2*h)+u}else{d=Math.max(0,-(l*o+c));p=d>0?o:Math.min(Math.max(-o,-h),o);m=-d*d+p*(p+2*h)+u}}else{p=l>0?-o:o;d=Math.max(0,-(l*p+c));m=-d*d+p*(p+2*h)+u}if(i)i.copy(this.direction.clone().multiplyScalar(d).add(this.origin));if(r)r.copy(n.clone().multiplyScalar(p).add(a));return m},isIntersectionSphere:function(e){return this.distanceToPoint(e.center)<=e.radius},isIntersectionPlane:function(e){var t=e.distanceToPoint(this.origin);if(0===t)return!0;var i=e.normal.dot(this.direction);if(0>i*t)return!0;else return!1},distanceToPlane:function(e){var t=e.normal.dot(this.direction);if(0==t)if(0==e.distanceToPoint(this.origin))return 0;else return null;var i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null},intersectPlane:function(e,t){var i=this.distanceToPlane(e);if(null===i)return null;else return this.at(i,t)},applyMatrix4:function(e){this.direction.add(this.origin).applyMatrix4(e);this.origin.applyMatrix4(e);this.direction.sub(this.origin);return this},equals:function(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)},clone:function(){return(new THREE.Ray).copy(this)}};