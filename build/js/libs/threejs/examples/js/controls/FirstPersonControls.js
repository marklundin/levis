THREE.FirstPersonControls=function(e,t){function i(e,t){return function(){t.apply(e,arguments)}}this.object=e;this.target=new THREE.Vector3(0,0,0);this.domElement=void 0!==t?t:document;this.movementSpeed=1;this.lookSpeed=.005;this.lookVertical=!0;this.autoForward=!1;this.activeLook=!0;this.heightSpeed=!1;this.heightCoef=1;this.heightMin=0;this.heightMax=1;this.constrainVertical=!1;this.verticalMin=0;this.verticalMax=Math.PI;this.autoSpeedFactor=0;this.mouseX=0;this.mouseY=0;this.lat=0;this.lon=0;this.phi=0;this.theta=0;this.moveForward=!1;this.moveBackward=!1;this.moveLeft=!1;this.moveRight=!1;this.freeze=!1;this.mouseDragOn=!1;this.viewHalfX=0;this.viewHalfY=0;if(this.domElement!==document)this.domElement.setAttribute("tabindex",-1);this.handleResize=function(){if(this.domElement===document){this.viewHalfX=window.innerWidth/2;this.viewHalfY=window.innerHeight/2}else{this.viewHalfX=this.domElement.offsetWidth/2;this.viewHalfY=this.domElement.offsetHeight/2}};this.onMouseDown=function(e){if(this.domElement!==document)this.domElement.focus();e.preventDefault();e.stopPropagation();if(this.activeLook)switch(e.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}this.mouseDragOn=!0};this.onMouseUp=function(e){e.preventDefault();e.stopPropagation();if(this.activeLook)switch(e.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.mouseDragOn=!1};this.onMouseMove=function(e){if(this.domElement===document){this.mouseX=e.pageX-this.viewHalfX;this.mouseY=e.pageY-this.viewHalfY}else{this.mouseX=e.pageX-this.domElement.offsetLeft-this.viewHalfX;this.mouseY=e.pageY-this.domElement.offsetTop-this.viewHalfY}};this.onKeyDown=function(e){switch(e.keyCode){case 38:case 87:this.moveForward=!0;break;case 37:case 65:this.moveLeft=!0;break;case 40:case 83:this.moveBackward=!0;break;case 39:case 68:this.moveRight=!0;break;case 82:this.moveUp=!0;break;case 70:this.moveDown=!0;break;case 81:this.freeze=!this.freeze}};this.onKeyUp=function(e){switch(e.keyCode){case 38:case 87:this.moveForward=!1;break;case 37:case 65:this.moveLeft=!1;break;case 40:case 83:this.moveBackward=!1;break;case 39:case 68:this.moveRight=!1;break;case 82:this.moveUp=!1;break;case 70:this.moveDown=!1}};this.update=function(e){if(!this.freeze){if(this.heightSpeed){var t=THREE.Math.clamp(this.object.position.y,this.heightMin,this.heightMax);var i=t-this.heightMin;this.autoSpeedFactor=e*i*this.heightCoef}else this.autoSpeedFactor=0;var r=e*this.movementSpeed;if(this.moveForward||this.autoForward&&!this.moveBackward)this.object.translateZ(-(r+this.autoSpeedFactor));if(this.moveBackward)this.object.translateZ(r);if(this.moveLeft)this.object.translateX(-r);if(this.moveRight)this.object.translateX(r);if(this.moveUp)this.object.translateY(r);if(this.moveDown)this.object.translateY(-r);var n=e*this.lookSpeed;if(!this.activeLook)n=0;var o=1;if(this.constrainVertical)o=Math.PI/(this.verticalMax-this.verticalMin);this.lon+=this.mouseX*n;if(this.lookVertical)this.lat-=this.mouseY*n*o;this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=THREE.Math.degToRad(90-this.lat);this.theta=THREE.Math.degToRad(this.lon);if(this.constrainVertical)this.phi=THREE.Math.mapLinear(this.phi,0,Math.PI,this.verticalMin,this.verticalMax);var a=this.target,s=this.object.position;a.x=s.x+100*Math.sin(this.phi)*Math.cos(this.theta);a.y=s.y+100*Math.cos(this.phi);a.z=s.z+100*Math.sin(this.phi)*Math.sin(this.theta);this.object.lookAt(a)}};this.domElement.addEventListener("contextmenu",function(e){e.preventDefault()},!1);this.domElement.addEventListener("mousemove",i(this,this.onMouseMove),!1);this.domElement.addEventListener("mousedown",i(this,this.onMouseDown),!1);this.domElement.addEventListener("mouseup",i(this,this.onMouseUp),!1);this.domElement.addEventListener("keydown",i(this,this.onKeyDown),!1);this.domElement.addEventListener("keyup",i(this,this.onKeyUp),!1);this.handleResize()};