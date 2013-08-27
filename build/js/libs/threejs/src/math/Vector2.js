THREE.Vector2=function(e,t){this.x=e||0;this.y=t||0};THREE.Vector2.prototype={constructor:THREE.Vector2,set:function(e,t){this.x=e;this.y=t;return this},setX:function(e){this.x=e;return this},setY:function(e){this.y=e;return this},setComponent:function(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}},getComponent:function(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}},copy:function(e){this.x=e.x;this.y=e.y;return this},add:function(e,t){if(void 0!==t){console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead.");return this.addVectors(e,t)}this.x+=e.x;this.y+=e.y;return this},addVectors:function(e,t){this.x=e.x+t.x;this.y=e.y+t.y;return this},addScalar:function(e){this.x+=e;this.y+=e;return this},sub:function(e,t){if(void 0!==t){console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");return this.subVectors(e,t)}this.x-=e.x;this.y-=e.y;return this},subVectors:function(e,t){this.x=e.x-t.x;this.y=e.y-t.y;return this},multiplyScalar:function(e){this.x*=e;this.y*=e;return this},divideScalar:function(e){if(0!==e){var t=1/e;this.x*=t;this.y*=t}else{this.x=0;this.y=0}return this},min:function(e){if(this.x>e.x)this.x=e.x;if(this.y>e.y)this.y=e.y;return this},max:function(e){if(this.x<e.x)this.x=e.x;if(this.y<e.y)this.y=e.y;return this},clamp:function(e,t){if(this.x<e.x)this.x=e.x;else if(this.x>t.x)this.x=t.x;if(this.y<e.y)this.y=e.y;else if(this.y>t.y)this.y=t.y;return this},negate:function(){return this.multiplyScalar(-1)},dot:function(e){return this.x*e.x+this.y*e.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(e){return Math.sqrt(this.distanceToSquared(e))},distanceToSquared:function(e){var t=this.x-e.x,i=this.y-e.y;return t*t+i*i},setLength:function(e){var t=this.length();if(0!==t&&e!==t)this.multiplyScalar(e/t);return this},lerp:function(e,t){this.x+=(e.x-this.x)*t;this.y+=(e.y-this.y)*t;return this},equals:function(e){return e.x===this.x&&e.y===this.y},fromArray:function(e){this.x=e[0];this.y=e[1];return this},toArray:function(){return[this.x,this.y]},clone:function(){return new THREE.Vector2(this.x,this.y)}};