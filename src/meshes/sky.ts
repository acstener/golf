import * as THREE from "three";

// Create a sky for the golf course using a simpler approach
const createSky = () => {
  // Create a group to hold sky elements
  const skyGroup = new THREE.Group();
  
  // Method 1: Sky dome with gradient shader
  // Create a large sphere for the sky dome
  const skyDomeGeometry = new THREE.SphereGeometry(800, 32, 32);
  
  // Create a gradient material for the sky
  const skyDomeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(0x0077ff) },  // Bright blue sky
      bottomColor: { value: new THREE.Color(0x87ceeb) },  // Light blue at horizon
      offset: { value: 10 },
      exponent: { value: 0.4 }  // Less steep gradient
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + offset).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false  // Ensure the sky renders behind everything
  });
  
  // Create the sky dome mesh
  const skyDome = new THREE.Mesh(skyDomeGeometry, skyDomeMaterial);
  skyGroup.add(skyDome);
  
  // Method 2: Add a simple sky plane as backup
  // This ensures we have a sky even if the shader doesn't work
  const skyPlaneGeometry = new THREE.PlaneGeometry(2000, 2000);
  const skyPlaneMaterial = new THREE.MeshBasicMaterial({
    color: 0x87CEEB,  // Sky blue
    side: THREE.BackSide,
    depthWrite: false
  });
  
  const skyPlaneTop = new THREE.Mesh(skyPlaneGeometry, skyPlaneMaterial);
  skyPlaneTop.position.y = 400;
  skyPlaneTop.rotation.x = Math.PI / 2;
  skyGroup.add(skyPlaneTop);
  
  // Add sky planes on all sides for a complete enclosure
  const skyPlaneNorth = new THREE.Mesh(skyPlaneGeometry, skyPlaneMaterial);
  skyPlaneNorth.position.z = -1000;
  skyGroup.add(skyPlaneNorth);
  
  const skyPlaneSouth = new THREE.Mesh(skyPlaneGeometry, skyPlaneMaterial);
  skyPlaneSouth.position.z = 1000;
  skyPlaneSouth.rotation.y = Math.PI;
  skyGroup.add(skyPlaneSouth);
  
  const skyPlaneEast = new THREE.Mesh(skyPlaneGeometry, skyPlaneMaterial);
  skyPlaneEast.position.x = 1000;
  skyPlaneEast.rotation.y = -Math.PI / 2;
  skyGroup.add(skyPlaneEast);
  
  const skyPlaneWest = new THREE.Mesh(skyPlaneGeometry, skyPlaneMaterial);
  skyPlaneWest.position.x = -1000;
  skyPlaneWest.rotation.y = Math.PI / 2;
  skyGroup.add(skyPlaneWest);
  
  return skyGroup;
};

const sky = createSky();

export default sky;
