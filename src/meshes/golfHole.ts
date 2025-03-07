import * as THREE from "three";

// Create a golf hole mesh
const createGolfHole = () => {
  // Create a group to hold all parts of the hole
  const holeGroup = new THREE.Group();
  
  // Create the hole (a black cylinder)
  const holeCylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32);
  const holeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const holeCylinder = new THREE.Mesh(holeCylinderGeometry, holeMaterial);
  holeCylinder.position.y = -2.2; // Slightly below the floor
  
  // Create the hole rim (white ring)
  const holeRimGeometry = new THREE.TorusGeometry(0.2, 0.02, 16, 32);
  const holeRimMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const holeRim = new THREE.Mesh(holeRimGeometry, holeRimMaterial);
  holeRim.rotation.x = Math.PI / 2;
  holeRim.position.y = -1.99; // Just above the floor
  
  // Create the flag pole
  const flagPoleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
  const flagPoleMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
  const flagPole = new THREE.Mesh(flagPoleGeometry, flagPoleMaterial);
  flagPole.position.y = -1.25; // Half of its height above the floor
  flagPole.position.x = 0.2; // Offset from the center of the hole
  
  // Create the flag
  const flagGeometry = new THREE.PlaneGeometry(0.4, 0.3);
  const flagMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xFF0000,
    side: THREE.DoubleSide
  });
  const flag = new THREE.Mesh(flagGeometry, flagMaterial);
  flag.position.set(0.4, -0.6, 0); // Position at the top of the pole
  flag.rotation.y = Math.PI / 2;
  
  // Add all parts to the group
  holeGroup.add(holeCylinder);
  holeGroup.add(holeRim);
  holeGroup.add(flagPole);
  holeGroup.add(flag);
  
  // Position the hole at the end of the fairway (green area)
  holeGroup.position.set(40, 0, 0);
  
  return holeGroup;
};

const golfHole = createGolfHole();

export default golfHole;
