THREE.Spline=function(e){function t(e,t,i,r,n,o,a){var s=.5*(i-e),l=.5*(r-t);return(2*(t-i)+s+l)*a+(-3*(t-i)-2*s-l)*o+s*n+t}this.points=e;var i,r,n,o,a,s,l,c,h,u=[],d={x:0,y:0,z:0};this.initFromArray=function(e){this.points=[];for(var t=0;t<e.length;t++)this.points[t]={x:e[t][0],y:e[t][1],z:e[t][2]}},this.getPoint=function(e){return i=(this.points.length-1)*e,r=Math.floor(i),n=i-r,u[0]=0===r?r:r-1,u[1]=r,u[2]=r>this.points.length-2?this.points.length-1:r+1,u[3]=r>this.points.length-3?this.points.length-1:r+2,s=this.points[u[0]],l=this.points[u[1]],c=this.points[u[2]],h=this.points[u[3]],o=n*n,a=n*o,d.x=t(s.x,l.x,c.x,h.x,n,o,a),d.y=t(s.y,l.y,c.y,h.y,n,o,a),d.z=t(s.z,l.z,c.z,h.z,n,o,a),d},this.getControlPointsArray=function(){var e,t,i=this.points.length,r=[];for(e=0;i>e;e++)t=this.points[e],r[e]=[t.x,t.y,t.z];return r},this.getLength=function(e){var t,i,r,n,o=0,a=0,s=0,l=new THREE.Vector3,c=new THREE.Vector3,h=[],u=0;for(h[0]=0,e||(e=100),r=this.points.length*e,l.copy(this.points[0]),t=1;r>t;t++)i=t/r,n=this.getPoint(i),c.copy(n),u+=c.distanceTo(l),l.copy(n),o=(this.points.length-1)*i,a=Math.floor(o),a!=s&&(h[a]=u,s=a);return h[h.length]=u,{chunks:h,total:u}},this.reparametrizeByArcLength=function(e){var t,i,r,n,o,a,s,l,c=[],h=new THREE.Vector3,u=this.getLength();for(c.push(h.copy(this.points[0]).clone()),t=1;t<this.points.length;t++){for(a=u.chunks[t]-u.chunks[t-1],s=Math.ceil(e*a/u.total),n=(t-1)/(this.points.length-1),o=t/(this.points.length-1),i=1;s-1>i;i++)r=n+i*(1/s)*(o-n),l=this.getPoint(r),c.push(h.copy(l).clone());c.push(h.copy(this.points[t]).clone())}this.points=c}};