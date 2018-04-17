#version 300 es

uniform mat4 uViewProjection;
uniform mat4 uRotation;
in vec3 aPos;
in vec3 aNormal;
in vec3 aLightDirection;
out vec3 vPos;
out vec3 vNormal;
out vec3 vLightDirection;

void main() {
	gl_Position = uViewProjection * uRotation * vec4(aPos, 1.0);
	vNormal = aNormal;
	vLightDirection = aLightDirection * 5.0;
	vPos = aPos;
}
