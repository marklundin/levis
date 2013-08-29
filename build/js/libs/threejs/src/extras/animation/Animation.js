THREE.Animation=function(e,t,i){this.root=e;this.data=THREE.AnimationHandler.get(t);this.hierarchy=THREE.AnimationHandler.parse(e);this.currentTime=0;this.timeScale=1;this.isPlaying=!1;this.isPaused=!0;this.loop=!0;this.interpolationType=void 0!==i?i:THREE.AnimationHandler.LINEAR;this.points=[];this.target=new THREE.Vector3};THREE.Animation.prototype.play=function(e,t){if(this.isPlaying===!1){this.isPlaying=!0;this.loop=void 0!==e?e:!0;this.currentTime=void 0!==t?t:0;var i,r,n=this.hierarchy.length;for(i=0;n>i;i++){r=this.hierarchy[i];r.matrixAutoUpdate=!0;if(void 0===r.animationCache){r.animationCache={};r.animationCache.prevKey={pos:0,rot:0,scl:0};r.animationCache.nextKey={pos:0,rot:0,scl:0};r.animationCache.originalMatrix=r instanceof THREE.Bone?r.skinMatrix:r.matrix}var o=r.animationCache.prevKey;var a=r.animationCache.nextKey;o.pos=this.data.hierarchy[i].keys[0];o.rot=this.data.hierarchy[i].keys[0];o.scl=this.data.hierarchy[i].keys[0];a.pos=this.getNextKeyWith("pos",i,1);a.rot=this.getNextKeyWith("rot",i,1);a.scl=this.getNextKeyWith("scl",i,1)}this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};THREE.Animation.prototype.pause=function(){if(this.isPaused===!0)THREE.AnimationHandler.addToUpdate(this);else THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};THREE.Animation.prototype.stop=function(){this.isPlaying=!1;this.isPaused=!1;THREE.AnimationHandler.removeFromUpdate(this)};THREE.Animation.prototype.update=function(e){if(this.isPlaying!==!1){var t=["pos","rot","scl"];var i;var r;var n;var o,a;var s,l;var c;var h;var u;this.data.JIT.hierarchy;var f,d;var p,m,v;this.currentTime+=e*this.timeScale;d=this.currentTime;f=this.currentTime=this.currentTime%this.data.length;u=parseInt(Math.min(f*this.data.fps,this.data.length*this.data.fps),10);for(var g=0,E=this.hierarchy.length;E>g;g++){c=this.hierarchy[g];h=c.animationCache;for(var y=0;3>y;y++){i=t[y];s=h.prevKey[i];l=h.nextKey[i];if(l.time<=d){if(d>f)if(this.loop){s=this.data.hierarchy[g].keys[0];l=this.getNextKeyWith(i,g,1);for(;l.time<f;){s=l;l=this.getNextKeyWith(i,g,l.index+1)}}else{this.stop();return}else do{s=l;l=this.getNextKeyWith(i,g,l.index+1)}while(l.time<f);h.prevKey[i]=s;h.nextKey[i]=l}c.matrixAutoUpdate=!0;c.matrixWorldNeedsUpdate=!0;r=(f-s.time)/(l.time-s.time);o=s[i];a=l[i];if(0>r||r>1){console.log("THREE.Animation.update: Warning! Scale out of bounds:"+r+" on bone "+g);r=0>r?0:1}if("pos"===i){n=c.position;if(this.interpolationType===THREE.AnimationHandler.LINEAR){n.x=o[0]+(a[0]-o[0])*r;n.y=o[1]+(a[1]-o[1])*r;n.z=o[2]+(a[2]-o[2])*r}else if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){this.points[0]=this.getPrevKeyWith("pos",g,s.index-1)["pos"];this.points[1]=o;this.points[2]=a;this.points[3]=this.getNextKeyWith("pos",g,l.index+1)["pos"];r=.33*r+.33;p=this.interpolateCatmullRom(this.points,r);n.x=p[0];n.y=p[1];n.z=p[2];if(this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){m=this.interpolateCatmullRom(this.points,1.01*r);this.target.set(m[0],m[1],m[2]);this.target.sub(n);this.target.y=0;this.target.normalize();v=Math.atan2(this.target.x,this.target.z);c.rotation.set(0,v,0)}}}else if("rot"===i)THREE.Quaternion.slerp(o,a,c.quaternion,r);else if("scl"===i){n=c.scale;n.x=o[0]+(a[0]-o[0])*r;n.y=o[1]+(a[1]-o[1])*r;n.z=o[2]+(a[2]-o[2])*r}}}}};THREE.Animation.prototype.interpolateCatmullRom=function(e,t){var i,r,n,o,a,s,l,c,h,u=[],f=[];i=(e.length-1)*t;r=Math.floor(i);n=i-r;u[0]=0===r?r:r-1;u[1]=r;u[2]=r>e.length-2?r:r+1;u[3]=r>e.length-3?r:r+2;s=e[u[0]];l=e[u[1]];c=e[u[2]];h=e[u[3]];o=n*n;a=n*o;f[0]=this.interpolate(s[0],l[0],c[0],h[0],n,o,a);f[1]=this.interpolate(s[1],l[1],c[1],h[1],n,o,a);f[2]=this.interpolate(s[2],l[2],c[2],h[2],n,o,a);return f};THREE.Animation.prototype.interpolate=function(e,t,i,r,n,o,a){var s=.5*(i-e),l=.5*(r-t);return(2*(t-i)+s+l)*a+(-3*(t-i)-2*s-l)*o+s*n+t};THREE.Animation.prototype.getNextKeyWith=function(e,t,i){var r=this.data.hierarchy[t].keys;if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)i=i<r.length-1?i:r.length-1;else i%=r.length;for(;i<r.length;i++)if(void 0!==r[i][e])return r[i];return this.data.hierarchy[t].keys[0]};THREE.Animation.prototype.getPrevKeyWith=function(e,t,i){var r=this.data.hierarchy[t].keys;if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)i=i>0?i:0;else i=i>=0?i:i+r.length;for(;i>=0;i--)if(void 0!==r[i][e])return r[i];return this.data.hierarchy[t].keys[r.length-1]};