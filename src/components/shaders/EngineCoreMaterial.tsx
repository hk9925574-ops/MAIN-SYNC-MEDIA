"use client";

import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const EngineCoreMaterial = shaderMaterial(
  {
    uTime: 0,
    uAudioData: 0.0, // New uniform for audio reactivity
    uColor1: new THREE.Color('#00E5FF'), // Electric cyan
    uColor2: new THREE.Color('#A855F7'), // Neon violet
    uColor3: new THREE.Color('#1D4ED8'), // Royal blue
    uColor4: new THREE.Color('#EC4899'), // Magenta
    uColor5: new THREE.Color('#10B981'), // Emerald
    uDetailLevel: 1.0, // For performance scaling
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    uniform float uTime;
    uniform float uAudioData;
    uniform float uDetailLevel;

    // 3-octave fbm noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    float fbm(vec3 x) {
      float v = 0.0;
      float a = 0.5;
      vec3 shift = vec3(100.0);
      for (int i = 0; i < 3; ++i) { // 3 octaves as mandated
        if (float(i) >= uDetailLevel * 3.0) break; // Performance scaling
        v += a * snoise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      float noise = fbm(position * 2.0 + uTime * 0.2);
      
      // Audio Reactivity: Multiply the noise displacement by the audio intensity
      // It will spike violently during transitions
      float displacement = noise * (0.08 + (uAudioData * 0.5));
      vec3 newPosition = position + normal * displacement;
      
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    
    uniform float uTime;
    uniform float uAudioData;
    uniform vec3 uColor1; // Cyan
    uniform vec3 uColor2; // Violet
    uniform vec3 uColor3; // Blue
    uniform vec3 uColor4; // Magenta
    uniform vec3 uColor5; // Emerald

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Fresnel-rim energy shell
      float fresnel = dot(viewDir, normal);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 3.0);
      
      // Emissive pulse driven by time, position, and AUDIO DATA
      float pulse = (sin(uTime * 2.0 + vPosition.y * 5.0) + 1.0) * 0.5;
      pulse += uAudioData * 2.0; // Audio causes massive brightening
      
      // Color mixing based on height and noise
      vec3 colorMix = mix(uColor1, uColor2, vUv.y);
      colorMix = mix(colorMix, uColor3, fresnel);
      
      // Edge bleeding
      vec3 edgeColor = mix(uColor4, uColor5, pulse);
      vec3 finalColor = mix(colorMix, edgeColor, fresnel * 0.8);
      
      gl_FragColor = vec4(finalColor + (finalColor * pulse * 0.5), 1.0);
    }
  `
);

extend({ EngineCoreMaterial });

export { EngineCoreMaterial };
