THREE.PointerLockControls=function(e){var t=this;var i=new THREE.Object3D;i.add(e);var r=new THREE.Object3D;r.position.y=10;r.add(i);var n=!1;var o=!1;var a=!1;var s=!1;var l=!1;var h=!1;var c=new THREE.Vector3;var u=Math.PI/2;var f=function(e){if(t.enabled!==!1){var n=e.movementX||e.mozMovementX||e.webkitMovementX||0;var o=e.movementY||e.mozMovementY||e.webkitMovementY||0;r.rotation.y-=.002*n;i.rotation.x-=.002*o;i.rotation.x=Math.max(-u,Math.min(u,i.rotation.x))}};var d=function(e){switch(e.keyCode){case 38:case 87:n=!0;break;case 37:case 65:a=!0;break;case 40:case 83:o=!0;break;case 39:case 68:s=!0;break;case 32:if(h===!0)c.y+=10;h=!1}};var p=function(e){switch(e.keyCode){case 38:case 87:n=!1;break;case 37:case 65:a=!1;break;case 40:case 83:o=!1;break;case 39:case 68:s=!1}};document.addEventListener("mousemove",f,!1);document.addEventListener("keydown",d,!1);document.addEventListener("keyup",p,!1);this.enabled=!1;this.getObject=function(){return r};this.isOnObject=function(e){l=e;h=e};this.update=function(e){if(t.enabled!==!1){e*=.1;c.x+=.08*-c.x*e;c.z+=.08*-c.z*e;c.y-=.25*e;if(n)c.z-=.12*e;if(o)c.z+=.12*e;if(a)c.x-=.12*e;if(s)c.x+=.12*e;if(l===!0)c.y=Math.max(0,c.y);r.translateX(c.x);r.translateY(c.y);r.translateZ(c.z);if(r.position.y<10){c.y=0;r.position.y=10;h=!0}}}};