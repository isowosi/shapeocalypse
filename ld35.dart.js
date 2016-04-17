(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isb=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ish)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="b"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="u"){processStatics(init.statics[b1]=b2.u,b3)
delete b2.u}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cM"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cM"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cM(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bO=function(){}
var dart=[["","",,H,{"^":"",lK:{"^":"b;a"}}],["","",,J,{"^":"",
j:function(a){return void 0},
bT:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bP:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cP==null){H.km()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.eg("Return interceptor for "+H.e(y(a,z))))}w=H.ku(a)
if(w==null){if(typeof a=="function")return C.R
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.V
else return C.ae}return w},
h:{"^":"b;",
v:function(a,b){return a===b},
gG:function(a){return H.ac(a)},
i:["e1",function(a){return H.bG(a)}],
gK:function(a){return new H.a8(H.at(a),null)},
"%":"CanvasRenderingContext2D|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|WebGLProgram|WebGLUniformLocation"},
hx:{"^":"h;",
i:function(a){return String(a)},
gG:function(a){return a?519018:218159},
gK:function(a){return C.aa},
$iscL:1},
dD:{"^":"h;",
v:function(a,b){return null==b},
i:function(a){return"null"},
gG:function(a){return 0},
gK:function(a){return C.a3}},
cf:{"^":"h;",
gG:function(a){return 0},
gK:function(a){return C.a2},
i:["e2",function(a){return String(a)}],
$isdE:1},
hS:{"^":"cf;"},
bh:{"^":"cf;"},
be:{"^":"cf;",
i:function(a){var z=a[$.$get$dg()]
return z==null?this.e2(a):J.av(z)}},
bc:{"^":"h;",
da:function(a,b){if(!!a.immutable$list)throw H.f(new P.F(b))},
ba:function(a,b){if(!!a.fixed$length)throw H.f(new P.F(b))},
n:function(a,b){this.ba(a,"add")
a.push(b)},
dR:function(a,b,c){var z,y,x
this.da(a,"setAll")
z=a.length
if(b>z)H.B(P.ak(b,0,z,"index",null))
for(z=c.length,y=0;y<c.length;c.length===z||(0,H.cZ)(c),++y,b=x){x=b+1
this.m(a,b,c[y])}},
a6:function(a){this.ba(a,"removeLast")
if(a.length===0)throw H.f(H.L(a,-1))
return a.pop()},
eY:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0)z.push(w)
if(a.length!==y)throw H.f(new P.V(a))}v=z.length
if(v===y)return
this.sj(a,v)
for(x=0;x<z.length;++x)this.m(a,x,z[x])},
F:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(new P.V(a))}},
al:function(a,b){return H.c(new H.bB(a,b),[null,null])},
a8:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
cA:function(a,b,c){if(b>a.length)throw H.f(P.ak(b,0,a.length,"start",null))
if(c==null)c=a.length
else{if(typeof c!=="number"||Math.floor(c)!==c)throw H.f(H.O(c))
if(c<b||c>a.length)throw H.f(P.ak(c,b,a.length,"end",null))}if(b===c)return H.c([],[H.x(a,0)])
return H.c(a.slice(b,c),[H.x(a,0)])},
gfK:function(a){if(a.length>0)return a[0]
throw H.f(H.bu())},
bn:function(a,b,c,d,e){var z,y,x
this.da(a,"set range")
P.cq(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.f(H.hw())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
dT:function(a,b,c,d){return this.bn(a,b,c,d,0)},
aE:function(a,b){var z
for(z=0;z<a.length;++z)if(J.C(a[z],b))return!0
return!1},
i:function(a){return P.bt(a,"[","]")},
gM:function(a){return H.c(new J.c1(a,a.length,0,null),[H.x(a,0)])},
gG:function(a){return H.ac(a)},
gj:function(a){return a.length},
sj:function(a,b){this.ba(a,"set length")
if(b<0)throw H.f(P.ak(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.L(a,b))
if(b>=a.length||b<0)throw H.f(H.L(a,b))
return a[b]},
m:function(a,b,c){if(!!a.immutable$list)H.B(new P.F("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.L(a,b))
if(b>=a.length||b<0)throw H.f(H.L(a,b))
a[b]=c},
$isbd:1,
$isk:1,
$ask:null,
$isu:1},
lJ:{"^":"bc;"},
c1:{"^":"b;a,b,c,d",
gE:function(){return this.d},
C:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(H.cZ(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aV:{"^":"h;",
gdm:function(a){return a===0?1/a<0:a<0},
cc:function(a,b){return a%b},
bg:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.F(""+a))},
bd:function(a){return this.bg(Math.floor(a))},
aQ:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(new P.F(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gG:function(a){return a&0x1FFFFFFF},
bj:function(a){return-a},
w:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return a+b},
p:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return a-b},
a2:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return a/b},
D:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return a*b},
L:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
W:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.bg(a/b)},
R:function(a,b){return(a|0)===a?a/b|0:this.bg(a/b)},
as:function(a,b){return b>31?0:a<<b>>>0},
cZ:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ac:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return(a&b)>>>0},
bq:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return(a^b)>>>0},
V:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return a<b},
O:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return a>b},
cv:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return a<=b},
U:function(a,b){if(typeof b!=="number")throw H.f(H.O(b))
return a>=b},
gK:function(a){return C.ad},
$isy:1},
ce:{"^":"aV;",
gK:function(a){return C.ac},
dJ:function(a){return~a>>>0},
$isX:1,
$isy:1,
$isp:1},
hy:{"^":"aV;",
gK:function(a){return C.ab},
$isX:1,
$isy:1},
bw:{"^":"h;",
w:function(a,b){if(typeof b!=="string")throw H.f(P.d6(b,null,null))
return a+b},
cB:function(a,b,c){H.eJ(b)
if(c==null)c=a.length
H.eJ(c)
if(b<0)throw H.f(P.bH(b,null,null))
if(typeof c!=="number")return H.i(c)
if(b>c)throw H.f(P.bH(b,null,null))
if(c>a.length)throw H.f(P.bH(c,null,null))
return a.substring(b,c)},
dY:function(a,b){return this.cB(a,b,null)},
D:function(a,b){var z,y
if(typeof b!=="number")return H.i(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.f(C.y)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fq:function(a,b,c){if(c>a.length)throw H.f(P.ak(c,0,a.length,null,null))
return H.kN(a,b,c)},
i:function(a){return a},
gG:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gK:function(a){return C.a5},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.L(a,b))
if(b>=a.length||b<0)throw H.f(H.L(a,b))
return a[b]},
$isbd:1,
$isK:1}}],["","",,H,{"^":"",
bm:function(a,b){var z=a.aI(b)
if(!init.globalState.d.cy)init.globalState.f.aR()
return z},
eT:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.j(y).$isk)throw H.f(P.a3("Arguments to main must be a List: "+H.e(y)))
init.globalState=new H.jD(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dz()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.je(P.bA(null,H.bl),0)
y.z=H.c(new H.R(0,null,null,null,null,null,0),[P.p,H.cE])
y.ch=H.c(new H.R(0,null,null,null,null,null,0),[P.p,null])
if(y.x===!0){x=new H.jC()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.hq,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jE)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.c(new H.R(0,null,null,null,null,null,0),[P.p,H.bI])
w=P.aW(null,null,null,P.p)
v=new H.bI(0,null,!1)
u=new H.cE(y,x,w,init.createNewIsolate(),v,new H.ay(H.bU()),new H.ay(H.bU()),!1,!1,[],P.aW(null,null,null,null),null,null,!1,!0,P.aW(null,null,null,null))
w.n(0,0)
u.cE(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bn()
x=H.aL(y,[y]).af(a)
if(x)u.aI(new H.kL(z,a))
else{y=H.aL(y,[y,y]).af(a)
if(y)u.aI(new H.kM(z,a))
else u.aI(a)}init.globalState.f.aR()},
hu:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.hv()
return},
hv:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.F("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.F('Cannot extract URI from "'+H.e(z)+'"'))},
hq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bK(!0,[]).aj(b.data)
y=J.P(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bK(!0,[]).aj(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bK(!0,[]).aj(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.c(new H.R(0,null,null,null,null,null,0),[P.p,H.bI])
p=P.aW(null,null,null,P.p)
o=new H.bI(0,null,!1)
n=new H.cE(y,q,p,init.createNewIsolate(),o,new H.ay(H.bU()),new H.ay(H.bU()),!1,!1,[],P.aW(null,null,null,null),null,null,!1,!0,P.aW(null,null,null,null))
p.n(0,0)
n.cE(0,o)
init.globalState.f.a.Y(new H.bl(n,new H.hr(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aR()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aP(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aR()
break
case"close":init.globalState.ch.am(0,$.$get$dA().h(0,a))
a.terminate()
init.globalState.f.aR()
break
case"log":H.hp(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a6(["command","print","msg",z])
q=new H.aI(!0,P.b2(null,P.p)).X(q)
y.toString
self.postMessage(q)}else P.bo(y.h(z,"msg"))
break
case"error":throw H.f(y.h(z,"msg"))}},
hp:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a6(["command","log","msg",a])
x=new H.aI(!0,P.b2(null,P.p)).X(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.W(w)
z=H.S(w)
throw H.f(P.aT(z))}},
hs:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dP=$.dP+("_"+y)
$.dQ=$.dQ+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aP(f,["spawned",new H.bM(y,x),w,z.r])
x=new H.ht(a,b,c,d,z)
if(e===!0){z.d6(w,w)
init.globalState.f.a.Y(new H.bl(z,x,"start isolate"))}else x.$0()},
jW:function(a){return new H.bK(!0,[]).aj(new H.aI(!1,P.b2(null,P.p)).X(a))},
kL:{"^":"d:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
kM:{"^":"d:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
jD:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",u:{
jE:function(a){var z=P.a6(["command","print","msg",a])
return new H.aI(!0,P.b2(null,P.p)).X(z)}}},
cE:{"^":"b;B:a>,b,c,h0:d<,fs:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
d6:function(a,b){if(!this.f.v(0,a))return
if(this.Q.n(0,b)&&!this.y)this.y=!0
this.bR()},
he:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.am(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.a(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.a(v,w)
v[w]=x
if(w===y.c)y.cO();++y.d}this.y=!1}this.bR()},
f8:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.j(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
hd:function(a){var z,y,x
if(this.ch==null)return
for(z=J.j(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.B(new P.F("removeRange"))
P.cq(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dS:function(a,b){if(!this.r.v(0,a))return
this.db=b},
fQ:function(a,b,c){var z=J.j(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){J.aP(a,c)
return}z=this.cx
if(z==null){z=P.bA(null,null)
this.cx=z}z.Y(new H.jx(a,c))},
fN:function(a,b){var z
if(!this.r.v(0,a))return
z=J.j(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){this.c5()
return}z=this.cx
if(z==null){z=P.bA(null,null)
this.cx=z}z.Y(this.gh1())},
fR:function(a,b){var z,y
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bo(a)
if(b!=null)P.bo(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.av(a)
y[1]=b==null?null:J.av(b)
for(z=H.c(new P.cF(z,z.r,null,null),[null]),z.c=z.a.e;z.C();)J.aP(z.d,y)},
aI:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.W(u)
w=t
v=H.S(u)
this.fR(w,v)
if(this.db===!0){this.c5()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gh0()
if(this.cx!=null)for(;t=this.cx,!t.gaa(t);)this.cx.cd().$0()}return y},
dq:function(a){return this.b.h(0,a)},
cE:function(a,b){var z=this.b
if(z.bb(a))throw H.f(P.aT("Registry: ports must be registered only once."))
z.m(0,a,b)},
bR:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.c5()},
c5:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.au(0)
for(z=this.b,y=z.gdE(z),y=y.gM(y);y.C();)y.gE().em()
z.au(0)
this.c.au(0)
init.globalState.z.am(0,this.a)
this.dx.au(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.aP(w,z[v])}this.ch=null}},"$0","gh1",0,0,2]},
jx:{"^":"d:2;a,b",
$0:function(){J.aP(this.a,this.b)}},
je:{"^":"b;a,b",
fC:function(){var z=this.a
if(z.b===z.c)return
return z.cd()},
dB:function(){var z,y,x
z=this.fC()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bb(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gaa(y)}else y=!1
else y=!1
else y=!1
if(y)H.B(P.aT("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gaa(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a6(["command","close"])
x=new H.aI(!0,H.c(new P.eu(0,null,null,null,null,null,0),[null,P.p])).X(x)
y.toString
self.postMessage(x)}return!1}z.aw()
return!0},
cW:function(){if(self.window!=null)new H.jf(this).$0()
else for(;this.dB(););},
aR:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cW()
else try{this.cW()}catch(x){w=H.W(x)
z=w
y=H.S(x)
w=init.globalState.Q
v=P.a6(["command","error","msg",H.e(z)+"\n"+H.e(y)])
v=new H.aI(!0,P.b2(null,P.p)).X(v)
w.toString
self.postMessage(v)}}},
jf:{"^":"d:2;a",
$0:function(){if(!this.a.dB())return
P.e0(C.r,this)}},
bl:{"^":"b;a,b,c",
aw:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aI(this.b)}},
jC:{"^":"b;"},
hr:{"^":"d:1;a,b,c,d,e,f",
$0:function(){H.hs(this.a,this.b,this.c,this.d,this.e,this.f)}},
ht:{"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bn()
w=H.aL(x,[x,x]).af(y)
if(w)y.$2(this.b,this.c)
else{x=H.aL(x,[x]).af(y)
if(x)y.$1(this.b)
else y.$0()}}z.bR()}},
ek:{"^":"b;"},
bM:{"^":"ek;b,a",
bl:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcR())return
x=H.jW(b)
if(z.gfs()===y){y=J.P(x)
switch(y.h(x,0)){case"pause":z.d6(y.h(x,1),y.h(x,2))
break
case"resume":z.he(y.h(x,1))
break
case"add-ondone":z.f8(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.hd(y.h(x,1))
break
case"set-errors-fatal":z.dS(y.h(x,1),y.h(x,2))
break
case"ping":z.fQ(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fN(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.n(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.am(0,y)
break}return}y=init.globalState.f
w="receive "+H.e(b)
y.a.Y(new H.bl(z,new H.jG(this,x),w))},
v:function(a,b){if(b==null)return!1
return b instanceof H.bM&&J.C(this.b,b.b)},
gG:function(a){return this.b.gbG()}},
jG:{"^":"d:1;a,b",
$0:function(){var z=this.a.b
if(!z.gcR())z.ee(this.b)}},
cI:{"^":"ek;b,c,a",
bl:function(a,b){var z,y,x
z=P.a6(["command","message","port",this,"msg",b])
y=new H.aI(!0,P.b2(null,P.p)).X(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
v:function(a,b){if(b==null)return!1
return b instanceof H.cI&&J.C(this.b,b.b)&&J.C(this.a,b.a)&&J.C(this.c,b.c)},
gG:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.dW()
y=this.a
if(typeof y!=="number")return y.dW()
x=this.c
if(typeof x!=="number")return H.i(x)
return(z<<16^y<<8^x)>>>0}},
bI:{"^":"b;bG:a<,b,cR:c<",
em:function(){this.c=!0
this.b=null},
ee:function(a){if(this.c)return
this.eF(a)},
eF:function(a){return this.b.$1(a)},
$ishZ:1},
im:{"^":"b;a,b,c",
ec:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.Y(new H.bl(y,new H.ip(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aM(new H.iq(this,b),0),a)}else throw H.f(new P.F("Timer greater than 0."))},
u:{
io:function(a,b){var z=new H.im(!0,!1,null)
z.ec(a,b)
return z}}},
ip:{"^":"d:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
iq:{"^":"d:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ay:{"^":"b;bG:a<",
gG:function(a){var z=this.a
if(typeof z!=="number")return z.hn()
z=C.e.cZ(z,0)^C.e.R(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ay){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aI:{"^":"b;a,b",
X:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.m(0,a,z.gj(z))
z=J.j(a)
if(!!z.$isdH)return["buffer",a]
if(!!z.$isbC)return["typed",a]
if(!!z.$isbd)return this.dN(a)
if(!!z.$isho){x=this.gdK()
w=a.gdn()
w=H.bf(w,x,H.M(w,"N",0),null)
w=P.cj(w,!0,H.M(w,"N",0))
z=z.gdE(a)
z=H.bf(z,x,H.M(z,"N",0),null)
return["map",w,P.cj(z,!0,H.M(z,"N",0))]}if(!!z.$isdE)return this.dO(a)
if(!!z.$ish)this.dC(a)
if(!!z.$ishZ)this.aT(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbM)return this.dP(a)
if(!!z.$iscI)return this.dQ(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.aT(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isay)return["capability",a.a]
if(!(a instanceof P.b))this.dC(a)
return["dart",init.classIdExtractor(a),this.dM(init.classFieldsExtractor(a))]},"$1","gdK",2,0,0],
aT:function(a,b){throw H.f(new P.F(H.e(b==null?"Can't transmit:":b)+" "+H.e(a)))},
dC:function(a){return this.aT(a,null)},
dN:function(a){var z=this.dL(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aT(a,"Can't serialize indexable: ")},
dL:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.X(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
dM:function(a){var z
for(z=0;z<a.length;++z)C.c.m(a,z,this.X(a[z]))
return a},
dO:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aT(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.X(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
dQ:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dP:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbG()]
return["raw sendport",a]}},
bK:{"^":"b;a,b",
aj:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.a3("Bad serialized message: "+H.e(a)))
switch(C.c.gfK(a)){case"ref":if(1>=a.length)return H.a(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.c(this.aG(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.c(this.aG(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.aG(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.c(this.aG(x),[null])
y.fixed$length=Array
return y
case"map":return this.fF(a)
case"sendport":return this.fG(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.fE(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.ay(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aG(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.f("couldn't deserialize: "+H.e(a))}},"$1","gfD",2,0,0],
aG:function(a){var z,y,x
z=J.P(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.i(x)
if(!(y<x))break
z.m(a,y,this.aj(z.h(a,y)));++y}return a},
fF:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.hE()
this.b.push(w)
y=J.ff(y,this.gfD()).bh(0)
for(z=J.P(y),v=J.P(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.a(y,u)
w.m(0,y[u],this.aj(v.h(x,u)))}return w},
fG:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.C(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dq(w)
if(u==null)return
t=new H.bM(u,x)}else t=new H.cI(y,w,x)
this.b.push(t)
return t},
fE:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.P(y)
v=J.P(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.i(t)
if(!(u<t))break
w[z.h(y,u)]=this.aj(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
kf:function(a){return init.types[a]},
eN:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.j(a).$isbx},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.av(a)
if(typeof z!=="string")throw H.f(H.O(a))
return z},
ac:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
co:function(a){var z,y,x,w,v,u,t,s,r
z=J.j(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.H||!!J.j(a).$isbh){v=C.w(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1)r=w.charCodeAt(0)===36
else r=!1
if(r)w=C.J.dY(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cQ(H.bQ(a),0,null),init.mangledGlobalNames)},
bG:function(a){return"Instance of '"+H.co(a)+"'"},
cn:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.O(a))
return a[b]},
dR:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.O(a))
a[b]=c},
i:function(a){throw H.f(H.O(a))},
a:function(a,b){if(a==null)J.b8(a)
throw H.f(H.L(a,b))},
L:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aw(!0,b,"index",null)
z=J.b8(a)
if(!(b<0)){if(typeof z!=="number")return H.i(z)
y=b>=z}else y=!0
if(y)return P.cd(b,a,"index",null,z)
return P.bH(b,"index",null)},
O:function(a){return new P.aw(!0,a,null,null)},
Y:function(a){if(typeof a!=="number")throw H.f(H.O(a))
return a},
eJ:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(H.O(a))
return a},
f:function(a){var z
if(a==null)a=new P.cm()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eU})
z.name=""}else z.toString=H.eU
return z},
eU:function(){return J.av(this.dartException)},
B:function(a){throw H.f(a)},
cZ:function(a){throw H.f(new P.V(a))},
W:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.kR(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.cZ(x,16)&8191)===10)switch(w){case 438:return z.$1(H.ch(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.e(y)+" (Error "+w+")"
return z.$1(new H.dM(v,null))}}if(a instanceof TypeError){u=$.$get$e5()
t=$.$get$e6()
s=$.$get$e7()
r=$.$get$e8()
q=$.$get$ec()
p=$.$get$ed()
o=$.$get$ea()
$.$get$e9()
n=$.$get$ef()
m=$.$get$ee()
l=u.a_(y)
if(l!=null)return z.$1(H.ch(y,l))
else{l=t.a_(y)
if(l!=null){l.method="call"
return z.$1(H.ch(y,l))}else{l=s.a_(y)
if(l==null){l=r.a_(y)
if(l==null){l=q.a_(y)
if(l==null){l=p.a_(y)
if(l==null){l=o.a_(y)
if(l==null){l=r.a_(y)
if(l==null){l=n.a_(y)
if(l==null){l=m.a_(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dM(y,l==null?null:l.method))}}return z.$1(new H.iA(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dX()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aw(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dX()
return a},
S:function(a){var z
if(a==null)return new H.ev(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ev(a,null)},
ky:function(a){if(a==null||typeof a!='object')return J.G(a)
else return H.ac(a)},
kd:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
ko:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bm(b,new H.kp(a))
case 1:return H.bm(b,new H.kq(a,d))
case 2:return H.bm(b,new H.kr(a,d,e))
case 3:return H.bm(b,new H.ks(a,d,e,f))
case 4:return H.bm(b,new H.kt(a,d,e,f,g))}throw H.f(P.aT("Unsupported number of arguments for wrapped closure"))},
aM:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ko)
a.$identity=z
return z},
fr:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.j(c).$isk){z.$reflectionInfo=c
x=H.i1(z).r}else x=c
w=d?Object.create(new H.i8().constructor.prototype):Object.create(new H.c4(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a4
$.a4=J.t(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.da(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.kf,x)
else if(u&&typeof x=="function"){q=t?H.d8:H.c5
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.da(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
fo:function(a,b,c,d){var z=H.c5
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
da:function(a,b,c){var z,y,x,w,v,u
if(c)return H.fq(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fo(y,!w,z,b)
if(y===0){w=$.aR
if(w==null){w=H.br("self")
$.aR=w}w="return function(){return this."+H.e(w)+"."+H.e(z)+"();"
v=$.a4
$.a4=J.t(v,1)
return new Function(w+H.e(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aR
if(v==null){v=H.br("self")
$.aR=v}v=w+H.e(v)+"."+H.e(z)+"("+u+");"
w=$.a4
$.a4=J.t(w,1)
return new Function(v+H.e(w)+"}")()},
fp:function(a,b,c,d){var z,y
z=H.c5
y=H.d8
switch(b?-1:a){case 0:throw H.f(new H.i2("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fq:function(a,b){var z,y,x,w,v,u,t,s
z=H.fk()
y=$.d7
if(y==null){y=H.br("receiver")
$.d7=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fp(w,!u,x,b)
if(w===1){y="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
u=$.a4
$.a4=J.t(u,1)
return new Function(y+H.e(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
u=$.a4
$.a4=J.t(u,1)
return new Function(y+H.e(u)+"}")()},
cM:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.j(c).$isk){c.fixed$length=Array
z=c}else z=c
return H.fr(a,b,z,!!d,e,f)},
kA:function(a,b){var z=J.P(b)
throw H.f(H.fm(H.co(a),z.cB(b,3,z.gj(b))))},
ag:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.j(a)[b]
else z=!0
if(z)return a
H.kA(a,b)},
kO:function(a){throw H.f(new P.fz("Cyclic initialization for static "+H.e(a)))},
aL:function(a,b,c){return new H.i3(a,b,c,null)},
bn:function(){return C.x},
bU:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
r:function(a){return new H.a8(a,null)},
c:function(a,b){a.$builtinTypeInfo=b
return a},
bQ:function(a){if(a==null)return
return a.$builtinTypeInfo},
eL:function(a,b){return H.cY(a["$as"+H.e(b)],H.bQ(a))},
M:function(a,b,c){var z=H.eL(a,b)
return z==null?null:z[c]},
x:function(a,b){var z=H.bQ(a)
return z==null?null:z[b]},
cW:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cQ(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.a.i(a)
else return},
cQ:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cs("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.e(H.cW(u,c))}return w?"":"<"+H.e(z)+">"},
at:function(a){var z=J.j(a).constructor.builtin$cls
if(a==null)return z
return z+H.cQ(a.$builtinTypeInfo,0,null)},
cY:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
k7:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bQ(a)
y=J.j(a)
if(y[b]==null)return!1
return H.eH(H.cY(y[d],z),c)},
eH:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.Z(a[y],b[y]))return!1
return!0},
cN:function(a,b,c){return a.apply(b,H.eL(b,c))},
Z:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eM(a,b)
if('func' in a)return b.builtin$cls==="fQ"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cW(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.e(H.cW(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.eH(H.cY(v,z),x)},
eG:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.Z(z,v)||H.Z(v,z)))return!1}return!0},
k3:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.Z(v,u)||H.Z(u,v)))return!1}return!0},
eM:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.Z(z,y)||H.Z(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eG(x,w,!1))return!1
if(!H.eG(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.Z(o,n)||H.Z(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.Z(o,n)||H.Z(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.Z(o,n)||H.Z(n,o)))return!1}}return H.k3(a.named,b.named)},
mR:function(a){var z=$.cO
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
mP:function(a){return H.ac(a)},
mO:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
ku:function(a){var z,y,x,w,v,u
z=$.cO.$1(a)
y=$.bN[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bS[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eF.$2(a,z)
if(z!=null){y=$.bN[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bS[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cS(x)
$.bN[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bS[z]=x
return x}if(v==="-"){u=H.cS(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eP(a,x)
if(v==="*")throw H.f(new P.eg(z))
if(init.leafTags[z]===true){u=H.cS(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eP(a,x)},
eP:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bT(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cS:function(a){return J.bT(a,!1,null,!!a.$isbx)},
kx:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bT(z,!1,null,!!z.$isbx)
else return J.bT(z,c,null,null)},
km:function(){if(!0===$.cP)return
$.cP=!0
H.kn()},
kn:function(){var z,y,x,w,v,u,t,s
$.bN=Object.create(null)
$.bS=Object.create(null)
H.ki()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eQ.$1(v)
if(u!=null){t=H.kx(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ki:function(){var z,y,x,w,v,u,t
z=C.K()
z=H.aK(C.L,H.aK(C.M,H.aK(C.v,H.aK(C.v,H.aK(C.O,H.aK(C.N,H.aK(C.P(C.w),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cO=new H.kj(v)
$.eF=new H.kk(u)
$.eQ=new H.kl(t)},
aK:function(a,b){return a(b)||b},
kN:function(a,b,c){return a.indexOf(b,c)>=0},
i0:{"^":"b;a,b,c,d,e,f,r,x",u:{
i1:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.i0(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
iy:{"^":"b;a,b,c,d,e,f",
a_:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
u:{
a7:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iy(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},
bJ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
eb:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dM:{"^":"Q;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.e(this.a)
return"NullError: method not found: '"+H.e(z)+"' on null"}},
hA:{"^":"Q;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.e(z)+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.e(z)+"' on '"+H.e(y)+"' ("+H.e(this.a)+")"},
u:{
ch:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hA(a,y,z?null:b.receiver)}}},
iA:{"^":"Q;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
kR:{"^":"d:0;a",
$1:function(a){if(!!J.j(a).$isQ)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ev:{"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
kp:{"^":"d:1;a",
$0:function(){return this.a.$0()}},
kq:{"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
kr:{"^":"d:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ks:{"^":"d:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
kt:{"^":"d:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{"^":"b;",
i:function(a){return"Closure '"+H.co(this)+"'"},
gdF:function(){return this},
gdF:function(){return this}},
dZ:{"^":"d;"},
i8:{"^":"dZ;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
c4:{"^":"dZ;a,b,c,d",
v:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c4))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gG:function(a){var z,y
z=this.c
if(z==null)y=H.ac(this.a)
else y=typeof z!=="object"?J.G(z):H.ac(z)
return J.eY(y,H.ac(this.b))},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+H.bG(z)},
u:{
c5:function(a){return a.a},
d8:function(a){return a.c},
fk:function(){var z=$.aR
if(z==null){z=H.br("self")
$.aR=z}return z},
br:function(a){var z,y,x,w,v
z=new H.c4("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fl:{"^":"Q;a",
i:function(a){return this.a},
u:{
fm:function(a,b){return new H.fl("CastError: Casting value of type "+H.e(a)+" to incompatible type "+H.e(b))}}},
i2:{"^":"Q;a",
i:function(a){return"RuntimeError: "+H.e(this.a)}},
dV:{"^":"b;"},
i3:{"^":"dV;a,b,c,d",
af:function(a){var z=this.ev(a)
return z==null?!1:H.eM(z,this.ay())},
ev:function(a){var z=J.j(a)
return"$signature" in z?z.$signature():null},
ay:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.j(y)
if(!!x.$ismy)z.v=true
else if(!x.$isdn)z.ret=y.ay()
y=this.b
if(y!=null&&y.length!==0)z.args=H.dU(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.dU(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.eK(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ay()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.e(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.e(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.eK(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.e(z[s].ay())+" "+s}x+="}"}}return x+(") -> "+H.e(this.a))},
u:{
dU:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ay())
return z}}},
dn:{"^":"dV;",
i:function(a){return"dynamic"},
ay:function(){return}},
a8:{"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gG:function(a){return J.G(this.a)},
v:function(a,b){if(b==null)return!1
return b instanceof H.a8&&J.C(this.a,b.a)}},
R:{"^":"b;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gaa:function(a){return this.a===0},
gdn:function(){return H.c(new H.hC(this),[H.x(this,0)])},
gdE:function(a){return H.bf(this.gdn(),new H.hz(this),H.x(this,0),H.x(this,1))},
bb:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cJ(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cJ(y,a)}else return this.fX(a)},
fX:function(a){var z=this.d
if(z==null)return!1
return this.aL(this.a5(z,this.aK(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.a5(z,b)
return y==null?null:y.gak()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.a5(x,b)
return y==null?null:y.gak()}else return this.fY(b)},
fY:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a5(z,this.aK(a))
x=this.aL(y,a)
if(x<0)return
return y[x].gak()},
m:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bI()
this.b=z}this.cD(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bI()
this.c=y}this.cD(y,b,c)}else{x=this.d
if(x==null){x=this.bI()
this.d=x}w=this.aK(b)
v=this.a5(x,w)
if(v==null)this.bP(x,w,[this.bJ(b,c)])
else{u=this.aL(v,b)
if(u>=0)v[u].sak(c)
else v.push(this.bJ(b,c))}}},
dz:function(a,b){var z
if(this.bb(a))return this.h(0,a)
z=b.$0()
this.m(0,a,z)
return z},
am:function(a,b){if(typeof b==="string")return this.cU(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cU(this.c,b)
else return this.fZ(b)},
fZ:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a5(z,this.aK(a))
x=this.aL(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.d1(w)
return w.gak()},
au:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
F:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.f(new P.V(this))
z=z.c}},
cD:function(a,b,c){var z=this.a5(a,b)
if(z==null)this.bP(a,b,this.bJ(b,c))
else z.sak(c)},
cU:function(a,b){var z
if(a==null)return
z=this.a5(a,b)
if(z==null)return
this.d1(z)
this.cL(a,b)
return z.gak()},
bJ:function(a,b){var z,y
z=new H.hB(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
d1:function(a){var z,y
z=a.geP()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aK:function(a){return J.G(a)&0x3ffffff},
aL:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.C(a[y].gdl(),b))return y
return-1},
i:function(a){return P.hH(this)},
a5:function(a,b){return a[b]},
bP:function(a,b,c){a[b]=c},
cL:function(a,b){delete a[b]},
cJ:function(a,b){return this.a5(a,b)!=null},
bI:function(){var z=Object.create(null)
this.bP(z,"<non-identifier-key>",z)
this.cL(z,"<non-identifier-key>")
return z},
$isho:1,
u:{
cg:function(a,b){return H.c(new H.R(0,null,null,null,null,null,0),[a,b])}}},
hz:{"^":"d:0;a",
$1:function(a){return this.a.h(0,a)}},
hB:{"^":"b;dl:a<,ak:b@,c,eP:d<"},
hC:{"^":"N;a",
gj:function(a){return this.a.a},
gM:function(a){var z,y
z=this.a
y=new H.hD(z,z.r,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.c=z.e
return y},
F:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.f(new P.V(z))
y=y.c}},
$isu:1},
hD:{"^":"b;a,b,c,d",
gE:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.V(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
kj:{"^":"d:0;a",
$1:function(a){return this.a(a)}},
kk:{"^":"d:15;a",
$2:function(a,b){return this.a(a,b)}},
kl:{"^":"d:12;a",
$1:function(a){return this.a(a)}}}],["","",,D,{"^":"",fj:{"^":"b;a,b,c,d,e,f,r,x",
gj:function(a){return this.c},
gff:function(){var z=this.x
return H.c(new P.j1(z),[H.x(z,0)])},
ft:function(a,b,c){var z,y,x
if(typeof c!=="number")return H.i(c)
z=b.length
y=0
for(;y<c;++y){if(y>=a.length)return H.a(a,y)
x=a[y]
if(y>=z)return H.a(b,y)
b[y]=x}},
bm:function(a){var z,y,x,w,v,u
z=J.w(a)
if(!z.U(a,0))H.B(P.a3("should be > 0"))
if(z.v(a,this.c))return
y=J.au(z.w(a,31),32)
x=J.w(y)
if(x.O(y,this.b.length)||J.bY(x.w(y,this.a),this.b.length)){w=new Uint32Array(H.l(y))
v=this.b
this.ft(v,w,x.O(y,v.length)?this.b.length:y)
this.b=w}if(z.O(a,this.c)){z=this.c
if(typeof z!=="number")return z.L()
if(C.e.L(z,32)>0){x=this.b
z=C.e.R(z+31,32)-1
if(z>>>0!==z||z>=x.length)return H.a(x,z)
v=x[z]
u=this.c
if(typeof u!=="number")return u.L()
x[z]=(v&C.a.as(1,C.e.L(u,32)&31)-1)>>>0
z=u}x=this.b;(x&&C.U).fJ(x,J.au(J.t(z,31),32),y,0)}this.c=a
this.scq(this.d+1)},
scq:function(a){this.d=a},
dc:function(a){var z=D.E(0,!1)
z.b=new Uint32Array(H.ey(this.b))
z.c=this.c
z.d=this.d
return z},
i:function(a){return H.e(this.c)+" bits, "+H.e(this.dd(!0))+" set"},
fb:function(a){var z,y,x
if(!J.C(this.c,a.geK()))H.B(P.a3("Array lengths differ."))
z=J.au(J.t(this.c,31),32)
if(typeof z!=="number")return H.i(z)
y=0
for(;y<z;++y){x=this.b
if(y>=x.length)return H.a(x,y)
x[y]=C.a.ac(x[y],a.ges().h(0,y))}this.scq(this.d+1)
return this},
hm:function(a){var z,y,x
if(!J.C(this.c,a.geK()))H.B(P.a3("Array lengths differ."))
z=J.au(J.t(this.c,31),32)
if(typeof z!=="number")return H.i(z)
y=0
for(;y<z;++y){x=this.b
if(y>=x.length)return H.a(x,y)
x[y]=C.a.bq(x[y],a.ges().h(0,y))}this.scq(this.d+1)
return this},
ac:function(a,b){return this.dc(0).fb(b)},
bq:function(a,b){return this.dc(0).hm(b)},
h:function(a,b){var z,y
z=this.b
y=J.au(b,32)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
y=z[y]
if(typeof b!=="number")return b.ac()
return(y&C.a.as(1,b&31))>>>0!==0},
m:function(a,b,c){var z,y,x
z=J.w(b)
y=this.b
if(c===!0){z=z.W(b,32)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
x=y[z]
if(typeof b!=="number")return b.ac()
y[z]=(x|C.a.as(1,b&31))>>>0}else{z=z.W(b,32)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
x=y[z]
if(typeof b!=="number")return b.ac()
y[z]=(x&~C.a.as(1,b&31))>>>0}++this.d},
dd:function(a){var z,y,x,w,v,u,t,s
if(J.C(this.c,0))return 0
if(this.r!==this.d){this.f=0
z=J.au(J.t(this.c,31),32)
y=J.w(z)
x=0
while(!0){w=y.p(z,1)
if(typeof w!=="number")return H.i(w)
if(!(x<w))break
w=this.b
if(x>=w.length)return H.a(w,x)
v=w[x]
for(;v!==0;v=v>>>8){w=this.f
u=$.$get$c3()
t=v&255
if(t>=u.length)return H.a(u,t)
t=u[t]
if(typeof w!=="number")return w.w()
this.f=w+t}++x}y=this.b
if(x>=y.length)return H.a(y,x)
v=y[x]
y=this.c
if(typeof y!=="number")return y.ac()
s=y&31
if(s!==0)v=(v&~C.a.as(4294967295,s))>>>0
for(;v!==0;v=v>>>8){y=this.f
w=$.$get$c3()
u=v&255
if(u>=w.length)return H.a(w,u)
u=w[u]
if(typeof y!=="number")return y.w()
this.f=y+u}}return this.f},
e6:function(a,b){this.b=new Uint32Array(H.l((a+31)/32|0))
this.c=a
this.d=0},
bX:function(a){return this.gff().$1(a)},
u:{
E:function(a,b){var z=H.c(new P.iV(null,null,0,null,null,null,null),[null])
z.e=z
z.d=z
z=new D.fj(256,null,null,null,null,null,-1,z)
z.e6(a,!1)
return z}}}}],["","",,F,{"^":"",fT:{"^":"fV;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
fw:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.ag(this.y.z.h(0,C.f),"$isct")
y=F.bF(0,0,0)
x=S.bE(C.j,F.kJ())
w=new T.D(new Float32Array(H.l(3)))
w.ad(0,0,10)
x.sA(w)
v=S.bE(C.k,F.kK())
u=F.hd()
v.sa1(u.a)
v.saJ(u.b)
t=S.bE(C.i,F.kH())
t.sd7(1256.6370614359173)
t.a=20
w=this.y
s=w.av([y,x,v,t])
w.c.n(0,s)
z.b.m(0,"player",s)
z.c.m(0,s,"player")
w=F.bF(0,0,-200)
t=F.cv(200,100)
v=this.y
s=v.av([w,t])
v.c.n(0,s)
v=F.bF(0,0,-100)
t=F.cv(200,100)
w=this.y
s=w.av([v,t])
w.c.n(0,s)
for(r=-2;r<3;++r)for(y=r*20*4,q=-2;q<3;++q){w=this.y
p=J.aO(S.aX(C.b))
if(null==p)p=F.cX().$0()
o=new Float32Array(3)
o[0]=y
o[1]=q*20*4
o[2]=1000
p.sA(new T.D(o))
o=$.$get$cV().dr(2)
n=J.aO(S.aX(C.l))
if(null==n)n=F.eS().$0()
J.d4(n,o)
s=w.av([p,n])
w.c.n(0,s)}},
c3:function(a,b){var z,y,x
a=P.cT(800,a)
b=P.cT(600,b)
z=this.a
y=J.m(z)
y.sl(z,a)
y.sk(z,b)
y=z.style
x=""+a+"px"
y.width=x
z=z.style
y=""+b+"px"
z.height=y
H.ag(this.b,"$iscr").viewport(0,0,a,b)
z=H.ag(this.y.z.h(0,C.n),"$iscc")
z.b=a
z.c=b},
e8:function(){var z,y
$.a2=183
this.y.aD(new F.cc(null,null,null))
this.y.aD(new F.eh(null,null,null,null))
z=this.y
y=H.c(new H.R(0,null,null,null,null,null,0),[P.K,S.ai])
z.aD(new S.ct(y,H.c(new H.R(0,null,null,null,null,null,0),[S.ai,P.K]),null))
this.c3(window.innerWidth,window.innerHeight)
z=C.E.c2(window)
H.c(new W.af(0,z.a,z.b,W.a1(new F.hb(this)),!1),[H.x(z,0)]).Z()},
u:{
fU:function(){var z,y,x,w
z=document.querySelector("#game")
y=H.ag(document.querySelector("#game"),"$isc7")
y.toString
x=P.a6(["alpha",!0,"depth",!0,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
w=(y&&C.p).cs(y,"webgl",x)
if(w==null)w=C.p.cs(y,"experimental-webgl",x)
y=w
y=new F.fT(z,y,new L.ha("ld35",null),null,null,800,600,!0,null,null,null,null,null,!1)
y.e9("ld35","#game",800,600,null,null,!0)
y.e8()
return y}}},hb:{"^":"d:0;a",
$1:function(a){return this.a.c3(window.innerWidth,window.innerHeight)}},hj:{"^":"bj;z,Q,ch,cx,cy,df:db>,dx,a,b,c,d,e,f,r,x,y",
J:function(){var z,y,x
z=this.b
y=H.c(new S.J(null,null),[F.v])
y.N(C.b,z,F.v)
this.cx=y
this.z=this.b.x.h(0,C.a4)
this.ch=this.b.z.h(0,C.f)
this.Q=this.b.z.h(0,C.n)
y=this.cy
z=J.m(y)
x=z.gdv(y)
H.c(new W.af(0,x.a,x.b,W.a1(this.gfP()),!1),[H.x(x,0)]).Z()
y=z.gdu(y)
H.c(new W.af(0,y.a,y.b,W.a1(this.gfO()),!1),[H.x(y,0)]).Z()},
aO:function(){var z,y,x,w,v
z=this.db
if(typeof z!=="number")return z.O()
if(z>0)this.z.h3()
else if(z<0)this.z.ha()
this.db=0
y=this.ch.ao("player")
z=J.A(this.cx.b,J.T(y)).gA()
x=this.dx
x=x.gq(x)
w=this.dx
w=w.gt(w)
v=new Float32Array(H.l(2))
v[0]=x
v[1]=w
z=z.a
z[0]=v[0]
z[1]=v[1]},
hw:[function(a){var z=J.m(a)
this.db=z.gdf(a)
z.h9(a)},"$1","gfP",2,0,34],
hv:[function(a){var z,y,x
z=J.d1(a)
y=J.d3(this.Q)
if(typeof y!=="number")return y.a2()
x=J.d0(this.Q)
if(typeof x!=="number")return x.a2()
this.dx=z.p(0,H.c(new P.a0(y/2,x/2),[null]))},"$1","gfO",2,0,16]},hU:{"^":"cA;ch,cx,cy,db,dx,dy,fr,fx,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=J.m(b)
y=J.A(this.ch.b,z.gB(b))
x=J.A(this.cx.b,z.gB(b))
w=J.A(this.cy.b,z.gB(b))
v=a*x.ga1().length
u=a*x.gaJ().length
for(t=0;t<x.gaJ().length;++t){z=this.dx
s=u+t
r=x.gaJ()
if(t>=r.length)return H.a(r,t)
r=r[t]
if(s>=z.length)return H.a(z,s)
z[s]=r}for(t=0;t<x.ga1().length;t+=3){z=this.db
s=v+t
r=x.ga1()
if(t>=r.length)return H.a(r,t)
r=J.t(J.z(r[t],w.gax()),y.gA().a[0])
if(s>=z.length)return H.a(z,s)
z[s]=r
r=this.db
z=s+1
q=x.ga1()
p=t+1
if(p>=q.length)return H.a(q,p)
p=J.t(J.z(q[p],w.gax()),y.gA().a[1])
if(z>=r.length)return H.a(r,z)
r[z]=p
p=this.db
s+=2
z=x.ga1()
r=t+2
if(r>=z.length)return H.a(z,r)
r=J.t(z[r],y.gA().a[2])
if(s>=p.length)return H.a(p,s)
p[s]=r}},
ce:function(a){var z=this.z
z.uniformMatrix4fv(J.c0(z,this.gS(),"uViewProjection"),!1,this.fx.bY().gaA())
this.bW(this.dy,this.db,this.dx)
z.drawElements(4,this.dx.length,5123,0)},
co:function(a){var z,y
z=J.b7(a)
y=this.fr
this.db=new Float32Array(H.l(J.z(z.D(a,61),y)))
this.dx=new Uint16Array(H.l(J.z(z.D(a,60),y)))},
gc0:function(){return"PlayerRenderingSystem"},
gcp:function(){return"PlayerRenderingSystem"},
J:function(){var z,y
this.bp()
z=this.b
y=H.c(new S.J(null,null),[F.al])
y.N(C.i,z,F.al)
this.cy=y
y=this.b
z=H.c(new S.J(null,null),[F.ap])
z.N(C.k,y,F.ap)
this.cx=z
z=this.b
y=H.c(new S.J(null,null),[F.v])
y.N(C.b,z,F.v)
this.ch=y
this.fx=this.b.z.h(0,C.m)}},ir:{"^":"cA;ch,cx,cy,db,dx,dy,fr,fx,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=J.m(b)
y=J.A(this.ch.b,z.gB(b))
x=J.A(this.cx.b,z.gB(b))
z=this.fr
w=a*z
v=this.dy
u=w*v
t=w*3
for(s=0;s<z;s+=2){r=6.283185307179586*s/z
q=u+s*3
w=this.cy
p=Math.sin(r)
o=x.gax()
if(typeof o!=="number")return H.i(o)
if(q>=w.length)return H.a(w,q)
w[q]=p*o
o=this.cy
p=q+1
w=Math.cos(r)
n=x.gax()
if(typeof n!=="number")return H.i(n)
if(p>=o.length)return H.a(o,p)
o[p]=w*n
n=this.cy
w=q+2
o=y.gA().a[2]
if(w>=n.length)return H.a(n,w)
n[w]=o
o=this.cy
n=q+3
m=o.length
if(q>=m)return H.a(o,q)
l=o[q]
if(n>=m)return H.a(o,n)
o[n]=l
l=q+4
if(p>=m)return H.a(o,p)
p=o[p]
if(l>=m)return H.a(o,l)
o[l]=p
p=q+5
if(w>=m)return H.a(o,w)
w=o[w]
l=x.gj(x)
if(typeof l!=="number")return H.i(l)
if(p>=m)return H.a(o,p)
o[p]=w+l}for(w=this.db,s=0;s<z;s+=2){q=C.a.W(u,v)+s
k=t+s*3
p=w.length
if(k>=p)return H.a(w,k)
w[k]=q
o=k+1
n=q+1
if(o>=p)return H.a(w,o)
w[o]=n
o=k+2
m=q+2
if(o>=p)return H.a(w,o)
w[o]=m
o=k+3
if(o>=p)return H.a(w,o)
w[o]=m
m=k+4
if(m>=p)return H.a(w,m)
w[m]=n
n=k+5
if(n>=p)return H.a(w,n)
w[n]=q+3}z=t+z*3
p=z-4
v=C.a.W(u,v)
o=w.length
if(p<0||p>=o)return H.a(w,p)
w[p]=v
p=z-3
if(p<0||p>=o)return H.a(w,p)
w[p]=v;--z
if(z<0||z>=o)return H.a(w,z)
w[z]=v+1},
ce:function(a){var z=this.z
z.uniformMatrix4fv(J.c0(z,this.gS(),"uViewProjection"),!1,this.fx.bY().gaA())
z.uniform1f(z.getUniformLocation(this.gS(),"uTime"),this.b.cy.h(0,this.y))
this.bW(this.dx,this.cy,this.db)
z.drawElements(4,this.db.length,5123,0)},
co:function(a){var z,y
z=this.fr
y=J.b7(a)
this.cy=new Float32Array(H.l(J.z(y.D(a,z),this.dy)))
this.db=new Uint16Array(H.l(J.z(y.D(a,z),3)))},
gcp:function(){return"TunnelSegmentRenderingSystem"},
gc0:function(){return"TunnelSegmentRenderingSystem"},
J:function(){var z,y
this.bp()
z=this.b
y=H.c(new S.J(null,null),[F.b_])
y.N(C.o,z,F.b_)
this.cx=y
y=this.b
z=H.c(new S.J(null,null),[F.v])
z.N(C.b,y,F.v)
this.ch=z
this.fx=this.b.z.h(0,C.m)}},hP:{"^":"cA;ch,cx,cy,db,dx,dy,fr,fx,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.m(b)
y=J.A(this.cx.b,z.gB(b))
x=J.A(this.ch.b,z.gB(b))
w=J.fd(y)
z=this.dy
v=this.fr
u=a*(z*v)
t=a*v*3
for(s=0;s<v;s+=2){r=u+s*z
q=t+s*3
switch(w){case 0:p=-0.7853981633974483+6.283185307179586*s/v
o=Math.cos(p)
n=Math.sin(p)
break
case 1:m=C.a.R(v,4)
l=C.a.W(s,m)
k=C.a.L(s,m)
switch(l){case 0:n=-1+2*(k/m)
o=1
break
case 1:o=1-2*(k/m)
n=1
break
case 2:n=1-2*(k/m)
o=-1
break
case 3:o=-1+2*(k/m)
n=-1
break
default:o=null
n=null}break
default:o=null
n=null}m=this.cy
j=x.gA().a[0]
if(typeof o!=="number")return o.D()
if(r>=m.length)return H.a(m,r)
m[r]=j+o*20*1.1
j=this.cy
m=r+1
i=x.gA().a[1]
if(typeof n!=="number")return n.D()
if(m>=j.length)return H.a(j,m)
j[m]=i+n*20*1.1
i=this.cy
m=r+2
j=x.gA().a[2]
if(m>=i.length)return H.a(i,m)
i[m]=j
j=C.a.R(v,4)
l=C.a.W(s,j)
k=C.a.L(s,j)
switch(l){case 0:n=-1+2*(k/j)
o=1
break
case 1:o=1-2*(k/j)
n=1
break
case 2:n=1-2*(k/j)
o=-1
break
case 3:o=-1+2*(k/j)
n=-1
break
default:o=null
n=null}m=this.cy
j=r+3
i=x.gA().a[0]
if(typeof o!=="number")return o.D()
if(j>=m.length)return H.a(m,j)
m[j]=i+o*20*2
i=this.cy
j=r+4
m=x.gA().a[1]
if(typeof n!=="number")return n.D()
if(j>=i.length)return H.a(i,j)
i[j]=m+n*20*2
m=this.cy
j=r+5
i=x.gA().a[2]
if(j>=m.length)return H.a(m,j)
m[j]=i
i=this.db
j=C.a.W(r,z)
m=i.length
if(q>=m)return H.a(i,q)
i[q]=j
h=q+1
g=j+1
if(h>=m)return H.a(i,h)
i[h]=g
h=q+2
f=j+2
if(h>=m)return H.a(i,h)
i[h]=f
h=q+3
if(h>=m)return H.a(i,h)
i[h]=f
f=q+4
if(f>=m)return H.a(i,f)
i[f]=g
g=q+5
if(g>=m)return H.a(i,g)
i[g]=j+3}m=this.db
v=t+v*3
j=v-1
z=C.a.W(u,z)
i=m.length
if(j<0||j>=i)return H.a(m,j)
m[j]=z+1
j=v-3
if(j<0||j>=i)return H.a(m,j)
m[j]=z
v-=4
if(v<0||v>=i)return H.a(m,v)
m[v]=z},
ce:function(a){var z=this.z
z.uniformMatrix4fv(J.c0(z,this.gS(),"uViewProjection"),!1,this.fx.bY().gaA())
this.bW(this.dx,this.cy,this.db)
z.drawElements(4,this.db.length,5123,0)},
co:function(a){var z,y
z=this.fr
y=J.b7(a)
this.cy=new Float32Array(H.l(J.z(y.D(a,z),this.dy)))
this.db=new Uint16Array(H.l(J.z(y.D(a,z),3)))},
gcp:function(){return"ObstacleRenderingSystem"},
gc0:function(){return"ObstacleRenderingSystem"},
J:function(){var z,y
this.bp()
z=this.b
y=H.c(new S.J(null,null),[F.aY])
y.N(C.l,z,F.aY)
this.cx=y
y=this.b
z=H.c(new S.J(null,null),[F.v])
z.N(C.b,y,F.v)
this.ch=z
this.fx=this.b.z.h(0,C.m)}}}],["","",,H,{"^":"",
bu:function(){return new P.aF("No element")},
hw:function(){return new P.aF("Too few elements")},
by:{"^":"N;",
gM:function(a){return H.c(new H.dF(this,this.gj(this),0,null),[H.M(this,"by",0)])},
F:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.a8(0,y))
if(z!==this.gj(this))throw H.f(new P.V(this))}},
al:function(a,b){return H.c(new H.bB(this,b),[null,null])},
cm:function(a,b){var z,y,x
z=H.c([],[H.M(this,"by",0)])
C.c.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.a8(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bh:function(a){return this.cm(a,!0)},
$isu:1},
dF:{"^":"b;a,b,c,d",
gE:function(){return this.d},
C:function(){var z,y,x,w
z=this.a
y=J.P(z)
x=y.gj(z)
if(this.b!==x)throw H.f(new P.V(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a8(z,w);++this.c
return!0}},
dG:{"^":"N;a,b",
gM:function(a){var z=new H.hG(null,J.aN(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.b8(this.a)},
$asN:function(a,b){return[b]},
u:{
bf:function(a,b,c,d){if(!!J.j(a).$isu)return H.c(new H.dp(a,b),[c,d])
return H.c(new H.dG(a,b),[c,d])}}},
dp:{"^":"dG;a,b",$isu:1},
hG:{"^":"bv;a,b,c",
C:function(){var z=this.b
if(z.C()){this.a=this.ae(z.gE())
return!0}this.a=null
return!1},
gE:function(){return this.a},
ae:function(a){return this.c.$1(a)},
$asbv:function(a,b){return[b]}},
bB:{"^":"by;a,b",
gj:function(a){return J.b8(this.a)},
a8:function(a,b){return this.ae(J.f9(this.a,b))},
ae:function(a){return this.b.$1(a)},
$asby:function(a,b){return[b]},
$asN:function(a,b){return[b]},
$isu:1},
ei:{"^":"N;a,b",
gM:function(a){var z=new H.iD(J.aN(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
iD:{"^":"bv;a,b",
C:function(){for(var z=this.a;z.C();)if(this.ae(z.gE())===!0)return!0
return!1},
gE:function(){return this.a.gE()},
ae:function(a){return this.b.$1(a)}},
ij:{"^":"N;a,b",
gM:function(a){var z=new H.ik(J.aN(this.a),this.b,!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
ik:{"^":"bv;a,b,c",
C:function(){if(this.c)return!1
var z=this.a
if(!z.C()||this.ae(z.gE())!==!0){this.c=!0
return!1}return!0},
gE:function(){if(this.c)return
return this.a.gE()},
ae:function(a){return this.b.$1(a)}},
du:{"^":"b;",
sj:function(a,b){throw H.f(new P.F("Cannot change the length of a fixed-length list"))},
n:function(a,b){throw H.f(new P.F("Cannot add to a fixed-length list"))},
a6:function(a){throw H.f(new P.F("Cannot remove from a fixed-length list"))}}}],["","",,H,{"^":"",
eK:function(a){var z=H.c(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
iX:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.k4()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aM(new P.iZ(z),1)).observe(y,{childList:true})
return new P.iY(z,y,x)}else if(self.setImmediate!=null)return P.k5()
return P.k6()},
mz:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aM(new P.j_(a),0))},"$1","k4",2,0,5],
mA:[function(a){++init.globalState.f.b
self.setImmediate(H.aM(new P.j0(a),0))},"$1","k5",2,0,5],
mB:[function(a){P.cu(C.r,a)},"$1","k6",2,0,5],
ez:function(a,b){var z=H.bn()
z=H.aL(z,[z,z]).af(a)
if(z){b.toString
return a}else{b.toString
return a}},
cb:function(a,b,c){var z,y,x,w,v,u
z={}
y=H.c(new P.a9(0,$.n,null),[P.k])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.fS(z,!1,b,y)
for(w=a.length,v=0;v<a.length;a.length===w||(0,H.cZ)(a),++v)a[v].cl(new P.fR(z,!1,b,y,z.b++),x)
x=z.b
if(x===0){z=H.c(new P.a9(0,$.n,null),[null])
z.bt(C.S)
return z}u=new Array(x)
u.fixed$length=Array
z.a=u
return y},
k_:function(){var z,y
for(;z=$.aJ,z!=null;){$.b4=null
y=z.b
$.aJ=y
if(y==null)$.b3=null
z.a.$0()}},
mN:[function(){$.cJ=!0
try{P.k_()}finally{$.b4=null
$.cJ=!1
if($.aJ!=null)$.$get$cB().$1(P.eI())}},"$0","eI",0,0,2],
eE:function(a){var z=new P.ej(a,null)
if($.aJ==null){$.b3=z
$.aJ=z
if(!$.cJ)$.$get$cB().$1(P.eI())}else{$.b3.b=z
$.b3=z}},
k2:function(a){var z,y,x
z=$.aJ
if(z==null){P.eE(a)
$.b4=$.b3
return}y=new P.ej(a,null)
x=$.b4
if(x==null){y.b=z
$.b4=y
$.aJ=y}else{y.b=x.b
x.b=y
$.b4=y
if(y.b==null)$.b3=y}},
eR:function(a){var z=$.n
if(C.d===z){P.ar(null,null,C.d,a)
return}z.toString
P.ar(null,null,z,z.bU(a,!0))},
eD:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.j(z).$isa5)return z
return}catch(w){v=H.W(w)
y=v
x=H.S(w)
v=$.n
v.toString
P.b5(null,null,v,y,x)}},
k1:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.W(u)
z=t
y=H.S(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.aa(x)
w=t
v=x.ga7()
c.$2(w,v)}}},
jS:function(a,b,c,d){var z=a.b9()
if(!!J.j(z).$isa5)z.cr(new P.jV(b,c,d))
else b.a4(c,d)},
jT:function(a,b){return new P.jU(a,b)},
jR:function(a,b,c){$.n.toString
a.br(b,c)},
e0:function(a,b){var z=$.n
if(z===C.d){z.toString
return P.cu(a,b)}return P.cu(a,z.bU(b,!0))},
cu:function(a,b){var z=C.a.R(a.a,1000)
return H.io(z<0?0:z,b)},
b5:function(a,b,c,d,e){var z={}
z.a=d
P.k2(new P.k0(z,e))},
eA:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
eC:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
eB:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
ar:function(a,b,c,d){var z=C.d!==c
if(z)d=c.bU(d,!(!z||!1))
P.eE(d)},
iZ:{"^":"d:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
iY:{"^":"d:22;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
j_:{"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
j0:{"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
j1:{"^":"el;a"},
j3:{"^":"j7;y,b1:z@,cF:Q?,x,a,b,c,d,e,f,r",
gb_:function(){return this.x},
b3:[function(){},"$0","gb2",0,0,2],
b5:[function(){},"$0","gb4",0,0,2]},
j2:{"^":"b;ah:c@,b1:d?,cF:e?",
geM:function(){return this.c<4},
eW:function(a){var z,y
z=a.Q
y=a.z
z.sb1(y)
y.scF(z)
a.Q=a
a.z=a},
f2:function(a,b,c,d){var z,y
if((this.c&4)!==0){z=new P.jd($.n,0,c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.cX()
return z}z=$.n
y=new P.j3(0,null,null,this,null,null,null,z,d?1:0,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.cC(a,b,c,d,H.x(this,0))
y.Q=y
y.z=y
z=this.e
y.Q=z
y.z=this
z.sb1(y)
this.e=y
y.y=this.c&1
if(this.d===y)P.eD(this.a)
return y},
eQ:function(a){var z
if(a.gb1()===a)return
z=a.y
if((z&2)!==0)a.y=(z|4)>>>0
else{this.eW(a)
if((this.c&2)===0&&this.d===this)this.el()}return},
eR:function(a){},
eS:function(a){},
ef:function(){if((this.c&4)!==0)return new P.aF("Cannot add new events after calling close")
return new P.aF("Cannot add new events while doing an addStream")},
n:function(a,b){if(!this.geM())throw H.f(this.ef())
this.aC(b)},
aY:function(a){this.aC(a)},
el:function(){if((this.c&4)!==0&&this.r.a===0)this.r.bt(null)
P.eD(this.b)}},
iV:{"^":"j2;a,b,c,d,e,f,r",
aC:function(a){var z
for(z=this.d;z!==this;z=z.z)z.aX(H.c(new P.em(a,null),[null]))}},
a5:{"^":"b;"},
fS:{"^":"d:24;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.a4(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.a4(z.c,z.d)}},
fR:{"^":"d:32;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.a(x,z)
x[z]=a
if(y===0)this.d.bB(x)}else if(z.b===0&&!this.b)this.d.a4(z.c,z.d)}},
j6:{"^":"b;",
fn:[function(a,b){var z
a=a!=null?a:new P.cm()
z=this.a
if(z.a!==0)throw H.f(new P.aF("Future already completed"))
$.n.toString
z.ej(a,b)},function(a){return this.fn(a,null)},"fm","$2","$1","gfl",2,2,33,0]},
iW:{"^":"j6;a",
fk:function(a,b){var z=this.a
if(z.a!==0)throw H.f(new P.aF("Future already completed"))
z.bt(b)}},
er:{"^":"b;bK:a<,b,c,d,e",
gf7:function(){return this.b.b},
gdk:function(){return(this.c&1)!==0},
gfS:function(){return(this.c&2)!==0},
gfT:function(){return this.c===6},
gdj:function(){return this.c===8},
geN:function(){return this.d},
gf6:function(){return this.d}},
a9:{"^":"b;ah:a@,b,eZ:c<",
geJ:function(){return this.a===2},
gbH:function(){return this.a>=4},
cl:function(a,b){var z,y
z=$.n
if(z!==C.d){z.toString
if(b!=null)b=P.ez(b,z)}y=H.c(new P.a9(0,z,null),[null])
this.bs(new P.er(null,y,b==null?1:3,a,b))
return y},
a0:function(a){return this.cl(a,null)},
cr:function(a){var z,y
z=$.n
y=new P.a9(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.bs(new P.er(null,y,8,a,null))
return y},
bs:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gbH()){y.bs(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.ar(null,null,z,new P.ji(this,a))}},
cT:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gbK()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gbH()){v.cT(a)
return}this.a=v.a
this.c=v.c}z.a=this.b8(a)
y=this.b
y.toString
P.ar(null,null,y,new P.jq(z,this))}},
b7:function(){var z=this.c
this.c=null
return this.b8(z)},
b8:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gbK()
z.a=y}return y},
bz:function(a){var z
if(!!J.j(a).$isa5)P.bL(a,this)
else{z=this.b7()
this.a=4
this.c=a
P.aH(this,z)}},
bB:function(a){var z=this.b7()
this.a=4
this.c=a
P.aH(this,z)},
a4:[function(a,b){var z=this.b7()
this.a=8
this.c=new P.b9(a,b)
P.aH(this,z)},function(a){return this.a4(a,null)},"ho","$2","$1","gbA",2,2,11,0],
bt:function(a){var z
if(a==null);else if(!!J.j(a).$isa5){if(a.a===8){this.a=1
z=this.b
z.toString
P.ar(null,null,z,new P.jk(this,a))}else P.bL(a,this)
return}this.a=1
z=this.b
z.toString
P.ar(null,null,z,new P.jl(this,a))},
ej:function(a,b){var z
this.a=1
z=this.b
z.toString
P.ar(null,null,z,new P.jj(this,a,b))},
$isa5:1,
u:{
jm:function(a,b){var z,y,x,w
b.sah(1)
try{a.cl(new P.jn(b),new P.jo(b))}catch(x){w=H.W(x)
z=w
y=H.S(x)
P.eR(new P.jp(b,z,y))}},
bL:function(a,b){var z,y,x
for(;a.geJ();)a=a.c
z=a.gbH()
y=b.c
if(z){b.c=null
x=b.b8(y)
b.a=a.a
b.c=a.c
P.aH(b,x)}else{b.a=2
b.c=a
a.cT(y)}},
aH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.aa(v)
x=v.ga7()
z.toString
P.b5(null,null,z,y,x)}return}for(;b.gbK()!=null;b=u){u=b.a
b.a=null
P.aH(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gdk()||b.gdj()){s=b.gf7()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.aa(v)
r=v.ga7()
y.toString
P.b5(null,null,y,x,r)
return}q=$.n
if(q==null?s!=null:q!==s)$.n=s
else q=null
if(b.gdj())new P.jt(z,x,w,b,s).$0()
else if(y){if(b.gdk())new P.js(x,w,b,t,s).$0()}else if(b.gfS())new P.jr(z,x,b,s).$0()
if(q!=null)$.n=q
y=x.b
r=J.j(y)
if(!!r.$isa5){p=b.b
if(!!r.$isa9)if(y.a>=4){o=p.c
p.c=null
b=p.b8(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.bL(y,p)
else P.jm(y,p)
return}}p=b.b
b=p.b7()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
ji:{"^":"d:1;a,b",
$0:function(){P.aH(this.a,this.b)}},
jq:{"^":"d:1;a,b",
$0:function(){P.aH(this.b,this.a.a)}},
jn:{"^":"d:0;a",
$1:function(a){this.a.bB(a)}},
jo:{"^":"d:10;a",
$2:function(a,b){this.a.a4(a,b)},
$1:function(a){return this.$2(a,null)}},
jp:{"^":"d:1;a,b,c",
$0:function(){this.a.a4(this.b,this.c)}},
jk:{"^":"d:1;a,b",
$0:function(){P.bL(this.b,this.a)}},
jl:{"^":"d:1;a,b",
$0:function(){this.a.bB(this.b)}},
jj:{"^":"d:1;a,b,c",
$0:function(){this.a.a4(this.b,this.c)}},
js:{"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
try{x=this.a
x.b=this.e.cj(this.c.geN(),this.d)
x.a=!1}catch(w){x=H.W(w)
z=x
y=H.S(w)
x=this.a
x.b=new P.b9(z,y)
x.a=!0}}},
jr:{"^":"d:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.c
y=!0
r=this.c
if(r.gfT()){x=r.d
try{y=this.d.cj(x,J.aa(z))}catch(q){r=H.W(q)
w=r
v=H.S(q)
r=J.aa(z)
p=w
o=(r==null?p==null:r===p)?z:new P.b9(w,v)
r=this.b
r.b=o
r.a=!0
return}}u=r.e
if(y===!0&&u!=null)try{r=u
p=H.bn()
p=H.aL(p,[p,p]).af(r)
n=this.d
m=this.b
if(p)m.b=n.hg(u,J.aa(z),z.ga7())
else m.b=n.cj(u,J.aa(z))
m.a=!1}catch(q){r=H.W(q)
t=r
s=H.S(q)
r=J.aa(z)
p=t
o=(r==null?p==null:r===p)?z:new P.b9(t,s)
r=this.b
r.b=o
r.a=!0}}},
jt:{"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u
z=null
try{z=this.e.dA(this.d.gf6())}catch(w){v=H.W(w)
y=v
x=H.S(w)
if(this.c){v=J.aa(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.b9(y,x)
u.a=!0
return}if(!!J.j(z).$isa5){if(z instanceof P.a9&&z.gah()>=4){if(z.gah()===8){v=this.b
v.b=z.geZ()
v.a=!0}return}v=this.b
v.b=z.a0(new P.ju(this.a.a))
v.a=!1}}},
ju:{"^":"d:0;a",
$1:function(a){return this.a}},
ej:{"^":"b;a,b"},
ae:{"^":"b;",
al:function(a,b){return H.c(new P.jF(b,this),[H.M(this,"ae",0),null])},
F:function(a,b){var z,y
z={}
y=H.c(new P.a9(0,$.n,null),[null])
z.a=null
z.a=this.ab(new P.ic(z,this,b,y),!0,new P.id(y),y.gbA())
return y},
gj:function(a){var z,y
z={}
y=H.c(new P.a9(0,$.n,null),[P.p])
z.a=0
this.ab(new P.ie(z),!0,new P.ig(z,y),y.gbA())
return y},
bh:function(a){var z,y
z=H.c([],[H.M(this,"ae",0)])
y=H.c(new P.a9(0,$.n,null),[[P.k,H.M(this,"ae",0)]])
this.ab(new P.ih(this,z),!0,new P.ii(z,y),y.gbA())
return y}},
ic:{"^":"d;a,b,c,d",
$1:function(a){P.k1(new P.ia(this.c,a),new P.ib(),P.jT(this.a.a,this.d))},
$signature:function(){return H.cN(function(a){return{func:1,args:[a]}},this.b,"ae")}},
ia:{"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
ib:{"^":"d:0;",
$1:function(a){}},
id:{"^":"d:1;a",
$0:function(){this.a.bz(null)}},
ie:{"^":"d:0;a",
$1:function(a){++this.a.a}},
ig:{"^":"d:1;a,b",
$0:function(){this.b.bz(this.a.a)}},
ih:{"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.cN(function(a){return{func:1,args:[a]}},this.a,"ae")}},
ii:{"^":"d:1;a,b",
$0:function(){this.b.bz(this.a)}},
i9:{"^":"b;"},
el:{"^":"jO;a",
gG:function(a){return(H.ac(this.a)^892482866)>>>0},
v:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.el))return!1
return b.a===this.a}},
j7:{"^":"cC;b_:x<",
bL:function(){return this.gb_().eQ(this)},
b3:[function(){this.gb_().eR(this)},"$0","gb2",0,0,2],
b5:[function(){this.gb_().eS(this)},"$0","gb4",0,0,2]},
mF:{"^":"b;"},
cC:{"^":"b;ah:e@",
aN:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.d9()
if((z&4)===0&&(this.e&32)===0)this.cP(this.gb2())},
c8:function(a){return this.aN(a,null)},
cf:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gaa(z)}else z=!1
if(z)this.r.bk(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cP(this.gb4())}}}},
b9:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bu()
return this.f},
bu:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.d9()
if((this.e&32)===0)this.r=null
this.f=this.bL()},
aY:["e4",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.aC(a)
else this.aX(H.c(new P.em(a,null),[null]))}],
br:["e5",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cY(a,b)
else this.aX(new P.jc(a,b,null))}],
ei:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bO()
else this.aX(C.z)},
b3:[function(){},"$0","gb2",0,0,2],
b5:[function(){},"$0","gb4",0,0,2],
bL:function(){return},
aX:function(a){var z,y
z=this.r
if(z==null){z=new P.jP(null,null,0)
this.r=z}z.n(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bk(this)}},
aC:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.ck(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bx((z&4)!==0)},
cY:function(a,b){var z,y
z=this.e
y=new P.j5(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bu()
z=this.f
if(!!J.j(z).$isa5)z.cr(y)
else y.$0()}else{y.$0()
this.bx((z&4)!==0)}},
bO:function(){var z,y
z=new P.j4(this)
this.bu()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.j(y).$isa5)y.cr(z)
else z.$0()},
cP:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bx((z&4)!==0)},
bx:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gaa(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gaa(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.b3()
else this.b5()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bk(this)},
cC:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ez(b,z)
this.c=c}},
j5:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.bn()
x=H.aL(x,[x,x]).af(y)
w=z.d
v=this.b
u=z.b
if(x)w.hh(u,v,this.c)
else w.ck(u,v)
z.e=(z.e&4294967263)>>>0}},
j4:{"^":"d:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ci(z.c)
z.e=(z.e&4294967263)>>>0}},
jO:{"^":"ae;",
ab:function(a,b,c,d){return this.a.f2(a,d,c,!0===b)},
c6:function(a,b,c){return this.ab(a,null,b,c)}},
en:{"^":"b;be:a@"},
em:{"^":"en;b,a",
c9:function(a){a.aC(this.b)}},
jc:{"^":"en;aH:b>,a7:c<,a",
c9:function(a){a.cY(this.b,this.c)}},
jb:{"^":"b;",
c9:function(a){a.bO()},
gbe:function(){return},
sbe:function(a){throw H.f(new P.aF("No events after a done."))}},
jH:{"^":"b;ah:a@",
bk:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eR(new P.jI(this,a))
this.a=1},
d9:function(){if(this.a===1)this.a=3}},
jI:{"^":"d:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbe()
z.b=w
if(w==null)z.c=null
x.c9(this.b)}},
jP:{"^":"jH;b,c,a",
gaa:function(a){return this.c==null},
n:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbe(b)
this.c=b}}},
jd:{"^":"b;a,ah:b@,c",
cX:function(){var z,y
if((this.b&2)!==0)return
z=this.a
y=this.gf_()
z.toString
P.ar(null,null,z,y)
this.b=(this.b|2)>>>0},
aN:function(a,b){this.b+=4},
c8:function(a){return this.aN(a,null)},
cf:function(){var z=this.b
if(z>=4){z-=4
this.b=z
if(z<4&&(z&1)===0)this.cX()}},
b9:function(){return},
bO:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.ci(this.c)},"$0","gf_",0,0,2]},
jV:{"^":"d:1;a,b,c",
$0:function(){return this.a.a4(this.b,this.c)}},
jU:{"^":"d:13;a,b",
$2:function(a,b){return P.jS(this.a,this.b,a,b)}},
cD:{"^":"ae;",
ab:function(a,b,c,d){return this.er(a,d,c,!0===b)},
c6:function(a,b,c){return this.ab(a,null,b,c)},
er:function(a,b,c,d){return P.jh(this,a,b,c,d,H.M(this,"cD",0),H.M(this,"cD",1))},
cQ:function(a,b){b.aY(a)},
$asae:function(a,b){return[b]}},
eq:{"^":"cC;x,y,a,b,c,d,e,f,r",
aY:function(a){if((this.e&2)!==0)return
this.e4(a)},
br:function(a,b){if((this.e&2)!==0)return
this.e5(a,b)},
b3:[function(){var z=this.y
if(z==null)return
z.c8(0)},"$0","gb2",0,0,2],
b5:[function(){var z=this.y
if(z==null)return
z.cf()},"$0","gb4",0,0,2],
bL:function(){var z=this.y
if(z!=null){this.y=null
return z.b9()}return},
hr:[function(a){this.x.cQ(a,this)},"$1","geB",2,0,function(){return H.cN(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"eq")}],
ht:[function(a,b){this.br(a,b)},"$2","geD",4,0,14],
hs:[function(){this.ei()},"$0","geC",0,0,2],
ed:function(a,b,c,d,e,f,g){var z,y
z=this.geB()
y=this.geD()
this.y=this.x.a.c6(z,this.geC(),y)},
$ascC:function(a,b){return[b]},
u:{
jh:function(a,b,c,d,e,f,g){var z=$.n
z=H.c(new P.eq(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cC(b,c,d,e,g)
z.ed(a,b,c,d,e,f,g)
return z}}},
jF:{"^":"cD;b,a",
cQ:function(a,b){var z,y,x,w,v
z=null
try{z=this.f3(a)}catch(w){v=H.W(w)
y=v
x=H.S(w)
P.jR(b,y,x)
return}b.aY(z)},
f3:function(a){return this.b.$1(a)}},
b9:{"^":"b;aH:a>,a7:b<",
i:function(a){return H.e(this.a)},
$isQ:1},
jQ:{"^":"b;"},
k0:{"^":"d:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cm()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.f(z)
x=H.f(z)
x.stack=J.av(y)
throw x}},
jK:{"^":"jQ;",
ci:function(a){var z,y,x,w
try{if(C.d===$.n){x=a.$0()
return x}x=P.eA(null,null,this,a)
return x}catch(w){x=H.W(w)
z=x
y=H.S(w)
return P.b5(null,null,this,z,y)}},
ck:function(a,b){var z,y,x,w
try{if(C.d===$.n){x=a.$1(b)
return x}x=P.eC(null,null,this,a,b)
return x}catch(w){x=H.W(w)
z=x
y=H.S(w)
return P.b5(null,null,this,z,y)}},
hh:function(a,b,c){var z,y,x,w
try{if(C.d===$.n){x=a.$2(b,c)
return x}x=P.eB(null,null,this,a,b,c)
return x}catch(w){x=H.W(w)
z=x
y=H.S(w)
return P.b5(null,null,this,z,y)}},
bU:function(a,b){if(b)return new P.jL(this,a)
else return new P.jM(this,a)},
fd:function(a,b){return new P.jN(this,a)},
h:function(a,b){return},
dA:function(a){if($.n===C.d)return a.$0()
return P.eA(null,null,this,a)},
cj:function(a,b){if($.n===C.d)return a.$1(b)
return P.eC(null,null,this,a,b)},
hg:function(a,b,c){if($.n===C.d)return a.$2(b,c)
return P.eB(null,null,this,a,b,c)}},
jL:{"^":"d:1;a,b",
$0:function(){return this.a.ci(this.b)}},
jM:{"^":"d:1;a,b",
$0:function(){return this.a.dA(this.b)}},
jN:{"^":"d:0;a,b",
$1:function(a){return this.a.ck(this.b,a)}}}],["","",,P,{"^":"",
ci:function(a,b){return H.c(new H.R(0,null,null,null,null,null,0),[a,b])},
hE:function(){return H.c(new H.R(0,null,null,null,null,null,0),[null,null])},
a6:function(a){return H.kd(a,H.c(new H.R(0,null,null,null,null,null,0),[null,null]))},
dB:function(a,b,c){var z,y
if(P.cK(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$b6()
y.push(a)
try{P.jX(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.dY(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bt:function(a,b,c){var z,y,x
if(P.cK(a))return b+"..."+c
z=new P.cs(b)
y=$.$get$b6()
y.push(a)
try{x=z
x.a=P.dY(x.gaq(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.a=y.gaq()+c
y=z.gaq()
return y.charCodeAt(0)==0?y:y},
cK:function(a){var z,y
for(z=0;y=$.$get$b6(),z<y.length;++z)if(a===y[z])return!0
return!1},
jX:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.aN(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.C())return
w=H.e(z.gE())
b.push(w)
y+=w.length+2;++x}if(!z.C()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gE();++x
if(!z.C()){if(x<=4){b.push(H.e(t))
return}v=H.e(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gE();++x
for(;z.C();t=s,s=r){r=z.gE();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.e(t)
v=H.e(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aW:function(a,b,c,d){return H.c(new P.jz(0,null,null,null,null,null,0),[d])},
hH:function(a){var z,y,x
z={}
if(P.cK(a))return"{...}"
y=new P.cs("")
try{$.$get$b6().push(a)
x=y
x.a=x.gaq()+"{"
z.a=!0
J.bp(a,new P.hI(z,y))
z=y
z.a=z.gaq()+"}"}finally{z=$.$get$b6()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.gaq()
return z.charCodeAt(0)==0?z:z},
eu:{"^":"R;a,b,c,d,e,f,r",
aK:function(a){return H.ky(a)&0x3ffffff},
aL:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdl()
if(x==null?b==null:x===b)return y}return-1},
u:{
b2:function(a,b){return H.c(new P.eu(0,null,null,null,null,null,0),[a,b])}}},
jz:{"^":"jv;a,b,c,d,e,f,r",
gM:function(a){var z=H.c(new P.cF(this,this.r,null,null),[null])
z.c=z.a.e
return z},
gj:function(a){return this.a},
aE:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ep(b)},
ep:function(a){var z=this.d
if(z==null)return!1
return this.b0(z[this.aZ(a)],a)>=0},
dq:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.aE(0,a)?a:null
else return this.eL(a)},
eL:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aZ(a)]
x=this.b0(y,a)
if(x<0)return
return J.A(y,x).gcM()},
F:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.f(new P.V(this))
z=z.b}},
n:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cG()
this.b=z}return this.cG(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cG()
this.c=y}return this.cG(y,b)}else return this.Y(b)},
Y:function(a){var z,y,x
z=this.d
if(z==null){z=P.cG()
this.d=z}y=this.aZ(a)
x=z[y]
if(x==null)z[y]=[this.by(a)]
else{if(this.b0(x,a)>=0)return!1
x.push(this.by(a))}return!0},
am:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cH(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cH(this.c,b)
else return this.eT(b)},
eT:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aZ(a)]
x=this.b0(y,a)
if(x<0)return!1
this.cI(y.splice(x,1)[0])
return!0},
au:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cG:function(a,b){if(a[b]!=null)return!1
a[b]=this.by(b)
return!0},
cH:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cI(z)
delete a[b]
return!0},
by:function(a){var z,y
z=new P.jA(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cI:function(a){var z,y
z=a.gen()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aZ:function(a){return J.G(a)&0x3ffffff},
b0:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.C(a[y].gcM(),b))return y
return-1},
$isu:1,
u:{
cG:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
jA:{"^":"b;cM:a<,b,en:c<"},
cF:{"^":"b;a,b,c,d",
gE:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.V(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
jv:{"^":"i4;"},
dC:{"^":"b;",
al:function(a,b){return H.bf(this,b,H.M(this,"dC",0),null)},
F:function(a,b){var z
for(z=this.gM(this);z.C();)b.$1(z.gE())},
gj:function(a){var z,y
z=this.gM(this)
for(y=0;z.C();)++y
return y},
i:function(a){return P.dB(this,"(",")")}},
bz:{"^":"b;",
gM:function(a){return H.c(new H.dF(a,this.gj(a),0,null),[H.M(a,"bz",0)])},
a8:function(a,b){return this.h(a,b)},
F:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.a(a,y)
b.$1(a[y])
if(z!==a.length)throw H.f(new P.V(a))}},
al:function(a,b){return H.c(new H.bB(a,b),[null,null])},
fL:function(a,b,c){var z,y,x
z=this.gj(a)
for(y=b,x=0;x<z;++x){if(x>=a.length)return H.a(a,x)
y=c.$2(y,a[x])
if(z!==a.length)throw H.f(new P.V(a))}return y},
n:function(a,b){var z=this.gj(a)
this.sj(a,z+1)
if(z<0||z>=a.length)return H.a(a,z)
a[z]=b},
a6:function(a){var z,y,x
if(this.gj(a)===0)throw H.f(H.bu())
z=a.length
y=z-1
if(y<0)return H.a(a,y)
x=a[y]
this.sj(a,y)
return x},
fJ:function(a,b,c,d){var z
P.cq(b,c,this.gj(a),null,null,null)
for(z=b;J.bY(z,c);++z){if(z>>>0!==z||z>=a.length)return H.a(a,z)
a[z]=d}},
i:function(a){return P.bt(a,"[","]")},
$isk:1,
$ask:null,
$isu:1},
hI:{"^":"d:3;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.e(a)
z.a=y+": "
z.a+=H.e(b)}},
hF:{"^":"N;a,b,c,d",
gM:function(a){var z=new P.jB(this,this.c,this.d,this.b,null)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
F:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.B(new P.V(this))}},
gaa:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
n:function(a,b){this.Y(b)},
au:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.bt(this,"{","}")},
cd:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.f(H.bu());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
a6:function(a){var z,y,x,w
z=this.b
y=this.c
if(z===y)throw H.f(H.bu());++this.d
z=this.a
x=z.length
y=(y-1&x-1)>>>0
this.c=y
if(y<0||y>=x)return H.a(z,y)
w=z[y]
z[y]=null
return w},
Y:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.a(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cO();++this.d},
cO:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.c(z,[H.x(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.bn(y,0,w,z,x)
C.c.bn(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ea:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.c(z,[b])},
$isu:1,
u:{
bA:function(a,b){var z=H.c(new P.hF(null,0,0,0),[b])
z.ea(a,b)
return z}}},
jB:{"^":"b;a,b,c,d,e",
gE:function(){return this.e},
C:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.B(new P.V(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
i5:{"^":"b;",
al:function(a,b){return H.c(new H.dp(this,b),[H.x(this,0),null])},
i:function(a){return P.bt(this,"{","}")},
F:function(a,b){var z
for(z=H.c(new P.cF(this,this.r,null,null),[null]),z.c=z.a.e;z.C();)b.$1(z.d)},
$isu:1},
i4:{"^":"i5;"}}],["","",,P,{"^":"",
ds:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.av(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fN(a)},
fN:function(a){var z=J.j(a)
if(!!z.$isd)return z.i(a)
return H.bG(a)},
aT:function(a){return new P.jg(a)},
cj:function(a,b,c){var z,y
z=H.c([],[c])
for(y=J.aN(a);y.C();)z.push(y.gE())
return z},
bo:function(a){var z=H.e(a)
H.kz(z)},
cL:{"^":"b;"},
"+bool":0,
l2:{"^":"b;"},
X:{"^":"y;"},
"+double":0,
ab:{"^":"b;ar:a<",
w:function(a,b){return new P.ab(this.a+b.gar())},
p:function(a,b){return new P.ab(this.a-b.gar())},
D:function(a,b){if(typeof b!=="number")return H.i(b)
return new P.ab(C.e.aQ(this.a*b))},
W:function(a,b){if(b===0)throw H.f(new P.hk())
return new P.ab(C.a.W(this.a,b))},
V:function(a,b){return this.a<b.gar()},
O:function(a,b){return this.a>b.gar()},
cv:function(a,b){return this.a<=b.gar()},
U:function(a,b){return this.a>=b.gar()},
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.ab))return!1
return this.a===b.a},
gG:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.fF()
y=this.a
if(y<0)return"-"+new P.ab(-y).i(0)
x=z.$1(C.a.cc(C.a.R(y,6e7),60))
w=z.$1(C.a.cc(C.a.R(y,1e6),60))
v=new P.fE().$1(C.a.cc(y,1e6))
return""+C.a.R(y,36e8)+":"+H.e(x)+":"+H.e(w)+"."+H.e(v)},
bj:function(a){return new P.ab(-this.a)},
u:{
fD:function(a,b,c,d,e,f){return new P.ab(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fE:{"^":"d:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fF:{"^":"d:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Q:{"^":"b;",
ga7:function(){return H.S(this.$thrownJsError)}},
cm:{"^":"Q;",
i:function(a){return"Throw of null."}},
aw:{"^":"Q;a,b,c,d",
gbE:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbD:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.e(z)+")":""
z=this.d
x=z==null?"":": "+H.e(z)
w=this.gbE()+y+x
if(!this.a)return w
v=this.gbD()
u=P.ds(this.b)
return w+v+": "+H.e(u)},
u:{
a3:function(a){return new P.aw(!1,null,null,a)},
d6:function(a,b,c){return new P.aw(!0,a,b,c)}}},
cp:{"^":"aw;e,f,a,b,c,d",
gbE:function(){return"RangeError"},
gbD:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else{if(typeof x!=="number")return x.O()
if(typeof z!=="number")return H.i(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
u:{
hY:function(a){return new P.cp(null,null,!1,null,null,a)},
bH:function(a,b,c){return new P.cp(null,null,!0,a,b,"Value not in range")},
ak:function(a,b,c,d,e){return new P.cp(b,c,!0,a,d,"Invalid value")},
cq:function(a,b,c,d,e,f){if(typeof a!=="number")return H.i(a)
if(0>a||a>c)throw H.f(P.ak(a,0,c,"start",f))
if(typeof b!=="number")return H.i(b)
if(a>b||b>c)throw H.f(P.ak(b,a,c,"end",f))
return b}}},
hi:{"^":"aw;e,j:f>,a,b,c,d",
gbE:function(){return"RangeError"},
gbD:function(){if(J.bY(this.b,0))return": index must not be negative"
var z=this.f
if(J.C(z,0))return": no indices are valid"
return": index should be less than "+H.e(z)},
u:{
cd:function(a,b,c,d,e){var z=e!=null?e:J.b8(b)
return new P.hi(b,z,!0,a,c,"Index out of range")}}},
F:{"^":"Q;a",
i:function(a){return"Unsupported operation: "+this.a}},
eg:{"^":"Q;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.e(z):"UnimplementedError"}},
aF:{"^":"Q;a",
i:function(a){return"Bad state: "+this.a}},
V:{"^":"Q;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.ds(z))+"."}},
hR:{"^":"b;",
i:function(a){return"Out of Memory"},
ga7:function(){return},
$isQ:1},
dX:{"^":"b;",
i:function(a){return"Stack Overflow"},
ga7:function(){return},
$isQ:1},
fz:{"^":"Q;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
jg:{"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.e(z)}},
hk:{"^":"b;",
i:function(a){return"IntegerDivisionByZeroException"}},
fO:{"^":"b;a,b",
i:function(a){return"Expando:"+H.e(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.B(P.d6(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.cn(b,"expando$values")
return y==null?null:H.cn(y,z)},
m:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.cn(b,"expando$values")
if(y==null){y=new P.b()
H.dR(b,"expando$values",y)}H.dR(y,z,c)}}},
fQ:{"^":"b;"},
p:{"^":"y;"},
"+int":0,
N:{"^":"b;",
al:function(a,b){return H.bf(this,b,H.M(this,"N",0),null)},
aE:function(a,b){var z
for(z=this.gM(this);z.C();)if(J.C(z.gE(),b))return!0
return!1},
F:function(a,b){var z
for(z=this.gM(this);z.C();)b.$1(z.gE())},
cm:function(a,b){return P.cj(this,!0,H.M(this,"N",0))},
bh:function(a){return this.cm(a,!0)},
gj:function(a){var z,y
z=this.gM(this)
for(y=0;z.C();)++y
return y},
a8:function(a,b){var z,y,x
if(b<0)H.B(P.ak(b,0,null,"index",null))
for(z=this.gM(this),y=0;z.C();){x=z.gE()
if(b===y)return x;++y}throw H.f(P.cd(b,this,"index",null,y))},
i:function(a){return P.dB(this,"(",")")}},
bv:{"^":"b;"},
k:{"^":"b;",$ask:null,$isN:1,$isu:1},
"+List":0,
hO:{"^":"b;",
i:function(a){return"null"}},
"+Null":0,
y:{"^":"b;"},
"+num":0,
b:{"^":";",
v:function(a,b){return this===b},
gG:function(a){return H.ac(this)},
i:function(a){return H.bG(this)},
gK:function(a){return new H.a8(H.at(this),null)},
toString:function(){return this.i(this)}},
am:{"^":"b;"},
K:{"^":"b;"},
"+String":0,
cs:{"^":"b;aq:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
u:{
dY:function(a,b,c){var z=J.aN(b)
if(!z.C())return a
if(c.length===0){do a+=H.e(z.gE())
while(z.C())}else{a+=H.e(z.gE())
for(;z.C();)a=a+c+H.e(z.gE())}return a}}},
b0:{"^":"b;"}}],["","",,W,{"^":"",
de:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.Q)},
l6:[function(a){return"wheel"},"$1","kh",2,0,25],
dx:function(a,b,c){return W.hg(a,null,null,b,null,null,null,c).a0(new W.hf())},
hg:function(a,b,c,d,e,f,g,h){var z,y,x
z=H.c(new P.iW(H.c(new P.a9(0,$.n,null),[W.aU])),[W.aU])
y=new XMLHttpRequest()
C.G.h6(y,"GET",a,!0)
x=C.C.c2(y)
H.c(new W.af(0,x.a,x.b,W.a1(new W.hh(z,y)),!1),[H.x(x,0)]).Z()
x=C.B.c2(y)
H.c(new W.af(0,x.a,x.b,W.a1(z.gfl()),!1),[H.x(x,0)]).Z()
y.send()
return z.a},
aq:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
et:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
ex:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.ja(a)
if(!!J.j(z).$isI)return z
return}else return a},
a1:function(a){var z=$.n
if(z===C.d)return a
return z.fd(a,!0)},
q:{"^":"ba;",$isq:1,$isI:1,$isb:1,"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
kU:{"^":"q;H:type%",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
kW:{"^":"q;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
kX:{"^":"h;H:type=","%":"Blob|File"},
kY:{"^":"q;",$isI:1,$ish:1,"%":"HTMLBodyElement"},
d9:{"^":"q;H:type%",
P:function(a,b){return a.disabled.$1(b)},
$isd9:1,
"%":"HTMLButtonElement"},
c7:{"^":"q;k:height%,l:width%",
cs:function(a,b,c){return a.getContext(b,P.kb(c,null))},
$isc7:1,
"%":"HTMLCanvasElement"},
l1:{"^":"aE;j:length=",$ish:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
fx:{"^":"hl;j:length=",
ct:function(a,b){var z=this.ez(a,b)
return z!=null?z:""},
ez:function(a,b){if(W.de(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.dl()+b)},
ek:function(a,b){var z,y
z=$.$get$df()
y=z[b]
if(typeof y==="string")return y
y=W.de(b) in a?b:P.dl()+b
z[b]=y
return y},
f0:function(a,b,c,d){a.setProperty(b,c,d)},
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hl:{"^":"h+fy;"},
fy:{"^":"b;",
gk:function(a){return this.ct(a,"height")},
sdw:function(a,b){this.f0(a,this.ek(a,"opacity"),b,"")},
gl:function(a){return this.ct(a,"width")}},
l3:{"^":"aE;",$ish:1,"%":"DocumentFragment|ShadowRoot"},
l4:{"^":"h;",
i:function(a){return String(a)},
"%":"DOMException"},
fC:{"^":"h;bV:bottom=,k:height=,aM:left=,cg:right=,aS:top=,l:width=,q:x=,t:y=",
i:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(this.gl(a))+" x "+H.e(this.gk(a))},
v:function(a,b){var z,y,x
if(b==null)return!1
z=J.j(b)
if(!z.$isad)return!1
y=a.left
x=z.gaM(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaS(b)
if(y==null?x==null:y===x){y=this.gl(a)
x=z.gl(b)
if(y==null?x==null:y===x){y=this.gk(a)
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gG:function(a){var z,y,x,w
z=J.G(a.left)
y=J.G(a.top)
x=J.G(this.gl(a))
w=J.G(this.gk(a))
return W.et(W.aq(W.aq(W.aq(W.aq(0,z),y),x),w))},
gcn:function(a){return H.c(new P.a0(a.left,a.top),[null])},
$isad:1,
$asad:I.bO,
"%":";DOMRectReadOnly"},
ba:{"^":"aE;B:id=",
gds:function(a){return P.i_(C.e.aQ(a.offsetLeft),C.e.aQ(a.offsetTop),C.e.aQ(a.offsetWidth),C.e.aQ(a.offsetHeight),null)},
i:function(a){return a.localName},
dG:function(a){return a.getBoundingClientRect()},
gdt:function(a){return C.t.a9(a)},
gdu:function(a){return C.u.a9(a)},
gdv:function(a){return C.af.a9(a)},
$isba:1,
$ish:1,
$isI:1,
"%":";Element"},
l7:{"^":"q;k:height%,H:type%,l:width%","%":"HTMLEmbedElement"},
l8:{"^":"a_;aH:error=","%":"ErrorEvent"},
a_:{"^":"h;H:type=",
h9:function(a){return a.preventDefault()},
$isa_:1,
$isb:1,
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
I:{"^":"h;",
eg:function(a,b,c,d){return a.addEventListener(b,H.aM(c,1),!1)},
eV:function(a,b,c,d){return a.removeEventListener(b,H.aM(c,1),!1)},
$isI:1,
$isb:1,
"%":"Performance;EventTarget"},
lr:{"^":"q;H:type=",
P:function(a,b){return a.disabled.$1(b)},
"%":"HTMLFieldSetElement"},
lw:{"^":"q;j:length=",
aP:function(a){return a.reset()},
"%":"HTMLFormElement"},
aU:{"^":"he;hf:responseText=",
hx:function(a,b,c,d,e,f){return a.open(b,c,!0,f,e)},
h6:function(a,b,c,d){return a.open(b,c,d)},
bl:function(a,b){return a.send(b)},
$isaU:1,
$isI:1,
$isb:1,
"%":"XMLHttpRequest"},
hf:{"^":"d:17;",
$1:function(a){return J.fb(a)}},
hh:{"^":"d:0;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
y=z.status
if(typeof y!=="number")return y.U()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.a
if(y)v.fk(0,z)
else v.fm(a)}},
he:{"^":"I;","%":";XMLHttpRequestEventTarget"},
lC:{"^":"q;k:height%,l:width%","%":"HTMLIFrameElement"},
lD:{"^":"q;k:height%,l:width%","%":"HTMLImageElement"},
lF:{"^":"q;k:height%,H:type%,l:width%",
P:function(a,b){return a.disabled.$1(b)},
$isba:1,
$ish:1,
$isI:1,
"%":"HTMLInputElement"},
lL:{"^":"q;H:type=",
P:function(a,b){return a.disabled.$1(b)},
"%":"HTMLKeygenElement"},
lM:{"^":"q;H:type%",
P:function(a,b){return a.disabled.$1(b)},
"%":"HTMLLinkElement"},
hJ:{"^":"q;aH:error=","%":"HTMLAudioElement;HTMLMediaElement"},
lP:{"^":"I;B:id=","%":"MediaStream"},
lQ:{"^":"q;H:type%","%":"HTMLMenuElement"},
lR:{"^":"q;H:type%",
P:function(a,b){return a.disabled.$1(b)},
"%":"HTMLMenuItemElement"},
aD:{"^":"iz;",
gds:function(a){var z,y,x
if(!!a.offsetX)return H.c(new P.a0(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.j(W.ex(z)).$isba)throw H.f(new P.F("offsetX is only supported on elements"))
y=W.ex(z)
x=H.c(new P.a0(a.clientX,a.clientY),[null]).p(0,J.fc(J.fe(y)))
return H.c(new P.a0(J.d5(x.a),J.d5(x.b)),[null])}},
$isaD:1,
$isa_:1,
$isb:1,
"%":";DragEvent|MSPointerEvent|MouseEvent|PointerEvent"},
m_:{"^":"h;",$ish:1,"%":"Navigator"},
aE:{"^":"I;",
i:function(a){var z=a.nodeValue
return z==null?this.e1(a):z},
$isI:1,
$isb:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
m0:{"^":"q;H:type%","%":"HTMLOListElement"},
m1:{"^":"q;k:height%,H:type%,l:width%","%":"HTMLObjectElement"},
m3:{"^":"q;",
P:function(a,b){return a.disabled.$1(b)},
"%":"HTMLOptGroupElement"},
m4:{"^":"q;",
P:function(a,b){return a.disabled.$1(b)},
"%":"HTMLOptionElement"},
m5:{"^":"q;H:type=","%":"HTMLOutputElement"},
dS:{"^":"a_;",$isa_:1,$isb:1,"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
mb:{"^":"h;k:height=,l:width=","%":"Screen"},
mc:{"^":"q;H:type%","%":"HTMLScriptElement"},
me:{"^":"q;j:length=,H:type=",
P:function(a,b){return a.disabled.$1(b)},
"%":"HTMLSelectElement"},
mg:{"^":"q;H:type%","%":"HTMLSourceElement"},
mh:{"^":"a_;aH:error=","%":"SpeechRecognitionError"},
mi:{"^":"q;H:type%",
P:function(a,b){return a.disabled.$1(b)},
"%":"HTMLStyleElement"},
mm:{"^":"q;H:type=",
P:function(a,b){return a.disabled.$1(b)},
"%":"HTMLTextAreaElement"},
iz:{"^":"a_;","%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
mw:{"^":"hJ;k:height%,l:width%","%":"HTMLVideoElement"},
bk:{"^":"aD;",
gdf:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.f(new P.F("deltaY is not supported"))},
$isbk:1,
$isaD:1,
$isa_:1,
$isb:1,
"%":"WheelEvent"},
iE:{"^":"I;",
bN:function(a,b){return a.requestAnimationFrame(H.aM(b,1))},
bC:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$ish:1,
$isI:1,
"%":"DOMWindow|Window"},
mC:{"^":"h;bV:bottom=,k:height=,aM:left=,cg:right=,aS:top=,l:width=",
i:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(a.width)+" x "+H.e(a.height)},
v:function(a,b){var z,y,x
if(b==null)return!1
z=J.j(b)
if(!z.$isad)return!1
y=a.left
x=z.gaM(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaS(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gG:function(a){var z,y,x,w
z=J.G(a.left)
y=J.G(a.top)
x=J.G(a.width)
w=J.G(a.height)
return W.et(W.aq(W.aq(W.aq(W.aq(0,z),y),x),w))},
gcn:function(a){return H.c(new P.a0(a.left,a.top),[null])},
$isad:1,
$asad:I.bO,
"%":"ClientRect"},
mD:{"^":"aE;",$ish:1,"%":"DocumentType"},
mE:{"^":"fC;",
gk:function(a){return a.height},
gl:function(a){return a.width},
gq:function(a){return a.x},
gt:function(a){return a.y},
"%":"DOMRect"},
mH:{"^":"q;",$isI:1,$ish:1,"%":"HTMLFrameSetElement"},
mI:{"^":"hn;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.cd(b,a,null,null,null))
return a[b]},
m:function(a,b,c){throw H.f(new P.F("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.f(new P.F("Cannot resize immutable List."))},
a8:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isk:1,
$ask:function(){return[W.aE]},
$isu:1,
$isbx:1,
$isbd:1,
"%":"MozNamedAttrMap|NamedNodeMap"},
hm:{"^":"h+bz;",$isk:1,
$ask:function(){return[W.aE]},
$isu:1},
hn:{"^":"hm+dy;",$isk:1,
$ask:function(){return[W.aE]},
$isu:1},
az:{"^":"b;a",
fM:function(a,b){return H.c(new W.ep(a,this.a,!1),[null])},
c2:function(a){return this.fM(a,!1)},
c1:function(a,b){return H.c(new W.eo(a,this.a,!1),[null])},
a9:function(a){return this.c1(a,!1)}},
ep:{"^":"ae;a,b,c",
ab:function(a,b,c,d){var z=new W.af(0,this.a,this.b,W.a1(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.Z()
return z},
c6:function(a,b,c){return this.ab(a,null,b,c)}},
eo:{"^":"ep;a,b,c"},
af:{"^":"i9;a,b,c,d,e",
b9:function(){if(this.b==null)return
this.d2()
this.b=null
this.d=null
return},
aN:function(a,b){if(this.b==null)return;++this.a
this.d2()},
c8:function(a){return this.aN(a,null)},
cf:function(){if(this.b==null||this.a<=0)return;--this.a
this.Z()},
Z:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.f_(x,this.c,z,!1)}},
d2:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.f0(x,this.c,z,!1)}}},
j8:{"^":"b;a",
c1:function(a,b){return H.c(new W.eo(a,this.eu(a),!1),[null])},
a9:function(a){return this.c1(a,!1)},
eu:function(a){return this.a.$1(a)}},
dy:{"^":"b;",
gM:function(a){return H.c(new W.fP(a,a.length,-1,null),[H.M(a,"dy",0)])},
n:function(a,b){throw H.f(new P.F("Cannot add to immutable List."))},
a6:function(a){throw H.f(new P.F("Cannot remove from immutable List."))},
$isk:1,
$ask:null,
$isu:1},
fP:{"^":"b;a,b,c,d",
C:function(){var z,y
z=this.c+1
y=this.b
if(z<y){y=this.a
if(z<0||z>=y.length)return H.a(y,z)
this.d=y[z]
this.c=z
return!0}this.d=null
this.c=y
return!1},
gE:function(){return this.d}},
j9:{"^":"b;a",$isI:1,$ish:1,u:{
ja:function(a){if(a===window)return a
else return new W.j9(a)}}}}],["","",,P,{"^":""}],["","",,P,{"^":"",kS:{"^":"aA;",$ish:1,"%":"SVGAElement"},kT:{"^":"il;",$ish:1,"%":"SVGAltGlyphElement"},kV:{"^":"o;",$ish:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},l9:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEBlendElement"},la:{"^":"o;H:type=,k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEColorMatrixElement"},lb:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEComponentTransferElement"},lc:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFECompositeElement"},ld:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEConvolveMatrixElement"},le:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEDiffuseLightingElement"},lf:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEDisplacementMapElement"},lg:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEFloodElement"},lh:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEGaussianBlurElement"},li:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEImageElement"},lj:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEMergeElement"},lk:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEMorphologyElement"},ll:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFEOffsetElement"},lm:{"^":"o;q:x=,t:y=","%":"SVGFEPointLightElement"},ln:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFESpecularLightingElement"},lo:{"^":"o;q:x=,t:y=","%":"SVGFESpotLightElement"},lp:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFETileElement"},lq:{"^":"o;H:type=,k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFETurbulenceElement"},ls:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGFilterElement"},lv:{"^":"aA;k:height=,l:width=,q:x=,t:y=","%":"SVGForeignObjectElement"},hc:{"^":"aA;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aA:{"^":"o;",$ish:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},lE:{"^":"aA;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGImageElement"},lN:{"^":"o;",$ish:1,"%":"SVGMarkerElement"},lO:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGMaskElement"},m6:{"^":"o;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGPatternElement"},m9:{"^":"h;k:height=,l:width=,q:x=,t:y=","%":"SVGRect"},ma:{"^":"hc;k:height=,l:width=,q:x=,t:y=","%":"SVGRectElement"},md:{"^":"o;H:type%",$ish:1,"%":"SVGScriptElement"},mj:{"^":"o;H:type%",
P:function(a,b){return a.disabled.$1(b)},
"%":"SVGStyleElement"},o:{"^":"ba;",
gdt:function(a){return C.t.a9(a)},
gdu:function(a){return C.u.a9(a)},
gdv:function(a){return C.D.a9(a)},
$isI:1,
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},mk:{"^":"aA;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGSVGElement"},ml:{"^":"o;",$ish:1,"%":"SVGSymbolElement"},e_:{"^":"aA;","%":";SVGTextContentElement"},mn:{"^":"e_;",$ish:1,"%":"SVGTextPathElement"},il:{"^":"e_;q:x=,t:y=","%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},mt:{"^":"aA;k:height=,l:width=,q:x=,t:y=",$ish:1,"%":"SVGUseElement"},mx:{"^":"o;",$ish:1,"%":"SVGViewElement"},mG:{"^":"o;",$ish:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},mJ:{"^":"o;",$ish:1,"%":"SVGCursorElement"},mK:{"^":"o;",$ish:1,"%":"SVGFEDropShadowElement"},mL:{"^":"o;",$ish:1,"%":"SVGGlyphRefElement"},mM:{"^":"o;",$ish:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",c6:{"^":"h;",$isb:1,"%":"WebGLBuffer"},cr:{"^":"h;",
fc:function(a,b,c){return a.bindBuffer(b,c)},
fi:function(a,b){return a.clear(b)},
fj:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
fv:function(a){return a.createBuffer()},
fz:function(a){return a.createProgram()},
fA:function(a,b){return a.createShader(b)},
dH:function(a,b,c){return a.getUniformLocation(b,c)},
hk:function(a,b){return a.useProgram(b)},
$iscr:1,
"%":"WebGLRenderingContext"},i6:{"^":"h;",$isi6:1,$isb:1,"%":"WebGLShader"}}],["","",,P,{"^":""}],["","",,P,{"^":"",l0:{"^":"b;"}}],["","",,P,{"^":"",
b1:function(a,b){if(typeof b!=="number")return H.i(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
es:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
cU:function(a,b){if(typeof b!=="number")throw H.f(P.a3(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.e.gdm(b)||isNaN(b))return b
return a}return a},
cT:function(a,b){if(typeof a!=="number")throw H.f(P.a3(a))
if(typeof b!=="number")throw H.f(P.a3(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.a.gdm(a))return b
return a},
jy:{"^":"b;",
dr:function(a){if(a<=0||a>4294967296)throw H.f(P.hY("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
a0:{"^":"b;q:a>,t:b>",
i:function(a){return"Point("+H.e(this.a)+", "+H.e(this.b)+")"},
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.a0))return!1
return J.C(this.a,b.a)&&J.C(this.b,b.b)},
gG:function(a){var z,y
z=J.G(this.a)
y=J.G(this.b)
return P.es(P.b1(P.b1(0,z),y))},
w:function(a,b){var z=J.m(b)
z=new P.a0(J.t(this.a,z.gq(b)),J.t(this.b,z.gt(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
p:function(a,b){var z=J.m(b)
z=new P.a0(J.ah(this.a,z.gq(b)),J.ah(this.b,z.gt(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
D:function(a,b){var z=new P.a0(J.z(this.a,b),J.z(this.b,b))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
jJ:{"^":"b;",
gcg:function(a){return J.t(this.a,this.c)},
gbV:function(a){return J.t(this.b,this.d)},
i:function(a){return"Rectangle ("+H.e(this.a)+", "+H.e(this.b)+") "+H.e(this.c)+" x "+H.e(this.d)},
v:function(a,b){var z,y,x,w,v
if(b==null)return!1
z=J.j(b)
if(!z.$isad)return!1
y=this.a
x=J.j(y)
if(x.v(y,z.gaM(b))){w=this.b
v=J.j(w)
z=v.v(w,z.gaS(b))&&J.C(x.w(y,this.c),z.gcg(b))&&J.C(v.w(w,this.d),z.gbV(b))}else z=!1
return z},
gG:function(a){var z,y,x,w,v,u
z=this.a
y=J.j(z)
x=y.gG(z)
w=this.b
v=J.j(w)
u=v.gG(w)
z=J.G(y.w(z,this.c))
w=J.G(v.w(w,this.d))
return P.es(P.b1(P.b1(P.b1(P.b1(0,x),u),z),w))},
gcn:function(a){var z=new P.a0(this.a,this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
ad:{"^":"jJ;aM:a>,aS:b>,l:c>,k:d>",$asad:null,u:{
i_:function(a,b,c,d,e){var z,y
z=J.w(c)
z=z.V(c,0)?J.z(z.bj(c),0):c
y=J.w(d)
return H.c(new P.ad(a,b,z,y.V(d,0)?J.z(y.bj(d),0):d),[e])}}}}],["","",,H,{"^":"",
l:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(P.a3("Invalid length "+H.e(a)))
return a},
ey:function(a){var z,y,x
if(!!J.j(a).$isbd)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
hM:function(a){return new Int8Array(H.ey(a))},
dH:{"^":"h;",
gK:function(a){return C.W},
$isdH:1,
"%":"ArrayBuffer"},
bC:{"^":"h;",$isbC:1,"%":";ArrayBufferView;ck|dI|dK|cl|dJ|dL|aj"},
lS:{"^":"bC;",
gK:function(a){return C.X},
"%":"DataView"},
ck:{"^":"bC;",
gj:function(a){return a.length},
$isbx:1,
$isbd:1},
cl:{"^":"dK;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
return a[b]},
m:function(a,b,c){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
a[b]=c}},
dI:{"^":"ck+bz;",$isk:1,
$ask:function(){return[P.X]},
$isu:1},
dK:{"^":"dI+du;"},
aj:{"^":"dL;",
m:function(a,b,c){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
a[b]=c},
$isk:1,
$ask:function(){return[P.p]},
$isu:1},
dJ:{"^":"ck+bz;",$isk:1,
$ask:function(){return[P.p]},
$isu:1},
dL:{"^":"dJ+du;"},
hL:{"^":"cl;",
gK:function(a){return C.Y},
$isk:1,
$ask:function(){return[P.X]},
$isu:1,
"%":"Float32Array"},
lT:{"^":"cl;",
gK:function(a){return C.Z},
$isk:1,
$ask:function(){return[P.X]},
$isu:1,
"%":"Float64Array"},
lU:{"^":"aj;",
gK:function(a){return C.a_},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isu:1,
"%":"Int16Array"},
lV:{"^":"aj;",
gK:function(a){return C.a0},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isu:1,
"%":"Int32Array"},
lW:{"^":"aj;",
gK:function(a){return C.a1},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isu:1,
"%":"Int8Array"},
lX:{"^":"aj;",
gK:function(a){return C.a6},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isu:1,
"%":"Uint16Array"},
hN:{"^":"aj;",
gK:function(a){return C.a7},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isu:1,
"%":"Uint32Array"},
lY:{"^":"aj;",
gK:function(a){return C.a8},
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isu:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
lZ:{"^":"aj;",
gK:function(a){return C.a9},
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.L(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isu:1,
"%":";Uint8Array"}}],["","",,H,{"^":"",
kz:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,S,{"^":"",
c9:function(a){var z,y
z=$.$get$c8().h(0,a)
if(z==null){z=new S.db(0,0)
y=$.dc
z.a=y
$.dc=y<<1>>>0
y=$.dd
$.dd=y+1
z.b=y
$.$get$c8().m(0,a,z)}return z},
bE:function(a,b){var z=J.aO(S.aX(a))
return null==z?b.$0():z},
aX:function(a){var z,y
z=$.$get$bD().h(0,a)
if(null==z){y=new Array(16)
y.fixed$length=Array
z=H.c(new S.U(y,0),[null])
$.$get$bD().m(0,a,z)}return z},
aQ:{"^":"b;a,b,c",
f5:function(a,b){var z={}
z.a=a
C.c.F(b,new S.fi(z))
return z.a},
u:{
ax:function(a){var z=new S.aQ(0,0,0)
z.a=z.f5(0,a)
return z}}},
fi:{"^":"d:0;a",
$1:function(a){var z=this.a
z.a=(z.a|S.c9(a).gd8())>>>0}},
bs:{"^":"b;",
cV:function(){}},
aZ:{"^":"fw;",
cV:function(){this.h2()}},
fw:{"^":"bs+dO;"},
fs:{"^":"aB;b,c,a",
J:function(){},
eU:function(a){this.ey(a,new S.ft(a))
a.sd0(0)},
ey:function(a,b){var z,y,x,w
z=a.gd0()
for(y=this.b,x=0;z>0;){if((z&1)===1){w=y.a
if(x>=w.length)return H.a(w,x)
b.$2(w[x],x)}++x
z=z>>>1}},
aF:function(a){return this.c.n(0,a)},
fh:function(){this.c.F(0,new S.fu(this))
var z=this.c
z.c.bm(0)
z.d=!0}},
ft:{"^":"d:3;a",
$2:function(a,b){var z,y,x
z=this.a
y=J.m(z)
x=J.P(a)
x.h(a,y.gB(z)).cV()
x.m(a,y.gB(z),null)}},
fu:{"^":"d:0;a",
$1:function(a){return this.a.eU(a)}},
db:{"^":"b;a,b",
gd8:function(){return this.a},
gB:function(a){return this.b}},
ai:{"^":"b;B:a>,f4:b?,d0:c@,bQ:d<,bS:e?,f,r",
eX:function(a){this.d=(this.d&J.eX(a))>>>0},
i:function(a){return"Entity["+H.e(this.a)+"]"},
fB:function(){this.e.e.n(0,this)
return}},
fK:{"^":"aB;b,c,d,e,f,r,x,y,a",
J:function(){},
bT:function(a){++this.e;++this.f
this.b.m(0,J.T(a),a)},
c_:function(a){this.d.m(0,J.T(a),!1)},
P:function(a,b){this.d.m(0,J.T(b),!0)},
aF:function(a){var z=J.m(a)
this.b.m(0,z.gB(a),null)
this.d.m(0,z.gB(a),!1)
this.c.n(0,a);--this.e;++this.x}},
jw:{"^":"b;a,b",
fg:function(){var z=this.a
if(J.bX(z.b,0))return z.a6(0)
return this.b++}},
aS:{"^":"b;bS:b?,eO:x?",
gh7:function(){return this.x},
aw:function(){if(this.ai())this.bf(this.c)},
J:["ap",function(){}],
bw:function(a){var z,y,x,w
if(this.r)return
z=J.bV(this.a,a.gbQ())===this.a
y=this.d
x=a.c
w=(y&x)>>>0===y
y=this.f
if(typeof y!=="number")return y.O()
if(y>0&&w)w=(y&x)>0
y=this.e
if(y>0&&w)w=(y&x)===0
if(w&&!z){this.c.n(0,a)
y=this.a
x=a.d
if(typeof y!=="number")return H.i(y)
a.d=(x|y)>>>0}else if(!w&&z)this.bM(a)},
bM:function(a){var z,y,x
z=this.c
y=z.c
x=J.m(a)
y.h(0,x.gB(a))
y.m(0,x.gB(a),!1)
z.d=!0
a.eX(this.a)},
bT:function(a){return this.bw(a)},
bX:function(a){return this.bw(a)},
c_:function(a){return this.bw(a)},
aF:function(a){if(J.bV(this.a,a.gbQ())===this.a)this.bM(a)},
P:function(a,b){if(J.bV(this.a,b.gbQ())===this.a)this.bM(b)},
T:function(a){var z,y,x
this.r=this.d===0&&this.f===0
z=new H.a8(H.at(this),null)
y=$.cH
if(null==y){y=H.c(new H.R(0,null,null,null,null,null,0),[P.b0,P.p])
$.cH=y}x=y.h(0,z)
if(x==null){y=$.ew
x=C.a.as(1,y)
$.ew=y+1
$.cH.m(0,z,x)}this.a=x}},
aB:{"^":"b;bS:a?",
J:["e3",function(){}],
bT:function(a){},
bX:function(a){},
aF:function(a){},
P:function(a,b){},
c_:function(a){}},
ct:{"^":"aB;b,c,a",
ao:function(a){return this.b.h(0,a)},
aF:function(a){var z=this.c.am(0,a)
if(z!=null)this.b.am(0,z)}},
J:{"^":"fv;a,b"},
fv:{"^":"b;",
h:function(a,b){return J.A(this.b,J.T(b))},
N:function(a,b,c){var z,y,x,w
z=S.c9(a)
this.a=z
y=b.b
x=J.T(z)
y=y.b
y.cN(x)
z=y.a
if(x>>>0!==x||x>=z.length)return H.a(z,x)
w=z[x]
if(w==null){z=new Array(16)
z.fixed$length=Array
w=H.c(new S.U(z,0),[S.bs])
y.m(0,x,w)}this.b=w}},
ca:{"^":"aS;",
bf:function(a){return a.F(0,new S.fL(this))},
ai:function(){return!0}},
fL:{"^":"d:0;a",
$1:function(a){return this.a.ca(a)}},
bj:{"^":"aS;",
bf:function(a){return this.aO()},
ai:function(){return!0}},
U:{"^":"dN;a,b",
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
gaz:function(a){return this.b},
a6:["e_",function(a){var z,y,x
if(J.bX(this.b,0)){z=this.a
y=J.ah(this.b,1)
this.b=y
if(y>>>0!==y||y>=z.length)return H.a(z,y)
x=z[y]
y=this.a
z=this.gaz(this)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y[z]=null
return x}return}],
n:["dZ",function(a,b){var z,y
if(J.C(this.b,this.a.length))this.bF(C.a.R(this.a.length*3,2)+1)
z=this.a
y=this.b
this.b=J.t(y,1)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=b}],
m:function(a,b,c){var z=J.w(b)
if(z.U(b,this.a.length))this.bF(z.D(b,2))
if(J.eW(this.b,b))this.b=z.w(b,1)
z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c},
bF:function(a){var z,y
z=this.a
if(typeof a!=="number")return H.i(a)
y=new Array(a)
y.fixed$length=Array
y=H.c(y,[H.M(this,"U",0)])
this.a=y
C.c.dT(y,0,z.length,z)},
cN:function(a){var z=J.w(a)
if(z.U(a,this.a.length))this.bF(z.D(a,2))},
gM:function(a){var z=C.c.cA(this.a,0,this.gaz(this))
return H.c(new J.c1(z,z.length,0,null),[H.x(z,0)])},
gj:function(a){return this.gaz(this)},
$isN:1},
dN:{"^":"b+dC;"},
H:{"^":"U;c,d,a,b",
n:function(a,b){var z,y
if(this.d)this.b6()
z=J.m(b)
y=this.c
if(J.eV(z.gB(b),y.c))y.bm(J.t(J.au(J.z(z.gB(b),3),2),1))
if(y.h(0,z.gB(b)))return
y.m(0,z.gB(b),!0)
this.dZ(this,b)},
a6:function(a){var z=this.e_(this)
this.c.m(0,J.T(z),!1)
this.d=!0
return z},
gaz:function(a){if(this.d)this.b6()
return this.b},
gM:function(a){var z
if(this.d)this.b6()
z=this.a
if(this.d)this.b6()
z=C.c.cA(z,0,this.b)
return H.c(new J.c1(z,z.length,0,null),[H.x(z,0)])},
b6:function(){var z,y,x
z={}
y=this.c.dd(!0)
this.b=y
if(typeof y!=="number")return H.i(y)
y=new Array(y)
y.fixed$length=Array
x=H.c(y,[S.ai])
if(J.bX(this.b,0)){z.a=0
y=this.a
y=H.c(new H.ij(y,new S.fH(z,this)),[H.x(y,0)])
H.c(new H.ei(y,new S.fI(this)),[H.M(y,"N",0)]).F(0,new S.fJ(z,x))}this.a=x
this.d=!1},
$asU:function(){return[S.ai]},
$asdN:function(){return[S.ai]}},
fH:{"^":"d:0;a,b",
$1:function(a){var z,y
z=this.a.a
y=this.b.b
if(typeof y!=="number")return H.i(y)
return z<y}},
fI:{"^":"d:0;a",
$1:function(a){return this.a.c.h(0,J.T(a))}},
fJ:{"^":"d:0;a,b",
$1:function(a){var z,y
z=this.b
y=this.a.a++
if(y>=z.length)return H.a(z,y)
z[y]=a
return a}},
dO:{"^":"b;",
h2:function(){J.f1($.$get$bD().h(0,new H.a8(H.at(this),null)),this)}},
iF:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
J:function(){this.Q.F(0,new S.iM(this))
C.c.F(this.y,new S.iN(this))},
aD:function(a){this.z.m(0,new H.a8(H.at(a),null),a)
this.Q.n(0,a)
a.a=this},
av:function(a){var z,y,x
z=this.a
y=z.c.a6(0)
if(null==y){x=z.a
y=new S.ai(z.y.fg(),0,0,0,x,null,null)
y.f=x.a
y.r=x.b}++z.r
z=$.dr
$.dr=z+1
y.sf4(z)
C.c.F(a,new S.iL(y))
return y},
ao:function(a){var z=this.a.b.a
if(a>>>0!==a||a>=z.length)return H.a(z,a)
return z[a]},
fa:function(a,b,c){a.sbS(this)
a.seO(!1)
a.y=b
this.x.m(0,new H.a8(H.at(a),null),a)
this.y.push(a)
this.cy.dz(b,new S.iJ())
this.cx.dz(b,new S.iK())
return a},
f9:function(a,b){return this.fa(a,b,!1)},
aB:function(a,b){a.F(0,new S.iI(this,b))
a.c.bm(0)
a.d=!0},
hb:function(a){var z=this.cx
z.m(0,a,J.t(z.h(0,a),1))
z=this.cy
z.m(0,a,J.t(z.h(0,a),this.ch))
this.hc()
z=this.y
H.c(new H.ei(z,new S.iT(a)),[H.x(z,0)]).F(0,new S.iU())},
aw:function(){return this.hb(0)},
hc:function(){this.aB(this.c,new S.iO())
this.aB(this.d,new S.iP())
this.aB(this.r,new S.iQ())
this.aB(this.f,new S.iR())
this.aB(this.e,new S.iS())
this.b.fh()},
h:function(a,b){return this.db.h(0,b)},
m:function(a,b,c){this.db.m(0,b,c)}},
iM:{"^":"d:0;a",
$1:function(a){return a.J()}},
iN:{"^":"d:0;a",
$1:function(a){return a.J()}},
iL:{"^":"d:0;a",
$1:function(a){var z,y,x,w,v,u
z=this.a
y=z.r
x=S.c9(J.c_(a))
w=J.T(x)
y=y.b
y.cN(w)
v=y.a
if(w>>>0!==w||w>=v.length)return H.a(v,w)
u=v[w]
if(u==null){v=new Array(16)
v.fixed$length=Array
u=H.c(new S.U(v,0),[S.bs])
y.m(0,w,u)}J.eZ(u,z.a,a)
y=x.gd8()
z.c=(z.c|y)>>>0
return}},
iJ:{"^":"d:1;",
$0:function(){return 0}},
iK:{"^":"d:1;",
$0:function(){return 0}},
iI:{"^":"d:0;a,b",
$1:function(a){var z,y
z=this.a
y=this.b
z.Q.F(0,new S.iG(y,a))
C.c.F(z.y,new S.iH(y,a))}},
iG:{"^":"d:0;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
iH:{"^":"d:0;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
iT:{"^":"d:0;a",
$1:function(a){return a.gh7()!==!0&&J.C(a.y,this.a)}},
iU:{"^":"d:0;",
$1:function(a){a.aw()}},
iO:{"^":"d:3;",
$2:function(a,b){return a.bT(b)}},
iP:{"^":"d:3;",
$2:function(a,b){return a.bX(b)}},
iQ:{"^":"d:3;",
$2:function(a,b){return J.f8(a,b)}},
iR:{"^":"d:3;",
$2:function(a,b){return a.c_(b)}},
iS:{"^":"d:3;",
$2:function(a,b){return a.aF(b)}}}],["","",,L,{"^":"",
jY:function(a,b,c){var z=new Array(2)
z[0]=W.dx("packages/"+a+"/assets/shader/"+b+".vert",null,null)
z[1]=W.dx("packages/"+a+"/assets/shader/"+c+".frag",null,null)
return P.cb(z,null,!1).a0(new L.jZ())},
ha:{"^":"b;a,b"},
jZ:{"^":"d:0;",
$1:function(a){var z=J.P(a)
return new L.i7(z.h(a,0),z.h(a,1))}},
i7:{"^":"b;hl:a<,fI:b<"},
iB:{"^":"bj;z,a,b,c,d,e,f,r,x,y",
J:function(){J.f4(this.z,0,0,0,1)},
aO:function(){J.f3(this.z,16640)}},
cz:{"^":"b;S:b$@,aV:c$*,bc:d$@,c4:e$@,aW:r$@",
fU:function(){this.eq(this.cK(35633,this.gaV(this).ghl()),this.cK(35632,this.gaV(this).gfI()))},
eq:function(a,b){var z=this.z
this.sS(J.f6(z))
z.attachShader(this.gS(),a)
z.attachShader(this.gS(),b)
z.linkProgram(this.gS())
if(z.getProgramParameter(this.gS(),35714)!==!0){P.bo(H.e(new H.a8(H.at(this),null))+" - Error linking program: "+H.e(z.getProgramInfoLog(this.gS())))
this.saW(!1)}},
cK:function(a,b){var z,y
z=this.z
y=J.f7(z,a)
z.shaderSource(y,b)
z.compileShader(y)
if(z.getShaderParameter(y,35713)!==!0){P.bo(H.e(new H.a8(H.at(this),null))+" - Error compiling shader: "+H.e(z.getShaderInfoLog(y)))
this.saW(!1)}return y},
bW:function(a,b,c){var z,y,x,w,v,u,t,s
if(null==this.gbc()){z=this.z
this.sbc(J.f5(z))
this.sc4(z.createBuffer())}z=this.z
J.f2(z,34962,this.gbc())
z.bufferData(34962,b,35048)
for(y=0,x=0;x<1;++x)y+=a[x].b
for(w=4*y,v=0,x=0;x<1;++x){u=a[x]
t=z.getAttribLocation(this.gS(),u.a)
s=u.b
z.vertexAttribPointer(t,s,5126,!1,w,4*v)
z.enableVertexAttribArray(t)
v+=s}z.bindBuffer(34963,this.gc4())
z.bufferData(34963,c,35048)}},
c2:{"^":"b;a,b"},
cA:{"^":"fM;",
J:["bp",function(){this.fU()}],
bf:function(a){var z,y,x
z={}
y=a.gaz(a)
x=J.w(y)
if(x.O(y,0)){J.fh(this.z,this.gS())
if(x.O(y,this.Q)){this.co(y)
this.Q=y}z.a=0
a.F(0,new L.iC(z,this))
this.ce(y)}},
ai:function(){return this.gaW()}},
fM:{"^":"aS+cz;S:b$@,aV:c$*,bc:d$@,c4:e$@,aW:r$@",$iscz:1},
iC:{"^":"d:0;a,b",
$1:function(a){this.b.cb(this.a.a++,a)}},
fV:{"^":"b;",
eG:function(){return this.eh().a0(new L.h1(this)).a0(new L.h2(this)).a0(new L.h3(this))},
eh:function(){var z=H.c([],[P.a5])
return P.cb(z,null,!1).a0(new L.fZ(this))},
eH:function(){this.fw()
return this.fV().a0(new L.h0(this))},
bo:function(a){this.eG().a0(new L.h8(this))},
hq:[function(a){var z
this.ch=J.bW(a,1000)
z=this.y
z.ch=0.016666666666666666
z.aw()
z=window
C.h.bC(z)
C.h.bN(z,W.a1(new L.h_(this)))},"$1","gex",2,0,18],
dD:function(a){var z,y
z=P.cU(0.05,J.ah(a,this.ch))
y=this.y
y.ch=z
this.ch=a
y.aw()
y=window
C.h.bC(y)
C.h.bN(y,W.a1(new L.h9(this)))},
hu:[function(a){var z,y
z=!this.cy
this.cy=z
y=this.a
if(z){z=J.m(y)
z.sl(y,window.screen.width)
z.sk(y,window.screen.height)}else{z=J.m(y)
z.sl(y,this.f)
z.sk(y,this.r)}z=J.m(y)
this.c3(z.gl(y),z.gk(y))},"$1","geE",2,0,19],
fV:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=[]
y=D.E(16,!1)
x=new Array(16)
x.fixed$length=Array
x=new F.is(null,null,0,100,0,null,new S.H(y,!1,x,0),0,0,0,null,null,null)
x.T(new S.aQ(0,0,0))
y=D.E(16,!1)
w=new Array(16)
w.fixed$length=Array
w=new F.hQ(null,null,1,0,null,new S.H(y,!1,w,0),0,0,0,null,null,null)
w.T(new S.aQ(0,0,0))
y=D.E(16,!1)
v=new Array(16)
v.fixed$length=Array
v=new F.ix(0,null,new S.H(y,!1,v,0),0,0,0,null,null,null)
v.T(new S.aQ(0,0,0))
y=H.c(new P.a0(0,0),[P.X])
u=D.E(16,!1)
t=new Array(16)
t.fixed$length=Array
t=new F.hj(null,null,null,null,this.a,0,y,0,null,new S.H(u,!1,t,0),0,0,0,null,null,null)
t.T(new S.aQ(0,0,0))
u=S.ax([C.b,C.j])
y=D.E(16,!1)
s=new Array(16)
s.fixed$length=Array
s=new F.hK(null,null,0,null,new S.H(y,!1,s,0),u.a,u.b,u.c,null,null,null)
s.T(u)
u=S.ax([C.b,C.j])
y=D.E(16,!1)
r=new Array(16)
r.fixed$length=Array
r=new F.hT(null,null,0,null,new S.H(y,!1,r,0),u.a,u.b,u.c,null,null,null)
r.T(u)
u=S.ax([C.k,C.i])
y=D.E(16,!1)
q=new Array(16)
q.fixed$length=Array
q=new F.dW(null,null,!1,3,0,0,null,new S.H(y,!1,q,0),u.a,u.b,u.c,null,null,null)
q.T(u)
u=this.b
y=D.E(16,!1)
p=new Array(16)
p.fixed$length=Array
p=new L.iB(u,0,null,new S.H(y,!1,p,0),0,0,0,null,null,null)
p.T(new S.aQ(0,0,0))
y=S.ax([C.l,C.b])
o=D.E(16,!1)
n=new Array(16)
n.fixed$length=Array
n=new F.hP(null,null,null,null,null,3,120,null,u,0,null,null,null,null,null,P.ci(P.K,P.c6),!0,0,null,new S.H(o,!1,n,0),y.a,y.b,y.c,null,null,null)
n.T(y)
n.dx=[new L.c2("aPos",3)]
y=S.ax([C.b,C.o])
o=D.E(16,!1)
m=new Array(16)
m.fixed$length=Array
m=new F.ir(null,null,null,null,null,3,128,null,u,0,null,null,null,null,null,P.ci(P.K,P.c6),!0,0,null,new S.H(o,!1,m,0),y.a,y.b,y.c,null,null,null)
m.T(y)
m.dx=[new L.c2("aPos",3)]
y=S.ax([C.b,C.k,C.i])
o=D.E(16,!1)
l=new Array(16)
l.fixed$length=Array
l=new F.hU(null,null,null,null,null,null,3,null,u,0,null,null,null,null,null,P.ci(P.K,P.c6),!0,0,null,new S.H(o,!1,l,0),y.a,y.b,y.c,null,null,null)
l.T(y)
l.dy=[new L.c2("aPos",3)]
y=S.ax([C.b])
o=D.E(16,!1)
u=new Array(16)
u.fixed$length=Array
u=new F.fA(null,null,0,null,new S.H(o,!1,u,0),y.a,y.b,y.c,null,null,null)
u.T(y)
P.a6([0,[x,w,v,t,s,r,q,p,n,m,l,u],1,[]]).F(0,new L.h7(this,z))
return P.cb(z,null,!1)},
e9:function(a,b,c,d,e,f,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.a
y=J.m(z)
y.sl(z,c)
y.sk(z,d)
y=H.ag(this.b,"$iscr")
y.enable(2929)
y.enable(3042)
y.blendFunc(770,771)
z=C.F.a9(z)
H.c(new W.af(0,z.a,z.b,W.a1(this.geE()),!1),[H.x(z,0)]).Z()
z=new Array(16)
z.fixed$length=Array
z=H.c(new S.U(z,0),[S.ai])
y=new Array(16)
y.fixed$length=Array
y=H.c(new S.U(y,0),[S.ai])
x=new Array(16)
x.fixed$length=Array
x=H.c(new S.U(x,0),[P.cL])
w=new Array(16)
w.fixed$length=Array
w=new S.fK(z,y,x,0,0,0,0,new S.jw(H.c(new S.U(w,0),[P.p]),0),null)
x=new Array(16)
x.fixed$length=Array
x=H.c(new S.U(x,0),[[S.U,S.bs]])
y=D.E(16,!1)
z=new Array(16)
z.fixed$length=Array
z=new S.fs(x,new S.H(y,!1,z,0),null)
y=D.E(16,!1)
x=new Array(16)
x.fixed$length=Array
v=D.E(16,!1)
u=new Array(16)
u.fixed$length=Array
t=D.E(16,!1)
s=new Array(16)
s.fixed$length=Array
r=D.E(16,!1)
q=new Array(16)
q.fixed$length=Array
p=D.E(16,!1)
o=new Array(16)
o.fixed$length=Array
n=H.c(new H.R(0,null,null,null,null,null,0),[P.b0,S.aS])
m=H.c([],[S.aS])
l=H.c(new H.R(0,null,null,null,null,null,0),[P.b0,S.aB])
k=new Array(16)
k.fixed$length=Array
k=H.c(new S.U(k,0),[S.aB])
j=P.a6([0,0])
i=P.a6([0,0])
h=H.c(new H.R(0,null,null,null,null,null,0),[P.K,null])
h=new S.iF(w,z,new S.H(y,!1,x,0),new S.H(v,!1,u,0),new S.H(t,!1,s,0),new S.H(r,!1,q,0),new S.H(p,!1,o,0),n,m,l,k,0,j,i,h)
h.aD(w)
h.aD(z)
this.y=h
g=document.querySelector("button#fullscreen")
if(null!=g){z=J.d2(g)
H.c(new W.af(0,z.a,z.b,W.a1(new L.h4()),!1),[H.x(z,0)]).Z()}}},
h4:{"^":"d:0;",
$1:function(a){return document.querySelector("canvas").requestFullscreen()}},
h1:{"^":"d:0;a",
$1:function(a){return}},
h2:{"^":"d:0;a",
$1:function(a){return this.a.eH()}},
h3:{"^":"d:0;a",
$1:function(a){return}},
fZ:{"^":"d:0;a",
$1:function(a){var z,y
z=this.a
y=z.z
if(null!=y)J.bp(y,new L.fY(z))}},
fY:{"^":"d:3;a",
$2:function(a,b){var z=this.a
J.bp(b,new L.fX(J.d1(z.Q.gdX().h(0,H.e(a)+".png")).p(0,z.Q.gdX().h(0,H.e(a)+".png").ghy())))}},
fX:{"^":"d:0;a",
$1:function(a){var z=a.ga1()
z.toString
a.sa1(H.c(new H.bB(z,new L.fW(this.a)),[null,null]).bh(0))}},
fW:{"^":"d:0;a",
$1:function(a){return J.t(a,this.a)}},
h0:{"^":"d:0;a",
$1:function(a){this.a.y.J()}},
h8:{"^":"d:0;a",
$1:function(a){var z,y
z=this.a
z.cx=window.performance.now()
y=window
z=z.gex()
C.h.bC(y)
C.h.bN(y,W.a1(z))}},
h_:{"^":"d:0;a",
$1:function(a){return this.a.dD(J.bW(a,1000))}},
h9:{"^":"d:0;a",
$1:function(a){return this.a.dD(J.bW(a,1000))}},
h7:{"^":"d:3;a,b",
$2:function(a,b){J.bp(b,new L.h6(this.a,this.b,a))}},
h6:{"^":"d:0;a,b,c",
$1:function(a){var z=this.a
z.y.f9(a,this.c)
if(!!J.j(a).$iscz)this.b.push(L.jY(z.c.a,a.gcp(),a.gc0()).a0(new L.h5(a)))}},
h5:{"^":"d:0;a",
$1:function(a){this.a.saV(0,a)}}}],["","",,F,{"^":"",ix:{"^":"bj;a,b,c,d,e,f,r,x,y",
aO:function(){$.$get$d_().bi(this.b.ch)}}}],["","",,A,{"^":"",
bR:function(a){var z,y
z=C.T.fL(a,0,new A.kg())
if(typeof z!=="number")return H.i(z)
y=536870911&z+((67108863&z)<<3>>>0)
y=(y^y>>>11)>>>0
return 536870911&y+((16383&y)<<15>>>0)},
kg:{"^":"d:3;",
$2:function(a,b){var z,y
z=J.t(a,J.G(b))
if(typeof z!=="number")return H.i(z)
y=536870911&z
y=536870911&y+((524287&y)<<10>>>0)
return y^y>>>6}}}],["","",,P,{"^":"",
kb:function(a,b){var z={}
a.F(0,new P.kc(z))
return z},
dm:function(){var z=$.dk
if(z==null){z=J.bZ(window.navigator.userAgent,"Opera",0)
$.dk=z}return z},
dl:function(){var z,y
z=$.dh
if(z!=null)return z
y=$.di
if(y==null){y=J.bZ(window.navigator.userAgent,"Firefox",0)
$.di=y}if(y===!0)z="-moz-"
else{y=$.dj
if(y==null){y=P.dm()!==!0&&J.bZ(window.navigator.userAgent,"Trident/",0)
$.dj=y}if(y===!0)z="-ms-"
else z=P.dm()===!0?"-o-":"-webkit-"}$.dh=z
return z},
kc:{"^":"d:20;a",
$2:function(a,b){this.a[a]=b}}}],["","",,A,{"^":"",
mQ:[function(){var z=document.querySelector("#loading").style
z.display="none"
z=H.ag(document.querySelector("#startGame"),"$isd9").style
z.display="inline-block"
z=J.d2(document.querySelector("#startGame"))
H.c(new W.af(0,z.a,z.b,W.a1(new A.kw()),!1),[H.x(z,0)]).Z()},"$0","eO",0,0,2],
kw:{"^":"d:0;",
$1:function(a){var z=document.querySelector("#story").style;(z&&C.q).sdw(z,"0.0")
z=document.querySelector("#game").style;(z&&C.q).sdw(z,"1.0")
P.e0(P.fD(0,0,0,0,0,1),new A.kv())
F.fU().bo(0)}},
kv:{"^":"d:1;",
$0:function(){var z=document.querySelector("#story").style
z.display="none"
return"none"}}},1],["","",,F,{"^":"",
hd:[function(){var z,y,x,w,v,u,t,s,r
z=new Array(183)
z.fixed$length=Array
y=new Array(180)
z[0]=0
z[1]=0
z[2]=0
for(x=0;x<60;x=w){w=x+1
v=3*w
u=-0.7853981633974483+6.283185307179586*x/60
t=Math.cos(u)
if(v>=183)return H.a(z,v)
z[v]=t
t=v+1
s=Math.sin(u)
if(t>=183)return H.a(z,t)
z[t]=s
s=v+2
if(s>=183)return H.a(z,s)
z[s]=0
s=x*3
if(s>=180)return H.a(y,s)
y[s]=0
t=s+1
r=C.a.R(v,3)
if(t>=180)return H.a(y,t)
y[t]=r
s+=2
if(s>=180)return H.a(y,s)
y[s]=r+1}y[179]=1
return new F.bb(z,y)},"$0","kB",0,0,6],
lx:[function(){var z,y,x,w,v,u,t,s,r,q,p
z=new Array(183)
z.fixed$length=Array
y=new Array(180)
z[0]=0
z[1]=0
z[2]=0
for(x=0;x<4;++x)for(w=x*15,v=0;v<15;++v){u=w+v
t=3*(u+1)
switch(x){case 0:s=-1+2*(v/15)
r=1
break
case 1:r=1-2*(v/15)
s=1
break
case 2:s=1-2*(v/15)
r=-1
break
case 3:r=-1+2*(v/15)
s=-1
break
default:r=null
s=null}if(t>=183)return H.a(z,t)
z[t]=r
q=t+1
if(q>=183)return H.a(z,q)
z[q]=s
q=t+2
if(q>=183)return H.a(z,q)
z[q]=0
u*=3
if(u>=180)return H.a(y,u)
y[u]=0
q=u+1
p=C.a.R(t,3)
if(q>=180)return H.a(y,q)
y[q]=p
u+=2
if(u>=180)return H.a(y,u)
y[u]=p+1}y[179]=1
return new F.bb(z,y)},"$0","kC",0,0,6],
ly:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=new Array(183)
z.fixed$length=Array
y=new Array(180)
z[0]=0
z[1]=0
z[2]=0
for(x=0;x<3;)for(w=x*20,v=-0.5235987755982988+6.283185307179586*x/3,++x,u=-0.5235987755982988+6.283185307179586*x/3,t=0;t<20;++t){s=w+t
r=3*(s+1)
q=Math.cos(v)
p=Math.cos(u)
o=Math.cos(v)
n=t/20
m=Math.sin(v)
l=Math.sin(u)
k=Math.sin(v)
if(r>=183)return H.a(z,r)
z[r]=q+(p-o)*n
o=r+1
if(o>=183)return H.a(z,o)
z[o]=m+(l-k)*n
n=r+2
if(n>=183)return H.a(z,n)
z[n]=0
s*=3
if(s>=180)return H.a(y,s)
y[s]=0
n=s+1
k=C.a.R(r,3)
if(n>=180)return H.a(y,n)
y[n]=k
s+=2
if(s>=180)return H.a(y,s)
y[s]=k+1}y[179]=1
return new F.bb(z,y)},"$0","kD",0,0,6],
lz:[function(a){if(typeof a!=="number")return a.a2()
return Math.sqrt(H.Y(a/3.141592653589793))},"$1","kE",2,0,4],
lA:[function(a){return Math.sqrt(H.Y(a))/2},"$1","kF",2,0,4],
lB:[function(a){if(typeof a!=="number")return H.i(a)
return Math.sqrt(H.Y(4*a/Math.sqrt(H.Y(3))))*Math.sqrt(H.Y(3))/3},"$1","kG",2,0,4],
v:{"^":"aZ;A:a@",u:{
bF:function(a,b,c){var z,y
z=J.aO(S.aX(C.b))
if(null==z)z=F.cX().$0()
y=new Float32Array(3)
y[0]=a
y[1]=b
y[2]=c
z.sA(new T.D(y))
return z},
m7:[function(){return new F.v(null)},"$0","cX",0,0,26]}},
ao:{"^":"aZ;A:a@",u:{
mu:[function(){return new F.ao(null)},"$0","kJ",0,0,27]}},
al:{"^":"aZ;ax:a@,d7:b@",u:{
mf:[function(){return new F.al(null,null)},"$0","kH",0,0,28]}},
b_:{"^":"aZ;ax:a@,j:b*",u:{
cv:function(a,b){var z=S.bE(C.o,F.kI())
z.sax(a)
z.sj(0,b)
return z},
mo:[function(){return new F.b_(null,null)},"$0","kI",0,0,29]}},
aY:{"^":"aZ;H:a*",u:{
m2:[function(){return new F.aY(null)},"$0","eS",0,0,30]}},
ap:{"^":"aZ;a1:a@,aJ:b@",
cu:function(a,b,c){var z,y,x,w,v
if(b===0){for(z=this.a,y=z.length,x=c.length,w=0;w<y;++w){v=z[w]
if(w>=x)return H.a(c,w)
c[w]=v}return y}return 0},
dU:function(a,b,c){var z,y,x,w
if(b===0)for(z=this.a,y=z.length,x=c.length,w=0;w<y;++w){if(w>=x)return H.a(c,w)
z[w]=c[w]}},
$isaG:1,
u:{
mv:[function(){return new F.ap(null,null)},"$0","kK",0,0,31]}},
bb:{"^":"b;a1:a@,aJ:b@"},
cc:{"^":"aB;l:b>,k:c>,a"},
eh:{"^":"aB;b,c,d,a",
bY:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.d.ao("player")
y=J.A(this.b.b,J.T(z)).gA()
x=J.d3(this.c)
w=J.d0(this.c)
if(typeof x!=="number")return x.a2()
if(typeof w!=="number")return H.i(w)
v=new Float32Array(H.l(16))
u=new T.aC(v)
u.cw()
t=new Float32Array(H.l(16))
s=new T.aC(t)
s.cw()
y=y.a
r=y[0]
q=y[1]
p=y[2]
o=new T.D(new Float32Array(H.l(3)))
o.ad(r,q,p-100)
p=y[0]
q=y[1]
y=y[2]
r=new Float32Array(H.l(3))
new T.D(r).ad(0.95*p,0.95*q,y+10)
y=new T.D(new Float32Array(H.l(3)))
y.ad(0,-1,0)
q=new Float32Array(H.l(3))
n=new T.D(q)
n.I(o)
q[0]=q[0]-r[0]
q[1]=q[1]-r[1]
q[2]=q[2]-r[2]
n.c7()
m=y.de(n)
m.c7()
l=n.de(m)
l.c7()
y=m.bZ(o)
r=l.bZ(o)
o=n.bZ(o)
p=m.a
k=p[0]
j=l.a
i=j[0]
h=q[0]
g=p[1]
f=j[1]
e=q[1]
p=p[2]
j=j[2]
q=q[2]
v[15]=1
v[14]=-o
v[13]=-r
v[12]=-y
v[11]=0
v[10]=q
v[9]=j
v[8]=p
v[7]=0
v[6]=e
v[5]=f
v[4]=g
v[3]=0
v[2]=h
v[1]=i
v[0]=k
d=Math.tan(H.Y(0.7853981633974483))
c=d*(x/w)
w=-c
x=-d
b=c-w
a=d-x
t[0]=0
t[1]=0
t[2]=0
t[3]=0
t[4]=0
t[5]=0
t[6]=0
t[7]=0
t[8]=0
t[9]=0
t[10]=0
t[11]=0
t[12]=0
t[13]=0
t[14]=0
t[15]=0
t[0]=2/b
t[5]=2/a
t[8]=(c+w)/b
t[9]=(d+x)/a
t[10]=-1.0002000200020003
t[11]=-1
t[14]=-2.000200020002
return s.D(0,u)},
J:function(){var z,y
this.e3()
z=this.a
y=H.c(new S.J(null,null),[F.v])
y.N(C.b,z,F.v)
this.b=y
this.d=this.a.z.h(0,C.f)
this.c=this.a.z.h(0,C.n)}},
dW:{"^":"ca;z,Q,ch,cx,cy,a,b,c,d,e,f,r,x,y",
ca:function(a){var z,y,x,w,v
z=J.m(a)
y=J.A(this.z.b,z.gB(a))
x=J.A(this.Q.b,z.gB(a))
z=$.$get$cw()
w=z.a
v=w.b===w.c?z.fu():w.cd()
z.b.h5(v)
v.sdg($.$get$e2())
v.f1(y,0,1)
v.sh8(0,$.$get$e3())
z=$.$get$dv()
w=this.cy
if(w<0||w>=3)return H.a(z,w)
v.shi(z[w].$0().ga1())
v.sdg($.$get$dq())
v.cz(0,$.$get$d_())
w=$.$get$dw()
z=this.cy
if(z<0||z>=3)return H.a(w,z)
x.a=w[z].$1(x.gd7())
this.ch=!1},
h3:function(){this.cy=C.a.L(this.cy+1,this.cx)
this.ch=!0},
ha:function(){this.cy=C.a.L(this.cy-1,this.cx)
this.ch=!0},
ai:function(){return this.ch},
J:function(){var z,y
this.ap()
z=this.b
y=H.c(new S.J(null,null),[F.al])
y.N(C.i,z,F.al)
this.Q=y
y=this.b
z=H.c(new S.J(null,null),[F.ap])
z.N(C.k,y,F.ap)
this.z=z}},
hK:{"^":"ca;z,Q,a,b,c,d,e,f,r,x,y",
ca:function(a){var z,y,x,w,v,u
z=J.m(a)
y=J.A(this.z.b,z.gB(a))
x=J.A(this.Q.b,z.gB(a))
z=y.gA()
w=x.gA()
v=this.b.ch
w.toString
u=new T.D(new Float32Array(H.l(3)))
u.I(w)
u.a3(0,v)
z.toString
v=new T.D(new Float32Array(H.l(3)))
v.I(z)
v.n(0,u)
y.sA(v)},
J:function(){var z,y
this.ap()
z=this.b
y=H.c(new S.J(null,null),[F.ao])
y.N(C.j,z,F.ao)
this.Q=y
y=this.b
z=H.c(new S.J(null,null),[F.v])
z.N(C.b,y,F.v)
this.z=z}},
hT:{"^":"ca;z,Q,a,b,c,d,e,f,r,x,y",
ca:function(a){var z,y,x
z=J.m(a)
y=J.A(this.Q.b,z.gB(a))
z=J.A(this.z.b,z.gB(a)).gA()
x=P.cU(5000,100+y.gA().a[2]/100)
z.a[2]=x},
J:function(){var z,y
this.ap()
z=this.b
y=H.c(new S.J(null,null),[F.v])
y.N(C.b,z,F.v)
this.Q=y
y=this.b
z=H.c(new S.J(null,null),[F.ao])
z.N(C.j,y,F.ao)
this.z=z}},
fA:{"^":"aS;z,Q,a,b,c,d,e,f,r,x,y",
bf:function(a){var z=this.z.ao("player")
a.F(0,new F.fB(this,J.A(this.Q.b,J.T(z))))},
ai:function(){return!0},
J:function(){var z,y
this.ap()
z=this.b
y=H.c(new S.J(null,null),[F.v])
y.N(C.b,z,F.v)
this.Q=y
this.z=this.b.z.h(0,C.f)}},
fB:{"^":"d:0;a,b",
$1:function(a){if(J.A(this.a.Q.b,J.T(a)).gA().a[2]+500<this.b.gA().a[2])a.fB()}},
is:{"^":"bj;z,Q,ch,cx,a,b,c,d,e,f,r,x,y",
aO:function(){var z,y,x
z=this.b
y=this.cx
x=z.av([F.bF(0,0,y*this.ch),F.cv(200,y)])
z.c.n(0,x);++this.ch},
ai:function(){var z=this.z.ao("player")
return C.e.R(J.A(this.Q.b,J.T(z)).gA().a[2],100)>this.ch-100},
J:function(){var z,y
this.ap()
z=this.b
y=H.c(new S.J(null,null),[F.v])
y.N(C.b,z,F.v)
this.Q=y
this.z=this.b.z.h(0,C.f)}},
hQ:{"^":"bj;z,Q,ch,a,b,c,d,e,f,r,x,y",
aO:function(){var z,y,x,w,v,u,t,s,r
for(z=-2;z<3;++z)for(y=z*20*4,x=-2;x<3;++x){w=this.b
v=this.ch
u=J.aO(S.aX(C.b))
if(null==u)u=F.cX().$0()
t=new Float32Array(3)
t[0]=y
t[1]=x*20*4
t[2]=v*1000
u.sA(new T.D(t))
t=$.$get$cV().dr(2)
s=J.aO(S.aX(C.l))
if(null==s)s=F.eS().$0()
J.d4(s,t)
r=w.av([u,s])
w.c.n(0,r)}++this.ch},
ai:function(){var z=this.z.ao("player")
return C.e.R(J.A(this.Q.b,J.T(z)).gA().a[2],1000)>this.ch-10},
J:function(){var z,y
this.ap()
z=this.b
y=H.c(new S.J(null,null),[F.v])
y.N(C.b,z,F.v)
this.Q=y
this.z=this.b.z.h(0,C.f)}}}],["","",,B,{"^":"",bq:{"^":"b;eI:fx<",
aP:["e0",function(a){this.a=-2
this.b=0
this.d=!1
this.c=!1
this.y=0
this.x=0
this.r=0
this.f=0
this.e=0
this.cy=!1
this.cx=!1
this.ch=!1
this.Q=!1
this.z=!1
this.db=null
this.dx=8
this.dy=null
this.fx=!0
this.fr=!0}],
cz:function(a,b){if(b==null){this.fe()
this.x=0
this.z=!0}else b.n(0,this)},
bo:function(a){return this.cz(a,null)},
gh_:function(){return this.ch===!0||this.cx===!0},
at:function(a){},
bi:function(a){var z,y,x
if(this.z!==!0||this.cy===!0||this.cx===!0)return
this.y=a
if(this.Q!==!0)this.J()
if(this.Q===!0){z=this.c!==!0
if(z){y=this.b
if(typeof y!=="number")return y.U()
y=this.a
if(typeof y!=="number")return y.V()
if(y<0){y=this.x
x=this.y
if(typeof y!=="number")return y.w()
if(typeof x!=="number")return H.i(x)
x=y+x>=0
y=x}else y=!1}else y=!1
if(y){this.c=!0
this.a=0
z=this.x
if(typeof z!=="number")return H.i(z)
a=0-z
z=this.y
if(typeof z!=="number")return z.p()
this.y=z-a
this.x=0
this.at(1)
this.at(2)
z=this.a
if(typeof z!=="number")return z.p()
this.an(z,z-1,this.c,a)}else{if(z){z=this.b
if(typeof z!=="number")return z.U()
y=this.a
if(typeof y!=="number")return y.O()
if(y>z*2){z=this.x
y=this.y
if(typeof z!=="number")return z.w()
if(typeof y!=="number")return H.i(y)
y=z+y<0
z=y}else z=!1}else z=!1
if(z){this.c=!0
z=this.b
if(typeof z!=="number")return z.D()
this.a=z*2
z=this.x
if(typeof z!=="number")return H.i(z)
a=0-z
z=this.y
if(typeof z!=="number")return z.p()
this.y=z-a
this.x=this.f
this.at(16)
this.at(32)
z=this.a
if(typeof z!=="number")return z.w()
this.an(z,z+1,this.c,a)}}this.hj()
z=this.b
if(typeof z!=="number")return z.U()
y=this.a
if(typeof y!=="number")return y.O()
z=y>z*2||y<0
this.ch=z}z=this.x
y=this.y
if(typeof z!=="number")return z.w()
if(typeof y!=="number")return H.i(y)
this.x=z+y
this.y=0},
J:function(){var z,y,x
z=this.x
y=this.y
if(typeof z!=="number")return z.w()
if(typeof y!=="number")return H.i(y)
x=this.e
if(typeof x!=="number")return H.i(x)
if(z+y>=x){this.fW()
this.Q=!0
this.c=!0
this.a=0
z=this.y
y=this.e
x=this.x
if(typeof y!=="number")return y.p()
if(typeof x!=="number")return H.i(x)
if(typeof z!=="number")return z.p()
this.y=z-(y-x)
this.x=0
this.at(1)
this.at(2)}},
hj:function(){var z,y,x,w,v,u,t
while(!0){z=this.a
if(typeof z!=="number")return z.U()
if(z>=0){y=this.b
if(typeof y!=="number")return y.D()
y=z<=y*2}else y=!1
if(!y){y=this.b
if(typeof y!=="number")return y.V()
y=!1}else y=!0
if(!y)break
y=this.c
x=y===!0
w=!x
if(w){v=this.x
u=this.y
if(typeof v!=="number")return v.w()
if(typeof u!=="number")return H.i(u)
u=v+u<=0
v=u}else v=!1
if(v){this.c=!0;--z
this.a=z
y=this.x
if(typeof y!=="number")return H.i(y)
t=0-y
y=this.y
if(typeof y!=="number")return y.p()
this.y=y-t
this.x=this.f
if(this.d===!0&&Math.abs(C.a.L(z,4))===2)this.di()
else this.dh()
z=this.a
if(typeof z!=="number")return z.w()
this.an(z,z+1,this.c,t)}else{if(w){w=this.x
v=this.y
if(typeof w!=="number")return w.w()
if(typeof v!=="number")return H.i(v)
u=this.r
if(typeof u!=="number")return H.i(u)
u=w+v>=u
w=u}else w=!1
if(w){this.c=!0;++z
this.a=z
y=this.r
x=this.x
if(typeof y!=="number")return y.p()
if(typeof x!=="number")return H.i(x)
t=y-x
x=this.y
if(typeof x!=="number")return x.p()
this.y=x-t
this.x=0
if(this.d===!0&&Math.abs(C.a.L(z,4))===2)this.dh()
else this.di()
z=this.a
if(typeof z!=="number")return z.p()
this.an(z,z-1,this.c,t)}else{if(x){w=this.x
v=this.y
if(typeof w!=="number")return w.w()
if(typeof v!=="number")return H.i(v)
v=w+v<0
w=v}else w=!1
if(w){this.c=!1;--z
this.a=z
y=this.x
if(typeof y!=="number")return H.i(y)
t=0-y
y=this.y
if(typeof y!=="number")return y.p()
this.y=y-t
this.x=0
this.an(z,z+1,!1,t)
z=this.a
if(typeof z!=="number")return z.V()
if(z<0){z=this.b
if(typeof z!=="number")return z.U()
z=!0}else z=!1
if(z);else this.x=this.r}else{if(x){w=this.x
v=this.y
if(typeof w!=="number")return w.w()
if(typeof v!=="number")return H.i(v)
u=this.f
if(typeof u!=="number")return H.i(u)
u=w+v>u
w=u}else w=!1
if(w){this.c=!1;++z
this.a=z
y=this.f
x=this.x
if(typeof y!=="number")return y.p()
if(typeof x!=="number")return H.i(x)
t=y-x
x=this.y
if(typeof x!=="number")return x.p()
this.y=x-t
this.x=y
this.an(z,z-1,!1,t)
z=this.a
y=this.b
if(typeof y!=="number")return y.D()
if(typeof z!=="number")return z.O()
if(z>y*2&&!0);this.x=0}else{t=this.y
if(x){if(typeof t!=="number")return t.p()
this.y=t-t
x=this.x
if(typeof x!=="number")return x.w()
this.x=x+t
this.an(z,z,y,t)
break}else{if(typeof t!=="number")return t.p()
this.y=t-t
z=this.x
if(typeof z!=="number")return z.w()
this.x=z+t
break}}}}}}}},fG:{"^":"e1;c,d,e,f,a,b",u:{
l5:[function(a){var z=J.j(a)
if(z.v(a,0))return 0
if(z.v(a,1))return 1
if(typeof a!=="number")return H.i(a)
z=-10*a
H.Y(2)
H.Y(z)
return Math.pow(2,z)*Math.sin(H.Y((a-0.075)*6.283185307179586/0.3))+1},"$1","kP",2,0,9]}},hX:{"^":"e1;a,b",u:{
m8:[function(a){var z
a=J.z(a,2)
z=J.w(a)
if(z.V(a,1)){if(typeof a!=="number")return H.i(a)
return 0.5*a*a}a=z.p(a,1)
z=J.w(a)
z=J.ah(z.D(a,z.p(a,2)),1)
if(typeof z!=="number")return H.i(z)
return-0.5*z},"$1","kQ",2,0,9]}},fn:{"^":"iw;a",
hp:[function(a,b,c){var z,y,x
z=J.w(c)
y=P.cU(P.cT(J.fa(J.z(z.p(c,1),a)),0),z.p(c,2))
a=J.ah(J.z(a,z.p(c,1)),y)
if(y===0){z=J.P(b)
return this.bv(z.h(b,0),z.h(b,0),z.h(b,1),z.h(b,2),a)}if(y===z.p(c,2)){x=J.P(b)
return this.bv(x.h(b,z.p(c,3)),x.h(b,z.p(c,2)),x.h(b,z.p(c,1)),x.h(b,z.p(c,1)),a)}z=J.P(b)
return this.bv(z.h(b,y-1),z.h(b,y),z.h(b,y+1),z.h(b,y+2),a)},"$3","geo",6,0,21],
bv:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=J.w(c)
y=J.z(z.p(c,a),0.5)
x=J.z(J.ah(d,b),0.5)
if(typeof e!=="number")return H.i(e)
w=2*e*e
v=3*e*e
u=e*e
t=u*e
return J.t(J.t(J.t(J.z(b,w*e-v+1),z.D(c,-2*e*e*e+v)),J.z(y,t-w+e)),J.z(x,t-u))},
e7:function(){this.a=this.geo()}},hV:{"^":"b;a,b,c",
eb:function(a,b){this.a=P.bA(null,null)},
fu:function(){return this.c.$0()}},hW:{"^":"b;a,b",
h4:function(a){return this.a.$1(a)},
h5:function(a){return this.b.$1(a)}},bg:{"^":"bq;fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx",
aP:function(a){var z,y
this.e0(this)
this.fy=null
this.go=null
this.id=null
this.k1=-1
this.k2=null
this.k3=null
this.r1=!1
this.k4=!1
this.rx=0
this.r2=0
z=this.y1.length
y=$.a2
if(z!==y)this.y1=new Float32Array(H.l(y))
z=this.y2.length
y=(2+$.cy)*$.a2
if(z!==y)this.y2=new Float32Array(H.l(y))},
f1:function(a,b,c){this.fy=a
this.go=a!=null?this.ew():null
this.k1=b
this.f=c},
ew:function(){var z,y
if($.$get$cx().bb(J.c_(this.fy)))return J.c_(this.fy)
z=this.fy
y=J.j(z)
if(!!y.$isaG)return y.gK(z)
return},
sdg:function(a){this.k2=a},
shi:function(a){var z=H.k7(a,"$isk",[P.y],"$ask")
if(z){z=this.x1
if(z.length>$.a2)this.d_()
C.c.dR(z,0,a)}},
sh8:function(a,b){this.k3=b},
fe:function(){var z,y
if(this.fy==null)return
z=$.$get$cx().h(0,this.go)
this.id=z
y=z==null
if(y);if(!y){z=z.dI(this.fy,this,this.k1,this.y1)
this.r2=z}else{z=this.fy
if(!!J.j(z).$isaG){z=H.ag(z,"$isaG").cu(this,this.k1,this.y1)
this.r2=z}else throw H.f(P.aT("No TweenAccessor was found for the target, and it is not Tweenable either."))}if(z>$.a2)this.d_()},
fW:function(){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.fy==null)return
z=this.ry
this.eA(z)
y=this.x2
x=y.length
w=z.length
v=this.x1
u=v.length
t=0
while(!0){s=this.r2
if(typeof s!=="number")return H.i(s)
if(!(t<s))break
if(t>=u)return H.a(v,t)
s=v[t]
if(this.r1===!0){if(t>=w)return H.a(z,t)
r=z[t]}else r=0
v[t]=J.t(s,r)
q=0
while(!0){s=this.rx
if(typeof s!=="number")return H.i(s)
if(!(q<s))break
s=this.r2
if(typeof s!=="number")return H.i(s)
s=q*s+t
if(s>=x)return H.a(y,s)
r=y[s]
if(this.r1===!0){if(t>=w)return H.a(z,t)
p=z[t]}else p=0
y[s]=C.I.w(r,p);++q}if(this.k4===!0){if(t>=w)return H.a(z,t)
o=z[t]
z[t]=v[t]
v[t]=o}++t}},
an:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(this.fy==null||this.k2==null)return
z=c!==!0
if(z){if(typeof a!=="number")return a.O()
if(typeof b!=="number")return H.i(b)
y=a>b}else y=!1
if(y){if(this.d===!0){if(typeof b!=="number")return b.L()
z=Math.abs(C.a.L(b,4))===2}else z=!1
this.ag(z?this.ry:this.x1)
return}if(z){if(typeof a!=="number")return a.V()
if(typeof b!=="number")return H.i(b)
z=a<b}else z=!1
if(z){if(this.d===!0){if(typeof b!=="number")return b.L()
z=Math.abs(C.a.L(b,4))===2}else z=!1
this.ag(z?this.x1:this.ry)
return}z=this.f
if(typeof z!=="number")return z.V()
y=z<1e-11
if(y){if(typeof d!=="number")return d.O()
x=d>-1e-11}else x=!1
if(x){if(this.d===!0){if(typeof a!=="number")return a.L()
z=Math.abs(C.a.L(a,4))===2}else z=!1
this.ag(z?this.x1:this.ry)
return}if(y){if(typeof d!=="number")return d.V()
y=d<1e-11}else y=!1
if(y){if(this.d===!0){if(typeof a!=="number")return a.L()
z=Math.abs(C.a.L(a,4))===2}else z=!1
this.ag(z?this.ry:this.x1)
return}if(this.d===!0){if(typeof a!=="number")return a.L()
y=Math.abs(C.a.L(a,4))===2}else y=!1
w=this.x
if(y){if(typeof w!=="number")return H.i(w)
w=z-w}y=this.k2
if(typeof w!=="number")return w.a2()
v=y.fo(w/z)
if(this.rx===0||this.k3==null){z=this.ry
y=z.length
x=this.x1
u=x.length
t=J.b7(v)
s=0
while(!0){r=this.r2
if(typeof r!=="number")return H.i(r)
if(!(s<r))break
r=this.y1
if(s>=y)return H.a(z,s)
q=z[s]
if(s>=u)return H.a(x,s)
q=J.t(q,t.D(v,J.ah(x[s],q)))
if(s>=r.length)return H.a(r,s)
r[s]=q;++s}}else{z=this.x2
y=z.length
x=this.ry
u=x.length
t=this.x1
r=t.length
s=0
while(!0){q=this.r2
if(typeof q!=="number")return H.i(q)
if(!(s<q))break
p=this.y2
if(s>=u)return H.a(x,s)
o=x[s]
n=p.length
if(0>=n)return H.a(p,0)
p[0]=o
o=this.rx
if(typeof o!=="number")return H.i(o)
m=1+o
if(s>=r)return H.a(t,s)
l=t[s]
if(m>=n)return H.a(p,m)
p[m]=l
for(k=0;k<o;k=j){j=k+1
m=k*q+s
if(m>=y)return H.a(z,m)
m=z[m]
if(j>=n)return H.a(p,j)
p[j]=m}q=this.y1
o=this.k3.fp(v,p,o+2)
if(s>=q.length)return H.a(q,s)
q[s]=o;++s}}this.ag(this.y1)},
di:function(){if(this.fy==null)return
this.ag(this.ry)},
dh:function(){if(this.fy==null)return
this.ag(this.x1)},
eA:function(a){var z=this.id
if(z!=null)return z.dI(this.fy,this,this.k1,a)
else{z=this.fy
if(!!J.j(z).$isaG)return H.ag(z,"$isaG").cu(this,this.k1,a)}return 0},
ag:function(a){var z=this.id
if(z!=null)z.dV(this.fy,this,this.k1,a)
else{z=this.fy
if(!!J.j(z).$isaG)H.ag(z,"$isaG").dU(this,this.k1,a)}},
d_:function(){throw H.f(P.aT("You cannot combine more than "+$.a2+" \r\n                  attributes in a tween. You can raise this limit with \r\n                  Tween.setCombinedAttributesLimit(), which should be called once\r\n                  in application initialization code."))}},k9:{"^":"d:7;",
$1:function(a){a.aP(0)}},ka:{"^":"d:7;",
$1:function(a){J.fg(a)}},k8:{"^":"d:1;",
$0:function(){var z,y,x,w,v
z=new Array($.a2)
z.fixed$length=Array
z=H.c(z,[P.y])
y=new Array($.a2)
y.fixed$length=Array
y=H.c(y,[P.y])
x=H.c(new Array($.cy*$.a2),[P.y])
w=new Array($.a2)
w.fixed$length=Array
w=H.c(w,[P.y])
v=new Array((2+$.cy)*$.a2)
v.fixed$length=Array
v=new B.bg(null,null,null,null,null,null,null,null,null,null,z,y,x,w,H.c(v,[P.y]),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
v.aP(0)
return v}},it:{"^":"b;"},e1:{"^":"b;",
fo:function(a){return this.a.$1(a)}},iu:{"^":"b;a,b",
n:function(a,b){var z=this.a
if(!C.c.aE(z,b))z.push(b)
if(b.geI()===!0)b.bo(0)},
bi:function(a){var z,y
z=this.a
C.c.ba(z,"removeWhere")
C.c.eY(z,new B.iv(),!0)
if(!this.b)if(a>=0)for(y=0;y<z.length;++y)z[y].bi(a)
else for(y=z.length-1;y>=0;--y){if(y>=z.length)return H.a(z,y)
z[y].bi(a)}},
gj:function(a){return this.a.length}},iv:{"^":"d:23;",
$1:function(a){var z
if(a.gh_()&&a.fr===!0){z=$.$get$cw()
if(!z.a.aE(0,a)){z.b.h4(a)
z.a.Y(a)}return!0}return!1}},iw:{"^":"b;",
fp:function(a,b,c){return this.a.$3(a,b,c)}}}],["","",,T,{"^":"",aC:{"^":"b;cS:a<",
gaA:function(){return this.a},
I:function(a){var z,y
z=a.a
y=this.a
y[15]=z[15]
y[14]=z[14]
y[13]=z[13]
y[12]=z[12]
y[11]=z[11]
y[10]=z[10]
y[9]=z[9]
y[8]=z[8]
y[7]=z[7]
y[6]=z[6]
y[5]=z[5]
y[4]=z[4]
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
i:function(a){return"[0] "+this.aU(0).i(0)+"\n[1] "+this.aU(1).i(0)+"\n[2] "+this.aU(2).i(0)+"\n[3] "+this.aU(3).i(0)+"\n"},
gfH:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
z[b]=c},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aC){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gG:function(a){return A.bR(this.a)},
aU:function(a){var z,y,x
z=new Float32Array(H.l(4))
y=this.a
if(a>=16)return H.a(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.a(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.a(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.a(y,x)
z[3]=y[x]
return new T.an(z)},
D:function(c8,c9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7
if(typeof c9==="number"){z=new Float32Array(H.l(16))
y=new T.aC(z)
y.I(this)
z[0]=z[0]*c9
z[1]=z[1]*c9
z[2]=z[2]*c9
z[3]=z[3]*c9
z[4]=z[4]*c9
z[5]=z[5]*c9
z[6]=z[6]*c9
z[7]=z[7]*c9
z[8]=z[8]*c9
z[9]=z[9]*c9
z[10]=z[10]*c9
z[11]=z[11]*c9
z[12]=z[12]
z[13]=z[13]
z[14]=z[14]
z[15]=z[15]
return y}z=J.j(c9)
if(!!z.$isan){x=new T.an(new Float32Array(H.l(4)))
x.I(c9)
w=x.a
z=this.a
y=z[0]
v=w[0]
u=z[4]
t=w[1]
s=z[8]
r=w[2]
q=z[12]
p=w[3]
o=z[1]
n=z[5]
m=z[9]
l=z[13]
k=z[2]
j=z[6]
i=z[10]
h=z[14]
g=z[3]
f=z[7]
e=z[11]
z=z[15]
w[0]=y*v+u*t+s*r+q*p
w[1]=o*v+n*t+m*r+l*p
w[2]=k*v+j*t+i*r+h*p
w[3]=g*v+f*t+e*r+z*p
return x}if(!!z.$isD){x=new T.D(new Float32Array(H.l(3)))
x.I(c9)
w=x.a
z=this.a
y=z[0]
v=w[0]
u=z[4]
t=w[1]
s=z[8]
r=w[2]
q=z[12]
p=z[1]
o=z[5]
n=z[9]
m=z[13]
l=z[2]
k=z[6]
j=z[10]
z=z[14]
w[0]=y*v+u*t+s*r+q
w[1]=p*v+o*t+n*r+m
w[2]=l*v+k*t+j*r+z
return x}if(c9.gfH()===4){z=new Float32Array(H.l(16))
y=new T.aC(z)
y.I(this)
d=z[0]
c=z[4]
b=z[8]
a=z[12]
a0=z[1]
a1=z[5]
a2=z[9]
a3=z[13]
a4=z[2]
a5=z[6]
a6=z[10]
a7=z[14]
a8=z[3]
a9=z[7]
b0=z[11]
b1=z[15]
w=c9.a
b2=w[0]
b3=w[4]
b4=w[8]
b5=w[12]
b6=w[1]
b7=w[5]
b8=w[9]
b9=w[13]
c0=w[2]
c1=w[6]
c2=w[10]
c3=w[14]
c4=w[3]
c5=w[7]
c6=w[11]
c7=w[15]
z[0]=d*b2+c*b6+b*c0+a*c4
z[4]=d*b3+c*b7+b*c1+a*c5
z[8]=d*b4+c*b8+b*c2+a*c6
z[12]=d*b5+c*b9+b*c3+a*c7
z[1]=a0*b2+a1*b6+a2*c0+a3*c4
z[5]=a0*b3+a1*b7+a2*c1+a3*c5
z[9]=a0*b4+a1*b8+a2*c2+a3*c6
z[13]=a0*b5+a1*b9+a2*c3+a3*c7
z[2]=a4*b2+a5*b6+a6*c0+a7*c4
z[6]=a4*b3+a5*b7+a6*c1+a7*c5
z[10]=a4*b4+a5*b8+a6*c2+a7*c6
z[14]=a4*b5+a5*b9+a6*c3+a7*c7
z[3]=a8*b2+a9*b6+b0*c0+b1*c4
z[7]=a8*b3+a9*b7+b0*c1+b1*c5
z[11]=a8*b4+a9*b8+b0*c2+b1*c6
z[15]=a8*b5+a9*b9+b0*c3+b1*c7
return y}throw H.f(P.a3(c9))},
w:function(a,b){var z=new T.aC(new Float32Array(H.l(16)))
z.I(this)
z.n(0,b)
return z},
p:function(a,b){var z,y,x
z=new Float32Array(H.l(16))
y=new T.aC(z)
y.I(this)
x=b.gcS()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
z[4]=z[4]-x[4]
z[5]=z[5]-x[5]
z[6]=z[6]-x[6]
z[7]=z[7]-x[7]
z[8]=z[8]-x[8]
z[9]=z[9]-x[9]
z[10]=z[10]-x[10]
z[11]=z[11]-x[11]
z[12]=z[12]-x[12]
z[13]=z[13]-x[13]
z[14]=z[14]-x[14]
z[15]=z[15]-x[15]
return y},
cw:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1},
n:function(a,b){var z,y
z=b.gcS()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]
y[4]=y[4]+z[4]
y[5]=y[5]+z[5]
y[6]=y[6]+z[6]
y[7]=y[7]+z[7]
y[8]=y[8]+z[8]
y[9]=y[9]+z[9]
y[10]=y[10]+z[10]
y[11]=y[11]+z[11]
y[12]=y[12]+z[12]
y[13]=y[13]+z[13]
y[14]=y[14]+z[14]
y[15]=y[15]+z[15]}},bi:{"^":"b;d3:a<",
I:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
i:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+"]"},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.bi){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gG:function(a){return A.bR(this.a)},
p:function(a,b){var z,y,x
z=new Float32Array(H.l(2))
y=new T.bi(z)
y.I(this)
x=b.gd3()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
return y},
w:function(a,b){var z=new T.bi(new Float32Array(H.l(2)))
z.I(this)
z.n(0,b)
return z},
a2:function(a,b){var z=new T.bi(new Float32Array(H.l(2)))
z.I(this)
z.a3(0,1/b)
return z},
D:function(a,b){var z=new T.bi(new Float32Array(H.l(2)))
z.I(this)
z.a3(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(H.Y(y*y+z*z))},
n:function(a,b){var z,y
z=b.gd3()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
a3:function(a,b){var z,y
z=this.a
y=z[1]
if(typeof b!=="number")return H.i(b)
z[1]=y*b
z[0]=z[0]*b},
bd:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])},
gq:function(a){return this.a[0]},
gt:function(a){return this.a[1]}},D:{"^":"b;d4:a<",
gaA:function(){return this.a},
ad:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c},
I:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
i:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+"]"},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.D){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gG:function(a){return A.bR(this.a)},
p:function(a,b){var z,y,x
z=new Float32Array(H.l(3))
y=new T.D(z)
y.I(this)
x=b.gd4()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
return y},
w:function(a,b){var z=new T.D(new Float32Array(H.l(3)))
z.I(this)
z.n(0,b)
return z},
a2:function(a,b){var z=new T.D(new Float32Array(H.l(3)))
z.I(this)
z.a3(0,1/b)
return z},
D:function(a,b){var z=new T.D(new Float32Array(H.l(3)))
z.I(this)
z.a3(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.Y(y*y+x*x+z*z))},
c7:function(){var z,y,x,w,v,u
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=Math.sqrt(H.Y(y*y+x*x+w*w))
if(v===0)return 0
u=1/v
z[0]=z[0]*u
z[1]=z[1]*u
z[2]=z[2]*u
return v},
bZ:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]+y[2]*z[2]},
de:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=a.a
u=v[0]
t=v[1]
s=v[2]
z=new T.D(new Float32Array(H.l(3)))
z.ad(x*s-w*t,w*u-y*s,y*t-x*u)
return z},
n:function(a,b){var z,y
z=b.gd4()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]},
a3:function(a,b){var z,y
z=this.a
y=z[2]
if(typeof b!=="number")return H.i(b)
z[2]=y*b
z[1]=z[1]*b
z[0]=z[0]*b},
bd:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])
z[2]=Math.floor(z[2])},
sA:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
gA:function(){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
z=z[2]
w=new T.D(new Float32Array(H.l(3)))
w.ad(y,x,z)
return w},
gq:function(a){return this.a[0]},
gt:function(a){return this.a[1]}},an:{"^":"b;d5:a<",
gaA:function(){return this.a},
dV:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a},
I:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
i:function(a){var z=this.a
return H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+","+H.e(z[3])},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.an){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gG:function(a){return A.bR(this.a)},
p:function(a,b){var z,y,x
z=new Float32Array(H.l(4))
y=new T.an(z)
y.I(this)
x=b.gd5()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
return y},
w:function(a,b){var z=new T.an(new Float32Array(H.l(4)))
z.I(this)
z.n(0,b)
return z},
a2:function(a,b){var z=new T.an(new Float32Array(H.l(4)))
z.I(this)
z.a3(0,1/b)
return z},
D:function(a,b){var z=new T.an(new Float32Array(H.l(4)))
z.I(this)
z.a3(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.Y(y*y+x*x+w*w+z*z))},
n:function(a,b){var z,y
z=b.gd5()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]},
a3:function(a,b){var z,y
z=this.a
y=z[0]
if(typeof b!=="number")return H.i(b)
z[0]=y*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b},
bd:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])
z[2]=Math.floor(z[2])
z[3]=Math.floor(z[3])},
sA:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
gA:function(){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
z=z[2]
w=new T.D(new Float32Array(H.l(3)))
w.ad(y,x,z)
return w},
gq:function(a){return this.a[0]},
gt:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.j=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ce.prototype
return J.hy.prototype}if(typeof a=="string")return J.bw.prototype
if(a==null)return J.dD.prototype
if(typeof a=="boolean")return J.hx.prototype
if(a.constructor==Array)return J.bc.prototype
if(typeof a!="object"){if(typeof a=="function")return J.be.prototype
return a}if(a instanceof P.b)return a
return J.bP(a)}
J.P=function(a){if(typeof a=="string")return J.bw.prototype
if(a==null)return a
if(a.constructor==Array)return J.bc.prototype
if(typeof a!="object"){if(typeof a=="function")return J.be.prototype
return a}if(a instanceof P.b)return a
return J.bP(a)}
J.as=function(a){if(a==null)return a
if(a.constructor==Array)return J.bc.prototype
if(typeof a!="object"){if(typeof a=="function")return J.be.prototype
return a}if(a instanceof P.b)return a
return J.bP(a)}
J.ke=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ce.prototype
return J.aV.prototype}if(a==null)return a
if(!(a instanceof P.b))return J.bh.prototype
return a}
J.w=function(a){if(typeof a=="number")return J.aV.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bh.prototype
return a}
J.b7=function(a){if(typeof a=="number")return J.aV.prototype
if(typeof a=="string")return J.bw.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bh.prototype
return a}
J.m=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.be.prototype
return a}if(a instanceof P.b)return a
return J.bP(a)}
J.t=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.b7(a).w(a,b)}
J.bV=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a&b)>>>0
return J.w(a).ac(a,b)}
J.bW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.w(a).a2(a,b)}
J.C=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.j(a).v(a,b)}
J.eV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.w(a).U(a,b)}
J.bX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.w(a).O(a,b)}
J.eW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.w(a).cv(a,b)}
J.bY=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.w(a).V(a,b)}
J.z=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.b7(a).D(a,b)}
J.eX=function(a){if(typeof a=="number"&&Math.floor(a)==a)return~a>>>0
return J.ke(a).dJ(a)}
J.ah=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.w(a).p(a,b)}
J.au=function(a,b){return J.w(a).W(a,b)}
J.eY=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a^b)>>>0
return J.w(a).bq(a,b)}
J.A=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eN(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.P(a).h(a,b)}
J.eZ=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.eN(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.as(a).m(a,b,c)}
J.f_=function(a,b,c,d){return J.m(a).eg(a,b,c,d)}
J.f0=function(a,b,c,d){return J.m(a).eV(a,b,c,d)}
J.f1=function(a,b){return J.as(a).n(a,b)}
J.f2=function(a,b,c){return J.m(a).fc(a,b,c)}
J.f3=function(a,b){return J.as(a).fi(a,b)}
J.f4=function(a,b,c,d,e){return J.m(a).fj(a,b,c,d,e)}
J.bZ=function(a,b,c){return J.P(a).fq(a,b,c)}
J.f5=function(a){return J.m(a).fv(a)}
J.f6=function(a){return J.m(a).fz(a)}
J.f7=function(a,b){return J.m(a).fA(a,b)}
J.f8=function(a,b){return J.m(a).P(a,b)}
J.f9=function(a,b){return J.as(a).a8(a,b)}
J.fa=function(a){return J.w(a).bd(a)}
J.bp=function(a,b){return J.as(a).F(a,b)}
J.aa=function(a){return J.m(a).gaH(a)}
J.G=function(a){return J.j(a).gG(a)}
J.d0=function(a){return J.m(a).gk(a)}
J.T=function(a){return J.m(a).gB(a)}
J.aN=function(a){return J.as(a).gM(a)}
J.b8=function(a){return J.P(a).gj(a)}
J.d1=function(a){return J.m(a).gds(a)}
J.d2=function(a){return J.m(a).gdt(a)}
J.fb=function(a){return J.m(a).ghf(a)}
J.c_=function(a){return J.j(a).gK(a)}
J.fc=function(a){return J.m(a).gcn(a)}
J.fd=function(a){return J.m(a).gH(a)}
J.d3=function(a){return J.m(a).gl(a)}
J.fe=function(a){return J.m(a).dG(a)}
J.c0=function(a,b,c){return J.m(a).dH(a,b,c)}
J.ff=function(a,b){return J.as(a).al(a,b)}
J.aO=function(a){return J.as(a).a6(a)}
J.fg=function(a){return J.m(a).aP(a)}
J.aP=function(a,b){return J.m(a).bl(a,b)}
J.d4=function(a,b){return J.m(a).sH(a,b)}
J.d5=function(a){return J.w(a).bg(a)}
J.av=function(a){return J.j(a).i(a)}
J.fh=function(a,b){return J.m(a).hk(a,b)}
I.cR=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.p=W.c7.prototype
C.q=W.fx.prototype
C.G=W.aU.prototype
C.H=J.h.prototype
C.c=J.bc.prototype
C.a=J.ce.prototype
C.I=J.dD.prototype
C.e=J.aV.prototype
C.J=J.bw.prototype
C.R=J.be.prototype
C.T=H.hL.prototype
C.U=H.hN.prototype
C.V=J.hS.prototype
C.ae=J.bh.prototype
C.h=W.iE.prototype
C.x=new H.dn()
C.y=new P.hR()
C.z=new P.jb()
C.A=new P.jy()
C.d=new P.jK()
C.r=new P.ab(0)
C.t=H.c(new W.az("click"),[W.aD])
C.B=H.c(new W.az("error"),[W.dS])
C.C=H.c(new W.az("load"),[W.dS])
C.u=H.c(new W.az("mousemove"),[W.aD])
C.D=H.c(new W.az("mousewheel"),[W.bk])
C.E=H.c(new W.az("resize"),[W.a_])
C.F=H.c(new W.az("webkitfullscreenchange"),[W.a_])
C.K=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.v=function(hooks) { return hooks; }
C.L=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.M=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.N=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.O=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.w=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.P=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.Q=function(_, letter) { return letter.toUpperCase(); }
C.S=I.cR([])
C.W=H.r("kZ")
C.X=H.r("l_")
C.m=H.r("eh")
C.Y=H.r("lt")
C.Z=H.r("lu")
C.n=H.r("cc")
C.a_=H.r("lG")
C.a0=H.r("lH")
C.a1=H.r("lI")
C.a2=H.r("dE")
C.a3=H.r("hO")
C.l=H.r("aY")
C.b=H.r("v")
C.a4=H.r("dW")
C.i=H.r("al")
C.a5=H.r("K")
C.f=H.r("ct")
C.o=H.r("b_")
C.a6=H.r("mp")
C.a7=H.r("mq")
C.a8=H.r("mr")
C.a9=H.r("ms")
C.j=H.r("ao")
C.k=H.r("ap")
C.aa=H.r("cL")
C.ab=H.r("X")
C.ac=H.r("p")
C.ad=H.r("y")
C.af=H.c(new W.j8(W.kh()),[W.bk])
$.dP="$cachedFunction"
$.dQ="$cachedInvocation"
$.a4=0
$.aR=null
$.d7=null
$.cO=null
$.eF=null
$.eQ=null
$.bN=null
$.bS=null
$.cP=null
$.aJ=null
$.b3=null
$.b4=null
$.cJ=!1
$.n=C.d
$.dt=0
$.dc=1
$.dd=0
$.dr=0
$.ew=0
$.cH=null
$.dk=null
$.dj=null
$.di=null
$.dh=null
$.a2=3
$.cy=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["dg","$get$dg",function(){return init.getIsolateTag("_$dart_dartClosure")},"dz","$get$dz",function(){return H.hu()},"dA","$get$dA",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.dt
$.dt=z+1
z="expando$key$"+z}return H.c(new P.fO(null,z),[P.p])},"e5","$get$e5",function(){return H.a7(H.bJ({
toString:function(){return"$receiver$"}}))},"e6","$get$e6",function(){return H.a7(H.bJ({$method$:null,
toString:function(){return"$receiver$"}}))},"e7","$get$e7",function(){return H.a7(H.bJ(null))},"e8","$get$e8",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ec","$get$ec",function(){return H.a7(H.bJ(void 0))},"ed","$get$ed",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ea","$get$ea",function(){return H.a7(H.eb(null))},"e9","$get$e9",function(){return H.a7(function(){try{null.$method$}catch(z){return z.message}}())},"ef","$get$ef",function(){return H.a7(H.eb(void 0))},"ee","$get$ee",function(){return H.a7(function(){try{(void 0).$method$}catch(z){return z.message}}())},"c3","$get$c3",function(){return H.hM([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8])},"cB","$get$cB",function(){return P.iX()},"b6","$get$b6",function(){return[]},"df","$get$df",function(){return{}},"c8","$get$c8",function(){return H.cg(P.b0,S.db)},"bD","$get$bD",function(){return H.cg(P.b0,[S.U,S.dO])},"cV","$get$cV",function(){return C.A},"d_","$get$d_",function(){return new B.iu(H.c([],[B.bq]),!1)},"dv","$get$dv",function(){return[F.kB(),F.kC(),F.kD()]},"dw","$get$dw",function(){return[F.kE(),F.kF(),F.kG()]},"dq","$get$dq",function(){var z=new B.fG(0,0,!1,!1,null,null)
z.b="Elastic.OUT"
z.a=B.kP()
return z},"dT","$get$dT",function(){var z=new B.hX(null,null)
z.b="Quad.INOUT"
z.a=B.kQ()
return z},"e4","$get$e4",function(){var z=H.c(new B.hW(null,null),[B.bg])
z.a=new B.k9()
z.b=new B.ka()
return z},"cw","$get$cw",function(){var z,y,x
z=$.$get$e4()
y=B.bg
x=H.c(new B.hV(null,z,null),[y])
x.eb(z,y)
x.c=new B.k8()
return x},"cx","$get$cx",function(){return H.cg(P.b0,B.it)},"e2","$get$e2",function(){return $.$get$dT()},"e3","$get$e3",function(){var z=new B.fn(null)
z.e7()
return z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,args:[,,]},{func:1,ret:P.X,args:[P.X]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:F.bb},{func:1,args:[B.bg]},{func:1,ret:P.K,args:[P.p]},{func:1,ret:P.y,args:[P.y]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,],opt:[P.am]},{func:1,args:[P.K]},{func:1,args:[,P.am]},{func:1,v:true,args:[,P.am]},{func:1,args:[,P.K]},{func:1,v:true,args:[W.aD]},{func:1,args:[W.aU]},{func:1,v:true,args:[P.X]},{func:1,v:true,args:[W.a_]},{func:1,args:[P.K,,]},{func:1,ret:P.y,args:[P.y,[P.k,P.y],P.p]},{func:1,args:[{func:1,v:true}]},{func:1,args:[B.bq]},{func:1,v:true,args:[,,]},{func:1,ret:P.K,args:[W.I]},{func:1,ret:F.v},{func:1,ret:F.ao},{func:1,ret:F.al},{func:1,ret:F.b_},{func:1,ret:F.aY},{func:1,ret:F.ap},{func:1,args:[P.b]},{func:1,v:true,args:[P.b],opt:[P.am]},{func:1,v:true,args:[W.bk]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.kO(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.cR=a.cR
Isolate.bO=a.bO
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eT(A.eO(),b)},[])
else (function(b){H.eT(A.eO(),b)})([])})})()