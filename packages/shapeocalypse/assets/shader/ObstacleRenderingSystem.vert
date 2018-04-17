#version 300 es

uniform mat4 uViewProjection;
in vec3 aPos;
in vec4 aColor;
in vec3 aLightDirection;
out vec4 vColor;
out vec3 vLightDirection;

void main() {
	gl_Position = uViewProjection * vec4(aPos, 1.0);
	vColor = aColor;
	vLightDirection = aLightDirection * vec3(10.0, 10.0, 1.0);
}
