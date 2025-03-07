import * as THREE from "three";
import { cobbleDiffTexture, earthTexture, golfGrassTexture, woodTexture } from "./textures";
const cubeMaterial = new THREE.MeshStandardMaterial({
  map: woodTexture,
});

cubeMaterial.side = THREE.DoubleSide;

// Create a procedural texture for the rough
const roughTextureSize = 512;
const roughTextureCanvas = document.createElement('canvas');
roughTextureCanvas.width = roughTextureSize;
roughTextureCanvas.height = roughTextureSize;
const roughContext = roughTextureCanvas.getContext('2d');

if (roughContext) {
  // Fill with base color
  roughContext.fillStyle = '#1e6b24';
  roughContext.fillRect(0, 0, roughTextureSize, roughTextureSize);
  
  // Add texture details
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * roughTextureSize;
    const y = Math.random() * roughTextureSize;
    const size = Math.random() * 3 + 1;
    const color = Math.random() > 0.5 ? '#143d15' : '#2a8c31';
    
    roughContext.fillStyle = color;
    roughContext.fillRect(x, y, size, size);
  }
}

const roughTexture = new THREE.CanvasTexture(roughTextureCanvas);
roughTexture.wrapS = THREE.RepeatWrapping;
roughTexture.wrapT = THREE.RepeatWrapping;
roughTexture.repeat.set(8, 8);

// Create a procedural texture for the fairway
const fairwayTextureSize = 512;
const fairwayTextureCanvas = document.createElement('canvas');
fairwayTextureCanvas.width = fairwayTextureSize;
fairwayTextureCanvas.height = fairwayTextureSize;
const fairwayContext = fairwayTextureCanvas.getContext('2d');

if (fairwayContext) {
  // Fill with base color
  fairwayContext.fillStyle = '#4caf50';
  fairwayContext.fillRect(0, 0, fairwayTextureSize, fairwayTextureSize);
  
  // Add mower lines
  for (let i = 0; i < fairwayTextureSize; i += 16) {
    fairwayContext.fillStyle = i % 32 === 0 ? '#3d9140' : '#5bc75f';
    fairwayContext.fillRect(0, i, fairwayTextureSize, 8);
  }
  
  // Add some noise
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * fairwayTextureSize;
    const y = Math.random() * fairwayTextureSize;
    const size = Math.random() * 2 + 0.5;
    const color = Math.random() > 0.5 ? '#3d9140' : '#5bc75f';
    
    fairwayContext.fillStyle = color;
    fairwayContext.fillRect(x, y, size, size);
  }
}

const fairwayTexture = new THREE.CanvasTexture(fairwayTextureCanvas);
fairwayTexture.wrapS = THREE.RepeatWrapping;
fairwayTexture.wrapT = THREE.RepeatWrapping;
fairwayTexture.repeat.set(4, 4);

// Create a procedural texture for the sand
const sandTextureSize = 512;
const sandTextureCanvas = document.createElement('canvas');
sandTextureCanvas.width = sandTextureSize;
sandTextureCanvas.height = sandTextureSize;
const sandContext = sandTextureCanvas.getContext('2d');

if (sandContext) {
  // Fill with base color
  sandContext.fillStyle = '#f5e6c8';
  sandContext.fillRect(0, 0, sandTextureSize, sandTextureSize);
  
  // Add texture details
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * sandTextureSize;
    const y = Math.random() * sandTextureSize;
    const size = Math.random() * 2 + 0.5;
    const color = Math.random() > 0.5 ? '#e6d7b9' : '#fff8e1';
    
    sandContext.fillStyle = color;
    sandContext.fillRect(x, y, size, size);
  }
}

const sandTexture = new THREE.CanvasTexture(sandTextureCanvas);
sandTexture.wrapS = THREE.RepeatWrapping;
sandTexture.wrapT = THREE.RepeatWrapping;
sandTexture.repeat.set(4, 4);

// Create a golf course rough material (darker green)
const golfCourseMaterial = new THREE.MeshStandardMaterial({
  map: roughTexture,
  roughness: 0.8,
  metalness: 0.1,
  color: 0x1e6b24, // Darker green for rough
  bumpMap: roughTexture,
  bumpScale: 0.05,
});

golfCourseMaterial.side = THREE.DoubleSide;

// Create a fairway material (lighter green, smoother)
const fairwayMaterial = new THREE.MeshStandardMaterial({
  map: fairwayTexture,
  roughness: 0.5,
  metalness: 0.2,
  color: 0x4caf50, // Lighter green for fairway
  bumpMap: fairwayTexture,
  bumpScale: 0.02,
});

fairwayMaterial.side = THREE.DoubleSide;

// Create a bunker/sand trap material
const bunkerMaterial = new THREE.MeshStandardMaterial({
  map: sandTexture,
  color: 0xf5e6c8, // Sandy color
  roughness: 1.0,
  metalness: 0.0,
  bumpMap: sandTexture,
  bumpScale: 0.05,
});

bunkerMaterial.side = THREE.DoubleSide;

// Create a water/lake material with more realistic properties
const waterMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x0288d1, // Blue color
  roughness: 0.0,
  metalness: 0.0,
  transmission: 0.9, // Makes it transparent but with refraction
  reflectivity: 1.0,
  ior: 1.33, // Water's index of refraction
  clearcoat: 1.0, // Add a clear coat for more realistic water surface
  clearcoatRoughness: 0.1,
});

waterMaterial.side = THREE.DoubleSide;

// Keep the original floor material for reference
const floorMaterial = new THREE.MeshStandardMaterial({
  map: cobbleDiffTexture,
  displacementMap: cobbleDiffTexture,
  displacementScale: 1.2,
});

floorMaterial.side = THREE.DoubleSide;

if (floorMaterial.map) {
  floorMaterial.map.repeat.set(8, 8);
  floorMaterial.map.wrapS = THREE.RepeatWrapping;
  floorMaterial.map.wrapT = THREE.RepeatWrapping;
}

const normalMaterial = new THREE.MeshNormalMaterial();

const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});

export { 
  cubeMaterial, 
  floorMaterial, 
  golfCourseMaterial, 
  fairwayMaterial, 
  bunkerMaterial, 
  waterMaterial, 
  normalMaterial, 
  earthMaterial 
};
