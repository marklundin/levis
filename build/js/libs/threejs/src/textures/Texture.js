THREE.Texture=function(e,t,i,r,o,n,a,s,l){this.id=THREE.TextureIdCount++,this.uuid=THREE.Math.generateUUID(),this.name="",this.image=e,this.mipmaps=[],this.mapping=void 0!==t?t:new THREE.UVMapping,this.wrapS=void 0!==i?i:THREE.ClampToEdgeWrapping,this.wrapT=void 0!==r?r:THREE.ClampToEdgeWrapping,this.magFilter=void 0!==o?o:THREE.LinearFilter,this.minFilter=void 0!==n?n:THREE.LinearMipMapLinearFilter,this.anisotropy=void 0!==l?l:1,this.format=void 0!==a?a:THREE.RGBAFormat,this.type=void 0!==s?s:THREE.UnsignedByteType,this.offset=new THREE.Vector2(0,0),this.repeat=new THREE.Vector2(1,1),this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.needsUpdate=!1,this.onUpdate=null},THREE.Texture.prototype={constructor:THREE.Texture,clone:function(e){return void 0===e&&(e=new THREE.Texture),e.image=this.image,e.mipmaps=this.mipmaps.slice(0),e.mapping=this.mapping,e.wrapS=this.wrapS,e.wrapT=this.wrapT,e.magFilter=this.magFilter,e.minFilter=this.minFilter,e.anisotropy=this.anisotropy,e.format=this.format,e.type=this.type,e.offset.copy(this.offset),e.repeat.copy(this.repeat),e.generateMipmaps=this.generateMipmaps,e.premultiplyAlpha=this.premultiplyAlpha,e.flipY=this.flipY,e.unpackAlignment=this.unpackAlignment,e},dispose:function(){this.dispatchEvent({type:"dispose"})}},THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype),THREE.TextureIdCount=0;