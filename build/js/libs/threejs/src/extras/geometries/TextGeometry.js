THREE.TextGeometry=function(e,t){t=t||{};var i=THREE.FontUtils.generateShapes(e,t);t.amount=void 0!==t.height?t.height:50;if(void 0===t.bevelThickness)t.bevelThickness=10;if(void 0===t.bevelSize)t.bevelSize=8;if(void 0===t.bevelEnabled)t.bevelEnabled=!1;THREE.ExtrudeGeometry.call(this,i,t)};THREE.TextGeometry.prototype=Object.create(THREE.ExtrudeGeometry.prototype);