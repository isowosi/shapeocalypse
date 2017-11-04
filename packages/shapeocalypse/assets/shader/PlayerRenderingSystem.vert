uniform mat4 uViewProjection;
attribute vec3 aPos;
attribute float aColorMultiplier;
varying float vColorMultiplier;

void main() {
	gl_Position = uViewProjection * vec4(aPos, 1.0);
	vColorMultiplier = aColorMultiplier;
}
