// This file creates a procedural golf grass texture
// It will be used to create a golf course environment

export const createGolfGrassCanvas = () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = 512;
  canvas.height = 512;
  
  // Fill with base green color (golf course grass)
  context.fillStyle = '#2a7d2e';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add some variation to the grass
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 3 + 1;
    
    // Lighter green for some grass blades
    context.fillStyle = `rgba(${42 + Math.random() * 30}, ${125 + Math.random() * 30}, ${46 + Math.random() * 20}, 0.5)`;
    context.fillRect(x, y, size, size);
  }
  
  // Add some mowing pattern lines
  context.strokeStyle = '#236b27';
  context.lineWidth = 10;
  
  for (let i = 0; i < canvas.width; i += 40) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }
  
  return canvas;
};
