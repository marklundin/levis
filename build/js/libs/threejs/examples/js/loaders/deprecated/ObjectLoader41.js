THREE.ObjectLoader41=function(){},THREE.ObjectLoader41.prototype={constructor:THREE.ObjectLoader,load:function(e){var t=this,i=new XMLHttpRequest;i.addEventListener("load",function(e){var i=t.parse(JSON.parse(e.target.responseText));t.dispatchEvent({type:"load",content:i})},!1),i.addEventListener("progress",function(e){t.dispatchEvent({type:"progress",loaded:e.loaded,total:e.total})},!1),i.addEventListener("error",function(){t.dispatchEvent({type:"error",message:"Couldn't load URL ["+e+"]"})},!1),i.open("GET",e,!0),i.send(null)},parse:function(e){var t=this.parseGeometries(e.geometries),i=this.parseMaterials(e.materials),r=this.parseObject(e.object,t,i);return r},parseGeometries:function(e){var t={};if(void 0!==e){var i=new THREE.JSONLoader;for(var r in e){var n,o=e[r];switch(o.type){case"PlaneGeometry":n=new THREE.PlaneGeometry(o.width,o.height,o.widthSegments,o.heightSegments);break;case"CubeGeometry":n=new THREE.CubeGeometry(o.width,o.height,o.depth,o.widthSegments,o.heightSegments,o.depthSegments);break;case"CylinderGeometry":n=new THREE.CylinderGeometry(o.radiusTop,o.radiusBottom,o.height,o.radiusSegments,o.heightSegments,o.openEnded);break;case"SphereGeometry":n=new THREE.SphereGeometry(o.radius,o.widthSegments,o.heightSegments,o.phiStart,o.phiLength,o.thetaStart,o.thetaLength);break;case"IcosahedronGeometry":n=new THREE.IcosahedronGeometry(o.radius,o.detail);break;case"TorusGeometry":n=new THREE.TorusGeometry(o.radius,o.tube,o.radialSegments,o.tubularSegments,o.arc);break;case"TorusKnotGeometry":n=new THREE.TorusKnotGeometry(o.radius,o.tube,o.radialSegments,o.tubularSegments,o.p,o.q,o.heightScale);break;case"Geometry":n=i.parse(o.data).geometry}void 0!==o.name&&(n.name=o.name),t[r]=n}}return t},parseMaterials:function(e){var t={};if(void 0!==e){var i=new THREE.MaterialLoader;for(var r in e){var n=e[r],o=i.parse(n);void 0!==n.name&&(o.name=n.name),t[r]=o}}return t},parseObject:function(e,t,i){var r;switch(e.type){case"Scene":r=new THREE.Scene;break;case"PerspectiveCamera":r=new THREE.PerspectiveCamera(e.fov,e.aspect,e.near,e.far),r.position.fromArray(e.position),r.rotation.fromArray(e.rotation);break;case"OrthographicCamera":r=new THREE.OrthographicCamera(e.left,e.right,e.top,e.bottom,e.near,e.far),r.position.fromArray(e.position),r.rotation.fromArray(e.rotation);break;case"AmbientLight":r=new THREE.AmbientLight(e.color);break;case"DirectionalLight":r=new THREE.DirectionalLight(e.color,e.intensity),r.position.fromArray(e.position);break;case"PointLight":r=new THREE.PointLight(e.color,e.intensity,e.distance),r.position.fromArray(e.position);break;case"SpotLight":r=new THREE.SpotLight(e.color,e.intensity,e.distance,e.angle,e.exponent),r.position.fromArray(e.position);break;case"HemisphereLight":r=new THREE.HemisphereLight(e.color,e.groundColor,e.intensity),r.position.fromArray(e.position);break;case"Mesh":r=new THREE.Mesh(t[e.geometry],i[e.material]),r.position.fromArray(e.position),r.rotation.fromArray(e.rotation),r.scale.fromArray(e.scale);break;default:r=new THREE.Object3D,r.position.fromArray(e.position),r.rotation.fromArray(e.rotation),r.scale.fromArray(e.scale)}if(void 0!==e.name&&(r.name=e.name),void 0!==e.visible&&(r.visible=e.visible),void 0!==e.userData&&(r.userData=e.userData),void 0!==e.children)for(var n in e.children)r.add(this.parseObject(e.children[n],t,i));return r}},THREE.EventDispatcher.prototype.apply(THREE.ObjectLoader41.prototype);