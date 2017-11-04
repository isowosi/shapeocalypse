precision mediump float;
uniform vec3 uLightColor;
varying vec4 vColor;
varying vec3 vLightDirection;

void main() {
    vec3 normal = vec3(0.0, 0.0, 1.0);
    vec3 lightDirection = normalize(vLightDirection);
    float vNormalDotLight = max(dot(lightDirection, normal), 0.0);
    vec3 diffuse = uLightColor * vec3(vColor) * vNormalDotLight + vec3(0.2, 0.2, 0.2);
    diffuse = diffuse * 1.5;
    gl_FragColor = vec4(diffuse, vColor.w);
}
