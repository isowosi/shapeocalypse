#version 300 es

uniform mat4 uViewProjection;
in vec4 aPosition;
in vec3 aColor;
out vec3 vColor;

void main() {
	gl_Position = uViewProjection * aPosition;
	gl_PointSize = 15.0;
	vColor = aColor;
}
