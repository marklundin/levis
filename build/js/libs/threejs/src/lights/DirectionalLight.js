THREE.DirectionalLight=function(e,t){THREE.Light.call(this,e);this.position.set(0,1,0);this.target=new THREE.Object3D;this.intensity=void 0!==t?t:1;this.castShadow=!1;this.onlyShadow=!1;this.shadowCameraNear=50;this.shadowCameraFar=5e3;this.shadowCameraLeft=-500;this.shadowCameraRight=500;this.shadowCameraTop=500;this.shadowCameraBottom=-500;this.shadowCameraVisible=!1;this.shadowBias=0;this.shadowDarkness=.5;this.shadowMapWidth=512;this.shadowMapHeight=512;this.shadowCascade=!1;this.shadowCascadeOffset=new THREE.Vector3(0,0,-1e3);this.shadowCascadeCount=2;this.shadowCascadeBias=[0,0,0];this.shadowCascadeWidth=[512,512,512];this.shadowCascadeHeight=[512,512,512];this.shadowCascadeNearZ=[-1,.99,.998];this.shadowCascadeFarZ=[.99,.998,1];this.shadowCascadeArray=[];this.shadowMap=null;this.shadowMapSize=null;this.shadowCamera=null;this.shadowMatrix=null};THREE.DirectionalLight.prototype=Object.create(THREE.Light.prototype);THREE.DirectionalLight.prototype.clone=function(){var e=new THREE.DirectionalLight;THREE.Light.prototype.clone.call(this,e);e.target=this.target.clone();e.intensity=this.intensity;e.castShadow=this.castShadow;e.onlyShadow=this.onlyShadow;return e};