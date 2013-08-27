THREE.STLExporter=function(){this.stlContent=""};THREE.STLExporter.prototype={constructor:THREE.STLExporter,exportScene:function(e){var t=[];e.traverse(function(e){if(e instanceof THREE.Mesh)t.push(e)});return this.exportMeshes(t)},exportMesh:function(e){return this.exportMeshes([e])},exportMeshes:function(e){this.addLineToContent("solid exported");var t,i,r,n,o,a,s;var l,h,c,u;for(t=0;t<e.length;t++){r=e[t];n=r.geometry;a=r.matrix;s=r.position;for(i=0;i<n.faces.length;i++){o=n.faces[i];l=o.normal;if(o instanceof THREE.Face3){h=this.getTransformedPosition(n.vertices[o.a],a,s);c=this.getTransformedPosition(n.vertices[o.b],a,s);u=this.getTransformedPosition(n.vertices[o.c],a,s);this.addTriangleToContent(l,h,c,u)}else if(o instanceof THREE.Face4){h=this.getTransformedPosition(n.vertices[o.a],a,s);c=this.getTransformedPosition(n.vertices[o.b],a,s);u=this.getTransformedPosition(n.vertices[o.c],a,s);this.addTriangleToContent(l,h,c,u);h=this.getTransformedPosition(n.vertices[o.a],a,s);c=this.getTransformedPosition(n.vertices[o.c],a,s);u=this.getTransformedPosition(n.vertices[o.d],a,s);this.addTriangleToContent(l,h,c,u)}}}this.addLineToContent("endsolid exported");return this.stlContent},clearContent:function(){this.stlContent=""},addLineToContent:function(e){this.stlContent+=e+"\n"},addTriangleToContent:function(e,t,i,r){this.addLineToContent("	facet normal "+e.x+" "+e.y+" "+e.z);this.addLineToContent("		outer loop");this.addLineToContent("			vertex "+t.x+" "+t.y+" "+t.z);this.addLineToContent("			vertex "+i.x+" "+i.y+" "+i.z);this.addLineToContent("			vertex "+r.x+" "+r.y+" "+r.z);this.addLineToContent("		endloop");this.addLineToContent("	endfacet")},getTransformedPosition:function(e,t,i){var r=e.clone();if(void 0!==t)r.applyMatrix4(t);if(void 0!==i)r.add(i);return r}};