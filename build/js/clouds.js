define(["libs/threejs/build/three","glsl!shaders/clouds.glsl"],function(){return function(e){var t={};new THREE.Geometry;var i=THREE.ImageUtils.loadTexture("js/cloud10.png");i.magFilter=THREE.LinearMipMapLinearFilter;i.minFilter=THREE.LinearMipMapLinearFilter;t.material=new THREE.ShaderMaterial({uniforms:{map:{type:"t",value:i},fogColor:{type:"c",value:e.fog.color},fogNear:{type:"f",value:e.fog.near},fogFar:{type:"f",value:e.fog.far}},vertexShader:cloudsShader.vertexShader,fragmentShader:cloudsShader.fragmentShader,depthWrite:!1,transparent:!0});new THREE.Mesh(new THREE.PlaneGeometry(64,64))}});