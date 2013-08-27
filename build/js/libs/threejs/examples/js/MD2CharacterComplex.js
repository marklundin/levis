THREE.MD2CharacterComplex=function(){function e(e,t){var r=new THREE.UVMapping;var n=[];for(var o=0;o<t.length;o++){n[o]=THREE.ImageUtils.loadTexture(e+t[o],r,i);n[o].name=t[o]}return n}function t(e,t){e.computeMorphNormals();var i=THREE.ImageUtils.generateDataTexture(1,1,new THREE.Color(16777215));var r=new THREE.MeshPhongMaterial({color:16755200,specular:1118481,shininess:50,wireframe:!0,shading:THREE.SmoothShading,map:i,morphTargets:!0,morphNormals:!0,metal:!0});var o=new THREE.MeshPhongMaterial({color:16777215,specular:1118481,shininess:50,wireframe:!1,shading:THREE.SmoothShading,map:t,morphTargets:!0,morphNormals:!0,metal:!0});o.wrapAround=!0;var a=new THREE.MorphBlendMesh(e,o);a.rotation.y=-Math.PI/2;a.materialTexture=o;a.materialWireframe=r;a.autoCreateAnimations(n.animationFPS);return a}function i(){n.loadCounter-=1;if(0===n.loadCounter)n.onLoadComplete()}function r(e){return 1===e?1:-Math.pow(2,-10*e)+1}var n=this;this.scale=1;this.animationFPS=6;this.transitionFrames=15;this.maxSpeed=275;this.maxReverseSpeed=-275;this.frontAcceleration=600;this.backAcceleration=600;this.frontDecceleration=600;this.angularSpeed=2.5;this.root=new THREE.Object3D;this.meshBody=null;this.meshWeapon=null;this.controls=null;this.skinsBody=[];this.skinsWeapon=[];this.weapons=[];this.currentSkin=void 0;this.onLoadComplete=function(){};this.meshes=[];this.animations={};this.loadCounter=0;this.speed=0;this.bodyOrientation=0;this.walkSpeed=this.maxSpeed;this.crouchSpeed=.5*this.maxSpeed;this.activeAnimation=null;this.oldAnimation=null;this.enableShadows=function(e){for(var t=0;t<this.meshes.length;t++){this.meshes[t].castShadow=e;this.meshes[t].receiveShadow=e}};this.setVisible=function(e){for(var t=0;t<this.meshes.length;t++){this.meshes[t].visible=e;this.meshes[t].visible=e}};this.shareParts=function(e){this.animations=e.animations;this.walkSpeed=e.walkSpeed;this.crouchSpeed=e.crouchSpeed;this.skinsBody=e.skinsBody;this.skinsWeapon=e.skinsWeapon;var i=t(e.meshBody.geometry,this.skinsBody[0]);i.scale.set(this.scale,this.scale,this.scale);this.root.position.y=e.root.position.y;this.root.add(i);this.meshBody=i;this.meshes.push(i);for(var r=0;r<e.weapons.length;r++){var n=t(e.weapons[r].geometry,this.skinsWeapon[r]);n.scale.set(this.scale,this.scale,this.scale);n.visible=!1;n.name=e.weapons[r].name;this.root.add(n);this.weapons[r]=n;this.meshWeapon=n;this.meshes.push(n)}};this.loadParts=function(r){this.animations=r.animations;this.walkSpeed=r.walkSpeed;this.crouchSpeed=r.crouchSpeed;this.loadCounter=2*r.weapons.length+r.skins.length+1;var o=[];for(var a=0;a<r.weapons.length;a++)o[a]=r.weapons[a][1];this.skinsBody=e(r.baseUrl+"skins/",r.skins);this.skinsWeapon=e(r.baseUrl+"skins/",o);var s=new THREE.JSONLoader;s.load(r.baseUrl+r.body,function(e){e.computeBoundingBox();n.root.position.y=-n.scale*e.boundingBox.min.y;var r=t(e,n.skinsBody[0]);r.scale.set(n.scale,n.scale,n.scale);n.root.add(r);n.meshBody=r;n.meshes.push(r);i()});var l=function(e,r){return function(o){var a=t(o,n.skinsWeapon[e]);a.scale.set(n.scale,n.scale,n.scale);a.visible=!1;a.name=r;n.root.add(a);n.weapons[e]=a;n.meshWeapon=a;n.meshes.push(a);i()}};for(var a=0;a<r.weapons.length;a++)s.load(r.baseUrl+r.weapons[a][0],l(a,r.weapons[a][0]))};this.setPlaybackRate=function(e){if(this.meshBody)this.meshBody.duration=this.meshBody.baseDuration/e;if(this.meshWeapon)this.meshWeapon.duration=this.meshWeapon.baseDuration/e};this.setWireframe=function(e){if(e){if(this.meshBody)this.meshBody.material=this.meshBody.materialWireframe;if(this.meshWeapon)this.meshWeapon.material=this.meshWeapon.materialWireframe}else{if(this.meshBody)this.meshBody.material=this.meshBody.materialTexture;if(this.meshWeapon)this.meshWeapon.material=this.meshWeapon.materialTexture}};this.setSkin=function(e){if(this.meshBody&&this.meshBody.material.wireframe===!1){this.meshBody.material.map=this.skinsBody[e];this.currentSkin=e}};this.setWeapon=function(e){for(var t=0;t<this.weapons.length;t++)this.weapons[t].visible=!1;var i=this.weapons[e];if(i){i.visible=!0;this.meshWeapon=i;if(this.activeAnimation){i.playAnimation(this.activeAnimation);this.meshWeapon.setAnimationTime(this.activeAnimation,this.meshBody.getAnimationTime(this.activeAnimation))}}};this.setAnimation=function(e){if(e!==this.activeAnimation&&e){if(this.meshBody){this.meshBody.setAnimationWeight(e,0);this.meshBody.playAnimation(e);this.oldAnimation=this.activeAnimation;this.activeAnimation=e;this.blendCounter=this.transitionFrames}if(this.meshWeapon){this.meshWeapon.setAnimationWeight(e,0);this.meshWeapon.playAnimation(e)}}};this.update=function(e){if(this.controls)this.updateMovementModel(e);if(this.animations){this.updateBehaviors(e);this.updateAnimations(e)}};this.updateAnimations=function(e){var t=1;if(this.blendCounter>0){t=(this.transitionFrames-this.blendCounter)/this.transitionFrames;this.blendCounter-=1}if(this.meshBody){this.meshBody.update(e);this.meshBody.setAnimationWeight(this.activeAnimation,t);this.meshBody.setAnimationWeight(this.oldAnimation,1-t)}if(this.meshWeapon){this.meshWeapon.update(e);this.meshWeapon.setAnimationWeight(this.activeAnimation,t);this.meshWeapon.setAnimationWeight(this.oldAnimation,1-t)}};this.updateBehaviors=function(){var e=this.controls;var t=this.animations;var i,r;if(e.crouch){i=t["crouchMove"];r=t["crouchIdle"]}else{i=t["move"];r=t["idle"]}if(e.jump){i=t["jump"];r=t["jump"]}if(e.attack)if(e.crouch){i=t["crouchAttack"];r=t["crouchAttack"]}else{i=t["attack"];r=t["attack"]}if(e.moveForward||e.moveBackward||e.moveLeft||e.moveRight)if(this.activeAnimation!==i)this.setAnimation(i);if(Math.abs(this.speed)<.2*this.maxSpeed&&!(e.moveLeft||e.moveRight||e.moveForward||e.moveBackward))if(this.activeAnimation!==r)this.setAnimation(r);if(e.moveForward){if(this.meshBody){this.meshBody.setAnimationDirectionForward(this.activeAnimation);this.meshBody.setAnimationDirectionForward(this.oldAnimation)}if(this.meshWeapon){this.meshWeapon.setAnimationDirectionForward(this.activeAnimation);this.meshWeapon.setAnimationDirectionForward(this.oldAnimation)}}if(e.moveBackward){if(this.meshBody){this.meshBody.setAnimationDirectionBackward(this.activeAnimation);this.meshBody.setAnimationDirectionBackward(this.oldAnimation)}if(this.meshWeapon){this.meshWeapon.setAnimationDirectionBackward(this.activeAnimation);this.meshWeapon.setAnimationDirectionBackward(this.oldAnimation)}}};this.updateMovementModel=function(e){var t=this.controls;if(t.crouch)this.maxSpeed=this.crouchSpeed;else this.maxSpeed=this.walkSpeed;this.maxReverseSpeed=-this.maxSpeed;if(t.moveForward)this.speed=THREE.Math.clamp(this.speed+e*this.frontAcceleration,this.maxReverseSpeed,this.maxSpeed);if(t.moveBackward)this.speed=THREE.Math.clamp(this.speed-e*this.backAcceleration,this.maxReverseSpeed,this.maxSpeed);var i=1;if(t.moveLeft){this.bodyOrientation+=e*this.angularSpeed;this.speed=THREE.Math.clamp(this.speed+i*e*this.frontAcceleration,this.maxReverseSpeed,this.maxSpeed)}if(t.moveRight){this.bodyOrientation-=e*this.angularSpeed;this.speed=THREE.Math.clamp(this.speed+i*e*this.frontAcceleration,this.maxReverseSpeed,this.maxSpeed)}if(!t.moveForward&&!t.moveBackward)if(this.speed>0){var n=r(this.speed/this.maxSpeed);this.speed=THREE.Math.clamp(this.speed-n*e*this.frontDecceleration,0,this.maxSpeed)}else{var n=r(this.speed/this.maxReverseSpeed);this.speed=THREE.Math.clamp(this.speed+n*e*this.backAcceleration,this.maxReverseSpeed,0)}var o=this.speed*e;this.root.position.x+=Math.sin(this.bodyOrientation)*o;this.root.position.z+=Math.cos(this.bodyOrientation)*o;this.root.rotation.y=this.bodyOrientation}};