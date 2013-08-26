THREE.WebGLRenderer.LowLevelRenderer=function(e){function t(){try{if(!(jt=Dt.getContext("experimental-webgl",{alpha:Pt,premultipliedAlpha:Nt,antialias:kt,stencil:It,preserveDrawingBuffer:Ft})))throw"Error creating WebGL context."}catch(e){console.error(e)}Wt=jt.getExtension("OES_texture_float");Gt=jt.getExtension("OES_standard_derivatives");Xt=jt.getExtension("EXT_texture_filter_anisotropic")||jt.getExtension("MOZ_EXT_texture_filter_anisotropic")||jt.getExtension("WEBKIT_EXT_texture_filter_anisotropic");Yt=jt.getExtension("WEBGL_compressed_texture_s3tc")||jt.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||jt.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");if(!Wt)console.log("THREE.WebGLRenderer: Float textures not supported.");if(!Gt)console.log("THREE.WebGLRenderer: Standard derivatives not supported.");if(!Xt)console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported.");if(!Yt)console.log("THREE.WebGLRenderer: S3TC compressed textures not supported.");if(void 0===jt.getShaderPrecisionFormat)jt.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}}}function i(){jt.clearColor(0,0,0,1);jt.clearDepth(1);jt.clearStencil(0);jt.enable(jt.DEPTH_TEST);jt.depthFunc(jt.LEQUAL);jt.frontFace(jt.CCW);jt.cullFace(jt.BACK);jt.enable(jt.CULL_FACE);jt.enable(jt.BLEND);jt.blendEquation(jt.FUNC_ADD);jt.blendFunc(jt.SRC_ALPHA,jt.ONE_MINUS_SRC_ALPHA);jt.clearColor(Ot.r,Ot.g,Ot.b,zt)}function r(e){if(e===THREE.NearestFilter||e===THREE.NearestMipMapNearestFilter||e===THREE.NearestMipMapLinearFilter)return jt.NEAREST;else return jt.LINEAR}function n(){return jt}function o(){return Dt}function a(){return Lt}function s(){return Ut}function l(){return Vt}function h(){return Qt}function c(){return Wt}function u(){return Gt}function f(){return Yt}function d(){return Zt}function p(e,t){Dt.width=e;Dt.height=t;m(0,0,Dt.width,Dt.height)}function m(e,t,i,r){mi=void 0!==e?e:0;vi=void 0!==t?t:0;gi=void 0!==i?i:Dt.width;Ei=void 0!==r?r:Dt.height;jt.viewport(mi,vi,gi,Ei)}function v(e,t,i,r){jt.scissor(e,t,i,r)}function g(e){e?jt.enable(jt.SCISSOR_TEST):jt.disable(jt.SCISSOR_TEST)}function E(e,t){Ot.setHex(e);zt=t;jt.clearColor(Ot.r,Ot.g,Ot.b,zt)}function y(e,t){Ot.copy(e);zt=t;jt.clearColor(Ot.r,Ot.g,Ot.b,zt)}function T(){return Ot}function _(){return zt}function b(e,t,i){var r=0;if(void 0===e||e)r|=jt.COLOR_BUFFER_BIT;if(void 0===t||t)r|=jt.DEPTH_BUFFER_BIT;if(void 0===i||i)r|=jt.STENCIL_BUFFER_BIT;jt.clear(r)}function x(e,t,i,r){_t(e);b(t,i,r)}function R(e){jt.deleteBuffer(e)}function w(e){jt.deleteTexture(e)}function H(e){jt.deleteFramebuffer(e)}function S(e){jt.deleteRenderbuffer(e)}function M(e){jt.deleteProgram(e)}function C(){return jt.createBuffer()}function A(e,t){U(e);jt.bufferData(jt.ARRAY_BUFFER,t,jt.STATIC_DRAW)}function D(e,t){V(e);jt.bufferData(jt.ELEMENT_ARRAY_BUFFER,t,jt.STATIC_DRAW)}function L(e,t){U(e);jt.bufferData(jt.ARRAY_BUFFER,t,jt.DYNAMIC_DRAW)}function P(e,t){V(e);jt.bufferData(jt.ELEMENT_ARRAY_BUFFER,t,jt.DYNAMIC_DRAW)}function N(e){jt.drawArrays(jt.TRIANGLES,0,e)}function k(e){jt.drawArrays(jt.TRIANGLE_STRIP,0,e)}function I(e){jt.drawArrays(jt.LINES,0,e)}function F(e){jt.drawArrays(jt.LINE_STRIP,0,e)}function O(e){jt.drawArrays(jt.POINTS,0,e)}function z(e,t,i){V(e);jt.drawElements(jt.TRIANGLES,t,jt.UNSIGNED_SHORT,i)}function B(e,t,i){V(e);jt.drawElements(jt.LINES,t,jt.UNSIGNED_SHORT,i)}function U(e){if(xi!=e){jt.bindBuffer(jt.ARRAY_BUFFER,e);xi=e}}function V(e){if(xi!=e){jt.bindBuffer(jt.ELEMENT_ARRAY_BUFFER,e);xi=e}}function j(e){if(!hi[e]){jt.enableVertexAttribArray(e);hi[e]=!0}}function W(){for(var e in hi)if(hi[e]){jt.disableVertexAttribArray(e);hi[e]=!1}}function G(e,t){return jt.getAttribLocation(e,t)}function X(e,t,i,r){U(t);j(e);jt.vertexAttribPointer(e,i,jt.FLOAT,!1,0,r)}function Y(e,t){return jt.getUniformLocation(e,t)}function q(e,t){jt.uniform1i(e,t)}function K(e,t){jt.uniform1f(e,t)}function Z(e,t,i){jt.uniform2f(e,t,i)}function Q(e,t,i,r){jt.uniform3f(e,t,i,r)}function $(e,t,i,r,n){jt.uniform4f(e,t,i,r,n)}function J(e,t){jt.uniform1iv(e,t)}function et(e,t){jt.uniform2iv(e,t)}function tt(e,t){jt.uniform3iv(e,t)}function it(e,t){jt.uniform1fv(e,t)}function rt(e,t){jt.uniform2fv(e,t)}function nt(e,t){jt.uniform3fv(e,t)}function ot(e,t){jt.uniform3fv(e,t)}function at(e,t){jt.uniformMatrix3fv(e,!1,t)}function st(e,t){jt.uniformMatrix4fv(e,!1,t)}function lt(e){jt.useProgram(e)}function ht(e,t){if(e===THREE.CullFaceNone)jt.disable(jt.CULL_FACE);else{if(t===THREE.FrontFaceDirectionCW)jt.frontFace(jt.CW);else jt.frontFace(jt.CCW);if(e===THREE.CullFaceBack)jt.cullFace(jt.BACK);else if(e===THREE.CullFaceFront)jt.cullFace(jt.FRONT);else jt.cullFace(jt.FRONT_AND_BACK);jt.enable(jt.CULL_FACE)}}function ct(e){var t=e.side===THREE.DoubleSide;var i=e.side===THREE.BackSide;if(ci!==t){if(t)jt.disable(jt.CULL_FACE);else jt.enable(jt.CULL_FACE);ci=t}if(ui!==i){if(i)jt.frontFace(jt.CW);else jt.frontFace(jt.CCW);ui=i}}function ut(e,t,i){if(yi!==e){if(e)jt.enable(jt.POLYGON_OFFSET_FILL);else jt.disable(jt.POLYGON_OFFSET_FILL);yi=e}if(e&&(Ti!==t||_i!==i)){jt.polygonOffset(t,i);Ti=t;_i=i}}function ft(e,t,i,r){if(e!==oi){if(e===THREE.NoBlending)jt.disable(jt.BLEND);else if(e===THREE.AdditiveBlending){jt.enable(jt.BLEND);jt.blendEquation(jt.FUNC_ADD);jt.blendFunc(jt.SRC_ALPHA,jt.ONE)}else if(e===THREE.SubtractiveBlending){jt.enable(jt.BLEND);jt.blendEquation(jt.FUNC_ADD);jt.blendFunc(jt.ZERO,jt.ONE_MINUS_SRC_COLOR)}else if(e===THREE.MultiplyBlending){jt.enable(jt.BLEND);jt.blendEquation(jt.FUNC_ADD);jt.blendFunc(jt.ZERO,jt.SRC_COLOR)}else if(e===THREE.CustomBlending)jt.enable(jt.BLEND);else{jt.enable(jt.BLEND);jt.blendEquationSeparate(jt.FUNC_ADD,jt.FUNC_ADD);jt.blendFuncSeparate(jt.SRC_ALPHA,jt.ONE_MINUS_SRC_ALPHA,jt.ONE,jt.ONE_MINUS_SRC_ALPHA)}oi=e}if(e===THREE.CustomBlending){if(t!==ai){jt.blendEquation(wt(t));ai=t}if(i!==si||r!==li){jt.blendFunc(wt(i),wt(r));si=i;li=r}}else{ai=null;si=null;li=null}}function dt(e){if(fi!==e){if(e)jt.enable(jt.DEPTH_TEST);else jt.disable(jt.DEPTH_TEST);fi=e}}function pt(e){if(di!==e){jt.depthMask(e);di=e}}function mt(e,t){if(e.needsUpdate){if(!e.__webglInit){e.__webglInit=!0;e.__webglTexture=jt.createTexture()}jt.activeTexture(jt.TEXTURE0+t);jt.bindTexture(jt.TEXTURE_2D,e.__webglTexture);jt.pixelStorei(jt.UNPACK_FLIP_Y_WEBGL,e.flipY);jt.pixelStorei(jt.UNPACK_PREMULTIPLY_ALPHA_WEBGL,e.premultiplyAlpha);jt.pixelStorei(jt.UNPACK_ALIGNMENT,e.unpackAlignment);var i=e.image,r=gt(i.width)&&gt(i.height),n=wt(e.format),o=wt(e.type);Et(jt.TEXTURE_2D,e,r);var a,s=e.mipmaps;if(e instanceof THREE.DataTexture)if(s.length>0&&r){for(var l=0,h=s.length;h>l;l++){a=s[l];jt.texImage2D(jt.TEXTURE_2D,l,n,a.width,a.height,0,n,o,a.data)}e.generateMipmaps=!1}else jt.texImage2D(jt.TEXTURE_2D,0,n,i.width,i.height,0,n,o,i.data);else if(e instanceof THREE.CompressedTexture)for(var l=0,h=s.length;h>l;l++){a=s[l];jt.compressedTexImage2D(jt.TEXTURE_2D,l,n,a.width,a.height,0,a.data)}else if(s.length>0&&r){for(var l=0,h=s.length;h>l;l++){a=s[l];jt.texImage2D(jt.TEXTURE_2D,l,n,n,o,a)}e.generateMipmaps=!1}else jt.texImage2D(jt.TEXTURE_2D,0,n,n,o,e.image);if(e.generateMipmaps&&r)jt.generateMipmap(jt.TEXTURE_2D);e.needsUpdate=!1;if(e.onUpdate)e.onUpdate()}else{jt.activeTexture(jt.TEXTURE0+t);jt.bindTexture(jt.TEXTURE_2D,e.__webglTexture)}}function vt(e,t){if(6===e.image.length)if(e.needsUpdate){if(!e.image.__webglTextureCube)e.image.__webglTextureCube=jt.createTexture();jt.activeTexture(jt.TEXTURE0+t);jt.bindTexture(jt.TEXTURE_CUBE_MAP,e.image.__webglTextureCube);jt.pixelStorei(jt.UNPACK_FLIP_Y_WEBGL,e.flipY);var i=e instanceof THREE.CompressedTexture;var r=[];for(var n=0;6>n;n++)if(Bt&&!i)r[n]=bt(e.image[n],Kt);else r[n]=e.image[n];var o=r[0],a=gt(o.width)&&gt(o.height),s=wt(e.format),l=wt(e.type);Et(jt.TEXTURE_CUBE_MAP,e,a);for(var n=0;6>n;n++)if(i){var h,c=r[n].mipmaps;for(var u=0,f=c.length;f>u;u++){h=c[u];jt.compressedTexImage2D(jt.TEXTURE_CUBE_MAP_POSITIVE_X+n,u,s,h.width,h.height,0,h.data)}}else jt.texImage2D(jt.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,s,s,l,r[n]);if(e.generateMipmaps&&a)jt.generateMipmap(jt.TEXTURE_CUBE_MAP);e.needsUpdate=!1;if(e.onUpdate)e.onUpdate()}else{jt.activeTexture(jt.TEXTURE0+t);jt.bindTexture(jt.TEXTURE_CUBE_MAP,e.image.__webglTextureCube)}}function gt(e){return 0===(e&e-1)}function Et(e,t,i){if(i){jt.texParameteri(e,jt.TEXTURE_WRAP_S,wt(t.wrapS));jt.texParameteri(e,jt.TEXTURE_WRAP_T,wt(t.wrapT));jt.texParameteri(e,jt.TEXTURE_MAG_FILTER,wt(t.magFilter));jt.texParameteri(e,jt.TEXTURE_MIN_FILTER,wt(t.minFilter))}else{jt.texParameteri(e,jt.TEXTURE_WRAP_S,jt.CLAMP_TO_EDGE);jt.texParameteri(e,jt.TEXTURE_WRAP_T,jt.CLAMP_TO_EDGE);jt.texParameteri(e,jt.TEXTURE_MAG_FILTER,r(t.magFilter));jt.texParameteri(e,jt.TEXTURE_MIN_FILTER,r(t.minFilter))}if(Xt&&t.type!==THREE.FloatType)if(t.anisotropy>1||t.__oldAnisotropy){jt.texParameterf(e,Xt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,Zt));t.__oldAnisotropy=t.anisotropy}}function yt(e,t,i){jt.bindFramebuffer(jt.FRAMEBUFFER,e);jt.framebufferTexture2D(jt.FRAMEBUFFER,jt.COLOR_ATTACHMENT0,i,t.__webglTexture,0)}function Tt(e,t){jt.bindRenderbuffer(jt.RENDERBUFFER,e);if(t.depthBuffer&&!t.stencilBuffer){jt.renderbufferStorage(jt.RENDERBUFFER,jt.DEPTH_COMPONENT16,t.width,t.height);jt.framebufferRenderbuffer(jt.FRAMEBUFFER,jt.DEPTH_ATTACHMENT,jt.RENDERBUFFER,e)}else if(t.depthBuffer&&t.stencilBuffer){jt.renderbufferStorage(jt.RENDERBUFFER,jt.DEPTH_STENCIL,t.width,t.height);jt.framebufferRenderbuffer(jt.FRAMEBUFFER,jt.DEPTH_STENCIL_ATTACHMENT,jt.RENDERBUFFER,e)}else jt.renderbufferStorage(jt.RENDERBUFFER,jt.RGBA4,t.width,t.height)}function _t(e){var t=e instanceof THREE.WebGLRenderTargetCube;if(e&&!e.__webglFramebuffer){if(void 0===e.depthBuffer)e.depthBuffer=!0;if(void 0===e.stencilBuffer)e.stencilBuffer=!0;e.__webglTexture=jt.createTexture();var i=gt(e.width)&&gt(e.height),r=wt(e.format),n=wt(e.type);if(t){e.__webglFramebuffer=[];e.__webglRenderbuffer=[];jt.bindTexture(jt.TEXTURE_CUBE_MAP,e.__webglTexture);Et(jt.TEXTURE_CUBE_MAP,e,i);for(var o=0;6>o;o++){e.__webglFramebuffer[o]=jt.createFramebuffer();e.__webglRenderbuffer[o]=jt.createRenderbuffer();jt.texImage2D(jt.TEXTURE_CUBE_MAP_POSITIVE_X+o,0,r,e.width,e.height,0,r,n,null);yt(e.__webglFramebuffer[o],e,jt.TEXTURE_CUBE_MAP_POSITIVE_X+o);Tt(e.__webglRenderbuffer[o],e)}if(i)jt.generateMipmap(jt.TEXTURE_CUBE_MAP)}else{e.__webglFramebuffer=jt.createFramebuffer();if(e.shareDepthFrom)e.__webglRenderbuffer=e.shareDepthFrom.__webglRenderbuffer;else e.__webglRenderbuffer=jt.createRenderbuffer();jt.bindTexture(jt.TEXTURE_2D,e.__webglTexture);Et(jt.TEXTURE_2D,e,i);jt.texImage2D(jt.TEXTURE_2D,0,r,e.width,e.height,0,r,n,null);yt(e.__webglFramebuffer,e,jt.TEXTURE_2D);if(e.shareDepthFrom){if(e.depthBuffer&&!e.stencilBuffer)jt.framebufferRenderbuffer(jt.FRAMEBUFFER,jt.DEPTH_ATTACHMENT,jt.RENDERBUFFER,e.__webglRenderbuffer);else if(e.depthBuffer&&e.stencilBuffer)jt.framebufferRenderbuffer(jt.FRAMEBUFFER,jt.DEPTH_STENCIL_ATTACHMENT,jt.RENDERBUFFER,e.__webglRenderbuffer)}else Tt(e.__webglRenderbuffer,e);if(i)jt.generateMipmap(jt.TEXTURE_2D)}if(t)jt.bindTexture(jt.TEXTURE_CUBE_MAP,null);else jt.bindTexture(jt.TEXTURE_2D,null);jt.bindRenderbuffer(jt.RENDERBUFFER,null);jt.bindFramebuffer(jt.FRAMEBUFFER,null)}var a,s,l,h,c;if(e){if(t)a=e.__webglFramebuffer[e.activeCubeFace];else a=e.__webglFramebuffer;s=e.width;l=e.height;h=0;c=0}else{a=null;s=gi;l=Ei;h=mi;c=vi}if(a!==bi){jt.bindFramebuffer(jt.FRAMEBUFFER,a);jt.viewport(h,c,s,l);bi=a}Ut=s;Vt=l}function bt(e,t){if(e.width<=t&&e.height<=t)return e;var i=Math.max(e.width,e.height);var r=Math.floor(e.width*t/i);var n=Math.floor(e.height*t/i);var o=document.createElement("canvas");o.width=r;o.height=n;var a=o.getContext("2d");a.drawImage(e,0,0,e.width,e.height,0,0,r,n);return o}function xt(e){if(e instanceof THREE.WebGLRenderTargetCube){jt.bindTexture(jt.TEXTURE_CUBE_MAP,e.__webglTexture);jt.generateMipmap(jt.TEXTURE_CUBE_MAP);jt.bindTexture(jt.TEXTURE_CUBE_MAP,null)}else{jt.bindTexture(jt.TEXTURE_2D,e.__webglTexture);jt.generateMipmap(jt.TEXTURE_2D);jt.bindTexture(jt.TEXTURE_2D,null)}}function Rt(e,t){jt.activeTexture(jt.TEXTURE0+t);jt.bindTexture(jt.TEXTURE_CUBE_MAP,e.__webglTexture)}function wt(e){if(e===THREE.RepeatWrapping)return jt.REPEAT;if(e===THREE.ClampToEdgeWrapping)return jt.CLAMP_TO_EDGE;if(e===THREE.MirroredRepeatWrapping)return jt.MIRRORED_REPEAT;if(e===THREE.NearestFilter)return jt.NEAREST;if(e===THREE.NearestMipMapNearestFilter)return jt.NEAREST_MIPMAP_NEAREST;if(e===THREE.NearestMipMapLinearFilter)return jt.NEAREST_MIPMAP_LINEAR;if(e===THREE.LinearFilter)return jt.LINEAR;if(e===THREE.LinearMipMapNearestFilter)return jt.LINEAR_MIPMAP_NEAREST;if(e===THREE.LinearMipMapLinearFilter)return jt.LINEAR_MIPMAP_LINEAR;if(e===THREE.UnsignedByteType)return jt.UNSIGNED_BYTE;if(e===THREE.UnsignedShort4444Type)return jt.UNSIGNED_SHORT_4_4_4_4;if(e===THREE.UnsignedShort5551Type)return jt.UNSIGNED_SHORT_5_5_5_1;if(e===THREE.UnsignedShort565Type)return jt.UNSIGNED_SHORT_5_6_5;if(e===THREE.ByteType)return jt.BYTE;if(e===THREE.ShortType)return jt.SHORT;if(e===THREE.UnsignedShortType)return jt.UNSIGNED_SHORT;if(e===THREE.IntType)return jt.INT;if(e===THREE.UnsignedIntType)return jt.UNSIGNED_INT;if(e===THREE.FloatType)return jt.FLOAT;if(e===THREE.AlphaFormat)return jt.ALPHA;if(e===THREE.RGBFormat)return jt.RGB;if(e===THREE.RGBAFormat)return jt.RGBA;if(e===THREE.LuminanceFormat)return jt.LUMINANCE;if(e===THREE.LuminanceAlphaFormat)return jt.LUMINANCE_ALPHA;if(e===THREE.AddEquation)return jt.FUNC_ADD;if(e===THREE.SubtractEquation)return jt.FUNC_SUBTRACT;if(e===THREE.ReverseSubtractEquation)return jt.FUNC_REVERSE_SUBTRACT;if(e===THREE.ZeroFactor)return jt.ZERO;if(e===THREE.OneFactor)return jt.ONE;if(e===THREE.SrcColorFactor)return jt.SRC_COLOR;if(e===THREE.OneMinusSrcColorFactor)return jt.ONE_MINUS_SRC_COLOR;if(e===THREE.SrcAlphaFactor)return jt.SRC_ALPHA;if(e===THREE.OneMinusSrcAlphaFactor)return jt.ONE_MINUS_SRC_ALPHA;if(e===THREE.DstAlphaFactor)return jt.DST_ALPHA;if(e===THREE.OneMinusDstAlphaFactor)return jt.ONE_MINUS_DST_ALPHA;if(e===THREE.DstColorFactor)return jt.DST_COLOR;if(e===THREE.OneMinusDstColorFactor)return jt.ONE_MINUS_DST_COLOR;if(e===THREE.SrcAlphaSaturateFactor)return jt.SRC_ALPHA_SATURATE;if(void 0!==Yt){if(e===THREE.RGB_S3TC_DXT1_Format)return Yt.COMPRESSED_RGB_S3TC_DXT1_EXT;if(e===THREE.RGBA_S3TC_DXT1_Format)return Yt.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(e===THREE.RGBA_S3TC_DXT3_Format)return Yt.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(e===THREE.RGBA_S3TC_DXT5_Format)return Yt.COMPRESSED_RGBA_S3TC_DXT5_EXT}return 0}function Ht(e,t){var i=jt.createProgram();var r=Mt("fragment",t);var n=Mt("vertex",e);jt.attachShader(i,n);jt.attachShader(i,r);jt.linkProgram(i);if(!jt.getProgramParameter(i,jt.LINK_STATUS))console.error("Could not initialise shader\nVALIDATE_STATUS: "+jt.getProgramParameter(i,jt.VALIDATE_STATUS)+", gl error ["+jt.getError()+"]");jt.deleteShader(r);jt.deleteShader(n);return i}function St(){oi=-1;fi=-1;di=-1;ci=-1;ui=-1}function Mt(e,t){var i;if("fragment"===e)i=jt.createShader(jt.FRAGMENT_SHADER);else if("vertex"===e)i=jt.createShader(jt.VERTEX_SHADER);jt.shaderSource(i,t);jt.compileShader(i);if(!jt.getShaderParameter(i,jt.COMPILE_STATUS)){console.error(jt.getShaderInfoLog(i));console.error(Ct(t));return null}return i}function Ct(e){var t=e.split("\n");for(var i=0,r=t.length;r>i;i++)t[i]=i+1+": "+t[i];return t.join("\n")}function At(e){if(e!==pi){jt.lineWidth(e);pi=e}}e=e||{};var Dt=void 0!==e.canvas?e.canvas:document.createElement("canvas"),Lt=void 0!==e.precision?e.precision:"highp",Pt=void 0!==e.alpha?e.alpha:!0,Nt=void 0!==e.premultipliedAlpha?e.premultipliedAlpha:!0,kt=void 0!==e.antialias?e.antialias:!1,It=void 0!==e.stencil?e.stencil:!0,Ft=void 0!==e.preserveDrawingBuffer?e.preserveDrawingBuffer:!1,Ot=void 0!==e.clearColor?new THREE.Color(e.clearColor):new THREE.Color(0),zt=void 0!==e.clearAlpha?e.clearAlpha:0,Bt=!0;this.devicePixelRatio=void 0!==e.devicePixelRatio?e.devicePixelRatio:void 0!==window.devicePixelRatio?window.devicePixelRatio:1;var Ut=0,Vt=0;var jt;var Wt;var Gt;var Xt;var Yt;t();i();jt.getParameter(jt.MAX_TEXTURE_IMAGE_UNITS);var qt=jt.getParameter(jt.MAX_VERTEX_TEXTURE_IMAGE_UNITS);jt.getParameter(jt.MAX_TEXTURE_SIZE);var Kt=jt.getParameter(jt.MAX_CUBE_MAP_TEXTURE_SIZE);var Zt=Xt?jt.getParameter(Xt.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0;var Qt=qt>0;var $t=Qt&&Wt;Yt?jt.getParameter(jt.COMPRESSED_TEXTURE_FORMATS):[];var Jt=jt.getShaderPrecisionFormat(jt.VERTEX_SHADER,jt.HIGH_FLOAT);var ei=jt.getShaderPrecisionFormat(jt.VERTEX_SHADER,jt.MEDIUM_FLOAT);jt.getShaderPrecisionFormat(jt.VERTEX_SHADER,jt.LOW_FLOAT);var ti=jt.getShaderPrecisionFormat(jt.FRAGMENT_SHADER,jt.HIGH_FLOAT);var ii=jt.getShaderPrecisionFormat(jt.FRAGMENT_SHADER,jt.MEDIUM_FLOAT);jt.getShaderPrecisionFormat(jt.FRAGMENT_SHADER,jt.LOW_FLOAT);jt.getShaderPrecisionFormat(jt.VERTEX_SHADER,jt.HIGH_INT);jt.getShaderPrecisionFormat(jt.VERTEX_SHADER,jt.MEDIUM_INT);jt.getShaderPrecisionFormat(jt.VERTEX_SHADER,jt.LOW_INT);jt.getShaderPrecisionFormat(jt.FRAGMENT_SHADER,jt.HIGH_INT);jt.getShaderPrecisionFormat(jt.FRAGMENT_SHADER,jt.MEDIUM_INT);jt.getShaderPrecisionFormat(jt.FRAGMENT_SHADER,jt.LOW_INT);var ri=Jt.precision>0&&ti.precision>0;var ni=ei.precision>0&&ii.precision>0;if("highp"===Lt&&!ri)if(ni){Lt="mediump";console.warn("WebGLRenderer: highp not supported, using mediump")}else{Lt="lowp";console.warn("WebGLRenderer: highp and mediump not supported, using lowp")}if("mediump"===Lt&&!ni){Lt="lowp";console.warn("WebGLRenderer: mediump not supported, using lowp")}var oi,ai,si,li,hi={},ci=-1,ui=-1,fi=-1,di=-1,pi=-1,mi=0,vi=0,gi=0,Ei=0,yi=null,Ti=null,_i=null,bi=null;var xi;return{context:jt,autoScaleCubemaps:Bt,supportsBoneTextures:$t,precision:Lt,maxVertexUniformVectors:jt.getParameter(jt.MAX_VERTEX_UNIFORM_VECTORS),getContext:n,getDomElement:o,getPrecision:a,getCurrentWidth:s,getCurrentHeight:l,supportsVertexTextures:h,supportsFloatTextures:c,supportsStandardDerivatives:u,supportsCompressedTextureS3TC:f,getMaxAnisotropy:d,setRenderTarget:_t,setSize:p,setViewport:m,setScissor:v,enableScissorTest:g,setClearColorHex:E,setClearColor:y,getClearColor:T,getClearAlpha:_,clear:b,clearTarget:x,deleteBuffer:R,deleteTexture:w,deleteFramebuffer:H,deleteRenderbuffer:S,deleteProgram:M,createBuffer:C,setStaticArrayBuffer:A,setStaticIndexBuffer:D,setDynamicArrayBuffer:L,setDynamicIndexBuffer:P,drawTriangles:N,drawTriangleStrip:k,drawLines:I,drawLineStrip:F,drawPoints:O,drawTriangleElements:z,drawLineElements:B,bindArrayBuffer:U,bindElementArrayBuffer:V,enableAttribute:j,disableAttributes:W,getAttribLocation:G,setFloatAttribute:X,getUniformLocation:Y,uniform1i:q,uniform1f:K,uniform2f:Z,uniform3f:Q,uniform4f:$,uniform1iv:J,uniform2iv:et,uniform3iv:tt,uniform1fv:it,uniform2fv:rt,uniform3fv:nt,uniform4fv:ot,uniformMatrix3fv:at,uniformMatrix4fv:st,useProgram:lt,compileShader:Ht,setFaceCulling:ht,setMaterialFaces:ct,setPolygonOffset:ut,setBlending:ft,setDepthTest:dt,setDepthWrite:pt,setTexture:mt,setCubeTexture:vt,updateRenderTargetMipmap:xt,setCubeTextureDynamic:Rt,paramThreeToGL:wt,setLineWidth:At,resetState:St}};