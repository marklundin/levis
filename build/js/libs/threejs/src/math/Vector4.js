THREE.Vector4=function(e,t,i,r){this.x=e||0;this.y=t||0;this.z=i||0;this.w=void 0!==r?r:1};THREE.Vector4.prototype={constructor:THREE.Vector4,set:function(e,t,i,r){this.x=e;this.y=t;this.z=i;this.w=r;return this},setX:function(e){this.x=e;return this},setY:function(e){this.y=e;return this},setZ:function(e){this.z=e;return this},setW:function(e){this.w=e;return this},setComponent:function(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}},getComponent:function(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}},copy:function(e){this.x=e.x;this.y=e.y;this.z=e.z;this.w=void 0!==e.w?e.w:1;return this},add:function(e,t){if(void 0!==t){console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead.");return this.addVectors(e,t)}this.x+=e.x;this.y+=e.y;this.z+=e.z;this.w+=e.w;return this},addScalar:function(e){this.x+=e;this.y+=e;this.z+=e;this.w+=e;return this},addVectors:function(e,t){this.x=e.x+t.x;this.y=e.y+t.y;this.z=e.z+t.z;this.w=e.w+t.w;return this},sub:function(e,t){if(void 0!==t){console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");return this.subVectors(e,t)}this.x-=e.x;this.y-=e.y;this.z-=e.z;this.w-=e.w;return this},subVectors:function(e,t){this.x=e.x-t.x;this.y=e.y-t.y;this.z=e.z-t.z;this.w=e.w-t.w;return this},multiplyScalar:function(e){this.x*=e;this.y*=e;this.z*=e;this.w*=e;return this},applyMatrix4:function(e){var t=this.x;var i=this.y;var r=this.z;var a=this.w;var n=e.elements;this.x=n[0]*t+n[4]*i+n[8]*r+n[12]*a;this.y=n[1]*t+n[5]*i+n[9]*r+n[13]*a;this.z=n[2]*t+n[6]*i+n[10]*r+n[14]*a;this.w=n[3]*t+n[7]*i+n[11]*r+n[15]*a;return this},divideScalar:function(e){if(0!==e){var t=1/e;this.x*=t;this.y*=t;this.z*=t;this.w*=t}else{this.x=0;this.y=0;this.z=0;this.w=1}return this},setAxisAngleFromQuaternion:function(e){this.w=2*Math.acos(e.w);var t=Math.sqrt(1-e.w*e.w);if(1e-4>t){this.x=1;this.y=0;this.z=0}else{this.x=e.x/t;this.y=e.y/t;this.z=e.z/t}return this},setAxisAngleFromRotationMatrix:function(e){var t,i,r,a,n=.01,o=.1,s=e.elements,l=s[0],h=s[4],c=s[8],u=s[1],f=s[5],d=s[9],p=s[2],m=s[6],v=s[10];if(Math.abs(h-u)<n&&Math.abs(c-p)<n&&Math.abs(d-m)<n){if(Math.abs(h+u)<o&&Math.abs(c+p)<o&&Math.abs(d+m)<o&&Math.abs(l+f+v-3)<o){this.set(1,0,0,0);return this}t=Math.PI;var g=(l+1)/2;var E=(f+1)/2;var y=(v+1)/2;var T=(h+u)/4;var x=(c+p)/4;var b=(d+m)/4;if(g>E&&g>y)if(n>g){i=0;r=.707106781;a=.707106781}else{i=Math.sqrt(g);r=T/i;a=x/i}else if(E>y)if(n>E){i=.707106781;r=0;a=.707106781}else{r=Math.sqrt(E);i=T/r;a=b/r}else if(n>y){i=.707106781;r=.707106781;a=0}else{a=Math.sqrt(y);i=x/a;r=b/a}this.set(i,r,a,t);return this}var R=Math.sqrt((m-d)*(m-d)+(c-p)*(c-p)+(u-h)*(u-h));if(Math.abs(R)<.001)R=1;this.x=(m-d)/R;this.y=(c-p)/R;this.z=(u-h)/R;this.w=Math.acos((l+f+v-1)/2);return this},min:function(e){if(this.x>e.x)this.x=e.x;if(this.y>e.y)this.y=e.y;if(this.z>e.z)this.z=e.z;if(this.w>e.w)this.w=e.w;return this},max:function(e){if(this.x<e.x)this.x=e.x;if(this.y<e.y)this.y=e.y;if(this.z<e.z)this.z=e.z;if(this.w<e.w)this.w=e.w;return this},clamp:function(e,t){if(this.x<e.x)this.x=e.x;else if(this.x>t.x)this.x=t.x;if(this.y<e.y)this.y=e.y;else if(this.y>t.y)this.y=t.y;if(this.z<e.z)this.z=e.z;else if(this.z>t.z)this.z=t.z;if(this.w<e.w)this.w=e.w;else if(this.w>t.w)this.w=t.w;return this},negate:function(){return this.multiplyScalar(-1)},dot:function(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},normalize:function(){return this.divideScalar(this.length())},setLength:function(e){var t=this.length();if(0!==t&&e!==t)this.multiplyScalar(e/t);return this},lerp:function(e,t){this.x+=(e.x-this.x)*t;this.y+=(e.y-this.y)*t;this.z+=(e.z-this.z)*t;this.w+=(e.w-this.w)*t;return this},equals:function(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w},fromArray:function(e){this.x=e[0];this.y=e[1];this.z=e[2];this.w=e[3];return this},toArray:function(){return[this.x,this.y,this.z,this.w]},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)}};