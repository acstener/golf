import * as THREE from "three";

// Create trees for the golf course
const createTrees = () => {
  const treeGroup = new THREE.Group();
  
  // Create a simple tree model
  const createTree = (x: number, z: number, height: number, trunkColor: number, foliageColor: number) => {
    const tree = new THREE.Group();
    
    // Create trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, height * 0.4, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ 
      color: trunkColor,
      roughness: 0.9,
      metalness: 0.1,
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = height * 0.2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);
    
    // Create foliage (multiple layers for more realistic look)
    const createFoliageLayer = (y: number, radius: number) => {
      const foliageGeometry = new THREE.ConeGeometry(radius, height * 0.6, 8);
      const foliageMaterial = new THREE.MeshStandardMaterial({ 
        color: foliageColor,
        roughness: 0.8,
        metalness: 0.1,
      });
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.y = y;
      foliage.castShadow = true;
      foliage.receiveShadow = true;
      tree.add(foliage);
    };
    
    // Add multiple layers of foliage
    createFoliageLayer(height * 0.5, height * 0.3);
    createFoliageLayer(height * 0.7, height * 0.2);
    
    // Position the tree
    tree.position.set(x, -2, z);
    
    // Add some random rotation for variety
    tree.rotation.y = Math.random() * Math.PI * 2;
    
    return tree;
  };
  
  // Add pine trees (dark green, tall)
  const addPineTrees = () => {
    const positions = [
      // Trees along the left side of the course
      { x: -35, z: -15, height: 5 },
      { x: -25, z: -18, height: 6 },
      { x: -15, z: -20, height: 5.5 },
      { x: -5, z: -22, height: 6.5 },
      { x: 5, z: -20, height: 5 },
      { x: 15, z: -18, height: 6 },
      { x: 25, z: -16, height: 5.5 },
      { x: 35, z: -15, height: 6 },
      
      // Trees along the right side of the course
      { x: -30, z: 25, height: 6 },
      { x: -20, z: 28, height: 5 },
      { x: -10, z: 30, height: 6.5 },
      { x: 0, z: 28, height: 5.5 },
      { x: 10, z: 26, height: 6 },
      { x: 20, z: 24, height: 5 },
      { x: 30, z: 22, height: 6.5 },
      
      // Scattered trees in the background
      { x: -40, z: -25, height: 7 },
      { x: -38, z: -30, height: 6 },
      { x: -45, z: -20, height: 7.5 },
      { x: -42, z: -15, height: 6.5 },
      { x: -48, z: -10, height: 7 },
      
      // Scattered trees on the right background
      { x: -35, z: 35, height: 7 },
      { x: -40, z: 30, height: 6.5 },
      { x: -45, z: 25, height: 7.5 },
      { x: -38, z: 20, height: 6 },
    ];
    
    positions.forEach(pos => {
      // Pine trees with dark green foliage
      treeGroup.add(createTree(pos.x, pos.z, pos.height, 0x5D4037, 0x2E7D32));
    });
  };
  
  // Add deciduous trees (lighter green, rounder)
  const addDeciduousTrees = () => {
    const positions = [
      // Trees near the water hazard
      { x: -20, z: 18, height: 4.5 },
      { x: -18, z: 12, height: 4 },
      { x: -12, z: 20, height: 4.8 },
      
      // Trees near the tee box
      { x: -48, z: 5, height: 5 },
      { x: -46, z: -5, height: 4.5 },
      
      // Trees near the green
      { x: 45, z: 10, height: 4 },
      { x: 48, z: 5, height: 4.5 },
      { x: 46, z: -5, height: 4.2 },
      { x: 44, z: -10, height: 4.8 },
    ];
    
    positions.forEach(pos => {
      // Deciduous trees with lighter green, rounder foliage
      const tree = new THREE.Group();
      
      // Trunk
      const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, pos.height * 0.4, 8);
      const trunkMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x795548,
        roughness: 0.9,
        metalness: 0.1,
      });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = pos.height * 0.2;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      tree.add(trunk);
      
      // Foliage (spherical for deciduous trees)
      const foliageGeometry = new THREE.SphereGeometry(pos.height * 0.3, 8, 8);
      const foliageMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4CAF50,
        roughness: 0.8,
        metalness: 0.1,
      });
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.y = pos.height * 0.6;
      foliage.castShadow = true;
      foliage.receiveShadow = true;
      tree.add(foliage);
      
      // Position the tree
      tree.position.set(pos.x, -2, pos.z);
      
      // Add some random rotation for variety
      tree.rotation.y = Math.random() * Math.PI * 2;
      
      treeGroup.add(tree);
    });
  };
  
  // Add both types of trees
  addPineTrees();
  addDeciduousTrees();
  
  return treeGroup;
};

const trees = createTrees();

export default trees;
