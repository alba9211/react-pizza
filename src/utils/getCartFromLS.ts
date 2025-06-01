export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  console.log("DATA", data);
  return data ? JSON.parse(data) : [];
};
