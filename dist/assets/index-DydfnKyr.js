(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=e(o);fetch(o.href,a)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ac="170",If=0,ph=1,Df=2,Zu=1,Xu=2,ni=3,Ai=0,dn=1,Ln=2,bi=0,Ns=1,mh=2,_h=3,gh=4,Nf=5,qi=100,Uf=101,Of=102,zf=103,kf=104,Ff=200,Bf=201,Hf=202,Vf=203,dl=204,fl=205,Gf=206,Wf=207,Zf=208,Xf=209,qf=210,Yf=211,$f=212,Kf=213,jf=214,pl=0,ml=1,_l=2,zs=3,gl=4,vl=5,xl=6,yl=7,qu=0,Jf=1,Qf=2,Ti=0,tp=1,ep=2,np=3,ip=4,sp=5,op=6,rp=7,Yu=300,ks=301,Fs=302,Ml=303,Sl=304,Vr=306,wl=1e3,$i=1001,El=1002,Dn=1003,ap=1004,Ko=1005,Gn=1006,va=1007,Ki=1008,ui=1009,$u=1010,Ku=1011,bo=1012,lc=1013,ji=1014,si=1015,Lo=1016,cc=1017,hc=1018,Bs=1020,ju=35902,Ju=1021,Qu=1022,Rn=1023,td=1024,ed=1025,Us=1026,Hs=1027,nd=1028,uc=1029,id=1030,dc=1031,fc=1033,Lr=33776,Rr=33777,Ir=33778,Dr=33779,bl=35840,Tl=35841,Al=35842,Cl=35843,Pl=36196,Ll=37492,Rl=37496,Il=37808,Dl=37809,Nl=37810,Ul=37811,Ol=37812,zl=37813,kl=37814,Fl=37815,Bl=37816,Hl=37817,Vl=37818,Gl=37819,Wl=37820,Zl=37821,Nr=36492,Xl=36494,ql=36495,sd=36283,Yl=36284,$l=36285,Kl=36286,lp=3200,cp=3201,od=0,hp=1,wi="",je="srgb",Ws="srgb-linear",Gr="linear",Se="srgb",cs=7680,vh=519,up=512,dp=513,fp=514,rd=515,pp=516,mp=517,_p=518,gp=519,jl=35044,xh="300 es",oi=2e3,Or=2001;class es{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const o=this._listeners[t];if(o!==void 0){const a=o.indexOf(e);a!==-1&&o.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const o=i.slice(0);for(let a=0,l=o.length;a<l;a++)o[a].call(this,t);t.target=null}}}const Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xa=Math.PI/180,Jl=180/Math.PI;function ai(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ye[s&255]+Ye[s>>8&255]+Ye[s>>16&255]+Ye[s>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]).toLowerCase()}function Je(s,t,e){return Math.max(t,Math.min(e,s))}function vp(s,t){return(s%t+t)%t}function ya(s,t,e){return(1-e)*s+e*t}function Vn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function we(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class bt{constructor(t=0,e=0){bt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6],this.y=o[1]*e+o[4]*i+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Je(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),o=Math.sin(e),a=this.x-t.x,l=this.y-t.y;return this.x=a*i-l*o+t.x,this.y=a*o+l*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class re{constructor(t,e,i,o,a,l,c,u,d){re.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,o,a,l,c,u,d)}set(t,e,i,o,a,l,c,u,d){const m=this.elements;return m[0]=t,m[1]=o,m[2]=c,m[3]=e,m[4]=a,m[5]=u,m[6]=i,m[7]=l,m[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,o=e.elements,a=this.elements,l=i[0],c=i[3],u=i[6],d=i[1],m=i[4],p=i[7],g=i[2],v=i[5],M=i[8],w=o[0],x=o[3],_=o[6],b=o[1],E=o[4],S=o[7],U=o[2],N=o[5],D=o[8];return a[0]=l*w+c*b+u*U,a[3]=l*x+c*E+u*N,a[6]=l*_+c*S+u*D,a[1]=d*w+m*b+p*U,a[4]=d*x+m*E+p*N,a[7]=d*_+m*S+p*D,a[2]=g*w+v*b+M*U,a[5]=g*x+v*E+M*N,a[8]=g*_+v*S+M*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],o=t[2],a=t[3],l=t[4],c=t[5],u=t[6],d=t[7],m=t[8];return e*l*m-e*c*d-i*a*m+i*c*u+o*a*d-o*l*u}invert(){const t=this.elements,e=t[0],i=t[1],o=t[2],a=t[3],l=t[4],c=t[5],u=t[6],d=t[7],m=t[8],p=m*l-c*d,g=c*u-m*a,v=d*a-l*u,M=e*p+i*g+o*v;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/M;return t[0]=p*w,t[1]=(o*d-m*i)*w,t[2]=(c*i-o*l)*w,t[3]=g*w,t[4]=(m*e-o*u)*w,t[5]=(o*a-c*e)*w,t[6]=v*w,t[7]=(i*u-d*e)*w,t[8]=(l*e-i*a)*w,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,o,a,l,c){const u=Math.cos(a),d=Math.sin(a);return this.set(i*u,i*d,-i*(u*l+d*c)+l+t,-o*d,o*u,-o*(-d*l+u*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(Ma.makeScale(t,e)),this}rotate(t){return this.premultiply(Ma.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ma.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let o=0;o<9;o++)if(e[o]!==i[o])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ma=new re;function ad(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function zr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function xp(){const s=zr("canvas");return s.style.display="block",s}const yh={};function xo(s){s in yh||(yh[s]=!0,console.warn(s))}function yp(s,t,e){return new Promise(function(i,o){function a(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:o();break;case s.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:i()}}setTimeout(a,e)})}function Mp(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Sp(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const _e={enabled:!0,workingColorSpace:Ws,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Se&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Se&&(s.r=Os(s.r),s.g=Os(s.g),s.b=Os(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wi?Gr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function li(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Os(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Mh=[.64,.33,.3,.6,.15,.06],Sh=[.2126,.7152,.0722],wh=[.3127,.329],Eh=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bh=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);_e.define({[Ws]:{primaries:Mh,whitePoint:wh,transfer:Gr,toXYZ:Eh,fromXYZ:bh,luminanceCoefficients:Sh,workingColorSpaceConfig:{unpackColorSpace:je},outputColorSpaceConfig:{drawingBufferColorSpace:je}},[je]:{primaries:Mh,whitePoint:wh,transfer:Se,toXYZ:Eh,fromXYZ:bh,luminanceCoefficients:Sh,outputColorSpaceConfig:{drawingBufferColorSpace:je}}});let hs;class wp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{hs===void 0&&(hs=zr("canvas")),hs.width=t.width,hs.height=t.height;const i=hs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=hs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=zr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const o=i.getImageData(0,0,t.width,t.height),a=o.data;for(let l=0;l<a.length;l++)a[l]=li(a[l]/255)*255;return i.putImageData(o,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(li(e[i]/255)*255):e[i]=li(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ep=0;class ld{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=ai(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},o=this.data;if(o!==null){let a;if(Array.isArray(o)){a=[];for(let l=0,c=o.length;l<c;l++)o[l].isDataTexture?a.push(Sa(o[l].image)):a.push(Sa(o[l]))}else a=Sa(o);i.url=a}return e||(t.images[this.uuid]=i),i}}function Sa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?wp.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bp=0;class rn extends es{constructor(t=rn.DEFAULT_IMAGE,e=rn.DEFAULT_MAPPING,i=$i,o=$i,a=Gn,l=Ki,c=Rn,u=ui,d=rn.DEFAULT_ANISOTROPY,m=wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=ai(),this.name="",this.source=new ld(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=o,this.magFilter=a,this.minFilter=l,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=u,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wl:t.x=t.x-Math.floor(t.x);break;case $i:t.x=t.x<0?0:1;break;case El:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wl:t.y=t.y-Math.floor(t.y);break;case $i:t.y=t.y<0?0:1;break;case El:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Yu;rn.DEFAULT_ANISOTROPY=1;class De{constructor(t=0,e=0,i=0,o=1){De.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,o){return this.x=t,this.y=e,this.z=i,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,o=this.z,a=this.w,l=t.elements;return this.x=l[0]*e+l[4]*i+l[8]*o+l[12]*a,this.y=l[1]*e+l[5]*i+l[9]*o+l[13]*a,this.z=l[2]*e+l[6]*i+l[10]*o+l[14]*a,this.w=l[3]*e+l[7]*i+l[11]*o+l[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,o,a;const u=t.elements,d=u[0],m=u[4],p=u[8],g=u[1],v=u[5],M=u[9],w=u[2],x=u[6],_=u[10];if(Math.abs(m-g)<.01&&Math.abs(p-w)<.01&&Math.abs(M-x)<.01){if(Math.abs(m+g)<.1&&Math.abs(p+w)<.1&&Math.abs(M+x)<.1&&Math.abs(d+v+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(d+1)/2,S=(v+1)/2,U=(_+1)/2,N=(m+g)/4,D=(p+w)/4,O=(M+x)/4;return E>S&&E>U?E<.01?(i=0,o=.707106781,a=.707106781):(i=Math.sqrt(E),o=N/i,a=D/i):S>U?S<.01?(i=.707106781,o=0,a=.707106781):(o=Math.sqrt(S),i=N/o,a=O/o):U<.01?(i=.707106781,o=.707106781,a=0):(a=Math.sqrt(U),i=D/a,o=O/a),this.set(i,o,a,e),this}let b=Math.sqrt((x-M)*(x-M)+(p-w)*(p-w)+(g-m)*(g-m));return Math.abs(b)<.001&&(b=1),this.x=(x-M)/b,this.y=(p-w)/b,this.z=(g-m)/b,this.w=Math.acos((d+v+_-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tp extends es{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new De(0,0,t,e),this.scissorTest=!1,this.viewport=new De(0,0,t,e);const o={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new rn(o,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const l=i.count;for(let c=0;c<l;c++)this.textures[c]=a.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let o=0,a=this.textures.length;o<a;o++)this.textures[o].image.width=t,this.textures[o].image.height=e,this.textures[o].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,o=t.textures.length;i<o;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ld(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ji extends Tp{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class cd extends rn{constructor(t=null,e=1,i=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:o},this.magFilter=Dn,this.minFilter=Dn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ap extends rn{constructor(t=null,e=1,i=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:o},this.magFilter=Dn,this.minFilter=Dn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ro{constructor(t=0,e=0,i=0,o=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=o}static slerpFlat(t,e,i,o,a,l,c){let u=i[o+0],d=i[o+1],m=i[o+2],p=i[o+3];const g=a[l+0],v=a[l+1],M=a[l+2],w=a[l+3];if(c===0){t[e+0]=u,t[e+1]=d,t[e+2]=m,t[e+3]=p;return}if(c===1){t[e+0]=g,t[e+1]=v,t[e+2]=M,t[e+3]=w;return}if(p!==w||u!==g||d!==v||m!==M){let x=1-c;const _=u*g+d*v+m*M+p*w,b=_>=0?1:-1,E=1-_*_;if(E>Number.EPSILON){const U=Math.sqrt(E),N=Math.atan2(U,_*b);x=Math.sin(x*N)/U,c=Math.sin(c*N)/U}const S=c*b;if(u=u*x+g*S,d=d*x+v*S,m=m*x+M*S,p=p*x+w*S,x===1-c){const U=1/Math.sqrt(u*u+d*d+m*m+p*p);u*=U,d*=U,m*=U,p*=U}}t[e]=u,t[e+1]=d,t[e+2]=m,t[e+3]=p}static multiplyQuaternionsFlat(t,e,i,o,a,l){const c=i[o],u=i[o+1],d=i[o+2],m=i[o+3],p=a[l],g=a[l+1],v=a[l+2],M=a[l+3];return t[e]=c*M+m*p+u*v-d*g,t[e+1]=u*M+m*g+d*p-c*v,t[e+2]=d*M+m*v+c*g-u*p,t[e+3]=m*M-c*p-u*g-d*v,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,o){return this._x=t,this._y=e,this._z=i,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,o=t._y,a=t._z,l=t._order,c=Math.cos,u=Math.sin,d=c(i/2),m=c(o/2),p=c(a/2),g=u(i/2),v=u(o/2),M=u(a/2);switch(l){case"XYZ":this._x=g*m*p+d*v*M,this._y=d*v*p-g*m*M,this._z=d*m*M+g*v*p,this._w=d*m*p-g*v*M;break;case"YXZ":this._x=g*m*p+d*v*M,this._y=d*v*p-g*m*M,this._z=d*m*M-g*v*p,this._w=d*m*p+g*v*M;break;case"ZXY":this._x=g*m*p-d*v*M,this._y=d*v*p+g*m*M,this._z=d*m*M+g*v*p,this._w=d*m*p-g*v*M;break;case"ZYX":this._x=g*m*p-d*v*M,this._y=d*v*p+g*m*M,this._z=d*m*M-g*v*p,this._w=d*m*p+g*v*M;break;case"YZX":this._x=g*m*p+d*v*M,this._y=d*v*p+g*m*M,this._z=d*m*M-g*v*p,this._w=d*m*p-g*v*M;break;case"XZY":this._x=g*m*p-d*v*M,this._y=d*v*p-g*m*M,this._z=d*m*M+g*v*p,this._w=d*m*p+g*v*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,o=Math.sin(i);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],o=e[4],a=e[8],l=e[1],c=e[5],u=e[9],d=e[2],m=e[6],p=e[10],g=i+c+p;if(g>0){const v=.5/Math.sqrt(g+1);this._w=.25/v,this._x=(m-u)*v,this._y=(a-d)*v,this._z=(l-o)*v}else if(i>c&&i>p){const v=2*Math.sqrt(1+i-c-p);this._w=(m-u)/v,this._x=.25*v,this._y=(o+l)/v,this._z=(a+d)/v}else if(c>p){const v=2*Math.sqrt(1+c-i-p);this._w=(a-d)/v,this._x=(o+l)/v,this._y=.25*v,this._z=(u+m)/v}else{const v=2*Math.sqrt(1+p-i-c);this._w=(l-o)/v,this._x=(a+d)/v,this._y=(u+m)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Je(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const o=Math.min(1,e/i);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,o=t._y,a=t._z,l=t._w,c=e._x,u=e._y,d=e._z,m=e._w;return this._x=i*m+l*c+o*d-a*u,this._y=o*m+l*u+a*c-i*d,this._z=a*m+l*d+i*u-o*c,this._w=l*m-i*c-o*u-a*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,o=this._y,a=this._z,l=this._w;let c=l*t._w+i*t._x+o*t._y+a*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=i,this._y=o,this._z=a,this;const u=1-c*c;if(u<=Number.EPSILON){const v=1-e;return this._w=v*l+e*this._w,this._x=v*i+e*this._x,this._y=v*o+e*this._y,this._z=v*a+e*this._z,this.normalize(),this}const d=Math.sqrt(u),m=Math.atan2(d,c),p=Math.sin((1-e)*m)/d,g=Math.sin(e*m)/d;return this._w=l*p+this._w*g,this._x=i*p+this._x*g,this._y=o*p+this._y*g,this._z=a*p+this._z*g,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),o=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(o*Math.sin(t),o*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,e=0,i=0){V.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Th.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Th.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,o=this.z,a=t.elements;return this.x=a[0]*e+a[3]*i+a[6]*o,this.y=a[1]*e+a[4]*i+a[7]*o,this.z=a[2]*e+a[5]*i+a[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,o=this.z,a=t.elements,l=1/(a[3]*e+a[7]*i+a[11]*o+a[15]);return this.x=(a[0]*e+a[4]*i+a[8]*o+a[12])*l,this.y=(a[1]*e+a[5]*i+a[9]*o+a[13])*l,this.z=(a[2]*e+a[6]*i+a[10]*o+a[14])*l,this}applyQuaternion(t){const e=this.x,i=this.y,o=this.z,a=t.x,l=t.y,c=t.z,u=t.w,d=2*(l*o-c*i),m=2*(c*e-a*o),p=2*(a*i-l*e);return this.x=e+u*d+l*p-c*m,this.y=i+u*m+c*d-a*p,this.z=o+u*p+a*m-l*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,o=this.z,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*o,this.y=a[1]*e+a[5]*i+a[9]*o,this.z=a[2]*e+a[6]*i+a[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,o=t.y,a=t.z,l=e.x,c=e.y,u=e.z;return this.x=o*u-a*c,this.y=a*l-i*u,this.z=i*c-o*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return wa.copy(this).projectOnVector(t),this.sub(wa)}reflect(t){return this.sub(wa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Je(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,o=this.z-t.z;return e*e+i*i+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const o=Math.sin(e)*t;return this.x=o*Math.sin(i),this.y=Math.cos(e)*t,this.z=o*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=o,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wa=new V,Th=new Ro;class Io{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const a=i.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=a.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,Tn):Tn.fromBufferAttribute(a,l),Tn.applyMatrix4(t.matrixWorld),this.expandByPoint(Tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),jo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),jo.copy(i.boundingBox)),jo.applyMatrix4(t.matrixWorld),this.union(jo)}const o=t.children;for(let a=0,l=o.length;a<l;a++)this.expandByObject(o[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Tn),Tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ro),Jo.subVectors(this.max,ro),us.subVectors(t.a,ro),ds.subVectors(t.b,ro),fs.subVectors(t.c,ro),mi.subVectors(ds,us),_i.subVectors(fs,ds),Ui.subVectors(us,fs);let e=[0,-mi.z,mi.y,0,-_i.z,_i.y,0,-Ui.z,Ui.y,mi.z,0,-mi.x,_i.z,0,-_i.x,Ui.z,0,-Ui.x,-mi.y,mi.x,0,-_i.y,_i.x,0,-Ui.y,Ui.x,0];return!Ea(e,us,ds,fs,Jo)||(e=[1,0,0,0,1,0,0,0,1],!Ea(e,us,ds,fs,Jo))?!1:(Qo.crossVectors(mi,_i),e=[Qo.x,Qo.y,Qo.z],Ea(e,us,ds,fs,Jo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const jn=[new V,new V,new V,new V,new V,new V,new V,new V],Tn=new V,jo=new Io,us=new V,ds=new V,fs=new V,mi=new V,_i=new V,Ui=new V,ro=new V,Jo=new V,Qo=new V,Oi=new V;function Ea(s,t,e,i,o){for(let a=0,l=s.length-3;a<=l;a+=3){Oi.fromArray(s,a);const c=o.x*Math.abs(Oi.x)+o.y*Math.abs(Oi.y)+o.z*Math.abs(Oi.z),u=t.dot(Oi),d=e.dot(Oi),m=i.dot(Oi);if(Math.max(-Math.max(u,d,m),Math.min(u,d,m))>c)return!1}return!0}const Cp=new Io,ao=new V,ba=new V;class pc{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Cp.setFromPoints(t).getCenter(i);let o=0;for(let a=0,l=t.length;a<l;a++)o=Math.max(o,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ao.subVectors(t,this.center);const e=ao.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),o=(i-this.radius)*.5;this.center.addScaledVector(ao,o/i),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ba.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ao.copy(t.center).add(ba)),this.expandByPoint(ao.copy(t.center).sub(ba))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Jn=new V,Ta=new V,tr=new V,gi=new V,Aa=new V,er=new V,Ca=new V;class Pp{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Jn.copy(this.origin).addScaledVector(this.direction,e),Jn.distanceToSquared(t))}distanceSqToSegment(t,e,i,o){Ta.copy(t).add(e).multiplyScalar(.5),tr.copy(e).sub(t).normalize(),gi.copy(this.origin).sub(Ta);const a=t.distanceTo(e)*.5,l=-this.direction.dot(tr),c=gi.dot(this.direction),u=-gi.dot(tr),d=gi.lengthSq(),m=Math.abs(1-l*l);let p,g,v,M;if(m>0)if(p=l*u-c,g=l*c-u,M=a*m,p>=0)if(g>=-M)if(g<=M){const w=1/m;p*=w,g*=w,v=p*(p+l*g+2*c)+g*(l*p+g+2*u)+d}else g=a,p=Math.max(0,-(l*g+c)),v=-p*p+g*(g+2*u)+d;else g=-a,p=Math.max(0,-(l*g+c)),v=-p*p+g*(g+2*u)+d;else g<=-M?(p=Math.max(0,-(-l*a+c)),g=p>0?-a:Math.min(Math.max(-a,-u),a),v=-p*p+g*(g+2*u)+d):g<=M?(p=0,g=Math.min(Math.max(-a,-u),a),v=g*(g+2*u)+d):(p=Math.max(0,-(l*a+c)),g=p>0?a:Math.min(Math.max(-a,-u),a),v=-p*p+g*(g+2*u)+d);else g=l>0?-a:a,p=Math.max(0,-(l*g+c)),v=-p*p+g*(g+2*u)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,p),o&&o.copy(Ta).addScaledVector(tr,g),v}intersectSphere(t,e){Jn.subVectors(t.center,this.origin);const i=Jn.dot(this.direction),o=Jn.dot(Jn)-i*i,a=t.radius*t.radius;if(o>a)return null;const l=Math.sqrt(a-o),c=i-l,u=i+l;return u<0?null:c<0?this.at(u,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,o,a,l,c,u;const d=1/this.direction.x,m=1/this.direction.y,p=1/this.direction.z,g=this.origin;return d>=0?(i=(t.min.x-g.x)*d,o=(t.max.x-g.x)*d):(i=(t.max.x-g.x)*d,o=(t.min.x-g.x)*d),m>=0?(a=(t.min.y-g.y)*m,l=(t.max.y-g.y)*m):(a=(t.max.y-g.y)*m,l=(t.min.y-g.y)*m),i>l||a>o||((a>i||isNaN(i))&&(i=a),(l<o||isNaN(o))&&(o=l),p>=0?(c=(t.min.z-g.z)*p,u=(t.max.z-g.z)*p):(c=(t.max.z-g.z)*p,u=(t.min.z-g.z)*p),i>u||c>o)||((c>i||i!==i)&&(i=c),(u<o||o!==o)&&(o=u),o<0)?null:this.at(i>=0?i:o,e)}intersectsBox(t){return this.intersectBox(t,Jn)!==null}intersectTriangle(t,e,i,o,a){Aa.subVectors(e,t),er.subVectors(i,t),Ca.crossVectors(Aa,er);let l=this.direction.dot(Ca),c;if(l>0){if(o)return null;c=1}else if(l<0)c=-1,l=-l;else return null;gi.subVectors(this.origin,t);const u=c*this.direction.dot(er.crossVectors(gi,er));if(u<0)return null;const d=c*this.direction.dot(Aa.cross(gi));if(d<0||u+d>l)return null;const m=-c*gi.dot(Ca);return m<0?null:this.at(m/l,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(t,e,i,o,a,l,c,u,d,m,p,g,v,M,w,x){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,o,a,l,c,u,d,m,p,g,v,M,w,x)}set(t,e,i,o,a,l,c,u,d,m,p,g,v,M,w,x){const _=this.elements;return _[0]=t,_[4]=e,_[8]=i,_[12]=o,_[1]=a,_[5]=l,_[9]=c,_[13]=u,_[2]=d,_[6]=m,_[10]=p,_[14]=g,_[3]=v,_[7]=M,_[11]=w,_[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,o=1/ps.setFromMatrixColumn(t,0).length(),a=1/ps.setFromMatrixColumn(t,1).length(),l=1/ps.setFromMatrixColumn(t,2).length();return e[0]=i[0]*o,e[1]=i[1]*o,e[2]=i[2]*o,e[3]=0,e[4]=i[4]*a,e[5]=i[5]*a,e[6]=i[6]*a,e[7]=0,e[8]=i[8]*l,e[9]=i[9]*l,e[10]=i[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,o=t.y,a=t.z,l=Math.cos(i),c=Math.sin(i),u=Math.cos(o),d=Math.sin(o),m=Math.cos(a),p=Math.sin(a);if(t.order==="XYZ"){const g=l*m,v=l*p,M=c*m,w=c*p;e[0]=u*m,e[4]=-u*p,e[8]=d,e[1]=v+M*d,e[5]=g-w*d,e[9]=-c*u,e[2]=w-g*d,e[6]=M+v*d,e[10]=l*u}else if(t.order==="YXZ"){const g=u*m,v=u*p,M=d*m,w=d*p;e[0]=g+w*c,e[4]=M*c-v,e[8]=l*d,e[1]=l*p,e[5]=l*m,e[9]=-c,e[2]=v*c-M,e[6]=w+g*c,e[10]=l*u}else if(t.order==="ZXY"){const g=u*m,v=u*p,M=d*m,w=d*p;e[0]=g-w*c,e[4]=-l*p,e[8]=M+v*c,e[1]=v+M*c,e[5]=l*m,e[9]=w-g*c,e[2]=-l*d,e[6]=c,e[10]=l*u}else if(t.order==="ZYX"){const g=l*m,v=l*p,M=c*m,w=c*p;e[0]=u*m,e[4]=M*d-v,e[8]=g*d+w,e[1]=u*p,e[5]=w*d+g,e[9]=v*d-M,e[2]=-d,e[6]=c*u,e[10]=l*u}else if(t.order==="YZX"){const g=l*u,v=l*d,M=c*u,w=c*d;e[0]=u*m,e[4]=w-g*p,e[8]=M*p+v,e[1]=p,e[5]=l*m,e[9]=-c*m,e[2]=-d*m,e[6]=v*p+M,e[10]=g-w*p}else if(t.order==="XZY"){const g=l*u,v=l*d,M=c*u,w=c*d;e[0]=u*m,e[4]=-p,e[8]=d*m,e[1]=g*p+w,e[5]=l*m,e[9]=v*p-M,e[2]=M*p-v,e[6]=c*m,e[10]=w*p+g}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Lp,t,Rp)}lookAt(t,e,i){const o=this.elements;return mn.subVectors(t,e),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),vi.crossVectors(i,mn),vi.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),vi.crossVectors(i,mn)),vi.normalize(),nr.crossVectors(mn,vi),o[0]=vi.x,o[4]=nr.x,o[8]=mn.x,o[1]=vi.y,o[5]=nr.y,o[9]=mn.y,o[2]=vi.z,o[6]=nr.z,o[10]=mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,o=e.elements,a=this.elements,l=i[0],c=i[4],u=i[8],d=i[12],m=i[1],p=i[5],g=i[9],v=i[13],M=i[2],w=i[6],x=i[10],_=i[14],b=i[3],E=i[7],S=i[11],U=i[15],N=o[0],D=o[4],O=o[8],P=o[12],T=o[1],z=o[5],G=o[9],H=o[13],F=o[2],j=o[6],Y=o[10],ct=o[14],Z=o[3],xt=o[7],st=o[11],gt=o[15];return a[0]=l*N+c*T+u*F+d*Z,a[4]=l*D+c*z+u*j+d*xt,a[8]=l*O+c*G+u*Y+d*st,a[12]=l*P+c*H+u*ct+d*gt,a[1]=m*N+p*T+g*F+v*Z,a[5]=m*D+p*z+g*j+v*xt,a[9]=m*O+p*G+g*Y+v*st,a[13]=m*P+p*H+g*ct+v*gt,a[2]=M*N+w*T+x*F+_*Z,a[6]=M*D+w*z+x*j+_*xt,a[10]=M*O+w*G+x*Y+_*st,a[14]=M*P+w*H+x*ct+_*gt,a[3]=b*N+E*T+S*F+U*Z,a[7]=b*D+E*z+S*j+U*xt,a[11]=b*O+E*G+S*Y+U*st,a[15]=b*P+E*H+S*ct+U*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],o=t[8],a=t[12],l=t[1],c=t[5],u=t[9],d=t[13],m=t[2],p=t[6],g=t[10],v=t[14],M=t[3],w=t[7],x=t[11],_=t[15];return M*(+a*u*p-o*d*p-a*c*g+i*d*g+o*c*v-i*u*v)+w*(+e*u*v-e*d*g+a*l*g-o*l*v+o*d*m-a*u*m)+x*(+e*d*p-e*c*v-a*l*p+i*l*v+a*c*m-i*d*m)+_*(-o*c*m-e*u*p+e*c*g+o*l*p-i*l*g+i*u*m)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=e,o[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],o=t[2],a=t[3],l=t[4],c=t[5],u=t[6],d=t[7],m=t[8],p=t[9],g=t[10],v=t[11],M=t[12],w=t[13],x=t[14],_=t[15],b=p*x*d-w*g*d+w*u*v-c*x*v-p*u*_+c*g*_,E=M*g*d-m*x*d-M*u*v+l*x*v+m*u*_-l*g*_,S=m*w*d-M*p*d+M*c*v-l*w*v-m*c*_+l*p*_,U=M*p*u-m*w*u-M*c*g+l*w*g+m*c*x-l*p*x,N=e*b+i*E+o*S+a*U;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/N;return t[0]=b*D,t[1]=(w*g*a-p*x*a-w*o*v+i*x*v+p*o*_-i*g*_)*D,t[2]=(c*x*a-w*u*a+w*o*d-i*x*d-c*o*_+i*u*_)*D,t[3]=(p*u*a-c*g*a-p*o*d+i*g*d+c*o*v-i*u*v)*D,t[4]=E*D,t[5]=(m*x*a-M*g*a+M*o*v-e*x*v-m*o*_+e*g*_)*D,t[6]=(M*u*a-l*x*a-M*o*d+e*x*d+l*o*_-e*u*_)*D,t[7]=(l*g*a-m*u*a+m*o*d-e*g*d-l*o*v+e*u*v)*D,t[8]=S*D,t[9]=(M*p*a-m*w*a-M*i*v+e*w*v+m*i*_-e*p*_)*D,t[10]=(l*w*a-M*c*a+M*i*d-e*w*d-l*i*_+e*c*_)*D,t[11]=(m*c*a-l*p*a-m*i*d+e*p*d+l*i*v-e*c*v)*D,t[12]=U*D,t[13]=(m*w*o-M*p*o+M*i*g-e*w*g-m*i*x+e*p*x)*D,t[14]=(M*c*o-l*w*o-M*i*u+e*w*u+l*i*x-e*c*x)*D,t[15]=(l*p*o-m*c*o+m*i*u-e*p*u-l*i*g+e*c*g)*D,this}scale(t){const e=this.elements,i=t.x,o=t.y,a=t.z;return e[0]*=i,e[4]*=o,e[8]*=a,e[1]*=i,e[5]*=o,e[9]*=a,e[2]*=i,e[6]*=o,e[10]*=a,e[3]*=i,e[7]*=o,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,o))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),o=Math.sin(e),a=1-i,l=t.x,c=t.y,u=t.z,d=a*l,m=a*c;return this.set(d*l+i,d*c-o*u,d*u+o*c,0,d*c+o*u,m*c+i,m*u-o*l,0,d*u-o*c,m*u+o*l,a*u*u+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,o,a,l){return this.set(1,i,a,0,t,1,l,0,e,o,1,0,0,0,0,1),this}compose(t,e,i){const o=this.elements,a=e._x,l=e._y,c=e._z,u=e._w,d=a+a,m=l+l,p=c+c,g=a*d,v=a*m,M=a*p,w=l*m,x=l*p,_=c*p,b=u*d,E=u*m,S=u*p,U=i.x,N=i.y,D=i.z;return o[0]=(1-(w+_))*U,o[1]=(v+S)*U,o[2]=(M-E)*U,o[3]=0,o[4]=(v-S)*N,o[5]=(1-(g+_))*N,o[6]=(x+b)*N,o[7]=0,o[8]=(M+E)*D,o[9]=(x-b)*D,o[10]=(1-(g+w))*D,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,e,i){const o=this.elements;let a=ps.set(o[0],o[1],o[2]).length();const l=ps.set(o[4],o[5],o[6]).length(),c=ps.set(o[8],o[9],o[10]).length();this.determinant()<0&&(a=-a),t.x=o[12],t.y=o[13],t.z=o[14],An.copy(this);const d=1/a,m=1/l,p=1/c;return An.elements[0]*=d,An.elements[1]*=d,An.elements[2]*=d,An.elements[4]*=m,An.elements[5]*=m,An.elements[6]*=m,An.elements[8]*=p,An.elements[9]*=p,An.elements[10]*=p,e.setFromRotationMatrix(An),i.x=a,i.y=l,i.z=c,this}makePerspective(t,e,i,o,a,l,c=oi){const u=this.elements,d=2*a/(e-t),m=2*a/(i-o),p=(e+t)/(e-t),g=(i+o)/(i-o);let v,M;if(c===oi)v=-(l+a)/(l-a),M=-2*l*a/(l-a);else if(c===Or)v=-l/(l-a),M=-l*a/(l-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=d,u[4]=0,u[8]=p,u[12]=0,u[1]=0,u[5]=m,u[9]=g,u[13]=0,u[2]=0,u[6]=0,u[10]=v,u[14]=M,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(t,e,i,o,a,l,c=oi){const u=this.elements,d=1/(e-t),m=1/(i-o),p=1/(l-a),g=(e+t)*d,v=(i+o)*m;let M,w;if(c===oi)M=(l+a)*p,w=-2*p;else if(c===Or)M=a*p,w=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=2*d,u[4]=0,u[8]=0,u[12]=-g,u[1]=0,u[5]=2*m,u[9]=0,u[13]=-v,u[2]=0,u[6]=0,u[10]=w,u[14]=-M,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let o=0;o<16;o++)if(e[o]!==i[o])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ps=new V,An=new Pe,Lp=new V(0,0,0),Rp=new V(1,1,1),vi=new V,nr=new V,mn=new V,Ah=new Pe,Ch=new Ro;class fn{constructor(t=0,e=0,i=0,o=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,o=this._order){return this._x=t,this._y=e,this._z=i,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const o=t.elements,a=o[0],l=o[4],c=o[8],u=o[1],d=o[5],m=o[9],p=o[2],g=o[6],v=o[10];switch(e){case"XYZ":this._y=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-m,v),this._z=Math.atan2(-l,a)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(c,v),this._z=Math.atan2(u,d)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(Je(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-p,v),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(u,a));break;case"ZYX":this._y=Math.asin(-Je(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(g,v),this._z=Math.atan2(u,a)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-m,d),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(c,v));break;case"XZY":this._z=Math.asin(-Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(c,a)):(this._x=Math.atan2(-m,v),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Ah.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ah,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ch.setFromEuler(this),this.setFromQuaternion(Ch,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class hd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ip=0;const Ph=new V,ms=new Ro,Qn=new Pe,ir=new V,lo=new V,Dp=new V,Np=new Ro,Lh=new V(1,0,0),Rh=new V(0,1,0),Ih=new V(0,0,1),Dh={type:"added"},Up={type:"removed"},_s={type:"childadded",child:null},Pa={type:"childremoved",child:null};class Ze extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ze.DEFAULT_UP.clone();const t=new V,e=new fn,i=new Ro,o=new V(1,1,1);function a(){i.setFromEuler(e,!1)}function l(){e.setFromQuaternion(i,void 0,!1)}e._onChange(a),i._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Pe},normalMatrix:{value:new re}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=Ze.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.multiply(ms),this}rotateOnWorldAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.premultiply(ms),this}rotateX(t){return this.rotateOnAxis(Lh,t)}rotateY(t){return this.rotateOnAxis(Rh,t)}rotateZ(t){return this.rotateOnAxis(Ih,t)}translateOnAxis(t,e){return Ph.copy(t).applyQuaternion(this.quaternion),this.position.add(Ph.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Lh,t)}translateY(t){return this.translateOnAxis(Rh,t)}translateZ(t){return this.translateOnAxis(Ih,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ir.copy(t):ir.set(t,e,i);const o=this.parent;this.updateWorldMatrix(!0,!1),lo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(lo,ir,this.up):Qn.lookAt(ir,lo,this.up),this.quaternion.setFromRotationMatrix(Qn),o&&(Qn.extractRotation(o.matrixWorld),ms.setFromRotationMatrix(Qn),this.quaternion.premultiply(ms.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Dh),_s.child=t,this.dispatchEvent(_s),_s.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Up),Pa.child=t,this.dispatchEvent(Pa),Pa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Dh),_s.child=t,this.dispatchEvent(_s),_s.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,o=this.children.length;i<o;i++){const l=this.children[i].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const o=this.children;for(let a=0,l=o.length;a<l;a++)o[a].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,t,Dp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,Np,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,o=e.length;i<o;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,o=e.length;i<o;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,o=e.length;i<o;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const o=this.children;for(let a=0,l=o.length;a<l;a++)o[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function a(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(t)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=a(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let d=0,m=u.length;d<m;d++){const p=u[d];a(t.shapes,p)}else a(t.shapes,u)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,d=this.material.length;u<d;u++)c.push(a(t.materials,this.material[u]));o.material=c}else o.material=a(t.materials,this.material);if(this.children.length>0){o.children=[];for(let c=0;c<this.children.length;c++)o.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];o.animations.push(a(t.animations,u))}}if(e){const c=l(t.geometries),u=l(t.materials),d=l(t.textures),m=l(t.images),p=l(t.shapes),g=l(t.skeletons),v=l(t.animations),M=l(t.nodes);c.length>0&&(i.geometries=c),u.length>0&&(i.materials=u),d.length>0&&(i.textures=d),m.length>0&&(i.images=m),p.length>0&&(i.shapes=p),g.length>0&&(i.skeletons=g),v.length>0&&(i.animations=v),M.length>0&&(i.nodes=M)}return i.object=o,i;function l(c){const u=[];for(const d in c){const m=c[d];delete m.metadata,u.push(m)}return u}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const o=t.children[i];this.add(o.clone())}return this}}Ze.DEFAULT_UP=new V(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Cn=new V,ti=new V,La=new V,ei=new V,gs=new V,vs=new V,Nh=new V,Ra=new V,Ia=new V,Da=new V,Na=new De,Ua=new De,Oa=new De;class Mn{constructor(t=new V,e=new V,i=new V){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,o){o.subVectors(i,e),Cn.subVectors(t,e),o.cross(Cn);const a=o.lengthSq();return a>0?o.multiplyScalar(1/Math.sqrt(a)):o.set(0,0,0)}static getBarycoord(t,e,i,o,a){Cn.subVectors(o,e),ti.subVectors(i,e),La.subVectors(t,e);const l=Cn.dot(Cn),c=Cn.dot(ti),u=Cn.dot(La),d=ti.dot(ti),m=ti.dot(La),p=l*d-c*c;if(p===0)return a.set(0,0,0),null;const g=1/p,v=(d*u-c*m)*g,M=(l*m-c*u)*g;return a.set(1-v-M,M,v)}static containsPoint(t,e,i,o){return this.getBarycoord(t,e,i,o,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(t,e,i,o,a,l,c,u){return this.getBarycoord(t,e,i,o,ei)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(a,ei.x),u.addScaledVector(l,ei.y),u.addScaledVector(c,ei.z),u)}static getInterpolatedAttribute(t,e,i,o,a,l){return Na.setScalar(0),Ua.setScalar(0),Oa.setScalar(0),Na.fromBufferAttribute(t,e),Ua.fromBufferAttribute(t,i),Oa.fromBufferAttribute(t,o),l.setScalar(0),l.addScaledVector(Na,a.x),l.addScaledVector(Ua,a.y),l.addScaledVector(Oa,a.z),l}static isFrontFacing(t,e,i,o){return Cn.subVectors(i,e),ti.subVectors(t,e),Cn.cross(ti).dot(o)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,o){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,e,i,o){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Cn.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),Cn.cross(ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,o,a){return Mn.getInterpolation(t,this.a,this.b,this.c,e,i,o,a)}containsPoint(t){return Mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,o=this.b,a=this.c;let l,c;gs.subVectors(o,i),vs.subVectors(a,i),Ra.subVectors(t,i);const u=gs.dot(Ra),d=vs.dot(Ra);if(u<=0&&d<=0)return e.copy(i);Ia.subVectors(t,o);const m=gs.dot(Ia),p=vs.dot(Ia);if(m>=0&&p<=m)return e.copy(o);const g=u*p-m*d;if(g<=0&&u>=0&&m<=0)return l=u/(u-m),e.copy(i).addScaledVector(gs,l);Da.subVectors(t,a);const v=gs.dot(Da),M=vs.dot(Da);if(M>=0&&v<=M)return e.copy(a);const w=v*d-u*M;if(w<=0&&d>=0&&M<=0)return c=d/(d-M),e.copy(i).addScaledVector(vs,c);const x=m*M-v*p;if(x<=0&&p-m>=0&&v-M>=0)return Nh.subVectors(a,o),c=(p-m)/(p-m+(v-M)),e.copy(o).addScaledVector(Nh,c);const _=1/(x+w+g);return l=w*_,c=g*_,e.copy(i).addScaledVector(gs,l).addScaledVector(vs,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ud={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},sr={h:0,s:0,l:0};function za(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class pe{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,_e.toWorkingColorSpace(this,e),this}setRGB(t,e,i,o=_e.workingColorSpace){return this.r=t,this.g=e,this.b=i,_e.toWorkingColorSpace(this,o),this}setHSL(t,e,i,o=_e.workingColorSpace){if(t=vp(t,1),e=Je(e,0,1),i=Je(i,0,1),e===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+e):i+e-i*e,l=2*i-a;this.r=za(l,a,t+1/3),this.g=za(l,a,t),this.b=za(l,a,t-1/3)}return _e.toWorkingColorSpace(this,o),this}setStyle(t,e=je){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const l=o[1],c=o[2];switch(l){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=o[1],l=a.length;if(l===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=je){const i=ud[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=li(t.r),this.g=li(t.g),this.b=li(t.b),this}copyLinearToSRGB(t){return this.r=Os(t.r),this.g=Os(t.g),this.b=Os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=je){return _e.fromWorkingColorSpace($e.copy(this),t),Math.round(Je($e.r*255,0,255))*65536+Math.round(Je($e.g*255,0,255))*256+Math.round(Je($e.b*255,0,255))}getHexString(t=je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=_e.workingColorSpace){_e.fromWorkingColorSpace($e.copy(this),e);const i=$e.r,o=$e.g,a=$e.b,l=Math.max(i,o,a),c=Math.min(i,o,a);let u,d;const m=(c+l)/2;if(c===l)u=0,d=0;else{const p=l-c;switch(d=m<=.5?p/(l+c):p/(2-l-c),l){case i:u=(o-a)/p+(o<a?6:0);break;case o:u=(a-i)/p+2;break;case a:u=(i-o)/p+4;break}u/=6}return t.h=u,t.s=d,t.l=m,t}getRGB(t,e=_e.workingColorSpace){return _e.fromWorkingColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=je){_e.fromWorkingColorSpace($e.copy(this),t);const e=$e.r,i=$e.g,o=$e.b;return t!==je?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(o*255)})`}offsetHSL(t,e,i){return this.getHSL(xi),this.setHSL(xi.h+t,xi.s+e,xi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(xi),t.getHSL(sr);const i=ya(xi.h,sr.h,e),o=ya(xi.s,sr.s,e),a=ya(xi.l,sr.l,e);return this.setHSL(i,o,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,o=this.b,a=t.elements;return this.r=a[0]*e+a[3]*i+a[6]*o,this.g=a[1]*e+a[4]*i+a[7]*o,this.b=a[2]*e+a[5]*i+a[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $e=new pe;pe.NAMES=ud;let Op=0;class Zs extends es{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Op++}),this.uuid=ai(),this.name="",this.blending=Ns,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dl,this.blendDst=fl,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pe(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cs,this.stencilZFail=cs,this.stencilZPass=cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const o=this[e];if(o===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(i):o&&o.isVector3&&i&&i.isVector3?o.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ns&&(i.blending=this.blending),this.side!==Ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==dl&&(i.blendSrc=this.blendSrc),this.blendDst!==fl&&(i.blendDst=this.blendDst),this.blendEquation!==qi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==cs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==cs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==cs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}if(e){const a=o(t.textures),l=o(t.images);a.length>0&&(i.textures=a),l.length>0&&(i.images=l)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const o=e.length;i=new Array(o);for(let a=0;a!==o;++a)i[a]=e[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Sn extends Zs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=qu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Oe=new V,or=new bt;class Nn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=jl,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let o=0,a=this.itemSize;o<a;o++)this.array[t+o]=e.array[i+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)or.fromBufferAttribute(this,e),or.applyMatrix3(t),this.setXY(e,or.x,or.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Vn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=we(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,o){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),o=we(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=o,this}setXYZW(t,e,i,o,a){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),o=we(o,this.array),a=we(a,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=o,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jl&&(t.usage=this.usage),t}}class dd extends Nn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class fd extends Nn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Te extends Nn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let zp=0;const xn=new Pe,ka=new Ze,xs=new V,_n=new Io,co=new Io,Ge=new V;class Qe extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zp++}),this.uuid=ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ad(t)?fd:dd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new re().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return xn.makeRotationFromQuaternion(t),this.applyMatrix4(xn),this}rotateX(t){return xn.makeRotationX(t),this.applyMatrix4(xn),this}rotateY(t){return xn.makeRotationY(t),this.applyMatrix4(xn),this}rotateZ(t){return xn.makeRotationZ(t),this.applyMatrix4(xn),this}translate(t,e,i){return xn.makeTranslation(t,e,i),this.applyMatrix4(xn),this}scale(t,e,i){return xn.makeScale(t,e,i),this.applyMatrix4(xn),this}lookAt(t){return ka.lookAt(t),ka.updateMatrix(),this.applyMatrix4(ka.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xs).negate(),this.translate(xs.x,xs.y,xs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let o=0,a=t.length;o<a;o++){const l=t[o];i.push(l.x,l.y,l.z||0)}this.setAttribute("position",new Te(i,3))}else{for(let i=0,o=e.count;i<o;i++){const a=t[i];e.setXYZ(i,a.x,a.y,a.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Io);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,o=e.length;i<o;i++){const a=e[i];_n.setFromBufferAttribute(a),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pc);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const i=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let a=0,l=e.length;a<l;a++){const c=e[a];co.setFromBufferAttribute(c),this.morphTargetsRelative?(Ge.addVectors(_n.min,co.min),_n.expandByPoint(Ge),Ge.addVectors(_n.max,co.max),_n.expandByPoint(Ge)):(_n.expandByPoint(co.min),_n.expandByPoint(co.max))}_n.getCenter(i);let o=0;for(let a=0,l=t.count;a<l;a++)Ge.fromBufferAttribute(t,a),o=Math.max(o,i.distanceToSquared(Ge));if(e)for(let a=0,l=e.length;a<l;a++){const c=e[a],u=this.morphTargetsRelative;for(let d=0,m=c.count;d<m;d++)Ge.fromBufferAttribute(c,d),u&&(xs.fromBufferAttribute(t,d),Ge.add(xs)),o=Math.max(o,i.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,o=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nn(new Float32Array(4*i.count),4));const l=this.getAttribute("tangent"),c=[],u=[];for(let O=0;O<i.count;O++)c[O]=new V,u[O]=new V;const d=new V,m=new V,p=new V,g=new bt,v=new bt,M=new bt,w=new V,x=new V;function _(O,P,T){d.fromBufferAttribute(i,O),m.fromBufferAttribute(i,P),p.fromBufferAttribute(i,T),g.fromBufferAttribute(a,O),v.fromBufferAttribute(a,P),M.fromBufferAttribute(a,T),m.sub(d),p.sub(d),v.sub(g),M.sub(g);const z=1/(v.x*M.y-M.x*v.y);isFinite(z)&&(w.copy(m).multiplyScalar(M.y).addScaledVector(p,-v.y).multiplyScalar(z),x.copy(p).multiplyScalar(v.x).addScaledVector(m,-M.x).multiplyScalar(z),c[O].add(w),c[P].add(w),c[T].add(w),u[O].add(x),u[P].add(x),u[T].add(x))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let O=0,P=b.length;O<P;++O){const T=b[O],z=T.start,G=T.count;for(let H=z,F=z+G;H<F;H+=3)_(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const E=new V,S=new V,U=new V,N=new V;function D(O){U.fromBufferAttribute(o,O),N.copy(U);const P=c[O];E.copy(P),E.sub(U.multiplyScalar(U.dot(P))).normalize(),S.crossVectors(N,P);const z=S.dot(u[O])<0?-1:1;l.setXYZW(O,E.x,E.y,E.z,z)}for(let O=0,P=b.length;O<P;++O){const T=b[O],z=T.start,G=T.count;for(let H=z,F=z+G;H<F;H+=3)D(t.getX(H+0)),D(t.getX(H+1)),D(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Nn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let g=0,v=i.count;g<v;g++)i.setXYZ(g,0,0,0);const o=new V,a=new V,l=new V,c=new V,u=new V,d=new V,m=new V,p=new V;if(t)for(let g=0,v=t.count;g<v;g+=3){const M=t.getX(g+0),w=t.getX(g+1),x=t.getX(g+2);o.fromBufferAttribute(e,M),a.fromBufferAttribute(e,w),l.fromBufferAttribute(e,x),m.subVectors(l,a),p.subVectors(o,a),m.cross(p),c.fromBufferAttribute(i,M),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,x),c.add(m),u.add(m),d.add(m),i.setXYZ(M,c.x,c.y,c.z),i.setXYZ(w,u.x,u.y,u.z),i.setXYZ(x,d.x,d.y,d.z)}else for(let g=0,v=e.count;g<v;g+=3)o.fromBufferAttribute(e,g+0),a.fromBufferAttribute(e,g+1),l.fromBufferAttribute(e,g+2),m.subVectors(l,a),p.subVectors(o,a),m.cross(p),i.setXYZ(g+0,m.x,m.y,m.z),i.setXYZ(g+1,m.x,m.y,m.z),i.setXYZ(g+2,m.x,m.y,m.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(c,u){const d=c.array,m=c.itemSize,p=c.normalized,g=new d.constructor(u.length*m);let v=0,M=0;for(let w=0,x=u.length;w<x;w++){c.isInterleavedBufferAttribute?v=u[w]*c.data.stride+c.offset:v=u[w]*m;for(let _=0;_<m;_++)g[M++]=d[v++]}return new Nn(g,m,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Qe,i=this.index.array,o=this.attributes;for(const c in o){const u=o[c],d=t(u,i);e.setAttribute(c,d)}const a=this.morphAttributes;for(const c in a){const u=[],d=a[c];for(let m=0,p=d.length;m<p;m++){const g=d[m],v=t(g,i);u.push(v)}e.morphAttributes[c]=u}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,u=l.length;c<u;c++){const d=l[c];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const d in u)u[d]!==void 0&&(t[d]=u[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const u in i){const d=i[u];t.data.attributes[u]=d.toJSON(t.data)}const o={};let a=!1;for(const u in this.morphAttributes){const d=this.morphAttributes[u],m=[];for(let p=0,g=d.length;p<g;p++){const v=d[p];m.push(v.toJSON(t.data))}m.length>0&&(o[u]=m,a=!0)}a&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const o=t.attributes;for(const d in o){const m=o[d];this.setAttribute(d,m.clone(e))}const a=t.morphAttributes;for(const d in a){const m=[],p=a[d];for(let g=0,v=p.length;g<v;g++)m.push(p[g].clone(e));this.morphAttributes[d]=m}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let d=0,m=l.length;d<m;d++){const p=l[d];this.addGroup(p.start,p.count,p.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=t.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Uh=new Pe,zi=new Pp,rr=new pc,Oh=new V,ar=new V,lr=new V,cr=new V,Fa=new V,hr=new V,zh=new V,ur=new V;class _t extends Ze{constructor(t=new Qe,e=new Sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const o=e[i[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=o.length;a<l;a++){const c=o[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a}}}}getVertexPosition(t,e){const i=this.geometry,o=i.attributes.position,a=i.morphAttributes.position,l=i.morphTargetsRelative;e.fromBufferAttribute(o,t);const c=this.morphTargetInfluences;if(a&&c){hr.set(0,0,0);for(let u=0,d=a.length;u<d;u++){const m=c[u],p=a[u];m!==0&&(Fa.fromBufferAttribute(p,t),l?hr.addScaledVector(Fa,m):hr.addScaledVector(Fa.sub(e),m))}e.add(hr)}return e}raycast(t,e){const i=this.geometry,o=this.material,a=this.matrixWorld;o!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),rr.copy(i.boundingSphere),rr.applyMatrix4(a),zi.copy(t.ray).recast(t.near),!(rr.containsPoint(zi.origin)===!1&&(zi.intersectSphere(rr,Oh)===null||zi.origin.distanceToSquared(Oh)>(t.far-t.near)**2))&&(Uh.copy(a).invert(),zi.copy(t.ray).applyMatrix4(Uh),!(i.boundingBox!==null&&zi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,zi)))}_computeIntersections(t,e,i){let o;const a=this.geometry,l=this.material,c=a.index,u=a.attributes.position,d=a.attributes.uv,m=a.attributes.uv1,p=a.attributes.normal,g=a.groups,v=a.drawRange;if(c!==null)if(Array.isArray(l))for(let M=0,w=g.length;M<w;M++){const x=g[M],_=l[x.materialIndex],b=Math.max(x.start,v.start),E=Math.min(c.count,Math.min(x.start+x.count,v.start+v.count));for(let S=b,U=E;S<U;S+=3){const N=c.getX(S),D=c.getX(S+1),O=c.getX(S+2);o=dr(this,_,t,i,d,m,p,N,D,O),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=x.materialIndex,e.push(o))}}else{const M=Math.max(0,v.start),w=Math.min(c.count,v.start+v.count);for(let x=M,_=w;x<_;x+=3){const b=c.getX(x),E=c.getX(x+1),S=c.getX(x+2);o=dr(this,l,t,i,d,m,p,b,E,S),o&&(o.faceIndex=Math.floor(x/3),e.push(o))}}else if(u!==void 0)if(Array.isArray(l))for(let M=0,w=g.length;M<w;M++){const x=g[M],_=l[x.materialIndex],b=Math.max(x.start,v.start),E=Math.min(u.count,Math.min(x.start+x.count,v.start+v.count));for(let S=b,U=E;S<U;S+=3){const N=S,D=S+1,O=S+2;o=dr(this,_,t,i,d,m,p,N,D,O),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=x.materialIndex,e.push(o))}}else{const M=Math.max(0,v.start),w=Math.min(u.count,v.start+v.count);for(let x=M,_=w;x<_;x+=3){const b=x,E=x+1,S=x+2;o=dr(this,l,t,i,d,m,p,b,E,S),o&&(o.faceIndex=Math.floor(x/3),e.push(o))}}}}function kp(s,t,e,i,o,a,l,c){let u;if(t.side===dn?u=i.intersectTriangle(l,a,o,!0,c):u=i.intersectTriangle(o,a,l,t.side===Ai,c),u===null)return null;ur.copy(c),ur.applyMatrix4(s.matrixWorld);const d=e.ray.origin.distanceTo(ur);return d<e.near||d>e.far?null:{distance:d,point:ur.clone(),object:s}}function dr(s,t,e,i,o,a,l,c,u,d){s.getVertexPosition(c,ar),s.getVertexPosition(u,lr),s.getVertexPosition(d,cr);const m=kp(s,t,e,i,ar,lr,cr,zh);if(m){const p=new V;Mn.getBarycoord(zh,ar,lr,cr,p),o&&(m.uv=Mn.getInterpolatedAttribute(o,c,u,d,p,new bt)),a&&(m.uv1=Mn.getInterpolatedAttribute(a,c,u,d,p,new bt)),l&&(m.normal=Mn.getInterpolatedAttribute(l,c,u,d,p,new V),m.normal.dot(i.direction)>0&&m.normal.multiplyScalar(-1));const g={a:c,b:u,c:d,normal:new V,materialIndex:0};Mn.getNormal(ar,lr,cr,g.normal),m.face=g,m.barycoord=p}return m}class le extends Qe{constructor(t=1,e=1,i=1,o=1,a=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:o,heightSegments:a,depthSegments:l};const c=this;o=Math.floor(o),a=Math.floor(a),l=Math.floor(l);const u=[],d=[],m=[],p=[];let g=0,v=0;M("z","y","x",-1,-1,i,e,t,l,a,0),M("z","y","x",1,-1,i,e,-t,l,a,1),M("x","z","y",1,1,t,i,e,o,l,2),M("x","z","y",1,-1,t,i,-e,o,l,3),M("x","y","z",1,-1,t,e,i,o,a,4),M("x","y","z",-1,-1,t,e,-i,o,a,5),this.setIndex(u),this.setAttribute("position",new Te(d,3)),this.setAttribute("normal",new Te(m,3)),this.setAttribute("uv",new Te(p,2));function M(w,x,_,b,E,S,U,N,D,O,P){const T=S/D,z=U/O,G=S/2,H=U/2,F=N/2,j=D+1,Y=O+1;let ct=0,Z=0;const xt=new V;for(let st=0;st<Y;st++){const gt=st*z-H;for(let It=0;It<j;It++){const Dt=It*T-G;xt[w]=Dt*b,xt[x]=gt*E,xt[_]=F,d.push(xt.x,xt.y,xt.z),xt[w]=0,xt[x]=0,xt[_]=N>0?1:-1,m.push(xt.x,xt.y,xt.z),p.push(It/D),p.push(1-st/O),ct+=1}}for(let st=0;st<O;st++)for(let gt=0;gt<D;gt++){const It=g+gt+j*st,Dt=g+gt+j*(st+1),Q=g+(gt+1)+j*(st+1),rt=g+(gt+1)+j*st;u.push(It,Dt,rt),u.push(Dt,Q,rt),Z+=6}c.addGroup(v,Z,P),v+=Z,g+=ct}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new le(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Vs(s){const t={};for(const e in s){t[e]={};for(const i in s[e]){const o=s[e][i];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=o.clone():Array.isArray(o)?t[e][i]=o.slice():t[e][i]=o}}return t}function on(s){const t={};for(let e=0;e<s.length;e++){const i=Vs(s[e]);for(const o in i)t[o]=i[o]}return t}function Fp(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function pd(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:_e.workingColorSpace}const Bp={clone:Vs,merge:on};var Hp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends Zs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hp,this.fragmentShader=Vp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Vs(t.uniforms),this.uniformsGroups=Fp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const o in this.uniforms){const l=this.uniforms[o].value;l&&l.isTexture?e.uniforms[o]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[o]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[o]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[o]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[o]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[o]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[o]={type:"m4",value:l.toArray()}:e.uniforms[o]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const o in this.extensions)this.extensions[o]===!0&&(i[o]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class md extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=oi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const yi=new V,kh=new bt,Fh=new bt;class yn extends md{constructor(t=50,e=1,i=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=o,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Jl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Jl*2*Math.atan(Math.tan(xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(yi.x,yi.y).multiplyScalar(-t/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yi.x,yi.y).multiplyScalar(-t/yi.z)}getViewSize(t,e){return this.getViewBounds(t,kh,Fh),e.subVectors(Fh,kh)}setViewOffset(t,e,i,o,a,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=o,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(xa*.5*this.fov)/this.zoom,i=2*e,o=this.aspect*i,a=-.5*o;const l=this.view;if(this.view!==null&&this.view.enabled){const u=l.fullWidth,d=l.fullHeight;a+=l.offsetX*o/u,e-=l.offsetY*i/d,o*=l.width/u,i*=l.height/d}const c=this.filmOffset;c!==0&&(a+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+o,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ys=-90,Ms=1;class Gp extends Ze{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new yn(ys,Ms,t,e);o.layers=this.layers,this.add(o);const a=new yn(ys,Ms,t,e);a.layers=this.layers,this.add(a);const l=new yn(ys,Ms,t,e);l.layers=this.layers,this.add(l);const c=new yn(ys,Ms,t,e);c.layers=this.layers,this.add(c);const u=new yn(ys,Ms,t,e);u.layers=this.layers,this.add(u);const d=new yn(ys,Ms,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,o,a,l,c,u]=e;for(const d of e)this.remove(d);if(t===oi)i.up.set(0,1,0),i.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(t===Or)i.up.set(0,-1,0),i.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,l,c,u,d,m]=this.children,p=t.getRenderTarget(),g=t.getActiveCubeFace(),v=t.getActiveMipmapLevel(),M=t.xr.enabled;t.xr.enabled=!1;const w=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,o),t.render(e,a),t.setRenderTarget(i,1,o),t.render(e,l),t.setRenderTarget(i,2,o),t.render(e,c),t.setRenderTarget(i,3,o),t.render(e,u),t.setRenderTarget(i,4,o),t.render(e,d),i.texture.generateMipmaps=w,t.setRenderTarget(i,5,o),t.render(e,m),t.setRenderTarget(p,g,v),t.xr.enabled=M,i.texture.needsPMREMUpdate=!0}}class _d extends rn{constructor(t,e,i,o,a,l,c,u,d,m){t=t!==void 0?t:[],e=e!==void 0?e:ks,super(t,e,i,o,a,l,c,u,d,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Wp extends Ji{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},o=[i,i,i,i,i,i];this.texture=new _d(o,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new le(5,5,5),a=new Ci({name:"CubemapFromEquirect",uniforms:Vs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:dn,blending:bi});a.uniforms.tEquirect.value=e;const l=new _t(o,a),c=e.minFilter;return e.minFilter===Ki&&(e.minFilter=Gn),new Gp(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,i,o){const a=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,i,o);t.setRenderTarget(a)}}const Ba=new V,Zp=new V,Xp=new re;class Zi{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,o){return this.normal.set(t,e,i),this.constant=o,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const o=Ba.subVectors(i,e).cross(Zp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ba),o=this.normal.dot(i);if(o===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/o;return a<0||a>1?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Xp.getNormalMatrix(t),o=this.coplanarPoint(Ba).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-o.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ki=new pc,fr=new V;class mc{constructor(t=new Zi,e=new Zi,i=new Zi,o=new Zi,a=new Zi,l=new Zi){this.planes=[t,e,i,o,a,l]}set(t,e,i,o,a,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(i),c[3].copy(o),c[4].copy(a),c[5].copy(l),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=oi){const i=this.planes,o=t.elements,a=o[0],l=o[1],c=o[2],u=o[3],d=o[4],m=o[5],p=o[6],g=o[7],v=o[8],M=o[9],w=o[10],x=o[11],_=o[12],b=o[13],E=o[14],S=o[15];if(i[0].setComponents(u-a,g-d,x-v,S-_).normalize(),i[1].setComponents(u+a,g+d,x+v,S+_).normalize(),i[2].setComponents(u+l,g+m,x+M,S+b).normalize(),i[3].setComponents(u-l,g-m,x-M,S-b).normalize(),i[4].setComponents(u-c,g-p,x-w,S-E).normalize(),e===oi)i[5].setComponents(u+c,g+p,x+w,S+E).normalize();else if(e===Or)i[5].setComponents(c,p,w,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(t){return ki.center.set(0,0,0),ki.radius=.7071067811865476,ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(t){const e=this.planes,i=t.center,o=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(i)<o)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const o=e[i];if(fr.x=o.normal.x>0?t.max.x:t.min.x,fr.y=o.normal.y>0?t.max.y:t.min.y,fr.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function gd(){let s=null,t=!1,e=null,i=null;function o(a,l){e(a,l),i=s.requestAnimationFrame(o)}return{start:function(){t!==!0&&e!==null&&(i=s.requestAnimationFrame(o),t=!0)},stop:function(){s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){s=a}}}function qp(s){const t=new WeakMap;function e(c,u){const d=c.array,m=c.usage,p=d.byteLength,g=s.createBuffer();s.bindBuffer(u,g),s.bufferData(u,d,m),c.onUploadCallback();let v;if(d instanceof Float32Array)v=s.FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?v=s.HALF_FLOAT:v=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)v=s.SHORT;else if(d instanceof Uint32Array)v=s.UNSIGNED_INT;else if(d instanceof Int32Array)v=s.INT;else if(d instanceof Int8Array)v=s.BYTE;else if(d instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:v,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function i(c,u,d){const m=u.array,p=u.updateRanges;if(s.bindBuffer(d,c),p.length===0)s.bufferSubData(d,0,m);else{p.sort((v,M)=>v.start-M.start);let g=0;for(let v=1;v<p.length;v++){const M=p[g],w=p[v];w.start<=M.start+M.count+1?M.count=Math.max(M.count,w.start+w.count-M.start):(++g,p[g]=w)}p.length=g+1;for(let v=0,M=p.length;v<M;v++){const w=p[v];s.bufferSubData(d,w.start*m.BYTES_PER_ELEMENT,m,w.start,w.count)}u.clearUpdateRanges()}u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=t.get(c);u&&(s.deleteBuffer(u.buffer),t.delete(c))}function l(c,u){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const m=t.get(c);(!m||m.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const d=t.get(c);if(d===void 0)t.set(c,e(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(d.buffer,c,u),d.version=c.version}}return{get:o,remove:a,update:l}}class In extends Qe{constructor(t=1,e=1,i=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:o};const a=t/2,l=e/2,c=Math.floor(i),u=Math.floor(o),d=c+1,m=u+1,p=t/c,g=e/u,v=[],M=[],w=[],x=[];for(let _=0;_<m;_++){const b=_*g-l;for(let E=0;E<d;E++){const S=E*p-a;M.push(S,-b,0),w.push(0,0,1),x.push(E/c),x.push(1-_/u)}}for(let _=0;_<u;_++)for(let b=0;b<c;b++){const E=b+d*_,S=b+d*(_+1),U=b+1+d*(_+1),N=b+1+d*_;v.push(E,S,N),v.push(S,U,N)}this.setIndex(v),this.setAttribute("position",new Te(M,3)),this.setAttribute("normal",new Te(w,3)),this.setAttribute("uv",new Te(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new In(t.width,t.height,t.widthSegments,t.heightSegments)}}var Yp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$p=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,em=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,im=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,om=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,am=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_m=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,gm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ym=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Em="gl_FragColor = linearToOutputTexel( gl_FragColor );",bm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Am=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Im=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Um=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Om=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,km=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Bm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ym=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$m=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Km=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,t_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,e_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,n_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,i_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,s_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,o_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,r_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,a_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,l_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,h_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,d_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,f_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,__=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,g_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,v_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,x_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,y_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,M_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,S_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,w_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,E_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,b_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,T_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,C_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,P_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,L_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,R_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,I_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,D_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,N_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,U_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,O_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,z_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,k_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,F_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,B_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,H_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,V_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,G_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,W_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,X_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const q_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Y_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,eg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ng=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ag=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ug=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,dg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,pg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_g=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ae={alphahash_fragment:Yp,alphahash_pars_fragment:$p,alphamap_fragment:Kp,alphamap_pars_fragment:jp,alphatest_fragment:Jp,alphatest_pars_fragment:Qp,aomap_fragment:tm,aomap_pars_fragment:em,batching_pars_vertex:nm,batching_vertex:im,begin_vertex:sm,beginnormal_vertex:om,bsdfs:rm,iridescence_fragment:am,bumpmap_pars_fragment:lm,clipping_planes_fragment:cm,clipping_planes_pars_fragment:hm,clipping_planes_pars_vertex:um,clipping_planes_vertex:dm,color_fragment:fm,color_pars_fragment:pm,color_pars_vertex:mm,color_vertex:_m,common:gm,cube_uv_reflection_fragment:vm,defaultnormal_vertex:xm,displacementmap_pars_vertex:ym,displacementmap_vertex:Mm,emissivemap_fragment:Sm,emissivemap_pars_fragment:wm,colorspace_fragment:Em,colorspace_pars_fragment:bm,envmap_fragment:Tm,envmap_common_pars_fragment:Am,envmap_pars_fragment:Cm,envmap_pars_vertex:Pm,envmap_physical_pars_fragment:Bm,envmap_vertex:Lm,fog_vertex:Rm,fog_pars_vertex:Im,fog_fragment:Dm,fog_pars_fragment:Nm,gradientmap_pars_fragment:Um,lightmap_pars_fragment:Om,lights_lambert_fragment:zm,lights_lambert_pars_fragment:km,lights_pars_begin:Fm,lights_toon_fragment:Hm,lights_toon_pars_fragment:Vm,lights_phong_fragment:Gm,lights_phong_pars_fragment:Wm,lights_physical_fragment:Zm,lights_physical_pars_fragment:Xm,lights_fragment_begin:qm,lights_fragment_maps:Ym,lights_fragment_end:$m,logdepthbuf_fragment:Km,logdepthbuf_pars_fragment:jm,logdepthbuf_pars_vertex:Jm,logdepthbuf_vertex:Qm,map_fragment:t_,map_pars_fragment:e_,map_particle_fragment:n_,map_particle_pars_fragment:i_,metalnessmap_fragment:s_,metalnessmap_pars_fragment:o_,morphinstance_vertex:r_,morphcolor_vertex:a_,morphnormal_vertex:l_,morphtarget_pars_vertex:c_,morphtarget_vertex:h_,normal_fragment_begin:u_,normal_fragment_maps:d_,normal_pars_fragment:f_,normal_pars_vertex:p_,normal_vertex:m_,normalmap_pars_fragment:__,clearcoat_normal_fragment_begin:g_,clearcoat_normal_fragment_maps:v_,clearcoat_pars_fragment:x_,iridescence_pars_fragment:y_,opaque_fragment:M_,packing:S_,premultiplied_alpha_fragment:w_,project_vertex:E_,dithering_fragment:b_,dithering_pars_fragment:T_,roughnessmap_fragment:A_,roughnessmap_pars_fragment:C_,shadowmap_pars_fragment:P_,shadowmap_pars_vertex:L_,shadowmap_vertex:R_,shadowmask_pars_fragment:I_,skinbase_vertex:D_,skinning_pars_vertex:N_,skinning_vertex:U_,skinnormal_vertex:O_,specularmap_fragment:z_,specularmap_pars_fragment:k_,tonemapping_fragment:F_,tonemapping_pars_fragment:B_,transmission_fragment:H_,transmission_pars_fragment:V_,uv_pars_fragment:G_,uv_pars_vertex:W_,uv_vertex:Z_,worldpos_vertex:X_,background_vert:q_,background_frag:Y_,backgroundCube_vert:$_,backgroundCube_frag:K_,cube_vert:j_,cube_frag:J_,depth_vert:Q_,depth_frag:tg,distanceRGBA_vert:eg,distanceRGBA_frag:ng,equirect_vert:ig,equirect_frag:sg,linedashed_vert:og,linedashed_frag:rg,meshbasic_vert:ag,meshbasic_frag:lg,meshlambert_vert:cg,meshlambert_frag:hg,meshmatcap_vert:ug,meshmatcap_frag:dg,meshnormal_vert:fg,meshnormal_frag:pg,meshphong_vert:mg,meshphong_frag:_g,meshphysical_vert:gg,meshphysical_frag:vg,meshtoon_vert:xg,meshtoon_frag:yg,points_vert:Mg,points_frag:Sg,shadow_vert:wg,shadow_frag:Eg,sprite_vert:bg,sprite_frag:Tg},Lt={common:{diffuse:{value:new pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new pe(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},Hn={basic:{uniforms:on([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:ae.meshbasic_vert,fragmentShader:ae.meshbasic_frag},lambert:{uniforms:on([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new pe(0)}}]),vertexShader:ae.meshlambert_vert,fragmentShader:ae.meshlambert_frag},phong:{uniforms:on([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new pe(0)},specular:{value:new pe(1118481)},shininess:{value:30}}]),vertexShader:ae.meshphong_vert,fragmentShader:ae.meshphong_frag},standard:{uniforms:on([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag},toon:{uniforms:on([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new pe(0)}}]),vertexShader:ae.meshtoon_vert,fragmentShader:ae.meshtoon_frag},matcap:{uniforms:on([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:ae.meshmatcap_vert,fragmentShader:ae.meshmatcap_frag},points:{uniforms:on([Lt.points,Lt.fog]),vertexShader:ae.points_vert,fragmentShader:ae.points_frag},dashed:{uniforms:on([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ae.linedashed_vert,fragmentShader:ae.linedashed_frag},depth:{uniforms:on([Lt.common,Lt.displacementmap]),vertexShader:ae.depth_vert,fragmentShader:ae.depth_frag},normal:{uniforms:on([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:ae.meshnormal_vert,fragmentShader:ae.meshnormal_frag},sprite:{uniforms:on([Lt.sprite,Lt.fog]),vertexShader:ae.sprite_vert,fragmentShader:ae.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ae.background_vert,fragmentShader:ae.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:ae.backgroundCube_vert,fragmentShader:ae.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ae.cube_vert,fragmentShader:ae.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ae.equirect_vert,fragmentShader:ae.equirect_frag},distanceRGBA:{uniforms:on([Lt.common,Lt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ae.distanceRGBA_vert,fragmentShader:ae.distanceRGBA_frag},shadow:{uniforms:on([Lt.lights,Lt.fog,{color:{value:new pe(0)},opacity:{value:1}}]),vertexShader:ae.shadow_vert,fragmentShader:ae.shadow_frag}};Hn.physical={uniforms:on([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new pe(0)},specularColor:{value:new pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag};const pr={r:0,b:0,g:0},Fi=new fn,Ag=new Pe;function Cg(s,t,e,i,o,a,l){const c=new pe(0);let u=a===!0?0:1,d,m,p=null,g=0,v=null;function M(b){let E=b.isScene===!0?b.background:null;return E&&E.isTexture&&(E=(b.backgroundBlurriness>0?e:t).get(E)),E}function w(b){let E=!1;const S=M(b);S===null?_(c,u):S&&S.isColor&&(_(S,1),E=!0);const U=s.xr.getEnvironmentBlendMode();U==="additive"?i.buffers.color.setClear(0,0,0,1,l):U==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,l),(s.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(b,E){const S=M(E);S&&(S.isCubeTexture||S.mapping===Vr)?(m===void 0&&(m=new _t(new le(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:Vs(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(U,N,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(m)),Fi.copy(E.backgroundRotation),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),m.material.uniforms.envMap.value=S,m.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(Ag.makeRotationFromEuler(Fi)),m.material.toneMapped=_e.getTransfer(S.colorSpace)!==Se,(p!==S||g!==S.version||v!==s.toneMapping)&&(m.material.needsUpdate=!0,p=S,g=S.version,v=s.toneMapping),m.layers.enableAll(),b.unshift(m,m.geometry,m.material,0,0,null)):S&&S.isTexture&&(d===void 0&&(d=new _t(new In(2,2),new Ci({name:"BackgroundMaterial",uniforms:Vs(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(d)),d.material.uniforms.t2D.value=S,d.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,d.material.toneMapped=_e.getTransfer(S.colorSpace)!==Se,S.matrixAutoUpdate===!0&&S.updateMatrix(),d.material.uniforms.uvTransform.value.copy(S.matrix),(p!==S||g!==S.version||v!==s.toneMapping)&&(d.material.needsUpdate=!0,p=S,g=S.version,v=s.toneMapping),d.layers.enableAll(),b.unshift(d,d.geometry,d.material,0,0,null))}function _(b,E){b.getRGB(pr,pd(s)),i.buffers.color.setClear(pr.r,pr.g,pr.b,E,l)}return{getClearColor:function(){return c},setClearColor:function(b,E=1){c.set(b),u=E,_(c,u)},getClearAlpha:function(){return u},setClearAlpha:function(b){u=b,_(c,u)},render:w,addToRenderList:x}}function Pg(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},o=g(null);let a=o,l=!1;function c(T,z,G,H,F){let j=!1;const Y=p(H,G,z);a!==Y&&(a=Y,d(a.object)),j=v(T,H,G,F),j&&M(T,H,G,F),F!==null&&t.update(F,s.ELEMENT_ARRAY_BUFFER),(j||l)&&(l=!1,S(T,z,G,H),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function u(){return s.createVertexArray()}function d(T){return s.bindVertexArray(T)}function m(T){return s.deleteVertexArray(T)}function p(T,z,G){const H=G.wireframe===!0;let F=i[T.id];F===void 0&&(F={},i[T.id]=F);let j=F[z.id];j===void 0&&(j={},F[z.id]=j);let Y=j[H];return Y===void 0&&(Y=g(u()),j[H]=Y),Y}function g(T){const z=[],G=[],H=[];for(let F=0;F<e;F++)z[F]=0,G[F]=0,H[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:H,object:T,attributes:{},index:null}}function v(T,z,G,H){const F=a.attributes,j=z.attributes;let Y=0;const ct=G.getAttributes();for(const Z in ct)if(ct[Z].location>=0){const st=F[Z];let gt=j[Z];if(gt===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(gt=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(gt=T.instanceColor)),st===void 0||st.attribute!==gt||gt&&st.data!==gt.data)return!0;Y++}return a.attributesNum!==Y||a.index!==H}function M(T,z,G,H){const F={},j=z.attributes;let Y=0;const ct=G.getAttributes();for(const Z in ct)if(ct[Z].location>=0){let st=j[Z];st===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(st=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(st=T.instanceColor));const gt={};gt.attribute=st,st&&st.data&&(gt.data=st.data),F[Z]=gt,Y++}a.attributes=F,a.attributesNum=Y,a.index=H}function w(){const T=a.newAttributes;for(let z=0,G=T.length;z<G;z++)T[z]=0}function x(T){_(T,0)}function _(T,z){const G=a.newAttributes,H=a.enabledAttributes,F=a.attributeDivisors;G[T]=1,H[T]===0&&(s.enableVertexAttribArray(T),H[T]=1),F[T]!==z&&(s.vertexAttribDivisor(T,z),F[T]=z)}function b(){const T=a.newAttributes,z=a.enabledAttributes;for(let G=0,H=z.length;G<H;G++)z[G]!==T[G]&&(s.disableVertexAttribArray(G),z[G]=0)}function E(T,z,G,H,F,j,Y){Y===!0?s.vertexAttribIPointer(T,z,G,F,j):s.vertexAttribPointer(T,z,G,H,F,j)}function S(T,z,G,H){w();const F=H.attributes,j=G.getAttributes(),Y=z.defaultAttributeValues;for(const ct in j){const Z=j[ct];if(Z.location>=0){let xt=F[ct];if(xt===void 0&&(ct==="instanceMatrix"&&T.instanceMatrix&&(xt=T.instanceMatrix),ct==="instanceColor"&&T.instanceColor&&(xt=T.instanceColor)),xt!==void 0){const st=xt.normalized,gt=xt.itemSize,It=t.get(xt);if(It===void 0)continue;const Dt=It.buffer,Q=It.type,rt=It.bytesPerElement,pt=Q===s.INT||Q===s.UNSIGNED_INT||xt.gpuType===lc;if(xt.isInterleavedBufferAttribute){const vt=xt.data,Bt=vt.stride,jt=xt.offset;if(vt.isInstancedInterleavedBuffer){for(let lt=0;lt<Z.locationSize;lt++)_(Z.location+lt,vt.meshPerAttribute);T.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let lt=0;lt<Z.locationSize;lt++)x(Z.location+lt);s.bindBuffer(s.ARRAY_BUFFER,Dt);for(let lt=0;lt<Z.locationSize;lt++)E(Z.location+lt,gt/Z.locationSize,Q,st,Bt*rt,(jt+gt/Z.locationSize*lt)*rt,pt)}else{if(xt.isInstancedBufferAttribute){for(let vt=0;vt<Z.locationSize;vt++)_(Z.location+vt,xt.meshPerAttribute);T.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let vt=0;vt<Z.locationSize;vt++)x(Z.location+vt);s.bindBuffer(s.ARRAY_BUFFER,Dt);for(let vt=0;vt<Z.locationSize;vt++)E(Z.location+vt,gt/Z.locationSize,Q,st,gt*rt,gt/Z.locationSize*vt*rt,pt)}}else if(Y!==void 0){const st=Y[ct];if(st!==void 0)switch(st.length){case 2:s.vertexAttrib2fv(Z.location,st);break;case 3:s.vertexAttrib3fv(Z.location,st);break;case 4:s.vertexAttrib4fv(Z.location,st);break;default:s.vertexAttrib1fv(Z.location,st)}}}}b()}function U(){O();for(const T in i){const z=i[T];for(const G in z){const H=z[G];for(const F in H)m(H[F].object),delete H[F];delete z[G]}delete i[T]}}function N(T){if(i[T.id]===void 0)return;const z=i[T.id];for(const G in z){const H=z[G];for(const F in H)m(H[F].object),delete H[F];delete z[G]}delete i[T.id]}function D(T){for(const z in i){const G=i[z];if(G[T.id]===void 0)continue;const H=G[T.id];for(const F in H)m(H[F].object),delete H[F];delete G[T.id]}}function O(){P(),l=!0,a!==o&&(a=o,d(a.object))}function P(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:c,reset:O,resetDefaultState:P,dispose:U,releaseStatesOfGeometry:N,releaseStatesOfProgram:D,initAttributes:w,enableAttribute:x,disableUnusedAttributes:b}}function Lg(s,t,e){let i;function o(d){i=d}function a(d,m){s.drawArrays(i,d,m),e.update(m,i,1)}function l(d,m,p){p!==0&&(s.drawArraysInstanced(i,d,m,p),e.update(m,i,p))}function c(d,m,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,d,0,m,0,p);let v=0;for(let M=0;M<p;M++)v+=m[M];e.update(v,i,1)}function u(d,m,p,g){if(p===0)return;const v=t.get("WEBGL_multi_draw");if(v===null)for(let M=0;M<d.length;M++)l(d[M],m[M],g[M]);else{v.multiDrawArraysInstancedWEBGL(i,d,0,m,0,g,0,p);let M=0;for(let w=0;w<p;w++)M+=m[w]*g[w];e.update(M,i,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function Rg(s,t,e,i){let o;function a(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");o=s.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function l(D){return!(D!==Rn&&i.convert(D)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(D){const O=D===Lo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==ui&&i.convert(D)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==si&&!O)}function u(D){if(D==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=e.precision!==void 0?e.precision:"highp";const m=u(d);m!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",m,"instead."),d=m);const p=e.logarithmicDepthBuffer===!0,g=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),v=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),M=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_TEXTURE_SIZE),x=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),U=M>0,N=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:u,textureFormatReadable:l,textureTypeReadable:c,precision:d,logarithmicDepthBuffer:p,reverseDepthBuffer:g,maxTextures:v,maxVertexTextures:M,maxTextureSize:w,maxCubemapSize:x,maxAttributes:_,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:U,maxSamples:N}}function Ig(s){const t=this;let e=null,i=0,o=!1,a=!1;const l=new Zi,c=new re,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,g){const v=p.length!==0||g||i!==0||o;return o=g,i=p.length,v},this.beginShadows=function(){a=!0,m(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,g){e=m(p,g,0)},this.setState=function(p,g,v){const M=p.clippingPlanes,w=p.clipIntersection,x=p.clipShadows,_=s.get(p);if(!o||M===null||M.length===0||a&&!x)a?m(null):d();else{const b=a?0:i,E=b*4;let S=_.clippingState||null;u.value=S,S=m(M,g,E,v);for(let U=0;U!==E;++U)S[U]=e[U];_.clippingState=S,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=b}};function d(){u.value!==e&&(u.value=e,u.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function m(p,g,v,M){const w=p!==null?p.length:0;let x=null;if(w!==0){if(x=u.value,M!==!0||x===null){const _=v+w*4,b=g.matrixWorldInverse;c.getNormalMatrix(b),(x===null||x.length<_)&&(x=new Float32Array(_));for(let E=0,S=v;E!==w;++E,S+=4)l.copy(p[E]).applyMatrix4(b,c),l.normal.toArray(x,S),x[S+3]=l.constant}u.value=x,u.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,x}}function Dg(s){let t=new WeakMap;function e(l,c){return c===Ml?l.mapping=ks:c===Sl&&(l.mapping=Fs),l}function i(l){if(l&&l.isTexture){const c=l.mapping;if(c===Ml||c===Sl)if(t.has(l)){const u=t.get(l).texture;return e(u,l.mapping)}else{const u=l.image;if(u&&u.height>0){const d=new Wp(u.height);return d.fromEquirectangularTexture(s,l),t.set(l,d),l.addEventListener("dispose",o),e(d.texture,l.mapping)}else return null}}return l}function o(l){const c=l.target;c.removeEventListener("dispose",o);const u=t.get(c);u!==void 0&&(t.delete(c),u.dispose())}function a(){t=new WeakMap}return{get:i,dispose:a}}class vd extends md{constructor(t=-1,e=1,i=1,o=-1,a=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=o,this.near=a,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,o,a,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=o,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let a=i-t,l=i+t,c=o+e,u=o-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,l=a+d*this.view.width,c-=m*this.view.offsetY,u=c-m*this.view.height}this.projectionMatrix.makeOrthographic(a,l,c,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Rs=4,Bh=[.125,.215,.35,.446,.526,.582],Yi=20,Ha=new vd,Hh=new pe;let Va=null,Ga=0,Wa=0,Za=!1;const Xi=(1+Math.sqrt(5))/2,Ss=1/Xi,Vh=[new V(-Xi,Ss,0),new V(Xi,Ss,0),new V(-Ss,0,Xi),new V(Ss,0,Xi),new V(0,Xi,-Ss),new V(0,Xi,Ss),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class Gh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,o=100){Va=this._renderer.getRenderTarget(),Ga=this._renderer.getActiveCubeFace(),Wa=this._renderer.getActiveMipmapLevel(),Za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,i,o,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Va,Ga,Wa),this._renderer.xr.enabled=Za,t.scissorTest=!1,mr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ks||t.mapping===Fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Va=this._renderer.getRenderTarget(),Ga=this._renderer.getActiveCubeFace(),Wa=this._renderer.getActiveMipmapLevel(),Za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:Lo,format:Rn,colorSpace:Ws,depthBuffer:!1},o=Wh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wh(t,e,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ng(a)),this._blurMaterial=Ug(a,t,e)}return o}_compileMaterial(t){const e=new _t(this._lodPlanes[0],t);this._renderer.compile(e,Ha)}_sceneToCubeUV(t,e,i,o){const c=new yn(90,1,e,i),u=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],m=this._renderer,p=m.autoClear,g=m.toneMapping;m.getClearColor(Hh),m.toneMapping=Ti,m.autoClear=!1;const v=new Sn({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),M=new _t(new le,v);let w=!1;const x=t.background;x?x.isColor&&(v.color.copy(x),t.background=null,w=!0):(v.color.copy(Hh),w=!0);for(let _=0;_<6;_++){const b=_%3;b===0?(c.up.set(0,u[_],0),c.lookAt(d[_],0,0)):b===1?(c.up.set(0,0,u[_]),c.lookAt(0,d[_],0)):(c.up.set(0,u[_],0),c.lookAt(0,0,d[_]));const E=this._cubeSize;mr(o,b*E,_>2?E:0,E,E),m.setRenderTarget(o),w&&m.render(M,c),m.render(t,c)}M.geometry.dispose(),M.material.dispose(),m.toneMapping=g,m.autoClear=p,t.background=x}_textureToCubeUV(t,e){const i=this._renderer,o=t.mapping===ks||t.mapping===Fs;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zh());const a=o?this._cubemapMaterial:this._equirectMaterial,l=new _t(this._lodPlanes[0],a),c=a.uniforms;c.envMap.value=t;const u=this._cubeSize;mr(e,0,0,3*u,2*u),i.setRenderTarget(e),i.render(l,Ha)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const o=this._lodPlanes.length;for(let a=1;a<o;a++){const l=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),c=Vh[(o-a-1)%Vh.length];this._blur(t,a-1,a,l,c)}e.autoClear=i}_blur(t,e,i,o,a){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,i,o,"latitudinal",a),this._halfBlur(l,t,i,i,o,"longitudinal",a)}_halfBlur(t,e,i,o,a,l,c){const u=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,p=new _t(this._lodPlanes[o],d),g=d.uniforms,v=this._sizeLods[i]-1,M=isFinite(a)?Math.PI/(2*v):2*Math.PI/(2*Yi-1),w=a/M,x=isFinite(a)?1+Math.floor(m*w):Yi;x>Yi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Yi}`);const _=[];let b=0;for(let D=0;D<Yi;++D){const O=D/w,P=Math.exp(-O*O/2);_.push(P),D===0?b+=P:D<x&&(b+=2*P)}for(let D=0;D<_.length;D++)_[D]=_[D]/b;g.envMap.value=t.texture,g.samples.value=x,g.weights.value=_,g.latitudinal.value=l==="latitudinal",c&&(g.poleAxis.value=c);const{_lodMax:E}=this;g.dTheta.value=M,g.mipInt.value=E-i;const S=this._sizeLods[o],U=3*S*(o>E-Rs?o-E+Rs:0),N=4*(this._cubeSize-S);mr(e,U,N,3*S,2*S),u.setRenderTarget(e),u.render(p,Ha)}}function Ng(s){const t=[],e=[],i=[];let o=s;const a=s-Rs+1+Bh.length;for(let l=0;l<a;l++){const c=Math.pow(2,o);e.push(c);let u=1/c;l>s-Rs?u=Bh[l-s+Rs-1]:l===0&&(u=0),i.push(u);const d=1/(c-2),m=-d,p=1+d,g=[m,m,p,m,p,p,m,m,p,p,m,p],v=6,M=6,w=3,x=2,_=1,b=new Float32Array(w*M*v),E=new Float32Array(x*M*v),S=new Float32Array(_*M*v);for(let N=0;N<v;N++){const D=N%3*2/3-1,O=N>2?0:-1,P=[D,O,0,D+2/3,O,0,D+2/3,O+1,0,D,O,0,D+2/3,O+1,0,D,O+1,0];b.set(P,w*M*N),E.set(g,x*M*N);const T=[N,N,N,N,N,N];S.set(T,_*M*N)}const U=new Qe;U.setAttribute("position",new Nn(b,w)),U.setAttribute("uv",new Nn(E,x)),U.setAttribute("faceIndex",new Nn(S,_)),t.push(U),o>Rs&&o--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Wh(s,t,e){const i=new Ji(s,t,e);return i.texture.mapping=Vr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function mr(s,t,e,i,o){s.viewport.set(t,e,i,o),s.scissor.set(t,e,i,o)}function Ug(s,t,e){const i=new Float32Array(Yi),o=new V(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:Yi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Zh(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Xh(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function _c(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Og(s){let t=new WeakMap,e=null;function i(c){if(c&&c.isTexture){const u=c.mapping,d=u===Ml||u===Sl,m=u===ks||u===Fs;if(d||m){let p=t.get(c);const g=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==g)return e===null&&(e=new Gh(s)),p=d?e.fromEquirectangular(c,p):e.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),p.texture;if(p!==void 0)return p.texture;{const v=c.image;return d&&v&&v.height>0||m&&v&&o(v)?(e===null&&(e=new Gh(s)),p=d?e.fromEquirectangular(c):e.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),c.addEventListener("dispose",a),p.texture):null}}}return c}function o(c){let u=0;const d=6;for(let m=0;m<d;m++)c[m]!==void 0&&u++;return u===d}function a(c){const u=c.target;u.removeEventListener("dispose",a);const d=t.get(u);d!==void 0&&(t.delete(u),d.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:l}}function zg(s){const t={};function e(i){if(t[i]!==void 0)return t[i];let o;switch(i){case"WEBGL_depth_texture":o=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=s.getExtension(i)}return t[i]=o,o}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const o=e(i);return o===null&&xo("THREE.WebGLRenderer: "+i+" extension not supported."),o}}}function kg(s,t,e,i){const o={},a=new WeakMap;function l(p){const g=p.target;g.index!==null&&t.remove(g.index);for(const M in g.attributes)t.remove(g.attributes[M]);for(const M in g.morphAttributes){const w=g.morphAttributes[M];for(let x=0,_=w.length;x<_;x++)t.remove(w[x])}g.removeEventListener("dispose",l),delete o[g.id];const v=a.get(g);v&&(t.remove(v),a.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function c(p,g){return o[g.id]===!0||(g.addEventListener("dispose",l),o[g.id]=!0,e.memory.geometries++),g}function u(p){const g=p.attributes;for(const M in g)t.update(g[M],s.ARRAY_BUFFER);const v=p.morphAttributes;for(const M in v){const w=v[M];for(let x=0,_=w.length;x<_;x++)t.update(w[x],s.ARRAY_BUFFER)}}function d(p){const g=[],v=p.index,M=p.attributes.position;let w=0;if(v!==null){const b=v.array;w=v.version;for(let E=0,S=b.length;E<S;E+=3){const U=b[E+0],N=b[E+1],D=b[E+2];g.push(U,N,N,D,D,U)}}else if(M!==void 0){const b=M.array;w=M.version;for(let E=0,S=b.length/3-1;E<S;E+=3){const U=E+0,N=E+1,D=E+2;g.push(U,N,N,D,D,U)}}else return;const x=new(ad(g)?fd:dd)(g,1);x.version=w;const _=a.get(p);_&&t.remove(_),a.set(p,x)}function m(p){const g=a.get(p);if(g){const v=p.index;v!==null&&g.version<v.version&&d(p)}else d(p);return a.get(p)}return{get:c,update:u,getWireframeAttribute:m}}function Fg(s,t,e){let i;function o(g){i=g}let a,l;function c(g){a=g.type,l=g.bytesPerElement}function u(g,v){s.drawElements(i,v,a,g*l),e.update(v,i,1)}function d(g,v,M){M!==0&&(s.drawElementsInstanced(i,v,a,g*l,M),e.update(v,i,M))}function m(g,v,M){if(M===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,v,0,a,g,0,M);let x=0;for(let _=0;_<M;_++)x+=v[_];e.update(x,i,1)}function p(g,v,M,w){if(M===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let _=0;_<g.length;_++)d(g[_]/l,v[_],w[_]);else{x.multiDrawElementsInstancedWEBGL(i,v,0,a,g,0,w,0,M);let _=0;for(let b=0;b<M;b++)_+=v[b]*w[b];e.update(_,i,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=m,this.renderMultiDrawInstances=p}function Bg(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,l,c){switch(e.calls++,l){case s.TRIANGLES:e.triangles+=c*(a/3);break;case s.LINES:e.lines+=c*(a/2);break;case s.LINE_STRIP:e.lines+=c*(a-1);break;case s.LINE_LOOP:e.lines+=c*a;break;case s.POINTS:e.points+=c*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function o(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:o,update:i}}function Hg(s,t,e){const i=new WeakMap,o=new De;function a(l,c,u){const d=l.morphTargetInfluences,m=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=m!==void 0?m.length:0;let g=i.get(c);if(g===void 0||g.count!==p){let T=function(){O.dispose(),i.delete(c),c.removeEventListener("dispose",T)};var v=T;g!==void 0&&g.texture.dispose();const M=c.morphAttributes.position!==void 0,w=c.morphAttributes.normal!==void 0,x=c.morphAttributes.color!==void 0,_=c.morphAttributes.position||[],b=c.morphAttributes.normal||[],E=c.morphAttributes.color||[];let S=0;M===!0&&(S=1),w===!0&&(S=2),x===!0&&(S=3);let U=c.attributes.position.count*S,N=1;U>t.maxTextureSize&&(N=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const D=new Float32Array(U*N*4*p),O=new cd(D,U,N,p);O.type=si,O.needsUpdate=!0;const P=S*4;for(let z=0;z<p;z++){const G=_[z],H=b[z],F=E[z],j=U*N*4*z;for(let Y=0;Y<G.count;Y++){const ct=Y*P;M===!0&&(o.fromBufferAttribute(G,Y),D[j+ct+0]=o.x,D[j+ct+1]=o.y,D[j+ct+2]=o.z,D[j+ct+3]=0),w===!0&&(o.fromBufferAttribute(H,Y),D[j+ct+4]=o.x,D[j+ct+5]=o.y,D[j+ct+6]=o.z,D[j+ct+7]=0),x===!0&&(o.fromBufferAttribute(F,Y),D[j+ct+8]=o.x,D[j+ct+9]=o.y,D[j+ct+10]=o.z,D[j+ct+11]=F.itemSize===4?o.w:1)}}g={count:p,texture:O,size:new bt(U,N)},i.set(c,g),c.addEventListener("dispose",T)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)u.getUniforms().setValue(s,"morphTexture",l.morphTexture,e);else{let M=0;for(let x=0;x<d.length;x++)M+=d[x];const w=c.morphTargetsRelative?1:1-M;u.getUniforms().setValue(s,"morphTargetBaseInfluence",w),u.getUniforms().setValue(s,"morphTargetInfluences",d)}u.getUniforms().setValue(s,"morphTargetsTexture",g.texture,e),u.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:a}}function Vg(s,t,e,i){let o=new WeakMap;function a(u){const d=i.render.frame,m=u.geometry,p=t.get(u,m);if(o.get(p)!==d&&(t.update(p),o.set(p,d)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),o.get(u)!==d&&(e.update(u.instanceMatrix,s.ARRAY_BUFFER),u.instanceColor!==null&&e.update(u.instanceColor,s.ARRAY_BUFFER),o.set(u,d))),u.isSkinnedMesh){const g=u.skeleton;o.get(g)!==d&&(g.update(),o.set(g,d))}return p}function l(){o=new WeakMap}function c(u){const d=u.target;d.removeEventListener("dispose",c),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:l}}class xd extends rn{constructor(t,e,i,o,a,l,c,u,d,m=Us){if(m!==Us&&m!==Hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&m===Us&&(i=ji),i===void 0&&m===Hs&&(i=Bs),super(null,o,a,l,c,u,m,i,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:Dn,this.minFilter=u!==void 0?u:Dn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const yd=new rn,qh=new xd(1,1),Md=new cd,Sd=new Ap,wd=new _d,Yh=[],$h=[],Kh=new Float32Array(16),jh=new Float32Array(9),Jh=new Float32Array(4);function Xs(s,t,e){const i=s[0];if(i<=0||i>0)return s;const o=t*e;let a=Yh[o];if(a===void 0&&(a=new Float32Array(o),Yh[o]=a),t!==0){i.toArray(a,0);for(let l=1,c=0;l!==t;++l)c+=e,s[l].toArray(a,c)}return a}function ze(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function ke(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Wr(s,t){let e=$h[t];e===void 0&&(e=new Int32Array(t),$h[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function Gg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Wg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;s.uniform2fv(this.addr,t),ke(e,t)}}function Zg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;s.uniform3fv(this.addr,t),ke(e,t)}}function Xg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;s.uniform4fv(this.addr,t),ke(e,t)}}function qg(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,i))return;Jh.set(i),s.uniformMatrix2fv(this.addr,!1,Jh),ke(e,i)}}function Yg(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,i))return;jh.set(i),s.uniformMatrix3fv(this.addr,!1,jh),ke(e,i)}}function $g(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,i))return;Kh.set(i),s.uniformMatrix4fv(this.addr,!1,Kh),ke(e,i)}}function Kg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function jg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;s.uniform2iv(this.addr,t),ke(e,t)}}function Jg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;s.uniform3iv(this.addr,t),ke(e,t)}}function Qg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;s.uniform4iv(this.addr,t),ke(e,t)}}function tv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function ev(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;s.uniform2uiv(this.addr,t),ke(e,t)}}function nv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;s.uniform3uiv(this.addr,t),ke(e,t)}}function iv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;s.uniform4uiv(this.addr,t),ke(e,t)}}function sv(s,t,e){const i=this.cache,o=e.allocateTextureUnit();i[0]!==o&&(s.uniform1i(this.addr,o),i[0]=o);let a;this.type===s.SAMPLER_2D_SHADOW?(qh.compareFunction=rd,a=qh):a=yd,e.setTexture2D(t||a,o)}function ov(s,t,e){const i=this.cache,o=e.allocateTextureUnit();i[0]!==o&&(s.uniform1i(this.addr,o),i[0]=o),e.setTexture3D(t||Sd,o)}function rv(s,t,e){const i=this.cache,o=e.allocateTextureUnit();i[0]!==o&&(s.uniform1i(this.addr,o),i[0]=o),e.setTextureCube(t||wd,o)}function av(s,t,e){const i=this.cache,o=e.allocateTextureUnit();i[0]!==o&&(s.uniform1i(this.addr,o),i[0]=o),e.setTexture2DArray(t||Md,o)}function lv(s){switch(s){case 5126:return Gg;case 35664:return Wg;case 35665:return Zg;case 35666:return Xg;case 35674:return qg;case 35675:return Yg;case 35676:return $g;case 5124:case 35670:return Kg;case 35667:case 35671:return jg;case 35668:case 35672:return Jg;case 35669:case 35673:return Qg;case 5125:return tv;case 36294:return ev;case 36295:return nv;case 36296:return iv;case 35678:case 36198:case 36298:case 36306:case 35682:return sv;case 35679:case 36299:case 36307:return ov;case 35680:case 36300:case 36308:case 36293:return rv;case 36289:case 36303:case 36311:case 36292:return av}}function cv(s,t){s.uniform1fv(this.addr,t)}function hv(s,t){const e=Xs(t,this.size,2);s.uniform2fv(this.addr,e)}function uv(s,t){const e=Xs(t,this.size,3);s.uniform3fv(this.addr,e)}function dv(s,t){const e=Xs(t,this.size,4);s.uniform4fv(this.addr,e)}function fv(s,t){const e=Xs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function pv(s,t){const e=Xs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function mv(s,t){const e=Xs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function _v(s,t){s.uniform1iv(this.addr,t)}function gv(s,t){s.uniform2iv(this.addr,t)}function vv(s,t){s.uniform3iv(this.addr,t)}function xv(s,t){s.uniform4iv(this.addr,t)}function yv(s,t){s.uniform1uiv(this.addr,t)}function Mv(s,t){s.uniform2uiv(this.addr,t)}function Sv(s,t){s.uniform3uiv(this.addr,t)}function wv(s,t){s.uniform4uiv(this.addr,t)}function Ev(s,t,e){const i=this.cache,o=t.length,a=Wr(e,o);ze(i,a)||(s.uniform1iv(this.addr,a),ke(i,a));for(let l=0;l!==o;++l)e.setTexture2D(t[l]||yd,a[l])}function bv(s,t,e){const i=this.cache,o=t.length,a=Wr(e,o);ze(i,a)||(s.uniform1iv(this.addr,a),ke(i,a));for(let l=0;l!==o;++l)e.setTexture3D(t[l]||Sd,a[l])}function Tv(s,t,e){const i=this.cache,o=t.length,a=Wr(e,o);ze(i,a)||(s.uniform1iv(this.addr,a),ke(i,a));for(let l=0;l!==o;++l)e.setTextureCube(t[l]||wd,a[l])}function Av(s,t,e){const i=this.cache,o=t.length,a=Wr(e,o);ze(i,a)||(s.uniform1iv(this.addr,a),ke(i,a));for(let l=0;l!==o;++l)e.setTexture2DArray(t[l]||Md,a[l])}function Cv(s){switch(s){case 5126:return cv;case 35664:return hv;case 35665:return uv;case 35666:return dv;case 35674:return fv;case 35675:return pv;case 35676:return mv;case 5124:case 35670:return _v;case 35667:case 35671:return gv;case 35668:case 35672:return vv;case 35669:case 35673:return xv;case 5125:return yv;case 36294:return Mv;case 36295:return Sv;case 36296:return wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ev;case 35679:case 36299:case 36307:return bv;case 35680:case 36300:case 36308:case 36293:return Tv;case 36289:case 36303:case 36311:case 36292:return Av}}class Pv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=lv(e.type)}}class Lv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Cv(e.type)}}class Rv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const o=this.seq;for(let a=0,l=o.length;a!==l;++a){const c=o[a];c.setValue(t,e[c.id],i)}}}const Xa=/(\w+)(\])?(\[|\.)?/g;function Qh(s,t){s.seq.push(t),s.map[t.id]=t}function Iv(s,t,e){const i=s.name,o=i.length;for(Xa.lastIndex=0;;){const a=Xa.exec(i),l=Xa.lastIndex;let c=a[1];const u=a[2]==="]",d=a[3];if(u&&(c=c|0),d===void 0||d==="["&&l+2===o){Qh(e,d===void 0?new Pv(c,s,t):new Lv(c,s,t));break}else{let p=e.map[c];p===void 0&&(p=new Rv(c),Qh(e,p)),e=p}}}class Ur{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);Iv(a,l,this)}}setValue(t,e,i,o){const a=this.map[e];a!==void 0&&a.setValue(t,i,o)}setOptional(t,e,i){const o=e[i];o!==void 0&&this.setValue(t,i,o)}static upload(t,e,i,o){for(let a=0,l=e.length;a!==l;++a){const c=e[a],u=i[c.id];u.needsUpdate!==!1&&c.setValue(t,u.value,o)}}static seqWithValue(t,e){const i=[];for(let o=0,a=t.length;o!==a;++o){const l=t[o];l.id in e&&i.push(l)}return i}}function tu(s,t,e){const i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}const Dv=37297;let Nv=0;function Uv(s,t){const e=s.split(`
`),i=[],o=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let l=o;l<a;l++){const c=l+1;i.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return i.join(`
`)}const eu=new re;function Ov(s){_e._getMatrix(eu,_e.workingColorSpace,s);const t=`mat3( ${eu.elements.map(e=>e.toFixed(4))} )`;switch(_e.getTransfer(s)){case Gr:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function nu(s,t,e){const i=s.getShaderParameter(t,s.COMPILE_STATUS),o=s.getShaderInfoLog(t).trim();if(i&&o==="")return"";const a=/ERROR: 0:(\d+)/.exec(o);if(a){const l=parseInt(a[1]);return e.toUpperCase()+`

`+o+`

`+Uv(s.getShaderSource(t),l)}else return o}function zv(s,t){const e=Ov(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function kv(s,t){let e;switch(t){case tp:e="Linear";break;case ep:e="Reinhard";break;case np:e="Cineon";break;case ip:e="ACESFilmic";break;case op:e="AgX";break;case rp:e="Neutral";break;case sp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _r=new V;function Fv(){_e.getLuminanceCoefficients(_r);const s=_r.x.toFixed(4),t=_r.y.toFixed(4),e=_r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yo).join(`
`)}function Hv(s){const t=[];for(const e in s){const i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Vv(s,t){const e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let o=0;o<i;o++){const a=s.getActiveAttrib(t,o),l=a.name;let c=1;a.type===s.FLOAT_MAT2&&(c=2),a.type===s.FLOAT_MAT3&&(c=3),a.type===s.FLOAT_MAT4&&(c=4),e[l]={type:a.type,location:s.getAttribLocation(t,l),locationSize:c}}return e}function yo(s){return s!==""}function iu(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function su(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Gv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ql(s){return s.replace(Gv,Zv)}const Wv=new Map;function Zv(s,t){let e=ae[t];if(e===void 0){const i=Wv.get(t);if(i!==void 0)e=ae[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ql(e)}const Xv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ou(s){return s.replace(Xv,qv)}function qv(s,t,e,i){let o="";for(let a=parseInt(t);a<parseInt(e);a++)o+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return o}function ru(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Yv(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Zu?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Xu?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ni&&(t="SHADOWMAP_TYPE_VSM"),t}function $v(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ks:case Fs:t="ENVMAP_TYPE_CUBE";break;case Vr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Kv(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Fs:t="ENVMAP_MODE_REFRACTION";break}return t}function jv(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case qu:t="ENVMAP_BLENDING_MULTIPLY";break;case Jf:t="ENVMAP_BLENDING_MIX";break;case Qf:t="ENVMAP_BLENDING_ADD";break}return t}function Jv(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Qv(s,t,e,i){const o=s.getContext(),a=e.defines;let l=e.vertexShader,c=e.fragmentShader;const u=Yv(e),d=$v(e),m=Kv(e),p=jv(e),g=Jv(e),v=Bv(e),M=Hv(a),w=o.createProgram();let x,_,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(yo).join(`
`),x.length>0&&(x+=`
`),_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(yo).join(`
`),_.length>0&&(_+=`
`)):(x=[ru(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+m:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yo).join(`
`),_=[ru(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+m:"",e.envMap?"#define "+p:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ti?"#define TONE_MAPPING":"",e.toneMapping!==Ti?ae.tonemapping_pars_fragment:"",e.toneMapping!==Ti?kv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ae.colorspace_pars_fragment,zv("linearToOutputTexel",e.outputColorSpace),Fv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(yo).join(`
`)),l=Ql(l),l=iu(l,e),l=su(l,e),c=Ql(c),c=iu(c,e),c=su(c,e),l=ou(l),c=ou(c),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,x=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,_=["#define varying in",e.glslVersion===xh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const E=b+x+l,S=b+_+c,U=tu(o,o.VERTEX_SHADER,E),N=tu(o,o.FRAGMENT_SHADER,S);o.attachShader(w,U),o.attachShader(w,N),e.index0AttributeName!==void 0?o.bindAttribLocation(w,0,e.index0AttributeName):e.morphTargets===!0&&o.bindAttribLocation(w,0,"position"),o.linkProgram(w);function D(z){if(s.debug.checkShaderErrors){const G=o.getProgramInfoLog(w).trim(),H=o.getShaderInfoLog(U).trim(),F=o.getShaderInfoLog(N).trim();let j=!0,Y=!0;if(o.getProgramParameter(w,o.LINK_STATUS)===!1)if(j=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,w,U,N);else{const ct=nu(o,U,"vertex"),Z=nu(o,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(w,o.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+G+`
`+ct+`
`+Z)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(H===""||F==="")&&(Y=!1);Y&&(z.diagnostics={runnable:j,programLog:G,vertexShader:{log:H,prefix:x},fragmentShader:{log:F,prefix:_}})}o.deleteShader(U),o.deleteShader(N),O=new Ur(o,w),P=Vv(o,w)}let O;this.getUniforms=function(){return O===void 0&&D(this),O};let P;this.getAttributes=function(){return P===void 0&&D(this),P};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=o.getProgramParameter(w,Dv)),T},this.destroy=function(){i.releaseStatesOfProgram(this),o.deleteProgram(w),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Nv++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=U,this.fragmentShader=N,this}let t0=0;class e0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,o=this._getShaderStage(e),a=this._getShaderStage(i),l=this._getShaderCacheForMaterial(t);return l.has(o)===!1&&(l.add(o),o.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new n0(t),e.set(t,i)),i}}class n0{constructor(t){this.id=t0++,this.code=t,this.usedTimes=0}}function i0(s,t,e,i,o,a,l){const c=new hd,u=new e0,d=new Set,m=[],p=o.logarithmicDepthBuffer,g=o.vertexTextures;let v=o.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(P){return d.add(P),P===0?"uv":`uv${P}`}function x(P,T,z,G,H){const F=G.fog,j=H.geometry,Y=P.isMeshStandardMaterial?G.environment:null,ct=(P.isMeshStandardMaterial?e:t).get(P.envMap||Y),Z=ct&&ct.mapping===Vr?ct.image.height:null,xt=M[P.type];P.precision!==null&&(v=o.getMaxPrecision(P.precision),v!==P.precision&&console.warn("THREE.WebGLProgram.getParameters:",P.precision,"not supported, using",v,"instead."));const st=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,gt=st!==void 0?st.length:0;let It=0;j.morphAttributes.position!==void 0&&(It=1),j.morphAttributes.normal!==void 0&&(It=2),j.morphAttributes.color!==void 0&&(It=3);let Dt,Q,rt,pt;if(xt){const ge=Hn[xt];Dt=ge.vertexShader,Q=ge.fragmentShader}else Dt=P.vertexShader,Q=P.fragmentShader,u.update(P),rt=u.getVertexShaderID(P),pt=u.getFragmentShaderID(P);const vt=s.getRenderTarget(),Bt=s.state.buffers.depth.getReversed(),jt=H.isInstancedMesh===!0,lt=H.isBatchedMesh===!0,Mt=!!P.map,J=!!P.matcap,ut=!!ct,k=!!P.aoMap,Rt=!!P.lightMap,ht=!!P.bumpMap,Et=!!P.normalMap,wt=!!P.displacementMap,Nt=!!P.emissiveMap,At=!!P.metalnessMap,I=!!P.roughnessMap,A=P.anisotropy>0,$=P.clearcoat>0,ot=P.dispersion>0,dt=P.iridescence>0,at=P.sheen>0,Vt=P.transmission>0,Ct=A&&!!P.anisotropyMap,Ft=$&&!!P.clearcoatMap,ce=$&&!!P.clearcoatNormalMap,yt=$&&!!P.clearcoatRoughnessMap,Gt=dt&&!!P.iridescenceMap,Jt=dt&&!!P.iridescenceThicknessMap,Qt=at&&!!P.sheenColorMap,Ht=at&&!!P.sheenRoughnessMap,fe=!!P.specularMap,ee=!!P.specularColorMap,ye=!!P.specularIntensityMap,W=Vt&&!!P.transmissionMap,Pt=Vt&&!!P.thicknessMap,it=!!P.gradientMap,ft=!!P.alphaMap,zt=P.alphaTest>0,Ut=!!P.alphaHash,ie=!!P.extensions;let Ce=Ti;P.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(Ce=s.toneMapping);const Fe={shaderID:xt,shaderType:P.type,shaderName:P.name,vertexShader:Dt,fragmentShader:Q,defines:P.defines,customVertexShaderID:rt,customFragmentShaderID:pt,isRawShaderMaterial:P.isRawShaderMaterial===!0,glslVersion:P.glslVersion,precision:v,batching:lt,batchingColor:lt&&H._colorsTexture!==null,instancing:jt,instancingColor:jt&&H.instanceColor!==null,instancingMorph:jt&&H.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:vt===null?s.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:Ws,alphaToCoverage:!!P.alphaToCoverage,map:Mt,matcap:J,envMap:ut,envMapMode:ut&&ct.mapping,envMapCubeUVHeight:Z,aoMap:k,lightMap:Rt,bumpMap:ht,normalMap:Et,displacementMap:g&&wt,emissiveMap:Nt,normalMapObjectSpace:Et&&P.normalMapType===hp,normalMapTangentSpace:Et&&P.normalMapType===od,metalnessMap:At,roughnessMap:I,anisotropy:A,anisotropyMap:Ct,clearcoat:$,clearcoatMap:Ft,clearcoatNormalMap:ce,clearcoatRoughnessMap:yt,dispersion:ot,iridescence:dt,iridescenceMap:Gt,iridescenceThicknessMap:Jt,sheen:at,sheenColorMap:Qt,sheenRoughnessMap:Ht,specularMap:fe,specularColorMap:ee,specularIntensityMap:ye,transmission:Vt,transmissionMap:W,thicknessMap:Pt,gradientMap:it,opaque:P.transparent===!1&&P.blending===Ns&&P.alphaToCoverage===!1,alphaMap:ft,alphaTest:zt,alphaHash:Ut,combine:P.combine,mapUv:Mt&&w(P.map.channel),aoMapUv:k&&w(P.aoMap.channel),lightMapUv:Rt&&w(P.lightMap.channel),bumpMapUv:ht&&w(P.bumpMap.channel),normalMapUv:Et&&w(P.normalMap.channel),displacementMapUv:wt&&w(P.displacementMap.channel),emissiveMapUv:Nt&&w(P.emissiveMap.channel),metalnessMapUv:At&&w(P.metalnessMap.channel),roughnessMapUv:I&&w(P.roughnessMap.channel),anisotropyMapUv:Ct&&w(P.anisotropyMap.channel),clearcoatMapUv:Ft&&w(P.clearcoatMap.channel),clearcoatNormalMapUv:ce&&w(P.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&w(P.clearcoatRoughnessMap.channel),iridescenceMapUv:Gt&&w(P.iridescenceMap.channel),iridescenceThicknessMapUv:Jt&&w(P.iridescenceThicknessMap.channel),sheenColorMapUv:Qt&&w(P.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&w(P.sheenRoughnessMap.channel),specularMapUv:fe&&w(P.specularMap.channel),specularColorMapUv:ee&&w(P.specularColorMap.channel),specularIntensityMapUv:ye&&w(P.specularIntensityMap.channel),transmissionMapUv:W&&w(P.transmissionMap.channel),thicknessMapUv:Pt&&w(P.thicknessMap.channel),alphaMapUv:ft&&w(P.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Et||A),vertexColors:P.vertexColors,vertexAlphas:P.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!j.attributes.uv&&(Mt||ft),fog:!!F,useFog:P.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:P.flatShading===!0,sizeAttenuation:P.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:Bt,skinning:H.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:It,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:P.dithering,shadowMapEnabled:s.shadowMap.enabled&&z.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ce,decodeVideoTexture:Mt&&P.map.isVideoTexture===!0&&_e.getTransfer(P.map.colorSpace)===Se,decodeVideoTextureEmissive:Nt&&P.emissiveMap.isVideoTexture===!0&&_e.getTransfer(P.emissiveMap.colorSpace)===Se,premultipliedAlpha:P.premultipliedAlpha,doubleSided:P.side===Ln,flipSided:P.side===dn,useDepthPacking:P.depthPacking>=0,depthPacking:P.depthPacking||0,index0AttributeName:P.index0AttributeName,extensionClipCullDistance:ie&&P.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&P.extensions.multiDraw===!0||lt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:P.customProgramCacheKey()};return Fe.vertexUv1s=d.has(1),Fe.vertexUv2s=d.has(2),Fe.vertexUv3s=d.has(3),d.clear(),Fe}function _(P){const T=[];if(P.shaderID?T.push(P.shaderID):(T.push(P.customVertexShaderID),T.push(P.customFragmentShaderID)),P.defines!==void 0)for(const z in P.defines)T.push(z),T.push(P.defines[z]);return P.isRawShaderMaterial===!1&&(b(T,P),E(T,P),T.push(s.outputColorSpace)),T.push(P.customProgramCacheKey),T.join()}function b(P,T){P.push(T.precision),P.push(T.outputColorSpace),P.push(T.envMapMode),P.push(T.envMapCubeUVHeight),P.push(T.mapUv),P.push(T.alphaMapUv),P.push(T.lightMapUv),P.push(T.aoMapUv),P.push(T.bumpMapUv),P.push(T.normalMapUv),P.push(T.displacementMapUv),P.push(T.emissiveMapUv),P.push(T.metalnessMapUv),P.push(T.roughnessMapUv),P.push(T.anisotropyMapUv),P.push(T.clearcoatMapUv),P.push(T.clearcoatNormalMapUv),P.push(T.clearcoatRoughnessMapUv),P.push(T.iridescenceMapUv),P.push(T.iridescenceThicknessMapUv),P.push(T.sheenColorMapUv),P.push(T.sheenRoughnessMapUv),P.push(T.specularMapUv),P.push(T.specularColorMapUv),P.push(T.specularIntensityMapUv),P.push(T.transmissionMapUv),P.push(T.thicknessMapUv),P.push(T.combine),P.push(T.fogExp2),P.push(T.sizeAttenuation),P.push(T.morphTargetsCount),P.push(T.morphAttributeCount),P.push(T.numDirLights),P.push(T.numPointLights),P.push(T.numSpotLights),P.push(T.numSpotLightMaps),P.push(T.numHemiLights),P.push(T.numRectAreaLights),P.push(T.numDirLightShadows),P.push(T.numPointLightShadows),P.push(T.numSpotLightShadows),P.push(T.numSpotLightShadowsWithMaps),P.push(T.numLightProbes),P.push(T.shadowMapType),P.push(T.toneMapping),P.push(T.numClippingPlanes),P.push(T.numClipIntersection),P.push(T.depthPacking)}function E(P,T){c.disableAll(),T.supportsVertexTextures&&c.enable(0),T.instancing&&c.enable(1),T.instancingColor&&c.enable(2),T.instancingMorph&&c.enable(3),T.matcap&&c.enable(4),T.envMap&&c.enable(5),T.normalMapObjectSpace&&c.enable(6),T.normalMapTangentSpace&&c.enable(7),T.clearcoat&&c.enable(8),T.iridescence&&c.enable(9),T.alphaTest&&c.enable(10),T.vertexColors&&c.enable(11),T.vertexAlphas&&c.enable(12),T.vertexUv1s&&c.enable(13),T.vertexUv2s&&c.enable(14),T.vertexUv3s&&c.enable(15),T.vertexTangents&&c.enable(16),T.anisotropy&&c.enable(17),T.alphaHash&&c.enable(18),T.batching&&c.enable(19),T.dispersion&&c.enable(20),T.batchingColor&&c.enable(21),P.push(c.mask),c.disableAll(),T.fog&&c.enable(0),T.useFog&&c.enable(1),T.flatShading&&c.enable(2),T.logarithmicDepthBuffer&&c.enable(3),T.reverseDepthBuffer&&c.enable(4),T.skinning&&c.enable(5),T.morphTargets&&c.enable(6),T.morphNormals&&c.enable(7),T.morphColors&&c.enable(8),T.premultipliedAlpha&&c.enable(9),T.shadowMapEnabled&&c.enable(10),T.doubleSided&&c.enable(11),T.flipSided&&c.enable(12),T.useDepthPacking&&c.enable(13),T.dithering&&c.enable(14),T.transmission&&c.enable(15),T.sheen&&c.enable(16),T.opaque&&c.enable(17),T.pointsUvs&&c.enable(18),T.decodeVideoTexture&&c.enable(19),T.decodeVideoTextureEmissive&&c.enable(20),T.alphaToCoverage&&c.enable(21),P.push(c.mask)}function S(P){const T=M[P.type];let z;if(T){const G=Hn[T];z=Bp.clone(G.uniforms)}else z=P.uniforms;return z}function U(P,T){let z;for(let G=0,H=m.length;G<H;G++){const F=m[G];if(F.cacheKey===T){z=F,++z.usedTimes;break}}return z===void 0&&(z=new Qv(s,T,P,a),m.push(z)),z}function N(P){if(--P.usedTimes===0){const T=m.indexOf(P);m[T]=m[m.length-1],m.pop(),P.destroy()}}function D(P){u.remove(P)}function O(){u.dispose()}return{getParameters:x,getProgramCacheKey:_,getUniforms:S,acquireProgram:U,releaseProgram:N,releaseShaderCache:D,programs:m,dispose:O}}function s0(){let s=new WeakMap;function t(l){return s.has(l)}function e(l){let c=s.get(l);return c===void 0&&(c={},s.set(l,c)),c}function i(l){s.delete(l)}function o(l,c,u){s.get(l)[c]=u}function a(){s=new WeakMap}return{has:t,get:e,remove:i,update:o,dispose:a}}function o0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function au(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function lu(){const s=[];let t=0;const e=[],i=[],o=[];function a(){t=0,e.length=0,i.length=0,o.length=0}function l(p,g,v,M,w,x){let _=s[t];return _===void 0?(_={id:p.id,object:p,geometry:g,material:v,groupOrder:M,renderOrder:p.renderOrder,z:w,group:x},s[t]=_):(_.id=p.id,_.object=p,_.geometry=g,_.material=v,_.groupOrder=M,_.renderOrder=p.renderOrder,_.z=w,_.group=x),t++,_}function c(p,g,v,M,w,x){const _=l(p,g,v,M,w,x);v.transmission>0?i.push(_):v.transparent===!0?o.push(_):e.push(_)}function u(p,g,v,M,w,x){const _=l(p,g,v,M,w,x);v.transmission>0?i.unshift(_):v.transparent===!0?o.unshift(_):e.unshift(_)}function d(p,g){e.length>1&&e.sort(p||o0),i.length>1&&i.sort(g||au),o.length>1&&o.sort(g||au)}function m(){for(let p=t,g=s.length;p<g;p++){const v=s[p];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:e,transmissive:i,transparent:o,init:a,push:c,unshift:u,finish:m,sort:d}}function r0(){let s=new WeakMap;function t(i,o){const a=s.get(i);let l;return a===void 0?(l=new lu,s.set(i,[l])):o>=a.length?(l=new lu,a.push(l)):l=a[o],l}function e(){s=new WeakMap}return{get:t,dispose:e}}function a0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new pe};break;case"SpotLight":e={position:new V,direction:new V,color:new pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new pe,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new pe,groundColor:new pe};break;case"RectAreaLight":e={color:new pe,position:new V,halfWidth:new V,halfHeight:new V};break}return s[t.id]=e,e}}}function l0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let c0=0;function h0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function u0(s){const t=new a0,e=l0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new V);const o=new V,a=new Pe,l=new Pe;function c(d){let m=0,p=0,g=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let v=0,M=0,w=0,x=0,_=0,b=0,E=0,S=0,U=0,N=0,D=0;d.sort(h0);for(let P=0,T=d.length;P<T;P++){const z=d[P],G=z.color,H=z.intensity,F=z.distance,j=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)m+=G.r*H,p+=G.g*H,g+=G.b*H;else if(z.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(z.sh.coefficients[Y],H);D++}else if(z.isDirectionalLight){const Y=t.get(z);if(Y.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const ct=z.shadow,Z=e.get(z);Z.shadowIntensity=ct.intensity,Z.shadowBias=ct.bias,Z.shadowNormalBias=ct.normalBias,Z.shadowRadius=ct.radius,Z.shadowMapSize=ct.mapSize,i.directionalShadow[v]=Z,i.directionalShadowMap[v]=j,i.directionalShadowMatrix[v]=z.shadow.matrix,b++}i.directional[v]=Y,v++}else if(z.isSpotLight){const Y=t.get(z);Y.position.setFromMatrixPosition(z.matrixWorld),Y.color.copy(G).multiplyScalar(H),Y.distance=F,Y.coneCos=Math.cos(z.angle),Y.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),Y.decay=z.decay,i.spot[w]=Y;const ct=z.shadow;if(z.map&&(i.spotLightMap[U]=z.map,U++,ct.updateMatrices(z),z.castShadow&&N++),i.spotLightMatrix[w]=ct.matrix,z.castShadow){const Z=e.get(z);Z.shadowIntensity=ct.intensity,Z.shadowBias=ct.bias,Z.shadowNormalBias=ct.normalBias,Z.shadowRadius=ct.radius,Z.shadowMapSize=ct.mapSize,i.spotShadow[w]=Z,i.spotShadowMap[w]=j,S++}w++}else if(z.isRectAreaLight){const Y=t.get(z);Y.color.copy(G).multiplyScalar(H),Y.halfWidth.set(z.width*.5,0,0),Y.halfHeight.set(0,z.height*.5,0),i.rectArea[x]=Y,x++}else if(z.isPointLight){const Y=t.get(z);if(Y.color.copy(z.color).multiplyScalar(z.intensity),Y.distance=z.distance,Y.decay=z.decay,z.castShadow){const ct=z.shadow,Z=e.get(z);Z.shadowIntensity=ct.intensity,Z.shadowBias=ct.bias,Z.shadowNormalBias=ct.normalBias,Z.shadowRadius=ct.radius,Z.shadowMapSize=ct.mapSize,Z.shadowCameraNear=ct.camera.near,Z.shadowCameraFar=ct.camera.far,i.pointShadow[M]=Z,i.pointShadowMap[M]=j,i.pointShadowMatrix[M]=z.shadow.matrix,E++}i.point[M]=Y,M++}else if(z.isHemisphereLight){const Y=t.get(z);Y.skyColor.copy(z.color).multiplyScalar(H),Y.groundColor.copy(z.groundColor).multiplyScalar(H),i.hemi[_]=Y,_++}}x>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Lt.LTC_FLOAT_1,i.rectAreaLTC2=Lt.LTC_FLOAT_2):(i.rectAreaLTC1=Lt.LTC_HALF_1,i.rectAreaLTC2=Lt.LTC_HALF_2)),i.ambient[0]=m,i.ambient[1]=p,i.ambient[2]=g;const O=i.hash;(O.directionalLength!==v||O.pointLength!==M||O.spotLength!==w||O.rectAreaLength!==x||O.hemiLength!==_||O.numDirectionalShadows!==b||O.numPointShadows!==E||O.numSpotShadows!==S||O.numSpotMaps!==U||O.numLightProbes!==D)&&(i.directional.length=v,i.spot.length=w,i.rectArea.length=x,i.point.length=M,i.hemi.length=_,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=S+U-N,i.spotLightMap.length=U,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=D,O.directionalLength=v,O.pointLength=M,O.spotLength=w,O.rectAreaLength=x,O.hemiLength=_,O.numDirectionalShadows=b,O.numPointShadows=E,O.numSpotShadows=S,O.numSpotMaps=U,O.numLightProbes=D,i.version=c0++)}function u(d,m){let p=0,g=0,v=0,M=0,w=0;const x=m.matrixWorldInverse;for(let _=0,b=d.length;_<b;_++){const E=d[_];if(E.isDirectionalLight){const S=i.directional[p];S.direction.setFromMatrixPosition(E.matrixWorld),o.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(o),S.direction.transformDirection(x),p++}else if(E.isSpotLight){const S=i.spot[v];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(x),S.direction.setFromMatrixPosition(E.matrixWorld),o.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(o),S.direction.transformDirection(x),v++}else if(E.isRectAreaLight){const S=i.rectArea[M];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(x),l.identity(),a.copy(E.matrixWorld),a.premultiply(x),l.extractRotation(a),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(l),S.halfHeight.applyMatrix4(l),M++}else if(E.isPointLight){const S=i.point[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(x),g++}else if(E.isHemisphereLight){const S=i.hemi[w];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(x),w++}}}return{setup:c,setupView:u,state:i}}function cu(s){const t=new u0(s),e=[],i=[];function o(m){d.camera=m,e.length=0,i.length=0}function a(m){e.push(m)}function l(m){i.push(m)}function c(){t.setup(e)}function u(m){t.setupView(e,m)}const d={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:o,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:l}}function d0(s){let t=new WeakMap;function e(o,a=0){const l=t.get(o);let c;return l===void 0?(c=new cu(s),t.set(o,[c])):a>=l.length?(c=new cu(s),l.push(c)):c=l[a],c}function i(){t=new WeakMap}return{get:e,dispose:i}}class f0 extends Zs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=lp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class p0 extends Zs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const m0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function g0(s,t,e){let i=new mc;const o=new bt,a=new bt,l=new De,c=new f0({depthPacking:cp}),u=new p0,d={},m=e.maxTextureSize,p={[Ai]:dn,[dn]:Ai,[Ln]:Ln},g=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:m0,fragmentShader:_0}),v=g.clone();v.defines.HORIZONTAL_PASS=1;const M=new Qe;M.setAttribute("position",new Nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new _t(M,g),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zu;let _=this.type;this.render=function(N,D,O){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||N.length===0)return;const P=s.getRenderTarget(),T=s.getActiveCubeFace(),z=s.getActiveMipmapLevel(),G=s.state;G.setBlending(bi),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const H=_!==ni&&this.type===ni,F=_===ni&&this.type!==ni;for(let j=0,Y=N.length;j<Y;j++){const ct=N[j],Z=ct.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",ct,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;o.copy(Z.mapSize);const xt=Z.getFrameExtents();if(o.multiply(xt),a.copy(Z.mapSize),(o.x>m||o.y>m)&&(o.x>m&&(a.x=Math.floor(m/xt.x),o.x=a.x*xt.x,Z.mapSize.x=a.x),o.y>m&&(a.y=Math.floor(m/xt.y),o.y=a.y*xt.y,Z.mapSize.y=a.y)),Z.map===null||H===!0||F===!0){const gt=this.type!==ni?{minFilter:Dn,magFilter:Dn}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Ji(o.x,o.y,gt),Z.map.texture.name=ct.name+".shadowMap",Z.camera.updateProjectionMatrix()}s.setRenderTarget(Z.map),s.clear();const st=Z.getViewportCount();for(let gt=0;gt<st;gt++){const It=Z.getViewport(gt);l.set(a.x*It.x,a.y*It.y,a.x*It.z,a.y*It.w),G.viewport(l),Z.updateMatrices(ct,gt),i=Z.getFrustum(),S(D,O,Z.camera,ct,this.type)}Z.isPointLightShadow!==!0&&this.type===ni&&b(Z,O),Z.needsUpdate=!1}_=this.type,x.needsUpdate=!1,s.setRenderTarget(P,T,z)};function b(N,D){const O=t.update(w);g.defines.VSM_SAMPLES!==N.blurSamples&&(g.defines.VSM_SAMPLES=N.blurSamples,v.defines.VSM_SAMPLES=N.blurSamples,g.needsUpdate=!0,v.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new Ji(o.x,o.y)),g.uniforms.shadow_pass.value=N.map.texture,g.uniforms.resolution.value=N.mapSize,g.uniforms.radius.value=N.radius,s.setRenderTarget(N.mapPass),s.clear(),s.renderBufferDirect(D,null,O,g,w,null),v.uniforms.shadow_pass.value=N.mapPass.texture,v.uniforms.resolution.value=N.mapSize,v.uniforms.radius.value=N.radius,s.setRenderTarget(N.map),s.clear(),s.renderBufferDirect(D,null,O,v,w,null)}function E(N,D,O,P){let T=null;const z=O.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(z!==void 0)T=z;else if(T=O.isPointLight===!0?u:c,s.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const G=T.uuid,H=D.uuid;let F=d[G];F===void 0&&(F={},d[G]=F);let j=F[H];j===void 0&&(j=T.clone(),F[H]=j,D.addEventListener("dispose",U)),T=j}if(T.visible=D.visible,T.wireframe=D.wireframe,P===ni?T.side=D.shadowSide!==null?D.shadowSide:D.side:T.side=D.shadowSide!==null?D.shadowSide:p[D.side],T.alphaMap=D.alphaMap,T.alphaTest=D.alphaTest,T.map=D.map,T.clipShadows=D.clipShadows,T.clippingPlanes=D.clippingPlanes,T.clipIntersection=D.clipIntersection,T.displacementMap=D.displacementMap,T.displacementScale=D.displacementScale,T.displacementBias=D.displacementBias,T.wireframeLinewidth=D.wireframeLinewidth,T.linewidth=D.linewidth,O.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const G=s.properties.get(T);G.light=O}return T}function S(N,D,O,P,T){if(N.visible===!1)return;if(N.layers.test(D.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&T===ni)&&(!N.frustumCulled||i.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,N.matrixWorld);const H=t.update(N),F=N.material;if(Array.isArray(F)){const j=H.groups;for(let Y=0,ct=j.length;Y<ct;Y++){const Z=j[Y],xt=F[Z.materialIndex];if(xt&&xt.visible){const st=E(N,xt,P,T);N.onBeforeShadow(s,N,D,O,H,st,Z),s.renderBufferDirect(O,null,H,st,N,Z),N.onAfterShadow(s,N,D,O,H,st,Z)}}}else if(F.visible){const j=E(N,F,P,T);N.onBeforeShadow(s,N,D,O,H,j,null),s.renderBufferDirect(O,null,H,j,N,null),N.onAfterShadow(s,N,D,O,H,j,null)}}const G=N.children;for(let H=0,F=G.length;H<F;H++)S(G[H],D,O,P,T)}function U(N){N.target.removeEventListener("dispose",U);for(const O in d){const P=d[O],T=N.target.uuid;T in P&&(P[T].dispose(),delete P[T])}}}const v0={[pl]:ml,[_l]:xl,[gl]:yl,[zs]:vl,[ml]:pl,[xl]:_l,[yl]:gl,[vl]:zs};function x0(s,t){function e(){let W=!1;const Pt=new De;let it=null;const ft=new De(0,0,0,0);return{setMask:function(zt){it!==zt&&!W&&(s.colorMask(zt,zt,zt,zt),it=zt)},setLocked:function(zt){W=zt},setClear:function(zt,Ut,ie,Ce,Fe){Fe===!0&&(zt*=Ce,Ut*=Ce,ie*=Ce),Pt.set(zt,Ut,ie,Ce),ft.equals(Pt)===!1&&(s.clearColor(zt,Ut,ie,Ce),ft.copy(Pt))},reset:function(){W=!1,it=null,ft.set(-1,0,0,0)}}}function i(){let W=!1,Pt=!1,it=null,ft=null,zt=null;return{setReversed:function(Ut){if(Pt!==Ut){const ie=t.get("EXT_clip_control");Pt?ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.ZERO_TO_ONE_EXT):ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.NEGATIVE_ONE_TO_ONE_EXT);const Ce=zt;zt=null,this.setClear(Ce)}Pt=Ut},getReversed:function(){return Pt},setTest:function(Ut){Ut?vt(s.DEPTH_TEST):Bt(s.DEPTH_TEST)},setMask:function(Ut){it!==Ut&&!W&&(s.depthMask(Ut),it=Ut)},setFunc:function(Ut){if(Pt&&(Ut=v0[Ut]),ft!==Ut){switch(Ut){case pl:s.depthFunc(s.NEVER);break;case ml:s.depthFunc(s.ALWAYS);break;case _l:s.depthFunc(s.LESS);break;case zs:s.depthFunc(s.LEQUAL);break;case gl:s.depthFunc(s.EQUAL);break;case vl:s.depthFunc(s.GEQUAL);break;case xl:s.depthFunc(s.GREATER);break;case yl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ft=Ut}},setLocked:function(Ut){W=Ut},setClear:function(Ut){zt!==Ut&&(Pt&&(Ut=1-Ut),s.clearDepth(Ut),zt=Ut)},reset:function(){W=!1,it=null,ft=null,zt=null,Pt=!1}}}function o(){let W=!1,Pt=null,it=null,ft=null,zt=null,Ut=null,ie=null,Ce=null,Fe=null;return{setTest:function(ge){W||(ge?vt(s.STENCIL_TEST):Bt(s.STENCIL_TEST))},setMask:function(ge){Pt!==ge&&!W&&(s.stencilMask(ge),Pt=ge)},setFunc:function(ge,tn,wn){(it!==ge||ft!==tn||zt!==wn)&&(s.stencilFunc(ge,tn,wn),it=ge,ft=tn,zt=wn)},setOp:function(ge,tn,wn){(Ut!==ge||ie!==tn||Ce!==wn)&&(s.stencilOp(ge,tn,wn),Ut=ge,ie=tn,Ce=wn)},setLocked:function(ge){W=ge},setClear:function(ge){Fe!==ge&&(s.clearStencil(ge),Fe=ge)},reset:function(){W=!1,Pt=null,it=null,ft=null,zt=null,Ut=null,ie=null,Ce=null,Fe=null}}}const a=new e,l=new i,c=new o,u=new WeakMap,d=new WeakMap;let m={},p={},g=new WeakMap,v=[],M=null,w=!1,x=null,_=null,b=null,E=null,S=null,U=null,N=null,D=new pe(0,0,0),O=0,P=!1,T=null,z=null,G=null,H=null,F=null;const j=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,ct=0;const Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?(ct=parseFloat(/^WebGL (\d)/.exec(Z)[1]),Y=ct>=1):Z.indexOf("OpenGL ES")!==-1&&(ct=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),Y=ct>=2);let xt=null,st={};const gt=s.getParameter(s.SCISSOR_BOX),It=s.getParameter(s.VIEWPORT),Dt=new De().fromArray(gt),Q=new De().fromArray(It);function rt(W,Pt,it,ft){const zt=new Uint8Array(4),Ut=s.createTexture();s.bindTexture(W,Ut),s.texParameteri(W,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(W,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ie=0;ie<it;ie++)W===s.TEXTURE_3D||W===s.TEXTURE_2D_ARRAY?s.texImage3D(Pt,0,s.RGBA,1,1,ft,0,s.RGBA,s.UNSIGNED_BYTE,zt):s.texImage2D(Pt+ie,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,zt);return Ut}const pt={};pt[s.TEXTURE_2D]=rt(s.TEXTURE_2D,s.TEXTURE_2D,1),pt[s.TEXTURE_CUBE_MAP]=rt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),pt[s.TEXTURE_2D_ARRAY]=rt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),pt[s.TEXTURE_3D]=rt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),vt(s.DEPTH_TEST),l.setFunc(zs),ht(!1),Et(ph),vt(s.CULL_FACE),k(bi);function vt(W){m[W]!==!0&&(s.enable(W),m[W]=!0)}function Bt(W){m[W]!==!1&&(s.disable(W),m[W]=!1)}function jt(W,Pt){return p[W]!==Pt?(s.bindFramebuffer(W,Pt),p[W]=Pt,W===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=Pt),W===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=Pt),!0):!1}function lt(W,Pt){let it=v,ft=!1;if(W){it=g.get(Pt),it===void 0&&(it=[],g.set(Pt,it));const zt=W.textures;if(it.length!==zt.length||it[0]!==s.COLOR_ATTACHMENT0){for(let Ut=0,ie=zt.length;Ut<ie;Ut++)it[Ut]=s.COLOR_ATTACHMENT0+Ut;it.length=zt.length,ft=!0}}else it[0]!==s.BACK&&(it[0]=s.BACK,ft=!0);ft&&s.drawBuffers(it)}function Mt(W){return M!==W?(s.useProgram(W),M=W,!0):!1}const J={[qi]:s.FUNC_ADD,[Uf]:s.FUNC_SUBTRACT,[Of]:s.FUNC_REVERSE_SUBTRACT};J[zf]=s.MIN,J[kf]=s.MAX;const ut={[Ff]:s.ZERO,[Bf]:s.ONE,[Hf]:s.SRC_COLOR,[dl]:s.SRC_ALPHA,[qf]:s.SRC_ALPHA_SATURATE,[Zf]:s.DST_COLOR,[Gf]:s.DST_ALPHA,[Vf]:s.ONE_MINUS_SRC_COLOR,[fl]:s.ONE_MINUS_SRC_ALPHA,[Xf]:s.ONE_MINUS_DST_COLOR,[Wf]:s.ONE_MINUS_DST_ALPHA,[Yf]:s.CONSTANT_COLOR,[$f]:s.ONE_MINUS_CONSTANT_COLOR,[Kf]:s.CONSTANT_ALPHA,[jf]:s.ONE_MINUS_CONSTANT_ALPHA};function k(W,Pt,it,ft,zt,Ut,ie,Ce,Fe,ge){if(W===bi){w===!0&&(Bt(s.BLEND),w=!1);return}if(w===!1&&(vt(s.BLEND),w=!0),W!==Nf){if(W!==x||ge!==P){if((_!==qi||S!==qi)&&(s.blendEquation(s.FUNC_ADD),_=qi,S=qi),ge)switch(W){case Ns:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mh:s.blendFunc(s.ONE,s.ONE);break;case _h:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gh:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case Ns:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mh:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case _h:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gh:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}b=null,E=null,U=null,N=null,D.set(0,0,0),O=0,x=W,P=ge}return}zt=zt||Pt,Ut=Ut||it,ie=ie||ft,(Pt!==_||zt!==S)&&(s.blendEquationSeparate(J[Pt],J[zt]),_=Pt,S=zt),(it!==b||ft!==E||Ut!==U||ie!==N)&&(s.blendFuncSeparate(ut[it],ut[ft],ut[Ut],ut[ie]),b=it,E=ft,U=Ut,N=ie),(Ce.equals(D)===!1||Fe!==O)&&(s.blendColor(Ce.r,Ce.g,Ce.b,Fe),D.copy(Ce),O=Fe),x=W,P=!1}function Rt(W,Pt){W.side===Ln?Bt(s.CULL_FACE):vt(s.CULL_FACE);let it=W.side===dn;Pt&&(it=!it),ht(it),W.blending===Ns&&W.transparent===!1?k(bi):k(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),l.setFunc(W.depthFunc),l.setTest(W.depthTest),l.setMask(W.depthWrite),a.setMask(W.colorWrite);const ft=W.stencilWrite;c.setTest(ft),ft&&(c.setMask(W.stencilWriteMask),c.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),c.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Nt(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?vt(s.SAMPLE_ALPHA_TO_COVERAGE):Bt(s.SAMPLE_ALPHA_TO_COVERAGE)}function ht(W){T!==W&&(W?s.frontFace(s.CW):s.frontFace(s.CCW),T=W)}function Et(W){W!==If?(vt(s.CULL_FACE),W!==z&&(W===ph?s.cullFace(s.BACK):W===Df?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Bt(s.CULL_FACE),z=W}function wt(W){W!==G&&(Y&&s.lineWidth(W),G=W)}function Nt(W,Pt,it){W?(vt(s.POLYGON_OFFSET_FILL),(H!==Pt||F!==it)&&(s.polygonOffset(Pt,it),H=Pt,F=it)):Bt(s.POLYGON_OFFSET_FILL)}function At(W){W?vt(s.SCISSOR_TEST):Bt(s.SCISSOR_TEST)}function I(W){W===void 0&&(W=s.TEXTURE0+j-1),xt!==W&&(s.activeTexture(W),xt=W)}function A(W,Pt,it){it===void 0&&(xt===null?it=s.TEXTURE0+j-1:it=xt);let ft=st[it];ft===void 0&&(ft={type:void 0,texture:void 0},st[it]=ft),(ft.type!==W||ft.texture!==Pt)&&(xt!==it&&(s.activeTexture(it),xt=it),s.bindTexture(W,Pt||pt[W]),ft.type=W,ft.texture=Pt)}function $(){const W=st[xt];W!==void 0&&W.type!==void 0&&(s.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function ot(){try{s.compressedTexImage2D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function dt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function at(){try{s.texSubImage2D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Vt(){try{s.texSubImage3D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ct(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ft(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ce(){try{s.texStorage2D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function yt(){try{s.texStorage3D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Gt(){try{s.texImage2D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Jt(){try{s.texImage3D.apply(s,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Qt(W){Dt.equals(W)===!1&&(s.scissor(W.x,W.y,W.z,W.w),Dt.copy(W))}function Ht(W){Q.equals(W)===!1&&(s.viewport(W.x,W.y,W.z,W.w),Q.copy(W))}function fe(W,Pt){let it=d.get(Pt);it===void 0&&(it=new WeakMap,d.set(Pt,it));let ft=it.get(W);ft===void 0&&(ft=s.getUniformBlockIndex(Pt,W.name),it.set(W,ft))}function ee(W,Pt){const ft=d.get(Pt).get(W);u.get(Pt)!==ft&&(s.uniformBlockBinding(Pt,ft,W.__bindingPointIndex),u.set(Pt,ft))}function ye(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),l.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),m={},xt=null,st={},p={},g=new WeakMap,v=[],M=null,w=!1,x=null,_=null,b=null,E=null,S=null,U=null,N=null,D=new pe(0,0,0),O=0,P=!1,T=null,z=null,G=null,H=null,F=null,Dt.set(0,0,s.canvas.width,s.canvas.height),Q.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:vt,disable:Bt,bindFramebuffer:jt,drawBuffers:lt,useProgram:Mt,setBlending:k,setMaterial:Rt,setFlipSided:ht,setCullFace:Et,setLineWidth:wt,setPolygonOffset:Nt,setScissorTest:At,activeTexture:I,bindTexture:A,unbindTexture:$,compressedTexImage2D:ot,compressedTexImage3D:dt,texImage2D:Gt,texImage3D:Jt,updateUBOMapping:fe,uniformBlockBinding:ee,texStorage2D:ce,texStorage3D:yt,texSubImage2D:at,texSubImage3D:Vt,compressedTexSubImage2D:Ct,compressedTexSubImage3D:Ft,scissor:Qt,viewport:Ht,reset:ye}}function hu(s,t,e,i){const o=y0(i);switch(e){case Ju:return s*t;case td:return s*t;case ed:return s*t*2;case nd:return s*t/o.components*o.byteLength;case uc:return s*t/o.components*o.byteLength;case id:return s*t*2/o.components*o.byteLength;case dc:return s*t*2/o.components*o.byteLength;case Qu:return s*t*3/o.components*o.byteLength;case Rn:return s*t*4/o.components*o.byteLength;case fc:return s*t*4/o.components*o.byteLength;case Lr:case Rr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ir:case Dr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Tl:case Cl:return Math.max(s,16)*Math.max(t,8)/4;case bl:case Al:return Math.max(s,8)*Math.max(t,8)/2;case Pl:case Ll:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Rl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Il:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Dl:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Nl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ul:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ol:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case zl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case kl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Fl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Bl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Hl:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Vl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Gl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Wl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Zl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Nr:case Xl:case ql:return Math.ceil(s/4)*Math.ceil(t/4)*16;case sd:case Yl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case $l:case Kl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function y0(s){switch(s){case ui:case $u:return{byteLength:1,components:1};case bo:case Ku:case Lo:return{byteLength:2,components:1};case cc:case hc:return{byteLength:2,components:4};case ji:case lc:case si:return{byteLength:4,components:1};case ju:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function M0(s,t,e,i,o,a,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new bt,m=new WeakMap;let p;const g=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(I,A){return v?new OffscreenCanvas(I,A):zr("canvas")}function w(I,A,$){let ot=1;const dt=At(I);if((dt.width>$||dt.height>$)&&(ot=$/Math.max(dt.width,dt.height)),ot<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const at=Math.floor(ot*dt.width),Vt=Math.floor(ot*dt.height);p===void 0&&(p=M(at,Vt));const Ct=A?M(at,Vt):p;return Ct.width=at,Ct.height=Vt,Ct.getContext("2d").drawImage(I,0,0,at,Vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+dt.width+"x"+dt.height+") to ("+at+"x"+Vt+")."),Ct}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+dt.width+"x"+dt.height+")."),I;return I}function x(I){return I.generateMipmaps}function _(I){s.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function E(I,A,$,ot,dt=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let at=A;if(A===s.RED&&($===s.FLOAT&&(at=s.R32F),$===s.HALF_FLOAT&&(at=s.R16F),$===s.UNSIGNED_BYTE&&(at=s.R8)),A===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(at=s.R8UI),$===s.UNSIGNED_SHORT&&(at=s.R16UI),$===s.UNSIGNED_INT&&(at=s.R32UI),$===s.BYTE&&(at=s.R8I),$===s.SHORT&&(at=s.R16I),$===s.INT&&(at=s.R32I)),A===s.RG&&($===s.FLOAT&&(at=s.RG32F),$===s.HALF_FLOAT&&(at=s.RG16F),$===s.UNSIGNED_BYTE&&(at=s.RG8)),A===s.RG_INTEGER&&($===s.UNSIGNED_BYTE&&(at=s.RG8UI),$===s.UNSIGNED_SHORT&&(at=s.RG16UI),$===s.UNSIGNED_INT&&(at=s.RG32UI),$===s.BYTE&&(at=s.RG8I),$===s.SHORT&&(at=s.RG16I),$===s.INT&&(at=s.RG32I)),A===s.RGB_INTEGER&&($===s.UNSIGNED_BYTE&&(at=s.RGB8UI),$===s.UNSIGNED_SHORT&&(at=s.RGB16UI),$===s.UNSIGNED_INT&&(at=s.RGB32UI),$===s.BYTE&&(at=s.RGB8I),$===s.SHORT&&(at=s.RGB16I),$===s.INT&&(at=s.RGB32I)),A===s.RGBA_INTEGER&&($===s.UNSIGNED_BYTE&&(at=s.RGBA8UI),$===s.UNSIGNED_SHORT&&(at=s.RGBA16UI),$===s.UNSIGNED_INT&&(at=s.RGBA32UI),$===s.BYTE&&(at=s.RGBA8I),$===s.SHORT&&(at=s.RGBA16I),$===s.INT&&(at=s.RGBA32I)),A===s.RGB&&$===s.UNSIGNED_INT_5_9_9_9_REV&&(at=s.RGB9_E5),A===s.RGBA){const Vt=dt?Gr:_e.getTransfer(ot);$===s.FLOAT&&(at=s.RGBA32F),$===s.HALF_FLOAT&&(at=s.RGBA16F),$===s.UNSIGNED_BYTE&&(at=Vt===Se?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT_4_4_4_4&&(at=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(at=s.RGB5_A1)}return(at===s.R16F||at===s.R32F||at===s.RG16F||at===s.RG32F||at===s.RGBA16F||at===s.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function S(I,A){let $;return I?A===null||A===ji||A===Bs?$=s.DEPTH24_STENCIL8:A===si?$=s.DEPTH32F_STENCIL8:A===bo&&($=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===ji||A===Bs?$=s.DEPTH_COMPONENT24:A===si?$=s.DEPTH_COMPONENT32F:A===bo&&($=s.DEPTH_COMPONENT16),$}function U(I,A){return x(I)===!0||I.isFramebufferTexture&&I.minFilter!==Dn&&I.minFilter!==Gn?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function N(I){const A=I.target;A.removeEventListener("dispose",N),O(A),A.isVideoTexture&&m.delete(A)}function D(I){const A=I.target;A.removeEventListener("dispose",D),T(A)}function O(I){const A=i.get(I);if(A.__webglInit===void 0)return;const $=I.source,ot=g.get($);if(ot){const dt=ot[A.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&P(I),Object.keys(ot).length===0&&g.delete($)}i.remove(I)}function P(I){const A=i.get(I);s.deleteTexture(A.__webglTexture);const $=I.source,ot=g.get($);delete ot[A.__cacheKey],l.memory.textures--}function T(I){const A=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(A.__webglFramebuffer[ot]))for(let dt=0;dt<A.__webglFramebuffer[ot].length;dt++)s.deleteFramebuffer(A.__webglFramebuffer[ot][dt]);else s.deleteFramebuffer(A.__webglFramebuffer[ot]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[ot])}else{if(Array.isArray(A.__webglFramebuffer))for(let ot=0;ot<A.__webglFramebuffer.length;ot++)s.deleteFramebuffer(A.__webglFramebuffer[ot]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let ot=0;ot<A.__webglColorRenderbuffer.length;ot++)A.__webglColorRenderbuffer[ot]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[ot]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const $=I.textures;for(let ot=0,dt=$.length;ot<dt;ot++){const at=i.get($[ot]);at.__webglTexture&&(s.deleteTexture(at.__webglTexture),l.memory.textures--),i.remove($[ot])}i.remove(I)}let z=0;function G(){z=0}function H(){const I=z;return I>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+o.maxTextures),z+=1,I}function F(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function j(I,A){const $=i.get(I);if(I.isVideoTexture&&wt(I),I.isRenderTargetTexture===!1&&I.version>0&&$.__version!==I.version){const ot=I.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q($,I,A);return}}e.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+A)}function Y(I,A){const $=i.get(I);if(I.version>0&&$.__version!==I.version){Q($,I,A);return}e.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+A)}function ct(I,A){const $=i.get(I);if(I.version>0&&$.__version!==I.version){Q($,I,A);return}e.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+A)}function Z(I,A){const $=i.get(I);if(I.version>0&&$.__version!==I.version){rt($,I,A);return}e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+A)}const xt={[wl]:s.REPEAT,[$i]:s.CLAMP_TO_EDGE,[El]:s.MIRRORED_REPEAT},st={[Dn]:s.NEAREST,[ap]:s.NEAREST_MIPMAP_NEAREST,[Ko]:s.NEAREST_MIPMAP_LINEAR,[Gn]:s.LINEAR,[va]:s.LINEAR_MIPMAP_NEAREST,[Ki]:s.LINEAR_MIPMAP_LINEAR},gt={[up]:s.NEVER,[gp]:s.ALWAYS,[dp]:s.LESS,[rd]:s.LEQUAL,[fp]:s.EQUAL,[_p]:s.GEQUAL,[pp]:s.GREATER,[mp]:s.NOTEQUAL};function It(I,A){if(A.type===si&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===Gn||A.magFilter===va||A.magFilter===Ko||A.magFilter===Ki||A.minFilter===Gn||A.minFilter===va||A.minFilter===Ko||A.minFilter===Ki)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,xt[A.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,xt[A.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,xt[A.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,st[A.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,st[A.minFilter]),A.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,gt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Dn||A.minFilter!==Ko&&A.minFilter!==Ki||A.type===si&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){const $=t.get("EXT_texture_filter_anisotropic");s.texParameterf(I,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,o.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function Dt(I,A){let $=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",N));const ot=A.source;let dt=g.get(ot);dt===void 0&&(dt={},g.set(ot,dt));const at=F(A);if(at!==I.__cacheKey){dt[at]===void 0&&(dt[at]={texture:s.createTexture(),usedTimes:0},l.memory.textures++,$=!0),dt[at].usedTimes++;const Vt=dt[I.__cacheKey];Vt!==void 0&&(dt[I.__cacheKey].usedTimes--,Vt.usedTimes===0&&P(A)),I.__cacheKey=at,I.__webglTexture=dt[at].texture}return $}function Q(I,A,$){let ot=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ot=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ot=s.TEXTURE_3D);const dt=Dt(I,A),at=A.source;e.bindTexture(ot,I.__webglTexture,s.TEXTURE0+$);const Vt=i.get(at);if(at.version!==Vt.__version||dt===!0){e.activeTexture(s.TEXTURE0+$);const Ct=_e.getPrimaries(_e.workingColorSpace),Ft=A.colorSpace===wi?null:_e.getPrimaries(A.colorSpace),ce=A.colorSpace===wi||Ct===Ft?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);let yt=w(A.image,!1,o.maxTextureSize);yt=Nt(A,yt);const Gt=a.convert(A.format,A.colorSpace),Jt=a.convert(A.type);let Qt=E(A.internalFormat,Gt,Jt,A.colorSpace,A.isVideoTexture);It(ot,A);let Ht;const fe=A.mipmaps,ee=A.isVideoTexture!==!0,ye=Vt.__version===void 0||dt===!0,W=at.dataReady,Pt=U(A,yt);if(A.isDepthTexture)Qt=S(A.format===Hs,A.type),ye&&(ee?e.texStorage2D(s.TEXTURE_2D,1,Qt,yt.width,yt.height):e.texImage2D(s.TEXTURE_2D,0,Qt,yt.width,yt.height,0,Gt,Jt,null));else if(A.isDataTexture)if(fe.length>0){ee&&ye&&e.texStorage2D(s.TEXTURE_2D,Pt,Qt,fe[0].width,fe[0].height);for(let it=0,ft=fe.length;it<ft;it++)Ht=fe[it],ee?W&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,Ht.width,Ht.height,Gt,Jt,Ht.data):e.texImage2D(s.TEXTURE_2D,it,Qt,Ht.width,Ht.height,0,Gt,Jt,Ht.data);A.generateMipmaps=!1}else ee?(ye&&e.texStorage2D(s.TEXTURE_2D,Pt,Qt,yt.width,yt.height),W&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,yt.width,yt.height,Gt,Jt,yt.data)):e.texImage2D(s.TEXTURE_2D,0,Qt,yt.width,yt.height,0,Gt,Jt,yt.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ee&&ye&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Pt,Qt,fe[0].width,fe[0].height,yt.depth);for(let it=0,ft=fe.length;it<ft;it++)if(Ht=fe[it],A.format!==Rn)if(Gt!==null)if(ee){if(W)if(A.layerUpdates.size>0){const zt=hu(Ht.width,Ht.height,A.format,A.type);for(const Ut of A.layerUpdates){const ie=Ht.data.subarray(Ut*zt/Ht.data.BYTES_PER_ELEMENT,(Ut+1)*zt/Ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,Ut,Ht.width,Ht.height,1,Gt,ie)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,Ht.width,Ht.height,yt.depth,Gt,Ht.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,it,Qt,Ht.width,Ht.height,yt.depth,0,Ht.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ee?W&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,Ht.width,Ht.height,yt.depth,Gt,Jt,Ht.data):e.texImage3D(s.TEXTURE_2D_ARRAY,it,Qt,Ht.width,Ht.height,yt.depth,0,Gt,Jt,Ht.data)}else{ee&&ye&&e.texStorage2D(s.TEXTURE_2D,Pt,Qt,fe[0].width,fe[0].height);for(let it=0,ft=fe.length;it<ft;it++)Ht=fe[it],A.format!==Rn?Gt!==null?ee?W&&e.compressedTexSubImage2D(s.TEXTURE_2D,it,0,0,Ht.width,Ht.height,Gt,Ht.data):e.compressedTexImage2D(s.TEXTURE_2D,it,Qt,Ht.width,Ht.height,0,Ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?W&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,Ht.width,Ht.height,Gt,Jt,Ht.data):e.texImage2D(s.TEXTURE_2D,it,Qt,Ht.width,Ht.height,0,Gt,Jt,Ht.data)}else if(A.isDataArrayTexture)if(ee){if(ye&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Pt,Qt,yt.width,yt.height,yt.depth),W)if(A.layerUpdates.size>0){const it=hu(yt.width,yt.height,A.format,A.type);for(const ft of A.layerUpdates){const zt=yt.data.subarray(ft*it/yt.data.BYTES_PER_ELEMENT,(ft+1)*it/yt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ft,yt.width,yt.height,1,Gt,Jt,zt)}A.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,yt.width,yt.height,yt.depth,Gt,Jt,yt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Qt,yt.width,yt.height,yt.depth,0,Gt,Jt,yt.data);else if(A.isData3DTexture)ee?(ye&&e.texStorage3D(s.TEXTURE_3D,Pt,Qt,yt.width,yt.height,yt.depth),W&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,yt.width,yt.height,yt.depth,Gt,Jt,yt.data)):e.texImage3D(s.TEXTURE_3D,0,Qt,yt.width,yt.height,yt.depth,0,Gt,Jt,yt.data);else if(A.isFramebufferTexture){if(ye)if(ee)e.texStorage2D(s.TEXTURE_2D,Pt,Qt,yt.width,yt.height);else{let it=yt.width,ft=yt.height;for(let zt=0;zt<Pt;zt++)e.texImage2D(s.TEXTURE_2D,zt,Qt,it,ft,0,Gt,Jt,null),it>>=1,ft>>=1}}else if(fe.length>0){if(ee&&ye){const it=At(fe[0]);e.texStorage2D(s.TEXTURE_2D,Pt,Qt,it.width,it.height)}for(let it=0,ft=fe.length;it<ft;it++)Ht=fe[it],ee?W&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,Gt,Jt,Ht):e.texImage2D(s.TEXTURE_2D,it,Qt,Gt,Jt,Ht);A.generateMipmaps=!1}else if(ee){if(ye){const it=At(yt);e.texStorage2D(s.TEXTURE_2D,Pt,Qt,it.width,it.height)}W&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Gt,Jt,yt)}else e.texImage2D(s.TEXTURE_2D,0,Qt,Gt,Jt,yt);x(A)&&_(ot),Vt.__version=at.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function rt(I,A,$){if(A.image.length!==6)return;const ot=Dt(I,A),dt=A.source;e.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+$);const at=i.get(dt);if(dt.version!==at.__version||ot===!0){e.activeTexture(s.TEXTURE0+$);const Vt=_e.getPrimaries(_e.workingColorSpace),Ct=A.colorSpace===wi?null:_e.getPrimaries(A.colorSpace),Ft=A.colorSpace===wi||Vt===Ct?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft);const ce=A.isCompressedTexture||A.image[0].isCompressedTexture,yt=A.image[0]&&A.image[0].isDataTexture,Gt=[];for(let ft=0;ft<6;ft++)!ce&&!yt?Gt[ft]=w(A.image[ft],!0,o.maxCubemapSize):Gt[ft]=yt?A.image[ft].image:A.image[ft],Gt[ft]=Nt(A,Gt[ft]);const Jt=Gt[0],Qt=a.convert(A.format,A.colorSpace),Ht=a.convert(A.type),fe=E(A.internalFormat,Qt,Ht,A.colorSpace),ee=A.isVideoTexture!==!0,ye=at.__version===void 0||ot===!0,W=dt.dataReady;let Pt=U(A,Jt);It(s.TEXTURE_CUBE_MAP,A);let it;if(ce){ee&&ye&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Pt,fe,Jt.width,Jt.height);for(let ft=0;ft<6;ft++){it=Gt[ft].mipmaps;for(let zt=0;zt<it.length;zt++){const Ut=it[zt];A.format!==Rn?Qt!==null?ee?W&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,zt,0,0,Ut.width,Ut.height,Qt,Ut.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,zt,fe,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ee?W&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,zt,0,0,Ut.width,Ut.height,Qt,Ht,Ut.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,zt,fe,Ut.width,Ut.height,0,Qt,Ht,Ut.data)}}}else{if(it=A.mipmaps,ee&&ye){it.length>0&&Pt++;const ft=At(Gt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Pt,fe,ft.width,ft.height)}for(let ft=0;ft<6;ft++)if(yt){ee?W&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,Gt[ft].width,Gt[ft].height,Qt,Ht,Gt[ft].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,fe,Gt[ft].width,Gt[ft].height,0,Qt,Ht,Gt[ft].data);for(let zt=0;zt<it.length;zt++){const ie=it[zt].image[ft].image;ee?W&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,zt+1,0,0,ie.width,ie.height,Qt,Ht,ie.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,zt+1,fe,ie.width,ie.height,0,Qt,Ht,ie.data)}}else{ee?W&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,Qt,Ht,Gt[ft]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,fe,Qt,Ht,Gt[ft]);for(let zt=0;zt<it.length;zt++){const Ut=it[zt];ee?W&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,zt+1,0,0,Qt,Ht,Ut.image[ft]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,zt+1,fe,Qt,Ht,Ut.image[ft])}}}x(A)&&_(s.TEXTURE_CUBE_MAP),at.__version=dt.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function pt(I,A,$,ot,dt,at){const Vt=a.convert($.format,$.colorSpace),Ct=a.convert($.type),Ft=E($.internalFormat,Vt,Ct,$.colorSpace),ce=i.get(A),yt=i.get($);if(yt.__renderTarget=A,!ce.__hasExternalTextures){const Gt=Math.max(1,A.width>>at),Jt=Math.max(1,A.height>>at);dt===s.TEXTURE_3D||dt===s.TEXTURE_2D_ARRAY?e.texImage3D(dt,at,Ft,Gt,Jt,A.depth,0,Vt,Ct,null):e.texImage2D(dt,at,Ft,Gt,Jt,0,Vt,Ct,null)}e.bindFramebuffer(s.FRAMEBUFFER,I),Et(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ot,dt,yt.__webglTexture,0,ht(A)):(dt===s.TEXTURE_2D||dt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&dt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ot,dt,yt.__webglTexture,at),e.bindFramebuffer(s.FRAMEBUFFER,null)}function vt(I,A,$){if(s.bindRenderbuffer(s.RENDERBUFFER,I),A.depthBuffer){const ot=A.depthTexture,dt=ot&&ot.isDepthTexture?ot.type:null,at=S(A.stencilBuffer,dt),Vt=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=ht(A);Et(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ct,at,A.width,A.height):$?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ct,at,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,at,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Vt,s.RENDERBUFFER,I)}else{const ot=A.textures;for(let dt=0;dt<ot.length;dt++){const at=ot[dt],Vt=a.convert(at.format,at.colorSpace),Ct=a.convert(at.type),Ft=E(at.internalFormat,Vt,Ct,at.colorSpace),ce=ht(A);$&&Et(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ce,Ft,A.width,A.height):Et(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ce,Ft,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,Ft,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Bt(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ot=i.get(A.depthTexture);ot.__renderTarget=A,(!ot.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),j(A.depthTexture,0);const dt=ot.__webglTexture,at=ht(A);if(A.depthTexture.format===Us)Et(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,dt,0,at):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,dt,0);else if(A.depthTexture.format===Hs)Et(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,dt,0,at):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,dt,0);else throw new Error("Unknown depthTexture format")}function jt(I){const A=i.get(I),$=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){const ot=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),ot){const dt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,ot.removeEventListener("dispose",dt)};ot.addEventListener("dispose",dt),A.__depthDisposeCallback=dt}A.__boundDepthTexture=ot}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Bt(A.__webglFramebuffer,I)}else if($){A.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[ot]),A.__webglDepthbuffer[ot]===void 0)A.__webglDepthbuffer[ot]=s.createRenderbuffer(),vt(A.__webglDepthbuffer[ot],I,!1);else{const dt=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,at=A.__webglDepthbuffer[ot];s.bindRenderbuffer(s.RENDERBUFFER,at),s.framebufferRenderbuffer(s.FRAMEBUFFER,dt,s.RENDERBUFFER,at)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=s.createRenderbuffer(),vt(A.__webglDepthbuffer,I,!1);else{const ot=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=A.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,dt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ot,s.RENDERBUFFER,dt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function lt(I,A,$){const ot=i.get(I);A!==void 0&&pt(ot.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&jt(I)}function Mt(I){const A=I.texture,$=i.get(I),ot=i.get(A);I.addEventListener("dispose",D);const dt=I.textures,at=I.isWebGLCubeRenderTarget===!0,Vt=dt.length>1;if(Vt||(ot.__webglTexture===void 0&&(ot.__webglTexture=s.createTexture()),ot.__version=A.version,l.memory.textures++),at){$.__webglFramebuffer=[];for(let Ct=0;Ct<6;Ct++)if(A.mipmaps&&A.mipmaps.length>0){$.__webglFramebuffer[Ct]=[];for(let Ft=0;Ft<A.mipmaps.length;Ft++)$.__webglFramebuffer[Ct][Ft]=s.createFramebuffer()}else $.__webglFramebuffer[Ct]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){$.__webglFramebuffer=[];for(let Ct=0;Ct<A.mipmaps.length;Ct++)$.__webglFramebuffer[Ct]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if(Vt)for(let Ct=0,Ft=dt.length;Ct<Ft;Ct++){const ce=i.get(dt[Ct]);ce.__webglTexture===void 0&&(ce.__webglTexture=s.createTexture(),l.memory.textures++)}if(I.samples>0&&Et(I)===!1){$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Ct=0;Ct<dt.length;Ct++){const Ft=dt[Ct];$.__webglColorRenderbuffer[Ct]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[Ct]);const ce=a.convert(Ft.format,Ft.colorSpace),yt=a.convert(Ft.type),Gt=E(Ft.internalFormat,ce,yt,Ft.colorSpace,I.isXRRenderTarget===!0),Jt=ht(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Jt,Gt,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.RENDERBUFFER,$.__webglColorRenderbuffer[Ct])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),vt($.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(at){e.bindTexture(s.TEXTURE_CUBE_MAP,ot.__webglTexture),It(s.TEXTURE_CUBE_MAP,A);for(let Ct=0;Ct<6;Ct++)if(A.mipmaps&&A.mipmaps.length>0)for(let Ft=0;Ft<A.mipmaps.length;Ft++)pt($.__webglFramebuffer[Ct][Ft],I,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,Ft);else pt($.__webglFramebuffer[Ct],I,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0);x(A)&&_(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Vt){for(let Ct=0,Ft=dt.length;Ct<Ft;Ct++){const ce=dt[Ct],yt=i.get(ce);e.bindTexture(s.TEXTURE_2D,yt.__webglTexture),It(s.TEXTURE_2D,ce),pt($.__webglFramebuffer,I,ce,s.COLOR_ATTACHMENT0+Ct,s.TEXTURE_2D,0),x(ce)&&_(s.TEXTURE_2D)}e.unbindTexture()}else{let Ct=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Ct=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Ct,ot.__webglTexture),It(Ct,A),A.mipmaps&&A.mipmaps.length>0)for(let Ft=0;Ft<A.mipmaps.length;Ft++)pt($.__webglFramebuffer[Ft],I,A,s.COLOR_ATTACHMENT0,Ct,Ft);else pt($.__webglFramebuffer,I,A,s.COLOR_ATTACHMENT0,Ct,0);x(A)&&_(Ct),e.unbindTexture()}I.depthBuffer&&jt(I)}function J(I){const A=I.textures;for(let $=0,ot=A.length;$<ot;$++){const dt=A[$];if(x(dt)){const at=b(I),Vt=i.get(dt).__webglTexture;e.bindTexture(at,Vt),_(at),e.unbindTexture()}}}const ut=[],k=[];function Rt(I){if(I.samples>0){if(Et(I)===!1){const A=I.textures,$=I.width,ot=I.height;let dt=s.COLOR_BUFFER_BIT;const at=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Vt=i.get(I),Ct=A.length>1;if(Ct)for(let Ft=0;Ft<A.length;Ft++)e.bindFramebuffer(s.FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ft,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Vt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ft,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Vt.__webglFramebuffer);for(let Ft=0;Ft<A.length;Ft++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(dt|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(dt|=s.STENCIL_BUFFER_BIT)),Ct){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Vt.__webglColorRenderbuffer[Ft]);const ce=i.get(A[Ft]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ce,0)}s.blitFramebuffer(0,0,$,ot,0,0,$,ot,dt,s.NEAREST),u===!0&&(ut.length=0,k.length=0,ut.push(s.COLOR_ATTACHMENT0+Ft),I.depthBuffer&&I.resolveDepthBuffer===!1&&(ut.push(at),k.push(at),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,k)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ut))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ct)for(let Ft=0;Ft<A.length;Ft++){e.bindFramebuffer(s.FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ft,s.RENDERBUFFER,Vt.__webglColorRenderbuffer[Ft]);const ce=i.get(A[Ft]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Vt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ft,s.TEXTURE_2D,ce,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Vt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&u){const A=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function ht(I){return Math.min(o.maxSamples,I.samples)}function Et(I){const A=i.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function wt(I){const A=l.render.frame;m.get(I)!==A&&(m.set(I,A),I.update())}function Nt(I,A){const $=I.colorSpace,ot=I.format,dt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||$!==Ws&&$!==wi&&(_e.getTransfer($)===Se?(ot!==Rn||dt!==ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),A}function At(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(d.width=I.naturalWidth||I.width,d.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(d.width=I.displayWidth,d.height=I.displayHeight):(d.width=I.width,d.height=I.height),d}this.allocateTextureUnit=H,this.resetTextureUnits=G,this.setTexture2D=j,this.setTexture2DArray=Y,this.setTexture3D=ct,this.setTextureCube=Z,this.rebindTextures=lt,this.setupRenderTarget=Mt,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=Et}function S0(s,t){function e(i,o=wi){let a;const l=_e.getTransfer(o);if(i===ui)return s.UNSIGNED_BYTE;if(i===cc)return s.UNSIGNED_SHORT_4_4_4_4;if(i===hc)return s.UNSIGNED_SHORT_5_5_5_1;if(i===ju)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===$u)return s.BYTE;if(i===Ku)return s.SHORT;if(i===bo)return s.UNSIGNED_SHORT;if(i===lc)return s.INT;if(i===ji)return s.UNSIGNED_INT;if(i===si)return s.FLOAT;if(i===Lo)return s.HALF_FLOAT;if(i===Ju)return s.ALPHA;if(i===Qu)return s.RGB;if(i===Rn)return s.RGBA;if(i===td)return s.LUMINANCE;if(i===ed)return s.LUMINANCE_ALPHA;if(i===Us)return s.DEPTH_COMPONENT;if(i===Hs)return s.DEPTH_STENCIL;if(i===nd)return s.RED;if(i===uc)return s.RED_INTEGER;if(i===id)return s.RG;if(i===dc)return s.RG_INTEGER;if(i===fc)return s.RGBA_INTEGER;if(i===Lr||i===Rr||i===Ir||i===Dr)if(l===Se)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Lr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Rr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ir)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Dr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Lr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Rr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ir)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Dr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===bl||i===Tl||i===Al||i===Cl)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===bl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Tl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Al)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Cl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Pl||i===Ll||i===Rl)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Pl||i===Ll)return l===Se?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Rl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Il||i===Dl||i===Nl||i===Ul||i===Ol||i===zl||i===kl||i===Fl||i===Bl||i===Hl||i===Vl||i===Gl||i===Wl||i===Zl)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Il)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Dl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Nl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ul)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ol)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===zl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===kl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Fl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Bl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Vl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Gl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Zl)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Nr||i===Xl||i===ql)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Nr)return l===Se?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ql)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===sd||i===Yl||i===$l||i===Kl)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Nr)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Yl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===$l)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Kl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Bs?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}class w0 extends yn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class be extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}}const E0={type:"move"};class qa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let o=null,a=null,l=null;const c=this._targetRay,u=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){l=!0;for(const w of t.hand.values()){const x=e.getJointPose(w,i),_=this._getHandJoint(d,w);x!==null&&(_.matrix.fromArray(x.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=x.radius),_.visible=x!==null}const m=d.joints["index-finger-tip"],p=d.joints["thumb-tip"],g=m.position.distanceTo(p.position),v=.02,M=.005;d.inputState.pinching&&g>v+M?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&g<=v-M&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else u!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,i),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1));c!==null&&(o=e.getPose(t.targetRaySpace,i),o===null&&a!==null&&(o=a),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(E0)))}return c!==null&&(c.visible=o!==null),u!==null&&(u.visible=a!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new be;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const b0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class A0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const o=new rn,a=t.properties.get(o);a.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=o}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ci({vertexShader:b0,fragmentShader:T0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new _t(new In(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C0 extends es{constructor(t,e){super();const i=this;let o=null,a=1,l=null,c="local-floor",u=1,d=null,m=null,p=null,g=null,v=null,M=null;const w=new A0,x=e.getContextAttributes();let _=null,b=null;const E=[],S=[],U=new bt;let N=null;const D=new yn;D.viewport=new De;const O=new yn;O.viewport=new De;const P=[D,O],T=new w0;let z=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let rt=E[Q];return rt===void 0&&(rt=new qa,E[Q]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Q){let rt=E[Q];return rt===void 0&&(rt=new qa,E[Q]=rt),rt.getGripSpace()},this.getHand=function(Q){let rt=E[Q];return rt===void 0&&(rt=new qa,E[Q]=rt),rt.getHandSpace()};function H(Q){const rt=S.indexOf(Q.inputSource);if(rt===-1)return;const pt=E[rt];pt!==void 0&&(pt.update(Q.inputSource,Q.frame,d||l),pt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function F(){o.removeEventListener("select",H),o.removeEventListener("selectstart",H),o.removeEventListener("selectend",H),o.removeEventListener("squeeze",H),o.removeEventListener("squeezestart",H),o.removeEventListener("squeezeend",H),o.removeEventListener("end",F),o.removeEventListener("inputsourceschange",j);for(let Q=0;Q<E.length;Q++){const rt=S[Q];rt!==null&&(S[Q]=null,E[Q].disconnect(rt))}z=null,G=null,w.reset(),t.setRenderTarget(_),v=null,g=null,p=null,o=null,b=null,Dt.stop(),i.isPresenting=!1,t.setPixelRatio(N),t.setSize(U.width,U.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){a=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){c=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(Q){d=Q},this.getBaseLayer=function(){return g!==null?g:v},this.getBinding=function(){return p},this.getFrame=function(){return M},this.getSession=function(){return o},this.setSession=async function(Q){if(o=Q,o!==null){if(_=t.getRenderTarget(),o.addEventListener("select",H),o.addEventListener("selectstart",H),o.addEventListener("selectend",H),o.addEventListener("squeeze",H),o.addEventListener("squeezestart",H),o.addEventListener("squeezeend",H),o.addEventListener("end",F),o.addEventListener("inputsourceschange",j),x.xrCompatible!==!0&&await e.makeXRCompatible(),N=t.getPixelRatio(),t.getSize(U),o.renderState.layers===void 0){const rt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:a};v=new XRWebGLLayer(o,e,rt),o.updateRenderState({baseLayer:v}),t.setPixelRatio(1),t.setSize(v.framebufferWidth,v.framebufferHeight,!1),b=new Ji(v.framebufferWidth,v.framebufferHeight,{format:Rn,type:ui,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let rt=null,pt=null,vt=null;x.depth&&(vt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=x.stencil?Hs:Us,pt=x.stencil?Bs:ji);const Bt={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:a};p=new XRWebGLBinding(o,e),g=p.createProjectionLayer(Bt),o.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),b=new Ji(g.textureWidth,g.textureHeight,{format:Rn,type:ui,depthTexture:new xd(g.textureWidth,g.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(u),d=null,l=await o.requestReferenceSpace(c),Dt.setContext(o),Dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function j(Q){for(let rt=0;rt<Q.removed.length;rt++){const pt=Q.removed[rt],vt=S.indexOf(pt);vt>=0&&(S[vt]=null,E[vt].disconnect(pt))}for(let rt=0;rt<Q.added.length;rt++){const pt=Q.added[rt];let vt=S.indexOf(pt);if(vt===-1){for(let jt=0;jt<E.length;jt++)if(jt>=S.length){S.push(pt),vt=jt;break}else if(S[jt]===null){S[jt]=pt,vt=jt;break}if(vt===-1)break}const Bt=E[vt];Bt&&Bt.connect(pt)}}const Y=new V,ct=new V;function Z(Q,rt,pt){Y.setFromMatrixPosition(rt.matrixWorld),ct.setFromMatrixPosition(pt.matrixWorld);const vt=Y.distanceTo(ct),Bt=rt.projectionMatrix.elements,jt=pt.projectionMatrix.elements,lt=Bt[14]/(Bt[10]-1),Mt=Bt[14]/(Bt[10]+1),J=(Bt[9]+1)/Bt[5],ut=(Bt[9]-1)/Bt[5],k=(Bt[8]-1)/Bt[0],Rt=(jt[8]+1)/jt[0],ht=lt*k,Et=lt*Rt,wt=vt/(-k+Rt),Nt=wt*-k;if(rt.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Nt),Q.translateZ(wt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Bt[10]===-1)Q.projectionMatrix.copy(rt.projectionMatrix),Q.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const At=lt+wt,I=Mt+wt,A=ht-Nt,$=Et+(vt-Nt),ot=J*Mt/I*At,dt=ut*Mt/I*At;Q.projectionMatrix.makePerspective(A,$,ot,dt,At,I),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function xt(Q,rt){rt===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(rt.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(o===null)return;let rt=Q.near,pt=Q.far;w.texture!==null&&(w.depthNear>0&&(rt=w.depthNear),w.depthFar>0&&(pt=w.depthFar)),T.near=O.near=D.near=rt,T.far=O.far=D.far=pt,(z!==T.near||G!==T.far)&&(o.updateRenderState({depthNear:T.near,depthFar:T.far}),z=T.near,G=T.far),D.layers.mask=Q.layers.mask|2,O.layers.mask=Q.layers.mask|4,T.layers.mask=D.layers.mask|O.layers.mask;const vt=Q.parent,Bt=T.cameras;xt(T,vt);for(let jt=0;jt<Bt.length;jt++)xt(Bt[jt],vt);Bt.length===2?Z(T,D,O):T.projectionMatrix.copy(D.projectionMatrix),st(Q,T,vt)};function st(Q,rt,pt){pt===null?Q.matrix.copy(rt.matrixWorld):(Q.matrix.copy(pt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(rt.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(rt.projectionMatrix),Q.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Jl*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(g===null&&v===null))return u},this.setFoveation=function(Q){u=Q,g!==null&&(g.fixedFoveation=Q),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=Q)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(T)};let gt=null;function It(Q,rt){if(m=rt.getViewerPose(d||l),M=rt,m!==null){const pt=m.views;v!==null&&(t.setRenderTargetFramebuffer(b,v.framebuffer),t.setRenderTarget(b));let vt=!1;pt.length!==T.cameras.length&&(T.cameras.length=0,vt=!0);for(let jt=0;jt<pt.length;jt++){const lt=pt[jt];let Mt=null;if(v!==null)Mt=v.getViewport(lt);else{const ut=p.getViewSubImage(g,lt);Mt=ut.viewport,jt===0&&(t.setRenderTargetTextures(b,ut.colorTexture,g.ignoreDepthValues?void 0:ut.depthStencilTexture),t.setRenderTarget(b))}let J=P[jt];J===void 0&&(J=new yn,J.layers.enable(jt),J.viewport=new De,P[jt]=J),J.matrix.fromArray(lt.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(lt.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Mt.x,Mt.y,Mt.width,Mt.height),jt===0&&(T.matrix.copy(J.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),vt===!0&&T.cameras.push(J)}const Bt=o.enabledFeatures;if(Bt&&Bt.includes("depth-sensing")){const jt=p.getDepthInformation(pt[0]);jt&&jt.isValid&&jt.texture&&w.init(t,jt,o.renderState)}}for(let pt=0;pt<E.length;pt++){const vt=S[pt],Bt=E[pt];vt!==null&&Bt!==void 0&&Bt.update(vt,rt,d||l)}gt&&gt(Q,rt),rt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:rt}),M=null}const Dt=new gd;Dt.setAnimationLoop(It),this.setAnimationLoop=function(Q){gt=Q},this.dispose=function(){}}}const Bi=new fn,P0=new Pe;function L0(s,t){function e(x,_){x.matrixAutoUpdate===!0&&x.updateMatrix(),_.value.copy(x.matrix)}function i(x,_){_.color.getRGB(x.fogColor.value,pd(s)),_.isFog?(x.fogNear.value=_.near,x.fogFar.value=_.far):_.isFogExp2&&(x.fogDensity.value=_.density)}function o(x,_,b,E,S){_.isMeshBasicMaterial||_.isMeshLambertMaterial?a(x,_):_.isMeshToonMaterial?(a(x,_),p(x,_)):_.isMeshPhongMaterial?(a(x,_),m(x,_)):_.isMeshStandardMaterial?(a(x,_),g(x,_),_.isMeshPhysicalMaterial&&v(x,_,S)):_.isMeshMatcapMaterial?(a(x,_),M(x,_)):_.isMeshDepthMaterial?a(x,_):_.isMeshDistanceMaterial?(a(x,_),w(x,_)):_.isMeshNormalMaterial?a(x,_):_.isLineBasicMaterial?(l(x,_),_.isLineDashedMaterial&&c(x,_)):_.isPointsMaterial?u(x,_,b,E):_.isSpriteMaterial?d(x,_):_.isShadowMaterial?(x.color.value.copy(_.color),x.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function a(x,_){x.opacity.value=_.opacity,_.color&&x.diffuse.value.copy(_.color),_.emissive&&x.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(x.map.value=_.map,e(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,e(_.alphaMap,x.alphaMapTransform)),_.bumpMap&&(x.bumpMap.value=_.bumpMap,e(_.bumpMap,x.bumpMapTransform),x.bumpScale.value=_.bumpScale,_.side===dn&&(x.bumpScale.value*=-1)),_.normalMap&&(x.normalMap.value=_.normalMap,e(_.normalMap,x.normalMapTransform),x.normalScale.value.copy(_.normalScale),_.side===dn&&x.normalScale.value.negate()),_.displacementMap&&(x.displacementMap.value=_.displacementMap,e(_.displacementMap,x.displacementMapTransform),x.displacementScale.value=_.displacementScale,x.displacementBias.value=_.displacementBias),_.emissiveMap&&(x.emissiveMap.value=_.emissiveMap,e(_.emissiveMap,x.emissiveMapTransform)),_.specularMap&&(x.specularMap.value=_.specularMap,e(_.specularMap,x.specularMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest);const b=t.get(_),E=b.envMap,S=b.envMapRotation;E&&(x.envMap.value=E,Bi.copy(S),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),x.envMapRotation.value.setFromMatrix4(P0.makeRotationFromEuler(Bi)),x.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=_.reflectivity,x.ior.value=_.ior,x.refractionRatio.value=_.refractionRatio),_.lightMap&&(x.lightMap.value=_.lightMap,x.lightMapIntensity.value=_.lightMapIntensity,e(_.lightMap,x.lightMapTransform)),_.aoMap&&(x.aoMap.value=_.aoMap,x.aoMapIntensity.value=_.aoMapIntensity,e(_.aoMap,x.aoMapTransform))}function l(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,_.map&&(x.map.value=_.map,e(_.map,x.mapTransform))}function c(x,_){x.dashSize.value=_.dashSize,x.totalSize.value=_.dashSize+_.gapSize,x.scale.value=_.scale}function u(x,_,b,E){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.size.value=_.size*b,x.scale.value=E*.5,_.map&&(x.map.value=_.map,e(_.map,x.uvTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,e(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function d(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.rotation.value=_.rotation,_.map&&(x.map.value=_.map,e(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,e(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function m(x,_){x.specular.value.copy(_.specular),x.shininess.value=Math.max(_.shininess,1e-4)}function p(x,_){_.gradientMap&&(x.gradientMap.value=_.gradientMap)}function g(x,_){x.metalness.value=_.metalness,_.metalnessMap&&(x.metalnessMap.value=_.metalnessMap,e(_.metalnessMap,x.metalnessMapTransform)),x.roughness.value=_.roughness,_.roughnessMap&&(x.roughnessMap.value=_.roughnessMap,e(_.roughnessMap,x.roughnessMapTransform)),_.envMap&&(x.envMapIntensity.value=_.envMapIntensity)}function v(x,_,b){x.ior.value=_.ior,_.sheen>0&&(x.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),x.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(x.sheenColorMap.value=_.sheenColorMap,e(_.sheenColorMap,x.sheenColorMapTransform)),_.sheenRoughnessMap&&(x.sheenRoughnessMap.value=_.sheenRoughnessMap,e(_.sheenRoughnessMap,x.sheenRoughnessMapTransform))),_.clearcoat>0&&(x.clearcoat.value=_.clearcoat,x.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(x.clearcoatMap.value=_.clearcoatMap,e(_.clearcoatMap,x.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,e(_.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(x.clearcoatNormalMap.value=_.clearcoatNormalMap,e(_.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===dn&&x.clearcoatNormalScale.value.negate())),_.dispersion>0&&(x.dispersion.value=_.dispersion),_.iridescence>0&&(x.iridescence.value=_.iridescence,x.iridescenceIOR.value=_.iridescenceIOR,x.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(x.iridescenceMap.value=_.iridescenceMap,e(_.iridescenceMap,x.iridescenceMapTransform)),_.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=_.iridescenceThicknessMap,e(_.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),_.transmission>0&&(x.transmission.value=_.transmission,x.transmissionSamplerMap.value=b.texture,x.transmissionSamplerSize.value.set(b.width,b.height),_.transmissionMap&&(x.transmissionMap.value=_.transmissionMap,e(_.transmissionMap,x.transmissionMapTransform)),x.thickness.value=_.thickness,_.thicknessMap&&(x.thicknessMap.value=_.thicknessMap,e(_.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=_.attenuationDistance,x.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(x.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(x.anisotropyMap.value=_.anisotropyMap,e(_.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=_.specularIntensity,x.specularColor.value.copy(_.specularColor),_.specularColorMap&&(x.specularColorMap.value=_.specularColorMap,e(_.specularColorMap,x.specularColorMapTransform)),_.specularIntensityMap&&(x.specularIntensityMap.value=_.specularIntensityMap,e(_.specularIntensityMap,x.specularIntensityMapTransform))}function M(x,_){_.matcap&&(x.matcap.value=_.matcap)}function w(x,_){const b=t.get(_).light;x.referencePosition.value.setFromMatrixPosition(b.matrixWorld),x.nearDistance.value=b.shadow.camera.near,x.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:o}}function R0(s,t,e,i){let o={},a={},l=[];const c=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function u(b,E){const S=E.program;i.uniformBlockBinding(b,S)}function d(b,E){let S=o[b.id];S===void 0&&(M(b),S=m(b),o[b.id]=S,b.addEventListener("dispose",x));const U=E.program;i.updateUBOMapping(b,U);const N=t.render.frame;a[b.id]!==N&&(g(b),a[b.id]=N)}function m(b){const E=p();b.__bindingPointIndex=E;const S=s.createBuffer(),U=b.__size,N=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,U,N),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,S),S}function p(){for(let b=0;b<c;b++)if(l.indexOf(b)===-1)return l.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(b){const E=o[b.id],S=b.uniforms,U=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let N=0,D=S.length;N<D;N++){const O=Array.isArray(S[N])?S[N]:[S[N]];for(let P=0,T=O.length;P<T;P++){const z=O[P];if(v(z,N,P,U)===!0){const G=z.__offset,H=Array.isArray(z.value)?z.value:[z.value];let F=0;for(let j=0;j<H.length;j++){const Y=H[j],ct=w(Y);typeof Y=="number"||typeof Y=="boolean"?(z.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,G+F,z.__data)):Y.isMatrix3?(z.__data[0]=Y.elements[0],z.__data[1]=Y.elements[1],z.__data[2]=Y.elements[2],z.__data[3]=0,z.__data[4]=Y.elements[3],z.__data[5]=Y.elements[4],z.__data[6]=Y.elements[5],z.__data[7]=0,z.__data[8]=Y.elements[6],z.__data[9]=Y.elements[7],z.__data[10]=Y.elements[8],z.__data[11]=0):(Y.toArray(z.__data,F),F+=ct.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,G,z.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function v(b,E,S,U){const N=b.value,D=E+"_"+S;if(U[D]===void 0)return typeof N=="number"||typeof N=="boolean"?U[D]=N:U[D]=N.clone(),!0;{const O=U[D];if(typeof N=="number"||typeof N=="boolean"){if(O!==N)return U[D]=N,!0}else if(O.equals(N)===!1)return O.copy(N),!0}return!1}function M(b){const E=b.uniforms;let S=0;const U=16;for(let D=0,O=E.length;D<O;D++){const P=Array.isArray(E[D])?E[D]:[E[D]];for(let T=0,z=P.length;T<z;T++){const G=P[T],H=Array.isArray(G.value)?G.value:[G.value];for(let F=0,j=H.length;F<j;F++){const Y=H[F],ct=w(Y),Z=S%U,xt=Z%ct.boundary,st=Z+xt;S+=xt,st!==0&&U-st<ct.storage&&(S+=U-st),G.__data=new Float32Array(ct.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=S,S+=ct.storage}}}const N=S%U;return N>0&&(S+=U-N),b.__size=S,b.__cache={},this}function w(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function x(b){const E=b.target;E.removeEventListener("dispose",x);const S=l.indexOf(E.__bindingPointIndex);l.splice(S,1),s.deleteBuffer(o[E.id]),delete o[E.id],delete a[E.id]}function _(){for(const b in o)s.deleteBuffer(o[b]);l=[],o={},a={}}return{bind:u,update:d,dispose:_}}class I0{constructor(t={}){const{canvas:e=xp(),context:i=null,depth:o=!0,stencil:a=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:d=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:p=!1,reverseDepthBuffer:g=!1}=t;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=l;const M=new Uint32Array(4),w=new Int32Array(4);let x=null,_=null;const b=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=je,this.toneMapping=Ti,this.toneMappingExposure=1;const S=this;let U=!1,N=0,D=0,O=null,P=-1,T=null;const z=new De,G=new De;let H=null;const F=new pe(0);let j=0,Y=e.width,ct=e.height,Z=1,xt=null,st=null;const gt=new De(0,0,Y,ct),It=new De(0,0,Y,ct);let Dt=!1;const Q=new mc;let rt=!1,pt=!1;const vt=new Pe,Bt=new Pe,jt=new V,lt=new De,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let J=!1;function ut(){return O===null?Z:1}let k=i;function Rt(R,X){return e.getContext(R,X)}try{const R={alpha:!0,depth:o,stencil:a,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:d,powerPreference:m,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ac}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",zt,!1),e.addEventListener("webglcontextcreationerror",Ut,!1),k===null){const X="webgl2";if(k=Rt(X,R),k===null)throw Rt(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ht,Et,wt,Nt,At,I,A,$,ot,dt,at,Vt,Ct,Ft,ce,yt,Gt,Jt,Qt,Ht,fe,ee,ye,W;function Pt(){ht=new zg(k),ht.init(),ee=new S0(k,ht),Et=new Rg(k,ht,t,ee),wt=new x0(k,ht),Et.reverseDepthBuffer&&g&&wt.buffers.depth.setReversed(!0),Nt=new Bg(k),At=new s0,I=new M0(k,ht,wt,At,Et,ee,Nt),A=new Dg(S),$=new Og(S),ot=new qp(k),ye=new Pg(k,ot),dt=new kg(k,ot,Nt,ye),at=new Vg(k,dt,ot,Nt),Qt=new Hg(k,Et,I),yt=new Ig(At),Vt=new i0(S,A,$,ht,Et,ye,yt),Ct=new L0(S,At),Ft=new r0,ce=new d0(ht),Jt=new Cg(S,A,$,wt,at,v,u),Gt=new g0(S,at,Et),W=new R0(k,Nt,Et,wt),Ht=new Lg(k,ht,Nt),fe=new Fg(k,ht,Nt),Nt.programs=Vt.programs,S.capabilities=Et,S.extensions=ht,S.properties=At,S.renderLists=Ft,S.shadowMap=Gt,S.state=wt,S.info=Nt}Pt();const it=new C0(S,k);this.xr=it,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const R=ht.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ht.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(R){R!==void 0&&(Z=R,this.setSize(Y,ct,!1))},this.getSize=function(R){return R.set(Y,ct)},this.setSize=function(R,X,tt=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=R,ct=X,e.width=Math.floor(R*Z),e.height=Math.floor(X*Z),tt===!0&&(e.style.width=R+"px",e.style.height=X+"px"),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(Y*Z,ct*Z).floor()},this.setDrawingBufferSize=function(R,X,tt){Y=R,ct=X,Z=tt,e.width=Math.floor(R*tt),e.height=Math.floor(X*tt),this.setViewport(0,0,R,X)},this.getCurrentViewport=function(R){return R.copy(z)},this.getViewport=function(R){return R.copy(gt)},this.setViewport=function(R,X,tt,et){R.isVector4?gt.set(R.x,R.y,R.z,R.w):gt.set(R,X,tt,et),wt.viewport(z.copy(gt).multiplyScalar(Z).round())},this.getScissor=function(R){return R.copy(It)},this.setScissor=function(R,X,tt,et){R.isVector4?It.set(R.x,R.y,R.z,R.w):It.set(R,X,tt,et),wt.scissor(G.copy(It).multiplyScalar(Z).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(R){wt.setScissorTest(Dt=R)},this.setOpaqueSort=function(R){xt=R},this.setTransparentSort=function(R){st=R},this.getClearColor=function(R){return R.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor.apply(Jt,arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha.apply(Jt,arguments)},this.clear=function(R=!0,X=!0,tt=!0){let et=0;if(R){let q=!1;if(O!==null){const St=O.texture.format;q=St===fc||St===dc||St===uc}if(q){const St=O.texture.type,Ot=St===ui||St===ji||St===bo||St===Bs||St===cc||St===hc,Xt=Jt.getClearColor(),qt=Jt.getClearAlpha(),ne=Xt.r,se=Xt.g,Zt=Xt.b;Ot?(M[0]=ne,M[1]=se,M[2]=Zt,M[3]=qt,k.clearBufferuiv(k.COLOR,0,M)):(w[0]=ne,w[1]=se,w[2]=Zt,w[3]=qt,k.clearBufferiv(k.COLOR,0,w))}else et|=k.COLOR_BUFFER_BIT}X&&(et|=k.DEPTH_BUFFER_BIT),tt&&(et|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",zt,!1),e.removeEventListener("webglcontextcreationerror",Ut,!1),Ft.dispose(),ce.dispose(),At.dispose(),A.dispose(),$.dispose(),at.dispose(),ye.dispose(),W.dispose(),Vt.dispose(),it.dispose(),it.removeEventListener("sessionstart",Do),it.removeEventListener("sessionend",No),Xn.stop()};function ft(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function zt(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;const R=Nt.autoReset,X=Gt.enabled,tt=Gt.autoUpdate,et=Gt.needsUpdate,q=Gt.type;Pt(),Nt.autoReset=R,Gt.enabled=X,Gt.autoUpdate=tt,Gt.needsUpdate=et,Gt.type=q}function Ut(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ie(R){const X=R.target;X.removeEventListener("dispose",ie),Ce(X)}function Ce(R){Fe(R),At.remove(R)}function Fe(R){const X=At.get(R).programs;X!==void 0&&(X.forEach(function(tt){Vt.releaseProgram(tt)}),R.isShaderMaterial&&Vt.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,tt,et,q,St){X===null&&(X=Mt);const Ot=q.isMesh&&q.matrixWorld.determinant()<0,Xt=di(R,X,tt,et,q);wt.setMaterial(et,Ot);let qt=tt.index,ne=1;if(et.wireframe===!0){if(qt=dt.getWireframeAttribute(tt),qt===void 0)return;ne=2}const se=tt.drawRange,Zt=tt.attributes.position;let he=se.start*ne,ve=(se.start+se.count)*ne;St!==null&&(he=Math.max(he,St.start*ne),ve=Math.min(ve,(St.start+St.count)*ne)),qt!==null?(he=Math.max(he,0),ve=Math.min(ve,qt.count)):Zt!=null&&(he=Math.max(he,0),ve=Math.min(ve,Zt.count));const Me=ve-he;if(Me<0||Me===1/0)return;ye.setup(q,et,Xt,tt,qt);let Ne,Wt=Ht;if(qt!==null&&(Ne=ot.get(qt),Wt=fe,Wt.setIndex(Ne)),q.isMesh)et.wireframe===!0?(wt.setLineWidth(et.wireframeLinewidth*ut()),Wt.setMode(k.LINES)):Wt.setMode(k.TRIANGLES);else if(q.isLine){let Tt=et.linewidth;Tt===void 0&&(Tt=1),wt.setLineWidth(Tt*ut()),q.isLineSegments?Wt.setMode(k.LINES):q.isLineLoop?Wt.setMode(k.LINE_LOOP):Wt.setMode(k.LINE_STRIP)}else q.isPoints?Wt.setMode(k.POINTS):q.isSprite&&Wt.setMode(k.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)Wt.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(ht.get("WEBGL_multi_draw"))Wt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Tt=q._multiDrawStarts,cn=q._multiDrawCounts,de=q._multiDrawCount,Be=qt?ot.get(qt).bytesPerElement:1,Un=At.get(et).currentProgram.getUniforms();for(let Kt=0;Kt<de;Kt++)Un.setValue(k,"_gl_DrawID",Kt),Wt.render(Tt[Kt]/Be,cn[Kt])}else if(q.isInstancedMesh)Wt.renderInstances(he,Me,q.count);else if(tt.isInstancedBufferGeometry){const Tt=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,cn=Math.min(tt.instanceCount,Tt);Wt.renderInstances(he,Me,cn)}else Wt.render(he,Me)};function ge(R,X,tt){R.transparent===!0&&R.side===Ln&&R.forceSinglePass===!1?(R.side=dn,R.needsUpdate=!0,Li(R,X,tt),R.side=Ai,R.needsUpdate=!0,Li(R,X,tt),R.side=Ln):Li(R,X,tt)}this.compile=function(R,X,tt=null){tt===null&&(tt=R),_=ce.get(tt),_.init(X),E.push(_),tt.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(_.pushLight(q),q.castShadow&&_.pushShadow(q))}),R!==tt&&R.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(_.pushLight(q),q.castShadow&&_.pushShadow(q))}),_.setupLights();const et=new Set;return R.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const St=q.material;if(St)if(Array.isArray(St))for(let Ot=0;Ot<St.length;Ot++){const Xt=St[Ot];ge(Xt,tt,q),et.add(Xt)}else ge(St,tt,q),et.add(St)}),E.pop(),_=null,et},this.compileAsync=function(R,X,tt=null){const et=this.compile(R,X,tt);return new Promise(q=>{function St(){if(et.forEach(function(Ot){At.get(Ot).currentProgram.isReady()&&et.delete(Ot)}),et.size===0){q(R);return}setTimeout(St,10)}ht.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let tn=null;function wn(R){tn&&tn(R)}function Do(){Xn.stop()}function No(){Xn.start()}const Xn=new gd;Xn.setAnimationLoop(wn),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(R){tn=R,it.setAnimationLoop(R),R===null?Xn.stop():Xn.start()},it.addEventListener("sessionstart",Do),it.addEventListener("sessionend",No),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(X),X=it.getCamera()),R.isScene===!0&&R.onBeforeRender(S,R,X,O),_=ce.get(R,E.length),_.init(X),E.push(_),Bt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Q.setFromProjectionMatrix(Bt),pt=this.localClippingEnabled,rt=yt.init(this.clippingPlanes,pt),x=Ft.get(R,b.length),x.init(),b.push(x),it.enabled===!0&&it.isPresenting===!0){const St=S.xr.getDepthSensingMesh();St!==null&&ln(St,X,-1/0,S.sortObjects)}ln(R,X,0,S.sortObjects),x.finish(),S.sortObjects===!0&&x.sort(xt,st),J=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,J&&Jt.addToRenderList(x,R),this.info.render.frame++,rt===!0&&yt.beginShadows();const tt=_.state.shadowsArray;Gt.render(tt,R,X),rt===!0&&yt.endShadows(),this.info.autoReset===!0&&this.info.reset();const et=x.opaque,q=x.transmissive;if(_.setupLights(),X.isArrayCamera){const St=X.cameras;if(q.length>0)for(let Ot=0,Xt=St.length;Ot<Xt;Ot++){const qt=St[Ot];qs(et,q,R,qt)}J&&Jt.render(R);for(let Ot=0,Xt=St.length;Ot<Xt;Ot++){const qt=St[Ot];Yt(x,R,qt,qt.viewport)}}else q.length>0&&qs(et,q,R,X),J&&Jt.render(R),Yt(x,R,X);O!==null&&(I.updateMultisampleRenderTarget(O),I.updateRenderTargetMipmap(O)),R.isScene===!0&&R.onAfterRender(S,R,X),ye.resetDefaultState(),P=-1,T=null,E.pop(),E.length>0?(_=E[E.length-1],rt===!0&&yt.setGlobalState(S.clippingPlanes,_.state.camera)):_=null,b.pop(),b.length>0?x=b[b.length-1]:x=null};function ln(R,X,tt,et){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)tt=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLight)_.pushLight(R),R.castShadow&&_.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Q.intersectsSprite(R)){et&&lt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Bt);const Ot=at.update(R),Xt=R.material;Xt.visible&&x.push(R,Ot,Xt,tt,lt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Q.intersectsObject(R))){const Ot=at.update(R),Xt=R.material;if(et&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),lt.copy(R.boundingSphere.center)):(Ot.boundingSphere===null&&Ot.computeBoundingSphere(),lt.copy(Ot.boundingSphere.center)),lt.applyMatrix4(R.matrixWorld).applyMatrix4(Bt)),Array.isArray(Xt)){const qt=Ot.groups;for(let ne=0,se=qt.length;ne<se;ne++){const Zt=qt[ne],he=Xt[Zt.materialIndex];he&&he.visible&&x.push(R,Ot,he,tt,lt.z,Zt)}}else Xt.visible&&x.push(R,Ot,Xt,tt,lt.z,null)}}const St=R.children;for(let Ot=0,Xt=St.length;Ot<Xt;Ot++)ln(St[Ot],X,tt,et)}function Yt(R,X,tt,et){const q=R.opaque,St=R.transmissive,Ot=R.transparent;_.setupLightsView(tt),rt===!0&&yt.setGlobalState(S.clippingPlanes,tt),et&&wt.viewport(z.copy(et)),q.length>0&&Pi(q,X,tt),St.length>0&&Pi(St,X,tt),Ot.length>0&&Pi(Ot,X,tt),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function qs(R,X,tt,et){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[et.id]===void 0&&(_.state.transmissionRenderTarget[et.id]=new Ji(1,1,{generateMipmaps:!0,type:ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float")?Lo:ui,minFilter:Ki,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_e.workingColorSpace}));const St=_.state.transmissionRenderTarget[et.id],Ot=et.viewport||z;St.setSize(Ot.z,Ot.w);const Xt=S.getRenderTarget();S.setRenderTarget(St),S.getClearColor(F),j=S.getClearAlpha(),j<1&&S.setClearColor(16777215,.5),S.clear(),J&&Jt.render(tt);const qt=S.toneMapping;S.toneMapping=Ti;const ne=et.viewport;if(et.viewport!==void 0&&(et.viewport=void 0),_.setupLightsView(et),rt===!0&&yt.setGlobalState(S.clippingPlanes,et),Pi(R,tt,et),I.updateMultisampleRenderTarget(St),I.updateRenderTargetMipmap(St),ht.has("WEBGL_multisampled_render_to_texture")===!1){let se=!1;for(let Zt=0,he=X.length;Zt<he;Zt++){const ve=X[Zt],Me=ve.object,Ne=ve.geometry,Wt=ve.material,Tt=ve.group;if(Wt.side===Ln&&Me.layers.test(et.layers)){const cn=Wt.side;Wt.side=dn,Wt.needsUpdate=!0,Ys(Me,tt,et,Ne,Wt,Tt),Wt.side=cn,Wt.needsUpdate=!0,se=!0}}se===!0&&(I.updateMultisampleRenderTarget(St),I.updateRenderTargetMipmap(St))}S.setRenderTarget(Xt),S.setClearColor(F,j),ne!==void 0&&(et.viewport=ne),S.toneMapping=qt}function Pi(R,X,tt){const et=X.isScene===!0?X.overrideMaterial:null;for(let q=0,St=R.length;q<St;q++){const Ot=R[q],Xt=Ot.object,qt=Ot.geometry,ne=et===null?Ot.material:et,se=Ot.group;Xt.layers.test(tt.layers)&&Ys(Xt,X,tt,qt,ne,se)}}function Ys(R,X,tt,et,q,St){R.onBeforeRender(S,X,tt,et,q,St),R.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),q.onBeforeRender(S,X,tt,et,R,St),q.transparent===!0&&q.side===Ln&&q.forceSinglePass===!1?(q.side=dn,q.needsUpdate=!0,S.renderBufferDirect(tt,X,et,q,R,St),q.side=Ai,q.needsUpdate=!0,S.renderBufferDirect(tt,X,et,q,R,St),q.side=Ln):S.renderBufferDirect(tt,X,et,q,R,St),R.onAfterRender(S,X,tt,et,q,St)}function Li(R,X,tt){X.isScene!==!0&&(X=Mt);const et=At.get(R),q=_.state.lights,St=_.state.shadowsArray,Ot=q.state.version,Xt=Vt.getParameters(R,q.state,St,X,tt),qt=Vt.getProgramCacheKey(Xt);let ne=et.programs;et.environment=R.isMeshStandardMaterial?X.environment:null,et.fog=X.fog,et.envMap=(R.isMeshStandardMaterial?$:A).get(R.envMap||et.environment),et.envMapRotation=et.environment!==null&&R.envMap===null?X.environmentRotation:R.envMapRotation,ne===void 0&&(R.addEventListener("dispose",ie),ne=new Map,et.programs=ne);let se=ne.get(qt);if(se!==void 0){if(et.currentProgram===se&&et.lightsStateVersion===Ot)return $s(R,Xt),se}else Xt.uniforms=Vt.getUniforms(R),R.onBeforeCompile(Xt,S),se=Vt.acquireProgram(Xt,qt),ne.set(qt,se),et.uniforms=Xt.uniforms;const Zt=et.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Zt.clippingPlanes=yt.uniform),$s(R,Xt),et.needsLights=$r(R),et.lightsStateVersion=Ot,et.needsLights&&(Zt.ambientLightColor.value=q.state.ambient,Zt.lightProbe.value=q.state.probe,Zt.directionalLights.value=q.state.directional,Zt.directionalLightShadows.value=q.state.directionalShadow,Zt.spotLights.value=q.state.spot,Zt.spotLightShadows.value=q.state.spotShadow,Zt.rectAreaLights.value=q.state.rectArea,Zt.ltc_1.value=q.state.rectAreaLTC1,Zt.ltc_2.value=q.state.rectAreaLTC2,Zt.pointLights.value=q.state.point,Zt.pointLightShadows.value=q.state.pointShadow,Zt.hemisphereLights.value=q.state.hemi,Zt.directionalShadowMap.value=q.state.directionalShadowMap,Zt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Zt.spotShadowMap.value=q.state.spotShadowMap,Zt.spotLightMatrix.value=q.state.spotLightMatrix,Zt.spotLightMap.value=q.state.spotLightMap,Zt.pointShadowMap.value=q.state.pointShadowMap,Zt.pointShadowMatrix.value=q.state.pointShadowMatrix),et.currentProgram=se,et.uniformsList=null,se}function ns(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=Ur.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function $s(R,X){const tt=At.get(R);tt.outputColorSpace=X.outputColorSpace,tt.batching=X.batching,tt.batchingColor=X.batchingColor,tt.instancing=X.instancing,tt.instancingColor=X.instancingColor,tt.instancingMorph=X.instancingMorph,tt.skinning=X.skinning,tt.morphTargets=X.morphTargets,tt.morphNormals=X.morphNormals,tt.morphColors=X.morphColors,tt.morphTargetsCount=X.morphTargetsCount,tt.numClippingPlanes=X.numClippingPlanes,tt.numIntersection=X.numClipIntersection,tt.vertexAlphas=X.vertexAlphas,tt.vertexTangents=X.vertexTangents,tt.toneMapping=X.toneMapping}function di(R,X,tt,et,q){X.isScene!==!0&&(X=Mt),I.resetTextureUnits();const St=X.fog,Ot=et.isMeshStandardMaterial?X.environment:null,Xt=O===null?S.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Ws,qt=(et.isMeshStandardMaterial?$:A).get(et.envMap||Ot),ne=et.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,se=!!tt.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),Zt=!!tt.morphAttributes.position,he=!!tt.morphAttributes.normal,ve=!!tt.morphAttributes.color;let Me=Ti;et.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Me=S.toneMapping);const Ne=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,Wt=Ne!==void 0?Ne.length:0,Tt=At.get(et),cn=_.state.lights;if(rt===!0&&(pt===!0||R!==T)){const hn=R===T&&et.id===P;yt.setState(et,R,hn)}let de=!1;et.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==cn.state.version||Tt.outputColorSpace!==Xt||q.isBatchedMesh&&Tt.batching===!1||!q.isBatchedMesh&&Tt.batching===!0||q.isBatchedMesh&&Tt.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Tt.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Tt.instancing===!1||!q.isInstancedMesh&&Tt.instancing===!0||q.isSkinnedMesh&&Tt.skinning===!1||!q.isSkinnedMesh&&Tt.skinning===!0||q.isInstancedMesh&&Tt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Tt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Tt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Tt.instancingMorph===!1&&q.morphTexture!==null||Tt.envMap!==qt||et.fog===!0&&Tt.fog!==St||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==yt.numPlanes||Tt.numIntersection!==yt.numIntersection)||Tt.vertexAlphas!==ne||Tt.vertexTangents!==se||Tt.morphTargets!==Zt||Tt.morphNormals!==he||Tt.morphColors!==ve||Tt.toneMapping!==Me||Tt.morphTargetsCount!==Wt)&&(de=!0):(de=!0,Tt.__version=et.version);let Be=Tt.currentProgram;de===!0&&(Be=Li(et,X,q));let Un=!1,Kt=!1,Ee=!1;const xe=Be.getUniforms(),en=Tt.uniforms;if(wt.useProgram(Be.program)&&(Un=!0,Kt=!0,Ee=!0),et.id!==P&&(P=et.id,Kt=!0),Un||T!==R){wt.buffers.depth.getReversed()?(vt.copy(R.projectionMatrix),Mp(vt),Sp(vt),xe.setValue(k,"projectionMatrix",vt)):xe.setValue(k,"projectionMatrix",R.projectionMatrix),xe.setValue(k,"viewMatrix",R.matrixWorldInverse);const pn=xe.map.cameraPosition;pn!==void 0&&pn.setValue(k,jt.setFromMatrixPosition(R.matrixWorld)),Et.logarithmicDepthBuffer&&xe.setValue(k,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&xe.setValue(k,"isOrthographic",R.isOrthographicCamera===!0),T!==R&&(T=R,Kt=!0,Ee=!0)}if(q.isSkinnedMesh){xe.setOptional(k,q,"bindMatrix"),xe.setOptional(k,q,"bindMatrixInverse");const hn=q.skeleton;hn&&(hn.boneTexture===null&&hn.computeBoneTexture(),xe.setValue(k,"boneTexture",hn.boneTexture,I))}q.isBatchedMesh&&(xe.setOptional(k,q,"batchingTexture"),xe.setValue(k,"batchingTexture",q._matricesTexture,I),xe.setOptional(k,q,"batchingIdTexture"),xe.setValue(k,"batchingIdTexture",q._indirectTexture,I),xe.setOptional(k,q,"batchingColorTexture"),q._colorsTexture!==null&&xe.setValue(k,"batchingColorTexture",q._colorsTexture,I));const He=tt.morphAttributes;if((He.position!==void 0||He.normal!==void 0||He.color!==void 0)&&Qt.update(q,tt,Be),(Kt||Tt.receiveShadow!==q.receiveShadow)&&(Tt.receiveShadow=q.receiveShadow,xe.setValue(k,"receiveShadow",q.receiveShadow)),et.isMeshGouraudMaterial&&et.envMap!==null&&(en.envMap.value=qt,en.flipEnvMap.value=qt.isCubeTexture&&qt.isRenderTargetTexture===!1?-1:1),et.isMeshStandardMaterial&&et.envMap===null&&X.environment!==null&&(en.envMapIntensity.value=X.environmentIntensity),Kt&&(xe.setValue(k,"toneMappingExposure",S.toneMappingExposure),Tt.needsLights&&Uo(en,Ee),St&&et.fog===!0&&Ct.refreshFogUniforms(en,St),Ct.refreshMaterialUniforms(en,et,Z,ct,_.state.transmissionRenderTarget[R.id]),Ur.upload(k,ns(Tt),en,I)),et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(Ur.upload(k,ns(Tt),en,I),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&xe.setValue(k,"center",q.center),xe.setValue(k,"modelViewMatrix",q.modelViewMatrix),xe.setValue(k,"normalMatrix",q.normalMatrix),xe.setValue(k,"modelMatrix",q.matrixWorld),et.isShaderMaterial||et.isRawShaderMaterial){const hn=et.uniformsGroups;for(let pn=0,qe=hn.length;pn<qe;pn++){const Le=hn[pn];W.update(Le,Be),W.bind(Le,Be)}}return Be}function Uo(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function $r(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(R,X,tt){At.get(R.texture).__webglTexture=X,At.get(R.depthTexture).__webglTexture=tt;const et=At.get(R);et.__hasExternalTextures=!0,et.__autoAllocateDepthBuffer=tt===void 0,et.__autoAllocateDepthBuffer||ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),et.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,X){const tt=At.get(R);tt.__webglFramebuffer=X,tt.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(R,X=0,tt=0){O=R,N=X,D=tt;let et=!0,q=null,St=!1,Ot=!1;if(R){const qt=At.get(R);if(qt.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(k.FRAMEBUFFER,null),et=!1;else if(qt.__webglFramebuffer===void 0)I.setupRenderTarget(R);else if(qt.__hasExternalTextures)I.rebindTextures(R,At.get(R.texture).__webglTexture,At.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Zt=R.depthTexture;if(qt.__boundDepthTexture!==Zt){if(Zt!==null&&At.has(Zt)&&(R.width!==Zt.image.width||R.height!==Zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(R)}}const ne=R.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Ot=!0);const se=At.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(se[X])?q=se[X][tt]:q=se[X],St=!0):R.samples>0&&I.useMultisampledRTT(R)===!1?q=At.get(R).__webglMultisampledFramebuffer:Array.isArray(se)?q=se[tt]:q=se,z.copy(R.viewport),G.copy(R.scissor),H=R.scissorTest}else z.copy(gt).multiplyScalar(Z).floor(),G.copy(It).multiplyScalar(Z).floor(),H=Dt;if(wt.bindFramebuffer(k.FRAMEBUFFER,q)&&et&&wt.drawBuffers(R,q),wt.viewport(z),wt.scissor(G),wt.setScissorTest(H),St){const qt=At.get(R.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+X,qt.__webglTexture,tt)}else if(Ot){const qt=At.get(R.texture),ne=X||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,qt.__webglTexture,tt||0,ne)}P=-1},this.readRenderTargetPixels=function(R,X,tt,et,q,St,Ot){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xt=At.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ot!==void 0&&(Xt=Xt[Ot]),Xt){wt.bindFramebuffer(k.FRAMEBUFFER,Xt);try{const qt=R.texture,ne=qt.format,se=qt.type;if(!Et.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Et.textureTypeReadable(se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-et&&tt>=0&&tt<=R.height-q&&k.readPixels(X,tt,et,q,ee.convert(ne),ee.convert(se),St)}finally{const qt=O!==null?At.get(O).__webglFramebuffer:null;wt.bindFramebuffer(k.FRAMEBUFFER,qt)}}},this.readRenderTargetPixelsAsync=async function(R,X,tt,et,q,St,Ot){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xt=At.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ot!==void 0&&(Xt=Xt[Ot]),Xt){const qt=R.texture,ne=qt.format,se=qt.type;if(!Et.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Et.textureTypeReadable(se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=R.width-et&&tt>=0&&tt<=R.height-q){wt.bindFramebuffer(k.FRAMEBUFFER,Xt);const Zt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Zt),k.bufferData(k.PIXEL_PACK_BUFFER,St.byteLength,k.STREAM_READ),k.readPixels(X,tt,et,q,ee.convert(ne),ee.convert(se),0);const he=O!==null?At.get(O).__webglFramebuffer:null;wt.bindFramebuffer(k.FRAMEBUFFER,he);const ve=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await yp(k,ve,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Zt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,St),k.deleteBuffer(Zt),k.deleteSync(ve),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,X=null,tt=0){R.isTexture!==!0&&(xo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,R=arguments[1]);const et=Math.pow(2,-tt),q=Math.floor(R.image.width*et),St=Math.floor(R.image.height*et),Ot=X!==null?X.x:0,Xt=X!==null?X.y:0;I.setTexture2D(R,0),k.copyTexSubImage2D(k.TEXTURE_2D,tt,0,0,Ot,Xt,q,St),wt.unbindTexture()},this.copyTextureToTexture=function(R,X,tt=null,et=null,q=0){R.isTexture!==!0&&(xo("WebGLRenderer: copyTextureToTexture function signature has changed."),et=arguments[0]||null,R=arguments[1],X=arguments[2],q=arguments[3]||0,tt=null);let St,Ot,Xt,qt,ne,se,Zt,he,ve;const Me=R.isCompressedTexture?R.mipmaps[q]:R.image;tt!==null?(St=tt.max.x-tt.min.x,Ot=tt.max.y-tt.min.y,Xt=tt.isBox3?tt.max.z-tt.min.z:1,qt=tt.min.x,ne=tt.min.y,se=tt.isBox3?tt.min.z:0):(St=Me.width,Ot=Me.height,Xt=Me.depth||1,qt=0,ne=0,se=0),et!==null?(Zt=et.x,he=et.y,ve=et.z):(Zt=0,he=0,ve=0);const Ne=ee.convert(X.format),Wt=ee.convert(X.type);let Tt;X.isData3DTexture?(I.setTexture3D(X,0),Tt=k.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(I.setTexture2DArray(X,0),Tt=k.TEXTURE_2D_ARRAY):(I.setTexture2D(X,0),Tt=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,X.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,X.unpackAlignment);const cn=k.getParameter(k.UNPACK_ROW_LENGTH),de=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Be=k.getParameter(k.UNPACK_SKIP_PIXELS),Un=k.getParameter(k.UNPACK_SKIP_ROWS),Kt=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,Me.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Me.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,qt),k.pixelStorei(k.UNPACK_SKIP_ROWS,ne),k.pixelStorei(k.UNPACK_SKIP_IMAGES,se);const Ee=R.isDataArrayTexture||R.isData3DTexture,xe=X.isDataArrayTexture||X.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){const en=At.get(R),He=At.get(X),hn=At.get(en.__renderTarget),pn=At.get(He.__renderTarget);wt.bindFramebuffer(k.READ_FRAMEBUFFER,hn.__webglFramebuffer),wt.bindFramebuffer(k.DRAW_FRAMEBUFFER,pn.__webglFramebuffer);for(let qe=0;qe<Xt;qe++)Ee&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,At.get(R).__webglTexture,q,se+qe),R.isDepthTexture?(xe&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,At.get(X).__webglTexture,q,ve+qe),k.blitFramebuffer(qt,ne,St,Ot,Zt,he,St,Ot,k.DEPTH_BUFFER_BIT,k.NEAREST)):xe?k.copyTexSubImage3D(Tt,q,Zt,he,ve+qe,qt,ne,St,Ot):k.copyTexSubImage2D(Tt,q,Zt,he,ve+qe,qt,ne,St,Ot);wt.bindFramebuffer(k.READ_FRAMEBUFFER,null),wt.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else xe?R.isDataTexture||R.isData3DTexture?k.texSubImage3D(Tt,q,Zt,he,ve,St,Ot,Xt,Ne,Wt,Me.data):X.isCompressedArrayTexture?k.compressedTexSubImage3D(Tt,q,Zt,he,ve,St,Ot,Xt,Ne,Me.data):k.texSubImage3D(Tt,q,Zt,he,ve,St,Ot,Xt,Ne,Wt,Me):R.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,q,Zt,he,St,Ot,Ne,Wt,Me.data):R.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,q,Zt,he,Me.width,Me.height,Ne,Me.data):k.texSubImage2D(k.TEXTURE_2D,q,Zt,he,St,Ot,Ne,Wt,Me);k.pixelStorei(k.UNPACK_ROW_LENGTH,cn),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,de),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Be),k.pixelStorei(k.UNPACK_SKIP_ROWS,Un),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Kt),q===0&&X.generateMipmaps&&k.generateMipmap(Tt),wt.unbindTexture()},this.copyTextureToTexture3D=function(R,X,tt=null,et=null,q=0){return R.isTexture!==!0&&(xo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),tt=arguments[0]||null,et=arguments[1]||null,R=arguments[2],X=arguments[3],q=arguments[4]||0),xo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,X,tt,et,q)},this.initRenderTarget=function(R){At.get(R).__webglFramebuffer===void 0&&I.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?I.setTextureCube(R,0):R.isData3DTexture?I.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?I.setTexture2DArray(R,0):I.setTexture2D(R,0),wt.unbindTexture()},this.resetState=function(){N=0,D=0,O=null,wt.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=_e._getDrawingBufferColorSpace(t),e.unpackColorSpace=_e._getUnpackColorSpace()}}class gc{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new pe(t),this.near=e,this.far=i}clone(){return new gc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class D0 extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class N0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=jl,this.updateRanges=[],this.version=0,this.uuid=ai()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let o=0,a=this.stride;o<a;o++)this.array[t+o]=e.array[i+o];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const sn=new V;class kr{constructor(t,e,i,o=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=o}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)sn.fromBufferAttribute(this,e),sn.applyMatrix4(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)sn.fromBufferAttribute(this,e),sn.applyNormalMatrix(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)sn.fromBufferAttribute(this,e),sn.transformDirection(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Vn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=we(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Vn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Vn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Vn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Vn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=we(e,this.array),i=we(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=we(e,this.array),i=we(i,this.array),o=we(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=o,this}setXYZW(t,e,i,o,a){return t=t*this.data.stride+this.offset,this.normalized&&(e=we(e,this.array),i=we(i,this.array),o=we(o,this.array),a=we(a,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=o,this.data.array[t+3]=a,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const o=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[o+a])}return new Nn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new kr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const o=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[o+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ed extends Zs{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new pe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ws;const ho=new V,Es=new V,bs=new V,Ts=new bt,uo=new bt,bd=new Pe,gr=new V,fo=new V,vr=new V,uu=new bt,Ya=new bt,du=new bt;class U0 extends Ze{constructor(t=new Ed){if(super(),this.isSprite=!0,this.type="Sprite",ws===void 0){ws=new Qe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new N0(e,5);ws.setIndex([0,1,2,0,2,3]),ws.setAttribute("position",new kr(i,3,0,!1)),ws.setAttribute("uv",new kr(i,2,3,!1))}this.geometry=ws,this.material=t,this.center=new bt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Es.setFromMatrixScale(this.matrixWorld),bd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),bs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Es.multiplyScalar(-bs.z);const i=this.material.rotation;let o,a;i!==0&&(a=Math.cos(i),o=Math.sin(i));const l=this.center;xr(gr.set(-.5,-.5,0),bs,l,Es,o,a),xr(fo.set(.5,-.5,0),bs,l,Es,o,a),xr(vr.set(.5,.5,0),bs,l,Es,o,a),uu.set(0,0),Ya.set(1,0),du.set(1,1);let c=t.ray.intersectTriangle(gr,fo,vr,!1,ho);if(c===null&&(xr(fo.set(-.5,.5,0),bs,l,Es,o,a),Ya.set(0,1),c=t.ray.intersectTriangle(gr,vr,fo,!1,ho),c===null))return;const u=t.ray.origin.distanceTo(ho);u<t.near||u>t.far||e.push({distance:u,point:ho.clone(),uv:Mn.getInterpolation(ho,gr,fo,vr,uu,Ya,du,new bt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function xr(s,t,e,i,o,a){Ts.subVectors(s,e).addScalar(.5).multiply(i),o!==void 0?(uo.x=a*Ts.x-o*Ts.y,uo.y=o*Ts.x+a*Ts.y):uo.copy(Ts),s.copy(t),s.x+=uo.x,s.y+=uo.y,s.applyMatrix4(bd)}class Zr extends rn{constructor(t,e,i,o,a,l,c,u,d){super(t,e,i,o,a,l,c,u,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Zn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,o=this.getPoint(0),a=0;e.push(0);for(let l=1;l<=t;l++)i=this.getPoint(l/t),a+=i.distanceTo(o),e.push(a),o=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let o=0;const a=i.length;let l;e?l=e:l=t*i[a-1];let c=0,u=a-1,d;for(;c<=u;)if(o=Math.floor(c+(u-c)/2),d=i[o]-l,d<0)c=o+1;else if(d>0)u=o-1;else{u=o;break}if(o=u,i[o]===l)return o/(a-1);const m=i[o],g=i[o+1]-m,v=(l-m)/g;return(o+v)/(a-1)}getTangent(t,e){let o=t-1e-4,a=t+1e-4;o<0&&(o=0),a>1&&(a=1);const l=this.getPoint(o),c=this.getPoint(a),u=e||(l.isVector2?new bt:new V);return u.copy(c).sub(l).normalize(),u}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new V,o=[],a=[],l=[],c=new V,u=new Pe;for(let v=0;v<=t;v++){const M=v/t;o[v]=this.getTangentAt(M,new V)}a[0]=new V,l[0]=new V;let d=Number.MAX_VALUE;const m=Math.abs(o[0].x),p=Math.abs(o[0].y),g=Math.abs(o[0].z);m<=d&&(d=m,i.set(1,0,0)),p<=d&&(d=p,i.set(0,1,0)),g<=d&&i.set(0,0,1),c.crossVectors(o[0],i).normalize(),a[0].crossVectors(o[0],c),l[0].crossVectors(o[0],a[0]);for(let v=1;v<=t;v++){if(a[v]=a[v-1].clone(),l[v]=l[v-1].clone(),c.crossVectors(o[v-1],o[v]),c.length()>Number.EPSILON){c.normalize();const M=Math.acos(Je(o[v-1].dot(o[v]),-1,1));a[v].applyMatrix4(u.makeRotationAxis(c,M))}l[v].crossVectors(o[v],a[v])}if(e===!0){let v=Math.acos(Je(a[0].dot(a[t]),-1,1));v/=t,o[0].dot(c.crossVectors(a[0],a[t]))>0&&(v=-v);for(let M=1;M<=t;M++)a[M].applyMatrix4(u.makeRotationAxis(o[M],v*M)),l[M].crossVectors(o[M],a[M])}return{tangents:o,normals:a,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class vc extends Zn{constructor(t=0,e=0,i=1,o=1,a=0,l=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=o,this.aStartAngle=a,this.aEndAngle=l,this.aClockwise=c,this.aRotation=u}getPoint(t,e=new bt){const i=e,o=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const l=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=o;for(;a>o;)a-=o;a<Number.EPSILON&&(l?a=0:a=o),this.aClockwise===!0&&!l&&(a===o?a=-o:a=a-o);const c=this.aStartAngle+t*a;let u=this.aX+this.xRadius*Math.cos(c),d=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const m=Math.cos(this.aRotation),p=Math.sin(this.aRotation),g=u-this.aX,v=d-this.aY;u=g*m-v*p+this.aX,d=g*p+v*m+this.aY}return i.set(u,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class O0 extends vc{constructor(t,e,i,o,a,l){super(t,e,i,i,o,a,l),this.isArcCurve=!0,this.type="ArcCurve"}}function xc(){let s=0,t=0,e=0,i=0;function o(a,l,c,u){s=a,t=c,e=-3*a+3*l-2*c-u,i=2*a-2*l+c+u}return{initCatmullRom:function(a,l,c,u,d){o(l,c,d*(c-a),d*(u-l))},initNonuniformCatmullRom:function(a,l,c,u,d,m,p){let g=(l-a)/d-(c-a)/(d+m)+(c-l)/m,v=(c-l)/m-(u-l)/(m+p)+(u-c)/p;g*=m,v*=m,o(l,c,g,v)},calc:function(a){const l=a*a,c=l*a;return s+t*a+e*l+i*c}}}const yr=new V,$a=new xc,Ka=new xc,ja=new xc;class z0 extends Zn{constructor(t=[],e=!1,i="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=o}getPoint(t,e=new V){const i=e,o=this.points,a=o.length,l=(a-(this.closed?0:1))*t;let c=Math.floor(l),u=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/a)+1)*a:u===0&&c===a-1&&(c=a-2,u=1);let d,m;this.closed||c>0?d=o[(c-1)%a]:(yr.subVectors(o[0],o[1]).add(o[0]),d=yr);const p=o[c%a],g=o[(c+1)%a];if(this.closed||c+2<a?m=o[(c+2)%a]:(yr.subVectors(o[a-1],o[a-2]).add(o[a-1]),m=yr),this.curveType==="centripetal"||this.curveType==="chordal"){const v=this.curveType==="chordal"?.5:.25;let M=Math.pow(d.distanceToSquared(p),v),w=Math.pow(p.distanceToSquared(g),v),x=Math.pow(g.distanceToSquared(m),v);w<1e-4&&(w=1),M<1e-4&&(M=w),x<1e-4&&(x=w),$a.initNonuniformCatmullRom(d.x,p.x,g.x,m.x,M,w,x),Ka.initNonuniformCatmullRom(d.y,p.y,g.y,m.y,M,w,x),ja.initNonuniformCatmullRom(d.z,p.z,g.z,m.z,M,w,x)}else this.curveType==="catmullrom"&&($a.initCatmullRom(d.x,p.x,g.x,m.x,this.tension),Ka.initCatmullRom(d.y,p.y,g.y,m.y,this.tension),ja.initCatmullRom(d.z,p.z,g.z,m.z,this.tension));return i.set($a.calc(u),Ka.calc(u),ja.calc(u)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const o=t.points[e];this.points.push(o.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const o=this.points[e];t.points.push(o.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const o=t.points[e];this.points.push(new V().fromArray(o))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function fu(s,t,e,i,o){const a=(i-t)*.5,l=(o-e)*.5,c=s*s,u=s*c;return(2*e-2*i+a+l)*u+(-3*e+3*i-2*a-l)*c+a*s+e}function k0(s,t){const e=1-s;return e*e*t}function F0(s,t){return 2*(1-s)*s*t}function B0(s,t){return s*s*t}function So(s,t,e,i){return k0(s,t)+F0(s,e)+B0(s,i)}function H0(s,t){const e=1-s;return e*e*e*t}function V0(s,t){const e=1-s;return 3*e*e*s*t}function G0(s,t){return 3*(1-s)*s*s*t}function W0(s,t){return s*s*s*t}function wo(s,t,e,i,o){return H0(s,t)+V0(s,e)+G0(s,i)+W0(s,o)}class Td extends Zn{constructor(t=new bt,e=new bt,i=new bt,o=new bt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=o}getPoint(t,e=new bt){const i=e,o=this.v0,a=this.v1,l=this.v2,c=this.v3;return i.set(wo(t,o.x,a.x,l.x,c.x),wo(t,o.y,a.y,l.y,c.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Z0 extends Zn{constructor(t=new V,e=new V,i=new V,o=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=o}getPoint(t,e=new V){const i=e,o=this.v0,a=this.v1,l=this.v2,c=this.v3;return i.set(wo(t,o.x,a.x,l.x,c.x),wo(t,o.y,a.y,l.y,c.y),wo(t,o.z,a.z,l.z,c.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ad extends Zn{constructor(t=new bt,e=new bt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new bt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new bt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class X0 extends Zn{constructor(t=new V,e=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new V){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new V){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cd extends Zn{constructor(t=new bt,e=new bt,i=new bt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new bt){const i=e,o=this.v0,a=this.v1,l=this.v2;return i.set(So(t,o.x,a.x,l.x),So(t,o.y,a.y,l.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class q0 extends Zn{constructor(t=new V,e=new V,i=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new V){const i=e,o=this.v0,a=this.v1,l=this.v2;return i.set(So(t,o.x,a.x,l.x),So(t,o.y,a.y,l.y),So(t,o.z,a.z,l.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Pd extends Zn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new bt){const i=e,o=this.points,a=(o.length-1)*t,l=Math.floor(a),c=a-l,u=o[l===0?l:l-1],d=o[l],m=o[l>o.length-2?o.length-1:l+1],p=o[l>o.length-3?o.length-1:l+2];return i.set(fu(c,u.x,d.x,m.x,p.x),fu(c,u.y,d.y,m.y,p.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const o=t.points[e];this.points.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const o=this.points[e];t.points.push(o.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const o=t.points[e];this.points.push(new bt().fromArray(o))}return this}}var tc=Object.freeze({__proto__:null,ArcCurve:O0,CatmullRomCurve3:z0,CubicBezierCurve:Td,CubicBezierCurve3:Z0,EllipseCurve:vc,LineCurve:Ad,LineCurve3:X0,QuadraticBezierCurve:Cd,QuadraticBezierCurve3:q0,SplineCurve:Pd});class Y0 extends Zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tc[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),o=this.getCurveLengths();let a=0;for(;a<o.length;){if(o[a]>=i){const l=o[a]-i,c=this.curves[a],u=c.getLength(),d=u===0?0:1-l/u;return c.getPointAt(d,e)}a++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,o=this.curves.length;i<o;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let o=0,a=this.curves;o<a.length;o++){const l=a[o],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,u=l.getPoints(c);for(let d=0;d<u.length;d++){const m=u[d];i&&i.equals(m)||(e.push(m),i=m)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const o=t.curves[e];this.curves.push(o.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const o=this.curves[e];t.curves.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const o=t.curves[e];this.curves.push(new tc[o.type]().fromJSON(o))}return this}}class pu extends Y0{constructor(t){super(),this.type="Path",this.currentPoint=new bt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Ad(this.currentPoint.clone(),new bt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,o){const a=new Cd(this.currentPoint.clone(),new bt(t,e),new bt(i,o));return this.curves.push(a),this.currentPoint.set(i,o),this}bezierCurveTo(t,e,i,o,a,l){const c=new Td(this.currentPoint.clone(),new bt(t,e),new bt(i,o),new bt(a,l));return this.curves.push(c),this.currentPoint.set(a,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Pd(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(t+c,e+u,i,o,a,l),this}absarc(t,e,i,o,a,l){return this.absellipse(t,e,i,i,o,a,l),this}ellipse(t,e,i,o,a,l,c,u){const d=this.currentPoint.x,m=this.currentPoint.y;return this.absellipse(t+d,e+m,i,o,a,l,c,u),this}absellipse(t,e,i,o,a,l,c,u){const d=new vc(t,e,i,o,a,l,c,u);if(this.curves.length>0){const p=d.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(d);const m=d.getPoint(1);return this.currentPoint.copy(m),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class an extends Qe{constructor(t=1,e=1,i=1,o=32,a=1,l=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:o,heightSegments:a,openEnded:l,thetaStart:c,thetaLength:u};const d=this;o=Math.floor(o),a=Math.floor(a);const m=[],p=[],g=[],v=[];let M=0;const w=[],x=i/2;let _=0;b(),l===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(m),this.setAttribute("position",new Te(p,3)),this.setAttribute("normal",new Te(g,3)),this.setAttribute("uv",new Te(v,2));function b(){const S=new V,U=new V;let N=0;const D=(e-t)/i;for(let O=0;O<=a;O++){const P=[],T=O/a,z=T*(e-t)+t;for(let G=0;G<=o;G++){const H=G/o,F=H*u+c,j=Math.sin(F),Y=Math.cos(F);U.x=z*j,U.y=-T*i+x,U.z=z*Y,p.push(U.x,U.y,U.z),S.set(j,D,Y).normalize(),g.push(S.x,S.y,S.z),v.push(H,1-T),P.push(M++)}w.push(P)}for(let O=0;O<o;O++)for(let P=0;P<a;P++){const T=w[P][O],z=w[P+1][O],G=w[P+1][O+1],H=w[P][O+1];(t>0||P!==0)&&(m.push(T,z,H),N+=3),(e>0||P!==a-1)&&(m.push(z,G,H),N+=3)}d.addGroup(_,N,0),_+=N}function E(S){const U=M,N=new bt,D=new V;let O=0;const P=S===!0?t:e,T=S===!0?1:-1;for(let G=1;G<=o;G++)p.push(0,x*T,0),g.push(0,T,0),v.push(.5,.5),M++;const z=M;for(let G=0;G<=o;G++){const F=G/o*u+c,j=Math.cos(F),Y=Math.sin(F);D.x=P*Y,D.y=x*T,D.z=P*j,p.push(D.x,D.y,D.z),g.push(0,T,0),N.x=j*.5+.5,N.y=Y*.5*T+.5,v.push(N.x,N.y),M++}for(let G=0;G<o;G++){const H=U+G,F=z+G;S===!0?m.push(F,F+1,H):m.push(F+1,F,H),O+=3}d.addGroup(_,O,S===!0?1:2),_+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new an(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yc extends an{constructor(t=1,e=1,i=32,o=1,a=!1,l=0,c=Math.PI*2){super(0,t,e,i,o,a,l,c),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:o,openEnded:a,thetaStart:l,thetaLength:c}}static fromJSON(t){return new yc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Xr extends Qe{constructor(t=[],e=[],i=1,o=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:o};const a=[],l=[];c(o),d(i),m(),this.setAttribute("position",new Te(a,3)),this.setAttribute("normal",new Te(a.slice(),3)),this.setAttribute("uv",new Te(l,2)),o===0?this.computeVertexNormals():this.normalizeNormals();function c(b){const E=new V,S=new V,U=new V;for(let N=0;N<e.length;N+=3)v(e[N+0],E),v(e[N+1],S),v(e[N+2],U),u(E,S,U,b)}function u(b,E,S,U){const N=U+1,D=[];for(let O=0;O<=N;O++){D[O]=[];const P=b.clone().lerp(S,O/N),T=E.clone().lerp(S,O/N),z=N-O;for(let G=0;G<=z;G++)G===0&&O===N?D[O][G]=P:D[O][G]=P.clone().lerp(T,G/z)}for(let O=0;O<N;O++)for(let P=0;P<2*(N-O)-1;P++){const T=Math.floor(P/2);P%2===0?(g(D[O][T+1]),g(D[O+1][T]),g(D[O][T])):(g(D[O][T+1]),g(D[O+1][T+1]),g(D[O+1][T]))}}function d(b){const E=new V;for(let S=0;S<a.length;S+=3)E.x=a[S+0],E.y=a[S+1],E.z=a[S+2],E.normalize().multiplyScalar(b),a[S+0]=E.x,a[S+1]=E.y,a[S+2]=E.z}function m(){const b=new V;for(let E=0;E<a.length;E+=3){b.x=a[E+0],b.y=a[E+1],b.z=a[E+2];const S=x(b)/2/Math.PI+.5,U=_(b)/Math.PI+.5;l.push(S,1-U)}M(),p()}function p(){for(let b=0;b<l.length;b+=6){const E=l[b+0],S=l[b+2],U=l[b+4],N=Math.max(E,S,U),D=Math.min(E,S,U);N>.9&&D<.1&&(E<.2&&(l[b+0]+=1),S<.2&&(l[b+2]+=1),U<.2&&(l[b+4]+=1))}}function g(b){a.push(b.x,b.y,b.z)}function v(b,E){const S=b*3;E.x=t[S+0],E.y=t[S+1],E.z=t[S+2]}function M(){const b=new V,E=new V,S=new V,U=new V,N=new bt,D=new bt,O=new bt;for(let P=0,T=0;P<a.length;P+=9,T+=6){b.set(a[P+0],a[P+1],a[P+2]),E.set(a[P+3],a[P+4],a[P+5]),S.set(a[P+6],a[P+7],a[P+8]),N.set(l[T+0],l[T+1]),D.set(l[T+2],l[T+3]),O.set(l[T+4],l[T+5]),U.copy(b).add(E).add(S).divideScalar(3);const z=x(U);w(N,T+0,b,z),w(D,T+2,E,z),w(O,T+4,S,z)}}function w(b,E,S,U){U<0&&b.x===1&&(l[E]=b.x-1),S.x===0&&S.z===0&&(l[E]=U/2/Math.PI+.5)}function x(b){return Math.atan2(b.z,-b.x)}function _(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xr(t.vertices,t.indices,t.radius,t.details)}}class Mc extends Xr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,o=1/i,a=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-o,-i,0,-o,i,0,o,-i,0,o,i,-o,-i,0,-o,i,0,o,-i,0,o,i,0,-i,0,-o,i,0,-o,-i,0,o,i,0,o],l=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(a,l,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Mc(t.radius,t.detail)}}class Ld extends pu{constructor(t){super(t),this.uuid=ai(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,o=this.holes.length;i<o;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const o=t.holes[e];this.holes.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const o=this.holes[e];t.holes.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const o=t.holes[e];this.holes.push(new pu().fromJSON(o))}return this}}const $0={triangulate:function(s,t,e=2){const i=t&&t.length,o=i?t[0]*e:s.length;let a=Rd(s,0,o,e,!0);const l=[];if(!a||a.next===a.prev)return l;let c,u,d,m,p,g,v;if(i&&(a=tx(s,t,a,e)),s.length>80*e){c=d=s[0],u=m=s[1];for(let M=e;M<o;M+=e)p=s[M],g=s[M+1],p<c&&(c=p),g<u&&(u=g),p>d&&(d=p),g>m&&(m=g);v=Math.max(d-c,m-u),v=v!==0?32767/v:0}return To(a,l,e,c,u,v,0),l}};function Rd(s,t,e,i,o){let a,l;if(o===ux(s,t,e,i)>0)for(a=t;a<e;a+=i)l=mu(a,s[a],s[a+1],l);else for(a=e-i;a>=t;a-=i)l=mu(a,s[a],s[a+1],l);return l&&qr(l,l.next)&&(Co(l),l=l.next),l}function Qi(s,t){if(!s)return s;t||(t=s);let e=s,i;do if(i=!1,!e.steiner&&(qr(e,e.next)||Re(e.prev,e,e.next)===0)){if(Co(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function To(s,t,e,i,o,a,l){if(!s)return;!l&&a&&ox(s,i,o,a);let c=s,u,d;for(;s.prev!==s.next;){if(u=s.prev,d=s.next,a?j0(s,i,o,a):K0(s)){t.push(u.i/e|0),t.push(s.i/e|0),t.push(d.i/e|0),Co(s),s=d.next,c=d.next;continue}if(s=d,s===c){l?l===1?(s=J0(Qi(s),t,e),To(s,t,e,i,o,a,2)):l===2&&Q0(s,t,e,i,o,a):To(Qi(s),t,e,i,o,a,1);break}}}function K0(s){const t=s.prev,e=s,i=s.next;if(Re(t,e,i)>=0)return!1;const o=t.x,a=e.x,l=i.x,c=t.y,u=e.y,d=i.y,m=o<a?o<l?o:l:a<l?a:l,p=c<u?c<d?c:d:u<d?u:d,g=o>a?o>l?o:l:a>l?a:l,v=c>u?c>d?c:d:u>d?u:d;let M=i.next;for(;M!==t;){if(M.x>=m&&M.x<=g&&M.y>=p&&M.y<=v&&Is(o,c,a,u,l,d,M.x,M.y)&&Re(M.prev,M,M.next)>=0)return!1;M=M.next}return!0}function j0(s,t,e,i){const o=s.prev,a=s,l=s.next;if(Re(o,a,l)>=0)return!1;const c=o.x,u=a.x,d=l.x,m=o.y,p=a.y,g=l.y,v=c<u?c<d?c:d:u<d?u:d,M=m<p?m<g?m:g:p<g?p:g,w=c>u?c>d?c:d:u>d?u:d,x=m>p?m>g?m:g:p>g?p:g,_=ec(v,M,t,e,i),b=ec(w,x,t,e,i);let E=s.prevZ,S=s.nextZ;for(;E&&E.z>=_&&S&&S.z<=b;){if(E.x>=v&&E.x<=w&&E.y>=M&&E.y<=x&&E!==o&&E!==l&&Is(c,m,u,p,d,g,E.x,E.y)&&Re(E.prev,E,E.next)>=0||(E=E.prevZ,S.x>=v&&S.x<=w&&S.y>=M&&S.y<=x&&S!==o&&S!==l&&Is(c,m,u,p,d,g,S.x,S.y)&&Re(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;E&&E.z>=_;){if(E.x>=v&&E.x<=w&&E.y>=M&&E.y<=x&&E!==o&&E!==l&&Is(c,m,u,p,d,g,E.x,E.y)&&Re(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;S&&S.z<=b;){if(S.x>=v&&S.x<=w&&S.y>=M&&S.y<=x&&S!==o&&S!==l&&Is(c,m,u,p,d,g,S.x,S.y)&&Re(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function J0(s,t,e){let i=s;do{const o=i.prev,a=i.next.next;!qr(o,a)&&Id(o,i,i.next,a)&&Ao(o,a)&&Ao(a,o)&&(t.push(o.i/e|0),t.push(i.i/e|0),t.push(a.i/e|0),Co(i),Co(i.next),i=s=a),i=i.next}while(i!==s);return Qi(i)}function Q0(s,t,e,i,o,a){let l=s;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&lx(l,c)){let u=Dd(l,c);l=Qi(l,l.next),u=Qi(u,u.next),To(l,t,e,i,o,a,0),To(u,t,e,i,o,a,0);return}c=c.next}l=l.next}while(l!==s)}function tx(s,t,e,i){const o=[];let a,l,c,u,d;for(a=0,l=t.length;a<l;a++)c=t[a]*i,u=a<l-1?t[a+1]*i:s.length,d=Rd(s,c,u,i,!1),d===d.next&&(d.steiner=!0),o.push(ax(d));for(o.sort(ex),a=0;a<o.length;a++)e=nx(o[a],e);return e}function ex(s,t){return s.x-t.x}function nx(s,t){const e=ix(s,t);if(!e)return t;const i=Dd(e,s);return Qi(i,i.next),Qi(e,e.next)}function ix(s,t){let e=t,i=-1/0,o;const a=s.x,l=s.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const g=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(g<=a&&g>i&&(i=g,o=e.x<e.next.x?e:e.next,g===a))return o}e=e.next}while(e!==t);if(!o)return null;const c=o,u=o.x,d=o.y;let m=1/0,p;e=o;do a>=e.x&&e.x>=u&&a!==e.x&&Is(l<d?a:i,l,u,d,l<d?i:a,l,e.x,e.y)&&(p=Math.abs(l-e.y)/(a-e.x),Ao(e,s)&&(p<m||p===m&&(e.x>o.x||e.x===o.x&&sx(o,e)))&&(o=e,m=p)),e=e.next;while(e!==c);return o}function sx(s,t){return Re(s.prev,s,t.prev)<0&&Re(t.next,s,s.next)<0}function ox(s,t,e,i){let o=s;do o.z===0&&(o.z=ec(o.x,o.y,t,e,i)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==s);o.prevZ.nextZ=null,o.prevZ=null,rx(o)}function rx(s){let t,e,i,o,a,l,c,u,d=1;do{for(e=s,s=null,a=null,l=0;e;){for(l++,i=e,c=0,t=0;t<d&&(c++,i=i.nextZ,!!i);t++);for(u=d;c>0||u>0&&i;)c!==0&&(u===0||!i||e.z<=i.z)?(o=e,e=e.nextZ,c--):(o=i,i=i.nextZ,u--),a?a.nextZ=o:s=o,o.prevZ=a,a=o;e=i}a.nextZ=null,d*=2}while(l>1);return s}function ec(s,t,e,i,o){return s=(s-e)*o|0,t=(t-i)*o|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function ax(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Is(s,t,e,i,o,a,l,c){return(o-l)*(t-c)>=(s-l)*(a-c)&&(s-l)*(i-c)>=(e-l)*(t-c)&&(e-l)*(a-c)>=(o-l)*(i-c)}function lx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!cx(s,t)&&(Ao(s,t)&&Ao(t,s)&&hx(s,t)&&(Re(s.prev,s,t.prev)||Re(s,t.prev,t))||qr(s,t)&&Re(s.prev,s,s.next)>0&&Re(t.prev,t,t.next)>0)}function Re(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function qr(s,t){return s.x===t.x&&s.y===t.y}function Id(s,t,e,i){const o=Sr(Re(s,t,e)),a=Sr(Re(s,t,i)),l=Sr(Re(e,i,s)),c=Sr(Re(e,i,t));return!!(o!==a&&l!==c||o===0&&Mr(s,e,t)||a===0&&Mr(s,i,t)||l===0&&Mr(e,s,i)||c===0&&Mr(e,t,i))}function Mr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Sr(s){return s>0?1:s<0?-1:0}function cx(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Id(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Ao(s,t){return Re(s.prev,s,s.next)<0?Re(s,t,s.next)>=0&&Re(s,s.prev,t)>=0:Re(s,t,s.prev)<0||Re(s,s.next,t)<0}function hx(s,t){let e=s,i=!1;const o=(s.x+t.x)/2,a=(s.y+t.y)/2;do e.y>a!=e.next.y>a&&e.next.y!==e.y&&o<(e.next.x-e.x)*(a-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==s);return i}function Dd(s,t){const e=new nc(s.i,s.x,s.y),i=new nc(t.i,t.x,t.y),o=s.next,a=t.prev;return s.next=t,t.prev=s,e.next=o,o.prev=e,i.next=e,e.prev=i,a.next=i,i.prev=a,i}function mu(s,t,e,i){const o=new nc(s,t,e);return i?(o.next=i.next,o.prev=i,i.next.prev=o,i.next=o):(o.prev=o,o.next=o),o}function Co(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function nc(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ux(s,t,e,i){let o=0;for(let a=t,l=e-i;a<e;a+=i)o+=(s[l]-s[a])*(s[a+1]+s[l+1]),l=a;return o}class Eo{static area(t){const e=t.length;let i=0;for(let o=e-1,a=0;a<e;o=a++)i+=t[o].x*t[a].y-t[a].x*t[o].y;return i*.5}static isClockWise(t){return Eo.area(t)<0}static triangulateShape(t,e){const i=[],o=[],a=[];_u(t),gu(i,t);let l=t.length;e.forEach(_u);for(let u=0;u<e.length;u++)o.push(l),l+=e[u].length,gu(i,e[u]);const c=$0.triangulate(i,o);for(let u=0;u<c.length;u+=3)a.push(c.slice(u,u+3));return a}}function _u(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function gu(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Sc extends Qe{constructor(t=new Ld([new bt(.5,.5),new bt(-.5,.5),new bt(-.5,-.5),new bt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,o=[],a=[];for(let c=0,u=t.length;c<u;c++){const d=t[c];l(d)}this.setAttribute("position",new Te(o,3)),this.setAttribute("uv",new Te(a,2)),this.computeVertexNormals();function l(c){const u=[],d=e.curveSegments!==void 0?e.curveSegments:12,m=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let g=e.bevelEnabled!==void 0?e.bevelEnabled:!0,v=e.bevelThickness!==void 0?e.bevelThickness:.2,M=e.bevelSize!==void 0?e.bevelSize:v-.1,w=e.bevelOffset!==void 0?e.bevelOffset:0,x=e.bevelSegments!==void 0?e.bevelSegments:3;const _=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:dx;let E,S=!1,U,N,D,O;_&&(E=_.getSpacedPoints(m),S=!0,g=!1,U=_.computeFrenetFrames(m,!1),N=new V,D=new V,O=new V),g||(x=0,v=0,M=0,w=0);const P=c.extractPoints(d);let T=P.shape;const z=P.holes;if(!Eo.isClockWise(T)){T=T.reverse();for(let J=0,ut=z.length;J<ut;J++){const k=z[J];Eo.isClockWise(k)&&(z[J]=k.reverse())}}const H=Eo.triangulateShape(T,z),F=T;for(let J=0,ut=z.length;J<ut;J++){const k=z[J];T=T.concat(k)}function j(J,ut,k){return ut||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(ut,k)}const Y=T.length,ct=H.length;function Z(J,ut,k){let Rt,ht,Et;const wt=J.x-ut.x,Nt=J.y-ut.y,At=k.x-J.x,I=k.y-J.y,A=wt*wt+Nt*Nt,$=wt*I-Nt*At;if(Math.abs($)>Number.EPSILON){const ot=Math.sqrt(A),dt=Math.sqrt(At*At+I*I),at=ut.x-Nt/ot,Vt=ut.y+wt/ot,Ct=k.x-I/dt,Ft=k.y+At/dt,ce=((Ct-at)*I-(Ft-Vt)*At)/(wt*I-Nt*At);Rt=at+wt*ce-J.x,ht=Vt+Nt*ce-J.y;const yt=Rt*Rt+ht*ht;if(yt<=2)return new bt(Rt,ht);Et=Math.sqrt(yt/2)}else{let ot=!1;wt>Number.EPSILON?At>Number.EPSILON&&(ot=!0):wt<-Number.EPSILON?At<-Number.EPSILON&&(ot=!0):Math.sign(Nt)===Math.sign(I)&&(ot=!0),ot?(Rt=-Nt,ht=wt,Et=Math.sqrt(A)):(Rt=wt,ht=Nt,Et=Math.sqrt(A/2))}return new bt(Rt/Et,ht/Et)}const xt=[];for(let J=0,ut=F.length,k=ut-1,Rt=J+1;J<ut;J++,k++,Rt++)k===ut&&(k=0),Rt===ut&&(Rt=0),xt[J]=Z(F[J],F[k],F[Rt]);const st=[];let gt,It=xt.concat();for(let J=0,ut=z.length;J<ut;J++){const k=z[J];gt=[];for(let Rt=0,ht=k.length,Et=ht-1,wt=Rt+1;Rt<ht;Rt++,Et++,wt++)Et===ht&&(Et=0),wt===ht&&(wt=0),gt[Rt]=Z(k[Rt],k[Et],k[wt]);st.push(gt),It=It.concat(gt)}for(let J=0;J<x;J++){const ut=J/x,k=v*Math.cos(ut*Math.PI/2),Rt=M*Math.sin(ut*Math.PI/2)+w;for(let ht=0,Et=F.length;ht<Et;ht++){const wt=j(F[ht],xt[ht],Rt);vt(wt.x,wt.y,-k)}for(let ht=0,Et=z.length;ht<Et;ht++){const wt=z[ht];gt=st[ht];for(let Nt=0,At=wt.length;Nt<At;Nt++){const I=j(wt[Nt],gt[Nt],Rt);vt(I.x,I.y,-k)}}}const Dt=M+w;for(let J=0;J<Y;J++){const ut=g?j(T[J],It[J],Dt):T[J];S?(D.copy(U.normals[0]).multiplyScalar(ut.x),N.copy(U.binormals[0]).multiplyScalar(ut.y),O.copy(E[0]).add(D).add(N),vt(O.x,O.y,O.z)):vt(ut.x,ut.y,0)}for(let J=1;J<=m;J++)for(let ut=0;ut<Y;ut++){const k=g?j(T[ut],It[ut],Dt):T[ut];S?(D.copy(U.normals[J]).multiplyScalar(k.x),N.copy(U.binormals[J]).multiplyScalar(k.y),O.copy(E[J]).add(D).add(N),vt(O.x,O.y,O.z)):vt(k.x,k.y,p/m*J)}for(let J=x-1;J>=0;J--){const ut=J/x,k=v*Math.cos(ut*Math.PI/2),Rt=M*Math.sin(ut*Math.PI/2)+w;for(let ht=0,Et=F.length;ht<Et;ht++){const wt=j(F[ht],xt[ht],Rt);vt(wt.x,wt.y,p+k)}for(let ht=0,Et=z.length;ht<Et;ht++){const wt=z[ht];gt=st[ht];for(let Nt=0,At=wt.length;Nt<At;Nt++){const I=j(wt[Nt],gt[Nt],Rt);S?vt(I.x,I.y+E[m-1].y,E[m-1].x+k):vt(I.x,I.y,p+k)}}}Q(),rt();function Q(){const J=o.length/3;if(g){let ut=0,k=Y*ut;for(let Rt=0;Rt<ct;Rt++){const ht=H[Rt];Bt(ht[2]+k,ht[1]+k,ht[0]+k)}ut=m+x*2,k=Y*ut;for(let Rt=0;Rt<ct;Rt++){const ht=H[Rt];Bt(ht[0]+k,ht[1]+k,ht[2]+k)}}else{for(let ut=0;ut<ct;ut++){const k=H[ut];Bt(k[2],k[1],k[0])}for(let ut=0;ut<ct;ut++){const k=H[ut];Bt(k[0]+Y*m,k[1]+Y*m,k[2]+Y*m)}}i.addGroup(J,o.length/3-J,0)}function rt(){const J=o.length/3;let ut=0;pt(F,ut),ut+=F.length;for(let k=0,Rt=z.length;k<Rt;k++){const ht=z[k];pt(ht,ut),ut+=ht.length}i.addGroup(J,o.length/3-J,1)}function pt(J,ut){let k=J.length;for(;--k>=0;){const Rt=k;let ht=k-1;ht<0&&(ht=J.length-1);for(let Et=0,wt=m+x*2;Et<wt;Et++){const Nt=Y*Et,At=Y*(Et+1),I=ut+Rt+Nt,A=ut+ht+Nt,$=ut+ht+At,ot=ut+Rt+At;jt(I,A,$,ot)}}}function vt(J,ut,k){u.push(J),u.push(ut),u.push(k)}function Bt(J,ut,k){lt(J),lt(ut),lt(k);const Rt=o.length/3,ht=b.generateTopUV(i,o,Rt-3,Rt-2,Rt-1);Mt(ht[0]),Mt(ht[1]),Mt(ht[2])}function jt(J,ut,k,Rt){lt(J),lt(ut),lt(Rt),lt(ut),lt(k),lt(Rt);const ht=o.length/3,Et=b.generateSideWallUV(i,o,ht-6,ht-3,ht-2,ht-1);Mt(Et[0]),Mt(Et[1]),Mt(Et[3]),Mt(Et[1]),Mt(Et[2]),Mt(Et[3])}function lt(J){o.push(u[J*3+0]),o.push(u[J*3+1]),o.push(u[J*3+2])}function Mt(J){a.push(J.x),a.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return fx(e,i,t)}static fromJSON(t,e){const i=[];for(let a=0,l=t.shapes.length;a<l;a++){const c=e[t.shapes[a]];i.push(c)}const o=t.options.extrudePath;return o!==void 0&&(t.options.extrudePath=new tc[o.type]().fromJSON(o)),new Sc(i,t.options)}}const dx={generateTopUV:function(s,t,e,i,o){const a=t[e*3],l=t[e*3+1],c=t[i*3],u=t[i*3+1],d=t[o*3],m=t[o*3+1];return[new bt(a,l),new bt(c,u),new bt(d,m)]},generateSideWallUV:function(s,t,e,i,o,a){const l=t[e*3],c=t[e*3+1],u=t[e*3+2],d=t[i*3],m=t[i*3+1],p=t[i*3+2],g=t[o*3],v=t[o*3+1],M=t[o*3+2],w=t[a*3],x=t[a*3+1],_=t[a*3+2];return Math.abs(c-m)<Math.abs(l-d)?[new bt(l,1-u),new bt(d,1-p),new bt(g,1-M),new bt(w,1-_)]:[new bt(c,1-u),new bt(m,1-p),new bt(v,1-M),new bt(x,1-_)]}};function fx(s,t,e){if(e.shapes=[],Array.isArray(s))for(let i=0,o=s.length;i<o;i++){const a=s[i];e.shapes.push(a.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class wc extends Xr{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],o=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,o,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new wc(t.radius,t.detail)}}class ts extends Qe{constructor(t=1,e=32,i=16,o=0,a=Math.PI*2,l=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:o,phiLength:a,thetaStart:l,thetaLength:c},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const u=Math.min(l+c,Math.PI);let d=0;const m=[],p=new V,g=new V,v=[],M=[],w=[],x=[];for(let _=0;_<=i;_++){const b=[],E=_/i;let S=0;_===0&&l===0?S=.5/e:_===i&&u===Math.PI&&(S=-.5/e);for(let U=0;U<=e;U++){const N=U/e;p.x=-t*Math.cos(o+N*a)*Math.sin(l+E*c),p.y=t*Math.cos(l+E*c),p.z=t*Math.sin(o+N*a)*Math.sin(l+E*c),M.push(p.x,p.y,p.z),g.copy(p).normalize(),w.push(g.x,g.y,g.z),x.push(N+S,1-E),b.push(d++)}m.push(b)}for(let _=0;_<i;_++)for(let b=0;b<e;b++){const E=m[_][b+1],S=m[_][b],U=m[_+1][b],N=m[_+1][b+1];(_!==0||l>0)&&v.push(E,S,N),(_!==i-1||u<Math.PI)&&v.push(S,U,N)}this.setIndex(v),this.setAttribute("position",new Te(M,3)),this.setAttribute("normal",new Te(w,3)),this.setAttribute("uv",new Te(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ts(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ec extends Qe{constructor(t=1,e=.4,i=12,o=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:o,arc:a},i=Math.floor(i),o=Math.floor(o);const l=[],c=[],u=[],d=[],m=new V,p=new V,g=new V;for(let v=0;v<=i;v++)for(let M=0;M<=o;M++){const w=M/o*a,x=v/i*Math.PI*2;p.x=(t+e*Math.cos(x))*Math.cos(w),p.y=(t+e*Math.cos(x))*Math.sin(w),p.z=e*Math.sin(x),c.push(p.x,p.y,p.z),m.x=t*Math.cos(w),m.y=t*Math.sin(w),g.subVectors(p,m).normalize(),u.push(g.x,g.y,g.z),d.push(M/o),d.push(v/i)}for(let v=1;v<=i;v++)for(let M=1;M<=o;M++){const w=(o+1)*v+M-1,x=(o+1)*(v-1)+M-1,_=(o+1)*(v-1)+M,b=(o+1)*v+M;l.push(w,x,b),l.push(x,_,b)}this.setIndex(l),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(u,3)),this.setAttribute("uv",new Te(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ec(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class $t extends Zs{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=od,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nd extends Ze{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new pe(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class px extends Nd{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new pe(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ja=new Pe,vu=new V,xu=new V;class mx{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mc,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new De(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;vu.setFromMatrixPosition(t.matrixWorld),e.position.copy(vu),xu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(xu),e.updateMatrixWorld(),Ja.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ja),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ja)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class _x extends mx{constructor(){super(new vd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class gx extends Nd{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new _x}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class vx extends es{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ac}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ac);const ri={lat:43.26407,lon:-79.90231},Ds=300,Fr=111320,Ud=Math.cos(ri.lat*Math.PI/180);function Br(s,t,e=ri){const i=e===ri?Ud:Math.cos(e.lat*Math.PI/180),o=(t-e.lon)*Fr*i,a=-(s-e.lat)*Fr;return{x:o,z:a}}function Si(s,t,e=ri){const i=e===ri?Ud:Math.cos(e.lat*Math.PI/180),o=e.lat-t/Fr,a=e.lon+s/(Fr*i);return{lat:o,lon:a}}function ic(s,t){return(Math.atan2(s,-t)*180/Math.PI+360)%360}function xx(s){const t=["N","NE","E","SE","S","SW","W","NW"],e=Math.round((s%360+360)%360/45)%8;return t[e]}function Mi(s,t){return{gx:Math.floor(s/Ds),gz:Math.floor(t/Ds)}}function Yr(s,t){return`chunk_${s}_${t}`}function yx(s,t){const e=s*Ds,i=(s+1)*Ds,o=t*Ds,a=(t+1)*Ds,l=Si(e,o),c=Si(i,a);return{south:c.lat,west:l.lon,north:l.lat,east:c.lon}}function Ie(s,t,e,i){return Math.hypot(e-s,i-t)}function ci(s,t,e,i,o,a){const l=o-e,c=a-i,u=l*l+c*c;if(u<1e-8)return{x:e,z:i,t:0,dist:Math.hypot(s-e,t-i)};let d=((s-e)*l+(t-i)*c)/u;d=Math.max(0,Math.min(1,d));const m=e+d*l,p=i+d*c;return{x:m,z:p,t:d,dist:Math.hypot(s-m,t-p)}}function Hr(s,t,e){let i=!1;for(let o=0,a=e.length-1;o<e.length;a=o++){const l=e[o].x,c=e[o].z,u=e[a].x,d=e[a].z;c>t!=d>t&&s<(u-l)*(t-c)/(d-c+1e-12)+l&&(i=!i)}return i}const Mx="westdale-safe-walk-osm-v1",Wn="chunks",Od="https://overpass-api.de/api/interpreter",bc=500;let wr=null,Gs=0,hi=Promise.resolve();function Tc(){return wr||(wr=new Promise(s=>{if(typeof indexedDB>"u"){s(null);return}try{const t=indexedDB.open(Mx,1);t.onupgradeneeded=()=>{const e=t.result;e.objectStoreNames.contains(Wn)||e.createObjectStore(Wn)},t.onsuccess=()=>s(t.result),t.onerror=()=>s(null)}catch{s(null)}}),wr)}async function Sx(s,t){const e=Yr(s,t),i=await Tc();if(i)try{return await new Promise(o=>{const l=i.transaction(Wn,"readonly").objectStore(Wn).get(e);l.onsuccess=()=>o(l.result??null),l.onerror=()=>o(null)})}catch{}try{const o=localStorage.getItem(e);return o?JSON.parse(o):null}catch{return null}}async function wx(s,t,e){const i=Yr(s,t),o=await Tc();if(o)try{await new Promise((a,l)=>{const c=o.transaction(Wn,"readwrite");c.objectStore(Wn).put(e,i),c.oncomplete=()=>a(),c.onerror=()=>l(c.error)});return}catch{}try{localStorage.setItem(i,JSON.stringify(e))}catch{}}async function Ex(){const s=await fetch("/preset-mission.json");if(!s.ok)throw new Error(`Failed to load /preset-mission.json: ${s.status}`);return s.json()}function bx(s,t){const e=async()=>{const i=await Sx(s,t);if(i)return i;const o=Date.now(),a=Math.max(0,bc-(o-Gs));a>0&&await new Promise(g=>setTimeout(g,a)),Gs=Date.now();const l=yx(s,t),c=`${l.south.toFixed(6)},${l.west.toFixed(6)},${l.north.toFixed(6)},${l.east.toFixed(6)}`,u=`
[out:json][timeout:25];
(
  way["highway"](${c});
  node["highway"~"traffic_signals|crossing|stop"](${c});
  way["building"](${c});
  way["leisure"~"park|playground|pitch"](${c});
  node["amenity"~"school|library|place_of_worship"](${c});
);
out body;
>;
out skel qt;
`.trim(),d=await fetch(Od,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:`data=${encodeURIComponent(u)}`});if(!d.ok)throw new Error(`Overpass HTTP ${d.status}`);const p={elements:(await d.json()).elements||[]};return await wx(s,t,p),p};return hi=hi.then(e,e),hi}function Tx(s,t,e=350){const i=`home_${s.toFixed(4)}_${t.toFixed(4)}_${e}`,o=async()=>{const a=await Tc();if(a)try{const g=await new Promise(v=>{const w=a.transaction(Wn,"readonly").objectStore(Wn).get(i);w.onsuccess=()=>v(w.result??null),w.onerror=()=>v(null)});if(g)return g}catch{}const l=Date.now(),c=Math.max(0,bc-(l-Gs));c>0&&await new Promise(g=>setTimeout(g,c)),Gs=Date.now();const u=`
[out:json][timeout:30];
(
  way["highway"](around:${e},${s.toFixed(6)},${t.toFixed(6)});
  node["highway"~"traffic_signals|crossing|stop"](around:${e},${s.toFixed(6)},${t.toFixed(6)});
  way["building"](around:${e},${s.toFixed(6)},${t.toFixed(6)});
  way["leisure"~"park|playground|pitch"](around:${e},${s.toFixed(6)},${t.toFixed(6)});
  node["amenity"~"school|library|place_of_worship"](around:${e},${s.toFixed(6)},${t.toFixed(6)});
);
out body;
>;
out skel qt;
`.trim(),d=await fetch(Od,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:`data=${encodeURIComponent(u)}`});if(!d.ok)throw new Error(`Overpass HTTP ${d.status}`);const p={elements:(await d.json()).elements||[]};if(a)try{await new Promise((g,v)=>{const M=a.transaction(Wn,"readwrite");M.objectStore(Wn).put(p,i),M.oncomplete=()=>g(),M.onerror=()=>v(M.error)})}catch{}return p};return hi=hi.then(o,o),hi}function Ax(s){const t=String(s||"").trim();if(!t)return Promise.resolve([]);const e=async()=>{const i=Date.now(),o=Math.max(0,bc-(i-Gs));o>0&&await new Promise(u=>setTimeout(u,o)),Gs=Date.now();const a=new URLSearchParams({q:t,format:"json",addressdetails:"1",limit:"5",viewbox:"-80.22,43.38,-79.58,43.08"}),l=await fetch(`https://nominatim.openstreetmap.org/search?${a.toString()}`,{headers:{Accept:"application/json"}});if(!l.ok)throw new Error(`Nominatim HTTP ${l.status}`);return(await l.json()||[]).map(u=>({lat:Number.parseFloat(u.lat),lon:Number.parseFloat(u.lon),displayName:u.display_name,shortName:u.display_name.split(",").slice(0,2).join(", ")}))};return hi=hi.then(e,e),hi}async function Cx(s,t,e,i){try{const o=`https://router.project-osrm.org/route/v1/foot/${t},${s};${i},${e}?overview=full&geometries=geojson`,a=await fetch(o);if(!a.ok)return null;const c=(await a.json()).routes?.[0];return c?.geometry?.coordinates?.length?{distance:c.distance,duration:c.duration,coordinates:c.geometry.coordinates}:null}catch{return null}}const Px=new Set(["primary","secondary","tertiary","residential","unclassified","living_street","service"]),Lx=new Set(["footway","path","pedestrian","steps","cycleway"]);function Qa(s){const t=Number.parseInt(s,10);return Number.isFinite(t)&&t>0?t:null}function Rx(s){if(!s)return null;const t=Number.parseFloat(String(s).replace(/m$/i,"").trim());return Number.isFinite(t)&&t>1.5&&t<35?t:null}function Ix(s){const t=s.highway,e=s.name||"",o=/king street/i.test(e)||t==="primary"||t==="secondary"||t==="tertiary",a=s.oneway==="yes"||s.oneway==="1"||s.oneway==="true",l=Qa(s.lanes),c=Qa(s["lanes:forward"]),u=Qa(s["lanes:backward"]);let d=l,m=c,p=u;a?(d=d||c||(t==="service"?1:o?2:1),m=d,p=0):m&&p?d=d||m+p:d?d===1?(m=1,p=0):(m=m||Math.ceil(d/2),p=p||Math.max(1,d-m)):(d=t==="service"?1:2,m=1,p=d===1?0:1);const g=s["cycleway:left"]==="lane"||s["cycleway:both"]==="lane"||s.cycleway==="lane"&&!a,v=s["cycleway:right"]==="lane"||s["cycleway:both"]==="lane"||s.cycleway==="lane",M=t==="service"?3.8:o?3.3:3.05,w=1.45,x=(g?w:0)+(v?w:0),_=Rx(s.width),b=d*M,E=_?Math.max(_,b):b+x,S=(s.sidewalk||"").toLowerCase(),U=(s["sidewalk:left"]||"").toLowerCase(),N=(s["sidewalk:right"]||"").toLowerCase();let D=t!=="service",O=t!=="service";return S==="no"||S==="none"?(D=!1,O=!1):S==="left"?(D=!0,O=!1):S==="right"&&(D=!1,O=!0),(U==="no"||U==="none")&&(D=!1),(N==="no"||N==="none")&&(O=!1),(U==="yes"||U==="separate")&&(D=!0),(N==="yes"||N==="separate")&&(O=!0),{width:E,laneWidth:M,lanes:d,lanesForward:m,lanesBackward:p,oneway:a,hasBikeLeft:g,hasBikeRight:v,bikeLaneWidth:w,sidewalkWidth:t==="service"?1.4:o?2.4:1.9,wantsLeftSidewalk:D,wantsRightSidewalk:O,hasExplicitLeftSidewalk:!1,hasExplicitRightSidewalk:!1,isMajor:o,speedLimit:o?9.8:t==="service"?5.5:7.2}}function yu(s){let t=0,e=0;for(const i of s)t+=i.x,e+=i.z;return{x:t/s.length,z:e/s.length}}function Dx(s){let t=0;for(let e=0;e<s.length;e++){const i=s[e],o=s[(e+1)%s.length];t+=i.x*o.z-o.x*i.z}return Math.abs(t)*.5}function Nx(s){let t=1/0,e=-1/0,i=1/0,o=-1/0;for(const a of s)a.x<t&&(t=a.x),a.x>e&&(e=a.x),a.z<i&&(i=a.z),a.z>o&&(o=a.z);return{minX:t,maxX:e,minZ:i,maxZ:o}}function sc(s){const t=new Map,e=[];for(const _ of s)if(_.type==="node"){const b=t.get(_.id);if(b)_.tags&&(b.tags={...b.tags,..._.tags});else{const E=Br(_.lat,_.lon);t.set(_.id,{id:_.id,lat:_.lat,lon:_.lon,x:E.x,z:E.z,tags:_.tags?{..._.tags}:{}})}}else _.type==="way"&&e.push(_);const i=[],o=[],a=[];for(const _ of t.values())_.tags.name&&(_.tags.amenity||_.tags.shop)&&a.push(_);const l=[],c=[],u=[],d=new Map;for(const _ of e){const b=_.tags||{},E=[];for(const S of _.nodes||[]){const U=t.get(S);U&&E.push({id:U.id,x:U.x,z:U.z,lat:U.lat,lon:U.lon,tags:U.tags})}if(!(E.length<2)){if(b.highway&&Px.has(b.highway)){const S=b.name||"",U=Ix(b),N={id:_.id,name:S,highway:b.highway,...U,points:E};l.push(N);for(let D=0;D<E.length;D++){const O=E[D].id;d.has(O)||d.set(O,[]),d.get(O).push({road:N,index:D})}}else if(b.highway&&Lx.has(b.highway))c.push({id:_.id,name:b.name||"",highway:b.highway,footwayType:b.footway||(b.highway==="cycleway"?"cycleway":"path"),points:E});else if(b.building&&E.length>=3){const S=E[0].id===E[E.length-1].id?E.slice(0,-1):E;S.length>=3&&Dx(S)>=12&&u.push({id:_.id,tags:b,polygon:S,centroid:yu(S),bbox:Nx(S)})}else if((b.amenity==="school"||b.leisure==="park"||b.leisure==="playground"||b.leisure==="pitch")&&E.length>=3){const S=E[0].id===E[E.length-1].id?E.slice(0,-1):E;if(S.length>=3){const U={id:_.id,name:b.name||"",kind:b.amenity==="school"?"school_grounds":b.leisure||"park",polygon:S,centroid:yu(S)};b.amenity==="school"&&i.push(U),o.push(U)}}}}for(const _ of l)_.highway!=="service"&&(_.hasExplicitRightSidewalk=!1,_.hasExplicitLeftSidewalk=!1);const m=u.map(_=>{const b=_.tags;let E=b.name||"",S="house",U=7;if(!E&&(b.building==="school"||Ie(_.centroid.x,_.centroid.z,0,0)<45)){for(const O of i)if(Hr(_.centroid.x,_.centroid.z,O.polygon)){E=O.name;break}}if(!E&&b.building==="school"&&Ie(_.centroid.x,_.centroid.z,0,0)<60&&(E="Cootes Paradise Elementary School"),!E){for(const O of a)if(O.x>=_.bbox.minX-2&&O.x<=_.bbox.maxX+2&&O.z>=_.bbox.minZ-2&&O.z<=_.bbox.maxZ+2&&Hr(O.x,O.z,_.polygon)){E=O.tags.name,!b.shop&&O.tags.shop&&(b.shop=O.tags.shop),!b.amenity&&O.tags.amenity&&(b.amenity=O.tags.amenity);break}}const N=E.toLowerCase(),D=l.some(O=>/king street/i.test(O.name)&&O.points.some(P=>Ie(P.x,P.z,_.centroid.x,_.centroid.z)<34));if(_.id===836552889)S="home",E="Your House",U=7.5;else if(N.includes("cootes paradise")||b.building==="school"&&Ie(_.centroid.x,_.centroid.z,0,0)<70)S="school",E=E||"Cootes Paradise Elementary School",U=10.5;else if(b.building==="school"||N.includes("school"))S="other_school",U=12;else if(b.amenity==="library"||N.includes("library"))S="library",E="Westdale Library",U=9;else if(b.building==="church"||b.amenity==="place_of_worship"||N.includes("church")||N.includes("synagogue"))S="church",U=12.5;else if(b.shop||b.building==="retail"||b.building==="commercial"||["cafe","restaurant","bank","pharmacy","dentist"].includes(b.amenity)||D)S="shop",U=b["building:levels"]?Math.max(6,Number(b["building:levels"])*3.5):8;else{S="house";const O=Number(b["building:levels"])||2;U=Math.min(11,Math.max(5.5,O*3.1+_.id%5*.35))}return{..._,name:E,category:S,height:U}}),p=[],g=[],v=new Set;for(const _ of t.values())if(_.tags.highway==="traffic_signals")p.push(_);else if(_.tags.highway==="stop"){const b=`${Math.round(_.x/8)}_${Math.round(_.z/8)}`;v.has(b)||(v.add(b),g.push({id:`stop_osm_${_.id}`,x:_.x,z:_.z,facingAngle:0}))}const M=[],w=[],x=new Set;for(const[_,b]of d.entries()){const E=new Set(b.map(F=>F.road.name).filter(Boolean));if(b.every(F=>F.road.highway==="service")||E.size<2&&b.length<3)continue;const U=t.get(_);if(!U)continue;const N=[...E],D=N.some(F=>/king street/i.test(F)),O=N.some(F=>/cline/i.test(F)),P=N.some(F=>/paisley/i.test(F)),z=p.some(F=>Ie(F.x,F.z,U.x,U.z)<28)||D&&(O||P);M.push({id:_,x:U.x,z:U.z,lat:U.lat,lon:U.lon,streetNames:N,onKing:D,isSignalized:z});const G=(F,j,Y,ct)=>{let Z=ct,xt=j;for(;xt+Y>=0&&xt+Y<F.points.length;){const st=F.points[xt],gt=F.points[xt+Y],It=gt.x-st.x,Dt=gt.z-st.z,Q=Math.hypot(It,Dt);if(Q>.05){const rt=It/Q,pt=Dt/Q;if(Z<=Q)return{x:st.x+rt*Z,z:st.z+pt*Z,ux:rt,uz:pt,reached:!0};Z-=Q}xt+=Y}return null},H=[];for(const{road:F,index:j}of b)if(F.highway!=="service")for(const Y of[-1,1]){const ct=j+Y;if(ct<0||ct>=F.points.length)continue;const Z=F.points[ct],xt=Z.x-U.x,st=Z.z-U.z,gt=Math.hypot(xt,st);if(gt<1)continue;let It=0;for(let Dt=j;Dt+Y>=0&&Dt+Y<F.points.length&&(It+=Ie(F.points[Dt].x,F.points[Dt].z,F.points[Dt+Y].x,F.points[Dt+Y].z),!(It>25));Dt+=Y);It<5||H.push({road:F,index:j,stepDir:Y,ux:xt/gt,uz:st/gt,totalAvail:It})}for(const F of H){const{road:j,index:Y,stepDir:ct,ux:Z,uz:xt,totalAvail:st}=F;let gt=null,It=0;for(const Mt of H){if(Mt.road.id===j.id)continue;const J=Math.abs(Z*Mt.ux+xt*Mt.uz);if(J>=.72)continue;const ut=Math.max(.75,Math.sqrt(Math.max(.01,1-J*J))),k=(Mt.road.width*.5+Mt.road.sidewalkWidth*.5)/ut;k>It&&(It=k,gt=Mt)}if(!gt||It>st-1)continue;const Dt=G(j,Y,ct,It);if(!Dt)continue;const Q=gt.road,rt=Dt.x,pt=Dt.z,vt=`${Math.round(rt/3.5)}_${Math.round(pt/3.5)}`;if(x.has(vt))continue;x.add(vt);const Bt=z&&(/king street/i.test(j.name)||D),lt=Math.abs(Dt.ux)>=Math.abs(Dt.uz)?"NS_WALK":"EW_WALK";if(w.push({id:`cw_${_}_${j.id}_${Math.round(rt)}`,x:rt,z:pt,roadDirX:Dt.ux,roadDirZ:Dt.uz,width:j.width,depth:Math.max(2.4,Q.sidewalkWidth+.3),roadName:j.name||"Street",intersectionNames:N,isSignalized:Bt,signalGroup:lt,intersectionId:_}),!z&&!/king street/i.test(j.name)){const Mt=Dt.uz,J=-Dt.ux,ut=j.width*.5+.9,k=Math.max(1.8,Q.sidewalkWidth*.65),Rt=rt+Dt.ux*k+Mt*ut,ht=pt+Dt.uz*k+J*ut,Et=`${Math.round(Rt/7)}_${Math.round(ht/7)}`;v.has(Et)||(v.add(Et),g.push({id:`stop_${_}_${j.id}_${Math.round(Rt)}`,x:Rt,z:ht,facingAngle:Math.atan2(Dt.ux,Dt.uz)}))}}}return{roads:l,footways:c,buildings:m,parks:o,intersections:M,crosswalks:w,signalNodes:p,stopSigns:g}}function Mu(s){const t=new Map;function e(i,o){const a=Yr(i,o);return t.has(a)||t.set(a,{gx:i,gz:o,id:a,roads:[],footways:[],buildings:[],parks:[],intersections:[],crosswalks:[],stopSigns:[]}),t.get(a)}for(const i of s.roads){const o=i.points[Math.floor(i.points.length/2)],{gx:a,gz:l}=Mi(o.x,o.z);e(a,l).roads.push(i)}for(const i of s.footways){const o=i.points[Math.floor(i.points.length/2)],{gx:a,gz:l}=Mi(o.x,o.z);e(a,l).footways.push(i)}for(const i of s.buildings){const{gx:o,gz:a}=Mi(i.centroid.x,i.centroid.z);e(o,a).buildings.push(i)}for(const i of s.parks){const{gx:o,gz:a}=Mi(i.centroid.x,i.centroid.z);e(o,a).parks.push(i)}for(const i of s.intersections){const{gx:o,gz:a}=Mi(i.x,i.z);e(o,a).intersections.push(i)}for(const i of s.crosswalks){const{gx:o,gz:a}=Mi(i.x,i.z);e(o,a).crosswalks.push(i)}for(const i of s.stopSigns||[]){const{gx:o,gz:a}=Mi(i.x,i.z);e(o,a).stopSigns.push(i)}return t}const Su=[16708551,16772565,14742270,16574451,14870768,16639626,14482663],wu=[16478597,3718648,16498468,3462041,10980346,16347926];function Ac(s,t="#1e3a8a",e="#ffffff",i="#ffffff",o=512,a=160){const l=document.createElement("canvas");l.width=o,l.height=a;const c=l.getContext("2d");c.fillStyle=t,c.fillRect(0,0,o,a),c.strokeStyle=i,c.lineWidth=10,c.strokeRect(8,8,o-16,a-16),c.fillStyle=e,c.textAlign="center",c.textBaseline="middle";const u=Array.isArray(s)?s:[s];if(u.length===1){let m=54;for(c.font=`900 ${m}px system-ui, -apple-system, sans-serif`;c.measureText(u[0]).width>o-48&&m>22;)m-=2,c.font=`900 ${m}px system-ui, -apple-system, sans-serif`;c.fillText(u[0],o/2,a/2)}else c.font="900 44px system-ui, -apple-system, sans-serif",c.fillText(u[0],o/2,a*.36,o-44),c.font="700 32px system-ui, -apple-system, sans-serif",c.fillText(u[1],o/2,a*.72,o-44);const d=new Zr(l);return d.colorSpace=je,d.anisotropy=4,d}function Bn(s,t,e,i=0){const o=[],a=[],l=[],c=t/2;for(let d=0;d<s.length-1;d++){const m=s[d],p=s[d+1],g=p.x-m.x,v=p.z-m.z,M=Math.hypot(g,v);if(M<.05)continue;const w=-v/M,x=g/M,_=.25,b=g/M,E=v/M,S=m.x-b*_+w*i,U=m.z-E*_+x*i,N=p.x+b*_+w*i,D=p.z+E*_+x*i,O=o.length/3;o.push(S-w*c,e,U-x*c,S+w*c,e,U+x*c,N+w*c,e,D+x*c,N-w*c,e,D-x*c);for(let P=0;P<4;P++)a.push(0,1,0);l.push(O,O+1,O+2,O,O+2,O+3)}const u=new Qe;return u.setAttribute("position",new Te(o,3)),u.setAttribute("normal",new Te(a,3)),u.setIndex(l),u}function Ux(s){return s.filter(t=>t.highway!=="service"&&t.points.length>=2).map(t=>{const e=t.width*.5+1;let i=1/0,o=-1/0,a=1/0,l=-1/0;for(const c of t.points)c.x<i&&(i=c.x),c.x>o&&(o=c.x),c.z<a&&(a=c.z),c.z>l&&(l=c.z);return{id:t.id,name:t.name,halfW:t.width*.5,points:t.points,minX:i-e,maxX:o+e,minZ:a-e,maxZ:l+e}})}function Ox(s,t,e,i=null,o=.25){for(const a of e){if(i!==null&&a.id===i||s<a.minX||s>a.maxX||t<a.minZ||t>a.maxZ)continue;const l=a.halfW+o;for(let c=0;c<a.points.length-1;c++){const u=a.points[c],d=a.points[c+1];if(ci(s,t,u.x,u.z,d.x,d.z).dist<l)return!0}}return!1}function Po(s,t,e,i,o=0,a=null,l=null){const c=[],u=[],d=[],m=t/2;function p(v,M,w,x,_,b){let E=c.length/3;c.push(v-_*m,i,M-b*m,v+_*m,i,M+b*m,w+_*m,i,x+b*m,w-_*m,i,x-b*m);for(let S=0;S<4;S++)u.push(0,1,0);d.push(E,E+1,E+2,E,E+2,E+3),E=c.length/3,c.push(v-_*m,e,M-b*m,v-_*m,i,M-b*m,w-_*m,i,x-b*m,w-_*m,e,x-b*m);for(let S=0;S<4;S++)u.push(-_,0,-b);d.push(E,E+1,E+2,E,E+2,E+3),E=c.length/3,c.push(v+_*m,e,M+b*m,w+_*m,e,x+b*m,w+_*m,i,x+b*m,v+_*m,i,M+b*m);for(let S=0;S<4;S++)u.push(_,0,b);d.push(E,E+1,E+2,E,E+2,E+3)}for(let v=0;v<s.length-1;v++){const M=s[v],w=s[v+1],x=w.x-M.x,_=w.z-M.z,b=Math.hypot(x,_);if(b<.05)continue;const E=-_/b,S=x/b,U=x/b,N=_/b;if(!a||a.length===0){p(M.x-U*.22+E*o,M.z-N*.22+S*o,w.x+U*.22+E*o,w.z+N*.22+S*o,E,S);continue}const O=Math.max(1,Math.ceil(b/.85)),P=l!==null?.25:.05;let T=null;for(let z=0;z<O;z++){const G=(z+.5)/O,H=M.x+x*G+E*o,F=M.z+_*G+S*o;if(!Ox(H,F,a,l,P))T===null&&(T=z/O);else if(T!==null){const Y=z/O;p(M.x+x*T+E*o,M.z+_*T+S*o,M.x+x*Y+E*o,M.z+_*Y+S*o,E,S),T=null}}T!==null&&p(M.x+x*T+E*o,M.z+_*T+S*o,w.x+E*o,w.z+S*o,E,S)}const g=new Qe;return g.setAttribute("position",new Te(c,3)),g.setAttribute("normal",new Te(u,3)),g.setIndex(d),g}function Er(s,t,e,i,o,a=0){const l=[],c=[],u=[],d=i/2,m=t+e;for(let g=0;g<s.length-1;g++){const v=s[g],M=s[g+1],w=M.x-v.x,x=M.z-v.z,_=Math.hypot(w,x);if(_<1)continue;const b=w/_,E=x/_,S=-E,U=b;for(let N=.8;N<_-.8;N+=m){const D=Math.min(N+t,_-.5);if(D-N<.4)continue;const O=v.x+b*N+S*a,P=v.z+E*N+U*a,T=v.x+b*D+S*a,z=v.z+E*D+U*a,G=l.length/3;l.push(O-S*d,o,P-U*d,O+S*d,o,P+U*d,T+S*d,o,z+U*d,T-S*d,o,z-U*d);for(let H=0;H<4;H++)c.push(0,1,0);u.push(G,G+1,G+2,G,G+2,G+3)}}const p=new Qe;return p.setAttribute("position",new Te(l,3)),p.setAttribute("normal",new Te(c,3)),p.setIndex(u),p}function po(s,t,e=0){const i=new Ld;i.moveTo(s[0].x,-s[0].z);for(let a=1;a<s.length;a++)i.lineTo(s[a].x,-s[a].z);i.closePath();const o=new Sc(i,{depth:t,bevelEnabled:!1});return o.rotateX(-Math.PI/2),o.translate(0,e,0),o}function zx(){const s=document.createElement("canvas");s.width=256,s.height=256;const t=s.getContext("2d");t.clearRect(0,0,256,256);const e=(o,a,l=null,c=0)=>{t.beginPath();for(let u=0;u<8;u++){const d=Math.PI/8+u*Math.PI/4,m=128+Math.cos(d)*o,p=128+Math.sin(d)*o;u===0?t.moveTo(m,p):t.lineTo(m,p)}t.closePath(),t.fillStyle=a,t.fill(),l&&(t.strokeStyle=l,t.lineWidth=c,t.stroke())};e(122,"#ffffff"),e(112,"#dc2626","#ffffff",8),t.fillStyle="#ffffff",t.font="900 72px system-ui, -apple-system, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("STOP",128,132);const i=new Zr(s);return i.colorSpace=je,i.anisotropy=4,i}function kx(s,t,e){const i=new be;i.position.set(s.x,.16,s.z),i.rotation.y=s.facingAngle||0;const o=new _t(new an(.06,.07,2.7,8),t.pole);o.position.y=1.35,o.castShadow=!0,i.add(o);const a=new $t({map:e,transparent:!0,alphaTest:.25,roughness:.35}),l=new _t(new In(1.08,1.08),a);l.position.set(0,2.55,.07);const c=new _t(new In(1.08,1.08),a);return c.rotation.y=Math.PI,c.position.set(0,2.55,-.07),i.add(l,c),i}function Fx(s,t){const e=new be,i=s.onKing?7.6:5.6;e.position.set(s.x+i,0,s.z-i);const o=new _t(new an(.08,.09,3.6,8),t.pole);return o.position.y=1.8,e.add(o),s.streetNames.slice(0,2).forEach((l,c)=>{const u=l.replace(/Street/gi,"St").replace(/Avenue/gi,"Ave").replace(/Road/gi,"Rd").replace(/North/gi,"N").replace(/South/gi,"S").replace(/West/gi,"W").replace(/East/gi,"E"),d=Ac(u,"#15803d","#ffffff","#dcfce7",512,110),m=new $t({map:d,roughness:.5}),p=new _t(new le(2.1,.42,.06),m);p.position.y=3.25+c*.46,p.rotation.y=c===0?0:Math.PI/2,e.add(p)}),e}function Ei(s,t,e,i,o,a,l=6.5){const c=new be;c.position.set(e,i,o);const u=Ac(t?[s,t]:[s],a,"#ffffff","#fef08a",768,200),d=new $t({map:u,roughness:.4,side:Ln}),m=new _t(new le(l,l*.27,.18),d);return c.add(m),c}function Bx(s,t,e=1){const i=new be;i.position.set(s,0,t);const o=new _t(new an(.18*e,.25*e,1.8*e,6),new $t({color:9132587,roughness:.9}));o.position.y=.9*e,i.add(o);const a=new _t(new Mc(1.35*e,0),new $t({color:2278750,roughness:.85,flatShading:!0}));return a.position.y=2.6*e,i.add(a),i}function Hx(s,t,e,i){if(t.highway==="service")return;const o=e+.02,a=t.width/2,l=t.hasBikeLeft?t.bikeLaneWidth:0,c=t.hasBikeRight?t.bikeLaneWidth:0,u=-a+l,d=a-c,m=Math.max(2.5,d-u);if(t.hasBikeLeft){const p=-a+l*.5;s.add(new _t(Bn(t.points,l-.14,e+.015,p),i.bikeLane)),s.add(new _t(Bn(t.points,.12,o,u),i.whiteLine))}if(t.hasBikeRight){const p=a-c*.5;s.add(new _t(Bn(t.points,c-.14,e+.015,p),i.bikeLane)),s.add(new _t(Bn(t.points,.12,o,d),i.whiteLine))}if(t.isMajor&&(s.add(new _t(Bn(t.points,.1,o,-a+.14),i.edgeLine)),s.add(new _t(Bn(t.points,.1,o,a-.14),i.edgeLine))),t.oneway){const p=Math.max(1,t.lanes),g=m/p;for(let v=1;v<p;v++){const M=u+g*v;s.add(new _t(Er(t.points,2.8,3.2,.13,o,M),i.whiteLine))}}else if(t.lanes>=2){const p=Math.max(1,t.lanesBackward),g=Math.max(1,t.lanesForward),v=p+g,M=m/v,w=u+M*p;t.isMajor||v>=3?(s.add(new _t(Bn(t.points,.12,o,w-.13),i.yellowLine)),s.add(new _t(Bn(t.points,.12,o,w+.13),i.yellowLine))):s.add(new _t(Er(t.points,2.5,3.5,.12,o,w),i.yellowLine));for(let x=1;x<p;x++){const _=u+M*x;s.add(new _t(Er(t.points,2.8,3.2,.13,o,_),i.whiteLine))}for(let x=1;x<g;x++){const _=w+M*x;s.add(new _t(Er(t.points,2.8,3.2,.13,o,_),i.whiteLine))}}}function tl(s,t=null){const e=new be;e.name=s.id;const i=Ux(t&&t.length?t:s.roads),o={roadMajor:new $t({color:2501427,roughness:.94}),roadLocal:new $t({color:3291202,roughness:.94}),sidewalk:new $t({color:16115400,roughness:.82}),footway:new $t({color:15456695,roughness:.88}),bikeLane:new $t({color:2976335,roughness:.88}),yellowLine:new $t({color:16436245,roughness:.65}),whiteLine:new $t({color:16777215,roughness:.55}),edgeLine:new $t({color:14870768,roughness:.7}),parkGrass:new $t({color:8843180,roughness:.95}),schoolGrass:new $t({color:11006928,roughness:.95}),pole:new $t({color:6583435,metalness:.35,roughness:.5}),roofSchool:new $t({color:14427686,roughness:.75}),roofChurch:new $t({color:4674921,roughness:.75})};for(const l of s.parks){const c=po(l.polygon,.04,.01),u=new _t(c,l.kind==="school_grounds"?o.schoolGrass:o.parkGrass);u.receiveShadow=!0,e.add(u)}for(const l of s.roads){const c=l.isMajor?.06:.05,u=Bn(l.points,l.width,c,0),d=new _t(u,l.isMajor?o.roadMajor:o.roadLocal);if(d.receiveShadow=!0,e.add(d),Hx(e,l,c,o),l.highway!=="service"){const m=l.width/2+l.sidewalkWidth/2;if(l.wantsRightSidewalk&&!l.hasExplicitRightSidewalk){const p=Po(l.points,l.sidewalkWidth,.02,.16,m,i,l.id),g=new _t(p,o.sidewalk);g.receiveShadow=!0,e.add(g)}if(l.wantsLeftSidewalk&&!l.hasExplicitLeftSidewalk){const p=Po(l.points,l.sidewalkWidth,.02,.16,-m,i,l.id),g=new _t(p,o.sidewalk);g.receiveShadow=!0,e.add(g)}}}for(const l of s.footways){if(l.footwayType==="crossing"||l.footwayType==="sidewalk")continue;const c=Bn(l.points,1.8,.11,0);e.add(new _t(c,o.footway))}for(const l of s.crosswalks){const c=new be;c.position.set(l.x,.088,l.z);const u=Math.atan2(l.roadDirX,l.roadDirZ);c.rotation.y=u;const d=Math.max(3.6,l.width-.5),m=Math.max(4,Math.floor(d/1.05)),p=d/m,g=p*.55,v=new le(g,.016,l.depth);for(let S=0;S<m;S++){const U=-d/2+p*(S+.5),N=new _t(v,o.whiteLine);N.position.x=U,c.add(N)}const M=new le(d,.016,.32),w=new _t(M,o.whiteLine);w.position.set(0,0,l.depth*.5+.85);const x=new _t(M,o.whiteLine);x.position.set(0,0,-(l.depth*.5+.85)),c.add(w,x);const _=new le(.85,.03,2.2),b=new _t(_,o.yellowLine);b.position.set(-l.width/2-.45,.08,0);const E=new _t(_,o.yellowLine);E.position.set(l.width/2+.45,.08,0),c.add(b,E),e.add(c)}for(const l of s.intersections)l.streetNames.length>=2&&e.add(Fx(l,o));if(s.stopSigns&&s.stopSigns.length>0){const l=zx();for(const c of s.stopSigns)e.add(kx(c,o,l))}for(const l of s.buildings){let c=Su[l.id%Su.length];l.category==="home"?c=16020150:l.category==="school"?c=16096779:l.category==="other_school"?c=14251782:l.category==="library"?c=959977:l.category==="church"?c=16710083:l.category==="shop"&&(c=wu[l.id%wu.length]);const u=new $t({color:c,roughness:.78}),d=po(l.polygon,l.height,0),m=new _t(d,u);if(m.castShadow=!0,m.receiveShadow=!0,e.add(m),l.category==="home"){const p=po(l.polygon,.6,l.height);e.add(new _t(p,new $t({color:14362487,roughness:.7})));const g=Ei("🏠 Your House","Walk or Catch the Bus!",l.centroid.x,l.height+2.4,l.centroid.z,"#be185d",6.5);e.add(g)}else if(l.category==="school"){const p=po(l.polygon,.7,l.height);e.add(new _t(p,o.roofSchool));const g=Ei("Cootes Paradise Elementary School","900 King St W  •  Welcome!",l.centroid.x,l.height+3,l.centroid.z+8,"#b91c1c",11.5);e.add(g)}else if(l.category==="library"){const p=po(l.polygon,.6,l.height);e.add(new _t(p,new $t({color:223649,roughness:.7})));const g=Ei("Westdale Library","Hamilton Public Library",l.centroid.x,l.height+2.4,l.centroid.z,"#0369a1",7.5);e.add(g)}else if(l.category==="church"){const p=new _t(new yc(2.4,8,4),o.roofChurch);if(p.position.set(l.centroid.x,l.height+4,l.centroid.z),e.add(p),l.name){const g=Ei(l.name,"Landmark",l.centroid.x,l.height+2.2,l.centroid.z,"#4338ca",7.5);e.add(g)}}else if(l.category==="shop"&&l.name){const p=Ei(l.name,"",l.centroid.x,l.height+1.8,l.centroid.z,"#0f766e",5.8);e.add(p)}}let a=0;for(const l of s.parks){if(a>24)break;for(let c=0;c<l.polygon.length&&!(a>24);c+=3){const u=l.polygon[c],d=u.x+(l.centroid.x-u.x)*.22,m=u.z+(l.centroid.z-u.z)*.22;e.add(Bx(d,m,.9+a%3*.2)),a++}}return e}function Vx(s,t){const e=new be;e.position.set(s,0,t);const i=new _t(new an(5.5,5.8,.18,24),new $t({color:16707722,roughness:.7}));i.position.y=.09,e.add(i);const o=new _t(new Ec(4.5,.18,12,32),new $t({color:2278750,emissive:1483594,emissiveIntensity:.7}));o.rotation.x=Math.PI/2,o.position.y=.35,e.add(o);const a=new _t(new wc(1.1,0),new $t({color:16436245,emissive:16096779,emissiveIntensity:.7,flatShading:!0}));a.position.y=3.2,a.name="beaconCrystal",e.add(a);const l=new _t(new an(.6,1.8,22,16,1,!0),new Sn({color:16638023,transparent:!0,opacity:.16,side:Ln,depthWrite:!1}));l.position.y=11,e.add(l);const c=Ei("🏫 School Entrance","Cootes Paradise Elementary",0,5.4,0,"#15803d",6.8);return c.name="beaconSign",e.add(c),e}function Gx(s,t){const e=new be;e.name="schoolWalkways";const i=[],o=new $t({color:16508338,roughness:.78}),a=new $t({color:16096779,roughness:.7}),l=new $t({color:6583435,metalness:.35,roughness:.5}),c=[{pattern:/king street/i,label:"School Path",sub:"King St W Entrance"},{pattern:/cline/i,label:"School Path",sub:"Cline Ave Entrance"}];for(const u of c){let d=null;for(const H of t.roads)if(u.pattern.test(H.name))for(let F=0;F<H.points.length-1;F++){const j=H.points[F],Y=H.points[F+1],ct=ci(s.x,s.z,j.x,j.z,Y.x,Y.z);(!d||ct.dist<d.dist)&&(d={...ct,road:H})}if(!d)continue;const m=s.x-d.x,p=s.z-d.z,g=Math.hypot(m,p)||1,v=m/g,M=p/g,w=d.road.width*.5+.3,x={x:d.x+v*w,z:d.z+M*w},_={x:s.x,z:s.z},b=[x,_];i.push({name:u.sub,points:b});const E=Po(b,4,.02,.145,0),S=Po(b,3.4,.02,.165,0),U=new _t(E,a),N=new _t(S,o);U.receiveShadow=!0,N.receiveShadow=!0,e.add(U,N);const D=-M,O=v,P=x.x+v*2.5+D*2.6,T=x.z+M*2.5+O*2.6,z=new _t(new an(.08,.09,3,8),l);z.position.set(P,1.5,T),e.add(z);const G=Ei(`🏫 ${u.label}`,u.sub,P,3.2,T,"#15803d",3.4);e.add(G)}return{group:e,paths:i}}function el(s,t=null,e="Walk or Catch the Bus!"){const i=new be;i.name="homeWalkway";const o=[];let a=null,l=!1;if(t)a={x:t.x,z:t.z},l=!0;else{const N=s.buildings.find(D=>D.category==="home");N&&(a=N.centroid)}if(!a)return{group:i,paths:o,startPose:null,homePos:null};if(l){const N=Ei("🏠 Your House",e,a.x,9.5,a.z,"#be185d",6.8);i.add(N)}let c=null;for(const N of s.roads)if(N.highway!=="service")for(let D=0;D<N.points.length-1;D++){const O=N.points[D],P=N.points[D+1],T=ci(a.x,a.z,O.x,O.z,P.x,P.z);(!c||T.dist<c.dist)&&(c={...T,road:N})}if(!c)return{group:i,paths:o,homePos:a,startPose:{x:a.x,z:a.z,headingDeg:0}};const u=c.x-a.x,d=c.z-a.z,m=Math.hypot(u,d)||1,p=u/m,g=d/m,v=c.road.width*.5+1,M={x:c.x-p*v,z:c.z-g*v},w=m>v+3?{x:a.x+p*Math.min(6,m*.4),z:a.z+g*Math.min(6,m*.4)}:{x:M.x-p*3.5,z:M.z-g*3.5},x=[w,M];o.push({name:"Your House Walkway",points:x});const _=Po(x,2.4,.02,.165,0),b=new _t(_,new $t({color:16115400,roughness:.8}));b.receiveShadow=!0,i.add(b);const E=(w.x+M.x)*.5,S=(w.z+M.z)*.5,U=(Math.atan2(p,-g)*180/Math.PI+360)%360;return{group:i,paths:o,homePos:a,startPose:{x:E,z:S,headingDeg:U}}}function Wx(s,t){const e=new be;e.name="busStops";const i=[],o=s.roads.filter(m=>/king street west/i.test(m.name)),a=[{name:"Marion Ave Bus Stop (Near Your House)",targetX:-225,targetZ:195},{name:"Westdale Library Bus Stop",targetX:-145,targetZ:165},{name:"Cootes Paradise School Bus Stop",targetX:t.x+2,targetZ:t.z+76}],l=new $t({color:1920728,metalness:.3,roughness:.5}),c=new $t({color:2450411,roughness:.45}),u=new $t({color:12248829,transparent:!0,opacity:.55,roughness:.2}),d=new $t({color:16707722,roughness:.75});for(const m of a){let p=null;for(const z of o)for(let G=0;G<z.points.length-1;G++){const H=z.points[G],F=z.points[G+1],j=ci(m.targetX,m.targetZ,H.x,H.z,F.x,F.z);(!p||j.dist<p.dist)&&(p={...j,ax:H.x,az:H.z,bx:F.x,bz:F.z,road:z})}if(!p)continue;const g=p.bx-p.ax,v=p.bz-p.az,M=Math.hypot(g,v)||1;let w=-v/M,x=g/M;x>0&&(w=-w,x=-x);const _=p.road.width*.5+1.8,b=p.x+w*_,E=p.z+x*_,S=new be;S.position.set(b,.16,E),S.rotation.y=Math.atan2(g,v);const U=new _t(new le(2.2,.04,4.6),d);U.position.y=.02,S.add(U);const N=new _t(new le(1.6,.14,3.4),c);N.position.set(0,2.55,0),S.add(N);const D=new _t(new le(.08,2.2,3.1),u);D.position.set(-.65,1.3,0),S.add(D);for(const z of[-1.45,1.45]){const G=new _t(new an(.06,.06,2.5,6),l);G.position.set(-.65,1.25,z),S.add(G)}const O=new _t(new an(.07,.07,3.2,8),l);O.position.set(.5,1.6,2),S.add(O);const P=Ac(["🚌 BUS STOP","Press F to Ride"],"#1d4ed8","#ffffff","#facc15",512,160),T=new _t(new le(1.6,.55,.12),new $t({map:P,roughness:.4}));T.position.set(.5,3.1,2),S.add(T),e.add(S),i.push({name:m.name,x:b,z:E,roadX:p.x,roadZ:p.z,isSchoolStop:/school/i.test(m.name)})}return{group:e,stops:i}}function Zx(){const s=new be;s.name="policeCar";const t=new _t(new le(2,.78,4.4),new $t({color:16317180,roughness:.4}));t.position.y=.7,t.castShadow=!0,s.add(t);const e=new _t(new le(2.04,.28,4.42),new $t({color:1981066,roughness:.5}));e.position.y=.68,s.add(e);const i=new _t(new le(1.7,.65,2.2),new $t({color:12248829,roughness:.25}));i.position.set(0,1.38,-.1),s.add(i);const o=new Sn({color:15680580}),a=new Sn({color:3900150}),l=new _t(new le(.55,.18,.28),o);l.position.set(-.32,1.8,-.1);const c=new _t(new le(.55,.18,.28),a);c.position.set(.32,1.8,-.1),s.add(l,c);const u=new $t({color:988970,roughness:.9}),d=new an(.36,.36,.26,10);d.rotateZ(Math.PI/2);for(const m of[-1.35,1.35])for(const p of[-.98,.98]){const g=new _t(d,u);g.position.set(p,.36,m),s.add(g)}return s.userData={redLightMat:o,blueLightMat:a},s}function Xx(){const s=new be;s.name="playerAvatar";const t=new $t({color:1981066,roughness:.8}),e=new $t({color:16777215,roughness:.7}),i=new $t({color:15680580,roughness:.65}),o=new $t({color:16767916,roughness:.6}),a=new $t({color:2450411,roughness:.7}),l=new $t({color:16436245,roughness:.6}),c=new be;c.position.set(-.13,.58,0);const u=new _t(new le(.18,.54,.18),t);u.position.y=-.27,u.castShadow=!0;const d=new _t(new le(.2,.1,.28),e);d.position.set(0,-.53,.04),c.add(u,d),s.add(c);const m=new be;m.position.set(.13,.58,0);const p=new _t(new le(.18,.54,.18),t);p.position.y=-.27,p.castShadow=!0;const g=new _t(new le(.2,.1,.28),e);g.position.set(0,-.53,.04),m.add(p,g),s.add(m);const v=new _t(new le(.48,.58,.28),i);v.position.y=.87,v.castShadow=!0,s.add(v);const M=new _t(new le(.38,.44,.18),l);M.position.set(0,.88,-.22),M.castShadow=!0,s.add(M);const w=new be;w.position.set(-.32,1.1,0);const x=new _t(new le(.15,.48,.15),i);x.position.y=-.22,w.add(x),s.add(w);const _=new be;_.position.set(.32,1.1,0);const b=new _t(new le(.15,.48,.15),i);b.position.y=-.22,_.add(b),s.add(_);const E=new be;E.position.set(0,1.37,0);const S=new _t(new ts(.22,12,12),o);S.castShadow=!0,E.add(S);const U=new _t(new ts(.23,12,8,0,Math.PI*2,0,Math.PI*.52),a);U.position.y=.03;const N=new _t(new le(.3,.04,.2),a);return N.position.set(0,.06,.2),E.add(U,N),s.add(E),s.userData={leftLegPivot:c,rightLegPivot:m,leftArmPivot:w,rightArmPivot:_,headGroup:E},s}function oc(s){s.traverse(t=>{if(t.geometry&&t.geometry.dispose(),t.material){const e=Array.isArray(t.material)?t.material:[t.material];for(const i of e)i.map&&i.map.dispose(),i.dispose()}})}class qx{constructor(t){this.scene=t,this.presetBuckets=new Map,this.allRoads=[],this.loadedChunks=new Map,this.loadingIds=new Set,this.currentCenterKey=null}loadPresetParsed(t){this.addParsedData(t)}addParsedData(t){const e=(t.roads||[]).filter(a=>a.highway!=="service"),i=new Set(this.allRoads.map(a=>a.id));for(const a of e)i.has(a.id)||(this.allRoads.push(a),i.add(a.id));const o=Mu(t);for(const[a,l]of o.entries()){if(this.presetBuckets.has(a)){const c=this.presetBuckets.get(a),u=(d,m)=>{const p=new Set(d.map(g=>g.id));for(const g of m)p.has(g.id)||(d.push(g),p.add(g.id))};u(c.roads,l.roads),u(c.footways,l.footways),u(c.buildings,l.buildings),u(c.parks,l.parks),u(c.intersections,l.intersections),u(c.crosswalks,l.crosswalks),c.stopSigns=c.stopSigns||[],u(c.stopSigns,l.stopSigns||[])}else this.presetBuckets.set(a,l);if(this.loadedChunks.has(a)){const c=this.loadedChunks.get(a);this.scene.remove(c.group),oc(c.group);const u=this.presetBuckets.get(a),d=tl(u,this.allRoads);this.scene.add(d),this.loadedChunks.set(a,{gx:c.gx,gz:c.gz,group:d,bucket:u})}}this.currentCenterKey=null}update(t,e){const{gx:i,gz:o}=Mi(t,e),a=`${i}_${o}`;if(a===this.currentCenterKey)return;this.currentCenterKey=a;const l=new Set;for(let c=-1;c<=1;c++)for(let u=-1;u<=1;u++){const d=i+c,m=o+u,p=Yr(d,m);l.add(p),!this.loadedChunks.has(p)&&!this.loadingIds.has(p)&&this._loadChunk(d,m,p)}for(const[c,u]of this.loadedChunks.entries())l.has(c)||(this.scene.remove(u.group),oc(u.group),this.loadedChunks.delete(c))}_loadChunk(t,e,i){if(this.presetBuckets.has(i)){const o=this.presetBuckets.get(i),a=tl(o,this.allRoads);this.scene.add(a),this.loadedChunks.set(i,{gx:t,gz:e,group:a,bucket:o});return}Math.abs(t)<=1&&Math.abs(e)<=1||(this.loadingIds.add(i),bx(t,e).then(o=>{this.loadingIds.delete(i);const a=sc(o.elements||[]),c=Mu(a).get(i)||{gx:t,gz:e,id:i,roads:a.roads,footways:a.footways,buildings:a.buildings,parks:a.parks,intersections:a.intersections,crosswalks:a.crosswalks,stopSigns:a.stopSigns||[]},u=tl(c,this.allRoads.length?this.allRoads:c.roads);this.scene.add(u),this.loadedChunks.set(i,{gx:t,gz:e,group:u,bucket:c})}).catch(()=>{this.loadingIds.delete(i)}))}getActiveBuildings(){const t=[];for(const e of this.loadedChunks.values())for(const i of e.bucket.buildings)t.push(i);return t}}const br=22;function Eu(s){const t=document.createElement("canvas");t.width=192,t.height=192;const e=t.getContext("2d");if(e.fillStyle="#0f172a",e.fillRect(0,0,192,192),e.strokeStyle=s==="walk"?"#22c55e":"#ef4444",e.lineWidth=14,e.strokeRect(7,7,178,178),s==="walk")e.fillStyle="#4ade80",e.strokeStyle="#4ade80",e.lineCap="round",e.lineWidth=11,e.beginPath(),e.arc(96,40,14,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(96,58),e.lineTo(92,98),e.stroke(),e.beginPath(),e.moveTo(94,68),e.lineTo(68,86),e.moveTo(94,68),e.lineTo(122,84),e.stroke(),e.beginPath(),e.moveTo(92,98),e.lineTo(70,134),e.moveTo(92,98),e.lineTo(118,134),e.stroke(),e.fillStyle="#4ade80",e.font="900 28px system-ui, sans-serif",e.textAlign="center",e.fillText("WALK",96,172);else{e.fillStyle="#ef4444",e.beginPath(),e.roundRect(66,72,60,56,12),e.fill();const o=[68,82,96,110],a=[38,46,44,34];for(let l=0;l<4;l++)e.beginPath(),e.roundRect(o[l],76-a[l],11,a[l]+8,5),e.fill();e.beginPath(),e.roundRect(50,82,20,13,6),e.fill(),e.fillStyle="#f87171",e.font="900 28px system-ui, sans-serif",e.textAlign="center",e.fillText("STOP",96,172)}const i=new Zr(t);return i.colorSpace=je,i}function Yx(s,t=!1){const e=new be;if(t){const p=new _t(new le(2.3,2,6.2),new $t({color:16436245,roughness:.5}));p.position.y=1.35,p.castShadow=!0,e.add(p);const g=new _t(new le(2.34,.22,6.22),new $t({color:1976635,roughness:.6}));g.position.y=1.25,e.add(g);const v=new _t(new le(2.32,.65,4.8),new $t({color:12248829,roughness:.25}));v.position.set(0,1.85,-.2),e.add(v)}else{const p=new _t(new le(1.85,.72,4),new $t({color:s,roughness:.45}));p.position.y=.66,p.castShadow=!0,e.add(p);const g=new _t(new le(1.55,.62,2.05),new $t({color:14742270,roughness:.25}));g.position.set(0,1.28,-.15),e.add(g)}const i=new Sn({color:16710083}),o=new Sn({color:15680580}),a=t?3.12:2.02,l=t?-3.12:-2.02;for(const p of[-.62,.62]){const g=new _t(new le(.32,.2,.08),i);g.position.set(p,.68,a),e.add(g);const v=new _t(new le(.32,.2,.08),o);v.position.set(p,.68,l),e.add(v)}const c=new $t({color:1976635,roughness:.9}),u=new an(.34,.34,.24,10);u.rotateZ(Math.PI/2);const d=t?[-1.9,1.9]:[-1.2,1.2],m=t?1.15:.92;for(const p of d)for(const g of[-m,m]){const v=new _t(u,c);v.position.set(g,.34,p),e.add(v)}return e}class $x{constructor(t,e,i=[]){this.scene=t,this.parsed=e,this.busStops=i,this.time=11,this.signalVisuals=[],this.cars=[],this.group=new be,this.group.name="trafficSystem",this.scene.add(this.group),this.walkTex=Eu("walk"),this.dontWalkTex=Eu("dont_walk"),this._buildSignals(),this._spawnCars()}getSignalState(){const t=this.time%br;return t<8?{kingLight:"green",sideLight:"red",NS_WALK:"dont_walk",EW_WALK:"walk"}:t<10.5?{kingLight:"yellow",sideLight:"red",NS_WALK:"dont_walk",EW_WALK:"dont_walk"}:t<18.5?{kingLight:"red",sideLight:"green",NS_WALK:"walk",EW_WALK:"dont_walk"}:t<21?{kingLight:"red",sideLight:"yellow",NS_WALK:Math.floor(t*3)%2===0?"dont_walk":"walk",EW_WALK:"dont_walk"}:{kingLight:"red",sideLight:"red",NS_WALK:"dont_walk",EW_WALK:"dont_walk"}}isCrosswalkWalkAllowed(t){return t.isSignalized?this.getSignalState()[t.signalGroup]==="walk":!0}getNearestSignalPrompt(t){if(!t)return null;let e=null,i=1/0;for(const u of this.parsed.crosswalks){if(!u.isSignalized)continue;const d=Ie(t.x,t.z,u.x,u.z);d<24&&d<i&&(i=d,e=u)}if(!e)return null;const o=this.time%br,a=e.signalGroup==="NS_WALK";let l="red",c=1;return a?o>=10.5&&o<18.5?(l="green",c=Math.ceil(18.5-o)):o>=18.5&&o<21?(l="amber",c=Math.ceil(21-o)):(l="red",c=o<10.5?Math.ceil(10.5-o):Math.ceil(br-o+10.5)):o<8?(l="green",c=Math.ceil(8-o)):(l="red",c=Math.ceil(br-o)),{crosswalk:e,roadName:e.roadName||"King Street West",light:l,secondsLeft:Math.max(1,c)}}_buildSignals(){const t=new $t({color:3359061,metalness:.4,roughness:.5}),e=new $t({color:16096779,roughness:.5}),i=new $t({color:1976635,roughness:.6}),o=this.parsed.intersections.filter(a=>a.isSignalized);for(const a of o){const l=[{dx:7.4,dz:7.4,rot:Math.PI},{dx:-7.4,dz:-7.4,rot:0}];for(const c of l){const u=new be;u.position.set(a.x+c.dx,0,a.z+c.dz);const d=new _t(new an(.11,.14,5.4,8),t);d.position.y=2.7,u.add(d);const m=new _t(new an(.08,.08,4.2,8),t);m.rotation.z=Math.PI/2,m.position.set(c.dx>0?-2:2,5.2,0),u.add(m);const p=new _t(new le(.65,1.85,.55),e);p.position.set(c.dx>0?-3.4:3.4,4.9,0),u.add(p);const g=new Sn({color:15680580}),v=new Sn({color:4528643}),M=new Sn({color:339478}),w=new ts(.24,10,10),x=new _t(w,g);x.position.set(p.position.x,5.45,0);const _=new _t(w,v);_.position.set(p.position.x,4.9,0);const b=new _t(w,M);b.position.set(p.position.x,4.35,0),u.add(x,_,b);const E=new _t(new le(1.15,1.15,.3),i);E.position.set(0,3.05,0),u.add(E);const S=new Sn({map:this.dontWalkTex}),U=new _t(new In(1.06,1.06),S);U.position.set(0,3.05,.17);const N=new _t(new In(1.06,1.06),S);N.position.set(0,3.05,-.17),N.rotation.y=Math.PI,u.add(U,N);const D=new Sn({map:this.walkTex}),O=new _t(new In(1.06,1.06),D);O.position.set(.6,3.05,0),O.rotation.y=Math.PI/2;const P=new _t(new In(1.06,1.06),D);P.position.set(-.6,3.05,0),P.rotation.y=-Math.PI/2,u.add(O,P),this.group.add(u),this.signalVisuals.push({redMat:g,yelMat:v,grnMat:M,pedScreenMat:S,sidePedMat:D})}}}_buildRoadPaths(){const t=this.parsed.roads.filter(l=>/king street west/i.test(l.name)),e=this.parsed.roads.filter(l=>/(cline|paisley|marion)/i.test(l.name)&&l.points.length>=2),i=[];for(const l of t)for(const c of l.points)i.some(u=>Ie(u.x,u.z,c.x,c.z)<4)||i.push({x:c.x,z:c.z});i.sort((l,c)=>l.x-c.x);const o=[];i.length>=2&&(o.push({name:"King St W (EB)",points:i,laneOffset:1.85,speed:9.2,isKing:!0}),o.push({name:"King St W (WB)",points:[...i].reverse(),laneOffset:1.85,speed:8.8,isKing:!0}));const a=new Set;for(const l of e){if(a.has(l.name))continue;let c=0;for(let d=0;d<l.points.length-1;d++)c+=Ie(l.points[d].x,l.points[d].z,l.points[d+1].x,l.points[d+1].z);if(c<45)continue;a.add(l.name);const u=l.oneway?0:Math.max(1.3,(l.laneWidth||3.05)*.5);o.push({name:l.name,points:l.points.map(d=>({x:d.x,z:d.z})),laneOffset:u,speed:6.2,isKing:!1})}return o}_spawnCars(){const t=this._buildRoadPaths();if(t.length===0)return;const e=[{color:16436245,isBus:!0},{color:16436245,isBus:!0},{color:15680580,isBus:!1},{color:3900150,isBus:!1},{color:1096065,isBus:!1},{color:11032055,isBus:!1},{color:16347926,isBus:!1},{color:440020,isBus:!1}];for(let i=0;i<8;i++){const o=i<4?i%Math.min(2,t.length):2+(i-4)%Math.max(1,t.length-2),a=t[o]||t[0],l=e[i],c=Yx(l.color,l.isBus);this.group.add(c);const u=[0];for(let m=0;m<a.points.length-1;m++)u.push(u[m]+Ie(a.points[m].x,a.points[m].z,a.points[m+1].x,a.points[m+1].z));const d=u[u.length-1]||1;this.cars.push({id:`veh_${i}`,isBus:l.isBus,mesh:c,path:a,cumDist:u,totalLength:d,dist:l.isBus?d*(i===0?.12:.62):d*(i*.27%1),speed:l.isBus?8.2:a.speed*(.88+i%3*.08),currentSpeed:a.speed,stopTimer:0,lastStopName:null,atStopName:null,x:0,z:0,dirX:1,dirZ:0})}}getBuses(){return this.cars.filter(t=>t.isBus)}getNearbyBus(t){let e=null,i=1/0;for(const o of this.cars){if(!o.isBus)continue;const a=Ie(t.x,t.z,o.x,o.z);a<12.5&&a<i&&(i=a,e=o)}return e}getSafeExitPoint(t){for(const o of this.busStops)if(Ie(t.x,t.z,o.x,o.z)<18)return{x:o.x,z:o.z,stopName:o.name};const e=-t.dirZ,i=t.dirX;return{x:t.x+e*4.2,z:t.z+i*4.2,stopName:"King Street West Sidewalk"}}_samplePath(t,e){const i=(e%t.totalLength+t.totalLength)%t.totalLength,o=t.path.points;let a=0;for(;a<t.cumDist.length-2&&t.cumDist[a+1]<i;)a++;const l=t.cumDist[a],c=t.cumDist[a+1]||l+1,u=Math.max(0,Math.min(1,(i-l)/(c-l+1e-6))),d=o[a],m=o[a+1]||d,p=m.x-d.x,g=m.z-d.z,v=Math.hypot(p,g)||1,M=p/v,w=g/v,x=-w,_=M;return{x:d.x+p*u+x*t.path.laneOffset,z:d.z+g*u+_*t.path.laneOffset,dirX:M,dirZ:w}}update(t,e,i){this.time+=t;const o=this.getSignalState();for(const l of this.signalVisuals){l.redMat.color.setHex(o.kingLight==="red"?15680580:4133394),l.yelMat.color.setHex(o.kingLight==="yellow"?16436245:3877894),l.grnMat.color.setHex(o.kingLight==="green"?2278750:339478);const c=o.NS_WALK==="walk"?this.walkTex:this.dontWalkTex;l.pedScreenMat.map!==c&&(l.pedScreenMat.map=c,l.pedScreenMat.needsUpdate=!0);const u=o.EW_WALK==="walk"?this.walkTex:this.dontWalkTex;l.sidePedMat.map!==u&&(l.sidePedMat.map=u,l.sidePedMat.needsUpdate=!0)}const a=this.parsed.intersections.filter(l=>l.isSignalized);for(const l of this.cars){const c=this._samplePath(l,l.dist);l.x=c.x,l.z=c.z,l.dirX=c.dirX,l.dirZ=c.dirZ;let u=!1;if(l.isBus)if(l.stopTimer>0)l.stopTimer-=t,u=!0;else{let p=null;for(const g of this.busStops)if(Ie(l.x,l.z,g.roadX,g.roadZ)<6.5){p=g;break}p?l.lastStopName!==p.name&&(l.lastStopName=p.name,l.atStopName=p.name,l.stopTimer=5,u=!0):(l.atStopName=null,l.lastStopName&&this.busStops.every(g=>Ie(l.x,l.z,g.roadX,g.roadZ)>16)&&(l.lastStopName=null))}if(!u&&l.path.isKing&&o.kingLight!=="green")for(const p of a){const g=p.x-l.x,v=p.z-l.z,M=g*l.dirX+v*l.dirZ,w=Math.abs(-g*l.dirZ+v*l.dirX);if(M>7&&M<16.5&&w<8){u=!0;break}}if(!u&&e){const p=e.x-l.x,g=e.z-l.z,v=p*l.dirX+g*l.dirZ,M=Math.abs(-p*l.dirZ+g*l.dirX);v>2&&v<16&&M<(i?7.5:4)&&(u=!0)}if(!u)for(const p of this.cars){if(p===l||l.dirX*p.dirX+l.dirZ*p.dirZ<.7)continue;const v=p.x-l.x,M=p.z-l.z,w=v*l.dirX+M*l.dirZ,x=Math.abs(-v*l.dirZ+M*l.dirX);if(w>0&&w<10.5&&x<2.2){u=!0;break}}const d=u?0:l.speed;l.currentSpeed+=(d-l.currentSpeed)*Math.min(1,t*6),l.dist=(l.dist+l.currentSpeed*t)%l.totalLength;const m=this._samplePath(l,l.dist);l.mesh.position.set(m.x,.08,m.z),l.mesh.rotation.y=Math.atan2(m.dirX,m.dirZ)}}}const bu=[{name:"Crossing Guard Sam",role:"Crossing Guard",emoji:"🦺",shirtColor:12513892,pantsColor:1981066,skinColor:15843965,hairColor:3878703,streetPref:/king street/i,lines:["Good morning! Always wait for the white Walk person before crossing King Street!","Remember to look BOTH left and right at every corner — safety first!","You are doing great! Cootes Paradise Elementary is just ahead!","Never cross on the red hand — the friendly police car is always watching out for kids!"]},{name:"Librarian Ms. Patel",role:"Westdale Library",emoji:"📚",shirtColor:959977,pantsColor:3359061,skinColor:13010498,hairColor:1973016,streetPref:/king street/i,lines:["We just got brand-new comic books at Westdale Library today!","Have a fantastic day at school! Come visit after class for story time.","Did you know you can catch the Yellow School Bus right at the King Street bus stop?","Reading street signs helps you become a master navigator!"]},{name:"Baker Leo",role:"Neighborhood Baker",emoji:"🥐",shirtColor:16777215,pantsColor:4674921,skinColor:16767916,hairColor:9584654,streetPref:/king street/i,lines:["Mmm, fresh cinnamon buns just came out of the oven on King Street!","Walking on the sidewalk gives you the best view of all the Westdale shops!","Watch out for cars turning off King Street — always check both ways!","A good breakfast and a safe walk make the best school morning!"]},{name:"Maya",role:"Neighbor",emoji:"🐶",shirtColor:16020150,pantsColor:1920728,skinColor:14724201,hairColor:4528643,streetPref:/marion/i,lines:["What a sunny morning in Westdale! Perfect weather for walking to school!","Even quiet streets like Marion Ave have cars — look BOTH left and right before crossing!","I love how bright the sidewalks are today. Easy to stay out of the road!","Have fun at Cootes Paradise Elementary!"]},{name:"Noah",role:"Classmate",emoji:"🎒",shirtColor:2278750,pantsColor:3359061,skinColor:15843965,hairColor:7421714,streetPref:/cline/i,lines:["Hey! Are you heading to Cootes Paradise Elementary too? Race you — safely on the sidewalk!","I got all 3 Safety Stars yesterday by looking left AND right at Cline Ave!","The golden School Safe Path leads straight to the front entrance beacon!","Did you see the Yellow School Bus? You can press F at a bus stop to ride it!"]},{name:"Chloe",role:"Classmate",emoji:"🎨",shirtColor:11032055,pantsColor:1976635,skinColor:9262372,hairColor:1579035,streetPref:/paisley/i,lines:["We have art class today! I hope we get to paint our neighborhood!","Walking on the grass is totally fine, just stay out of the car lanes!",'If you ever get lost, click "Show Route Hint" to see the blue path on your mini-map!',"See you at the school entrance plaza!"]},{name:"Grandpa Henry",role:"Westdale Resident",emoji:"🧢",shirtColor:16096779,pantsColor:4472892,skinColor:16767916,hairColor:14870768,streetPref:/paisley/i,lines:["I have lived in Westdale for 40 years — finest walking neighborhood in Hamilton!","Take your time at intersections, kiddo. Better safe than hurried!","The churches and shops along King Street look wonderful today.","Keep those 3 Safety Stars shining bright!"]},{name:"Jogger Alex",role:"Runner",emoji:"👟",shirtColor:15680580,pantsColor:988970,skinColor:13010498,hairColor:2565930,streetPref:/king street/i,lines:["Phew! Doing my morning jog down King Street West!","Even when jogging, I always stop at the red hand signal!","Keep moving and stay alert at every zebra crossing!","Great pace! You will be at school in no time!"]},{name:"Teacher Mr. Chen",role:"School Teacher",emoji:"🍎",shirtColor:1357990,pantsColor:1976635,skinColor:15843965,hairColor:1579035,streetPref:/cline/i,lines:["Good morning! Ready for an awesome day of learning at Cootes Paradise?","Today’s safety lesson: always check BOTH left and right before stepping off the curb!","Remember, crossing on a red light brings the safety police car right away!","I’ll see you inside the school entrance!"]},{name:"Mail Carrier Priya",role:"Mail Carrier",emoji:"📬",shirtColor:2450411,pantsColor:1981066,skinColor:9262372,hairColor:1841431,streetPref:/marion/i,lines:["Delivering letters all across Westdale this morning!","I walk miles on these sidewalks every day — zebra crossings are my best friend!","Say hi to your neighbors along Marion Ave and King Street!","Have a safe walk to school!"]}];function Kx(s){const t=new be,e=new le(.18,.56,.18),i=new $t({color:s.pantsColor,roughness:.8}),o=new _t(e,i);o.position.set(-.12,.28,0),o.castShadow=!0,t.add(o);const a=new _t(e,i);a.position.set(.12,.28,0),a.castShadow=!0,t.add(a);const l=new _t(new le(.46,.58,.26),new $t({color:s.shirtColor,roughness:.7}));l.position.y=.85,l.castShadow=!0,t.add(l);const c=new le(.14,.48,.14),u=new $t({color:s.shirtColor,roughness:.7}),d=new _t(c,u);d.position.set(-.31,.84,0);const m=new _t(c,u);m.position.set(.31,.84,0),t.add(d,m);const p=new _t(new ts(.21,10,10),new $t({color:s.skinColor,roughness:.65}));p.position.y=1.36,p.castShadow=!0,t.add(p);const g=new _t(new ts(.22,10,8,0,Math.PI*2,0,Math.PI*.55),new $t({color:s.hairColor,roughness:.85}));g.position.y=1.38,t.add(g);const v=document.createElement("canvas");v.width=256,v.height=64;const M=v.getContext("2d");M.fillStyle="rgba(15, 23, 42, 0.78)",M.beginPath(),M.roundRect(4,6,248,52,24),M.fill(),M.fillStyle="#ffffff",M.font="800 24px system-ui, sans-serif",M.textAlign="center",M.textBaseline="middle",M.fillText(`${s.emoji} ${s.name}`,128,33,230);const w=new Zr(v);w.colorSpace=je;const x=new U0(new Ed({map:w,transparent:!0,depthTest:!1}));return x.scale.set(1.65,.42,1),x.position.y=1.92,t.add(x),t.userData={leftLeg:o,rightLeg:a,leftArm:d,rightArm:m},t}class jx{constructor(t,e){this.scene=t,this.group=new be,this.group.name="npcPedestrians",this.scene.add(this.group),this.npcs=[],this._spawnOnRoads(e.roads||[])}_spawnOnRoads(t){const e=t.filter(i=>i.highway!=="service"&&i.points.length>=2);if(e.length!==0)for(let i=0;i<bu.length;i++){const o=bu[i],a=e.filter(M=>o.streetPref.test(M.name)),l=a.length>0?a:e,c=l[i%l.length],u=i%2===0?1:-1,d=c.width*.5+(c.sidewalkWidth||2)*.5,m=[];for(let M=0;M<c.points.length;M++){const w=c.points[M],x=c.points[Math.min(M+1,c.points.length-1)],_=c.points[Math.max(M-1,0)],b=x.x-_.x,E=x.z-_.z,S=Math.hypot(b,E)||1,U=-E/S*u,N=b/S*u;m.push({x:w.x+U*d,z:w.z+N*d})}const p=[0];for(let M=0;M<m.length-1;M++)p.push(p[M]+Ie(m[M].x,m[M].z,m[M+1].x,m[M+1].z));const g=p[p.length-1];if(g<8)continue;const v=Kx(o);this.group.add(v),this.npcs.push({id:`npc_${i}`,...o,mesh:v,pts:m,cumDist:p,totalLength:g,dist:g*((i*.31+.15)%.85),dir:i%2===0?1:-1,speed:1.25+i%3*.25,walkPhase:i*1.1,lastLineIndex:-1,x:m[0].x,z:m[0].z})}}getRandomLine(t){const e=t.lines;if(!e||e.length===0)return"Hello! Have a safe walk!";if(e.length===1)return e[0];let i=Math.floor(Math.random()*e.length);return i===t.lastLineIndex&&(i=(i+1)%e.length),t.lastLineIndex=i,e[i]}getNearbyNpc(t,e=5.5){let i=null,o=1/0;for(const a of this.npcs){const l=Ie(t.x,t.z,a.x,a.z);l<=e&&l<o&&(o=l,i=a)}return i}_sample(t,e){const i=Math.max(0,Math.min(t.totalLength,e));let o=0;for(;o<t.cumDist.length-2&&t.cumDist[o+1]<i;)o++;const a=t.cumDist[o],l=t.cumDist[o+1]||a+1,c=Math.max(0,Math.min(1,(i-a)/(l-a+1e-6))),u=t.pts[o],d=t.pts[o+1]||u,m=d.x-u.x,p=d.z-u.z,g=Math.hypot(m,p)||1;return{x:u.x+m*c,z:u.z+p*c,dirX:m/g*t.dir,dirZ:p/g*t.dir}}update(t,e){for(const i of this.npcs){const a=(e?Ie(e.x,e.z,i.x,i.z):1/0)<=5.5;a||(i.dist+=i.dir*i.speed*t,i.dist>=i.totalLength?(i.dist=i.totalLength,i.dir=-1):i.dist<=0&&(i.dist=0,i.dir=1),i.walkPhase+=t*i.speed*4.5);const l=this._sample(i,i.dist);i.x=l.x,i.z=l.z,i.mesh.position.set(l.x,.16,l.z),a&&e?i.mesh.rotation.y=Math.atan2(e.x-i.x,e.z-i.z):i.mesh.rotation.y=Math.atan2(l.dirX,l.dirZ);const c=a?0:Math.sin(i.walkPhase)*.45,{leftLeg:u,rightLeg:d,leftArm:m,rightArm:p}=i.mesh.userData;u.rotation.x=c,d.rotation.x=-c,m.rotation.x=-c*.7,p.rotation.x=c*.7}}}const As=new fn(0,0,0,"YXZ"),Cs=new V,Jx={type:"change"},Qx={type:"lock"},ty={type:"unlock"},Tu=Math.PI/2;class ey extends vx{constructor(t,e=null){super(t,e),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=ny.bind(this),this._onPointerlockChange=iy.bind(this),this._onPointerlockError=sy.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(t){if(this.enabled===!1)return;const e=this.object;Cs.setFromMatrixColumn(e.matrix,0),Cs.crossVectors(e.up,Cs),e.position.addScaledVector(Cs,t)}moveRight(t){if(this.enabled===!1)return;const e=this.object;Cs.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(Cs,t)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function ny(s){if(this.enabled===!1||this.isLocked===!1)return;const t=s.movementX||s.mozMovementX||s.webkitMovementX||0,e=s.movementY||s.mozMovementY||s.webkitMovementY||0,i=this.object;As.setFromQuaternion(i.quaternion),As.y-=t*.002*this.pointerSpeed,As.x-=e*.002*this.pointerSpeed,As.x=Math.max(Tu-this.maxPolarAngle,Math.min(Tu-this.minPolarAngle,As.x)),i.quaternion.setFromEuler(As),this.dispatchEvent(Jx)}function iy(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Qx),this.isLocked=!0):(this.dispatchEvent(ty),this.isLocked=!1)}function sy(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const Tr=1.5,Au=5.4,Ps=.55,Cu=5500,Pu=32;function Lu(s,t){return(s-t+540)%360-180}class oy{constructor(t,e){this.camera=t,this.domElement=e,this.controls=new ey(t,e),this.position=new V(0,Tr,0),this.viewMode="first",this.isMoving=!1,this.walkCycle=0,this.keys={forward:!1,backward:!1,left:!1,right:!1,turnLeft:!1,turnRight:!1},this.yawHistory=[],this.lastHeadingDeg=0,this.lookedLeftAt=0,this.lookedRightAt=0,this.baseHeadingDeg=null,this.lastYawCheckPos={x:0,z:0},this._forwardVec=new V,this._rightVec=new V,this._upVec=new V(0,1,0),this._bindEvents()}_bindEvents(){window.addEventListener("keydown",t=>{if(document.activeElement?.tagName!=="INPUT")switch(t.code){case"KeyW":case"ArrowUp":this.keys.forward=!0;break;case"KeyS":case"ArrowDown":this.keys.backward=!0;break;case"KeyA":case"ArrowLeft":this.keys.left=!0;break;case"KeyD":case"ArrowRight":this.keys.right=!0;break;case"KeyQ":this.keys.turnLeft=!0;break;case"KeyE":this.keys.turnRight=!0;break}}),window.addEventListener("keyup",t=>{switch(t.code){case"KeyW":case"ArrowUp":this.keys.forward=!1;break;case"KeyS":case"ArrowDown":this.keys.backward=!1;break;case"KeyA":case"ArrowLeft":this.keys.left=!1;break;case"KeyD":case"ArrowRight":this.keys.right=!1;break;case"KeyQ":this.keys.turnLeft=!1;break;case"KeyE":this.keys.turnRight=!1;break}})}lock(){try{this.controls.lock()}catch{}}unlock(){try{this.controls.isLocked&&this.controls.unlock()}catch{}}setViewMode(t){this.viewMode=t==="third"?"third":"first";const e=new fn().setFromQuaternion(this.camera.quaternion,"YXZ");e.x=this.viewMode==="third"?-11*Math.PI/180:0,this.camera.quaternion.setFromEuler(e),this.syncCameraToPosition()}toggleViewMode(){return this.setViewMode(this.viewMode==="first"?"third":"first"),this.viewMode}syncCameraToPosition(){if(this.viewMode==="third"){this._forwardVec.set(0,0,-1).applyQuaternion(this.camera.quaternion),this._forwardVec.y=0,this._forwardVec.lengthSq()<1e-6?this._forwardVec.set(0,0,-1):this._forwardVec.normalize();const t=3.6;this.camera.position.set(this.position.x-this._forwardVec.x*t,2.25,this.position.z-this._forwardVec.z*t)}else this.camera.position.set(this.position.x,Tr,this.position.z)}setPose(t,e,i=0){this.position.set(t,Tr,e);const o=new fn(0,-i*Math.PI/180,0,"YXZ");this.camera.quaternion.setFromEuler(o),this.syncCameraToPosition(),this.lastHeadingDeg=i,this.baseHeadingDeg=i,this.lookedLeftAt=0,this.lookedRightAt=0,this.yawHistory=[]}getHeadingDeg(){return this._forwardVec.set(0,0,-1).applyQuaternion(this.camera.quaternion),ic(this._forwardVec.x,this._forwardVec.z)}getLookStatus(){const t=performance.now(),e=t-this.lookedLeftAt<=Cu,i=t-this.lookedRightAt<=Cu;return{lookedLeft:e,lookedRight:i,lookedBoth:e&&i}}hasLookedBothWays(){return this.getLookStatus().lookedBoth}resetLookCheck(){this.lookedLeftAt=0,this.lookedRightAt=0,this.baseHeadingDeg=this.getHeadingDeg()}_updateLookSweep(t=!1){const e=performance.now(),i=this.getHeadingDeg();this.baseHeadingDeg===null&&(this.baseHeadingDeg=i);const o=Lu(i,this.baseHeadingDeg);o<=-Pu&&(this.lookedLeftAt=e),o>=Pu&&(this.lookedRightAt=e);const a=this.getLookStatus();if(!a.lookedLeft&&!a.lookedRight&&t){const l=Lu(i,this.baseHeadingDeg);this.baseHeadingDeg=(this.baseHeadingDeg+l*.06+360)%360}this.lastHeadingDeg=i}update(t,e,i=!0){if(!i)return;const o=2;if(this.keys.turnLeft||this.keys.turnRight){const v=new fn().setFromQuaternion(this.camera.quaternion,"YXZ");this.keys.turnLeft&&(v.y+=o*t),this.keys.turnRight&&(v.y-=o*t),this.camera.quaternion.setFromEuler(v)}const a=(this.keys.forward?1:0)-(this.keys.backward?1:0),l=(this.keys.right?1:0)-(this.keys.left?1:0);if(this._updateLookSweep(a>0&&l===0),a===0&&l===0){this.isMoving=!1,this.syncCameraToPosition();return}this.isMoving=!0,this.walkCycle+=t*10.5,this._forwardVec.set(0,0,-1).applyQuaternion(this.camera.quaternion),this._forwardVec.y=0,this._forwardVec.lengthSq()>1e-6&&this._forwardVec.normalize(),this._rightVec.crossVectors(this._forwardVec,this._upVec).normalize();const c=this._forwardVec.x*a+this._rightVec.x*l,u=this._forwardVec.z*a+this._rightVec.z*l,d=Math.hypot(c,u)||1,m=this.position.x+c/d*Au*t,p=this.position.z+u/d*Au*t,g=this._resolveBuildingCollisions(m,p,e);this.position.set(g.x,Tr,g.z),this.syncCameraToPosition()}_resolveBuildingCollisions(t,e,i){let o=t,a=e;const l=this.position.x,c=this.position.z;for(const u of i){if(o<u.bbox.minX-Ps||o>u.bbox.maxX+Ps||a<u.bbox.minZ-Ps||a>u.bbox.maxZ+Ps)continue;const d=u.polygon;let m=Hr(o,a,d),p=1/0,g=null;for(let v=0;v<d.length;v++){const M=d[v],w=d[(v+1)%d.length],x=ci(o,a,M.x,M.z,w.x,w.z);x.dist<p&&(p=x.dist,g=x)}if(m)return{x:l,z:c};if(p<Ps&&g){const v=o-g.x,M=a-g.z,w=Math.hypot(v,M)||1e-4,x=Ps-p;o+=v/w*x,a+=M/w*x}}return{x:o,z:a}}}const ry=3e3,Ru=11.5,rc=5;class ay{constructor(t,e,i,o=[]){this.parsed=t,this.destinationXZ=e,this.onFeedback=i,this.schoolWalkways=o,this.schoolGrounds=(t.parks||[]).filter(a=>a.kind==="school_grounds"),this.reset()}setWorldData(t,e=[]){this.parsed=t,this.schoolWalkways=e,this.schoolGrounds=(t.parks||[]).filter(i=>i.kind==="school_grounds")}reset(){this.stars=3,this.points=100,this.lastPenaltyAt=-1e4,this.arrived=!1,this.gameOver=!1,this.gameOverReason="",this.offSidewalkSec=0,this.wasOffSidewalk=!1,this.startTime=performance.now(),this.safeCrossings=0,this.infractions=0,this.currentZone="sidewalk",this.activeCrosswalkId=null,this.checkedCrosswalkIds=new Set}getNearbyUnsignalizedCrosswalk(t,e=11.5){if(!t)return null;let i=null,o=1/0;for(const a of this.parsed.crosswalks){if(a.isSignalized)continue;const l=Ie(t.x,t.z,a.x,a.z);l<=e&&l<o&&(o=l,i=a)}return i}classifyPosition(t,e){for(const a of this.parsed.crosswalks){const l=t-a.x,c=e-a.z,u=l*a.roadDirX+c*a.roadDirZ,d=-l*a.roadDirZ+c*a.roadDirX;if(Math.abs(u)<=a.depth*.65&&Math.abs(d)<=a.width*.56)return{zone:a.isSignalized?"crosswalk_signalized":"crosswalk_unsignalized",crosswalk:a,streetName:a.roadName}}for(const a of this.parsed.footways)if(a.footwayType!=="crossing")for(let l=0;l<a.points.length-1;l++){const c=a.points[l],u=a.points[l+1];if(ci(t,e,c.x,c.z,u.x,u.z).dist<=1.6)return{zone:"sidewalk",crosswalk:null,streetName:a.name||"Sidewalk"}}for(const a of this.schoolWalkways)for(let l=0;l<a.points.length-1;l++){const c=a.points[l],u=a.points[l+1];if(ci(t,e,c.x,c.z,u.x,u.z).dist<=2.6)return{zone:"sidewalk",crosswalk:null,streetName:"School Safe Path"}}for(const a of this.schoolGrounds)if(Hr(t,e,a.polygon))return{zone:"sidewalk",crosswalk:null,streetName:a.name?`${a.name} Grounds`:"School Grounds"};let i=null,o=1/0;for(const a of this.parsed.roads)if(a.highway!=="service")for(let l=0;l<a.points.length-1;l++){const c=a.points[l],u=a.points[l+1],d=ci(t,e,c.x,c.z,u.x,u.z);d.dist<o&&(o=d.dist,i=a)}if(i){const a=i.width/2,l=a+i.sidewalkWidth+1.2;if(o<a-.7)return{zone:"road_lane",crosswalk:null,streetName:i.name||"the street"};if(o<=l)return{zone:"sidewalk",crosswalk:null,streetName:i.name||"Sidewalk"}}return{zone:"grass",crosswalk:null,streetName:"Grass / Park"}}_applyInfraction(t,e="⚠️",i=15){const o=performance.now();return o-this.lastPenaltyAt<ry?!1:(this.lastPenaltyAt=o,this.infractions+=1,this.stars=Math.max(0,this.stars-1),this.points=Math.max(0,this.points-i),this.onFeedback({type:"warning",icon:e,text:`-${i} pts! ${t}`}),!0)}update(t,e,i,o=0,a=!0){if(this.arrived||this.gameOver)return{zone:this.arrived?"plaza":this.currentZone,streetName:this.arrived?"Cootes Paradise Elementary School":"Road Lane",distanceToGoal:this.arrived?0:Math.round(Ie(t.x,t.z,this.destinationXZ.x,this.destinationXZ.z)),stars:this.stars,points:this.points,arrived:this.arrived,gameOver:this.gameOver,gameOverReason:this.gameOverReason,offSidewalkSec:this.offSidewalkSec,inCrosswalk:!1};const l=Ie(t.x,t.z,this.destinationXZ.x,this.destinationXZ.z);if(l<=Ru)return this.arrived=!0,this.offSidewalkSec=0,{zone:"plaza",streetName:"Cootes Paradise Elementary School",distanceToGoal:0,stars:this.stars,points:this.points,arrived:!0,gameOver:!1,gameOverReason:"",offSidewalkSec:0,inCrosswalk:!1,elapsedSec:Math.round((performance.now()-this.startTime)/1e3)};const c=this.classifyPosition(t.x,t.z);c.zone==="off_sidewalk"&&l<=Ru+12&&(c.zone="sidewalk",c.streetName="School Plaza");const u=this.currentZone;this.currentZone=c.zone;const d=c.zone==="crosswalk_signalized"||c.zone==="crosswalk_unsignalized",m=c.zone==="road_lane";if(a&&(m?(this.wasOffSidewalk||(this.wasOffSidewalk=!0,this.onFeedback({type:"warning",icon:"⚠️",text:`Warning! Get off ${c.streetName} and back onto the sidewalk within 5 seconds!`})),this.offSidewalkSec+=o,this.offSidewalkSec>=rc&&(this.gameOver=!0,this.gameOverReason=`You stayed in the road lane (${c.streetName}) for 5 seconds! Always walk on the sidewalk and cross only at white zebra crosswalks.`)):(this.wasOffSidewalk&&this.offSidewalkSec>=.6&&this.onFeedback({type:"success",icon:"✅",text:"Nice job getting safely out of the street!"}),this.wasOffSidewalk=!1,this.offSidewalkSec=0)),a&&c.zone==="road_lane"&&this._applyInfraction(`Stay on the sidewalk and use the white zebra crosswalk to cross ${c.streetName}.`,"🚧",15),a&&d&&c.crosswalk){const p=c.crosswalk;if(this.activeCrosswalkId!==p.id)if(this.activeCrosswalkId=p.id,c.zone==="crosswalk_signalized")i.isCrosswalkWalkAllowed(p)?this.checkedCrosswalkIds.has(p.id)||(this.checkedCrosswalkIds.add(p.id),this.safeCrossings+=1,this.points+=15,this.onFeedback({type:"success",icon:"🟢",text:`+15 pts! Awesome! You crossed ${p.roadName} on the GREEN Walk light!`})):this._applyInfraction("Light is RED (Don’t Walk)! Always wait for the GREEN Walk light!","🔴",30);else{const g=e.getLookStatus?e.getLookStatus():{lookedLeft:!1,lookedRight:!1,lookedBoth:e.hasLookedBothWays()};if(g.lookedBoth)this.checkedCrosswalkIds.has(p.id)||(this.checkedCrosswalkIds.add(p.id),this.safeCrossings+=1,this.points+=15,this.onFeedback({type:"success",icon:"🌟",text:`+15 pts! Super safe! You looked BOTH left and right before crossing ${p.roadName}!`}),e.resetLookCheck());else{const v=g.lookedLeft&&!g.lookedRight?"you looked LEFT, now look RIGHT too":!g.lookedLeft&&g.lookedRight?"you looked RIGHT, now look LEFT too":"look BOTH LEFT and RIGHT";this._applyInfraction(`Stop & check both ways before crossing ${p.roadName} (${v})!`,"👀",15)}}}else u!==c.zone&&(this.activeCrosswalkId=null);return{zone:c.zone,streetName:c.streetName,distanceToGoal:Math.round(l),stars:this.stars,points:this.points,arrived:!1,gameOver:this.gameOver,gameOverReason:this.gameOverReason,offSidewalkSec:this.offSidewalkSec,inCrosswalk:d}}}function ly(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Mo={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */var cy=Mo.exports,Iu;function hy(){return Iu||(Iu=1,(function(s,t){(function(e,i){i(t)})(cy,(function(e){var i="1.9.4";function o(n){var r,h,f,y;for(h=1,f=arguments.length;h<f;h++){y=arguments[h];for(r in y)n[r]=y[r]}return n}var a=Object.create||(function(){function n(){}return function(r){return n.prototype=r,new n}})();function l(n,r){var h=Array.prototype.slice;if(n.bind)return n.bind.apply(n,h.call(arguments,1));var f=h.call(arguments,2);return function(){return n.apply(r,f.length?f.concat(h.call(arguments)):arguments)}}var c=0;function u(n){return"_leaflet_id"in n||(n._leaflet_id=++c),n._leaflet_id}function d(n,r,h){var f,y,C,B;return B=function(){f=!1,y&&(C.apply(h,y),y=!1)},C=function(){f?y=arguments:(n.apply(h,arguments),setTimeout(B,r),f=!0)},C}function m(n,r,h){var f=r[1],y=r[0],C=f-y;return n===f&&h?n:((n-y)%C+C)%C+y}function p(){return!1}function g(n,r){if(r===!1)return n;var h=Math.pow(10,r===void 0?6:r);return Math.round(n*h)/h}function v(n){return n.trim?n.trim():n.replace(/^\s+|\s+$/g,"")}function M(n){return v(n).split(/\s+/)}function w(n,r){Object.prototype.hasOwnProperty.call(n,"options")||(n.options=n.options?a(n.options):{});for(var h in r)n.options[h]=r[h];return n.options}function x(n,r,h){var f=[];for(var y in n)f.push(encodeURIComponent(h?y.toUpperCase():y)+"="+encodeURIComponent(n[y]));return(!r||r.indexOf("?")===-1?"?":"&")+f.join("&")}var _=/\{ *([\w_ -]+) *\}/g;function b(n,r){return n.replace(_,function(h,f){var y=r[f];if(y===void 0)throw new Error("No value provided for variable "+h);return typeof y=="function"&&(y=y(r)),y})}var E=Array.isArray||function(n){return Object.prototype.toString.call(n)==="[object Array]"};function S(n,r){for(var h=0;h<n.length;h++)if(n[h]===r)return h;return-1}var U="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function N(n){return window["webkit"+n]||window["moz"+n]||window["ms"+n]}var D=0;function O(n){var r=+new Date,h=Math.max(0,16-(r-D));return D=r+h,window.setTimeout(n,h)}var P=window.requestAnimationFrame||N("RequestAnimationFrame")||O,T=window.cancelAnimationFrame||N("CancelAnimationFrame")||N("CancelRequestAnimationFrame")||function(n){window.clearTimeout(n)};function z(n,r,h){if(h&&P===O)n.call(r);else return P.call(window,l(n,r))}function G(n){n&&T.call(window,n)}var H={__proto__:null,extend:o,create:a,bind:l,get lastId(){return c},stamp:u,throttle:d,wrapNum:m,falseFn:p,formatNum:g,trim:v,splitWords:M,setOptions:w,getParamString:x,template:b,isArray:E,indexOf:S,emptyImageUrl:U,requestFn:P,cancelFn:T,requestAnimFrame:z,cancelAnimFrame:G};function F(){}F.extend=function(n){var r=function(){w(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},h=r.__super__=this.prototype,f=a(h);f.constructor=r,r.prototype=f;for(var y in this)Object.prototype.hasOwnProperty.call(this,y)&&y!=="prototype"&&y!=="__super__"&&(r[y]=this[y]);return n.statics&&o(r,n.statics),n.includes&&(j(n.includes),o.apply(null,[f].concat(n.includes))),o(f,n),delete f.statics,delete f.includes,f.options&&(f.options=h.options?a(h.options):{},o(f.options,n.options)),f._initHooks=[],f.callInitHooks=function(){if(!this._initHooksCalled){h.callInitHooks&&h.callInitHooks.call(this),this._initHooksCalled=!0;for(var C=0,B=f._initHooks.length;C<B;C++)f._initHooks[C].call(this)}},r},F.include=function(n){var r=this.prototype.options;return o(this.prototype,n),n.options&&(this.prototype.options=r,this.mergeOptions(n.options)),this},F.mergeOptions=function(n){return o(this.prototype.options,n),this},F.addInitHook=function(n){var r=Array.prototype.slice.call(arguments,1),h=typeof n=="function"?n:function(){this[n].apply(this,r)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(h),this};function j(n){if(!(typeof L>"u"||!L||!L.Mixin)){n=E(n)?n:[n];for(var r=0;r<n.length;r++)n[r]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var Y={on:function(n,r,h){if(typeof n=="object")for(var f in n)this._on(f,n[f],r);else{n=M(n);for(var y=0,C=n.length;y<C;y++)this._on(n[y],r,h)}return this},off:function(n,r,h){if(!arguments.length)delete this._events;else if(typeof n=="object")for(var f in n)this._off(f,n[f],r);else{n=M(n);for(var y=arguments.length===1,C=0,B=n.length;C<B;C++)y?this._off(n[C]):this._off(n[C],r,h)}return this},_on:function(n,r,h,f){if(typeof r!="function"){console.warn("wrong listener type: "+typeof r);return}if(this._listens(n,r,h)===!1){h===this&&(h=void 0);var y={fn:r,ctx:h};f&&(y.once=!0),this._events=this._events||{},this._events[n]=this._events[n]||[],this._events[n].push(y)}},_off:function(n,r,h){var f,y,C;if(this._events&&(f=this._events[n],!!f)){if(arguments.length===1){if(this._firingCount)for(y=0,C=f.length;y<C;y++)f[y].fn=p;delete this._events[n];return}if(typeof r!="function"){console.warn("wrong listener type: "+typeof r);return}var B=this._listens(n,r,h);if(B!==!1){var K=f[B];this._firingCount&&(K.fn=p,this._events[n]=f=f.slice()),f.splice(B,1)}}},fire:function(n,r,h){if(!this.listens(n,h))return this;var f=o({},r,{type:n,target:this,sourceTarget:r&&r.sourceTarget||this});if(this._events){var y=this._events[n];if(y){this._firingCount=this._firingCount+1||1;for(var C=0,B=y.length;C<B;C++){var K=y[C],nt=K.fn;K.once&&this.off(n,nt,K.ctx),nt.call(K.ctx||this,f)}this._firingCount--}}return h&&this._propagateEvent(f),this},listens:function(n,r,h,f){typeof n!="string"&&console.warn('"string" type argument expected');var y=r;typeof r!="function"&&(f=!!r,y=void 0,h=void 0);var C=this._events&&this._events[n];if(C&&C.length&&this._listens(n,y,h)!==!1)return!0;if(f){for(var B in this._eventParents)if(this._eventParents[B].listens(n,r,h,f))return!0}return!1},_listens:function(n,r,h){if(!this._events)return!1;var f=this._events[n]||[];if(!r)return!!f.length;h===this&&(h=void 0);for(var y=0,C=f.length;y<C;y++)if(f[y].fn===r&&f[y].ctx===h)return y;return!1},once:function(n,r,h){if(typeof n=="object")for(var f in n)this._on(f,n[f],r,!0);else{n=M(n);for(var y=0,C=n.length;y<C;y++)this._on(n[y],r,h,!0)}return this},addEventParent:function(n){return this._eventParents=this._eventParents||{},this._eventParents[u(n)]=n,this},removeEventParent:function(n){return this._eventParents&&delete this._eventParents[u(n)],this},_propagateEvent:function(n){for(var r in this._eventParents)this._eventParents[r].fire(n.type,o({layer:n.target,propagatedFrom:n.target},n),!0)}};Y.addEventListener=Y.on,Y.removeEventListener=Y.clearAllEventListeners=Y.off,Y.addOneTimeEventListener=Y.once,Y.fireEvent=Y.fire,Y.hasEventListeners=Y.listens;var ct=F.extend(Y);function Z(n,r,h){this.x=h?Math.round(n):n,this.y=h?Math.round(r):r}var xt=Math.trunc||function(n){return n>0?Math.floor(n):Math.ceil(n)};Z.prototype={clone:function(){return new Z(this.x,this.y)},add:function(n){return this.clone()._add(st(n))},_add:function(n){return this.x+=n.x,this.y+=n.y,this},subtract:function(n){return this.clone()._subtract(st(n))},_subtract:function(n){return this.x-=n.x,this.y-=n.y,this},divideBy:function(n){return this.clone()._divideBy(n)},_divideBy:function(n){return this.x/=n,this.y/=n,this},multiplyBy:function(n){return this.clone()._multiplyBy(n)},_multiplyBy:function(n){return this.x*=n,this.y*=n,this},scaleBy:function(n){return new Z(this.x*n.x,this.y*n.y)},unscaleBy:function(n){return new Z(this.x/n.x,this.y/n.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=xt(this.x),this.y=xt(this.y),this},distanceTo:function(n){n=st(n);var r=n.x-this.x,h=n.y-this.y;return Math.sqrt(r*r+h*h)},equals:function(n){return n=st(n),n.x===this.x&&n.y===this.y},contains:function(n){return n=st(n),Math.abs(n.x)<=Math.abs(this.x)&&Math.abs(n.y)<=Math.abs(this.y)},toString:function(){return"Point("+g(this.x)+", "+g(this.y)+")"}};function st(n,r,h){return n instanceof Z?n:E(n)?new Z(n[0],n[1]):n==null?n:typeof n=="object"&&"x"in n&&"y"in n?new Z(n.x,n.y):new Z(n,r,h)}function gt(n,r){if(n)for(var h=r?[n,r]:n,f=0,y=h.length;f<y;f++)this.extend(h[f])}gt.prototype={extend:function(n){var r,h;if(!n)return this;if(n instanceof Z||typeof n[0]=="number"||"x"in n)r=h=st(n);else if(n=It(n),r=n.min,h=n.max,!r||!h)return this;return!this.min&&!this.max?(this.min=r.clone(),this.max=h.clone()):(this.min.x=Math.min(r.x,this.min.x),this.max.x=Math.max(h.x,this.max.x),this.min.y=Math.min(r.y,this.min.y),this.max.y=Math.max(h.y,this.max.y)),this},getCenter:function(n){return st((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,n)},getBottomLeft:function(){return st(this.min.x,this.max.y)},getTopRight:function(){return st(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(n){var r,h;return typeof n[0]=="number"||n instanceof Z?n=st(n):n=It(n),n instanceof gt?(r=n.min,h=n.max):r=h=n,r.x>=this.min.x&&h.x<=this.max.x&&r.y>=this.min.y&&h.y<=this.max.y},intersects:function(n){n=It(n);var r=this.min,h=this.max,f=n.min,y=n.max,C=y.x>=r.x&&f.x<=h.x,B=y.y>=r.y&&f.y<=h.y;return C&&B},overlaps:function(n){n=It(n);var r=this.min,h=this.max,f=n.min,y=n.max,C=y.x>r.x&&f.x<h.x,B=y.y>r.y&&f.y<h.y;return C&&B},isValid:function(){return!!(this.min&&this.max)},pad:function(n){var r=this.min,h=this.max,f=Math.abs(r.x-h.x)*n,y=Math.abs(r.y-h.y)*n;return It(st(r.x-f,r.y-y),st(h.x+f,h.y+y))},equals:function(n){return n?(n=It(n),this.min.equals(n.getTopLeft())&&this.max.equals(n.getBottomRight())):!1}};function It(n,r){return!n||n instanceof gt?n:new gt(n,r)}function Dt(n,r){if(n)for(var h=r?[n,r]:n,f=0,y=h.length;f<y;f++)this.extend(h[f])}Dt.prototype={extend:function(n){var r=this._southWest,h=this._northEast,f,y;if(n instanceof rt)f=n,y=n;else if(n instanceof Dt){if(f=n._southWest,y=n._northEast,!f||!y)return this}else return n?this.extend(pt(n)||Q(n)):this;return!r&&!h?(this._southWest=new rt(f.lat,f.lng),this._northEast=new rt(y.lat,y.lng)):(r.lat=Math.min(f.lat,r.lat),r.lng=Math.min(f.lng,r.lng),h.lat=Math.max(y.lat,h.lat),h.lng=Math.max(y.lng,h.lng)),this},pad:function(n){var r=this._southWest,h=this._northEast,f=Math.abs(r.lat-h.lat)*n,y=Math.abs(r.lng-h.lng)*n;return new Dt(new rt(r.lat-f,r.lng-y),new rt(h.lat+f,h.lng+y))},getCenter:function(){return new rt((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new rt(this.getNorth(),this.getWest())},getSouthEast:function(){return new rt(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(n){typeof n[0]=="number"||n instanceof rt||"lat"in n?n=pt(n):n=Q(n);var r=this._southWest,h=this._northEast,f,y;return n instanceof Dt?(f=n.getSouthWest(),y=n.getNorthEast()):f=y=n,f.lat>=r.lat&&y.lat<=h.lat&&f.lng>=r.lng&&y.lng<=h.lng},intersects:function(n){n=Q(n);var r=this._southWest,h=this._northEast,f=n.getSouthWest(),y=n.getNorthEast(),C=y.lat>=r.lat&&f.lat<=h.lat,B=y.lng>=r.lng&&f.lng<=h.lng;return C&&B},overlaps:function(n){n=Q(n);var r=this._southWest,h=this._northEast,f=n.getSouthWest(),y=n.getNorthEast(),C=y.lat>r.lat&&f.lat<h.lat,B=y.lng>r.lng&&f.lng<h.lng;return C&&B},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(n,r){return n?(n=Q(n),this._southWest.equals(n.getSouthWest(),r)&&this._northEast.equals(n.getNorthEast(),r)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function Q(n,r){return n instanceof Dt?n:new Dt(n,r)}function rt(n,r,h){if(isNaN(n)||isNaN(r))throw new Error("Invalid LatLng object: ("+n+", "+r+")");this.lat=+n,this.lng=+r,h!==void 0&&(this.alt=+h)}rt.prototype={equals:function(n,r){if(!n)return!1;n=pt(n);var h=Math.max(Math.abs(this.lat-n.lat),Math.abs(this.lng-n.lng));return h<=(r===void 0?1e-9:r)},toString:function(n){return"LatLng("+g(this.lat,n)+", "+g(this.lng,n)+")"},distanceTo:function(n){return Bt.distance(this,pt(n))},wrap:function(){return Bt.wrapLatLng(this)},toBounds:function(n){var r=180*n/40075017,h=r/Math.cos(Math.PI/180*this.lat);return Q([this.lat-r,this.lng-h],[this.lat+r,this.lng+h])},clone:function(){return new rt(this.lat,this.lng,this.alt)}};function pt(n,r,h){return n instanceof rt?n:E(n)&&typeof n[0]!="object"?n.length===3?new rt(n[0],n[1],n[2]):n.length===2?new rt(n[0],n[1]):null:n==null?n:typeof n=="object"&&"lat"in n?new rt(n.lat,"lng"in n?n.lng:n.lon,n.alt):r===void 0?null:new rt(n,r,h)}var vt={latLngToPoint:function(n,r){var h=this.projection.project(n),f=this.scale(r);return this.transformation._transform(h,f)},pointToLatLng:function(n,r){var h=this.scale(r),f=this.transformation.untransform(n,h);return this.projection.unproject(f)},project:function(n){return this.projection.project(n)},unproject:function(n){return this.projection.unproject(n)},scale:function(n){return 256*Math.pow(2,n)},zoom:function(n){return Math.log(n/256)/Math.LN2},getProjectedBounds:function(n){if(this.infinite)return null;var r=this.projection.bounds,h=this.scale(n),f=this.transformation.transform(r.min,h),y=this.transformation.transform(r.max,h);return new gt(f,y)},infinite:!1,wrapLatLng:function(n){var r=this.wrapLng?m(n.lng,this.wrapLng,!0):n.lng,h=this.wrapLat?m(n.lat,this.wrapLat,!0):n.lat,f=n.alt;return new rt(h,r,f)},wrapLatLngBounds:function(n){var r=n.getCenter(),h=this.wrapLatLng(r),f=r.lat-h.lat,y=r.lng-h.lng;if(f===0&&y===0)return n;var C=n.getSouthWest(),B=n.getNorthEast(),K=new rt(C.lat-f,C.lng-y),nt=new rt(B.lat-f,B.lng-y);return new Dt(K,nt)}},Bt=o({},vt,{wrapLng:[-180,180],R:6371e3,distance:function(n,r){var h=Math.PI/180,f=n.lat*h,y=r.lat*h,C=Math.sin((r.lat-n.lat)*h/2),B=Math.sin((r.lng-n.lng)*h/2),K=C*C+Math.cos(f)*Math.cos(y)*B*B,nt=2*Math.atan2(Math.sqrt(K),Math.sqrt(1-K));return this.R*nt}}),jt=6378137,lt={R:jt,MAX_LATITUDE:85.0511287798,project:function(n){var r=Math.PI/180,h=this.MAX_LATITUDE,f=Math.max(Math.min(h,n.lat),-h),y=Math.sin(f*r);return new Z(this.R*n.lng*r,this.R*Math.log((1+y)/(1-y))/2)},unproject:function(n){var r=180/Math.PI;return new rt((2*Math.atan(Math.exp(n.y/this.R))-Math.PI/2)*r,n.x*r/this.R)},bounds:(function(){var n=jt*Math.PI;return new gt([-n,-n],[n,n])})()};function Mt(n,r,h,f){if(E(n)){this._a=n[0],this._b=n[1],this._c=n[2],this._d=n[3];return}this._a=n,this._b=r,this._c=h,this._d=f}Mt.prototype={transform:function(n,r){return this._transform(n.clone(),r)},_transform:function(n,r){return r=r||1,n.x=r*(this._a*n.x+this._b),n.y=r*(this._c*n.y+this._d),n},untransform:function(n,r){return r=r||1,new Z((n.x/r-this._b)/this._a,(n.y/r-this._d)/this._c)}};function J(n,r,h,f){return new Mt(n,r,h,f)}var ut=o({},Bt,{code:"EPSG:3857",projection:lt,transformation:(function(){var n=.5/(Math.PI*lt.R);return J(n,.5,-n,.5)})()}),k=o({},ut,{code:"EPSG:900913"});function Rt(n){return document.createElementNS("http://www.w3.org/2000/svg",n)}function ht(n,r){var h="",f,y,C,B,K,nt;for(f=0,C=n.length;f<C;f++){for(K=n[f],y=0,B=K.length;y<B;y++)nt=K[y],h+=(y?"L":"M")+nt.x+" "+nt.y;h+=r?Yt.svg?"z":"x":""}return h||"M0 0"}var Et=document.documentElement.style,wt="ActiveXObject"in window,Nt=wt&&!document.addEventListener,At="msLaunchUri"in navigator&&!("documentMode"in document),I=ln("webkit"),A=ln("android"),$=ln("android 2")||ln("android 3"),ot=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),dt=A&&ln("Google")&&ot<537&&!("AudioNode"in window),at=!!window.opera,Vt=!At&&ln("chrome"),Ct=ln("gecko")&&!I&&!at&&!wt,Ft=!Vt&&ln("safari"),ce=ln("phantom"),yt="OTransition"in Et,Gt=navigator.platform.indexOf("Win")===0,Jt=wt&&"transition"in Et,Qt="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!$,Ht="MozPerspective"in Et,fe=!window.L_DISABLE_3D&&(Jt||Qt||Ht)&&!yt&&!ce,ee=typeof orientation<"u"||ln("mobile"),ye=ee&&I,W=ee&&Qt,Pt=!window.PointerEvent&&window.MSPointerEvent,it=!!(window.PointerEvent||Pt),ft="ontouchstart"in window||!!window.TouchEvent,zt=!window.L_NO_TOUCH&&(ft||it),Ut=ee&&at,ie=ee&&Ct,Ce=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Fe=(function(){var n=!1;try{var r=Object.defineProperty({},"passive",{get:function(){n=!0}});window.addEventListener("testPassiveEventSupport",p,r),window.removeEventListener("testPassiveEventSupport",p,r)}catch{}return n})(),ge=(function(){return!!document.createElement("canvas").getContext})(),tn=!!(document.createElementNS&&Rt("svg").createSVGRect),wn=!!tn&&(function(){var n=document.createElement("div");return n.innerHTML="<svg/>",(n.firstChild&&n.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"})(),Do=!tn&&(function(){try{var n=document.createElement("div");n.innerHTML='<v:shape adj="1"/>';var r=n.firstChild;return r.style.behavior="url(#default#VML)",r&&typeof r.adj=="object"}catch{return!1}})(),No=navigator.platform.indexOf("Mac")===0,Xn=navigator.platform.indexOf("Linux")===0;function ln(n){return navigator.userAgent.toLowerCase().indexOf(n)>=0}var Yt={ie:wt,ielt9:Nt,edge:At,webkit:I,android:A,android23:$,androidStock:dt,opera:at,chrome:Vt,gecko:Ct,safari:Ft,phantom:ce,opera12:yt,win:Gt,ie3d:Jt,webkit3d:Qt,gecko3d:Ht,any3d:fe,mobile:ee,mobileWebkit:ye,mobileWebkit3d:W,msPointer:Pt,pointer:it,touch:zt,touchNative:ft,mobileOpera:Ut,mobileGecko:ie,retina:Ce,passiveEvents:Fe,canvas:ge,svg:tn,vml:Do,inlineSvg:wn,mac:No,linux:Xn},qs=Yt.msPointer?"MSPointerDown":"pointerdown",Pi=Yt.msPointer?"MSPointerMove":"pointermove",Ys=Yt.msPointer?"MSPointerUp":"pointerup",Li=Yt.msPointer?"MSPointerCancel":"pointercancel",ns={touchstart:qs,touchmove:Pi,touchend:Ys,touchcancel:Li},$s={touchstart:Ot,touchmove:St,touchend:St,touchcancel:St},di={},Uo=!1;function $r(n,r,h){return r==="touchstart"&&q(),$s[r]?(h=$s[r].bind(this,h),n.addEventListener(ns[r],h,!1),h):(console.warn("wrong event specified:",r),p)}function R(n,r,h){if(!ns[r]){console.warn("wrong event specified:",r);return}n.removeEventListener(ns[r],h,!1)}function X(n){di[n.pointerId]=n}function tt(n){di[n.pointerId]&&(di[n.pointerId]=n)}function et(n){delete di[n.pointerId]}function q(){Uo||(document.addEventListener(qs,X,!0),document.addEventListener(Pi,tt,!0),document.addEventListener(Ys,et,!0),document.addEventListener(Li,et,!0),Uo=!0)}function St(n,r){if(r.pointerType!==(r.MSPOINTER_TYPE_MOUSE||"mouse")){r.touches=[];for(var h in di)r.touches.push(di[h]);r.changedTouches=[r],n(r)}}function Ot(n,r){r.MSPOINTER_TYPE_TOUCH&&r.pointerType===r.MSPOINTER_TYPE_TOUCH&&Xe(r),St(n,r)}function Xt(n){var r={},h,f;for(f in n)h=n[f],r[f]=h&&h.bind?h.bind(n):h;return n=r,r.type="dblclick",r.detail=2,r.isTrusted=!1,r._simulated=!0,r}var qt=200;function ne(n,r){n.addEventListener("dblclick",r);var h=0,f;function y(C){if(C.detail!==1){f=C.detail;return}if(!(C.pointerType==="mouse"||C.sourceCapabilities&&!C.sourceCapabilities.firesTouchEvents)){var B=Lc(C);if(!(B.some(function(nt){return nt instanceof HTMLLabelElement&&nt.attributes.for})&&!B.some(function(nt){return nt instanceof HTMLInputElement||nt instanceof HTMLSelectElement}))){var K=Date.now();K-h<=qt?(f++,f===2&&r(Xt(C))):f=1,h=K}}}return n.addEventListener("click",y),{dblclick:r,simDblclick:y}}function se(n,r){n.removeEventListener("dblclick",r.dblclick),n.removeEventListener("click",r.simDblclick)}var Zt=pn(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),he=pn(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ve=he==="webkitTransition"||he==="OTransition"?he+"End":"transitionend";function Me(n){return typeof n=="string"?document.getElementById(n):n}function Ne(n,r){var h=n.style[r]||n.currentStyle&&n.currentStyle[r];if((!h||h==="auto")&&document.defaultView){var f=document.defaultView.getComputedStyle(n,null);h=f?f[r]:null}return h==="auto"?null:h}function Wt(n,r,h){var f=document.createElement(n);return f.className=r||"",h&&h.appendChild(f),f}function Tt(n){var r=n.parentNode;r&&r.removeChild(n)}function cn(n){for(;n.firstChild;)n.removeChild(n.firstChild)}function de(n){var r=n.parentNode;r&&r.lastChild!==n&&r.appendChild(n)}function Be(n){var r=n.parentNode;r&&r.firstChild!==n&&r.insertBefore(n,r.firstChild)}function Un(n,r){if(n.classList!==void 0)return n.classList.contains(r);var h=en(n);return h.length>0&&new RegExp("(^|\\s)"+r+"(\\s|$)").test(h)}function Kt(n,r){if(n.classList!==void 0)for(var h=M(r),f=0,y=h.length;f<y;f++)n.classList.add(h[f]);else if(!Un(n,r)){var C=en(n);xe(n,(C?C+" ":"")+r)}}function Ee(n,r){n.classList!==void 0?n.classList.remove(r):xe(n,v((" "+en(n)+" ").replace(" "+r+" "," ")))}function xe(n,r){n.className.baseVal===void 0?n.className=r:n.className.baseVal=r}function en(n){return n.correspondingElement&&(n=n.correspondingElement),n.className.baseVal===void 0?n.className:n.className.baseVal}function He(n,r){"opacity"in n.style?n.style.opacity=r:"filter"in n.style&&hn(n,r)}function hn(n,r){var h=!1,f="DXImageTransform.Microsoft.Alpha";try{h=n.filters.item(f)}catch{if(r===1)return}r=Math.round(r*100),h?(h.Enabled=r!==100,h.Opacity=r):n.style.filter+=" progid:"+f+"(opacity="+r+")"}function pn(n){for(var r=document.documentElement.style,h=0;h<n.length;h++)if(n[h]in r)return n[h];return!1}function qe(n,r,h){var f=r||new Z(0,0);n.style[Zt]=(Yt.ie3d?"translate("+f.x+"px,"+f.y+"px)":"translate3d("+f.x+"px,"+f.y+"px,0)")+(h?" scale("+h+")":"")}function Le(n,r){n._leaflet_pos=r,Yt.any3d?qe(n,r):(n.style.left=r.x+"px",n.style.top=r.y+"px")}function Ri(n){return n._leaflet_pos||new Z(0,0)}var Ks,js,Kr;if("onselectstart"in document)Ks=function(){oe(window,"selectstart",Xe)},js=function(){Ae(window,"selectstart",Xe)};else{var Js=pn(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);Ks=function(){if(Js){var n=document.documentElement.style;Kr=n[Js],n[Js]="none"}},js=function(){Js&&(document.documentElement.style[Js]=Kr,Kr=void 0)}}function jr(){oe(window,"dragstart",Xe)}function Jr(){Ae(window,"dragstart",Xe)}var Oo,Qr;function ta(n){for(;n.tabIndex===-1;)n=n.parentNode;n.style&&(zo(),Oo=n,Qr=n.style.outlineStyle,n.style.outlineStyle="none",oe(window,"keydown",zo))}function zo(){Oo&&(Oo.style.outlineStyle=Qr,Oo=void 0,Qr=void 0,Ae(window,"keydown",zo))}function Cc(n){do n=n.parentNode;while((!n.offsetWidth||!n.offsetHeight)&&n!==document.body);return n}function ea(n){var r=n.getBoundingClientRect();return{x:r.width/n.offsetWidth||1,y:r.height/n.offsetHeight||1,boundingClientRect:r}}var zd={__proto__:null,TRANSFORM:Zt,TRANSITION:he,TRANSITION_END:ve,get:Me,getStyle:Ne,create:Wt,remove:Tt,empty:cn,toFront:de,toBack:Be,hasClass:Un,addClass:Kt,removeClass:Ee,setClass:xe,getClass:en,setOpacity:He,testProp:pn,setTransform:qe,setPosition:Le,getPosition:Ri,get disableTextSelection(){return Ks},get enableTextSelection(){return js},disableImageDrag:jr,enableImageDrag:Jr,preventOutline:ta,restoreOutline:zo,getSizedParentNode:Cc,getScale:ea};function oe(n,r,h,f){if(r&&typeof r=="object")for(var y in r)ia(n,y,r[y],h);else{r=M(r);for(var C=0,B=r.length;C<B;C++)ia(n,r[C],h,f)}return this}var On="_leaflet_events";function Ae(n,r,h,f){if(arguments.length===1)Pc(n),delete n[On];else if(r&&typeof r=="object")for(var y in r)sa(n,y,r[y],h);else if(r=M(r),arguments.length===2)Pc(n,function(K){return S(r,K)!==-1});else for(var C=0,B=r.length;C<B;C++)sa(n,r[C],h,f);return this}function Pc(n,r){for(var h in n[On]){var f=h.split(/\d/)[0];(!r||r(f))&&sa(n,f,null,null,h)}}var na={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function ia(n,r,h,f){var y=r+u(h)+(f?"_"+u(f):"");if(n[On]&&n[On][y])return this;var C=function(K){return h.call(f||n,K||window.event)},B=C;!Yt.touchNative&&Yt.pointer&&r.indexOf("touch")===0?C=$r(n,r,C):Yt.touch&&r==="dblclick"?C=ne(n,C):"addEventListener"in n?r==="touchstart"||r==="touchmove"||r==="wheel"||r==="mousewheel"?n.addEventListener(na[r]||r,C,Yt.passiveEvents?{passive:!1}:!1):r==="mouseenter"||r==="mouseleave"?(C=function(K){K=K||window.event,ra(n,K)&&B(K)},n.addEventListener(na[r],C,!1)):n.addEventListener(r,B,!1):n.attachEvent("on"+r,C),n[On]=n[On]||{},n[On][y]=C}function sa(n,r,h,f,y){y=y||r+u(h)+(f?"_"+u(f):"");var C=n[On]&&n[On][y];if(!C)return this;!Yt.touchNative&&Yt.pointer&&r.indexOf("touch")===0?R(n,r,C):Yt.touch&&r==="dblclick"?se(n,C):"removeEventListener"in n?n.removeEventListener(na[r]||r,C,!1):n.detachEvent("on"+r,C),n[On][y]=null}function Ii(n){return n.stopPropagation?n.stopPropagation():n.originalEvent?n.originalEvent._stopped=!0:n.cancelBubble=!0,this}function oa(n){return ia(n,"wheel",Ii),this}function Qs(n){return oe(n,"mousedown touchstart dblclick contextmenu",Ii),n._leaflet_disable_click=!0,this}function Xe(n){return n.preventDefault?n.preventDefault():n.returnValue=!1,this}function Di(n){return Xe(n),Ii(n),this}function Lc(n){if(n.composedPath)return n.composedPath();for(var r=[],h=n.target;h;)r.push(h),h=h.parentNode;return r}function Rc(n,r){if(!r)return new Z(n.clientX,n.clientY);var h=ea(r),f=h.boundingClientRect;return new Z((n.clientX-f.left)/h.x-r.clientLeft,(n.clientY-f.top)/h.y-r.clientTop)}var kd=Yt.linux&&Yt.chrome?window.devicePixelRatio:Yt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Ic(n){return Yt.edge?n.wheelDeltaY/2:n.deltaY&&n.deltaMode===0?-n.deltaY/kd:n.deltaY&&n.deltaMode===1?-n.deltaY*20:n.deltaY&&n.deltaMode===2?-n.deltaY*60:n.deltaX||n.deltaZ?0:n.wheelDelta?(n.wheelDeltaY||n.wheelDelta)/2:n.detail&&Math.abs(n.detail)<32765?-n.detail*20:n.detail?n.detail/-32765*60:0}function ra(n,r){var h=r.relatedTarget;if(!h)return!0;try{for(;h&&h!==n;)h=h.parentNode}catch{return!1}return h!==n}var Fd={__proto__:null,on:oe,off:Ae,stopPropagation:Ii,disableScrollPropagation:oa,disableClickPropagation:Qs,preventDefault:Xe,stop:Di,getPropagationPath:Lc,getMousePosition:Rc,getWheelDelta:Ic,isExternalTarget:ra,addListener:oe,removeListener:Ae},Dc=ct.extend({run:function(n,r,h,f){this.stop(),this._el=n,this._inProgress=!0,this._duration=h||.25,this._easeOutPower=1/Math.max(f||.5,.2),this._startPos=Ri(n),this._offset=r.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=z(this._animate,this),this._step()},_step:function(n){var r=+new Date-this._startTime,h=this._duration*1e3;r<h?this._runFrame(this._easeOut(r/h),n):(this._runFrame(1),this._complete())},_runFrame:function(n,r){var h=this._startPos.add(this._offset.multiplyBy(n));r&&h._round(),Le(this._el,h),this.fire("step")},_complete:function(){G(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(n){return 1-Math.pow(1-n,this._easeOutPower)}}),me=ct.extend({options:{crs:ut,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(n,r){r=w(this,r),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(n),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),r.maxBounds&&this.setMaxBounds(r.maxBounds),r.zoom!==void 0&&(this._zoom=this._limitZoom(r.zoom)),r.center&&r.zoom!==void 0&&this.setView(pt(r.center),r.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=he&&Yt.any3d&&!Yt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),oe(this._proxy,ve,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(n,r,h){if(r=r===void 0?this._zoom:this._limitZoom(r),n=this._limitCenter(pt(n),r,this.options.maxBounds),h=h||{},this._stop(),this._loaded&&!h.reset&&h!==!0){h.animate!==void 0&&(h.zoom=o({animate:h.animate},h.zoom),h.pan=o({animate:h.animate,duration:h.duration},h.pan));var f=this._zoom!==r?this._tryAnimatedZoom&&this._tryAnimatedZoom(n,r,h.zoom):this._tryAnimatedPan(n,h.pan);if(f)return clearTimeout(this._sizeTimer),this}return this._resetView(n,r,h.pan&&h.pan.noMoveStart),this},setZoom:function(n,r){return this._loaded?this.setView(this.getCenter(),n,{zoom:r}):(this._zoom=n,this)},zoomIn:function(n,r){return n=n||(Yt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+n,r)},zoomOut:function(n,r){return n=n||(Yt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-n,r)},setZoomAround:function(n,r,h){var f=this.getZoomScale(r),y=this.getSize().divideBy(2),C=n instanceof Z?n:this.latLngToContainerPoint(n),B=C.subtract(y).multiplyBy(1-1/f),K=this.containerPointToLatLng(y.add(B));return this.setView(K,r,{zoom:h})},_getBoundsCenterZoom:function(n,r){r=r||{},n=n.getBounds?n.getBounds():Q(n);var h=st(r.paddingTopLeft||r.padding||[0,0]),f=st(r.paddingBottomRight||r.padding||[0,0]),y=this.getBoundsZoom(n,!1,h.add(f));if(y=typeof r.maxZoom=="number"?Math.min(r.maxZoom,y):y,y===1/0)return{center:n.getCenter(),zoom:y};var C=f.subtract(h).divideBy(2),B=this.project(n.getSouthWest(),y),K=this.project(n.getNorthEast(),y),nt=this.unproject(B.add(K).divideBy(2).add(C),y);return{center:nt,zoom:y}},fitBounds:function(n,r){if(n=Q(n),!n.isValid())throw new Error("Bounds are not valid.");var h=this._getBoundsCenterZoom(n,r);return this.setView(h.center,h.zoom,r)},fitWorld:function(n){return this.fitBounds([[-90,-180],[90,180]],n)},panTo:function(n,r){return this.setView(n,this._zoom,{pan:r})},panBy:function(n,r){if(n=st(n).round(),r=r||{},!n.x&&!n.y)return this.fire("moveend");if(r.animate!==!0&&!this.getSize().contains(n))return this._resetView(this.unproject(this.project(this.getCenter()).add(n)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Dc,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),r.noMoveStart||this.fire("movestart"),r.animate!==!1){Kt(this._mapPane,"leaflet-pan-anim");var h=this._getMapPanePos().subtract(n).round();this._panAnim.run(this._mapPane,h,r.duration||.25,r.easeLinearity)}else this._rawPanBy(n),this.fire("move").fire("moveend");return this},flyTo:function(n,r,h){if(h=h||{},h.animate===!1||!Yt.any3d)return this.setView(n,r,h);this._stop();var f=this.project(this.getCenter()),y=this.project(n),C=this.getSize(),B=this._zoom;n=pt(n),r=r===void 0?B:r;var K=Math.max(C.x,C.y),nt=K*this.getZoomScale(B,r),mt=y.distanceTo(f)||1,kt=1.42,te=kt*kt;function ue(Ue){var $o=Ue?-1:1,Cf=Ue?nt:K,Pf=nt*nt-K*K+$o*te*te*mt*mt,Lf=2*Cf*te*mt,ga=Pf/Lf,fh=Math.sqrt(ga*ga+1)-ga,Rf=fh<1e-9?-18:Math.log(fh);return Rf}function nn(Ue){return(Math.exp(Ue)-Math.exp(-Ue))/2}function Ve(Ue){return(Math.exp(Ue)+Math.exp(-Ue))/2}function vn(Ue){return nn(Ue)/Ve(Ue)}var un=ue(0);function ls(Ue){return K*(Ve(un)/Ve(un+kt*Ue))}function Ef(Ue){return K*(Ve(un)*vn(un+kt*Ue)-nn(un))/te}function bf(Ue){return 1-Math.pow(1-Ue,1.5)}var Tf=Date.now(),uh=(ue(1)-un)/kt,Af=h.duration?1e3*h.duration:1e3*uh*.8;function dh(){var Ue=(Date.now()-Tf)/Af,$o=bf(Ue)*uh;Ue<=1?(this._flyToFrame=z(dh,this),this._move(this.unproject(f.add(y.subtract(f).multiplyBy(Ef($o)/mt)),B),this.getScaleZoom(K/ls($o),B),{flyTo:!0})):this._move(n,r)._moveEnd(!0)}return this._moveStart(!0,h.noMoveStart),dh.call(this),this},flyToBounds:function(n,r){var h=this._getBoundsCenterZoom(n,r);return this.flyTo(h.center,h.zoom,r)},setMaxBounds:function(n){return n=Q(n),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),n.isValid()?(this.options.maxBounds=n,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(n){var r=this.options.minZoom;return this.options.minZoom=n,this._loaded&&r!==n&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(n):this},setMaxZoom:function(n){var r=this.options.maxZoom;return this.options.maxZoom=n,this._loaded&&r!==n&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(n):this},panInsideBounds:function(n,r){this._enforcingBounds=!0;var h=this.getCenter(),f=this._limitCenter(h,this._zoom,Q(n));return h.equals(f)||this.panTo(f,r),this._enforcingBounds=!1,this},panInside:function(n,r){r=r||{};var h=st(r.paddingTopLeft||r.padding||[0,0]),f=st(r.paddingBottomRight||r.padding||[0,0]),y=this.project(this.getCenter()),C=this.project(n),B=this.getPixelBounds(),K=It([B.min.add(h),B.max.subtract(f)]),nt=K.getSize();if(!K.contains(C)){this._enforcingBounds=!0;var mt=C.subtract(K.getCenter()),kt=K.extend(C).getSize().subtract(nt);y.x+=mt.x<0?-kt.x:kt.x,y.y+=mt.y<0?-kt.y:kt.y,this.panTo(this.unproject(y),r),this._enforcingBounds=!1}return this},invalidateSize:function(n){if(!this._loaded)return this;n=o({animate:!1,pan:!0},n===!0?{animate:!0}:n);var r=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var h=this.getSize(),f=r.divideBy(2).round(),y=h.divideBy(2).round(),C=f.subtract(y);return!C.x&&!C.y?this:(n.animate&&n.pan?this.panBy(C):(n.pan&&this._rawPanBy(C),this.fire("move"),n.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:r,newSize:h}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(n){if(n=this._locateOptions=o({timeout:1e4,watch:!1},n),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var r=l(this._handleGeolocationResponse,this),h=l(this._handleGeolocationError,this);return n.watch?this._locationWatchId=navigator.geolocation.watchPosition(r,h,n):navigator.geolocation.getCurrentPosition(r,h,n),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(n){if(this._container._leaflet_id){var r=n.code,h=n.message||(r===1?"permission denied":r===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:r,message:"Geolocation error: "+h+"."})}},_handleGeolocationResponse:function(n){if(this._container._leaflet_id){var r=n.coords.latitude,h=n.coords.longitude,f=new rt(r,h),y=f.toBounds(n.coords.accuracy*2),C=this._locateOptions;if(C.setView){var B=this.getBoundsZoom(y);this.setView(f,C.maxZoom?Math.min(B,C.maxZoom):B)}var K={latlng:f,bounds:y,timestamp:n.timestamp};for(var nt in n.coords)typeof n.coords[nt]=="number"&&(K[nt]=n.coords[nt]);this.fire("locationfound",K)}},addHandler:function(n,r){if(!r)return this;var h=this[n]=new r(this);return this._handlers.push(h),this.options[n]&&h.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),Tt(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(G(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var n;for(n in this._layers)this._layers[n].remove();for(n in this._panes)Tt(this._panes[n]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(n,r){var h="leaflet-pane"+(n?" leaflet-"+n.replace("Pane","")+"-pane":""),f=Wt("div",h,r||this._mapPane);return n&&(this._panes[n]=f),f},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var n=this.getPixelBounds(),r=this.unproject(n.getBottomLeft()),h=this.unproject(n.getTopRight());return new Dt(r,h)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(n,r,h){n=Q(n),h=st(h||[0,0]);var f=this.getZoom()||0,y=this.getMinZoom(),C=this.getMaxZoom(),B=n.getNorthWest(),K=n.getSouthEast(),nt=this.getSize().subtract(h),mt=It(this.project(K,f),this.project(B,f)).getSize(),kt=Yt.any3d?this.options.zoomSnap:1,te=nt.x/mt.x,ue=nt.y/mt.y,nn=r?Math.max(te,ue):Math.min(te,ue);return f=this.getScaleZoom(nn,f),kt&&(f=Math.round(f/(kt/100))*(kt/100),f=r?Math.ceil(f/kt)*kt:Math.floor(f/kt)*kt),Math.max(y,Math.min(C,f))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new Z(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(n,r){var h=this._getTopLeftPoint(n,r);return new gt(h,h.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(n){return this.options.crs.getProjectedBounds(n===void 0?this.getZoom():n)},getPane:function(n){return typeof n=="string"?this._panes[n]:n},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(n,r){var h=this.options.crs;return r=r===void 0?this._zoom:r,h.scale(n)/h.scale(r)},getScaleZoom:function(n,r){var h=this.options.crs;r=r===void 0?this._zoom:r;var f=h.zoom(n*h.scale(r));return isNaN(f)?1/0:f},project:function(n,r){return r=r===void 0?this._zoom:r,this.options.crs.latLngToPoint(pt(n),r)},unproject:function(n,r){return r=r===void 0?this._zoom:r,this.options.crs.pointToLatLng(st(n),r)},layerPointToLatLng:function(n){var r=st(n).add(this.getPixelOrigin());return this.unproject(r)},latLngToLayerPoint:function(n){var r=this.project(pt(n))._round();return r._subtract(this.getPixelOrigin())},wrapLatLng:function(n){return this.options.crs.wrapLatLng(pt(n))},wrapLatLngBounds:function(n){return this.options.crs.wrapLatLngBounds(Q(n))},distance:function(n,r){return this.options.crs.distance(pt(n),pt(r))},containerPointToLayerPoint:function(n){return st(n).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(n){return st(n).add(this._getMapPanePos())},containerPointToLatLng:function(n){var r=this.containerPointToLayerPoint(st(n));return this.layerPointToLatLng(r)},latLngToContainerPoint:function(n){return this.layerPointToContainerPoint(this.latLngToLayerPoint(pt(n)))},mouseEventToContainerPoint:function(n){return Rc(n,this._container)},mouseEventToLayerPoint:function(n){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(n))},mouseEventToLatLng:function(n){return this.layerPointToLatLng(this.mouseEventToLayerPoint(n))},_initContainer:function(n){var r=this._container=Me(n);if(r){if(r._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");oe(r,"scroll",this._onScroll,this),this._containerId=u(r)},_initLayout:function(){var n=this._container;this._fadeAnimated=this.options.fadeAnimation&&Yt.any3d,Kt(n,"leaflet-container"+(Yt.touch?" leaflet-touch":"")+(Yt.retina?" leaflet-retina":"")+(Yt.ielt9?" leaflet-oldie":"")+(Yt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var r=Ne(n,"position");r!=="absolute"&&r!=="relative"&&r!=="fixed"&&r!=="sticky"&&(n.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var n=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Le(this._mapPane,new Z(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(Kt(n.markerPane,"leaflet-zoom-hide"),Kt(n.shadowPane,"leaflet-zoom-hide"))},_resetView:function(n,r,h){Le(this._mapPane,new Z(0,0));var f=!this._loaded;this._loaded=!0,r=this._limitZoom(r),this.fire("viewprereset");var y=this._zoom!==r;this._moveStart(y,h)._move(n,r)._moveEnd(y),this.fire("viewreset"),f&&this.fire("load")},_moveStart:function(n,r){return n&&this.fire("zoomstart"),r||this.fire("movestart"),this},_move:function(n,r,h,f){r===void 0&&(r=this._zoom);var y=this._zoom!==r;return this._zoom=r,this._lastCenter=n,this._pixelOrigin=this._getNewPixelOrigin(n),f?h&&h.pinch&&this.fire("zoom",h):((y||h&&h.pinch)&&this.fire("zoom",h),this.fire("move",h)),this},_moveEnd:function(n){return n&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return G(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(n){Le(this._mapPane,this._getMapPanePos().subtract(n))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(n){this._targets={},this._targets[u(this._container)]=this;var r=n?Ae:oe;r(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&r(window,"resize",this._onResize,this),Yt.any3d&&this.options.transform3DLimit&&(n?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){G(this._resizeRequest),this._resizeRequest=z(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var n=this._getMapPanePos();Math.max(Math.abs(n.x),Math.abs(n.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(n,r){for(var h=[],f,y=r==="mouseout"||r==="mouseover",C=n.target||n.srcElement,B=!1;C;){if(f=this._targets[u(C)],f&&(r==="click"||r==="preclick")&&this._draggableMoved(f)){B=!0;break}if(f&&f.listens(r,!0)&&(y&&!ra(C,n)||(h.push(f),y))||C===this._container)break;C=C.parentNode}return!h.length&&!B&&!y&&this.listens(r,!0)&&(h=[this]),h},_isClickDisabled:function(n){for(;n&&n!==this._container;){if(n._leaflet_disable_click)return!0;n=n.parentNode}},_handleDOMEvent:function(n){var r=n.target||n.srcElement;if(!(!this._loaded||r._leaflet_disable_events||n.type==="click"&&this._isClickDisabled(r))){var h=n.type;h==="mousedown"&&ta(r),this._fireDOMEvent(n,h)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(n,r,h){if(n.type==="click"){var f=o({},n);f.type="preclick",this._fireDOMEvent(f,f.type,h)}var y=this._findEventTargets(n,r);if(h){for(var C=[],B=0;B<h.length;B++)h[B].listens(r,!0)&&C.push(h[B]);y=C.concat(y)}if(y.length){r==="contextmenu"&&Xe(n);var K=y[0],nt={originalEvent:n};if(n.type!=="keypress"&&n.type!=="keydown"&&n.type!=="keyup"){var mt=K.getLatLng&&(!K._radius||K._radius<=10);nt.containerPoint=mt?this.latLngToContainerPoint(K.getLatLng()):this.mouseEventToContainerPoint(n),nt.layerPoint=this.containerPointToLayerPoint(nt.containerPoint),nt.latlng=mt?K.getLatLng():this.layerPointToLatLng(nt.layerPoint)}for(B=0;B<y.length;B++)if(y[B].fire(r,nt,!0),nt.originalEvent._stopped||y[B].options.bubblingMouseEvents===!1&&S(this._mouseEvents,r)!==-1)return}},_draggableMoved:function(n){return n=n.dragging&&n.dragging.enabled()?n:this,n.dragging&&n.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var n=0,r=this._handlers.length;n<r;n++)this._handlers[n].disable()},whenReady:function(n,r){return this._loaded?n.call(r||this,{target:this}):this.on("load",n,r),this},_getMapPanePos:function(){return Ri(this._mapPane)||new Z(0,0)},_moved:function(){var n=this._getMapPanePos();return n&&!n.equals([0,0])},_getTopLeftPoint:function(n,r){var h=n&&r!==void 0?this._getNewPixelOrigin(n,r):this.getPixelOrigin();return h.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(n,r){var h=this.getSize()._divideBy(2);return this.project(n,r)._subtract(h)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(n,r,h){var f=this._getNewPixelOrigin(h,r);return this.project(n,r)._subtract(f)},_latLngBoundsToNewLayerBounds:function(n,r,h){var f=this._getNewPixelOrigin(h,r);return It([this.project(n.getSouthWest(),r)._subtract(f),this.project(n.getNorthWest(),r)._subtract(f),this.project(n.getSouthEast(),r)._subtract(f),this.project(n.getNorthEast(),r)._subtract(f)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(n){return this.latLngToLayerPoint(n).subtract(this._getCenterLayerPoint())},_limitCenter:function(n,r,h){if(!h)return n;var f=this.project(n,r),y=this.getSize().divideBy(2),C=new gt(f.subtract(y),f.add(y)),B=this._getBoundsOffset(C,h,r);return Math.abs(B.x)<=1&&Math.abs(B.y)<=1?n:this.unproject(f.add(B),r)},_limitOffset:function(n,r){if(!r)return n;var h=this.getPixelBounds(),f=new gt(h.min.add(n),h.max.add(n));return n.add(this._getBoundsOffset(f,r))},_getBoundsOffset:function(n,r,h){var f=It(this.project(r.getNorthEast(),h),this.project(r.getSouthWest(),h)),y=f.min.subtract(n.min),C=f.max.subtract(n.max),B=this._rebound(y.x,-C.x),K=this._rebound(y.y,-C.y);return new Z(B,K)},_rebound:function(n,r){return n+r>0?Math.round(n-r)/2:Math.max(0,Math.ceil(n))-Math.max(0,Math.floor(r))},_limitZoom:function(n){var r=this.getMinZoom(),h=this.getMaxZoom(),f=Yt.any3d?this.options.zoomSnap:1;return f&&(n=Math.round(n/f)*f),Math.max(r,Math.min(h,n))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){Ee(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(n,r){var h=this._getCenterOffset(n)._trunc();return(r&&r.animate)!==!0&&!this.getSize().contains(h)?!1:(this.panBy(h,r),!0)},_createAnimProxy:function(){var n=this._proxy=Wt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(n),this.on("zoomanim",function(r){var h=Zt,f=this._proxy.style[h];qe(this._proxy,this.project(r.center,r.zoom),this.getZoomScale(r.zoom,1)),f===this._proxy.style[h]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){Tt(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var n=this.getCenter(),r=this.getZoom();qe(this._proxy,this.project(n,r),this.getZoomScale(r,1))},_catchTransitionEnd:function(n){this._animatingZoom&&n.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(n,r,h){if(this._animatingZoom)return!0;if(h=h||{},!this._zoomAnimated||h.animate===!1||this._nothingToAnimate()||Math.abs(r-this._zoom)>this.options.zoomAnimationThreshold)return!1;var f=this.getZoomScale(r),y=this._getCenterOffset(n)._divideBy(1-1/f);return h.animate!==!0&&!this.getSize().contains(y)?!1:(z(function(){this._moveStart(!0,h.noMoveStart||!1)._animateZoom(n,r,!0)},this),!0)},_animateZoom:function(n,r,h,f){this._mapPane&&(h&&(this._animatingZoom=!0,this._animateToCenter=n,this._animateToZoom=r,Kt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:n,zoom:r,noUpdate:f}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&Ee(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Bd(n,r){return new me(n,r)}var En=F.extend({options:{position:"topright"},initialize:function(n){w(this,n)},getPosition:function(){return this.options.position},setPosition:function(n){var r=this._map;return r&&r.removeControl(this),this.options.position=n,r&&r.addControl(this),this},getContainer:function(){return this._container},addTo:function(n){this.remove(),this._map=n;var r=this._container=this.onAdd(n),h=this.getPosition(),f=n._controlCorners[h];return Kt(r,"leaflet-control"),h.indexOf("bottom")!==-1?f.insertBefore(r,f.firstChild):f.appendChild(r),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(Tt(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(n){this._map&&n&&n.screenX>0&&n.screenY>0&&this._map.getContainer().focus()}}),to=function(n){return new En(n)};me.include({addControl:function(n){return n.addTo(this),this},removeControl:function(n){return n.remove(),this},_initControlPos:function(){var n=this._controlCorners={},r="leaflet-",h=this._controlContainer=Wt("div",r+"control-container",this._container);function f(y,C){var B=r+y+" "+r+C;n[y+C]=Wt("div",B,h)}f("top","left"),f("top","right"),f("bottom","left"),f("bottom","right")},_clearControlPos:function(){for(var n in this._controlCorners)Tt(this._controlCorners[n]);Tt(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Nc=En.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(n,r,h,f){return h<f?-1:f<h?1:0}},initialize:function(n,r,h){w(this,h),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var f in n)this._addLayer(n[f],f);for(f in r)this._addLayer(r[f],f,!0)},onAdd:function(n){this._initLayout(),this._update(),this._map=n,n.on("zoomend",this._checkDisabledLayers,this);for(var r=0;r<this._layers.length;r++)this._layers[r].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(n){return En.prototype.addTo.call(this,n),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var n=0;n<this._layers.length;n++)this._layers[n].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(n,r){return this._addLayer(n,r),this._map?this._update():this},addOverlay:function(n,r){return this._addLayer(n,r,!0),this._map?this._update():this},removeLayer:function(n){n.off("add remove",this._onLayerChange,this);var r=this._getLayer(u(n));return r&&this._layers.splice(this._layers.indexOf(r),1),this._map?this._update():this},expand:function(){Kt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var n=this._map.getSize().y-(this._container.offsetTop+50);return n<this._section.clientHeight?(Kt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=n+"px"):Ee(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return Ee(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var n="leaflet-control-layers",r=this._container=Wt("div",n),h=this.options.collapsed;r.setAttribute("aria-haspopup",!0),Qs(r),oa(r);var f=this._section=Wt("section",n+"-list");h&&(this._map.on("click",this.collapse,this),oe(r,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var y=this._layersLink=Wt("a",n+"-toggle",r);y.href="#",y.title="Layers",y.setAttribute("role","button"),oe(y,{keydown:function(C){C.keyCode===13&&this._expandSafely()},click:function(C){Xe(C),this._expandSafely()}},this),h||this.expand(),this._baseLayersList=Wt("div",n+"-base",f),this._separator=Wt("div",n+"-separator",f),this._overlaysList=Wt("div",n+"-overlays",f),r.appendChild(f)},_getLayer:function(n){for(var r=0;r<this._layers.length;r++)if(this._layers[r]&&u(this._layers[r].layer)===n)return this._layers[r]},_addLayer:function(n,r,h){this._map&&n.on("add remove",this._onLayerChange,this),this._layers.push({layer:n,name:r,overlay:h}),this.options.sortLayers&&this._layers.sort(l(function(f,y){return this.options.sortFunction(f.layer,y.layer,f.name,y.name)},this)),this.options.autoZIndex&&n.setZIndex&&(this._lastZIndex++,n.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;cn(this._baseLayersList),cn(this._overlaysList),this._layerControlInputs=[];var n,r,h,f,y=0;for(h=0;h<this._layers.length;h++)f=this._layers[h],this._addItem(f),r=r||f.overlay,n=n||!f.overlay,y+=f.overlay?0:1;return this.options.hideSingleBase&&(n=n&&y>1,this._baseLayersList.style.display=n?"":"none"),this._separator.style.display=r&&n?"":"none",this},_onLayerChange:function(n){this._handlingClick||this._update();var r=this._getLayer(u(n.target)),h=r.overlay?n.type==="add"?"overlayadd":"overlayremove":n.type==="add"?"baselayerchange":null;h&&this._map.fire(h,r)},_createRadioElement:function(n,r){var h='<input type="radio" class="leaflet-control-layers-selector" name="'+n+'"'+(r?' checked="checked"':"")+"/>",f=document.createElement("div");return f.innerHTML=h,f.firstChild},_addItem:function(n){var r=document.createElement("label"),h=this._map.hasLayer(n.layer),f;n.overlay?(f=document.createElement("input"),f.type="checkbox",f.className="leaflet-control-layers-selector",f.defaultChecked=h):f=this._createRadioElement("leaflet-base-layers_"+u(this),h),this._layerControlInputs.push(f),f.layerId=u(n.layer),oe(f,"click",this._onInputClick,this);var y=document.createElement("span");y.innerHTML=" "+n.name;var C=document.createElement("span");r.appendChild(C),C.appendChild(f),C.appendChild(y);var B=n.overlay?this._overlaysList:this._baseLayersList;return B.appendChild(r),this._checkDisabledLayers(),r},_onInputClick:function(){if(!this._preventClick){var n=this._layerControlInputs,r,h,f=[],y=[];this._handlingClick=!0;for(var C=n.length-1;C>=0;C--)r=n[C],h=this._getLayer(r.layerId).layer,r.checked?f.push(h):r.checked||y.push(h);for(C=0;C<y.length;C++)this._map.hasLayer(y[C])&&this._map.removeLayer(y[C]);for(C=0;C<f.length;C++)this._map.hasLayer(f[C])||this._map.addLayer(f[C]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var n=this._layerControlInputs,r,h,f=this._map.getZoom(),y=n.length-1;y>=0;y--)r=n[y],h=this._getLayer(r.layerId).layer,r.disabled=h.options.minZoom!==void 0&&f<h.options.minZoom||h.options.maxZoom!==void 0&&f>h.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var n=this._section;this._preventClick=!0,oe(n,"click",Xe),this.expand();var r=this;setTimeout(function(){Ae(n,"click",Xe),r._preventClick=!1})}}),Hd=function(n,r,h){return new Nc(n,r,h)},aa=En.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(n){var r="leaflet-control-zoom",h=Wt("div",r+" leaflet-bar"),f=this.options;return this._zoomInButton=this._createButton(f.zoomInText,f.zoomInTitle,r+"-in",h,this._zoomIn),this._zoomOutButton=this._createButton(f.zoomOutText,f.zoomOutTitle,r+"-out",h,this._zoomOut),this._updateDisabled(),n.on("zoomend zoomlevelschange",this._updateDisabled,this),h},onRemove:function(n){n.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(n){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(n.shiftKey?3:1))},_zoomOut:function(n){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(n.shiftKey?3:1))},_createButton:function(n,r,h,f,y){var C=Wt("a",h,f);return C.innerHTML=n,C.href="#",C.title=r,C.setAttribute("role","button"),C.setAttribute("aria-label",r),Qs(C),oe(C,"click",Di),oe(C,"click",y,this),oe(C,"click",this._refocusOnMap,this),C},_updateDisabled:function(){var n=this._map,r="leaflet-disabled";Ee(this._zoomInButton,r),Ee(this._zoomOutButton,r),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||n._zoom===n.getMinZoom())&&(Kt(this._zoomOutButton,r),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||n._zoom===n.getMaxZoom())&&(Kt(this._zoomInButton,r),this._zoomInButton.setAttribute("aria-disabled","true"))}});me.mergeOptions({zoomControl:!0}),me.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new aa,this.addControl(this.zoomControl))});var Vd=function(n){return new aa(n)},Uc=En.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(n){var r="leaflet-control-scale",h=Wt("div",r),f=this.options;return this._addScales(f,r+"-line",h),n.on(f.updateWhenIdle?"moveend":"move",this._update,this),n.whenReady(this._update,this),h},onRemove:function(n){n.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(n,r,h){n.metric&&(this._mScale=Wt("div",r,h)),n.imperial&&(this._iScale=Wt("div",r,h))},_update:function(){var n=this._map,r=n.getSize().y/2,h=n.distance(n.containerPointToLatLng([0,r]),n.containerPointToLatLng([this.options.maxWidth,r]));this._updateScales(h)},_updateScales:function(n){this.options.metric&&n&&this._updateMetric(n),this.options.imperial&&n&&this._updateImperial(n)},_updateMetric:function(n){var r=this._getRoundNum(n),h=r<1e3?r+" m":r/1e3+" km";this._updateScale(this._mScale,h,r/n)},_updateImperial:function(n){var r=n*3.2808399,h,f,y;r>5280?(h=r/5280,f=this._getRoundNum(h),this._updateScale(this._iScale,f+" mi",f/h)):(y=this._getRoundNum(r),this._updateScale(this._iScale,y+" ft",y/r))},_updateScale:function(n,r,h){n.style.width=Math.round(this.options.maxWidth*h)+"px",n.innerHTML=r},_getRoundNum:function(n){var r=Math.pow(10,(Math.floor(n)+"").length-1),h=n/r;return h=h>=10?10:h>=5?5:h>=3?3:h>=2?2:1,r*h}}),Gd=function(n){return new Uc(n)},Wd='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',la=En.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Yt.inlineSvg?Wd+" ":"")+"Leaflet</a>"},initialize:function(n){w(this,n),this._attributions={}},onAdd:function(n){n.attributionControl=this,this._container=Wt("div","leaflet-control-attribution"),Qs(this._container);for(var r in n._layers)n._layers[r].getAttribution&&this.addAttribution(n._layers[r].getAttribution());return this._update(),n.on("layeradd",this._addAttribution,this),this._container},onRemove:function(n){n.off("layeradd",this._addAttribution,this)},_addAttribution:function(n){n.layer.getAttribution&&(this.addAttribution(n.layer.getAttribution()),n.layer.once("remove",function(){this.removeAttribution(n.layer.getAttribution())},this))},setPrefix:function(n){return this.options.prefix=n,this._update(),this},addAttribution:function(n){return n?(this._attributions[n]||(this._attributions[n]=0),this._attributions[n]++,this._update(),this):this},removeAttribution:function(n){return n?(this._attributions[n]&&(this._attributions[n]--,this._update()),this):this},_update:function(){if(this._map){var n=[];for(var r in this._attributions)this._attributions[r]&&n.push(r);var h=[];this.options.prefix&&h.push(this.options.prefix),n.length&&h.push(n.join(", ")),this._container.innerHTML=h.join(' <span aria-hidden="true">|</span> ')}}});me.mergeOptions({attributionControl:!0}),me.addInitHook(function(){this.options.attributionControl&&new la().addTo(this)});var Zd=function(n){return new la(n)};En.Layers=Nc,En.Zoom=aa,En.Scale=Uc,En.Attribution=la,to.layers=Hd,to.zoom=Vd,to.scale=Gd,to.attribution=Zd;var zn=F.extend({initialize:function(n){this._map=n},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});zn.addTo=function(n,r){return n.addHandler(r,this),this};var Xd={Events:Y},Oc=Yt.touch?"touchstart mousedown":"mousedown",fi=ct.extend({options:{clickTolerance:3},initialize:function(n,r,h,f){w(this,f),this._element=n,this._dragStartTarget=r||n,this._preventOutline=h},enable:function(){this._enabled||(oe(this._dragStartTarget,Oc,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(fi._dragging===this&&this.finishDrag(!0),Ae(this._dragStartTarget,Oc,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(n){if(this._enabled&&(this._moved=!1,!Un(this._element,"leaflet-zoom-anim"))){if(n.touches&&n.touches.length!==1){fi._dragging===this&&this.finishDrag();return}if(!(fi._dragging||n.shiftKey||n.which!==1&&n.button!==1&&!n.touches)&&(fi._dragging=this,this._preventOutline&&ta(this._element),jr(),Ks(),!this._moving)){this.fire("down");var r=n.touches?n.touches[0]:n,h=Cc(this._element);this._startPoint=new Z(r.clientX,r.clientY),this._startPos=Ri(this._element),this._parentScale=ea(h);var f=n.type==="mousedown";oe(document,f?"mousemove":"touchmove",this._onMove,this),oe(document,f?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(n){if(this._enabled){if(n.touches&&n.touches.length>1){this._moved=!0;return}var r=n.touches&&n.touches.length===1?n.touches[0]:n,h=new Z(r.clientX,r.clientY)._subtract(this._startPoint);!h.x&&!h.y||Math.abs(h.x)+Math.abs(h.y)<this.options.clickTolerance||(h.x/=this._parentScale.x,h.y/=this._parentScale.y,Xe(n),this._moved||(this.fire("dragstart"),this._moved=!0,Kt(document.body,"leaflet-dragging"),this._lastTarget=n.target||n.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),Kt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(h),this._moving=!0,this._lastEvent=n,this._updatePosition())}},_updatePosition:function(){var n={originalEvent:this._lastEvent};this.fire("predrag",n),Le(this._element,this._newPos),this.fire("drag",n)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(n){Ee(document.body,"leaflet-dragging"),this._lastTarget&&(Ee(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),Ae(document,"mousemove touchmove",this._onMove,this),Ae(document,"mouseup touchend touchcancel",this._onUp,this),Jr(),js();var r=this._moved&&this._moving;this._moving=!1,fi._dragging=!1,r&&this.fire("dragend",{noInertia:n,distance:this._newPos.distanceTo(this._startPos)})}});function zc(n,r,h){var f,y=[1,4,2,8],C,B,K,nt,mt,kt,te,ue;for(C=0,kt=n.length;C<kt;C++)n[C]._code=Ni(n[C],r);for(K=0;K<4;K++){for(te=y[K],f=[],C=0,kt=n.length,B=kt-1;C<kt;B=C++)nt=n[C],mt=n[B],nt._code&te?mt._code&te||(ue=ko(mt,nt,te,r,h),ue._code=Ni(ue,r),f.push(ue)):(mt._code&te&&(ue=ko(mt,nt,te,r,h),ue._code=Ni(ue,r),f.push(ue)),f.push(nt));n=f}return n}function kc(n,r){var h,f,y,C,B,K,nt,mt,kt;if(!n||n.length===0)throw new Error("latlngs not passed");gn(n)||(console.warn("latlngs are not flat! Only the first ring will be used"),n=n[0]);var te=pt([0,0]),ue=Q(n),nn=ue.getNorthWest().distanceTo(ue.getSouthWest())*ue.getNorthEast().distanceTo(ue.getNorthWest());nn<1700&&(te=ca(n));var Ve=n.length,vn=[];for(h=0;h<Ve;h++){var un=pt(n[h]);vn.push(r.project(pt([un.lat-te.lat,un.lng-te.lng])))}for(K=nt=mt=0,h=0,f=Ve-1;h<Ve;f=h++)y=vn[h],C=vn[f],B=y.y*C.x-C.y*y.x,nt+=(y.x+C.x)*B,mt+=(y.y+C.y)*B,K+=B*3;K===0?kt=vn[0]:kt=[nt/K,mt/K];var ls=r.unproject(st(kt));return pt([ls.lat+te.lat,ls.lng+te.lng])}function ca(n){for(var r=0,h=0,f=0,y=0;y<n.length;y++){var C=pt(n[y]);r+=C.lat,h+=C.lng,f++}return pt([r/f,h/f])}var qd={__proto__:null,clipPolygon:zc,polygonCenter:kc,centroid:ca};function Fc(n,r){if(!r||!n.length)return n.slice();var h=r*r;return n=Kd(n,h),n=$d(n,h),n}function Bc(n,r,h){return Math.sqrt(eo(n,r,h,!0))}function Yd(n,r,h){return eo(n,r,h)}function $d(n,r){var h=n.length,f=typeof Uint8Array<"u"?Uint8Array:Array,y=new f(h);y[0]=y[h-1]=1,ha(n,y,r,0,h-1);var C,B=[];for(C=0;C<h;C++)y[C]&&B.push(n[C]);return B}function ha(n,r,h,f,y){var C=0,B,K,nt;for(K=f+1;K<=y-1;K++)nt=eo(n[K],n[f],n[y],!0),nt>C&&(B=K,C=nt);C>h&&(r[B]=1,ha(n,r,h,f,B),ha(n,r,h,B,y))}function Kd(n,r){for(var h=[n[0]],f=1,y=0,C=n.length;f<C;f++)jd(n[f],n[y])>r&&(h.push(n[f]),y=f);return y<C-1&&h.push(n[C-1]),h}var Hc;function Vc(n,r,h,f,y){var C=f?Hc:Ni(n,h),B=Ni(r,h),K,nt,mt;for(Hc=B;;){if(!(C|B))return[n,r];if(C&B)return!1;K=C||B,nt=ko(n,r,K,h,y),mt=Ni(nt,h),K===C?(n=nt,C=mt):(r=nt,B=mt)}}function ko(n,r,h,f,y){var C=r.x-n.x,B=r.y-n.y,K=f.min,nt=f.max,mt,kt;return h&8?(mt=n.x+C*(nt.y-n.y)/B,kt=nt.y):h&4?(mt=n.x+C*(K.y-n.y)/B,kt=K.y):h&2?(mt=nt.x,kt=n.y+B*(nt.x-n.x)/C):h&1&&(mt=K.x,kt=n.y+B*(K.x-n.x)/C),new Z(mt,kt,y)}function Ni(n,r){var h=0;return n.x<r.min.x?h|=1:n.x>r.max.x&&(h|=2),n.y<r.min.y?h|=4:n.y>r.max.y&&(h|=8),h}function jd(n,r){var h=r.x-n.x,f=r.y-n.y;return h*h+f*f}function eo(n,r,h,f){var y=r.x,C=r.y,B=h.x-y,K=h.y-C,nt=B*B+K*K,mt;return nt>0&&(mt=((n.x-y)*B+(n.y-C)*K)/nt,mt>1?(y=h.x,C=h.y):mt>0&&(y+=B*mt,C+=K*mt)),B=n.x-y,K=n.y-C,f?B*B+K*K:new Z(y,C)}function gn(n){return!E(n[0])||typeof n[0][0]!="object"&&typeof n[0][0]<"u"}function Gc(n){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),gn(n)}function Wc(n,r){var h,f,y,C,B,K,nt,mt;if(!n||n.length===0)throw new Error("latlngs not passed");gn(n)||(console.warn("latlngs are not flat! Only the first ring will be used"),n=n[0]);var kt=pt([0,0]),te=Q(n),ue=te.getNorthWest().distanceTo(te.getSouthWest())*te.getNorthEast().distanceTo(te.getNorthWest());ue<1700&&(kt=ca(n));var nn=n.length,Ve=[];for(h=0;h<nn;h++){var vn=pt(n[h]);Ve.push(r.project(pt([vn.lat-kt.lat,vn.lng-kt.lng])))}for(h=0,f=0;h<nn-1;h++)f+=Ve[h].distanceTo(Ve[h+1])/2;if(f===0)mt=Ve[0];else for(h=0,C=0;h<nn-1;h++)if(B=Ve[h],K=Ve[h+1],y=B.distanceTo(K),C+=y,C>f){nt=(C-f)/y,mt=[K.x-nt*(K.x-B.x),K.y-nt*(K.y-B.y)];break}var un=r.unproject(st(mt));return pt([un.lat+kt.lat,un.lng+kt.lng])}var Jd={__proto__:null,simplify:Fc,pointToSegmentDistance:Bc,closestPointOnSegment:Yd,clipSegment:Vc,_getEdgeIntersection:ko,_getBitCode:Ni,_sqClosestPointOnSegment:eo,isFlat:gn,_flat:Gc,polylineCenter:Wc},ua={project:function(n){return new Z(n.lng,n.lat)},unproject:function(n){return new rt(n.y,n.x)},bounds:new gt([-180,-90],[180,90])},da={R:6378137,R_MINOR:6356752314245179e-9,bounds:new gt([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(n){var r=Math.PI/180,h=this.R,f=n.lat*r,y=this.R_MINOR/h,C=Math.sqrt(1-y*y),B=C*Math.sin(f),K=Math.tan(Math.PI/4-f/2)/Math.pow((1-B)/(1+B),C/2);return f=-h*Math.log(Math.max(K,1e-10)),new Z(n.lng*r*h,f)},unproject:function(n){for(var r=180/Math.PI,h=this.R,f=this.R_MINOR/h,y=Math.sqrt(1-f*f),C=Math.exp(-n.y/h),B=Math.PI/2-2*Math.atan(C),K=0,nt=.1,mt;K<15&&Math.abs(nt)>1e-7;K++)mt=y*Math.sin(B),mt=Math.pow((1-mt)/(1+mt),y/2),nt=Math.PI/2-2*Math.atan(C*mt)-B,B+=nt;return new rt(B*r,n.x*r/h)}},Qd={__proto__:null,LonLat:ua,Mercator:da,SphericalMercator:lt},tf=o({},Bt,{code:"EPSG:3395",projection:da,transformation:(function(){var n=.5/(Math.PI*da.R);return J(n,.5,-n,.5)})()}),Zc=o({},Bt,{code:"EPSG:4326",projection:ua,transformation:J(1/180,1,-1/180,.5)}),ef=o({},vt,{projection:ua,transformation:J(1,0,-1,0),scale:function(n){return Math.pow(2,n)},zoom:function(n){return Math.log(n)/Math.LN2},distance:function(n,r){var h=r.lng-n.lng,f=r.lat-n.lat;return Math.sqrt(h*h+f*f)},infinite:!0});vt.Earth=Bt,vt.EPSG3395=tf,vt.EPSG3857=ut,vt.EPSG900913=k,vt.EPSG4326=Zc,vt.Simple=ef;var bn=ct.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(n){return n.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(n){return n&&n.removeLayer(this),this},getPane:function(n){return this._map.getPane(n?this.options[n]||n:this.options.pane)},addInteractiveTarget:function(n){return this._map._targets[u(n)]=this,this},removeInteractiveTarget:function(n){return delete this._map._targets[u(n)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(n){var r=n.target;if(r.hasLayer(this)){if(this._map=r,this._zoomAnimated=r._zoomAnimated,this.getEvents){var h=this.getEvents();r.on(h,this),this.once("remove",function(){r.off(h,this)},this)}this.onAdd(r),this.fire("add"),r.fire("layeradd",{layer:this})}}});me.include({addLayer:function(n){if(!n._layerAdd)throw new Error("The provided object is not a Layer.");var r=u(n);return this._layers[r]?this:(this._layers[r]=n,n._mapToAdd=this,n.beforeAdd&&n.beforeAdd(this),this.whenReady(n._layerAdd,n),this)},removeLayer:function(n){var r=u(n);return this._layers[r]?(this._loaded&&n.onRemove(this),delete this._layers[r],this._loaded&&(this.fire("layerremove",{layer:n}),n.fire("remove")),n._map=n._mapToAdd=null,this):this},hasLayer:function(n){return u(n)in this._layers},eachLayer:function(n,r){for(var h in this._layers)n.call(r,this._layers[h]);return this},_addLayers:function(n){n=n?E(n)?n:[n]:[];for(var r=0,h=n.length;r<h;r++)this.addLayer(n[r])},_addZoomLimit:function(n){(!isNaN(n.options.maxZoom)||!isNaN(n.options.minZoom))&&(this._zoomBoundLayers[u(n)]=n,this._updateZoomLevels())},_removeZoomLimit:function(n){var r=u(n);this._zoomBoundLayers[r]&&(delete this._zoomBoundLayers[r],this._updateZoomLevels())},_updateZoomLevels:function(){var n=1/0,r=-1/0,h=this._getZoomSpan();for(var f in this._zoomBoundLayers){var y=this._zoomBoundLayers[f].options;n=y.minZoom===void 0?n:Math.min(n,y.minZoom),r=y.maxZoom===void 0?r:Math.max(r,y.maxZoom)}this._layersMaxZoom=r===-1/0?void 0:r,this._layersMinZoom=n===1/0?void 0:n,h!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var is=bn.extend({initialize:function(n,r){w(this,r),this._layers={};var h,f;if(n)for(h=0,f=n.length;h<f;h++)this.addLayer(n[h])},addLayer:function(n){var r=this.getLayerId(n);return this._layers[r]=n,this._map&&this._map.addLayer(n),this},removeLayer:function(n){var r=n in this._layers?n:this.getLayerId(n);return this._map&&this._layers[r]&&this._map.removeLayer(this._layers[r]),delete this._layers[r],this},hasLayer:function(n){var r=typeof n=="number"?n:this.getLayerId(n);return r in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(n){var r=Array.prototype.slice.call(arguments,1),h,f;for(h in this._layers)f=this._layers[h],f[n]&&f[n].apply(f,r);return this},onAdd:function(n){this.eachLayer(n.addLayer,n)},onRemove:function(n){this.eachLayer(n.removeLayer,n)},eachLayer:function(n,r){for(var h in this._layers)n.call(r,this._layers[h]);return this},getLayer:function(n){return this._layers[n]},getLayers:function(){var n=[];return this.eachLayer(n.push,n),n},setZIndex:function(n){return this.invoke("setZIndex",n)},getLayerId:function(n){return u(n)}}),nf=function(n,r){return new is(n,r)},qn=is.extend({addLayer:function(n){return this.hasLayer(n)?this:(n.addEventParent(this),is.prototype.addLayer.call(this,n),this.fire("layeradd",{layer:n}))},removeLayer:function(n){return this.hasLayer(n)?(n in this._layers&&(n=this._layers[n]),n.removeEventParent(this),is.prototype.removeLayer.call(this,n),this.fire("layerremove",{layer:n})):this},setStyle:function(n){return this.invoke("setStyle",n)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var n=new Dt;for(var r in this._layers){var h=this._layers[r];n.extend(h.getBounds?h.getBounds():h.getLatLng())}return n}}),sf=function(n,r){return new qn(n,r)},ss=F.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(n){w(this,n)},createIcon:function(n){return this._createIcon("icon",n)},createShadow:function(n){return this._createIcon("shadow",n)},_createIcon:function(n,r){var h=this._getIconUrl(n);if(!h){if(n==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var f=this._createImg(h,r&&r.tagName==="IMG"?r:null);return this._setIconStyles(f,n),(this.options.crossOrigin||this.options.crossOrigin==="")&&(f.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),f},_setIconStyles:function(n,r){var h=this.options,f=h[r+"Size"];typeof f=="number"&&(f=[f,f]);var y=st(f),C=st(r==="shadow"&&h.shadowAnchor||h.iconAnchor||y&&y.divideBy(2,!0));n.className="leaflet-marker-"+r+" "+(h.className||""),C&&(n.style.marginLeft=-C.x+"px",n.style.marginTop=-C.y+"px"),y&&(n.style.width=y.x+"px",n.style.height=y.y+"px")},_createImg:function(n,r){return r=r||document.createElement("img"),r.src=n,r},_getIconUrl:function(n){return Yt.retina&&this.options[n+"RetinaUrl"]||this.options[n+"Url"]}});function of(n){return new ss(n)}var no=ss.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(n){return typeof no.imagePath!="string"&&(no.imagePath=this._detectIconPath()),(this.options.imagePath||no.imagePath)+ss.prototype._getIconUrl.call(this,n)},_stripUrl:function(n){var r=function(h,f,y){var C=f.exec(h);return C&&C[y]};return n=r(n,/^url\((['"])?(.+)\1\)$/,2),n&&r(n,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var n=Wt("div","leaflet-default-icon-path",document.body),r=Ne(n,"background-image")||Ne(n,"backgroundImage");if(document.body.removeChild(n),r=this._stripUrl(r),r)return r;var h=document.querySelector('link[href$="leaflet.css"]');return h?h.href.substring(0,h.href.length-11-1):""}}),Xc=zn.extend({initialize:function(n){this._marker=n},addHooks:function(){var n=this._marker._icon;this._draggable||(this._draggable=new fi(n,n,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),Kt(n,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&Ee(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(n){var r=this._marker,h=r._map,f=this._marker.options.autoPanSpeed,y=this._marker.options.autoPanPadding,C=Ri(r._icon),B=h.getPixelBounds(),K=h.getPixelOrigin(),nt=It(B.min._subtract(K).add(y),B.max._subtract(K).subtract(y));if(!nt.contains(C)){var mt=st((Math.max(nt.max.x,C.x)-nt.max.x)/(B.max.x-nt.max.x)-(Math.min(nt.min.x,C.x)-nt.min.x)/(B.min.x-nt.min.x),(Math.max(nt.max.y,C.y)-nt.max.y)/(B.max.y-nt.max.y)-(Math.min(nt.min.y,C.y)-nt.min.y)/(B.min.y-nt.min.y)).multiplyBy(f);h.panBy(mt,{animate:!1}),this._draggable._newPos._add(mt),this._draggable._startPos._add(mt),Le(r._icon,this._draggable._newPos),this._onDrag(n),this._panRequest=z(this._adjustPan.bind(this,n))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(n){this._marker.options.autoPan&&(G(this._panRequest),this._panRequest=z(this._adjustPan.bind(this,n)))},_onDrag:function(n){var r=this._marker,h=r._shadow,f=Ri(r._icon),y=r._map.layerPointToLatLng(f);h&&Le(h,f),r._latlng=y,n.latlng=y,n.oldLatLng=this._oldLatLng,r.fire("move",n).fire("drag",n)},_onDragEnd:function(n){G(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",n)}}),Fo=bn.extend({options:{icon:new no,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(n,r){w(this,r),this._latlng=pt(n)},onAdd:function(n){this._zoomAnimated=this._zoomAnimated&&n.options.markerZoomAnimation,this._zoomAnimated&&n.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(n){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&n.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(n){var r=this._latlng;return this._latlng=pt(n),this.update(),this.fire("move",{oldLatLng:r,latlng:this._latlng})},setZIndexOffset:function(n){return this.options.zIndexOffset=n,this.update()},getIcon:function(){return this.options.icon},setIcon:function(n){return this.options.icon=n,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var n=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(n)}return this},_initIcon:function(){var n=this.options,r="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),h=n.icon.createIcon(this._icon),f=!1;h!==this._icon&&(this._icon&&this._removeIcon(),f=!0,n.title&&(h.title=n.title),h.tagName==="IMG"&&(h.alt=n.alt||"")),Kt(h,r),n.keyboard&&(h.tabIndex="0",h.setAttribute("role","button")),this._icon=h,n.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&oe(h,"focus",this._panOnFocus,this);var y=n.icon.createShadow(this._shadow),C=!1;y!==this._shadow&&(this._removeShadow(),C=!0),y&&(Kt(y,r),y.alt=""),this._shadow=y,n.opacity<1&&this._updateOpacity(),f&&this.getPane().appendChild(this._icon),this._initInteraction(),y&&C&&this.getPane(n.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Ae(this._icon,"focus",this._panOnFocus,this),Tt(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&Tt(this._shadow),this._shadow=null},_setPos:function(n){this._icon&&Le(this._icon,n),this._shadow&&Le(this._shadow,n),this._zIndex=n.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(n){this._icon&&(this._icon.style.zIndex=this._zIndex+n)},_animateZoom:function(n){var r=this._map._latLngToNewLayerPoint(this._latlng,n.zoom,n.center).round();this._setPos(r)},_initInteraction:function(){if(this.options.interactive&&(Kt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Xc)){var n=this.options.draggable;this.dragging&&(n=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Xc(this),n&&this.dragging.enable()}},setOpacity:function(n){return this.options.opacity=n,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var n=this.options.opacity;this._icon&&He(this._icon,n),this._shadow&&He(this._shadow,n)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var n=this._map;if(n){var r=this.options.icon.options,h=r.iconSize?st(r.iconSize):st(0,0),f=r.iconAnchor?st(r.iconAnchor):st(0,0);n.panInside(this._latlng,{paddingTopLeft:f,paddingBottomRight:h.subtract(f)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function rf(n,r){return new Fo(n,r)}var pi=bn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(n){this._renderer=n.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(n){return w(this,n),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&n&&Object.prototype.hasOwnProperty.call(n,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Bo=pi.extend({options:{fill:!0,radius:10},initialize:function(n,r){w(this,r),this._latlng=pt(n),this._radius=this.options.radius},setLatLng:function(n){var r=this._latlng;return this._latlng=pt(n),this.redraw(),this.fire("move",{oldLatLng:r,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(n){return this.options.radius=this._radius=n,this.redraw()},getRadius:function(){return this._radius},setStyle:function(n){var r=n&&n.radius||this._radius;return pi.prototype.setStyle.call(this,n),this.setRadius(r),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var n=this._radius,r=this._radiusY||n,h=this._clickTolerance(),f=[n+h,r+h];this._pxBounds=new gt(this._point.subtract(f),this._point.add(f))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(n){return n.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function af(n,r){return new Bo(n,r)}var fa=Bo.extend({initialize:function(n,r,h){if(typeof r=="number"&&(r=o({},h,{radius:r})),w(this,r),this._latlng=pt(n),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(n){return this._mRadius=n,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var n=[this._radius,this._radiusY||this._radius];return new Dt(this._map.layerPointToLatLng(this._point.subtract(n)),this._map.layerPointToLatLng(this._point.add(n)))},setStyle:pi.prototype.setStyle,_project:function(){var n=this._latlng.lng,r=this._latlng.lat,h=this._map,f=h.options.crs;if(f.distance===Bt.distance){var y=Math.PI/180,C=this._mRadius/Bt.R/y,B=h.project([r+C,n]),K=h.project([r-C,n]),nt=B.add(K).divideBy(2),mt=h.unproject(nt).lat,kt=Math.acos((Math.cos(C*y)-Math.sin(r*y)*Math.sin(mt*y))/(Math.cos(r*y)*Math.cos(mt*y)))/y;(isNaN(kt)||kt===0)&&(kt=C/Math.cos(Math.PI/180*r)),this._point=nt.subtract(h.getPixelOrigin()),this._radius=isNaN(kt)?0:nt.x-h.project([mt,n-kt]).x,this._radiusY=nt.y-B.y}else{var te=f.unproject(f.project(this._latlng).subtract([this._mRadius,0]));this._point=h.latLngToLayerPoint(this._latlng),this._radius=this._point.x-h.latLngToLayerPoint(te).x}this._updateBounds()}});function lf(n,r,h){return new fa(n,r,h)}var Yn=pi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(n,r){w(this,r),this._setLatLngs(n)},getLatLngs:function(){return this._latlngs},setLatLngs:function(n){return this._setLatLngs(n),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(n){for(var r=1/0,h=null,f=eo,y,C,B=0,K=this._parts.length;B<K;B++)for(var nt=this._parts[B],mt=1,kt=nt.length;mt<kt;mt++){y=nt[mt-1],C=nt[mt];var te=f(n,y,C,!0);te<r&&(r=te,h=f(n,y,C))}return h&&(h.distance=Math.sqrt(r)),h},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Wc(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(n,r){return r=r||this._defaultShape(),n=pt(n),r.push(n),this._bounds.extend(n),this.redraw()},_setLatLngs:function(n){this._bounds=new Dt,this._latlngs=this._convertLatLngs(n)},_defaultShape:function(){return gn(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(n){for(var r=[],h=gn(n),f=0,y=n.length;f<y;f++)h?(r[f]=pt(n[f]),this._bounds.extend(r[f])):r[f]=this._convertLatLngs(n[f]);return r},_project:function(){var n=new gt;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,n),this._bounds.isValid()&&n.isValid()&&(this._rawPxBounds=n,this._updateBounds())},_updateBounds:function(){var n=this._clickTolerance(),r=new Z(n,n);this._rawPxBounds&&(this._pxBounds=new gt([this._rawPxBounds.min.subtract(r),this._rawPxBounds.max.add(r)]))},_projectLatlngs:function(n,r,h){var f=n[0]instanceof rt,y=n.length,C,B;if(f){for(B=[],C=0;C<y;C++)B[C]=this._map.latLngToLayerPoint(n[C]),h.extend(B[C]);r.push(B)}else for(C=0;C<y;C++)this._projectLatlngs(n[C],r,h)},_clipPoints:function(){var n=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(n))){if(this.options.noClip){this._parts=this._rings;return}var r=this._parts,h,f,y,C,B,K,nt;for(h=0,y=0,C=this._rings.length;h<C;h++)for(nt=this._rings[h],f=0,B=nt.length;f<B-1;f++)K=Vc(nt[f],nt[f+1],n,f,!0),K&&(r[y]=r[y]||[],r[y].push(K[0]),(K[1]!==nt[f+1]||f===B-2)&&(r[y].push(K[1]),y++))}},_simplifyPoints:function(){for(var n=this._parts,r=this.options.smoothFactor,h=0,f=n.length;h<f;h++)n[h]=Fc(n[h],r)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(n,r){var h,f,y,C,B,K,nt=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(n))return!1;for(h=0,C=this._parts.length;h<C;h++)for(K=this._parts[h],f=0,B=K.length,y=B-1;f<B;y=f++)if(!(!r&&f===0)&&Bc(n,K[y],K[f])<=nt)return!0;return!1}});function cf(n,r){return new Yn(n,r)}Yn._flat=Gc;var os=Yn.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return kc(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(n){var r=Yn.prototype._convertLatLngs.call(this,n),h=r.length;return h>=2&&r[0]instanceof rt&&r[0].equals(r[h-1])&&r.pop(),r},_setLatLngs:function(n){Yn.prototype._setLatLngs.call(this,n),gn(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return gn(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var n=this._renderer._bounds,r=this.options.weight,h=new Z(r,r);if(n=new gt(n.min.subtract(h),n.max.add(h)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(n))){if(this.options.noClip){this._parts=this._rings;return}for(var f=0,y=this._rings.length,C;f<y;f++)C=zc(this._rings[f],n,!0),C.length&&this._parts.push(C)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(n){var r=!1,h,f,y,C,B,K,nt,mt;if(!this._pxBounds||!this._pxBounds.contains(n))return!1;for(C=0,nt=this._parts.length;C<nt;C++)for(h=this._parts[C],B=0,mt=h.length,K=mt-1;B<mt;K=B++)f=h[B],y=h[K],f.y>n.y!=y.y>n.y&&n.x<(y.x-f.x)*(n.y-f.y)/(y.y-f.y)+f.x&&(r=!r);return r||Yn.prototype._containsPoint.call(this,n,!0)}});function hf(n,r){return new os(n,r)}var $n=qn.extend({initialize:function(n,r){w(this,r),this._layers={},n&&this.addData(n)},addData:function(n){var r=E(n)?n:n.features,h,f,y;if(r){for(h=0,f=r.length;h<f;h++)y=r[h],(y.geometries||y.geometry||y.features||y.coordinates)&&this.addData(y);return this}var C=this.options;if(C.filter&&!C.filter(n))return this;var B=Ho(n,C);return B?(B.feature=Wo(n),B.defaultOptions=B.options,this.resetStyle(B),C.onEachFeature&&C.onEachFeature(n,B),this.addLayer(B)):this},resetStyle:function(n){return n===void 0?this.eachLayer(this.resetStyle,this):(n.options=o({},n.defaultOptions),this._setLayerStyle(n,this.options.style),this)},setStyle:function(n){return this.eachLayer(function(r){this._setLayerStyle(r,n)},this)},_setLayerStyle:function(n,r){n.setStyle&&(typeof r=="function"&&(r=r(n.feature)),n.setStyle(r))}});function Ho(n,r){var h=n.type==="Feature"?n.geometry:n,f=h?h.coordinates:null,y=[],C=r&&r.pointToLayer,B=r&&r.coordsToLatLng||pa,K,nt,mt,kt;if(!f&&!h)return null;switch(h.type){case"Point":return K=B(f),qc(C,n,K,r);case"MultiPoint":for(mt=0,kt=f.length;mt<kt;mt++)K=B(f[mt]),y.push(qc(C,n,K,r));return new qn(y);case"LineString":case"MultiLineString":return nt=Vo(f,h.type==="LineString"?0:1,B),new Yn(nt,r);case"Polygon":case"MultiPolygon":return nt=Vo(f,h.type==="Polygon"?1:2,B),new os(nt,r);case"GeometryCollection":for(mt=0,kt=h.geometries.length;mt<kt;mt++){var te=Ho({geometry:h.geometries[mt],type:"Feature",properties:n.properties},r);te&&y.push(te)}return new qn(y);case"FeatureCollection":for(mt=0,kt=h.features.length;mt<kt;mt++){var ue=Ho(h.features[mt],r);ue&&y.push(ue)}return new qn(y);default:throw new Error("Invalid GeoJSON object.")}}function qc(n,r,h,f){return n?n(r,h):new Fo(h,f&&f.markersInheritOptions&&f)}function pa(n){return new rt(n[1],n[0],n[2])}function Vo(n,r,h){for(var f=[],y=0,C=n.length,B;y<C;y++)B=r?Vo(n[y],r-1,h):(h||pa)(n[y]),f.push(B);return f}function ma(n,r){return n=pt(n),n.alt!==void 0?[g(n.lng,r),g(n.lat,r),g(n.alt,r)]:[g(n.lng,r),g(n.lat,r)]}function Go(n,r,h,f){for(var y=[],C=0,B=n.length;C<B;C++)y.push(r?Go(n[C],gn(n[C])?0:r-1,h,f):ma(n[C],f));return!r&&h&&y.length>0&&y.push(y[0].slice()),y}function rs(n,r){return n.feature?o({},n.feature,{geometry:r}):Wo(r)}function Wo(n){return n.type==="Feature"||n.type==="FeatureCollection"?n:{type:"Feature",properties:{},geometry:n}}var _a={toGeoJSON:function(n){return rs(this,{type:"Point",coordinates:ma(this.getLatLng(),n)})}};Fo.include(_a),fa.include(_a),Bo.include(_a),Yn.include({toGeoJSON:function(n){var r=!gn(this._latlngs),h=Go(this._latlngs,r?1:0,!1,n);return rs(this,{type:(r?"Multi":"")+"LineString",coordinates:h})}}),os.include({toGeoJSON:function(n){var r=!gn(this._latlngs),h=r&&!gn(this._latlngs[0]),f=Go(this._latlngs,h?2:r?1:0,!0,n);return r||(f=[f]),rs(this,{type:(h?"Multi":"")+"Polygon",coordinates:f})}}),is.include({toMultiPoint:function(n){var r=[];return this.eachLayer(function(h){r.push(h.toGeoJSON(n).geometry.coordinates)}),rs(this,{type:"MultiPoint",coordinates:r})},toGeoJSON:function(n){var r=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(r==="MultiPoint")return this.toMultiPoint(n);var h=r==="GeometryCollection",f=[];return this.eachLayer(function(y){if(y.toGeoJSON){var C=y.toGeoJSON(n);if(h)f.push(C.geometry);else{var B=Wo(C);B.type==="FeatureCollection"?f.push.apply(f,B.features):f.push(B)}}}),h?rs(this,{geometries:f,type:"GeometryCollection"}):{type:"FeatureCollection",features:f}}});function Yc(n,r){return new $n(n,r)}var uf=Yc,Zo=bn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(n,r,h){this._url=n,this._bounds=Q(r),w(this,h)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(Kt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){Tt(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(n){return this.options.opacity=n,this._image&&this._updateOpacity(),this},setStyle:function(n){return n.opacity&&this.setOpacity(n.opacity),this},bringToFront:function(){return this._map&&de(this._image),this},bringToBack:function(){return this._map&&Be(this._image),this},setUrl:function(n){return this._url=n,this._image&&(this._image.src=n),this},setBounds:function(n){return this._bounds=Q(n),this._map&&this._reset(),this},getEvents:function(){var n={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(n.zoomanim=this._animateZoom),n},setZIndex:function(n){return this.options.zIndex=n,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var n=this._url.tagName==="IMG",r=this._image=n?this._url:Wt("img");if(Kt(r,"leaflet-image-layer"),this._zoomAnimated&&Kt(r,"leaflet-zoom-animated"),this.options.className&&Kt(r,this.options.className),r.onselectstart=p,r.onmousemove=p,r.onload=l(this.fire,this,"load"),r.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(r.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),n){this._url=r.src;return}r.src=this._url,r.alt=this.options.alt},_animateZoom:function(n){var r=this._map.getZoomScale(n.zoom),h=this._map._latLngBoundsToNewLayerBounds(this._bounds,n.zoom,n.center).min;qe(this._image,h,r)},_reset:function(){var n=this._image,r=new gt(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),h=r.getSize();Le(n,r.min),n.style.width=h.x+"px",n.style.height=h.y+"px"},_updateOpacity:function(){He(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var n=this.options.errorOverlayUrl;n&&this._url!==n&&(this._url=n,this._image.src=n)},getCenter:function(){return this._bounds.getCenter()}}),df=function(n,r,h){return new Zo(n,r,h)},$c=Zo.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var n=this._url.tagName==="VIDEO",r=this._image=n?this._url:Wt("video");if(Kt(r,"leaflet-image-layer"),this._zoomAnimated&&Kt(r,"leaflet-zoom-animated"),this.options.className&&Kt(r,this.options.className),r.onselectstart=p,r.onmousemove=p,r.onloadeddata=l(this.fire,this,"load"),n){for(var h=r.getElementsByTagName("source"),f=[],y=0;y<h.length;y++)f.push(h[y].src);this._url=h.length>0?f:[r.src];return}E(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(r.style,"objectFit")&&(r.style.objectFit="fill"),r.autoplay=!!this.options.autoplay,r.loop=!!this.options.loop,r.muted=!!this.options.muted,r.playsInline=!!this.options.playsInline;for(var C=0;C<this._url.length;C++){var B=Wt("source");B.src=this._url[C],r.appendChild(B)}}});function ff(n,r,h){return new $c(n,r,h)}var Kc=Zo.extend({_initImage:function(){var n=this._image=this._url;Kt(n,"leaflet-image-layer"),this._zoomAnimated&&Kt(n,"leaflet-zoom-animated"),this.options.className&&Kt(n,this.options.className),n.onselectstart=p,n.onmousemove=p}});function pf(n,r,h){return new Kc(n,r,h)}var kn=bn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(n,r){n&&(n instanceof rt||E(n))?(this._latlng=pt(n),w(this,r)):(w(this,n),this._source=r),this.options.content&&(this._content=this.options.content)},openOn:function(n){return n=arguments.length?n:this._source._map,n.hasLayer(this)||n.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(n){return this._map?this.close():(arguments.length?this._source=n:n=this._source,this._prepareOpen(),this.openOn(n._map)),this},onAdd:function(n){this._zoomAnimated=n._zoomAnimated,this._container||this._initLayout(),n._fadeAnimated&&He(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),n._fadeAnimated&&He(this._container,1),this.bringToFront(),this.options.interactive&&(Kt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(n){n._fadeAnimated?(He(this._container,0),this._removeTimeout=setTimeout(l(Tt,void 0,this._container),200)):Tt(this._container),this.options.interactive&&(Ee(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(n){return this._latlng=pt(n),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(n){return this._content=n,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var n={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(n.zoomanim=this._animateZoom),n},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&de(this._container),this},bringToBack:function(){return this._map&&Be(this._container),this},_prepareOpen:function(n){var r=this._source;if(!r._map)return!1;if(r instanceof qn){r=null;var h=this._source._layers;for(var f in h)if(h[f]._map){r=h[f];break}if(!r)return!1;this._source=r}if(!n)if(r.getCenter)n=r.getCenter();else if(r.getLatLng)n=r.getLatLng();else if(r.getBounds)n=r.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(n),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var n=this._contentNode,r=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof r=="string")n.innerHTML=r;else{for(;n.hasChildNodes();)n.removeChild(n.firstChild);n.appendChild(r)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var n=this._map.latLngToLayerPoint(this._latlng),r=st(this.options.offset),h=this._getAnchor();this._zoomAnimated?Le(this._container,n.add(h)):r=r.add(n).add(h);var f=this._containerBottom=-r.y,y=this._containerLeft=-Math.round(this._containerWidth/2)+r.x;this._container.style.bottom=f+"px",this._container.style.left=y+"px"}},_getAnchor:function(){return[0,0]}});me.include({_initOverlay:function(n,r,h,f){var y=r;return y instanceof n||(y=new n(f).setContent(r)),h&&y.setLatLng(h),y}}),bn.include({_initOverlay:function(n,r,h,f){var y=h;return y instanceof n?(w(y,f),y._source=this):(y=r&&!f?r:new n(f,this),y.setContent(h)),y}});var Xo=kn.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(n){return n=arguments.length?n:this._source._map,!n.hasLayer(this)&&n._popup&&n._popup.options.autoClose&&n.removeLayer(n._popup),n._popup=this,kn.prototype.openOn.call(this,n)},onAdd:function(n){kn.prototype.onAdd.call(this,n),n.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof pi||this._source.on("preclick",Ii))},onRemove:function(n){kn.prototype.onRemove.call(this,n),n.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof pi||this._source.off("preclick",Ii))},getEvents:function(){var n=kn.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(n.preclick=this.close),this.options.keepInView&&(n.moveend=this._adjustPan),n},_initLayout:function(){var n="leaflet-popup",r=this._container=Wt("div",n+" "+(this.options.className||"")+" leaflet-zoom-animated"),h=this._wrapper=Wt("div",n+"-content-wrapper",r);if(this._contentNode=Wt("div",n+"-content",h),Qs(r),oa(this._contentNode),oe(r,"contextmenu",Ii),this._tipContainer=Wt("div",n+"-tip-container",r),this._tip=Wt("div",n+"-tip",this._tipContainer),this.options.closeButton){var f=this._closeButton=Wt("a",n+"-close-button",r);f.setAttribute("role","button"),f.setAttribute("aria-label","Close popup"),f.href="#close",f.innerHTML='<span aria-hidden="true">&#215;</span>',oe(f,"click",function(y){Xe(y),this.close()},this)}},_updateLayout:function(){var n=this._contentNode,r=n.style;r.width="",r.whiteSpace="nowrap";var h=n.offsetWidth;h=Math.min(h,this.options.maxWidth),h=Math.max(h,this.options.minWidth),r.width=h+1+"px",r.whiteSpace="",r.height="";var f=n.offsetHeight,y=this.options.maxHeight,C="leaflet-popup-scrolled";y&&f>y?(r.height=y+"px",Kt(n,C)):Ee(n,C),this._containerWidth=this._container.offsetWidth},_animateZoom:function(n){var r=this._map._latLngToNewLayerPoint(this._latlng,n.zoom,n.center),h=this._getAnchor();Le(this._container,r.add(h))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var n=this._map,r=parseInt(Ne(this._container,"marginBottom"),10)||0,h=this._container.offsetHeight+r,f=this._containerWidth,y=new Z(this._containerLeft,-h-this._containerBottom);y._add(Ri(this._container));var C=n.layerPointToContainerPoint(y),B=st(this.options.autoPanPadding),K=st(this.options.autoPanPaddingTopLeft||B),nt=st(this.options.autoPanPaddingBottomRight||B),mt=n.getSize(),kt=0,te=0;C.x+f+nt.x>mt.x&&(kt=C.x+f-mt.x+nt.x),C.x-kt-K.x<0&&(kt=C.x-K.x),C.y+h+nt.y>mt.y&&(te=C.y+h-mt.y+nt.y),C.y-te-K.y<0&&(te=C.y-K.y),(kt||te)&&(this.options.keepInView&&(this._autopanning=!0),n.fire("autopanstart").panBy([kt,te]))}},_getAnchor:function(){return st(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),mf=function(n,r){return new Xo(n,r)};me.mergeOptions({closePopupOnClick:!0}),me.include({openPopup:function(n,r,h){return this._initOverlay(Xo,n,r,h).openOn(this),this},closePopup:function(n){return n=arguments.length?n:this._popup,n&&n.close(),this}}),bn.include({bindPopup:function(n,r){return this._popup=this._initOverlay(Xo,this._popup,n,r),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(n){return this._popup&&(this instanceof qn||(this._popup._source=this),this._popup._prepareOpen(n||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(n){return this._popup&&this._popup.setContent(n),this},getPopup:function(){return this._popup},_openPopup:function(n){if(!(!this._popup||!this._map)){Di(n);var r=n.layer||n.target;if(this._popup._source===r&&!(r instanceof pi)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(n.latlng);return}this._popup._source=r,this.openPopup(n.latlng)}},_movePopup:function(n){this._popup.setLatLng(n.latlng)},_onKeyPress:function(n){n.originalEvent.keyCode===13&&this._openPopup(n)}});var qo=kn.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(n){kn.prototype.onAdd.call(this,n),this.setOpacity(this.options.opacity),n.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(n){kn.prototype.onRemove.call(this,n),n.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var n=kn.prototype.getEvents.call(this);return this.options.permanent||(n.preclick=this.close),n},_initLayout:function(){var n="leaflet-tooltip",r=n+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Wt("div",r),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+u(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(n){var r,h,f=this._map,y=this._container,C=f.latLngToContainerPoint(f.getCenter()),B=f.layerPointToContainerPoint(n),K=this.options.direction,nt=y.offsetWidth,mt=y.offsetHeight,kt=st(this.options.offset),te=this._getAnchor();K==="top"?(r=nt/2,h=mt):K==="bottom"?(r=nt/2,h=0):K==="center"?(r=nt/2,h=mt/2):K==="right"?(r=0,h=mt/2):K==="left"?(r=nt,h=mt/2):B.x<C.x?(K="right",r=0,h=mt/2):(K="left",r=nt+(kt.x+te.x)*2,h=mt/2),n=n.subtract(st(r,h,!0)).add(kt).add(te),Ee(y,"leaflet-tooltip-right"),Ee(y,"leaflet-tooltip-left"),Ee(y,"leaflet-tooltip-top"),Ee(y,"leaflet-tooltip-bottom"),Kt(y,"leaflet-tooltip-"+K),Le(y,n)},_updatePosition:function(){var n=this._map.latLngToLayerPoint(this._latlng);this._setPosition(n)},setOpacity:function(n){this.options.opacity=n,this._container&&He(this._container,n)},_animateZoom:function(n){var r=this._map._latLngToNewLayerPoint(this._latlng,n.zoom,n.center);this._setPosition(r)},_getAnchor:function(){return st(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),_f=function(n,r){return new qo(n,r)};me.include({openTooltip:function(n,r,h){return this._initOverlay(qo,n,r,h).openOn(this),this},closeTooltip:function(n){return n.close(),this}}),bn.include({bindTooltip:function(n,r){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(qo,this._tooltip,n,r),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(n){if(!(!n&&this._tooltipHandlersAdded)){var r=n?"off":"on",h={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?h.add=this._openTooltip:(h.mouseover=this._openTooltip,h.mouseout=this.closeTooltip,h.click=this._openTooltip,this._map?this._addFocusListeners():h.add=this._addFocusListeners),this._tooltip.options.sticky&&(h.mousemove=this._moveTooltip),this[r](h),this._tooltipHandlersAdded=!n}},openTooltip:function(n){return this._tooltip&&(this instanceof qn||(this._tooltip._source=this),this._tooltip._prepareOpen(n)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(n){return this._tooltip&&this._tooltip.setContent(n),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(n){var r=typeof n.getElement=="function"&&n.getElement();r&&(oe(r,"focus",function(){this._tooltip._source=n,this.openTooltip()},this),oe(r,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(n){var r=typeof n.getElement=="function"&&n.getElement();r&&r.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(n){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var r=this;this._map.once("moveend",function(){r._openOnceFlag=!1,r._openTooltip(n)});return}this._tooltip._source=n.layer||n.target,this.openTooltip(this._tooltip.options.sticky?n.latlng:void 0)}},_moveTooltip:function(n){var r=n.latlng,h,f;this._tooltip.options.sticky&&n.originalEvent&&(h=this._map.mouseEventToContainerPoint(n.originalEvent),f=this._map.containerPointToLayerPoint(h),r=this._map.layerPointToLatLng(f)),this._tooltip.setLatLng(r)}});var jc=ss.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(n){var r=n&&n.tagName==="DIV"?n:document.createElement("div"),h=this.options;if(h.html instanceof Element?(cn(r),r.appendChild(h.html)):r.innerHTML=h.html!==!1?h.html:"",h.bgPos){var f=st(h.bgPos);r.style.backgroundPosition=-f.x+"px "+-f.y+"px"}return this._setIconStyles(r,"icon"),r},createShadow:function(){return null}});function gf(n){return new jc(n)}ss.Default=no;var io=bn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Yt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(n){w(this,n)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(n){n._addZoomLimit(this)},onRemove:function(n){this._removeAllTiles(),Tt(this._container),n._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(de(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Be(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(n){return this.options.opacity=n,this._updateOpacity(),this},setZIndex:function(n){return this.options.zIndex=n,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var n=this._clampZoom(this._map.getZoom());n!==this._tileZoom&&(this._tileZoom=n,this._updateLevels()),this._update()}return this},getEvents:function(){var n={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=d(this._onMoveEnd,this.options.updateInterval,this)),n.move=this._onMove),this._zoomAnimated&&(n.zoomanim=this._animateZoom),n},createTile:function(){return document.createElement("div")},getTileSize:function(){var n=this.options.tileSize;return n instanceof Z?n:new Z(n,n)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(n){for(var r=this.getPane().children,h=-n(-1/0,1/0),f=0,y=r.length,C;f<y;f++)C=r[f].style.zIndex,r[f]!==this._container&&C&&(h=n(h,+C));isFinite(h)&&(this.options.zIndex=h+n(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Yt.ielt9){He(this._container,this.options.opacity);var n=+new Date,r=!1,h=!1;for(var f in this._tiles){var y=this._tiles[f];if(!(!y.current||!y.loaded)){var C=Math.min(1,(n-y.loaded)/200);He(y.el,C),C<1?r=!0:(y.active?h=!0:this._onOpaqueTile(y),y.active=!0)}}h&&!this._noPrune&&this._pruneTiles(),r&&(G(this._fadeFrame),this._fadeFrame=z(this._updateOpacity,this))}},_onOpaqueTile:p,_initContainer:function(){this._container||(this._container=Wt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var n=this._tileZoom,r=this.options.maxZoom;if(n!==void 0){for(var h in this._levels)h=Number(h),this._levels[h].el.children.length||h===n?(this._levels[h].el.style.zIndex=r-Math.abs(n-h),this._onUpdateLevel(h)):(Tt(this._levels[h].el),this._removeTilesAtZoom(h),this._onRemoveLevel(h),delete this._levels[h]);var f=this._levels[n],y=this._map;return f||(f=this._levels[n]={},f.el=Wt("div","leaflet-tile-container leaflet-zoom-animated",this._container),f.el.style.zIndex=r,f.origin=y.project(y.unproject(y.getPixelOrigin()),n).round(),f.zoom=n,this._setZoomTransform(f,y.getCenter(),y.getZoom()),p(f.el.offsetWidth),this._onCreateLevel(f)),this._level=f,f}},_onUpdateLevel:p,_onRemoveLevel:p,_onCreateLevel:p,_pruneTiles:function(){if(this._map){var n,r,h=this._map.getZoom();if(h>this.options.maxZoom||h<this.options.minZoom){this._removeAllTiles();return}for(n in this._tiles)r=this._tiles[n],r.retain=r.current;for(n in this._tiles)if(r=this._tiles[n],r.current&&!r.active){var f=r.coords;this._retainParent(f.x,f.y,f.z,f.z-5)||this._retainChildren(f.x,f.y,f.z,f.z+2)}for(n in this._tiles)this._tiles[n].retain||this._removeTile(n)}},_removeTilesAtZoom:function(n){for(var r in this._tiles)this._tiles[r].coords.z===n&&this._removeTile(r)},_removeAllTiles:function(){for(var n in this._tiles)this._removeTile(n)},_invalidateAll:function(){for(var n in this._levels)Tt(this._levels[n].el),this._onRemoveLevel(Number(n)),delete this._levels[n];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(n,r,h,f){var y=Math.floor(n/2),C=Math.floor(r/2),B=h-1,K=new Z(+y,+C);K.z=+B;var nt=this._tileCoordsToKey(K),mt=this._tiles[nt];return mt&&mt.active?(mt.retain=!0,!0):(mt&&mt.loaded&&(mt.retain=!0),B>f?this._retainParent(y,C,B,f):!1)},_retainChildren:function(n,r,h,f){for(var y=2*n;y<2*n+2;y++)for(var C=2*r;C<2*r+2;C++){var B=new Z(y,C);B.z=h+1;var K=this._tileCoordsToKey(B),nt=this._tiles[K];if(nt&&nt.active){nt.retain=!0;continue}else nt&&nt.loaded&&(nt.retain=!0);h+1<f&&this._retainChildren(y,C,h+1,f)}},_resetView:function(n){var r=n&&(n.pinch||n.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),r,r)},_animateZoom:function(n){this._setView(n.center,n.zoom,!0,n.noUpdate)},_clampZoom:function(n){var r=this.options;return r.minNativeZoom!==void 0&&n<r.minNativeZoom?r.minNativeZoom:r.maxNativeZoom!==void 0&&r.maxNativeZoom<n?r.maxNativeZoom:n},_setView:function(n,r,h,f){var y=Math.round(r);this.options.maxZoom!==void 0&&y>this.options.maxZoom||this.options.minZoom!==void 0&&y<this.options.minZoom?y=void 0:y=this._clampZoom(y);var C=this.options.updateWhenZooming&&y!==this._tileZoom;(!f||C)&&(this._tileZoom=y,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),y!==void 0&&this._update(n),h||this._pruneTiles(),this._noPrune=!!h),this._setZoomTransforms(n,r)},_setZoomTransforms:function(n,r){for(var h in this._levels)this._setZoomTransform(this._levels[h],n,r)},_setZoomTransform:function(n,r,h){var f=this._map.getZoomScale(h,n.zoom),y=n.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(r,h)).round();Yt.any3d?qe(n.el,y,f):Le(n.el,y)},_resetGrid:function(){var n=this._map,r=n.options.crs,h=this._tileSize=this.getTileSize(),f=this._tileZoom,y=this._map.getPixelWorldBounds(this._tileZoom);y&&(this._globalTileRange=this._pxBoundsToTileRange(y)),this._wrapX=r.wrapLng&&!this.options.noWrap&&[Math.floor(n.project([0,r.wrapLng[0]],f).x/h.x),Math.ceil(n.project([0,r.wrapLng[1]],f).x/h.y)],this._wrapY=r.wrapLat&&!this.options.noWrap&&[Math.floor(n.project([r.wrapLat[0],0],f).y/h.x),Math.ceil(n.project([r.wrapLat[1],0],f).y/h.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(n){var r=this._map,h=r._animatingZoom?Math.max(r._animateToZoom,r.getZoom()):r.getZoom(),f=r.getZoomScale(h,this._tileZoom),y=r.project(n,this._tileZoom).floor(),C=r.getSize().divideBy(f*2);return new gt(y.subtract(C),y.add(C))},_update:function(n){var r=this._map;if(r){var h=this._clampZoom(r.getZoom());if(n===void 0&&(n=r.getCenter()),this._tileZoom!==void 0){var f=this._getTiledPixelBounds(n),y=this._pxBoundsToTileRange(f),C=y.getCenter(),B=[],K=this.options.keepBuffer,nt=new gt(y.getBottomLeft().subtract([K,-K]),y.getTopRight().add([K,-K]));if(!(isFinite(y.min.x)&&isFinite(y.min.y)&&isFinite(y.max.x)&&isFinite(y.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var mt in this._tiles){var kt=this._tiles[mt].coords;(kt.z!==this._tileZoom||!nt.contains(new Z(kt.x,kt.y)))&&(this._tiles[mt].current=!1)}if(Math.abs(h-this._tileZoom)>1){this._setView(n,h);return}for(var te=y.min.y;te<=y.max.y;te++)for(var ue=y.min.x;ue<=y.max.x;ue++){var nn=new Z(ue,te);if(nn.z=this._tileZoom,!!this._isValidTile(nn)){var Ve=this._tiles[this._tileCoordsToKey(nn)];Ve?Ve.current=!0:B.push(nn)}}if(B.sort(function(un,ls){return un.distanceTo(C)-ls.distanceTo(C)}),B.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var vn=document.createDocumentFragment();for(ue=0;ue<B.length;ue++)this._addTile(B[ue],vn);this._level.el.appendChild(vn)}}}},_isValidTile:function(n){var r=this._map.options.crs;if(!r.infinite){var h=this._globalTileRange;if(!r.wrapLng&&(n.x<h.min.x||n.x>h.max.x)||!r.wrapLat&&(n.y<h.min.y||n.y>h.max.y))return!1}if(!this.options.bounds)return!0;var f=this._tileCoordsToBounds(n);return Q(this.options.bounds).overlaps(f)},_keyToBounds:function(n){return this._tileCoordsToBounds(this._keyToTileCoords(n))},_tileCoordsToNwSe:function(n){var r=this._map,h=this.getTileSize(),f=n.scaleBy(h),y=f.add(h),C=r.unproject(f,n.z),B=r.unproject(y,n.z);return[C,B]},_tileCoordsToBounds:function(n){var r=this._tileCoordsToNwSe(n),h=new Dt(r[0],r[1]);return this.options.noWrap||(h=this._map.wrapLatLngBounds(h)),h},_tileCoordsToKey:function(n){return n.x+":"+n.y+":"+n.z},_keyToTileCoords:function(n){var r=n.split(":"),h=new Z(+r[0],+r[1]);return h.z=+r[2],h},_removeTile:function(n){var r=this._tiles[n];r&&(Tt(r.el),delete this._tiles[n],this.fire("tileunload",{tile:r.el,coords:this._keyToTileCoords(n)}))},_initTile:function(n){Kt(n,"leaflet-tile");var r=this.getTileSize();n.style.width=r.x+"px",n.style.height=r.y+"px",n.onselectstart=p,n.onmousemove=p,Yt.ielt9&&this.options.opacity<1&&He(n,this.options.opacity)},_addTile:function(n,r){var h=this._getTilePos(n),f=this._tileCoordsToKey(n),y=this.createTile(this._wrapCoords(n),l(this._tileReady,this,n));this._initTile(y),this.createTile.length<2&&z(l(this._tileReady,this,n,null,y)),Le(y,h),this._tiles[f]={el:y,coords:n,current:!0},r.appendChild(y),this.fire("tileloadstart",{tile:y,coords:n})},_tileReady:function(n,r,h){r&&this.fire("tileerror",{error:r,tile:h,coords:n});var f=this._tileCoordsToKey(n);h=this._tiles[f],h&&(h.loaded=+new Date,this._map._fadeAnimated?(He(h.el,0),G(this._fadeFrame),this._fadeFrame=z(this._updateOpacity,this)):(h.active=!0,this._pruneTiles()),r||(Kt(h.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:h.el,coords:n})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Yt.ielt9||!this._map._fadeAnimated?z(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(n){return n.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(n){var r=new Z(this._wrapX?m(n.x,this._wrapX):n.x,this._wrapY?m(n.y,this._wrapY):n.y);return r.z=n.z,r},_pxBoundsToTileRange:function(n){var r=this.getTileSize();return new gt(n.min.unscaleBy(r).floor(),n.max.unscaleBy(r).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var n in this._tiles)if(!this._tiles[n].loaded)return!1;return!0}});function vf(n){return new io(n)}var as=io.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(n,r){this._url=n,r=w(this,r),r.detectRetina&&Yt.retina&&r.maxZoom>0?(r.tileSize=Math.floor(r.tileSize/2),r.zoomReverse?(r.zoomOffset--,r.minZoom=Math.min(r.maxZoom,r.minZoom+1)):(r.zoomOffset++,r.maxZoom=Math.max(r.minZoom,r.maxZoom-1)),r.minZoom=Math.max(0,r.minZoom)):r.zoomReverse?r.minZoom=Math.min(r.maxZoom,r.minZoom):r.maxZoom=Math.max(r.minZoom,r.maxZoom),typeof r.subdomains=="string"&&(r.subdomains=r.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(n,r){return this._url===n&&r===void 0&&(r=!0),this._url=n,r||this.redraw(),this},createTile:function(n,r){var h=document.createElement("img");return oe(h,"load",l(this._tileOnLoad,this,r,h)),oe(h,"error",l(this._tileOnError,this,r,h)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(h.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(h.referrerPolicy=this.options.referrerPolicy),h.alt="",h.src=this.getTileUrl(n),h},getTileUrl:function(n){var r={r:Yt.retina?"@2x":"",s:this._getSubdomain(n),x:n.x,y:n.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var h=this._globalTileRange.max.y-n.y;this.options.tms&&(r.y=h),r["-y"]=h}return b(this._url,o(r,this.options))},_tileOnLoad:function(n,r){Yt.ielt9?setTimeout(l(n,this,null,r),0):n(null,r)},_tileOnError:function(n,r,h){var f=this.options.errorTileUrl;f&&r.getAttribute("src")!==f&&(r.src=f),n(h,r)},_onTileRemove:function(n){n.tile.onload=null},_getZoomForUrl:function(){var n=this._tileZoom,r=this.options.maxZoom,h=this.options.zoomReverse,f=this.options.zoomOffset;return h&&(n=r-n),n+f},_getSubdomain:function(n){var r=Math.abs(n.x+n.y)%this.options.subdomains.length;return this.options.subdomains[r]},_abortLoading:function(){var n,r;for(n in this._tiles)if(this._tiles[n].coords.z!==this._tileZoom&&(r=this._tiles[n].el,r.onload=p,r.onerror=p,!r.complete)){r.src=U;var h=this._tiles[n].coords;Tt(r),delete this._tiles[n],this.fire("tileabort",{tile:r,coords:h})}},_removeTile:function(n){var r=this._tiles[n];if(r)return r.el.setAttribute("src",U),io.prototype._removeTile.call(this,n)},_tileReady:function(n,r,h){if(!(!this._map||h&&h.getAttribute("src")===U))return io.prototype._tileReady.call(this,n,r,h)}});function Jc(n,r){return new as(n,r)}var Qc=as.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(n,r){this._url=n;var h=o({},this.defaultWmsParams);for(var f in r)f in this.options||(h[f]=r[f]);r=w(this,r);var y=r.detectRetina&&Yt.retina?2:1,C=this.getTileSize();h.width=C.x*y,h.height=C.y*y,this.wmsParams=h},onAdd:function(n){this._crs=this.options.crs||n.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var r=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[r]=this._crs.code,as.prototype.onAdd.call(this,n)},getTileUrl:function(n){var r=this._tileCoordsToNwSe(n),h=this._crs,f=It(h.project(r[0]),h.project(r[1])),y=f.min,C=f.max,B=(this._wmsVersion>=1.3&&this._crs===Zc?[y.y,y.x,C.y,C.x]:[y.x,y.y,C.x,C.y]).join(","),K=as.prototype.getTileUrl.call(this,n);return K+x(this.wmsParams,K,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+B},setParams:function(n,r){return o(this.wmsParams,n),r||this.redraw(),this}});function xf(n,r){return new Qc(n,r)}as.WMS=Qc,Jc.wms=xf;var Kn=bn.extend({options:{padding:.1},initialize:function(n){w(this,n),u(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),Kt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var n={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(n.zoomanim=this._onAnimZoom),n},_onAnimZoom:function(n){this._updateTransform(n.center,n.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(n,r){var h=this._map.getZoomScale(r,this._zoom),f=this._map.getSize().multiplyBy(.5+this.options.padding),y=this._map.project(this._center,r),C=f.multiplyBy(-h).add(y).subtract(this._map._getNewPixelOrigin(n,r));Yt.any3d?qe(this._container,C,h):Le(this._container,C)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var n in this._layers)this._layers[n]._reset()},_onZoomEnd:function(){for(var n in this._layers)this._layers[n]._project()},_updatePaths:function(){for(var n in this._layers)this._layers[n]._update()},_update:function(){var n=this.options.padding,r=this._map.getSize(),h=this._map.containerPointToLayerPoint(r.multiplyBy(-n)).round();this._bounds=new gt(h,h.add(r.multiplyBy(1+n*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),th=Kn.extend({options:{tolerance:0},getEvents:function(){var n=Kn.prototype.getEvents.call(this);return n.viewprereset=this._onViewPreReset,n},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Kn.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var n=this._container=document.createElement("canvas");oe(n,"mousemove",this._onMouseMove,this),oe(n,"click dblclick mousedown mouseup contextmenu",this._onClick,this),oe(n,"mouseout",this._handleMouseOut,this),n._leaflet_disable_events=!0,this._ctx=n.getContext("2d")},_destroyContainer:function(){G(this._redrawRequest),delete this._ctx,Tt(this._container),Ae(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var n;this._redrawBounds=null;for(var r in this._layers)n=this._layers[r],n._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Kn.prototype._update.call(this);var n=this._bounds,r=this._container,h=n.getSize(),f=Yt.retina?2:1;Le(r,n.min),r.width=f*h.x,r.height=f*h.y,r.style.width=h.x+"px",r.style.height=h.y+"px",Yt.retina&&this._ctx.scale(2,2),this._ctx.translate(-n.min.x,-n.min.y),this.fire("update")}},_reset:function(){Kn.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(n){this._updateDashArray(n),this._layers[u(n)]=n;var r=n._order={layer:n,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=r),this._drawLast=r,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(n){this._requestRedraw(n)},_removePath:function(n){var r=n._order,h=r.next,f=r.prev;h?h.prev=f:this._drawLast=f,f?f.next=h:this._drawFirst=h,delete n._order,delete this._layers[u(n)],this._requestRedraw(n)},_updatePath:function(n){this._extendRedrawBounds(n),n._project(),n._update(),this._requestRedraw(n)},_updateStyle:function(n){this._updateDashArray(n),this._requestRedraw(n)},_updateDashArray:function(n){if(typeof n.options.dashArray=="string"){var r=n.options.dashArray.split(/[, ]+/),h=[],f,y;for(y=0;y<r.length;y++){if(f=Number(r[y]),isNaN(f))return;h.push(f)}n.options._dashArray=h}else n.options._dashArray=n.options.dashArray},_requestRedraw:function(n){this._map&&(this._extendRedrawBounds(n),this._redrawRequest=this._redrawRequest||z(this._redraw,this))},_extendRedrawBounds:function(n){if(n._pxBounds){var r=(n.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new gt,this._redrawBounds.extend(n._pxBounds.min.subtract([r,r])),this._redrawBounds.extend(n._pxBounds.max.add([r,r]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var n=this._redrawBounds;if(n){var r=n.getSize();this._ctx.clearRect(n.min.x,n.min.y,r.x,r.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var n,r=this._redrawBounds;if(this._ctx.save(),r){var h=r.getSize();this._ctx.beginPath(),this._ctx.rect(r.min.x,r.min.y,h.x,h.y),this._ctx.clip()}this._drawing=!0;for(var f=this._drawFirst;f;f=f.next)n=f.layer,(!r||n._pxBounds&&n._pxBounds.intersects(r))&&n._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(n,r){if(this._drawing){var h,f,y,C,B=n._parts,K=B.length,nt=this._ctx;if(K){for(nt.beginPath(),h=0;h<K;h++){for(f=0,y=B[h].length;f<y;f++)C=B[h][f],nt[f?"lineTo":"moveTo"](C.x,C.y);r&&nt.closePath()}this._fillStroke(nt,n)}}},_updateCircle:function(n){if(!(!this._drawing||n._empty())){var r=n._point,h=this._ctx,f=Math.max(Math.round(n._radius),1),y=(Math.max(Math.round(n._radiusY),1)||f)/f;y!==1&&(h.save(),h.scale(1,y)),h.beginPath(),h.arc(r.x,r.y/y,f,0,Math.PI*2,!1),y!==1&&h.restore(),this._fillStroke(h,n)}},_fillStroke:function(n,r){var h=r.options;h.fill&&(n.globalAlpha=h.fillOpacity,n.fillStyle=h.fillColor||h.color,n.fill(h.fillRule||"evenodd")),h.stroke&&h.weight!==0&&(n.setLineDash&&n.setLineDash(r.options&&r.options._dashArray||[]),n.globalAlpha=h.opacity,n.lineWidth=h.weight,n.strokeStyle=h.color,n.lineCap=h.lineCap,n.lineJoin=h.lineJoin,n.stroke())},_onClick:function(n){for(var r=this._map.mouseEventToLayerPoint(n),h,f,y=this._drawFirst;y;y=y.next)h=y.layer,h.options.interactive&&h._containsPoint(r)&&(!(n.type==="click"||n.type==="preclick")||!this._map._draggableMoved(h))&&(f=h);this._fireEvent(f?[f]:!1,n)},_onMouseMove:function(n){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var r=this._map.mouseEventToLayerPoint(n);this._handleMouseHover(n,r)}},_handleMouseOut:function(n){var r=this._hoveredLayer;r&&(Ee(this._container,"leaflet-interactive"),this._fireEvent([r],n,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(n,r){if(!this._mouseHoverThrottled){for(var h,f,y=this._drawFirst;y;y=y.next)h=y.layer,h.options.interactive&&h._containsPoint(r)&&(f=h);f!==this._hoveredLayer&&(this._handleMouseOut(n),f&&(Kt(this._container,"leaflet-interactive"),this._fireEvent([f],n,"mouseover"),this._hoveredLayer=f)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,n),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(n,r,h){this._map._fireDOMEvent(r,h||r.type,n)},_bringToFront:function(n){var r=n._order;if(r){var h=r.next,f=r.prev;if(h)h.prev=f;else return;f?f.next=h:h&&(this._drawFirst=h),r.prev=this._drawLast,this._drawLast.next=r,r.next=null,this._drawLast=r,this._requestRedraw(n)}},_bringToBack:function(n){var r=n._order;if(r){var h=r.next,f=r.prev;if(f)f.next=h;else return;h?h.prev=f:f&&(this._drawLast=f),r.prev=null,r.next=this._drawFirst,this._drawFirst.prev=r,this._drawFirst=r,this._requestRedraw(n)}}});function eh(n){return Yt.canvas?new th(n):null}var so=(function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(n){return document.createElement("<lvml:"+n+' class="lvml">')}}catch{}return function(n){return document.createElement("<"+n+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}})(),yf={_initContainer:function(){this._container=Wt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Kn.prototype._update.call(this),this.fire("update"))},_initPath:function(n){var r=n._container=so("shape");Kt(r,"leaflet-vml-shape "+(this.options.className||"")),r.coordsize="1 1",n._path=so("path"),r.appendChild(n._path),this._updateStyle(n),this._layers[u(n)]=n},_addPath:function(n){var r=n._container;this._container.appendChild(r),n.options.interactive&&n.addInteractiveTarget(r)},_removePath:function(n){var r=n._container;Tt(r),n.removeInteractiveTarget(r),delete this._layers[u(n)]},_updateStyle:function(n){var r=n._stroke,h=n._fill,f=n.options,y=n._container;y.stroked=!!f.stroke,y.filled=!!f.fill,f.stroke?(r||(r=n._stroke=so("stroke")),y.appendChild(r),r.weight=f.weight+"px",r.color=f.color,r.opacity=f.opacity,f.dashArray?r.dashStyle=E(f.dashArray)?f.dashArray.join(" "):f.dashArray.replace(/( *, *)/g," "):r.dashStyle="",r.endcap=f.lineCap.replace("butt","flat"),r.joinstyle=f.lineJoin):r&&(y.removeChild(r),n._stroke=null),f.fill?(h||(h=n._fill=so("fill")),y.appendChild(h),h.color=f.fillColor||f.color,h.opacity=f.fillOpacity):h&&(y.removeChild(h),n._fill=null)},_updateCircle:function(n){var r=n._point.round(),h=Math.round(n._radius),f=Math.round(n._radiusY||h);this._setPath(n,n._empty()?"M0 0":"AL "+r.x+","+r.y+" "+h+","+f+" 0,"+65535*360)},_setPath:function(n,r){n._path.v=r},_bringToFront:function(n){de(n._container)},_bringToBack:function(n){Be(n._container)}},Yo=Yt.vml?so:Rt,oo=Kn.extend({_initContainer:function(){this._container=Yo("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Yo("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){Tt(this._container),Ae(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Kn.prototype._update.call(this);var n=this._bounds,r=n.getSize(),h=this._container;(!this._svgSize||!this._svgSize.equals(r))&&(this._svgSize=r,h.setAttribute("width",r.x),h.setAttribute("height",r.y)),Le(h,n.min),h.setAttribute("viewBox",[n.min.x,n.min.y,r.x,r.y].join(" ")),this.fire("update")}},_initPath:function(n){var r=n._path=Yo("path");n.options.className&&Kt(r,n.options.className),n.options.interactive&&Kt(r,"leaflet-interactive"),this._updateStyle(n),this._layers[u(n)]=n},_addPath:function(n){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(n._path),n.addInteractiveTarget(n._path)},_removePath:function(n){Tt(n._path),n.removeInteractiveTarget(n._path),delete this._layers[u(n)]},_updatePath:function(n){n._project(),n._update()},_updateStyle:function(n){var r=n._path,h=n.options;r&&(h.stroke?(r.setAttribute("stroke",h.color),r.setAttribute("stroke-opacity",h.opacity),r.setAttribute("stroke-width",h.weight),r.setAttribute("stroke-linecap",h.lineCap),r.setAttribute("stroke-linejoin",h.lineJoin),h.dashArray?r.setAttribute("stroke-dasharray",h.dashArray):r.removeAttribute("stroke-dasharray"),h.dashOffset?r.setAttribute("stroke-dashoffset",h.dashOffset):r.removeAttribute("stroke-dashoffset")):r.setAttribute("stroke","none"),h.fill?(r.setAttribute("fill",h.fillColor||h.color),r.setAttribute("fill-opacity",h.fillOpacity),r.setAttribute("fill-rule",h.fillRule||"evenodd")):r.setAttribute("fill","none"))},_updatePoly:function(n,r){this._setPath(n,ht(n._parts,r))},_updateCircle:function(n){var r=n._point,h=Math.max(Math.round(n._radius),1),f=Math.max(Math.round(n._radiusY),1)||h,y="a"+h+","+f+" 0 1,0 ",C=n._empty()?"M0 0":"M"+(r.x-h)+","+r.y+y+h*2+",0 "+y+-h*2+",0 ";this._setPath(n,C)},_setPath:function(n,r){n._path.setAttribute("d",r)},_bringToFront:function(n){de(n._path)},_bringToBack:function(n){Be(n._path)}});Yt.vml&&oo.include(yf);function nh(n){return Yt.svg||Yt.vml?new oo(n):null}me.include({getRenderer:function(n){var r=n.options.renderer||this._getPaneRenderer(n.options.pane)||this.options.renderer||this._renderer;return r||(r=this._renderer=this._createRenderer()),this.hasLayer(r)||this.addLayer(r),r},_getPaneRenderer:function(n){if(n==="overlayPane"||n===void 0)return!1;var r=this._paneRenderers[n];return r===void 0&&(r=this._createRenderer({pane:n}),this._paneRenderers[n]=r),r},_createRenderer:function(n){return this.options.preferCanvas&&eh(n)||nh(n)}});var ih=os.extend({initialize:function(n,r){os.prototype.initialize.call(this,this._boundsToLatLngs(n),r)},setBounds:function(n){return this.setLatLngs(this._boundsToLatLngs(n))},_boundsToLatLngs:function(n){return n=Q(n),[n.getSouthWest(),n.getNorthWest(),n.getNorthEast(),n.getSouthEast()]}});function Mf(n,r){return new ih(n,r)}oo.create=Yo,oo.pointsToPath=ht,$n.geometryToLayer=Ho,$n.coordsToLatLng=pa,$n.coordsToLatLngs=Vo,$n.latLngToCoords=ma,$n.latLngsToCoords=Go,$n.getFeature=rs,$n.asFeature=Wo,me.mergeOptions({boxZoom:!0});var sh=zn.extend({initialize:function(n){this._map=n,this._container=n._container,this._pane=n._panes.overlayPane,this._resetStateTimeout=0,n.on("unload",this._destroy,this)},addHooks:function(){oe(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Ae(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){Tt(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(n){if(!n.shiftKey||n.which!==1&&n.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),Ks(),jr(),this._startPoint=this._map.mouseEventToContainerPoint(n),oe(document,{contextmenu:Di,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(n){this._moved||(this._moved=!0,this._box=Wt("div","leaflet-zoom-box",this._container),Kt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(n);var r=new gt(this._point,this._startPoint),h=r.getSize();Le(this._box,r.min),this._box.style.width=h.x+"px",this._box.style.height=h.y+"px"},_finish:function(){this._moved&&(Tt(this._box),Ee(this._container,"leaflet-crosshair")),js(),Jr(),Ae(document,{contextmenu:Di,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(n){if(!(n.which!==1&&n.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var r=new Dt(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(r).fire("boxzoomend",{boxZoomBounds:r})}},_onKeyDown:function(n){n.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});me.addInitHook("addHandler","boxZoom",sh),me.mergeOptions({doubleClickZoom:!0});var oh=zn.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(n){var r=this._map,h=r.getZoom(),f=r.options.zoomDelta,y=n.originalEvent.shiftKey?h-f:h+f;r.options.doubleClickZoom==="center"?r.setZoom(y):r.setZoomAround(n.containerPoint,y)}});me.addInitHook("addHandler","doubleClickZoom",oh),me.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var rh=zn.extend({addHooks:function(){if(!this._draggable){var n=this._map;this._draggable=new fi(n._mapPane,n._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),n.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),n.on("zoomend",this._onZoomEnd,this),n.whenReady(this._onZoomEnd,this))}Kt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){Ee(this._map._container,"leaflet-grab"),Ee(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var n=this._map;if(n._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var r=Q(this._map.options.maxBounds);this._offsetLimit=It(this._map.latLngToContainerPoint(r.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(r.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;n.fire("movestart").fire("dragstart"),n.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(n){if(this._map.options.inertia){var r=this._lastTime=+new Date,h=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(h),this._times.push(r),this._prunePositions(r)}this._map.fire("move",n).fire("drag",n)},_prunePositions:function(n){for(;this._positions.length>1&&n-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var n=this._map.getSize().divideBy(2),r=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=r.subtract(n).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(n,r){return n-(n-r)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var n=this._draggable._newPos.subtract(this._draggable._startPos),r=this._offsetLimit;n.x<r.min.x&&(n.x=this._viscousLimit(n.x,r.min.x)),n.y<r.min.y&&(n.y=this._viscousLimit(n.y,r.min.y)),n.x>r.max.x&&(n.x=this._viscousLimit(n.x,r.max.x)),n.y>r.max.y&&(n.y=this._viscousLimit(n.y,r.max.y)),this._draggable._newPos=this._draggable._startPos.add(n)}},_onPreDragWrap:function(){var n=this._worldWidth,r=Math.round(n/2),h=this._initialWorldOffset,f=this._draggable._newPos.x,y=(f-r+h)%n+r-h,C=(f+r+h)%n-r-h,B=Math.abs(y+h)<Math.abs(C+h)?y:C;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=B},_onDragEnd:function(n){var r=this._map,h=r.options,f=!h.inertia||n.noInertia||this._times.length<2;if(r.fire("dragend",n),f)r.fire("moveend");else{this._prunePositions(+new Date);var y=this._lastPos.subtract(this._positions[0]),C=(this._lastTime-this._times[0])/1e3,B=h.easeLinearity,K=y.multiplyBy(B/C),nt=K.distanceTo([0,0]),mt=Math.min(h.inertiaMaxSpeed,nt),kt=K.multiplyBy(mt/nt),te=mt/(h.inertiaDeceleration*B),ue=kt.multiplyBy(-te/2).round();!ue.x&&!ue.y?r.fire("moveend"):(ue=r._limitOffset(ue,r.options.maxBounds),z(function(){r.panBy(ue,{duration:te,easeLinearity:B,noMoveStart:!0,animate:!0})}))}}});me.addInitHook("addHandler","dragging",rh),me.mergeOptions({keyboard:!0,keyboardPanDelta:80});var ah=zn.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(n){this._map=n,this._setPanDelta(n.options.keyboardPanDelta),this._setZoomDelta(n.options.zoomDelta)},addHooks:function(){var n=this._map._container;n.tabIndex<=0&&(n.tabIndex="0"),oe(n,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Ae(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var n=document.body,r=document.documentElement,h=n.scrollTop||r.scrollTop,f=n.scrollLeft||r.scrollLeft;this._map._container.focus(),window.scrollTo(f,h)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(n){var r=this._panKeys={},h=this.keyCodes,f,y;for(f=0,y=h.left.length;f<y;f++)r[h.left[f]]=[-1*n,0];for(f=0,y=h.right.length;f<y;f++)r[h.right[f]]=[n,0];for(f=0,y=h.down.length;f<y;f++)r[h.down[f]]=[0,n];for(f=0,y=h.up.length;f<y;f++)r[h.up[f]]=[0,-1*n]},_setZoomDelta:function(n){var r=this._zoomKeys={},h=this.keyCodes,f,y;for(f=0,y=h.zoomIn.length;f<y;f++)r[h.zoomIn[f]]=n;for(f=0,y=h.zoomOut.length;f<y;f++)r[h.zoomOut[f]]=-n},_addHooks:function(){oe(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Ae(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(n){if(!(n.altKey||n.ctrlKey||n.metaKey)){var r=n.keyCode,h=this._map,f;if(r in this._panKeys){if(!h._panAnim||!h._panAnim._inProgress)if(f=this._panKeys[r],n.shiftKey&&(f=st(f).multiplyBy(3)),h.options.maxBounds&&(f=h._limitOffset(st(f),h.options.maxBounds)),h.options.worldCopyJump){var y=h.wrapLatLng(h.unproject(h.project(h.getCenter()).add(f)));h.panTo(y)}else h.panBy(f)}else if(r in this._zoomKeys)h.setZoom(h.getZoom()+(n.shiftKey?3:1)*this._zoomKeys[r]);else if(r===27&&h._popup&&h._popup.options.closeOnEscapeKey)h.closePopup();else return;Di(n)}}});me.addInitHook("addHandler","keyboard",ah),me.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var lh=zn.extend({addHooks:function(){oe(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Ae(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(n){var r=Ic(n),h=this._map.options.wheelDebounceTime;this._delta+=r,this._lastMousePos=this._map.mouseEventToContainerPoint(n),this._startTime||(this._startTime=+new Date);var f=Math.max(h-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),f),Di(n)},_performZoom:function(){var n=this._map,r=n.getZoom(),h=this._map.options.zoomSnap||0;n._stop();var f=this._delta/(this._map.options.wheelPxPerZoomLevel*4),y=4*Math.log(2/(1+Math.exp(-Math.abs(f))))/Math.LN2,C=h?Math.ceil(y/h)*h:y,B=n._limitZoom(r+(this._delta>0?C:-C))-r;this._delta=0,this._startTime=null,B&&(n.options.scrollWheelZoom==="center"?n.setZoom(r+B):n.setZoomAround(this._lastMousePos,r+B))}});me.addInitHook("addHandler","scrollWheelZoom",lh);var Sf=600;me.mergeOptions({tapHold:Yt.touchNative&&Yt.safari&&Yt.mobile,tapTolerance:15});var ch=zn.extend({addHooks:function(){oe(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Ae(this._map._container,"touchstart",this._onDown,this)},_onDown:function(n){if(clearTimeout(this._holdTimeout),n.touches.length===1){var r=n.touches[0];this._startPos=this._newPos=new Z(r.clientX,r.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(oe(document,"touchend",Xe),oe(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",r))},this),Sf),oe(document,"touchend touchcancel contextmenu",this._cancel,this),oe(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function n(){Ae(document,"touchend",Xe),Ae(document,"touchend touchcancel",n)},_cancel:function(){clearTimeout(this._holdTimeout),Ae(document,"touchend touchcancel contextmenu",this._cancel,this),Ae(document,"touchmove",this._onMove,this)},_onMove:function(n){var r=n.touches[0];this._newPos=new Z(r.clientX,r.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(n,r){var h=new MouseEvent(n,{bubbles:!0,cancelable:!0,view:window,screenX:r.screenX,screenY:r.screenY,clientX:r.clientX,clientY:r.clientY});h._simulated=!0,r.target.dispatchEvent(h)}});me.addInitHook("addHandler","tapHold",ch),me.mergeOptions({touchZoom:Yt.touch,bounceAtZoomLimits:!0});var hh=zn.extend({addHooks:function(){Kt(this._map._container,"leaflet-touch-zoom"),oe(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){Ee(this._map._container,"leaflet-touch-zoom"),Ae(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(n){var r=this._map;if(!(!n.touches||n.touches.length!==2||r._animatingZoom||this._zooming)){var h=r.mouseEventToContainerPoint(n.touches[0]),f=r.mouseEventToContainerPoint(n.touches[1]);this._centerPoint=r.getSize()._divideBy(2),this._startLatLng=r.containerPointToLatLng(this._centerPoint),r.options.touchZoom!=="center"&&(this._pinchStartLatLng=r.containerPointToLatLng(h.add(f)._divideBy(2))),this._startDist=h.distanceTo(f),this._startZoom=r.getZoom(),this._moved=!1,this._zooming=!0,r._stop(),oe(document,"touchmove",this._onTouchMove,this),oe(document,"touchend touchcancel",this._onTouchEnd,this),Xe(n)}},_onTouchMove:function(n){if(!(!n.touches||n.touches.length!==2||!this._zooming)){var r=this._map,h=r.mouseEventToContainerPoint(n.touches[0]),f=r.mouseEventToContainerPoint(n.touches[1]),y=h.distanceTo(f)/this._startDist;if(this._zoom=r.getScaleZoom(y,this._startZoom),!r.options.bounceAtZoomLimits&&(this._zoom<r.getMinZoom()&&y<1||this._zoom>r.getMaxZoom()&&y>1)&&(this._zoom=r._limitZoom(this._zoom)),r.options.touchZoom==="center"){if(this._center=this._startLatLng,y===1)return}else{var C=h._add(f)._divideBy(2)._subtract(this._centerPoint);if(y===1&&C.x===0&&C.y===0)return;this._center=r.unproject(r.project(this._pinchStartLatLng,this._zoom).subtract(C),this._zoom)}this._moved||(r._moveStart(!0,!1),this._moved=!0),G(this._animRequest);var B=l(r._move,r,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=z(B,this,!0),Xe(n)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,G(this._animRequest),Ae(document,"touchmove",this._onTouchMove,this),Ae(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});me.addInitHook("addHandler","touchZoom",hh),me.BoxZoom=sh,me.DoubleClickZoom=oh,me.Drag=rh,me.Keyboard=ah,me.ScrollWheelZoom=lh,me.TapHold=ch,me.TouchZoom=hh,e.Bounds=gt,e.Browser=Yt,e.CRS=vt,e.Canvas=th,e.Circle=fa,e.CircleMarker=Bo,e.Class=F,e.Control=En,e.DivIcon=jc,e.DivOverlay=kn,e.DomEvent=Fd,e.DomUtil=zd,e.Draggable=fi,e.Evented=ct,e.FeatureGroup=qn,e.GeoJSON=$n,e.GridLayer=io,e.Handler=zn,e.Icon=ss,e.ImageOverlay=Zo,e.LatLng=rt,e.LatLngBounds=Dt,e.Layer=bn,e.LayerGroup=is,e.LineUtil=Jd,e.Map=me,e.Marker=Fo,e.Mixin=Xd,e.Path=pi,e.Point=Z,e.PolyUtil=qd,e.Polygon=os,e.Polyline=Yn,e.Popup=Xo,e.PosAnimation=Dc,e.Projection=Qd,e.Rectangle=ih,e.Renderer=Kn,e.SVG=oo,e.SVGOverlay=Kc,e.TileLayer=as,e.Tooltip=qo,e.Transformation=Mt,e.Util=H,e.VideoOverlay=$c,e.bind=l,e.bounds=It,e.canvas=eh,e.circle=lf,e.circleMarker=af,e.control=to,e.divIcon=gf,e.extend=o,e.featureGroup=sf,e.geoJSON=Yc,e.geoJson=uf,e.gridLayer=vf,e.icon=of,e.imageOverlay=df,e.latLng=pt,e.latLngBounds=Q,e.layerGroup=nf,e.map=Bd,e.marker=rf,e.point=st,e.polygon=hf,e.polyline=cf,e.popup=mf,e.rectangle=Mf,e.setOptions=w,e.stamp=u,e.svg=nh,e.svgOverlay=pf,e.tileLayer=Jc,e.tooltip=_f,e.transformation=J,e.version=i,e.videoOverlay=ff;var wf=window.L;e.noConflict=function(){return window.L=wf,this},window.L=e}))})(Mo,Mo.exports)),Mo.exports}var uy=hy();const We=ly(uy);class dy{constructor(t,e,i=null,o={}){this.mission=e,this.presetRouteHint=i,this.routeLayer=null,this.routeVisible=!1,this.routeCoordsLatLon=null,this.busMarkers=[];const a=o.homeXZ?Si(o.homeXZ.x,o.homeXZ.z):{lat:e.start.lat,lon:e.start.lon};if(this.map=We.map(t,{center:[a.lat,a.lon],zoom:17,zoomControl:!1,attributionControl:!1,dragging:!1,scrollWheelZoom:!1,doubleClickZoom:!1,boxZoom:!1,keyboard:!1}),We.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap contributors"}).addTo(this.map),this.homeMarker=null,o.homeXZ){const l=Si(o.homeXZ.x,o.homeXZ.z);this.homeMarker=We.marker([l.lat,l.lon],{icon:We.divIcon({className:"landmark-pin-wrap",html:'<div class="landmark-pin home" title="Your House">🏠</div>',iconSize:[26,26],iconAnchor:[13,13]})}).addTo(this.map)}We.marker([e.start.lat,e.start.lon],{icon:We.divIcon({className:"landmark-pin-wrap",html:'<div class="landmark-pin start" title="Westdale Library">📚</div>',iconSize:[26,26],iconAnchor:[13,13]})}).addTo(this.map);for(const l of o.busStops||[]){const c=Si(l.x,l.z);We.marker([c.lat,c.lon],{icon:We.divIcon({className:"landmark-pin-wrap",html:`<div class="landmark-pin busstop" title="${l.name}">🚏</div>`,iconSize:[22,22],iconAnchor:[11,11]})}).addTo(this.map)}We.marker([e.destination.lat,e.destination.lon],{icon:We.divIcon({className:"landmark-pin-wrap",html:'<div class="landmark-pin school" title="Cootes Paradise Elementary School">🏫</div>',iconSize:[26,26],iconAnchor:[13,13]})}).addTo(this.map),this.playerMarker=We.marker([a.lat,a.lon],{zIndexOffset:1e3,icon:We.divIcon({className:"player-arrow-wrapper",html:`
          <svg id="minimap-player-arrow" class="player-arrow-svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="rgba(37, 99, 235, 0.22)" />
            <polygon points="16,3 25,26 16,21 7,26" fill="#2563eb" stroke="#ffffff" stroke-width="2.2" stroke-linejoin="round" />
          </svg>
        `,iconSize:[28,28],iconAnchor:[14,14]})}).addTo(this.map),i?.coordinates?.length&&(this.routeCoordsLatLon=i.coordinates.map(([l,c])=>[c,l]))}updatePlayer(t,e,i){const{lat:o,lon:a}=Si(t,e);this.playerMarker.setLatLng([o,a]),this.map.setView([o,a],this.map.getZoom(),{animate:!1});const l=document.getElementById("minimap-player-arrow");l&&(l.style.transform=`rotate(${i.toFixed(1)}deg)`)}setHomeLocation(t,e=null){const i=Si(t.x,t.z);this.homeMarker?this.homeMarker.setLatLng([i.lat,i.lon]):this.homeMarker=We.marker([i.lat,i.lon],{icon:We.divIcon({className:"landmark-pin-wrap",html:'<div class="landmark-pin home" title="Your House">🏠</div>',iconSize:[26,26],iconAnchor:[13,13]})}).addTo(this.map),this.mission.start={...this.mission.start,lat:i.lat,lon:i.lon},this.routeCoordsLatLon=e?.coordinates?.length?e.coordinates.map(([o,a])=>[a,o]):null,this.routeVisible&&this.routeLayer&&(this.map.removeLayer(this.routeLayer),this.routeLayer=null,this.routeCoordsLatLon&&(this.routeLayer=We.polyline(this.routeCoordsLatLon,{color:"#2563eb",weight:5,opacity:.85,dashArray:"8, 8"}).addTo(this.map)))}updateBuses(t){for(;this.busMarkers.length<t.length;){const e=We.marker([this.mission.start.lat,this.mission.start.lon],{zIndexOffset:600,icon:We.divIcon({className:"landmark-pin-wrap",html:'<div class="landmark-pin bus" title="School Bus">🚌</div>',iconSize:[22,22],iconAnchor:[11,11]})}).addTo(this.map);this.busMarkers.push(e)}t.forEach((e,i)=>{const o=Si(e.x,e.z);this.busMarkers[i].setLatLng([o.lat,o.lon])})}async toggleRouteHint(){if(this.routeVisible=!this.routeVisible,!this.routeVisible)return this.routeLayer&&(this.map.removeLayer(this.routeLayer),this.routeLayer=null),!1;if(!this.routeCoordsLatLon)try{const t=this.mission.start,e=this.mission.destination,i=`https://router.project-osrm.org/route/v1/foot/${t.lon},${t.lat};${e.lon},${e.lat}?overview=full&geometries=geojson`,o=await fetch(i);if(o.ok){const l=(await o.json()).routes?.[0]?.geometry?.coordinates;l?.length&&(this.routeCoordsLatLon=l.map(([c,u])=>[u,c]))}}catch{this.routeCoordsLatLon=[[this.mission.start.lat,this.mission.start.lon],[this.mission.destination.lat,this.mission.destination.lon]]}return this.routeCoordsLatLon&&(this.routeLayer=We.polyline(this.routeCoordsLatLon,{color:"#2563eb",weight:5,opacity:.85,dashArray:"8, 8"}).addTo(this.map)),!0}}const fy=document.getElementById("canvas-container"),py=document.getElementById("distance-pill"),Ke=document.getElementById("zone-pill"),my=document.getElementById("stars-row"),nl=document.getElementById("points-pill"),Hi=document.getElementById("look-check-badge"),_y=document.getElementById("compass-readout"),Du=document.getElementById("feedback-banner"),gy=document.getElementById("feedback-icon"),vy=document.getElementById("feedback-text"),il=document.getElementById("btn-route-hint"),Nu=document.getElementById("btn-camera-view"),xy=document.getElementById("btn-police-escort"),yy=document.getElementById("btn-pause"),mo=document.getElementById("look-warning-hud"),Uu=document.getElementById("look-warning-title"),Ou=document.getElementById("look-warning-sub"),Fn=document.getElementById("vehicle-interior"),zu=document.getElementById("cabin-led-sign"),ku=document.getElementById("dash-speed-val"),Fu=document.getElementById("dash-screen"),Vi=document.getElementById("btn-start"),My=document.getElementById("btn-play-again"),Bu=document.getElementById("overlay-start"),Hu=document.getElementById("overlay-title"),sl=document.getElementById("overlay-victory"),Sy=document.getElementById("victory-stars"),ol=document.getElementById("victory-message"),wy=document.getElementById("victory-stats"),Ar=document.getElementById("overlay-gameover"),Ey=document.getElementById("gameover-reason"),by=document.getElementById("btn-try-again"),Gi=document.getElementById("sidewalk-warning"),Ty=document.getElementById("sidewalk-countdown"),Ay=document.getElementById("sidewalk-bar-fill"),rl=document.getElementById("police-banner"),Cy=document.getElementById("police-banner-sub"),Cr=document.getElementById("traffic-light-hud"),al=document.getElementById("traffic-light-title"),ll=document.getElementById("traffic-light-sub"),Pn=document.getElementById("bus-prompt"),_o=document.getElementById("npc-prompt"),Pr=document.getElementById("npc-dialog"),Py=document.getElementById("npc-dialog-name"),Ly=document.getElementById("npc-dialog-role"),Ry=document.getElementById("npc-dialog-text"),ii=document.getElementById("loading-status"),go=document.getElementById("home-address-input"),vo=document.getElementById("btn-search-address"),Ls=document.getElementById("address-results"),Vu=document.getElementById("selected-home-label"),Gu=document.getElementById("mission-title"),cl=document.querySelectorAll(".chip-btn");let hl=null;function Wi({type:s="info",icon:t="🌟",text:e}){Du.className=`feedback-banner ${s}`,gy.textContent=t,vy.textContent=e,hl&&clearTimeout(hl),hl=setTimeout(()=>{Du.classList.add("hidden")},4200)}function ul(s){my.querySelectorAll(".star").forEach((e,i)=>{i<s?(e.classList.add("active"),e.classList.remove("lost")):(e.classList.remove("active"),e.classList.add("lost"))})}function Iy(s,t){s==="road_lane"?(Ke.className="pill pill-red",Ke.textContent=`🚧 Road Lane (${t})`):s==="grass"?(Ke.className="pill pill-green",Ke.textContent="🌿 Safe Grass / Park"):s==="crosswalk_signalized"?(Ke.className="pill pill-amber",Ke.textContent="🚦 Signalized Crosswalk"):s==="crosswalk_unsignalized"?(Ke.className="pill pill-amber",Ke.textContent=`👀 Crosswalk (${t})`):s==="sidewalk"?(Ke.className="pill pill-green",Ke.textContent=`✅ Safe Sidewalk (${t})`):(Ke.className="pill pill-green",Ke.textContent=`🌳 ${t}`)}function Wu(s,t){const e=Br(s.lat,s.lon);let i=null,o=null;for(const a of t.roads)if(/king street/i.test(a.name))for(let l=0;l<a.points.length-1;l++){const c=a.points[l],u=a.points[l+1],d=ci(e.x,e.z,c.x,c.z,u.x,u.z);(!i||d.dist<i.dist)&&(i={...d,ax:c.x,az:c.z,bx:u.x,bz:u.z},o=a)}if(i&&o){const a=i.bx-i.ax,l=i.bz-i.az,c=Math.hypot(a,l)||1;let u=-l/c,d=a/c;d>0&&(u=-u,d=-d);const m=o.width/2+o.sidewalkWidth*.5;return{x:i.x+u*m,z:i.z+d*m,headingDeg:68}}return{x:e.x,z:e.z,headingDeg:68}}async function Dy(){Vi.disabled=!0;const s=new D0;s.background=new pe(8900331),s.fog=new gc(12248829,180,520);const t=new yn(68,window.innerWidth/window.innerHeight,.1,700),e=new I0({antialias:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.shadowMap.enabled=!0,e.shadowMap.type=Xu,fy.appendChild(e.domElement);const i=new px(14742270,8843180,.9);s.add(i);const o=new gx(16776171,1.15);o.position.set(120,180,90),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),o.shadow.camera.near=20,o.shadow.camera.far=500;const a=220;o.shadow.camera.left=-a,o.shadow.camera.right=a,o.shadow.camera.top=a,o.shadow.camera.bottom=-a,s.add(o);const l=new _t(new In(2400,2400),new $t({color:10216091,roughness:.96}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,s.add(l);const c=performance.now(),u=await Ex(),d=sc(u.osm.elements),m=Math.round(performance.now()-c);ii.textContent=`Westdale loaded in ${m}ms (${d.roads.length} streets, ${d.buildings.length} buildings)`;const p=new qx(s);p.loadPresetParsed(d);const g=Br(u.mission.destination.lat,u.mission.destination.lon,ri),v=Vx(g.x,g.z);s.add(v);const M=Gx(g,d);s.add(M.group);let w=el(d);s.add(w.group);const x=Wx(d,g);s.add(x.group);const _=new $x(s,d,x.stops),b=new jx(s,d);let E=d,S=w.startPose||Wu(u.mission.start,d);const U=new oy(t,e.domElement);U.setPose(S.x,S.z,S.headingDeg),p.update(S.x,S.z);let N=[...M.paths,...w.paths];const D=new ay(E,g,Wi,N),O=new dy("minimap",u.mission,u.routeHint,{homeXZ:w.homePos,busStops:x.stops});O.updatePlayer(S.x,S.z,S.headingDeg);function P(lt,Mt){const J=(ut,k)=>{const Rt=new Set(ut.map(Et=>Et.id)),ht=[...ut];for(const Et of k)Rt.has(Et.id)||(ht.push(Et),Rt.add(Et.id));return ht};return{roads:J(lt.roads,Mt.roads),footways:J(lt.footways,Mt.footways),buildings:J(lt.buildings,Mt.buildings),parks:J(lt.parks,Mt.parks),intersections:J(lt.intersections,Mt.intersections),crosswalks:J(lt.crosswalks,Mt.crosswalks),signalNodes:J(lt.signalNodes,Mt.signalNodes),stopSigns:J(lt.stopSigns||[],Mt.stopSigns||[])}}async function T({lat:lt,lon:Mt,label:J,isDefaultMarion:ut=!1}){Vi.disabled=!0,Ls.classList.add("hidden"),ii.textContent=`Loading neighborhood for ${J}...`;try{w?.group&&(s.remove(w.group),oc(w.group));let k=u.routeHint;if(ut)w=el(E),Vu.innerHTML="Selected Home: <strong>Marion Ave N, Westdale</strong>",Gu.textContent="From Your House to Cootes Paradise Elementary";else{const ht=Br(lt,Mt,ri);if(Ie(ht.x,ht.z,0,0)>360){const wt=await Tx(lt,Mt,350),Nt=sc(wt.elements||[]);E=P(E,Nt),p.addParsedData(Nt)}w=el(E,ht,J),k=await Cx(lt,Mt,ri.lat,ri.lon),Vu.innerHTML=`Selected Home: <strong>${J}</strong>`,Gu.textContent=`From ${J} to Cootes Paradise Elementary`}s.add(w.group),S=w.startPose||Wu(u.mission.start,E),N=[...M.paths,...w.paths],D.setWorldData(E,N),D.reset(),ul(3),nl.textContent=`🏆 ${D.points} pts`,H&&(H.mesh.visible=!0),H=null,Fn.classList.add("hidden"),U.setPose(S.x,S.z,S.headingDeg),l.position.set(S.x,0,S.z),p.update(S.x,S.z),w.homePos&&O.setHomeLocation(w.homePos,k),O.updatePlayer(S.x,S.z,S.headingDeg);const Rt=Math.round(Ie(S.x,S.z,g.x,g.z));ii.textContent=`Ready! ${Rt>=1e3?`${(Rt/1e3).toFixed(1)} km`:`${Rt} m`} to Cootes Paradise Elementary School.`}catch(k){ii.textContent=`Could not load that address (${k.message}). Try another address!`}finally{Vi.disabled=!1}}async function z(){const lt=go.value.trim();if(lt){vo.disabled=!0,vo.textContent="...",Ls.innerHTML="",Ls.classList.add("hidden"),ii.textContent=`Searching "${lt}" on OpenStreetMap...`;try{const Mt=await Ax(lt);if(Mt.length===0)ii.textContent=`No results found for "${lt}". Try adding a street name or city!`;else{ii.textContent="Pick your home address below:",Ls.innerHTML="";for(const J of Mt){const ut=document.createElement("button");ut.type="button",ut.className="address-result-item",ut.textContent=`📍 ${J.displayName}`,ut.addEventListener("click",()=>{cl.forEach(k=>k.classList.remove("active")),go.value=J.shortName,T({lat:J.lat,lon:J.lon,label:J.shortName})}),Ls.appendChild(ut)}Ls.classList.remove("hidden")}}catch(Mt){ii.textContent=`Search failed: ${Mt.message}`}finally{vo.disabled=!1,vo.textContent="Search"}}}vo.addEventListener("click",z),go.addEventListener("keydown",lt=>{lt.key==="Enter"&&(lt.preventDefault(),z())}),cl.forEach(lt=>{lt.addEventListener("click",()=>{if(cl.forEach(Mt=>Mt.classList.remove("active")),lt.classList.add("active"),lt.dataset.preset==="marion")go.value="",T({isDefaultMarion:!0,label:"Marion Ave N, Westdale"});else{const Mt=Number.parseFloat(lt.dataset.lat),J=Number.parseFloat(lt.dataset.lon),ut=lt.dataset.label||lt.textContent.trim();go.value=ut,T({lat:Mt,lon:J,label:ut})}})});let G=!1,H=null,F=null;const j=Zx();j.visible=!1,s.add(j);const Y=Xx();Y.visible=!1,s.add(Y);function ct(){const lt=U.toggleViewMode();Nu.textContent=lt==="third"?"👁️ 1st Person View (V)":"👁️ 3rd Person View (V)",Wi({type:"info",icon:"👁️",text:lt==="third"?"Switched to Third-Person View!":"Switched to First-Person View!"})}function Z(lt){if(!G||F||D.arrived||D.gameOver)return;H&&(H.mesh.visible=!0,H=null),Gi.classList.add("hidden"),Pn.classList.add("hidden"),Fn.classList.add("hidden");const Mt=U.position.x,J=U.position.z;F={phase:"approach",t:0,duration:1.5,fromX:Mt+18,fromZ:J+10,toX:Mt,toZ:J,homeX:S.x,homeZ:S.z},j.visible=!0,j.position.set(F.fromX,.08,F.fromZ),Cy.textContent=lt,rl.classList.remove("hidden"),Wi({type:"info",icon:"🚓",text:"Police Escort on the way! Hang tight for a safe ride home!"})}function xt(){if(!(!G||F||D.arrived||D.gameOver))if(H){const lt=_.getSafeExitPoint(H);H.mesh.visible=!0,H=null,Fn.classList.add("hidden"),U.setPose(lt.x,lt.z,U.getHeadingDeg()),Wi({type:"success",icon:"🚌",text:`Hopped off safely at ${lt.stopName}!`})}else{const lt=_.getNearbyBus(U.position);if(lt){H=lt,H.mesh.visible=!1;const Mt=ic(H.dirX,H.dirZ);U.setPose(H.x,H.z,Mt),D.offSidewalkSec=0,D.wasOffSidewalk=!1,Wi({type:"success",icon:"🚌",text:"All aboard the School Bus! Look out the windshield and press F to get off at a stop!"})}}}let st=null,gt=null;function It(){if(!G||H||F||D.arrived||D.gameOver)return;const lt=b.getNearbyNpc(U.position);if(!lt)return;const Mt=b.getRandomLine(lt);st=lt.id,Py.textContent=`${lt.emoji} ${lt.name}`,Ly.textContent=lt.role,Ry.textContent=`"${Mt}"`,Pr.classList.remove("hidden"),gt&&clearTimeout(gt),gt=setTimeout(()=>{Pr.classList.add("hidden"),st=null},6500)}window.addEventListener("keydown",lt=>{document.activeElement?.tagName!=="INPUT"&&(lt.code==="KeyF"&&xt(),lt.code==="KeyT"&&It(),lt.code==="KeyV"&&ct(),lt.code==="KeyP"&&Z("You requested a friendly Police Escort back to Your House!"))}),Pn.addEventListener("click",xt),_o.addEventListener("click",It),Nu.addEventListener("click",ct),xy.addEventListener("click",()=>Z("You requested a friendly Police Escort back to Your House!")),window.__WESTDALE_GAME__={player:U,safety:D,trafficSystem:_,miniMap:O,parsed:d,startPose:S,destXZ:g,busStops:x.stops,toggleBusRide:xt,setPlayerPose:(lt,Mt,J)=>{U.setPose(lt,Mt,J),p.update(lt,Mt),O.updatePlayer(lt,Mt,U.getHeadingDeg())}};function Dt(){G=!0,Bu.classList.add("hidden"),sl.classList.add("hidden"),Ar.classList.add("hidden"),Gi.classList.add("hidden"),U.lock(),Wi({type:"info",icon:"🏠",text:"Walk down Marion Ave to King St W — walk on the sidewalks or press F to ride the Yellow School Bus!"})}function Q(){!G||D.arrived||D.gameOver||(G=!1,Hu.textContent="Walk Paused",Vi.textContent="Resume Walking",Bu.classList.remove("hidden"))}function rt(){H&&(H.mesh.visible=!0),H=null,F=null,j.visible=!1,rl.classList.add("hidden"),Fn.classList.add("hidden"),D.reset(),ul(3),nl.textContent=`🏆 ${D.points} pts`,Gi.classList.add("hidden"),Pn.classList.add("hidden"),Ar.classList.add("hidden"),U.setPose(S.x,S.z,S.headingDeg),p.update(S.x,S.z),O.updatePlayer(S.x,S.z,S.headingDeg),Hu.textContent="Westdale Safe Walk",Vi.textContent="Start Walking!",Dt()}function pt(lt){G=!1,H&&(H.mesh.visible=!0),H=null,Fn.classList.add("hidden"),U.unlock(),Gi.classList.add("hidden"),Ey.textContent=lt||"You stayed in the road lane for more than 5 seconds. Always walk on the sidewalk and cross only at white zebra crosswalks!",Ar.classList.remove("hidden")}function vt(lt){G=!1,H&&(H.mesh.visible=!0),H=null,Fn.classList.add("hidden"),U.unlock(),Gi.classList.add("hidden");const Mt=D.stars;Sy.textContent="★".repeat(Mt)+"☆".repeat(3-Mt),Mt===3?ol.textContent=`Amazing job! You earned ${D.points} Safety Points and all 3 Stars!`:Mt===2?ol.textContent=`Great walk! You earned ${D.points} Safety Points — keep practicing those crosswalk checks!`:ol.textContent=`You made it to school with ${D.points} Safety Points! Try again for an even higher score!`,wy.innerHTML=`
      <div class="stat-box"><div class="stat-value">${D.points}</div><div class="stat-label">Safety Pts</div></div>
      <div class="stat-box"><div class="stat-value">${lt||0}s</div><div class="stat-label">Walk Time</div></div>
      <div class="stat-box"><div class="stat-value">${D.safeCrossings}</div><div class="stat-label">Safe Crossings</div></div>
    `,sl.classList.remove("hidden")}Vi.disabled=!1,Vi.addEventListener("click",Dt),yy.addEventListener("click",()=>{U.unlock(),Q()}),My.addEventListener("click",rt),by.addEventListener("click",rt),il.addEventListener("click",async()=>{const lt=await O.toggleRouteHint();il.textContent=lt?"🗺️ Hide Route Hint":"🗺️ Show Route Hint",il.classList.toggle("active",lt)}),U.controls.addEventListener("unlock",()=>{G&&!D.arrived&&!D.gameOver&&Q()}),window.addEventListener("resize",()=>{t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight)});let Bt=performance.now();function jt(lt){requestAnimationFrame(jt);const Mt=Math.min(.05,(lt-Bt)/1e3);Bt=lt;const J=v.getObjectByName("beaconCrystal");J&&(J.rotation.y+=Mt*1.4,J.position.y=3.2+Math.sin(lt*.003)*.35);const ut=p.getActiveBuildings();if(!H&&!F&&U.update(Mt,ut,G),F){F.t+=Mt;const I=Math.floor(lt/180)%2===0;j.userData.redLightMat.color.setHex(I?16720418:4524554),j.userData.blueLightMat.color.setHex(I?663109:3900150);const A=Math.min(1,F.t/F.duration),$=A*A*(3-2*A),ot=F.fromX+(F.toX-F.fromX)*$,dt=F.fromZ+(F.toZ-F.fromZ)*$,at=F.toX-F.fromX,Vt=F.toZ-F.fromZ;if(j.position.set(ot,.08,dt),j.rotation.y=Math.atan2(at,Vt),F.phase==="escort"){j.visible=!1;const Ct=ic(at,Vt);U.setPose(ot,dt,Ct),t.position.set(ot,1.45,dt)}A>=1&&(F.phase==="approach"?(F.phase="escort",F.t=0,F.duration=4.2,F.fromX=F.toX,F.fromZ=F.toZ,F.toX=F.homeX,F.toZ=F.homeZ):(F=null,j.visible=!1,rl.classList.add("hidden"),Fn.classList.add("hidden"),U.setPose(S.x,S.z,S.headingDeg),Wi({type:"success",icon:"🏠",text:"Police Car dropped you off safely at Your House!"})))}const k=H||F?null:U.position,Rt=D.update(U.position,U,_,Mt,G&&!H&&!F);if(_.update(Mt,k,!H&&!F&&Rt.inCrosswalk),H&&!F&&(U.position.set(H.x,1.5,H.z),t.position.set(H.x+H.dirX*1.1,2.05,H.z+H.dirZ*1.1)),F&&F.phase==="escort")Fn.className="vehicle-interior police",zu.textContent="🚓 HAMILTON SAFETY POLICE • ESCORTING HOME",ku.textContent="45",Fu.textContent="UNIT 104 • SAFE RIDE HOME";else if(H&&!F){Fn.className="vehicle-interior bus";const I=Math.round((H.currentSpeed||0)*3.6);ku.textContent=String(I),zu.textContent=H.atStopName?`🚌 STOPPED: ${H.atStopName.toUpperCase()}`:"🚌 SCHOOL BUS • KING ST W → COOTES PARADISE",Fu.textContent=I===0?"🛑 DOORS OPEN (PRESS F)":"🟢 NEXT STOP AHEAD"}else Fn.classList.add("hidden");const ht=U.position,Et=U.getHeadingDeg(),wt=U.viewMode==="third"&&!H&&!(F&&F.phase==="escort");if(Y.visible=wt,wt){Y.position.set(ht.x,.16,ht.z);const I=Et*Math.PI/180;Y.rotation.y=Math.atan2(Math.sin(I),-Math.cos(I));const A=U.isMoving?Math.sin(U.walkCycle)*.55:0,{leftLegPivot:$,rightLegPivot:ot,leftArmPivot:dt,rightArmPivot:at}=Y.userData;$.rotation.x=A,ot.rotation.x=-A,dt.rotation.x=-A*.75,at.rotation.x=A*.75}l.position.set(ht.x,0,ht.z),p.update(ht.x,ht.z),b.update(Mt,H||F?null:ht),_y.textContent=`${xx(Et)} ${Math.round(Et)}°`,O.updatePlayer(ht.x,ht.z,Et),O.updateBuses(_.getBuses());const Nt=Rt;if(py.textContent=`📍 ${Nt.distanceToGoal} m to school`,F?(Ke.className="pill pill-blue",Ke.textContent="🚓 Police Escort Home"):H?(Ke.className="pill pill-blue",Ke.textContent=H.atStopName?`🚌 Stopped: ${H.atStopName}`:"🚌 Riding School Bus"):Iy(Nt.zone,Nt.streetName),ul(Nt.stars),nl.textContent=`🏆 ${Nt.points} pts`,G&&!F&&!Nt.arrived&&!Nt.gameOver){H?(Pn.classList.remove("hidden"),Pn.classList.add("riding"),Pn.innerHTML=H.atStopName?`🚏 At ${H.atStopName} — Press <kbd>F</kbd> to Get Off!`:"🚌 Riding School Bus — Press <kbd>F</kbd> to Get Off at a Stop"):_.getNearbyBus(ht)?(Pn.classList.remove("hidden"),Pn.classList.remove("riding"),Pn.innerHTML="🚌 Press <kbd>F</kbd> to Board the School Bus!"):Pn.classList.add("hidden");const I=H?null:b.getNearbyNpc(ht);I?(_o.classList.remove("hidden"),_o.innerHTML=`💬 Press <kbd>T</kbd> to Talk to ${I.emoji} ${I.name}`):(_o.classList.add("hidden"),st&&(Pr.classList.add("hidden"),st=null))}else Pn.classList.add("hidden"),_o.classList.add("hidden"),Pr.classList.add("hidden");if(G&&!H&&!F&&Nt.offSidewalkSec>0&&!Nt.gameOver){const I=Math.max(0,rc-Nt.offSidewalkSec);Ty.textContent=`${I.toFixed(1)}s`,Ay.style.width=`${I/rc*100}%`,Gi.classList.remove("hidden")}else Gi.classList.add("hidden");if(G&&!H&&!F&&!Nt.arrived&&!Nt.gameOver){const I=_.getNearestSignalPrompt(ht);I?(Cr.className=`traffic-light-hud ${I.light}`,I.light==="green"?(al.textContent=`🟢 Light is GREEN — WALK! (${I.secondsLeft}s)`,ll.textContent=`Safe to cross ${I.roadName} on the white zebra stripes!`):I.light==="amber"?(al.textContent=`🟡 Light turning RED soon! (${I.secondsLeft}s)`,ll.textContent=`Wait for the next GREEN Walk light across ${I.roadName}!`):(al.textContent=`🔴 Light is RED — STOP! (${I.secondsLeft}s)`,ll.textContent=`Do NOT cross ${I.roadName} — crossing on red costs -30 pts!`)):Cr.classList.add("hidden")}else Cr.classList.add("hidden");const At=U.getLookStatus();if(At.lookedBoth?(Hi.textContent="👀 Looked Left & Right! ✅",Hi.classList.remove("hidden")):At.lookedLeft?(Hi.textContent="⬅️ Looked Left — Look Right too! ➡️",Hi.classList.remove("hidden")):At.lookedRight?(Hi.textContent="➡️ Looked Right — Look Left too! ⬅️",Hi.classList.remove("hidden")):Hi.classList.add("hidden"),G&&!H&&!F&&!Nt.arrived&&!Nt.gameOver){const I=D.getNearbyUnsignalizedCrosswalk(ht,14);if(I){const A=Cr.classList.contains("hidden");mo.style.top=A?"124px":"212px";const $=At.lookedLeft?"✅":"⬜",ot=At.lookedRight?"✅":"⬜";At.lookedBoth?(mo.className="look-warning-hud ready",Uu.textContent=`✅ Ready to Cross ${I.roadName}!`,Ou.textContent=`⬅️ Left: ${$}  •  ➡️ Right: ${ot}  (Both checked!)`):(mo.className="look-warning-hud",Uu.textContent=!At.lookedLeft&&!At.lookedRight?`⚠️ Stop at ${I.roadName} — Look BOTH Ways!`:At.lookedLeft?"⚠️ Almost Ready — Now Look RIGHT too!":"⚠️ Almost Ready — Now Look LEFT too!",Ou.textContent=`⬅️ Left: ${$}  •  ➡️ Right: ${ot}  (Use Mouse or Q / E)`)}else mo.classList.add("hidden")}else mo.classList.add("hidden");Nt.gameOver&&Ar.classList.contains("hidden")&&pt(Nt.gameOverReason),Nt.arrived&&sl.classList.contains("hidden")&&vt(Nt.elapsedSec),e.render(s,t)}requestAnimationFrame(jt)}Dy().catch(s=>{console.error("Initialization failed:",s),ii.textContent=`Error: ${s.message}`});
