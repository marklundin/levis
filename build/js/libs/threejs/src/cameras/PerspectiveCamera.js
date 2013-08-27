THREE.PerspectiveCamera=function(e,t,i,r){THREE.Camera.call(this);this.fov=void 0!==e?e:50;this.aspect=void 0!==t?t:1;this.near=void 0!==i?i:.1;this.far=void 0!==r?r:2e3;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype=Object.create(THREE.Camera.prototype);THREE.PerspectiveCamera.prototype.setLens=function(e,t){if(void 0===t)t=24;this.fov=2*THREE.Math.radToDeg(Math.atan(t/(2*e)));this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype.setViewOffset=function(e,t,i,r,n,o){this.fullWidth=e;this.fullHeight=t;this.x=i;this.y=r;this.width=n;this.height=o;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype.updateProjectionMatrix=function(){if(this.fullWidth){var e=this.fullWidth/this.fullHeight;var t=Math.tan(THREE.Math.degToRad(.5*this.fov))*this.near;var i=-t;var r=e*i;var n=e*t;var o=Math.abs(n-r);var a=Math.abs(t-i);this.projectionMatrix.makeFrustum(r+this.x*o/this.fullWidth,r+(this.x+this.width)*o/this.fullWidth,t-(this.y+this.height)*a/this.fullHeight,t-this.y*a/this.fullHeight,this.near,this.far)}else this.projectionMatrix.makePerspective(this.fov,this.aspect,this.near,this.far)};