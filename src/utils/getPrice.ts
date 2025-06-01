export const getPrice = () => {
  const price = localStorage.getItem("price");

  return price ? Number(price) : 0;
};
