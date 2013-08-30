/*!
 *  howler.js v1.1.11
 *  howlerjs.com
 *
 *  (c) 2013, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

!function(){var e={},t=null,i=!0,r=!1;if("undefined"!=typeof AudioContext?t=new AudioContext:"undefined"!=typeof webkitAudioContext?t=new webkitAudioContext:"undefined"!=typeof Audio?i=!1:(i=!1,r=!0),i){var n="undefined"==typeof t.createGain?t.createGainNode():t.createGain();n.gain.value=1,n.connect(t.destination)}var o=function(){this._volume=1,this._muted=!1,this.usingWebAudio=i,this._howls=[]};o.prototype={volume:function(e){var t=this;if(e=parseFloat(e),e&&e>=0&&1>=e){t._volume=e,i&&(n.gain.value=e);for(var r in t._howls)if(t._howls.hasOwnProperty(r)&&t._howls[r]._webAudio===!1)for(var o=0;o<t._howls[r]._audioNode.length;o++)t._howls[r]._audioNode[o].volume=t._howls[r]._volume*t._volume;return t}return i?n.gain.value:t._volume},mute:function(){return this._setMuted(!0),this},unmute:function(){return this._setMuted(!1),this},_setMuted:function(e){var t=this;t._muted=e,i&&(n.gain.value=e?0:t._volume);for(var r in t._howls)if(t._howls.hasOwnProperty(r)&&t._howls[r]._webAudio===!1)for(var o=0;o<t._howls[r]._audioNode.length;o++)t._howls[r]._audioNode[o].muted=e}};var a=new o,s=null;if(!r){s=new Audio;var l={mp3:!!s.canPlayType("audio/mpeg;").replace(/^no$/,""),opus:!!s.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!s.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!s.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),m4a:!!(s.canPlayType("audio/x-m4a;")||s.canPlayType("audio/aac;")).replace(/^no$/,""),webm:!!s.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")}}var h=function(e){var t=this;t._autoplay=e.autoplay||!1,t._buffer=e.buffer||!1,t._duration=e.duration||0,t._format=e.format||null,t._loop=e.loop||!1,t._loaded=!1,t._sprite=e.sprite||{},t._src=e.src||"",t._pos3d=e.pos3d||[0,0,-.5],t._volume=e.volume||1,t._urls=e.urls||[],t._onload=[e.onload||function(){}],t._onloaderror=[e.onloaderror||function(){}],t._onend=[e.onend||function(){}],t._onpause=[e.onpause||function(){}],t._onplay=[e.onplay||function(){}],t._onendTimer=[],t._webAudio=i&&!t._buffer,t._audioNode=[],t._webAudio&&t._setupAudioNode(),a._howls.push(t),t.load()};if(h.prototype={load:function(){var t=this,i=null;if(r)return t.on("loaderror"),void 0;for(var n={mp3:l.mp3,opus:l.opus,ogg:l.ogg,wav:l.wav,m4a:l.m4a,weba:l.webm},o=0;o<t._urls.length;o++){var s;if(t._format?s=t._format:(s=t._urls[o].toLowerCase().match(/.+\.([^?]+)(\?|$)/),s=s&&s.length>=2?s[1]:t._urls[o].toLowerCase().match(/data\:audio\/([^?]+);/)[1]),n[s]){i=t._urls[o];break}}if(!i)return t.on("loaderror"),void 0;if(t._src=i,t._webAudio)c(t,i);else{var h=new Audio;t._audioNode.push(h),h.src=i,h._pos=0,h.preload="auto",h.volume=a._muted?0:t._volume*a.volume(),e[i]=t;var u=function(){t._duration=h.duration,0===Object.getOwnPropertyNames(t._sprite).length&&(t._sprite={_default:[0,1e3*t._duration]}),t._loaded||(t._loaded=!0,t.on("load")),t._autoplay&&t.play(),h.removeEventListener("canplaythrough",u,!1)};h.addEventListener("canplaythrough",u,!1),h.load()}return t},urls:function(e){var t=this;return e?(t.stop(),t._urls="string"==typeof e?[e]:e,t._loaded=!1,t.load(),t):t._urls},play:function(e,i){var r=this;return"function"==typeof e&&(i=e),e&&"function"!=typeof e||(e="_default"),r._loaded?r._sprite[e]?(r._inactiveNode(function(n){n._sprite=e;var o,s=n._pos>0?n._pos:r._sprite[e][0]/1e3,l=r._sprite[e][1]/1e3-n._pos,h=!(!r._loop&&!r._sprite[e][2]),c="string"==typeof i?i:Math.round(Date.now()*Math.random())+"";if(function(){var t={id:c,sprite:e,loop:h};o=setTimeout(function(){!r._webAudio&&h&&r.stop(t.id,t.timer).play(e,t.id),r._webAudio&&!h&&(r._nodeById(t.id).paused=!0),r._webAudio||h||r.stop(t.id,t.timer),r.on("end",c)},1e3*l),r._onendTimer.push(o),t.timer=r._onendTimer[r._onendTimer.length-1]}(),r._webAudio){var u=r._sprite[e][0]/1e3,p=r._sprite[e][1]/1e3;n.id=c,n.paused=!1,d(r,[h,u,p],c),r._playStart=t.currentTime,n.gain.value=r._volume,"undefined"==typeof n.bufferSource.start?n.bufferSource.noteGrainOn(0,s,l):n.bufferSource.start(0,s,l)}else{if(4!==n.readyState)return r._clearEndTimer(o),function(){var t=r,o=e,a=i,s=n,l=function(){t.play(o,a),s.removeEventListener("canplaythrough",l,!1)};s.addEventListener("canplaythrough",l,!1)}(),r;n.id=c,n.currentTime=s,n.muted=a._muted,n.volume=r._volume*a.volume(),setTimeout(function(){n.play()},0)}return r.on("play"),"function"==typeof i&&i(c),r}),r):("function"==typeof i&&i(),r):(r.on("load",function(){r.play(e,i)}),r)},pause:function(e,t){var i=this;if(!i._loaded)return i.on("play",function(){i.pause(e)}),i;i._clearEndTimer(t||0);var r=e?i._nodeById(e):i._activeNode();if(r)if(r._pos=i.pos(null,e),i._webAudio){if(!r.bufferSource)return i;r.paused=!0,"undefined"==typeof r.bufferSource.stop?r.bufferSource.noteOff(0):r.bufferSource.stop(0)}else r.pause();return i.on("pause"),i},stop:function(e,t){var i=this;if(!i._loaded)return i.on("play",function(){i.stop(e)}),i;i._clearEndTimer(t||0);var r=e?i._nodeById(e):i._activeNode();if(r)if(r._pos=0,i._webAudio){if(!r.bufferSource)return i;r.paused=!0,"undefined"==typeof r.bufferSource.stop?r.bufferSource.noteOff(0):r.bufferSource.stop(0)}else r.pause(),r.currentTime=0;return i},mute:function(e){var t=this;if(!t._loaded)return t.on("play",function(){t.mute(e)}),t;var i=e?t._nodeById(e):t._activeNode();return i&&(t._webAudio?i.gain.value=0:i.volume=0),t},unmute:function(e){var t=this;if(!t._loaded)return t.on("play",function(){t.unmute(e)}),t;var i=e?t._nodeById(e):t._activeNode();return i&&(t._webAudio?i.gain.value=t._volume:i.volume=t._volume),t},volume:function(e,t){var i=this;if(e=parseFloat(e),e>=0&&1>=e){if(i._volume=e,!i._loaded)return i.on("play",function(){i.volume(e,t)}),i;var r=t?i._nodeById(t):i._activeNode();return r&&(i._webAudio?r.gain.value=e:r.volume=e*a.volume()),i}return i._volume},loop:function(e){var t=this;return"boolean"==typeof e?(t._loop=e,t):t._loop},sprite:function(e){var t=this;return"object"==typeof e?(t._sprite=e,t):t._sprite},pos:function(e,i){var r=this;if(!r._loaded)return r.on("load",function(){r.pos(e)}),"number"==typeof e?r:r._pos||0;e=parseFloat(e);var n=i?r._nodeById(i):r._activeNode();if(n)return r._webAudio?e>=0?(n._pos=e,r.pause(i).play(n._sprite,i),r):n._pos+(t.currentTime-r._playStart):e>=0?(n.currentTime=e,r):n.currentTime;if(e>=0)return r;for(var o=0;o<r._audioNode.length;o++)if(r._audioNode[o].paused&&4===r._audioNode[o].readyState)return r._webAudio?r._audioNode[o]._pos:r._audioNode[o].currentTime},pos3d:function(e,t,i,r){var n=this;if(t="undefined"!=typeof t&&t?t:0,i="undefined"!=typeof i&&i?i:-.5,!n._loaded)return n.on("play",function(){n.pos3d(e,t,i,r)}),n;if(!(e>=0||0>e))return n._pos3d;if(n._webAudio){var o=r?n._nodeById(r):n._activeNode();o&&(n._pos3d=[e,t,i],o.panner.setPosition(e,t,i))}return n},fade:function(e,t,i,r,n){var o=this,a=Math.abs(e-t),s=e>t?"down":"up",l=a/.01,h=i/l;if(!o._loaded)return o.on("load",function(){o.fade(e,t,i,r,n)}),o;o.volume(e,n);for(var c=1;l>=c;c++)!function(){var e=o._volume+("up"===s?.01:-.01)*c,i=Math.round(1e3*e)/1e3,a=t;setTimeout(function(){o.volume(i,n),i===a&&r&&r()},h*c)}()},fadeIn:function(e,t,i){return this.volume(0).play().fade(0,e,t,i)},fadeOut:function(e,t,i,r){var n=this;return n.fade(n._volume,e,t,function(){i&&i(),n.pause(r),n.on("end")},r)},_nodeById:function(e){for(var t=this,i=t._audioNode[0],r=0;r<t._audioNode.length;r++)if(t._audioNode[r].id===e){i=t._audioNode[r];break}return i},_activeNode:function(){for(var e=this,t=null,i=0;i<e._audioNode.length;i++)if(!e._audioNode[i].paused){t=e._audioNode[i];break}return e._drainPool(),t},_inactiveNode:function(e){for(var t=this,i=null,r=0;r<t._audioNode.length;r++)if(t._audioNode[r].paused&&4===t._audioNode[r].readyState){e(t._audioNode[r]),i=!0;break}if(t._drainPool(),!i){var n;t._webAudio?(n=t._setupAudioNode(),e(n)):(t.load(),n=t._audioNode[t._audioNode.length-1],n.addEventListener("loadedmetadata",function(){e(n)}))}},_drainPool:function(){var e,t=this,i=0;for(e=0;e<t._audioNode.length;e++)t._audioNode[e].paused&&i++;for(e=t._audioNode.length-1;e>=0&&!(5>=i);e--)t._audioNode[e].paused&&(t._webAudio&&t._audioNode[e].disconnect(0),i--,t._audioNode.splice(e,1))},_clearEndTimer:function(e){var t=this,i=t._onendTimer.indexOf(e);i=i>=0?i:0,t._onendTimer[i]&&(clearTimeout(t._onendTimer[i]),t._onendTimer.splice(i,1))},_setupAudioNode:function(){var e=this,i=e._audioNode,r=e._audioNode.length;return i[r]="undefined"==typeof t.createGain?t.createGainNode():t.createGain(),i[r].gain.value=e._volume,i[r].paused=!0,i[r]._pos=0,i[r].readyState=4,i[r].connect(n),i[r].panner=t.createPanner(),i[r].panner.setPosition(e._pos3d[0],e._pos3d[1],e._pos3d[2]),i[r].panner.connect(i[r]),i[r]},on:function(e,t){var i=this,r=i["_on"+e];if("function"==typeof t)r.push(t);else for(var n=0;n<r.length;n++)t?r[n].call(i,t):r[n].call(i);return i},off:function(e,t){for(var i=this,r=i["_on"+e],n=t.toString(),o=0;o<r.length;o++)if(n===r[o].toString()){r.splice(o,1);break}return i},unload:function(){for(var t=this,i=t._audioNode,r=0;r<t._audioNode.length;r++)t.stop(i[r].id),t._webAudio?i[r].disconnect(0):i[r].src="";var n=a._howls.indexOf(t);n&&a._howls.splice(n,1),delete e[t._src],t=null}},i)var c=function(i,r){if(r in e)i._duration=e[r].duration,u(i);else{var n=new XMLHttpRequest;n.open("GET",r,!0),n.responseType="arraybuffer",n.onload=function(){t.decodeAudioData(n.response,function(t){t&&(e[r]=t,u(i,t))})},n.onerror=function(){i._webAudio&&(i._buffer=!0,i._webAudio=!1,i._audioNode=[],delete i._gainNode,i.load())};try{n.send()}catch(o){n.onerror()}}},u=function(e,t){e._duration=t?t.duration:e._duration,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play()},d=function(i,r,n){var o=i._nodeById(n);o.bufferSource=t.createBufferSource(),o.bufferSource.buffer=e[i._src],o.bufferSource.connect(o.panner),o.bufferSource.loop=r[0],r[0]&&(o.bufferSource.loopStart=r[1],o.bufferSource.loopEnd=r[1]+r[2])};"function"==typeof define&&define.amd?define("Howler",[],function(){return{Howler:a,Howl:h}}):(window.Howler=a,window.Howl=h)}();