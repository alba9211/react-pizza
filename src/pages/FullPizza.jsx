import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPizza } from "../redux/slices/fullPizzaSlice";

const FullPizza = () => {
  const { pizza } = useSelector((state) => state.fullPizza);

  const dispatch = useDispatch();
  // const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://67dae01535c87309f52e6ed5.mockapi.io/pizza/` + id
        );
        dispatch(setPizza(data));
      } catch (error) {
        alert("Ошибка загрузки данных");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2 className="pizza-block__title">{pizza.title}</h2>

      <h4 className="pizza-block__price">{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
