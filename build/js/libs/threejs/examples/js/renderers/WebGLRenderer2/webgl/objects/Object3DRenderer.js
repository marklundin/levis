THREE.WebGLRenderer.Object3DRenderer=function(e,t){this.renderer=e,this.info=t},THREE.extend(THREE.WebGLRenderer.Object3DRenderer.prototype,{getBufferMaterial:function(e,t){return e.material instanceof THREE.MeshFaceMaterial?e.material.materials[t.materialIndex]:e.material},bufferGuessUVType:function(e){return e.map||e.lightMap||e.bumpMap||e.normalMap||e.specularMap||e instanceof THREE.ShaderMaterial?!0:!1},bufferGuessNormalType:function(e){return e instanceof THREE.MeshBasicMaterial&&!e.envMap||e instanceof THREE.MeshDepthMaterial?!1:this.materialNeedsSmoothNormals(e)?THREE.SmoothShading:THREE.FlatShading},materialNeedsSmoothNormals:function(e){return e&&void 0!==e.shading&&e.shading===THREE.SmoothShading},bufferGuessVertexColorType:function(e){return e.vertexColors?e.vertexColors:!1},initCustomAttributes:function(e,t){var i=e.vertices.length,r=t.material;if(r.attributes){void 0===e.__webglCustomAttributesList&&(e.__webglCustomAttributesList=[]);for(var n in r.attributes){var o=r.attributes[n];if(!o.__webglInitialized||o.createUniqueBuffers){o.__webglInitialized=!0;var a=1;"v2"===o.type?a=2:"v3"===o.type?a=3:"v4"===o.type?a=4:"c"===o.type&&(a=3),o.size=a,o.array=new Float32Array(i*a),o.buffer=this.renderer.createBuffer(),o.buffer.belongsToAttribute=n,o.needsUpdate=!0}e.__webglCustomAttributesList.push(o)}}},numericalSort:function(e,t){return t[0]-e[0]}});