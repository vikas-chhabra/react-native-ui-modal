export const randomValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const randomColor = (colors) => {
  return colors[Math.round(randomValue(0, colors.length - 1))];
};
