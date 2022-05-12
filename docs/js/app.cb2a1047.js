(function(){var t={847:function(t,e,i){"use strict";var a=i(9242),r=i(3396),h=i(7139);const o=(0,r.Uk)(" 画像を選択 "),n=["src"],s=(0,r._)("canvas",{id:"pixelitcanvas"},null,-1);function d(t,e,i,d,l,c){return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.wy)((0,r._)("label",null,[o,(0,r._)("input",{type:"file",accept:"image/*",onChange:e[0]||(e[0]=(...e)=>t.onFileChange&&t.onFileChange(...e)),onClick:e[1]||(e[1]=t=>{t.target.value=""})},null,32)],512),[[a.F8,!t.appState.uploadedImage]]),(0,r._)("div",null,[(0,r.wy)((0,r._)("img",{id:"pixelitimg",src:t.appState.uploadedImage},null,8,n),[[a.F8,!t.appState.isConvert]]),s,(0,r.wy)((0,r._)("div",null,[(0,r._)("p",null,(0,h.zw)(t.appState.imgName),1),(0,r._)("button",{onClick:e[2]||(e[2]=(...e)=>t.convertToPixelArt&&t.convertToPixelArt(...e))},"convert"),(0,r._)("button",{onClick:e[3]||(e[3]=(...e)=>t.remove&&t.remove(...e))},"close")],512),[[a.F8,t.appState.uploadedImage]])])])}var l=i(4870),c=i(7554),m=i.n(c),u=(0,r.aZ)({name:"App",setup(){const t=(0,l.qj)({uploadedImage:"",imgName:"",isConvert:!1}),e=e=>{const a=e.target.files||e.dataTransfer.files;i(a[0]),t.imgName=a[0].name},i=e=>{const i=new FileReader;i.onload=e=>{t.uploadedImage=e.target.result},i.readAsDataURL(e)},a=()=>{const e=document.getElementById("pixelitcanvas"),i=e.getContext("2d");i.clearRect(0,0,e.width,e.height),e.width=0,e.height=0,t.uploadedImage="",t.isConvert=!1},r=()=>{const e=new(m().pixelit)({scale:18});e.draw().pixelate().convertPalette();const i=document.getElementById("pixelitimg");i.style="",t.isConvert=!0};return{appState:t,onFileChange:e,createImage:i,remove:a,convertToPixelArt:r}}}),w=i(89);const g=(0,w.Z)(u,[["render",d]]);var f=g;(0,a.ri)(f).mount("#app")},7554:function(t){class e{constructor(t={}){this.drawto=t.to||document.getElementById("pixelitcanvas"),this.drawfrom=t.from||document.getElementById("pixelitimg"),this.hideFromImg(),this.scale=t.scale&&t.scale>0&&t.scale<=50?.01*t.scale:.08,this.palette=t.palette||[[140,143,174],[88,69,99],[62,33,55],[154,99,72],[215,155,125],[245,237,186],[192,199,65],[100,125,52],[228,148,58],[157,48,59],[210,100,113],[112,55,127],[126,196,193],[52,133,157],[23,67,75],[31,14,28]],this.maxHeight=t.maxHeight,this.maxWidth=t.maxWidth,this.ctx=this.drawto.getContext("2d"),this.endColorStats={}}hideFromImg(){return this.drawfrom.style.visibility="hidden",this.drawfrom.style.position="fixed",this.drawfrom.style.top=0,this.drawfrom.style.left=0,this}setFromImgSource(t){return this.drawfrom.src=t,this}setDrawFrom(t){return this.drawfrom=t,this}setDrawTo(t){return this.drawto=t,this}setPalette(t){return this.palette=t,this}setMaxWidth(t){return this.maxWidth=t,this}setMaxHeight(t){return this.maxHeight=t,this}setScale(t){return this.scale=t>0&&t<=50?.01*t:.08,this}getPalette(){return this.palette}colorSim(t,e){let i,a,r=0;for(i=0,a=t.length;i<a;i++)r+=(t[i]-e[i])*(t[i]-e[i]);return Math.sqrt(r)}similarColor(t){let e,i=[],a=this.colorSim(t,this.palette[0]);return this.palette.forEach((r=>{e=this.colorSim(t,r),e<=a&&(i=r,a=e)})),i}pixelate(){this.drawto.width=this.drawfrom.naturalWidth,this.drawto.height=this.drawfrom.naturalHeight;let t=this.drawto.width*this.scale,e=this.drawto.height*this.scale;const i=document.createElement("canvas");i.width=this.drawto.width,i.height=this.drawto.height,i.style.visibility="hidden",i.style.position="fixed",i.style.top="0",i.style.left="0",(this.drawto.width>900||this.drawto.height>900)&&(this.scale*=.5,t=this.drawto.width*this.scale,e=this.drawto.height*this.scale,i.width=Math.max(t,e)+50,i.height=Math.max(t,e)+50);const a=i.getContext("2d");a.drawImage(this.drawfrom,0,0,t,e),document.body.appendChild(i),this.ctx.mozImageSmoothingEnabled=!1,this.ctx.webkitImageSmoothingEnabled=!1,this.ctx.imageSmoothingEnabled=!1;let r=this.drawfrom.naturalWidth;this.drawfrom.naturalWidth>300&&(r+=this.drawfrom.naturalWidth>this.drawfrom.naturalHeight?parseInt(this.drawfrom.naturalWidth/(this.drawfrom.naturalWidth*this.scale))/1.5:parseInt(this.drawfrom.naturalWidth/(this.drawfrom.naturalWidth*this.scale)));let h=this.drawfrom.naturalHeight;return this.drawfrom.naturalHeight>300&&(h+=this.drawfrom.naturalHeight>this.drawfrom.naturalWidth?parseInt(this.drawfrom.naturalHeight/(this.drawfrom.naturalHeight*this.scale))/1.5:parseInt(this.drawfrom.naturalHeight/(this.drawfrom.naturalHeight*this.scale))),this.ctx.drawImage(i,0,0,t,e,0,0,r,h),i.remove(),this}convertGrayscale(){const t=this.drawto.width,e=this.drawto.height;for(var i=this.ctx.getImageData(0,0,t,e),a=0;a<i.height;a++)for(var r=0;r<i.width;r++){var h=4*a*i.width+4*r,o=(i.data[h]+i.data[h+1]+i.data[h+2])/3;i.data[h]=o,i.data[h+1]=o,i.data[h+2]=o}return this.ctx.putImageData(i,0,0,0,0,i.width,i.height),this}convertPalette(){const t=this.drawto.width,e=this.drawto.height;for(var i=this.ctx.getImageData(0,0,t,e),a=0;a<i.height;a++)for(var r=0;r<i.width;r++){var h=4*a*i.width+4*r;const t=this.similarColor([i.data[h],i.data[h+1],i.data[h+2]]);i.data[h]=t[0],i.data[h+1]=t[1],i.data[h+2]=t[2]}return this.ctx.putImageData(i,0,0,0,0,i.width,i.height),this}resizeImage(){const t=document.createElement("canvas"),e=t.getContext("2d");let i=1;return this.maxWidth||this.maxHeight?(this.maxWidth&&this.drawto.width>this.maxWidth&&(i=this.maxWidth/this.drawto.width),this.maxHeight&&this.drawto.height>this.maxHeight&&(i=this.maxHeight/this.drawto.height),t.width=this.drawto.width,t.height=this.drawto.height,e.drawImage(this.drawto,0,0),this.drawto.width=this.drawto.width*i,this.drawto.height=this.drawto.height*i,this.ctx.drawImage(t,0,0,t.width,t.height,0,0,this.drawto.width,this.drawto.height),this):0}draw(){return this.drawto.width=this.drawfrom.width,this.drawto.height=this.drawfrom.height,this.ctx.drawImage(this.drawfrom,0,0),this.resizeImage(),this}saveImage(){const t=document.createElement("a");t.download="pxArt.png",t.href=this.drawto.toDataURL("image/png").replace("image/png","image/octet-stream"),document.querySelector("body").appendChild(t),t.click(),document.querySelector("body").removeChild(t)}}t.exports={pixelit:e}}},e={};function i(a){var r=e[a];if(void 0!==r)return r.exports;var h=e[a]={exports:{}};return t[a](h,h.exports,i),h.exports}i.m=t,function(){var t=[];i.O=function(e,a,r,h){if(!a){var o=1/0;for(l=0;l<t.length;l++){a=t[l][0],r=t[l][1],h=t[l][2];for(var n=!0,s=0;s<a.length;s++)(!1&h||o>=h)&&Object.keys(i.O).every((function(t){return i.O[t](a[s])}))?a.splice(s--,1):(n=!1,h<o&&(o=h));if(n){t.splice(l--,1);var d=r();void 0!==d&&(e=d)}}return e}h=h||0;for(var l=t.length;l>0&&t[l-1][2]>h;l--)t[l]=t[l-1];t[l]=[a,r,h]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var a in e)i.o(e,a)&&!i.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,a){var r,h,o=a[0],n=a[1],s=a[2],d=0;if(o.some((function(e){return 0!==t[e]}))){for(r in n)i.o(n,r)&&(i.m[r]=n[r]);if(s)var l=s(i)}for(e&&e(a);d<o.length;d++)h=o[d],i.o(t,h)&&t[h]&&t[h][0](),t[h]=0;return i.O(l)},a=self["webpackChunkconvert_to_pixel_art"]=self["webpackChunkconvert_to_pixel_art"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=i.O(void 0,[998],(function(){return i(847)}));a=i.O(a)})();
//# sourceMappingURL=app.cb2a1047.js.map