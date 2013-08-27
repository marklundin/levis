function plane(e,t){return function(i,r){var n=(i-.5)*e;var o=(r+.5)*t;var a=0;return new THREE.Vector3(n,o,a)}}function Particle(e,t,i,r){this.position=clothFunction(e,t);this.previous=clothFunction(e,t);this.original=clothFunction(e,t);this.a=new THREE.Vector3(0,0,0);this.mass=r;this.invMass=1/r;this.tmp=new THREE.Vector3;this.tmp2=new THREE.Vector3}function satisifyConstrains(e,t,i){diff.subVectors(t.position,e.position);var r=diff.length();if(0!=r){var n=diff.multiplyScalar(1-i/r);var o=n.multiplyScalar(.5);e.position.add(o);t.position.sub(o)}}function Cloth(e,t){function i(t,i){return t+i*(e+1)}e=e||10;t=t||10;this.w=e;this.h=t;var r=[];var n=[];var o,a;for(a=0;t>=a;a++)for(o=0;e>=o;o++)r.push(new Particle(o/e,a/t,0,MASS));for(a=0;t>a;a++)for(o=0;e>o;o++){n.push([r[i(o,a)],r[i(o,a+1)],restDistance]);n.push([r[i(o,a)],r[i(o+1,a)],restDistance])}for(o=e,a=0;t>a;a++)n.push([r[i(o,a)],r[i(o,a+1)],restDistance]);for(a=t,o=0;e>o;o++)n.push([r[i(o,a)],r[i(o+1,a)],restDistance]);this.particles=r;this.constrains=n;this.index=i}function simulate(e){if(lastTime){var t,i,r,n,o,a;if(wind){var s,l,h=clothGeometry.faces;r=cloth.particles;for(t=0,i=h.length;i>t;t++){s=h[t];l=s.normal;tmpForce.copy(l).normalize().multiplyScalar(l.dot(windForce));r[s.a].addForce(tmpForce);r[s.b].addForce(tmpForce);r[s.c].addForce(tmpForce)}}for(r=cloth.particles,t=0,i=r.length;i>t;t++){n=r[t];n.addForce(gravity);n.integrate(TIMESTEP_SQ)}o=cloth.constrains,i=o.length;for(t=0;i>t;t++){a=o[t];satisifyConstrains(a[0],a[1],a[2])}ballPosition.z=90*-Math.sin(Date.now()/600);ballPosition.x=70*Math.cos(Date.now()/400);if(sphere.visible)for(r=cloth.particles,t=0,i=r.length;i>t;t++){n=r[t];pos=n.position;diff.subVectors(pos,ballPosition);if(diff.length()<ballSize){diff.normalize().multiplyScalar(ballSize);pos.copy(ballPosition).add(diff)}}for(r=cloth.particles,t=0,i=r.length;i>t;t++){n=r[t];pos=n.position;if(pos.y<-250)pos.y=-250}for(t=0,i=pins.length;i>t;t++){var c=pins[t];var u=r[c];u.position.copy(u.original);u.previous.copy(u.original)}}else lastTime=e}var DAMPING=.03;var DRAG=1-DAMPING;var MASS=.1;var restDistance=25;var xSegs=10;var ySegs=10;var clothFunction=plane(restDistance*xSegs,restDistance*ySegs);var cloth=new Cloth(xSegs,ySegs);var GRAVITY=981*1.4;var gravity=new THREE.Vector3(0,-GRAVITY,0).multiplyScalar(MASS);var TIMESTEP=.018;var TIMESTEP_SQ=TIMESTEP*TIMESTEP;var pins=[];var wind=!0;var windStrength=2;var windForce=new THREE.Vector3(0,0,0);var ballPosition=new THREE.Vector3(0,-45,0);var ballSize=60;var tmpForce=new THREE.Vector3;var lastTime;Particle.prototype.addForce=function(e){this.a.add(this.tmp2.copy(e).multiplyScalar(this.invMass))};Particle.prototype.integrate=function(e){var t=this.tmp.subVectors(this.position,this.previous);t.multiplyScalar(DRAG).add(this.position);t.add(this.a.multiplyScalar(e));this.tmp=this.previous;this.previous=this.position;this.position=t;this.a.set(0,0,0)};var diff=new THREE.Vector3;