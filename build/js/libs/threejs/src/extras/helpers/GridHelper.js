THREE.GridHelper=function(e,t){var i=new THREE.Geometry,r=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});this.color1=new THREE.Color(4473924),this.color2=new THREE.Color(8947848);for(var o=-e;e>=o;o+=t){i.vertices.push(new THREE.Vector3(-e,0,o),new THREE.Vector3(e,0,o),new THREE.Vector3(o,0,-e),new THREE.Vector3(o,0,e));var n=0===o?this.color1:this.color2;i.colors.push(n,n,n,n)}THREE.Line.call(this,i,r,THREE.LinePieces)},THREE.GridHelper.prototype=Object.create(THREE.Line.prototype),THREE.GridHelper.prototype.setColors=function(e,t){this.color1.set(e),this.color2.set(t),this.geometry.colorsNeedUpdate=!0};