THREE.CombinedCamera=function(e,t,i,r,a,n,o){THREE.Camera.call(this);this.fov=i;this.left=-e/2;this.right=e/2;this.top=t/2;this.bottom=-t/2;this.cameraO=new THREE.OrthographicCamera(e/-2,e/2,t/2,t/-2,n,o);this.cameraP=new THREE.PerspectiveCamera(i,e/t,r,a);this.zoom=1;this.toPerspective()};THREE.CombinedCamera.prototype=Object.create(THREE.Camera.prototype);THREE.CombinedCamera.prototype.toPerspective=function(){this.near=this.cameraP.near;this.far=this.cameraP.far;this.cameraP.fov=this.fov/this.zoom;this.cameraP.updateProjectionMatrix();this.projectionMatrix=this.cameraP.projectionMatrix;this.inPerspectiveMode=!0;this.inOrthographicMode=!1};THREE.CombinedCamera.prototype.toOrthographic=function(){var e=this.fov;var t=this.cameraP.aspect;var i=this.cameraP.near;var r=this.cameraP.far;var a=(i+r)/2;var n=Math.tan(e/2)*a;var o=2*n;var s=o*t;var l=s/2;n/=this.zoom;l/=this.zoom;this.cameraO.left=-l;this.cameraO.right=l;this.cameraO.top=n;this.cameraO.bottom=-n;this.cameraO.updateProjectionMatrix();this.near=this.cameraO.near;this.far=this.cameraO.far;this.projectionMatrix=this.cameraO.projectionMatrix;this.inPerspectiveMode=!1;this.inOrthographicMode=!0};THREE.CombinedCamera.prototype.setSize=function(e,t){this.cameraP.aspect=e/t;this.left=-e/2;this.right=e/2;this.top=t/2;this.bottom=-t/2};THREE.CombinedCamera.prototype.setFov=function(e){this.fov=e;if(this.inPerspectiveMode)this.toPerspective();else this.toOrthographic()};THREE.CombinedCamera.prototype.updateProjectionMatrix=function(){if(this.inPerspectiveMode)this.toPerspective();else{this.toPerspective();this.toOrthographic()}};THREE.CombinedCamera.prototype.setLens=function(e,t){if(void 0===t)t=24;var i=2*THREE.Math.radToDeg(Math.atan(t/(2*e)));this.setFov(i);return i};THREE.CombinedCamera.prototype.setZoom=function(e){this.zoom=e;if(this.inPerspectiveMode)this.toPerspective();else this.toOrthographic()};THREE.CombinedCamera.prototype.toFrontView=function(){this.rotation.x=0;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toBackView=function(){this.rotation.x=0;this.rotation.y=Math.PI;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toLeftView=function(){this.rotation.x=0;this.rotation.y=-Math.PI/2;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toRightView=function(){this.rotation.x=0;this.rotation.y=Math.PI/2;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toTopView=function(){this.rotation.x=-Math.PI/2;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toBottomView=function(){this.rotation.x=Math.PI/2;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};