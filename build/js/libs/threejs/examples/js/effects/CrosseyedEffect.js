THREE.CrosseyedEffect=function(e){this.separation=10;var t,i;var r=new THREE.PerspectiveCamera;r.target=new THREE.Vector3;var n=new THREE.PerspectiveCamera;n.target=new THREE.Vector3;e.autoClear=!1;this.setSize=function(r,n){t=r/2;i=n;e.setSize(r,n)};this.render=function(o,a){r.fov=a.fov;r.aspect=.5*a.aspect;r.near=a.near;r.far=a.far;r.updateProjectionMatrix();r.position.copy(a.position);r.target.copy(a.target);r.translateX(this.separation);r.lookAt(r.target);n.near=a.near;n.far=a.far;n.projectionMatrix=r.projectionMatrix;n.position.copy(a.position);n.target.copy(a.target);n.translateX(-this.separation);n.lookAt(n.target);e.clear();e.setViewport(0,0,t,i);e.render(o,r);e.setViewport(t,0,t,i);e.render(o,n,!1)}};