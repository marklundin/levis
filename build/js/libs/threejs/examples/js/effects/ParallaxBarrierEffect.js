THREE.ParallaxBarrierEffect=function(e){var t=new THREE.Matrix4;var i=new THREE.Matrix4;var r=125;var n,o,a,s;var l=new THREE.PerspectiveCamera;l.matrixAutoUpdate=!1;var h=new THREE.PerspectiveCamera;h.matrixAutoUpdate=!1;var c=new THREE.Scene;var u=new THREE.PerspectiveCamera(53,1,1,1e4);u.position.z=2;c.add(u);var f={minFilter:THREE.LinearFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat};var d=new THREE.WebGLRenderTarget(512,512,f);var p=new THREE.WebGLRenderTarget(512,512,f);var m=new THREE.ShaderMaterial({uniforms:{mapLeft:{type:"t",value:d},mapRight:{type:"t",value:p}},vertexShader:["varying vec2 vUv;","void main() {","	vUv = vec2( uv.x, uv.y );","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D mapLeft;","uniform sampler2D mapRight;","varying vec2 vUv;","void main() {","	vec2 uv = vUv;","	if ( ( mod( gl_FragCoord.x, 2.0 ) ) > 1.00 ) {","		gl_FragColor = texture2D( mapLeft, uv );","	} else {","		gl_FragColor = texture2D( mapRight, uv );","	}","}"].join("\n")});var v=new THREE.Mesh(new THREE.PlaneGeometry(2,2),m);c.add(v);this.setSize=function(t,i){d=new THREE.WebGLRenderTarget(t,i,f);p=new THREE.WebGLRenderTarget(t,i,f);m.uniforms["mapLeft"].value=d;m.uniforms["mapRight"].value=p;e.setSize(t,i)};this.render=function(f,m){f.updateMatrixWorld();if(void 0===m.parent)m.updateMatrixWorld();var v=n!==m.aspect||o!==m.near||a!==m.far||s!==m.fov;if(v){n=m.aspect;o=m.near;a=m.far;s=m.fov;var g=m.projectionMatrix.clone();var E=.5*(r/30);var y=E*o/r;var T=o*Math.tan(THREE.Math.degToRad(.5*s));var _,x;t.elements[12]=E;i.elements[12]=-E;_=-T*n+y;x=T*n+y;g.elements[0]=2*o/(x-_);g.elements[8]=(x+_)/(x-_);l.projectionMatrix.copy(g);_=-T*n-y;x=T*n-y;g.elements[0]=2*o/(x-_);g.elements[8]=(x+_)/(x-_);h.projectionMatrix.copy(g)}l.matrixWorld.copy(m.matrixWorld).multiply(i);l.position.copy(m.position);l.near=m.near;l.far=m.far;e.render(f,l,d,!0);h.matrixWorld.copy(m.matrixWorld).multiply(t);h.position.copy(m.position);h.near=m.near;h.far=m.far;e.render(f,h,p,!0);c.updateMatrixWorld();e.render(c,u)}};