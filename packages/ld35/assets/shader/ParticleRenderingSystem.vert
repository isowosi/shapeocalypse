uniform mat4 uViewProjection;
attribute vec4 aPosition;
attribute vec3 aColor;
varying vec3 vColor;

void main() {
	gl_Position = uViewProjection * aPosition;
	gl_PointSize = 15.0;
	vColor = aColor;
}
