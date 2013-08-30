THREE.Car=function(){function e(e,t){n.bodyGeometry=e,n.bodyMaterials=t,i()}function t(e,t){n.wheelGeometry=e,n.wheelMaterials=t,i()}function i(){if(n.bodyGeometry&&n.wheelGeometry){if(n.autoWheelGeometry){n.wheelGeometry.computeBoundingBox();var e=n.wheelGeometry.boundingBox;n.wheelOffset.addVectors(e.min,e.max),n.wheelOffset.multiplyScalar(.5),n.wheelDiameter=e.max.y-e.min.y,THREE.GeometryUtils.center(n.wheelGeometry)}var t=n.modelScale,i=new THREE.Vector3,r=new THREE.MeshFaceMaterial(n.bodyMaterials),o=new THREE.MeshFaceMaterial(n.wheelMaterials);n.bodyMesh=new THREE.Mesh(n.bodyGeometry,r),n.bodyMesh.scale.set(t,t,t),n.root.add(n.bodyMesh),i.multiplyVectors(n.wheelOffset,new THREE.Vector3(t,t,t)),n.frontLeftWheelRoot.position.add(i),n.frontLeftWheelMesh=new THREE.Mesh(n.wheelGeometry,o),n.frontLeftWheelMesh.scale.set(t,t,t),n.frontLeftWheelRoot.add(n.frontLeftWheelMesh),n.root.add(n.frontLeftWheelRoot),i.multiplyVectors(n.wheelOffset,new THREE.Vector3(-t,t,t)),n.frontRightWheelRoot.position.add(i),n.frontRightWheelMesh=new THREE.Mesh(n.wheelGeometry,o),n.frontRightWheelMesh.scale.set(t,t,t),n.frontRightWheelMesh.rotation.z=Math.PI,n.frontRightWheelRoot.add(n.frontRightWheelMesh),n.root.add(n.frontRightWheelRoot),i.multiplyVectors(n.wheelOffset,new THREE.Vector3(t,t,-t)),i.z-=n.backWheelOffset,n.backLeftWheelMesh=new THREE.Mesh(n.wheelGeometry,o),n.backLeftWheelMesh.position.add(i),n.backLeftWheelMesh.scale.set(t,t,t),n.root.add(n.backLeftWheelMesh),i.multiplyVectors(n.wheelOffset,new THREE.Vector3(-t,t,-t)),i.z-=n.backWheelOffset,n.backRightWheelMesh=new THREE.Mesh(n.wheelGeometry,o),n.backRightWheelMesh.position.add(i),n.backRightWheelMesh.scale.set(t,t,t),n.backRightWheelMesh.rotation.z=Math.PI,n.root.add(n.backRightWheelMesh),n.meshes=[n.bodyMesh,n.frontLeftWheelMesh,n.frontRightWheelMesh,n.backLeftWheelMesh,n.backRightWheelMesh],n.loaded=!0,n.callback&&n.callback(n)}}function r(e){return 1===e?1:-Math.pow(2,-10*e)+1}var n=this;this.modelScale=1,this.backWheelOffset=2,this.autoWheelGeometry=!0,this.wheelOffset=new THREE.Vector3,this.wheelDiameter=1,this.MAX_SPEED=2200,this.MAX_REVERSE_SPEED=-1500,this.MAX_WHEEL_ROTATION=.6,this.FRONT_ACCELERATION=1250,this.BACK_ACCELERATION=1500,this.WHEEL_ANGULAR_ACCELERATION=1.5,this.FRONT_DECCELERATION=750,this.WHEEL_ANGULAR_DECCELERATION=1,this.STEERING_RADIUS_RATIO=.0023,this.MAX_TILT_SIDES=.05,this.MAX_TILT_FRONTBACK=.015,this.speed=0,this.acceleration=0,this.wheelOrientation=0,this.carOrientation=0,this.root=new THREE.Object3D,this.frontLeftWheelRoot=new THREE.Object3D,this.frontRightWheelRoot=new THREE.Object3D,this.bodyMesh=null,this.frontLeftWheelMesh=null,this.frontRightWheelMesh=null,this.backLeftWheelMesh=null,this.backRightWheelMesh=null,this.bodyGeometry=null,this.wheelGeometry=null,this.bodyMaterials=null,this.wheelMaterials=null,this.loaded=!1,this.meshes=[],this.enableShadows=function(e){for(var t=0;t<this.meshes.length;t++)this.meshes[t].castShadow=e,this.meshes[t].receiveShadow=e},this.setVisible=function(e){for(var t=0;t<this.meshes.length;t++)this.meshes[t].visible=e,this.meshes[t].visible=e},this.loadPartsJSON=function(i,r){var n=new THREE.JSONLoader;n.load(i,function(t,i){e(t,i)}),n.load(r,function(e,i){t(e,i)})},this.loadPartsBinary=function(i,r){var n=new THREE.BinaryLoader;n.load(i,function(t,i){e(t,i)}),n.load(r,function(e,i){t(e,i)})},this.updateCarModel=function(e,t){if(t.moveForward&&(this.speed=THREE.Math.clamp(this.speed+e*this.FRONT_ACCELERATION,this.MAX_REVERSE_SPEED,this.MAX_SPEED),this.acceleration=THREE.Math.clamp(this.acceleration+e,-1,1)),t.moveBackward&&(this.speed=THREE.Math.clamp(this.speed-e*this.BACK_ACCELERATION,this.MAX_REVERSE_SPEED,this.MAX_SPEED),this.acceleration=THREE.Math.clamp(this.acceleration-e,-1,1)),t.moveLeft&&(this.wheelOrientation=THREE.Math.clamp(this.wheelOrientation+e*this.WHEEL_ANGULAR_ACCELERATION,-this.MAX_WHEEL_ROTATION,this.MAX_WHEEL_ROTATION)),t.moveRight&&(this.wheelOrientation=THREE.Math.clamp(this.wheelOrientation-e*this.WHEEL_ANGULAR_ACCELERATION,-this.MAX_WHEEL_ROTATION,this.MAX_WHEEL_ROTATION)),!t.moveForward&&!t.moveBackward)if(this.speed>0){var i=r(this.speed/this.MAX_SPEED);this.speed=THREE.Math.clamp(this.speed-i*e*this.FRONT_DECCELERATION,0,this.MAX_SPEED),this.acceleration=THREE.Math.clamp(this.acceleration-i*e,0,1)}else{var i=r(this.speed/this.MAX_REVERSE_SPEED);this.speed=THREE.Math.clamp(this.speed+i*e*this.BACK_ACCELERATION,this.MAX_REVERSE_SPEED,0),this.acceleration=THREE.Math.clamp(this.acceleration+i*e,-1,0)}t.moveLeft||t.moveRight||(this.wheelOrientation=this.wheelOrientation>0?THREE.Math.clamp(this.wheelOrientation-e*this.WHEEL_ANGULAR_DECCELERATION,0,this.MAX_WHEEL_ROTATION):THREE.Math.clamp(this.wheelOrientation+e*this.WHEEL_ANGULAR_DECCELERATION,-this.MAX_WHEEL_ROTATION,0));var n=this.speed*e;this.carOrientation+=n*this.STEERING_RADIUS_RATIO*this.wheelOrientation,this.root.position.x+=Math.sin(this.carOrientation)*n,this.root.position.z+=Math.cos(this.carOrientation)*n,this.root.rotation.y=this.carOrientation,this.loaded&&(this.bodyMesh.rotation.z=this.MAX_TILT_SIDES*this.wheelOrientation*(this.speed/this.MAX_SPEED),this.bodyMesh.rotation.x=-this.MAX_TILT_FRONTBACK*this.acceleration);var o=1/(this.modelScale*(this.wheelDiameter/2)),a=n*o;this.loaded&&(this.frontLeftWheelMesh.rotation.x+=a,this.frontRightWheelMesh.rotation.x+=a,this.backLeftWheelMesh.rotation.x+=a,this.backRightWheelMesh.rotation.x+=a),this.frontLeftWheelRoot.rotation.y=this.wheelOrientation,this.frontRightWheelRoot.rotation.y=this.wheelOrientation}};