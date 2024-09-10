// utils/getRandomPastelColor.ts
export const getRandomPastelColor = () => {
    const pastelColors = [
        '#AEC6CF', // Light Blue
        '#B2EBF2', // Baby Blue
        '#C4C3F5', // Soft Lavender
        '#98FF98', // Mint Green
        '#C1C4E9', // Periwinkle
        '#A6EBC9', // Cool Mint
        '#D0EFFF', // Pale Aqua
        '#E1C6E5', // Lilac
        '#AFEEEE', // Pale Turquoise
        '#B2D7D9', // Soft Teal
        '#A5F2F3', // Pastel Cyan
        '#B0E0E6', // Powder Blue
        '#DAF6FF', // Ice Blue
        '#C1DFF0', // Pale Sky Blue
        '#77DD77', // Pastel Green
        '#CCCCFF', // Lavender Blue
    ];
  
    // Return a random color from the pastel color array
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  };
  