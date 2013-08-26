THREE.Matrix4=function(e,t,i,r,a,o,n,s,l,c,h,u,f,d,p,m){this.elements=new Float32Array(16);var v=this.elements;v[0]=void 0!==e?e:1;v[4]=t||0;v[8]=i||0;v[12]=r||0;v[1]=a||0;v[5]=void 0!==o?o:1;v[9]=n||0;v[13]=s||0;v[2]=l||0;v[6]=c||0;v[10]=void 0!==h?h:1;v[14]=u||0;v[3]=f||0;v[7]=d||0;v[11]=p||0;v[15]=void 0!==m?m:1};THREE.Matrix4.prototype={constructor:THREE.Matrix4,set:function(e,t,i,r,a,o,n,s,l,c,h,u,f,d,p,m){var v=this.elements;v[0]=e;v[4]=t;v[8]=i;v[12]=r;v[1]=a;v[5]=o;v[9]=n;v[13]=s;v[2]=l;v[6]=c;v[10]=h;v[14]=u;v[3]=f;v[7]=d;v[11]=p;v[15]=m;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(e){this.elements.set(e.elements);return this},extractPosition:function(e){console.warn("DEPRECATED: Matrix4's .extractPosition() has been renamed to .copyPosition().");return this.copyPosition(e)},copyPosition:function(e){var t=this.elements;var i=e.elements;t[12]=i[12];t[13]=i[13];t[14]=i[14];return this},extractRotation:function(){var e=new THREE.Vector3;return function(t){var i=this.elements;var r=t.elements;var a=1/e.set(r[0],r[1],r[2]).length();var o=1/e.set(r[4],r[5],r[6]).length();var n=1/e.set(r[8],r[9],r[10]).length();i[0]=r[0]*a;i[1]=r[1]*a;i[2]=r[2]*a;i[4]=r[4]*o;i[5]=r[5]*o;i[6]=r[6]*o;i[8]=r[8]*n;i[9]=r[9]*n;i[10]=r[10]*n;return this}}(),makeRotationFromEuler:function(e){if(void 0===typeof e["order"])console.error("ERROR: Matrix's .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.");var t=this.elements;var i=e.x,r=e.y,a=e.z;var o=Math.cos(i),n=Math.sin(i);var s=Math.cos(r),l=Math.sin(r);var c=Math.cos(a),h=Math.sin(a);if(void 0===e.order||"XYZ"===e.order){var u=o*c,f=o*h,d=n*c,p=n*h;t[0]=s*c;t[4]=-s*h;t[8]=l;t[1]=f+d*l;t[5]=u-p*l;t[9]=-n*s;t[2]=p-u*l;t[6]=d+f*l;t[10]=o*s}else if("YXZ"===e.order){var m=s*c,v=s*h,g=l*c,E=l*h;t[0]=m+E*n;t[4]=g*n-v;t[8]=o*l;t[1]=o*h;t[5]=o*c;t[9]=-n;t[2]=v*n-g;t[6]=E+m*n;t[10]=o*s}else if("ZXY"===e.order){var m=s*c,v=s*h,g=l*c,E=l*h;t[0]=m-E*n;t[4]=-o*h;t[8]=g+v*n;t[1]=v+g*n;t[5]=o*c;t[9]=E-m*n;t[2]=-o*l;t[6]=n;t[10]=o*s}else if("ZYX"===e.order){var u=o*c,f=o*h,d=n*c,p=n*h;t[0]=s*c;t[4]=d*l-f;t[8]=u*l+p;t[1]=s*h;t[5]=p*l+u;t[9]=f*l-d;t[2]=-l;t[6]=n*s;t[10]=o*s}else if("YZX"===e.order){var y=o*s,T=o*l,x=n*s,b=n*l;t[0]=s*c;t[4]=b-y*h;t[8]=x*h+T;t[1]=h;t[5]=o*c;t[9]=-n*c;t[2]=-l*c;t[6]=T*h+x;t[10]=y-b*h}else if("XZY"===e.order){var y=o*s,T=o*l,x=n*s,b=n*l;t[0]=s*c;t[4]=-h;t[8]=l*c;t[1]=y*h+b;t[5]=o*c;t[9]=T*h-x;t[2]=x*h-T;t[6]=n*c;t[10]=b*h+y}t[3]=0;t[7]=0;t[11]=0;t[12]=0;t[13]=0;t[14]=0;t[15]=1;return this},setRotationFromQuaternion:function(e){console.warn("DEPRECATED: Matrix4's .setRotationFromQuaternion() has been deprecated in favor of makeRotationFromQuaternion.  Please update your code.");return this.makeRotationFromQuaternion(e)},makeRotationFromQuaternion:function(e){var t=this.elements;var i=e.x,r=e.y,a=e.z,o=e.w;var n=i+i,s=r+r,l=a+a;var c=i*n,h=i*s,u=i*l;var f=r*s,d=r*l,p=a*l;var m=o*n,v=o*s,g=o*l;t[0]=1-(f+p);t[4]=h-g;t[8]=u+v;t[1]=h+g;t[5]=1-(c+p);t[9]=d-m;t[2]=u-v;t[6]=d+m;t[10]=1-(c+f);t[3]=0;t[7]=0;t[11]=0;t[12]=0;t[13]=0;t[14]=0;t[15]=1;return this},lookAt:function(){var e=new THREE.Vector3;var t=new THREE.Vector3;var i=new THREE.Vector3;return function(r,a,o){var n=this.elements;i.subVectors(r,a).normalize();if(0===i.length())i.z=1;e.crossVectors(o,i).normalize();if(0===e.length()){i.x+=1e-4;e.crossVectors(o,i).normalize()}t.crossVectors(i,e);n[0]=e.x;n[4]=t.x;n[8]=i.x;n[1]=e.y;n[5]=t.y;n[9]=i.y;n[2]=e.z;n[6]=t.z;n[10]=i.z;return this}}(),multiply:function(e,t){if(void 0!==t){console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.");return this.multiplyMatrices(e,t)}return this.multiplyMatrices(this,e)},multiplyMatrices:function(e,t){var i=e.elements;var r=t.elements;var a=this.elements;var o=i[0],n=i[4],s=i[8],l=i[12];var c=i[1],h=i[5],u=i[9],f=i[13];var d=i[2],p=i[6],m=i[10],v=i[14];var g=i[3],E=i[7],y=i[11],T=i[15];var x=r[0],b=r[4],R=r[8],_=r[12];var w=r[1],H=r[5],M=r[9],S=r[13];var C=r[2],A=r[6],D=r[10],P=r[14];var L=r[3],N=r[7],F=r[11],k=r[15];a[0]=o*x+n*w+s*C+l*L;a[4]=o*b+n*H+s*A+l*N;a[8]=o*R+n*M+s*D+l*F;a[12]=o*_+n*S+s*P+l*k;a[1]=c*x+h*w+u*C+f*L;a[5]=c*b+h*H+u*A+f*N;a[9]=c*R+h*M+u*D+f*F;a[13]=c*_+h*S+u*P+f*k;a[2]=d*x+p*w+m*C+v*L;a[6]=d*b+p*H+m*A+v*N;a[10]=d*R+p*M+m*D+v*F;a[14]=d*_+p*S+m*P+v*k;a[3]=g*x+E*w+y*C+T*L;a[7]=g*b+E*H+y*A+T*N;a[11]=g*R+E*M+y*D+T*F;a[15]=g*_+E*S+y*P+T*k;return this},multiplyToArray:function(e,t,i){var r=this.elements;this.multiplyMatrices(e,t);i[0]=r[0];i[1]=r[1];i[2]=r[2];i[3]=r[3];i[4]=r[4];i[5]=r[5];i[6]=r[6];i[7]=r[7];i[8]=r[8];i[9]=r[9];i[10]=r[10];i[11]=r[11];i[12]=r[12];i[13]=r[13];i[14]=r[14];i[15]=r[15];return this},multiplyScalar:function(e){var t=this.elements;t[0]*=e;t[4]*=e;t[8]*=e;t[12]*=e;t[1]*=e;t[5]*=e;t[9]*=e;t[13]*=e;t[2]*=e;t[6]*=e;t[10]*=e;t[14]*=e;t[3]*=e;t[7]*=e;t[11]*=e;t[15]*=e;return this},multiplyVector3:function(e){console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");return e.applyProjection(this)},multiplyVector4:function(e){console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");return e.applyMatrix4(this)},multiplyVector3Array:function(){var e=new THREE.Vector3;return function(t){for(var i=0,r=t.length;r>i;i+=3){e.x=t[i];e.y=t[i+1];e.z=t[i+2];e.applyProjection(this);t[i]=e.x;t[i+1]=e.y;t[i+2]=e.z}return t}}(),rotateAxis:function(e){console.warn("DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");e.transformDirection(this)},crossVector:function(e){console.warn("DEPRECATED: Matrix4's .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");return e.applyMatrix4(this)},determinant:function(){var e=this.elements;var t=e[0],i=e[4],r=e[8],a=e[12];var o=e[1],n=e[5],s=e[9],l=e[13];var c=e[2],h=e[6],u=e[10],f=e[14];var d=e[3],p=e[7],m=e[11],v=e[15];return d*(+a*s*h-r*l*h-a*n*u+i*l*u+r*n*f-i*s*f)+p*(+t*s*f-t*l*u+a*o*u-r*o*f+r*l*c-a*s*c)+m*(+t*l*h-t*n*f-a*o*h+i*o*f+a*n*c-i*l*c)+v*(-r*n*c-t*s*h+t*n*u+r*o*h-i*o*u+i*s*c)},transpose:function(){var e=this.elements;var t;t=e[1];e[1]=e[4];e[4]=t;t=e[2];e[2]=e[8];e[8]=t;t=e[6];e[6]=e[9];e[9]=t;t=e[3];e[3]=e[12];e[12]=t;t=e[7];e[7]=e[13];e[13]=t;t=e[11];e[11]=e[14];e[14]=t;return this},flattenToArray:function(e){var t=this.elements;e[0]=t[0];e[1]=t[1];e[2]=t[2];e[3]=t[3];e[4]=t[4];e[5]=t[5];e[6]=t[6];e[7]=t[7];e[8]=t[8];e[9]=t[9];e[10]=t[10];e[11]=t[11];e[12]=t[12];e[13]=t[13];e[14]=t[14];e[15]=t[15];return e},flattenToArrayOffset:function(e,t){var i=this.elements;e[t]=i[0];e[t+1]=i[1];e[t+2]=i[2];e[t+3]=i[3];e[t+4]=i[4];e[t+5]=i[5];e[t+6]=i[6];e[t+7]=i[7];e[t+8]=i[8];e[t+9]=i[9];e[t+10]=i[10];e[t+11]=i[11];e[t+12]=i[12];e[t+13]=i[13];e[t+14]=i[14];e[t+15]=i[15];return e},getPosition:function(){var e=new THREE.Vector3;return function(){console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.");var t=this.elements;return e.set(t[12],t[13],t[14])}}(),setPosition:function(e){var t=this.elements;t[12]=e.x;t[13]=e.y;t[14]=e.z;return this},getInverse:function(e,t){var i=this.elements;var r=e.elements;var a=r[0],o=r[4],n=r[8],s=r[12];var l=r[1],c=r[5],h=r[9],u=r[13];var f=r[2],d=r[6],p=r[10],m=r[14];var v=r[3],g=r[7],E=r[11],y=r[15];i[0]=h*m*g-u*p*g+u*d*E-c*m*E-h*d*y+c*p*y;i[4]=s*p*g-n*m*g-s*d*E+o*m*E+n*d*y-o*p*y;i[8]=n*u*g-s*h*g+s*c*E-o*u*E-n*c*y+o*h*y;i[12]=s*h*d-n*u*d-s*c*p+o*u*p+n*c*m-o*h*m;i[1]=u*p*v-h*m*v-u*f*E+l*m*E+h*f*y-l*p*y;i[5]=n*m*v-s*p*v+s*f*E-a*m*E-n*f*y+a*p*y;i[9]=s*h*v-n*u*v-s*l*E+a*u*E+n*l*y-a*h*y;i[13]=n*u*f-s*h*f+s*l*p-a*u*p-n*l*m+a*h*m;i[2]=c*m*v-u*d*v+u*f*g-l*m*g-c*f*y+l*d*y;i[6]=s*d*v-o*m*v-s*f*g+a*m*g+o*f*y-a*d*y;i[10]=o*u*v-s*c*v+s*l*g-a*u*g-o*l*y+a*c*y;i[14]=s*c*f-o*u*f-s*l*d+a*u*d+o*l*m-a*c*m;i[3]=h*d*v-c*p*v-h*f*g+l*p*g+c*f*E-l*d*E;i[7]=o*p*v-n*d*v+n*f*g-a*p*g-o*f*E+a*d*E;i[11]=n*c*v-o*h*v-n*l*g+a*h*g+o*l*E-a*c*E;i[15]=o*h*f-n*c*f+n*l*d-a*h*d-o*l*p+a*c*p;var T=a*i[0]+l*i[4]+f*i[8]+v*i[12];if(0==T){var x="Matrix4.getInverse(): can't invert matrix, determinant is 0";if(t)throw new Error(x);else console.warn(x);this.identity();return this}this.multiplyScalar(1/T);return this},translate:function(){console.warn("DEPRECATED: Matrix4's .translate() has been removed.")},rotateX:function(){console.warn("DEPRECATED: Matrix4's .rotateX() has been removed.")},rotateY:function(){console.warn("DEPRECATED: Matrix4's .rotateY() has been removed.")},rotateZ:function(){console.warn("DEPRECATED: Matrix4's .rotateZ() has been removed.")},rotateByAxis:function(){console.warn("DEPRECATED: Matrix4's .rotateByAxis() has been removed.")},scale:function(e){var t=this.elements;var i=e.x,r=e.y,a=e.z;t[0]*=i;t[4]*=r;t[8]*=a;t[1]*=i;t[5]*=r;t[9]*=a;t[2]*=i;t[6]*=r;t[10]*=a;t[3]*=i;t[7]*=r;t[11]*=a;return this},getMaxScaleOnAxis:function(){var e=this.elements;var t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2];var i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6];var r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,Math.max(i,r)))},makeTranslation:function(e,t,i){this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1);return this},makeRotationX:function(e){var t=Math.cos(e),i=Math.sin(e);this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1);return this},makeRotationY:function(e){var t=Math.cos(e),i=Math.sin(e);this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1);return this},makeRotationZ:function(e){var t=Math.cos(e),i=Math.sin(e);this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1);return this},makeRotationAxis:function(e,t){var i=Math.cos(t);var r=Math.sin(t);var a=1-i;var o=e.x,n=e.y,s=e.z;var l=a*o,c=a*n;this.set(l*o+i,l*n-r*s,l*s+r*n,0,l*n+r*s,c*n+i,c*s-r*o,0,l*s-r*n,c*s+r*o,a*s*s+i,0,0,0,0,1);return this},makeScale:function(e,t,i){this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1);return this},compose:function(e,t,i){this.makeRotationFromQuaternion(t);this.scale(i);this.setPosition(e);return this},decompose:function(){var e=new THREE.Vector3;var t=new THREE.Matrix4;return function(i,r,a){var o=this.elements;var n=e.set(o[0],o[1],o[2]).length();var s=e.set(o[4],o[5],o[6]).length();var l=e.set(o[8],o[9],o[10]).length();i.x=o[12];i.y=o[13];i.z=o[14];t.elements.set(this.elements);var c=1/n;var h=1/s;var u=1/l;t.elements[0]*=c;t.elements[1]*=c;t.elements[2]*=c;t.elements[4]*=h;t.elements[5]*=h;t.elements[6]*=h;t.elements[8]*=u;t.elements[9]*=u;t.elements[10]*=u;r.setFromRotationMatrix(t);a.x=n;a.y=s;a.z=l;return this}}(),makeFrustum:function(e,t,i,r,a,o){var n=this.elements;var s=2*a/(t-e);var l=2*a/(r-i);var c=(t+e)/(t-e);var h=(r+i)/(r-i);var u=-(o+a)/(o-a);var f=-2*o*a/(o-a);n[0]=s;n[4]=0;n[8]=c;n[12]=0;n[1]=0;n[5]=l;n[9]=h;n[13]=0;n[2]=0;n[6]=0;n[10]=u;n[14]=f;n[3]=0;n[7]=0;n[11]=-1;n[15]=0;return this},makePerspective:function(e,t,i,r){var a=i*Math.tan(THREE.Math.degToRad(.5*e));var o=-a;var n=o*t;var s=a*t;return this.makeFrustum(n,s,o,a,i,r)},makeOrthographic:function(e,t,i,r,a,o){var n=this.elements;var s=t-e;var l=i-r;var c=o-a;var h=(t+e)/s;var u=(i+r)/l;var f=(o+a)/c;n[0]=2/s;n[4]=0;n[8]=0;n[12]=-h;n[1]=0;n[5]=2/l;n[9]=0;n[13]=-u;n[2]=0;n[6]=0;n[10]=-2/c;n[14]=-f;n[3]=0;n[7]=0;n[11]=0;n[15]=1;return this},fromArray:function(e){this.elements.set(e);return this},toArray:function(){var e=this.elements;return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]]},clone:function(){var e=this.elements;return new THREE.Matrix4(e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13],e[2],e[6],e[10],e[14],e[3],e[7],e[11],e[15])}};