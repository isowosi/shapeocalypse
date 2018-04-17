#version 300 es

uniform mat4 uViewProjection;
in vec3 aPos;
in float aColorMultiplier;
out float vColorMultiplier;

void main() {
	gl_Position = uViewProjection * vec4(aPos, 1.0);
	vColorMultiplier = aColorMultiplier;
}
