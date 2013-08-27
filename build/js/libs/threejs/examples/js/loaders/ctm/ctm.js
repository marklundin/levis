var CTM=CTM||{};CTM.CompressionMethod={RAW:5718354,MG1:3229517,MG2:3295053};CTM.Flags={NORMALS:1};CTM.File=function(e){this.load(e)};CTM.File.prototype.load=function(e){this.header=new CTM.FileHeader(e);this.body=new CTM.FileBody(this.header);this.getReader().read(e,this.body)};CTM.File.prototype.getReader=function(){var e;switch(this.header.compressionMethod){case CTM.CompressionMethod.RAW:e=new CTM.ReaderRAW;break;case CTM.CompressionMethod.MG1:e=new CTM.ReaderMG1;break;case CTM.CompressionMethod.MG2:e=new CTM.ReaderMG2}return e};CTM.FileHeader=function(e){e.readInt32();this.fileFormat=e.readInt32();this.compressionMethod=e.readInt32();this.vertexCount=e.readInt32();this.triangleCount=e.readInt32();this.uvMapCount=e.readInt32();this.attrMapCount=e.readInt32();this.flags=e.readInt32();this.comment=e.readString()};CTM.FileHeader.prototype.hasNormals=function(){return this.flags&CTM.Flags.NORMALS};CTM.FileBody=function(e){var t=3*e.triangleCount,i=3*e.vertexCount,r=e.hasNormals()?3*e.vertexCount:0,n=2*e.vertexCount,o=4*e.vertexCount,a=0;var s=new ArrayBuffer(4*(t+i+r+n*e.uvMapCount+o*e.attrMapCount));this.indices=new Uint32Array(s,0,t);this.vertices=new Float32Array(s,4*t,i);if(e.hasNormals())this.normals=new Float32Array(s,4*(t+i),r);if(e.uvMapCount){this.uvMaps=[];for(a=0;a<e.uvMapCount;++a)this.uvMaps[a]={uv:new Float32Array(s,4*(t+i+r+a*n),n)}}if(e.attrMapCount){this.attrMaps=[];for(a=0;a<e.attrMapCount;++a)this.attrMaps[a]={attr:new Float32Array(s,4*(t+i+r+n*e.uvMapCount+a*o),o)}}};CTM.FileMG2Header=function(e){e.readInt32();this.vertexPrecision=e.readFloat32();this.normalPrecision=e.readFloat32();this.lowerBoundx=e.readFloat32();this.lowerBoundy=e.readFloat32();this.lowerBoundz=e.readFloat32();this.higherBoundx=e.readFloat32();this.higherBoundy=e.readFloat32();this.higherBoundz=e.readFloat32();this.divx=e.readInt32();this.divy=e.readInt32();this.divz=e.readInt32();this.sizex=(this.higherBoundx-this.lowerBoundx)/this.divx;this.sizey=(this.higherBoundy-this.lowerBoundy)/this.divy;this.sizez=(this.higherBoundz-this.lowerBoundz)/this.divz};CTM.ReaderRAW=function(){};CTM.ReaderRAW.prototype.read=function(e,t){this.readIndices(e,t.indices);this.readVertices(e,t.vertices);if(t.normals)this.readNormals(e,t.normals);if(t.uvMaps)this.readUVMaps(e,t.uvMaps);if(t.attrMaps)this.readAttrMaps(e,t.attrMaps)};CTM.ReaderRAW.prototype.readIndices=function(e,t){e.readInt32();e.readArrayInt32(t)};CTM.ReaderRAW.prototype.readVertices=function(e,t){e.readInt32();e.readArrayFloat32(t)};CTM.ReaderRAW.prototype.readNormals=function(e,t){e.readInt32();e.readArrayFloat32(t)};CTM.ReaderRAW.prototype.readUVMaps=function(e,t){var i=0;for(;i<t.length;++i){e.readInt32();t[i].name=e.readString();t[i].filename=e.readString();e.readArrayFloat32(t[i].uv)}};CTM.ReaderRAW.prototype.readAttrMaps=function(e,t){var i=0;for(;i<t.length;++i){e.readInt32();t[i].name=e.readString();e.readArrayFloat32(t[i].attr)}};CTM.ReaderMG1=function(){};CTM.ReaderMG1.prototype.read=function(e,t){this.readIndices(e,t.indices);this.readVertices(e,t.vertices);if(t.normals)this.readNormals(e,t.normals);if(t.uvMaps)this.readUVMaps(e,t.uvMaps);if(t.attrMaps)this.readAttrMaps(e,t.attrMaps)};CTM.ReaderMG1.prototype.readIndices=function(e,t){e.readInt32();e.readInt32();var i=new CTM.InterleavedStream(t,3);LZMA.decompress(e,e,i,i.data.length);CTM.restoreIndices(t,t.length)};CTM.ReaderMG1.prototype.readVertices=function(e,t){e.readInt32();e.readInt32();var i=new CTM.InterleavedStream(t,1);LZMA.decompress(e,e,i,i.data.length)};CTM.ReaderMG1.prototype.readNormals=function(e,t){e.readInt32();e.readInt32();var i=new CTM.InterleavedStream(t,3);LZMA.decompress(e,e,i,i.data.length)};CTM.ReaderMG1.prototype.readUVMaps=function(e,t){var i=0;for(;i<t.length;++i){e.readInt32();t[i].name=e.readString();t[i].filename=e.readString();e.readInt32();var r=new CTM.InterleavedStream(t[i].uv,2);LZMA.decompress(e,e,r,r.data.length)}};CTM.ReaderMG1.prototype.readAttrMaps=function(e,t){var i=0;for(;i<t.length;++i){e.readInt32();t[i].name=e.readString();e.readInt32();var r=new CTM.InterleavedStream(t[i].attr,4);LZMA.decompress(e,e,r,r.data.length)}};CTM.ReaderMG2=function(){};CTM.ReaderMG2.prototype.read=function(e,t){this.MG2Header=new CTM.FileMG2Header(e);this.readVertices(e,t.vertices);this.readIndices(e,t.indices);if(t.normals)this.readNormals(e,t);if(t.uvMaps)this.readUVMaps(e,t.uvMaps);if(t.attrMaps)this.readAttrMaps(e,t.attrMaps)};CTM.ReaderMG2.prototype.readVertices=function(e,t){e.readInt32();e.readInt32();var i=new CTM.InterleavedStream(t,3);LZMA.decompress(e,e,i,i.data.length);var r=this.readGridIndices(e,t);CTM.restoreVertices(t,this.MG2Header,r,this.MG2Header.vertexPrecision)};CTM.ReaderMG2.prototype.readGridIndices=function(e,t){e.readInt32();e.readInt32();var i=new Uint32Array(t.length/3);var r=new CTM.InterleavedStream(i,1);LZMA.decompress(e,e,r,r.data.length);CTM.restoreGridIndices(i,i.length);return i};CTM.ReaderMG2.prototype.readIndices=function(e,t){e.readInt32();e.readInt32();var i=new CTM.InterleavedStream(t,3);LZMA.decompress(e,e,i,i.data.length);CTM.restoreIndices(t,t.length)};CTM.ReaderMG2.prototype.readNormals=function(e,t){e.readInt32();e.readInt32();var i=new CTM.InterleavedStream(t.normals,3);LZMA.decompress(e,e,i,i.data.length);var r=CTM.calcSmoothNormals(t.indices,t.vertices);CTM.restoreNormals(t.normals,r,this.MG2Header.normalPrecision)};CTM.ReaderMG2.prototype.readUVMaps=function(e,t){var i=0;for(;i<t.length;++i){e.readInt32();t[i].name=e.readString();t[i].filename=e.readString();var r=e.readFloat32();e.readInt32();var n=new CTM.InterleavedStream(t[i].uv,2);LZMA.decompress(e,e,n,n.data.length);CTM.restoreMap(t[i].uv,2,r)}};CTM.ReaderMG2.prototype.readAttrMaps=function(e,t){var i=0;for(;i<t.length;++i){e.readInt32();t[i].name=e.readString();var r=e.readFloat32();e.readInt32();var n=new CTM.InterleavedStream(t[i].attr,4);LZMA.decompress(e,e,n,n.data.length);CTM.restoreMap(t[i].attr,4,r)}};CTM.restoreIndices=function(e,t){var i=3;if(t>0)e[2]+=e[0];for(;t>i;i+=3){e[i]+=e[i-3];if(e[i]===e[i-3])e[i+1]+=e[i-2];else e[i+1]+=e[i];e[i+2]+=e[i]}};CTM.restoreGridIndices=function(e,t){var i=1;for(;t>i;++i)e[i]+=e[i-1]};CTM.restoreVertices=function(e,t,i,r){var n,o,a,s,l,h=new Uint32Array(e.buffer,e.byteOffset,e.length),c=t.divx,u=c*t.divy,f=2147483647,d=0,p=0,m=0,v=i.length;for(;v>p;m+=3){a=n=i[p++];l=~~(a/u);a-=~~(l*u);s=~~(a/c);a-=~~(s*c);o=h[m];if(n===f)o+=d;e[m]=t.lowerBoundx+a*t.sizex+r*o;e[m+1]=t.lowerBoundy+s*t.sizey+r*h[m+1];e[m+2]=t.lowerBoundz+l*t.sizez+r*h[m+2];f=n;d=o}};CTM.restoreNormals=function(e,t,i){var r,n,o,a,s,l,h,c,u,f,d=new Uint32Array(e.buffer,e.byteOffset,e.length),p=0,m=e.length,v=1.5707963267948966;for(;m>p;p+=3){r=d[p]*i;n=d[p+1];if(0===n){e[p]=t[p]*r;e[p+1]=t[p+1]*r;e[p+2]=t[p+2]*r}else{if(4>=n)o=(d[p+2]-2)*v;else o=(4*d[p+2]/n-2)*v;n*=i*v;a=r*Math.sin(n);s=a*Math.cos(o);l=a*Math.sin(o);h=r*Math.cos(n);u=t[p+1];c=t[p]-t[p+2];f=Math.sqrt(2*u*u+c*c);if(f>1e-20){c/=f;u/=f}e[p]=t[p]*h+(t[p+1]*u-t[p+2]*c)*l-u*s;e[p+1]=t[p+1]*h-(t[p+2]+t[p])*u*l+c*s;e[p+2]=t[p+2]*h+(t[p]*c+t[p+1]*u)*l+u*s}}};CTM.restoreMap=function(e,t,i){var r,n,o,a=new Uint32Array(e.buffer,e.byteOffset,e.length),s=0,l=e.length;for(;t>s;++s){r=0;for(o=s;l>o;o+=t){n=a[o];r+=1&n?-(n+1>>1):n>>1;e[o]=r*i}}};CTM.calcSmoothNormals=function(e,t){var i,r,n,o,a,s,l,h,c,u,f,d,p,m,v,g=new Float32Array(t.length);for(m=0,v=e.length;v>m;){i=3*e[m++];r=3*e[m++];n=3*e[m++];l=t[r]-t[i];u=t[n]-t[i];h=t[r+1]-t[i+1];f=t[n+1]-t[i+1];c=t[r+2]-t[i+2];d=t[n+2]-t[i+2];o=h*d-c*f;a=c*u-l*d;s=l*f-h*u;p=Math.sqrt(o*o+a*a+s*s);if(p>1e-10){o/=p;a/=p;s/=p}g[i]+=o;g[i+1]+=a;g[i+2]+=s;g[r]+=o;g[r+1]+=a;g[r+2]+=s;g[n]+=o;g[n+1]+=a;g[n+2]+=s}for(m=0,v=g.length;v>m;m+=3){p=Math.sqrt(g[m]*g[m]+g[m+1]*g[m+1]+g[m+2]*g[m+2]);if(p>1e-10){g[m]/=p;g[m+1]/=p;g[m+2]/=p}}return g};CTM.isLittleEndian=function(){var e=new ArrayBuffer(2),t=new Uint8Array(e),i=new Uint16Array(e);t[0]=1;return 1===i[0]}();CTM.InterleavedStream=function(e,t){this.data=new Uint8Array(e.buffer,e.byteOffset,e.byteLength);this.offset=CTM.isLittleEndian?3:0;this.count=4*t;this.len=this.data.length};CTM.InterleavedStream.prototype.writeByte=function(e){this.data[this.offset]=e;this.offset+=this.count;if(this.offset>=this.len){this.offset-=this.len-4;if(this.offset>=this.count)this.offset-=this.count+(CTM.isLittleEndian?1:-1)}};CTM.Stream=function(e){this.data=e;this.offset=0};CTM.Stream.prototype.TWO_POW_MINUS23=Math.pow(2,-23);CTM.Stream.prototype.TWO_POW_MINUS126=Math.pow(2,-126);CTM.Stream.prototype.readByte=function(){return 255&this.data.charCodeAt(this.offset++)};CTM.Stream.prototype.readInt32=function(){var e=this.readByte();e|=this.readByte()<<8;e|=this.readByte()<<16;return e|this.readByte()<<24};CTM.Stream.prototype.readFloat32=function(){var e=this.readByte();e+=this.readByte()<<8;var t=this.readByte();var i=this.readByte();e+=(127&t)<<16;var r=(127&i)<<1|(128&t)>>>7;var n=128&i?-1:1;if(255===r)return 0!==e?0/0:1/0*n;if(r>0)return n*(1+e*this.TWO_POW_MINUS23)*Math.pow(2,r-127);if(0!==e)return n*e*this.TWO_POW_MINUS126;else return 0*n};CTM.Stream.prototype.readString=function(){var e=this.readInt32();this.offset+=e;return this.data.substr(this.offset-e,e)};CTM.Stream.prototype.readArrayInt32=function(e){var t=0,i=e.length;for(;i>t;)e[t++]=this.readInt32();return e};CTM.Stream.prototype.readArrayFloat32=function(e){var t=0,i=e.length;for(;i>t;)e[t++]=this.readFloat32();return e};