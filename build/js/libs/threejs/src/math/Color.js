THREE.Color=function(e){return void 0!==e&&this.set(e),this},THREE.Color.prototype={constructor:THREE.Color,r:1,g:1,b:1,set:function(e){return e instanceof THREE.Color?this.copy(e):"number"==typeof e?this.setHex(e):"string"==typeof e&&this.setStyle(e),this},setHex:function(e){return e=Math.floor(e),this.r=(255&e>>16)/255,this.g=(255&e>>8)/255,this.b=(255&e)/255,this},setRGB:function(e,t,i){return this.r=e,this.g=t,this.b=i,this},setHSL:function(e,t,i){if(0===t)this.r=this.g=this.b=i;else{var r=function(e,t,i){return 0>i&&(i+=1),i>1&&(i-=1),1/6>i?e+6*(t-e)*i:.5>i?t:2/3>i?e+6*(t-e)*(2/3-i):e},o=.5>=i?i*(1+t):i+t-i*t,n=2*i-o;this.r=r(n,o,e+1/3),this.g=r(n,o,e),this.b=r(n,o,e-1/3)}return this},setStyle:function(e){if(/^rgb\((\d+),(\d+),(\d+)\)$/i.test(e)){var t=/^rgb\((\d+),(\d+),(\d+)\)$/i.exec(e);return this.r=Math.min(255,parseInt(t[1],10))/255,this.g=Math.min(255,parseInt(t[2],10))/255,this.b=Math.min(255,parseInt(t[3],10))/255,this}if(/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(e)){var t=/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(e);return this.r=Math.min(100,parseInt(t[1],10))/100,this.g=Math.min(100,parseInt(t[2],10))/100,this.b=Math.min(100,parseInt(t[3],10))/100,this}if(/^\#([0-9a-f]{6})$/i.test(e)){var t=/^\#([0-9a-f]{6})$/i.exec(e);return this.setHex(parseInt(t[1],16)),this}if(/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(e)){var t=/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e);return this.setHex(parseInt(t[1]+t[1]+t[2]+t[2]+t[3]+t[3],16)),this}return/^(\w+)$/i.test(e)?(this.setHex(THREE.ColorKeywords[e]),this):void 0},copy:function(e){return this.r=e.r,this.g=e.g,this.b=e.b,this},copyGammaToLinear:function(e){return this.r=e.r*e.r,this.g=e.g*e.g,this.b=e.b*e.b,this},copyLinearToGamma:function(e){return this.r=Math.sqrt(e.r),this.g=Math.sqrt(e.g),this.b=Math.sqrt(e.b),this},convertGammaToLinear:function(){var e=this.r,t=this.g,i=this.b;return this.r=e*e,this.g=t*t,this.b=i*i,this},convertLinearToGamma:function(){return this.r=Math.sqrt(this.r),this.g=Math.sqrt(this.g),this.b=Math.sqrt(this.b),this},getHex:function(){return 255*this.r<<16^255*this.g<<8^255*this.b<<0},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(){var e={h:0,s:0,l:0};return function(){var t,i,r=this.r,o=this.g,n=this.b,a=Math.max(r,o,n),s=Math.min(r,o,n),l=(s+a)/2;if(s===a)t=0,i=0;else{var c=a-s;switch(i=.5>=l?c/(a+s):c/(2-a-s),a){case r:t=(o-n)/c+(n>o?6:0);break;case o:t=(n-r)/c+2;break;case n:t=(r-o)/c+4}t/=6}return e.h=t,e.s=i,e.l=l,e}}(),getStyle:function(){return"rgb("+(0|255*this.r)+","+(0|255*this.g)+","+(0|255*this.b)+")"},offsetHSL:function(e,t,i){var r=this.getHSL();return r.h+=e,r.s+=t,r.l+=i,this.setHSL(r.h,r.s,r.l),this},add:function(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this},addColors:function(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this},addScalar:function(e){return this.r+=e,this.g+=e,this.b+=e,this},multiply:function(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this},multiplyScalar:function(e){return this.r*=e,this.g*=e,this.b*=e,this},lerp:function(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this},equals:function(e){return e.r===this.r&&e.g===this.g&&e.b===this.b},clone:function(){return(new THREE.Color).setRGB(this.r,this.g,this.b)}},THREE.ColorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};