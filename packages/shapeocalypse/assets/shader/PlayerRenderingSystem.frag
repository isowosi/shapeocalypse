#version 300 es

precision mediump float;

uniform vec3 uColor;
in float vColorMultiplier;
out vec4 fragColor;

void main() {
	fragColor = vec4(uColor, 0.75) * vColorMultiplier;
}
