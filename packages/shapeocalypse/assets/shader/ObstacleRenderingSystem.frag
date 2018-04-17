#version 300 es

precision mediump float;
uniform vec3 uLightColor;
in vec4 vColor;
in vec3 vLightDirection;
out vec4 fragColor;

void main() {
    vec3 normal = vec3(0.0, 0.0, 1.0);
    vec3 lightDirection = normalize(vLightDirection);
    float vNormalDotLight = max(dot(lightDirection, normal), 0.0);
    vec3 diffuse = uLightColor * vec3(vColor) * vNormalDotLight + vec3(0.2, 0.2, 0.2);
    diffuse = diffuse * 1.5;
    fragColor = vec4(diffuse, vColor.w);
}
