THREE.ColorConverter={setHSV:function(e,t,i,r){return e.setHSL(t,i*r/((t=(2-i)*r)<1?t:2-t),.5*t)},getHSV:function(e){var t=e.getHSL();t.s*=t.l<.5?t.l:1-t.l;return{h:t.h,s:2*t.s/(t.l+t.s),v:t.l+t.s}},setCMYK:function(e,t,i,r,n){var o=(1-t)*(1-n);var a=(1-i)*(1-n);var s=(1-r)*(1-n);return e.setRGB(o,a,s)},getCMYK:function(e){var t=e.r;var i=e.g;var r=e.b;var n=1-Math.max(t,i,r);var o=(1-t-n)/(1-n);var a=(1-i-n)/(1-n);var s=(1-r-n)/(1-n);return{c:o,m:a,y:s,k:n}}};