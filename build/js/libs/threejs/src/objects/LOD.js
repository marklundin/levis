THREE.LOD=function(){THREE.Object3D.call(this);this.objects=[]};THREE.LOD.prototype=Object.create(THREE.Object3D.prototype);THREE.LOD.prototype.addLevel=function(e,t){if(void 0===t)t=0;t=Math.abs(t);for(var i=0;i<this.objects.length&&!(t<this.objects[i].distance);i++);this.objects.splice(i,0,{distance:t,object:e});this.add(e)};THREE.LOD.prototype.getObjectForDistance=function(e){for(var t=1,i=this.objects.length;i>t&&!(e<this.objects[t].distance);t++);return this.objects[t-1].object};THREE.LOD.prototype.update=function(){var e=new THREE.Vector3;var t=new THREE.Vector3;return function(i){if(this.objects.length>1){e.getPositionFromMatrix(i.matrixWorld);t.getPositionFromMatrix(this.matrixWorld);var r=e.distanceTo(t);this.objects[0].object.visible=!0;for(var a=1,n=this.objects.length;n>a&&r>=this.objects[a].distance;a++){this.objects[a-1].object.visible=!1;this.objects[a].object.visible=!0}for(;n>a;a++)this.objects[a].object.visible=!1}}}();THREE.LOD.prototype.clone=function(){};