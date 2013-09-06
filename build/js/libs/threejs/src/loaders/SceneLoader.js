THREE.SceneLoader=function(){this.onLoadStart=function(){},this.onLoadProgress=function(){},this.onLoadComplete=function(){},this.callbackSync=function(){},this.callbackProgress=function(){},this.geometryHandlers={},this.hierarchyHandlers={},this.addGeometryHandler("ascii",THREE.JSONLoader)},THREE.SceneLoader.prototype={constructor:THREE.SceneLoader,load:function(e,t){var i=this,r=new THREE.XHRLoader(i.manager);r.setCrossOrigin(this.crossOrigin),r.load(e,function(r){i.parse(JSON.parse(r),t,e)})},setCrossOrigin:function(e){this.crossOrigin=e},addGeometryHandler:function(e,t){this.geometryHandlers[e]={loaderClass:t}},addHierarchyHandler:function(e,t){this.hierarchyHandlers[e]={loaderClass:t}},parse:function(e,t,i){function r(e,t){return"relativeToHTML"==t?e:C+"/"+e}function o(){n(S.scene,D.objects)}function n(e,t){var i,o,a,s,l,h;for(var u in t){var d=S.objects[u],p=t[u];if(void 0===d){if(p.type&&p.type in M.hierarchyHandlers){if(void 0===p.loading){var v={type:1,url:1,material:1,position:1,rotation:1,scale:1,visible:1,children:1,userData:1,skin:1,morph:1,mirroredLoop:1,duration:1},E={};for(var y in p)y in v||(E[y]=p[y]);m=S.materials[p.material],p.loading=!0;var R=M.hierarchyHandlers[p.type].loaderObject;R.options?R.load(r(p.url,D.urlBaseType),c(u,e,m,p)):R.load(r(p.url,D.urlBaseType),c(u,e,m,p),E)}}else if(void 0!==p.geometry){if(f=S.geometries[p.geometry]){var _=!1;if(m=S.materials[p.material],_=m instanceof THREE.ShaderMaterial,a=p.position,s=p.rotation,l=p.scale,i=p.matrix,h=p.quaternion,p.material||(m=new THREE.MeshFaceMaterial(S.face_materials[p.geometry])),m instanceof THREE.MeshFaceMaterial&&0===m.materials.length&&(m=new THREE.MeshFaceMaterial(S.face_materials[p.geometry])),m instanceof THREE.MeshFaceMaterial)for(var w=0;w<m.materials.length;w++)_=_||m.materials[w]instanceof THREE.ShaderMaterial;_&&f.computeTangents(),p.skin?d=new THREE.SkinnedMesh(f,m):p.morph?(d=new THREE.MorphAnimMesh(f,m),void 0!==p.duration&&(d.duration=p.duration),void 0!==p.time&&(d.time=p.time),void 0!==p.mirroredLoop&&(d.mirroredLoop=p.mirroredLoop),m.morphNormals&&f.computeMorphNormals()):d=new THREE.Mesh(f,m),d.name=u,i?(d.matrixAutoUpdate=!1,d.matrix.set(i[0],i[1],i[2],i[3],i[4],i[5],i[6],i[7],i[8],i[9],i[10],i[11],i[12],i[13],i[14],i[15])):(d.position.fromArray(a),h?d.quaternion.fromArray(h):d.rotation.fromArray(s),d.scale.fromArray(l)),d.visible=p.visible,d.castShadow=p.castShadow,d.receiveShadow=p.receiveShadow,e.add(d),S.objects[u]=d}}else"DirectionalLight"===p.type||"PointLight"===p.type||"AmbientLight"===p.type?(x=void 0!==p.color?p.color:16777215,b=void 0!==p.intensity?p.intensity:1,"DirectionalLight"===p.type?(a=p.direction,T=new THREE.DirectionalLight(x,b),T.position.fromArray(a),p.target&&(A.push({object:T,targetName:p.target}),T.target=null)):"PointLight"===p.type?(a=p.position,o=p.distance,T=new THREE.PointLight(x,b,o),T.position.fromArray(a)):"AmbientLight"===p.type&&(T=new THREE.AmbientLight(x)),e.add(T),T.name=u,S.lights[u]=T,S.objects[u]=T):"PerspectiveCamera"===p.type||"OrthographicCamera"===p.type?(a=p.position,s=p.rotation,h=p.quaternion,"PerspectiveCamera"===p.type?g=new THREE.PerspectiveCamera(p.fov,p.aspect,p.near,p.far):"OrthographicCamera"===p.type&&(g=new THREE.OrthographicCamera(p.left,p.right,p.top,p.bottom,p.near,p.far)),g.name=u,g.position.fromArray(a),void 0!==h?g.quaternion.fromArray(h):void 0!==s&&g.rotation.fromArray(s),e.add(g),S.cameras[u]=g,S.objects[u]=g):(a=p.position,s=p.rotation,l=p.scale,h=p.quaternion,d=new THREE.Object3D,d.name=u,d.position.fromArray(a),h?d.quaternion.fromArray(h):d.rotation.fromArray(s),d.scale.fromArray(l),d.visible=void 0!==p.visible?p.visible:!1,e.add(d),S.objects[u]=d,S.empties[u]=d);if(d){if(void 0!==p.userData)for(var H in p.userData){var C=p.userData[H];d.userData[H]=C}if(void 0!==p.groups)for(var w=0;w<p.groups.length;w++){var P=p.groups[w];void 0===S.groups[P]&&(S.groups[P]=[]),S.groups[P].push(u)}}}void 0!==d&&void 0!==p.children&&n(d,p.children)}}function a(e,t,i){S.geometries[i]=e,S.face_materials[i]=t,o()}function s(e,t,i,r,n){var a=n.position,s=n.rotation,l=n.quaternion,c=n.scale;e.position.fromArray(a),l?e.quaternion.fromArray(l):e.rotation.fromArray(s),e.scale.fromArray(c),r&&e.traverse(function(e){e.material=r});var h=void 0!==n.visible?n.visible:!0;e.traverse(function(e){e.visible=h}),i.add(e),e.name=t,S.objects[t]=e,o()}function l(e){return function(t,i){t.name=e,a(t,i,e),R-=1,M.onLoadComplete(),u()}}function c(e,t,i,r){return function(o){var n;n=o.content?o.content:o.dae?o.scene:o,s(n,e,t,i,r),R-=1,M.onLoadComplete(),u()}}function h(e){return function(t,i){t.name=e,S.geometries[e]=t,S.face_materials[e]=i}}function u(){var e={totalModels:w,totalTextures:H,loadedModels:w-R,loadedTextures:H-_};M.callbackProgress(e,S),M.onLoadProgress(),0===R&&0===_&&(d(),t(S))}function d(){for(var e=0;e<A.length;e++){var t=A[e],i=S.objects[t.targetName];i?t.object.target=i:(t.object.target=new THREE.Object3D,S.scene.add(t.object.target)),t.object.target.userData.targetInverse=t.object}}function p(e,t){if(t(e),void 0!==e.children)for(var i in e.children)p(e.children[i],t)}var f,m,g,v,E,y,T,x,b,R,_,w,H,S,M=this,C=THREE.Loader.prototype.extractUrlBase(i),A=[],D=e;for(var P in this.geometryHandlers){var L=this.geometryHandlers[P].loaderClass;this.geometryHandlers[P].loaderObject=new L}for(var P in this.hierarchyHandlers){var L=this.hierarchyHandlers[P].loaderClass;this.hierarchyHandlers[P].loaderObject=new L}if(R=0,_=0,S={scene:new THREE.Scene,geometries:{},face_materials:{},materials:{},textures:{},objects:{},cameras:{},lights:{},fogs:{},empties:{},groups:{}},D.transform){var N=D.transform.position,F=D.transform.rotation,I=D.transform.scale;N&&S.scene.position.fromArray(N),F&&S.scene.rotation.fromArray(F),I&&S.scene.scale.fromArray(I),(N||F||I)&&(S.scene.updateMatrix(),S.scene.updateMatrixWorld())}var k,O,U=function(e){_-=e,u(),M.onLoadComplete()},V=function(e){return function(){U(e)}};for(k in D.fogs)O=D.fogs[k],"linear"===O.type?v=new THREE.Fog(0,O.near,O.far):"exp2"===O.type&&(v=new THREE.FogExp2(0,O.density)),y=O.color,v.color.setRGB(y[0],y[1],y[2]),S.fogs[k]=v;var z,B;for(z in D.geometries)B=D.geometries[z],B.type in this.geometryHandlers&&(R+=1,M.onLoadStart());for(var j in D.objects)p(D.objects[j],function(e){e.type&&e.type in M.hierarchyHandlers&&(R+=1,M.onLoadStart())});w=R;for(z in D.geometries)if(B=D.geometries[z],"cube"===B.type)f=new THREE.CubeGeometry(B.width,B.height,B.depth,B.widthSegments,B.heightSegments,B.depthSegments),f.name=z,S.geometries[z]=f;else if("plane"===B.type)f=new THREE.PlaneGeometry(B.width,B.height,B.widthSegments,B.heightSegments),f.name=z,S.geometries[z]=f;else if("sphere"===B.type)f=new THREE.SphereGeometry(B.radius,B.widthSegments,B.heightSegments),f.name=z,S.geometries[z]=f;else if("cylinder"===B.type)f=new THREE.CylinderGeometry(B.topRad,B.botRad,B.height,B.radSegs,B.heightSegs),f.name=z,S.geometries[z]=f;else if("torus"===B.type)f=new THREE.TorusGeometry(B.radius,B.tube,B.segmentsR,B.segmentsT),f.name=z,S.geometries[z]=f;else if("icosahedron"===B.type)f=new THREE.IcosahedronGeometry(B.radius,B.subdivisions),f.name=z,S.geometries[z]=f;else if(B.type in this.geometryHandlers){var G={};for(var W in B)"type"!==W&&"url"!==W&&(G[W]=B[W]);var X=this.geometryHandlers[B.type].loaderObject;X.load(r(B.url,D.urlBaseType),l(z),G)}else if("embedded"===B.type){var Y=D.embeds[B.id],q="";if(Y.metadata=D.metadata,Y){var K=this.geometryHandlers.ascii.loaderObject,Z=K.parse(Y,q);h(z)(Z.geometry,Z.materials)}}var Q,$;for(Q in D.textures)if($=D.textures[Q],$.url instanceof Array){_+=$.url.length;for(var J=0;J<$.url.length;J++)M.onLoadStart()}else _+=1,M.onLoadStart();H=_;for(Q in D.textures){if($=D.textures[Q],void 0!==$.mapping&&void 0!==THREE[$.mapping]&&($.mapping=new THREE[$.mapping]),$.url instanceof Array){for(var et=$.url.length,tt=[],it=0;et>it;it++)tt[it]=r($.url[it],D.urlBaseType);var rt=/\.dds$/i.test(tt[0]);E=rt?THREE.ImageUtils.loadCompressedTextureCube(tt,$.mapping,V(et)):THREE.ImageUtils.loadTextureCube(tt,$.mapping,V(et))}else{var rt=/\.dds$/i.test($.url),ot=r($.url,D.urlBaseType),nt=V(1);if(E=rt?THREE.ImageUtils.loadCompressedTexture(ot,$.mapping,nt):THREE.ImageUtils.loadTexture(ot,$.mapping,nt),void 0!==THREE[$.minFilter]&&(E.minFilter=THREE[$.minFilter]),void 0!==THREE[$.magFilter]&&(E.magFilter=THREE[$.magFilter]),$.anisotropy&&(E.anisotropy=$.anisotropy),$.repeat&&(E.repeat.set($.repeat[0],$.repeat[1]),1!==$.repeat[0]&&(E.wrapS=THREE.RepeatWrapping),1!==$.repeat[1]&&(E.wrapT=THREE.RepeatWrapping)),$.offset&&E.offset.set($.offset[0],$.offset[1]),$.wrap){var at={repeat:THREE.RepeatWrapping,mirror:THREE.MirroredRepeatWrapping};void 0!==at[$.wrap[0]]&&(E.wrapS=at[$.wrap[0]]),void 0!==at[$.wrap[1]]&&(E.wrapT=at[$.wrap[1]])}}S.textures[Q]=E}var st,lt,ct;for(st in D.materials){lt=D.materials[st];for(ct in lt.parameters)if("envMap"===ct||"map"===ct||"lightMap"===ct||"bumpMap"===ct)lt.parameters[ct]=S.textures[lt.parameters[ct]];else if("shading"===ct)lt.parameters[ct]="flat"===lt.parameters[ct]?THREE.FlatShading:THREE.SmoothShading;else if("side"===ct)lt.parameters[ct]="double"==lt.parameters[ct]?THREE.DoubleSide:"back"==lt.parameters[ct]?THREE.BackSide:THREE.FrontSide;else if("blending"===ct)lt.parameters[ct]=lt.parameters[ct]in THREE?THREE[lt.parameters[ct]]:THREE.NormalBlending;else if("combine"===ct)lt.parameters[ct]=lt.parameters[ct]in THREE?THREE[lt.parameters[ct]]:THREE.MultiplyOperation;else if("vertexColors"===ct)"face"==lt.parameters[ct]?lt.parameters[ct]=THREE.FaceColors:lt.parameters[ct]&&(lt.parameters[ct]=THREE.VertexColors);else if("wrapRGB"===ct){var ht=lt.parameters[ct];lt.parameters[ct]=new THREE.Vector3(ht[0],ht[1],ht[2])}if(void 0!==lt.parameters.opacity&&lt.parameters.opacity<1&&(lt.parameters.transparent=!0),lt.parameters.normalMap){var ut=THREE.ShaderLib.normalmap,dt=THREE.UniformsUtils.clone(ut.uniforms),pt=lt.parameters.color,ft=lt.parameters.specular,mt=lt.parameters.ambient,gt=lt.parameters.shininess;dt.tNormal.value=S.textures[lt.parameters.normalMap],lt.parameters.normalScale&&dt.uNormalScale.value.set(lt.parameters.normalScale[0],lt.parameters.normalScale[1]),lt.parameters.map&&(dt.tDiffuse.value=lt.parameters.map,dt.enableDiffuse.value=!0),lt.parameters.envMap&&(dt.tCube.value=lt.parameters.envMap,dt.enableReflection.value=!0,dt.uReflectivity.value=lt.parameters.reflectivity),lt.parameters.lightMap&&(dt.tAO.value=lt.parameters.lightMap,dt.enableAO.value=!0),lt.parameters.specularMap&&(dt.tSpecular.value=S.textures[lt.parameters.specularMap],dt.enableSpecular.value=!0),lt.parameters.displacementMap&&(dt.tDisplacement.value=S.textures[lt.parameters.displacementMap],dt.enableDisplacement.value=!0,dt.uDisplacementBias.value=lt.parameters.displacementBias,dt.uDisplacementScale.value=lt.parameters.displacementScale),dt.uDiffuseColor.value.setHex(pt),dt.uSpecularColor.value.setHex(ft),dt.uAmbientColor.value.setHex(mt),dt.uShininess.value=gt,lt.parameters.opacity&&(dt.uOpacity.value=lt.parameters.opacity);var vt={fragmentShader:ut.fragmentShader,vertexShader:ut.vertexShader,uniforms:dt,lights:!0,fog:!0};m=new THREE.ShaderMaterial(vt)}else m=new THREE[lt.type](lt.parameters);m.name=st,S.materials[st]=m}for(st in D.materials)if(lt=D.materials[st],lt.parameters.materials){for(var Et=[],it=0;it<lt.parameters.materials.length;it++){var yt=lt.parameters.materials[it];Et.push(S.materials[yt])}S.materials[st].materials=Et}o(),S.cameras&&D.defaults.camera&&(S.currentCamera=S.cameras[D.defaults.camera]),S.fogs&&D.defaults.fog&&(S.scene.fog=S.fogs[D.defaults.fog]),M.callbackSync(S),u()}};