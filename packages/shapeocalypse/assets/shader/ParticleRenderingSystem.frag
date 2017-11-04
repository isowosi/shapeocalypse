precision mediump float;
varying vec3 vColor;
const vec2 center = vec2(0.5, 0.5);

void main() {
  float dist = distance(gl_PointCoord, center);
  if (dist > 0.35) {
    discard;
  }
  gl_FragColor = vec4(vColor * 3.0 * (0.5 - dist), 2.0 * (0.5 - dist));
}