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
b5.$isc=b4
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
var d=supportsDirectProtoAccess&&b1!="c"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="q"){processStatics(init.statics[b1]=b2.q,b3)
delete b2.q}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cT"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cT"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cT(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.am=function(){}
var dart=[["","",,H,{"^":"",me:{"^":"c;a"}}],["","",,J,{"^":"",
j:function(a){return void 0},
c4:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
c0:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cW==null){H.kL()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.el("Return interceptor for "+H.e(y(a,z))))}w=H.kT(a)
if(w==null){if(typeof a=="function")return C.V
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.Z
else return C.ah}return w},
h:{"^":"c;",
w:function(a,b){return a===b},
gG:function(a){return H.ah(a)},
i:["eb",function(a){return H.bQ(a)}],
gL:function(a){return new H.ad(H.az(a),null)},
"%":"CanvasGradient|CanvasPattern|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|WebGLProgram|WebGLUniformLocation"},
hO:{"^":"h;",
i:function(a){return String(a)},
gG:function(a){return a?519018:218159},
gL:function(a){return C.ad},
$isbt:1},
dG:{"^":"h;",
w:function(a,b){return null==b},
i:function(a){return"null"},
gG:function(a){return 0},
gL:function(a){return C.a7}},
co:{"^":"h;",
gG:function(a){return 0},
gL:function(a){return C.a6},
i:["ec",function(a){return String(a)}],
$isdH:1},
ic:{"^":"co;"},
bp:{"^":"co;"},
bl:{"^":"co;",
i:function(a){var z=a[$.$get$di()]
return z==null?this.ec(a):J.aC(z)},
$signature:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
bk:{"^":"h;",
c_:function(a,b){if(!!a.immutable$list)throw H.f(new P.K(b))},
be:function(a,b){if(!!a.fixed$length)throw H.f(new P.K(b))},
t:function(a,b){this.be(a,"add")
a.push(b)},
dY:function(a,b,c){var z,y,x
this.c_(a,"setAll")
z=a.length
if(b>z)H.C(P.ar(b,0,z,"index",null))
for(z=c.length,y=0;y<c.length;c.length===z||(0,H.bg)(c),++y,b=x){x=b+1
this.k(a,b,c[y])}},
a4:function(a){this.be(a,"removeLast")
if(a.length===0)throw H.f(H.I(a,-1))
return a.pop()},
f7:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0)z.push(w)
if(a.length!==y)throw H.f(new P.O(a))}v=z.length
if(v===y)return
this.sj(a,v)
for(x=0;x<z.length;++x)this.k(a,x,z[x])},
D:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(new P.O(a))}},
ap:function(a,b){return H.b(new H.bN(a,b),[null,null])},
hc:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.e(a[x])
if(x>=z)return H.a(y,x)
y[x]=w}return y.join(b)},
fW:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.f(new P.O(a))}return c.$0()},
a2:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
cF:function(a,b,c){if(b>a.length)throw H.f(P.ar(b,0,a.length,"start",null))
if(c==null)c=a.length
else{if(typeof c!=="number"||Math.floor(c)!==c)throw H.f(H.L(c))
if(c<b||c>a.length)throw H.f(P.ar(c,b,a.length,"end",null))}if(b===c)return H.b([],[H.q(a,0)])
return H.b(a.slice(b,c),[H.q(a,0)])},
gfV:function(a){if(a.length>0)return a[0]
throw H.f(H.bI())},
br:function(a,b,c,d,e){var z,y,x
this.c_(a,"set range")
P.cy(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.f(H.hN())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
e_:function(a,b,c,d){return this.br(a,b,c,d,0)},
e3:function(a,b){var z,y,x,w
this.c_(a,"shuffle")
if(b==null)b=C.v
z=a.length
for(;z>1;){y=b.dz(z);--z
x=a.length
if(z>=x)return H.a(a,z)
w=a[z]
if(y>>>0!==y||y>=x)return H.a(a,y)
this.k(a,z,a[y])
this.k(a,y,w)}},
az:function(a,b){var z
for(z=0;z<a.length;++z)if(J.D(a[z],b))return!0
return!1},
i:function(a){return P.bH(a,"[","]")},
gO:function(a){return H.b(new J.ce(a,a.length,0,null),[H.q(a,0)])},
gG:function(a){return H.ah(a)},
gj:function(a){return a.length},
sj:function(a,b){this.be(a,"set length")
if(b<0)throw H.f(P.ar(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.I(a,b))
if(b>=a.length||b<0)throw H.f(H.I(a,b))
return a[b]},
k:function(a,b,c){if(!!a.immutable$list)H.C(new P.K("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.I(a,b))
if(b>=a.length||b<0)throw H.f(H.I(a,b))
a[b]=c},
$isaf:1,
$asaf:I.am,
$isl:1,
$asl:null,
$isx:1},
md:{"^":"bk;"},
ce:{"^":"c;a,b,c,d",
gF:function(){return this.d},
C:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(H.bg(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
b3:{"^":"h;",
gdu:function(a){return a===0?1/a<0:a<0},
ci:function(a,b){return a%b},
bk:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.K(""+a))},
bh:function(a){return this.bk(Math.floor(a))},
aV:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(new P.K(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gG:function(a){return a&0x1FFFFFFF},
bn:function(a){return-a},
B:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return a+b},
p:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return a-b},
af:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return a/b},
E:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return a*b},
M:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
W:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.bk(a/b)},
N:function(a,b){return(a|0)===a?a/b|0:this.bk(a/b)},
av:function(a,b){return b>31?0:a<<b>>>0},
d3:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ae:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return(a&b)>>>0},
bu:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return(a^b)>>>0},
V:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return a<b},
S:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return a>b},
cC:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return a<=b},
T:function(a,b){if(typeof b!=="number")throw H.f(H.L(b))
return a>=b},
gL:function(a){return C.ag},
$isB:1},
cn:{"^":"b3;",
gL:function(a){return C.af},
dQ:function(a){return~a>>>0},
$isX:1,
$isB:1,
$iso:1},
hP:{"^":"b3;",
gL:function(a){return C.ae},
$isX:1,
$isB:1},
bK:{"^":"h;",
fu:function(a,b){if(b>=a.length)throw H.f(H.I(a,b))
return a.charCodeAt(b)},
B:function(a,b){if(typeof b!=="string")throw H.f(P.d8(b,null,null))
return a+b},
cG:function(a,b,c){H.eN(b)
if(c==null)c=a.length
H.eN(c)
if(b<0)throw H.f(P.bR(b,null,null))
if(typeof c!=="number")return H.i(c)
if(b>c)throw H.f(P.bR(b,null,null))
if(c>a.length)throw H.f(P.bR(c,null,null))
return a.substring(b,c)},
e5:function(a,b){return this.cG(a,b,null)},
E:function(a,b){var z,y
if(typeof b!=="number")return H.i(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.f(C.D)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fC:function(a,b,c){if(c>a.length)throw H.f(P.ar(c,0,a.length,null,null))
return H.lf(a,b,c)},
i:function(a){return a},
gG:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gL:function(a){return C.a8},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.I(a,b))
if(b>=a.length||b<0)throw H.f(H.I(a,b))
return a[b]},
$isaf:1,
$asaf:I.am,
$isS:1}}],["","",,H,{"^":"",
bs:function(a,b){var z=a.aN(b)
if(!init.globalState.d.cy)init.globalState.f.aW()
return z},
eX:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.j(y).$isl)throw H.f(P.a7("Arguments to main must be a List: "+H.e(y)))
init.globalState=new H.k_(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dC()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.jA(P.bM(null,H.br),0)
y.z=H.b(new H.T(0,null,null,null,null,null,0),[P.o,H.cM])
y.ch=H.b(new H.T(0,null,null,null,null,null,0),[P.o,null])
if(y.x===!0){x=new H.jZ()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.hH,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.k0)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.b(new H.T(0,null,null,null,null,null,0),[P.o,H.bS])
w=P.aH(null,null,null,P.o)
v=new H.bS(0,null,!1)
u=new H.cM(y,x,w,init.createNewIsolate(),v,new H.aE(H.c6()),new H.aE(H.c6()),!1,!1,[],P.aH(null,null,null,null),null,null,!1,!0,P.aH(null,null,null,null))
w.t(0,0)
u.cJ(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bu()
x=H.aR(y,[y]).ai(a)
if(x)u.aN(new H.ld(z,a))
else{y=H.aR(y,[y,y]).ai(a)
if(y)u.aN(new H.le(z,a))
else u.aN(a)}init.globalState.f.aW()},
hL:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.hM()
return},
hM:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.K("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.K('Cannot extract URI from "'+H.e(z)+'"'))},
hH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bW(!0,[]).am(b.data)
y=J.M(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bW(!0,[]).am(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bW(!0,[]).am(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.b(new H.T(0,null,null,null,null,null,0),[P.o,H.bS])
p=P.aH(null,null,null,P.o)
o=new H.bS(0,null,!1)
n=new H.cM(y,q,p,init.createNewIsolate(),o,new H.aE(H.c6()),new H.aE(H.c6()),!1,!1,[],P.aH(null,null,null,null),null,null,!1,!0,P.aH(null,null,null,null))
p.t(0,0)
n.cJ(0,o)
init.globalState.f.a.a_(new H.br(n,new H.hI(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aW()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aV(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aW()
break
case"close":init.globalState.ch.aq(0,$.$get$dD().h(0,a))
a.terminate()
init.globalState.f.aW()
break
case"log":H.hG(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ab(["command","print","msg",z])
q=new H.aO(!0,P.ba(null,P.o)).Z(q)
y.toString
self.postMessage(q)}else P.bw(y.h(z,"msg"))
break
case"error":throw H.f(y.h(z,"msg"))}},
hG:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ab(["command","log","msg",a])
x=new H.aO(!0,P.ba(null,P.o)).Z(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.W(w)
z=H.U(w)
throw H.f(P.b1(z))}},
hJ:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dV=$.dV+("_"+y)
$.dW=$.dW+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aV(f,["spawned",new H.bZ(y,x),w,z.r])
x=new H.hK(a,b,c,d,z)
if(e===!0){z.dc(w,w)
init.globalState.f.a.a_(new H.br(z,x,"start isolate"))}else x.$0()},
ki:function(a){return new H.bW(!0,[]).am(new H.aO(!1,P.ba(null,P.o)).Z(a))},
ld:{"^":"d:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
le:{"^":"d:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
k_:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",q:{
k0:function(a){var z=P.ab(["command","print","msg",a])
return new H.aO(!0,P.ba(null,P.o)).Z(z)}}},
cM:{"^":"c;A:a>,b,c,hb:d<,fE:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
dc:function(a,b){if(!this.f.w(0,a))return
if(this.Q.t(0,b)&&!this.y)this.y=!0
this.bT()},
hq:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.aq(0,a)
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
if(w===y.c)y.cT();++y.d}this.y=!1}this.bT()},
fh:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.j(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
hp:function(a){var z,y,x
if(this.ch==null)return
for(z=J.j(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.C(new P.K("removeRange"))
P.cy(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dZ:function(a,b){if(!this.r.w(0,a))return
this.db=b},
h_:function(a,b,c){var z=J.j(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){J.aV(a,c)
return}z=this.cx
if(z==null){z=P.bM(null,null)
this.cx=z}z.a_(new H.jU(a,c))},
fZ:function(a,b){var z
if(!this.r.w(0,a))return
z=J.j(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){this.c8()
return}z=this.cx
if(z==null){z=P.bM(null,null)
this.cx=z}z.a_(this.ghe())},
h0:function(a,b){var z,y
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bw(a)
if(b!=null)P.bw(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aC(a)
y[1]=b==null?null:J.aC(b)
for(z=H.b(new P.cN(z,z.r,null,null),[null]),z.c=z.a.e;z.C();)J.aV(z.d,y)},
aN:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.W(u)
w=t
v=H.U(u)
this.h0(w,v)
if(this.db===!0){this.c8()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ghb()
if(this.cx!=null)for(;t=this.cx,!t.gab(t);)this.cx.cj().$0()}return y},
dw:function(a){return this.b.h(0,a)},
cJ:function(a,b){var z=this.b
if(z.bf(a))throw H.f(P.b1("Registry: ports must be registered only once."))
z.k(0,a,b)},
bT:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.k(0,this.a,this)
else this.c8()},
c8:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.ay(0)
for(z=this.b,y=z.gdJ(z),y=y.gO(y);y.C();)y.gF().ex()
z.ay(0)
this.c.ay(0)
init.globalState.z.aq(0,this.a)
this.dx.ay(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.aV(w,z[v])}this.ch=null}},"$0","ghe",0,0,2]},
jU:{"^":"d:2;a,b",
$0:function(){J.aV(this.a,this.b)}},
jA:{"^":"c;a,b",
fM:function(){var z=this.a
if(z.b===z.c)return
return z.cj()},
dG:function(){var z,y,x
z=this.fM()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bf(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gab(y)}else y=!1
else y=!1
else y=!1
if(y)H.C(P.b1("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gab(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ab(["command","close"])
x=new H.aO(!0,H.b(new P.ex(0,null,null,null,null,null,0),[null,P.o])).Z(x)
y.toString
self.postMessage(x)}return!1}z.aB()
return!0},
d0:function(){if(self.window!=null)new H.jB(this).$0()
else for(;this.dG(););},
aW:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.d0()
else try{this.d0()}catch(x){w=H.W(x)
z=w
y=H.U(x)
w=init.globalState.Q
v=P.ab(["command","error","msg",H.e(z)+"\n"+H.e(y)])
v=new H.aO(!0,P.ba(null,P.o)).Z(v)
w.toString
self.postMessage(v)}}},
jB:{"^":"d:2;a",
$0:function(){if(!this.a.dG())return
P.cB(C.y,this)}},
br:{"^":"c;a,b,c",
aB:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aN(this.b)}},
jZ:{"^":"c;"},
hI:{"^":"d:1;a,b,c,d,e,f",
$0:function(){H.hJ(this.a,this.b,this.c,this.d,this.e,this.f)}},
hK:{"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bu()
w=H.aR(x,[x,x]).ai(y)
if(w)y.$2(this.b,this.c)
else{x=H.aR(x,[x]).ai(y)
if(x)y.$1(this.b)
else y.$0()}}z.bT()}},
eq:{"^":"c;"},
bZ:{"^":"eq;b,a",
bp:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcW())return
x=H.ki(b)
if(z.gfE()===y){y=J.M(x)
switch(y.h(x,0)){case"pause":z.dc(y.h(x,1),y.h(x,2))
break
case"resume":z.hq(y.h(x,1))
break
case"add-ondone":z.fh(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.hp(y.h(x,1))
break
case"set-errors-fatal":z.dZ(y.h(x,1),y.h(x,2))
break
case"ping":z.h_(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fZ(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.t(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aq(0,y)
break}return}init.globalState.f.a.a_(new H.br(z,new H.k2(this,x),"receive"))},
w:function(a,b){if(b==null)return!1
return b instanceof H.bZ&&J.D(this.b,b.b)},
gG:function(a){return this.b.gbI()}},
k2:{"^":"d:1;a,b",
$0:function(){var z=this.a.b
if(!z.gcW())z.eo(this.b)}},
cQ:{"^":"eq;b,c,a",
bp:function(a,b){var z,y,x
z=P.ab(["command","message","port",this,"msg",b])
y=new H.aO(!0,P.ba(null,P.o)).Z(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
w:function(a,b){if(b==null)return!1
return b instanceof H.cQ&&J.D(this.b,b.b)&&J.D(this.a,b.a)&&J.D(this.c,b.c)},
gG:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.e2()
y=this.a
if(typeof y!=="number")return y.e2()
x=this.c
if(typeof x!=="number")return H.i(x)
return(z<<16^y<<8^x)>>>0}},
bS:{"^":"c;bI:a<,b,cW:c<",
ex:function(){this.c=!0
this.b=null},
eo:function(a){if(this.c)return
this.eP(a)},
eP:function(a){return this.b.$1(a)},
$isio:1},
iM:{"^":"c;a,b,c",
em:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.a_(new H.br(y,new H.iO(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aS(new H.iP(this,b),0),a)}else throw H.f(new P.K("Timer greater than 0."))},
q:{
iN:function(a,b){var z=new H.iM(!0,!1,null)
z.em(a,b)
return z}}},
iO:{"^":"d:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
iP:{"^":"d:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aE:{"^":"c;bI:a<",
gG:function(a){var z=this.a
if(typeof z!=="number")return z.hz()
z=C.d.d3(z,0)^C.d.N(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aE){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aO:{"^":"c;a,b",
Z:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.k(0,a,z.gj(z))
z=J.j(a)
if(!!z.$isdM)return["buffer",a]
if(!!z.$isbO)return["typed",a]
if(!!z.$isaf)return this.dU(a)
if(!!z.$ishF){x=this.gdR()
w=a.gdv()
w=H.bn(w,x,H.J(w,"Q",0),null)
w=P.cr(w,!0,H.J(w,"Q",0))
z=z.gdJ(a)
z=H.bn(z,x,H.J(z,"Q",0),null)
return["map",w,P.cr(z,!0,H.J(z,"Q",0))]}if(!!z.$isdH)return this.dV(a)
if(!!z.$ish)this.dH(a)
if(!!z.$isio)this.aY(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbZ)return this.dW(a)
if(!!z.$iscQ)return this.dX(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.aY(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaE)return["capability",a.a]
if(!(a instanceof P.c))this.dH(a)
return["dart",init.classIdExtractor(a),this.dT(init.classFieldsExtractor(a))]},"$1","gdR",2,0,0],
aY:function(a,b){throw H.f(new P.K(H.e(b==null?"Can't transmit:":b)+" "+H.e(a)))},
dH:function(a){return this.aY(a,null)},
dU:function(a){var z=this.dS(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aY(a,"Can't serialize indexable: ")},
dS:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.Z(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
dT:function(a){var z
for(z=0;z<a.length;++z)C.c.k(a,z,this.Z(a[z]))
return a},
dV:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aY(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.Z(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
dX:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dW:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbI()]
return["raw sendport",a]}},
bW:{"^":"c;a,b",
am:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.a7("Bad serialized message: "+H.e(a)))
switch(C.c.gfV(a)){case"ref":if(1>=a.length)return H.a(a,1)
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
y=H.b(this.aM(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.b(this.aM(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.aM(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.b(this.aM(x),[null])
y.fixed$length=Array
return y
case"map":return this.fP(a)
case"sendport":return this.fQ(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.fO(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.aE(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aM(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.f("couldn't deserialize: "+H.e(a))}},"$1","gfN",2,0,0],
aM:function(a){var z,y,x
z=J.M(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.i(x)
if(!(y<x))break
z.k(a,y,this.am(z.h(a,y)));++y}return a},
fP:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.hV()
this.b.push(w)
y=J.fm(y,this.gfN()).bl(0)
for(z=J.M(y),v=J.M(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.a(y,u)
w.k(0,y[u],this.am(v.h(x,u)))}return w},
fQ:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.D(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dw(w)
if(u==null)return
t=new H.bZ(u,x)}else t=new H.cQ(y,w,x)
this.b.push(t)
return t},
fO:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.M(y)
v=J.M(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.i(t)
if(!(u<t))break
w[z.h(y,u)]=this.am(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
eS:function(a){return init.getTypeFromName(a)},
kF:function(a){return init.types[a]},
eR:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.j(a).$isb4},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aC(a)
if(typeof z!=="string")throw H.f(H.L(a))
return z},
ah:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dU:function(a,b){throw H.f(new P.h0(a,null,null))},
ij:function(a,b,c){var z,y
H.kv(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.dU(a,c)
if(3>=z.length)return H.a(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.dU(a,c)},
cw:function(a){var z,y,x,w,v,u,t,s
z=J.j(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.M||!!J.j(a).$isbp){v=C.B(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.z.fu(w,0)===36)w=C.z.e5(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cX(H.c1(a),0,null),init.mangledGlobalNames)},
bQ:function(a){return"Instance of '"+H.cw(a)+"'"},
cv:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.L(a))
return a[b]},
dX:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.L(a))
a[b]=c},
i:function(a){throw H.f(H.L(a))},
a:function(a,b){if(a==null)J.bh(a)
throw H.f(H.I(a,b))},
I:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aD(!0,b,"index",null)
z=J.bh(a)
if(!(b<0)){if(typeof z!=="number")return H.i(z)
y=b>=z}else y=!0
if(y)return P.bG(b,a,"index",null,z)
return P.bR(b,"index",null)},
L:function(a){return new P.aD(!0,a,null,null)},
a_:function(a){if(typeof a!=="number")throw H.f(H.L(a))
return a},
eN:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(H.L(a))
return a},
kv:function(a){if(typeof a!=="string")throw H.f(H.L(a))
return a},
f:function(a){var z
if(a==null)a=new P.cu()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eY})
z.name=""}else z.toString=H.eY
return z},
eY:function(){return J.aC(this.dartException)},
C:function(a){throw H.f(a)},
bg:function(a){throw H.f(new P.O(a))},
W:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.lj(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.d3(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cq(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.e(y)+" (Error "+w+")"
return z.$1(new H.dR(v,null))}}if(a instanceof TypeError){u=$.$get$e9()
t=$.$get$ea()
s=$.$get$eb()
r=$.$get$ec()
q=$.$get$eg()
p=$.$get$eh()
o=$.$get$ee()
$.$get$ed()
n=$.$get$ej()
m=$.$get$ei()
l=u.a3(y)
if(l!=null)return z.$1(H.cq(y,l))
else{l=t.a3(y)
if(l!=null){l.method="call"
return z.$1(H.cq(y,l))}else{l=s.a3(y)
if(l==null){l=r.a3(y)
if(l==null){l=q.a3(y)
if(l==null){l=p.a3(y)
if(l==null){l=o.a3(y)
if(l==null){l=r.a3(y)
if(l==null){l=n.a3(y)
if(l==null){l=m.a3(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dR(y,l==null?null:l.method))}}return z.$1(new H.iY(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.e1()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aD(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.e1()
return a},
U:function(a){var z
if(a==null)return new H.ey(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ey(a,null)},
kY:function(a){if(a==null||typeof a!='object')return J.V(a)
else return H.ah(a)},
kD:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.k(0,a[y],a[x])}return b},
kN:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bs(b,new H.kO(a))
case 1:return H.bs(b,new H.kP(a,d))
case 2:return H.bs(b,new H.kQ(a,d,e))
case 3:return H.bs(b,new H.kR(a,d,e,f))
case 4:return H.bs(b,new H.kS(a,d,e,f,g))}throw H.f(P.b1("Unsupported number of arguments for wrapped closure"))},
aS:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.kN)
a.$identity=z
return z},
fC:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.j(c).$isl){z.$reflectionInfo=c
x=H.ir(z).r}else x=c
w=d?Object.create(new H.iA().constructor.prototype):Object.create(new H.cg(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a9
$.a9=J.u(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.dc(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.kF,x)
else if(u&&typeof x=="function"){q=t?H.da:H.ch
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.dc(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
fz:function(a,b,c,d){var z=H.ch
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
dc:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.fB(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fz(y,!w,z,b)
if(y===0){w=$.a9
$.a9=J.u(w,1)
u="self"+H.e(w)
w="return function(){var "+u+" = this."
v=$.aX
if(v==null){v=H.bC("self")
$.aX=v}return new Function(w+H.e(v)+";return "+u+"."+H.e(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a9
$.a9=J.u(w,1)
t+=H.e(w)
w="return function("+t+"){return this."
v=$.aX
if(v==null){v=H.bC("self")
$.aX=v}return new Function(w+H.e(v)+"."+H.e(z)+"("+t+");}")()},
fA:function(a,b,c,d){var z,y
z=H.ch
y=H.da
switch(b?-1:a){case 0:throw H.f(new H.is("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fB:function(a,b){var z,y,x,w,v,u,t,s
z=H.ft()
y=$.d9
if(y==null){y=H.bC("receiver")
$.d9=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fA(w,!u,x,b)
if(w===1){y="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
u=$.a9
$.a9=J.u(u,1)
return new Function(y+H.e(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
u=$.a9
$.a9=J.u(u,1)
return new Function(y+H.e(u)+"}")()},
cT:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.j(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.fC(a,b,z,!!d,e,f)},
l_:function(a,b){var z=J.M(b)
throw H.f(H.fx(H.cw(a),z.cG(b,3,z.gj(b))))},
a5:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.j(a)[b]
else z=!0
if(z)return a
H.l_(a,b)},
lg:function(a){throw H.f(new P.fK("Cyclic initialization for static "+H.e(a)))},
aR:function(a,b,c){return new H.it(a,b,c,null)},
eM:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.iv(z)
return new H.iu(z,b,null)},
bu:function(){return C.C},
c6:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
r:function(a){return new H.ad(a,null)},
b:function(a,b){a.$builtinTypeInfo=b
return a},
c1:function(a){if(a==null)return
return a.$builtinTypeInfo},
eP:function(a,b){return H.d2(a["$as"+H.e(b)],H.c1(a))},
J:function(a,b,c){var z=H.eP(a,b)
return z==null?null:z[c]},
q:function(a,b){var z=H.c1(a)
return z==null?null:z[b]},
d0:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cX(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.a.i(a)
else return},
cX:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cz("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.e(H.d0(u,c))}return w?"":"<"+H.e(z)+">"},
az:function(a){var z=J.j(a).constructor.builtin$cls
if(a==null)return z
return z+H.cX(a.$builtinTypeInfo,0,null)},
d2:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
kw:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.c1(a)
y=J.j(a)
if(y[b]==null)return!1
return H.eK(H.d2(y[d],z),c)},
eK:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a0(a[y],b[y]))return!1
return!0},
cU:function(a,b,c){return a.apply(b,H.eP(b,c))},
a0:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eQ(a,b)
if('func' in a)return b.builtin$cls==="h1"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.d0(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.e(H.d0(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.eK(H.d2(v,z),x)},
eJ:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a0(z,v)||H.a0(v,z)))return!1}return!0},
kr:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a0(v,u)||H.a0(u,v)))return!1}return!0},
eQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a0(z,y)||H.a0(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eJ(x,w,!1))return!1
if(!H.eJ(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a0(o,n)||H.a0(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a0(o,n)||H.a0(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a0(o,n)||H.a0(n,o)))return!1}}return H.kr(a.named,b.named)},
nn:function(a){var z=$.cV
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
nl:function(a){return H.ah(a)},
nk:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
kT:function(a){var z,y,x,w,v,u
z=$.cV.$1(a)
y=$.c_[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.c3[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eI.$2(a,z)
if(z!=null){y=$.c_[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.c3[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cZ(x)
$.c_[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.c3[z]=x
return x}if(v==="-"){u=H.cZ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eU(a,x)
if(v==="*")throw H.f(new P.el(z))
if(init.leafTags[z]===true){u=H.cZ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eU(a,x)},
eU:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.c4(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cZ:function(a){return J.c4(a,!1,null,!!a.$isb4)},
kX:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.c4(z,!1,null,!!z.$isb4)
else return J.c4(z,c,null,null)},
kL:function(){if(!0===$.cW)return
$.cW=!0
H.kM()},
kM:function(){var z,y,x,w,v,u,t,s
$.c_=Object.create(null)
$.c3=Object.create(null)
H.kH()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eV.$1(v)
if(u!=null){t=H.kX(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
kH:function(){var z,y,x,w,v,u,t
z=C.O()
z=H.aQ(C.P,H.aQ(C.Q,H.aQ(C.A,H.aQ(C.A,H.aQ(C.S,H.aQ(C.R,H.aQ(C.T(C.B),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cV=new H.kI(v)
$.eI=new H.kJ(u)
$.eV=new H.kK(t)},
aQ:function(a,b){return a(b)||b},
lf:function(a,b,c){return a.indexOf(b,c)>=0},
iq:{"^":"c;a,b,c,d,e,f,r,x",q:{
ir:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.iq(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
iX:{"^":"c;a,b,c,d,e,f",
a3:function(a){var z,y,x
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
q:{
ac:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iX(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bV:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
ef:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dR:{"^":"P;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.e(this.a)
return"NullError: method not found: '"+H.e(z)+"' on null"}},
hR:{"^":"P;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.e(z)+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.e(z)+"' on '"+H.e(y)+"' ("+H.e(this.a)+")"},
q:{
cq:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hR(a,y,z?null:b.receiver)}}},
iY:{"^":"P;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
lj:{"^":"d:0;a",
$1:function(a){if(!!J.j(a).$isP)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ey:{"^":"c;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
kO:{"^":"d:1;a",
$0:function(){return this.a.$0()}},
kP:{"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
kQ:{"^":"d:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
kR:{"^":"d:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
kS:{"^":"d:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{"^":"c;",
i:function(a){return"Closure '"+H.cw(this)+"'"},
gdK:function(){return this},
gdK:function(){return this}},
e3:{"^":"d;"},
iA:{"^":"e3;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cg:{"^":"e3;a,b,c,d",
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cg))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gG:function(a){var z,y
z=this.c
if(z==null)y=H.ah(this.a)
else y=typeof z!=="object"?J.V(z):H.ah(z)
return J.f1(y,H.ah(this.b))},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+H.bQ(z)},
q:{
ch:function(a){return a.a},
da:function(a){return a.c},
ft:function(){var z=$.aX
if(z==null){z=H.bC("self")
$.aX=z}return z},
bC:function(a){var z,y,x,w,v
z=new H.cg("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fw:{"^":"P;a",
i:function(a){return this.a},
q:{
fx:function(a,b){return new H.fw("CastError: Casting value of type "+H.e(a)+" to incompatible type "+H.e(b))}}},
is:{"^":"P;a",
i:function(a){return"RuntimeError: "+H.e(this.a)}},
bU:{"^":"c;"},
it:{"^":"bU;a,b,c,d",
ai:function(a){var z=this.eE(a)
return z==null?!1:H.eQ(z,this.a8())},
eE:function(a){var z=J.j(a)
return"$signature" in z?z.$signature():null},
a8:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.j(y)
if(!!x.$isn6)z.v=true
else if(!x.$isdr)z.ret=y.a8()
y=this.b
if(y!=null&&y.length!==0)z.args=H.e_(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.e_(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.eO(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].a8()}z.named=w}return z},
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
t=H.eO(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.e(z[s].a8())+" "+s}x+="}"}}return x+(") -> "+H.e(this.a))},
q:{
e_:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].a8())
return z}}},
dr:{"^":"bU;",
i:function(a){return"dynamic"},
a8:function(){return}},
iv:{"^":"bU;a",
a8:function(){var z,y
z=this.a
y=H.eS(z)
if(y==null)throw H.f("no type for '"+z+"'")
return y},
i:function(a){return this.a}},
iu:{"^":"bU;a,b,c",
a8:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.eS(z)]
if(0>=y.length)return H.a(y,0)
if(y[0]==null)throw H.f("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.bg)(z),++w)y.push(z[w].a8())
this.c=y
return y},
i:function(a){var z=this.b
return this.a+"<"+(z&&C.c).hc(z,", ")+">"}},
ad:{"^":"c;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gG:function(a){return J.V(this.a)},
w:function(a,b){if(b==null)return!1
return b instanceof H.ad&&J.D(this.a,b.a)}},
T:{"^":"c;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gab:function(a){return this.a===0},
gdv:function(){return H.b(new H.hT(this),[H.q(this,0)])},
gdJ:function(a){return H.bn(this.gdv(),new H.hQ(this),H.q(this,0),H.q(this,1))},
bf:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cO(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cO(y,a)}else return this.h7(a)},
h7:function(a){var z=this.d
if(z==null)return!1
return this.aQ(this.b5(z,this.aP(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aI(z,b)
return y==null?null:y.gao()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.aI(x,b)
return y==null?null:y.gao()}else return this.h8(b)},
h8:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.b5(z,this.aP(a))
x=this.aQ(y,a)
if(x<0)return
return y[x].gao()},
k:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bK()
this.b=z}this.cI(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bK()
this.c=y}this.cI(y,b,c)}else{x=this.d
if(x==null){x=this.bK()
this.d=x}w=this.aP(b)
v=this.b5(x,w)
if(v==null)this.bR(x,w,[this.bL(b,c)])
else{u=this.aQ(v,b)
if(u>=0)v[u].sao(c)
else v.push(this.bL(b,c))}}},
dD:function(a,b){var z
if(this.bf(a))return this.h(0,a)
z=b.$0()
this.k(0,a,z)
return z},
aq:function(a,b){if(typeof b==="string")return this.cZ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cZ(this.c,b)
else return this.h9(b)},
h9:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.b5(z,this.aP(a))
x=this.aQ(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.d6(w)
return w.gao()},
ay:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
D:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.f(new P.O(this))
z=z.c}},
cI:function(a,b,c){var z=this.aI(a,b)
if(z==null)this.bR(a,b,this.bL(b,c))
else z.sao(c)},
cZ:function(a,b){var z
if(a==null)return
z=this.aI(a,b)
if(z==null)return
this.d6(z)
this.cQ(a,b)
return z.gao()},
bL:function(a,b){var z,y
z=H.b(new H.hS(a,b,null,null),[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
d6:function(a){var z,y
z=a.geZ()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aP:function(a){return J.V(a)&0x3ffffff},
aQ:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.D(a[y].gdt(),b))return y
return-1},
i:function(a){return P.i_(this)},
aI:function(a,b){return a[b]},
b5:function(a,b){return a[b]},
bR:function(a,b,c){a[b]=c},
cQ:function(a,b){delete a[b]},
cO:function(a,b){return this.aI(a,b)!=null},
bK:function(){var z=Object.create(null)
this.bR(z,"<non-identifier-key>",z)
this.cQ(z,"<non-identifier-key>")
return z},
$ishF:1,
q:{
cp:function(a,b){return H.b(new H.T(0,null,null,null,null,null,0),[a,b])}}},
hQ:{"^":"d:0;a",
$1:function(a){return this.a.h(0,a)}},
hS:{"^":"c;dt:a<,ao:b@,c,eZ:d<"},
hT:{"^":"Q;a",
gj:function(a){return this.a.a},
gO:function(a){var z,y
z=this.a
y=new H.hU(z,z.r,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.c=z.e
return y},
D:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.f(new P.O(z))
y=y.c}},
$isx:1},
hU:{"^":"c;a,b,c,d",
gF:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.O(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
kI:{"^":"d:0;a",
$1:function(a){return this.a(a)}},
kJ:{"^":"d:11;a",
$2:function(a,b){return this.a(a,b)}},
kK:{"^":"d:13;a",
$1:function(a){return this.a(a)}}}],["","",,D,{"^":"",fs:{"^":"c;a,b,c,d,e,f,r,x",
gj:function(a){return this.c},
gfo:function(){var z=this.x
return H.b(new P.jo(z),[H.q(z,0)])},
fF:function(a,b,c){var z,y,x
if(typeof c!=="number")return H.i(c)
z=b.length
y=0
for(;y<c;++y){if(y>=a.length)return H.a(a,y)
x=a[y]
if(y>=z)return H.a(b,y)
b[y]=x}},
bq:function(a){var z,y,x,w,v,u
z=J.y(a)
if(!z.T(a,0))H.C(P.a7("should be > 0"))
if(z.w(a,this.c))return
y=J.aA(z.B(a,31),32)
x=J.y(y)
if(x.S(y,this.b.length)||J.bx(x.B(y,this.a),this.b.length)){w=new Uint32Array(H.m(y))
v=this.b
this.fF(v,w,x.S(y,v.length)?this.b.length:y)
this.b=w}if(z.S(a,this.c)){z=this.c
if(typeof z!=="number")return z.M()
if(C.d.M(z,32)>0){x=this.b
z=C.d.N(z+31,32)-1
if(z>>>0!==z||z>=x.length)return H.a(x,z)
v=x[z]
u=this.c
if(typeof u!=="number")return u.M()
x[z]=(v&C.a.av(1,C.d.M(u,32)&31)-1)>>>0
z=u}x=this.b;(x&&C.Y).fT(x,J.aA(J.u(z,31),32),y,0)}this.c=a
this.scv(this.d+1)},
scv:function(a){this.d=a},
dg:function(a){var z=D.A(0,!1)
z.b=new Uint32Array(H.eB(this.b))
z.c=this.c
z.d=this.d
return z},
i:function(a){return H.e(this.c)+" bits, "+H.e(this.di(!0))+" set"},
fk:function(a){var z,y,x
if(!J.D(this.c,a.geU()))H.C(P.a7("Array lengths differ."))
z=J.aA(J.u(this.c,31),32)
if(typeof z!=="number")return H.i(z)
y=0
for(;y<z;++y){x=this.b
if(y>=x.length)return H.a(x,y)
x[y]=C.a.ae(x[y],a.geD().h(0,y))}this.scv(this.d+1)
return this},
hy:function(a){var z,y,x
if(!J.D(this.c,a.geU()))H.C(P.a7("Array lengths differ."))
z=J.aA(J.u(this.c,31),32)
if(typeof z!=="number")return H.i(z)
y=0
for(;y<z;++y){x=this.b
if(y>=x.length)return H.a(x,y)
x[y]=C.a.bu(x[y],a.geD().h(0,y))}this.scv(this.d+1)
return this},
ae:function(a,b){return this.dg(0).fk(b)},
bu:function(a,b){return this.dg(0).hy(b)},
h:function(a,b){var z,y
z=this.b
y=J.aA(b,32)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
y=z[y]
if(typeof b!=="number")return b.ae()
return(y&C.a.av(1,b&31))>>>0!==0},
k:function(a,b,c){var z,y,x
z=J.y(b)
y=this.b
if(c===!0){z=z.W(b,32)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
x=y[z]
if(typeof b!=="number")return b.ae()
y[z]=(x|C.a.av(1,b&31))>>>0}else{z=z.W(b,32)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
x=y[z]
if(typeof b!=="number")return b.ae()
y[z]=(x&~C.a.av(1,b&31))>>>0}++this.d},
di:function(a){var z,y,x,w,v,u,t,s
if(J.D(this.c,0))return 0
if(this.r!==this.d){this.f=0
z=J.aA(J.u(this.c,31),32)
y=J.y(z)
x=0
while(!0){w=y.p(z,1)
if(typeof w!=="number")return H.i(w)
if(!(x<w))break
w=this.b
if(x>=w.length)return H.a(w,x)
v=w[x]
for(;v!==0;v=v>>>8){w=this.f
u=$.$get$cf()
t=v&255
if(t>=u.length)return H.a(u,t)
t=u[t]
if(typeof w!=="number")return w.B()
this.f=w+t}++x}y=this.b
if(x>=y.length)return H.a(y,x)
v=y[x]
y=this.c
if(typeof y!=="number")return y.ae()
s=y&31
if(s!==0)v=(v&~C.a.av(4294967295,s))>>>0
for(;v!==0;v=v>>>8){y=this.f
w=$.$get$cf()
u=v&255
if(u>=w.length)return H.a(w,u)
u=w[u]
if(typeof y!=="number")return y.B()
this.f=y+u}}return this.f},
eg:function(a,b){this.b=new Uint32Array(H.m((a+31)/32|0))
this.c=a
this.d=0},
bZ:function(a){return this.gfo().$1(a)},
q:{
A:function(a,b){var z=new D.fs(256,null,null,null,null,null,-1,H.b(new P.ji(null,null,0,null,null,null,null),[null]))
z.eg(a,!1)
return z}}}}],["","",,F,{"^":"",h5:{"^":"h7;dx,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
c6:function(a,b){var z
a=P.bv(800,a)
b=P.bv(600,b)
this.dE(this.a,a,b)
this.dE(this.dx,a,b)
H.a5(this.b,"$isbT").viewport(0,0,a,b)
z=H.a5(this.y.z.h(0,C.h),"$isbE")
z.b=a
z.c=b},
dE:function(a,b,c){var z,y
z=J.k(a)
z.sl(a,b)
z.sm(a,c)
z=a.style
y=H.e(b)+"px"
z.width=y
z=a.style
y=H.e(c)+"px"
z.height=y},
ei:function(){var z,y
$.a4=183
this.y.aK(new F.bE(null,null,H.b(new P.ep(H.b(new P.a1(0,$.n,null),[P.o])),[P.o]),null))
this.y.aK(new F.em(null,null,null,null))
z=this.y
y=H.b(new H.T(0,null,null,null,null,null,0),[P.S,S.an])
z.aK(new S.cA(y,H.b(new H.T(0,null,null,null,null,null,0),[S.an,P.S]),null))
this.dx=document.querySelector("#hud")
this.c6(window.innerWidth,window.innerHeight)
z=H.b(new W.b8(window,"resize",!1),[H.q(C.J,0)])
H.b(new W.al(0,z.a,z.b,W.a2(new F.hq(this)),!1),[H.q(z,0)]).a1()},
q:{
h6:function(){var z,y,x,w
z=document.querySelector("#game")
y=H.a5(document.querySelector("#game"),"$iscj")
y.toString
x=P.ab(["alpha",!0,"depth",!0,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
w=(y&&C.w).cz(y,"webgl",x)
if(w==null)w=C.w.cz(y,"experimental-webgl",x)
y=w
y=new F.h5(null,z,y,new L.hp("ld35",null),null,null,800,600,!0,null,null,null,null,null,!1,!1)
y.ej("ld35","#game",800,600,!0,null,!0,null,!0)
y.ei()
return y}}},hq:{"^":"d:0;a",
$1:function(a){return this.a.c6(window.innerWidth,window.innerHeight)}},hA:{"^":"hr;cx,cy,db,dx,dy,z,Q,ch,a,b,c,d,e,f,r,x,y",
aC:function(a){var z=J.w(this.cy.b,J.N(a))
if(this.ac(87)||this.ac(38))z.gn().a[1]=-80
else if(this.ac(83)||this.ac(40))z.gn().a[1]=80
else z.gn().a[1]=0
if(this.ac(65)||this.ac(37))z.gn().a[0]=-80
else if(this.ac(68)||this.ac(39))z.gn().a[0]=80
else z.gn().a[0]=0},
c5:function(a,b){var z,y
this.e9(a,b)
if(b){z=J.d5(a)
if(typeof z!=="number")return z.T()
if(z>=49){z=a.keyCode
y=this.cx.gca()
if(typeof z!=="number")return z.V()
y=z<49+y
z=y}else z=!1
if(z){z=this.cx
y=a.keyCode
if(typeof y!=="number")return y.p()
z.sdA(y-49)}else{z=a.keyCode
if(typeof z!=="number")return z.T()
if(z>=97&&z<97+this.cx.gca()){z=this.cx
y=a.keyCode
if(typeof y!=="number")return y.p()
z.sdA(y-97)}}}},
H:function(){var z,y
this.ea()
z=this.b
y=H.b(new S.z(null,null),[F.aZ])
y.K(C.p,z,F.aZ)
this.db=y
y=this.b
z=H.b(new S.z(null,null),[F.t])
z.K(C.b,y,F.t)
this.cy=z
this.cx=this.b.x.h(0,C.u)
this.dx=this.b.z.h(0,C.h)}},ie:{"^":"cH;ch,cx,cy,db,dx,dy,fr,fx,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=J.k(b)
y=J.w(this.ch.b,z.gA(b))
x=J.w(this.cx.b,z.gA(b))
w=J.w(this.cy.b,z.gA(b))
v=a*x.ga5().length
u=a*x.gaO().length
for(t=0;t<x.gaO().length;++t){z=this.dx
s=u+t
r=x.gaO()
if(t>=r.length)return H.a(r,t)
r=r[t]
if(s>=z.length)return H.a(z,s)
z[s]=r}for(t=0;t<x.ga5().length;t+=3){z=this.db
s=v+t
r=x.ga5()
if(t>=r.length)return H.a(r,t)
r=J.u(J.E(r[t],w.gaD()),y.gn().a[0])
if(s>=z.length)return H.a(z,s)
z[s]=r
r=this.db
z=s+1
q=x.ga5()
p=t+1
if(p>=q.length)return H.a(q,p)
p=J.u(J.E(q[p],w.gaD()),y.gn().a[1])
if(z>=r.length)return H.a(r,z)
r[z]=p
p=this.db
s+=2
z=x.ga5()
r=t+2
if(r>=z.length)return H.a(z,r)
r=J.u(z[r],y.gn().a[2])
if(s>=p.length)return H.a(p,s)
p[s]=r}},
ck:function(a){var z=this.z
z.uniformMatrix4fv(J.cd(z,this.gU(),"uViewProjection"),!1,this.fx.c0().gaF())
this.bY(this.dy,this.db,this.dx)
z.drawElements(4,this.dx.length,5123,0)},
ct:function(a){var z,y
z=J.bf(a)
y=this.fr
this.db=new Float32Array(H.m(J.E(z.E(a,61),y)))
this.dx=new Uint16Array(H.m(J.E(z.E(a,60),y)))},
gc4:function(){return"PlayerRenderingSystem"},
gcu:function(){return"PlayerRenderingSystem"},
H:function(){var z,y
this.bt()
z=this.b
y=H.b(new S.z(null,null),[F.as])
y.K(C.l,z,F.as)
this.cy=y
y=this.b
z=H.b(new S.z(null,null),[F.av])
z.K(C.n,y,F.av)
this.cx=z
z=this.b
y=H.b(new S.z(null,null),[F.t])
y.K(C.b,z,F.t)
this.ch=y
this.fx=this.b.z.h(0,C.t)}},iQ:{"^":"cH;ch,cx,cy,db,dx,dy,fr,fx,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=J.k(b)
y=J.w(this.ch.b,z.gA(b))
x=J.w(this.cx.b,z.gA(b))
z=this.fr
w=a*z
v=this.dy
u=w*v
t=w*3
for(s=0;s<z;s+=2){r=6.283185307179586*s/z
q=u+s*3
w=this.cy
p=Math.sin(r)
o=x.gaD()
if(typeof o!=="number")return H.i(o)
if(q>=w.length)return H.a(w,q)
w[q]=p*o
o=this.cy
p=q+1
w=Math.cos(r)
n=x.gaD()
if(typeof n!=="number")return H.i(n)
if(p>=o.length)return H.a(o,p)
o[p]=w*n
n=this.cy
w=q+2
o=y.gn().a[2]
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
ck:function(a){var z=this.z
z.uniformMatrix4fv(J.cd(z,this.gU(),"uViewProjection"),!1,this.fx.c0().gaF())
z.uniform1f(z.getUniformLocation(this.gU(),"uTime"),this.b.cy.h(0,this.y))
this.bY(this.dx,this.cy,this.db)
z.drawElements(4,this.db.length,5123,0)},
ct:function(a){var z,y
z=this.fr
y=J.bf(a)
this.cy=new Float32Array(H.m(J.E(y.E(a,z),this.dy)))
this.db=new Uint16Array(H.m(J.E(y.E(a,z),3)))},
gcu:function(){return"TunnelSegmentRenderingSystem"},
gc4:function(){return"TunnelSegmentRenderingSystem"},
H:function(){var z,y
this.bt()
z=this.b
y=H.b(new S.z(null,null),[F.b6])
y.K(C.q,z,F.b6)
this.cx=y
y=this.b
z=H.b(new S.z(null,null),[F.t])
z.K(C.b,y,F.t)
this.ch=z
this.fx=this.b.z.h(0,C.t)}},i8:{"^":"cH;ch,cx,cy,db,dx,dy,fr,fx,fy,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cg:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=J.k(a0)
y=J.w(this.cx.b,z.gA(a0))
x=J.w(this.ch.b,z.gA(a0))
w=J.w(this.cy.b,z.gA(a0))
v=J.d6(y)
z=this.fr
u=this.fx
t=a*(z*u)
s=a*u*3
for(r=J.k(w),q=v===-1,p=0;p<u;p+=2){o=t+p*z
n=s+p*3
switch(v){case 0:m=-0.7853981633974483+6.283185307179586*p/u
l=Math.cos(m)
k=Math.sin(m)
break
case 1:j=C.a.N(u,4)
i=C.a.W(p,j)
h=C.a.M(p,j)
switch(i){case 0:k=-1+2*(h/j)
l=1
break
case 1:l=1-2*(h/j)
k=1
break
case 2:k=1-2*(h/j)
l=-1
break
case 3:l=-1+2*(h/j)
k=-1
break
default:l=0
k=0}break
case 2:j=C.a.N(u,3)
i=C.a.W(p,j)
h=C.a.M(p,j)
m=-0.5235987755982988+6.283185307179586*i/3
g=-0.5235987755982988+6.283185307179586*(i+1)/3
f=Math.cos(m)
e=Math.cos(g)
j=h/j
l=f+(e-Math.cos(m))*j
f=Math.sin(m)
e=Math.sin(g)
k=f+(e-Math.sin(m))*j
break
default:l=0
k=0}j=o+1
f=this.db
if(q){e=x.gn().a[0]
if(o>=f.length)return H.a(f,o)
f[o]=e
e=this.db
f=x.gn().a[1]
if(j>=e.length)return H.a(e,j)
e[j]=f}else{e=x.gn().a[0]
d=$.$get$bF()
if(v>>>0!==v||v>=3)return H.a(d,v)
d=d[v].$1(1256.6370614359173)
if(typeof d!=="number")return H.i(d)
if(o>=f.length)return H.a(f,o)
f[o]=e+l*d
d=this.db
e=x.gn().a[1]
f=$.$get$bF()[v].$1(1256.6370614359173)
if(typeof f!=="number")return H.i(f)
if(j>=d.length)return H.a(d,j)
d[j]=e+k*f}j=this.db
f=o+2
e=x.gn().a[2]
if(f>=j.length)return H.a(j,f)
j[f]=e
e=this.db
f=o+3
j=r.gX(w)
if(f>=e.length)return H.a(e,f)
e[f]=j
j=this.db
f=o+4
e=w.ga6()
if(f>=j.length)return H.a(j,f)
j[f]=e
e=this.db
f=o+5
j=w.gal()
if(f>=e.length)return H.a(e,f)
e[f]=j
j=C.a.N(u,4)
i=C.a.W(p,j)
h=C.a.M(p,j)
switch(i){case 0:k=-1+2*(h/j)
l=1
break
case 1:l=1-2*(h/j)
k=1
break
case 2:k=1-2*(h/j)
l=-1
break
case 3:l=-1+2*(h/j)
k=-1
break
default:l=null
k=null}j=this.db
f=o+6
e=x.gn().a[0]
if(typeof l!=="number")return l.E()
if(f>=j.length)return H.a(j,f)
j[f]=e+l*20*2
e=this.db
f=o+7
j=x.gn().a[1]
if(typeof k!=="number")return k.E()
if(f>=e.length)return H.a(e,f)
e[f]=j+k*20*2
j=this.db
f=o+8
e=x.gn().a[2]
if(f>=j.length)return H.a(j,f)
j[f]=e
e=this.db
f=o+9
j=r.gX(w)
if(f>=e.length)return H.a(e,f)
e[f]=j
j=this.db
f=o+10
e=w.ga6()
if(f>=j.length)return H.a(j,f)
j[f]=e
e=this.db
f=o+11
j=w.gal()
if(f>=e.length)return H.a(e,f)
e[f]=j
j=this.dx
f=C.a.W(o,z)
e=j.length
if(n>=e)return H.a(j,n)
j[n]=f
d=n+1
c=f+1
if(d>=e)return H.a(j,d)
j[d]=c
d=n+2
b=f+2
if(d>=e)return H.a(j,d)
j[d]=b
d=n+3
if(d>=e)return H.a(j,d)
j[d]=b
b=n+4
if(b>=e)return H.a(j,b)
j[b]=c
c=n+5
if(c>=e)return H.a(j,c)
j[c]=f+3}r=this.dx
u=s+u*3
q=u-1
z=C.a.W(t,z)
j=r.length
if(q<0||q>=j)return H.a(r,q)
r[q]=z+1
q=u-3
if(q<0||q>=j)return H.a(r,q)
r[q]=z
u-=4
if(u<0||u>=j)return H.a(r,u)
r[u]=z},
ck:function(a){var z=this.z
z.uniformMatrix4fv(J.cd(z,this.gU(),"uViewProjection"),!1,this.fy.c0().gaF())
this.bY(this.dy,this.db,this.dx)
z.drawElements(4,this.dx.length,5123,0)},
ct:function(a){var z,y
z=this.fx
y=J.bf(a)
this.db=new Float32Array(H.m(J.E(y.E(a,z),this.fr)))
this.dx=new Uint16Array(H.m(J.E(y.E(a,z),3)))},
gcu:function(){return"ObstacleRenderingSystem"},
gc4:function(){return"ObstacleRenderingSystem"},
H:function(){var z,y
this.bt()
z=this.b
y=H.b(new S.z(null,null),[F.aY])
y.K(C.o,z,F.aY)
this.cy=y
y=this.b
z=H.b(new S.z(null,null),[F.ap])
z.K(C.i,y,F.ap)
this.cx=z
z=this.b
y=H.b(new S.z(null,null),[F.t])
y.K(C.b,z,F.t)
this.ch=y
this.fy=this.b.z.h(0,C.t)}},fN:{"^":"b_;z,Q,ch,a,b,c,d,e,f,r,x,y",
aC:function(a){var z,y,x
z=J.w(this.z.b,J.N(a))
y=J.d4(this.ch)
x=C.d.i(C.d.N(z.gn().a[2],1000))
y.font="20px Verdana";(y&&C.x).dl(y,"Obstacles:",J.a6(J.cc(this.Q),200),20)
C.x.dl(y,x,J.a6(J.cc(this.Q),y.measureText(x).width),20)},
H:function(){var z,y
this.aa()
z=this.b
y=H.b(new S.z(null,null),[F.t])
y.K(C.b,z,F.t)
this.z=y
this.Q=this.b.z.h(0,C.h)}}}],["","",,H,{"^":"",
bI:function(){return new P.aK("No element")},
hN:function(){return new P.aK("Too few elements")},
b5:{"^":"Q;",
gO:function(a){return H.b(new H.dJ(this,this.gj(this),0,null),[H.J(this,"b5",0)])},
D:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.a2(0,y))
if(z!==this.gj(this))throw H.f(new P.O(this))}},
az:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){if(J.D(this.a2(0,y),b))return!0
if(z!==this.gj(this))throw H.f(new P.O(this))}return!1},
ap:function(a,b){return H.b(new H.bN(this,b),[H.J(this,"b5",0),null])},
cr:function(a,b){var z,y,x
z=H.b([],[H.J(this,"b5",0)])
C.c.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.a2(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bl:function(a){return this.cr(a,!0)},
$isx:1},
dJ:{"^":"c;a,b,c,d",
gF:function(){return this.d},
C:function(){var z,y,x,w
z=this.a
y=J.M(z)
x=y.gj(z)
if(this.b!==x)throw H.f(new P.O(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a2(z,w);++this.c
return!0}},
dK:{"^":"Q;a,b",
gO:function(a){var z=new H.hZ(null,J.aU(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.bh(this.a)},
$asQ:function(a,b){return[b]},
q:{
bn:function(a,b,c,d){if(!!J.j(a).$isx)return H.b(new H.ds(a,b),[c,d])
return H.b(new H.dK(a,b),[c,d])}}},
ds:{"^":"dK;a,b",$isx:1},
hZ:{"^":"bJ;a,b,c",
C:function(){var z=this.b
if(z.C()){this.a=this.ah(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
ah:function(a){return this.c.$1(a)},
$asbJ:function(a,b){return[b]}},
bN:{"^":"b5;a,b",
gj:function(a){return J.bh(this.a)},
a2:function(a,b){return this.ah(J.fd(this.a,b))},
ah:function(a){return this.b.$1(a)},
$asb5:function(a,b){return[b]},
$asQ:function(a,b){return[b]},
$isx:1},
en:{"^":"Q;a,b",
gO:function(a){var z=new H.j0(J.aU(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
j0:{"^":"bJ;a,b",
C:function(){for(var z=this.a;z.C();)if(this.ah(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()},
ah:function(a){return this.b.$1(a)}},
iK:{"^":"Q;a,b",
gO:function(a){var z=new H.iL(J.aU(this.a),this.b,!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
iL:{"^":"bJ;a,b,c",
C:function(){if(this.c)return!1
var z=this.a
if(!z.C()||this.ah(z.gF())!==!0){this.c=!0
return!1}return!0},
gF:function(){if(this.c)return
return this.a.gF()},
ah:function(a){return this.b.$1(a)}},
dx:{"^":"c;",
sj:function(a,b){throw H.f(new P.K("Cannot change the length of a fixed-length list"))},
t:function(a,b){throw H.f(new P.K("Cannot add to a fixed-length list"))},
a4:function(a){throw H.f(new P.K("Cannot remove from a fixed-length list"))}}}],["","",,H,{"^":"",
eO:function(a){var z=H.b(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
jj:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ks()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aS(new P.jl(z),1)).observe(y,{childList:true})
return new P.jk(z,y,x)}else if(self.setImmediate!=null)return P.kt()
return P.ku()},
n7:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aS(new P.jm(a),0))},"$1","ks",2,0,5],
n8:[function(a){++init.globalState.f.b
self.setImmediate(H.aS(new P.jn(a),0))},"$1","kt",2,0,5],
n9:[function(a){P.cC(C.y,a)},"$1","ku",2,0,5],
eC:function(a,b){var z=H.bu()
z=H.aR(z,[z,z]).ai(a)
if(z){b.toString
return a}else{b.toString
return a}},
h2:function(a,b,c){var z=H.b(new P.a1(0,$.n,null),[c])
P.cB(a,new P.kx(b,z))
return z},
cm:function(a,b,c){var z,y,x,w,v,u
z={}
y=H.b(new P.a1(0,$.n,null),[P.l])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.h4(z,!1,b,y)
for(w=a.length,v=0;v<a.length;a.length===w||(0,H.bg)(a),++v)a[v].cq(new P.h3(z,!1,b,y,z.b++),x)
x=z.b
if(x===0){z=H.b(new P.a1(0,$.n,null),[null])
z.bx(C.W)
return z}u=new Array(x)
u.fixed$length=Array
z.a=u
return y},
kj:function(a,b,c){$.n.toString
a.a0(b,c)},
kn:function(){var z,y
for(;z=$.aP,z!=null;){$.bc=null
y=z.b
$.aP=y
if(y==null)$.bb=null
z.a.$0()}},
nj:[function(){$.cR=!0
try{P.kn()}finally{$.bc=null
$.cR=!1
if($.aP!=null)$.$get$cI().$1(P.eL())}},"$0","eL",0,0,2],
eH:function(a){var z=new P.eo(a,null)
if($.aP==null){$.bb=z
$.aP=z
if(!$.cR)$.$get$cI().$1(P.eL())}else{$.bb.b=z
$.bb=z}},
kq:function(a){var z,y,x
z=$.aP
if(z==null){P.eH(a)
$.bc=$.bb
return}y=new P.eo(a,null)
x=$.bc
if(x==null){y.b=z
$.bc=y
$.aP=y}else{y.b=x.b
x.b=y
$.bc=y
if(y.b==null)$.bb=y}},
eW:function(a){var z=$.n
if(C.e===z){P.ax(null,null,C.e,a)
return}z.toString
P.ax(null,null,z,z.bW(a,!0))},
eG:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.j(z).$isaa)return z
return}catch(w){v=H.W(w)
y=v
x=H.U(w)
v=$.n
v.toString
P.bd(null,null,v,y,x)}},
kp:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.W(u)
z=t
y=H.U(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.aT(x)
w=t
v=x.ga9()
c.$2(w,v)}}},
ke:function(a,b,c,d){var z=a.bd()
if(!!J.j(z).$isaa)z.cw(new P.kh(b,c,d))
else b.a0(c,d)},
kf:function(a,b){return new P.kg(a,b)},
kd:function(a,b,c){$.n.toString
a.bv(b,c)},
cB:function(a,b){var z=$.n
if(z===C.e){z.toString
return P.cC(a,b)}return P.cC(a,z.bW(b,!0))},
cC:function(a,b){var z=C.a.N(a.a,1000)
return H.iN(z<0?0:z,b)},
bd:function(a,b,c,d,e){var z={}
z.a=d
P.kq(new P.ko(z,e))},
eD:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
eF:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
eE:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
ax:function(a,b,c,d){var z=C.e!==c
if(z)d=c.bW(d,!(!z||!1))
P.eH(d)},
jl:{"^":"d:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
jk:{"^":"d:14;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
jm:{"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
jn:{"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
jo:{"^":"er;a"},
jq:{"^":"ju;y,eX:z<,Q,x,a,b,c,d,e,f,r",
b7:[function(){},"$0","gb6",0,0,2],
b9:[function(){},"$0","gb8",0,0,2]},
jp:{"^":"c;ak:c@",
geW:function(){return this.c<4},
f5:function(a){var z,y
z=a.Q
y=a.z
if(z==null)this.d=y
else z.z=y
if(y==null)this.e=z
else y.Q=z
a.Q=a
a.z=a},
fc:function(a,b,c,d){var z,y,x
if((this.c&4)!==0){z=new P.jz($.n,0,c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.d1()
return z}z=$.n
y=new P.jq(0,null,null,this,null,null,null,z,d?1:0,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.cH(a,b,c,d,H.q(this,0))
y.Q=y
y.z=y
y.y=this.c&1
x=this.e
this.e=y
y.z=null
y.Q=x
if(x==null)this.d=y
else x.z=y
if(this.d===y)P.eG(this.a)
return y},
f_:function(a){var z
if(a.geX()===a)return
z=a.y
if((z&2)!==0)a.y=(z|4)>>>0
else{this.f5(a)
if((this.c&2)===0&&this.d==null)this.ew()}return},
f0:function(a){},
f1:function(a){},
ep:function(){if((this.c&4)!==0)return new P.aK("Cannot add new events after calling close")
return new P.aK("Cannot add new events while doing an addStream")},
t:function(a,b){if(!this.geW())throw H.f(this.ep())
this.aJ(b)},
b2:function(a){this.aJ(a)},
ew:function(){if((this.c&4)!==0&&this.r.a===0)this.r.bx(null)
P.eG(this.b)}},
ji:{"^":"jp;a,b,c,d,e,f,r",
aJ:function(a){var z,y
for(z=this.d;z!=null;z=z.z){y=new P.es(a,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
z.b1(y)}}},
aa:{"^":"c;"},
kx:{"^":"d:1;a,b",
$0:function(){var z,y,x,w
try{x=this.a.$0()
this.b.aH(x)}catch(w){x=H.W(w)
z=x
y=H.U(w)
P.kj(this.b,z,y)}}},
h4:{"^":"d:20;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.a0(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.a0(z.c,z.d)}},
h3:{"^":"d:21;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.a(x,z)
x[z]=a
if(y===0)this.d.cN(x)}else if(z.b===0&&!this.b)this.d.a0(z.c,z.d)}},
jt:{"^":"c;",
fz:[function(a,b){var z
a=a!=null?a:new P.cu()
z=this.a
if(z.a!==0)throw H.f(new P.aK("Future already completed"))
$.n.toString
z.eu(a,b)},function(a){return this.fz(a,null)},"fw","$2","$1","gfv",2,2,22,0]},
ep:{"^":"jt;a",
dh:function(a,b){var z=this.a
if(z.a!==0)throw H.f(new P.aK("Future already completed"))
z.bx(b)}},
eu:{"^":"c;bM:a<,b,c,d,e",
gfg:function(){return this.b.b},
gds:function(){return(this.c&1)!==0},
gh3:function(){return(this.c&2)!==0},
gdr:function(){return this.c===8},
h1:function(a){return this.b.b.co(this.d,a)},
hf:function(a){if(this.c!==6)return!0
return this.b.b.co(this.d,J.aT(a))},
fY:function(a){var z,y,x,w
z=this.e
y=H.bu()
y=H.aR(y,[y,y]).ai(z)
x=J.k(a)
w=this.b
if(y)return w.b.hs(z,x.gan(a),a.ga9())
else return w.b.co(z,x.gan(a))},
h2:function(){return this.b.b.dF(this.d)}},
a1:{"^":"c;ak:a@,b,f8:c<",
geT:function(){return this.a===2},
gbJ:function(){return this.a>=4},
cq:function(a,b){var z,y
z=$.n
if(z!==C.e){z.toString
if(b!=null)b=P.eC(b,z)}y=H.b(new P.a1(0,z,null),[null])
this.bw(H.b(new P.eu(null,y,b==null?1:3,a,b),[null,null]))
return y},
Y:function(a){return this.cq(a,null)},
cw:function(a){var z,y
z=$.n
y=new P.a1(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.e)z.toString
this.bw(H.b(new P.eu(null,y,8,a,null),[null,null]))
return y},
bw:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gbJ()){y.bw(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.ax(null,null,z,new P.jE(this,a))}},
cY:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gbM()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gbJ()){v.cY(a)
return}this.a=v.a
this.c=v.c}z.a=this.bc(a)
y=this.b
y.toString
P.ax(null,null,y,new P.jM(z,this))}},
bb:function(){var z=this.c
this.c=null
return this.bc(z)},
bc:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gbM()
z.a=y}return y},
aH:function(a){var z
if(!!J.j(a).$isaa)P.bY(a,this)
else{z=this.bb()
this.a=4
this.c=a
P.aN(this,z)}},
cN:function(a){var z=this.bb()
this.a=4
this.c=a
P.aN(this,z)},
a0:[function(a,b){var z=this.bb()
this.a=8
this.c=new P.bz(a,b)
P.aN(this,z)},function(a){return this.a0(a,null)},"hA","$2","$1","gbD",2,2,31,0],
bx:function(a){var z
if(!!J.j(a).$isaa){if(a.a===8){this.a=1
z=this.b
z.toString
P.ax(null,null,z,new P.jG(this,a))}else P.bY(a,this)
return}this.a=1
z=this.b
z.toString
P.ax(null,null,z,new P.jH(this,a))},
eu:function(a,b){var z
this.a=1
z=this.b
z.toString
P.ax(null,null,z,new P.jF(this,a,b))},
$isaa:1,
q:{
jI:function(a,b){var z,y,x,w
b.sak(1)
try{a.cq(new P.jJ(b),new P.jK(b))}catch(x){w=H.W(x)
z=w
y=H.U(x)
P.eW(new P.jL(b,z,y))}},
bY:function(a,b){var z,y,x
for(;a.geT();)a=a.c
z=a.gbJ()
y=b.c
if(z){b.c=null
x=b.bc(y)
b.a=a.a
b.c=a.c
P.aN(b,x)}else{b.a=2
b.c=a
a.cY(y)}},
aN:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.aT(v)
x=v.ga9()
z.toString
P.bd(null,null,z,y,x)}return}for(;b.gbM()!=null;b=u){u=b.a
b.a=null
P.aN(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gds()||b.gdr()){s=b.gfg()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.aT(v)
r=v.ga9()
y.toString
P.bd(null,null,y,x,r)
return}q=$.n
if(q==null?s!=null:q!==s)$.n=s
else q=null
if(b.gdr())new P.jP(z,x,w,b).$0()
else if(y){if(b.gds())new P.jO(x,b,t).$0()}else if(b.gh3())new P.jN(z,x,b).$0()
if(q!=null)$.n=q
y=x.b
r=J.j(y)
if(!!r.$isaa){p=b.b
if(!!r.$isa1)if(y.a>=4){o=p.c
p.c=null
b=p.bc(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.bY(y,p)
else P.jI(y,p)
return}}p=b.b
b=p.bb()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
jE:{"^":"d:1;a,b",
$0:function(){P.aN(this.a,this.b)}},
jM:{"^":"d:1;a,b",
$0:function(){P.aN(this.b,this.a.a)}},
jJ:{"^":"d:0;a",
$1:function(a){var z=this.a
z.a=0
z.aH(a)}},
jK:{"^":"d:32;a",
$2:function(a,b){this.a.a0(a,b)},
$1:function(a){return this.$2(a,null)}},
jL:{"^":"d:1;a,b,c",
$0:function(){this.a.a0(this.b,this.c)}},
jG:{"^":"d:1;a,b",
$0:function(){P.bY(this.b,this.a)}},
jH:{"^":"d:1;a,b",
$0:function(){this.a.cN(this.b)}},
jF:{"^":"d:1;a,b,c",
$0:function(){this.a.a0(this.b,this.c)}},
jP:{"^":"d:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.h2()}catch(w){v=H.W(w)
y=v
x=H.U(w)
if(this.c){v=J.aT(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.bz(y,x)
u.a=!0
return}if(!!J.j(z).$isaa){if(z instanceof P.a1&&z.gak()>=4){if(z.gak()===8){v=this.b
v.b=z.gf8()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.Y(new P.jQ(t))
v.a=!1}}},
jQ:{"^":"d:0;a",
$1:function(a){return this.a}},
jO:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.h1(this.c)}catch(x){w=H.W(x)
z=w
y=H.U(x)
w=this.a
w.b=new P.bz(z,y)
w.a=!0}}},
jN:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.hf(z)===!0&&w.e!=null){v=this.b
v.b=w.fY(z)
v.a=!1}}catch(u){w=H.W(u)
y=w
x=H.U(u)
w=this.a
v=J.aT(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.bz(y,x)
s.a=!0}}},
eo:{"^":"c;a,b"},
ak:{"^":"c;",
ap:function(a,b){return H.b(new P.k1(b,this),[H.J(this,"ak",0),null])},
D:function(a,b){var z,y
z={}
y=H.b(new P.a1(0,$.n,null),[null])
z.a=null
z.a=this.ad(new P.iE(z,this,b,y),!0,new P.iF(y),y.gbD())
return y},
gj:function(a){var z,y
z={}
y=H.b(new P.a1(0,$.n,null),[P.o])
z.a=0
this.ad(new P.iG(z),!0,new P.iH(z,y),y.gbD())
return y},
bl:function(a){var z,y
z=H.b([],[H.J(this,"ak",0)])
y=H.b(new P.a1(0,$.n,null),[[P.l,H.J(this,"ak",0)]])
this.ad(new P.iI(this,z),!0,new P.iJ(z,y),y.gbD())
return y}},
iE:{"^":"d;a,b,c,d",
$1:function(a){P.kp(new P.iC(this.c,a),new P.iD(),P.kf(this.a.a,this.d))},
$signature:function(){return H.cU(function(a){return{func:1,args:[a]}},this.b,"ak")}},
iC:{"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
iD:{"^":"d:0;",
$1:function(a){}},
iF:{"^":"d:1;a",
$0:function(){this.a.aH(null)}},
iG:{"^":"d:0;a",
$1:function(a){++this.a.a}},
iH:{"^":"d:1;a,b",
$0:function(){this.b.aH(this.a.a)}},
iI:{"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.cU(function(a){return{func:1,args:[a]}},this.a,"ak")}},
iJ:{"^":"d:1;a,b",
$0:function(){this.b.aH(this.a)}},
iB:{"^":"c;"},
er:{"^":"ka;a",
gG:function(a){return(H.ah(this.a)^892482866)>>>0},
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.er))return!1
return b.a===this.a}},
ju:{"^":"cJ;",
bN:function(){return this.x.f_(this)},
b7:[function(){this.x.f0(this)},"$0","gb6",0,0,2],
b9:[function(){this.x.f1(this)},"$0","gb8",0,0,2]},
nd:{"^":"c;"},
cJ:{"^":"c;ak:e@",
aS:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.df()
if((z&4)===0&&(this.e&32)===0)this.cU(this.gb6())},
ce:function(a){return this.aS(a,null)},
cl:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gab(z)}else z=!1
if(z)this.r.bo(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cU(this.gb8())}}}},
bd:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.by()
return this.f},
by:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.df()
if((this.e&32)===0)this.r=null
this.f=this.bN()},
b2:["ee",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.aJ(a)
else this.b1(H.b(new P.es(a,null),[null]))}],
bv:["ef",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.d2(a,b)
else this.b1(new P.jy(a,b,null))}],
es:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bQ()
else this.b1(C.E)},
b7:[function(){},"$0","gb6",0,0,2],
b9:[function(){},"$0","gb8",0,0,2],
bN:function(){return},
b1:function(a){var z,y
z=this.r
if(z==null){z=H.b(new P.kb(null,null,0),[null])
this.r=z}z.t(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bo(this)}},
aJ:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cp(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bB((z&4)!==0)},
d2:function(a,b){var z,y
z=this.e
y=new P.js(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.by()
z=this.f
if(!!J.j(z).$isaa)z.cw(y)
else y.$0()}else{y.$0()
this.bB((z&4)!==0)}},
bQ:function(){var z,y
z=new P.jr(this)
this.by()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.j(y).$isaa)y.cw(z)
else z.$0()},
cU:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bB((z&4)!==0)},
bB:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gab(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gab(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.b7()
else this.b9()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bo(this)},
cH:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.eC(b,z)
this.c=c}},
js:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aR(H.bu(),[H.eM(P.c),H.eM(P.aj)]).ai(y)
w=z.d
v=this.b
u=z.b
if(x)w.ht(u,v,this.c)
else w.cp(u,v)
z.e=(z.e&4294967263)>>>0}},
jr:{"^":"d:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cn(z.c)
z.e=(z.e&4294967263)>>>0}},
ka:{"^":"ak;",
ad:function(a,b,c,d){return this.a.fc(a,d,c,!0===b)},
c9:function(a,b,c){return this.ad(a,null,b,c)}},
cK:{"^":"c;bi:a@"},
es:{"^":"cK;b,a",
cf:function(a){a.aJ(this.b)}},
jy:{"^":"cK;an:b>,a9:c<,a",
cf:function(a){a.d2(this.b,this.c)},
$ascK:I.am},
jx:{"^":"c;",
cf:function(a){a.bQ()},
gbi:function(){return},
sbi:function(a){throw H.f(new P.aK("No events after a done."))}},
k3:{"^":"c;ak:a@",
bo:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eW(new P.k4(this,a))
this.a=1},
df:function(){if(this.a===1)this.a=3}},
k4:{"^":"d:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbi()
z.b=w
if(w==null)z.c=null
x.cf(this.b)}},
kb:{"^":"k3;b,c,a",
gab:function(a){return this.c==null},
t:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbi(b)
this.c=b}}},
jz:{"^":"c;a,ak:b@,c",
d1:function(){var z,y
if((this.b&2)!==0)return
z=this.a
y=this.gf9()
z.toString
P.ax(null,null,z,y)
this.b=(this.b|2)>>>0},
aS:function(a,b){this.b+=4},
ce:function(a){return this.aS(a,null)},
cl:function(){var z=this.b
if(z>=4){z-=4
this.b=z
if(z<4&&(z&1)===0)this.d1()}},
bd:function(){return},
bQ:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.cn(this.c)},"$0","gf9",0,0,2]},
kh:{"^":"d:1;a,b,c",
$0:function(){return this.a.a0(this.b,this.c)}},
kg:{"^":"d:10;a,b",
$2:function(a,b){P.ke(this.a,this.b,a,b)}},
cL:{"^":"ak;",
ad:function(a,b,c,d){return this.eC(a,d,c,!0===b)},
c9:function(a,b,c){return this.ad(a,null,b,c)},
eC:function(a,b,c,d){return P.jD(this,a,b,c,d,H.J(this,"cL",0),H.J(this,"cL",1))},
cV:function(a,b){b.b2(a)},
eN:function(a,b,c){c.bv(a,b)},
$asak:function(a,b){return[b]}},
et:{"^":"cJ;x,y,a,b,c,d,e,f,r",
b2:function(a){if((this.e&2)!==0)return
this.ee(a)},
bv:function(a,b){if((this.e&2)!==0)return
this.ef(a,b)},
b7:[function(){var z=this.y
if(z==null)return
z.ce(0)},"$0","gb6",0,0,2],
b9:[function(){var z=this.y
if(z==null)return
z.cl()},"$0","gb8",0,0,2],
bN:function(){var z=this.y
if(z!=null){this.y=null
return z.bd()}return},
hD:[function(a){this.x.cV(a,this)},"$1","geK",2,0,function(){return H.cU(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"et")}],
hF:[function(a,b){this.x.eN(a,b,this)},"$2","geM",4,0,12],
hE:[function(){this.es()},"$0","geL",0,0,2],
en:function(a,b,c,d,e,f,g){var z,y
z=this.geK()
y=this.geM()
this.y=this.x.a.c9(z,this.geL(),y)},
$ascJ:function(a,b){return[b]},
q:{
jD:function(a,b,c,d,e,f,g){var z=$.n
z=H.b(new P.et(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cH(b,c,d,e,g)
z.en(a,b,c,d,e,f,g)
return z}}},
k1:{"^":"cL;b,a",
cV:function(a,b){var z,y,x,w,v
z=null
try{z=this.fd(a)}catch(w){v=H.W(w)
y=v
x=H.U(w)
P.kd(b,y,x)
return}b.b2(z)},
fd:function(a){return this.b.$1(a)}},
bz:{"^":"c;an:a>,a9:b<",
i:function(a){return H.e(this.a)},
$isP:1},
kc:{"^":"c;"},
ko:{"^":"d:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cu()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.f(z)
x=H.f(z)
x.stack=J.aC(y)
throw x}},
k6:{"^":"kc;",
cn:function(a){var z,y,x,w
try{if(C.e===$.n){x=a.$0()
return x}x=P.eD(null,null,this,a)
return x}catch(w){x=H.W(w)
z=x
y=H.U(w)
return P.bd(null,null,this,z,y)}},
cp:function(a,b){var z,y,x,w
try{if(C.e===$.n){x=a.$1(b)
return x}x=P.eF(null,null,this,a,b)
return x}catch(w){x=H.W(w)
z=x
y=H.U(w)
return P.bd(null,null,this,z,y)}},
ht:function(a,b,c){var z,y,x,w
try{if(C.e===$.n){x=a.$2(b,c)
return x}x=P.eE(null,null,this,a,b,c)
return x}catch(w){x=H.W(w)
z=x
y=H.U(w)
return P.bd(null,null,this,z,y)}},
bW:function(a,b){if(b)return new P.k7(this,a)
else return new P.k8(this,a)},
fm:function(a,b){return new P.k9(this,a)},
h:function(a,b){return},
dF:function(a){if($.n===C.e)return a.$0()
return P.eD(null,null,this,a)},
co:function(a,b){if($.n===C.e)return a.$1(b)
return P.eF(null,null,this,a,b)},
hs:function(a,b,c){if($.n===C.e)return a.$2(b,c)
return P.eE(null,null,this,a,b,c)}},
k7:{"^":"d:1;a,b",
$0:function(){return this.a.cn(this.b)}},
k8:{"^":"d:1;a,b",
$0:function(){return this.a.dF(this.b)}},
k9:{"^":"d:0;a,b",
$1:function(a){return this.a.cp(this.b,a)}}}],["","",,P,{"^":"",
bm:function(a,b){return H.b(new H.T(0,null,null,null,null,null,0),[a,b])},
hV:function(){return H.b(new H.T(0,null,null,null,null,null,0),[null,null])},
ab:function(a){return H.kD(a,H.b(new H.T(0,null,null,null,null,null,0),[null,null]))},
dE:function(a,b,c){var z,y
if(P.cS(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$be()
y.push(a)
try{P.kk(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.e2(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bH:function(a,b,c){var z,y,x
if(P.cS(a))return b+"..."+c
z=new P.cz(b)
y=$.$get$be()
y.push(a)
try{x=z
x.a=P.e2(x.gat(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.a=y.gat()+c
y=z.gat()
return y.charCodeAt(0)==0?y:y},
cS:function(a){var z,y
for(z=0;y=$.$get$be(),z<y.length;++z)if(a===y[z])return!0
return!1},
kk:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.aU(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.C())return
w=H.e(z.gF())
b.push(w)
y+=w.length+2;++x}if(!z.C()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gF();++x
if(!z.C()){if(x<=4){b.push(H.e(t))
return}v=H.e(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gF();++x
for(;z.C();t=s,s=r){r=z.gF();++x
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
aH:function(a,b,c,d){return H.b(new P.jW(0,null,null,null,null,null,0),[d])},
hW:function(a,b){var z,y
z=P.aH(null,null,null,b)
for(y=0;y<5;++y)z.t(0,a[y])
return z},
i_:function(a){var z,y,x
z={}
if(P.cS(a))return"{...}"
y=new P.cz("")
try{$.$get$be().push(a)
x=y
x.a=x.gat()+"{"
z.a=!0
J.by(a,new P.i0(z,y))
z=y
z.a=z.gat()+"}"}finally{z=$.$get$be()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.gat()
return z.charCodeAt(0)==0?z:z},
ex:{"^":"T;a,b,c,d,e,f,r",
aP:function(a){return H.kY(a)&0x3ffffff},
aQ:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdt()
if(x==null?b==null:x===b)return y}return-1},
q:{
ba:function(a,b){return H.b(new P.ex(0,null,null,null,null,null,0),[a,b])}}},
jW:{"^":"jS;a,b,c,d,e,f,r",
gO:function(a){var z=H.b(new P.cN(this,this.r,null,null),[null])
z.c=z.a.e
return z},
gj:function(a){return this.a},
az:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eA(b)},
eA:function(a){var z=this.d
if(z==null)return!1
return this.b4(z[this.b3(a)],a)>=0},
dw:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.az(0,a)?a:null
else return this.eV(a)},
eV:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.b3(a)]
x=this.b4(y,a)
if(x<0)return
return J.w(y,x).gcR()},
D:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.f(new P.O(this))
z=z.b}},
t:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cO()
this.b=z}return this.cK(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cO()
this.c=y}return this.cK(y,b)}else return this.a_(b)},
a_:function(a){var z,y,x
z=this.d
if(z==null){z=P.cO()
this.d=z}y=this.b3(a)
x=z[y]
if(x==null)z[y]=[this.bC(a)]
else{if(this.b4(x,a)>=0)return!1
x.push(this.bC(a))}return!0},
aq:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cL(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cL(this.c,b)
else return this.f2(b)},
f2:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.b3(a)]
x=this.b4(y,a)
if(x<0)return!1
this.cM(y.splice(x,1)[0])
return!0},
ay:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cK:function(a,b){if(a[b]!=null)return!1
a[b]=this.bC(b)
return!0},
cL:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cM(z)
delete a[b]
return!0},
bC:function(a){var z,y
z=new P.jX(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cM:function(a){var z,y
z=a.gey()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
b3:function(a){return J.V(a)&0x3ffffff},
b4:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.D(a[y].gcR(),b))return y
return-1},
$isx:1,
q:{
cO:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
jX:{"^":"c;cR:a<,b,ey:c<"},
cN:{"^":"c;a,b,c,d",
gF:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.O(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
jS:{"^":"iw;"},
dF:{"^":"c;",
ap:function(a,b){return H.bn(this,b,H.J(this,"dF",0),null)},
D:function(a,b){var z
for(z=this.gO(this);z.C();)b.$1(z.gF())},
gj:function(a){var z,y
z=this.gO(this)
for(y=0;z.C();)++y
return y},
i:function(a){return P.dE(this,"(",")")}},
bL:{"^":"c;",
gO:function(a){return H.b(new H.dJ(a,this.gj(a),0,null),[H.J(a,"bL",0)])},
a2:function(a,b){return this.h(a,b)},
D:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.a(a,y)
b.$1(a[y])
if(z!==a.length)throw H.f(new P.O(a))}},
ap:function(a,b){return H.b(new H.bN(a,b),[null,null])},
fX:function(a,b,c){var z,y,x
z=this.gj(a)
for(y=b,x=0;x<z;++x){if(x>=a.length)return H.a(a,x)
y=c.$2(y,a[x])
if(z!==a.length)throw H.f(new P.O(a))}return y},
t:function(a,b){var z=this.gj(a)
this.sj(a,z+1)
if(z<0||z>=a.length)return H.a(a,z)
a[z]=b},
a4:function(a){var z,y,x
if(this.gj(a)===0)throw H.f(H.bI())
z=a.length
y=z-1
if(y<0)return H.a(a,y)
x=a[y]
this.sj(a,y)
return x},
fT:function(a,b,c,d){var z
P.cy(b,c,this.gj(a),null,null,null)
for(z=b;J.bx(z,c);++z){if(z>>>0!==z||z>=a.length)return H.a(a,z)
a[z]=d}},
i:function(a){return P.bH(a,"[","]")},
$isl:1,
$asl:null,
$isx:1},
i0:{"^":"d:3;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.e(a)
z.a=y+": "
z.a+=H.e(b)}},
hX:{"^":"b5;a,b,c,d",
gO:function(a){var z=new P.jY(this,this.c,this.d,this.b,null)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
D:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.C(new P.O(this))}},
gab:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a2:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.C(P.bG(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.a(y,w)
return y[w]},
t:function(a,b){this.a_(b)},
ay:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.bH(this,"{","}")},
cj:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.f(H.bI());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
a4:function(a){var z,y,x,w
z=this.b
y=this.c
if(z===y)throw H.f(H.bI());++this.d
z=this.a
x=z.length
y=(y-1&x-1)>>>0
this.c=y
if(y<0||y>=x)return H.a(z,y)
w=z[y]
z[y]=null
return w},
a_:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.a(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cT();++this.d},
cT:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.b(z,[H.q(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.br(y,0,w,z,x)
C.c.br(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ek:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.b(z,[b])},
$isx:1,
q:{
bM:function(a,b){var z=H.b(new P.hX(null,0,0,0),[b])
z.ek(a,b)
return z}}},
jY:{"^":"c;a,b,c,d,e",
gF:function(){return this.e},
C:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.C(new P.O(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
ix:{"^":"c;",
ap:function(a,b){return H.b(new H.ds(this,b),[H.q(this,0),null])},
i:function(a){return P.bH(this,"{","}")},
D:function(a,b){var z
for(z=H.b(new P.cN(this,this.r,null,null),[null]),z.c=z.a.e;z.C();)b.$1(z.d)},
$isx:1},
iw:{"^":"ix;"}}],["","",,P,{"^":"",
dv:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aC(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fY(a)},
fY:function(a){var z=J.j(a)
if(!!z.$isd)return z.i(a)
return H.bQ(a)},
b1:function(a){return new P.jC(a)},
cr:function(a,b,c){var z,y
z=H.b([],[c])
for(y=J.aU(a);y.C();)z.push(y.gF())
return z},
hY:function(a,b,c,d){var z,y,x
z=H.b([],[d])
C.c.sj(z,a)
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bw:function(a){var z=H.e(a)
H.kZ(z)},
bt:{"^":"c;"},
"+bool":0,
lx:{"^":"c;"},
X:{"^":"B;"},
"+double":0,
ae:{"^":"c;au:a<",
B:function(a,b){return new P.ae(this.a+b.gau())},
p:function(a,b){return new P.ae(this.a-b.gau())},
E:function(a,b){if(typeof b!=="number")return H.i(b)
return new P.ae(C.d.aV(this.a*b))},
W:function(a,b){if(b===0)throw H.f(new P.hB())
return new P.ae(C.a.W(this.a,b))},
V:function(a,b){return this.a<b.gau()},
S:function(a,b){return this.a>b.gau()},
cC:function(a,b){return this.a<=b.gau()},
T:function(a,b){return this.a>=b.gau()},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.ae))return!1
return this.a===b.a},
gG:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.fQ()
y=this.a
if(y<0)return"-"+new P.ae(-y).i(0)
x=z.$1(C.a.ci(C.a.N(y,6e7),60))
w=z.$1(C.a.ci(C.a.N(y,1e6),60))
v=new P.fP().$1(C.a.ci(y,1e6))
return""+C.a.N(y,36e8)+":"+H.e(x)+":"+H.e(w)+"."+H.e(v)},
bn:function(a){return new P.ae(-this.a)},
q:{
dq:function(a,b,c,d,e,f){return new P.ae(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fP:{"^":"d:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fQ:{"^":"d:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
P:{"^":"c;",
ga9:function(){return H.U(this.$thrownJsError)}},
cu:{"^":"P;",
i:function(a){return"Throw of null."}},
aD:{"^":"P;a,b,c,d",
gbG:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbF:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.e(z)+")":""
z=this.d
x=z==null?"":": "+H.e(z)
w=this.gbG()+y+x
if(!this.a)return w
v=this.gbF()
u=P.dv(this.b)
return w+v+": "+H.e(u)},
q:{
a7:function(a){return new P.aD(!1,null,null,a)},
d8:function(a,b,c){return new P.aD(!0,a,b,c)}}},
cx:{"^":"aD;e,f,a,b,c,d",
gbG:function(){return"RangeError"},
gbF:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else{if(typeof x!=="number")return x.S()
if(typeof z!=="number")return H.i(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
q:{
im:function(a){return new P.cx(null,null,!1,null,null,a)},
bR:function(a,b,c){return new P.cx(null,null,!0,a,b,"Value not in range")},
ar:function(a,b,c,d,e){return new P.cx(b,c,!0,a,d,"Invalid value")},
cy:function(a,b,c,d,e,f){if(typeof a!=="number")return H.i(a)
if(0>a||a>c)throw H.f(P.ar(a,0,c,"start",f))
if(typeof b!=="number")return H.i(b)
if(a>b||b>c)throw H.f(P.ar(b,a,c,"end",f))
return b}}},
hz:{"^":"aD;e,j:f>,a,b,c,d",
gbG:function(){return"RangeError"},
gbF:function(){if(J.bx(this.b,0))return": index must not be negative"
var z=this.f
if(J.D(z,0))return": no indices are valid"
return": index should be less than "+H.e(z)},
q:{
bG:function(a,b,c,d,e){var z=e!=null?e:J.bh(b)
return new P.hz(b,z,!0,a,c,"Index out of range")}}},
K:{"^":"P;a",
i:function(a){return"Unsupported operation: "+this.a}},
el:{"^":"P;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.e(z):"UnimplementedError"}},
aK:{"^":"P;a",
i:function(a){return"Bad state: "+this.a}},
O:{"^":"P;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.dv(z))+"."}},
ib:{"^":"c;",
i:function(a){return"Out of Memory"},
ga9:function(){return},
$isP:1},
e1:{"^":"c;",
i:function(a){return"Stack Overflow"},
ga9:function(){return},
$isP:1},
fK:{"^":"P;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
jC:{"^":"c;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.e(z)}},
h0:{"^":"c;a,b,cd:c>",
i:function(a){var z,y
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.e(z):"FormatException"
return y}},
hB:{"^":"c;",
i:function(a){return"IntegerDivisionByZeroException"}},
fZ:{"^":"c;a,b",
i:function(a){return"Expando:"+H.e(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.C(P.d8(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.cv(b,"expando$values")
return y==null?null:H.cv(y,z)},
k:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.cv(b,"expando$values")
if(y==null){y=new P.c()
H.dX(b,"expando$values",y)}H.dX(y,z,c)}}},
h1:{"^":"c;"},
o:{"^":"B;"},
"+int":0,
Q:{"^":"c;",
ap:function(a,b){return H.bn(this,b,H.J(this,"Q",0),null)},
D:function(a,b){var z
for(z=this.gO(this);z.C();)b.$1(z.gF())},
cr:function(a,b){return P.cr(this,!0,H.J(this,"Q",0))},
bl:function(a){return this.cr(a,!0)},
gj:function(a){var z,y
z=this.gO(this)
for(y=0;z.C();)++y
return y},
a2:function(a,b){var z,y,x
if(b<0)H.C(P.ar(b,0,null,"index",null))
for(z=this.gO(this),y=0;z.C();){x=z.gF()
if(b===y)return x;++y}throw H.f(P.bG(b,this,"index",null,y))},
i:function(a){return P.dE(this,"(",")")}},
bJ:{"^":"c;"},
l:{"^":"c;",$asl:null,$isQ:1,$isx:1},
"+List":0,
i6:{"^":"c;",
i:function(a){return"null"}},
"+Null":0,
B:{"^":"c;"},
"+num":0,
c:{"^":";",
w:function(a,b){return this===b},
gG:function(a){return H.ah(this)},
i:function(a){return H.bQ(this)},
gL:function(a){return new H.ad(H.az(this),null)},
toString:function(){return this.i(this)}},
aj:{"^":"c;"},
S:{"^":"c;"},
"+String":0,
cz:{"^":"c;at:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
q:{
e2:function(a,b,c){var z=J.aU(b)
if(!z.C())return a
if(c.length===0){do a+=H.e(z.gF())
while(z.C())}else{a+=H.e(z.gF())
for(;z.C();)a=a+c+H.e(z.gF())}return a}}},
b7:{"^":"c;"}}],["","",,W,{"^":"",
dg:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.U)},
dA:function(a,b,c){return W.hx(a,null,null,b,null,null,null,c).Y(new W.hw())},
hx:function(a,b,c,d,e,f,g,h){var z,y,x
z=H.b(new P.ep(H.b(new P.a1(0,$.n,null),[W.b2])),[W.b2])
y=new XMLHttpRequest()
C.L.hj(y,"GET",a,!0)
x=H.b(new W.b8(y,"load",!1),[H.q(C.I,0)])
H.b(new W.al(0,x.a,x.b,W.a2(new W.hy(z,y)),!1),[H.q(x,0)]).a1()
x=H.b(new W.b8(y,"error",!1),[H.q(C.F,0)])
H.b(new W.al(0,x.a,x.b,W.a2(z.gfv()),!1),[H.q(x,0)]).a1()
y.send()
return z.a},
aw:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
ew:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
eA:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.jw(a)
if(!!J.j(z).$isZ)return z
return}else return a},
a2:function(a){var z=$.n
if(z===C.e)return a
return z.fm(a,!0)},
v:{"^":"bi;","%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
ll:{"^":"v;I:type%",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
ln:{"^":"v;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
lo:{"^":"h;I:type=","%":"Blob|File"},
lp:{"^":"v;",$isZ:1,$ish:1,"%":"HTMLBodyElement"},
db:{"^":"v;I:type%",
R:function(a,b){return a.disabled.$1(b)},
$isdb:1,
"%":"HTMLButtonElement"},
cj:{"^":"v;m:height%,l:width%",
cz:function(a,b,c){return a.getContext(b,P.kB(c,null))},
gfD:function(a){return a.getContext("2d")},
$iscj:1,
"%":"HTMLCanvasElement"},
fv:{"^":"h;",
fU:function(a,b,c,d,e){a.fillText(b,c,d)},
dl:function(a,b,c,d){return this.fU(a,b,c,d,null)},
"%":"CanvasRenderingContext2D"},
lt:{"^":"ag;j:length=",$ish:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
fI:{"^":"hC;j:length=",
cA:function(a,b){var z=this.eI(a,b)
return z!=null?z:""},
eI:function(a,b){if(W.dg(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.dn()+b)},
ev:function(a,b){var z,y
z=$.$get$dh()
y=z[b]
if(typeof y==="string")return y
y=W.dg(b) in a?b:P.dn()+b
z[b]=y
return y},
fa:function(a,b,c,d){a.setProperty(b,c,d)},
gm:function(a){return a.height},
gl:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hC:{"^":"h+fJ;"},
fJ:{"^":"c;",
gm:function(a){return this.cA(a,"height")},
saA:function(a,b){this.fa(a,this.ev(a,"opacity"),b,"")},
gl:function(a){return this.cA(a,"width")}},
ly:{"^":"ag;",$ish:1,"%":"DocumentFragment|ShadowRoot"},
lz:{"^":"h;",
i:function(a){return String(a)},
"%":"DOMException"},
fO:{"^":"h;",
i:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(this.gl(a))+" x "+H.e(this.gm(a))},
w:function(a,b){var z
if(b==null)return!1
z=J.j(b)
if(!z.$isai)return!1
return a.left===z.gaR(b)&&a.top===z.gaX(b)&&this.gl(a)===z.gl(b)&&this.gm(a)===z.gm(b)},
gG:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gl(a)
w=this.gm(a)
return W.ew(W.aw(W.aw(W.aw(W.aw(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gcs:function(a){return H.b(new P.a3(a.left,a.top),[null])},
gbX:function(a){return a.bottom},
gm:function(a){return a.height},
gaR:function(a){return a.left},
gcm:function(a){return a.right},
gaX:function(a){return a.top},
gl:function(a){return a.width},
gu:function(a){return a.x},
gv:function(a){return a.y},
$isai:1,
$asai:I.am,
"%":";DOMRectReadOnly"},
bi:{"^":"ag;A:id=",
gcd:function(a){return P.ip(C.d.aV(a.offsetLeft),C.d.aV(a.offsetTop),C.d.aV(a.offsetWidth),C.d.aV(a.offsetHeight),null)},
i:function(a){return a.localName},
dm:function(a){return a.focus()},
dM:function(a){return a.getBoundingClientRect()},
gdB:function(a){return H.b(new W.bX(a,"click",!1),[H.q(C.r,0)])},
$isbi:1,
$ish:1,
$isZ:1,
"%":";Element"},
lB:{"^":"v;m:height%,I:type%,l:width%","%":"HTMLEmbedElement"},
lC:{"^":"Y;an:error=","%":"ErrorEvent"},
Y:{"^":"h;I:type=",$isY:1,$isc:1,"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CrossOriginConnectEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
Z:{"^":"h;",
eq:function(a,b,c,d){return a.addEventListener(b,H.aS(c,1),!1)},
f4:function(a,b,c,d){return a.removeEventListener(b,H.aS(c,1),!1)},
$isZ:1,
"%":"CrossOriginServiceWorkerClient|Performance;EventTarget"},
lV:{"^":"v;I:type=",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLFieldSetElement"},
m_:{"^":"v;j:length=",
aU:function(a){return a.reset()},
"%":"HTMLFormElement"},
m0:{"^":"Y;A:id=","%":"GeofencingEvent"},
b2:{"^":"hv;hr:responseText=",
hH:function(a,b,c,d,e,f){return a.open(b,c,!0,f,e)},
hj:function(a,b,c,d){return a.open(b,c,d)},
bp:function(a,b){return a.send(b)},
$isb2:1,
$isc:1,
"%":"XMLHttpRequest"},
hw:{"^":"d:15;",
$1:function(a){return J.fj(a)}},
hy:{"^":"d:0;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
y=z.status
if(typeof y!=="number")return y.T()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.a
if(y)v.dh(0,z)
else v.fw(a)}},
hv:{"^":"Z;","%":";XMLHttpRequestEventTarget"},
m6:{"^":"v;m:height%,l:width%","%":"HTMLIFrameElement"},
m7:{"^":"v;m:height%,l:width%","%":"HTMLImageElement"},
m9:{"^":"v;m:height%,I:type%,l:width%",
R:function(a,b){return a.disabled.$1(b)},
$isbi:1,
$ish:1,
$isZ:1,
"%":"HTMLInputElement"},
dI:{"^":"ek;",
ghd:function(a){return a.keyCode},
$isY:1,
$isc:1,
"%":"KeyboardEvent"},
mf:{"^":"v;I:type=",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLKeygenElement"},
mg:{"^":"v;I:type%",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLLinkElement"},
i1:{"^":"v;an:error=","%":"HTMLAudioElement;HTMLMediaElement"},
mj:{"^":"Z;A:id=","%":"MediaStream"},
mk:{"^":"v;I:type%","%":"HTMLMenuElement"},
ml:{"^":"v;I:type%",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLMenuItemElement"},
dL:{"^":"ek;",
gcd:function(a){var z,y,x
if(!!a.offsetX)return H.b(new P.a3(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.j(W.eA(z)).$isbi)throw H.f(new P.K("offsetX is only supported on elements"))
y=W.eA(z)
x=H.b(new P.a3(a.clientX,a.clientY),[null]).p(0,J.fk(J.fl(y)))
return H.b(new P.a3(J.d7(x.a),J.d7(x.b)),[null])}},
$isY:1,
$isc:1,
"%":"WheelEvent;DragEvent|MouseEvent"},
mu:{"^":"h;",$ish:1,"%":"Navigator"},
ag:{"^":"Z;",
i:function(a){var z=a.nodeValue
return z==null?this.eb(a):z},
$isc:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
mv:{"^":"v;I:type%","%":"HTMLOListElement"},
mw:{"^":"v;m:height%,I:type%,l:width%","%":"HTMLObjectElement"},
my:{"^":"v;",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLOptGroupElement"},
mz:{"^":"v;",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLOptionElement"},
mA:{"^":"v;I:type=","%":"HTMLOutputElement"},
mC:{"^":"dL;m:height=,l:width=","%":"PointerEvent"},
dY:{"^":"Y;",$isY:1,$isc:1,"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
mI:{"^":"h;m:height=,l:width=","%":"Screen"},
mJ:{"^":"v;I:type%","%":"HTMLScriptElement"},
mL:{"^":"v;j:length=,I:type=",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLSelectElement"},
mN:{"^":"v;I:type%","%":"HTMLSourceElement"},
mO:{"^":"Y;an:error=","%":"SpeechRecognitionError"},
mP:{"^":"v;I:type%",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLStyleElement"},
mT:{"^":"v;I:type=",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLTextAreaElement"},
mU:{"^":"h;l:width=","%":"TextMetrics"},
ek:{"^":"Y;","%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
n4:{"^":"i1;m:height%,l:width%","%":"HTMLVideoElement"},
j1:{"^":"Z;",
bP:function(a,b){return a.requestAnimationFrame(H.aS(b,1))},
bE:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$ish:1,
$isZ:1,
"%":"DOMWindow|Window"},
na:{"^":"h;bX:bottom=,m:height=,aR:left=,cm:right=,aX:top=,l:width=",
i:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(a.width)+" x "+H.e(a.height)},
w:function(a,b){var z,y,x
if(b==null)return!1
z=J.j(b)
if(!z.$isai)return!1
y=a.left
x=z.gaR(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaX(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gm(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gG:function(a){var z,y,x,w
z=J.V(a.left)
y=J.V(a.top)
x=J.V(a.width)
w=J.V(a.height)
return W.ew(W.aw(W.aw(W.aw(W.aw(0,z),y),x),w))},
gcs:function(a){return H.b(new P.a3(a.left,a.top),[null])},
$isai:1,
$asai:I.am,
"%":"ClientRect"},
nb:{"^":"ag;",$ish:1,"%":"DocumentType"},
nc:{"^":"fO;",
gm:function(a){return a.height},
gl:function(a){return a.width},
gu:function(a){return a.x},
gv:function(a){return a.y},
"%":"DOMRect"},
ne:{"^":"v;",$isZ:1,$ish:1,"%":"HTMLFrameSetElement"},
nf:{"^":"hE;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.bG(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.f(new P.K("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.f(new P.K("Cannot resize immutable List."))},
a2:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.ag]},
$isx:1,
$isb4:1,
$asb4:function(){return[W.ag]},
$isaf:1,
$asaf:function(){return[W.ag]},
"%":"MozNamedAttrMap|NamedNodeMap"},
hD:{"^":"h+bL;",$isl:1,
$asl:function(){return[W.ag]},
$isx:1},
hE:{"^":"hD+dB;",$isl:1,
$asl:function(){return[W.ag]},
$isx:1},
aF:{"^":"c;a"},
b8:{"^":"ak;a,b,c",
ad:function(a,b,c,d){var z=new W.al(0,this.a,this.b,W.a2(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.a1()
return z},
c9:function(a,b,c){return this.ad(a,null,b,c)}},
bX:{"^":"b8;a,b,c"},
al:{"^":"iB;a,b,c,d,e",
bd:function(){if(this.b==null)return
this.d7()
this.b=null
this.d=null
return},
aS:function(a,b){if(this.b==null)return;++this.a
this.d7()},
ce:function(a){return this.aS(a,null)},
cl:function(){if(this.b==null||this.a<=0)return;--this.a
this.a1()},
a1:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.f3(x,this.c,z,!1)}},
d7:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.f4(x,this.c,z,!1)}}},
dB:{"^":"c;",
gO:function(a){return H.b(new W.h_(a,a.length,-1,null),[H.J(a,"dB",0)])},
t:function(a,b){throw H.f(new P.K("Cannot add to immutable List."))},
a4:function(a){throw H.f(new P.K("Cannot remove from immutable List."))},
$isl:1,
$asl:null,
$isx:1},
h_:{"^":"c;a,b,c,d",
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
gF:function(){return this.d}},
jv:{"^":"c;a",$isZ:1,$ish:1,q:{
jw:function(a){if(a===window)return a
else return new W.jv(a)}}}}],["","",,P,{"^":""}],["","",,P,{"^":"",lk:{"^":"aG;",$ish:1,"%":"SVGAElement"},lm:{"^":"p;",$ish:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},lu:{"^":"dy;X:r=","%":"SVGCircleElement"},lD:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEBlendElement"},lE:{"^":"p;I:type=,m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEColorMatrixElement"},lF:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEComponentTransferElement"},lG:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFECompositeElement"},lH:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEConvolveMatrixElement"},lI:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEDiffuseLightingElement"},lJ:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEDisplacementMapElement"},lK:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEFloodElement"},lL:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEGaussianBlurElement"},lM:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEImageElement"},lN:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEMergeElement"},lO:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEMorphologyElement"},lP:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFEOffsetElement"},lQ:{"^":"p;u:x=,v:y=","%":"SVGFEPointLightElement"},lR:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFESpecularLightingElement"},lS:{"^":"p;u:x=,v:y=","%":"SVGFESpotLightElement"},lT:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFETileElement"},lU:{"^":"p;I:type=,m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFETurbulenceElement"},lW:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGFilterElement"},lZ:{"^":"aG;m:height=,l:width=,u:x=,v:y=","%":"SVGForeignObjectElement"},dy:{"^":"aG;","%":"SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aG:{"^":"p;",$ish:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},m8:{"^":"aG;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGImageElement"},mh:{"^":"p;",$ish:1,"%":"SVGMarkerElement"},mi:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGMaskElement"},mB:{"^":"p;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGPatternElement"},mF:{"^":"jR;X:r=","%":"SVGRadialGradientElement"},mG:{"^":"h;m:height=,l:width=,u:x=,v:y=","%":"SVGRect"},mH:{"^":"dy;m:height=,l:width=,u:x=,v:y=","%":"SVGRectElement"},mK:{"^":"p;I:type%",$ish:1,"%":"SVGScriptElement"},mQ:{"^":"p;I:type%",
R:function(a,b){return a.disabled.$1(b)},
"%":"SVGStyleElement"},p:{"^":"bi;",
dm:function(a){return a.focus()},
gdB:function(a){return H.b(new W.bX(a,"click",!1),[H.q(C.r,0)])},
$isZ:1,
$ish:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGTitleElement;SVGElement"},mR:{"^":"aG;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGSVGElement"},mS:{"^":"p;",$ish:1,"%":"SVGSymbolElement"},e4:{"^":"aG;","%":";SVGTextContentElement"},mV:{"^":"e4;",$ish:1,"%":"SVGTextPathElement"},mW:{"^":"e4;u:x=,v:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},n1:{"^":"aG;m:height=,l:width=,u:x=,v:y=",$ish:1,"%":"SVGUseElement"},n5:{"^":"p;",$ish:1,"%":"SVGViewElement"},jR:{"^":"p;",$ish:1,"%":"SVGLinearGradientElement;SVGGradientElement"},ng:{"^":"p;",$ish:1,"%":"SVGCursorElement"},nh:{"^":"p;",$ish:1,"%":"SVGFEDropShadowElement"},ni:{"^":"p;",$ish:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",ci:{"^":"h;",$isc:1,"%":"WebGLBuffer"},bT:{"^":"h;",
fl:function(a,b,c){return a.bindBuffer(b,c)},
fs:function(a,b){return a.clear(b)},
ft:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
fH:function(a){return a.createBuffer()},
fI:function(a){return a.createProgram()},
fJ:function(a,b){return a.createShader(b)},
dN:function(a,b,c){return a.getUniformLocation(b,c)},
hw:function(a,b){return a.useProgram(b)},
$isbT:1,
"%":"WebGLRenderingContext"},iy:{"^":"h;",$isiy:1,$isc:1,"%":"WebGLShader"}}],["","",,P,{"^":""}],["","",,P,{"^":"",ls:{"^":"c;"}}],["","",,P,{"^":"",
b9:function(a,b){if(typeof b!=="number")return H.i(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
ev:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
c5:function(a,b){if(typeof b!=="number")throw H.f(P.a7(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.d.gdu(b)||isNaN(b))return b
return a}return a},
bv:function(a,b){if(typeof a!=="number")throw H.f(P.a7(a))
if(typeof b!=="number")throw H.f(P.a7(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.a.gdu(a))return b
return a},
il:function(a){return C.v},
jV:{"^":"c;",
dz:function(a){if(a<=0||a>4294967296)throw H.f(P.im("max must be in range 0 < max \u2264 2^32, was "+H.e(a)))
return Math.random()*a>>>0},
cb:function(){return Math.random()}},
a3:{"^":"c;u:a>,v:b>",
i:function(a){return"Point("+H.e(this.a)+", "+H.e(this.b)+")"},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.a3))return!1
return J.D(this.a,b.a)&&J.D(this.b,b.b)},
gG:function(a){var z,y
z=J.V(this.a)
y=J.V(this.b)
return P.ev(P.b9(P.b9(0,z),y))},
B:function(a,b){var z=J.k(b)
z=new P.a3(J.u(this.a,z.gu(b)),J.u(this.b,z.gv(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
p:function(a,b){var z=J.k(b)
z=new P.a3(J.a6(this.a,z.gu(b)),J.a6(this.b,z.gv(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
E:function(a,b){var z=new P.a3(J.E(this.a,b),J.E(this.b,b))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
k5:{"^":"c;",
gcm:function(a){return J.u(this.a,this.c)},
gbX:function(a){return J.u(this.b,this.d)},
i:function(a){return"Rectangle ("+H.e(this.a)+", "+H.e(this.b)+") "+H.e(this.c)+" x "+H.e(this.d)},
w:function(a,b){var z,y,x,w,v
if(b==null)return!1
z=J.j(b)
if(!z.$isai)return!1
y=this.a
x=J.j(y)
if(x.w(y,z.gaR(b))){w=this.b
v=J.j(w)
z=v.w(w,z.gaX(b))&&J.D(x.B(y,this.c),z.gcm(b))&&J.D(v.B(w,this.d),z.gbX(b))}else z=!1
return z},
gG:function(a){var z,y,x,w,v,u
z=this.a
y=J.j(z)
x=y.gG(z)
w=this.b
v=J.j(w)
u=v.gG(w)
z=J.V(y.B(z,this.c))
w=J.V(v.B(w,this.d))
return P.ev(P.b9(P.b9(P.b9(P.b9(0,x),u),z),w))},
gcs:function(a){var z=new P.a3(this.a,this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
ai:{"^":"k5;aR:a>,aX:b>,l:c>,m:d>",$asai:null,q:{
ip:function(a,b,c,d,e){var z,y
z=J.y(c)
z=z.V(c,0)?J.E(z.bn(c),0):c
y=J.y(d)
return H.b(new P.ai(a,b,z,y.V(d,0)?J.E(y.bn(d),0):d),[e])}}}}],["","",,H,{"^":"",
m:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(P.a7("Invalid length "+H.e(a)))
return a},
eB:function(a){var z,y,x
if(!!J.j(a).$isaf)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
i4:function(a){return new Int8Array(H.eB(a))},
dM:{"^":"h;",
gL:function(a){return C.a_},
$isdM:1,
"%":"ArrayBuffer"},
bO:{"^":"h;",$isbO:1,"%":";ArrayBufferView;cs|dN|dP|ct|dO|dQ|ao"},
mm:{"^":"bO;",
gL:function(a){return C.a0},
"%":"DataView"},
cs:{"^":"bO;",
gj:function(a){return a.length},
$isb4:1,
$asb4:I.am,
$isaf:1,
$asaf:I.am},
ct:{"^":"dP;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
return a[b]},
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
a[b]=c}},
dN:{"^":"cs+bL;",$isl:1,
$asl:function(){return[P.X]},
$isx:1},
dP:{"^":"dN+dx;"},
ao:{"^":"dQ;",
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
a[b]=c},
$isl:1,
$asl:function(){return[P.o]},
$isx:1},
dO:{"^":"cs+bL;",$isl:1,
$asl:function(){return[P.o]},
$isx:1},
dQ:{"^":"dO+dx;"},
i3:{"^":"ct;",
gL:function(a){return C.a1},
$isl:1,
$asl:function(){return[P.X]},
$isx:1,
"%":"Float32Array"},
mn:{"^":"ct;",
gL:function(a){return C.a2},
$isl:1,
$asl:function(){return[P.X]},
$isx:1,
"%":"Float64Array"},
mo:{"^":"ao;",
gL:function(a){return C.a3},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isx:1,
"%":"Int16Array"},
mp:{"^":"ao;",
gL:function(a){return C.a4},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isx:1,
"%":"Int32Array"},
mq:{"^":"ao;",
gL:function(a){return C.a5},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isx:1,
"%":"Int8Array"},
mr:{"^":"ao;",
gL:function(a){return C.a9},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isx:1,
"%":"Uint16Array"},
i5:{"^":"ao;",
gL:function(a){return C.aa},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isx:1,
"%":"Uint32Array"},
ms:{"^":"ao;",
gL:function(a){return C.ab},
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isx:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
mt:{"^":"ao;",
gL:function(a){return C.ac},
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.I(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isx:1,
"%":";Uint8Array"}}],["","",,H,{"^":"",
kZ:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,S,{"^":"",
cl:function(a){var z,y
z=$.$get$ck().h(0,a)
if(z==null){z=new S.dd(0,0)
y=$.de
z.a=y
$.de=y<<1>>>0
y=$.df
$.df=y+1
z.b=y
$.$get$ck().k(0,a,z)}return z},
bP:function(a,b){var z,y,x
z=$.$get$R().h(0,a)
if(null==z){y=new Array(16)
y.fixed$length=Array
z=H.b(new S.G(y,0),[null])
$.$get$R().k(0,a,z)}x=J.aB(z)
return null==x?b.$0():x},
aW:{"^":"c;a,b,c",
ff:function(a,b){var z={}
z.a=a
C.c.D(b,new S.fr(z))
return z.a},
q:{
a8:function(a){var z=new S.aW(0,0,0)
z.a=z.ff(0,a)
return z}}},
fr:{"^":"d:0;a",
$1:function(a){var z=this.a
z.a=(z.a|S.cl(a).gde())>>>0}},
bD:{"^":"c;",
d_:function(){}},
aq:{"^":"fH;",
d_:function(){this.hg()}},
fH:{"^":"bD+dT;"},
fD:{"^":"aI;b,c,a",
H:function(){},
f3:function(a){this.eH(a,new S.fE(a))
a.sd5(0)},
eH:function(a,b){var z,y,x,w
z=a.gd5()
for(y=this.b,x=0;z>0;){if((z&1)===1){w=y.a
if(x>=w.length)return H.a(w,x)
b.$2(w[x],x)}++x
z=z>>>1}},
aL:function(a){return this.c.t(0,a)},
fq:function(){this.c.D(0,new S.fF(this))
var z=this.c
z.c.bq(0)
z.d=!0}},
fE:{"^":"d:3;a",
$2:function(a,b){var z,y,x
z=this.a
y=J.k(z)
x=J.M(a)
x.h(a,y.gA(z)).d_()
x.k(a,y.gA(z),null)}},
fF:{"^":"d:0;a",
$1:function(a){return this.a.f3(a)}},
dd:{"^":"c;a,b",
gde:function(){return this.a},
gA:function(a){return this.b}},
an:{"^":"c;A:a>,fe:b?,d5:c@,bS:d<,bU:e?,f,r",
f6:function(a){this.d=(this.d&J.f0(a))>>>0},
i:function(a){return"Entity["+H.e(this.a)+"]"},
fL:function(){this.e.e.t(0,this)
return}},
fV:{"^":"aI;b,c,d,e,f,r,x,y,a",
H:function(){},
bV:function(a){++this.e;++this.f
this.b.k(0,J.N(a),a)},
c3:function(a){this.d.k(0,J.N(a),!1)},
R:function(a,b){this.d.k(0,J.N(b),!0)},
aL:function(a){var z=J.k(a)
this.b.k(0,z.gA(a),null)
this.d.k(0,z.gA(a),!1)
this.c.t(0,a);--this.e;++this.x}},
jT:{"^":"c;a,b",
fp:function(){var z=this.a
if(J.c9(z.b,0))return z.a4(0)
return this.b++}},
b0:{"^":"c;bU:b?,eY:x?",
ghk:function(){return this.x},
gdP:function(){return this.y},
aB:function(){if(this.ax())this.bj(this.c)},
H:["aa",function(){}],
bA:function(a){var z,y,x,w
if(this.r)return
z=J.c7(this.a,a.gbS())===this.a
y=this.d
x=a.c
w=(y&x)>>>0===y
y=this.f
if(typeof y!=="number")return y.S()
if(y>0&&w)w=(y&x)>0
y=this.e
if(y>0&&w)w=(y&x)===0
if(w&&!z){this.c.t(0,a)
y=this.a
x=a.d
if(typeof y!=="number")return H.i(y)
a.d=(x|y)>>>0}else if(!w&&z)this.bO(a)},
bO:function(a){var z,y,x
z=this.c
y=z.c
x=J.k(a)
y.h(0,x.gA(a))
y.k(0,x.gA(a),!1)
z.d=!0
a.f6(this.a)},
bV:function(a){return this.bA(a)},
bZ:function(a){return this.bA(a)},
c3:function(a){return this.bA(a)},
aL:function(a){if(J.c7(this.a,a.gbS())===this.a)this.bO(a)},
R:function(a,b){if(J.c7(this.a,b.gbS())===this.a)this.bO(b)},
P:function(a){var z,y,x
this.r=this.d===0&&this.f===0
z=new H.ad(H.az(this),null)
y=$.cP
if(null==y){y=H.b(new H.T(0,null,null,null,null,null,0),[P.b7,P.o])
$.cP=y}x=y.h(0,z)
if(x==null){y=$.ez
x=C.a.av(1,y)
$.ez=y+1
$.cP.k(0,z,x)}this.a=x}},
aI:{"^":"c;bU:a?",
H:["ed",function(){}],
bV:function(a){},
bZ:function(a){},
aL:function(a){},
R:function(a,b){},
c3:function(a){}},
cA:{"^":"aI;b,c,a",
as:function(a){return this.b.h(0,a)},
aL:function(a){var z=this.c.aq(0,a)
if(z!=null)this.b.aq(0,z)}},
z:{"^":"fG;a,b"},
fG:{"^":"c;",
h:function(a,b){return J.w(this.b,J.N(b))},
K:function(a,b,c){var z,y,x,w
z=S.cl(a)
this.a=z
y=b.b
x=J.N(z)
y=y.b
y.cS(x)
z=y.a
if(x>>>0!==x||x>=z.length)return H.a(z,x)
w=z[x]
if(w==null){z=new Array(16)
z.fixed$length=Array
w=H.b(new S.G(z,0),[S.bD])
y.k(0,x,w)}this.b=w}},
b_:{"^":"b0;",
bj:function(a){return a.D(0,new S.fW(this))},
ax:function(){return!0}},
fW:{"^":"d:0;a",
$1:function(a){return this.a.aC(a)}},
bq:{"^":"b0;",
bj:function(a){return this.aT()},
ax:function(){return!0}},
G:{"^":"dS;a,b",
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
gaE:function(a){return this.b},
a4:["e7",function(a){var z,y,x
if(J.c9(this.b,0)){z=this.a
y=J.a6(this.b,1)
this.b=y
if(y>>>0!==y||y>=z.length)return H.a(z,y)
x=z[y]
y=this.a
z=this.gaE(this)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y[z]=null
return x}return}],
t:["e6",function(a,b){var z,y
if(J.D(this.b,this.a.length))this.bH(C.a.N(this.a.length*3,2)+1)
z=this.a
y=this.b
this.b=J.u(y,1)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=b}],
k:function(a,b,c){var z=J.y(b)
if(z.T(b,this.a.length))this.bH(z.E(b,2))
if(J.f_(this.b,b))this.b=z.B(b,1)
z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c},
bH:function(a){var z,y
z=this.a
if(typeof a!=="number")return H.i(a)
y=new Array(a)
y.fixed$length=Array
y=H.b(y,[H.J(this,"G",0)])
this.a=y
C.c.e_(y,0,z.length,z)},
cS:function(a){var z=J.y(a)
if(z.T(a,this.a.length))this.bH(z.E(a,2))},
gO:function(a){var z=C.c.cF(this.a,0,this.gaE(this))
return H.b(new J.ce(z,z.length,0,null),[H.q(z,0)])},
gj:function(a){return this.gaE(this)},
$isQ:1},
dS:{"^":"c+dF;"},
F:{"^":"G;c,d,a,b",
t:function(a,b){var z,y
if(this.d)this.ba()
z=J.k(b)
y=this.c
if(J.eZ(z.gA(b),y.c))y.bq(J.u(J.aA(J.E(z.gA(b),3),2),1))
if(y.h(0,z.gA(b)))return
y.k(0,z.gA(b),!0)
this.e6(this,b)},
a4:function(a){var z=this.e7(this)
this.c.k(0,J.N(z),!1)
this.d=!0
return z},
gaE:function(a){if(this.d)this.ba()
return this.b},
gO:function(a){var z
if(this.d)this.ba()
z=this.a
if(this.d)this.ba()
z=C.c.cF(z,0,this.b)
return H.b(new J.ce(z,z.length,0,null),[H.q(z,0)])},
ba:function(){var z,y,x
z={}
y=this.c.di(!0)
this.b=y
if(typeof y!=="number")return H.i(y)
y=new Array(y)
y.fixed$length=Array
x=H.b(y,[S.an])
if(J.c9(this.b,0)){z.a=0
y=this.a
y=H.b(new H.iK(y,new S.fS(z,this)),[H.q(y,0)])
H.b(new H.en(y,new S.fT(this)),[H.J(y,"Q",0)]).D(0,new S.fU(z,x))}this.a=x
this.d=!1},
$asG:function(){return[S.an]},
$asdS:function(){return[S.an]}},
fS:{"^":"d:0;a,b",
$1:function(a){var z,y
z=this.a.a
y=this.b.b
if(typeof y!=="number")return H.i(y)
return z<y}},
fT:{"^":"d:0;a",
$1:function(a){return this.a.c.h(0,J.N(a))}},
fU:{"^":"d:0;a,b",
$1:function(a){var z,y
z=this.b
y=this.a.a++
if(y>=z.length)return H.a(z,y)
z[y]=a
return a}},
dT:{"^":"c;",
hg:function(){J.f5($.$get$R().h(0,new H.ad(H.az(this),null)),this)}},
j2:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
H:function(){this.Q.D(0,new S.j9(this))
C.c.D(this.y,new S.ja(this))},
aK:function(a){this.z.k(0,new H.ad(H.az(a),null),a)
this.Q.t(0,a)
a.a=this},
c1:function(a){var z,y,x
z=this.a
y=z.c.a4(0)
if(null==y){x=z.a
y=new S.an(z.y.fp(),0,0,0,x,null,null)
y.f=x.a
y.r=x.b}++z.r
z=$.du
$.du=z+1
y.sfe(z)
C.c.D(a,new S.j8(y))
return y},
as:function(a){var z=this.a.b.a
if(a>>>0!==a||a>=z.length)return H.a(z,a)
return z[a]},
fj:function(a,b,c){a.sbU(this)
a.seY(!1)
a.y=b
this.x.k(0,new H.ad(H.az(a),null),a)
this.y.push(a)
this.cy.dD(b,new S.j6())
this.cx.dD(b,new S.j7())
return a},
fi:function(a,b){return this.fj(a,b,!1)},
aG:function(a,b){a.D(0,new S.j5(this,b))
a.c.bq(0)
a.d=!0},
dC:function(a){var z=this.cx
z.k(0,a,J.u(z.h(0,a),1))
z=this.cy
z.k(0,a,J.u(z.h(0,a),this.ch))
this.ho()
z=this.y
H.b(new H.en(z,new S.jg(a)),[H.q(z,0)]).D(0,new S.jh())},
aB:function(){return this.dC(0)},
ho:function(){this.aG(this.c,new S.jb())
this.aG(this.d,new S.jc())
this.aG(this.r,new S.jd())
this.aG(this.f,new S.je())
this.aG(this.e,new S.jf())
this.b.fq()},
h:function(a,b){return this.db.h(0,b)},
k:function(a,b,c){this.db.k(0,b,c)}},
j9:{"^":"d:0;a",
$1:function(a){return a.H()}},
ja:{"^":"d:0;a",
$1:function(a){return a.H()}},
j8:{"^":"d:0;a",
$1:function(a){var z,y,x,w,v,u
z=this.a
y=z.r
x=S.cl(J.cb(a))
w=J.N(x)
y=y.b
y.cS(w)
v=y.a
if(w>>>0!==w||w>=v.length)return H.a(v,w)
u=v[w]
if(u==null){v=new Array(16)
v.fixed$length=Array
u=H.b(new S.G(v,0),[S.bD])
y.k(0,w,u)}J.f2(u,z.a,a)
y=x.gde()
z.c=(z.c|y)>>>0
return}},
j6:{"^":"d:1;",
$0:function(){return 0}},
j7:{"^":"d:1;",
$0:function(){return 0}},
j5:{"^":"d:0;a,b",
$1:function(a){var z,y
z=this.a
y=this.b
z.Q.D(0,new S.j3(y,a))
C.c.D(z.y,new S.j4(y,a))}},
j3:{"^":"d:0;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
j4:{"^":"d:0;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
jg:{"^":"d:0;a",
$1:function(a){return a.ghk()!==!0&&J.D(a.y,this.a)}},
jh:{"^":"d:0;",
$1:function(a){a.aB()}},
jb:{"^":"d:3;",
$2:function(a,b){return a.bV(b)}},
jc:{"^":"d:3;",
$2:function(a,b){return a.bZ(b)}},
jd:{"^":"d:3;",
$2:function(a,b){return J.fc(a,b)}},
je:{"^":"d:3;",
$2:function(a,b){return a.c3(b)}},
jf:{"^":"d:3;",
$2:function(a,b){return a.aL(b)}}}],["","",,L,{"^":"",
kl:function(a,b,c){var z=new Array(2)
z[0]=W.dA("packages/"+a+"/assets/shader/"+b+".vert",null,null)
z[1]=W.dA("packages/"+a+"/assets/shader/"+c+".frag",null,null)
return P.cm(z,null,!1).Y(new L.km())},
hp:{"^":"c;a,b"},
km:{"^":"d:0;",
$1:function(a){var z=J.M(a)
return new L.iz(z.h(a,0),z.h(a,1))}},
iz:{"^":"c;hx:a<,fS:b<"},
hr:{"^":"b_;",
H:["ea",function(){var z=H.b(new W.b8(window,"keydown",!1),[H.q(C.G,0)])
H.b(new W.al(0,z.a,z.b,W.a2(new L.hs(this)),!1),[H.q(z,0)]).a1()
z=H.b(new W.b8(window,"keyup",!1),[H.q(C.H,0)])
H.b(new W.al(0,z.a,z.b,W.a2(new L.ht(this)),!1),[H.q(z,0)]).a1()}],
c5:["e9",function(a,b){this.Q.k(0,J.d5(a),b)
if(!b&&this.ch.h(0,a.keyCode)===!0)this.ch.k(0,a.keyCode,!1)
if(this.z.az(0,a.keyCode))a.preventDefault()}],
ac:function(a){return this.Q.h(0,a)===!0&&this.ch.h(0,a)!==!0}},
hs:{"^":"d:0;a",
$1:function(a){return this.a.c5(a,!0)}},
ht:{"^":"d:0;a",
$1:function(a){return this.a.c5(a,!1)}},
fu:{"^":"bq;z,Q,a,b,c,d,e,f,r,x,y",
aT:function(){var z,y
z=this.z
y=J.d4(z)
y.fillStyle=this.Q
y.clearRect(0,0,z.width,z.height)}},
iZ:{"^":"bq;z,a,b,c,d,e,f,r,x,y",
H:function(){J.f8(this.z,0,0,0,1)},
aT:function(){J.f7(this.z,16640)}},
cG:{"^":"c;U:b$@,b_:c$*,bg:d$@,c7:e$@,b0:r$@",
h4:function(){this.eB(this.cP(35633,this.gb_(this).ghx()),this.cP(35632,this.gb_(this).gfS()))},
eB:function(a,b){var z=this.z
this.sU(J.fa(z))
z.attachShader(this.gU(),a)
z.attachShader(this.gU(),b)
z.linkProgram(this.gU())
if(z.getProgramParameter(this.gU(),35714)!==!0){P.bw(H.e(new H.ad(H.az(this),null))+" - Error linking program: "+H.e(z.getProgramInfoLog(this.gU())))
this.sb0(!1)}},
cP:function(a,b){var z,y
z=this.z
y=J.fb(z,a)
z.shaderSource(y,b)
z.compileShader(y)
if(z.getShaderParameter(y,35713)!==!0){P.bw(H.e(new H.ad(H.az(this),null))+" - Error compiling shader: "+H.e(z.getShaderInfoLog(y)))
this.sb0(!1)}return y},
bY:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(null==this.gbg()){z=this.z
this.sbg(J.f9(z))
this.sc7(z.createBuffer())}z=this.z
J.f6(z,34962,this.gbg())
z.bufferData(34962,b,35048)
for(y=a.length,x=0,w=0;v=a.length,w<v;v===y||(0,H.bg)(a),++w)x+=a[w].b
for(y=4*x,u=0,w=0;w<a.length;a.length===v||(0,H.bg)(a),++w){t=a[w]
s=z.getAttribLocation(this.gU(),t.a)
r=t.b
z.vertexAttribPointer(s,r,5126,!1,y,4*u)
z.enableVertexAttribArray(s)
u+=r}z.bindBuffer(34963,this.gc7())
z.bufferData(34963,c,35048)}},
bA:{"^":"c;a,b"},
cH:{"^":"fX;",
H:["bt",function(){this.h4()}],
bj:function(a){var z,y,x
z={}
y=a.gaE(a)
x=J.y(y)
if(x.S(y,0)){J.fq(this.z,this.gU())
if(x.S(y,this.Q)){this.ct(y)
this.Q=y}z.a=0
a.D(0,new L.j_(z,this))
this.ck(y)}},
ax:function(){return this.gb0()}},
fX:{"^":"b0+cG;U:b$@,b_:c$*,bg:d$@,c7:e$@,b0:r$@",$iscG:1},
j_:{"^":"d:0;a,b",
$1:function(a){this.b.cg(this.a.a++,a)}},
h7:{"^":"c;",
eQ:function(){return this.er().Y(new L.he(this)).Y(new L.hf(this)).Y(new L.hg(this))},
er:function(){var z=H.b([],[P.aa])
return P.cm(z,null,!1).Y(new L.hb(this))},
eR:function(){var z,y,x,w,v,u,t,s,r
z=H.a5(this.y.z.h(0,C.j),"$iscA")
y=F.ii(0,0,0)
x=S.bP(C.m,F.lb())
w=new T.H(new Float32Array(H.m(3)))
w.ag(0,0,800)
x.sn(w)
v=S.bP(C.n,F.lc())
u=F.hu()
v.sa5(u.a)
v.saO(u.b)
t=S.bP(C.l,F.l9())
t.sdd(1256.6370614359173)
t.a=20
s=S.bP(C.p,F.l1())
w=this.y
r=w.c1([y,x,v,t,s])
w.c.t(0,r)
z.b.k(0,"player",r)
z.c.k(0,r,"player")
return this.h5().Y(new L.hd(this))},
bs:function(a){this.eQ().Y(new L.hn(this))},
hn:[function(){var z,y,x
z=window.performance.now()
y=this.y
x=this.cx
if(typeof z!=="number")return z.p()
if(typeof x!=="number")return H.i(x)
y.ch=(z-x)/1000
this.cx=z
y.dC(1)
if(!this.db)P.h2(P.dq(0,0,0,5,0,0),this.ghm(),null)},"$0","ghm",0,0,2],
hC:[function(a){var z
this.ch=J.c8(a,1000)
z=this.y
z.ch=0.016666666666666666
z.aB()
z=window
C.k.bE(z)
C.k.bP(z,W.a2(new L.hc(this)))},"$1","geG",2,0,16],
dI:function(a){var z,y
z=P.c5(0.05,J.a6(a,this.ch))
y=this.y
y.ch=z
this.ch=a
y.aB()
if(!this.db){y=window
C.k.bE(y)
C.k.bP(y,W.a2(new L.ho(this)))}},
hG:[function(a){var z,y
z=!this.cy
this.cy=z
y=this.a
if(z){z=J.k(y)
z.sl(y,window.screen.width)
z.sm(y,window.screen.height)}else{z=J.k(y)
z.sl(y,this.f)
z.sm(y,this.r)}z=J.k(y)
this.c6(z.gl(y),z.gm(y))},"$1","geO",2,0,17],
h5:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=[]
y=D.A(16,!1)
x=new Array(16)
x.fixed$length=Array
x=new F.iR(null,null,0,100,0,null,new S.F(y,!1,x,0),0,0,0,null,null,null)
x.P(new S.aW(0,0,0))
y=D.A(16,!1)
w=new Array(16)
w.fixed$length=Array
w=new F.i9(null,null,null,1,0,null,new S.F(y,!1,w,0),0,0,0,null,null,null)
w.P(new S.aW(0,0,0))
y=D.A(16,!1)
v=new Array(16)
v.fixed$length=Array
v=new F.iW(0,null,new S.F(y,!1,v,0),0,0,0,null,null,null)
v.P(new S.aW(0,0,0))
y=H.b(new P.a3(0,0),[P.X])
u=S.a8([C.p])
t=P.hW([38,40,37,39,32],null)
s=D.A(16,!1)
r=new Array(16)
r.fixed$length=Array
r=new F.hA(null,null,null,null,y,t,P.bm(P.o,P.bt),P.bm(P.o,P.bt),0,null,new S.F(s,!1,r,0),u.a,u.b,u.c,null,null,null)
r.P(u)
u=S.a8([C.b,C.m])
s=D.A(16,!1)
t=new Array(16)
t.fixed$length=Array
t=new F.i2(null,null,0,null,new S.F(s,!1,t,0),u.a,u.b,u.c,null,null,null)
t.P(u)
u=S.a8([C.b,C.m])
s=D.A(16,!1)
y=new Array(16)
y.fixed$length=Array
y=new F.id(null,null,0,null,new S.F(s,!1,y,0),u.a,u.b,u.c,null,null,null)
y.P(u)
u=S.a8([C.n,C.l])
s=D.A(16,!1)
q=new Array(16)
q.fixed$length=Array
q=new F.e0(null,null,!1,3,0,0,null,new S.F(s,!1,q,0),u.a,u.b,u.c,null,null,null)
q.P(u)
u=this.b
s=D.A(16,!1)
p=new Array(16)
p.fixed$length=Array
p=new L.iZ(u,0,null,new S.F(s,!1,p,0),0,0,0,null,null,null)
p.P(new S.aW(0,0,0))
s=S.a8([C.i,C.b,C.o])
o=D.A(16,!1)
n=new Array(16)
n.fixed$length=Array
n=new F.i8(null,null,null,null,null,null,6,120,null,u,0,null,null,null,null,null,P.bm(P.S,P.ci),!0,0,null,new S.F(o,!1,n,0),s.a,s.b,s.c,null,null,null)
n.P(s)
n.dy=[new L.bA("aPos",3),new L.bA("aColor",3)]
s=S.a8([C.b,C.q])
o=D.A(16,!1)
m=new Array(16)
m.fixed$length=Array
m=new F.iQ(null,null,null,null,null,3,128,null,u,0,null,null,null,null,null,P.bm(P.S,P.ci),!0,0,null,new S.F(o,!1,m,0),s.a,s.b,s.c,null,null,null)
m.P(s)
m.dx=[new L.bA("aPos",3)]
s=S.a8([C.b,C.n,C.l])
o=D.A(16,!1)
l=new Array(16)
l.fixed$length=Array
l=new F.ie(null,null,null,null,null,null,3,null,u,0,null,null,null,null,null,P.bm(P.S,P.ci),!0,0,null,new S.F(o,!1,l,0),s.a,s.b,s.c,null,null,null)
l.P(s)
l.dy=[new L.bA("aPos",3)]
s=S.a8([C.b])
o=D.A(16,!1)
u=new Array(16)
u.fixed$length=Array
u=new F.fL(null,null,0,null,new S.F(o,!1,u,0),s.a,s.b,s.c,null,null,null)
u.P(s)
s=this.dx
o=D.A(16,!1)
k=new Array(16)
k.fixed$length=Array
k=new L.fu(s,"white",0,null,new S.F(o,!1,k,0),0,0,0,null,null,null)
k.P(new S.aW(0,0,0))
o=this.dx
s=S.a8([C.p,C.b])
j=D.A(16,!1)
i=new Array(16)
i.fixed$length=Array
i=new F.fN(null,null,o,0,null,new S.F(j,!1,i,0),s.a,s.b,s.c,null,null,null)
i.P(s)
s=S.a8([C.i,C.b])
j=D.A(16,!1)
o=new Array(16)
o.fixed$length=Array
o=new F.i7(null,null,null,null,null,null,0,null,new S.F(j,!1,o,0),s.a,s.b,s.c,null,null,null)
o.P(s)
P.ab([0,[x,w,v,r,t,y,q,p,n,m,l,u,k,i],1,[o]]).D(0,new L.hk(this,z))
return P.cm(z,null,!1)},
ej:function(a,b,c,d,e,f,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.a
y=J.k(z)
y.sl(z,c)
y.sm(z,d)
H.a5(this.b,"$isbT").enable(2929)
y=H.a5(this.b,"$isbT")
y.enable(3042)
y.blendFunc(770,771)
z=H.b(new W.bX(z,"webkitfullscreenchange",!1),[H.q(C.K,0)])
H.b(new W.al(0,z.a,z.b,W.a2(this.geO()),!1),[H.q(z,0)]).a1()
z=new Array(16)
z.fixed$length=Array
z=H.b(new S.G(z,0),[S.an])
y=new Array(16)
y.fixed$length=Array
y=H.b(new S.G(y,0),[S.an])
x=new Array(16)
x.fixed$length=Array
x=H.b(new S.G(x,0),[P.bt])
w=new Array(16)
w.fixed$length=Array
w=new S.fV(z,y,x,0,0,0,0,new S.jT(H.b(new S.G(w,0),[P.o]),0),null)
x=new Array(16)
x.fixed$length=Array
x=H.b(new S.G(x,0),[[S.G,S.bD]])
y=D.A(16,!1)
z=new Array(16)
z.fixed$length=Array
z=new S.fD(x,new S.F(y,!1,z,0),null)
y=D.A(16,!1)
x=new Array(16)
x.fixed$length=Array
v=D.A(16,!1)
u=new Array(16)
u.fixed$length=Array
t=D.A(16,!1)
s=new Array(16)
s.fixed$length=Array
r=D.A(16,!1)
q=new Array(16)
q.fixed$length=Array
p=D.A(16,!1)
o=new Array(16)
o.fixed$length=Array
n=H.b(new H.T(0,null,null,null,null,null,0),[P.b7,S.b0])
m=H.b([],[S.b0])
l=H.b(new H.T(0,null,null,null,null,null,0),[P.b7,S.aI])
k=new Array(16)
k.fixed$length=Array
k=H.b(new S.G(k,0),[S.aI])
j=P.ab([0,0])
i=P.ab([0,0])
h=H.b(new H.T(0,null,null,null,null,null,0),[P.S,null])
h=new S.j2(w,z,new S.F(y,!1,x,0),new S.F(v,!1,u,0),new S.F(t,!1,s,0),new S.F(r,!1,q,0),new S.F(p,!1,o,0),n,m,l,k,0,j,i,h)
h.aK(w)
h.aK(z)
this.y=h
g=document.querySelector("button#fullscreen")
if(null!=g){z=J.fi(g)
H.b(new W.al(0,z.a,z.b,W.a2(new L.hh()),!1),[H.q(z,0)]).a1()}}},
hh:{"^":"d:0;",
$1:function(a){return document.querySelector("canvas").requestFullscreen()}},
he:{"^":"d:0;a",
$1:function(a){return}},
hf:{"^":"d:0;a",
$1:function(a){return this.a.eR()}},
hg:{"^":"d:0;a",
$1:function(a){return}},
hb:{"^":"d:0;a",
$1:function(a){var z,y
z=this.a
y=z.z
if(null!=y)J.by(y,new L.ha(z))}},
ha:{"^":"d:3;a",
$2:function(a,b){var z=this.a
J.by(b,new L.h9(J.fh(z.Q.ge4().h(0,H.e(a)+".png")).p(0,z.Q.ge4().h(0,H.e(a)+".png").ghI())))}},
h9:{"^":"d:0;a",
$1:function(a){var z=a.ga5()
z.toString
a.sa5(H.b(new H.bN(z,new L.h8(this.a)),[null,null]).bl(0))}},
h8:{"^":"d:0;a",
$1:function(a){return J.u(a,this.a)}},
hd:{"^":"d:0;a",
$1:function(a){this.a.y.H()}},
hn:{"^":"d:0;a",
$1:function(a){var z,y
z=this.a
z.cx=window.performance.now()
if(null!=C.c.fW(z.y.y,new L.hl(),new L.hm()))z.hn()
y=window
z=z.geG()
C.k.bE(y)
C.k.bP(y,W.a2(z))}},
hl:{"^":"d:0;",
$1:function(a){return J.D(a.gdP(),1)}},
hm:{"^":"d:1;",
$0:function(){return}},
hc:{"^":"d:0;a",
$1:function(a){return this.a.dI(J.c8(a,1000))}},
ho:{"^":"d:0;a",
$1:function(a){return this.a.dI(J.c8(a,1000))}},
hk:{"^":"d:3;a,b",
$2:function(a,b){J.by(b,new L.hj(this.a,this.b,a))}},
hj:{"^":"d:0;a,b,c",
$1:function(a){var z=this.a
z.y.fi(a,this.c)
if(!!J.j(a).$iscG)this.b.push(L.kl(z.c.a,a.gcu(),a.gc4()).Y(new L.hi(a)))}},
hi:{"^":"d:0;a",
$1:function(a){this.a.sb_(0,a)}}}],["","",,F,{"^":"",iW:{"^":"bq;a,b,c,d,e,f,r,x,y",
aT:function(){$.$get$d3().bm(this.b.ch)}}}],["","",,A,{"^":"",
c2:function(a){var z,y
z=C.X.fX(a,0,new A.kG())
if(typeof z!=="number")return H.i(z)
y=536870911&z+((67108863&z)<<3>>>0)
y=(y^y>>>11)>>>0
return 536870911&y+((16383&y)<<15>>>0)},
kG:{"^":"d:3;",
$2:function(a,b){var z,y
z=J.u(a,J.V(b))
if(typeof z!=="number")return H.i(z)
y=536870911&z
y=536870911&y+((524287&y)<<10>>>0)
return y^y>>>6}}}],["","",,P,{"^":"",
kB:function(a,b){var z={}
a.D(0,new P.kC(z))
return z},
dp:function(){var z=$.dm
if(z==null){z=J.ca(window.navigator.userAgent,"Opera",0)
$.dm=z}return z},
dn:function(){var z,y
z=$.dj
if(z!=null)return z
y=$.dk
if(y==null){y=J.ca(window.navigator.userAgent,"Firefox",0)
$.dk=y}if(y===!0)z="-moz-"
else{y=$.dl
if(y==null){y=P.dp()!==!0&&J.ca(window.navigator.userAgent,"Trident/",0)
$.dl=y}if(y===!0)z="-ms-"
else z=P.dp()===!0?"-o-":"-webkit-"}$.dj=z
return z},
kC:{"^":"d:18;a",
$2:function(a,b){this.a[a]=b}}}],["","",,A,{"^":"",
nm:[function(){var z,y
z=document.querySelector("#loading").style
z.display="none"
z=H.a5(document.querySelector("#startGame"),"$isdb")
y=z.style
y.display="inline-block"
z.focus()
z=H.b(new W.bX(z,"click",!1),[H.q(C.r,0)])
H.b(new W.al(0,z.a,z.b,W.a2(new A.kW()),!1),[H.q(z,0)]).a1()},"$0","eT",0,0,2],
kW:{"^":"d:0;",
$1:function(a){var z,y
z=document.querySelector("#story").style;(z&&C.f).saA(z,"0.0")
z=document.querySelector("#game").style;(z&&C.f).saA(z,"1.0")
z.display="block"
z=document.querySelector("#hud").style;(z&&C.f).saA(z,"1.0")
z.display="block"
P.cB(P.dq(0,0,0,0,0,1),new A.kU())
y=F.h6()
y.bs(0)
H.a5(y.y.z.h(0,C.h),"$isbE").d.a.Y(new A.kV(y))}},
kU:{"^":"d:1;",
$0:function(){var z=document.querySelector("#story").style
z.display="none"
return"none"}},
kV:{"^":"d:0;a",
$1:function(a){var z
this.a.db=!0
document.querySelector("#lastscore").textContent=H.e(a)
if(J.bx(H.ij(document.querySelector("#highscore").textContent,null,null),a))document.querySelector("#highscore").textContent=H.e(a)
z=document.querySelector("#story").style;(z&&C.f).saA(z,"1.0")
z.display="block"
z=document.querySelector("#game").style;(z&&C.f).saA(z,"0.0")
z.display="none"
z=document.querySelector("#hud").style;(z&&C.f).saA(z,"0.0")
z.display="none"
J.ff(document.querySelector("#startGame"))}}},1],["","",,F,{"^":"",
hu:[function(){var z,y,x,w,v,u,t,s,r
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
r=C.a.N(v,3)
if(t>=180)return H.a(y,t)
y[t]=r
s+=2
if(s>=180)return H.a(y,s)
y[s]=r+1}y[179]=1
return new F.bj(z,y)},"$0","l2",0,0,6],
m1:[function(){var z,y,x,w,v,u,t,s,r,q,p
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
p=C.a.N(t,3)
if(q>=180)return H.a(y,q)
y[q]=p
u+=2
if(u>=180)return H.a(y,u)
y[u]=p+1}y[179]=1
return new F.bj(z,y)},"$0","l3",0,0,6],
m2:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
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
k=C.a.N(r,3)
if(n>=180)return H.a(y,n)
y[n]=k
s+=2
if(s>=180)return H.a(y,s)
y[s]=k+1}y[179]=1
return new F.bj(z,y)},"$0","l4",0,0,6],
m3:[function(a){if(typeof a!=="number")return a.af()
return Math.sqrt(H.a_(a/3.141592653589793))},"$1","l5",2,0,4],
m4:[function(a){return Math.sqrt(H.a_(a))/2},"$1","l6",2,0,4],
m5:[function(a){if(typeof a!=="number")return H.i(a)
return Math.sqrt(H.a_(4*a/Math.sqrt(H.a_(3))))*Math.sqrt(H.a_(3))/3},"$1","l7",2,0,4],
t:{"^":"aq;n:a@",q:{
ii:function(a,b,c){var z,y,x
z=$.$get$R().h(0,C.b)
if(null==z){y=new Array(16)
y.fixed$length=Array
z=H.b(new S.G(y,0),[null])
$.$get$R().k(0,C.b,z)}x=J.aB(z)
if(null==x)x=F.d1().$0()
y=new Float32Array(3)
y[0]=a
y[1]=b
y[2]=c
x.sn(new T.H(y))
return x},
mD:[function(){return new F.t(null)},"$0","d1",0,0,23]}},
au:{"^":"aq;n:a@",q:{
n2:[function(){return new F.au(null)},"$0","lb",0,0,24]}},
as:{"^":"aq;aD:a@,dd:b@",q:{
mM:[function(){return new F.as(null,null)},"$0","l9",0,0,25]}},
b6:{"^":"aq;aD:a@,j:b*",q:{
mX:[function(){return new F.b6(null,null)},"$0","la",0,0,26]}},
ap:{"^":"aq;I:a*",q:{
mx:[function(){return new F.ap(null)},"$0","l8",0,0,27]}},
aY:{"^":"aq;X:a*,a6:b@,al:c@",q:{
lv:[function(){return new F.aY(null,null,null)},"$0","l0",0,0,28]}},
av:{"^":"aq;a5:a@,aO:b@",
cB:function(a,b,c){var z,y,x,w,v
if(b===0){for(z=this.a,y=z.length,x=c.length,w=0;w<y;++w){v=z[w]
if(w>=x)return H.a(c,w)
c[w]=v}return y}return 0},
e0:function(a,b,c){var z,y,x,w
if(b===0)for(z=this.a,y=z.length,x=c.length,w=0;w<y;++w){if(w>=x)return H.a(c,w)
z[w]=c[w]}},
$isaL:1,
q:{
n3:[function(){return new F.av(null,null)},"$0","lc",0,0,29]}},
aZ:{"^":"aq;",q:{
lw:[function(){return new F.aZ()},"$0","l1",0,0,30]}},
bj:{"^":"c;a5:a@,aO:b@"},
bE:{"^":"aI;l:b>,m:c>,d,a",
dL:function(a){this.d.dh(0,a)}},
em:{"^":"aI;b,c,d,a",
c0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.d.as("player")
y=J.w(this.b.b,J.N(z)).gn()
x=J.cc(this.c)
w=J.fg(this.c)
if(typeof x!=="number")return x.af()
if(typeof w!=="number")return H.i(w)
v=new Float32Array(H.m(16))
u=new T.aJ(v)
u.cD()
t=new Float32Array(H.m(16))
s=new T.aJ(t)
s.cD()
y=y.a
r=y[0]
q=y[1]
p=y[2]
o=new T.H(new Float32Array(H.m(3)))
o.ag(r+25,q-25,p-100)
p=y[0]
q=y[1]
y=y[2]
r=new Float32Array(H.m(3))
new T.H(r).ag(p+10,q-10,y+10)
y=new T.H(new Float32Array(H.m(3)))
y.ag(0,-1,0)
q=new Float32Array(H.m(3))
n=new T.H(q)
n.J(o)
q[0]=q[0]-r[0]
q[1]=q[1]-r[1]
q[2]=q[2]-r[2]
n.cc()
m=y.dj(n)
m.cc()
l=n.dj(m)
l.cc()
y=m.c2(o)
r=l.c2(o)
o=n.c2(o)
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
d=Math.tan(H.a_(0.7853981633974483))
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
return s.E(0,u)},
H:function(){var z,y
this.ed()
z=this.a
y=H.b(new S.z(null,null),[F.t])
y.K(C.b,z,F.t)
this.b=y
this.d=this.a.z.h(0,C.j)
this.c=this.a.z.h(0,C.h)}},
e0:{"^":"b_;z,Q,ch,ca:cx<,fK:cy<,a,b,c,d,e,f,r,x,y",
aC:function(a){var z,y,x,w,v
z=J.k(a)
y=J.w(this.z.b,z.gA(a))
x=J.w(this.Q.b,z.gA(a))
z=$.$get$cD()
w=z.a
v=w.b===w.c?z.fG():w.cj()
z.b.hi(v)
v.sdk($.$get$e6())
v.fb(y,0,1)
v.shl(0,$.$get$e7())
z=$.$get$dz()
w=this.cy
if(w<0||w>=3)return H.a(z,w)
v.shu(z[w].$0().ga5())
v.sdk($.$get$dt())
v.cE(0,$.$get$d3())
w=$.$get$bF()
z=this.cy
if(z<0||z>=3)return H.a(w,z)
x.a=w[z].$1(x.gdd())
this.ch=!1},
sdA:function(a){this.cy=a
this.ch=!0},
ax:function(){return this.ch},
H:function(){var z,y
this.aa()
z=this.b
y=H.b(new S.z(null,null),[F.as])
y.K(C.l,z,F.as)
this.Q=y
y=this.b
z=H.b(new S.z(null,null),[F.av])
z.K(C.n,y,F.av)
this.z=z}},
i2:{"^":"b_;z,Q,a,b,c,d,e,f,r,x,y",
aC:function(a){var z,y,x,w,v,u
z=J.k(a)
y=J.w(this.z.b,z.gA(a))
x=J.w(this.Q.b,z.gA(a))
z=y.gn()
w=x.gn()
v=this.b.ch
w.toString
u=new T.H(new Float32Array(H.m(3)))
u.J(w)
u.a7(0,v)
z.toString
v=new T.H(new Float32Array(H.m(3)))
v.J(z)
v.t(0,u)
y.sn(v)},
H:function(){var z,y
this.aa()
z=this.b
y=H.b(new S.z(null,null),[F.au])
y.K(C.m,z,F.au)
this.Q=y
y=this.b
z=H.b(new S.z(null,null),[F.t])
z.K(C.b,y,F.t)
this.z=z}},
id:{"^":"b_;z,Q,a,b,c,d,e,f,r,x,y",
aC:function(a){var z,y,x
z=J.k(a)
y=J.w(this.Q.b,z.gA(a))
z=J.w(this.z.b,z.gA(a)).gn()
x=P.c5(2500,P.bv(800,100+y.gn().a[2]/100))
z.a[2]=x},
H:function(){var z,y
this.aa()
z=this.b
y=H.b(new S.z(null,null),[F.t])
y.K(C.b,z,F.t)
this.Q=y
y=this.b
z=H.b(new S.z(null,null),[F.au])
z.K(C.m,y,F.au)
this.z=z}},
fL:{"^":"b0;z,Q,a,b,c,d,e,f,r,x,y",
bj:function(a){var z=this.z.as("player")
a.D(0,new F.fM(this,J.w(this.Q.b,J.N(z))))},
ax:function(){return!0},
H:function(){var z,y
this.aa()
z=this.b
y=H.b(new S.z(null,null),[F.t])
y.K(C.b,z,F.t)
this.Q=y
this.z=this.b.z.h(0,C.j)}},
fM:{"^":"d:0;a,b",
$1:function(a){if(J.w(this.a.Q.b,J.N(a)).gn().a[2]+500<this.b.gn().a[2])a.fL()}},
i7:{"^":"b_;z,Q,ch,cx,cy,db,a,b,c,d,e,f,r,x,y",
aC:function(a){var z,y,x,w,v,u,t,s,r
z=this.z.as("player")
y=J.w(this.Q.b,J.N(z))
x=J.k(a)
w=J.w(this.Q.b,x.gA(a))
v=y.gn().a[2]-w.gn().a[2]
if(v<=0&&v>-500)this.db=this.cx.gfK()
else{if(this.db!=null)if(v>0)if(v<500){u=w.gn().a
t=u[0]
u=u[1]
s=new Float32Array(H.m(2))
s[0]=t
s[1]=u
u=y.gn().a
t=u[0]
u=u[1]
r=new Float32Array(H.m(2))
r[0]=t
r[1]=u
r=new T.aM(s).w(0,new T.aM(r))
u=r}else u=!1
else u=!1
else u=!1
if(u){u=this.db
x=J.d6(J.w(this.ch.b,x.gA(a)))
if(u==null?x!=null:u!==x)this.cy.dL(C.d.N(y.gn().a[2],1000)-1)
this.db=null}}},
H:function(){var z,y
this.aa()
z=this.b
y=H.b(new S.z(null,null),[F.ap])
y.K(C.i,z,F.ap)
this.ch=y
y=this.b
z=H.b(new S.z(null,null),[F.t])
z.K(C.b,y,F.t)
this.Q=z
this.cx=this.b.x.h(0,C.u)
this.cy=this.b.z.h(0,C.h)
this.z=this.b.z.h(0,C.j)}},
iR:{"^":"bq;z,Q,ch,cx,a,b,c,d,e,f,r,x,y",
aT:function(){var z,y,x,w,v,u,t,s,r,q
z=this.z.as("player")
y=J.w(this.Q.b,J.N(z))
for(x=this.cx;w=C.d.N(y.gn().a[2],100),v=this.ch,w>v-100;){w=this.b
u=$.$get$R().h(0,C.b)
if(null==u){t=new Array(16)
t.fixed$length=Array
u=H.b(new S.G(t,0),[null])
$.$get$R().k(0,C.b,u)}s=J.aB(u)
if(null==s)s=F.d1().$0()
t=new Float32Array(3)
t[0]=0
t[1]=0
t[2]=x*v
s.sn(new T.H(t))
u=$.$get$R().h(0,C.q)
if(null==u){v=new Array(16)
v.fixed$length=Array
u=H.b(new S.G(v,0),[null])
$.$get$R().k(0,C.q,u)}r=J.aB(u)
if(null==r)r=F.la().$0()
r.saD(200)
r.sj(0,x)
q=w.c1([s,r])
w.c.t(0,q);++this.ch}},
H:function(){var z,y
this.aa()
z=this.b
y=H.b(new S.z(null,null),[F.t])
y.K(C.b,z,F.t)
this.Q=y
this.z=this.b.z.h(0,C.j)}},
i9:{"^":"bq;z,Q,ch,cx,a,b,c,d,e,f,r,x,y",
aT:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=$.$get$d_()
y=0.5+z.cb()*0.3
x=0.5+z.cb()*0.3
w=0.5+z.cb()*0.3
v=P.bv(1,9-C.a.N(this.cx,7))
u=P.c5(this.z.gca(),2+C.a.N(this.cx,23))
t=P.hY(9,new F.ia(v),!0,null)
C.c.e3(t,z)
for(s=-2;s<3;++s)for(z=s*20*4,r=-2;r<3;++r){if(Math.abs(s)===2||Math.abs(r)===2)q=-1
else q=C.c.a4(t)===!0?$.$get$d_().dz(u):-1
p=this.b
o=this.cx
n=$.$get$R().h(0,C.b)
if(null==n){m=new Array(16)
m.fixed$length=Array
n=H.b(new S.G(m,0),[null])
$.$get$R().k(0,C.b,n)}l=J.aB(n)
if(null==l)l=F.d1().$0()
m=new Float32Array(3)
m[0]=z
m[1]=r*20*4
m[2]=o*1000
l.sn(new T.H(m))
n=$.$get$R().h(0,C.i)
if(null==n){o=new Array(16)
o.fixed$length=Array
n=H.b(new S.G(o,0),[null])
$.$get$R().k(0,C.i,n)}k=J.aB(n)
if(null==k)k=F.l8().$0()
J.fp(k,q)
n=$.$get$R().h(0,C.o)
if(null==n){o=new Array(16)
o.fixed$length=Array
n=H.b(new S.G(o,0),[null])
$.$get$R().k(0,C.o,n)}j=J.aB(n)
if(null==j)j=F.l0().$0()
J.fo(j,y)
j.sa6(x)
j.sal(w)
i=p.c1([l,k,j])
p.c.t(0,i)}++this.cx},
ax:function(){var z=this.Q.as("player")
return C.d.N(J.w(this.ch.b,J.N(z)).gn().a[2],1000)>this.cx-10},
H:function(){var z,y
this.aa()
z=this.b
y=H.b(new S.z(null,null),[F.t])
y.K(C.b,z,F.t)
this.ch=y
this.z=this.b.x.h(0,C.u)
this.Q=this.b.z.h(0,C.j)}},
ia:{"^":"d:0;a",
$1:function(a){return a<this.a&&!0}}}],["","",,B,{"^":"",bB:{"^":"c;eS:fx<",
aU:["e8",function(a){this.a=-2
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
cE:function(a,b){if(b==null){this.fn()
this.x=0
this.z=!0}else b.t(0,this)},
bs:function(a){return this.cE(a,null)},
gha:function(){return this.ch===!0||this.cx===!0},
aw:function(a){},
bm:function(a){var z,y,x
if(this.z!==!0||this.cy===!0||this.cx===!0)return
this.y=a
if(this.Q!==!0)this.H()
if(this.Q===!0){z=this.c!==!0
if(z){y=this.b
if(typeof y!=="number")return y.T()
y=this.a
if(typeof y!=="number")return y.V()
if(y<0){y=this.x
x=this.y
if(typeof y!=="number")return y.B()
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
this.aw(1)
this.aw(2)
z=this.a
if(typeof z!=="number")return z.p()
this.ar(z,z-1,this.c,a)}else{if(z){z=this.b
if(typeof z!=="number")return z.T()
y=this.a
if(typeof y!=="number")return y.S()
if(y>z*2){z=this.x
y=this.y
if(typeof z!=="number")return z.B()
if(typeof y!=="number")return H.i(y)
y=z+y<0
z=y}else z=!1}else z=!1
if(z){this.c=!0
z=this.b
if(typeof z!=="number")return z.E()
this.a=z*2
z=this.x
if(typeof z!=="number")return H.i(z)
a=0-z
z=this.y
if(typeof z!=="number")return z.p()
this.y=z-a
this.x=this.f
this.aw(16)
this.aw(32)
z=this.a
if(typeof z!=="number")return z.B()
this.ar(z,z+1,this.c,a)}}this.hv()
z=this.b
if(typeof z!=="number")return z.T()
y=this.a
if(typeof y!=="number")return y.S()
z=y>z*2||y<0
this.ch=z}z=this.x
y=this.y
if(typeof z!=="number")return z.B()
if(typeof y!=="number")return H.i(y)
this.x=z+y
this.y=0},
H:function(){var z,y,x
z=this.x
y=this.y
if(typeof z!=="number")return z.B()
if(typeof y!=="number")return H.i(y)
x=this.e
if(typeof x!=="number")return H.i(x)
if(z+y>=x){this.h6()
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
this.aw(1)
this.aw(2)}},
hv:function(){var z,y,x,w,v,u,t
while(!0){z=this.a
if(typeof z!=="number")return z.T()
if(z>=0){y=this.b
if(typeof y!=="number")return y.E()
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
if(typeof v!=="number")return v.B()
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
if(this.d===!0&&Math.abs(C.a.M(z,4))===2)this.dq()
else this.dn()
z=this.a
if(typeof z!=="number")return z.B()
this.ar(z,z+1,this.c,t)}else{if(w){w=this.x
v=this.y
if(typeof w!=="number")return w.B()
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
if(this.d===!0&&Math.abs(C.a.M(z,4))===2)this.dn()
else this.dq()
z=this.a
if(typeof z!=="number")return z.p()
this.ar(z,z-1,this.c,t)}else{if(x){w=this.x
v=this.y
if(typeof w!=="number")return w.B()
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
this.ar(z,z+1,!1,t)
z=this.a
if(typeof z!=="number")return z.V()
if(z<0){z=this.b
if(typeof z!=="number")return z.T()
z=!0}else z=!1
if(!z)this.x=this.r}else{if(x){w=this.x
v=this.y
if(typeof w!=="number")return w.B()
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
this.ar(z,z-1,!1,t)
z=this.a
y=this.b
if(typeof y!=="number")return y.E()
if(typeof z!=="number")return z.S()
z>y*2&&!0
this.x=0}else{t=this.y
if(x){if(typeof t!=="number")return t.p()
this.y=t-t
x=this.x
if(typeof x!=="number")return x.B()
this.x=x+t
this.ar(z,z,y,t)
break}else{if(typeof t!=="number")return t.p()
this.y=t-t
z=this.x
if(typeof z!=="number")return z.B()
this.x=z+t
break}}}}}}}},fR:{"^":"e5;c,d,e,f,a,b",q:{
lA:[function(a){var z=J.j(a)
if(z.w(a,0))return 0
if(z.w(a,1))return 1
if(typeof a!=="number")return H.i(a)
z=-10*a
H.a_(2)
H.a_(z)
return Math.pow(2,z)*Math.sin(H.a_((a-0.075)*6.283185307179586/0.3))+1},"$1","lh",2,0,9]}},ik:{"^":"e5;a,b",q:{
mE:[function(a){var z
a=J.E(a,2)
z=J.y(a)
if(z.V(a,1)){if(typeof a!=="number")return H.i(a)
return 0.5*a*a}a=z.p(a,1)
z=J.y(a)
z=J.a6(z.E(a,z.p(a,2)),1)
if(typeof z!=="number")return H.i(z)
return-0.5*z},"$1","li",2,0,9]}},fy:{"^":"iV;a",
hB:[function(a,b,c){var z,y,x
z=J.y(c)
y=P.c5(P.bv(J.fe(J.E(z.p(c,1),a)),0),z.p(c,2))
a=J.a6(J.E(a,z.p(c,1)),y)
if(y===0){z=J.M(b)
return this.bz(z.h(b,0),z.h(b,0),z.h(b,1),z.h(b,2),a)}if(y===z.p(c,2)){x=J.M(b)
return this.bz(x.h(b,z.p(c,3)),x.h(b,z.p(c,2)),x.h(b,z.p(c,1)),x.h(b,z.p(c,1)),a)}z=J.M(b)
return this.bz(z.h(b,y-1),z.h(b,y),z.h(b,y+1),z.h(b,y+2),a)},"$3","gez",6,0,19],
bz:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=J.y(c)
y=J.E(z.p(c,a),0.5)
x=J.E(J.a6(d,b),0.5)
if(typeof e!=="number")return H.i(e)
w=2*e*e
v=3*e*e
u=e*e
t=u*e
return J.u(J.u(J.u(J.E(b,w*e-v+1),z.E(c,-2*e*e*e+v)),J.E(y,t-w+e)),J.E(x,t-u))},
eh:function(){this.a=this.gez()}},ig:{"^":"c;a,b,c",
el:function(a,b){this.a=P.bM(null,null)},
fG:function(){return this.c.$0()}},ih:{"^":"c;a,b",
hh:function(a){return this.a.$1(a)},
hi:function(a){return this.b.$1(a)}},bo:{"^":"bB;fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx",
aU:function(a){var z,y
this.e8(this)
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
y=$.a4
if(z!==y)this.y1=new Float32Array(H.m(y))
z=this.y2.length
y=(2+$.cF)*$.a4
if(z!==y)this.y2=new Float32Array(H.m(y))},
fb:function(a,b,c){this.fy=a
this.go=a!=null?this.eF():null
this.k1=b
this.f=c},
eF:function(){var z,y
if($.$get$cE().bf(J.cb(this.fy)))return J.cb(this.fy)
z=this.fy
y=J.j(z)
if(!!y.$isaL)return y.gL(z)
return},
sdk:function(a){this.k2=a},
shu:function(a){var z=H.kw(a,"$isl",[P.B],"$asl")
if(z){z=this.x1
if(z.length>$.a4)this.d4()
C.c.dY(z,0,a)}},
shl:function(a,b){this.k3=b},
fn:function(){var z,y
if(this.fy==null)return
z=$.$get$cE().h(0,this.go)
this.id=z
y=z==null
y
if(!y){z=z.dO(this.fy,this,this.k1,this.y1)
this.r2=z}else{z=this.fy
if(!!J.j(z).$isaL){z=H.a5(z,"$isaL").cB(this,this.k1,this.y1)
this.r2=z}else throw H.f(P.b1("No TweenAccessor was found for the target, and it is not Tweenable either."))}if(z>$.a4)this.d4()},
h6:function(){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.fy==null)return
z=this.ry
this.eJ(z)
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
v[t]=J.u(s,r)
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
y[s]=C.N.B(r,p);++q}if(this.k4===!0){if(t>=w)return H.a(z,t)
o=z[t]
z[t]=v[t]
v[t]=o}++t}},
ar:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(this.fy==null||this.k2==null)return
z=c!==!0
if(z){if(typeof a!=="number")return a.S()
if(typeof b!=="number")return H.i(b)
y=a>b}else y=!1
if(y){if(this.d===!0){if(typeof b!=="number")return b.M()
z=Math.abs(C.a.M(b,4))===2}else z=!1
this.aj(z?this.ry:this.x1)
return}if(z){if(typeof a!=="number")return a.V()
if(typeof b!=="number")return H.i(b)
z=a<b}else z=!1
if(z){if(this.d===!0){if(typeof b!=="number")return b.M()
z=Math.abs(C.a.M(b,4))===2}else z=!1
this.aj(z?this.x1:this.ry)
return}z=this.f
if(typeof z!=="number")return z.V()
y=z<1e-11
if(y){if(typeof d!=="number")return d.S()
x=d>-1e-11}else x=!1
if(x){if(this.d===!0){if(typeof a!=="number")return a.M()
z=Math.abs(C.a.M(a,4))===2}else z=!1
this.aj(z?this.x1:this.ry)
return}if(y){if(typeof d!=="number")return d.V()
y=d<1e-11}else y=!1
if(y){if(this.d===!0){if(typeof a!=="number")return a.M()
z=Math.abs(C.a.M(a,4))===2}else z=!1
this.aj(z?this.ry:this.x1)
return}if(this.d===!0){if(typeof a!=="number")return a.M()
y=Math.abs(C.a.M(a,4))===2}else y=!1
w=this.x
if(y){if(typeof w!=="number")return H.i(w)
w=z-w}y=this.k2
if(typeof w!=="number")return w.af()
v=y.fA(w/z)
if(this.rx===0||this.k3==null){z=this.ry
y=z.length
x=this.x1
u=x.length
t=J.bf(v)
s=0
while(!0){r=this.r2
if(typeof r!=="number")return H.i(r)
if(!(s<r))break
r=this.y1
if(s>=y)return H.a(z,s)
q=z[s]
if(s>=u)return H.a(x,s)
q=J.u(q,t.E(v,J.a6(x[s],q)))
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
o=this.k3.fB(v,p,o+2)
if(s>=q.length)return H.a(q,s)
q[s]=o;++s}}this.aj(this.y1)},
dq:function(){if(this.fy==null)return
this.aj(this.ry)},
dn:function(){if(this.fy==null)return
this.aj(this.x1)},
eJ:function(a){var z=this.id
if(z!=null)return z.dO(this.fy,this,this.k1,a)
else{z=this.fy
if(!!J.j(z).$isaL)return H.a5(z,"$isaL").cB(this,this.k1,a)}return 0},
aj:function(a){var z=this.id
if(z!=null)z.e1(this.fy,this,this.k1,a)
else{z=this.fy
if(!!J.j(z).$isaL)H.a5(z,"$isaL").e0(this,this.k1,a)}},
d4:function(){throw H.f(P.b1("You cannot combine more than "+$.a4+" \r\n                  attributes in a tween. You can raise this limit with \r\n                  Tween.setCombinedAttributesLimit(), which should be called once\r\n                  in application initialization code."))}},kz:{"^":"d:8;",
$1:function(a){a.aU(0)}},kA:{"^":"d:8;",
$1:function(a){J.fn(a)}},ky:{"^":"d:1;",
$0:function(){var z,y,x,w,v
z=new Array($.a4)
z.fixed$length=Array
z=H.b(z,[P.B])
y=new Array($.a4)
y.fixed$length=Array
y=H.b(y,[P.B])
x=H.b(new Array($.cF*$.a4),[P.B])
w=new Array($.a4)
w.fixed$length=Array
w=H.b(w,[P.B])
v=new Array((2+$.cF)*$.a4)
v.fixed$length=Array
v=new B.bo(null,null,null,null,null,null,null,null,null,null,z,y,x,w,H.b(v,[P.B]),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
v.aU(0)
return v}},iS:{"^":"c;"},e5:{"^":"c;",
fA:function(a){return this.a.$1(a)}},iT:{"^":"c;a,b",
t:function(a,b){var z=this.a
if(!C.c.az(z,b))z.push(b)
if(b.geS()===!0)b.bs(0)},
bm:function(a){var z,y
z=this.a
C.c.be(z,"removeWhere")
C.c.f7(z,new B.iU(),!0)
if(!this.b)if(a>=0)for(y=0;y<z.length;++y)z[y].bm(a)
else for(y=z.length-1;y>=0;--y){if(y>=z.length)return H.a(z,y)
z[y].bm(a)}},
gj:function(a){return this.a.length}},iU:{"^":"d:33;",
$1:function(a){var z
if(a.gha()&&a.fr===!0){z=$.$get$cD()
if(!z.a.az(0,a)){z.b.hh(a)
z.a.a_(a)}return!0}return!1}},iV:{"^":"c;",
fB:function(a,b,c){return this.a.$3(a,b,c)}}}],["","",,T,{"^":"",aJ:{"^":"c;cX:a<",
gaF:function(){return this.a},
J:function(a){var z,y
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
i:function(a){return"[0] "+this.aZ(0).i(0)+"\n[1] "+this.aZ(1).i(0)+"\n[2] "+this.aZ(2).i(0)+"\n[3] "+this.aZ(3).i(0)+"\n"},
gfR:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
z[b]=c},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aJ){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gG:function(a){return A.c2(this.a)},
aZ:function(a){var z,y,x
z=new Float32Array(H.m(4))
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
return new T.at(z)},
E:function(c8,c9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7
if(typeof c9==="number"){z=new Float32Array(H.m(16))
y=new T.aJ(z)
y.J(this)
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
if(!!z.$isat){x=new T.at(new Float32Array(H.m(4)))
x.J(c9)
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
return x}if(!!z.$isH){x=new T.H(new Float32Array(H.m(3)))
x.J(c9)
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
return x}if(c9.gfR()===4){z=new Float32Array(H.m(16))
y=new T.aJ(z)
y.J(this)
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
return y}throw H.f(P.a7(c9))},
B:function(a,b){var z=new T.aJ(new Float32Array(H.m(16)))
z.J(this)
z.t(0,b)
return z},
p:function(a,b){var z,y,x
z=new Float32Array(H.m(16))
y=new T.aJ(z)
y.J(this)
x=b.gcX()
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
cD:function(){var z=this.a
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
t:function(a,b){var z,y
z=b.gcX()
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
y[15]=y[15]+z[15]}},aM:{"^":"c;d8:a<",
J:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
i:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+"]"},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aM){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gG:function(a){return A.c2(this.a)},
p:function(a,b){var z,y,x
z=new Float32Array(H.m(2))
y=new T.aM(z)
y.J(this)
x=b.gd8()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
return y},
B:function(a,b){var z=new T.aM(new Float32Array(H.m(2)))
z.J(this)
z.t(0,b)
return z},
af:function(a,b){var z=new T.aM(new Float32Array(H.m(2)))
z.J(this)
z.a7(0,1/b)
return z},
E:function(a,b){var z=new T.aM(new Float32Array(H.m(2)))
z.J(this)
z.a7(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(H.a_(y*y+z*z))},
t:function(a,b){var z,y
z=b.gd8()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
a7:function(a,b){var z,y
z=this.a
y=z[1]
if(typeof b!=="number")return H.i(b)
z[1]=y*b
z[0]=z[0]*b},
bh:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])},
sX:function(a,b){this.a[0]=b
return b},
sa6:function(a){this.a[1]=a
return a},
gX:function(a){return this.a[0]},
ga6:function(){return this.a[1]},
gu:function(a){return this.a[0]},
gv:function(a){return this.a[1]}},H:{"^":"c;d9:a<",
gaF:function(){return this.a},
ag:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c},
J:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
i:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+"]"},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.H){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gG:function(a){return A.c2(this.a)},
p:function(a,b){var z,y,x
z=new Float32Array(H.m(3))
y=new T.H(z)
y.J(this)
x=b.gd9()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
return y},
B:function(a,b){var z=new T.H(new Float32Array(H.m(3)))
z.J(this)
z.t(0,b)
return z},
af:function(a,b){var z=new T.H(new Float32Array(H.m(3)))
z.J(this)
z.a7(0,1/b)
return z},
E:function(a,b){var z=new T.H(new Float32Array(H.m(3)))
z.J(this)
z.a7(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.a_(y*y+x*x+z*z))},
cc:function(){var z,y,x,w,v,u
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=Math.sqrt(H.a_(y*y+x*x+w*w))
if(v===0)return 0
u=1/v
z[0]=z[0]*u
z[1]=z[1]*u
z[2]=z[2]*u
return v},
c2:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]+y[2]*z[2]},
dj:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=a.a
u=v[0]
t=v[1]
s=v[2]
z=new T.H(new Float32Array(H.m(3)))
z.ag(x*s-w*t,w*u-y*s,y*t-x*u)
return z},
t:function(a,b){var z,y
z=b.gd9()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]},
a7:function(a,b){var z,y
z=this.a
y=z[2]
if(typeof b!=="number")return H.i(b)
z[2]=y*b
z[1]=z[1]*b
z[0]=z[0]*b},
bh:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])
z[2]=Math.floor(z[2])},
sn:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
sX:function(a,b){this.a[0]=b
return b},
sa6:function(a){this.a[1]=a
return a},
sal:function(a){this.a[2]=a
return a},
gn:function(){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
z=z[2]
w=new T.H(new Float32Array(H.m(3)))
w.ag(y,x,z)
return w},
gX:function(a){return this.a[0]},
ga6:function(){return this.a[1]},
gal:function(){return this.a[2]},
gu:function(a){return this.a[0]},
gv:function(a){return this.a[1]}},at:{"^":"c;da:a<",
gaF:function(){return this.a},
e1:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a},
J:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
i:function(a){var z=this.a
return H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+","+H.e(z[3])},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.at){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gG:function(a){return A.c2(this.a)},
p:function(a,b){var z,y,x
z=new Float32Array(H.m(4))
y=new T.at(z)
y.J(this)
x=b.gda()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
return y},
B:function(a,b){var z=new T.at(new Float32Array(H.m(4)))
z.J(this)
z.t(0,b)
return z},
af:function(a,b){var z=new T.at(new Float32Array(H.m(4)))
z.J(this)
z.a7(0,1/b)
return z},
E:function(a,b){var z=new T.at(new Float32Array(H.m(4)))
z.J(this)
z.a7(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.a_(y*y+x*x+w*w+z*z))},
t:function(a,b){var z,y
z=b.gda()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]},
a7:function(a,b){var z,y
z=this.a
y=z[0]
if(typeof b!=="number")return H.i(b)
z[0]=y*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b},
bh:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])
z[2]=Math.floor(z[2])
z[3]=Math.floor(z[3])},
sn:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
sX:function(a,b){this.a[0]=b
return b},
sa6:function(a){this.a[1]=a
return a},
sal:function(a){this.a[2]=a
return a},
gn:function(){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
z=z[2]
w=new T.H(new Float32Array(H.m(3)))
w.ag(y,x,z)
return w},
gX:function(a){return this.a[0]},
ga6:function(){return this.a[1]},
gal:function(){return this.a[2]},
gu:function(a){return this.a[0]},
gv:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.j=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cn.prototype
return J.hP.prototype}if(typeof a=="string")return J.bK.prototype
if(a==null)return J.dG.prototype
if(typeof a=="boolean")return J.hO.prototype
if(a.constructor==Array)return J.bk.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bl.prototype
return a}if(a instanceof P.c)return a
return J.c0(a)}
J.M=function(a){if(typeof a=="string")return J.bK.prototype
if(a==null)return a
if(a.constructor==Array)return J.bk.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bl.prototype
return a}if(a instanceof P.c)return a
return J.c0(a)}
J.ay=function(a){if(a==null)return a
if(a.constructor==Array)return J.bk.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bl.prototype
return a}if(a instanceof P.c)return a
return J.c0(a)}
J.kE=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cn.prototype
return J.b3.prototype}if(a==null)return a
if(!(a instanceof P.c))return J.bp.prototype
return a}
J.y=function(a){if(typeof a=="number")return J.b3.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bp.prototype
return a}
J.bf=function(a){if(typeof a=="number")return J.b3.prototype
if(typeof a=="string")return J.bK.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bp.prototype
return a}
J.k=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bl.prototype
return a}if(a instanceof P.c)return a
return J.c0(a)}
J.u=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.bf(a).B(a,b)}
J.c7=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a&b)>>>0
return J.y(a).ae(a,b)}
J.c8=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.y(a).af(a,b)}
J.D=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.j(a).w(a,b)}
J.eZ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.y(a).T(a,b)}
J.c9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.y(a).S(a,b)}
J.f_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.y(a).cC(a,b)}
J.bx=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.y(a).V(a,b)}
J.E=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.bf(a).E(a,b)}
J.f0=function(a){if(typeof a=="number"&&Math.floor(a)==a)return~a>>>0
return J.kE(a).dQ(a)}
J.a6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.y(a).p(a,b)}
J.aA=function(a,b){return J.y(a).W(a,b)}
J.f1=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a^b)>>>0
return J.y(a).bu(a,b)}
J.w=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eR(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.M(a).h(a,b)}
J.f2=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.eR(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.ay(a).k(a,b,c)}
J.f3=function(a,b,c,d){return J.k(a).eq(a,b,c,d)}
J.f4=function(a,b,c,d){return J.k(a).f4(a,b,c,d)}
J.f5=function(a,b){return J.ay(a).t(a,b)}
J.f6=function(a,b,c){return J.k(a).fl(a,b,c)}
J.f7=function(a,b){return J.ay(a).fs(a,b)}
J.f8=function(a,b,c,d,e){return J.k(a).ft(a,b,c,d,e)}
J.ca=function(a,b,c){return J.M(a).fC(a,b,c)}
J.f9=function(a){return J.k(a).fH(a)}
J.fa=function(a){return J.k(a).fI(a)}
J.fb=function(a,b){return J.k(a).fJ(a,b)}
J.fc=function(a,b){return J.k(a).R(a,b)}
J.fd=function(a,b){return J.ay(a).a2(a,b)}
J.fe=function(a){return J.y(a).bh(a)}
J.ff=function(a){return J.k(a).dm(a)}
J.by=function(a,b){return J.ay(a).D(a,b)}
J.d4=function(a){return J.k(a).gfD(a)}
J.aT=function(a){return J.k(a).gan(a)}
J.V=function(a){return J.j(a).gG(a)}
J.fg=function(a){return J.k(a).gm(a)}
J.N=function(a){return J.k(a).gA(a)}
J.aU=function(a){return J.ay(a).gO(a)}
J.d5=function(a){return J.k(a).ghd(a)}
J.bh=function(a){return J.M(a).gj(a)}
J.fh=function(a){return J.k(a).gcd(a)}
J.fi=function(a){return J.k(a).gdB(a)}
J.fj=function(a){return J.k(a).ghr(a)}
J.cb=function(a){return J.j(a).gL(a)}
J.fk=function(a){return J.k(a).gcs(a)}
J.d6=function(a){return J.k(a).gI(a)}
J.cc=function(a){return J.k(a).gl(a)}
J.fl=function(a){return J.k(a).dM(a)}
J.cd=function(a,b,c){return J.k(a).dN(a,b,c)}
J.fm=function(a,b){return J.ay(a).ap(a,b)}
J.aB=function(a){return J.ay(a).a4(a)}
J.fn=function(a){return J.k(a).aU(a)}
J.aV=function(a,b){return J.k(a).bp(a,b)}
J.fo=function(a,b){return J.k(a).sX(a,b)}
J.fp=function(a,b){return J.k(a).sI(a,b)}
J.d7=function(a){return J.y(a).bk(a)}
J.aC=function(a){return J.j(a).i(a)}
J.fq=function(a,b){return J.k(a).hw(a,b)}
I.cY=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.w=W.cj.prototype
C.x=W.fv.prototype
C.f=W.fI.prototype
C.L=W.b2.prototype
C.M=J.h.prototype
C.c=J.bk.prototype
C.a=J.cn.prototype
C.N=J.dG.prototype
C.d=J.b3.prototype
C.z=J.bK.prototype
C.V=J.bl.prototype
C.X=H.i3.prototype
C.Y=H.i5.prototype
C.Z=J.ic.prototype
C.ah=J.bp.prototype
C.k=W.j1.prototype
C.C=new H.dr()
C.D=new P.ib()
C.E=new P.jx()
C.v=new P.jV()
C.e=new P.k6()
C.y=new P.ae(0)
C.r=H.b(new W.aF("click"),[W.dL])
C.F=H.b(new W.aF("error"),[W.dY])
C.G=H.b(new W.aF("keydown"),[W.dI])
C.H=H.b(new W.aF("keyup"),[W.dI])
C.I=H.b(new W.aF("load"),[W.dY])
C.J=H.b(new W.aF("resize"),[W.Y])
C.K=H.b(new W.aF("webkitfullscreenchange"),[W.Y])
C.O=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.A=function(hooks) { return hooks; }
C.P=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.Q=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.R=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.S=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.B=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.T=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.U=function(_, letter) { return letter.toUpperCase(); }
C.W=I.cY([])
C.a_=H.r("lq")
C.a0=H.r("lr")
C.o=H.r("aY")
C.p=H.r("aZ")
C.t=H.r("em")
C.a1=H.r("lX")
C.a2=H.r("lY")
C.h=H.r("bE")
C.a3=H.r("ma")
C.a4=H.r("mb")
C.a5=H.r("mc")
C.a6=H.r("dH")
C.a7=H.r("i6")
C.i=H.r("ap")
C.b=H.r("t")
C.u=H.r("e0")
C.l=H.r("as")
C.a8=H.r("S")
C.j=H.r("cA")
C.q=H.r("b6")
C.a9=H.r("mY")
C.aa=H.r("mZ")
C.ab=H.r("n_")
C.ac=H.r("n0")
C.m=H.r("au")
C.n=H.r("av")
C.ad=H.r("bt")
C.ae=H.r("X")
C.af=H.r("o")
C.ag=H.r("B")
$.dV="$cachedFunction"
$.dW="$cachedInvocation"
$.a9=0
$.aX=null
$.d9=null
$.cV=null
$.eI=null
$.eV=null
$.c_=null
$.c3=null
$.cW=null
$.aP=null
$.bb=null
$.bc=null
$.cR=!1
$.n=C.e
$.dw=0
$.de=1
$.df=0
$.du=0
$.ez=0
$.cP=null
$.dm=null
$.dl=null
$.dk=null
$.dj=null
$.a4=3
$.cF=0
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
I.$lazy(y,x,w)}})(["di","$get$di",function(){return init.getIsolateTag("_$dart_dartClosure")},"dC","$get$dC",function(){return H.hL()},"dD","$get$dD",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.dw
$.dw=z+1
z="expando$key$"+z}return H.b(new P.fZ(null,z),[P.o])},"e9","$get$e9",function(){return H.ac(H.bV({
toString:function(){return"$receiver$"}}))},"ea","$get$ea",function(){return H.ac(H.bV({$method$:null,
toString:function(){return"$receiver$"}}))},"eb","$get$eb",function(){return H.ac(H.bV(null))},"ec","$get$ec",function(){return H.ac(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"eg","$get$eg",function(){return H.ac(H.bV(void 0))},"eh","$get$eh",function(){return H.ac(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ee","$get$ee",function(){return H.ac(H.ef(null))},"ed","$get$ed",function(){return H.ac(function(){try{null.$method$}catch(z){return z.message}}())},"ej","$get$ej",function(){return H.ac(H.ef(void 0))},"ei","$get$ei",function(){return H.ac(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cf","$get$cf",function(){return H.i4([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8])},"cI","$get$cI",function(){return P.jj()},"be","$get$be",function(){return[]},"dh","$get$dh",function(){return{}},"ck","$get$ck",function(){return H.cp(P.b7,S.dd)},"R","$get$R",function(){return H.cp(P.b7,[S.G,S.dT])},"d_","$get$d_",function(){return P.il(null)},"d3","$get$d3",function(){return new B.iT(H.b([],[B.bB]),!1)},"dz","$get$dz",function(){return[F.l2(),F.l3(),F.l4()]},"bF","$get$bF",function(){return[F.l5(),F.l6(),F.l7()]},"dt","$get$dt",function(){var z=new B.fR(0,0,!1,!1,null,null)
z.b="Elastic.OUT"
z.a=B.lh()
return z},"dZ","$get$dZ",function(){var z=new B.ik(null,null)
z.b="Quad.INOUT"
z.a=B.li()
return z},"e8","$get$e8",function(){var z=H.b(new B.ih(null,null),[B.bo])
z.a=new B.kz()
z.b=new B.kA()
return z},"cD","$get$cD",function(){var z,y,x
z=$.$get$e8()
y=B.bo
x=H.b(new B.ig(null,z,null),[y])
x.el(z,y)
x.c=new B.ky()
return x},"cE","$get$cE",function(){return H.cp(P.b7,B.iS)},"e6","$get$e6",function(){return $.$get$dZ()},"e7","$get$e7",function(){var z=new B.fy(null)
z.eh()
return z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,args:[,,]},{func:1,ret:P.X,args:[P.X]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:F.bj},{func:1,ret:P.S,args:[P.o]},{func:1,args:[B.bo]},{func:1,ret:P.B,args:[P.B]},{func:1,args:[,P.aj]},{func:1,args:[,P.S]},{func:1,v:true,args:[,P.aj]},{func:1,args:[P.S]},{func:1,args:[{func:1,v:true}]},{func:1,args:[W.b2]},{func:1,v:true,args:[P.X]},{func:1,v:true,args:[W.Y]},{func:1,args:[P.S,,]},{func:1,ret:P.B,args:[P.B,[P.l,P.B],P.o]},{func:1,v:true,args:[,,]},{func:1,args:[P.c]},{func:1,v:true,args:[P.c],opt:[P.aj]},{func:1,ret:F.t},{func:1,ret:F.au},{func:1,ret:F.as},{func:1,ret:F.b6},{func:1,ret:F.ap},{func:1,ret:F.aY},{func:1,ret:F.av},{func:1,ret:F.aZ},{func:1,v:true,args:[,],opt:[P.aj]},{func:1,args:[,],opt:[,]},{func:1,args:[B.bB]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.lg(d||a)
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
Isolate.cY=a.cY
Isolate.am=a.am
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eX(A.eT(),b)},[])
else (function(b){H.eX(A.eT(),b)})([])})})()