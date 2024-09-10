// utils/generateCoolWarmGradient.ts
export const generateCoolWarmGradient = () => {
    // Cool color range (e.g., blue, teal, purple)
    const coolColors = [
      'rgb(216, 181, 255)', 
      'rgb(255, 97, 210)', 
      'rgb(191, 240, 152)',
      'rgb(161, 196, 253)', 
    ];
  
    // Warm color range (e.g., red, orange, yellow)
    const warmColors = [
      'rgb(30, 174, 152)', 
      'rgb(254, 144, 144)',   
      'rgb(111, 214, 255)', 
      'rgb(194, 233, 251)',  
    ];
  
    // Pick random colors from the cool and warm arrays
    const coolColor = coolColors[Math.floor(Math.random() * coolColors.length)];
    const warmColor = warmColors[Math.floor(Math.random() * warmColors.length)];
  
    return `linear-gradient(135deg, ${coolColor}, ${warmColor})`;
  };
  