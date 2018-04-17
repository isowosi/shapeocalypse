#version 300 es

precision mediump float;
in vec3 vColor;
out vec4 fragColor;
const vec2 center = vec2(0.5, 0.5);

void main() {
  float dist = distance(gl_PointCoord, center);
  if (dist > 0.35) {
    discard;
  }
  fragColor = vec4(vColor * 3.0 * (0.5 - dist), 2.0 * (0.5 - dist));
}