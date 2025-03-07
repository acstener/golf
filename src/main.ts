import { createDoubleClickListener } from "./utils/fullscreen";
import scene from "./scene";
import canvas from "./canvas";
import cube from "./meshes/cube";
import { ambientLight, directionalLight, hemisphereLight } from "./lights";
import { tick } from "./timer";
import sphere from "./meshes/sphere";
import torus from "./meshes/torus";
import floor from "./meshes/floor";
import golfHole from "./meshes/golfHole";
import axesHelper from "./helpers/axesHelper";
import {
  directionalLightHelper,
  hemisphereLightHelper,
} from "./helpers/lightHelpers";
import { directionalLightShadowCameraHelper } from "./helpers/shadowCameraHelpers";
import camera from "./camera";
import * as THREE from "three";
import renderer from "./renderer";

// Import the sky and trees
import sky from "./meshes/sky";
import trees from "./meshes/trees";

function main() {
  // Enable shadows in the renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
  
  // Add fog to the scene for depth
  scene.fog = new THREE.FogExp2(0xadd8e6, 0.0025);
  
  // Add the sky to the scene
  scene.add(sky);
  
  // Meshes - add the floor, golf hole, and trees
  scene.add(floor);
  scene.add(golfHole); // Add the golf hole to the scene
  scene.add(trees); // Add trees around the course

  // Improve lighting for a more realistic scene
  // Adjust ambient light for better global illumination
  ambientLight.intensity = 0.5;
  scene.add(ambientLight);
  
  // Adjust hemisphere light to simulate sky and ground reflection
  hemisphereLight.intensity = 0.8;
  hemisphereLight.color.set(0x87ceeb); // Sky color (light blue)
  hemisphereLight.groundColor.set(0x4caf50); // Ground color (green)
  scene.add(hemisphereLight);
  
  // Adjust directional light to simulate sun
  directionalLight.intensity = 1.5;
  directionalLight.position.set(50, 50, 10); // Position like afternoon sun
  directionalLight.color.set(0xfffaf0); // Warm sunlight color
  
  // Improve shadows
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 200;
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  directionalLight.shadow.bias = -0.0005;
  scene.add(directionalLight);
  
  // Add a subtle directional light from the opposite direction to fill shadows
  const fillLight = new THREE.DirectionalLight(0x8fbcd4, 0.5); // Subtle blue fill light
  fillLight.position.set(-50, 30, -20);
  scene.add(fillLight);

  // Position camera as if from a tee box facing the golf hole
  camera.position.set(-45, 3, 0); // Position far behind the tee box, elevated for a better view
  camera.lookAt(40, 0, 0); // Look directly at the golf hole at the end of the fairway

  // EventListeners
  createDoubleClickListener(canvas);

  tick();
}

main();
