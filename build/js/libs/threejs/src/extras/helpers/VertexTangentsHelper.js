THREE.VertexTangentsHelper=function(e,t,i,r){this.object=e;this.size=t||1;var a=i||255;var o=r||1;var n=new THREE.Geometry;e.geometry.vertices;var s=e.geometry.faces;for(var l=0,c=s.length;c>l;l++){var h=s[l];for(var u=0,f=h.vertexTangents.length;f>u;u++){n.vertices.push(new THREE.Vector3);n.vertices.push(new THREE.Vector3)}}THREE.Line.call(this,n,new THREE.LineBasicMaterial({color:a,linewidth:o}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.update()};THREE.VertexTangentsHelper.prototype=Object.create(THREE.Line.prototype);THREE.VertexTangentsHelper.prototype.update=function(){var e=new THREE.Vector3;return function(){var t=["a","b","c","d"];this.object.updateMatrixWorld(!0);var i=this.geometry.vertices;var r=this.object.geometry.vertices;var a=this.object.geometry.faces;var o=this.object.matrixWorld;var n=0;for(var s=0,l=a.length;l>s;s++){var c=a[s];for(var h=0,u=c.vertexTangents.length;u>h;h++){var f=c[t[h]];var d=r[f];var p=c.vertexTangents[h];i[n].copy(d).applyMatrix4(o);e.copy(p).transformDirection(o).multiplyScalar(this.size);e.add(i[n]);n+=1;i[n].copy(e);n+=1}}this.geometry.verticesNeedUpdate=!0;return this}}();