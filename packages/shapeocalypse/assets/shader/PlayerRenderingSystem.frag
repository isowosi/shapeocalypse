precision mediump float;

uniform vec3 uColor;
varying float vColorMultiplier;

void main() {
	gl_FragColor = vec4(uColor, 0.75) * vColorMultiplier;
}
