import * as THREE from "three";
import { golfCourseMaterial, fairwayMaterial, bunkerMaterial, waterMaterial } from "../shared/materials";

// Create a golf course with fairway, bunkers, and a lake
const createGolfCourse = () => {
  // Create a group to hold all parts of the golf course
  const courseGroup = new THREE.Group();
  
  // Create the base rough (main ground)
  const roughGeometry = new THREE.PlaneGeometry(100, 100, 64, 64);
  const rough = new THREE.Mesh(roughGeometry, golfCourseMaterial);
  rough.rotation.x = Math.PI / 2;
  rough.position.y = -2;
  rough.receiveShadow = true;
  
  // Add undulation to the entire course
  const roughPositionAttribute = rough.geometry.getAttribute('position');
  const vertex = new THREE.Vector3();
  
  for (let i = 0; i < roughPositionAttribute.count; i++) {
    vertex.fromBufferAttribute(roughPositionAttribute, i);
    
    // Don't modify vertices at the very edge to avoid visible seams
    if (Math.abs(vertex.x) < 48 && Math.abs(vertex.z) < 48) {
      // Add some gentle hills and dips
      vertex.y += Math.sin(vertex.x * 0.05) * 0.3;
      vertex.y += Math.cos(vertex.z * 0.05) * 0.3;
      
      // Add more pronounced hills in certain areas
      if (vertex.x > 15 && vertex.x < 25 && vertex.z > -10 && vertex.z < 10) {
        vertex.y += Math.sin(vertex.x * 0.2) * 0.4;
      }
    }
    
    roughPositionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }
  
  rough.geometry.computeVertexNormals();
  courseGroup.add(rough);
  
  // Create the fairway (a path from tee to green)
  const fairwayShape = new THREE.Shape();
  fairwayShape.moveTo(-40, -5);  // Start near the tee box
  fairwayShape.quadraticCurveTo(-20, 0, 0, 0);  // Curve to the middle
  fairwayShape.quadraticCurveTo(20, 0, 40, 5);  // Curve to the green
  fairwayShape.lineTo(40, -5);  // Width at the green
  fairwayShape.quadraticCurveTo(20, -10, 0, -10);  // Curve back
  fairwayShape.quadraticCurveTo(-20, -10, -40, -5);  // Curve to start
  
  const fairwayGeometry = new THREE.ShapeGeometry(fairwayShape, 32);
  const fairway = new THREE.Mesh(fairwayGeometry, fairwayMaterial);
  fairway.rotation.x = Math.PI / 2;
  fairway.position.y = -1.95;  // Slightly above the rough
  fairway.receiveShadow = true;
  courseGroup.add(fairway);
  
  // Create bunkers (sand traps) with proper depth to avoid z-fighting
  const createBunker = (x, z, radius) => {
    // Create a slightly depressed area for the bunker
    const bunkerRimGeometry = new THREE.RingGeometry(radius - 0.2, radius + 0.3, 32);
    const bunkerRim = new THREE.Mesh(bunkerRimGeometry, golfCourseMaterial.clone());
    bunkerRim.rotation.x = Math.PI / 2;
    bunkerRim.position.set(x, -1.90, z);
    bunkerRim.receiveShadow = true;
    
    // Create the actual sand part
    const bunkerGeometry = new THREE.CircleGeometry(radius, 32);
    const bunker = new THREE.Mesh(bunkerGeometry, bunkerMaterial);
    bunker.rotation.x = Math.PI / 2;
    bunker.position.set(x, -1.93, z);  // Raised position to make bunkers more visible
    bunker.receiveShadow = true;
    
    // Create a group for the bunker parts
    const bunkerGroup = new THREE.Group();
    bunkerGroup.add(bunkerRim);
    bunkerGroup.add(bunker);
    
    return bunkerGroup;
  };
  
  // Add bunkers around the green
  courseGroup.add(createBunker(35, 8, 4));  // Right bunker
  courseGroup.add(createBunker(30, -8, 3));  // Left bunker
  
  // Add a bunker in the middle of the fairway
  courseGroup.add(createBunker(10, 0, 5));
  
  // Create a lake/water hazard
  const lakeShape = new THREE.Shape();
  lakeShape.ellipse(0, 0, 10, 6, 0, Math.PI * 2, false);
  
  const lakeGeometry = new THREE.ShapeGeometry(lakeShape, 32);
  const lake = new THREE.Mesh(lakeGeometry, waterMaterial);
  lake.rotation.x = Math.PI / 2;
  lake.position.set(-15, -1.8, 15);  // Position to the side of the fairway
  courseGroup.add(lake);
  
  return courseGroup;
};

const floor = createGolfCourse();

export default floor;
