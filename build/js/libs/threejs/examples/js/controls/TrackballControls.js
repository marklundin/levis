THREE.TrackballControls=function(e,t){function i(e){u.enabled!==!1&&(window.removeEventListener("keydown",i),m=f,f===d.NONE&&(e.keyCode!==u.keys[d.ROTATE]||u.noRotate?e.keyCode!==u.keys[d.ZOOM]||u.noZoom?e.keyCode!==u.keys[d.PAN]||u.noPan||(f=d.PAN):f=d.ZOOM:f=d.ROTATE))}function r(){u.enabled!==!1&&(f=m,window.addEventListener("keydown",i,!1))}function o(e){u.enabled!==!1&&(e.preventDefault(),e.stopPropagation(),f===d.NONE&&(f=e.button),f!==d.ROTATE||u.noRotate?f!==d.ZOOM||u.noZoom?f!==d.PAN||u.noPan||(x=u.getMouseOnScreen(e.clientX,e.clientY),R.copy(x)):(y=u.getMouseOnScreen(e.clientX,e.clientY),T.copy(y)):(v=u.getMouseProjectionOnBall(e.clientX,e.clientY),E.copy(v)),document.addEventListener("mousemove",n,!1),document.addEventListener("mouseup",a,!1))}function n(e){u.enabled!==!1&&(e.preventDefault(),e.stopPropagation(),f!==d.ROTATE||u.noRotate?f!==d.ZOOM||u.noZoom?f!==d.PAN||u.noPan||(R=u.getMouseOnScreen(e.clientX,e.clientY)):T=u.getMouseOnScreen(e.clientX,e.clientY):E=u.getMouseProjectionOnBall(e.clientX,e.clientY))}function a(e){u.enabled!==!1&&(e.preventDefault(),e.stopPropagation(),f=d.NONE,document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",a))}function s(e){if(u.enabled!==!1){e.preventDefault(),e.stopPropagation();var t=0;e.wheelDelta?t=e.wheelDelta/40:e.detail&&(t=-e.detail/3),y.y+=.01*t}}function l(e){if(u.enabled!==!1)switch(e.touches.length){case 1:f=d.TOUCH_ROTATE,v=E=u.getMouseProjectionOnBall(e.touches[0].pageX,e.touches[0].pageY);break;case 2:f=d.TOUCH_ZOOM;var t=e.touches[0].pageX-e.touches[1].pageX,i=e.touches[0].pageY-e.touches[1].pageY;b=_=Math.sqrt(t*t+i*i);break;case 3:f=d.TOUCH_PAN,x=R=u.getMouseOnScreen(e.touches[0].pageX,e.touches[0].pageY);break;default:f=d.NONE}}function h(e){if(u.enabled!==!1)switch(e.preventDefault(),e.stopPropagation(),e.touches.length){case 1:E=u.getMouseProjectionOnBall(e.touches[0].pageX,e.touches[0].pageY);break;case 2:var t=e.touches[0].pageX-e.touches[1].pageX,i=e.touches[0].pageY-e.touches[1].pageY;b=Math.sqrt(t*t+i*i);break;case 3:R=u.getMouseOnScreen(e.touches[0].pageX,e.touches[0].pageY);break;default:f=d.NONE}}function c(e){if(u.enabled!==!1){switch(e.touches.length){case 1:v=E=u.getMouseProjectionOnBall(e.touches[0].pageX,e.touches[0].pageY);break;case 2:_=b=0;break;case 3:x=R=u.getMouseOnScreen(e.touches[0].pageX,e.touches[0].pageY)}f=d.NONE}}var u=this,d={NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM:4,TOUCH_PAN:5};this.object=e,this.domElement=void 0!==t?t:document,this.enabled=!0,this.screen={left:0,top:0,width:0,height:0},this.rotateSpeed=1,this.zoomSpeed=1.2,this.panSpeed=.3,this.noRotate=!1,this.noZoom=!1,this.noPan=!1,this.noRoll=!1,this.staticMoving=!1,this.dynamicDampingFactor=.2,this.minDistance=0,this.maxDistance=1/0,this.keys=[65,83,68],this.target=new THREE.Vector3;var p=new THREE.Vector3,f=d.NONE,m=d.NONE,g=new THREE.Vector3,v=new THREE.Vector3,E=new THREE.Vector3,y=new THREE.Vector2,T=new THREE.Vector2,_=0,b=0,x=new THREE.Vector2,R=new THREE.Vector2;this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.up0=this.object.up.clone();var w={type:"change"};this.handleResize=function(){this.domElement===document?(this.screen.left=0,this.screen.top=0,this.screen.width=window.innerWidth,this.screen.height=window.innerHeight):this.screen=this.domElement.getBoundingClientRect()},this.handleEvent=function(e){"function"==typeof this[e.type]&&this[e.type](e)},this.getMouseOnScreen=function(e,t){return new THREE.Vector2((e-u.screen.left)/u.screen.width,(t-u.screen.top)/u.screen.height)},this.getMouseProjectionOnBall=function(e,t){var i=new THREE.Vector3((e-.5*u.screen.width-u.screen.left)/(.5*u.screen.width),(.5*u.screen.height+u.screen.top-t)/(.5*u.screen.height),0),r=i.length();u.noRoll?i.z=r<Math.SQRT1_2?Math.sqrt(1-r*r):.5/r:r>1?i.normalize():i.z=Math.sqrt(1-r*r),g.copy(u.object.position).sub(u.target);var o=u.object.up.clone().setLength(i.y);return o.add(u.object.up.clone().cross(g).setLength(i.x)),o.add(g.setLength(i.z)),o},this.rotateCamera=function(){var e=Math.acos(v.dot(E)/v.length()/E.length());if(e){var t=(new THREE.Vector3).crossVectors(v,E).normalize(),i=new THREE.Quaternion;e*=u.rotateSpeed,i.setFromAxisAngle(t,-e),g.applyQuaternion(i),u.object.up.applyQuaternion(i),E.applyQuaternion(i),u.staticMoving?v.copy(E):(i.setFromAxisAngle(t,e*(u.dynamicDampingFactor-1)),v.applyQuaternion(i))}},this.zoomCamera=function(){if(f===d.TOUCH_ZOOM){var e=_/b;_=b,g.multiplyScalar(e)}else{var e=1+(T.y-y.y)*u.zoomSpeed;1!==e&&e>0&&(g.multiplyScalar(e),u.staticMoving?y.copy(T):y.y+=(T.y-y.y)*this.dynamicDampingFactor)}},this.panCamera=function(){var e=R.clone().sub(x);if(e.lengthSq()){e.multiplyScalar(g.length()*u.panSpeed);var t=g.clone().cross(u.object.up).setLength(e.x);t.add(u.object.up.clone().setLength(e.y)),u.object.position.add(t),u.target.add(t),u.staticMoving?x=R:x.add(e.subVectors(R,x).multiplyScalar(u.dynamicDampingFactor))}},this.checkDistances=function(){u.noZoom&&u.noPan||(g.lengthSq()>u.maxDistance*u.maxDistance&&u.object.position.addVectors(u.target,g.setLength(u.maxDistance)),g.lengthSq()<u.minDistance*u.minDistance&&u.object.position.addVectors(u.target,g.setLength(u.minDistance)))},this.update=function(){g.subVectors(u.object.position,u.target),u.noRotate||u.rotateCamera(),u.noZoom||u.zoomCamera(),u.noPan||u.panCamera(),u.object.position.addVectors(u.target,g),u.checkDistances(),u.object.lookAt(u.target),p.distanceToSquared(u.object.position)>0&&(u.dispatchEvent(w),p.copy(u.object.position))},this.reset=function(){f=d.NONE,m=d.NONE,u.target.copy(u.target0),u.object.position.copy(u.position0),u.object.up.copy(u.up0),g.subVectors(u.object.position,u.target),u.object.lookAt(u.target),u.dispatchEvent(w),p.copy(u.object.position)},this.domElement.addEventListener("contextmenu",function(e){e.preventDefault()},!1),this.domElement.addEventListener("mousedown",o,!1),this.domElement.addEventListener("mousewheel",s,!1),this.domElement.addEventListener("DOMMouseScroll",s,!1),this.domElement.addEventListener("touchstart",l,!1),this.domElement.addEventListener("touchend",c,!1),this.domElement.addEventListener("touchmove",h,!1),window.addEventListener("keydown",i,!1),window.addEventListener("keyup",r,!1),this.handleResize()},THREE.TrackballControls.prototype=Object.create(THREE.EventDispatcher.prototype);