/*!
 *
 * threeoctree.js (r56) / https://github.com/collinhover/threeoctree
 * (sparse) dynamic 3D spatial representation structure for fast searches.
 *
 * @author Collin Hover / http://collinhover.com/
 * based on Dynamic Octree by Piko3D @ http://www.piko3d.com/ and Octree by Marek Pawlowski @ pawlowski.it
 *
 */

!function(e){function t(e){return!isNaN(e)&&isFinite(e)}function i(e){return"[object Array]"===Object.prototype.toString.call(e)}function r(e){return e?i(e)!==!0?[e]:e:[]}e.Octree=function(i){i=i||{};i.tree=this;this.nodeCount=0;this.INDEX_INSIDE_CROSS=-1;this.INDEX_OUTSIDE_OFFSET=2;this.INDEX_OUTSIDE_POS_X=t(i.INDEX_OUTSIDE_POS_X)?i.INDEX_OUTSIDE_POS_X:0;this.INDEX_OUTSIDE_NEG_X=t(i.INDEX_OUTSIDE_NEG_X)?i.INDEX_OUTSIDE_NEG_X:1;this.INDEX_OUTSIDE_POS_Y=t(i.INDEX_OUTSIDE_POS_Y)?i.INDEX_OUTSIDE_POS_Y:2;this.INDEX_OUTSIDE_NEG_Y=t(i.INDEX_OUTSIDE_NEG_Y)?i.INDEX_OUTSIDE_NEG_Y:3;this.INDEX_OUTSIDE_POS_Z=t(i.INDEX_OUTSIDE_POS_Z)?i.INDEX_OUTSIDE_POS_Z:4;this.INDEX_OUTSIDE_NEG_Z=t(i.INDEX_OUTSIDE_NEG_Z)?i.INDEX_OUTSIDE_NEG_Z:5;this.INDEX_OUTSIDE_MAP=[];this.INDEX_OUTSIDE_MAP[this.INDEX_OUTSIDE_POS_X]={index:this.INDEX_OUTSIDE_POS_X,count:0,x:1,y:0,z:0};this.INDEX_OUTSIDE_MAP[this.INDEX_OUTSIDE_NEG_X]={index:this.INDEX_OUTSIDE_NEG_X,count:0,x:-1,y:0,z:0};this.INDEX_OUTSIDE_MAP[this.INDEX_OUTSIDE_POS_Y]={index:this.INDEX_OUTSIDE_POS_Y,count:0,x:0,y:1,z:0};this.INDEX_OUTSIDE_MAP[this.INDEX_OUTSIDE_NEG_Y]={index:this.INDEX_OUTSIDE_NEG_Y,count:0,x:0,y:-1,z:0};this.INDEX_OUTSIDE_MAP[this.INDEX_OUTSIDE_POS_Z]={index:this.INDEX_OUTSIDE_POS_Z,count:0,x:0,y:0,z:1};this.INDEX_OUTSIDE_MAP[this.INDEX_OUTSIDE_NEG_Z]={index:this.INDEX_OUTSIDE_NEG_Z,count:0,x:0,y:0,z:-1};this.FLAG_POS_X=1<<this.INDEX_OUTSIDE_POS_X+1;this.FLAG_NEG_X=1<<this.INDEX_OUTSIDE_NEG_X+1;this.FLAG_POS_Y=1<<this.INDEX_OUTSIDE_POS_Y+1;this.FLAG_NEG_Y=1<<this.INDEX_OUTSIDE_NEG_Y+1;this.FLAG_POS_Z=1<<this.INDEX_OUTSIDE_POS_Z+1;this.FLAG_NEG_Z=1<<this.INDEX_OUTSIDE_NEG_Z+1;this.utilVec31Search=new e.Vector3;this.utilVec32Search=new e.Vector3;this.scene=i.scene;this.objects=[];this.objectsData=[];this.depthMax=t(i.depthMax)?i.depthMax:-1;this.objectsThreshold=t(i.objectsThreshold)?i.objectsThreshold:8;this.overlapPct=t(i.overlapPct)?i.overlapPct:.15;this.root=i.root instanceof e.OctreeNode?i.root:new e.OctreeNode(i)};e.Octree.prototype={setRoot:function(t){if(t instanceof e.OctreeNode){this.root=t;this.root.updateProperties()}},add:function(t,i){var r,n,o,a,s;if(t instanceof e.OctreeObjectData)t=t.object;o=this.objects.indexOf(t);if(-1===o){this.objects.push(t);this.updateObject(t);if(i===!0){a=t.geometry;s=a.faces;for(r=0,n=s.length;n>r;r++)this.addObjectData(t,s[r])}else this.addObjectData(t)}},addObjectData:function(t,i){var r=new e.OctreeObjectData(t,i);this.objectsData.push(r);this.root.addObject(r)},remove:function(t){var i,r,n,o,a=t;if(t instanceof e.OctreeObjectData)t=t.object;n=this.objects.indexOf(t);if(-1!==n){this.objects.splice(n,1);o=this.root.removeObject(a);for(i=0,r=o.length;r>i;i++){a=o[i];n=this.objectsData.indexOf(a);if(-1!==n)this.objectsData.splice(n,1)}}},extend:function(t){var i,r,n,o;if(t instanceof e.Octree){n=t.objectsData;for(i=0,r=n.length;r>i;i++){o=n[i];this.add(o,o.usesFaces())}}},update:function(){var t,i,r,n,o,a,s,l=[];for(t=0,i=this.objects.length;i>t;t++){n=this.objects[t];this.updateObject(n)}for(t=0,i=this.objectsData.length;i>t;t++){o=this.objectsData[t];r=o.node;o.update();if(r instanceof e.OctreeNode&&!o.positionLast.equals(o.position)){s=o.indexOctant;a=r.getOctantIndex(o);if(a!==s)l.push(o)}}for(t=0,i=l.length;i>t;t++){o=l[t];o.node.removeObject(o);this.root.addObject(o)}},search:function(i,r,n,o){var a,s,l,h,c,u,f,d,p,m,g;h=[].concat(this.root.objects);if(t(r)!==!0)r=Number.MAX_VALUE;if(o instanceof e.Vector3){o=this.utilVec31Search.copy(o).normalize();g=this.utilVec32Search.set(1,1,1).divide(o)}for(a=0,s=this.root.nodesIndices.length;s>a;a++){l=this.root.nodesByIndex[this.root.nodesIndices[a]];h=l.search(i,r,h,o,g)}if(n===!0){f=[];p=[];for(a=0,s=h.length;s>a;a++){c=h[a];u=c.object;m=p.indexOf(u);if(-1===m){d={object:u,faces:[]};f.push(d);p.push(u)}else d=f[m];if("undefined"!=typeof c.faces)d.faces.push(c.faces)}}else f=h;return f},updateObject:function(e){var t,i,r,n,o=[e];r=e.parent;for(;r;){o.push(r);r=r.parent}for(t=0,i=o.length;i>t;t++){r=o[t];if(r.matrixWorldNeedsUpdate===!0)n=r}if("undefined"!=typeof n)n.updateMatrixWorld()},getDepthEnd:function(){return this.root.getDepthEnd()},getNodeCountEnd:function(){return this.root.getNodeCountEnd()},getObjectCountEnd:function(){return this.root.getObjectCountEnd()},toConsole:function(){this.root.toConsole()}};e.OctreeObjectData=function(t,i){this.utilVec31FaceBounds=new e.Vector3;this.object=t;this.faces=i;this.radius=0;this.position=new e.Vector3;if(this.object instanceof e.Object3D)this.update();this.positionLast=this.position.clone()};e.OctreeObjectData.prototype={update:function(){if(this.usesFaces()){this.radius=this.getFaceBoundingRadius(this.object,this.faces);this.position.copy(this.faces.centroid).applyMatrix4(this.object.matrixWorld)}else{var e=this.object.geometry;if(null===e.boundingSphere)e.computeBoundingSphere();this.radius=e.boundingSphere.radius;this.position.getPositionFromMatrix(this.object.matrixWorld)}this.radius=this.radius*Math.max(this.object.scale.x,this.object.scale.y,this.object.scale.z)},getFaceBoundingRadius:function(t,i){var r,n,o=t instanceof e.Mesh?t.geometry:t,a=o.vertices,s=i.centroid,l=a[i.a],h=a[i.b],c=a[i.c],u=this.utilVec31FaceBounds;if(i instanceof e.Face4){r=a[i.d];s.addVectors(l,h).add(c).add(r).divideScalar(4);n=Math.max(u.subVectors(s,l).length(),u.subVectors(s,h).length(),u.subVectors(s,c).length(),u.subVectors(s,r).length())}else{s.addVectors(l,h).add(c).divideScalar(3);n=Math.max(u.subVectors(s,l).length(),u.subVectors(s,h).length(),u.subVectors(s,c).length())}return n},usesFaces:function(){return this.faces instanceof e.Face3||this.faces instanceof e.Face4}};e.OctreeNode=function(i){this.utilVec31Branch=new e.Vector3;this.utilVec31Expand=new e.Vector3;this.utilVec31Ray=new e.Vector3;i=i||{};if(i.tree instanceof e.Octree)this.tree=i.tree;else if(i.parent instanceof e.OctreeNode!=!0){i.root=this;this.tree=new e.Octree(i)}this.id=this.tree.nodeCount++;this.position=i.position instanceof e.Vector3?i.position:new e.Vector3;this.radius=t(i.radius)&&i.radius>0?i.radius:1;this.indexOctant=i.indexOctant;this.depth=0;this.reset();this.setParent(i.parent);this.overlap=this.radius*this.tree.overlapPct;this.radiusOverlap=this.radius+this.overlap;this.left=this.position.x-this.radiusOverlap;this.right=this.position.x+this.radiusOverlap;this.bottom=this.position.y-this.radiusOverlap;this.top=this.position.y+this.radiusOverlap;this.back=this.position.z-this.radiusOverlap;this.front=this.position.z+this.radiusOverlap;if(this.tree.scene){this.visual=new e.Mesh(new e.CubeGeometry(2*this.radiusOverlap,2*this.radiusOverlap,2*this.radiusOverlap),new e.MeshBasicMaterial({color:16711680,wireframe:!0,wireframeLinewidth:1}));this.visual.position.copy(this.position);this.tree.scene.add(this.visual)}};e.OctreeNode.prototype={setParent:function(e){if(e!==this&&this.parent!==e){this.parent=e;this.updateProperties()}},updateProperties:function(){var t,i;if(this.parent instanceof e.OctreeNode){this.tree=this.parent.tree;this.depth=this.parent.depth+1}else this.depth=0;for(t=0,i=this.nodesIndices.length;i>t;t++)this.nodesByIndex[this.nodesIndices[t]].updateProperties()},reset:function(e,t){var i,r,n,o=this.nodesIndices||[],a=this.nodesByIndex;this.objects=[];this.nodesIndices=[];this.nodesByIndex={};for(i=0,r=o.length;r>i;i++){n=a[o[i]];n.setParent(void 0);if(e===!0)n.reset(e,t)}if(t===!0&&this.visual&&this.visual.parent)this.visual.parent.remove(this.visual)},addNode:function(e,i){i=e.indexOctant=t(i)?i:t(e.indexOctant)?e.indexOctant:this.getOctantIndex(e);if(-1===this.nodesIndices.indexOf(i))this.nodesIndices.push(i);this.nodesByIndex[i]=e;if(e.parent!==this)e.setParent(this)},removeNode:function(i){var r,n,o=-1;if(i instanceof e.OctreeNode&&this.nodesByIndex[i.indexOctant]===i){n=i;o=n.indexOctant}else if(t(i))o=i;else for(r in this.nodesByIndex){n=this.nodesByIndex[r];if(n===i){o=r;break}}if(-1!==o){r=this.nodesIndices.indexOf(o);this.nodesIndices.splice(r,1);n=n||this.nodesByIndex[o];delete this.nodesByIndex[o];if(n.parent===this)n.setParent(void 0)}},addObject:function(t){var i,r,n;r=this.getOctantIndex(t);if(r>-1&&this.nodesIndices.length>0){n=this.branch(r);n.addObject(t)}else if(-1>r&&this.parent instanceof e.OctreeNode)this.parent.addObject(t);else{i=this.objects.indexOf(t);if(-1===i)this.objects.push(t);t.node=this;this.checkGrow()}},addObjectWithoutCheck:function(e){var t,i,r;for(t=0,i=e.length;i>t;t++){r=e[t];this.objects.push(r);r.node=this}},removeObject:function(e){var t,i,r,n;n=this.removeObjectRecursive(e,{searchComplete:!1,nodesRemovedFrom:[],objectsDataRemoved:[]});r=n.nodesRemovedFrom;if(r.length>0)for(t=0,i=r.length;i>t;t++)r[t].shrink();return n.objectsDataRemoved},removeObjectRecursive:function(t,i){var r,n,o,a,s,l=-1;if(t instanceof e.OctreeObjectData){l=this.objects.indexOf(t);if(-1!==l){this.objects.splice(l,1);t.node=void 0;i.objectsDataRemoved.push(t);i.searchComplete=s=!0}}else for(r=this.objects.length-1;r>=0;r--){o=this.objects[r];if(o.object===t){this.objects.splice(r,1);o.node=void 0;i.objectsDataRemoved.push(o);s=!0;if("undefined"==typeof o.faces){i.searchComplete=!0;break}}}if(s===!0)i.nodesRemovedFrom.push(this);if(i.searchComplete!==!0)for(r=0,n=this.nodesIndices.length;n>r;r++){a=this.nodesByIndex[this.nodesIndices[r]];i=a.removeObjectRecursive(t,i);if(i.searchComplete===!0)break}return i},checkGrow:function(){if(this.objects.length>this.tree.objectsThreshold&&this.tree.objectsThreshold>0)this.grow()},grow:function(){var e,t,i,r,n=[],o=[],a=[],s=[],l=[];for(i=0,r=this.objects.length;r>i;i++){t=this.objects[i];e=this.getOctantIndex(t);if(e>-1){a.push(t);s.push(e)}else if(-1>e){n.push(t);o.push(e)}else l.push(t)}if(a.length>0)l=l.concat(this.split(a,s));if(n.length>0)l=l.concat(this.expand(n,o));this.objects=l;this.checkMerge()},split:function(e,i){var r,n,o,a,s,l;if(this.tree.depthMax<0||this.depth<this.tree.depthMax){e=e||this.objects;i=i||[];l=[];for(r=0,n=e.length;n>r;r++){a=e[r];o=t(i[r])?i[r]:this.getOctantIndex(a);if(o>-1){s=this.branch(o);s.addObject(a)}else l.push(a)}if(e===this.objects)this.objects=l}else l=this.objects;return l},branch:function(t){var i,r,n,o,a,s;if(this.nodesByIndex[t]instanceof e.OctreeNode)i=this.nodesByIndex[t];else{n=.5*this.radiusOverlap;r=n*this.tree.overlapPct;o=n-r;a=this.utilVec31Branch.set(1&t?o:-o,2&t?o:-o,4&t?o:-o);s=(new e.Vector3).addVectors(this.position,a);i=new e.OctreeNode({tree:this.tree,parent:this,position:s,radius:n,indexOctant:t});this.addNode(i,t)}return i},expand:function(i,r){var n,o,a,s,l,h,c,u,f,d,p,m,g,v,E,y,_,T,b,x,R,w,H,M,S,C,A,D,P,k=this.tree.INDEX_OUTSIDE_MAP,L=this.utilVec31Expand;if(this.tree.depthMax<0||this.tree.root.getDepthEnd()<this.tree.depthMax){i=i||this.objects;r=r||[];s=[];l=[];for(n=0,o=k.length;o>n;n++)k[n].count=0;for(n=0,o=i.length;o>n;n++){a=i[n];h=t(r[n])?r[n]:this.getOctantIndex(a);if(-1>h){c=-h-this.tree.INDEX_OUTSIDE_OFFSET;if(c&this.tree.FLAG_POS_X)k[this.tree.INDEX_OUTSIDE_POS_X].count++;else if(c&this.tree.FLAG_NEG_X)k[this.tree.INDEX_OUTSIDE_NEG_X].count++;if(c&this.tree.FLAG_POS_Y)k[this.tree.INDEX_OUTSIDE_POS_Y].count++;else if(c&this.tree.FLAG_NEG_Y)k[this.tree.INDEX_OUTSIDE_NEG_Y].count++;if(c&this.tree.FLAG_POS_Z)k[this.tree.INDEX_OUTSIDE_POS_Z].count++;else if(c&this.tree.FLAG_NEG_Z)k[this.tree.INDEX_OUTSIDE_NEG_Z].count++;l.push(a)}else s.push(a)}if(l.length>0){f=k.slice(0);f.sort(function(e,t){return t.count-e.count});d=f[0];g=1|d.index;E=f[1];y=f[2];p=(1|E.index)!==g?E:y;v=1|p.index;E=f[2];y=f[3];_=f[4];T=1|E.index;b=1|y.index;m=T!==g&&T!==v?E:b!==g&&b!==v?y:_;x=d.x+p.x+m.x;R=d.y+p.y+m.y;w=d.z+p.z+m.z;h=this.getOctantIndexFromPosition(x,R,w);u=this.getOctantIndexFromPosition(-x,-R,-w);H=this.overlap;M=this.radius;C=this.tree.overlapPct>0?H/(.5*this.tree.overlapPct*(1+this.tree.overlapPct)):2*M;A=C*this.tree.overlapPct;S=C+A-(M+H);L.set(1&h?S:-S,2&h?S:-S,4&h?S:-S);D=(new e.Vector3).addVectors(this.position,L);P=new e.OctreeNode({tree:this.tree,position:D,radius:C});P.addNode(this,u);this.tree.setRoot(P);for(n=0,o=l.length;o>n;n++)this.tree.root.addObject(l[n])}if(i===this.objects)this.objects=s}else s=i;return s},shrink:function(){this.checkMerge();this.tree.root.checkContract()},checkMerge:function(){var t,i=this;for(;i.parent instanceof e.OctreeNode&&i.getObjectCountEnd()<this.tree.objectsThreshold;){t=i;i=i.parent}if(i!==this)i.merge(t)},merge:function(e){var t,i,n;e=r(e);for(t=0,i=e.length;i>t;t++){n=e[t];this.addObjectWithoutCheck(n.getObjectsEnd());n.reset(!0,!0);this.removeNode(n.indexOctant,n)}this.checkMerge()},checkContract:function(){var t,i,r,n,o,a,s;if(this.nodesIndices.length>0){a=0;s=this.objects.length;for(t=0,i=this.nodesIndices.length;i>t;t++){r=this.nodesByIndex[this.nodesIndices[t]];n=r.getObjectCountEnd();s+=n;if(o instanceof e.OctreeNode==!1||n>a){o=r;a=n}}s-=a;if(s<this.tree.objectsThreshold&&o instanceof e.OctreeNode)this.contract(o)}},contract:function(e){var t,i,r;for(t=0,i=this.nodesIndices.length;i>t;t++){r=this.nodesByIndex[this.nodesIndices[t]];if(r!==e){e.addObjectWithoutCheck(r.getObjectsEnd());r.reset(!0,!0)}}e.addObjectWithoutCheck(this.objects);this.reset(!1,!0);this.tree.setRoot(e);e.checkContract()},getOctantIndex:function(t){var i,r,n,o,a,s,l,h,c,u=this.position,f=this.radiusOverlap,d=this.overlap,p=0;if(t instanceof e.OctreeObjectData){r=t.radius;i=t.position;t.positionLast.copy(i)}else if(t instanceof e.OctreeNode){i=t.position;r=0}n=i.x-u.x;o=i.y-u.y;a=i.z-u.z;s=Math.abs(n);l=Math.abs(o);h=Math.abs(a);c=Math.max(s,l,h);if(c+r>f){if(s+r>f)p^=n>0?this.tree.FLAG_POS_X:this.tree.FLAG_NEG_X;if(l+r>f)p^=o>0?this.tree.FLAG_POS_Y:this.tree.FLAG_NEG_Y;if(h+r>f)p^=a>0?this.tree.FLAG_POS_Z:this.tree.FLAG_NEG_Z;t.indexOctant=-p-this.tree.INDEX_OUTSIDE_OFFSET;return t.indexOctant}if(n-r>-d)p=1|p;else if(!(d>n+r)){t.indexOctant=this.tree.INDEX_INSIDE_CROSS;return t.indexOctant}if(o-r>-d)p=2|p;else if(!(d>o+r)){t.indexOctant=this.tree.INDEX_INSIDE_CROSS;return t.indexOctant}if(a-r>-d)p=4|p;else if(!(d>a+r)){t.indexOctant=this.tree.INDEX_INSIDE_CROSS;return t.indexOctant}t.indexOctant=p;return t.indexOctant},getOctantIndexFromPosition:function(e,t,i){var r=0;if(e>0)r=1|r;if(t>0)r=2|r;if(i>0)r=4|r;return r},search:function(e,t,i,r,n){var o,a,s,l;if(r)l=this.intersectRay(e,r,t,n);else l=this.intersectSphere(e,t);if(l===!0){i=i.concat(this.objects);for(o=0,a=this.nodesIndices.length;a>o;o++){s=this.nodesByIndex[this.nodesIndices[o]];i=s.search(e,t,i,r)}}return i},intersectSphere:function(e,t){var i=t*t,r=e.x,n=e.y,o=e.z;if(r<this.left)i-=Math.pow(r-this.left,2);else if(r>this.right)i-=Math.pow(r-this.right,2);if(n<this.bottom)i-=Math.pow(n-this.bottom,2);else if(n>this.top)i-=Math.pow(n-this.top,2);if(o<this.back)i-=Math.pow(o-this.back,2);else if(o>this.front)i-=Math.pow(o-this.front,2);return i>=0},intersectRay:function(e,t,i,r){if("undefined"==typeof r)r=this.utilVec31Ray.set(1,1,1).divide(t);var n,o=(this.left-e.x)*r.x,a=(this.right-e.x)*r.x,s=(this.bottom-e.y)*r.y,l=(this.top-e.y)*r.y,h=(this.back-e.z)*r.z,c=(this.front-e.z)*r.z,u=Math.min(Math.min(Math.max(o,a),Math.max(s,l)),Math.max(h,c));if(0>u)return!1;n=Math.max(Math.max(Math.min(o,a),Math.min(s,l)),Math.min(h,c));if(n>u||n>i)return!1;else return!0},getDepthEnd:function(e){var t,i,r;if(this.nodesIndices.length>0)for(t=0,i=this.nodesIndices.length;i>t;t++){r=this.nodesByIndex[this.nodesIndices[t]];e=r.getDepthEnd(e)}else e=!e||this.depth>e?this.depth:e;return e},getNodeCountEnd:function(){return this.tree.root.getNodeCountRecursive()+1},getNodeCountRecursive:function(){var e,t,i=this.nodesIndices.length;for(e=0,t=this.nodesIndices.length;t>e;e++)i+=this.nodesByIndex[this.nodesIndices[e]].getNodeCountRecursive();return i},getObjectsEnd:function(e){var t,i,r;e=(e||[]).concat(this.objects);for(t=0,i=this.nodesIndices.length;i>t;t++){r=this.nodesByIndex[this.nodesIndices[t]];e=r.getObjectsEnd(e)}return e},getObjectCountEnd:function(){var e,t,i=this.objects.length;for(e=0,t=this.nodesIndices.length;t>e;e++)i+=this.nodesByIndex[this.nodesIndices[e]].getObjectCountEnd();return i},getObjectCountStart:function(){var t=this.objects.length,i=this.parent;for(;i instanceof e.OctreeNode;){t+=i.objects.length;i=i.parent}return t},toConsole:function(e){var t,i,r,n="   ";e="string"==typeof e?e:n;console.log(this.parent?e+" octree NODE > ":" octree ROOT > ",this," // id: ",this.id," // indexOctant: ",this.indexOctant," // position: ",this.position.x,this.position.y,this.position.z," // radius: ",this.radius," // depth: ",this.depth);console.log(this.parent?e+" ":" ","+ objects ( ",this.objects.length," ) ",this.objects);console.log(this.parent?e+" ":" ","+ children ( ",this.nodesIndices.length," )",this.nodesIndices,this.nodesByIndex);for(t=0,i=this.nodesIndices.length;i>t;t++){r=this.nodesByIndex[this.nodesIndices[t]];r.toConsole(e+n)}}};e.Raycaster.prototype.intersectOctreeObject=function(t,i){var r,n,o,a;if(t.object instanceof e.Object3D){n=t;t=n.object;a=n.faces;o=t.geometry.faces;if(a.length>0)t.geometry.faces=a;r=this.intersectObject(t,i);if(a.length>0)t.geometry.faces=o}else r=this.intersectObject(t,i);return r};e.Raycaster.prototype.intersectOctreeObjects=function(e,t){var i,r,n=[];for(i=0,r=e.length;r>i;i++)n=n.concat(this.intersectOctreeObject(e[i],t));return n}}(THREE);