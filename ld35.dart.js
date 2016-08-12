(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
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
if(a0==="p"){processStatics(init.statics[b1]=b2.p,b3)
delete b2.p}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.d5"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.d5"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.d5(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.ao=function(){}
var dart=[["","",,H,{"^":"",mO:{"^":"c;a"}}],["","",,J,{"^":"",
l:function(a){return void 0},
cd:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
c9:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.d7==null){H.lk()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.eG("Return interceptor for "+H.f(y(a,z))))}w=H.ls(a)
if(w==null){if(typeof a=="function")return C.V
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.Z
else return C.ai}return w},
h:{"^":"c;",
w:function(a,b){return a===b},
gG:function(a){return H.ai(a)},
i:["er",function(a){return H.bY(a)}],
gL:function(a){return new H.af(H.aD(a),null)},
"%":"CanvasGradient|CanvasPattern|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|WebGLProgram|WebGLUniformLocation"},
ij:{"^":"h;",
i:function(a){return String(a)},
gG:function(a){return a?519018:218159},
gL:function(a){return C.ae},
$isbF:1},
dY:{"^":"h;",
w:function(a,b){return null==b},
i:function(a){return"null"},
gG:function(a){return 0},
gL:function(a){return C.a7}},
cA:{"^":"h;",
gG:function(a){return 0},
gL:function(a){return C.a6},
i:["es",function(a){return String(a)}],
$isdZ:1},
iK:{"^":"cA;"},
bd:{"^":"cA;"},
bw:{"^":"cA;",
i:function(a){var z=a[$.$get$dz()]
return z==null?this.es(a):J.aG(z)},
$signature:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
bu:{"^":"h;",
c7:function(a,b){if(!!a.immutable$list)throw H.e(new P.B(b))},
bl:function(a,b){if(!!a.fixed$length)throw H.e(new P.B(b))},
t:function(a,b){this.bl(a,"add")
a.push(b)},
ec:function(a,b,c){var z,y,x
this.c7(a,"setAll")
z=a.length
if(b>z)H.D(P.au(b,0,z,"index",null))
for(z=c.length,y=0;y<c.length;c.length===z||(0,H.bm)(c),++y,b=x){x=b+1
this.n(a,b,c[y])}},
a5:function(a){this.bl(a,"removeLast")
if(a.length===0)throw H.e(H.I(a,-1))
return a.pop()},
fq:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0)z.push(w)
if(a.length!==y)throw H.e(new P.N(a))}v=z.length
if(v===y)return
this.sj(a,v)
for(x=0;x<z.length;++x)this.n(a,x,z[x])},
D:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.N(a))}},
ar:function(a,b){return H.b(new H.bU(a,b),[null,null])},
hp:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.f(a[x])
if(x>=z)return H.a(y,x)
y[x]=w}return y.join(b)},
h7:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.e(new P.N(a))}return c.$0()},
Z:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
cM:function(a,b,c){if(b>a.length)throw H.e(P.au(b,0,a.length,"start",null))
if(c==null)c=a.length
else{if(typeof c!=="number"||Math.floor(c)!==c)throw H.e(H.L(c))
if(c<b||c>a.length)throw H.e(P.au(c,b,a.length,"end",null))}if(b===c)return H.b([],[H.q(a,0)])
return H.b(a.slice(b,c),[H.q(a,0)])},
gh6:function(a){if(a.length>0)return a[0]
throw H.e(H.bR())},
bz:function(a,b,c,d,e){var z,y,x
this.c7(a,"set range")
P.cM(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.e(H.ii())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
ee:function(a,b,c,d){return this.bz(a,b,c,d,0)},
ei:function(a,b){var z,y,x,w
this.c7(a,"shuffle")
if(b==null)b=C.w
z=a.length
for(;z>1;){y=b.cl(z);--z
x=a.length
if(z>=x)return H.a(a,z)
w=a[z]
if(y>>>0!==y||y>=x)return H.a(a,y)
this.n(a,z,a[y])
this.n(a,y,w)}},
aB:function(a,b){var z
for(z=0;z<a.length;++z)if(J.E(a[z],b))return!0
return!1},
i:function(a){return P.bQ(a,"[","]")},
gO:function(a){return H.b(new J.cn(a,a.length,0,null),[H.q(a,0)])},
gG:function(a){return H.ai(a)},
gj:function(a){return a.length},
sj:function(a,b){this.bl(a,"set length")
if(b<0)throw H.e(P.au(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.I(a,b))
if(b>=a.length||b<0)throw H.e(H.I(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.D(new P.B("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.I(a,b))
if(b>=a.length||b<0)throw H.e(H.I(a,b))
a[b]=c},
$isa4:1,
$asa4:I.ao,
$isj:1,
$asj:null,
$isu:1},
mN:{"^":"bu;"},
cn:{"^":"c;a,b,c,d",
gF:function(){return this.d},
C:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.bm(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
b9:{"^":"h;",
gdI:function(a){return a===0?1/a<0:a<0},
cq:function(a,b){return a%b},
dl:function(a){return Math.abs(a)},
gej:function(a){var z
if(a>0)z=1
else z=a<0?-1:a
return z},
hG:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.B(""+a+".toInt()"))},
bo:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.e(new P.B(""+a+".floor()"))},
b0:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.B(""+a+".round()"))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gG:function(a){return a&0x1FFFFFFF},
bv:function(a){return-a},
B:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return a+b},
q:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return a-b},
aj:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return a/b},
E:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return a*b},
M:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
X:function(a,b){if((a|0)===a)if(b>=1||!1)return a/b|0
return this.dd(a,b)},
N:function(a,b){return(a|0)===a?a/b|0:this.dd(a,b)},
dd:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(new P.B("Result of truncating division is "+H.f(z)+": "+H.f(a)+" ~/ "+b))},
ax:function(a,b){return b>31?0:a<<b>>>0},
da:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ai:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return(a&b)>>>0},
bD:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return(a^b)>>>0},
W:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return a<b},
T:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return a>b},
cI:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return a<=b},
U:function(a,b){if(typeof b!=="number")throw H.e(H.L(b))
return a>=b},
gL:function(a){return C.ah},
$isC:1},
cz:{"^":"b9;",
gL:function(a){return C.ag},
e4:function(a){return~a>>>0},
$isZ:1,
$isC:1,
$isp:1},
ik:{"^":"b9;",
gL:function(a){return C.af},
$isZ:1,
$isC:1},
bv:{"^":"h;",
aO:function(a,b){if(b<0)throw H.e(H.I(a,b))
if(b>=a.length)throw H.e(H.I(a,b))
return a.charCodeAt(b)},
B:function(a,b){if(typeof b!=="string")throw H.e(P.dn(b,null,null))
return a+b},
bB:function(a,b,c){H.fa(b)
if(c==null)c=a.length
H.fa(c)
if(b<0)throw H.e(P.bZ(b,null,null))
if(typeof c!=="number")return H.i(c)
if(b>c)throw H.e(P.bZ(b,null,null))
if(c>a.length)throw H.e(P.bZ(c,null,null))
return a.substring(b,c)},
el:function(a,b){return this.bB(a,b,null)},
hH:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.aO(z,0)===133){x=J.il(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.aO(z,w)===133?J.im(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
E:function(a,b){var z,y
if(typeof b!=="number")return H.i(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.e(C.E)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fQ:function(a,b,c){if(c>a.length)throw H.e(P.au(c,0,a.length,null,null))
return H.lQ(a,b,c)},
i:function(a){return a},
gG:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gL:function(a){return C.a9},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.I(a,b))
if(b>=a.length||b<0)throw H.e(H.I(a,b))
return a[b]},
$isa4:1,
$asa4:I.ao,
$isQ:1,
p:{
e_:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
il:function(a,b){var z,y
for(z=a.length;b<z;){y=C.o.aO(a,b)
if(y!==32&&y!==13&&!J.e_(y))break;++b}return b},
im:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.o.aO(a,z)
if(y!==32&&y!==13&&!J.e_(y))break}return b}}}}],["","",,H,{"^":"",
bE:function(a,b){var z=a.aS(b)
if(!init.globalState.d.cy)init.globalState.f.b1()
return z},
fn:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.e(P.a9("Arguments to main must be a List: "+H.f(y)))
init.globalState=new H.kv(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dU()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.k5(P.bT(null,H.bD),0)
y.z=H.b(new H.U(0,null,null,null,null,null,0),[P.p,H.cZ])
y.ch=H.b(new H.U(0,null,null,null,null,null,0),[P.p,null])
if(y.x===!0){x=new H.ku()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.ib,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.kw)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.b(new H.U(0,null,null,null,null,null,0),[P.p,H.c_])
w=P.aL(null,null,null,P.p)
v=new H.c_(0,null,!1)
u=new H.cZ(y,x,w,init.createNewIsolate(),v,new H.aI(H.ce()),new H.aI(H.ce()),!1,!1,[],P.aL(null,null,null,null),null,null,!1,!0,P.aL(null,null,null,null))
w.t(0,0)
u.cP(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bG()
x=H.aV(y,[y]).al(a)
if(x)u.aS(new H.lO(z,a))
else{y=H.aV(y,[y,y]).al(a)
if(y)u.aS(new H.lP(z,a))
else u.aS(a)}init.globalState.f.b1()},
ig:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.ih()
return},
ih:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.B("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.B('Cannot extract URI from "'+H.f(z)+'"'))},
ib:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.c3(!0,[]).ao(b.data)
y=J.M(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.c3(!0,[]).ao(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.c3(!0,[]).ao(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.b(new H.U(0,null,null,null,null,null,0),[P.p,H.c_])
p=P.aL(null,null,null,P.p)
o=new H.c_(0,null,!1)
n=new H.cZ(y,q,p,init.createNewIsolate(),o,new H.aI(H.ce()),new H.aI(H.ce()),!1,!1,[],P.aL(null,null,null,null),null,null,!1,!0,P.aL(null,null,null,null))
p.t(0,0)
n.cP(0,o)
init.globalState.f.a.a3(new H.bD(n,new H.ic(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b1()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.b0(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.b1()
break
case"close":init.globalState.ch.as(0,$.$get$dV().h(0,a))
a.terminate()
init.globalState.f.b1()
break
case"log":H.ia(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ad(["command","print","msg",z])
q=new H.aS(!0,P.bf(null,P.p)).a2(q)
y.toString
self.postMessage(q)}else P.bH(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
ia:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ad(["command","log","msg",a])
x=new H.aS(!0,P.bf(null,P.p)).a2(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.W(w)
z=H.S(w)
throw H.e(P.b7(z))}},
id:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.ee=$.ee+("_"+y)
$.ef=$.ef+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.b0(f,["spawned",new H.c5(y,x),w,z.r])
x=new H.ie(a,b,c,d,z)
if(e===!0){z.dm(w,w)
init.globalState.f.a.a3(new H.bD(z,x,"start isolate"))}else x.$0()},
kS:function(a){return new H.c3(!0,[]).ao(new H.aS(!1,P.bf(null,P.p)).a2(a))},
lO:{"^":"d:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
lP:{"^":"d:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
kv:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",p:{
kw:function(a){var z=P.ad(["command","print","msg",a])
return new H.aS(!0,P.bf(null,P.p)).a2(z)}}},
cZ:{"^":"c;A:a>,b,c,ho:d<,fS:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
dm:function(a,b){if(!this.f.w(0,a))return
if(this.Q.t(0,b)&&!this.y)this.y=!0
this.c0()},
hB:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.as(0,a)
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
if(w===y.c)y.d_();++y.d}this.y=!1}this.c0()},
fC:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
hA:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.D(new P.B("removeRange"))
P.cM(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
ed:function(a,b){if(!this.r.w(0,a))return
this.db=b},
hc:function(a,b,c){var z=J.l(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){J.b0(a,c)
return}z=this.cx
if(z==null){z=P.bT(null,null)
this.cx=z}z.a3(new H.kp(a,c))},
hb:function(a,b){var z
if(!this.r.w(0,a))return
z=J.l(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){this.ci()
return}z=this.cx
if(z==null){z=P.bT(null,null)
this.cx=z}z.a3(this.ghr())},
hd:function(a,b){var z,y
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bH(a)
if(b!=null)P.bH(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aG(a)
y[1]=b==null?null:J.aG(b)
for(z=H.b(new P.d_(z,z.r,null,null),[null]),z.c=z.a.e;z.C();)J.b0(z.d,y)},
aS:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.W(u)
w=t
v=H.S(u)
this.hd(w,v)
if(this.db===!0){this.ci()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gho()
if(this.cx!=null)for(;t=this.cx,!t.gag(t);)this.cx.cr().$0()}return y},
dK:function(a){return this.b.h(0,a)},
cP:function(a,b){var z=this.b
if(z.bm(a))throw H.e(P.b7("Registry: ports must be registered only once."))
z.n(0,a,b)},
c0:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.ci()},
ci:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aA(0)
for(z=this.b,y=z.gdV(z),y=y.gO(y);y.C();)y.gF().eN()
z.aA(0)
this.c.aA(0)
init.globalState.z.as(0,this.a)
this.dx.aA(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.b0(w,z[v])}this.ch=null}},"$0","ghr",0,0,2]},
kp:{"^":"d:2;a,b",
$0:function(){J.b0(this.a,this.b)}},
k5:{"^":"c;a,b",
fY:function(){var z=this.a
if(z.b===z.c)return
return z.cr()},
dS:function(){var z,y,x
z=this.fY()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bm(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gag(y)}else y=!1
else y=!1
else y=!1
if(y)H.D(P.b7("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gag(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ad(["command","close"])
x=new H.aS(!0,H.b(new P.eT(0,null,null,null,null,null,0),[null,P.p])).a2(x)
y.toString
self.postMessage(x)}return!1}z.aD()
return!0},
d7:function(){if(self.window!=null)new H.k6(this).$0()
else for(;this.dS(););},
b1:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.d7()
else try{this.d7()}catch(x){w=H.W(x)
z=w
y=H.S(x)
w=init.globalState.Q
v=P.ad(["command","error","msg",H.f(z)+"\n"+H.f(y)])
v=new H.aS(!0,P.bf(null,P.p)).a2(v)
w.toString
self.postMessage(v)}}},
k6:{"^":"d:2;a",
$0:function(){if(!this.a.dS())return
P.ep(C.z,this)}},
bD:{"^":"c;a,b,c",
aD:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aS(this.b)}},
ku:{"^":"c;"},
ic:{"^":"d:1;a,b,c,d,e,f",
$0:function(){H.id(this.a,this.b,this.c,this.d,this.e,this.f)}},
ie:{"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bG()
w=H.aV(x,[x,x]).al(y)
if(w)y.$2(this.b,this.c)
else{x=H.aV(x,[x]).al(y)
if(x)y.$1(this.b)
else y.$0()}}z.c0()}},
eL:{"^":"c;"},
c5:{"^":"eL;b,a",
bx:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gd2())return
x=H.kS(b)
if(z.gfS()===y){y=J.M(x)
switch(y.h(x,0)){case"pause":z.dm(y.h(x,1),y.h(x,2))
break
case"resume":z.hB(y.h(x,1))
break
case"add-ondone":z.fC(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.hA(y.h(x,1))
break
case"set-errors-fatal":z.ed(y.h(x,1),y.h(x,2))
break
case"ping":z.hc(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.hb(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.t(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.as(0,y)
break}return}init.globalState.f.a.a3(new H.bD(z,new H.ky(this,x),"receive"))},
w:function(a,b){if(b==null)return!1
return b instanceof H.c5&&J.E(this.b,b.b)},
gG:function(a){return this.b.gbQ()}},
ky:{"^":"d:1;a,b",
$0:function(){var z=this.a.b
if(!z.gd2())z.eF(this.b)}},
d2:{"^":"eL;b,c,a",
bx:function(a,b){var z,y,x
z=P.ad(["command","message","port",this,"msg",b])
y=new H.aS(!0,P.bf(null,P.p)).a2(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
w:function(a,b){if(b==null)return!1
return b instanceof H.d2&&J.E(this.b,b.b)&&J.E(this.a,b.a)&&J.E(this.c,b.c)},
gG:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eh()
y=this.a
if(typeof y!=="number")return y.eh()
x=this.c
if(typeof x!=="number")return H.i(x)
return(z<<16^y<<8^x)>>>0}},
c_:{"^":"c;bQ:a<,b,d2:c<",
eN:function(){this.c=!0
this.b=null},
eF:function(a){if(this.c)return
this.b.$1(a)},
$isiV:1},
ji:{"^":"c;a,b,c",
eD:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.a3(new H.bD(y,new H.jk(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aW(new H.jl(this,b),0),a)}else throw H.e(new P.B("Timer greater than 0."))},
p:{
jj:function(a,b){var z=new H.ji(!0,!1,null)
z.eD(a,b)
return z}}},
jk:{"^":"d:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
jl:{"^":"d:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aI:{"^":"c;bQ:a<",
gG:function(a){var z=this.a
if(typeof z!=="number")return z.hM()
z=C.d.da(z,0)^C.d.N(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aI){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aS:{"^":"c;a,b",
a2:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gj(z))
z=J.l(a)
if(!!z.$ise4)return["buffer",a]
if(!!z.$isbV)return["typed",a]
if(!!z.$isa4)return this.e8(a)
if(!!z.$isi9){x=this.ge5()
w=a.gdJ()
w=H.bz(w,x,H.J(w,"P",0),null)
w=P.cD(w,!0,H.J(w,"P",0))
z=z.gdV(a)
z=H.bz(z,x,H.J(z,"P",0),null)
return["map",w,P.cD(z,!0,H.J(z,"P",0))]}if(!!z.$isdZ)return this.e9(a)
if(!!z.$ish)this.dT(a)
if(!!z.$isiV)this.b3(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isc5)return this.ea(a)
if(!!z.$isd2)return this.eb(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.b3(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaI)return["capability",a.a]
if(!(a instanceof P.c))this.dT(a)
return["dart",init.classIdExtractor(a),this.e7(init.classFieldsExtractor(a))]},"$1","ge5",2,0,0],
b3:function(a,b){throw H.e(new P.B(H.f(b==null?"Can't transmit:":b)+" "+H.f(a)))},
dT:function(a){return this.b3(a,null)},
e8:function(a){var z=this.e6(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.b3(a,"Can't serialize indexable: ")},
e6:function(a){var z,y,x
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.a2(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
e7:function(a){var z
for(z=0;z<a.length;++z)C.b.n(a,z,this.a2(a[z]))
return a},
e9:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.b3(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.a2(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
eb:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
ea:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbQ()]
return["raw sendport",a]}},
c3:{"^":"c;a,b",
ao:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.a9("Bad serialized message: "+H.f(a)))
switch(C.b.gh6(a)){case"ref":if(1>=a.length)return H.a(a,1)
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
y=H.b(this.aR(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.b(this.aR(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.aR(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.b(this.aR(x),[null])
y.fixed$length=Array
return y
case"map":return this.h0(a)
case"sendport":return this.h1(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.h_(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.aI(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aR(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.f(a))}},"$1","gfZ",2,0,0],
aR:function(a){var z,y,x
z=J.M(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.i(x)
if(!(y<x))break
z.n(a,y,this.ao(z.h(a,y)));++y}return a},
h0:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.it()
this.b.push(w)
y=J.fO(y,this.gfZ()).bt(0)
for(z=J.M(y),v=J.M(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.a(y,u)
w.n(0,y[u],this.ao(v.h(x,u)))}return w},
h1:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.E(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dK(w)
if(u==null)return
t=new H.c5(u,x)}else t=new H.d2(y,w,x)
this.b.push(t)
return t},
h_:function(a){var z,y,x,w,v,u,t
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
w[z.h(y,u)]=this.ao(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
fh:function(a){return init.getTypeFromName(a)},
le:function(a){return init.types[a]},
fg:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaq},
f:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aG(a)
if(typeof z!=="string")throw H.e(H.L(a))
return z},
ai:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
ed:function(a,b){throw H.e(new P.dO(a,null,null))},
iQ:function(a,b,c){var z,y
H.fb(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.ed(a,c)
if(3>=z.length)return H.a(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.ed(a,c)},
ec:function(a,b){throw H.e(new P.dO("Invalid double",a,null))},
iP:function(a,b){var z,y
H.fb(a)
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.ec(a,b)
z=parseFloat(a)
if(isNaN(z)){y=J.fU(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.ec(a,b)}return z},
cK:function(a){var z,y,x,w,v,u,t,s
z=J.l(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.M||!!J.l(a).$isbd){v=C.C(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.o.aO(w,0)===36)w=C.o.el(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d8(H.ca(a),0,null),init.mangledGlobalNames)},
bY:function(a){return"Instance of '"+H.cK(a)+"'"},
cJ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.L(a))
return a[b]},
eg:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.L(a))
a[b]=c},
i:function(a){throw H.e(H.L(a))},
a:function(a,b){if(a==null)J.bo(a)
throw H.e(H.I(a,b))},
I:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aH(!0,b,"index",null)
z=J.bo(a)
if(!(b<0)){if(typeof z!=="number")return H.i(z)
y=b>=z}else y=!0
if(y)return P.bt(b,a,"index",null,z)
return P.bZ(b,"index",null)},
L:function(a){return new P.aH(!0,a,null,null)},
a1:function(a){if(typeof a!=="number")throw H.e(H.L(a))
return a},
fa:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.L(a))
return a},
fb:function(a){if(typeof a!=="string")throw H.e(H.L(a))
return a},
e:function(a){var z
if(a==null)a=new P.cH()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.fo})
z.name=""}else z.toString=H.fo
return z},
fo:function(){return J.aG(this.dartException)},
D:function(a){throw H.e(a)},
bm:function(a){throw H.e(new P.N(a))},
W:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.lU(a)
if(a==null)return
if(a instanceof H.cv)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.da(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cC(H.f(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.f(y)+" (Error "+w+")"
return z.$1(new H.e9(v,null))}}if(a instanceof TypeError){u=$.$get$eu()
t=$.$get$ev()
s=$.$get$ew()
r=$.$get$ex()
q=$.$get$eB()
p=$.$get$eC()
o=$.$get$ez()
$.$get$ey()
n=$.$get$eE()
m=$.$get$eD()
l=u.a4(y)
if(l!=null)return z.$1(H.cC(y,l))
else{l=t.a4(y)
if(l!=null){l.method="call"
return z.$1(H.cC(y,l))}else{l=s.a4(y)
if(l==null){l=r.a4(y)
if(l==null){l=q.a4(y)
if(l==null){l=p.a4(y)
if(l==null){l=o.a4(y)
if(l==null){l=r.a4(y)
if(l==null){l=n.a4(y)
if(l==null){l=m.a4(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.e9(y,l==null?null:l.method))}}return z.$1(new H.ju(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.el()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aH(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.el()
return a},
S:function(a){var z
if(a instanceof H.cv)return a.b
if(a==null)return new H.eU(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eU(a,null)},
lx:function(a){if(a==null||typeof a!='object')return J.X(a)
else return H.ai(a)},
lc:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
lm:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bE(b,new H.ln(a))
case 1:return H.bE(b,new H.lo(a,d))
case 2:return H.bE(b,new H.lp(a,d,e))
case 3:return H.bE(b,new H.lq(a,d,e,f))
case 4:return H.bE(b,new H.lr(a,d,e,f,g))}throw H.e(P.b7("Unsupported number of arguments for wrapped closure"))},
aW:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.lm)
a.$identity=z
return z},
h6:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.iY(z).r}else x=c
w=d?Object.create(new H.j6().constructor.prototype):Object.create(new H.cp(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.ab
$.ab=J.w(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ds(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.le,x)
else if(u&&typeof x=="function"){q=t?H.dq:H.cq
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ds(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
h3:function(a,b,c,d){var z=H.cq
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ds:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.h5(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.h3(y,!w,z,b)
if(y===0){w=$.ab
$.ab=J.w(w,1)
u="self"+H.f(w)
w="return function(){var "+u+" = this."
v=$.b2
if(v==null){v=H.bM("self")
$.b2=v}return new Function(w+H.f(v)+";return "+u+"."+H.f(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ab
$.ab=J.w(w,1)
t+=H.f(w)
w="return function("+t+"){return this."
v=$.b2
if(v==null){v=H.bM("self")
$.b2=v}return new Function(w+H.f(v)+"."+H.f(z)+"("+t+");}")()},
h4:function(a,b,c,d){var z,y
z=H.cq
y=H.dq
switch(b?-1:a){case 0:throw H.e(new H.iZ("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
h5:function(a,b){var z,y,x,w,v,u,t,s
z=H.fY()
y=$.dp
if(y==null){y=H.bM("receiver")
$.dp=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.h4(w,!u,x,b)
if(w===1){y="return function(){return this."+H.f(z)+"."+H.f(x)+"(this."+H.f(y)+");"
u=$.ab
$.ab=J.w(u,1)
return new Function(y+H.f(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.f(z)+"."+H.f(x)+"(this."+H.f(y)+", "+s+");"
u=$.ab
$.ab=J.w(u,1)
return new Function(y+H.f(u)+"}")()},
d5:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.h6(a,b,z,!!d,e,f)},
lz:function(a,b){var z=J.M(b)
throw H.e(H.h1(H.cK(a),z.bB(b,3,z.gj(b))))},
a2:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.l(a)[b]
else z=!0
if(z)return a
H.lz(a,b)},
lR:function(a){throw H.e(new P.he("Cyclic initialization for static "+H.f(a)))},
aV:function(a,b,c){return new H.j_(a,b,c,null)},
f9:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.j1(z)
return new H.j0(z,b,null)},
bG:function(){return C.D},
ce:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
t:function(a){return new H.af(a,null)},
b:function(a,b){a.$builtinTypeInfo=b
return a},
ca:function(a){if(a==null)return
return a.$builtinTypeInfo},
fe:function(a,b){return H.df(a["$as"+H.f(b)],H.ca(a))},
J:function(a,b,c){var z=H.fe(a,b)
return z==null?null:z[c]},
q:function(a,b){var z=H.ca(a)
return z==null?null:z[b]},
dd:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d8(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.a.i(a)
else return},
d8:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cN("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.f(H.dd(u,c))}return w?"":"<"+H.f(z)+">"},
aD:function(a){var z=J.l(a).constructor.builtin$cls
if(a==null)return z
return z+H.d8(a.$builtinTypeInfo,0,null)},
df:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
l5:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.ca(a)
y=J.l(a)
if(y[b]==null)return!1
return H.f7(H.df(y[d],z),c)},
f7:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a3(a[y],b[y]))return!1
return!0},
c6:function(a,b,c){return a.apply(b,H.fe(b,c))},
a3:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.ff(a,b)
if('func' in a)return b.builtin$cls==="hv"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.dd(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.f(H.dd(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.f7(H.df(v,z),x)},
f6:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a3(z,v)||H.a3(v,z)))return!1}return!0},
l1:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a3(v,u)||H.a3(u,v)))return!1}return!0},
ff:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a3(z,y)||H.a3(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.f6(x,w,!1))return!1
if(!H.f6(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a3(o,n)||H.a3(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a3(o,n)||H.a3(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a3(o,n)||H.a3(n,o)))return!1}}return H.l1(a.named,b.named)},
nZ:function(a){var z=$.d6
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
nY:function(a){return H.ai(a)},
nW:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
ls:function(a){var z,y,x,w,v,u
z=$.d6.$1(a)
y=$.c7[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cc[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.f5.$2(a,z)
if(z!=null){y=$.c7[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cc[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.db(x)
$.c7[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cc[z]=x
return x}if(v==="-"){u=H.db(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.fk(a,x)
if(v==="*")throw H.e(new P.eG(z))
if(init.leafTags[z]===true){u=H.db(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.fk(a,x)},
fk:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cd(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
db:function(a){return J.cd(a,!1,null,!!a.$isaq)},
lw:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.cd(z,!1,null,!!z.$isaq)
else return J.cd(z,c,null,null)},
lk:function(){if(!0===$.d7)return
$.d7=!0
H.ll()},
ll:function(){var z,y,x,w,v,u,t,s
$.c7=Object.create(null)
$.cc=Object.create(null)
H.lg()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.fl.$1(v)
if(u!=null){t=H.lw(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
lg:function(){var z,y,x,w,v,u,t
z=C.O()
z=H.aU(C.P,H.aU(C.Q,H.aU(C.B,H.aU(C.B,H.aU(C.S,H.aU(C.R,H.aU(C.T(C.C),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.d6=new H.lh(v)
$.f5=new H.li(u)
$.fl=new H.lj(t)},
aU:function(a,b){return a(b)||b},
lQ:function(a,b,c){return a.indexOf(b,c)>=0},
iX:{"^":"c;a,b,c,d,e,f,r,x",p:{
iY:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.iX(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
jt:{"^":"c;a,b,c,d,e,f",
a4:function(a){var z,y,x
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
p:{
ae:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.jt(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
c2:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
eA:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
e9:{"^":"O;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.f(this.a)
return"NullError: method not found: '"+H.f(z)+"' on null"}},
ip:{"^":"O;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.f(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.f(z)+"' ("+H.f(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.f(z)+"' on '"+H.f(y)+"' ("+H.f(this.a)+")"},
p:{
cC:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.ip(a,y,z?null:b.receiver)}}},
ju:{"^":"O;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
cv:{"^":"c;a,a9:b<"},
lU:{"^":"d:0;a",
$1:function(a){if(!!J.l(a).$isO)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eU:{"^":"c;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ln:{"^":"d:1;a",
$0:function(){return this.a.$0()}},
lo:{"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
lp:{"^":"d:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
lq:{"^":"d:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
lr:{"^":"d:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{"^":"c;",
i:function(a){return"Closure '"+H.cK(this)+"'"},
gdW:function(){return this},
gdW:function(){return this}},
en:{"^":"d;"},
j6:{"^":"en;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cp:{"^":"en;a,b,c,d",
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cp))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gG:function(a){var z,y
z=this.c
if(z==null)y=H.ai(this.a)
else y=typeof z!=="object"?J.X(z):H.ai(z)
return J.fs(y,H.ai(this.b))},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.f(this.d)+"' of "+H.bY(z)},
p:{
cq:function(a){return a.a},
dq:function(a){return a.c},
fY:function(){var z=$.b2
if(z==null){z=H.bM("self")
$.b2=z}return z},
bM:function(a){var z,y,x,w,v
z=new H.cp("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
h0:{"^":"O;a",
i:function(a){return this.a},
p:{
h1:function(a,b){return new H.h0("CastError: Casting value of type "+H.f(a)+" to incompatible type "+H.f(b))}}},
iZ:{"^":"O;a",
i:function(a){return"RuntimeError: "+H.f(this.a)}},
c1:{"^":"c;"},
j_:{"^":"c1;a,b,c,d",
al:function(a){var z=this.eU(a)
return z==null?!1:H.ff(z,this.ab())},
eU:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
ab:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isnH)z.v=true
else if(!x.$isdH)z.ret=y.ab()
y=this.b
if(y!=null&&y.length!==0)z.args=H.ej(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.ej(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.fc(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ab()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.f(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.f(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.fc(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.f(z[s].ab())+" "+s}x+="}"}}return x+(") -> "+H.f(this.a))},
p:{
ej:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ab())
return z}}},
dH:{"^":"c1;",
i:function(a){return"dynamic"},
ab:function(){return}},
j1:{"^":"c1;a",
ab:function(){var z,y
z=this.a
y=H.fh(z)
if(y==null)throw H.e("no type for '"+z+"'")
return y},
i:function(a){return this.a}},
j0:{"^":"c1;a,b,c",
ab:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.fh(z)]
if(0>=y.length)return H.a(y,0)
if(y[0]==null)throw H.e("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.bm)(z),++w)y.push(z[w].ab())
this.c=y
return y},
i:function(a){var z=this.b
return this.a+"<"+(z&&C.b).hp(z,", ")+">"}},
af:{"^":"c;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gG:function(a){return J.X(this.a)},
w:function(a,b){if(b==null)return!1
return b instanceof H.af&&J.E(this.a,b.a)}},
U:{"^":"c;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gag:function(a){return this.a===0},
gdJ:function(){return H.b(new H.ir(this),[H.q(this,0)])},
gdV:function(a){return H.bz(this.gdJ(),new H.io(this),H.q(this,0),H.q(this,1))},
bm:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cV(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cV(y,a)}else return this.hk(a)},
hk:function(a){var z=this.d
if(z==null)return!1
return this.aV(this.bc(z,this.aU(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aK(z,b)
return y==null?null:y.gaq()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.aK(x,b)
return y==null?null:y.gaq()}else return this.hl(b)},
hl:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bc(z,this.aU(a))
x=this.aV(y,a)
if(x<0)return
return y[x].gaq()},
n:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bS()
this.b=z}this.cO(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bS()
this.c=y}this.cO(y,b,c)}else{x=this.d
if(x==null){x=this.bS()
this.d=x}w=this.aU(b)
v=this.bc(x,w)
if(v==null)this.bY(x,w,[this.bT(b,c)])
else{u=this.aV(v,b)
if(u>=0)v[u].saq(c)
else v.push(this.bT(b,c))}}},
dP:function(a,b){var z
if(this.bm(a))return this.h(0,a)
z=b.$0()
this.n(0,a,z)
return z},
as:function(a,b){if(typeof b==="string")return this.d5(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.d5(this.c,b)
else return this.hm(b)},
hm:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bc(z,this.aU(a))
x=this.aV(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.dg(w)
return w.gaq()},
aA:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.e(new P.N(this))
z=z.c}},
cO:function(a,b,c){var z=this.aK(a,b)
if(z==null)this.bY(a,b,this.bT(b,c))
else z.saq(c)},
d5:function(a,b){var z
if(a==null)return
z=this.aK(a,b)
if(z==null)return
this.dg(z)
this.cX(a,b)
return z.gaq()},
bT:function(a,b){var z,y
z=H.b(new H.iq(a,b,null,null),[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
dg:function(a){var z,y
z=a.gfh()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aU:function(a){return J.X(a)&0x3ffffff},
aV:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].gdH(),b))return y
return-1},
i:function(a){return P.iy(this)},
aK:function(a,b){return a[b]},
bc:function(a,b){return a[b]},
bY:function(a,b,c){a[b]=c},
cX:function(a,b){delete a[b]},
cV:function(a,b){return this.aK(a,b)!=null},
bS:function(){var z=Object.create(null)
this.bY(z,"<non-identifier-key>",z)
this.cX(z,"<non-identifier-key>")
return z},
$isi9:1,
p:{
cB:function(a,b){return H.b(new H.U(0,null,null,null,null,null,0),[a,b])}}},
io:{"^":"d:0;a",
$1:function(a){return this.a.h(0,a)}},
iq:{"^":"c;dH:a<,aq:b@,c,fh:d<"},
ir:{"^":"P;a",
gj:function(a){return this.a.a},
gO:function(a){var z,y
z=this.a
y=new H.is(z,z.r,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.c=z.e
return y},
D:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.N(z))
y=y.c}},
$isu:1},
is:{"^":"c;a,b,c,d",
gF:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
lh:{"^":"d:0;a",
$1:function(a){return this.a(a)}},
li:{"^":"d:35;a",
$2:function(a,b){return this.a(a,b)}},
lj:{"^":"d:15;a",
$1:function(a){return this.a(a)}}}],["","",,D,{"^":"",fX:{"^":"c;a,b,c,d,e,f,r,x",
gj:function(a){return this.c},
gfJ:function(){var z=this.x
return H.b(new P.jV(z),[H.q(z,0)])},
fT:function(a,b,c){var z,y,x
if(typeof c!=="number")return H.i(c)
z=b.length
y=0
for(;y<c;++y){if(y>=a.length)return H.a(a,y)
x=a[y]
if(y>=z)return H.a(b,y)
b[y]=x}},
by:function(a){var z,y,x,w,v,u
z=J.y(a)
if(!z.U(a,0))H.D(P.a9("should be > 0"))
if(z.w(a,this.c))return
y=J.aE(z.B(a,31),32)
x=J.y(y)
if(x.T(y,this.b.length)||J.bI(x.B(y,this.a),this.b.length)){w=new Uint32Array(H.m(y))
v=this.b
this.fT(v,w,x.T(y,v.length)?this.b.length:y)
this.b=w}if(z.T(a,this.c)){z=this.c
if(typeof z!=="number")return z.M()
if(C.d.M(z,32)>0){x=this.b
z=C.d.N(z+31,32)-1
if(z>>>0!==z||z>=x.length)return H.a(x,z)
v=x[z]
u=this.c
if(typeof u!=="number")return u.M()
x[z]=(v&C.a.ax(1,C.d.M(u,32)&31)-1)>>>0
z=u}x=this.b;(x&&C.Y).h4(x,J.aE(J.w(z,31),32),y,0)}this.c=a
this.scD(this.d+1)},
scD:function(a){this.d=a},
dt:function(a){var z=D.A(0,!1)
z.b=new Uint32Array(H.eY(this.b))
z.c=this.c
z.d=this.d
return z},
i:function(a){return H.f(this.c)+" bits, "+H.f(this.dv(!0))+" set"},
fF:function(a){var z,y,x
if(!J.E(this.c,a.gf8()))H.D(P.a9("Array lengths differ."))
z=J.aE(J.w(this.c,31),32)
if(typeof z!=="number")return H.i(z)
y=0
for(;y<z;++y){x=this.b
if(y>=x.length)return H.a(x,y)
x[y]=C.a.ai(x[y],a.geT().h(0,y))}this.scD(this.d+1)
return this},
hL:function(a){var z,y,x
if(!J.E(this.c,a.gf8()))H.D(P.a9("Array lengths differ."))
z=J.aE(J.w(this.c,31),32)
if(typeof z!=="number")return H.i(z)
y=0
for(;y<z;++y){x=this.b
if(y>=x.length)return H.a(x,y)
x[y]=C.a.bD(x[y],a.geT().h(0,y))}this.scD(this.d+1)
return this},
ai:function(a,b){return this.dt(0).fF(b)},
bD:function(a,b){return this.dt(0).hL(b)},
h:function(a,b){var z,y
z=this.b
y=J.aE(b,32)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
y=z[y]
if(typeof b!=="number")return b.ai()
return(y&C.a.ax(1,b&31))>>>0!==0},
n:function(a,b,c){var z,y,x
z=J.y(b)
y=this.b
if(c===!0){z=z.X(b,32)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
x=y[z]
if(typeof b!=="number")return b.ai()
y[z]=(x|C.a.ax(1,b&31))>>>0}else{z=z.X(b,32)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
x=y[z]
if(typeof b!=="number")return b.ai()
y[z]=(x&~C.a.ax(1,b&31))>>>0}++this.d},
dv:function(a){var z,y,x,w,v,u,t,s
if(J.E(this.c,0))return 0
if(this.r!==this.d){this.f=0
z=J.aE(J.w(this.c,31),32)
y=J.y(z)
x=0
while(!0){w=y.q(z,1)
if(typeof w!=="number")return H.i(w)
if(!(x<w))break
w=this.b
if(x>=w.length)return H.a(w,x)
v=w[x]
for(;v!==0;v=v>>>8){w=this.f
u=$.$get$co()
t=v&255
if(t>=u.length)return H.a(u,t)
t=u[t]
if(typeof w!=="number")return w.B()
this.f=w+t}++x}y=this.b
if(x>=y.length)return H.a(y,x)
v=y[x]
y=this.c
if(typeof y!=="number")return y.ai()
s=y&31
if(s!==0)v=(v&~C.a.ax(4294967295,s))>>>0
for(;v!==0;v=v>>>8){y=this.f
w=$.$get$co()
u=v&255
if(u>=w.length)return H.a(w,u)
u=w[u]
if(typeof y!=="number")return y.B()
this.f=y+u}}return this.f},
ex:function(a,b){this.b=new Uint32Array(H.m((a+31)/32|0))
this.c=a
this.d=0},
c6:function(a){return this.gfJ().$1(a)},
p:{
A:function(a,b){var z=new D.fX(256,null,null,null,null,null,-1,H.b(new P.jP(null,null,0,null,null,null,null),[null]))
z.ex(a,!1)
return z}}}}],["","",,F,{"^":"",hy:{"^":"hz;dy,fr,dZ:fx?,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
e0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=D.A(16,!1)
y=new Array(16)
y.fixed$length=Array
y=new F.jn(null,null,0,100,0,null,new S.G(z,!1,y,0),0,0,0,null,null,null)
y.P(new S.b1(0,0,0))
z=D.A(16,!1)
x=new Array(16)
x.fixed$length=Array
x=new F.iH(null,null,null,1,0,null,new S.G(z,!1,x,0),0,0,0,null,null,null)
x.P(new S.b1(0,0,0))
z=D.A(16,!1)
w=new Array(16)
w.fixed$length=Array
w=new F.js(0,null,new S.G(z,!1,w,0),0,0,0,null,null,null)
w.P(new S.b1(0,0,0))
z=H.b(new P.a5(0,0),[P.Z])
v=S.aa([C.p])
u=P.iu([38,40,37,39,32],null)
t=D.A(16,!1)
s=new Array(16)
s.fixed$length=Array
s=new F.i2(null,null,null,null,new F.hT(this),z,u,P.bx(P.p,P.bF),P.bx(P.p,P.bF),0,null,new S.G(t,!1,s,0),v.a,v.b,v.c,null,null,null)
s.P(v)
v=S.aa([C.c,C.m])
t=D.A(16,!1)
u=new Array(16)
u.fixed$length=Array
u=new F.iB(null,null,0,null,new S.G(t,!1,u,0),v.a,v.b,v.c,null,null,null)
u.P(v)
v=this.fr
t=S.aa([C.c,C.m])
z=D.A(16,!1)
r=new Array(16)
r.fixed$length=Array
r=new F.cI(null,null,v,0,null,new S.G(z,!1,r,0),t.a,t.b,t.c,null,null,null)
r.P(t)
t=S.aa([C.n,C.l])
z=D.A(16,!1)
v=new Array(16)
v.fixed$length=Array
v=new F.ek(null,null,!1,3,0,0,null,new S.G(z,!1,v,0),t.a,t.b,t.c,null,null,null)
v.P(t)
t=this.b
z=D.A(16,!1)
q=new Array(16)
q.fixed$length=Array
q=new L.jv(t,0,null,new S.G(z,!1,q,0),0,0,0,null,null,null)
q.P(new S.b1(0,0,0))
z=S.aa([C.k,C.c,C.r])
p=D.A(16,!1)
o=new Array(16)
o.fixed$length=Array
o=new F.iG(null,null,null,null,null,null,null,null,7,120,null,t,0,null,null,null,null,null,P.bx(P.Q,P.cr),!0,0,null,new S.G(p,!1,o,0),z.a,z.b,z.c,null,null,null)
o.P(z)
o.fx=[new L.bK("aPos",3),new L.bK("aColor",4)]
z=S.aa([C.c,C.v])
p=D.A(16,!1)
n=new Array(16)
n.fixed$length=Array
n=new F.jm(null,null,null,null,null,3,128,null,t,0,null,null,null,null,null,P.bx(P.Q,P.cr),!0,0,null,new S.G(p,!1,n,0),z.a,z.b,z.c,null,null,null)
n.P(z)
n.dx=[new L.bK("aPos",3)]
z=S.aa([C.c,C.n,C.l])
p=D.A(16,!1)
m=new Array(16)
m.fixed$length=Array
m=new F.iL(null,null,null,null,null,null,3,null,t,0,null,null,null,null,null,P.bx(P.Q,P.cr),!0,0,null,new S.G(p,!1,m,0),z.a,z.b,z.c,null,null,null)
m.P(z)
m.dy=[new L.bK("aPos",3)]
z=S.aa([C.c])
p=D.A(16,!1)
t=new Array(16)
t.fixed$length=Array
t=new F.hf(null,null,0,null,new S.G(p,!1,t,0),z.a,z.b,z.c,null,null,null)
t.P(z)
z=this.dy
p=D.A(16,!1)
l=new Array(16)
l.fixed$length=Array
l=new L.fZ(z,"white",0,null,new S.G(p,!1,l,0),0,0,0,null,null,null)
l.P(new S.b1(0,0,0))
p=this.dy
z=S.aa([C.p,C.c])
k=D.A(16,!1)
j=new Array(16)
j.fixed$length=Array
j=new F.hh(null,null,p,0,null,new S.G(k,!1,j,0),z.a,z.b,z.c,null,null,null)
j.P(z)
z=S.aa([C.k,C.c])
k=D.A(16,!1)
p=new Array(16)
p.fixed$length=Array
p=new F.iF(null,null,null,null,null,null,null,!0,!0,!1,0,null,new S.G(k,!1,p,0),z.a,z.b,z.c,null,null,null)
p.P(z)
return P.ad([0,[y,x,w,s,u,r,v,q,o,n,m,t,l,j],1,[p]])},
ce:function(a,b){var z
a=P.aX(800,a)
b=P.aX(600,b)
this.dQ(this.a,a,b)
this.dQ(this.dy,a,b)
H.a2(this.b,"$isc0").viewport(0,0,a,b)
z=H.a2(this.y.z.h(0,C.j),"$isbO")
z.b=a
z.c=b},
dQ:function(a,b,c){var z,y
z=J.k(a)
z.sk(a,b)
z.sl(a,c)
z=a.style
y=H.f(b)+"px"
z.width=y
z=a.style
y=H.f(c)+"px"
z.height=y},
dM:function(){return H.a2(this.y.z.h(0,C.j),"$isbO").d.a},
scL:function(a){this.fr=a
H.a2(this.y.x.h(0,C.a8),"$iscI").ch=a},
ez:function(){var z,y
$.a6=183
this.y.aN(new F.bO(null,null,H.b(new P.eK(H.b(new P.V(0,$.n,null),[P.p])),[P.p]),null))
this.y.aN(new F.eH(null,null,null,null))
z=this.y
y=H.b(new H.U(0,null,null,null,null,null,0),[P.Q,S.ap])
z.aN(new S.cO(y,H.b(new H.U(0,null,null,null,null,null,0),[S.ap,P.Q]),null))
this.dy=document.querySelector("#hud")
this.ce(window.innerWidth,window.innerHeight)
z=H.b(new W.aQ(window,"resize",!1),[H.q(C.J,0)])
H.b(new W.a7(0,z.a,z.b,W.R(new F.hS(this)),!1),[H.q(z,0)]).Y()},
p:{
dQ:function(){var z,y,x,w
z=document.querySelector("#game")
y=H.a2(document.querySelector("#game"),"$iscs")
y.toString
x=P.ad(["alpha",!0,"depth",!0,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
w=(y&&C.x).cF(y,"webgl",x)
if(w==null)w=C.x.cF(y,"experimental-webgl",x)
y=w
y=new F.hy(null,0,null,z,y,new L.hR("ld35",null),null,null,800,600,!0,null,null,null,null,null,!1,!1,!1)
y.eA("ld35","#game",800,600,!0,null,!0,null,!0)
y.ez()
return y}}},hS:{"^":"d:0;a",
$1:function(a){return this.a.ce(window.innerWidth,window.innerHeight)}},hT:{"^":"d:1;a",
$0:function(){return this.a.fx}},i2:{"^":"hU;cx,cy,db,dx,dy,fr,z,Q,ch,a,b,c,d,e,f,r,x,y",
aE:function(a){var z,y,x,w
z=J.o(this.cy.b,J.K(a))
if(this.ah(87)||this.ah(38))z.gm().a[1]=-80
else if(this.ah(83)||this.ah(40))z.gm().a[1]=80
else z.gm().a[1]=0
if(this.ah(65)||this.ah(37))z.gm().a[0]=-80
else if(this.ah(68)||this.ah(39))z.gm().a[0]=80
else z.gm().a[0]=0
y=this.dy
if(null!=y.$0()){x=window.navigator.getGamepads()
y=y.$0()
if(y>>>0!==y||y>=x.length)return H.a(x,y)
w=x[y]
if(J.o(w.buttons,1).gbq())this.cx.saX(0)
else if(J.o(w.buttons,2).gbq())this.cx.saX(1)
else if(J.o(w.buttons,3).gbq())this.cx.saX(2)
y=z.gm()
x=J.bn(J.dh(J.o(w.axes,0)),0.3)?J.dk(J.o(w.axes,0))*4*20:0
y.a[0]=x
x=z.gm()
y=J.bn(J.dh(J.o(w.axes,1)),0.3)?J.dk(J.o(w.axes,1))*4*20:0
x.a[1]=y}},
cd:function(a,b){var z,y
this.ep(a,b)
if(b){z=J.ci(a)
if(typeof z!=="number")return z.U()
if(z>=49){z=a.keyCode
y=this.cx.gck()
if(typeof z!=="number")return z.W()
y=z<49+y
z=y}else z=!1
if(z){z=this.cx
y=a.keyCode
if(typeof y!=="number")return y.q()
z.saX(y-49)}else{z=a.keyCode
if(typeof z!=="number")return z.U()
if(z>=97&&z<97+this.cx.gck()){z=this.cx
y=a.keyCode
if(typeof y!=="number")return y.q()
z.saX(y-97)}}}},
H:function(){var z,y
this.eq()
z=this.b
y=H.b(new S.z(null,null),[F.b4])
y.K(C.p,z,F.b4)
this.db=y
y=this.b
z=H.b(new S.z(null,null),[F.v])
z.K(C.c,y,F.v)
this.cy=z
this.cx=this.b.x.h(0,C.u)
this.dx=this.b.z.h(0,C.j)}},iL:{"^":"cU;ch,cx,cy,db,dx,dy,fr,fx,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=J.k(b)
y=J.o(this.ch.b,z.gA(b))
x=J.o(this.cx.b,z.gA(b))
w=J.o(this.cy.b,z.gA(b))
v=a*x.ga6().length
u=a*x.gaT().length
for(t=0;t<x.gaT().length;++t){z=this.dx
s=u+t
r=x.gaT()
if(t>=r.length)return H.a(r,t)
r=r[t]
if(s>=z.length)return H.a(z,s)
z[s]=r}for(t=0;t<x.ga6().length;t+=3){z=this.db
s=v+t
r=x.ga6()
if(t>=r.length)return H.a(r,t)
r=J.w(J.F(r[t],w.gaF()),y.gm().a[0])
if(s>=z.length)return H.a(z,s)
z[s]=r
r=this.db
z=s+1
q=x.ga6()
p=t+1
if(p>=q.length)return H.a(q,p)
p=J.w(J.F(q[p],w.gaF()),y.gm().a[1])
if(z>=r.length)return H.a(r,z)
r[z]=p
p=this.db
s+=2
z=x.ga6()
r=t+2
if(r>=z.length)return H.a(z,r)
r=J.w(z[r],y.gm().a[2])
if(s>=p.length)return H.a(p,s)
p[s]=r}},
cs:function(a){var z=this.z
z.uniformMatrix4fv(J.cm(z,this.gV(),"uViewProjection"),!1,this.fx.c8().gaH())
this.c5(this.dy,this.db,this.dx)
z.drawElements(4,this.dx.length,5123,0)},
cB:function(a){var z,y
z=J.bk(a)
y=this.fr
this.db=new Float32Array(H.m(J.F(z.E(a,61),y)))
this.dx=new Uint16Array(H.m(J.F(z.E(a,60),y)))},
gcc:function(){return"PlayerRenderingSystem"},
gcC:function(){return"PlayerRenderingSystem"},
H:function(){var z,y
this.bC()
z=this.b
y=H.b(new S.z(null,null),[F.av])
y.K(C.l,z,F.av)
this.cy=y
y=this.b
z=H.b(new S.z(null,null),[F.az])
z.K(C.n,y,F.az)
this.cx=z
z=this.b
y=H.b(new S.z(null,null),[F.v])
y.K(C.c,z,F.v)
this.ch=y
this.fx=this.b.z.h(0,C.t)}},jm:{"^":"cU;ch,cx,cy,db,dx,dy,fr,fx,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=J.k(b)
y=J.o(this.ch.b,z.gA(b))
x=J.o(this.cx.b,z.gA(b))
z=this.fr
w=a*z
v=this.dy
u=w*v
t=w*3
for(s=0;s<z;s+=2){r=6.283185307179586*s/z
q=u+s*3
w=this.cy
p=Math.sin(r)
o=x.gaF()
if(typeof o!=="number")return H.i(o)
if(q>=w.length)return H.a(w,q)
w[q]=p*o
o=this.cy
p=q+1
w=Math.cos(r)
n=x.gaF()
if(typeof n!=="number")return H.i(n)
if(p>=o.length)return H.a(o,p)
o[p]=w*n
n=this.cy
w=q+2
o=y.gm().a[2]
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
o[p]=w+l}for(w=this.db,s=0;s<z;s+=2){q=C.a.X(u,v)+s
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
v=C.a.X(u,v)
o=w.length
if(p<0||p>=o)return H.a(w,p)
w[p]=v
p=z-3
if(p<0||p>=o)return H.a(w,p)
w[p]=v;--z
if(z<0||z>=o)return H.a(w,z)
w[z]=v+1},
cs:function(a){var z=this.z
z.uniformMatrix4fv(J.cm(z,this.gV(),"uViewProjection"),!1,this.fx.c8().gaH())
z.uniform1f(z.getUniformLocation(this.gV(),"uTime"),this.b.cy.h(0,this.y))
this.c5(this.dx,this.cy,this.db)
z.drawElements(4,this.db.length,5123,0)},
cB:function(a){var z,y
z=this.fr
y=J.bk(a)
this.cy=new Float32Array(H.m(J.F(y.E(a,z),this.dy)))
this.db=new Uint16Array(H.m(J.F(y.E(a,z),3)))},
gcC:function(){return"TunnelSegmentRenderingSystem"},
gcc:function(){return"TunnelSegmentRenderingSystem"},
H:function(){var z,y
this.bC()
z=this.b
y=H.b(new S.z(null,null),[F.bb])
y.K(C.v,z,F.bb)
this.cx=y
y=this.b
z=H.b(new S.z(null,null),[F.v])
z.K(C.c,y,F.v)
this.ch=z
this.fx=this.b.z.h(0,C.t)}},iG:{"^":"cU;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
dq:function(){var z=this.db.ac("player")
this.dx=J.o(this.ch.b,J.K(z))},
cp:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=J.k(a0)
y=J.o(this.cx.b,z.gA(a0))
x=J.o(this.ch.b,z.gA(a0))
w=J.o(this.cy.b,z.gA(a0))
v=J.ck(y)
z=this.fy
u=this.go
t=a*(z*u)
s=a*u*3
for(r=J.k(w),q=v===-1,p=0;p<u;p+=2){o=t+p*z
n=s+p*3
switch(v){case 0:m=-0.7853981633974483+6.283185307179586*p/u
l=Math.cos(m)
k=Math.sin(m)
break
case 1:j=C.a.N(u,4)
i=C.a.X(p,j)
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
i=C.a.X(p,j)
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
f=this.dy
if(q){e=x.gm().a[0]
if(o>=f.length)return H.a(f,o)
f[o]=e
e=this.dy
f=x.gm().a[1]
if(j>=e.length)return H.a(e,j)
e[j]=f}else{e=x.gm().a[0]
d=$.$get$bP()
if(v>>>0!==v||v>=3)return H.a(d,v)
d=d[v].$1(1256.6370614359173)
if(typeof d!=="number")return H.i(d)
if(o>=f.length)return H.a(f,o)
f[o]=e+l*d
d=this.dy
e=x.gm().a[1]
f=$.$get$bP()[v].$1(1256.6370614359173)
if(typeof f!=="number")return H.i(f)
if(j>=d.length)return H.a(d,j)
d[j]=e+k*f}j=this.dy
f=o+2
e=x.gm().a[2]
if(f>=j.length)return H.a(j,f)
j[f]=e
e=this.dy
f=o+3
j=r.ga0(w)
if(f>=e.length)return H.a(e,f)
e[f]=j
j=this.dy
f=o+4
e=w.ga7()
if(f>=j.length)return H.a(j,f)
j[f]=e
e=this.dy
f=o+5
j=w.gan()
if(f>=e.length)return H.a(e,f)
e[f]=j
j=this.dy
f=o+6
e=P.aX(0,P.bl(0.7,(x.gm().a[2]-this.dx.gm().a[2]+100)/100))
if(f>=j.length)return H.a(j,f)
j[f]=e
e=C.a.N(u,4)
i=C.a.X(p,e)
h=C.a.M(p,e)
switch(i){case 0:k=-1+2*(h/e)
l=1
break
case 1:l=1-2*(h/e)
k=1
break
case 2:k=1-2*(h/e)
l=-1
break
case 3:l=-1+2*(h/e)
k=-1
break
default:l=null
k=null}j=this.dy
f=o+7
e=x.gm().a[0]
if(typeof l!=="number")return l.E()
if(f>=j.length)return H.a(j,f)
j[f]=e+l*20*2
e=this.dy
f=o+8
j=x.gm().a[1]
if(typeof k!=="number")return k.E()
if(f>=e.length)return H.a(e,f)
e[f]=j+k*20*2
j=this.dy
f=o+9
e=x.gm().a[2]
if(f>=j.length)return H.a(j,f)
j[f]=e
e=this.dy
f=o+10
j=r.ga0(w)
if(f>=e.length)return H.a(e,f)
e[f]=j
j=this.dy
f=o+11
e=w.ga7()
if(f>=j.length)return H.a(j,f)
j[f]=e
e=this.dy
f=o+12
j=w.gan()
if(f>=e.length)return H.a(e,f)
e[f]=j
j=this.dy
f=o+13
e=P.aX(0,P.bl(0.9,(x.gm().a[2]-this.dx.gm().a[2]+100)/100))
if(f>=j.length)return H.a(j,f)
j[f]=e
e=this.fr
f=C.a.X(o,z)
j=e.length
if(n>=j)return H.a(e,n)
e[n]=f
d=n+1
c=f+1
if(d>=j)return H.a(e,d)
e[d]=c
d=n+2
b=f+2
if(d>=j)return H.a(e,d)
e[d]=b
d=n+3
if(d>=j)return H.a(e,d)
e[d]=b
b=n+4
if(b>=j)return H.a(e,b)
e[b]=c
c=n+5
if(c>=j)return H.a(e,c)
e[c]=f+3}r=this.fr
u=s+u*3
q=u-1
z=C.a.X(t,z)
j=r.length
if(q<0||q>=j)return H.a(r,q)
r[q]=z+1
q=u-3
if(q<0||q>=j)return H.a(r,q)
r[q]=z
u-=4
if(u<0||u>=j)return H.a(r,u)
r[u]=z},
cs:function(a){var z=this.z
z.uniformMatrix4fv(J.cm(z,this.gV(),"uViewProjection"),!1,this.id.c8().gaH())
this.c5(this.fx,this.dy,this.fr)
z.drawElements(4,this.fr.length,5123,0)},
cB:function(a){var z,y
z=this.go
y=J.bk(a)
this.dy=new Float32Array(H.m(J.F(y.E(a,z),this.fy)))
this.fr=new Uint16Array(H.m(J.F(y.E(a,z),3)))},
gcC:function(){return"ObstacleRenderingSystem"},
gcc:function(){return"ObstacleRenderingSystem"},
H:function(){var z,y
this.bC()
z=this.b
y=H.b(new S.z(null,null),[F.b3])
y.K(C.r,z,F.b3)
this.cy=y
y=this.b
z=H.b(new S.z(null,null),[F.as])
z.K(C.k,y,F.as)
this.cx=z
z=this.b
y=H.b(new S.z(null,null),[F.v])
y.K(C.c,z,F.v)
this.ch=y
this.id=this.b.z.h(0,C.t)
this.db=this.b.z.h(0,C.h)}},hh:{"^":"b5;z,Q,ch,a,b,c,d,e,f,r,x,y",
aE:function(a){var z,y,x
z=J.o(this.z.b,J.K(a))
y=J.di(this.ch)
x=C.d.i(C.d.N(z.gm().a[2],1000))
y.font="20px Verdana";(y&&C.y).dC(y,"Obstacles:",J.a8(J.cl(this.Q),200),20)
C.y.dC(y,x,J.a8(J.cl(this.Q),y.measureText(x).width),20)},
H:function(){var z,y
this.ad()
z=this.b
y=H.b(new S.z(null,null),[F.v])
y.K(C.c,z,F.v)
this.z=y
this.Q=this.b.z.h(0,C.j)}}}],["","",,H,{"^":"",
bR:function(){return new P.aw("No element")},
ii:function(){return new P.aw("Too few elements")},
ba:{"^":"P;",
gO:function(a){return H.b(new H.e1(this,this.gj(this),0,null),[H.J(this,"ba",0)])},
D:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.Z(0,y))
if(z!==this.gj(this))throw H.e(new P.N(this))}},
aB:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){if(J.E(this.Z(0,y),b))return!0
if(z!==this.gj(this))throw H.e(new P.N(this))}return!1},
ar:function(a,b){return H.b(new H.bU(this,b),[H.J(this,"ba",0),null])},
cz:function(a,b){var z,y,x
z=H.b([],[H.J(this,"ba",0)])
C.b.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.Z(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bt:function(a){return this.cz(a,!0)},
$isu:1},
e1:{"^":"c;a,b,c,d",
gF:function(){return this.d},
C:function(){var z,y,x,w
z=this.a
y=J.M(z)
x=y.gj(z)
if(this.b!==x)throw H.e(new P.N(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.Z(z,w);++this.c
return!0}},
e2:{"^":"P;a,b",
gO:function(a){var z=new H.ix(null,J.b_(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.bo(this.a)},
$asP:function(a,b){return[b]},
p:{
bz:function(a,b,c,d){if(!!J.l(a).$isu)return H.b(new H.dI(a,b),[c,d])
return H.b(new H.e2(a,b),[c,d])}}},
dI:{"^":"e2;a,b",$isu:1},
ix:{"^":"bS;a,b,c",
C:function(){var z=this.b
if(z.C()){this.a=this.c.$1(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
$asbS:function(a,b){return[b]}},
bU:{"^":"ba;a,b",
gj:function(a){return J.bo(this.a)},
Z:function(a,b){return this.b.$1(J.fF(this.a,b))},
$asba:function(a,b){return[b]},
$asP:function(a,b){return[b]},
$isu:1},
eI:{"^":"P;a,b",
gO:function(a){var z=new H.jx(J.b_(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
jx:{"^":"bS;a,b",
C:function(){var z,y
for(z=this.a,y=this.b;z.C();)if(y.$1(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()}},
jg:{"^":"P;a,b",
gO:function(a){var z=new H.jh(J.b_(this.a),this.b,!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
jh:{"^":"bS;a,b,c",
C:function(){if(this.c)return!1
var z=this.a
if(!z.C()||this.b.$1(z.gF())!==!0){this.c=!0
return!1}return!0},
gF:function(){if(this.c)return
return this.a.gF()}},
dN:{"^":"c;",
sj:function(a,b){throw H.e(new P.B("Cannot change the length of a fixed-length list"))},
t:function(a,b){throw H.e(new P.B("Cannot add to a fixed-length list"))},
a5:function(a){throw H.e(new P.B("Cannot remove from a fixed-length list"))}}}],["","",,H,{"^":"",
fc:function(a){var z=H.b(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
jQ:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.l2()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aW(new P.jS(z),1)).observe(y,{childList:true})
return new P.jR(z,y,x)}else if(self.setImmediate!=null)return P.l3()
return P.l4()},
nI:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aW(new P.jT(a),0))},"$1","l2",2,0,5],
nJ:[function(a){++init.globalState.f.b
self.setImmediate(H.aW(new P.jU(a),0))},"$1","l3",2,0,5],
nK:[function(a){P.cP(C.z,a)},"$1","l4",2,0,5],
an:function(a,b,c){if(b===0){J.fA(c,a)
return}else if(b===1){c.du(H.W(a),H.S(a))
return}P.kL(a,b)
return c.gh9()},
kL:function(a,b){var z,y,x,w
z=new P.kM(b)
y=new P.kN(b)
x=J.l(a)
if(!!x.$isV)a.c_(z,y)
else if(!!x.$isa0)a.bs(z,y)
else{w=H.b(new P.V(0,$.n,null),[null])
w.a=4
w.c=a
w.c_(z,null)}},
f4:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.n.toString
return new P.l0(z)},
eZ:function(a,b){var z=H.bG()
z=H.aV(z,[z,z]).al(a)
if(z){b.toString
return a}else{b.toString
return a}},
dP:function(a,b,c){var z=H.b(new P.V(0,$.n,null),[c])
P.ep(a,new P.l6(b,z))
return z},
cw:function(a,b,c){var z,y,x,w,v,u
z={}
y=H.b(new P.V(0,$.n,null),[P.j])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.hx(z,!1,b,y)
for(w=a.length,v=0;v<a.length;a.length===w||(0,H.bm)(a),++v)a[v].bs(new P.hw(z,!1,b,y,z.b++),x)
x=z.b
if(x===0){z=H.b(new P.V(0,$.n,null),[null])
z.bG(C.W)
return z}u=new Array(x)
u.fixed$length=Array
z.a=u
return y},
dt:function(a){return H.b(new P.kI(H.b(new P.V(0,$.n,null),[a])),[a])},
kT:function(a,b,c){$.n.toString
a.R(b,c)},
kX:function(){var z,y
for(;z=$.aT,z!=null;){$.bh=null
y=z.b
$.aT=y
if(y==null)$.bg=null
z.a.$0()}},
nV:[function(){$.d3=!0
try{P.kX()}finally{$.bh=null
$.d3=!1
if($.aT!=null)$.$get$cV().$1(P.f8())}},"$0","f8",0,0,2],
f3:function(a){var z=new P.eJ(a,null)
if($.aT==null){$.bg=z
$.aT=z
if(!$.d3)$.$get$cV().$1(P.f8())}else{$.bg.b=z
$.bg=z}},
l_:function(a){var z,y,x
z=$.aT
if(z==null){P.f3(a)
$.bh=$.bg
return}y=new P.eJ(a,null)
x=$.bh
if(x==null){y.b=z
$.bh=y
$.aT=y}else{y.b=x.b
x.b=y
$.bh=y
if(y.b==null)$.bg=y}},
fm:function(a){var z=$.n
if(C.e===z){P.aB(null,null,C.e,a)
return}z.toString
P.aB(null,null,z,z.c3(a,!0))},
no:function(a,b){var z,y,x
z=H.b(new P.eV(null,null,null,0),[b])
y=z.gfc()
x=z.gfe()
z.a=a.aa(y,!0,z.gfd(),x)
return z},
f2:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.l(z).$isa0)return z
return}catch(w){v=H.W(w)
y=v
x=H.S(w)
v=$.n
v.toString
P.bi(null,null,v,y,x)}},
kZ:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.W(u)
z=t
y=H.S(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.aZ(x)
w=t
v=x.ga9()
c.$2(w,v)}}},
kO:function(a,b,c,d){var z=a.bk()
if(!!J.l(z).$isa0)z.cE(new P.kR(b,c,d))
else b.R(c,d)},
kP:function(a,b){return new P.kQ(a,b)},
kK:function(a,b,c){$.n.toString
a.bE(b,c)},
ep:function(a,b){var z=$.n
if(z===C.e){z.toString
return P.cP(a,b)}return P.cP(a,z.c3(b,!0))},
cP:function(a,b){var z=C.a.N(a.a,1000)
return H.jj(z<0?0:z,b)},
bi:function(a,b,c,d,e){var z={}
z.a=d
P.l_(new P.kY(z,e))},
f_:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
f1:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
f0:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
aB:function(a,b,c,d){var z=C.e!==c
if(z)d=c.c3(d,!(!z||!1))
P.f3(d)},
jS:{"^":"d:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
jR:{"^":"d:17;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
jT:{"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
jU:{"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
kM:{"^":"d:0;a",
$1:function(a){return this.a.$2(0,a)}},
kN:{"^":"d:7;a",
$2:function(a,b){this.a.$2(1,new H.cv(a,b))}},
l0:{"^":"d:36;a",
$2:function(a,b){this.a(a,b)}},
jV:{"^":"eN;a"},
jX:{"^":"k_;y,fb:z<,Q,x,a,b,c,d,e,f,r",
be:[function(){},"$0","gbd",0,0,2],
bg:[function(){},"$0","gbf",0,0,2]},
jW:{"^":"c;af:c@",
gfa:function(){return this.c<4},
fo:function(a){var z,y
z=a.Q
y=a.z
if(z==null)this.d=y
else z.z=y
if(y==null)this.e=z
else y.Q=z
a.Q=a
a.z=a},
fw:function(a,b,c,d){var z,y,x
if((this.c&4)!==0){z=new P.k4($.n,0,c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.d8()
return z}z=$.n
y=new P.jX(0,null,null,this,null,null,null,z,d?1:0,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.cN(a,b,c,d,H.q(this,0))
y.Q=y
y.z=y
y.y=this.c&1
x=this.e
this.e=y
y.z=null
y.Q=x
if(x==null)this.d=y
else x.z=y
if(this.d===y)P.f2(this.a)
return y},
fi:function(a){var z
if(a.gfb()===a)return
z=a.y
if((z&2)!==0)a.y=z|4
else{this.fo(a)
if((this.c&2)===0&&this.d==null)this.eM()}return},
fj:function(a){},
fk:function(a){},
eG:function(){if((this.c&4)!==0)return new P.aw("Cannot add new events after calling close")
return new P.aw("Cannot add new events while doing an addStream")},
t:function(a,b){if(!this.gfa())throw H.e(this.eG())
this.aM(b)},
b9:function(a){this.aM(a)},
eM:function(){if((this.c&4)!==0&&this.r.a===0)this.r.bG(null)
P.f2(this.b)}},
jP:{"^":"jW;a,b,c,d,e,f,r",
aM:function(a){var z,y
for(z=this.d;z!=null;z=z.z){y=new P.eO(a,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
z.b8(y)}}},
a0:{"^":"c;"},
l6:{"^":"d:1;a,b",
$0:function(){var z,y,x,w
try{x=this.a
x=x==null?x:x.$0()
this.b.ae(x)}catch(w){x=H.W(w)
z=x
y=H.S(w)
P.kT(this.b,z,y)}}},
hx:{"^":"d:12;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.R(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.R(z.c,z.d)}},
hw:{"^":"d:13;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.a(x,z)
x[z]=a
if(y===0)this.d.cU(x)}else if(z.b===0&&!this.b)this.d.R(z.c,z.d)}},
eM:{"^":"c;h9:a<",
du:[function(a,b){a=a!=null?a:new P.cH()
if(this.a.a!==0)throw H.e(new P.aw("Future already completed"))
$.n.toString
this.R(a,b)},function(a){return this.du(a,null)},"fP","$2","$1","gfO",2,2,8,0]},
eK:{"^":"eM;a",
aP:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.aw("Future already completed"))
z.bG(b)},
R:function(a,b){this.a.eK(a,b)}},
kI:{"^":"eM;a",
aP:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.aw("Future already completed"))
z.ae(b)},
R:function(a,b){this.a.R(a,b)}},
eQ:{"^":"c;bU:a<,b,c,d,e",
gfB:function(){return this.b.b},
gdG:function(){return(this.c&1)!==0},
ghg:function(){return(this.c&2)!==0},
gdF:function(){return this.c===8},
he:function(a){return this.b.b.cv(this.d,a)},
hs:function(a){if(this.c!==6)return!0
return this.b.b.cv(this.d,J.aZ(a))},
ha:function(a){var z,y,x,w
z=this.e
y=H.bG()
y=H.aV(y,[y,y]).al(z)
x=J.k(a)
w=this.b
if(y)return w.b.hD(z,x.gap(a),a.ga9())
else return w.b.cv(z,x.gap(a))},
hf:function(){return this.b.b.dR(this.d)}},
V:{"^":"c;af:a@,b,fs:c<",
gf7:function(){return this.a===2},
gbR:function(){return this.a>=4},
bs:function(a,b){var z=$.n
if(z!==C.e){z.toString
if(b!=null)b=P.eZ(b,z)}return this.c_(a,b)},
a1:function(a){return this.bs(a,null)},
c_:function(a,b){var z=H.b(new P.V(0,$.n,null),[null])
this.bF(H.b(new P.eQ(null,z,b==null?1:3,a,b),[null,null]))
return z},
cE:function(a){var z,y
z=$.n
y=new P.V(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.e)z.toString
this.bF(H.b(new P.eQ(null,y,8,a,null),[null,null]))
return y},
bF:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gbR()){y.bF(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.aB(null,null,z,new P.k9(this,a))}},
d4:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gbU()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gbR()){v.d4(a)
return}this.a=v.a
this.c=v.c}z.a=this.bj(a)
y=this.b
y.toString
P.aB(null,null,y,new P.kh(z,this))}},
bi:function(){var z=this.c
this.c=null
return this.bj(z)},
bj:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gbU()
z.a=y}return y},
ae:function(a){var z
if(!!J.l(a).$isa0)P.c4(a,this)
else{z=this.bi()
this.a=4
this.c=a
P.aR(this,z)}},
cU:function(a){var z=this.bi()
this.a=4
this.c=a
P.aR(this,z)},
R:[function(a,b){var z=this.bi()
this.a=8
this.c=new P.bp(a,b)
P.aR(this,z)},function(a){return this.R(a,null)},"hN","$2","$1","gbM",2,2,14,0],
bG:function(a){var z
if(!!J.l(a).$isa0){if(a.a===8){this.a=1
z=this.b
z.toString
P.aB(null,null,z,new P.kb(this,a))}else P.c4(a,this)
return}this.a=1
z=this.b
z.toString
P.aB(null,null,z,new P.kc(this,a))},
eK:function(a,b){var z
this.a=1
z=this.b
z.toString
P.aB(null,null,z,new P.ka(this,a,b))},
$isa0:1,
p:{
kd:function(a,b){var z,y,x,w
b.saf(1)
try{a.bs(new P.ke(b),new P.kf(b))}catch(x){w=H.W(x)
z=w
y=H.S(x)
P.fm(new P.kg(b,z,y))}},
c4:function(a,b){var z,y,x
for(;a.gf7();)a=a.c
z=a.gbR()
y=b.c
if(z){b.c=null
x=b.bj(y)
b.a=a.a
b.c=a.c
P.aR(b,x)}else{b.a=2
b.c=a
a.d4(y)}},
aR:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.aZ(v)
x=v.ga9()
z.toString
P.bi(null,null,z,y,x)}return}for(;b.gbU()!=null;b=u){u=b.a
b.a=null
P.aR(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gdG()||b.gdF()){s=b.gfB()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.aZ(v)
r=v.ga9()
y.toString
P.bi(null,null,y,x,r)
return}q=$.n
if(q==null?s!=null:q!==s)$.n=s
else q=null
if(b.gdF())new P.kk(z,x,w,b).$0()
else if(y){if(b.gdG())new P.kj(x,b,t).$0()}else if(b.ghg())new P.ki(z,x,b).$0()
if(q!=null)$.n=q
y=x.b
r=J.l(y)
if(!!r.$isa0){p=b.b
if(!!r.$isV)if(y.a>=4){o=p.c
p.c=null
b=p.bj(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.c4(y,p)
else P.kd(y,p)
return}}p=b.b
b=p.bi()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
k9:{"^":"d:1;a,b",
$0:function(){P.aR(this.a,this.b)}},
kh:{"^":"d:1;a,b",
$0:function(){P.aR(this.b,this.a.a)}},
ke:{"^":"d:0;a",
$1:function(a){var z=this.a
z.a=0
z.ae(a)}},
kf:{"^":"d:20;a",
$2:function(a,b){this.a.R(a,b)},
$1:function(a){return this.$2(a,null)}},
kg:{"^":"d:1;a,b,c",
$0:function(){this.a.R(this.b,this.c)}},
kb:{"^":"d:1;a,b",
$0:function(){P.c4(this.b,this.a)}},
kc:{"^":"d:1;a,b",
$0:function(){this.a.cU(this.b)}},
ka:{"^":"d:1;a,b,c",
$0:function(){this.a.R(this.b,this.c)}},
kk:{"^":"d:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.hf()}catch(w){v=H.W(w)
y=v
x=H.S(w)
if(this.c){v=J.aZ(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.bp(y,x)
u.a=!0
return}if(!!J.l(z).$isa0){if(z instanceof P.V&&z.gaf()>=4){if(z.gaf()===8){v=this.b
v.b=z.gfs()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.a1(new P.kl(t))
v.a=!1}}},
kl:{"^":"d:0;a",
$1:function(a){return this.a}},
kj:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.he(this.c)}catch(x){w=H.W(x)
z=w
y=H.S(x)
w=this.a
w.b=new P.bp(z,y)
w.a=!0}}},
ki:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.hs(z)===!0&&w.e!=null){v=this.b
v.b=w.ha(z)
v.a=!1}}catch(u){w=H.W(u)
y=w
x=H.S(u)
w=this.a
v=J.aZ(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.bp(y,x)
s.a=!0}}},
eJ:{"^":"c;a,b"},
al:{"^":"c;",
ar:function(a,b){return H.b(new P.kx(b,this),[H.J(this,"al",0),null])},
D:function(a,b){var z,y
z={}
y=H.b(new P.V(0,$.n,null),[null])
z.a=null
z.a=this.aa(new P.ja(z,this,b,y),!0,new P.jb(y),y.gbM())
return y},
gj:function(a){var z,y
z={}
y=H.b(new P.V(0,$.n,null),[P.p])
z.a=0
this.aa(new P.jc(z),!0,new P.jd(z,y),y.gbM())
return y},
bt:function(a){var z,y
z=H.b([],[H.J(this,"al",0)])
y=H.b(new P.V(0,$.n,null),[[P.j,H.J(this,"al",0)]])
this.aa(new P.je(this,z),!0,new P.jf(z,y),y.gbM())
return y}},
ja:{"^":"d;a,b,c,d",
$1:function(a){P.kZ(new P.j8(this.c,a),new P.j9(),P.kP(this.a.a,this.d))},
$signature:function(){return H.c6(function(a){return{func:1,args:[a]}},this.b,"al")}},
j8:{"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
j9:{"^":"d:0;",
$1:function(a){}},
jb:{"^":"d:1;a",
$0:function(){this.a.ae(null)}},
jc:{"^":"d:0;a",
$1:function(a){++this.a.a}},
jd:{"^":"d:1;a,b",
$0:function(){this.b.ae(this.a.a)}},
je:{"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.c6(function(a){return{func:1,args:[a]}},this.a,"al")}},
jf:{"^":"d:1;a,b",
$0:function(){this.b.ae(this.a)}},
j7:{"^":"c;"},
eN:{"^":"kG;a",
gG:function(a){return(H.ai(this.a)^892482866)>>>0},
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.eN))return!1
return b.a===this.a}},
k_:{"^":"cW;",
bV:function(){return this.x.fi(this)},
be:[function(){this.x.fj(this)},"$0","gbd",0,0,2],
bg:[function(){this.x.fk(this)},"$0","gbf",0,0,2]},
nO:{"^":"c;"},
cW:{"^":"c;af:e@",
aY:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.ds()
if((z&4)===0&&(this.e&32)===0)this.d0(this.gbd())},
a_:function(a){return this.aY(a,null)},
at:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gag(z)}else z=!1
if(z)this.r.bw(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.d0(this.gbf())}}}},
bk:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bH()
return this.f},
bH:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.ds()
if((this.e&32)===0)this.r=null
this.f=this.bV()},
b9:["ev",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.aM(a)
else this.b8(H.b(new P.eO(a,null),[null]))}],
bE:["ew",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.d9(a,b)
else this.b8(new P.k3(a,b,null))}],
eJ:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bX()
else this.b8(C.F)},
be:[function(){},"$0","gbd",0,0,2],
bg:[function(){},"$0","gbf",0,0,2],
bV:function(){return},
b8:function(a){var z,y
z=this.r
if(z==null){z=H.b(new P.kH(null,null,0),[null])
this.r=z}z.t(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bw(this)}},
aM:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cw(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bK((z&4)!==0)},
d9:function(a,b){var z,y
z=this.e
y=new P.jZ(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bH()
z=this.f
if(!!J.l(z).$isa0)z.cE(y)
else y.$0()}else{y.$0()
this.bK((z&4)!==0)}},
bX:function(){var z,y
z=new P.jY(this)
this.bH()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isa0)y.cE(z)
else z.$0()},
d0:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bK((z&4)!==0)},
bK:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gag(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gag(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.be()
else this.bg()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bw(this)},
cN:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.eZ(b,z)
this.c=c}},
jZ:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aV(H.bG(),[H.f9(P.c),H.f9(P.ak)]).al(y)
w=z.d
v=this.b
u=z.b
if(x)w.hE(u,v,this.c)
else w.cw(u,v)
z.e=(z.e&4294967263)>>>0}},
jY:{"^":"d:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cu(z.c)
z.e=(z.e&4294967263)>>>0}},
kG:{"^":"al;",
aa:function(a,b,c,d){return this.a.fw(a,d,c,!0===b)},
cj:function(a,b,c){return this.aa(a,null,b,c)}},
cX:{"^":"c;bp:a@"},
eO:{"^":"cX;b,a",
co:function(a){a.aM(this.b)}},
k3:{"^":"cX;ap:b>,a9:c<,a",
co:function(a){a.d9(this.b,this.c)},
$ascX:I.ao},
k2:{"^":"c;",
co:function(a){a.bX()},
gbp:function(){return},
sbp:function(a){throw H.e(new P.aw("No events after a done."))}},
kz:{"^":"c;af:a@",
bw:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.fm(new P.kA(this,a))
this.a=1},
ds:function(){if(this.a===1)this.a=3}},
kA:{"^":"d:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbp()
z.b=w
if(w==null)z.c=null
x.co(this.b)}},
kH:{"^":"kz;b,c,a",
gag:function(a){return this.c==null},
t:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbp(b)
this.c=b}}},
k4:{"^":"c;a,af:b@,c",
d8:function(){var z,y
if((this.b&2)!==0)return
z=this.a
y=this.gft()
z.toString
P.aB(null,null,z,y)
this.b=(this.b|2)>>>0},
aY:function(a,b){this.b+=4},
a_:function(a){return this.aY(a,null)},
at:function(){var z=this.b
if(z>=4){z-=4
this.b=z
if(z<4&&(z&1)===0)this.d8()}},
bk:function(){return},
bX:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.cu(this.c)},"$0","gft",0,0,2]},
eV:{"^":"c;a,b,c,af:d@",
cQ:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
hU:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.ae(!0)
return}this.a.a_(0)
this.c=a
this.d=3},"$1","gfc",2,0,function(){return H.c6(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"eV")}],
ff:[function(a,b){var z
if(this.d===2){z=this.c
this.cQ(0)
z.R(a,b)
return}this.a.a_(0)
this.c=new P.bp(a,b)
this.d=4},function(a){return this.ff(a,null)},"hW","$2","$1","gfe",2,2,8,0],
hV:[function(){if(this.d===2){var z=this.c
this.cQ(0)
z.ae(!1)
return}this.a.a_(0)
this.c=null
this.d=5},"$0","gfd",0,0,2]},
kR:{"^":"d:1;a,b,c",
$0:function(){return this.a.R(this.b,this.c)}},
kQ:{"^":"d:7;a,b",
$2:function(a,b){P.kO(this.a,this.b,a,b)}},
cY:{"^":"al;",
aa:function(a,b,c,d){return this.eS(a,d,c,!0===b)},
cj:function(a,b,c){return this.aa(a,null,b,c)},
eS:function(a,b,c,d){return P.k8(this,a,b,c,d,H.J(this,"cY",0),H.J(this,"cY",1))},
d1:function(a,b){b.b9(a)},
f2:function(a,b,c){c.bE(a,b)},
$asal:function(a,b){return[b]}},
eP:{"^":"cW;x,y,a,b,c,d,e,f,r",
b9:function(a){if((this.e&2)!==0)return
this.ev(a)},
bE:function(a,b){if((this.e&2)!==0)return
this.ew(a,b)},
be:[function(){var z=this.y
if(z==null)return
z.a_(0)},"$0","gbd",0,0,2],
bg:[function(){var z=this.y
if(z==null)return
z.at()},"$0","gbf",0,0,2],
bV:function(){var z=this.y
if(z!=null){this.y=null
return z.bk()}return},
hQ:[function(a){this.x.d1(a,this)},"$1","gf_",2,0,function(){return H.c6(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"eP")}],
hS:[function(a,b){this.x.f2(a,b,this)},"$2","gf1",4,0,16],
hR:[function(){this.eJ()},"$0","gf0",0,0,2],
eE:function(a,b,c,d,e,f,g){var z,y
z=this.gf_()
y=this.gf1()
this.y=this.x.a.cj(z,this.gf0(),y)},
$ascW:function(a,b){return[b]},
p:{
k8:function(a,b,c,d,e,f,g){var z=$.n
z=H.b(new P.eP(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cN(b,c,d,e,g)
z.eE(a,b,c,d,e,f,g)
return z}}},
kx:{"^":"cY;b,a",
d1:function(a,b){var z,y,x,w,v
z=null
try{z=this.b.$1(a)}catch(w){v=H.W(w)
y=v
x=H.S(w)
P.kK(b,y,x)
return}b.b9(z)}},
bp:{"^":"c;ap:a>,a9:b<",
i:function(a){return H.f(this.a)},
$isO:1},
kJ:{"^":"c;"},
kY:{"^":"d:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cH()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
x=H.e(z)
x.stack=J.aG(y)
throw x}},
kC:{"^":"kJ;",
cu:function(a){var z,y,x,w
try{if(C.e===$.n){x=a.$0()
return x}x=P.f_(null,null,this,a)
return x}catch(w){x=H.W(w)
z=x
y=H.S(w)
return P.bi(null,null,this,z,y)}},
cw:function(a,b){var z,y,x,w
try{if(C.e===$.n){x=a.$1(b)
return x}x=P.f1(null,null,this,a,b)
return x}catch(w){x=H.W(w)
z=x
y=H.S(w)
return P.bi(null,null,this,z,y)}},
hE:function(a,b,c){var z,y,x,w
try{if(C.e===$.n){x=a.$2(b,c)
return x}x=P.f0(null,null,this,a,b,c)
return x}catch(w){x=H.W(w)
z=x
y=H.S(w)
return P.bi(null,null,this,z,y)}},
c3:function(a,b){if(b)return new P.kD(this,a)
else return new P.kE(this,a)},
fH:function(a,b){return new P.kF(this,a)},
h:function(a,b){return},
dR:function(a){if($.n===C.e)return a.$0()
return P.f_(null,null,this,a)},
cv:function(a,b){if($.n===C.e)return a.$1(b)
return P.f1(null,null,this,a,b)},
hD:function(a,b,c){if($.n===C.e)return a.$2(b,c)
return P.f0(null,null,this,a,b,c)}},
kD:{"^":"d:1;a,b",
$0:function(){return this.a.cu(this.b)}},
kE:{"^":"d:1;a,b",
$0:function(){return this.a.dR(this.b)}},
kF:{"^":"d:0;a,b",
$1:function(a){return this.a.cw(this.b,a)}}}],["","",,P,{"^":"",
bx:function(a,b){return H.b(new H.U(0,null,null,null,null,null,0),[a,b])},
it:function(){return H.b(new H.U(0,null,null,null,null,null,0),[null,null])},
ad:function(a){return H.lc(a,H.b(new H.U(0,null,null,null,null,null,0),[null,null]))},
dW:function(a,b,c){var z,y
if(P.d4(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bj()
y.push(a)
try{P.kU(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.em(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bQ:function(a,b,c){var z,y,x
if(P.d4(a))return b+"..."+c
z=new P.cN(b)
y=$.$get$bj()
y.push(a)
try{x=z
x.a=P.em(x.gav(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.a=y.gav()+c
y=z.gav()
return y.charCodeAt(0)==0?y:y},
d4:function(a){var z,y
for(z=0;y=$.$get$bj(),z<y.length;++z)if(a===y[z])return!0
return!1},
kU:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.b_(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.C())return
w=H.f(z.gF())
b.push(w)
y+=w.length+2;++x}if(!z.C()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gF();++x
if(!z.C()){if(x<=4){b.push(H.f(t))
return}v=H.f(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gF();++x
for(;z.C();t=s,s=r){r=z.gF();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.f(t)
v=H.f(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aL:function(a,b,c,d){return H.b(new P.kr(0,null,null,null,null,null,0),[d])},
iu:function(a,b){var z,y
z=P.aL(null,null,null,b)
for(y=0;y<5;++y)z.t(0,a[y])
return z},
iy:function(a){var z,y,x
z={}
if(P.d4(a))return"{...}"
y=new P.cN("")
try{$.$get$bj().push(a)
x=y
x.a=x.gav()+"{"
z.a=!0
J.bJ(a,new P.iz(z,y))
z=y
z.a=z.gav()+"}"}finally{z=$.$get$bj()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.gav()
return z.charCodeAt(0)==0?z:z},
eT:{"^":"U;a,b,c,d,e,f,r",
aU:function(a){return H.lx(a)&0x3ffffff},
aV:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdH()
if(x==null?b==null:x===b)return y}return-1},
p:{
bf:function(a,b){return H.b(new P.eT(0,null,null,null,null,null,0),[a,b])}}},
kr:{"^":"kn;a,b,c,d,e,f,r",
gO:function(a){var z=H.b(new P.d_(this,this.r,null,null),[null])
z.c=z.a.e
return z},
gj:function(a){return this.a},
aB:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eQ(b)},
eQ:function(a){var z=this.d
if(z==null)return!1
return this.bb(z[this.ba(a)],a)>=0},
dK:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.aB(0,a)?a:null
else return this.f9(a)},
f9:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ba(a)]
x=this.bb(y,a)
if(x<0)return
return J.o(y,x).gcY()},
D:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.N(this))
z=z.b}},
t:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.d0()
this.b=z}return this.cR(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.d0()
this.c=y}return this.cR(y,b)}else return this.a3(b)},
a3:function(a){var z,y,x
z=this.d
if(z==null){z=P.d0()
this.d=z}y=this.ba(a)
x=z[y]
if(x==null)z[y]=[this.bL(a)]
else{if(this.bb(x,a)>=0)return!1
x.push(this.bL(a))}return!0},
as:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cS(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cS(this.c,b)
else return this.fl(b)},
fl:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ba(a)]
x=this.bb(y,a)
if(x<0)return!1
this.cT(y.splice(x,1)[0])
return!0},
aA:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cR:function(a,b){if(a[b]!=null)return!1
a[b]=this.bL(b)
return!0},
cS:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cT(z)
delete a[b]
return!0},
bL:function(a){var z,y
z=new P.ks(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cT:function(a){var z,y
z=a.geO()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ba:function(a){return J.X(a)&0x3ffffff},
bb:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].gcY(),b))return y
return-1},
$isu:1,
p:{
d0:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
ks:{"^":"c;cY:a<,b,eO:c<"},
d_:{"^":"c;a,b,c,d",
gF:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
kn:{"^":"j2;"},
dX:{"^":"c;",
ar:function(a,b){return H.bz(this,b,H.J(this,"dX",0),null)},
D:function(a,b){var z
for(z=this.gO(this);z.C();)b.$1(z.gF())},
gj:function(a){var z,y
z=this.gO(this)
for(y=0;z.C();)++y
return y},
i:function(a){return P.dW(this,"(",")")}},
by:{"^":"c;",
gO:function(a){return H.b(new H.e1(a,this.gj(a),0,null),[H.J(a,"by",0)])},
Z:function(a,b){return this.h(a,b)},
D:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.a(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.N(a))}},
ar:function(a,b){return H.b(new H.bU(a,b),[null,null])},
h8:function(a,b,c){var z,y,x
z=this.gj(a)
for(y=b,x=0;x<z;++x){if(x>=a.length)return H.a(a,x)
y=c.$2(y,a[x])
if(z!==a.length)throw H.e(new P.N(a))}return y},
t:function(a,b){var z=this.gj(a)
this.sj(a,z+1)
if(z<0||z>=a.length)return H.a(a,z)
a[z]=b},
a5:function(a){var z,y,x
if(this.gj(a)===0)throw H.e(H.bR())
z=a.length
y=z-1
if(y<0)return H.a(a,y)
x=a[y]
this.sj(a,y)
return x},
h4:function(a,b,c,d){var z
P.cM(b,c,this.gj(a),null,null,null)
for(z=b;J.bI(z,c);++z){if(z>>>0!==z||z>=a.length)return H.a(a,z)
a[z]=d}},
i:function(a){return P.bQ(a,"[","]")},
$isj:1,
$asj:null,
$isu:1},
iz:{"^":"d:3;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.f(a)
z.a=y+": "
z.a+=H.f(b)}},
iv:{"^":"ba;a,b,c,d",
gO:function(a){var z=new P.kt(this,this.c,this.d,this.b,null)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
D:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.D(new P.N(this))}},
gag:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
Z:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.D(P.bt(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.a(y,w)
return y[w]},
t:function(a,b){this.a3(b)},
aA:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.bQ(this,"{","}")},
cr:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bR());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
a5:function(a){var z,y,x,w
z=this.b
y=this.c
if(z===y)throw H.e(H.bR());++this.d
z=this.a
x=z.length
y=(y-1&x-1)>>>0
this.c=y
if(y<0||y>=x)return H.a(z,y)
w=z[y]
z[y]=null
return w},
a3:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.a(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.d_();++this.d},
d_:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.b(z,[H.q(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bz(y,0,w,z,x)
C.b.bz(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
eB:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.b(z,[b])},
$isu:1,
p:{
bT:function(a,b){var z=H.b(new P.iv(null,0,0,0),[b])
z.eB(a,b)
return z}}},
kt:{"^":"c;a,b,c,d,e",
gF:function(){return this.e},
C:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.D(new P.N(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
j3:{"^":"c;",
ar:function(a,b){return H.b(new H.dI(this,b),[H.q(this,0),null])},
i:function(a){return P.bQ(this,"{","}")},
D:function(a,b){var z
for(z=H.b(new P.d_(this,this.r,null,null),[null]),z.c=z.a.e;z.C();)b.$1(z.d)},
$isu:1},
j2:{"^":"j3;"}}],["","",,P,{"^":"",
dL:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aG(a)
if(typeof a==="string")return JSON.stringify(a)
return P.hs(a)},
hs:function(a){var z=J.l(a)
if(!!z.$isd)return z.i(a)
return H.bY(a)},
b7:function(a){return new P.k7(a)},
cD:function(a,b,c){var z,y
z=H.b([],[c])
for(y=J.b_(a);y.C();)z.push(y.gF())
return z},
iw:function(a,b,c,d){var z,y,x
z=H.b([],[d])
C.b.sj(z,a)
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bH:function(a){var z=H.f(a)
H.ly(z)},
bF:{"^":"c;"},
"+bool":0,
m6:{"^":"c;"},
Z:{"^":"C;"},
"+double":0,
ac:{"^":"c;aw:a<",
B:function(a,b){return new P.ac(this.a+b.gaw())},
q:function(a,b){return new P.ac(this.a-b.gaw())},
E:function(a,b){if(typeof b!=="number")return H.i(b)
return new P.ac(C.d.b0(this.a*b))},
X:function(a,b){if(b===0)throw H.e(new P.i3())
return new P.ac(C.a.X(this.a,b))},
W:function(a,b){return this.a<b.gaw()},
T:function(a,b){return this.a>b.gaw()},
cI:function(a,b){return this.a<=b.gaw()},
U:function(a,b){return this.a>=b.gaw()},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.ac))return!1
return this.a===b.a},
gG:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.hk()
y=this.a
if(y<0)return"-"+new P.ac(-y).i(0)
x=z.$1(C.a.cq(C.a.N(y,6e7),60))
w=z.$1(C.a.cq(C.a.N(y,1e6),60))
v=new P.hj().$1(C.a.cq(y,1e6))
return""+C.a.N(y,36e8)+":"+H.f(x)+":"+H.f(w)+"."+H.f(v)},
dl:function(a){return new P.ac(Math.abs(this.a))},
bv:function(a){return new P.ac(-this.a)},
p:{
dG:function(a,b,c,d,e,f){return new P.ac(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
hj:{"^":"d:9;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
hk:{"^":"d:9;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
O:{"^":"c;",
ga9:function(){return H.S(this.$thrownJsError)}},
cH:{"^":"O;",
i:function(a){return"Throw of null."}},
aH:{"^":"O;a,b,c,d",
gbO:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbN:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.f(z)+")":""
z=this.d
x=z==null?"":": "+H.f(z)
w=this.gbO()+y+x
if(!this.a)return w
v=this.gbN()
u=P.dL(this.b)
return w+v+": "+H.f(u)},
p:{
a9:function(a){return new P.aH(!1,null,null,a)},
dn:function(a,b,c){return new P.aH(!0,a,b,c)}}},
cL:{"^":"aH;e,f,a,b,c,d",
gbO:function(){return"RangeError"},
gbN:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.f(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.f(z)
else{if(typeof x!=="number")return x.T()
if(typeof z!=="number")return H.i(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
p:{
iU:function(a){return new P.cL(null,null,!1,null,null,a)},
bZ:function(a,b,c){return new P.cL(null,null,!0,a,b,"Value not in range")},
au:function(a,b,c,d,e){return new P.cL(b,c,!0,a,d,"Invalid value")},
cM:function(a,b,c,d,e,f){if(typeof a!=="number")return H.i(a)
if(0>a||a>c)throw H.e(P.au(a,0,c,"start",f))
if(typeof b!=="number")return H.i(b)
if(a>b||b>c)throw H.e(P.au(b,a,c,"end",f))
return b}}},
i1:{"^":"aH;e,j:f>,a,b,c,d",
gbO:function(){return"RangeError"},
gbN:function(){if(J.bI(this.b,0))return": index must not be negative"
var z=this.f
if(J.E(z,0))return": no indices are valid"
return": index should be less than "+H.f(z)},
p:{
bt:function(a,b,c,d,e){var z=e!=null?e:J.bo(b)
return new P.i1(b,z,!0,a,c,"Index out of range")}}},
B:{"^":"O;a",
i:function(a){return"Unsupported operation: "+this.a}},
eG:{"^":"O;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.f(z):"UnimplementedError"}},
aw:{"^":"O;a",
i:function(a){return"Bad state: "+this.a}},
N:{"^":"O;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.f(P.dL(z))+"."}},
iJ:{"^":"c;",
i:function(a){return"Out of Memory"},
ga9:function(){return},
$isO:1},
el:{"^":"c;",
i:function(a){return"Stack Overflow"},
ga9:function(){return},
$isO:1},
he:{"^":"O;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
k7:{"^":"c;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.f(z)}},
dO:{"^":"c;a,b,cn:c>",
i:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.f(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=J.fT(x,0,75)+"..."
return y+"\n"+H.f(x)}},
i3:{"^":"c;",
i:function(a){return"IntegerDivisionByZeroException"}},
ht:{"^":"c;a,b",
i:function(a){return"Expando:"+H.f(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.D(P.dn(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.cJ(b,"expando$values")
return y==null?null:H.cJ(y,z)},
n:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.cJ(b,"expando$values")
if(y==null){y=new P.c()
H.eg(b,"expando$values",y)}H.eg(y,z,c)}}},
hv:{"^":"c;"},
p:{"^":"C;"},
"+int":0,
P:{"^":"c;",
ar:function(a,b){return H.bz(this,b,H.J(this,"P",0),null)},
D:function(a,b){var z
for(z=this.gO(this);z.C();)b.$1(z.gF())},
cz:function(a,b){return P.cD(this,!0,H.J(this,"P",0))},
bt:function(a){return this.cz(a,!0)},
gj:function(a){var z,y
z=this.gO(this)
for(y=0;z.C();)++y
return y},
Z:function(a,b){var z,y,x
if(b<0)H.D(P.au(b,0,null,"index",null))
for(z=this.gO(this),y=0;z.C();){x=z.gF()
if(b===y)return x;++y}throw H.e(P.bt(b,this,"index",null,y))},
i:function(a){return P.dW(this,"(",")")}},
bS:{"^":"c;"},
j:{"^":"c;",$asj:null,$isP:1,$isu:1},
"+List":0,
cG:{"^":"c;",
i:function(a){return"null"}},
"+Null":0,
C:{"^":"c;"},
"+num":0,
c:{"^":";",
w:function(a,b){return this===b},
gG:function(a){return H.ai(this)},
i:function(a){return H.bY(this)},
gL:function(a){return new H.af(H.aD(this),null)},
toString:function(){return this.i(this)}},
ak:{"^":"c;"},
Q:{"^":"c;"},
"+String":0,
cN:{"^":"c;av:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
p:{
em:function(a,b,c){var z=J.b_(b)
if(!z.C())return a
if(c.length===0){do a+=H.f(z.gF())
while(z.C())}else{a+=H.f(z.gF())
for(;z.C();)a=a+c+H.f(z.gF())}return a}}},
bc:{"^":"c;"}}],["","",,W,{"^":"",
dx:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.U)},
dT:function(a,b,c){return W.i_(a,null,null,b,null,null,null,c).a1(new W.hZ())},
i_:function(a,b,c,d,e,f,g,h){var z,y,x
z=H.b(new P.eK(H.b(new P.V(0,$.n,null),[W.b8])),[W.b8])
y=new XMLHttpRequest()
C.L.hu(y,"GET",a,!0)
x=H.b(new W.aQ(y,"load",!1),[H.q(C.I,0)])
H.b(new W.a7(0,x.a,x.b,W.R(new W.i0(z,y)),!1),[H.q(x,0)]).Y()
x=H.b(new W.aQ(y,"error",!1),[H.q(C.G,0)])
H.b(new W.a7(0,x.a,x.b,W.R(z.gfO()),!1),[H.q(x,0)]).Y()
y.send()
return z.a},
aA:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
eR:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
eX:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.k1(a)
if(!!J.l(z).$isa_)return z
return}else return a},
R:function(a){var z=$.n
if(z===C.e)return a
return z.fH(a,!0)},
x:{"^":"bq;","%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
lW:{"^":"x;I:type%",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
lY:{"^":"x;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
lZ:{"^":"h;I:type=","%":"Blob|File"},
m_:{"^":"x;",$isa_:1,$ish:1,"%":"HTMLBodyElement"},
dr:{"^":"x;I:type%",
S:function(a,b){return a.disabled.$1(b)},
$isdr:1,
"%":"HTMLButtonElement"},
cs:{"^":"x;l:height%,k:width%",
cF:function(a,b,c){return a.getContext(b,P.la(c,null))},
gfR:function(a){return a.getContext("2d")},
$iscs:1,
"%":"HTMLCanvasElement"},
h_:{"^":"h;",
h5:function(a,b,c,d,e){a.fillText(b,c,d)},
dC:function(a,b,c,d){return this.h5(a,b,c,d,null)},
"%":"CanvasRenderingContext2D"},
m2:{"^":"ah;j:length=",$ish:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
hc:{"^":"i4;j:length=",
cG:function(a,b){var z=this.eY(a,b)
return z!=null?z:""},
eY:function(a,b){if(W.dx(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.dE()+b)},
eL:function(a,b){var z,y
z=$.$get$dy()
y=z[b]
if(typeof y==="string")return y
y=W.dx(b) in a?b:P.dE()+b
z[b]=y
return y},
fu:function(a,b,c,d){a.setProperty(b,c,d)},
gl:function(a){return a.height},
gk:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
i4:{"^":"h+hd;"},
hd:{"^":"c;",
gl:function(a){return this.cG(a,"height")},
saC:function(a,b){this.fu(a,this.eL(a,"opacity"),b,"")},
gk:function(a){return this.cG(a,"width")}},
m7:{"^":"ah;",$ish:1,"%":"DocumentFragment|ShadowRoot"},
m8:{"^":"h;",
i:function(a){return String(a)},
"%":"DOMException"},
hi:{"^":"h;",
i:function(a){return"Rectangle ("+H.f(a.left)+", "+H.f(a.top)+") "+H.f(this.gk(a))+" x "+H.f(this.gl(a))},
w:function(a,b){var z
if(b==null)return!1
z=J.l(b)
if(!z.$isaj)return!1
return a.left===z.gaW(b)&&a.top===z.gb2(b)&&this.gk(a)===z.gk(b)&&this.gl(a)===z.gl(b)},
gG:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gk(a)
w=this.gl(a)
return W.eR(W.aA(W.aA(W.aA(W.aA(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gcA:function(a){return H.b(new P.a5(a.left,a.top),[null])},
gc4:function(a){return a.bottom},
gl:function(a){return a.height},
gaW:function(a){return a.left},
gct:function(a){return a.right},
gb2:function(a){return a.top},
gk:function(a){return a.width},
gu:function(a){return a.x},
gv:function(a){return a.y},
$isaj:1,
$asaj:I.ao,
"%":";DOMRectReadOnly"},
bq:{"^":"ah;A:id=",
gcn:function(a){return P.iW(C.d.b0(a.offsetLeft),C.d.b0(a.offsetTop),C.d.b0(a.offsetWidth),C.d.b0(a.offsetHeight),null)},
i:function(a){return a.localName},
e_:function(a){return a.getBoundingClientRect()},
gdL:function(a){return H.b(new W.bC(a,"click",!1),[H.q(C.A,0)])},
gdN:function(a){return H.b(new W.bC(a,"keydown",!1),[H.q(C.q,0)])},
$isbq:1,
$ish:1,
$isa_:1,
"%":";Element"},
ma:{"^":"x;l:height%,I:type%,k:width%","%":"HTMLEmbedElement"},
mb:{"^":"T;ap:error=","%":"ErrorEvent"},
T:{"^":"h;I:type=",$isT:1,$isc:1,"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CrossOriginConnectEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
a_:{"^":"h;",
eH:function(a,b,c,d){return a.addEventListener(b,H.aW(c,1),!1)},
fn:function(a,b,c,d){return a.removeEventListener(b,H.aW(c,1),!1)},
$isa_:1,
"%":"CrossOriginServiceWorkerClient|Performance;EventTarget"},
mu:{"^":"x;I:type=",
S:function(a,b){return a.disabled.$1(b)},
"%":"HTMLFieldSetElement"},
mz:{"^":"x;j:length=",
b_:function(a){return a.reset()},
"%":"HTMLFormElement"},
br:{"^":"h;A:id=",$isc:1,"%":"Gamepad"},
cx:{"^":"T;dY:gamepad=",$iscx:1,$isT:1,$isc:1,"%":"GamepadEvent"},
mA:{"^":"T;A:id=","%":"GeofencingEvent"},
b8:{"^":"hY;hC:responseText=",
hX:function(a,b,c,d,e,f){return a.open(b,c,!0,f,e)},
hu:function(a,b,c,d){return a.open(b,c,d)},
bx:function(a,b){return a.send(b)},
$isb8:1,
$isc:1,
"%":"XMLHttpRequest"},
hZ:{"^":"d:18;",
$1:function(a){return J.fL(a)}},
i0:{"^":"d:0;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
y=z.status
if(typeof y!=="number")return y.U()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.a
if(y)v.aP(0,z)
else v.fP(a)}},
hY:{"^":"a_;","%":";XMLHttpRequestEventTarget"},
mG:{"^":"x;l:height%,k:width%","%":"HTMLIFrameElement"},
mH:{"^":"x;l:height%,k:width%",
aP:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
mJ:{"^":"x;l:height%,I:type%,k:width%",
S:function(a,b){return a.disabled.$1(b)},
$isbq:1,
$ish:1,
$isa_:1,
$isiS:1,
"%":"HTMLInputElement"},
e0:{"^":"eF;",
ghq:function(a){return a.keyCode},
$isT:1,
$isc:1,
"%":"KeyboardEvent"},
mP:{"^":"x;I:type=",
S:function(a,b){return a.disabled.$1(b)},
"%":"HTMLKeygenElement"},
mQ:{"^":"x;I:type%",
S:function(a,b){return a.disabled.$1(b)},
"%":"HTMLLinkElement"},
iA:{"^":"x;ap:error=",
a_:function(a){return a.pause()},
"%":"HTMLAudioElement;HTMLMediaElement"},
mT:{"^":"a_;A:id=",
bA:function(a){return a.stop()},
"%":"MediaStream"},
mU:{"^":"x;I:type%","%":"HTMLMenuElement"},
mV:{"^":"x;I:type%",
S:function(a,b){return a.disabled.$1(b)},
"%":"HTMLMenuItemElement"},
e3:{"^":"eF;",
gcn:function(a){var z,y,x
if(!!a.offsetX)return H.b(new P.a5(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.l(W.eX(z)).$isbq)throw H.e(new P.B("offsetX is only supported on elements"))
y=W.eX(z)
x=H.b(new P.a5(a.clientX,a.clientY),[null]).q(0,J.fM(J.fN(y)))
return H.b(new P.a5(J.dm(x.a),J.dm(x.b)),[null])}},
$isT:1,
$isc:1,
"%":"WheelEvent;DragEvent|MouseEvent"},
n3:{"^":"h;",$ish:1,"%":"Navigator"},
ah:{"^":"a_;",
i:function(a){var z=a.nodeValue
return z==null?this.er(a):z},
$isc:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
n4:{"^":"x;I:type%","%":"HTMLOListElement"},
n5:{"^":"x;l:height%,I:type%,k:width%","%":"HTMLObjectElement"},
n7:{"^":"x;",
S:function(a,b){return a.disabled.$1(b)},
"%":"HTMLOptGroupElement"},
n8:{"^":"x;",
S:function(a,b){return a.disabled.$1(b)},
"%":"HTMLOptionElement"},
n9:{"^":"x;I:type=","%":"HTMLOutputElement"},
nb:{"^":"e3;l:height=,k:width=","%":"PointerEvent"},
eh:{"^":"T;",$isT:1,$isc:1,"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
nh:{"^":"h;l:height=,k:width=","%":"Screen"},
ni:{"^":"x;I:type%","%":"HTMLScriptElement"},
nk:{"^":"x;j:length=,I:type=",
S:function(a,b){return a.disabled.$1(b)},
"%":"HTMLSelectElement"},
nm:{"^":"x;I:type%","%":"HTMLSourceElement"},
nn:{"^":"T;ap:error=","%":"SpeechRecognitionError"},
np:{"^":"x;I:type%",
S:function(a,b){return a.disabled.$1(b)},
"%":"HTMLStyleElement"},
nt:{"^":"x;I:type=",
S:function(a,b){return a.disabled.$1(b)},
"%":"HTMLTextAreaElement"},
nu:{"^":"h;k:width=","%":"TextMetrics"},
eF:{"^":"T;","%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
nF:{"^":"iA;l:height%,k:width%","%":"HTMLVideoElement"},
jy:{"^":"a_;",
aL:function(a,b){return a.requestAnimationFrame(H.aW(b,1))},
aJ:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
bA:function(a){return a.stop()},
$ish:1,
$isa_:1,
"%":"DOMWindow|Window"},
nL:{"^":"h;c4:bottom=,l:height=,aW:left=,ct:right=,b2:top=,k:width=",
i:function(a){return"Rectangle ("+H.f(a.left)+", "+H.f(a.top)+") "+H.f(a.width)+" x "+H.f(a.height)},
w:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isaj)return!1
y=a.left
x=z.gaW(b)
if(y==null?x==null:y===x){y=a.top
x=z.gb2(b)
if(y==null?x==null:y===x){y=a.width
x=z.gk(b)
if(y==null?x==null:y===x){y=a.height
z=z.gl(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gG:function(a){var z,y,x,w
z=J.X(a.left)
y=J.X(a.top)
x=J.X(a.width)
w=J.X(a.height)
return W.eR(W.aA(W.aA(W.aA(W.aA(0,z),y),x),w))},
gcA:function(a){return H.b(new P.a5(a.left,a.top),[null])},
$isaj:1,
$asaj:I.ao,
"%":"ClientRect"},
nM:{"^":"ah;",$ish:1,"%":"DocumentType"},
nN:{"^":"hi;",
gl:function(a){return a.height},
gk:function(a){return a.width},
gu:function(a){return a.x},
gv:function(a){return a.y},
"%":"DOMRect"},
nP:{"^":"i7;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bt(b,a,null,null,null))
return a[b]},
n:function(a,b,c){throw H.e(new P.B("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.e(new P.B("Cannot resize immutable List."))},
Z:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isaq:1,
$asaq:function(){return[W.br]},
$isa4:1,
$asa4:function(){return[W.br]},
$isj:1,
$asj:function(){return[W.br]},
$isu:1,
"%":"GamepadList"},
i5:{"^":"h+by;",$isj:1,
$asj:function(){return[W.br]},
$isu:1},
i7:{"^":"i5+cy;",$isj:1,
$asj:function(){return[W.br]},
$isu:1},
nQ:{"^":"x;",$isa_:1,$ish:1,"%":"HTMLFrameSetElement"},
nR:{"^":"i8;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bt(b,a,null,null,null))
return a[b]},
n:function(a,b,c){throw H.e(new P.B("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.e(new P.B("Cannot resize immutable List."))},
Z:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.ah]},
$isu:1,
$isaq:1,
$asaq:function(){return[W.ah]},
$isa4:1,
$asa4:function(){return[W.ah]},
"%":"MozNamedAttrMap|NamedNodeMap"},
i6:{"^":"h+by;",$isj:1,
$asj:function(){return[W.ah]},
$isu:1},
i8:{"^":"i6+cy;",$isj:1,
$asj:function(){return[W.ah]},
$isu:1},
aJ:{"^":"c;a"},
aQ:{"^":"al;a,b,c",
aa:function(a,b,c,d){var z=new W.a7(0,this.a,this.b,W.R(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.Y()
return z},
cj:function(a,b,c){return this.aa(a,null,b,c)}},
bC:{"^":"aQ;a,b,c"},
a7:{"^":"j7;a,b,c,d,e",
bk:function(){if(this.b==null)return
this.dh()
this.b=null
this.d=null
return},
aY:function(a,b){if(this.b==null)return;++this.a
this.dh()},
a_:function(a){return this.aY(a,null)},
at:function(){if(this.b==null||this.a<=0)return;--this.a
this.Y()},
Y:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.fu(x,this.c,z,!1)}},
dh:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.fv(x,this.c,z,!1)}}},
cy:{"^":"c;",
gO:function(a){return H.b(new W.hu(a,this.gj(a),-1,null),[H.J(a,"cy",0)])},
t:function(a,b){throw H.e(new P.B("Cannot add to immutable List."))},
a5:function(a){throw H.e(new P.B("Cannot remove from immutable List."))},
$isj:1,
$asj:null,
$isu:1},
hu:{"^":"c;a,b,c,d",
C:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.o(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gF:function(){return this.d}},
k0:{"^":"c;a",$isa_:1,$ish:1,p:{
k1:function(a){if(a===window)return a
else return new W.k0(a)}}}}],["","",,P,{"^":""}],["","",,P,{"^":"",lV:{"^":"aK;",$ish:1,"%":"SVGAElement"},lX:{"^":"r;",$ish:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},m3:{"^":"dR;a0:r=","%":"SVGCircleElement"},mc:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEBlendElement"},md:{"^":"r;I:type=,l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEColorMatrixElement"},me:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEComponentTransferElement"},mf:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFECompositeElement"},mg:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEConvolveMatrixElement"},mh:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEDiffuseLightingElement"},mi:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEDisplacementMapElement"},mj:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEFloodElement"},mk:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEGaussianBlurElement"},ml:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEImageElement"},mm:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEMergeElement"},mn:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEMorphologyElement"},mo:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFEOffsetElement"},mp:{"^":"r;u:x=,v:y=","%":"SVGFEPointLightElement"},mq:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFESpecularLightingElement"},mr:{"^":"r;u:x=,v:y=","%":"SVGFESpotLightElement"},ms:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFETileElement"},mt:{"^":"r;I:type=,l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFETurbulenceElement"},mv:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGFilterElement"},my:{"^":"aK;l:height=,k:width=,u:x=,v:y=","%":"SVGForeignObjectElement"},dR:{"^":"aK;","%":"SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aK:{"^":"r;",$ish:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},mI:{"^":"aK;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGImageElement"},mR:{"^":"r;",$ish:1,"%":"SVGMarkerElement"},mS:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGMaskElement"},na:{"^":"r;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGPatternElement"},ne:{"^":"km;a0:r=","%":"SVGRadialGradientElement"},nf:{"^":"h;l:height=,k:width=,u:x=,v:y=","%":"SVGRect"},ng:{"^":"dR;l:height=,k:width=,u:x=,v:y=","%":"SVGRectElement"},nj:{"^":"r;I:type%",$ish:1,"%":"SVGScriptElement"},nq:{"^":"r;I:type%",
S:function(a,b){return a.disabled.$1(b)},
"%":"SVGStyleElement"},r:{"^":"bq;",
gdL:function(a){return H.b(new W.bC(a,"click",!1),[H.q(C.A,0)])},
gdN:function(a){return H.b(new W.bC(a,"keydown",!1),[H.q(C.q,0)])},
$isa_:1,
$ish:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGTitleElement;SVGElement"},nr:{"^":"aK;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGSVGElement"},ns:{"^":"r;",$ish:1,"%":"SVGSymbolElement"},eo:{"^":"aK;","%":";SVGTextContentElement"},nv:{"^":"eo;",$ish:1,"%":"SVGTextPathElement"},nw:{"^":"eo;u:x=,v:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},nC:{"^":"aK;l:height=,k:width=,u:x=,v:y=",$ish:1,"%":"SVGUseElement"},nG:{"^":"r;",$ish:1,"%":"SVGViewElement"},km:{"^":"r;",$ish:1,"%":"SVGLinearGradientElement;SVGGradientElement"},nS:{"^":"r;",$ish:1,"%":"SVGCursorElement"},nT:{"^":"r;",$ish:1,"%":"SVGFEDropShadowElement"},nU:{"^":"r;",$ish:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",cr:{"^":"h;",$isc:1,"%":"WebGLBuffer"},c0:{"^":"h;",
fG:function(a,b,c){return a.bindBuffer(b,c)},
fM:function(a,b){return a.clear(b)},
fN:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
fU:function(a){return a.createBuffer()},
fV:function(a){return a.createProgram()},
fW:function(a,b){return a.createShader(b)},
e1:function(a,b,c){return a.getUniformLocation(b,c)},
hJ:function(a,b){return a.useProgram(b)},
$isc0:1,
"%":"WebGLRenderingContext"},j4:{"^":"h;",$isj4:1,$isc:1,"%":"WebGLShader"}}],["","",,P,{"^":""}],["","",,P,{"^":"",
be:function(a,b){if(typeof b!=="number")return H.i(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
eS:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
bl:function(a,b){if(typeof b!=="number")throw H.e(P.a9(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.d.gdI(b)||isNaN(b))return b
return a}return a},
aX:function(a,b){if(typeof a!=="number")throw H.e(P.a9(a))
if(typeof b!=="number")throw H.e(P.a9(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.d.gdI(a))return b
return a},
iT:function(a){return C.w},
kq:{"^":"c;",
cl:function(a){if(a<=0||a>4294967296)throw H.e(P.iU("max must be in range 0 < max \u2264 2^32, was "+H.f(a)))
return Math.random()*a>>>0}},
a5:{"^":"c;u:a>,v:b>",
i:function(a){return"Point("+H.f(this.a)+", "+H.f(this.b)+")"},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.a5))return!1
return J.E(this.a,b.a)&&J.E(this.b,b.b)},
gG:function(a){var z,y
z=J.X(this.a)
y=J.X(this.b)
return P.eS(P.be(P.be(0,z),y))},
B:function(a,b){var z=J.k(b)
z=new P.a5(J.w(this.a,z.gu(b)),J.w(this.b,z.gv(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
q:function(a,b){var z=J.k(b)
z=new P.a5(J.a8(this.a,z.gu(b)),J.a8(this.b,z.gv(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
E:function(a,b){var z=new P.a5(J.F(this.a,b),J.F(this.b,b))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
kB:{"^":"c;",
gct:function(a){return J.w(this.a,this.c)},
gc4:function(a){return J.w(this.b,this.d)},
i:function(a){return"Rectangle ("+H.f(this.a)+", "+H.f(this.b)+") "+H.f(this.c)+" x "+H.f(this.d)},
w:function(a,b){var z,y,x,w,v
if(b==null)return!1
z=J.l(b)
if(!z.$isaj)return!1
y=this.a
x=J.l(y)
if(x.w(y,z.gaW(b))){w=this.b
v=J.l(w)
z=v.w(w,z.gb2(b))&&J.E(x.B(y,this.c),z.gct(b))&&J.E(v.B(w,this.d),z.gc4(b))}else z=!1
return z},
gG:function(a){var z,y,x,w,v,u
z=this.a
y=J.l(z)
x=y.gG(z)
w=this.b
v=J.l(w)
u=v.gG(w)
z=J.X(y.B(z,this.c))
w=J.X(v.B(w,this.d))
return P.eS(P.be(P.be(P.be(P.be(0,x),u),z),w))},
gcA:function(a){var z=new P.a5(this.a,this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
aj:{"^":"kB;aW:a>,b2:b>,k:c>,l:d>",$asaj:null,p:{
iW:function(a,b,c,d,e){var z,y
z=J.y(c)
z=z.W(c,0)?J.F(z.bv(c),0):c
y=J.y(d)
return H.b(new P.aj(a,b,z,y.W(d,0)?J.F(y.bv(d),0):d),[e])}}}}],["","",,H,{"^":"",
m:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(P.a9("Invalid length "+H.f(a)))
return a},
eY:function(a){var z,y,x
if(!!J.l(a).$isa4)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
iD:function(a){return new Int8Array(H.eY(a))},
e4:{"^":"h;",
gL:function(a){return C.a_},
$ise4:1,
"%":"ArrayBuffer"},
bV:{"^":"h;",$isbV:1,"%":";ArrayBufferView;cE|e5|e7|cF|e6|e8|ar"},
mW:{"^":"bV;",
gL:function(a){return C.a0},
"%":"DataView"},
cE:{"^":"bV;",
gj:function(a){return a.length},
$isaq:1,
$asaq:I.ao,
$isa4:1,
$asa4:I.ao},
cF:{"^":"e7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
return a[b]},
n:function(a,b,c){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
a[b]=c}},
e5:{"^":"cE+by;",$isj:1,
$asj:function(){return[P.Z]},
$isu:1},
e7:{"^":"e5+dN;"},
ar:{"^":"e8;",
n:function(a,b,c){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.p]},
$isu:1},
e6:{"^":"cE+by;",$isj:1,
$asj:function(){return[P.p]},
$isu:1},
e8:{"^":"e6+dN;"},
iC:{"^":"cF;",
gL:function(a){return C.a1},
$isj:1,
$asj:function(){return[P.Z]},
$isu:1,
"%":"Float32Array"},
mX:{"^":"cF;",
gL:function(a){return C.a2},
$isj:1,
$asj:function(){return[P.Z]},
$isu:1,
"%":"Float64Array"},
mY:{"^":"ar;",
gL:function(a){return C.a3},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isu:1,
"%":"Int16Array"},
mZ:{"^":"ar;",
gL:function(a){return C.a4},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isu:1,
"%":"Int32Array"},
n_:{"^":"ar;",
gL:function(a){return C.a5},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isu:1,
"%":"Int8Array"},
n0:{"^":"ar;",
gL:function(a){return C.aa},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isu:1,
"%":"Uint16Array"},
iE:{"^":"ar;",
gL:function(a){return C.ab},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isu:1,
"%":"Uint32Array"},
n1:{"^":"ar;",
gL:function(a){return C.ac},
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isu:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
n2:{"^":"ar;",
gL:function(a){return C.ad},
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.I(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isu:1,
"%":";Uint8Array"}}],["","",,H,{"^":"",
ly:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,S,{"^":"",
cu:function(a){var z,y
z=$.$get$ct().h(0,a)
if(z==null){z=new S.du(0,0)
y=$.dv
z.a=y
$.dv=y<<1>>>0
y=$.dw
$.dw=y+1
z.b=y
$.$get$ct().n(0,a,z)}return z},
bX:function(a,b){var z=J.aF(S.aO(a))
return null==z?b.$0():z},
aO:function(a){var z,y
z=$.$get$bW().h(0,a)
if(null==z){y=new Array(16)
y.fixed$length=Array
z=H.b(new S.Y(y,0),[null])
$.$get$bW().n(0,a,z)}return z},
b1:{"^":"c;a,b,c",
fA:function(a,b){var z={}
z.a=a
C.b.D(b,new S.fW(z))
return z.a},
p:{
aa:function(a){var z=new S.b1(0,0,0)
z.a=z.fA(0,a)
return z}}},
fW:{"^":"d:0;a",
$1:function(a){var z=this.a
z.a=(z.a|S.cu(a).gdr())>>>0}},
bN:{"^":"c;",
d6:function(){}},
at:{"^":"hb;",
d6:function(){this.ht()}},
hb:{"^":"bN+eb;"},
h7:{"^":"aM;b,c,a",
H:function(){},
fm:function(a){this.eX(a,new S.h8(a))
a.sdf(0)},
eX:function(a,b){var z,y,x,w
z=a.gdf()
for(y=this.b,x=0;z>0;){if((z&1)===1){w=y.a
if(x>=w.length)return H.a(w,x)
b.$2(w[x],x)}++x
z=z>>>1}},
aQ:function(a){return this.c.t(0,a)},
fL:function(){this.c.D(0,new S.h9(this))
var z=this.c
z.c.by(0)
z.d=!0}},
h8:{"^":"d:3;a",
$2:function(a,b){var z,y,x
z=this.a
y=J.k(z)
x=J.M(a)
x.h(a,y.gA(z)).d6()
x.n(a,y.gA(z),null)}},
h9:{"^":"d:0;a",
$1:function(a){return this.a.fm(a)}},
du:{"^":"c;a,b",
gdr:function(){return this.a},
gA:function(a){return this.b}},
ap:{"^":"c;A:a>,fz:b?,df:c@,bZ:d<,c1:e?,f,r",
fp:function(a){this.d=(this.d&J.fr(a))>>>0},
i:function(a){return"Entity["+H.f(this.a)+"]"},
fX:function(){this.e.e.t(0,this)
return}},
hp:{"^":"aM;b,c,d,e,f,r,x,y,a",
H:function(){},
c2:function(a){++this.e;++this.f
this.b.n(0,J.K(a),a)},
cb:function(a){this.d.n(0,J.K(a),!1)},
S:function(a,b){this.d.n(0,J.K(b),!0)},
aQ:function(a){var z=J.k(a)
this.b.n(0,z.gA(a),null)
this.d.n(0,z.gA(a),!1)
this.c.t(0,a);--this.e;++this.x}},
ko:{"^":"c;a,b",
fK:function(){var z=this.a
if(J.bn(z.b,0))return z.a5(0)
return this.b++}},
b6:{"^":"c;c1:b?,fg:x?",
ghv:function(){return this.x},
ge3:function(){return this.y},
dq:function(){},
aD:function(){if(this.az()){this.dq()
this.br(this.c)
this.dB()}},
dB:function(){},
H:["ad",function(){}],
bJ:function(a){var z,y,x,w
if(this.r)return
z=J.cf(this.a,a.gbZ())===this.a
y=this.d
x=a.c
w=(y&x)>>>0===y
y=this.f
if(typeof y!=="number")return y.T()
if(y>0&&w)w=(y&x)>0
y=this.e
if(y>0&&w)w=(y&x)===0
if(w&&!z){this.c.t(0,a)
y=this.a
x=a.d
if(typeof y!=="number")return H.i(y)
a.d=(x|y)>>>0}else if(!w&&z)this.bW(a)},
bW:function(a){var z,y,x
z=this.c
y=z.c
x=J.k(a)
y.h(0,x.gA(a))
y.n(0,x.gA(a),!1)
z.d=!0
a.fp(this.a)},
c2:function(a){return this.bJ(a)},
c6:function(a){return this.bJ(a)},
cb:function(a){return this.bJ(a)},
aQ:function(a){if(J.cf(this.a,a.gbZ())===this.a)this.bW(a)},
S:function(a,b){if(J.cf(this.a,b.gbZ())===this.a)this.bW(b)},
P:function(a){var z,y,x
this.r=this.d===0&&this.f===0
z=new H.af(H.aD(this),null)
y=$.d1
if(null==y){y=H.b(new H.U(0,null,null,null,null,null,0),[P.bc,P.p])
$.d1=y}x=y.h(0,z)
if(x==null){y=$.eW
x=C.a.ax(1,y)
$.eW=y+1
$.d1.n(0,z,x)}this.a=x}},
aM:{"^":"c;c1:a?",
H:["eu",function(){}],
c2:function(a){},
c6:function(a){},
aQ:function(a){},
S:function(a,b){},
cb:function(a){}},
cO:{"^":"aM;b,c,a",
ac:function(a){return this.b.h(0,a)},
aQ:function(a){var z=this.c.as(0,a)
if(z!=null)this.b.as(0,z)}},
z:{"^":"ha;a,b"},
ha:{"^":"c;",
h:function(a,b){return J.o(this.b,J.K(b))},
K:function(a,b,c){var z,y,x,w
z=S.cu(a)
this.a=z
y=b.b
x=J.K(z)
y=y.b
y.cZ(x)
z=y.a
if(x>>>0!==x||x>=z.length)return H.a(z,x)
w=z[x]
if(w==null){z=new Array(16)
z.fixed$length=Array
w=H.b(new S.Y(z,0),[S.bN])
y.n(0,x,w)}this.b=w}},
b5:{"^":"b6;",
br:function(a){return a.D(0,new S.hq(this))},
az:function(){return!0}},
hq:{"^":"d:0;a",
$1:function(a){return this.a.aE(a)}},
bB:{"^":"b6;",
br:function(a){return this.aZ()},
az:function(){return!0}},
Y:{"^":"ea;a,b",
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
gaG:function(a){return this.b},
a5:["en",function(a){var z,y,x
if(J.bn(this.b,0)){z=this.a
y=J.a8(this.b,1)
this.b=y
if(y>>>0!==y||y>=z.length)return H.a(z,y)
x=z[y]
y=this.a
z=this.gaG(this)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y[z]=null
return x}return}],
t:["em",function(a,b){var z,y
if(J.E(this.b,this.a.length))this.bP(C.a.N(this.a.length*3,2)+1)
z=this.a
y=this.b
this.b=J.w(y,1)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=b}],
n:function(a,b,c){var z=J.y(b)
if(z.U(b,this.a.length))this.bP(z.E(b,2))
if(J.fq(this.b,b))this.b=z.B(b,1)
z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c},
bP:function(a){var z,y
z=this.a
if(typeof a!=="number")return H.i(a)
y=new Array(a)
y.fixed$length=Array
y=H.b(y,[H.J(this,"Y",0)])
this.a=y
C.b.ee(y,0,z.length,z)},
cZ:function(a){var z=J.y(a)
if(z.U(a,this.a.length))this.bP(z.E(a,2))},
gO:function(a){var z=C.b.cM(this.a,0,this.gaG(this))
return H.b(new J.cn(z,z.length,0,null),[H.q(z,0)])},
gj:function(a){return this.gaG(this)},
$isP:1},
ea:{"^":"c+dX;"},
G:{"^":"Y;c,d,a,b",
t:function(a,b){var z,y
if(this.d)this.bh()
z=J.k(b)
y=this.c
if(J.fp(z.gA(b),y.c))y.by(J.w(J.aE(J.F(z.gA(b),3),2),1))
if(y.h(0,z.gA(b)))return
y.n(0,z.gA(b),!0)
this.em(this,b)},
a5:function(a){var z=this.en(this)
this.c.n(0,J.K(z),!1)
this.d=!0
return z},
gaG:function(a){if(this.d)this.bh()
return this.b},
gO:function(a){var z
if(this.d)this.bh()
z=this.a
if(this.d)this.bh()
z=C.b.cM(z,0,this.b)
return H.b(new J.cn(z,z.length,0,null),[H.q(z,0)])},
bh:function(){var z,y,x
z={}
y=this.c.dv(!0)
this.b=y
if(typeof y!=="number")return H.i(y)
y=new Array(y)
y.fixed$length=Array
x=H.b(y,[S.ap])
if(J.bn(this.b,0)){z.a=0
y=this.a
y=H.b(new H.jg(y,new S.hm(z,this)),[H.q(y,0)])
H.b(new H.eI(y,new S.hn(this)),[H.J(y,"P",0)]).D(0,new S.ho(z,x))}this.a=x
this.d=!1},
$asY:function(){return[S.ap]},
$asea:function(){return[S.ap]}},
hm:{"^":"d:0;a,b",
$1:function(a){var z,y
z=this.a.a
y=this.b.b
if(typeof y!=="number")return H.i(y)
return z<y}},
hn:{"^":"d:0;a",
$1:function(a){return this.a.c.h(0,J.K(a))}},
ho:{"^":"d:0;a,b",
$1:function(a){var z,y
z=this.b
y=this.a.a++
if(y>=z.length)return H.a(z,y)
z[y]=a
return a}},
eb:{"^":"c;",
ht:function(){J.fw($.$get$bW().h(0,new H.af(H.aD(this),null)),this)}},
jz:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
H:function(){this.Q.D(0,new S.jG(this))
C.b.D(this.y,new S.jH(this))},
aN:function(a){this.z.n(0,new H.af(H.aD(a),null),a)
this.Q.t(0,a)
a.a=this},
c9:function(a){var z,y,x
z=this.a
y=z.c.a5(0)
if(null==y){x=z.a
y=new S.ap(z.y.fK(),0,0,0,x,null,null)
y.f=x.a
y.r=x.b}++z.r
z=$.dK
$.dK=z+1
y.sfz(z)
C.b.D(a,new S.jF(y))
return y},
ac:function(a){var z=this.a.b.a
if(a>>>0!==a||a>=z.length)return H.a(z,a)
return z[a]},
fE:function(a,b,c){a.sc1(this)
a.sfg(!1)
a.y=b
this.x.n(0,new H.af(H.aD(a),null),a)
this.y.push(a)
this.cy.dP(b,new S.jD())
this.cx.dP(b,new S.jE())
return a},
fD:function(a,b){return this.fE(a,b,!1)},
aI:function(a,b){a.D(0,new S.jC(this,b))
a.c.by(0)
a.d=!0},
dO:function(a){var z=this.cx
z.n(0,a,J.w(z.h(0,a),1))
z=this.cy
z.n(0,a,J.w(z.h(0,a),this.ch))
this.hz()
z=this.y
H.b(new H.eI(z,new S.jN(a)),[H.q(z,0)]).D(0,new S.jO())},
aD:function(){return this.dO(0)},
hz:function(){this.aI(this.c,new S.jI())
this.aI(this.d,new S.jJ())
this.aI(this.r,new S.jK())
this.aI(this.f,new S.jL())
this.aI(this.e,new S.jM())
this.b.fL()},
h:function(a,b){return this.db.h(0,b)},
n:function(a,b,c){this.db.n(0,b,c)}},
jG:{"^":"d:0;a",
$1:function(a){return a.H()}},
jH:{"^":"d:0;a",
$1:function(a){return a.H()}},
jF:{"^":"d:0;a",
$1:function(a){var z,y,x,w,v,u
z=this.a
y=z.r
x=S.cu(J.cj(a))
w=J.K(x)
y=y.b
y.cZ(w)
v=y.a
if(w>>>0!==w||w>=v.length)return H.a(v,w)
u=v[w]
if(u==null){v=new Array(16)
v.fixed$length=Array
u=H.b(new S.Y(v,0),[S.bN])
y.n(0,w,u)}J.ft(u,z.a,a)
y=x.gdr()
z.c=(z.c|y)>>>0
return}},
jD:{"^":"d:1;",
$0:function(){return 0}},
jE:{"^":"d:1;",
$0:function(){return 0}},
jC:{"^":"d:0;a,b",
$1:function(a){var z,y
z=this.a
y=this.b
z.Q.D(0,new S.jA(y,a))
C.b.D(z.y,new S.jB(y,a))}},
jA:{"^":"d:0;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
jB:{"^":"d:0;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
jN:{"^":"d:0;a",
$1:function(a){return a.ghv()!==!0&&J.E(a.y,this.a)}},
jO:{"^":"d:0;",
$1:function(a){a.aD()}},
jI:{"^":"d:3;",
$2:function(a,b){return a.c2(b)}},
jJ:{"^":"d:3;",
$2:function(a,b){return a.c6(b)}},
jK:{"^":"d:3;",
$2:function(a,b){return J.fE(a,b)}},
jL:{"^":"d:3;",
$2:function(a,b){return a.cb(b)}},
jM:{"^":"d:3;",
$2:function(a,b){return a.aQ(b)}}}],["","",,L,{"^":"",
kV:function(a,b,c){var z=new Array(2)
z[0]=W.dT("packages/"+a+"/assets/shader/"+b+".vert",null,null)
z[1]=W.dT("packages/"+a+"/assets/shader/"+c+".frag",null,null)
return P.cw(z,null,!1).a1(new L.kW())},
hR:{"^":"c;a,b"},
kW:{"^":"d:0;",
$1:function(a){var z=J.M(a)
return new L.j5(z.h(a,0),z.h(a,1))}},
j5:{"^":"c;hK:a<,h3:b<"},
hU:{"^":"b5;",
H:["eq",function(){var z=H.b(new W.aQ(window,"keydown",!1),[H.q(C.q,0)])
H.b(new W.a7(0,z.a,z.b,W.R(new L.hV(this)),!1),[H.q(z,0)]).Y()
z=H.b(new W.aQ(window,"keyup",!1),[H.q(C.H,0)])
H.b(new W.a7(0,z.a,z.b,W.R(new L.hW(this)),!1),[H.q(z,0)]).Y()}],
cd:["ep",function(a,b){this.Q.n(0,J.ci(a),b)
if(!b&&this.ch.h(0,a.keyCode)===!0)this.ch.n(0,a.keyCode,!1)
if(this.z.aB(0,a.keyCode))a.preventDefault()}],
ah:function(a){return this.Q.h(0,a)===!0&&this.ch.h(0,a)!==!0}},
hV:{"^":"d:0;a",
$1:function(a){return this.a.cd(a,!0)}},
hW:{"^":"d:0;a",
$1:function(a){return this.a.cd(a,!1)}},
fZ:{"^":"bB;z,Q,a,b,c,d,e,f,r,x,y",
aZ:function(){var z,y
z=this.z
y=J.di(z)
y.fillStyle=this.Q
y.clearRect(0,0,z.width,z.height)}},
jv:{"^":"bB;z,a,b,c,d,e,f,r,x,y",
H:function(){J.fz(this.z,0,0,0,1)},
aZ:function(){J.fy(this.z,16640)}},
cT:{"^":"c;V:b$@,b5:c$*,bn:d$@,cf:e$@,b7:r$@",
hh:function(){this.eR(this.cW(35633,this.gb5(this).ghK()),this.cW(35632,this.gb5(this).gh3()))},
eR:function(a,b){var z=this.z
this.sV(J.fC(z))
z.attachShader(this.gV(),a)
z.attachShader(this.gV(),b)
z.linkProgram(this.gV())
if(z.getProgramParameter(this.gV(),35714)!==!0){P.bH(H.f(new H.af(H.aD(this),null))+" - Error linking program: "+H.f(z.getProgramInfoLog(this.gV())))
this.sb7(!1)}},
cW:function(a,b){var z,y
z=this.z
y=J.fD(z,a)
z.shaderSource(y,b)
z.compileShader(y)
if(z.getShaderParameter(y,35713)!==!0){P.bH(H.f(new H.af(H.aD(this),null))+" - Error compiling shader: "+H.f(z.getShaderInfoLog(y)))
this.sb7(!1)}return y},
c5:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(null==this.gbn()){z=this.z
this.sbn(J.fB(z))
this.scf(z.createBuffer())}z=this.z
J.fx(z,34962,this.gbn())
z.bufferData(34962,b,35048)
for(y=a.length,x=0,w=0;v=a.length,w<v;v===y||(0,H.bm)(a),++w)x+=a[w].b
for(y=4*x,u=0,w=0;w<a.length;a.length===v||(0,H.bm)(a),++w){t=a[w]
s=z.getAttribLocation(this.gV(),t.a)
r=t.b
z.vertexAttribPointer(s,r,5126,!1,y,4*u)
z.enableVertexAttribArray(s)
u+=r}z.bindBuffer(34963,this.gcf())
z.bufferData(34963,c,35048)}},
bK:{"^":"c;a,b"},
cU:{"^":"hr;",
H:["bC",function(){this.hh()}],
br:function(a){var z,y,x
z={}
y=a.gaG(a)
x=J.y(y)
if(x.T(y,0)){J.fV(this.z,this.gV())
if(x.T(y,this.Q)){this.cB(y)
this.Q=y}z.a=0
a.D(0,new L.jw(z,this))
this.cs(y)}},
az:function(){return this.gb7()}},
hr:{"^":"b6+cT;V:b$@,b5:c$*,bn:d$@,cf:e$@,b7:r$@",$iscT:1},
jw:{"^":"d:0;a,b",
$1:function(a){this.b.cp(this.a.a++,a)}},
hz:{"^":"c;",
f4:function(){return this.eI().a1(new L.hG(this)).a1(new L.hH(this)).a1(new L.hI(this))},
eI:function(){var z=H.b([],[P.a0])
return P.cw(z,null,!1).a1(new L.hD(this))},
f5:function(){var z,y,x,w,v,u,t,s,r,q
z=H.a2(this.y.z.h(0,C.h),"$iscO")
y=F.iO(0,0,0)
x=this.fr
w=S.bX(C.m,F.lL())
v=new T.H(new Float32Array(H.m(3)))
v.ak(0,0,x)
w.sm(v)
u=S.bX(C.n,F.lM())
t=F.hX()
u.sa6(t.a)
u.saT(t.b)
s=S.bX(C.l,F.lJ())
s.sdn(1256.6370614359173)
s.a=20
r=S.bX(C.p,F.lB())
v=this.y
q=v.c9([y,w,u,s,r])
v.c.t(0,q)
z.b.n(0,"player",q)
z.c.n(0,q,"player")
return this.hi().a1(new L.hF(this))},
b6:function(a){return this.f4().a1(new L.hP(this))},
dc:function(){var z,y
this.cx=window.performance.now()
if(null!=C.b.h7(this.y.y,new L.hJ(),new L.hK()))this.hy()
z=window
y=this.geW()
C.f.aJ(z)
C.f.aL(z,W.R(y))},
bA:function(a){this.db=!0},
gcg:function(){return this.db},
a_:function(a){if(!this.db)this.dx=!0},
at:function(){if(!this.db){this.dx=!1
this.dc()}},
hy:[function(){var z,y,x
z=window.performance.now()
y=this.y
x=this.cx
if(typeof z!=="number")return z.q()
if(typeof x!=="number")return H.i(x)
y.ch=(z-x)/1000
this.cx=z
y.dO(1)
if(!this.db&&!this.dx)P.dP(P.dG(0,0,0,5,0,0),this.ghx(),null)},"$0","ghx",0,0,2],
hP:[function(a){var z
this.ch=J.cg(a,1000)
z=this.y
z.ch=0.016666666666666666
z.aD()
z=window
C.f.aJ(z)
C.f.aL(z,W.R(new L.hE(this)))},"$1","geW",2,0,19],
dU:function(a){var z,y
z=P.bl(0.05,J.a8(a,this.ch))
y=this.y
y.ch=z
this.ch=a
y.aD()
if(!this.db&&!this.dx){y=window
C.f.aJ(y)
C.f.aL(y,W.R(new L.hQ(this)))}},
hT:[function(a){var z,y
z=!this.cy
this.cy=z
y=this.a
if(z){z=J.k(y)
z.sk(y,window.screen.width)
z.sl(y,window.screen.height)}else{z=J.k(y)
z.sk(y,this.f)
z.sl(y,this.r)}z=J.k(y)
this.ce(z.gk(y),z.gl(y))},"$1","gf3",2,0,37],
hi:function(){var z=[]
this.e0().D(0,new L.hO(this,z))
return P.cw(z,null,!1)},
eA:function(a,b,c,d,e,f,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.a
y=J.k(z)
y.sk(z,c)
y.sl(z,d)
H.a2(this.b,"$isc0").enable(2929)
y=H.a2(this.b,"$isc0")
y.enable(3042)
y.blendFunc(770,771)
z=H.b(new W.bC(z,"webkitfullscreenchange",!1),[H.q(C.K,0)])
H.b(new W.a7(0,z.a,z.b,W.R(this.gf3()),!1),[H.q(z,0)]).Y()
z=new Array(16)
z.fixed$length=Array
z=H.b(new S.Y(z,0),[S.ap])
y=new Array(16)
y.fixed$length=Array
y=H.b(new S.Y(y,0),[S.ap])
x=new Array(16)
x.fixed$length=Array
x=H.b(new S.Y(x,0),[P.bF])
w=new Array(16)
w.fixed$length=Array
w=new S.hp(z,y,x,0,0,0,0,new S.ko(H.b(new S.Y(w,0),[P.p]),0),null)
x=new Array(16)
x.fixed$length=Array
x=H.b(new S.Y(x,0),[[S.Y,S.bN]])
y=D.A(16,!1)
z=new Array(16)
z.fixed$length=Array
z=new S.h7(x,new S.G(y,!1,z,0),null)
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
n=H.b(new H.U(0,null,null,null,null,null,0),[P.bc,S.b6])
m=H.b([],[S.b6])
l=H.b(new H.U(0,null,null,null,null,null,0),[P.bc,S.aM])
k=new Array(16)
k.fixed$length=Array
k=H.b(new S.Y(k,0),[S.aM])
j=P.ad([0,0])
i=P.ad([0,0])
h=H.b(new H.U(0,null,null,null,null,null,0),[P.Q,null])
h=new S.jz(w,z,new S.G(y,!1,x,0),new S.G(v,!1,u,0),new S.G(t,!1,s,0),new S.G(r,!1,q,0),new S.G(p,!1,o,0),n,m,l,k,0,j,i,h)
h.aN(w)
h.aN(z)
this.y=h
g=document.querySelector("button#fullscreen")
if(null!=g){z=J.dj(g)
H.b(new W.a7(0,z.a,z.b,W.R(new L.hL()),!1),[H.q(z,0)]).Y()}}},
hL:{"^":"d:0;",
$1:function(a){return document.querySelector("canvas").requestFullscreen()}},
hG:{"^":"d:0;a",
$1:function(a){return}},
hH:{"^":"d:0;a",
$1:function(a){return this.a.f5()}},
hI:{"^":"d:0;a",
$1:function(a){return}},
hD:{"^":"d:0;a",
$1:function(a){var z,y
z=this.a
y=z.z
if(null!=y)J.bJ(y,new L.hC(z))}},
hC:{"^":"d:3;a",
$2:function(a,b){var z=this.a
J.bJ(b,new L.hB(J.fJ(z.Q.gek().h(0,H.f(a)+".png")).q(0,z.Q.gek().h(0,H.f(a)+".png").ghY())))}},
hB:{"^":"d:0;a",
$1:function(a){var z=a.ga6()
z.toString
a.sa6(H.b(new H.bU(z,new L.hA(this.a)),[null,null]).bt(0))}},
hA:{"^":"d:0;a",
$1:function(a){return J.w(a,this.a)}},
hF:{"^":"d:0;a",
$1:function(a){this.a.y.H()}},
hP:{"^":"d:0;a",
$1:function(a){var z=this.a
z.dc()
return z}},
hJ:{"^":"d:0;",
$1:function(a){return J.E(a.ge3(),1)}},
hK:{"^":"d:1;",
$0:function(){return}},
hE:{"^":"d:0;a",
$1:function(a){return this.a.dU(J.cg(a,1000))}},
hQ:{"^":"d:0;a",
$1:function(a){return this.a.dU(J.cg(a,1000))}},
hO:{"^":"d:3;a,b",
$2:function(a,b){J.bJ(b,new L.hN(this.a,this.b,a))}},
hN:{"^":"d:0;a,b,c",
$1:function(a){var z=this.a
z.y.fD(a,this.c)
if(!!J.l(a).$iscT)this.b.push(L.kV(z.c.a,a.gcC(),a.gcc()).a1(new L.hM(a)))}},
hM:{"^":"d:0;a",
$1:function(a){this.a.sb5(0,a)}}}],["","",,F,{"^":"",js:{"^":"bB;a,b,c,d,e,f,r,x,y",
aZ:function(){$.$get$dg().bu(this.b.ch)}}}],["","",,A,{"^":"",
cb:function(a){var z,y
z=C.X.h8(a,0,new A.lf())
if(typeof z!=="number")return H.i(z)
y=536870911&z+((67108863&z)<<3>>>0)
y=(y^y>>>11)>>>0
return 536870911&y+((16383&y)<<15>>>0)},
lf:{"^":"d:3;",
$2:function(a,b){var z,y
z=J.w(a,J.X(b))
if(typeof z!=="number")return H.i(z)
y=536870911&z
y=536870911&y+((524287&y)<<10>>>0)
return y^y>>>6}}}],["","",,P,{"^":"",
la:function(a,b){var z={}
a.D(0,new P.lb(z))
return z},
dF:function(){var z=$.dD
if(z==null){z=J.ch(window.navigator.userAgent,"Opera",0)
$.dD=z}return z},
dE:function(){var z,y
z=$.dA
if(z!=null)return z
y=$.dB
if(y==null){y=J.ch(window.navigator.userAgent,"Firefox",0)
$.dB=y}if(y===!0)z="-moz-"
else{y=$.dC
if(y==null){y=P.dF()!==!0&&J.ch(window.navigator.userAgent,"Trident/",0)
$.dC=y}if(y===!0)z="-ms-"
else z=P.dF()===!0?"-o-":"-webkit-"}$.dA=z
return z},
lb:{"^":"d:21;a",
$2:function(a,b){this.a[a]=b}}}],["","",,A,{"^":"",
d9:[function(){var z=0,y=new P.dt(),x=1,w,v
var $async$d9=P.f4(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.an(F.dQ().b6(0),$async$d9,y)
case 2:v=b
$.ag=v
J.dl(v)
v=document.querySelector("#loading").style
v.display="none"
v=H.a2(document.querySelector("#startGame"),"$isdr").style
v.display="inline-block"
v=J.dj(document.querySelector("#startGame"))
H.b(new W.a7(0,v.a,v.b,W.R(new A.lt()),!1),[H.q(v,0)]).Y()
v=J.fK(document.querySelector("body"))
H.b(new W.a7(0,v.a,v.b,W.R(new A.lu()),!1),[H.q(v,0)]).Y()
v=H.b(new W.aQ(window,"gamepadconnected",!1),[null])
H.b(new W.a7(0,v.a,v.b,W.R(new A.lv()),!1),[H.q(v,0)]).Y()
v=window
C.f.aJ(v)
C.f.aL(v,W.R(A.fi()))
return P.an(null,0,y,null)
case 1:return P.an(w,1,y)}})
return P.an(null,$async$d9,y,null)},"$0","fj",0,0,25],
nX:[function(a){var z,y,x
if($.ag.gcg()&&$.c8!=null){z=window.navigator.getGamepads()
y=$.c8
if(y>>>0!==y||y>=z.length)return H.a(z,y)
x=z[y]
if(J.o(x.buttons,0).gbq()||J.o(x.buttons,9).gbq())A.aY()}z=window
C.f.aJ(z)
C.f.aL(z,W.R(A.fi()))},"$1","fi",2,0,26],
aY:function(){var z=0,y=new P.dt(),x=1,w,v
var $async$aY=P.f4(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.an(F.dQ().b6(0),$async$aY,y)
case 2:v=b
$.ag=v
v.sdZ($.c8)
J.fP($.ag)
$.ag.scL(H.iP(H.a2(document.querySelector("input[type=radio][name=speed]:checked"),"$isiS").value,null))
v=document.querySelector("#storyContainer").style;(v&&C.i).saC(v,"0.0")
v=document.querySelector("body").style
v.cursor="none"
v=document.querySelector("#game").style;(v&&C.i).saC(v,"1.0")
v=document.querySelector("#hud").style;(v&&C.i).saC(v,"1.0")
z=3
return P.an(P.dP(P.dG(0,0,0,0,0,1),null,null),$async$aY,y)
case 3:$.ag.at()
v=document.querySelector("#storyContainer").style
v.display="none"
$.ag.dM().a1(new A.lN())
return P.an(null,0,y,null)
case 1:return P.an(w,1,y)}})
return P.an(null,$async$aY,y,null)},
lt:{"^":"d:0;",
$1:function(a){if($.ag.gcg())A.aY()}},
lu:{"^":"d:0;",
$1:function(a){if($.ag.gcg()&&J.ci(a)===13)A.aY()}},
lv:{"^":"d:22;",
$1:function(a){$.c8=J.fH(a).index}},
lN:{"^":"d:0;",
$1:function(a){var z
J.dl($.ag)
document.querySelector("#lastscore").textContent=H.f(a)
if(J.bI(H.iQ(document.querySelector("#highscore").textContent,null,null),a))document.querySelector("#highscore").textContent=H.f(a)
z=document.querySelector("#storyContainer").style;(z&&C.i).saC(z,"1.0")
z.display="flex"
z.cursor="inherit"
z=document.querySelector("#game").style;(z&&C.i).saC(z,"0.1")
z=document.querySelector("#hud").style;(z&&C.i).saC(z,"0.1")
z=document.querySelector("body").style
z.cursor="inherit"}}},1],["","",,F,{"^":"",
hX:[function(){var z,y,x,w,v,u,t,s,r
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
return new F.bs(z,y)},"$0","lC",0,0,6],
mB:[function(){var z,y,x,w,v,u,t,s,r,q,p
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
return new F.bs(z,y)},"$0","lD",0,0,6],
mC:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
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
return new F.bs(z,y)},"$0","lE",0,0,6],
mD:[function(a){if(typeof a!=="number")return a.aj()
return Math.sqrt(H.a1(a/3.141592653589793))},"$1","lF",2,0,4],
mE:[function(a){return Math.sqrt(H.a1(a))/2},"$1","lG",2,0,4],
mF:[function(a){if(typeof a!=="number")return H.i(a)
return Math.sqrt(H.a1(4*a/Math.sqrt(H.a1(3))))*Math.sqrt(H.a1(3))/3},"$1","lH",2,0,4],
v:{"^":"at;m:a@",p:{
iO:function(a,b,c){var z,y
z=J.aF(S.aO(C.c))
if(null==z)z=F.de().$0()
y=new Float32Array(3)
y[0]=a
y[1]=b
y[2]=c
z.sm(new T.H(y))
return z},
nc:[function(){return new F.v(null)},"$0","de",0,0,27]}},
ay:{"^":"at;m:a@",p:{
nD:[function(){return new F.ay(null)},"$0","lL",0,0,28]}},
av:{"^":"at;aF:a@,dn:b@",p:{
nl:[function(){return new F.av(null,null)},"$0","lJ",0,0,29]}},
bb:{"^":"at;aF:a@,j:b*",p:{
nx:[function(){return new F.bb(null,null)},"$0","lK",0,0,30]}},
as:{"^":"at;I:a*",p:{
n6:[function(){return new F.as(null)},"$0","lI",0,0,31]}},
b3:{"^":"at;a0:a*,a7:b@,an:c@",p:{
m4:[function(){return new F.b3(null,null,null)},"$0","lA",0,0,32]}},
az:{"^":"at;a6:a@,aT:b@",
cH:function(a,b,c){var z,y,x,w,v
if(b===0){for(z=this.a,y=z.length,x=c.length,w=0;w<y;++w){v=z[w]
if(w>=x)return H.a(c,w)
c[w]=v}return y}return 0},
ef:function(a,b,c){var z,y,x,w
if(b===0)for(z=this.a,y=z.length,x=c.length,w=0;w<y;++w){if(w>=x)return H.a(c,w)
z[w]=c[w]}},
$isaP:1,
p:{
nE:[function(){return new F.az(null,null)},"$0","lM",0,0,33]}},
b4:{"^":"at;",p:{
m5:[function(){return new F.b4()},"$0","lB",0,0,34]}},
bs:{"^":"c;a6:a@,aT:b@"},
bO:{"^":"aM;k:b>,l:c>,d,a",
dM:function(){return this.d.a},
dX:function(a){this.d.aP(0,a)}},
eH:{"^":"aM;b,c,d,a",
c8:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.d.ac("player")
y=J.o(this.b.b,J.K(z)).gm()
x=J.cl(this.c)
w=J.fI(this.c)
if(typeof x!=="number")return x.aj()
if(typeof w!=="number")return H.i(w)
v=new Float32Array(H.m(16))
u=new T.aN(v)
u.cJ()
t=new Float32Array(H.m(16))
s=new T.aN(t)
s.cJ()
y=y.a
r=y[0]
q=y[1]
p=y[2]
o=new T.H(new Float32Array(H.m(3)))
o.ak(r,q,p-110)
p=y[0]
q=y[1]
y=y[2]
r=new Float32Array(H.m(3))
new T.H(r).ak(p,q,y+10)
y=new T.H(new Float32Array(H.m(3)))
y.ak(0,-1,0)
q=new Float32Array(H.m(3))
n=new T.H(q)
n.J(o)
q[0]=q[0]-r[0]
q[1]=q[1]-r[1]
q[2]=q[2]-r[2]
n.cm()
m=y.dw(n)
m.cm()
l=n.dw(m)
l.cm()
y=m.ca(o)
r=l.ca(o)
o=n.ca(o)
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
d=Math.tan(H.a1(0.7853981633974483))
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
this.eu()
z=this.a
y=H.b(new S.z(null,null),[F.v])
y.K(C.c,z,F.v)
this.b=y
this.d=this.a.z.h(0,C.h)
this.c=this.a.z.h(0,C.j)}},
ek:{"^":"b5;z,Q,ch,ck:cx<,dz:cy<,a,b,c,d,e,f,r,x,y",
aE:function(a){var z,y,x,w,v
z=J.k(a)
y=J.o(this.z.b,z.gA(a))
x=J.o(this.Q.b,z.gA(a))
z=$.$get$cQ()
w=z.a
v=w.b===w.c?z.c.$0():w.cr()
z.b.b.$1(v)
v.sdA($.$get$er())
v.fv(y,0,1)
v.shw(0,$.$get$es())
z=$.$get$dS()
w=this.cy
if(w<0||w>=3)return H.a(z,w)
v.shF(z[w].$0().ga6())
v.sdA($.$get$dJ())
v.cK(0,$.$get$dg())
w=$.$get$bP()
z=this.cy
if(z<0||z>=3)return H.a(w,z)
x.a=w[z].$1(x.gdn())
this.ch=!1},
saX:function(a){if(a!==this.cy){this.cy=a
this.ch=!0}},
az:function(){return this.ch},
H:function(){var z,y
this.ad()
z=this.b
y=H.b(new S.z(null,null),[F.av])
y.K(C.l,z,F.av)
this.Q=y
y=this.b
z=H.b(new S.z(null,null),[F.az])
z.K(C.n,y,F.az)
this.z=z}},
iB:{"^":"b5;z,Q,a,b,c,d,e,f,r,x,y",
aE:function(a){var z,y,x,w,v,u
z=J.k(a)
y=J.o(this.z.b,z.gA(a))
x=J.o(this.Q.b,z.gA(a))
z=y.gm()
w=x.gm()
v=this.b.ch
w.toString
u=new T.H(new Float32Array(H.m(3)))
u.J(w)
u.a8(0,v)
z.toString
v=new T.H(new Float32Array(H.m(3)))
v.J(z)
v.t(0,u)
y.sm(v)},
H:function(){var z,y
this.ad()
z=this.b
y=H.b(new S.z(null,null),[F.ay])
y.K(C.m,z,F.ay)
this.Q=y
y=this.b
z=H.b(new S.z(null,null),[F.v])
z.K(C.c,y,F.v)
this.z=z}},
cI:{"^":"b5;z,Q,cL:ch?,a,b,c,d,e,f,r,x,y",
aE:function(a){var z,y,x
z=J.k(a)
y=J.o(this.Q.b,z.gA(a))
z=J.o(this.z.b,z.gA(a)).gm()
x=P.bl(2500,P.aX(this.ch,100+y.gm().a[2]/100))
z.a[2]=x},
H:function(){var z,y
this.ad()
z=this.b
y=H.b(new S.z(null,null),[F.v])
y.K(C.c,z,F.v)
this.Q=y
y=this.b
z=H.b(new S.z(null,null),[F.ay])
z.K(C.m,y,F.ay)
this.z=z}},
hf:{"^":"b6;z,Q,a,b,c,d,e,f,r,x,y",
br:function(a){var z=this.z.ac("player")
a.D(0,new F.hg(this,J.o(this.Q.b,J.K(z))))},
az:function(){return!0},
H:function(){var z,y
this.ad()
z=this.b
y=H.b(new S.z(null,null),[F.v])
y.K(C.c,z,F.v)
this.Q=y
this.z=this.b.z.h(0,C.h)}},
hg:{"^":"d:0;a,b",
$1:function(a){if(J.o(this.a.Q.b,J.K(a)).gm().a[2]+500<this.b.gm().a[2])a.fX()}},
iF:{"^":"b5;z,Q,ch,cx,cy,db,dx,dy,fr,fx,a,b,c,d,e,f,r,x,y",
aE:function(a){var z,y,x,w,v,u,t,s,r
z=this.z.ac("player")
y=J.o(this.Q.b,J.K(z))
x=J.k(a)
w=J.o(this.Q.b,x.gA(a))
v=y.gm().a[2]-w.gm().a[2]
if(v<=0&&v>-500){this.db=this.cx.gdz()
this.dx=y.gm()}else if(this.db!=null&&v>0&&v<500){u=w.gm().a
t=u[0]
u=u[1]
s=new Float32Array(H.m(2))
s[0]=t
s[1]=u
u=this.dx.a
t=u[0]
u=u[1]
r=new Float32Array(H.m(2))
r[0]=t
r[1]=u
if(new T.am(s).w(0,new T.am(r))){u=this.db
t=J.ck(J.o(this.ch.b,x.gA(a)))
this.dy=u==null?t==null:u===t}u=w.gm().a
t=u[0]
u=u[1]
s=new Float32Array(H.m(2))
s[0]=t
s[1]=u
u=y.gm().a
t=u[0]
u=u[1]
r=new Float32Array(H.m(2))
r[0]=t
r[1]=u
if(new T.am(s).w(0,new T.am(r)))this.fr=this.cx.gdz()===J.ck(J.o(this.ch.b,x.gA(a)))
this.fx=!0}},
dB:function(){var z,y
if(this.fx){if(!this.dy&&!this.fr){z=this.z.ac("player")
y=J.o(this.Q.b,J.K(z))
this.cy.dX(C.d.N(y.gm().a[2],1000)-1)}this.fx=!1
this.dy=!0
this.fr=!0
this.db=null}},
H:function(){var z,y
this.ad()
z=this.b
y=H.b(new S.z(null,null),[F.as])
y.K(C.k,z,F.as)
this.ch=y
y=this.b
z=H.b(new S.z(null,null),[F.v])
z.K(C.c,y,F.v)
this.Q=z
this.cx=this.b.x.h(0,C.u)
this.cy=this.b.z.h(0,C.j)
this.z=this.b.z.h(0,C.h)}},
jn:{"^":"bB;z,Q,ch,cx,a,b,c,d,e,f,r,x,y",
aZ:function(){var z,y,x,w,v,u,t,s,r
z=this.z.ac("player")
y=J.o(this.Q.b,J.K(z))
for(x=this.cx;w=C.d.N(y.gm().a[2],100),v=this.ch,w>v-100;){w=this.b
u=J.aF(S.aO(C.c))
if(null==u)u=F.de().$0()
t=new Float32Array(3)
t[0]=0
t[1]=0
t[2]=x*v
u.sm(new T.H(t))
s=J.aF(S.aO(C.v))
if(null==s)s=F.lK().$0()
s.saF(200)
s.sj(0,x)
r=w.c9([u,s])
w.c.t(0,r);++this.ch}},
H:function(){var z,y
this.ad()
z=this.b
y=H.b(new S.z(null,null),[F.v])
y.K(C.c,z,F.v)
this.Q=y
this.z=this.b.z.h(0,C.h)}},
iH:{"^":"bB;z,Q,ch,cx,a,b,c,d,e,f,r,x,y",
aZ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.a.M(this.cx,2)*0.5+0.3
y=$.$get$dc()
x=P.aX(1+y.cl(3),9-C.a.N(this.cx,7))
w=P.bl(this.z.gck(),2+C.a.N(this.cx,23))
v=P.iw(9,new F.iI(x),!0,null)
C.b.ei(v,y)
for(u=-2;u<3;++u)for(y=u*20*4,t=-2;t<3;++t){if(Math.abs(u)===2||Math.abs(t)===2)s=-1
else s=C.b.a5(v)===!0?$.$get$dc().cl(w):-1
r=this.b
q=this.cx
p=J.aF(S.aO(C.c))
if(null==p)p=F.de().$0()
o=new Float32Array(3)
o[0]=y
o[1]=t*20*4
o[2]=q*1000
p.sm(new T.H(o))
n=J.aF(S.aO(C.k))
if(null==n)n=F.lI().$0()
J.fS(n,s)
m=J.aF(S.aO(C.r))
if(null==m)m=F.lA().$0()
J.fR(m,z)
m.sa7(z)
m.san(z)
l=r.c9([p,n,m])
r.c.t(0,l)}++this.cx},
az:function(){var z=this.Q.ac("player")
return C.d.N(J.o(this.ch.b,J.K(z)).gm().a[2],1000)>this.cx-10},
H:function(){var z,y
this.ad()
z=this.b
y=H.b(new S.z(null,null),[F.v])
y.K(C.c,z,F.v)
this.ch=y
this.z=this.b.x.h(0,C.u)
this.Q=this.b.z.h(0,C.h)}},
iI:{"^":"d:0;a",
$1:function(a){return a<this.a&&!0}}}],["","",,B,{"^":"",bL:{"^":"c;f6:fx<",
b_:["eo",function(a){this.a=-2
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
cK:function(a,b){if(b==null){this.fI()
this.x=0
this.z=!0}else b.t(0,this)},
b6:function(a){return this.cK(a,null)},
a_:function(a){this.cy=!0},
at:function(){this.cy=!1},
ghn:function(){return this.ch===!0||this.cx===!0},
ay:function(a){},
bu:function(a){var z,y,x
if(this.z!==!0||this.cy===!0||this.cx===!0)return
this.y=a
if(this.Q!==!0)this.H()
if(this.Q===!0){z=this.c!==!0
if(z){y=this.b
if(typeof y!=="number")return y.U()
y=this.a
if(typeof y!=="number")return y.W()
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
if(typeof z!=="number")return z.q()
this.y=z-a
this.x=0
this.ay(1)
this.ay(2)
z=this.a
if(typeof z!=="number")return z.q()
this.au(z,z-1,this.c,a)}else{if(z){z=this.b
if(typeof z!=="number")return z.U()
y=this.a
if(typeof y!=="number")return y.T()
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
if(typeof z!=="number")return z.q()
this.y=z-a
this.x=this.f
this.ay(16)
this.ay(32)
z=this.a
if(typeof z!=="number")return z.B()
this.au(z,z+1,this.c,a)}}this.hI()
z=this.b
if(typeof z!=="number")return z.U()
y=this.a
if(typeof y!=="number")return y.T()
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
if(z+y>=x){this.hj()
this.Q=!0
this.c=!0
this.a=0
z=this.y
y=this.e
x=this.x
if(typeof y!=="number")return y.q()
if(typeof x!=="number")return H.i(x)
if(typeof z!=="number")return z.q()
this.y=z-(y-x)
this.x=0
this.ay(1)
this.ay(2)}},
hI:function(){var z,y,x,w,v,u,t
while(!0){z=this.a
if(typeof z!=="number")return z.U()
if(z>=0){y=this.b
if(typeof y!=="number")return y.E()
y=z<=y*2}else y=!1
if(!y){y=this.b
if(typeof y!=="number")return y.W()
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
if(typeof y!=="number")return y.q()
this.y=y-t
this.x=this.f
if(this.d===!0&&Math.abs(C.a.M(z,4))===2)this.dE()
else this.dD()
z=this.a
if(typeof z!=="number")return z.B()
this.au(z,z+1,this.c,t)}else{if(w){w=this.x
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
if(typeof y!=="number")return y.q()
if(typeof x!=="number")return H.i(x)
t=y-x
x=this.y
if(typeof x!=="number")return x.q()
this.y=x-t
this.x=0
if(this.d===!0&&Math.abs(C.a.M(z,4))===2)this.dD()
else this.dE()
z=this.a
if(typeof z!=="number")return z.q()
this.au(z,z-1,this.c,t)}else{if(x){w=this.x
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
if(typeof y!=="number")return y.q()
this.y=y-t
this.x=0
this.au(z,z+1,!1,t)
z=this.a
if(typeof z!=="number")return z.W()
if(z<0){z=this.b
if(typeof z!=="number")return z.U()
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
if(typeof y!=="number")return y.q()
if(typeof x!=="number")return H.i(x)
t=y-x
x=this.y
if(typeof x!=="number")return x.q()
this.y=x-t
this.x=y
this.au(z,z-1,!1,t)
z=this.a
y=this.b
if(typeof y!=="number")return y.E()
if(typeof z!=="number")return z.T()
z>y*2&&!0
this.x=0}else{t=this.y
if(x){if(typeof t!=="number")return t.q()
this.y=t-t
x=this.x
if(typeof x!=="number")return x.B()
this.x=x+t
this.au(z,z,y,t)
break}else{if(typeof t!=="number")return t.q()
this.y=t-t
z=this.x
if(typeof z!=="number")return z.B()
this.x=z+t
break}}}}}}}},hl:{"^":"eq;c,d,e,f,a,b",p:{
m9:[function(a){var z=J.l(a)
if(z.w(a,0))return 0
if(z.w(a,1))return 1
if(typeof a!=="number")return H.i(a)
z=-10*a
H.a1(2)
H.a1(z)
return Math.pow(2,z)*Math.sin(H.a1((a-0.075)*6.283185307179586/0.3))+1},"$1","lS",2,0,11]}},iR:{"^":"eq;a,b",p:{
nd:[function(a){var z
a=J.F(a,2)
z=J.y(a)
if(z.W(a,1)){if(typeof a!=="number")return H.i(a)
return 0.5*a*a}a=z.q(a,1)
z=J.y(a)
z=J.a8(z.E(a,z.q(a,2)),1)
if(typeof z!=="number")return H.i(z)
return-0.5*z},"$1","lT",2,0,11]}},h2:{"^":"jr;a",
hO:[function(a,b,c){var z,y,x
z=J.y(c)
y=P.bl(P.aX(J.fG(J.F(z.q(c,1),a)),0),z.q(c,2))
a=J.a8(J.F(a,z.q(c,1)),y)
if(y===0){z=J.M(b)
return this.bI(z.h(b,0),z.h(b,0),z.h(b,1),z.h(b,2),a)}if(y===z.q(c,2)){x=J.M(b)
return this.bI(x.h(b,z.q(c,3)),x.h(b,z.q(c,2)),x.h(b,z.q(c,1)),x.h(b,z.q(c,1)),a)}z=J.M(b)
return this.bI(z.h(b,y-1),z.h(b,y),z.h(b,y+1),z.h(b,y+2),a)},"$3","geP",6,0,23],
bI:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=J.y(c)
y=J.F(z.q(c,a),0.5)
x=J.F(J.a8(d,b),0.5)
if(typeof e!=="number")return H.i(e)
w=2*e*e
v=3*e*e
u=e*e
t=u*e
return J.w(J.w(J.w(J.F(b,w*e-v+1),z.E(c,-2*e*e*e+v)),J.F(y,t-w+e)),J.F(x,t-u))},
ey:function(){this.a=this.geP()}},iM:{"^":"c;a,b,c",
eC:function(a,b){this.a=P.bT(null,null)}},iN:{"^":"c;a,b"},bA:{"^":"bL;fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx",
b_:function(a){var z,y
this.eo(this)
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
y=$.a6
if(z!==y)this.y1=new Float32Array(H.m(y))
z=this.y2.length
y=(2+$.cS)*$.a6
if(z!==y)this.y2=new Float32Array(H.m(y))},
fv:function(a,b,c){this.fy=a
this.go=a!=null?this.eV():null
this.k1=b
this.f=c},
eV:function(){var z,y
if($.$get$cR().bm(J.cj(this.fy)))return J.cj(this.fy)
z=this.fy
y=J.l(z)
if(!!y.$isaP)return y.gL(z)
return},
sdA:function(a){this.k2=a},
shF:function(a){var z=H.l5(a,"$isj",[P.C],"$asj")
if(z){z=this.x1
if(z.length>$.a6)this.de()
C.b.ec(z,0,a)}},
shw:function(a,b){this.k3=b},
fI:function(){var z,y
if(this.fy==null)return
z=$.$get$cR().h(0,this.go)
this.id=z
y=z==null
y
if(!y){z=z.e2(this.fy,this,this.k1,this.y1)
this.r2=z}else{z=this.fy
if(!!J.l(z).$isaP){z=H.a2(z,"$isaP").cH(this,this.k1,this.y1)
this.r2=z}else throw H.e(P.b7("No TweenAccessor was found for the target, and it is not Tweenable either."))}if(z>$.a6)this.de()},
hj:function(){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.fy==null)return
z=this.ry
this.eZ(z)
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
v[t]=J.w(s,r)
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
au:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(this.fy==null||this.k2==null)return
z=c!==!0
if(z){if(typeof a!=="number")return a.T()
if(typeof b!=="number")return H.i(b)
y=a>b}else y=!1
if(y){if(this.d===!0){if(typeof b!=="number")return b.M()
z=Math.abs(C.a.M(b,4))===2}else z=!1
this.am(z?this.ry:this.x1)
return}if(z){if(typeof a!=="number")return a.W()
if(typeof b!=="number")return H.i(b)
z=a<b}else z=!1
if(z){if(this.d===!0){if(typeof b!=="number")return b.M()
z=Math.abs(C.a.M(b,4))===2}else z=!1
this.am(z?this.x1:this.ry)
return}z=this.f
if(typeof z!=="number")return z.W()
y=z<1e-11
if(y){if(typeof d!=="number")return d.T()
x=d>-1e-11}else x=!1
if(x){if(this.d===!0){if(typeof a!=="number")return a.M()
z=Math.abs(C.a.M(a,4))===2}else z=!1
this.am(z?this.x1:this.ry)
return}if(y){if(typeof d!=="number")return d.W()
y=d<1e-11}else y=!1
if(y){if(this.d===!0){if(typeof a!=="number")return a.M()
z=Math.abs(C.a.M(a,4))===2}else z=!1
this.am(z?this.ry:this.x1)
return}if(this.d===!0){if(typeof a!=="number")return a.M()
y=Math.abs(C.a.M(a,4))===2}else y=!1
w=this.x
if(y){if(typeof w!=="number")return H.i(w)
w=z-w}y=this.k2
if(typeof w!=="number")return w.aj()
v=y.a.$1(w/z)
if(this.rx===0||this.k3==null){z=this.ry
y=z.length
x=this.x1
u=x.length
t=J.bk(v)
s=0
while(!0){r=this.r2
if(typeof r!=="number")return H.i(r)
if(!(s<r))break
r=this.y1
if(s>=y)return H.a(z,s)
q=z[s]
if(s>=u)return H.a(x,s)
q=J.w(q,t.E(v,J.a8(x[s],q)))
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
o=this.k3.a.$3(v,p,o+2)
if(s>=q.length)return H.a(q,s)
q[s]=o;++s}}this.am(this.y1)},
dE:function(){if(this.fy==null)return
this.am(this.ry)},
dD:function(){if(this.fy==null)return
this.am(this.x1)},
eZ:function(a){var z=this.id
if(z!=null)return z.e2(this.fy,this,this.k1,a)
else{z=this.fy
if(!!J.l(z).$isaP)return H.a2(z,"$isaP").cH(this,this.k1,a)}return 0},
am:function(a){var z=this.id
if(z!=null)z.eg(this.fy,this,this.k1,a)
else{z=this.fy
if(!!J.l(z).$isaP)H.a2(z,"$isaP").ef(this,this.k1,a)}},
de:function(){throw H.e(P.b7("You cannot combine more than "+$.a6+" \r\n                  attributes in a tween. You can raise this limit with \r\n                  Tween.setCombinedAttributesLimit(), which should be called once\r\n                  in application initialization code."))}},l8:{"^":"d:10;",
$1:function(a){a.b_(0)}},l9:{"^":"d:10;",
$1:function(a){J.fQ(a)}},l7:{"^":"d:1;",
$0:function(){var z,y,x,w,v
z=new Array($.a6)
z.fixed$length=Array
z=H.b(z,[P.C])
y=new Array($.a6)
y.fixed$length=Array
y=H.b(y,[P.C])
x=H.b(new Array($.cS*$.a6),[P.C])
w=new Array($.a6)
w.fixed$length=Array
w=H.b(w,[P.C])
v=new Array((2+$.cS)*$.a6)
v.fixed$length=Array
v=new B.bA(null,null,null,null,null,null,null,null,null,null,z,y,x,w,H.b(v,[P.C]),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
v.b_(0)
return v}},jo:{"^":"c;"},eq:{"^":"c;"},jp:{"^":"c;a,b",
t:function(a,b){var z=this.a
if(!C.b.aB(z,b))z.push(b)
if(b.gf6()===!0)b.b6(0)},
a_:function(a){this.b=!0},
at:function(){this.b=!1},
bu:function(a){var z,y
z=this.a
C.b.bl(z,"removeWhere")
C.b.fq(z,new B.jq(),!0)
if(!this.b)if(a>=0)for(y=0;y<z.length;++y)z[y].bu(a)
else for(y=z.length-1;y>=0;--y){if(y>=z.length)return H.a(z,y)
z[y].bu(a)}},
gj:function(a){return this.a.length}},jq:{"^":"d:24;",
$1:function(a){var z
if(a.ghn()&&a.fr===!0){z=$.$get$cQ()
if(!z.a.aB(0,a)){z.b.a.$1(a)
z.a.a3(a)}return!0}return!1}},jr:{"^":"c;"}}],["","",,T,{"^":"",aN:{"^":"c;d3:a<",
gaH:function(){return this.a},
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
i:function(a){return"[0] "+this.b4(0).i(0)+"\n[1] "+this.b4(1).i(0)+"\n[2] "+this.b4(2).i(0)+"\n[3] "+this.b4(3).i(0)+"\n"},
gh2:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
return z[b]},
n:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
z[b]=c},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aN){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gG:function(a){return A.cb(this.a)},
b4:function(a){var z,y,x
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
return new T.ax(z)},
E:function(c8,c9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7
if(typeof c9==="number"){z=new Float32Array(H.m(16))
y=new T.aN(z)
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
return y}z=J.l(c9)
if(!!z.$isax){x=new T.ax(new Float32Array(H.m(4)))
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
return x}if(c9.gh2()===4){z=new Float32Array(H.m(16))
y=new T.aN(z)
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
return y}throw H.e(P.a9(c9))},
B:function(a,b){var z=new T.aN(new Float32Array(H.m(16)))
z.J(this)
z.t(0,b)
return z},
q:function(a,b){var z,y,x
z=new Float32Array(H.m(16))
y=new T.aN(z)
y.J(this)
x=b.gd3()
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
cJ:function(){var z=this.a
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
z=b.gd3()
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
y[15]=y[15]+z[15]}},am:{"^":"c;di:a<",
J:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
i:function(a){var z=this.a
return"["+H.f(z[0])+","+H.f(z[1])+"]"},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.am){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gG:function(a){return A.cb(this.a)},
q:function(a,b){var z,y,x
z=new Float32Array(H.m(2))
y=new T.am(z)
y.J(this)
x=b.gdi()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
return y},
B:function(a,b){var z=new T.am(new Float32Array(H.m(2)))
z.J(this)
z.t(0,b)
return z},
aj:function(a,b){var z=new T.am(new Float32Array(H.m(2)))
z.J(this)
z.a8(0,1/b)
return z},
E:function(a,b){var z=new T.am(new Float32Array(H.m(2)))
z.J(this)
z.a8(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
return z[b]},
n:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(H.a1(y*y+z*z))},
t:function(a,b){var z,y
z=b.gdi()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
a8:function(a,b){var z,y
z=this.a
y=z[1]
if(typeof b!=="number")return H.i(b)
z[1]=y*b
z[0]=z[0]*b},
bo:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])},
sa0:function(a,b){this.a[0]=b
return b},
sa7:function(a){this.a[1]=a
return a},
ga0:function(a){return this.a[0]},
ga7:function(){return this.a[1]},
gu:function(a){return this.a[0]},
gv:function(a){return this.a[1]}},H:{"^":"c;dj:a<",
gaH:function(){return this.a},
ak:function(a,b,c){var z=this.a
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
return"["+H.f(z[0])+","+H.f(z[1])+","+H.f(z[2])+"]"},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.H){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gG:function(a){return A.cb(this.a)},
q:function(a,b){var z,y,x
z=new Float32Array(H.m(3))
y=new T.H(z)
y.J(this)
x=b.gdj()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
return y},
B:function(a,b){var z=new T.H(new Float32Array(H.m(3)))
z.J(this)
z.t(0,b)
return z},
aj:function(a,b){var z=new T.H(new Float32Array(H.m(3)))
z.J(this)
z.a8(0,1/b)
return z},
E:function(a,b){var z=new T.H(new Float32Array(H.m(3)))
z.J(this)
z.a8(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
return z[b]},
n:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.a1(y*y+x*x+z*z))},
cm:function(){var z,y,x,w,v,u
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=Math.sqrt(H.a1(y*y+x*x+w*w))
if(v===0)return 0
u=1/v
z[0]=z[0]*u
z[1]=z[1]*u
z[2]=z[2]*u
return v},
ca:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]+y[2]*z[2]},
dw:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=a.a
u=v[0]
t=v[1]
s=v[2]
z=new T.H(new Float32Array(H.m(3)))
z.ak(x*s-w*t,w*u-y*s,y*t-x*u)
return z},
t:function(a,b){var z,y
z=b.gdj()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]},
a8:function(a,b){var z,y
z=this.a
y=z[2]
if(typeof b!=="number")return H.i(b)
z[2]=y*b
z[1]=z[1]*b
z[0]=z[0]*b},
bo:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])
z[2]=Math.floor(z[2])},
sm:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
sa0:function(a,b){this.a[0]=b
return b},
sa7:function(a){this.a[1]=a
return a},
san:function(a){this.a[2]=a
return a},
gm:function(){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
z=z[2]
w=new T.H(new Float32Array(H.m(3)))
w.ak(y,x,z)
return w},
ga0:function(a){return this.a[0]},
ga7:function(){return this.a[1]},
gan:function(){return this.a[2]},
gu:function(a){return this.a[0]},
gv:function(a){return this.a[1]}},ax:{"^":"c;dk:a<",
gaH:function(){return this.a},
eg:function(a,b,c,d){var z=this.a
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
return H.f(z[0])+","+H.f(z[1])+","+H.f(z[2])+","+H.f(z[3])},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.ax){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gG:function(a){return A.cb(this.a)},
q:function(a,b){var z,y,x
z=new Float32Array(H.m(4))
y=new T.ax(z)
y.J(this)
x=b.gdk()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
return y},
B:function(a,b){var z=new T.ax(new Float32Array(H.m(4)))
z.J(this)
z.t(0,b)
return z},
aj:function(a,b){var z=new T.ax(new Float32Array(H.m(4)))
z.J(this)
z.a8(0,1/b)
return z},
E:function(a,b){var z=new T.ax(new Float32Array(H.m(4)))
z.J(this)
z.a8(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
return z[b]},
n:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.a1(y*y+x*x+w*w+z*z))},
t:function(a,b){var z,y
z=b.gdk()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]},
a8:function(a,b){var z,y
z=this.a
y=z[0]
if(typeof b!=="number")return H.i(b)
z[0]=y*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b},
bo:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])
z[2]=Math.floor(z[2])
z[3]=Math.floor(z[3])},
sm:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
sa0:function(a,b){this.a[0]=b
return b},
sa7:function(a){this.a[1]=a
return a},
san:function(a){this.a[2]=a
return a},
gm:function(){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
z=z[2]
w=new T.H(new Float32Array(H.m(3)))
w.ak(y,x,z)
return w},
ga0:function(a){return this.a[0]},
ga7:function(){return this.a[1]},
gan:function(){return this.a[2]},
gu:function(a){return this.a[0]},
gv:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cz.prototype
return J.ik.prototype}if(typeof a=="string")return J.bv.prototype
if(a==null)return J.dY.prototype
if(typeof a=="boolean")return J.ij.prototype
if(a.constructor==Array)return J.bu.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bw.prototype
return a}if(a instanceof P.c)return a
return J.c9(a)}
J.M=function(a){if(typeof a=="string")return J.bv.prototype
if(a==null)return a
if(a.constructor==Array)return J.bu.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bw.prototype
return a}if(a instanceof P.c)return a
return J.c9(a)}
J.aC=function(a){if(a==null)return a
if(a.constructor==Array)return J.bu.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bw.prototype
return a}if(a instanceof P.c)return a
return J.c9(a)}
J.ld=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cz.prototype
return J.b9.prototype}if(a==null)return a
if(!(a instanceof P.c))return J.bd.prototype
return a}
J.y=function(a){if(typeof a=="number")return J.b9.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bd.prototype
return a}
J.bk=function(a){if(typeof a=="number")return J.b9.prototype
if(typeof a=="string")return J.bv.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bd.prototype
return a}
J.fd=function(a){if(typeof a=="string")return J.bv.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bd.prototype
return a}
J.k=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bw.prototype
return a}if(a instanceof P.c)return a
return J.c9(a)}
J.w=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.bk(a).B(a,b)}
J.cf=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a&b)>>>0
return J.y(a).ai(a,b)}
J.cg=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.y(a).aj(a,b)}
J.E=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).w(a,b)}
J.fp=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.y(a).U(a,b)}
J.bn=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.y(a).T(a,b)}
J.fq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.y(a).cI(a,b)}
J.bI=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.y(a).W(a,b)}
J.F=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.bk(a).E(a,b)}
J.fr=function(a){if(typeof a=="number"&&Math.floor(a)==a)return~a>>>0
return J.ld(a).e4(a)}
J.a8=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.y(a).q(a,b)}
J.aE=function(a,b){return J.y(a).X(a,b)}
J.fs=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a^b)>>>0
return J.y(a).bD(a,b)}
J.o=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.fg(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.M(a).h(a,b)}
J.ft=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.fg(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.aC(a).n(a,b,c)}
J.fu=function(a,b,c,d){return J.k(a).eH(a,b,c,d)}
J.fv=function(a,b,c,d){return J.k(a).fn(a,b,c,d)}
J.dh=function(a){return J.y(a).dl(a)}
J.fw=function(a,b){return J.aC(a).t(a,b)}
J.fx=function(a,b,c){return J.k(a).fG(a,b,c)}
J.fy=function(a,b){return J.aC(a).fM(a,b)}
J.fz=function(a,b,c,d,e){return J.k(a).fN(a,b,c,d,e)}
J.fA=function(a,b){return J.k(a).aP(a,b)}
J.ch=function(a,b,c){return J.M(a).fQ(a,b,c)}
J.fB=function(a){return J.k(a).fU(a)}
J.fC=function(a){return J.k(a).fV(a)}
J.fD=function(a,b){return J.k(a).fW(a,b)}
J.fE=function(a,b){return J.k(a).S(a,b)}
J.fF=function(a,b){return J.aC(a).Z(a,b)}
J.fG=function(a){return J.y(a).bo(a)}
J.bJ=function(a,b){return J.aC(a).D(a,b)}
J.di=function(a){return J.k(a).gfR(a)}
J.aZ=function(a){return J.k(a).gap(a)}
J.fH=function(a){return J.k(a).gdY(a)}
J.X=function(a){return J.l(a).gG(a)}
J.fI=function(a){return J.k(a).gl(a)}
J.K=function(a){return J.k(a).gA(a)}
J.b_=function(a){return J.aC(a).gO(a)}
J.ci=function(a){return J.k(a).ghq(a)}
J.bo=function(a){return J.M(a).gj(a)}
J.fJ=function(a){return J.k(a).gcn(a)}
J.dj=function(a){return J.k(a).gdL(a)}
J.fK=function(a){return J.k(a).gdN(a)}
J.fL=function(a){return J.k(a).ghC(a)}
J.cj=function(a){return J.l(a).gL(a)}
J.dk=function(a){return J.y(a).gej(a)}
J.fM=function(a){return J.k(a).gcA(a)}
J.ck=function(a){return J.k(a).gI(a)}
J.cl=function(a){return J.k(a).gk(a)}
J.fN=function(a){return J.k(a).e_(a)}
J.cm=function(a,b,c){return J.k(a).e1(a,b,c)}
J.fO=function(a,b){return J.aC(a).ar(a,b)}
J.fP=function(a){return J.k(a).a_(a)}
J.aF=function(a){return J.aC(a).a5(a)}
J.fQ=function(a){return J.k(a).b_(a)}
J.b0=function(a,b){return J.k(a).bx(a,b)}
J.fR=function(a,b){return J.k(a).sa0(a,b)}
J.fS=function(a,b){return J.k(a).sI(a,b)}
J.dl=function(a){return J.k(a).bA(a)}
J.fT=function(a,b,c){return J.fd(a).bB(a,b,c)}
J.dm=function(a){return J.y(a).hG(a)}
J.aG=function(a){return J.l(a).i(a)}
J.fU=function(a){return J.fd(a).hH(a)}
J.fV=function(a,b){return J.k(a).hJ(a,b)}
I.da=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.x=W.cs.prototype
C.y=W.h_.prototype
C.i=W.hc.prototype
C.L=W.b8.prototype
C.M=J.h.prototype
C.b=J.bu.prototype
C.a=J.cz.prototype
C.N=J.dY.prototype
C.d=J.b9.prototype
C.o=J.bv.prototype
C.V=J.bw.prototype
C.X=H.iC.prototype
C.Y=H.iE.prototype
C.Z=J.iK.prototype
C.ai=J.bd.prototype
C.f=W.jy.prototype
C.D=new H.dH()
C.E=new P.iJ()
C.F=new P.k2()
C.w=new P.kq()
C.e=new P.kC()
C.z=new P.ac(0)
C.A=H.b(new W.aJ("click"),[W.e3])
C.G=H.b(new W.aJ("error"),[W.eh])
C.q=H.b(new W.aJ("keydown"),[W.e0])
C.H=H.b(new W.aJ("keyup"),[W.e0])
C.I=H.b(new W.aJ("load"),[W.eh])
C.J=H.b(new W.aJ("resize"),[W.T])
C.K=H.b(new W.aJ("webkitfullscreenchange"),[W.T])
C.O=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.B=function(hooks) { return hooks; }
C.P=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.Q=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.R=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.S=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.C=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.T=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.U=function(_, letter) { return letter.toUpperCase(); }
C.W=I.da([])
C.a_=H.t("m0")
C.a0=H.t("m1")
C.r=H.t("b3")
C.p=H.t("b4")
C.t=H.t("eH")
C.a1=H.t("mw")
C.a2=H.t("mx")
C.j=H.t("bO")
C.a3=H.t("mK")
C.a4=H.t("mL")
C.a5=H.t("mM")
C.a6=H.t("dZ")
C.a7=H.t("cG")
C.k=H.t("as")
C.a8=H.t("cI")
C.c=H.t("v")
C.u=H.t("ek")
C.l=H.t("av")
C.a9=H.t("Q")
C.h=H.t("cO")
C.v=H.t("bb")
C.aa=H.t("ny")
C.ab=H.t("nz")
C.ac=H.t("nA")
C.ad=H.t("nB")
C.m=H.t("ay")
C.n=H.t("az")
C.ae=H.t("bF")
C.af=H.t("Z")
C.ag=H.t("p")
C.ah=H.t("C")
$.ee="$cachedFunction"
$.ef="$cachedInvocation"
$.ab=0
$.b2=null
$.dp=null
$.d6=null
$.f5=null
$.fl=null
$.c7=null
$.cc=null
$.d7=null
$.aT=null
$.bg=null
$.bh=null
$.d3=!1
$.n=C.e
$.dM=0
$.dv=1
$.dw=0
$.dK=0
$.eW=0
$.d1=null
$.dD=null
$.dC=null
$.dB=null
$.dA=null
$.ag=null
$.c8=null
$.a6=3
$.cS=0
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
I.$lazy(y,x,w)}})(["dz","$get$dz",function(){return init.getIsolateTag("_$dart_dartClosure")},"dU","$get$dU",function(){return H.ig()},"dV","$get$dV",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.dM
$.dM=z+1
z="expando$key$"+z}return H.b(new P.ht(null,z),[P.p])},"eu","$get$eu",function(){return H.ae(H.c2({
toString:function(){return"$receiver$"}}))},"ev","$get$ev",function(){return H.ae(H.c2({$method$:null,
toString:function(){return"$receiver$"}}))},"ew","$get$ew",function(){return H.ae(H.c2(null))},"ex","$get$ex",function(){return H.ae(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"eB","$get$eB",function(){return H.ae(H.c2(void 0))},"eC","$get$eC",function(){return H.ae(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ez","$get$ez",function(){return H.ae(H.eA(null))},"ey","$get$ey",function(){return H.ae(function(){try{null.$method$}catch(z){return z.message}}())},"eE","$get$eE",function(){return H.ae(H.eA(void 0))},"eD","$get$eD",function(){return H.ae(function(){try{(void 0).$method$}catch(z){return z.message}}())},"co","$get$co",function(){return H.iD([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8])},"cV","$get$cV",function(){return P.jQ()},"bj","$get$bj",function(){return[]},"dy","$get$dy",function(){return{}},"ct","$get$ct",function(){return H.cB(P.bc,S.du)},"bW","$get$bW",function(){return H.cB(P.bc,[S.Y,S.eb])},"dc","$get$dc",function(){return P.iT(null)},"dg","$get$dg",function(){return new B.jp(H.b([],[B.bL]),!1)},"dS","$get$dS",function(){return[F.lC(),F.lD(),F.lE()]},"bP","$get$bP",function(){return[F.lF(),F.lG(),F.lH()]},"dJ","$get$dJ",function(){var z=new B.hl(0,0,!1,!1,null,null)
z.b="Elastic.OUT"
z.a=B.lS()
return z},"ei","$get$ei",function(){var z=new B.iR(null,null)
z.b="Quad.INOUT"
z.a=B.lT()
return z},"et","$get$et",function(){var z=H.b(new B.iN(null,null),[B.bA])
z.a=new B.l8()
z.b=new B.l9()
return z},"cQ","$get$cQ",function(){var z,y,x
z=$.$get$et()
y=B.bA
x=H.b(new B.iM(null,z,null),[y])
x.eC(z,y)
x.c=new B.l7()
return x},"cR","$get$cR",function(){return H.cB(P.bc,B.jo)},"er","$get$er",function(){return $.$get$ei()},"es","$get$es",function(){var z=new B.h2(null)
z.ey()
return z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,args:[,,]},{func:1,ret:P.Z,args:[P.Z]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:F.bs},{func:1,args:[,P.ak]},{func:1,v:true,args:[P.c],opt:[P.ak]},{func:1,ret:P.Q,args:[P.p]},{func:1,args:[B.bA]},{func:1,ret:P.C,args:[P.C]},{func:1,v:true,args:[,,]},{func:1,args:[P.c]},{func:1,v:true,args:[,],opt:[P.ak]},{func:1,args:[P.Q]},{func:1,v:true,args:[,P.ak]},{func:1,args:[{func:1,v:true}]},{func:1,args:[W.b8]},{func:1,v:true,args:[P.Z]},{func:1,args:[,],opt:[,]},{func:1,args:[P.Q,,]},{func:1,args:[W.cx]},{func:1,ret:P.C,args:[P.C,[P.j,P.C],P.p]},{func:1,args:[B.bL]},{func:1,ret:[P.a0,P.cG]},{func:1,v:true,args:[,]},{func:1,ret:F.v},{func:1,ret:F.ay},{func:1,ret:F.av},{func:1,ret:F.bb},{func:1,ret:F.as},{func:1,ret:F.b3},{func:1,ret:F.az},{func:1,ret:F.b4},{func:1,args:[,P.Q]},{func:1,args:[P.p,,]},{func:1,v:true,args:[W.T]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.lR(d||a)
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
Isolate.da=a.da
Isolate.ao=a.ao
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.fn(A.fj(),b)},[])
else (function(b){H.fn(A.fj(),b)})([])})})()