THREE.Curve=function(){};THREE.Curve.prototype.getPoint=function(){console.log("Warning, getPoint() not implemented!");return null};THREE.Curve.prototype.getPointAt=function(e){var t=this.getUtoTmapping(e);return this.getPoint(t)};THREE.Curve.prototype.getPoints=function(e){if(!e)e=5;var t,i=[];for(t=0;e>=t;t++)i.push(this.getPoint(t/e));return i};THREE.Curve.prototype.getSpacedPoints=function(e){if(!e)e=5;var t,i=[];for(t=0;e>=t;t++)i.push(this.getPointAt(t/e));return i};THREE.Curve.prototype.getLength=function(){var e=this.getLengths();return e[e.length-1]};THREE.Curve.prototype.getLengths=function(e){if(!e)e=this.__arcLengthDivisions?this.__arcLengthDivisions:200;if(this.cacheArcLengths&&this.cacheArcLengths.length==e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;var t=[];var i,r=this.getPoint(0);var a,n=0;t.push(0);for(a=1;e>=a;a++){i=this.getPoint(a/e);n+=i.distanceTo(r);t.push(n);r=i}this.cacheArcLengths=t;return t};THREE.Curve.prototype.updateArcLengths=function(){this.needsUpdate=!0;this.getLengths()};THREE.Curve.prototype.getUtoTmapping=function(e,t){var i=this.getLengths();var r=0,a=i.length;var n;if(t)n=t;else n=e*i[a-1];var o,s=0,l=a-1;for(;l>=s;){r=Math.floor(s+(l-s)/2);o=i[r]-n;if(!(0>o));else s=r+1}r=l;if(i[r]==n){var c=r/(a-1);return c}var h=i[r];var u=i[r+1];var f=u-h;var d=(n-h)/f;var c=(r+d)/(a-1);return c};THREE.Curve.prototype.getTangent=function(e){var t=1e-4;var i=e-t;var r=e+t;if(0>i)i=0;if(r>1)r=1;var a=this.getPoint(i);var n=this.getPoint(r);var o=n.clone().sub(a);return o.normalize()};THREE.Curve.prototype.getTangentAt=function(e){var t=this.getUtoTmapping(e);return this.getTangent(t)};THREE.Curve.Utils={tangentQuadraticBezier:function(e,t,i,r){return 2*(1-e)*(i-t)+2*e*(r-i)},tangentCubicBezier:function(e,t,i,r,a){return-3*t*(1-e)*(1-e)+3*i*(1-e)*(1-e)-6*e*i*(1-e)+6*e*r*(1-e)-3*e*e*r+3*e*e*a},tangentSpline:function(e){var t=6*e*e-6*e;var i=3*e*e-4*e+1;var r=-6*e*e+6*e;var a=3*e*e-2*e;return t+i+r+a},interpolate:function(e,t,i,r,a){var n=.5*(i-e);var o=.5*(r-t);var s=a*a;var l=a*s;return(2*t-2*i+n+o)*l+(-3*t+3*i-2*n-o)*s+n*a+t}};THREE.Curve.create=function(e,t){e.prototype=Object.create(THREE.Curve.prototype);e.prototype.getPoint=t;return e};