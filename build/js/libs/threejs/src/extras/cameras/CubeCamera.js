THREE.CubeCamera=function(e,t,i){THREE.Object3D.call(this);var r=90,a=1;var n=new THREE.PerspectiveCamera(r,a,e,t);n.up.set(0,-1,0);n.lookAt(new THREE.Vector3(1,0,0));this.add(n);var o=new THREE.PerspectiveCamera(r,a,e,t);o.up.set(0,-1,0);o.lookAt(new THREE.Vector3(-1,0,0));this.add(o);var s=new THREE.PerspectiveCamera(r,a,e,t);s.up.set(0,0,1);s.lookAt(new THREE.Vector3(0,1,0));this.add(s);var l=new THREE.PerspectiveCamera(r,a,e,t);l.up.set(0,0,-1);l.lookAt(new THREE.Vector3(0,-1,0));this.add(l);var c=new THREE.PerspectiveCamera(r,a,e,t);c.up.set(0,-1,0);c.lookAt(new THREE.Vector3(0,0,1));this.add(c);var h=new THREE.PerspectiveCamera(r,a,e,t);h.up.set(0,-1,0);h.lookAt(new THREE.Vector3(0,0,-1));this.add(h);this.renderTarget=new THREE.WebGLRenderTargetCube(i,i,{format:THREE.RGBFormat,magFilter:THREE.LinearFilter,minFilter:THREE.LinearFilter});this.updateCubeMap=function(e,t){var i=this.renderTarget;var r=i.generateMipmaps;i.generateMipmaps=!1;i.activeCubeFace=0;e.render(t,n,i);i.activeCubeFace=1;e.render(t,o,i);i.activeCubeFace=2;e.render(t,s,i);i.activeCubeFace=3;e.render(t,l,i);i.activeCubeFace=4;e.render(t,c,i);i.generateMipmaps=r;i.activeCubeFace=5;e.render(t,h,i)}};THREE.CubeCamera.prototype=Object.create(THREE.Object3D.prototype);