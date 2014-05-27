/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
 as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2013
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
*/
'use strict';(function(S){function y(a,c,b){var g=0,f=[0],h="",l=null,h=b||"UTF8";if("UTF8"!==h&&"UTF16"!==h)throw"encoding must be UTF8 or UTF16";if("HEX"===c){if(0!==a.length%2)throw"srcString of HEX type must be in byte increments";l=C(a);g=l.binLen;f=l.value}else if("ASCII"===c||"TEXT"===c)l=L(a,h),g=l.binLen,f=l.value;else if("B64"===c)l=M(a),g=l.binLen,f=l.value;else throw"inputFormat must be HEX, TEXT, ASCII, or B64";this.getHash=function(a,c,b,h){var l=null,d=f.slice(),m=g,n;3===arguments.length?
"number"!==typeof b&&(h=b,b=1):2===arguments.length&&(b=1);if(b!==parseInt(b,10)||1>b)throw"numRounds must a integer >= 1";switch(c){case "HEX":l=N;break;case "B64":l=O;break;default:throw"format must be HEX or B64";}if("SHA-1"===a)for(n=0;n<b;n++)d=z(d,m),m=160;else if("SHA-224"===a)for(n=0;n<b;n++)d=w(d,m,a),m=224;else if("SHA-256"===a)for(n=0;n<b;n++)d=w(d,m,a),m=256;else if("SHA-384"===a)for(n=0;n<b;n++)d=w(d,m,a),m=384;else if("SHA-512"===a)for(n=0;n<b;n++)d=w(d,m,a),m=512;else throw"Chosen SHA variant is not supported";
return l(d,P(h))};this.getHMAC=function(a,b,c,l,u){var d,m,n,r,p=[],s=[];d=null;switch(l){case "HEX":l=N;break;case "B64":l=O;break;default:throw"outputFormat must be HEX or B64";}if("SHA-1"===c)m=64,r=160;else if("SHA-224"===c)m=64,r=224;else if("SHA-256"===c)m=64,r=256;else if("SHA-384"===c)m=128,r=384;else if("SHA-512"===c)m=128,r=512;else throw"Chosen SHA variant is not supported";if("HEX"===b)d=C(a),n=d.binLen,d=d.value;else if("ASCII"===b||"TEXT"===b)d=L(a,h),n=d.binLen,d=d.value;else if("B64"===
b)d=M(a),n=d.binLen,d=d.value;else throw"inputFormat must be HEX, TEXT, ASCII, or B64";a=8*m;b=m/4-1;m<n/8?(d="SHA-1"===c?z(d,n):w(d,n,c),d[b]&=4294967040):m>n/8&&(d[b]&=4294967040);for(m=0;m<=b;m+=1)p[m]=d[m]^909522486,s[m]=d[m]^1549556828;c="SHA-1"===c?z(s.concat(z(p.concat(f),a+g)),a+r):w(s.concat(w(p.concat(f),a+g,c)),a+r,c);return l(c,P(u))}}function u(a,c){this.a=a;this.b=c}function L(a,c){var b=[],g,f=[],h=0,l;if("UTF8"===c)for(l=0;l<a.length;l+=1)for(g=a.charCodeAt(l),f=[],2048<g?(f[0]=224|
(g&61440)>>>12,f[1]=128|(g&4032)>>>6,f[2]=128|g&63):128<g?(f[0]=192|(g&1984)>>>6,f[1]=128|g&63):f[0]=g,g=0;g<f.length;g+=1)b[h>>>2]|=f[g]<<24-h%4*8,h+=1;else if("UTF16"===c)for(l=0;l<a.length;l+=1)b[h>>>2]|=a.charCodeAt(l)<<16-h%4*8,h+=2;return{value:b,binLen:8*h}}function C(a){var c=[],b=a.length,g,f;if(0!==b%2)throw"String of HEX type must be in byte increments";for(g=0;g<b;g+=2){f=parseInt(a.substr(g,2),16);if(isNaN(f))throw"String of HEX type contains invalid characters";c[g>>>3]|=f<<24-g%8*4}return{value:c,
binLen:4*b}}function M(a){var c=[],b=0,g,f,h,l,t;if(-1===a.search(/^[a-zA-Z0-9=+\/]+$/))throw"Invalid character in base-64 string";g=a.indexOf("=");a=a.replace(/\=/g,"");if(-1!==g&&g<a.length)throw"Invalid '=' found in base-64 string";for(f=0;f<a.length;f+=4){t=a.substr(f,4);for(h=l=0;h<t.length;h+=1)g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t[h]),l|=g<<18-6*h;for(h=0;h<t.length-1;h+=1)c[b>>2]|=(l>>>16-8*h&255)<<24-b%4*8,b+=1}return{value:c,binLen:8*b}}function N(a,
c){var b="",g=4*a.length,f,h;for(f=0;f<g;f+=1)h=a[f>>>2]>>>8*(3-f%4),b+="0123456789abcdef".charAt(h>>>4&15)+"0123456789abcdef".charAt(h&15);return c.outputUpper?b.toUpperCase():b}function O(a,c){var b="",g=4*a.length,f,h,l;for(f=0;f<g;f+=3)for(l=(a[f>>>2]>>>8*(3-f%4)&255)<<16|(a[f+1>>>2]>>>8*(3-(f+1)%4)&255)<<8|a[f+2>>>2]>>>8*(3-(f+2)%4)&255,h=0;4>h;h+=1)b=8*f+6*h<=32*a.length?b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(l>>>6*(3-h)&63):b+c.b64Pad;return b}function P(a){var c=
{outputUpper:!1,b64Pad:"="};try{a.hasOwnProperty("outputUpper")&&(c.outputUpper=a.outputUpper),a.hasOwnProperty("b64Pad")&&(c.b64Pad=a.b64Pad)}catch(b){}if("boolean"!==typeof c.outputUpper)throw"Invalid outputUpper formatting option";if("string"!==typeof c.b64Pad)throw"Invalid b64Pad formatting option";return c}function x(a,c){return a<<c|a>>>32-c}function p(a,c){return a>>>c|a<<32-c}function s(a,c){var b=null,b=new u(a.a,a.b);return b=32>=c?new u(b.a>>>c|b.b<<32-c&4294967295,b.b>>>c|b.a<<32-c&4294967295):
new u(b.b>>>c-32|b.a<<64-c&4294967295,b.a>>>c-32|b.b<<64-c&4294967295)}function Q(a,c){var b=null;return b=32>=c?new u(a.a>>>c,a.b>>>c|a.a<<32-c&4294967295):new u(0,a.a>>>c-32)}function T(a,c,b){return a&c^~a&b}function U(a,c,b){return new u(a.a&c.a^~a.a&b.a,a.b&c.b^~a.b&b.b)}function R(a,c,b){return a&c^a&b^c&b}function V(a,c,b){return new u(a.a&c.a^a.a&b.a^c.a&b.a,a.b&c.b^a.b&b.b^c.b&b.b)}function W(a){return p(a,2)^p(a,13)^p(a,22)}function X(a){var c=s(a,28),b=s(a,34);a=s(a,39);return new u(c.a^
b.a^a.a,c.b^b.b^a.b)}function Y(a){return p(a,6)^p(a,11)^p(a,25)}function Z(a){var c=s(a,14),b=s(a,18);a=s(a,41);return new u(c.a^b.a^a.a,c.b^b.b^a.b)}function $(a){return p(a,7)^p(a,18)^a>>>3}function aa(a){var c=s(a,1),b=s(a,8);a=Q(a,7);return new u(c.a^b.a^a.a,c.b^b.b^a.b)}function ba(a){return p(a,17)^p(a,19)^a>>>10}function ca(a){var c=s(a,19),b=s(a,61);a=Q(a,6);return new u(c.a^b.a^a.a,c.b^b.b^a.b)}function A(a,c){var b=(a&65535)+(c&65535);return((a>>>16)+(c>>>16)+(b>>>16)&65535)<<16|b&65535}
function da(a,c,b,g){var f=(a&65535)+(c&65535)+(b&65535)+(g&65535);return((a>>>16)+(c>>>16)+(b>>>16)+(g>>>16)+(f>>>16)&65535)<<16|f&65535}function D(a,c,b,g,f){var h=(a&65535)+(c&65535)+(b&65535)+(g&65535)+(f&65535);return((a>>>16)+(c>>>16)+(b>>>16)+(g>>>16)+(f>>>16)+(h>>>16)&65535)<<16|h&65535}function ea(a,c){var b,g,f;b=(a.b&65535)+(c.b&65535);g=(a.b>>>16)+(c.b>>>16)+(b>>>16);f=(g&65535)<<16|b&65535;b=(a.a&65535)+(c.a&65535)+(g>>>16);g=(a.a>>>16)+(c.a>>>16)+(b>>>16);return new u((g&65535)<<16|
b&65535,f)}function fa(a,c,b,g){var f,h,l;f=(a.b&65535)+(c.b&65535)+(b.b&65535)+(g.b&65535);h=(a.b>>>16)+(c.b>>>16)+(b.b>>>16)+(g.b>>>16)+(f>>>16);l=(h&65535)<<16|f&65535;f=(a.a&65535)+(c.a&65535)+(b.a&65535)+(g.a&65535)+(h>>>16);h=(a.a>>>16)+(c.a>>>16)+(b.a>>>16)+(g.a>>>16)+(f>>>16);return new u((h&65535)<<16|f&65535,l)}function ga(a,c,b,g,f){var h,l,t;h=(a.b&65535)+(c.b&65535)+(b.b&65535)+(g.b&65535)+(f.b&65535);l=(a.b>>>16)+(c.b>>>16)+(b.b>>>16)+(g.b>>>16)+(f.b>>>16)+(h>>>16);t=(l&65535)<<16|h&
65535;h=(a.a&65535)+(c.a&65535)+(b.a&65535)+(g.a&65535)+(f.a&65535)+(l>>>16);l=(a.a>>>16)+(c.a>>>16)+(b.a>>>16)+(g.a>>>16)+(f.a>>>16)+(h>>>16);return new u((l&65535)<<16|h&65535,t)}function z(a,c){var b=[],g,f,h,l,t,u,p,q,s,d=[1732584193,4023233417,2562383102,271733878,3285377520];a[c>>>5]|=128<<24-c%32;a[(c+65>>>9<<4)+15]=c;s=a.length;for(p=0;p<s;p+=16){g=d[0];f=d[1];h=d[2];l=d[3];t=d[4];for(q=0;80>q;q+=1)b[q]=16>q?a[q+p]:x(b[q-3]^b[q-8]^b[q-14]^b[q-16],1),u=20>q?D(x(g,5),f&h^~f&l,t,1518500249,b[q]):
40>q?D(x(g,5),f^h^l,t,1859775393,b[q]):60>q?D(x(g,5),R(f,h,l),t,2400959708,b[q]):D(x(g,5),f^h^l,t,3395469782,b[q]),t=l,l=h,h=x(f,30),f=g,g=u;d[0]=A(g,d[0]);d[1]=A(f,d[1]);d[2]=A(h,d[2]);d[3]=A(l,d[3]);d[4]=A(t,d[4])}return d}function w(a,c,b){var g,f,h,l,t,p,s,q,w,d,m,n,r,x,y,v,z,E,F,G,H,I,J,K,e,B=[],C,k=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,
264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];d=[3238371032,
914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428];f=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];if("SHA-224"===b||"SHA-256"===b)m=64,g=(c+65>>>9<<4)+15,x=16,y=1,e=Number,v=A,z=da,E=D,F=$,G=ba,H=W,I=Y,K=R,J=T,d="SHA-224"===b?d:f;else if("SHA-384"===b||"SHA-512"===b)m=80,g=(c+128>>>10<<5)+31,x=32,y=2,e=u,v=ea,z=fa,E=ga,F=aa,G=ca,H=X,I=Z,K=V,J=U,k=[new e(k[0],3609767458),new e(k[1],602891725),new e(k[2],3964484399),new e(k[3],2173295548),
new e(k[4],4081628472),new e(k[5],3053834265),new e(k[6],2937671579),new e(k[7],3664609560),new e(k[8],2734883394),new e(k[9],1164996542),new e(k[10],1323610764),new e(k[11],3590304994),new e(k[12],4068182383),new e(k[13],991336113),new e(k[14],633803317),new e(k[15],3479774868),new e(k[16],2666613458),new e(k[17],944711139),new e(k[18],2341262773),new e(k[19],2007800933),new e(k[20],1495990901),new e(k[21],1856431235),new e(k[22],3175218132),new e(k[23],2198950837),new e(k[24],3999719339),new e(k[25],
766784016),new e(k[26],2566594879),new e(k[27],3203337956),new e(k[28],1034457026),new e(k[29],2466948901),new e(k[30],3758326383),new e(k[31],168717936),new e(k[32],1188179964),new e(k[33],1546045734),new e(k[34],1522805485),new e(k[35],2643833823),new e(k[36],2343527390),new e(k[37],1014477480),new e(k[38],1206759142),new e(k[39],344077627),new e(k[40],1290863460),new e(k[41],3158454273),new e(k[42],3505952657),new e(k[43],106217008),new e(k[44],3606008344),new e(k[45],1432725776),new e(k[46],1467031594),
new e(k[47],851169720),new e(k[48],3100823752),new e(k[49],1363258195),new e(k[50],3750685593),new e(k[51],3785050280),new e(k[52],3318307427),new e(k[53],3812723403),new e(k[54],2003034995),new e(k[55],3602036899),new e(k[56],1575990012),new e(k[57],1125592928),new e(k[58],2716904306),new e(k[59],442776044),new e(k[60],593698344),new e(k[61],3733110249),new e(k[62],2999351573),new e(k[63],3815920427),new e(3391569614,3928383900),new e(3515267271,566280711),new e(3940187606,3454069534),new e(4118630271,
4000239992),new e(116418474,1914138554),new e(174292421,2731055270),new e(289380356,3203993006),new e(460393269,320620315),new e(685471733,587496836),new e(852142971,1086792851),new e(1017036298,365543100),new e(1126000580,2618297676),new e(1288033470,3409855158),new e(1501505948,4234509866),new e(1607167915,987167468),new e(1816402316,1246189591)],d="SHA-384"===b?[new e(3418070365,d[0]),new e(1654270250,d[1]),new e(2438529370,d[2]),new e(355462360,d[3]),new e(1731405415,d[4]),new e(41048885895,d[5]),
new e(3675008525,d[6]),new e(1203062813,d[7])]:[new e(f[0],4089235720),new e(f[1],2227873595),new e(f[2],4271175723),new e(f[3],1595750129),new e(f[4],2917565137),new e(f[5],725511199),new e(f[6],4215389547),new e(f[7],327033209)];else throw"Unexpected error in SHA-2 implementation";a[c>>>5]|=128<<24-c%32;a[g]=c;C=a.length;for(n=0;n<C;n+=x){c=d[0];g=d[1];f=d[2];h=d[3];l=d[4];t=d[5];p=d[6];s=d[7];for(r=0;r<m;r+=1)B[r]=16>r?new e(a[r*y+n],a[r*y+n+1]):z(G(B[r-2]),B[r-7],F(B[r-15]),B[r-16]),q=E(s,I(l),
J(l,t,p),k[r],B[r]),w=v(H(c),K(c,g,f)),s=p,p=t,t=l,l=v(h,q),h=f,f=g,g=c,c=v(q,w);d[0]=v(c,d[0]);d[1]=v(g,d[1]);d[2]=v(f,d[2]);d[3]=v(h,d[3]);d[4]=v(l,d[4]);d[5]=v(t,d[5]);d[6]=v(p,d[6]);d[7]=v(s,d[7])}if("SHA-224"===b)a=[d[0],d[1],d[2],d[3],d[4],d[5],d[6]];else if("SHA-256"===b)a=d;else if("SHA-384"===b)a=[d[0].a,d[0].b,d[1].a,d[1].b,d[2].a,d[2].b,d[3].a,d[3].b,d[4].a,d[4].b,d[5].a,d[5].b];else if("SHA-512"===b)a=[d[0].a,d[0].b,d[1].a,d[1].b,d[2].a,d[2].b,d[3].a,d[3].b,d[4].a,d[4].b,d[5].a,d[5].b,
d[6].a,d[6].b,d[7].a,d[7].b];else throw"Unexpected error in SHA-2 implementation";return a}"function"===typeof define&&define.amd?define(function(){return y}):"undefined"!==typeof exports?"undefined"!==typeof module&&module.exports?module.exports=exports=y:exports=y:S.jsSHA=y})(this);
