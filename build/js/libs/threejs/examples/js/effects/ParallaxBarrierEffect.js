THREE.ParallaxBarrierEffect=function(e){var t,i,r,n,o=new THREE.Matrix4,a=new THREE.Matrix4,s=125,l=new THREE.PerspectiveCamera;l.matrixAutoUpdate=!1;var h=new THREE.PerspectiveCamera;h.matrixAutoUpdate=!1;var c=new THREE.Scene,u=new THREE.PerspectiveCamera(53,1,1,1e4);u.position.z=2,c.add(u);var d={minFilter:THREE.LinearFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat},p=new THREE.WebGLRenderTarget(512,512,d),f=new THREE.WebGLRenderTarget(512,512,d),m=new THREE.ShaderMaterial({uniforms:{mapLeft:{type:"t",value:p},mapRight:{type:"t",value:f}},vertexShader:["varying vec2 vUv;","void main() {","	vUv = vec2( uv.x, uv.y );","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D mapLeft;","uniform sampler2D mapRight;","varying vec2 vUv;","void main() {","	vec2 uv = vUv;","	if ( ( mod( gl_FragCoord.x, 2.0 ) ) > 1.00 ) {","		gl_FragColor = texture2D( mapLeft, uv );","	} else {","		gl_FragColor = texture2D( mapRight, uv );","	}","}"].join("\n")}),g=new THREE.Mesh(new THREE.PlaneGeometry(2,2),m);c.add(g),this.setSize=function(t,i){p=new THREE.WebGLRenderTarget(t,i,d),f=new THREE.WebGLRenderTarget(t,i,d),m.uniforms.mapLeft.value=p,m.uniforms.mapRight.value=f,e.setSize(t,i)},this.render=function(d,m){d.updateMatrixWorld(),void 0===m.parent&&m.updateMatrixWorld();var g=t!==m.aspect||i!==m.near||r!==m.far||n!==m.fov;if(g){t=m.aspect,i=m.near,r=m.far,n=m.fov;var v,E,y=m.projectionMatrix.clone(),T=.5*(s/30),_=T*i/s,x=i*Math.tan(THREE.Math.degToRad(.5*n));o.elements[12]=T,a.elements[12]=-T,v=-x*t+_,E=x*t+_,y.elements[0]=2*i/(E-v),y.elements[8]=(E+v)/(E-v),l.projectionMatrix.copy(y),v=-x*t-_,E=x*t-_,y.elements[0]=2*i/(E-v),y.elements[8]=(E+v)/(E-v),h.projectionMatrix.copy(y)}l.matrixWorld.copy(m.matrixWorld).multiply(a),l.position.copy(m.position),l.near=m.near,l.far=m.far,e.render(d,l,p,!0),h.matrixWorld.copy(m.matrixWorld).multiply(o),h.position.copy(m.position),h.near=m.near,h.far=m.far,e.render(d,h,f,!0),c.updateMatrixWorld(),e.render(c,u)}};