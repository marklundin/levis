THREE.SceneUtils={createMultiMaterialObject:function(e,t){for(var i=new THREE.Object3D,r=0,n=t.length;n>r;r++)i.add(new THREE.Mesh(e,t[r]));return i},detach:function(e,t,i){e.applyMatrix(t.matrixWorld),t.remove(e),i.add(e)},attach:function(e,t,i){var r=new THREE.Matrix4;r.getInverse(i.matrixWorld),e.applyMatrix(r),t.remove(e),i.add(e)}};