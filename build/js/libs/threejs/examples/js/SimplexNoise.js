var SimplexNoise=function(e){if(void 0==e)e=Math;this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]];this.p=[];for(var t=0;256>t;t++)this.p[t]=Math.floor(256*e.random());this.perm=[];for(var t=0;512>t;t++)this.perm[t]=this.p[255&t];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]};SimplexNoise.prototype.dot=function(e,t,i){return e[0]*t+e[1]*i};SimplexNoise.prototype.dot3=function(e,t,i,r){return e[0]*t+e[1]*i+e[2]*r};SimplexNoise.prototype.dot4=function(e,t,i,r,n){return e[0]*t+e[1]*i+e[2]*r+e[3]*n};SimplexNoise.prototype.noise=function(e,t){var i,r,n;var o=.5*(Math.sqrt(3)-1);var a=(e+t)*o;var s=Math.floor(e+a);var l=Math.floor(t+a);var h=(3-Math.sqrt(3))/6;var c=(s+l)*h;var u=s-c;var f=l-c;var d=e-u;var p=t-f;var m,v;if(d>p){m=1;v=0}else{m=0;v=1}var g=d-m+h;var E=p-v+h;var y=d-1+2*h;var _=p-1+2*h;var T=255&s;var x=255&l;var b=this.perm[T+this.perm[x]]%12;var R=this.perm[T+m+this.perm[x+v]]%12;var w=this.perm[T+1+this.perm[x+1]]%12;var H=.5-d*d-p*p;if(0>H)i=0;else{H*=H;i=H*H*this.dot(this.grad3[b],d,p)}var S=.5-g*g-E*E;if(0>S)r=0;else{S*=S;r=S*S*this.dot(this.grad3[R],g,E)}var M=.5-y*y-_*_;if(0>M)n=0;else{M*=M;n=M*M*this.dot(this.grad3[w],y,_)}return 70*(i+r+n)};SimplexNoise.prototype.noise3d=function(e,t,i){var r,n,o,a;var s=1/3;var l=(e+t+i)*s;var h=Math.floor(e+l);var c=Math.floor(t+l);var u=Math.floor(i+l);var f=1/6;var d=(h+c+u)*f;var p=h-d;var m=c-d;var v=u-d;var g=e-p;var E=t-m;var y=i-v;var _,T,x;var b,R,w;if(g>=E)if(E>=y){_=1;T=0;x=0;b=1;R=1;w=0}else if(g>=y){_=1;T=0;x=0;b=1;R=0;w=1}else{_=0;T=0;x=1;b=1;R=0;w=1}else if(y>E){_=0;T=0;x=1;b=0;R=1;w=1}else if(y>g){_=0;T=1;x=0;b=0;R=1;w=1}else{_=0;T=1;x=0;b=1;R=1;w=0}var H=g-_+f;var S=E-T+f;var M=y-x+f;var C=g-b+2*f;var A=E-R+2*f;var D=y-w+2*f;var P=g-1+3*f;var L=E-1+3*f;var k=y-1+3*f;var N=255&h;var I=255&c;var O=255&u;var z=this.perm[N+this.perm[I+this.perm[O]]]%12;var F=this.perm[N+_+this.perm[I+T+this.perm[O+x]]]%12;var V=this.perm[N+b+this.perm[I+R+this.perm[O+w]]]%12;var U=this.perm[N+1+this.perm[I+1+this.perm[O+1]]]%12;var B=.6-g*g-E*E-y*y;if(0>B)r=0;else{B*=B;r=B*B*this.dot3(this.grad3[z],g,E,y)}var j=.6-H*H-S*S-M*M;if(0>j)n=0;else{j*=j;n=j*j*this.dot3(this.grad3[F],H,S,M)}var W=.6-C*C-A*A-D*D;if(0>W)o=0;else{W*=W;o=W*W*this.dot3(this.grad3[V],C,A,D)}var G=.6-P*P-L*L-k*k;if(0>G)a=0;else{G*=G;a=G*G*this.dot3(this.grad3[U],P,L,k)}return 32*(r+n+o+a)};SimplexNoise.prototype.noise4d=function(e,t,i,r){var n=this.grad4;var o=this.simplex;var a=this.perm;var s=(Math.sqrt(5)-1)/4;var l=(5-Math.sqrt(5))/20;var h,c,u,f,d;var p=(e+t+i+r)*s;var m=Math.floor(e+p);var v=Math.floor(t+p);var g=Math.floor(i+p);var E=Math.floor(r+p);var y=(m+v+g+E)*l;var _=m-y;var T=v-y;var x=g-y;var b=E-y;var R=e-_;var w=t-T;var H=i-x;var S=r-b;var M=R>w?32:0;var C=R>H?16:0;var A=w>H?8:0;var D=R>S?4:0;var P=w>S?2:0;var L=H>S?1:0;var k=M+C+A+D+P+L;var N,I,O,z;var F,V,U,B;var j,W,G,X;N=o[k][0]>=3?1:0;I=o[k][1]>=3?1:0;O=o[k][2]>=3?1:0;z=o[k][3]>=3?1:0;F=o[k][0]>=2?1:0;V=o[k][1]>=2?1:0;U=o[k][2]>=2?1:0;B=o[k][3]>=2?1:0;j=o[k][0]>=1?1:0;W=o[k][1]>=1?1:0;G=o[k][2]>=1?1:0;X=o[k][3]>=1?1:0;var Y=R-N+l;var q=w-I+l;var K=H-O+l;var Q=S-z+l;var Z=R-F+2*l;var $=w-V+2*l;var J=H-U+2*l;var et=S-B+2*l;var tt=R-j+3*l;var it=w-W+3*l;var rt=H-G+3*l;var nt=S-X+3*l;var ot=R-1+4*l;var at=w-1+4*l;var st=H-1+4*l;var lt=S-1+4*l;var ht=255&m;var ct=255&v;var ut=255&g;var ft=255&E;var dt=a[ht+a[ct+a[ut+a[ft]]]]%32;var pt=a[ht+N+a[ct+I+a[ut+O+a[ft+z]]]]%32;var mt=a[ht+F+a[ct+V+a[ut+U+a[ft+B]]]]%32;var vt=a[ht+j+a[ct+W+a[ut+G+a[ft+X]]]]%32;var gt=a[ht+1+a[ct+1+a[ut+1+a[ft+1]]]]%32;var Et=.6-R*R-w*w-H*H-S*S;if(0>Et)h=0;else{Et*=Et;h=Et*Et*this.dot4(n[dt],R,w,H,S)}var yt=.6-Y*Y-q*q-K*K-Q*Q;if(0>yt)c=0;else{yt*=yt;c=yt*yt*this.dot4(n[pt],Y,q,K,Q)}var _t=.6-Z*Z-$*$-J*J-et*et;if(0>_t)u=0;else{_t*=_t;u=_t*_t*this.dot4(n[mt],Z,$,J,et)}var Tt=.6-tt*tt-it*it-rt*rt-nt*nt;if(0>Tt)f=0;else{Tt*=Tt;f=Tt*Tt*this.dot4(n[vt],tt,it,rt,nt)}var xt=.6-ot*ot-at*at-st*st-lt*lt;if(0>xt)d=0;else{xt*=xt;d=xt*xt*this.dot4(n[gt],ot,at,st,lt)}return 27*(h+c+u+f+d)};