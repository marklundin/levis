THREE.KeyFrameAnimation=function(e,t,i){this.root=e;this.data=THREE.AnimationHandler.get(t);this.hierarchy=THREE.AnimationHandler.parse(e);this.currentTime=0;this.timeScale=.001;this.isPlaying=!1;this.isPaused=!0;this.loop=!0;this.JITCompile=void 0!==i?i:!0;for(var r=0,n=this.hierarchy.length;n>r;r++){var a=this.data.hierarchy[r].keys,o=this.data.hierarchy[r].sids,s=this.hierarchy[r];if(a.length&&o){for(var l=0;l<o.length;l++){var c=o[l],h=this.getNextKeyWith(c,r,0);if(h)h.apply(c)}s.matrixAutoUpdate=!1;this.data.hierarchy[r].node.updateMatrix();s.matrixWorldNeedsUpdate=!0}}};THREE.KeyFrameAnimation.prototype.play=function(e,t){if(!this.isPlaying){this.isPlaying=!0;this.loop=void 0!==e?e:!0;this.currentTime=void 0!==t?t:0;this.startTimeMs=t;this.startTime=1e7;this.endTime=-this.startTime;var i,r,n,a=this.hierarchy.length;for(i=0;a>i;i++){r=this.hierarchy[i];n=this.data.hierarchy[i];if(void 0===n.animationCache){n.animationCache={};n.animationCache.prevKey=null;n.animationCache.nextKey=null;n.animationCache.originalMatrix=r instanceof THREE.Bone?r.skinMatrix:r.matrix}var o=this.data.hierarchy[i].keys;if(o.length){n.animationCache.prevKey=o[0];n.animationCache.nextKey=o[1];this.startTime=Math.min(o[0].time,this.startTime);this.endTime=Math.max(o[o.length-1].time,this.endTime)}}this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};THREE.KeyFrameAnimation.prototype.pause=function(){if(this.isPaused)THREE.AnimationHandler.addToUpdate(this);else THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};THREE.KeyFrameAnimation.prototype.stop=function(){this.isPlaying=!1;this.isPaused=!1;THREE.AnimationHandler.removeFromUpdate(this);for(var e=0;e<this.data.hierarchy.length;e++){var t=this.hierarchy[e];var i=this.data.hierarchy[e];if(void 0!==i.animationCache){var r=i.animationCache.originalMatrix;if(t instanceof THREE.Bone){r.copy(t.skinMatrix);t.skinMatrix=r}else{r.copy(t.matrix);t.matrix=r}delete i.animationCache}}};THREE.KeyFrameAnimation.prototype.update=function(e){if(this.isPlaying){var t,i;var r;var n;var a;var o=this.data.JIT.hierarchy;var s,l;var c;this.currentTime+=e*this.timeScale;l=this.currentTime;s=this.currentTime=this.currentTime%this.data.length;if(s<this.startTimeMs)s=this.currentTime=this.startTimeMs+s;a=parseInt(Math.min(s*this.data.fps,this.data.length*this.data.fps),10);c=l>s;if(!c||this.loop){if(!(s<this.startTime)){for(var h=0,u=this.hierarchy.length;u>h;h++){r=this.hierarchy[h];n=this.data.hierarchy[h];var f=n.keys,d=n.animationCache;if(this.JITCompile&&void 0!==o[h][a])if(r instanceof THREE.Bone){r.skinMatrix=o[h][a];r.matrixWorldNeedsUpdate=!1}else{r.matrix=o[h][a];r.matrixWorldNeedsUpdate=!0}else if(f.length){if(this.JITCompile&&d)if(r instanceof THREE.Bone)r.skinMatrix=d.originalMatrix;else r.matrix=d.originalMatrix;t=d.prevKey;i=d.nextKey;if(t&&i){if(i.time<=l){if(c&&this.loop){t=f[0];i=f[1];for(;i.time<s;){t=i;i=f[t.index+1]}}else if(!c){var p=f.length-1;for(;i.time<s&&i.index!==p;){t=i;i=f[t.index+1]}}d.prevKey=t;d.nextKey=i}if(i.time>=s)t.interpolate(i,s);else t.interpolate(i,i.time)}this.data.hierarchy[h].node.updateMatrix();r.matrixWorldNeedsUpdate=!0}}if(this.JITCompile)if(void 0===o[0][a]){this.hierarchy[0].updateMatrixWorld(!0);for(var h=0;h<this.hierarchy.length;h++)if(this.hierarchy[h]instanceof THREE.Bone)o[h][a]=this.hierarchy[h].skinMatrix.clone();else o[h][a]=this.hierarchy[h].matrix.clone()}}}else{for(var h=0,u=this.hierarchy.length;u>h;h++){var f=this.data.hierarchy[h].keys,m=this.data.hierarchy[h].sids,v=f.length-1,g=this.hierarchy[h];if(f.length){for(var E=0;E<m.length;E++){var y=m[E],T=this.getPrevKeyWith(y,h,v);if(T)T.apply(y)}this.data.hierarchy[h].node.updateMatrix();g.matrixWorldNeedsUpdate=!0}}this.stop()}}};THREE.KeyFrameAnimation.prototype.getNextKeyWith=function(e,t,i){var r=this.data.hierarchy[t].keys;i%=r.length;for(;i<r.length;i++)if(r[i].hasTarget(e))return r[i];return r[0]};THREE.KeyFrameAnimation.prototype.getPrevKeyWith=function(e,t,i){var r=this.data.hierarchy[t].keys;i=i>=0?i:i+r.length;for(;i>=0;i--)if(r[i].hasTarget(e))return r[i];return r[r.length-1]};