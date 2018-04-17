#version 300 es

precision mediump float;

uniform vec3 uLightColor;
uniform float uTime;
uniform float uBeatMod;
in vec3 vPos;
in vec3 vNormal;
in vec3 vLightDirection;
out vec4 fragColor;
const float PI = 3.14159;

float r = 0.0;
float g = 0.0;
float b = 0.0;

float rotatingLine(float startingAngle, float rotationStrength) {
    return max(sin(PI/2.0 + startingAngle + atan(vPos.y, vPos.x) + vPos.z * -rotationStrength), 0.0);
}

float eyesOnWall(float blinkFreq) {
    if (vPos.y > -55.0 && vPos.y < 55.0) {
        return max(0.0, cos((sin(uTime * blinkFreq) * 13.0 + 10.0 * vPos.x) / 10.0 + sin(vPos.z / 50.0)));
    }
    return 0.0;
}

float pulse(float minVal, float maxVal, float freq) {
    float range = maxVal - minVal;
    return minVal + range * (1.0 + cos(sin(uTime * freq) + uTime * freq)) / 2.0;
}


void addRed(float toAdd) {
    r = r + toAdd;
}
void addGreen(float toAdd) {
    g = g + toAdd;
}
void addBlue(float toAdd) {
    b = b + toAdd;
}

void main() {
    float timeFactor = uTime - floor(vPos.z / 10000.0);
    float xy = abs(vPos.x) + abs(vPos.y);
    xy = xy * uBeatMod;
    timeFactor = timeFactor * uBeatMod;

    if (vPos.y > -55.0 && vPos.y < 55.0) {
        float blinkFreq = floor(vPos.z / 10000.0) * 2.0;
        addRed(eyesOnWall(blinkFreq));
    }
    if (vPos.z > 5000.0) {
        addGreen(rotatingLine(PI * 0.5, 0.01));
        addBlue(rotatingLine(PI * 0.5, -0.01));
    }
    if (vPos.z > 10000.0) {
        addRed(cos((10.0 * vPos.x) / 10.0 + sin(vPos.z / 10.0)));
    }
    if (vPos.z > 20000.0) {
        addBlue(cos((10.0 * vPos.x) / 10.0 + sin(vPos.z / 10.0)));
    }
    if (vPos.z > 25000.0) {
        addBlue(sin(vPos.z / 103.0 + xy / 103.0 * vPos.z / 100000.0));
    }
    if (vPos.z > 30000.0) {
        addRed(cos((10.0 * timeFactor + vPos.x) / 13.0));
    }
    if (vPos.z > 35000.0) {
        addGreen(sin((10.0 * timeFactor + vPos.y) / 7.0));
    }
    if (vPos.z > 40000.0) {
        addBlue(cos((10.0 * timeFactor + vPos.y) / 7.0));
    }
    if (vPos.z > 45000.0) {
        addRed(sin((100.0 * timeFactor + vPos.z) / 11.0));
    }
    if (vPos.z > 50000.0) {
        addGreen(cos(sin(vPos.z / 7.0)));
    }
    if (vPos.z > 55000.0) {
        addBlue(sin((50.0 * timeFactor + vPos.z) / 11.0));
    }
    if (vPos.z > 60000.0) {
        addGreen(sin(vPos.z / 101.0 + xy / 101.0 * vPos.z / 100000.0));
    }
    if (vPos.z > 70000.0) {
        addRed(sin(vPos.z / 99.0 + xy / 99.0 * vPos.z / 100000.0));
    }

    vec3 normal = normalize(vNormal);
    vec3 lightDirection = normalize(vLightDirection);
    float vNormalDotLight = max(dot(lightDirection, normal), 0.0);
    vec3 diffuse = uLightColor * vec3(r, g, b) * 0.7 * vNormalDotLight * 1.5;

    fragColor = vec4(diffuse, 1.0);
}
