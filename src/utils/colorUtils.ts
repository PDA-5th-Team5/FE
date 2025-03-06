export const getRandomColor = (id: number): string => {
  const colors = [
    "#10141B",
    "#3E4763",
    "#10141B",
    "#858589",
    "#917373",
    "#3C4531",
  ];
  return colors[id % colors.length];
};
