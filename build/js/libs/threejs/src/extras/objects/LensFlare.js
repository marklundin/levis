THREE.LensFlare=function(e,t,i,r,a){THREE.Object3D.call(this);this.lensFlares=[];this.positionScreen=new THREE.Vector3;this.customUpdateCallback=void 0;if(void 0!==e)this.add(e,t,i,r,a)};THREE.LensFlare.prototype=Object.create(THREE.Object3D.prototype);THREE.LensFlare.prototype.add=function(e,t,i,r,a,o){if(void 0===t)t=-1;if(void 0===i)i=0;if(void 0===o)o=1;if(void 0===a)a=new THREE.Color(16777215);if(void 0===r)r=THREE.NormalBlending;i=Math.min(i,Math.max(0,i));this.lensFlares.push({texture:e,size:t,distance:i,x:0,y:0,z:0,scale:1,rotation:1,opacity:o,color:a,blending:r})};THREE.LensFlare.prototype.updateLensFlares=function(){var e,t=this.lensFlares.length;var i;var r=2*-this.positionScreen.x;var a=2*-this.positionScreen.y;for(e=0;t>e;e++){i=this.lensFlares[e];i.x=this.positionScreen.x+r*i.distance;i.y=this.positionScreen.y+a*i.distance;i.wantedRotation=.25*i.x*Math.PI;i.rotation+=.25*(i.wantedRotation-i.rotation)}};