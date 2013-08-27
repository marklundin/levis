THREE.Frustum=function(e,t,i,r,a,o){this.planes=[void 0!==e?e:new THREE.Plane,void 0!==t?t:new THREE.Plane,void 0!==i?i:new THREE.Plane,void 0!==r?r:new THREE.Plane,void 0!==a?a:new THREE.Plane,void 0!==o?o:new THREE.Plane]};THREE.Frustum.prototype={constructor:THREE.Frustum,set:function(e,t,i,r,a,o){var n=this.planes;n[0].copy(e);n[1].copy(t);n[2].copy(i);n[3].copy(r);n[4].copy(a);n[5].copy(o);return this},copy:function(e){var t=this.planes;for(var i=0;6>i;i++)t[i].copy(e.planes[i]);return this},setFromMatrix:function(e){var t=this.planes;var i=e.elements;var r=i[0],a=i[1],o=i[2],n=i[3];var s=i[4],l=i[5],c=i[6],h=i[7];var u=i[8],f=i[9],d=i[10],p=i[11];var m=i[12],v=i[13],g=i[14],E=i[15];t[0].setComponents(n-r,h-s,p-u,E-m).normalize();t[1].setComponents(n+r,h+s,p+u,E+m).normalize();t[2].setComponents(n+a,h+l,p+f,E+v).normalize();t[3].setComponents(n-a,h-l,p-f,E-v).normalize();t[4].setComponents(n-o,h-c,p-d,E-g).normalize();t[5].setComponents(n+o,h+c,p+d,E+g).normalize();return this},intersectsObject:function(){var e=new THREE.Vector3;return function(t){var i=t.geometry;var r=t.matrixWorld;if(null===i.boundingSphere)i.computeBoundingSphere();var a=-i.boundingSphere.radius*r.getMaxScaleOnAxis();e.getPositionFromMatrix(r);var o=this.planes;for(var n=0;6>n;n++){var s=o[n].distanceToPoint(e);if(a>s)return!1}return!0}}(),intersectsSphere:function(e){var t=this.planes;var i=e.center;var r=-e.radius;for(var a=0;6>a;a++){var o=t[a].distanceToPoint(i);if(r>o)return!1}return!0},intersectsBox:function(){var e=new THREE.Vector3,t=new THREE.Vector3;return function(i){var r=this.planes;for(var a=0;6>a;a++){var o=r[a];e.x=o.normal.x>0?i.min.x:i.max.x;t.x=o.normal.x>0?i.max.x:i.min.x;e.y=o.normal.y>0?i.min.y:i.max.y;t.y=o.normal.y>0?i.max.y:i.min.y;e.z=o.normal.z>0?i.min.z:i.max.z;t.z=o.normal.z>0?i.max.z:i.min.z;var n=o.distanceToPoint(e);var s=o.distanceToPoint(t);if(0>n&&0>s)return!1}return!0}}(),containsPoint:function(e){var t=this.planes;for(var i=0;6>i;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0},clone:function(){return(new THREE.Frustum).copy(this)}};