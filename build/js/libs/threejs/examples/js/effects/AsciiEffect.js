/*
	* jsAscii 0.1
	* Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	* MIT License [http://www.nihilogic.dk/licenses/mit-license.txt]
	*/

THREE.AsciiEffect=function(e,t,i){function r(){v=Math.round(f*H);g=Math.round(d*H);x.width=v;x.height=g;E=e.domElement;if(E.style.backgroundColor){m.rows[0].cells[0].style.backgroundColor=E.style.backgroundColor;m.rows[0].cells[0].style.color=E.style.color}m.cellSpacing=0;m.cellPadding=0;var t=m.style;t.display="inline";t.width=Math.round(v/H*a)+"px";t.height=Math.round(g/H*a)+"px";t.whiteSpace="pre";t.margin="0px";t.padding="0px";t.letterSpacing=C+"px";t.fontFamily=_;t.fontSize=S+"px";t.lineHeight=M+"px";t.textAlign="left";t.textDecoration="none"}function n(e,t){R.clearRect(0,0,v,g);R.drawImage(b,0,0,v,g);var i=R.getImageData(0,0,v,g).data;var r="";for(var n=0;g>n;n+=2){for(var o=0;v>o;o++){var a=4*(n*v+o);var u=i[a];var f=i[a+1];var d=i[a+2];var p=i[a+3];var m;var E;E=(.3*u+.59*f+.11*d)/255;if(0==p)E=1;m=Math.floor((1-E)*(w.length-1));if(c)m=w.length-m-1;var y=w[m];if(void 0===y||" "==y)y="&nbsp;";if(s)r+="<span style='color:rgb("+u+","+f+","+d+");"+(h?"background-color:rgb("+u+","+f+","+d+");":"")+(l?"opacity:"+p/255+";":"")+"'>"+y+"</span>";else r+=y}r+="<br/>"}t.innerHTML="<tr><td>"+r+"</td></tr>"}t=void 0===t?" .:-=+*#%@":t;if(!i)i={};var o=!i["resolution"]?.15:i["resolution"];var a=!i["scale"]?1:i["scale"];var s=!i["color"]?!1:i["color"];var l=!i["alpha"]?!1:i["alpha"];var h=!i["block"]?!1:i["block"];var c=!i["invert"]?!1:i["invert"];var u="low";var f,d;var p=document.createElement("div");p.style.cursor="default";var m=document.createElement("table");p.appendChild(m);var v,g;var E;this.setSize=function(t,i){f=t;d=i;e.setSize(t,i);r()};this.render=function(t,i){e.render(t,i);n(e,m)};this.domElement=p;var y=" .,:;i1tfLCG08@".split("");var T=" CGO08@".split("");var _="courier new, monospace";var b=e.domElement;var x=document.createElement("canvas");if(x.getContext){var R=x.getContext("2d");if(R.getImageData){var w=s?T:y;if(t)w=t;var H=.5;switch(u){case"low":H=.25;break;case"medium":H=.5;break;case"high":H=1}if(o)H=o;var S=2/H*a;var M=2/H*a;var C=0;if("low"==u)switch(a){case 1:C=-1;break;case 2:case 3:C=-2.1;break;case 4:C=-3.1;break;case 5:C=-4.15}if("medium"==u)switch(a){case 1:C=0;break;case 2:C=-1;break;case 3:C=-1.04;break;case 4:case 5:C=-2.1}if("high"==u)switch(a){case 1:case 2:C=0;break;case 3:case 4:case 5:C=-1}}}};