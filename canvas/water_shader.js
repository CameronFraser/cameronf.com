const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

const settings = {
  context: 'webgl',
  animate: true
};

const frag = glsl(/* glsl */`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  #pragma glslify: noise = require('glsl-noise/simplex/3d');

  void main () {
    vec2 center = vUv - 0.5;
    center.x *= aspect;
    float dist = length(center);

    float alpha = smoothstep(0.255, 0.25, dist);
    vec3 colorA = vec3(0.0, 0.2, 0.7);
    vec3 colorB = vec3(0.3, 0.7, 0.8);
    float frequency = 4.0;
    float n = noise(vec3(vUv.xy * frequency, time));
    vec3 color = mix(colorA, colorB, n);
    gl_FragColor = vec4(color, alpha);
  }
`);

const sketch = ({ gl }) => {
  return createShader({
    clearColor: 'white',
    gl,
    frag,
    uniforms: {
      time: ({ time }) => time,
      aspect: ({ width, height }) => width / height
    }
  });
};

canvasSketch(sketch, settings);
